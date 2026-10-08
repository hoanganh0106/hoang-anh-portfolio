import type { Metadata } from 'next'
import { directions } from '@/lib/directions'
import { PageShell } from '@/components/layout/PageShell'
import Localized from '@/components/language/Localized'
import { siteConfig, siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About',
  description: 'A learning journey from Linux and systems through edge AI and electronics toward IC design — Hoang Anh Nguyen.',
  alternates: { canonical: siteUrl ? `${siteUrl}/about/` : undefined },
}

const journey = [
  {
    step: '01', label: 'Systems',
    en: 'Started with Linux and the tooling around it — processes, filesystems, networking, build systems. The habit that came out of it: read one layer lower before guessing.',
    vi: 'Bắt đầu từ Linux và những tooling xung quanh — processes, filesystems, networking, build systems. Thói quen hình thành từ đó là luôn đọc sâu xuống một layer trước khi phỏng đoán.',
  },
  {
    step: '02', label: 'Edge AI',
    en: 'Moved toward models that must run on constrained hardware, where memory, latency, and power are part of the problem statement rather than an afterthought.',
    vi: 'Tiếp tục đi tới các models phải chạy trên constrained hardware, nơi memory, latency và power là một phần của problem statement chứ không phải phần bổ sung sau cùng.',
  },
  {
    step: '03', label: 'Research',
    en: 'Speech separation work brought a more careful way of working: define the change, train it, and describe only what was actually observed.',
    vi: 'Speech separation hình thành một cách làm research thận trọng hơn: xác định thay đổi, train, rồi chỉ mô tả đúng những gì thực sự quan sát được.',
  },
  {
    step: '04', label: 'Electronics',
    en: 'Coursework and lab practice in analog fundamentals, microcontrollers, and measurement — the physical side of the same systems.',
    vi: 'Coursework và lab practice về analog fundamentals, microcontrollers và measurement — mặt physical của cùng một hệ thống.',
  },
]

const directionVi: Record<string, string> = {
  pcb: 'Bước tiếp theo hướng tới việc thiết kế complete hardware systems.',
  fpga: 'Khám phá programmable digital hardware.',
  'rf-antenna': 'Hướng phát triển tiếp theo trong communications hardware.',
  uav: 'Khám phá GPS/GNSS positioning, IMU-aided state estimation, sensor fusion, waypoint navigation, Return-to-Home và hướng tới RTK precision.',
  'ic-design': 'Định hướng dài hạn của hành trình kỹ thuật.',
}

export default function About() {
  return (
    <PageShell
      index="Section 04 / About"
      title="About"
      intro="Electronics & Telecommunications Engineering student. The path so far has moved downward through the stack: from software systems, to models on small hardware, to the circuits underneath."
      indexVi="Phần 04 / Giới thiệu"
      titleVi="Giới thiệu"
      introVi="Sinh viên Kỹ thuật Điện tử & Viễn thông. Hành trình hiện tại đi dần xuống sâu hơn trong stack: từ software systems, tới models trên small hardware, rồi tới các circuits phía dưới."
    >
      <p className="label-mono mb-10">{siteConfig.name} · {siteConfig.institution} · {siteConfig.year}</p>
      <section>
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight"><Localized en="Learning journey" vi="Hành trình học tập" /></h2>
        <ol className="mt-6 space-y-8">{journey.map((item) => <li key={item.step} className="grid gap-3 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10"><span className="label-mono md:pt-1">{item.step}</span><div><h3 className="text-base font-medium">{item.label}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground"><Localized en={item.en} vi={item.vi} /></p></div></li>)}</ol>
      </section>

      <section id="exploring" className="mt-16 scroll-mt-32">
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight"><Localized en="Exploring" vi="Đang khám phá" /></h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground"><Localized en="Signal Processing and Embedded interests connect software models with measured physical systems." vi="Signal Processing và Embedded Systems là cầu nối giữa software models với những physical systems có thể đo lường được." /></p>
      </section>

      <section id="uav-navigation" className="mt-16 scroll-mt-32">
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight">UAV Navigation / GPS-GNSS</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground"><Localized en="A study direction focused on how autonomous aircraft know where they are and turn that estimate into reliable flight behavior. The learning path connects satellite positioning with onboard inertial sensing and flight-control logic." vi="Một hướng nghiên cứu tập trung vào cách autonomous aircraft xác định vị trí và biến position estimate thành flight behavior đáng tin cậy. Learning path này nối satellite positioning với onboard inertial sensing và flight-control logic." /></p>
        <dl className="mt-6 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-background p-5"><dt className="label-mono">Position</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground"><Localized en="GPS/GNSS fixes, coordinate frames, accuracy limits, update rate, and precision positioning with RTK." vi="GPS/GNSS fixes, coordinate frames, giới hạn accuracy, update rate và precision positioning với RTK." /></dd></div>
          <div className="bg-background p-5"><dt className="label-mono">State estimation</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground"><Localized en="Combining GNSS with IMU, barometer, and compass data through sensor fusion and EKF-based estimation." vi="Kết hợp GNSS với IMU, barometer và compass data thông qua sensor fusion và EKF-based estimation." /></dd></div>
          <div className="bg-background p-5"><dt className="label-mono">Autonomy</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground"><Localized en="Waypoint navigation, geofencing, Return-to-Home, and integration with autopilot systems such as PX4 or ArduPilot." vi="Waypoint navigation, geofencing, Return-to-Home và tích hợp với autopilot systems như PX4 hoặc ArduPilot." /></dd></div>
        </dl>
        <p className="label-mono mt-5"><Localized en="Study direction · not presented as a completed UAV project" vi="Hướng nghiên cứu · không trình bày như một UAV project đã hoàn thành" /></p>
      </section>

      <section id="future-directions" className="mt-16 scroll-mt-32">
        <span id="directions" className="relative -top-24 block" aria-hidden="true" />
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight"><Localized en="Future directions" vi="Hướng phát triển tiếp theo" /></h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground"><Localized en="These are areas being studied, not completed projects." vi="Đây là những hướng đang được học và nghiên cứu, không phải completed projects." /></p>
        <ul className="mt-6 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">{directions.map((direction) => <li key={direction.id} className="bg-background p-5"><div className="flex items-baseline justify-between gap-3"><h3 className="text-base font-medium">{direction.title}</h3><span className="label-mono"><Localized en="Planned" vi="Kế hoạch" /></span></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground"><Localized en={direction.note} vi={directionVi[direction.id] ?? direction.note} /></p></li>)}</ul>
      </section>

      {siteConfig.github && <section className="mt-16"><h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight"><Localized en="Connect & follow" vi="Kết nối & theo dõi" /></h2><a className="label-mono mt-5 inline-block hover:text-accent" href={siteConfig.github} target="_blank" rel="noreferrer">GitHub Profile ↗</a></section>}
    </PageShell>
  )
}
