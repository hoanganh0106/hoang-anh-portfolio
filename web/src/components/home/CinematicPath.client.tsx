'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/language/LanguageProvider'

const waypoints = [
  { title: 'Systems', code: 'SYS-01', href: '/projects?domain=systems', note: 'Linux, networking, infrastructure, and the discipline of understanding the layer below.', noteVi: 'Linux, networking, infrastructure và thói quen luôn đọc sâu xuống lớp bên dưới trước khi phỏng đoán.' },
  { title: 'Edge AI', code: 'AI-02', href: '/projects?domain=edge-ai', note: 'Models move out of the cloud and onto constrained devices where latency, memory, and power matter.', noteVi: 'Models rời cloud để chạy trên constrained devices, nơi latency, memory và power trở thành một phần của bài toán.' },
  { title: 'Electronics', code: 'ELEC-03', href: '/projects?domain=electronics', note: 'Signals become physical: sensing, microcontrollers, measurement, and embedded interfaces.', noteVi: 'Signals trở thành physical: sensing, microcontrollers, measurement và embedded interfaces.' },
  { title: 'UAV Navigation', code: 'NAV-04', href: '/about#uav-navigation', note: 'GPS/GNSS, IMU-aided estimation, sensor fusion, waypoints, Return-to-Home, and precision RTK.', noteVi: 'GPS/GNSS, IMU-aided estimation, sensor fusion, waypoints, Return-to-Home và RTK precision.' },
  { title: 'IC Design', code: 'IC-05', href: '/about#future-directions', note: 'A longer-term descent toward deeper hardware, digital logic, RF, and silicon-level thinking.', noteVi: 'Hướng dài hạn đi sâu hơn vào hardware, digital logic, RF và tư duy ở silicon level.' },
] as const

const xOffsets = [-14, 11, -9, 13, 0]

const clamp = (value: number) => Math.max(0, Math.min(1, value))

