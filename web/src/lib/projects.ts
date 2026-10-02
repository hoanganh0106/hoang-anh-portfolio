import type { Project, DomainId } from './types'

export const projects: Project[] = [
  {
    slug: 'spmamba-3-source',
    title: 'SPMamba — 2-Source → 3-Source Speech Separation',
    summary: 'Adapted SPMamba from two-source to three-source speech separation and presented the work at UEC ASEAN Seminar and Workshop 2026.',
    domainIds: ['research'],
    kind: 'research',
    visibility: 'published',
    disclosure: 'summary-only',
    event: 'Presented at UEC ASEAN Seminar and Workshop 2026',
    contribution: [
      'Adapted SPMamba from two-source to three-source speech separation.',
      'Presented the work at UEC ASEAN Seminar and Workshop 2026.'
    ],
    technologies: ['SPMamba', 'Speech Separation'],
    featuredOrder: 1,
    overview: 'A research project extending SPMamba from two-source to three-source speech separation. The project is documented as a concise research summary; no public paper, code, or empirical results are claimed.',
    disclosureNote: 'Presented at UEC ASEAN Seminar and Workshop 2026. Summary only; no public paper, code, or results are claimed.'
  },
  {
    slug: 'edge-ai-stethoscope',
    title: 'Edge AI Stethoscope',
    summary: 'A near-complete research prototype exploring on-device heart and lung sound separation and inference.',
    domainIds: ['edge-ai', 'electronics'],
    kind: 'prototype',
    visibility: 'published',
    disclosure: 'summary-only',
    status: 'in-progress',
    featuredOrder: 2,
    pipeline: [
      'Acoustic signal',
      'Signal capture',
      'Heart / lung source separation',
      'Noise filtering',
      'AI inference',
      'Edge device',
      'On-device display'
    ],
    contribution: [
      'Developed a research prototype around an end-to-end acoustic signal and inference pipeline.',
      'Explored running AI processing close to the physical device.'
    ],
    technologies: ['Edge AI', 'Signal Processing', 'Embedded Systems'],
    overview: 'A near-complete research prototype exploring heart and lung sound separation, noise filtering, and AI inference close to the physical device rather than depending entirely on cloud computation.',
    disclosureNote: 'Research prototype in development; not clinically validated.'
  },
  {
    slug: 'face-recognition',
    title: 'Face Recognition',
    summary: 'An early AI project connecting an image, model inference, and an Arduino control signal.',
    domainIds: ['edge-ai', 'electronics'],
    kind: 'experiment',
    visibility: 'published',
    disclosure: 'public',
    status: 'completed',
    links: { github: 'https://github.com/hoanganh0106/Face-recognition' },
    contribution: [
      'Built an image → model → inference → Arduino control signal pipeline.',
      'Explored real-time inference connected to physical hardware control.'
    ],
    technologies: ['Face Recognition', 'Arduino'],
    overview: 'An early AI experiment connecting image input and model inference to an Arduino control signal. It represents an initial step from AI software toward physical electronics.',
    disclosureNote: 'Open-source educational repository available on GitHub.'
  },
  {
    slug: 'cisco-networking-projects',
    title: 'Cisco Networking Projects',
    summary: 'Structured Cisco Packet Tracer tutorials and labs covering routing, switching, OSPF, EIGRP, and NAT.',
    domainIds: ['systems'],
    kind: 'lab',
    visibility: 'published',
    disclosure: 'public',
    status: 'completed',
    links: { github: 'https://github.com/hoanganh0106/Cisco-Networking-Projects' },
    contribution: [
      'Completed structured Cisco Packet Tracer tutorials and labs.',
      'Practiced routing, switching, OSPF, EIGRP, and NAT configuration.'
    ],
    technologies: ['Cisco Packet Tracer', 'Routing', 'Switching', 'OSPF', 'EIGRP', 'NAT'],
    overview: 'Practical networking laboratory work completed through structured tutorials and labs in Cisco Packet Tracer.',
    disclosureNote: 'Open-source configuration files and Packet Tracer work available on GitHub.'
  },
  {
    slug: 'mossformer-2',
    title: 'MossFormer 2',
    summary: 'Trained MossFormer 2 for three-source audio separation.',
    domainIds: ['research'],
    kind: 'research',
    visibility: 'published',
    disclosure: 'summary-only',
    status: 'completed',
    contribution: [
      'Trained MossFormer 2 for three-source audio separation.'
    ],
    technologies: ['MossFormer 2', 'Audio Separation'],
    overview: 'A research-oriented experiment focused on training MossFormer 2 for three-source audio separation. No paper has been published for this work.',
    disclosureNote: 'No public paper is claimed. Summary only.'
  }
]

export function publishedProjects() {
  return projects.filter(p => p.visibility === 'published')
}

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug && p.visibility === 'published')
}

const domainsSet = { systems: true, 'edge-ai': true, research: true, electronics: true, 'ic-design': true }

export function projectsForDomain(domain?: string) {
  return domain && Object.prototype.hasOwnProperty.call(domainsSet, domain)
    ? publishedProjects().filter(p => p.domainIds.includes(domain as DomainId))
    : publishedProjects()
}
