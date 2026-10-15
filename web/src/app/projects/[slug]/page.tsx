import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projectsByTrack, publishedProjects, trackLabel } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'
import Localized, { Tx } from '@/components/language/Localized'
import DeviceArt, { hasDeviceArt } from '@/components/devices/DeviceArt'
import { StatusPill } from '@/components/devices/DeviceCard'

export const dynamicParams = false

export function generateStaticParams() {
  return publishedProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return { title: 'Not found' }
  return {
    title: p.title.en,
    description: p.summary.en,
    alternates: siteUrl ? { canonical: `${siteUrl}/projects/${p.slug}/` } : undefined,
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()
  const isDevice = p.track === 'device'
  const others = projectsByTrack('device').filter(x => x.slug !== p.slug)

  return (
    <article className="detail container">
      <nav className="detail__crumb" aria-label="Breadcrumb">
        <Link className="text-link" href="/projects">← <Localized en="All devices and work" vi="Tất cả thiết bị và dự án" /></Link>
      </nav>

      <header className={`detail__header ${hasDeviceArt(p.slug) ? 'detail__header--art' : ''}`}>
        <div>
          <p className="eyebrow"><Tx t={trackLabel[p.track]} /></p>
          <h1><Tx t={p.title} /></h1>
          <p className="detail__lede"><Tx t={p.summary} /></p>
          <div className="detail__meta">
            <StatusPill status={p.status} />
            {p.event && <span className="detail__event"><Tx t={p.event} /></span>}
          </div>
        </div>
        {hasDeviceArt(p.slug) && (
          <figure className="detail__figure">
            <DeviceArt slug={p.slug} />
            <figcaption><Localized en="Design illustration" vi="Minh họa thiết kế" /></figcaption>
          </figure>
        )}
      </header>

      {p.forWhom && (
        <section className="callout" aria-labelledby="for-title">
          <h2 id="for-title"><Localized en="Who it is for" vi="Dành cho ai" /></h2>
          <p><Tx t={p.forWhom} /></p>
        </section>
      )}

      {p.pipeline && (
        <section className="detail__section" aria-labelledby="pipeline-title">
          <h2 id="pipeline-title"><Localized en="How it works" vi="Cách hoạt động" /></h2>
          <ol className="pipeline">
            {p.pipeline.map((step, index) => (
              <li key={step.en}><span aria-hidden="true">{index + 1}</span><Tx t={step} /></li>
            ))}
          </ol>
        </section>
      )}

      <div className="detail__columns">
        <section className="detail__section" aria-labelledby="overview-title">
          <h2 id="overview-title"><Localized en={isDevice ? 'In detail' : 'Overview'} vi={isDevice ? 'Chi tiết' : 'Tổng quan'} /></h2>
          <p><Tx t={p.overview} /></p>
          <h3><Localized en="My part" vi="Phần tôi thực hiện" /></h3>
          <ul className="bullets">
            {p.contribution.map(item => <li key={item.en}><Tx t={item} /></li>)}
          </ul>
        </section>

        <aside className="detail__aside">
          {p.hardware && (
            <section aria-labelledby="hardware-title">
              <h2 id="hardware-title"><Localized en="Hardware design" vi="Thiết kế phần cứng" /></h2>
              <ul className="bullets">
                {p.hardware.map(item => <li key={item.en}><Tx t={item} /></li>)}
              </ul>
            </section>
          )}
          <section aria-labelledby="tech-title">
            <h2 id="tech-title"><Localized en="Technology" vi="Công nghệ" /></h2>
            <ul className="chips">
              {p.technologies.map(tech => <li key={tech}>{tech}</li>)}
            </ul>
          </section>
          {p.links?.github && (
            <a className="button" href={p.links.github} target="_blank" rel="noreferrer"><Localized en="View on GitHub" vi="Xem trên GitHub" /> ↗</a>
          )}
        </aside>
      </div>

      {p.note && (
        <p className="notice" role="note"><strong><Localized en="Status note" vi="Lưu ý" /></strong> <Tx t={p.note} /></p>
      )}

      {isDevice && others.length > 0 && (
        <section className="detail__section" aria-labelledby="more-title">
          <h2 id="more-title"><Localized en="Other devices" vi="Thiết bị khác" /></h2>
          <ul className="related">
            {others.map(x => (
              <li key={x.slug}>
                <Link href={`/projects/${x.slug}`}>
                  <StatusPill status={x.status} />
                  <strong><Tx t={x.title} /></strong>
                  <span><Tx t={x.summary} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
