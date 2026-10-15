export type Text = { en: string; vi: string }

export type Track = 'device' | 'research' | 'other'

export type Status = 'prototype' | 'in-development' | 'completed'

export type Project = {
  slug: string
  title: Text
  track: Track
  status: Status
  visibility: 'draft' | 'published'
  summary: Text
  overview: Text
  /** Who the device is for and the gap it addresses. Devices only. */
  forWhom?: Text
  pipeline?: Text[]
  hardware?: Text[]
  contribution: Text[]
  technologies: string[]
  event?: Text
  note?: Text
  links?: { github?: string; paper?: string; demo?: string }
}
