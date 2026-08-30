'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

extend({
  Group: THREE.Group,
  Points: THREE.Points,
  LineSegments: THREE.LineSegments,
  Mesh: THREE.Mesh,
  BufferGeometry: THREE.BufferGeometry,
  BufferAttribute: THREE.BufferAttribute,
  PointsMaterial: THREE.PointsMaterial,
  LineBasicMaterial: THREE.LineBasicMaterial,
  MeshBasicMaterial: THREE.MeshBasicMaterial,
  PlaneGeometry: THREE.PlaneGeometry,
})

interface SoftwareCoreProps {
  scrollProgress?: number
  section?: 'hero' | 'services' | 'capabilities' | 'process' | 'cta'
  className?: string
}

const NODE_COUNT = 120
const CONNECTION_DISTANCE = 2.5

const positionsRef = { current: new Float32Array(NODE_COUNT * 3) }
const velocitiesRef = { current: new Float32Array(NODE_COUNT * 3) }
const originalPositionsRef = { current: new Float32Array(NODE_COUNT * 3) }
const targetPositionsRef = { current: new Float32Array(NODE_COUNT * 3) }
const nodeDataRef = { current: [] as Array<{ layer: number; angle: number; radius: number; speed: number }> }

function initializeNodeData() {
  for (let i = 0; i < NODE_COUNT; i++) {
    const layer = Math.floor(Math.random() * 7)
    const angle = Math.random() * Math.PI * 2
    const radius = 0.5 + Math.random() * 1.5
    const speed = 0.5 + Math.random() * 1.5

    nodeDataRef.current[i] = { layer, angle, radius, speed }

    const baseIndex = i * 3

    positionsRef.current[baseIndex] = Math.cos(angle) * radius
    positionsRef.current[baseIndex + 1] = (layer - 3) * 0.5
    positionsRef.current[baseIndex + 2] = Math.sin(angle) * radius

    originalPositionsRef.current[baseIndex] = positionsRef.current[baseIndex]
    originalPositionsRef.current[baseIndex + 1] = positionsRef.current[baseIndex + 1]
    originalPositionsRef.current[baseIndex + 2] = positionsRef.current[baseIndex + 2]

    targetPositionsRef.current[baseIndex] = positionsRef.current[baseIndex]
    targetPositionsRef.current[baseIndex + 1] = positionsRef.current[baseIndex + 1]
    targetPositionsRef.current[baseIndex + 2] = positionsRef.current[baseIndex + 2]
  }
}

initializeNodeData()

