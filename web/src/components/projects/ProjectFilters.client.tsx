'use client'

import { useSearchParams } from 'next/navigation'
import { domains } from '@/lib/domains'
import { projectsForDomain } from '@/lib/projects'
import { ProjectIndex } from './ProjectIndex'

export function ProjectFilters() {
  const domain = useSearchParams().get('domain') ?? ''
  const selectedDomain = Object.prototype.hasOwnProperty.call(domains, domain) ? domain : undefined
  return <ProjectIndex items={projectsForDomain(domain)} selectedDomain={selectedDomain} />
}

export default ProjectFilters
