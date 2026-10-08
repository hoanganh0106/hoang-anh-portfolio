import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, publishedProjects } from '@/lib/projects'
import { domains } from '@/lib/domains'
import { siteUrl } from '@/lib/site-config'
import Localized from '@/components/language/Localized'
import { projectVi } from '@/lib/project-i18n'

export const dynamicParams = false

function statusCopy(status: string, language: 'en' | 'vi') {
  if (language === 'vi') {
    if (status === 'in-progress') return 'Đang thực hiện'
    if (status === 'completed') return 'Hoàn thành'
    return 'Tạm dừng'
  }
  if (status === 'in-progress') return 'In progress'
  if (status === 'completed') return 'Completed'
  return 'Paused'
}

export function generateStaticParams() {
  return publishedProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return { title: 'Project not found' }

  return {
    title: p.title,
    description: p.summary,
    alternates: siteUrl ? { canonical: `${siteUrl}/projects/${p.slug}/` } : undefined,
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()
  const viCopy = projectVi[p.slug]

  const related = publishedProjects()
    .filter((x) => x.slug !== p.slug && x.domainIds.some((id) => p.domainIds.includes(id)))
    .slice(0, 3)

  return (
    <article className="container detail">
      <nav className="detail__breadcrumb" aria-label="Breadcrumb">
        <Link className="text-link" href="/projects">
          ← <Localized en="All projects" vi="Tất cả project" />
        </Link>
      </nav>

      <header className="detail__header">
        <div className="badge-row">
          <span className="eyebrow">{p.kind.toUpperCase()}</span>
          {p.status && <span className="status-pill"><Localized en={statusCopy(p.status, 'en').toUpperCase()} vi={statusCopy(p.status, 'vi').toUpperCase()} /></span>}
          <span className="disclosure-pill"><Localized en={p.disclosure === 'summary-only' ? 'SUMMARY DISCLOSURE' : 'PUBLIC REPO'} vi={p.disclosure === 'summary-only' ? 'CHỈ CÔNG BỐ SUMMARY' : 'PUBLIC REPO'} /></span>
        </div>
        <h1 className="detail__title">{p.title}</h1>
        <p className="lede"><Localized en={p.summary} vi={viCopy?.summary ?? p.summary} /></p>

        <div className="detail__meta-strip">
          <div>
            <span className="technical-label">DOMAINS</span>
            <p>{p.domainIds.map((id) => domains[id]?.label ?? id).join(' · ')}</p>
          </div>
          {p.event && (
            <div>
              <span className="technical-label"><Localized en="PRESENTATION / VENUE" vi="TRÌNH BÀY / SỰ KIỆN" /></span>
              <p>{p.event}</p>
            </div>
          )}
          <div>
            <span className="technical-label"><Localized en="RECORD LEVEL" vi="MỨC CÔNG BỐ" /></span>
            <p>{p.disclosure === 'public' ? <Localized en="Open-source Artifact" vi="Open-source Artifact" /> : <Localized en="Academic Research Note" vi="Academic Research Note" />}</p>
          </div>
        </div>
      </header>

      {p.domainIds.includes('research') && (
        <figure className="signal-visual" aria-labelledby="wave-title">
          <div className="signal-visual__header">
            <span className="technical-label">CONCEPTUAL ACOUSTIC WAVEFORM</span>
            <span className="mono-caption">1 Mixture → 3 Conceptual Streams</span>
          </div>
          <svg viewBox="0 0 600 120" role="img" aria-labelledby="wave-title" className="signal-visual__svg">
            <title id="wave-title">Conceptual separated speech waveforms</title>
            <line x1="0" y1="30" x2="600" y2="30" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="600" y2="60" stroke="var(--border)" strokeWidth="0.75" />
            <line x1="0" y1="90" x2="600" y2="90" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
            <path d="M0 60 C35 10 55 110 90 60 S145 10 180 60 S235 110 270 60 S325 10 360 60 S415 110 450 60 S505 10 540 60 S575 110 600 60" fill="none" stroke="var(--accent)" strokeWidth="2" />
            <path d="M0 86 C40 60 60 110 100 86 S160 60 200 86 S260 110 300 86 S360 60 400 86 S460 110 500 86 S560 60 600 86" fill="none" stroke="var(--text)" strokeOpacity="0.45" strokeWidth="1.75" />
            <path d="M0 35 C50 70 80 15 130 45 S210 85 260 35 S340 75 390 35 S470 75 520 40 S570 15 600 45" fill="none" stroke="var(--trace)" strokeOpacity="0.7" strokeWidth="1.25" strokeDasharray="4 2" />
          </svg>
          <figcaption><Localized en="Conceptual waveform visual; it does not represent measured data or results." vi="Conceptual waveform visual; không đại diện cho measured data hay results." /></figcaption>
        </figure>
      )}

      {p.slug === 'edge-ai-stethoscope' && (
        <section className="detail__pipeline-section">
          <h2><Localized en="Concept pipeline" vi="Concept pipeline" /></h2>
          <ol className="pipeline">
            {p.pipeline?.map((step, idx) => (
              <li key={step} className="pipeline__item">
                <span className="pipeline__num">0{idx + 1}</span>
                <span className="pipeline__name">{step}</span>
              </li>
            ))}
          </ol>
          <p className="meta"><Localized en="Conceptual pipeline for a research prototype; clinical validation is not claimed." vi="Conceptual pipeline cho research prototype; không tuyên bố clinical validation." /></p>
        </section>
      )}

      {p.overview && (
        <section className="detail__overview">
          <h2><Localized en="Project overview" vi="Tổng quan project" /></h2>
          <p><Localized en={p.overview} vi={viCopy?.overview ?? p.overview} /></p>
        </section>
      )}

      <section className="detail__section">
        <h2><Localized en="What I built" vi="Những gì tôi đã xây dựng" /></h2>
        <ul className="bullet-list">
          {p.contribution.map((item, index) => <li key={item}><Localized en={item} vi={viCopy?.contribution?.[index] ?? item} /></li>)}
        </ul>
      </section>

      {/* Architecture & Structure */}
      {p.architecture && p.architecture.length > 0 && (
        <section className="detail__section">
          <h2><Localized en="Architecture & System Flow" vi="Architecture & System Flow" /></h2>
          <ul className="bullet-list">
            {p.architecture.map((arch) => (
              <li key={arch}>{arch}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="detail__section">
        <h2><Localized en="Technical outline" vi="Technical outline" /></h2>
        <div className="tech-chip-grid">
          {p.technologies.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}
        </div>
        {p.event && <p className="meta detail__event-note">{p.event}</p>}
      </section>

      {/* Key Learnings / Results */}
      {p.resultsOrLearnings && p.resultsOrLearnings.length > 0 && (
        <section className="detail__section">
          <h2><Localized en="Insights & Observations" vi="Nhận xét & quan sát" /></h2>
          <ul className="bullet-list">
            {p.resultsOrLearnings.map((res) => (
              <li key={res}>{res}</li>
            ))}
          </ul>
        </section>
      )}

      {p.disclosureNote && (
        <section className="detail__section detail__disclosure-box">
          <h2><Localized en="Disclosure & Project Status" vi="Mức công bố & trạng thái project" /></h2>
          <p className="meta"><Localized en={p.disclosureNote} vi={viCopy?.disclosureNote ?? p.disclosureNote} /></p>
        </section>
      )}

      {p.links && Object.keys(p.links).length > 0 && (
        <section className="detail__section">
          <h2><Localized en="Links" vi="Liên kết" /></h2>
          <div className="link-row">
            {Object.entries(p.links).map(([kind, url]) => (
              <a key={kind} className="action-button" href={url} target="_blank" rel="noreferrer">
                {kind === 'github' ? 'GitHub Repository' : kind} ↗
              </a>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="detail__section detail__related">
          <h2><Localized en="Related projects" vi="Project liên quan" /></h2>
          <div className="related-grid">
            {related.map((x) => (
              <Link key={x.slug} href={`/projects/${x.slug}`} className="related-card">
                <span className="eyebrow">{x.kind.toUpperCase()}</span>
                <h3>{x.title}</h3>
                <p><Localized en={x.summary} vi={projectVi[x.slug]?.summary ?? x.summary} /></p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="detail__footer-nav">
        <Link className="text-link" href="/projects">← <Localized en="Back to all projects" vi="Quay lại tất cả project" /></Link>
      </div>
    </article>
  )
}
