import Link from 'next/link'
import { MAP_ANCHORS, anchorToSvg, MAP_VIEWBOX } from '@/lib/map-layout'

export function DomainLabels({
  activeId,
  onFocus,
  onHover,
}: {
  activeId?: string
  onFocus?: (id: string) => void
  onHover?: (id: string) => void
}) {
  return (
    <div className="system-map__labels" aria-label="Interactive system domains and projects">
      {MAP_ANCHORS.map((anchor) => {
        const point = anchorToSvg(anchor)
        const isIdentity = anchor.id === 'identity'
        const isActive = activeId === anchor.id
        const isDimmed = Boolean(activeId && activeId !== anchor.id)
        const projects = anchor.projects ?? []

        return (
          <div
            key={anchor.id}
            className={`node-anchor node-anchor--${anchor.id} ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
            style={{
              left: `${(point.x / MAP_VIEWBOX.width) * 100}%`,
              top: `${(point.y / MAP_VIEWBOX.height) * 100}%`,
            }}
          >
            <Link
              href={anchor.href}
              className={`node-label ${isIdentity ? 'node-label--identity' : ''}`}
              data-state={anchor.state}
              onFocus={() => onFocus?.(anchor.id)}
              onBlur={() => onFocus?.('')}
              onMouseEnter={() => onHover?.(anchor.id)}
              onMouseLeave={() => onHover?.('')}
            >
              <span className="node-label__kicker">{anchor.kicker}</span>
              <strong className="node-label__title">{anchor.label}</strong>
              {isIdentity && anchor.note && (
                <span className="node-label__note">{anchor.note}</span>
              )}
            </Link>

            {/* Inline project list — attached directly below the label */}
            {!isIdentity && projects.length > 0 && (
              <ul className="node-projects" aria-label={`${anchor.label} projects`}>
                {projects.map((p) => (
                  <li key={p.href + p.label}>
                    <Link
                      href={p.href}
                      className={`node-projects__link ${p.state ? `node-projects__link--${p.state}` : ''}`}
                      onFocus={() => onFocus?.(anchor.id)}
                      onBlur={() => onFocus?.('')}
                      onMouseEnter={() => onHover?.(anchor.id)}
                      onMouseLeave={() => onHover?.('')}
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
