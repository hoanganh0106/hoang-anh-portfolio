import Link from 'next/link'
import type { Project, Status } from '@/lib/types'
import { statusLabel } from '@/lib/projects'
import Localized, { Tx } from '@/components/language/Localized'
import DeviceArt from './DeviceArt'

export function StatusPill({ status }: { status: Status }) {
  return <span className={`status status--${status}`}><span aria-hidden="true" /><Tx t={statusLabel[status]} /></span>
}

export function DeviceCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`device-card ${featured ? 'device-card--featured' : ''}`}>
      <DeviceArt slug={project.slug} />
      <div className="device-card__body">
        <StatusPill status={project.status} />
        <h3><Link href={`/projects/${project.slug}`}><Tx t={project.title} /></Link></h3>
        <p><Tx t={project.summary} /></p>
        {featured && project.forWhom && (
          <p className="device-card__for"><strong><Localized en="For" vi="Dành cho" /></strong> <Tx t={project.forWhom} /></p>
        )}
        <span className="device-card__more" aria-hidden="true"><Localized en="How it works" vi="Xem cách hoạt động" /> →</span>
      </div>
    </article>
  )
}

export function WorkRow({ project }: { project: Project }) {
  return (
    <li className="work-row">
      <div>
        <h3><Link href={`/projects/${project.slug}`}><Tx t={project.title} /></Link></h3>
        <p><Tx t={project.summary} /></p>
      </div>
      <ul className="chips" aria-label="Technologies">
        {project.technologies.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
    </li>
  )
}
