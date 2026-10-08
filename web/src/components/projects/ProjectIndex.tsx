'use client'

import Link from 'next/link'
import { domains } from '@/lib/domains'
import type { DomainId, Project } from '@/lib/types'
import { useLanguage } from '@/components/language/LanguageProvider'
import { projectVi } from '@/lib/project-i18n'

const domainLabelsVi: Partial<Record<DomainId, string>> = {
  systems: 'Systems',
  'edge-ai': 'Edge AI',
  research: 'Research',
  electronics: 'Electronics',
  'ic-design': 'Thiết kế IC',
}

function domainLabel(id: DomainId, vi: boolean) {
  return vi ? domainLabelsVi[id] ?? domains[id]?.label ?? id : domains[id]?.label ?? id
}

export function ProjectIndex({ items, selectedDomain }: { items: Project[]; selectedDomain?: string }) {
  const { language } = useLanguage()
  const vi = language === 'vi'
  const activeDomainLabel = selectedDomain && Object.prototype.hasOwnProperty.call(domains, selectedDomain)
    ? domainLabel(selectedDomain as DomainId, vi)
    : null

  return (
    <div>
      <nav className="flex flex-wrap items-center gap-2" aria-label={vi ? 'Lọc project' : 'Filter projects'}>
        <span className="label-mono mr-2">{vi ? 'Lọc' : 'Filter'}</span>
        <Link className={`label-mono border px-3 py-1 transition-colors ${!selectedDomain ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-accent hover:text-accent'}`} href="/projects" aria-current={!selectedDomain ? 'page' : undefined}>{vi ? 'Tất cả' : 'All'}</Link>
        {Object.values(domains).filter((domain) => domain.state === 'current').map((domain) => (
          <Link key={domain.id} className={`label-mono border px-3 py-1 transition-colors ${selectedDomain === domain.id ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-accent hover:text-accent'}`} href={`/projects?domain=${domain.id}`} aria-current={selectedDomain === domain.id ? 'page' : undefined}>{domainLabel(domain.id, vi)}</Link>
        ))}
        <Link className={`label-mono border px-3 py-1 transition-colors ${selectedDomain === 'ic-design' ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-accent hover:text-accent'}`} href="/projects?domain=ic-design" aria-current={selectedDomain === 'ic-design' ? 'page' : undefined}>{domainLabel('ic-design', vi)}</Link>
      </nav>

      <p className="label-mono mt-5" role="status">
        {activeDomainLabel
          ? (vi ? `Đang lọc theo "${activeDomainLabel}" — ${items.length} project` : `Filtered by topic "${activeDomainLabel}" — showing ${items.length} projects`)
          : (vi ? `Hiển thị toàn bộ ${items.length} project đã công bố` : `Showing all ${items.length} published projects across disciplines`)}
      </p>

      <ol className="mt-8 border-t border-rule">
        {items.map((project, index) => (
          <li key={project.slug} className="scroll-mt-32 border-b border-rule py-6">
            <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-8">
              <span className="label-mono md:pt-1">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h2 className="text-lg font-medium leading-snug"><Link href={`/projects/${project.slug}`} className="hover:text-accent">{project.title}</Link></h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{vi ? projectVi[project.slug]?.summary ?? project.summary : project.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">{project.technologies.map((technology) => <li className="label-mono" key={technology}>{technology}</li>)}</ul>
              </div>
              <div className="flex flex-wrap gap-4 md:max-w-56 md:flex-col md:items-end md:text-right">
                <span className="label-mono">{project.domainIds.map((id) => domainLabel(id, vi)).join(' · ')}</span>
                {project.status && <span className="label-mono">{vi ? (project.status === 'in-progress' ? 'đang thực hiện' : project.status === 'completed' ? 'hoàn thành' : 'tạm dừng') : project.status}</span>}
                {project.event && <span className="label-mono">{project.event}</span>}
              </div>
            </div>
          </li>
        ))}
      </ol>
      {items.length === 0 && <p className="py-10 text-sm text-muted-foreground">{vi ? 'Chưa có project trong hướng này.' : 'No entries in this domain yet.'}</p>}
    </div>
  )
}
