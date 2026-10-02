'use client'

import { Suspense, lazy, Component, type ReactNode } from 'react'

const LazyScene = lazy(() => import('./SystemScene.client'))

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function SceneLoader({
  activeId,
  theme,
  fallback,
  onError,
}: {
  activeId?: string
  theme: 'light' | 'dark'
  fallback: ReactNode
  onError: () => void
}) {
  return (
    <SceneBoundary fallback={fallback} onError={onError}>
      <Suspense fallback={fallback}>
        <LazyScene
          activeId={activeId}
          theme={theme}
          onReady={() => document.querySelector('.system-map')?.setAttribute('data-scene-ready', 'true')}
          onContextLost={onError}
          onMetrics={(metrics) => {
            const map = document.querySelector('.system-map')
            map?.setAttribute('data-scene-triangles', String(metrics.triangles))
            map?.setAttribute('data-scene-calls', String(metrics.calls))
          }}
        />
      </Suspense>
    </SceneBoundary>
  )
}
