'use client'

import { PointerEvent, ReactNode, useRef } from 'react'

type Props = {
  nodeId: string
  href: string
  label: string
  children: ReactNode
}

export default function ModuleInteraction({ nodeId, href, label, children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === 'touch') return
    const element = ref.current
    if (!element) return
    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    element.style.setProperty('--map-rotate-x', `${(-y * 12).toFixed(2)}deg`)
    element.style.setProperty('--map-rotate-y', `${(x * 14).toFixed(2)}deg`)
  }

  function reset() {
    const element = ref.current
    if (!element) return
    element.style.removeProperty('--map-rotate-x')
    element.style.removeProperty('--map-rotate-y')
  }

  return <a ref={ref} href={href} aria-label={label} data-map-graphic={nodeId} className="map-module-graphic" onPointerMove={move} onPointerLeave={reset}>{children}</a>
}
