import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 1500

  const SPREAD_X = 21
  const SPREAD_Y = 22
  const SPREAD_Z = 10

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      speeds[i] = 0.01 + Math.random() * 0.03
    }

    return { positions, speeds }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) - speeds[i]

      if (y < -SPREAD_Y / 2) {
        y = SPREAD_Y / 2
      }

      posAttr.setY(i, y)
    }
    posAttr.needsUpdate = true

    const targetX = state.mouse.x * 0.4
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ff6b6b"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}