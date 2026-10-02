'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollAtmosphere() {
  const pathname = usePathname()
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let target = window.scrollY
    let current = target
    let velocity = 0

    const depthSelectors = [
      '.home-hero-copy',
      '.signal-board--hero',
      '.home-section-heading',
      '.project-card',
      '.home-focus > *',
      '.home-map-section .home-section-heading',
      '.home-map-section .system-map',
      '.home-lower-grid > div',
      '.page-shell__header > *',
      '.page-shell__content > section',
      '.page-shell__content > div > article',
      '.detail__header',
      '.detail > figure',
      '.detail__section',
    ].join(',')

    const elements = Array.from(document.querySelectorAll<HTMLElement>(depthSelectors))
    elements.forEach((element, index) => {
      element.dataset.scrollDepth = String((index % 5) + 1)
    })

    const render = () => {
      raf = 0
      if (reduceMotion.matches) {
        root.style.setProperty('--page-scroll', '0')
        root.style.setProperty('--scroll-velocity', '0')
        elements.forEach((element) => {
          element.style.removeProperty('--depth-shift')
          element.style.removeProperty('--depth-scale')
          element.style.removeProperty('--depth-opacity')
        })
        return
      }

      target = window.scrollY
      const previous = current
      current += (target - current) * 0.085
      velocity += ((current - previous) - velocity) * 0.16

      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      root.style.setProperty('--page-scroll', (current / max).toFixed(5))
      root.style.setProperty('--scroll-velocity', Math.max(-1, Math.min(1, velocity / 34)).toFixed(4))

      const viewportCenter = window.innerHeight * 0.52
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.bottom < -240 || rect.top > window.innerHeight + 240) return
        const center = rect.top + rect.height / 2
        const normalized = Math.max(-1.35, Math.min(1.35, (center - viewportCenter) / window.innerHeight))
        const depth = Number(element.dataset.scrollDepth || 1)
        const strength = 5 + depth * 1.6
        const shift = normalized * strength
        const scale = 1 - Math.min(0.012, Math.abs(normalized) * depth * 0.0017)
        const opacity = 1 - Math.min(0.11, Math.abs(normalized) * 0.055)
        element.style.setProperty('--depth-shift', `${shift.toFixed(2)}px`)
        element.style.setProperty('--depth-scale', scale.toFixed(4))
        element.style.setProperty('--depth-opacity', opacity.toFixed(4))
      })

      if (Math.abs(target - current) > 0.08 || Math.abs(velocity) > 0.01) raf = requestAnimationFrame(render)
    }

    const schedule = () => {
      target = window.scrollY
      if (!raf) raf = requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduceMotion.addEventListener('change', schedule)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduceMotion.removeEventListener('change', schedule)
    }
  }, [pathname])

  return (
    <div className="ambient-depth" aria-hidden="true">
      <div className="ambient-depth__plane ambient-depth__plane--far" />
      <div className="ambient-depth__plane ambient-depth__plane--mid" />
      <div className="ambient-depth__glow" />
    </div>
  )
}
