import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { siteUrl } from '@/lib/site-config'

const allowIndexing = process.env.SITE_ALLOW_INDEXING?.trim().toLowerCase() === 'true'

export default function robots(): MetadataRoute.Robots {
  const isPublicBuild = allowIndexing && Boolean(siteUrl)

  return {
    rules: {
      userAgent: '*',
      allow: isPublicBuild ? '/' : undefined,
      disallow: isPublicBuild ? undefined : '/',
    },
    ...(isPublicBuild ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  }
}
