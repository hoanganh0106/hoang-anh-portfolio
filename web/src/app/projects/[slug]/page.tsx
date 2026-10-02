import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, publishedProjects } from '@/lib/projects'
import { domains } from '@/lib/domains'
import { siteUrl } from '@/lib/site-config'

export const dynamicParams = false

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

  const related = publishedProjects()
    .filter((x) => x.slug !== p.slug && x.domainIds.some((id) => p.domainIds.includes(id)))
    .slice(0, 3)

  return (
    <article className="container detail">
      <nav className="detail__breadcrumb" aria-label="Breadcrumb">
        <Link className="text-link" href="/projects">
          ← All projects
        </Link>
      </nav>

      <header className="detail__header">
        <div className="badge-row">
          <span className="eyebrow">{p.kind.toUpperCase()}</span>
          {p.status && <span className="status-pill">{p.status.toUpperCase()}</span>}
          <span className="disclosure-pill">{p.disclosure === 'summary-only' ? 'SUMMARY DISCLOSURE' : 'PUBLIC REPO'}</span>
        </div>
        <h1 className="detail__title">{p.title}</h1>
        <p className="lede">{p.summary}</p>

        <div className="detail__meta-strip">
          <div>
            <span className="technical-label">DOMAINS</span>
            <p>{p.domainIds.map((id) => domains[id]?.label ?? id).join(' · ')}</p>
          </div>
          {p.event && (
            <div>
              <span className="technical-label">PRESENTATION / VENUE</span>
              <p>{p.event}</p>
            </div>
          )}
          <div>
            <span className="technical-label">RECORD LEVEL</span>
            <p>{p.disclosure === 'public' ? 'Open-source Artifact' : 'Academic Research Note'}</p>
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
          <figcaption>Conceptual waveform visual; it does not represent measured data or results.</figcaption>
        </figure>
      )}

      {p.slug === 'edge-ai-stethoscope' && (
        <section className="detail__pipeline-section">
          <h2>Concept pipeline</h2>
          <ol className="pipeline">
            {p.pipeline?.map((step, idx) => (
              <li key={step} className="pipeline__item">
                <span className="pipeline__num">0{idx + 1}</span>
                <span className="pipeline__name">{step}</span>
              </li>
            ))}
          </ol>
          <p className="meta">Conceptual pipeline for a research prototype; clinical validation is not claimed.</p>
        </section>
      )}

      {p.overview && (
        <section className="detail__overview">
          <h2>Project overview</h2>
          <p>{p.overview}</p>
        </section>
      )}

      <section className="detail__section">
        <h2>What I built</h2>
        <ul className="bullet-list">
          {p.contribution.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      {/* Architecture & Structure */}
      {p.architecture && p.architecture.length > 0 && (
        <section className="detail__section">
          <h2>Architecture &amp; System Flow</h2>
          <ul className="bullet-list">
            {p.architecture.map((arch) => (
              <li key={arch}>{arch}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="detail__section">
        <h2>Technical outline</h2>
        <div className="tech-chip-grid">
          {p.technologies.map((tech) => <span key={tech} className="tech-chip">{tech}</span>)}
        </div>
        {p.event && <p className="meta detail__event-note">{p.event}</p>}
      </section>

      {/* Key Learnings / Results */}
      {p.resultsOrLearnings && p.resultsOrLearnings.length > 0 && (
        <section className="detail__section">
          <h2>Insights &amp; Observations</h2>
          <ul className="bullet-list">
            {p.resultsOrLearnings.map((res) => (
              <li key={res}>{res}</li>
            ))}
          </ul>
        </section>
      )}

      {p.disclosureNote && (
        <section className="detail__section detail__disclosure-box">
          <h2>Disclosure &amp; Project Status</h2>
          <p className="meta">{p.disclosureNote}</p>
        </section>
      )}

      {p.links && Object.keys(p.links).length > 0 && (
        <section className="detail__section">
          <h2>Links</h2>
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
          <h2>Related projects</h2>
          <div className="related-grid">
            {related.map((x) => (
              <Link key={x.slug} href={`/projects/${x.slug}`} className="related-card">
                <span className="eyebrow">{x.kind.toUpperCase()}</span>
                <h3>{x.title}</h3>
                <p>{x.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="detail__footer-nav">
        <Link className="text-link" href="/projects">← Back to all projects</Link>
      </div>
    </article>
  )
}
