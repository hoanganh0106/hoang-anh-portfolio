import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure', colorScheme: 'light' },
  webServer: { command: 'npm run start', cwd: '.', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI, timeout: 60_000 },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'msedge' } },
    ...(process.env.PW_INCLUDE_FIREFOX ? [{ name: 'firefox', use: { ...devices['Desktop Firefox'], browserName: 'firefox' as const } }] : []),
    ...(process.env.PW_INCLUDE_WEBKIT ? [{ name: 'webkit', use: { ...devices['Desktop Safari'], browserName: 'webkit' as const } }] : []),
  ],
});
