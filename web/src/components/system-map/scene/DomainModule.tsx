'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MapDomainId } from '@/lib/map-layout'

export function DomainModule({
  id,
  position,
  active,
}: {
  id: MapDomainId
  position: [number, number, number]
  active?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const isDirection = id === 'ic-design'

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const lerp = Math.min(delta * 4, 0.15)
    const tY = position[1] + (active ? 0.08 : 0)
    const tZ = position[2] + (active ? 0.12 : 0.02)
    const tRotX = -0.35 + (active ? 0.015 : 0)
    const tRotY = 0.3 + (active ? 0.025 : 0)
    const tScale = active ? 1.12 : 1.02

    groupRef.current.position.y += (tY - groupRef.current.position.y) * lerp
    groupRef.current.position.z += (tZ - groupRef.current.position.z) * lerp
    groupRef.current.rotation.x += (tRotX - groupRef.current.rotation.x) * lerp
    groupRef.current.rotation.y += (tRotY - groupRef.current.rotation.y) * lerp
    const s = groupRef.current.scale.x + (tScale - groupRef.current.scale.x) * lerp
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2] + 0.02]}>
      {/* Universal carrier base platform */}
      <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.09, 0.82]} />
        <meshStandardMaterial
          color={isDirection ? '#1a2022' : '#1e2426'}
          roughness={0.42}
          metalness={isDirection ? 0.45 : 0.62}
          transparent={isDirection}
          opacity={isDirection ? 0.85 : 1}
        />
      </mesh>

      {/* Edge connector strip */}
      <mesh position={[0, -0.05, 0.42]}>
        <boxGeometry args={[0.82, 0.03, 0.04]} />
        <meshStandardMaterial
          color={isDirection ? '#9a9060' : '#c8a862'}
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* Corner standoffs */}
      {[[-0.48, -0.42], [0.48, -0.42], [-0.48, 0.34], [0.48, 0.34]].map(([sx, sz], i) => (
        <mesh key={i} position={[sx, 0.01, sz]}>
          <cylinderGeometry args={[0.028, 0.028, 0.015, 8]} />
          <meshStandardMaterial color="#889294" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Domain-specific hardware payload */}
      {id === 'research' && <ResearchChipPayload />}
      {id === 'systems' && <ServerBladePayload />}
      {id === 'edge-ai' && <SensorModulePayload />}
      {id === 'electronics' && <CircuitBoardPayload />}
      {id === 'ic-design' && <DiePackagePayload active={active} />}
    </group>
  )
}

/* ── 1. RESEARCH: Multi-layered processor chip with shield ────── */
function ResearchChipPayload() {
  return (
    <group position={[0, 0.08, 0]}>
      {/* Main chip body */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[0.88, 0.12, 0.62]} />
        <meshStandardMaterial color="#2a2e30" metalness={0.55} roughness={0.4} />
      </mesh>
      {/* Heat spreader */}
      <mesh position={[0, 0.115, 0]} castShadow>
        <boxGeometry args={[0.72, 0.04, 0.48]} />
        <meshStandardMaterial color="#9aa2a4" metalness={0.78} roughness={0.25} />
      </mesh>
      {/* Shield top */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.56, 0.028, 0.36]} />
        <meshStandardMaterial color="#bec4c5" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Perimeter leads */}
      {[-0.35, -0.18, 0, 0.18, 0.35].map((z, i) => (
        <group key={i}>
          <mesh position={[-0.47, 0.02, z]}>
            <boxGeometry args={[0.05, 0.012, 0.028]} />
            <meshStandardMaterial color="#b8c0c0" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0.47, 0.02, z]}>
            <boxGeometry args={[0.05, 0.012, 0.028]} />
            <meshStandardMaterial color="#b8c0c0" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ── 2. SYSTEMS: Server blade with drive bays and heatsink ───── */
function ServerBladePayload() {
  return (
    <group position={[0, 0.08, 0]}>
      {/* Chassis */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.92, 0.13, 0.62]} />
        <meshStandardMaterial color="#3a4347" metalness={0.65} roughness={0.35} />
      </mesh>
      {/* Drive bay sleds */}
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <group key={i} position={[x, 0.05, 0.32]}>
          <mesh>
            <boxGeometry args={[0.16, 0.08, 0.022]} />
            <meshStandardMaterial color="#22282a" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.014]}>
            <boxGeometry args={[0.1, 0.02, 0.01]} />
            <meshStandardMaterial color="#556064" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      {/* SFP cage */}
      <mesh position={[-0.28, 0.05, -0.22]}>
        <boxGeometry args={[0.2, 0.065, 0.15]} />
        <meshStandardMaterial color="#c0c8c9" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Heatsink fins */}
      {[-0.12, -0.06, 0, 0.06, 0.12].map((z, i) => (
        <mesh key={i} position={[0.18, 0.13, z]}>
          <boxGeometry args={[0.32, 0.06, 0.012]} />
          <meshStandardMaterial color="#aab4b7" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
    </group>
  )
}

/* ── 3. EDGE AI: Camera/sensor module with lens and NPU ──────── */
function SensorModulePayload() {
  return (
    <group position={[0, 0.08, 0]}>
      {/* Camera housing */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.72, 0.12, 0.52]} />
        <meshStandardMaterial color="#2d3133" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Lens barrel */}
      <mesh position={[-0.14, 0.05, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#1a1c1e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[-0.14, 0.05, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.012, 16]} />
        <meshStandardMaterial color="#2a3539" metalness={0.82} roughness={0.08} />
      </mesh>
      {/* Sensor board */}
      <mesh position={[0.14, 0.13, -0.04]}>
        <boxGeometry args={[0.28, 0.025, 0.28]} />
        <meshStandardMaterial color="#1c2a25" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Sensor chip */}
      <mesh position={[0.14, 0.145, -0.04]}>
        <boxGeometry args={[0.14, 0.01, 0.14]} />
        <meshStandardMaterial color="#181c1e" metalness={0.6} roughness={0.25} />
      </mesh>
    </group>
  )
}

