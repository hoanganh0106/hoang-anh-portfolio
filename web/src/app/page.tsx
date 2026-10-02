import Link from 'next/link'
import { siteUrl } from '@/lib/site-config'
import { publishedProjects } from '@/lib/projects'
import EditorialHero from '@/components/home/EditorialHero'
import FeaturedWork from '@/components/home/FeaturedWork'
import CinematicPath from '@/components/home/CinematicPath.client'
import LovableSystemMap from '@/components/system-map/LovableSystemMap'
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
        <p><Localized en="I am learning by moving across layers: understanding how systems communicate, how models handle signals, and how computation reaches constrained hardware." vi="Tôi học bằng cách đi xuyên qua các lớp của hệ thống: hiểu cách systems giao tiếp, cách models xử lý signals và cách computation đi tới constrained hardware." /></p>
      </section>
      <CinematicPath />
      <section className="home-map-section" aria-labelledby="domains-title">
        <div className="home-section-heading">
          <p className="home-eyebrow"><Localized en="04 / Secondary constellation" vi="04 / Constellation mở rộng" /></p>
          <h2 id="domains-title"><Localized en="Explore the domains" vi="Khám phá các hướng kỹ thuật" /></h2>
          <p><Localized en="Current work and future directions, connected through projects, research, and learning paths." vi="Các công việc hiện tại và hướng phát triển tiếp theo, được nối với nhau qua projects, research và learning paths." /></p>
        </div>
        <LovableSystemMap />
      </section>
      <section className="home-lower-grid">
        <div>
          <p className="home-eyebrow"><Localized en="05 / Research note" vi="05 / Ghi chú research" /></p>
          <h2><Localized en="Speech separation remains an open working question." vi="Speech separation vẫn là một câu hỏi research đang tiếp tục được giải quyết." /></h2>
          <p><Localized en="SPMamba and MossFormer 2 are documented as research summaries. No public paper, code, metrics, or empirical results are claimed here." vi="SPMamba và MossFormer 2 được ghi lại dưới dạng research summaries. Phần này không tuyên bố có public paper, code, metrics hay empirical results." /></p>
          <Link className="text-link" href="/research"><Localized en="Read research notes" vi="Đọc ghi chú research" /></Link>
        </div>
        <div>
          <p className="home-eyebrow"><Localized en="06 / Direction" vi="06 / Định hướng" /></p>
          <dl className="direction-list">
            <div><dt><Localized en="Current" vi="Hiện tại" /></dt><dd>Systems, Edge AI, research, electronics</dd></div>
            <div><dt><Localized en="Exploring" vi="Đang khám phá" /></dt><dd>Signal processing and embedded systems</dd></div>
            <div><dt><Localized en="Future" vi="Tiếp theo" /></dt><dd>UAV Navigation / GPS-GNSS, IC Design, FPGA, PCB, RF / Antenna</dd></div>
          </dl>
        </div>
      </section>
    </div>
  )
}
