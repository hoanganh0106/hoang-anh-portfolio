'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MAP_ANCHORS } from '@/lib/map-layout'
import { IdentityModule } from './scene/IdentityModule'
import { DomainModule } from './scene/DomainModule'

function SceneContent({
  activeId,
  theme,
  onReady,
  onMetrics,
}: {
  activeId?: string
  theme: 'light' | 'dark'
  onReady?: () => void
  onMetrics?: (metrics: { triangles: number; calls: number }) => void
}) {
  const { viewport, invalidate, gl } = useThree()
  const reported = useRef(false)

  useEffect(() => {
    invalidate()
  }, [viewport.width, viewport.height, activeId, invalidate])

  useFrame(({ camera, pointer }, delta) => {
    if (!reported.current) {
      reported.current = true
      requestAnimationFrame(() => {
        onReady?.()
        onMetrics?.({
          triangles: gl.info.render.triangles,
          calls: gl.info.render.calls,
        })
      })
    }

    // Very subtle mouse parallax
    const targetX = pointer.x * 0.12
    const targetY = pointer.y * 0.08
    camera.position.x += (targetX - camera.position.x) * Math.min(delta * 3, 0.1)
    camera.position.y += (targetY - camera.position.y) * Math.min(delta * 3, 0.1)
    camera.lookAt(0, 0, 0)
    invalidate()
  })

  const isDark = theme === 'dark'

  return (
    <>
      {/* Soft ambient base */}
      <ambientLight intensity={isDark ? 0.9 : 1.4} />

      {/* Key overhead directional */}
      <directionalLight
        position={[3, 6, 7]}
        intensity={isDark ? 2.0 : 2.4}
        color={isDark ? '#edf3f5' : '#ffffff'}
      />

      {/* Gentle rim fill */}
      <directionalLight
        position={[-4, -3, 4]}
        intensity={isDark ? 0.8 : 0.6}
        color="#8a9ca0"
      />

      {/* Center identity module */}
      <IdentityModule active={activeId === 'identity'} />

      {/* 5 domain modules */}
      <DomainModuleList
        activeId={activeId}
        viewportWidth={viewport.width}
        viewportHeight={viewport.height}
      />
    </>
  )
}

function DomainModuleList({
  activeId,
  viewportWidth,
  viewportHeight,
}: {
  activeId?: string
  viewportWidth: number
  viewportHeight: number
}) {
  return (
    <>
      {MAP_ANCHORS.slice(1).map((a) => (
        <DomainModule
          key={a.id}
          id={a.id as Exclude<typeof a.id, 'identity'>}
          position={[a.x * viewportWidth * 0.36, -a.y * viewportHeight * 0.38, a.z]}
          active={activeId === a.id}
        />
      ))}
    </>
  )
}

export default function SystemScene({
  activeId,
  theme,
  onContextLost,
  onReady,
  onMetrics,
}: {
  activeId?: string
  theme: 'light' | 'dark'
  onContextLost?: () => void
  onReady?: () => void
  onMetrics?: (metrics: { triangles: number; calls: number }) => void
}) {
  return (
    <Canvas
      camera={{ position: [0, -0.15, 10], fov: 22, near: 0.1, far: 100 }}
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          'webglcontextlost',
          (event) => {
            event.preventDefault()
            onContextLost?.()
          },
          { once: true }
        )
      }}
    >
      <SceneContent
        activeId={activeId}
        theme={theme}
        onReady={onReady}
        onMetrics={onMetrics}
      />
    </Canvas>
  )
}
