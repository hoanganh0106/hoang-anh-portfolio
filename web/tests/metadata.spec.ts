import { loadEnvConfig } from '@next/env'
import { test, expect } from '@playwright/test'
import { publishedProjects } from '@/lib/projects'

loadEnvConfig(process.cwd())

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const configuredOrigin = configuredSiteUrl ? new URL(configuredSiteUrl).origin : undefined
const allowIndexing = process.env.SITE_ALLOW_INDEXING?.trim().toLowerCase() === 'true'
const publicPaths = [
  '/',
  '/projects/',
  '/research/',
  '/about/',
  ...publishedProjects().map(project => `/projects/${project.slug}/`),
]

test.describe('production metadata routes', () => {
  test('flattened static RSC requests resolve to the exported route segments', async ({ request }) => {
    for (const [flattened, nested] of [
      ['/projects/__next.projects.__PAGE__.txt', '/projects/__next.projects/__PAGE__.txt'],
      ['/projects/spmamba-3-source/__next.projects.$d$slug.__PAGE__.txt', '/projects/spmamba-3-source/__next.projects/$d$slug/__PAGE__.txt'],
    ]) {
      const response = await request.get(flattened)
      const exported = await request.get(nested)
      expect(response.status()).toBe(200)
      expect(exported.status()).toBe(200)
      expect(await response.text()).toBe(await exported.text())
      expect(response.headers()['content-type']).toContain('text/plain')
      const head = await request.head(flattened)
      expect(head.status()).toBe(200)
      expect(await head.body()).toHaveLength(0)
    }
    expect((await request.get('/projects/__next.missing.__PAGE__.txt')).status()).toBe(404)
    expect((await request.get('/%2e%2e%5cpackage.json')).status()).toBe(403)
  })
  test('sitemap uses configured origin, trailing slashes, and published routes only', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.ok()).toBeTruthy()
    const body = await response.text()

    expect(configuredOrigin).toBeTruthy()
    for (const path of publicPaths) {
      expect(body).toContain(`<loc>${configuredOrigin}${path}</loc>`)
    }
    expect(body).not.toContain('chatgpt.site')
    expect(body).not.toContain('/projects/unknown/')
    expect(body).not.toContain('/projects/mossformer-2</loc>')
  })

  test('robots matches explicit indexing policy and configured origin', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.ok()).toBeTruthy()
    const body = await response.text()

    if (allowIndexing && configuredOrigin) {
      expect(body).toContain('Allow: /')
      expect(body).not.toContain('Disallow: /')
      expect(body).toContain(`Sitemap: ${configuredOrigin}/sitemap.xml`)
    } else {
      expect(body).toContain('Disallow: /')
      expect(body).not.toContain('Allow: /')
      expect(body).not.toContain('Sitemap:')
    }
    expect(body).not.toContain('chatgpt.site')
  })
})
