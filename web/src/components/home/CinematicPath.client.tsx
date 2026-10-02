'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const waypoints = [
  { title: 'Systems', code: 'SYS-01', href: '/projects?domain=systems', note: 'Linux, networking, infrastructure, and the discipline of understanding the layer below.' },
  { title: 'Edge AI', code: 'AI-02', href: '/projects?domain=edge-ai', note: 'Models move out of the cloud and onto constrained devices where latency, memory, and power matter.' },
  { title: 'Electronics', code: 'ELEC-03', href: '/projects?domain=electronics', note: 'Signals become physical: sensing, microcontrollers, measurement, and embedded interfaces.' },
  { title: 'UAV Navigation', code: 'NAV-04', href: '/about#uav-navigation', note: 'GPS/GNSS, IMU-aided estimation, sensor fusion, waypoints, Return-to-Home, and precision RTK.' },
  { title: 'IC Design', code: 'IC-05', href: '/about#future-directions', note: 'A longer-term descent toward deeper hardware, digital logic, RF, and silicon-level thinking.' },
] as const

const xOffsets = [-21, 18, -13, 20, 0]

export default function CinematicPath() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const smallScreen = window.matchMedia('(max-width: 767px)')
    let frame = 0
    let lastActive = -1

    const update = () => {
      frame = 0
      const motionEnabled = !reduceMotion.matches && !smallScreen.matches
      section.dataset.enhanced = motionEnabled ? 'true' : 'false'
      if (!motionEnabled) return

      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / travel))
      const position = progress * (waypoints.length - 1)
      const nextActive = Math.min(waypoints.length - 1, Math.max(0, Math.round(position)))

      section.style.setProperty('--journey-progress', progress.toFixed(4))
      if (nextActive !== lastActive) {
        lastActive = nextActive
        section.dataset.active = String(nextActive)
        setActive(nextActive)
      }

      section.querySelectorAll<HTMLElement>('[data-journey-node]').forEach((node, index) => {
        const phase = index - position
        const absolute = Math.abs(phase)
        const z = phase < 0 ? 180 + phase * 900 : 180 - phase * 650
        const x = xOffsets[index] * (0.42 + Math.min(absolute, 1.25) * 0.46)
        const y = phase * 170
        const opacity = Math.max(0.05, 1 - absolute * 0.39)
        const blur = Math.max(0, absolute - 1.15) * 1.8
        const scale = phase < 0 ? Math.max(0.58, 1.04 + phase * 0.12) : Math.max(0.58, 1 - phase * 0.07)

        node.style.transform = `translate3d(${x}vw, ${y}px, ${z}px) rotateX(${(-phase * 5).toFixed(2)}deg) rotateY(${(x * -0.16).toFixed(2)}deg) scale(${scale.toFixed(3)})`
        node.style.opacity = opacity.toFixed(3)
        node.style.filter = `blur(${blur.toFixed(2)}px)`
        node.style.zIndex = String(100 - Math.round(absolute * 10))
        node.toggleAttribute('data-current', index === nextActive)
      })

      const near = section.querySelector<HTMLElement>('[data-star-layer="near"]')
      const far = section.querySelector<HTMLElement>('[data-star-layer="far"]')
      if (near) near.style.transform = `translate3d(0,${(-progress * 180).toFixed(1)}px,120px) scale(${(1 + progress * 0.14).toFixed(3)})`
      if (far) far.style.transform = `translate3d(0,${(-progress * 70).toFixed(1)}px,-180px) scale(${(1 + progress * 0.05).toFixed(3)})`
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduceMotion.addEventListener('change', schedule)
    smallScreen.addEventListener('change', schedule)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
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
          <p className="home-eyebrow">03 / Deep path</p>
          <div>
            <h2 id="journey-title">Through the stack.</h2>
            <p>Scroll forward through the systems that currently shape the engineering path.</p>
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
              <Link
                key={waypoint.title}
                href={waypoint.href}
                className="cinematic-node"
                data-journey-node
                data-step={index}
                aria-hidden="true"
                tabIndex={-1}
              >
                <span className="cinematic-node__code">{waypoint.code}</span>
                <span className="cinematic-node__index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{waypoint.title}</strong>
                <p>{waypoint.note}</p>
                <span className="cinematic-node__link">Explore node <b aria-hidden="true">↗</b></span>
              </Link>
            ))}
          </div>

          <aside className="cinematic-hud" aria-label="Current path position">
            <div className="cinematic-hud__readout">
              <span>Current layer</span>
              <strong>{waypoints[active].title}</strong>
            </div>
            <ol>
              {waypoints.map((waypoint, index) => (
                <li key={waypoint.code} className={active === index ? 'is-active' : ''}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Link href={waypoint.href} aria-current={active === index ? 'step' : undefined}>{waypoint.title}</Link>
                </li>
              ))}
            </ol>
          </aside>

          <p className="cinematic-path__counter" aria-hidden="true">
            <span>{String(active + 1).padStart(2, '0')}</span>
            <i />
            <span>{String(waypoints.length).padStart(2, '0')}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
