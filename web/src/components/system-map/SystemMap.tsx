'use client'

import { useState } from 'react'
import { CircuitOverlay } from './CircuitOverlay'
import { DomainIndex } from './DomainIndex'
import { DomainLabels } from './DomainLabels'
import { SystemMapController } from './SystemMapController.client'
import './map.css'

export default function SystemMap() {
  const [hoveredId, setHoveredId] = useState<string>('')
  const [focusedId, setFocusedId] = useState<string>('')
  const activeId = focusedId || hoveredId

  return (
    <section className="system-map" aria-labelledby="map-title">
      <SystemMapController activeId={activeId}>
        <div className="system-map__poster">
          <CircuitOverlay activeId={activeId} />
          <DomainLabels
            activeId={activeId}
            onFocus={setFocusedId}
            onHover={setHoveredId}
          />
        </div>
      </SystemMapController>
      <DomainIndex activeId={activeId} onFocus={setFocusedId} />
    </section>
  )
}
