import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { DeviceCard, WorkRow } from '@/components/devices/DeviceCard'
import { Tx } from '@/components/language/Localized'
import { projectsByTrack, trackLabel } from '@/lib/projects'
import { siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Devices',
  description: 'Low-cost medical devices with on-device AI, the research behind them, and earlier engineering work.',
  alternates: { canonical: siteUrl ? `${siteUrl}/projects/` : undefined },
}

export default function Projects() {
  const devices = projectsByTrack('device')
  return (
    <PageShell
      eyebrow={{ en: 'Devices & work', vi: 'Thiết bị & dự án' }}
      title={{ en: 'Four devices, one goal: good screening anywhere.', vi: 'Bốn thiết bị, một mục tiêu: sàng lọc tốt ở bất cứ đâu.' }}
      intro={{
        en: 'Each device is labelled with its real stage. Below them is the research they are built on and the earlier work that led here.',
        vi: 'Mỗi thiết bị được ghi rõ giai đoạn thực tế. Bên dưới là phần nghiên cứu làm nền và các dự án trước đây đã dẫn tôi tới đây.',
      }}
    >
      <section aria-labelledby="track-device" className="track">
        <h2 id="track-device" className="sr-only"><Tx t={trackLabel.device} /></h2>
        <div className="device-grid device-grid--two">
          {devices.map(project => <DeviceCard key={project.slug} project={project} />)}
        </div>
      </section>
      {(['research', 'other'] as const).map(track => (
        <section key={track} aria-labelledby={`track-${track}`} className="track">
          <h2 id={`track-${track}`} className="track__title"><Tx t={trackLabel[track]} /></h2>
          <ul className="work-list">
            {projectsByTrack(track).map(project => <WorkRow key={project.slug} project={project} />)}
          </ul>
        </section>
      ))}
    </PageShell>
  )
}
