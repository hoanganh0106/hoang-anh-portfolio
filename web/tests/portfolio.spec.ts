import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { publishedProjects, projectsByTrack } from '@/lib/projects'

const routes = ['/', '/projects', '/research', '/about']
const projectRoutes = publishedProjects().map(project => `/projects/${project.slug}`)

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
    await expect(page.getByText(/this page does not exist/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/')
  })

  test('homepage leads with the medical edge AI mission and every device', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/medical devices/i)
    await expect(page.getByText(/non-profit/i).first()).toBeVisible()
    const devices = page.locator('#devices .device-card')
    await expect(devices).toHaveCount(projectsByTrack('device').length)
    await expect(devices.first()).toHaveClass(/device-card--featured/)
    await expect(devices.first()).toContainText('Edge AI Stethoscope')
    await expect(page.locator('canvas')).toHaveCount(0)
  })

  test('device cards link to their detail page with a status label', async ({ page }) => {
    await page.goto('/projects')
    await page.getByRole('link', { name: 'Cough Listener' }).click()
    await expect(page).toHaveURL(/\/projects\/cough-listener\/?$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cough Listener')
    await expect(page.locator('.detail__meta .status')).toHaveText('In development')
    await expect(page.getByRole('heading', { name: 'Hardware design' })).toBeVisible()
    await expect(page.getByRole('note')).toContainText(/screening aid/i)
  })

  test('projects page groups devices, research and earlier work', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.locator('.device-card')).toHaveCount(projectsByTrack('device').length)
    await expect(page.getByRole('heading', { name: 'Research foundation' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Earlier work' })).toBeVisible()
    await expect(page.locator('.work-row')).toHaveCount(projectsByTrack('research').length + projectsByTrack('other').length)
  })

  test('language toggle switches content to Vietnamese and persists', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'VI' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Thiết bị y tế')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expect(page.getByRole('link', { name: 'Thiết bị', exact: true }).first()).toBeVisible()
  })
})

test.describe('shell interaction and accessibility', () => {
  test('mobile header navigation stays visible without hamburger', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Devices' })).toBeVisible()
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
  test('navigation and device links remain available with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
    const page = await context.newPage()
    await page.goto('/')
    await page.locator('a[href="/projects/"]:visible').first().click()
    await expect(page).toHaveURL(/\/projects\/?$/)
    for (const project of projectsByTrack('device')) {
      await expect(page.locator(`main a[href="/projects/${project.slug}/"]`).first()).toBeVisible()
    }
    await context.close()
  })
})

for (const width of [390, 768, 1024, 1440, 1536]) {
  test(`no horizontal overflow at ${width}px in both themes`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(route)
      for (const theme of ['light', 'dark'] as const) {
        await page.evaluate(value => { document.documentElement.dataset.theme = value }, theme)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow, `${route} ${theme} overflow at ${width}px`).toBeLessThanOrEqual(1)
      }
    }
  })
}
