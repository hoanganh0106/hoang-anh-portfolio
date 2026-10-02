import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/layout/PageShell'
import { projects } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Speech separation, acoustic signal processing, and state-space model research notes.',
  alternates: { canonical: siteUrl ? `${siteUrl}/research/` : undefined },
}

export default function Research() {
  const researchProjects = projects.filter((project) => project.domainIds.includes('research') && project.visibility === 'published')
  return (
    <PageShell index="Section 03 / Research" title="Research" intro="Notes on ongoing speech separation work. These are summaries of what was done and why — not published results.">
      <div className="space-y-12">
        {researchProjects.map((project, index) => (
          <article key={project.slug} id={project.slug} className="scroll-mt-32 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
            <span className="label-mono md:pt-2">{`R-${String(index + 1).padStart(2, '0')}`}</span>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold tracking-tight"><Link href={`/projects/${project.slug}`} className="hover:text-accent">{project.title}</Link></h2>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                <span className="label-mono">{project.event ?? 'Internal study'}</span>
                <span className="label-mono">{project.disclosure === 'summary-only' ? 'Summary only — no public paper or code' : project.disclosure}</span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
              <p className="label-mono mt-6"><Link href={`/projects/${project.slug}`} className="hover:text-accent">Read detailed project →</Link></p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
