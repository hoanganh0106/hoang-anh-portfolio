import { test, expect } from '@playwright/test'

test.describe('system map interaction', () => {
  test('graphic and heading links expose distinct destinations', async ({ page }) => {
    await page.goto('/')
    const map = page.getByRole('region', { name: 'System map' })
    for (const node of ['research', 'systems', 'edge-ai', 'electronics', 'uav-nav', 'ic-design']) {
      await expect(map.locator(`[data-map-graphic="${node}"]`)).toHaveAttribute('href', /./)
      await expect(map.locator(`[data-map-node="${node}"] h3 a`).filter({visible:true})).toHaveAttribute('href', /./)
    }
    await expect(map.locator('[data-map-graphic="systems"]')).toHaveAttribute('href', /\/projects\/?\?domain=systems$/)
    await expect(map.locator('[data-map-graphic="edge-ai"]')).toHaveAttribute('href', /\/projects\/?\?domain=edge-ai$/)
    await expect(map.locator('a a')).toHaveCount(0)
  })

  test('pointer tilt changes and resets', async ({ page }) => {
    await page.goto('/')
    const graphic = page.locator('[data-map-graphic="research"]')
    await graphic.hover({ position: { x: 20, y: 20 } })
    await expect.poll(() => graphic.evaluate(el => el.style.getPropertyValue('--map-rotate-x'))).not.toBe('')
    await expect.poll(() => graphic.evaluate(el => getComputedStyle(el).transform)).not.toBe('none')
    await page.mouse.move(1, 1)
    await expect.poll(() => graphic.evaluate(el => getComputedStyle(el).transform)).toBe('none')
  })

  test('entrance, LED, and connector animations are active', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-map-node="research"] .map-node-motion')).toHaveCSS('animation-name', 'map-node-enter')
    await expect(page.locator('[data-map-led]').first()).toHaveCSS('animation-name', 'map-led-pulse')
    await page.locator('[data-map-graphic="research"]').hover()
    const cable = page.locator('[data-map-cable="research"]')
    await expect(cable).toHaveCSS('stroke-width', '2px')
    await expect(cable).toHaveCSS('animation-name', 'map-cable-trace')
  })

  test('reduced motion disables transform', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const graphic = page.locator('[data-map-graphic="research"]')
    await graphic.hover()
    await expect.poll(() => graphic.evaluate(el => getComputedStyle(el).transform)).toBe('none')
    await expect(page.locator('[data-map-node="research"] .map-node-motion')).toHaveCSS('animation-name', 'none')
    await expect(page.locator('[data-map-led]').first()).toHaveCSS('animation-name', 'none')
    await expect(page.locator('[data-map-cable="research"]')).toHaveCSS('animation-name', 'none')
  })

  test('keyboard focus and no JavaScript links work', async ({ page, browser }) => {
    await page.goto('/')
    await page.locator('[data-map-graphic="identity"]').focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/about\/?$/)
    const context = await browser.newContext({ javaScriptEnabled: false })
    const noJs = await context.newPage()
    await noJs.goto('/')
    await expect(noJs.locator('[data-map-graphic="research"]')).toHaveAttribute('href', '/research')
    await noJs.locator('[data-map-graphic="research"]').click({ force: true })
    await expect(noJs).toHaveURL(/\/research\/?$/)
    await context.close()
  })

  test('clicking a domain graphic opens its filtered project index', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-map-graphic="systems"]').click()
    await expect(page).toHaveURL(/\/projects\/?\?domain=systems$/)
    await expect(page.locator('nav[aria-label="Filter projects"] a[aria-current="page"]')).toHaveText('Systems')
  })
})
