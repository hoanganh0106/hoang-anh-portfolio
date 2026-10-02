'use client'

import { useEffect, useRef } from 'react'

export default function SpmambaSeparationVisual() {
  const mixedPathRef = useRef<SVGPathElement>(null)
  const stream1PathRef = useRef<SVGPathElement>(null)
  const stream2PathRef = useRef<SVGPathElement>(null)
  const stream3PathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sampleCount = 64
    const mixedWidth = 180
    const mixedHeight = 68
    const streamWidth = 170
    const streamHeight = 32

    function renderFrame(time: number) {
      // 1. Generate Wave 1 (Speaker 1 — Higher pitch vocal formants)
      const s1Points: [number, number][] = []
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount
        const x = u * streamWidth
        // Formant envelope with syllabic rhythm
        const env1 = Math.max(0.12, Math.sin(u * 6 - time * 1.2) * 0.85 + 0.15)
        const wave =
          0.7 * Math.sin(u * 28 - time * 3.2) +
          0.3 * Math.sin(u * 56 - time * 6.4)
        const y = streamHeight / 2 + env1 * wave * 11
        s1Points.push([x, y])
      }

      // 2. Generate Wave 2 (Speaker 2 — Deeper resonant fundamental)
      const s2Points: [number, number][] = []
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount
        const x = u * streamWidth
        // Lower pitch cadence with natural conversational pauses
        const env2 = Math.max(0.08, Math.cos(u * 5 - time * 0.9) * 0.9)
        const wave =
          0.82 * Math.sin(u * 14 - time * 1.8) +
          0.25 * Math.cos(u * 28 - time * 3.6)
        const y = streamHeight / 2 + env2 * wave * 11
        s2Points.push([x, y])
      }

      // 3. Generate Wave 3 (Speaker 3 — Intermittent rhythmic phrase bursts)
      const s3Points: [number, number][] = []
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount
        const x = u * streamWidth
        // Staccato phoneme bursts with clear pauses
        const burstMod = Math.sin(u * 9 - time * 1.6)
        const env3 = burstMod > 0.15 ? 0.9 : 0.08
        const wave =
          0.72 * Math.sin(u * 22 - time * 2.5) +
          0.28 * Math.sin(u * 44 - time * 5.0)
        const y = streamHeight / 2 + env3 * wave * 10
        s3Points.push([x, y])
      }

      // 4. Generate Mixed Audio (Acoustic summation of 3 speakers + subtle acoustic noise)
      const mixedPoints: [number, number][] = []
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount
        const x = u * mixedWidth

        // Sum components
        const w1 =
          Math.max(0.1, Math.sin(u * 6 - time * 1.2) * 0.85) *
          (0.7 * Math.sin(u * 28 - time * 3.2))
        const w2 =
          Math.max(0.08, Math.cos(u * 5 - time * 0.9) * 0.9) *
          (0.82 * Math.sin(u * 14 - time * 1.8))
        const w3 =
          (Math.sin(u * 9 - time * 1.6) > 0.15 ? 0.9 : 0.08) *
          (0.72 * Math.sin(u * 22 - time * 2.5))
        // High frequency ambient acoustic interference
        const noise = 0.08 * Math.sin(u * 70 - time * 5.5)

        const composite = (w1 * 0.38 + w2 * 0.42 + w3 * 0.35 + noise) * 22
        const y = mixedHeight / 2 + composite
        mixedPoints.push([x, y])
      }

      // Helper to format SVG path
      const toSvgPath = (points: [number, number][]) =>
        points.reduce((acc, [px, py], idx) => {
          return `${acc} ${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`
        }, '')

      // Apply directly to SVG path elements
      if (mixedPathRef.current) mixedPathRef.current.setAttribute('d', toSvgPath(mixedPoints))
      if (stream1PathRef.current) stream1PathRef.current.setAttribute('d', toSvgPath(s1Points))
      if (stream2PathRef.current) stream2PathRef.current.setAttribute('d', toSvgPath(s2Points))
      if (stream3PathRef.current) stream3PathRef.current.setAttribute('d', toSvgPath(s3Points))
    }

    if (prefersReducedMotion) {
      renderFrame(1.4)
      return
    }

    // Animation Loop: Calm, slow, continuous
    let isRunning = true
    function loop() {
      if (!isRunning) return
      timeRef.current += 0.016
      renderFrame(timeRef.current)
      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      isRunning = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div
      className="spmamba-separation-diagram"
      role="img"
      aria-label="Acoustic speech separation: One composite mixed audio input y(t) separated into three distinct speech streams s₁(t), s₂(t), s₃(t) via SPMamba"
    >
      {/* Schematic Header */}
      <div className="spmamba-diagram__header">
        <span>Acoustic Signal Separation</span>
        <span>Monaural Input → 3 Target Streams</span>
      </div>

      {/* Pipeline Body: Mixed Audio (Left) → SPMamba (Center) → 3 Distinct Streams (Right) */}
      <div className="spmamba-diagram__body">
        {/* LEFT: Mixed Audio */}
        <div className="spmamba-panel spmamba-panel--mixed">
          <div className="spmamba-panel__meta">
            <span className="spmamba-panel__title">Mixed Audio</span>
            <span className="spmamba-panel__subtitle">3 Speech Sources · y(t)</span>
          </div>

          <div className="spmamba-wave-container">
            <svg
              viewBox="0 0 180 68"
              className="spmamba-wave-svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Zero-axis baseline */}
              <line
                x1="0"
                y1="34"
                x2="180"
                y2="34"
                stroke="var(--border)"
                strokeDasharray="2 3"
                strokeWidth="0.75"
              />
              {/* Overlapping complex composite waveform */}
              <path
                ref={mixedPathRef}
                fill="none"
                stroke="var(--text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* CENTER: SPMamba Separation Kernel */}
        <div className="spmamba-pipeline-node">
          <div className="spmamba-flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="spmamba-kernel-badge">
            <span className="spmamba-kernel-name">SPMamba</span>
            <span className="spmamba-kernel-sub">Separation</span>
          </div>
          <div className="spmamba-flow-arrow" aria-hidden="true">
            →
          </div>
        </div>

        {/* RIGHT: 3 Distinct Output Streams */}
        <div className="spmamba-panel spmamba-panel--outputs">
          {/* Stream 1 */}
          <div className="spmamba-stream-row">
            <div className="spmamba-stream-label">
              <span>Stream 1: S₁(t)</span>
              <small>Speaker 1</small>
            </div>
            <div className="spmamba-stream-wave-box">
              <svg
                viewBox="0 0 170 32"
                className="spmamba-wave-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="16"
                  x2="170"
                  y2="16"
                  stroke="var(--border)"
                  strokeDasharray="2 3"
                  strokeWidth="0.75"
                />
                <path
                  ref={stream1PathRef}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Stream 2 */}
          <div className="spmamba-stream-row">
            <div className="spmamba-stream-label">
              <span>Stream 2: S₂(t)</span>
              <small>Speaker 2</small>
            </div>
            <div className="spmamba-stream-wave-box">
              <svg
                viewBox="0 0 170 32"
                className="spmamba-wave-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="16"
                  x2="170"
                  y2="16"
                  stroke="var(--border)"
                  strokeDasharray="2 3"
                  strokeWidth="0.75"
                />
                <path
                  ref={stream2PathRef}
                  fill="none"
                  stroke="var(--text)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Stream 3 */}
          <div className="spmamba-stream-row">
            <div className="spmamba-stream-label">
              <span>Stream 3: S₃(t)</span>
              <small>Speaker 3</small>
            </div>
            <div className="spmamba-stream-wave-box">
              <svg
                viewBox="0 0 170 32"
                className="spmamba-wave-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="16"
                  x2="170"
                  y2="16"
                  stroke="var(--border)"
                  strokeDasharray="2 3"
                  strokeWidth="0.75"
                />
                <path
                  ref={stream3PathRef}
                  fill="none"
                  stroke="var(--text-muted)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
