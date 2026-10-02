export type DomainId = 'systems' | 'edge-ai' | 'research' | 'electronics' | 'ic-design'

export type Project = {
  slug: string
  title: string
  summary: string
  domainIds: DomainId[]
  kind: 'lab' | 'experiment' | 'research' | 'prototype'
  status?: 'in-progress' | 'completed' | 'paused'
  visibility: 'draft' | 'published'
  disclosure: 'public' | 'summary-only'
  contribution: string[]
  technologies: string[]
  featuredOrder?: number
  links?: { github?: string; paper?: string; demo?: string }
  image?: { src: string; alt: string; width: number; height: number }
  pipeline?: string[]
  event?: string
  overview?: string
  architecture?: string[]
  resultsOrLearnings?: string[]
  disclosureNote?: string
}

export type Direction = {
  id: string
  title: string
  state: 'next' | 'future'
  note?: string
}
