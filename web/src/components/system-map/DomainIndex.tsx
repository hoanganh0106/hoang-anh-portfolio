import Link from 'next/link'
import { MAP_ANCHORS } from '../../lib/map-layout'

export function DomainIndex({
  activeId,
  onFocus,
}: {
  activeId?: string
  onFocus?: (id: string) => void
}) {
  return (
    <nav className="system-map__index" aria-label="Technical domains">
      {MAP_ANCHORS.map((anchor, idx) => {
        const isIdentity = anchor.id === 'identity'
        const projects = anchor.projects ?? []

        return (
          <div key={anchor.id} className="system-map__index-item">
            <Link
              href={anchor.href}
              className={`system-map__index-link ${isIdentity ? 'system-map__index-link--identity' : ''} ${
                activeId === anchor.id ? 'is-active' : ''
              }`}
              data-state={anchor.state}
              onFocus={() => onFocus?.(anchor.id)}
              onMouseEnter={() => onFocus?.(anchor.id)}
            >
              <span className="system-map__index-number">
                {isIdentity ? 'CORE' : `0${idx}`}
              </span>
              <span className="system-map__index-title">
                {anchor.label}
                {isIdentity && <small className="identity-sub"> (Central Identity)</small>}
              </span>
              {anchor.state === 'direction' && <small className="direction-badge">Direction</small>}
            </Link>

            {!isIdentity && projects.length > 0 && (
              <div className="system-map__index-subprojects">
                {projects.map((p) => (
                  <Link key={p.href + p.label} href={p.href} className="index-subproject-link">
                    <span className="subproject-dot">↳</span>
                    <span>{p.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

