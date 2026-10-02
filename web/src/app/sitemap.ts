import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { publishedProjects } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []

  const paths = [
    '',
    'projects',
    'research',
    'about',
    ...publishedProjects().map(project => `projects/${project.slug}`),
  ]

  return paths.map(path => ({
    url: `${siteUrl}/${path}${path ? '/' : ''}`,
    lastModified: new Date(),
  }))
}
