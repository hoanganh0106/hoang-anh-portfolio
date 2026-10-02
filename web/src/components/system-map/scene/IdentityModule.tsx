'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Central Identity Module — Large hexagonal stepped processor platform.
 * Silver/white metallic, visually anchors the entire map.
 */
export function IdentityModule({ active }: { active?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const lerp = Math.min(delta * 4, 0.15)
    const tZ = active ? 0.2 : 0.12
    const tRotX = -0.35 + (active ? 0.015 : 0)
    const tRotY = 0.3 + (active ? 0.02 : 0)
    const tScale = active ? 1.38 : 1.3

    groupRef.current.position.z += (tZ - groupRef.current.position.z) * lerp
    groupRef.current.rotation.x += (tRotX - groupRef.current.rotation.x) * lerp
    groupRef.current.rotation.y += (tRotY - groupRef.current.rotation.y) * lerp
    const s = groupRef.current.scale.x + (tScale - groupRef.current.scale.x) * lerp
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <group ref={groupRef} position={[0, 0, 0.12]}>
      {/* Base hexagonal platform — largest, lightest */}
      <mesh position={[0, -0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.42, 0.09, 6]} />
        <meshStandardMaterial color="#dce0e1" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* Step 2 — medium */}
      <mesh position={[0, -0.01, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.15, 0.07, 6]} />
        <meshStandardMaterial color="#c6ccce" roughness={0.3} metalness={0.45} />
      </mesh>

      {/* Step 3 — inner plateau */}
      <mesh position={[0, 0.045, 0]} castShadow>
        <cylinderGeometry args={[0.88, 0.92, 0.06, 6]} />
        <meshStandardMaterial color="#b0b8ba" roughness={0.25} metalness={0.55} />
      </mesh>

      {/* Step 4 — processor mount */}
      <mesh position={[0, 0.085, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.65, 0.04, 6]} />
        <meshStandardMaterial color="#9aa2a4" roughness={0.22} metalness={0.7} />
      </mesh>

      {/* Central silicon die */}
      <mesh position={[0, 0.115, 0]}>
        <boxGeometry args={[0.38, 0.014, 0.38]} />
        <meshStandardMaterial
          color="#222728"
          emissive="#3d5154"
          emissiveIntensity={active ? 0.3 : 0.12}
          roughness={0.1}
          metalness={0.92}
        />
      </mesh>

      {/* Pin-1 fiducial */}
      <mesh position={[-0.35, 0.115, -0.28]}>
        <cylinderGeometry args={[0.022, 0.022, 0.01, 8]} />
        <meshStandardMaterial color="#c8a862" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Edge gold contacts around hex perimeter */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI * 2) / 6 + Math.PI / 6
        const r = 1.28
        return (
          <mesh key={i} position={[Math.cos(angle) * r, -0.06, Math.sin(angle) * r]}>
            <boxGeometry args={[0.12, 0.04, 0.04]} />
            <meshStandardMaterial color="#c8a862" metalness={0.85} roughness={0.25} />
          </mesh>
        )
      })}
    </group>
  )
}
