import Link from 'next/link'
import { siteUrl } from '@/lib/site-config'
import { publishedProjects } from '@/lib/projects'
import EditorialHero from '@/components/home/EditorialHero'
import FeaturedWork from '@/components/home/FeaturedWork'
import CinematicPath from '@/components/home/CinematicPath.client'
import Localized from '@/components/language/Localized'

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
        <p className="home-eyebrow"><Localized en="02 / Focus" vi="02 / Trọng tâm" /></p>
        <h2 id="focus-title"><Localized en="From Linux and networking, through models and signal processing, toward physical systems." vi="Từ Linux và networking, qua models và signal processing, tiến dần tới physical systems." /></h2>
        <p><Localized en="I work across layers: how systems communicate, how models handle signals, and how computation reaches constrained hardware." vi="Tôi làm việc xuyên qua các lớp: cách systems giao tiếp, cách models xử lý signals và cách computation đi tới constrained hardware." /></p>
      </section>
      <CinematicPath />
      <section className="home-lower-grid" aria-label="Research notes and technical direction">
        <article aria-labelledby="research-note-title">
          <p className="home-eyebrow"><Localized en="04 / Research note" vi="04 / Ghi chú research" /></p>
          <h2 id="research-note-title"><Localized en="Speech separation remains an open question I am actively studying." vi="Speech separation vẫn là câu hỏi tôi đang tiếp tục nghiên cứu." /></h2>
          <p><Localized en="SPMamba and MossFormer 2 are documented as research summaries. No public paper, code, metrics, or empirical results are claimed here." vi="SPMamba và MossFormer 2 được ghi lại dưới dạng research summaries. Phần này không tuyên bố có public paper, code, metrics hay empirical results." /></p>
          <Link className="text-link" href="/research"><Localized en="Read research notes" vi="Đọc ghi chú research" /></Link>
        </article>
        <article aria-labelledby="direction-title">
          <p className="home-eyebrow"><Localized en="05 / Direction" vi="05 / Định hướng" /></p>
          <h2 id="direction-title" className="sr-only"><Localized en="Current technical direction" vi="Định hướng kỹ thuật hiện tại" /></h2>
          <dl className="direction-list">
            <div><dt><Localized en="Current" vi="Hiện tại" /></dt><dd><Localized en="Systems, Edge AI, research, electronics" vi="Systems, Edge AI, research, electronics" /></dd></div>
            <div><dt><Localized en="Exploring" vi="Đang khám phá" /></dt><dd><Localized en="Signal processing and embedded systems" vi="Signal processing và embedded systems" /></dd></div>
            <div><dt><Localized en="Future" vi="Tiếp theo" /></dt><dd><Localized en="UAV Navigation / GPS-GNSS, IC Design, FPGA, PCB, RF / Antenna" vi="UAV Navigation / GPS-GNSS, IC Design, FPGA, PCB, RF / Antenna" /></dd></div>
          </dl>
        </article>
      </section>
    </div>
  )
}