function CoreSystem({ scrollProgress = 0, section = 'hero' }: { scrollProgress: number; section: string }) {
  const nodesRef = useRef<THREE.Points | null>(null)
  const linesRef = useRef<THREE.LineSegments | null>(null)
  const planesRef = useRef<THREE.Group | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const { viewport } = useThree()

  useEffect(() => {
    if (!nodesRef.current || !linesRef.current) return

    const positions = positionsRef.current
    const originalPositions = originalPositionsRef.current
    const targetPositions = targetPositionsRef.current

    const sectionConfigs = {
      hero: { separation: 0, layers: 1, radius: 1.2 },
      services: { separation: 1.5, layers: 8, radius: 0.8 },
      capabilities: { separation: 2, layers: 7, radius: 0.6 },
      process: { separation: 1.8, layers: 7, radius: 0.7 },
      cta: { separation: 0, layers: 1, radius: 1.2 },
    }

    const config = sectionConfigs[section as keyof typeof sectionConfigs] || sectionConfigs.hero

    for (let i = 0; i < NODE_COUNT; i++) {
      const nodeData = nodeDataRef.current[i]
      const baseIndex = i * 3

      if (config.separation === 0) {
        targetPositions[baseIndex] = originalPositions[baseIndex]
        targetPositions[baseIndex + 1] = originalPositions[baseIndex + 1]
        targetPositions[baseIndex + 2] = originalPositions[baseIndex + 2]
      } else {
        const layer = nodeData.layer
        const layerOffset = (layer - (config.layers - 1) / 2) * config.separation
        targetPositions[baseIndex] = Math.cos(nodeData.angle) * config.radius
        targetPositions[baseIndex + 1] = layerOffset
        targetPositions[baseIndex + 2] = Math.sin(nodeData.angle) * config.radius
      }
    }
  }, [section])

  useFrame((state, delta) => {
    if (!nodesRef.current || !linesRef.current || !positionsRef.current) return

    const positions = positionsRef.current
    const velocities = velocitiesRef.current
    const targetPositions = targetPositionsRef.current
    const originalPositions = originalPositionsRef.current
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < NODE_COUNT; i++) {
      const baseIndex = i * 3
      const nodeData = nodeDataRef.current[i]

      const dx = targetPositions[baseIndex] - positions[baseIndex]
      const dy = targetPositions[baseIndex + 1] - positions[baseIndex + 1]
      const dz = targetPositions[baseIndex + 2] - positions[baseIndex + 2]

      velocities[baseIndex] += dx * 0.03
      velocities[baseIndex + 1] += dy * 0.03
      velocities[baseIndex + 2] += dz * 0.03

      velocities[baseIndex] *= 0.92
      velocities[baseIndex + 1] *= 0.92
      velocities[baseIndex + 2] *= 0.92

      positions[baseIndex] += velocities[baseIndex]
      positions[baseIndex + 1] += velocities[baseIndex + 1]
      positions[baseIndex + 2] += velocities[baseIndex + 2]

      const floatOffset = Math.sin(time * nodeData.speed + nodeData.angle) * 0.02
      positions[baseIndex + 1] += floatOffset
    }

    if (nodesRef.current) {
      nodesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (linesRef.current && planesRef.current) {
      updateConnections()
      updatePlanes(time)
    }

    if (particlesRef.current) {
      updateParticles(delta, time)
    }
  })

  const updateConnections = () => {
    const positions = positionsRef.current
    if (!linesRef.current) return
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array
    let lineIndex = 0
    const maxLines = linePositions.length / 6

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (lineIndex >= maxLines) break

        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE) {
          linePositions[lineIndex * 6] = positions[i * 3]
          linePositions[lineIndex * 6 + 1] = positions[i * 3 + 1]
          linePositions[lineIndex * 6 + 2] = positions[i * 3 + 2]
          linePositions[lineIndex * 6 + 3] = positions[j * 3]
          linePositions[lineIndex * 6 + 4] = positions[j * 3 + 1]
          linePositions[lineIndex * 6 + 5] = positions[j * 3 + 2]

          lineIndex++
        }
      }
    }

    for (let i = lineIndex * 6; i < linePositions.length; i += 6) {
      linePositions[i] = 0
      linePositions[i + 1] = -100
      linePositions[i + 2] = 0
      linePositions[i + 3] = 0
      linePositions[i + 4] = -100
      linePositions[i + 5] = 0
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true
  }

  const updatePlanes = (time: number) => {
    if (!planesRef.current) return

    planesRef.current.children.forEach((plane, index) => {
      if (plane instanceof THREE.Mesh) {
        plane.rotation.y += 0.0005 * (index + 1)
        plane.rotation.x = Math.sin(time * 0.3 + index) * 0.1
        if (plane.material instanceof THREE.MeshBasicMaterial) {
          plane.material.opacity = 0.03 + Math.sin(time + index) * 0.01
        }
      }
    })
  }

  const updateParticles = (delta: number, time: number) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array

    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3 + 1] -= delta * 0.3

      if (positions[i * 3 + 1] < -5) {
        positions[i * 3] = (Math.random() - 0.5) * 8
        positions[i * 3 + 1] = 5
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8
        sizes[i] = Math.random() * 2 + 0.5
      }

      sizes[i] = 1 + Math.sin(time * 2 + i) * 0.5
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.size.needsUpdate = true
  }

  return (
    <group>
      <points
        ref={nodesRef}
        onPointerOver={(e) => { (e.object as THREE.Points).material = ((e.object as THREE.Points).material as THREE.PointsMaterial).clone(); ((e.object as THREE.Points).material as THREE.PointsMaterial).size = 4; }}
        onPointerOut={(e) => { (e.object as THREE.Points).material = ((e.object as THREE.Points).material as THREE.PointsMaterial).clone(); ((e.object as THREE.Points).material as THREE.PointsMaterial).size = 2.5; }}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            itemSize={3}
            array={positionsRef.current}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-size"
            count={NODE_COUNT}
            itemSize={1}
            array={new Float32Array(NODE_COUNT).map(() => Math.random() * 1.5 + 2)}
            usage={THREE.StaticDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0xffffff}
          size={2.5}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT * 10}
            itemSize={3}
            array={new Float32Array(NODE_COUNT * 10 * 3)}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={0xffffff}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <group ref={planesRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i}>
            <planeGeometry args={[4 - i * 0.4, 4 - i * 0.4]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? 0xffffff : 0xaaaaaa}
              transparent
              opacity={0.02}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            itemSize={3}
            array={new Float32Array(200 * 3).map((_, i) =>
              i % 3 === 0 ? (Math.random() - 0.5) * 8
                : i % 3 === 1 ? Math.random() * 10 - 5
                : (Math.random() - 0.5) * 8
            )}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-size"
            count={200}
            itemSize={1}
            array={new Float32Array(200).map(() => Math.random() * 2 + 0.5)}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0xffffff}
          size={1}
          sizeAttenuation
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export function SoftwareCoreCanvas({ scrollProgress = 0, section = 'hero', className = '' }: SoftwareCoreProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return (
      <div className={className} style={{ width: '100%', height: '100%', minHeight: '600px' }} aria-hidden="true" />
    )
  }

  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: '600px' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
        shadows={false}
        dpr={[1, 1.5]}
        style={{ touchAction: 'none' }}
      >
        <color attach="background" args={[0x000000]} />
        <fog attach="fog" args={[0x000000, 3, 15]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.3} />
        <pointLight position={[-3, 5, 3]} intensity={0.2} color={0xffffff} />

        <CoreSystem scrollProgress={scrollProgress} section={section} />
      </Canvas>
    </div>
  )
}