'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import SceneLoader from './SceneLoader.client'

export function SystemMapController({ activeId, children }: { activeId?: string; children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const failScene = () => {
    setSceneFailed(true)
    document.querySelector('.system-map')?.setAttribute('data-scene-failed', 'true')
  }

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')
    const update = () => {
      setReduced(query.matches)
      setEnhanced(desktop.matches && !query.matches)
      if (!desktop.matches || query.matches) setSceneFailed(false)
    }
    update()
    query.addEventListener('change', update)
    desktop.addEventListener('change', update)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '160px' })
    if (host.current) observer.observe(host.current)
    return () => {
      query.removeEventListener('change', update)
      desktop.removeEventListener('change', update)
      observer.disconnect()
    }
  }, [])

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={host}
      className="system-map__visual"
      data-enhanced={enhanced && !sceneFailed}
      data-reduced-motion={reduced}
      data-scene-failed={sceneFailed || undefined}
    >
      {children}
      {enhanced && visible && !sceneFailed && (
        <div className="system-map__scene" aria-hidden="true">
          <SceneLoader
            activeId={activeId}
            theme={theme}
            fallback={null}
            onError={failScene}
          />
        </div>
      )}
    </div>
  )
}
