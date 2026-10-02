import { test, expect } from '@playwright/test'

test.describe('cinematic path interaction', () => {
  test('path exposes the engineering destinations once', async ({ page }) => {
    await page.goto('/')
    const path = page.locator('.cinematic-path')
    await expect(path).toBeVisible()
    await expect(page.getByRole('region', { name: 'System map' })).toHaveCount(0)

    const destinations = [
      ['Systems', /\/projects\/?\?domain=systems$/],
      ['Edge AI', /\/projects\/?\?domain=edge-ai$/],
      ['Electronics', /\/projects\/?\?domain=electronics$/],
      ['UAV Navigation', /\/about\/?#uav-navigation$/],
      ['IC Design', /\/about\/?#future-directions$/],
    ] as const

    for (const [label, href] of destinations) {
      await expect(path.locator('.cinematic-hud').getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
    }
  })

  test('scrolling advances the cinematic path smoothly', async ({ page }) => {
    await page.goto('/')
    const path = page.locator('.cinematic-path')
    const metrics = await path.evaluate((element) => ({
      top: (element as HTMLElement).offsetTop,
      height: (element as HTMLElement).offsetHeight,
      viewport: window.innerHeight,
    }))

    await page.evaluate(({ top, height, viewport }) => {
      window.scrollTo(0, top + (height - viewport) * 0.55)
    }, metrics)

    await expect.poll(() => path.getAttribute('data-active')).not.toBe('0')
    const current = path.locator('[data-journey-node][data-current]').first()
    await expect(current).toHaveCount(1)
    await expect.poll(() => current.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none')
  })

  test('reduced motion keeps the static path usable', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const path = page.locator('.cinematic-path')
    await expect(path).toHaveAttribute('data-enhanced', 'false')
    await expect(path.locator('.cinematic-hud').getByRole('link', { name: 'Systems', exact: true })).toBeVisible()
  })

  test('keyboard navigation reaches the path links', async ({ page }) => {
    await page.goto('/')
    const systems = page.locator('.cinematic-hud').getByRole('link', { name: 'Systems', exact: true })
    await systems.focus()
    await expect(systems).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/?\?domain=systems$/)
  })

  test('path links remain available without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto('/')
    const systems = page.locator('.cinematic-hud').getByRole('link', { name: 'Systems', exact: true })
    await expect(systems).toBeVisible()
    await systems.click()
    await expect(page).toHaveURL(/\/projects\/?\?domain=systems$/)
    await context.close()
  })
})
