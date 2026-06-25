import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'

function StarField({ count = 2500 }) {
  const ref = useRef()
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      [0.95, 0.33, 0.17], // Storm orange
      [0.83, 0.66, 0.33], // Gold
      [0.23, 0.51, 0.96], // Blue
      [1, 1, 1], [1, 1, 1], [1, 1, 1], // White (more common)
    ]
    for (let i = 0; i < count; i++) {
      const spread = i < count * 0.7 ? 100 : 40
      pos[i*3] = (Math.random()-0.5) * spread
      pos[i*3+1] = Math.random() * -500 - 10
      pos[i*3+2] = (Math.random()-0.5) * spread
      const c = palette[Math.floor(Math.random()*palette.length)]
      col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2]
    }
    return [pos, col]
  }, [count])

  useFrame(({clock}) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.18} vertexColors transparent opacity={0.85} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function FloatingGeo() {
  const group = useRef()
  useFrame(({clock}) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.children.forEach((m, i) => {
      m.rotation.x = t * 0.1 * (i % 2 ? 1 : -1)
      m.rotation.y = t * 0.15 * (i % 3 ? 1 : -1)
      m.position.y = m.userData.baseY + Math.sin(t * 0.3 + i) * 2
    })
  })

  const shapes = useMemo(() => [
    { pos: [-12, -40, -15], size: [3, 32, 3], color: '#F2552C', opacity: 0.06, type: 'torus' },
    { pos: [15, -120, -10], size: [2, 32, 16], color: '#3B82F6', opacity: 0.05, type: 'torus' },
    { pos: [-8, -200, -20], size: [4, 32, 32], color: '#D4A853', opacity: 0.04, type: 'sphere' },
    { pos: [10, -300, -12], size: [3, 32, 3], color: '#F2552C', opacity: 0.05, type: 'torus' },
    { pos: [-15, -400, -18], size: [2.5, 32, 16], color: '#10B981', opacity: 0.04, type: 'torus' },
  ], [])

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} userData={{baseY: s.pos[1]}}>
          {s.type === 'torus' 
            ? <torusGeometry args={s.size} />
            : <sphereGeometry args={s.size} />
          }
          <meshStandardMaterial color={s.color} transparent opacity={s.opacity} wireframe emissive={s.color} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Nebula({ count = 300 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 20
      pos[i*3] = Math.cos(angle) * radius
      pos[i*3+1] = -80 + Math.random() * -60
      pos[i*3+2] = Math.sin(angle) * radius + (Math.random()-0.5) * 10
    }
    return pos
  }, [count])

  useFrame(({clock}) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#F2552C" transparent opacity={0.12} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function CameraController() {
  const { camera } = useThree()
  const scroll = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const maxScroll = useRef(1)

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY
      maxScroll.current = Math.max(1, document.body.scrollHeight - window.innerHeight)
    }
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useFrame(() => {
    const p = scroll.current / maxScroll.current
    // Fly downward through the star field
    camera.position.y = -p * 450
    // Subtle mouse parallax
    camera.position.x += (mouse.current.x * 3 - camera.position.x) * 0.02
    camera.rotation.x = -0.05 + mouse.current.y * 0.02
    camera.rotation.z = mouse.current.x * 0.01
  })
  return null
}

function DynamicBackground() {
  const { scene } = useThree()
  const scroll = useRef(0)
  const maxScroll = useRef(1)
  const dark = new THREE.Color('#06060C')
  const deep = new THREE.Color('#0a0f1e')
  const mid = new THREE.Color('#12243d')
  const warm = new THREE.Color('#1a2a3a')

  useEffect(() => {
    const fn = () => {
      scroll.current = window.scrollY
      maxScroll.current = Math.max(1, document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useFrame(() => {
    const p = scroll.current / maxScroll.current
    let c
    if (p < 0.3) c = dark.clone().lerp(deep, p / 0.3)
    else if (p < 0.6) c = deep.clone().lerp(mid, (p-0.3) / 0.3)
    else c = mid.clone().lerp(warm, (p-0.6) / 0.4)
    scene.background = c
    if (scene.fog) scene.fog.color = c
  })
  return null
}

export default function LaunchScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 65, near: 0.1, far: 600 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <fog attach="fog" args={['#06060C', 30, 120]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[10, -50, 10]} intensity={1} color="#F2552C" distance={120} decay={2} />
        <pointLight position={[-15, -150, 8]} intensity={0.6} color="#3B82F6" distance={120} decay={2} />
        <pointLight position={[5, -300, -5]} intensity={0.8} color="#D4A853" distance={150} decay={2} />
        <StarField count={3000} />
        <Nebula count={400} />
        <FloatingGeo />
        <DynamicBackground />
        <CameraController />
      </Canvas>
    </div>
  )
}
