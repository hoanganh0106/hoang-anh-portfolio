import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/layout/PageShell'
import Localized, { Tx } from '@/components/language/Localized'
import { projectsByTrack } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Speech and audio source-separation research behind the acoustic medical devices.',
  alternates: { canonical: siteUrl ? `${siteUrl}/research/` : undefined },
}

const links = [
  { from: 'SPMamba / MossFormer 2', to: { en: 'Edge AI Stethoscope', vi: 'Ống nghe Edge AI' }, why: { en: 'Separate heart sounds from lung sounds in one recording.', vi: 'Tách tiếng tim khỏi tiếng phổi trong cùng một bản ghi.' } },
  { from: 'SPMamba / MossFormer 2', to: { en: 'Cough Listener', vi: 'Máy nghe tiếng ho' }, why: { en: 'Pull a cough out of speech and room noise.', vi: 'Tách tiếng ho khỏi giọng nói và tiếng ồn trong phòng.' } },
]

export default function Research() {
  return (
    <PageShell
      eyebrow={{ en: 'Research', vi: 'Nghiên cứu' }}
      title={{ en: 'Hearing one sound clearly when many overlap.', vi: 'Nghe rõ một âm thanh khi nhiều âm thanh chồng lên nhau.' }}
      intro={{
        en: 'My research is on source separation: splitting a mixed recording into the sounds that make it up. It started with speech and is now the core of the project’s acoustic devices.',
        vi: 'Hướng nghiên cứu của tôi là tách nguồn âm: tách một bản ghi bị trộn thành từng âm thanh tạo nên nó. Tôi bắt đầu với giọng nói, và giờ đây nó là phần lõi của các thiết bị âm thanh trong dự án.',
      }}
    >
      <ul className="research-cards">
        {projectsByTrack('research').map((project, index) => (
          <li key={project.slug}>
            <span className="research-cards__num" aria-hidden="true">R{index + 1}</span>
            <h2><Link href={`/projects/${project.slug}`}><Tx t={project.title} /></Link></h2>
            {project.event && <p className="research-cards__event"><Tx t={project.event} /></p>}
            <p><Tx t={project.overview} /></p>
            {project.note && <p className="fine-print"><Tx t={project.note} /></p>}
          </li>
        ))}
      </ul>

      <section className="track" aria-labelledby="bridge-title">
        <h2 id="bridge-title" className="track__title"><Localized en="From research to devices" vi="Từ nghiên cứu tới thiết bị" /></h2>
        <ul className="bridge">
          {links.map(item => (
            <li key={item.to.en}>
              <span className="chip-like">{item.from}</span>
              <span aria-hidden="true">→</span>
              <strong><Tx t={item.to} /></strong>
              <p><Tx t={item.why} /></p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  )
}
