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

const xOffsets = [-17, 14, -10, 16, 0]

export default function CinematicPath() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { language } = useLanguage()
  const vi = language === 'vi'

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const smallScreen = window.matchMedia('(max-width: 767px)')
    let frame = 0
    let desiredPosition = 0
    let smoothPosition = 0
    let lastActive = -1

    const readTarget = () => {
      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / travel))
      desiredPosition = progress * (waypoints.length - 1)
    }

    const paint = () => {
      frame = 0
      const motionEnabled = !reduceMotion.matches && !smallScreen.matches
      section.dataset.enhanced = motionEnabled ? 'true' : 'false'
      if (!motionEnabled) return

      const delta = desiredPosition - smoothPosition
      smoothPosition += delta * 0.075
      if (Math.abs(delta) < 0.0008) smoothPosition = desiredPosition

      const progress = smoothPosition / (waypoints.length - 1)
      const nextActive = Math.min(waypoints.length - 1, Math.max(0, Math.round(smoothPosition)))
      section.style.setProperty('--journey-progress', progress.toFixed(4))

      if (nextActive !== lastActive) {
        lastActive = nextActive
        section.dataset.active = String(nextActive)
        setActive(nextActive)
      }

      section.querySelectorAll<HTMLElement>('[data-journey-node]').forEach((node, index) => {
        const phase = index - smoothPosition
        const absolute = Math.abs(phase)
        const z = phase < 0 ? 130 + phase * 430 : 130 - phase * 340
        const x = xOffsets[index] * (0.34 + Math.min(absolute, 1.35) * 0.34)
        const y = phase * 142
        const opacity = Math.max(0.12, 1 - absolute * 0.31)
        const blur = Math.max(0, absolute - 1.3) * 0.85
        const scale = Math.max(0.72, 1 - absolute * 0.055)

        node.style.transform = `translate3d(${x}vw, ${y}px, ${z}px) rotateX(${(-phase * 2.6).toFixed(2)}deg) rotateY(${(x * -0.1).toFixed(2)}deg) scale(${scale.toFixed(3)})`
        node.style.opacity = opacity.toFixed(3)
        node.style.filter = `blur(${blur.toFixed(2)}px)`
        node.style.zIndex = String(100 - Math.round(absolute * 8))
        node.toggleAttribute('data-current', index === nextActive)
      })

      const near = section.querySelector<HTMLElement>('[data-star-layer="near"]')
      const far = section.querySelector<HTMLElement>('[data-star-layer="far"]')
      if (near) near.style.transform = `translate3d(0,${(-progress * 105).toFixed(1)}px,90px) scale(${(1 + progress * 0.08).toFixed(3)})`
      if (far) far.style.transform = `translate3d(0,${(-progress * 42).toFixed(1)}px,-130px) scale(${(1 + progress * 0.035).toFixed(3)})`

      if (Math.abs(desiredPosition - smoothPosition) > 0.0008) frame = requestAnimationFrame(paint)
    }

    const schedule = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(paint)
    }

    readTarget()
    smoothPosition = desiredPosition
    paint()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduceMotion.addEventListener('change', schedule)
    smallScreen.addEventListener('change', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduceMotion.removeEventListener('change', schedule)
      smallScreen.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <section ref={sectionRef} className="cinematic-path" aria-labelledby="journey-title" data-active="0" data-enhanced="false">
      <div className="cinematic-path__sticky">
        <header className="cinematic-path__heading">
          <p className="home-eyebrow">03 / {vi ? 'Hành trình chiều sâu' : 'Deep path'}</p>
          <div>
            <h2 id="journey-title">{vi ? 'Đi xuyên qua stack.' : 'Through the stack.'}</h2>
            <p>{vi ? 'Scroll để đi qua những systems đang định hình hành trình kỹ thuật hiện tại.' : 'Scroll forward through the systems that currently shape the engineering path.'}</p>
          </div>
        </header>

        <div className="cinematic-path__stage">
          <div className="cinematic-stars cinematic-stars--far" data-star-layer="far" aria-hidden="true" />
          <div className="cinematic-stars cinematic-stars--near" data-star-layer="near" aria-hidden="true" />
          <div className="cinematic-orbit cinematic-orbit--a" aria-hidden="true" />
          <div className="cinematic-orbit cinematic-orbit--b" aria-hidden="true" />
          <div className="cinematic-axis" aria-hidden="true"><span /></div>

          <div className="cinematic-path__nodes">
            {waypoints.map((waypoint, index) => (
              <Link key={waypoint.title} href={waypoint.href} className="cinematic-node" data-journey-node data-step={index} aria-hidden="true" tabIndex={-1}>
                <span className="cinematic-node__code">{waypoint.code}</span>
                <span className="cinematic-node__index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{waypoint.title}</strong>
                <p>{vi ? waypoint.noteVi : waypoint.note}</p>
                <span className="cinematic-node__link">{vi ? 'Mở node' : 'Explore node'} <b aria-hidden="true">↗</b></span>
              </Link>
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
