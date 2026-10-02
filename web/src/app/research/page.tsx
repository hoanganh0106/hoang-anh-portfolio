import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/layout/PageShell'
import Localized from '@/components/language/Localized'
import { projects } from '@/lib/projects'
import { projectVi } from '@/lib/project-i18n'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Speech separation, acoustic signal processing, and state-space model research notes.',
  alternates: { canonical: siteUrl ? `${siteUrl}/research/` : undefined },
}

export default function Research() {
  const researchProjects = projects.filter((project) => project.domainIds.includes('research') && project.visibility === 'published')
  return (
    <PageShell
      index="Section 03 / Research"
      title="Research"
      intro="Notes on ongoing speech separation work. These are summaries of what was done and why — not published results."
      indexVi="Phần 03 / Research"
      titleVi="Research"
      introVi="Ghi chú về các hướng speech separation đang được thực hiện. Đây là summary về những gì đã làm và lý do thực hiện — không phải published results."
    >
      <div className="space-y-12">
        {researchProjects.map((project, index) => (
          <article key={project.slug} id={project.slug} className="scroll-mt-32 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
            <span className="label-mono md:pt-2">{`R-${String(index + 1).padStart(2, '0')}`}</span>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold tracking-tight"><Link href={`/projects/${project.slug}`} className="hover:text-accent">{project.title}</Link></h2>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                <span className="label-mono">{project.event ?? <Localized en="Internal study" vi="Internal study" />}</span>
                <span className="label-mono">{project.disclosure === 'summary-only' ? <Localized en="Summary only — no public paper or code" vi="Chỉ công bố summary — chưa có public paper hay code" /> : project.disclosure}</span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground"><Localized en={project.summary} vi={projectVi[project.slug]?.summary ?? project.summary} /></p>
              <p className="label-mono mt-6"><Link href={`/projects/${project.slug}`} className="hover:text-accent"><Localized en="Read detailed project" vi="Đọc chi tiết project" /> →</Link></p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
