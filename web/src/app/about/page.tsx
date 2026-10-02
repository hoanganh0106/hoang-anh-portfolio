import type { Metadata } from 'next'
import { directions } from '@/lib/directions'
import { PageShell } from '@/components/layout/PageShell'
import { siteConfig, siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About',
  description: 'The learning journey from systems toward IC design — Hoang Anh Nguyen.',
  alternates: { canonical: siteUrl ? `${siteUrl}/about/` : undefined },
}

const journey = [
  ['01', 'Systems', 'Started with Linux and the tooling around it — processes, filesystems, networking, build systems. The habit that came out of it: read one layer lower before guessing.'],
  ['02', 'Edge AI', 'Moved toward models that must run on constrained hardware, where memory, latency, and power are part of the problem statement rather than an afterthought.'],
  ['03', 'Research', 'Speech separation work brought a more careful way of working: define the change, train it, and describe only what was actually observed.'],
  ['04', 'Electronics', 'Coursework and lab practice in analog fundamentals, microcontrollers, and measurement — the physical side of the same systems.'],
]

export default function About() {
  return (
    <PageShell index="Section 04 / About" title="About" intro="Electronics & Telecommunications Engineering student. The path so far has moved downward through the stack: from software systems, to models on small hardware, to the circuits underneath.">
      <p className="label-mono mb-10">{siteConfig.name} · {siteConfig.institution} · {siteConfig.year}</p>
      <section>
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight">Learning journey</h2>
        <ol className="mt-6 space-y-8">{journey.map(([step, label, body]) => <li key={step} className="grid gap-3 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10"><span className="label-mono md:pt-1">{step}</span><div><h3 className="text-base font-medium">{label}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{body}</p></div></li>)}</ol>
      </section>
      <section id="exploring" className="mt-16 scroll-mt-32">
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight">Exploring</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Signal Processing and Embedded interests connect software models with measured physical systems.</p>
      </section>
      <section id="uav-navigation" className="mt-16 scroll-mt-32">
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight">UAV navigation / GPS-GNSS</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">A study direction focused on how autonomous aircraft know where they are and turn that estimate into reliable flight behavior. The learning path connects satellite positioning with onboard inertial sensing and flight-control logic.</p>
        <dl className="mt-6 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-background p-5"><dt className="label-mono">Position</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">GPS/GNSS fixes, coordinate frames, accuracy limits, update rate, and precision positioning with RTK.</dd></div>
          <div className="bg-background p-5"><dt className="label-mono">State estimation</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">Combining GNSS with IMU, barometer, and compass data through sensor fusion and EKF-based estimation.</dd></div>
          <div className="bg-background p-5"><dt className="label-mono">Autonomy</dt><dd className="mt-2 text-sm leading-relaxed text-muted-foreground">Waypoint navigation, geofencing, Return-to-Home, and integration with autopilot systems such as PX4 or ArduPilot.</dd></div>
        </dl>
        <p className="label-mono mt-5">Study direction · not presented as a completed UAV project</p>
      </section>
      <section id="future-directions" className="mt-16 scroll-mt-32">
        <span id="directions" className="relative -top-24 block" aria-hidden="true" />
        <h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight">Future directions</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">These are areas being studied, not completed projects.</p>
        <ul className="mt-6 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">{directions.map((direction) => <li key={direction.id} className="bg-background p-5"><div className="flex items-baseline justify-between gap-3"><h3 className="text-base font-medium">{direction.title}</h3><span className="label-mono">Planned</span></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{direction.note}</p></li>)}</ul>
      </section>
      {siteConfig.github && <section className="mt-16"><h2 className="border-b border-rule pb-3 text-xl font-semibold tracking-tight">Connect &amp; follow</h2><a className="label-mono mt-5 inline-block hover:text-accent" href={siteConfig.github} target="_blank" rel="noreferrer">GitHub Profile ↗</a></section>}
    </PageShell>
  )
}
