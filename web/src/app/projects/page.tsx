import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectFilters } from '@/components/projects/ProjectFilters.client'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { PageShell } from '@/components/layout/PageShell'
import { publishedProjects } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A working log of systems, edge AI, research, and electronics projects with clear status and scope.',
  alternates: { canonical: siteUrl ? `${siteUrl}/projects/` : undefined },
}

export default function Projects() {
  return (
    <PageShell
      index="Section 02 / Projects"
      title="Projects"
      intro="A working log rather than a showcase. Entries are listed with their current status; nothing here is claimed as finished or validated unless marked so."
      indexVi="Phần 02 / Projects"
      titleVi="Projects"
      introVi="Một working log thay vì một trang trưng bày. Mỗi project được ghi cùng trạng thái hiện tại; không nội dung nào được coi là hoàn thiện hay validated nếu chưa được ghi rõ."
    >
      <Suspense fallback={<ProjectIndex items={publishedProjects()} />}>
        <ProjectFilters />
      </Suspense>
    </PageShell>
  )
}
