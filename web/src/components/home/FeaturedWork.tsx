'use client'

import Link from 'next/link'
import type { Project } from '@/lib/types'
import { projectVi } from '@/lib/project-i18n'
import { useLanguage } from '@/components/language/LanguageProvider'

type Props = { projects: Project[] }

function status(project: Project, vi: boolean) {
  if (project.status === 'in-progress') return vi ? 'Đang thực hiện · research prototype' : 'In progress · research prototype'
  if (project.disclosure === 'summary-only') return vi ? 'Chỉ công bố summary · chưa tuyên bố public paper hay results' : 'Summary only · no public paper or results claimed'
  return vi ? 'Hoàn thành · public project' : 'Completed · public project'
}

function art(project: Project) {
  if (project.slug === 'spmamba-3-source') return 'project-art-speech'
  if (project.slug === 'edge-ai-stethoscope') return 'project-art-acoustic'
  return 'project-art-hardware'
}

function SPMambaDiagram() {
  return (
    <svg className="project-diagram" viewBox="0 0 640 260" role="img" aria-label="Two source waveforms enter SPMamba and become three output waveforms">
      <defs><marker id="spmamba-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" /></marker></defs>
      <g className="diagram-grid"><path d="M24 48H616M24 96H616M24 144H616M24 192H616" /></g>
      <g className="diagram-label"><text x="28" y="25">2 SOURCES</text><text x="270" y="25">SPMAMBA</text><text x="474" y="25">3 OUTPUTS</text></g>
      <g className="diagram-wave diagram-source"><path d="M28 70h18l5-12 8 25 8-18 8 5h30l8-15 8 22 8-10h28" /><path d="M28 112h20l7 12 8-24 8 14 8-5h28l8 17 8-23 8 11h28" /></g>
      <path className="diagram-connector" markerEnd="url(#spmamba-arrow)" d="M180 70H242M180 112H242" />
      <rect className="diagram-block" x="244" y="48" width="150" height="88" rx="4" />
      <path className="diagram-block-detail" d="M260 70h118M260 91h118M260 112h82" />
      <path className="diagram-connector" markerEnd="url(#spmamba-arrow)" d="M396 92H454" />
      <g className="diagram-wave diagram-output"><path d="M462 62h16l6-9 7 18 8-13 8 4h36" /><path d="M462 101h18l6 12 8-23 8 14 8-5h33" /><path d="M462 140h18l7-8 8 17 8-22 8 13h32" /></g>
      <g className="diagram-lane"><path d="M454 48v30M454 87v30M454 126v30" /></g>
    </svg>
  )
}

function StethoscopeDiagram() {
  return (
    <svg className="project-diagram" viewBox="0 0 640 260" role="img" aria-label="Acoustic input passes through separation and edge AI to a display">
      <defs><marker id="stetho-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" /></marker></defs>
      <g className="diagram-label"><text x="28" y="28">ACOUSTIC</text><text x="190" y="28">SEPARATE</text><text x="365" y="28">EDGE AI</text><text x="535" y="28">DISPLAY</text></g>
      <g className="stetho-input"><circle cx="70" cy="125" r="25" /><path d="M70 150v26c0 18 15 30 30 30s30-12 30-30v-9" /><path d="M130 167h18" /><path d="M43 125c10-12 18-12 27 0s18 12 27 0" /></g>
      <path className="diagram-connector" markerEnd="url(#stetho-arrow)" d="M155 125h43" />
      <rect className="diagram-block" x="205" y="77" width="120" height="96" rx="4" /><path className="diagram-block-detail" d="M220 105h90M220 125h62M220 145h76" /><path className="diagram-wave" d="M218 158l12-8 10 5 12-15 12 10 14-4 12 9" />
      <path className="diagram-connector" markerEnd="url(#stetho-arrow)" d="M327 125h43" />
      <rect className="diagram-chip" x="375" y="83" width="110" height="84" rx="8" /><path className="diagram-chip-pins" d="M363 101h12M363 125h12M363 149h12M485 101h12M485 125h12M485 149h12" /><text className="diagram-chip-text" x="395" y="130">EDGE AI</text>
      <path className="diagram-connector" markerEnd="url(#stetho-arrow)" d="M499 125h35" />
      <rect className="diagram-display" x="540" y="87" width="70" height="76" rx="3" /><path d="M550 105h50M550 142h50" /><path className="diagram-wave" d="M551 125h8l5-10 8 20 8-14 8 8h12" />
    </svg>
  )
}

