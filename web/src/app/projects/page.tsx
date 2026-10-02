import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectFilters } from '@/components/projects/ProjectFilters.client'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { PageShell } from '@/components/layout/PageShell'
import { publishedProjects } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Published systems, edge AI, research and electronics projects.',
  alternates: { canonical: siteUrl ? `${siteUrl}/projects/` : undefined },
}

export default function Projects() {
  return (
    <PageShell
      index="Section 02 / Projects"
      title="Projects"
      intro="A working log rather than a showcase. Entries are listed with their current status; nothing here is claimed as finished or validated unless marked so."
    >
      <Suspense fallback={<ProjectIndex items={publishedProjects()} />}>
        <ProjectFilters />
      </Suspense>
    </PageShell>
  )
}