export default function CinematicPath() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { language } = useLanguage()
  const vi = language === 'vi'

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact = window.matchMedia('(max-width: 767px)')
    let raf = 0
    let lastActive = -1
    let animations: Animation[] = []

    const stopAnimations = () => {
      animations.forEach((animation) => animation.cancel())
      animations = []
    }

    const setup = () => {
      stopAnimations()
      const enabled = !reduced.matches && !compact.matches
      section.dataset.enhanced = enabled ? 'true' : 'false'
      if (!enabled) return

      const nodes = Array.from(section.querySelectorAll<HTMLElement>('[data-journey-node]'))
      animations = nodes.map((node, index) => {
        const x = xOffsets[index]
        const animation = node.animate([
          {
            offset: 0,
            transform: `translate3d(${x * 1.65}vw, 220px, -1180px) rotateX(5deg) rotateY(${-x * 0.48}deg) scale(.54)`,
            opacity: 0.03,
          },
          {
            offset: 0.34,
            transform: `translate3d(${x * 0.72}vw, 84px, -520px) rotateX(2deg) rotateY(${-x * 0.24}deg) scale(.78)`,
            opacity: 0.34,
          },
          {
            offset: 0.5,
            transform: 'translate3d(0, 0, 90px) rotateX(0deg) rotateY(0deg) scale(1)',
            opacity: 1,
          },
          {
            offset: 0.6,
            transform: `translate3d(${-x * 0.16}vw, -38px, 180px) rotateX(-1.5deg) rotateY(${x * 0.08}deg) scale(1.02)`,
            opacity: 0.22,
          },
          {
            offset: 0.7,
            transform: `translate3d(${-x * 0.28}vw, -86px, 300px) rotateX(-3deg) rotateY(${x * 0.13}deg) scale(1.04)`,
            opacity: 0,
          },
          {
            offset: 1,
            transform: `translate3d(${-x * 0.42}vw, -160px, 430px) rotateX(-5deg) rotateY(${x * 0.18}deg) scale(1.06)`,
            opacity: 0,
          },
        ], { duration: 1000, fill: 'both', easing: 'linear' })
        animation.pause()
        return animation
      })
    }

    const update = () => {
      raf = 0
      if (section.dataset.enhanced !== 'true') return

      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = clamp(-rect.top / travel)
      const position = progress * (waypoints.length - 1)
      const nextActive = Math.min(waypoints.length - 1, Math.max(0, Math.round(position)))

      section.style.setProperty('--journey-progress', progress.toFixed(4))

      animations.forEach((animation, index) => {
        const local = clamp(0.5 + (position - index) * 0.33)
        animation.currentTime = local * 1000
      })

      section.querySelectorAll<HTMLElement>('[data-journey-node]').forEach((node, index) => {
        node.toggleAttribute('data-current', index === nextActive)
      })

      if (nextActive !== lastActive) {
        lastActive = nextActive
        section.dataset.active = String(nextActive)
        setActive(nextActive)
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const reconfigure = () => {
      setup()
      schedule()
    }

    setup()
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', reconfigure)
    compact.addEventListener('change', reconfigure)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      stopAnimations()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', reconfigure)
      compact.removeEventListener('change', reconfigure)
    }
  }, [])

  return (
    <section ref={sectionRef} className="cinematic-path cinematic-path--v2" aria-labelledby="journey-title" data-active="0" data-enhanced="false">
      <div className="cinematic-path__sticky">
        <header className="cinematic-path__heading">
          <p className="home-eyebrow">03 / {vi ? 'Hành trình chiều sâu' : 'Deep path'}</p>
          <div>
            <h2 id="journey-title">{vi ? 'Đi xuyên qua stack.' : 'Through the stack.'}</h2>
            <p>{vi ? 'Scroll để camera đi qua từng layer — từ Systems tới IC Design.' : 'Scroll the camera through each layer — from Systems toward IC Design.'}</p>
          </div>
        </header>

        <div className="cinematic-path__stage">
          <div className="cinematic-depth-bg" aria-hidden="true" />
          <div className="cinematic-tunnel" aria-hidden="true">
            <i className="cinematic-frame cinematic-frame--1" />
            <i className="cinematic-frame cinematic-frame--2" />
            <i className="cinematic-frame cinematic-frame--3" />
            <i className="cinematic-frame cinematic-frame--4" />
            <i className="cinematic-frame cinematic-frame--5" />
            <span className="cinematic-vanishing-point" />
          </div>
          <div className="cinematic-rail cinematic-rail--left" aria-hidden="true" />
          <div className="cinematic-rail cinematic-rail--right" aria-hidden="true" />

          <div className="cinematic-path__nodes">
            {waypoints.map((waypoint, index) => (
              <div className="cinematic-node-anchor" key={waypoint.title}>
                <Link href={waypoint.href} className="cinematic-node" data-journey-node data-step={index} aria-hidden="true" tabIndex={-1}>
                  <span className="cinematic-node__code">{waypoint.code}</span>
                  <span className="cinematic-node__index">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{waypoint.title}</strong>
                  <p>{vi ? waypoint.noteVi : waypoint.note}</p>
                  <span className="cinematic-node__link">{vi ? 'Mở node' : 'Explore node'} <b aria-hidden="true">↗</b></span>
                </Link>
              </div>
            ))}
          </div>

          <aside className="cinematic-hud" aria-label={vi ? 'Vị trí hiện tại trong hành trình' : 'Current path position'}>
            <div className="cinematic-hud__readout"><span>{vi ? 'Layer hiện tại' : 'Current layer'}</span><strong>{waypoints[active].title}</strong></div>
            <ol>{waypoints.map((waypoint, index) => <li key={waypoint.code} className={active === index ? 'is-active' : ''}><span>{String(index + 1).padStart(2, '0')}</span><Link href={waypoint.href} aria-current={active === index ? 'step' : undefined}>{waypoint.title}</Link></li>)}</ol>
          </aside>

          <p className="cinematic-path__counter" aria-hidden="true"><span>{String(active + 1).padStart(2, '0')}</span><i /><span>{String(waypoints.length).padStart(2, '0')}</span></p>
        </div>
      </div>
    </section>
  )
}
