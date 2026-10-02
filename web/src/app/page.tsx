import Link from 'next/link'
import { siteUrl } from '@/lib/site-config'
import { publishedProjects } from '@/lib/projects'
import EditorialHero from '@/components/home/EditorialHero'
import FeaturedWork from '@/components/home/FeaturedWork'
import CinematicPath from '@/components/home/CinematicPath.client'
import LovableSystemMap from '@/components/system-map/LovableSystemMap'

export const metadata = { alternates: { canonical: siteUrl ? `${siteUrl}/` : undefined } }

export default function Home() {
  const allProjects = publishedProjects()
  const featured = ['spmamba-3-source', 'edge-ai-stethoscope', 'face-recognition']
    .map(slug => allProjects.find(project => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))

  return (
    <div className="home-page">
      <EditorialHero />
      <FeaturedWork projects={featured} />
      <section className="home-focus" aria-labelledby="focus-title">
        <p className="home-eyebrow">02 / Focus</p>
        <h2 id="focus-title">From Linux and networking, through models and signal processing, toward physical systems.</h2>
        <p>I am learning by moving across layers: understanding how systems communicate, how models handle signals, and how computation reaches constrained hardware.</p>
      </section>
      <CinematicPath />
      <section className="home-map-section" aria-labelledby="domains-title">
        <div className="home-section-heading">
          <p className="home-eyebrow">04 / Secondary constellation</p>
          <h2 id="domains-title">Explore the domains</h2>
          <p>Current work and future directions, connected through projects, research, and learning paths.</p>
        </div>
        <LovableSystemMap />
      </section>
      <section className="home-lower-grid">
        <div>
          <p className="home-eyebrow">05 / Research note</p>
          <h2>Speech separation remains an open working question.</h2>
          <p>SPMamba and MossFormer 2 are documented as research summaries. No public paper, code, metrics, or empirical results are claimed here.</p>
          <Link className="text-link" href="/research">Read research notes</Link>
        </div>
        <div>
          <p className="home-eyebrow">06 / Direction</p>
          <dl className="direction-list">
            <div><dt>Current</dt><dd>Systems, edge AI, research, electronics</dd></div>
            <div><dt>Exploring</dt><dd>Signal processing and embedded systems</dd></div>
            <div><dt>Future</dt><dd>UAV navigation / GPS-GNSS, IC Design, FPGA, PCB, RF / Antenna</dd></div>
          </dl>
        </div>
      </section>
    </div>
  )
}

