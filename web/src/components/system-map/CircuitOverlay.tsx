import { MAP_ANCHORS, anchorToSvg, MAP_VIEWBOX } from '../../lib/map-layout'

export function CircuitOverlay({ activeId }: { activeId?: string }) {
  const center = anchorToSvg(MAP_ANCHORS[0])
  const domainAnchors = MAP_ANCHORS.slice(1)

  /** Build a clean orthogonal path from identity center to each domain anchor */
  function tracePath(domainId: string): string {
    const anchor = domainAnchors.find((a) => a.id === domainId)
    if (!anchor) return ''
    const p = anchorToSvg(anchor)

    switch (domainId) {
      case 'research':
        // Vertical up
        return `M ${center.x} ${center.y - 16} L ${center.x} ${p.y + 16}`
      case 'systems':
        // Horizontal left
        return `M ${center.x - 16} ${center.y} L ${p.x + 16} ${p.y}`
      case 'edge-ai':
        // Horizontal right
        return `M ${center.x + 16} ${center.y} L ${p.x - 16} ${p.y}`
      case 'electronics':
        // Down then left — 90° elbow
        return `M ${center.x} ${center.y + 16} L ${center.x} ${p.y} L ${p.x + 16} ${p.y}`
      case 'ic-design':
        // Down then right — 90° elbow
        return `M ${center.x} ${center.y + 16} L ${center.x} ${p.y} L ${p.x - 16} ${p.y}`
      default:
        return `M ${center.x} ${center.y} L ${p.x} ${p.y}`
    }
  }

  return (
    <svg
      className="system-map__circuit"
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Very subtle crosshair at identity center */}
      <g className="circuit-crosshair" opacity="0.18">
        <line x1={center.x - 14} y1={center.y} x2={center.x + 14} y2={center.y} stroke="var(--trace)" strokeWidth="0.5" />
        <line x1={center.x} y1={center.y - 14} x2={center.x} y2={center.y + 14} stroke="var(--trace)" strokeWidth="0.5" />
      </g>

      {/* 5 clean domain traces */}
      {domainAnchors.map((anchor) => {
        const isSelected = activeId === anchor.id
        const isDimmed = Boolean(activeId && activeId !== anchor.id)
        const isDirection = anchor.state === 'direction'
        const d = tracePath(anchor.id)
        const p = anchorToSvg(anchor)

        return (
          <g
            key={anchor.id}
            className={`circuit-trace ${isSelected ? 'is-selected' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
          >
            {/* Trace line */}
            <path
              d={d}
              fill="none"
              stroke={isSelected ? 'var(--accent)' : 'var(--trace)'}
              strokeWidth={isSelected ? 1.4 : 1}
              strokeDasharray={isDirection ? '4 4' : 'none'}
              opacity={isSelected ? 0.85 : isDimmed ? 0.12 : 0.35}
            />

            {/* Domain end-point dot */}
            <circle
              cx={p.x}
              cy={p.y}
              r={isSelected ? 3 : 2.5}
              fill={isSelected ? 'var(--accent)' : 'var(--trace)'}
              opacity={isSelected ? 0.9 : isDimmed ? 0.15 : 0.4}
            />
          </g>
        )
      })}

      {/* Identity center dot */}
      <circle
        cx={center.x}
        cy={center.y}
        r={activeId === 'identity' ? 4 : 3}
        fill={activeId === 'identity' ? 'var(--accent)' : 'var(--trace)'}
        opacity={activeId === 'identity' ? 0.9 : 0.4}
      />
    </svg>
  )
}