/* ── 4. ELECTRONICS: PCB with MCU, headers, passives ─────────── */
function CircuitBoardPayload() {
  return (
    <group position={[0, 0.04, 0]}>
      {/* PCB substrate */}
      <mesh position={[0, 0.025, 0]} castShadow>
        <boxGeometry args={[0.92, 0.04, 0.62]} />
        <meshStandardMaterial color="#1c362b" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Gold trace layer */}
      <mesh position={[0, 0.048, 0]}>
        <boxGeometry args={[0.86, 0.004, 0.56]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* QFN MCU */}
      <group position={[-0.12, 0.07, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.035, 0.28]} />
          <meshStandardMaterial color="#181c1e" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.012, 0]}>
          <boxGeometry args={[0.32, 0.012, 0.32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      {/* Quartz crystal */}
      <mesh position={[0.15, 0.065, -0.14]}>
        <boxGeometry args={[0.15, 0.032, 0.08]} />
        <meshStandardMaterial color="#c0c9cb" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Header pins */}
      {[-0.2, -0.12, -0.04, 0.04, 0.12, 0.2].map((z, i) => (
        <mesh key={i} position={[0.35, 0.09, z]}>
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Passives */}
      {[[-0.32, -0.16], [-0.32, 0.12], [0.08, 0.18]].map(([px, pz], i) => (
        <mesh key={i} position={[px, 0.06, pz]}>
          <boxGeometry args={[0.05, 0.025, 0.03]} />
          <meshStandardMaterial color="#7a6b58" roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

/* ── 5. IC DESIGN: Ceramic package with exposed die ──────────── */
function DiePackagePayload({ active }: { active?: boolean }) {
  return (
    <group position={[0, 0.06, 0]}>
      {/* Ceramic QFP body */}
      <mesh position={[0, 0.035, 0]} castShadow>
        <boxGeometry args={[0.78, 0.09, 0.78]} />
        <meshStandardMaterial
          color="#2d3336"
          metalness={0.4}
          roughness={0.35}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Die cavity */}
      <mesh position={[0, 0.082, 0]}>
        <boxGeometry args={[0.5, 0.014, 0.5]} />
        <meshStandardMaterial color="#161a1b" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Silicon die */}
      <mesh position={[0, 0.094, 0]}>
        <boxGeometry args={[0.3, 0.014, 0.3]} />
        <meshStandardMaterial
          color="#334247"
          metalness={0.95}
          roughness={0.1}
          emissive="#244045"
          emissiveIntensity={active ? 0.45 : 0.18}
        />
      </mesh>
      {/* Gold wire bonds */}
      {[0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6, 4.2, 4.8, 5.4].map((angle, i) => {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return (
          <mesh key={i} position={[(cos * 0.24), 0.098, (sin * 0.24)]}>
            <boxGeometry args={[0.01, 0.012, 0.08]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
        )
      })}
      {/* Gull-wing leads */}
      {[-0.28, -0.14, 0, 0.14, 0.28].flatMap((pos) => [
        { x: -0.42, z: pos, rot: 0 },
        { x: 0.42, z: pos, rot: 0 },
        { x: pos, z: -0.42, rot: Math.PI / 2 },
        { x: pos, z: 0.42, rot: Math.PI / 2 },
      ]).map((lead, i) => (
        <mesh key={`l-${i}`} position={[lead.x, 0.008, lead.z]} rotation={[0, lead.rot, 0]}>
          <boxGeometry args={[0.055, 0.012, 0.028]} />
          <meshStandardMaterial color="#b8c4c7" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}