function FaceDiagram() {
  return (
    <svg className="project-diagram" viewBox="0 0 640 260" role="img" aria-label="Camera frame with face landmarks passes through inference to Arduino control output">
      <defs><marker id="face-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" /></marker></defs>
      <g className="diagram-label"><text x="30" y="28">CAMERA</text><text x="270" y="28">INFERENCE</text><text x="510" y="28">ARDUINO</text></g>
      <rect className="diagram-frame" x="28" y="61" width="150" height="128" rx="3" /><path className="diagram-corner" d="M28 78V61h17M161 61h17v17M28 172v17h17M161 189h17v-17" /><ellipse className="diagram-face" cx="103" cy="123" rx="38" ry="48" /><circle className="diagram-landmark" cx="88" cy="113" r="3" /><circle className="diagram-landmark" cx="118" cy="113" r="3" /><circle className="diagram-landmark" cx="103" cy="128" r="3" /><circle className="diagram-landmark" cx="90" cy="148" r="3" /><circle className="diagram-landmark" cx="116" cy="148" r="3" /><path className="diagram-landmark-line" d="M88 113h30M103 113v15M90 148h26" />
      <path className="diagram-connector" markerEnd="url(#face-arrow)" d="M184 125h70" />
      <rect className="diagram-block" x="260" y="75" width="150" height="100" rx="4" /><path className="diagram-block-detail" d="M278 101h114M278 123h85M278 145h101" /><circle className="diagram-node" cx="382" cy="123" r="7" />
      <path className="diagram-connector" markerEnd="url(#face-arrow)" d="M416 125h72" />
      <rect className="diagram-control" x="500" y="76" width="108" height="98" rx="4" /><path className="diagram-pin" d="M516 91v68M528 91v68M540 91v68" /><text className="diagram-control-text" x="552" y="130">ARDUINO</text>
    </svg>
  )
}

function ProjectDiagram({ project }: { project: Project }) {
  if (project.slug === 'spmamba-3-source') return <SPMambaDiagram />
  if (project.slug === 'edge-ai-stethoscope') return <StethoscopeDiagram />
  return <FaceDiagram />
}

export default function FeaturedWork({ projects }: Props) {
  const { language } = useLanguage()
  const vi = language === 'vi'
  return (
    <section className="home-section" aria-labelledby="selected-work-title">
      <div className="home-section-heading"><p className="home-eyebrow">01 / {vi ? 'Project tiêu biểu' : 'Selected work'}</p><h2 id="selected-work-title">{vi ? 'Project được ghi chép rõ ràng, đúng mức.' : 'Selected work, documented precisely.'}</h2></div>
      <div className="featured-work-grid">
        {projects.map((project, index) => <article className={`project-card ${art(project)}`} key={project.slug}>
          <div className="project-art" aria-hidden="true"><span className="project-art-index">0{index + 1}</span><ProjectDiagram project={project} /></div>
          <div className="project-card-body"><p className="project-meta">{project.domainIds.join(' · ')} · {status(project, vi)}</p><h3>{project.title}</h3><p>{vi ? projectVi[project.slug]?.summary ?? project.summary : project.summary}</p><Link className="project-link" href={`/projects/${project.slug}`}>{vi ? 'Xem chi tiết project' : 'Read project detail'} <span aria-hidden="true">↗</span></Link></div>
        </article>)}
      </div>
    </section>
  )
}

