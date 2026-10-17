'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SPOTLIGHT_SELECTOR = [
  '.device-card',
  '.hero__figure',
  '.detail__figure',
  '.problem-grid > li',
  '.join-grid > li',
  '.research-cards > li',
  '.steps > li',
  '.research-list a',
  '.related a',
  '.detail__aside',
  '.callout',
].join(', ')

const REVEAL_SELECTOR = [
  '.device-card',
  '.problem-grid > li',
  '.principle-grid > li',
  '.steps > li',
  '.join-grid > li',
  '.research-cards > li',
  '.research-list > li',
  '.journey > li',
  '.pipeline > li',
  '.bridge > li',
  '.work-row',
  '.callout',
  '.detail__aside',
  '.related > li',
].join(', ')

export default function MotionEnhancer() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    let rafId = 0

    const updateScroll = () => {
      rafId = 0
      const scrollTop = window.scrollY || root.scrollTop
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll))
      root.style.setProperty('--scroll-progress', progress.toFixed(4))
      root.dataset.scrolled = scrollTop > 16 ? 'true' : 'false'
    }

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScroll)
      }
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    const onPointerMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(SPOTLIGHT_SELECTOR)
      if (!target) return
      const rect = target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      target.style.setProperty('--spot-x', `${x.toFixed(1)}px`)
      target.style.setProperty('--spot-y', `${y.toFixed(1)}px`)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach(el => el.classList.add('is-inview'))
      return () => {
        if (rafId) window.cancelAnimationFrame(rafId)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        window.removeEventListener('pointermove', onPointerMove)
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    )

    elements.forEach((el, idx) => {
      el.style.setProperty('--stagger-idx', String(idx % 4))
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-inview')
      } else {
        el.classList.add('will-reveal')
        observer.observe(el)
      }
    })

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [pathname])

  return <div className="scroll-progress" aria-hidden="true" />
}
