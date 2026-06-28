import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function VortexParticles({ count = 1200 }) {
  const ref = useRef()
  const scroll = useRef(0)
  const maxScroll = useRef(1)

  useEffect(() => {
    const fn = () => {
      scroll.current = window.scrollY
      maxScroll.current = Math.max(1, document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    fn()
    return () => { window.removeEventListener('scroll', fn); window.removeEventListener('resize', fn) }
  }, [])

  const [initPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      [0.95, 0.33, 0.17],  // #F2552C orange
      [0.83, 0.66, 0.33],  // #D4A853 gold
      [0.09, 0.09, 0.12],  // #16181F navy
      [0.23, 0.51, 0.96],  // #3B82F6 blue
      [0.95, 0.33, 0.17],  // more orange
      [0.83, 0.66, 0.33],  // more gold
    ]
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 18
      const height = (Math.random() - 0.5) * 30
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2]
    }
    return [pos, col]
  }, [count])

  const positions = useMemo(() => new Float32Array(initPositions), [initPositions])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    const p = scroll.current / maxScroll.current
    const posArr = ref.current.geometry.attributes.position.array

    // Vortex speed increases slightly with scroll
    const speed = 0.15 + p * 0.1
    // Vortex tightness: starts tight, expands as you scroll, then settles
    const expansion = 1 + Math.sin(p * Math.PI) * 0.6

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const x = initPositions[ix]
      const y = initPositions[iy]
      const z = initPositions[iz]

      const radius = Math.sqrt(x * x + z * z) * expansion
      const baseAngle = Math.atan2(z, x)
      const angle = baseAngle + t * speed * (1 / (radius * 0.15 + 0.5))

      posArr[ix] = Math.cos(angle) * radius
      posArr[iy] = y + Math.sin(t * 0.3 + i * 0.01) * 0.5
      posArr[iz] = Math.sin(angle) * radius
    }
    ref.current.geometry.attributes.position.needsUpdate = true

    // Slow rotation of entire system
    ref.current.rotation.y = t * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingRings() {
  const group = useRef()
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.children.forEach((ring, i) => {
      ring.rotation.x = t * 0.05 * (i % 2 ? 1 : -1) + i * 0.5
      ring.rotation.z = t * 0.03 * (i % 2 ? -1 : 1)
    })
  })

  return (
    <group ref={group}>
      {[
        { radius: 8, tube: 0.02, color: '#F2552C', opacity: 0.18 },
        { radius: 12, tube: 0.015, color: '#D4A853', opacity: 0.14 },
        { radius: 16, tube: 0.01, color: '#3B82F6', opacity: 0.10 },
      ].map((r, i) => (
        <mesh key={i} rotation={[Math.PI * 0.3 * i, 0, Math.PI * 0.2 * i]}>
          <torusGeometry args={[r.radius, r.tube, 16, 100]} />
          <meshBasicMaterial color={r.color} transparent opacity={r.opacity} />
        </mesh>
      ))}
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.015
    camera.position.y += (-mouse.current.y * 1.5 - camera.position.y) * 0.015
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function LaunchScene() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0,
      background: '#F7F3EC',
    }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#F7F3EC']} />
        <ambientLight intensity={0.8} />
        <VortexParticles count={2000} />
        <FloatingRings />
        <CameraController />
      </Canvas>
    </div>
  )
}
