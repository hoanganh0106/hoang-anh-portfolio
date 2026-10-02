export type MapDomainId = 'systems' | 'edge-ai' | 'research' | 'electronics' | 'ic-design'

export type MapProjectLink = {
  label: string
  href: string
  state?: 'next' | 'future'
}

export type MapAnchor = {
  id: MapDomainId | 'identity'
  label: string
  kicker: string
  subtitle?: string
  note?: string
  x: number
  y: number
  z: number
  href: string
  state?: 'current' | 'direction'
  projects?: MapProjectLink[]
}

export const MAP_ANCHORS: readonly MapAnchor[] = [
  {
    id: 'identity',
    label: 'Hoang Anh Nguyen',
    kicker: 'IDENTITY NODE',
    subtitle: 'Exploring systems, intelligence, and hardware.',
    note: 'Systems · intelligence · hardware',
    x: 0,
    y: 0,
    z: 0.12,
    href: '/',
  },
  {
    id: 'research',
    label: 'Research',
    kicker: '// DOMAIN 01',
    subtitle: 'AUDIO AI · SIGNAL PROCESSING',
    x: 0,
    y: -0.58,
    z: 0.02,
    href: '/research',
    state: 'current',
    projects: [
      { label: 'SPMamba — 3-source', href: '/projects/spmamba-3-source' },
      { label: 'MossFormer 2', href: '/projects/mossformer-2' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems',
    kicker: '// DOMAIN 02',
    subtitle: 'NETWORK · SERVER · INFRASTRUCTURE',
    x: -0.78,
    y: 0,
    z: 0,
    href: '/projects?domain=systems',
    state: 'current',
    projects: [
      { label: 'Cisco Networking', href: '/projects/cisco-networking-projects' },
    ],
  },
  {
    id: 'edge-ai',
    label: 'Edge AI',
    kicker: '// DOMAIN 03',
    subtitle: 'AI · EMBEDDED · REAL-WORLD',
    x: 0.78,
    y: 0,
    z: 0.02,
    href: '/projects?domain=edge-ai',
    state: 'current',
    projects: [
      { label: 'Stethoscope Prototype', href: '/projects/edge-ai-stethoscope' },
      { label: 'Face Recognition', href: '/projects/face-recognition' },
    ],
  },
  {
    id: 'electronics',
    label: 'Electronics',
    kicker: '// DOMAIN 04',
    subtitle: 'CIRCUIT · MCU · SIGNAL PROCESSING',
    x: -0.52,
    y: 0.58,
    z: -0.02,
    href: '/projects?domain=electronics',
    state: 'current',
    projects: [
      { label: 'Signal Processing', href: '/projects?domain=electronics' },
      { label: 'Embedded Systems', href: '/projects?domain=electronics' },
    ],
  },
  {
    id: 'ic-design',
    label: 'IC Design',
    kicker: '// NEXT DIRECTION',
    subtitle: 'FROM CIRCUIT TO SILICON',
    x: 0.52,
    y: 0.62,
    z: -0.04,
    href: '/about#directions',
    state: 'direction',
    projects: [
      { label: 'FPGA (Next)', href: '/about#directions', state: 'next' },
      { label: 'PCB (Next)', href: '/about#directions', state: 'next' },
      { label: 'RF / Antenna (Next)', href: '/about#directions', state: 'next' },
      { label: 'UAV (Next)', href: '/about#directions', state: 'next' },
      { label: 'IC Design (Future)', href: '/about#directions', state: 'future' },
    ],
  },
]

export const MAP_VIEWBOX = { width: 1000, height: 800 }

export function anchorToSvg(anchor: MapAnchor) {
  return {
    x: MAP_VIEWBOX.width / 2 + anchor.x * 420,
    y: MAP_VIEWBOX.height / 2 + anchor.y * 340,
  }
}

export function anchorById(id: MapAnchor['id']) {
  return MAP_ANCHORS.find((anchor) => anchor.id === id) ?? MAP_ANCHORS[0]
}
