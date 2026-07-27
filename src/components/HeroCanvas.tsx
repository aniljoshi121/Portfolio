import { Canvas } from "@react-three/fiber"
import { ParticleField } from "@/three/ParticleField"

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      className="pointer-events-none absolute inset-0"
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ParticleField />
    </Canvas>
  )
}