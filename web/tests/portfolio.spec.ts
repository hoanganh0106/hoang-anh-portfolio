import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

declare global {
  interface Window { __webglCalls?: number }
}

const routes = ['/', '/projects', '/research', '/about']
const projectRoutes = [
  '/projects/spmamba-3-source',
  '/projects/mossformer-2',
  '/projects/cisco-networking-projects',
  '/projects/edge-ai-stethoscope',
  '/projects/face-recognition',
]

test.describe('published navigation', () => {
  for (const route of [...routes, ...projectRoutes]) {
    test(`${route} renders with main landmark and no console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
      page.on('pageerror', error => errors.push(error.message))
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)
      await expect(page.locator('main')).toBeVisible()
      await expect(page.locator('header nav').first()).toBeVisible()
      expect(errors, `${route} console errors`).toEqual([])
    })
  }

  test('unknown project resolves to 404 experience', async ({ page }) => {
    const response = await page.goto('/projects/does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByText(/this node does not exist/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/')
  })

  test('static system map exposes seven decorative SVGs, connectors, and real links', async ({ page }) => {
    await page.goto('/')
    const map = page.getByRole('region', { name: 'System map' })
    await expect(map.locator('svg[aria-hidden="true"]')).toHaveCount(8)
    await expect(map.locator('svg').first().locator('line')).toHaveCount(6)
    await expect(map.getByRole('link', { name: /SPMamba|MossFormer|Cisco Networking|Edge AI Stethoscope|Face Recognition|Signal Processing|Embedded Systems|GPS \/ GNSS|Sensor fusion|Waypoint|RTK|FPGA|PCB|RF \/ Antenna|IC Design/ }).first()).toBeVisible()
    await expect(map.locator('canvas')).toHaveCount(0)
  })

  test('domain filters update URL, visible results, and browser history', async ({ page }) => {
    await page.goto('/projects')
    const rows = page.locator('main ol > li')
    await expect(rows.filter({ hasText: 'Cisco Networking Projects' })).toBeVisible()
    await expect(rows.filter({ hasText: 'Face Recognition' })).toBeVisible()
    const allCount = await rows.count()
    await page.getByRole('link', { name: 'Systems', exact: true }).click()
    await expect(page).toHaveURL(/\/projects\/?\?domain=systems$/)
    await expect(page.locator('nav[aria-label="Filter projects"] a[aria-current="page"]')).toHaveText('Systems')
    await expect(page.locator('main ol > li')).toHaveCount(1)
    await expect(page.locator('main ol')).toContainText('Cisco Networking Projects')
    await expect(page.locator('main ol')).not.toContainText('Face Recognition')
    await page.reload()
    await expect(page.locator('main ol > li')).toHaveCount(1)
    await page.goBack()
    await expect(page).toHaveURL(/\/projects\/?$/)
    await expect(page.locator('main ol > li')).toHaveCount(allCount)
  })

  test('research filter, invalid filter, IC Design empty state, and future link work', async ({ page }) => {
    await page.goto('/projects?domain=research')
    await expect(page).toHaveURL(/\/projects\/?\?domain=research$/)
    await expect(page.locator('nav[aria-label="Filter projects"] a[aria-current="page"]')).toHaveText('Research')
    await expect(page.locator('main ol')).toContainText('SPMamba')
    await expect(page.locator('main ol')).not.toContainText('Edge AI Stethoscope')
    await page.goto('/projects?domain=ic-design')
    await expect(page.locator('main ol > li')).toHaveCount(0)
    await expect(page.getByText(/no entries in this domain yet/i)).toBeVisible()
    await page.goto('/projects?domain=not-a-domain')
    await expect(page.locator('main ol > li')).toHaveCount(5)
    await expect(page.locator('nav[aria-label="Filter projects"] a[aria-current="page"]')).toHaveText('All')
    await page.goto('/')
    await expect(page.getByRole('link', { name: /IC Design/ }).first()).toHaveAttribute('href', /\/about\/?#future-directions$/)
  })
})

test.describe('shell interaction and accessibility', () => {
  test('mobile header navigation stays visible without hamburger', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await expect(page.getByRole('navigation').filter({ has: page.getByRole('link', { name: 'PROJECTS' }) }).last()).toBeVisible()
    await expect(page.getByRole('button', { name: /menu/i })).toHaveCount(0)
  })

  test('theme choice persists across reload and has visible focus', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Toggle color theme' })
    await toggle.focus()
    await expect(toggle).toBeFocused()
    const initial = await page.locator('html').getAttribute('data-theme')
    await toggle.click()
    const selected = await page.locator('html').getAttribute('data-theme')
    expect(selected).toBe(initial === 'dark' ? 'light' : 'dark')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', selected!)
  })

  test('core and project routes have no accessibility violations in both themes', async ({ page }) => {
    test.setTimeout(120_000)
    for (const theme of ['light', 'dark']) {
      for (const route of [...routes, ...projectRoutes]) {
        await page.goto(route)
        await page.evaluate(value => { document.documentElement.dataset.theme = value }, theme)
        const results = await new AxeBuilder({ page }).analyze()
        expect(results.violations, `${route} ${theme} accessibility violations`).toEqual([])
      }
    }
  })
})

test.describe('progressive enhancement', () => {
  test('navigation and published project links remain available with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
    const page = await context.newPage()
    await page.goto('/')
    await page.locator('a[href="/projects/"]').last().click()
    await expect(page).toHaveURL(/\/projects\/?$/)
    await expect(page.locator('main ol a[href="/projects/spmamba-3-source/"]')).toBeVisible()
    await expect(page.locator('main ol a[href="/projects/mossformer-2/"]')).toBeVisible()
    await expect(page.locator('nav[aria-label="Filter projects"] a[href="/projects/?domain=research"]')).toBeVisible()
    await context.close()
  })

  test('reduced motion keeps static map usable', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('region', { name: 'System map' })).toBeVisible()
    await expect(page.locator('canvas')).toHaveCount(0)
  })

  test('static map makes no WebGL calls or scene requests', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext
      window.__webglCalls = 0
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, attrs?: object) {
        if (/webgl/i.test(type)) window.__webglCalls = (window.__webglCalls ?? 0) + 1
        return original.call(this, type as never, attrs as never)
      } as typeof HTMLCanvasElement.prototype.getContext
    })
    const sceneRequests: string[] = []
    page.on('request', request => { if (/three|scene|\.glb|\.gltf/i.test(request.url())) sceneRequests.push(request.url()) })
    await page.goto('/')
    expect(sceneRequests).toEqual([])
    expect(await page.evaluate(() => window.__webglCalls)).toBe(0)
  })
})

for (const width of [390, 768, 1024, 1440, 1536]) {
  test(`no horizontal overflow at ${width}px in both themes`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const theme of ['light', 'dark'] as const) {
      await page.goto(`/?theme=${theme}`)
      await page.evaluate(value => { document.documentElement.dataset.theme = value }, theme)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${theme} overflow at ${width}px`).toBeLessThanOrEqual(1)
    }
  })
}
