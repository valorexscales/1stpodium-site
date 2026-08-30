'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 160
const LINK_DIST = 2.4
const CORE_SIZE = 1.5

interface SoftwareCoreProps {
  section?: 'hero' | 'services' | 'capabilities' | 'process' | 'cta'
  className?: string
  light?: boolean
}

/* ------------------------------------------------------------------ *
 *  A modular, descriptive "Software Core":
 *  - one dark central processor core (smoked glass, black chrome edge)
 *  - thin surrounding architectural layers (planes with wireframe)
 *  - floating small modules + data nodes
 *  - node-graph constellation with faint connection lines
 *  Never appears as a solid white block.
 * ------------------------------------------------------------------ */

function DataField({
  positions,
  velocities,
  targets,
  nodeData,
}: {
  positions: React.MutableRefObject<Float32Array>
  velocities: React.MutableRefObject<Float32Array>
  targets: React.MutableRefObject<Float32Array>
  nodeData: React.MutableRefObject<{ layer: number; angle: number; radius: number; speed: number; phase: number }[]>
}) {
  const ref = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      x: (Math.random() - 0.5) * 7,
      y: (Math.random() - 0.5) * 7,
      z: (Math.random() - 0.5) * 7,
      size: 0.5 + Math.random() * 1.2,
      speed: 0.05 + Math.random() * 0.12,
    }))
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const arr = positions.current
    const vel = velocities.current
    const tgt = targets.current

    for (let i = 0; i < NODE_COUNT; i++) {
      const base = i * 3
      const d = nodeData.current[i]
      vel[base] += (tgt[base] - arr[base]) * 0.03
      vel[base + 1] += (tgt[base + 1] - arr[base + 1]) * 0.03
      vel[base + 2] += (tgt[base + 2] - arr[base + 2]) * 0.03
      vel[base] *= 0.9
      vel[base + 1] *= 0.9
      vel[base + 2] *= 0.9
      arr[base] += vel[base]
      arr[base + 1] += vel[base + 1]
      arr[base + 2] += vel[base + 2]
      // very slow idle float
      arr[base + 1] += Math.sin(t * d.speed + d.phase) * 0.012
    }

    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true
    }

    if (linesRef.current) {
      const linePos = linesRef.current.geometry.attributes.position.array as Float32Array
      let idx = 0
      const maxIdx = linePos.length / 6
      for (let i = 0; i < NODE_COUNT && idx < maxIdx; i++) {
        for (let j = i + 1; j < NODE_COUNT && idx < maxIdx; j++) {
          const dx = arr[i * 3] - arr[j * 3]
          const dy = arr[i * 3 + 1] - arr[j * 3 + 1]
          const dz = arr[i * 3 + 2] - arr[j * 3 + 2]
          const dist = Math.hypot(dx, dy, dz)
          if (dist < LINK_DIST) {
            linePos[idx * 6] = arr[i * 3]
            linePos[idx * 6 + 1] = arr[i * 3 + 1]
            linePos[idx * 6 + 2] = arr[i * 3 + 2]
            linePos[idx * 6 + 3] = arr[j * 3]
            linePos[idx * 6 + 4] = arr[j * 3 + 1]
            linePos[idx * 6 + 5] = arr[j * 3 + 2]
            idx++
          }
        }
      }
      for (let k = idx * 6; k < linePos.length; k += 6) {
        linePos[k] = 0
        linePos[k + 1] = -100
        linePos[k + 2] = 0
        linePos[k + 3] = 0
        linePos[k + 4] = -100
        linePos[k + 5] = 0
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (ref.current) {
      const p = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < 40; i++) {
        p[(NODE_COUNT + i) * 3 + 1] -= delta * 0.4
        if (p[(NODE_COUNT + i) * 3 + 1] < -4) {
          p[(NODE_COUNT + i) * 3] = (Math.random() - 0.5) * 6
          p[(NODE_COUNT + i) * 3 + 1] = 4
          p[(NODE_COUNT + i) * 3 + 2] = (Math.random() - 0.5) * 6
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.current, 3))
    const sizes = new Float32Array(NODE_COUNT + 40)
    for (let i = 0; i < NODE_COUNT; i++) sizes[i] = 0.9 + Math.random() * 0.8
    for (let i = 0; i < 40; i++) sizes[NODE_COUNT + i] = 0.5 + Math.random() * 1
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NODE_COUNT * 16 * 3), 3))
    return g
  }, [])

  return (
    <group>
      <points ref={ref} geometry={nodeGeo}>
        <pointsMaterial
          color={0xd0d0d0}
          size={1.1}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color={0xffffff} transparent opacity={0.05} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

function SoftwareSystem() {
  const group = useRef<THREE.Group>(null)
  const coreMat = useRef<THREE.MeshStandardMaterial>(null)
  const ring = useRef<THREE.Group>(null)

  const nodeData = useRef<Array<{ layer: number; angle: number; radius: number; speed: number; phase: number }>>([])
  const positions = useRef(new Float32Array(NODE_COUNT * 3))
  const velocities = useRef(new Float32Array(NODE_COUNT * 3))
  const targets = useRef(new Float32Array(NODE_COUNT * 3))

  useEffect(() => {
    const layers = 5
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.floor(Math.random() * layers)
      const angle = Math.random() * Math.PI * 2
      const radius = 1.4 + Math.random() * 1.6
      nodeData.current[i] = {
        layer,
        angle,
        radius,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      }
      positions.current[i * 3] = Math.cos(angle) * radius
      positions.current[i * 3 + 1] = (layer - (layers - 1) / 2) * 0.55
      positions.current[i * 3 + 2] = Math.sin(angle) * radius
      for (let k = 0; k < 3; k++) targets.current[i * 3 + k] = positions.current[i * 3 + k]
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.08) * 0.045
      group.current.rotation.x = Math.cos(t * 0.06) * 0.02
    }
    if (ring.current) {
      ring.current.rotation.z += 0.0006
    }
  })

  const modularMeshes = useMemo(() => {
    const mods: { pos: [number, number, number]; size: number; speed: number; phase: number }[] = []
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2
      mods.push({
        pos: [Math.cos(a) * 1.9, Math.sin(a) * 1.9 * 0.6, (Math.random() - 0.5) * 0.4],
        size: 0.08 + Math.random() * 0.09,
        speed: 0.5 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return mods
  }, [])

  return (
    <group ref={group}>
      {/* --- central processor core: smoked glass + black chrome edges --- */}
      <mesh>
        <boxGeometry args={[CORE_SIZE, CORE_SIZE, CORE_SIZE]} />
        <meshStandardMaterial
          ref={coreMat}
          color={0x111111}
          metalness={0.85}
          roughness={0.32}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* glowing edge lines only (white restrained to edges) */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(CORE_SIZE, CORE_SIZE, CORE_SIZE)]} />
        <lineBasicMaterial color={0xffffff} transparent opacity={0.5} />
      </lineSegments>

      {/* glass overlay core */}
      <mesh>
        <boxGeometry args={[CORE_SIZE * 1.04, CORE_SIZE * 1.04, CORE_SIZE * 1.04]} />
        <meshPhysicalMaterial
          color={0x222222}
          metalness={0.4}
          roughness={0.12}
          transparent
          opacity={0.18}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* inner data nucleus (small bright node, not a giant surface) */}
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color={0x333333} transparent opacity={0.6} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.9} />
      </mesh>

      {/* --- surrounding rotating architecture ring --- */}
      <group ref={ring}>
        <mesh>
          <torusGeometry args={[2.25, 0.012, 8, 90]} />
          <meshBasicMaterial color={0x888888} transparent opacity={0.35} />
        </mesh>
        <mesh>
          <torusGeometry args={[2.5, 0.006, 6, 90]} />
          <meshBasicMaterial color={0xaaaaaa} transparent opacity={0.2} />
        </mesh>
        {/* thin spokes */}
        {modularMeshes.map((m, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                args={[
                  new Float32Array([Math.cos((i / 14) * Math.PI * 2) * 1.5, Math.sin((i / 14) * Math.PI * 2) * 0.9, 0, m.pos[0], m.pos[1], m.pos[2]]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={0xffffff} transparent opacity={0.06} />
          </line>
        ))}
      </group>

      {/* floating small modules */}
      {modularMeshes.map((m, i) => (
        <mesh key={i} position={m.pos}>
          <boxGeometry args={[m.size, m.size, m.size]} />
          <meshStandardMaterial color={0x1a1a1a} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* thin area planes */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={`p${i}`} rotation={[i === 1 || i === 3 ? Math.PI / 2 : 0, i === 2 || i === 3 ? Math.PI / 2 : 0, 0]}>
          <planeGeometry args={[3.2 - i * 0.3, 3.2 - i * 0.3]} />
          <meshBasicMaterial color={0x222222} transparent opacity={0.05} side={THREE.DoubleSide} wireframe />
        </mesh>
      ))}

      <DataField
        positions={positions}
        velocities={velocities}
        targets={targets}
        nodeData={nodeData}
      />

      {/* subtle ground shadow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial color={0x000000} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function Rig({ light = false }: { light?: boolean }) {
  const { camera } = useThree()
  const state = useRef({ mx: 0, my: 0 })

  useFrame((rootState) => {
    const targetX = state.current.mx * 0.5
    const targetY = state.current.my * 0.3
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function SoftwareCoreCanvas({ section = 'hero', className = '', light = false }: SoftwareCoreProps) {
  const [ready, setReady] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  const env = light
    ? [
        { intensity: 2.0, color: '#ffffff' },
        { intensity: 0.6, color: '#ffffff' },
        { intensity: 0.3, color: '#ffffff' },
      ]
    : [
        { intensity: 1.1, color: '#ffffff' },
        { intensity: 0.35, color: '#ffffff' },
        { intensity: 0.2, color: '#ffffff' },
      ]

  return (
    <div ref={wrapRef} className={className} style={{ width: '100%', height: '100%', minHeight: 360, position: 'relative' }} aria-hidden="true">
      {ready && (
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ touchAction: 'none' }}
        >
          <ambientLight intensity={env[0].intensity} />
          <directionalLight position={[4, 6, 4]} intensity={env[1].intensity} color={env[1].color} />
          <directionalLight position={[-5, -3, -4]} intensity={env[2].intensity} color={env[2].color} />
          <SoftwareSystem />
          <Rig light={light} />
        </Canvas>
      )}
    </div>
  )
}