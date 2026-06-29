import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

// Create circular particle texture
function makeCircleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64; canvas.height = 64
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas)
}
const circleTexture = makeCircleTexture()
import * as THREE from 'three'

// Volumetric cloud layer
function CloudLayer({ y, count = 60, spread = 30, opacity = 0.06, color = '#fff' }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 2 + Math.random() * spread
      pos[i*3] = Math.cos(angle) * r
      pos[i*3+1] = y + (Math.random() - 0.5) * 6
      pos[i*3+2] = Math.sin(angle) * r
    }
    return pos
  }, [count, spread, y])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={Math.random() * 1.5 + 0.8} color={color} transparent opacity={opacity} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// Vortex tunnel of particles
function VortexTunnel({ count = 2000 }) {
  const ref = useRef()
  const scroll = useRef(0)

  useEffect(() => {
    const fn = () => { scroll.current = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      [0.95, 0.33, 0.17], // orange
      [0.83, 0.66, 0.33], // gold
      [0.95, 0.33, 0.17], // orange
      [1, 1, 1],           // white
      [0.5, 0.6, 0.95],   // soft blue
    ]
    for (let i = 0; i < count; i++) {
      const t = i / count
      const angle = t * Math.PI * 40
      const radius = 3 + Math.sin(t * 8) * 2 + (1 - t) * 10
      const depth = t * -200
      pos[i*3]   = Math.cos(angle) * radius
      pos[i*3+1] = depth + (Math.random() - 0.5) * 4
      pos[i*3+2] = Math.sin(angle) * radius
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2]
    }
    return [pos, col]
  }, [count])

  const pos = useMemo(() => new Float32Array(positions), [positions])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.06
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.18} vertexColors transparent opacity={0.75} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} map={circleTexture} />
    </points>
  )
}

// Lightning streaks (data streams)
function DataStreaks({ count = 30 }) {
  const refs = useRef([])
  const streakData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      start: new THREE.Vector3((Math.random()-0.5)*40, -Math.random()*60-10, (Math.random()-0.5)*40),
      end: new THREE.Vector3((Math.random()-0.5)*30, -Math.random()*80-30, (Math.random()-0.5)*30),
      color: Math.random() > 0.5 ? '#F2552C' : '#D4A853',
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame(({ clock }) => {
    refs.current.forEach((ref, i) => {
      if (!ref) return
      const d = streakData[i]
      const t = (Math.sin(clock.elapsedTime * d.speed + d.phase) + 1) * 0.5
      ref.material.opacity = t * 0.4
    })
  })

  return (
    <>
      {streakData.map((d, i) => {
        const points = [d.start, d.end]
        const geom = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} ref={el => refs.current[i] = el} geometry={geom}>
            <lineBasicMaterial color={d.color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </line>
        )
      })}
    </>
  )
}

// Atmospheric fog particles
function AtmosFog({ count = 800 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-0.5) * 80
      pos[i*3+1] = -Math.random() * 200
      pos[i*3+2] = (Math.random()-0.5) * 80
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#8899cc" transparent opacity={0.12} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} map={circleTexture} />
    </points>
  )
}

function CameraController() {
  const { camera } = useThree()
  const scroll = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
    }
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  useFrame(({ clock }) => {
    const p = scroll.current
    const t = clock.elapsedTime

    // Descend through the vortex
    camera.position.y = -p * 180
    camera.position.z = 20 - p * 8

    // Mouse parallax
    camera.position.x += (mouse.current.x * 3 - camera.position.x) * 0.02
    camera.rotation.z = mouse.current.x * 0.015
    camera.rotation.x = -0.05 + mouse.current.y * 0.02 + p * 0.08

    // Subtle camera shake when deep in vortex
    if (p > 0.3) {
      const shake = (p - 0.3) * 0.3
      camera.position.x += Math.sin(t * 3.7) * shake
      camera.position.y += Math.sin(t * 2.3 + 1) * shake * 0.5
    }
  })
  return null
}

function SceneBackground() {
  const { scene } = useThree()
  const scroll = useRef(0)

  useEffect(() => {
    const fn = () => { scroll.current = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const top = new THREE.Color('#0a0a14')
  const mid = new THREE.Color('#0d1020')
  const storm = new THREE.Color('#080812')

  useFrame(() => {
    const p = scroll.current
    let c
    if (p < 0.4) c = top.clone().lerp(mid, p / 0.4)
    else c = mid.clone().lerp(storm, (p - 0.4) / 0.6)
    scene.background = c
    if (scene.fog) scene.fog.color = c
  })
  return null
}

export default function CloudScene() {
  const cloudLayers = [
    { y: -5,  count: 80,  spread: 35, opacity: 0.05, color: '#aabbdd' },
    { y: -20, count: 100, spread: 40, opacity: 0.04, color: '#8899bb' },
    { y: -40, count: 70,  spread: 30, opacity: 0.06, color: '#F2552C' },
    { y: -70, count: 90,  spread: 45, opacity: 0.04, color: '#aabbdd' },
    { y: -100,count: 80,  spread: 35, opacity: 0.05, color: '#D4A853' },
    { y: -140,count: 100, spread: 40, opacity: 0.04, color: '#8899bb' },
  ]

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 65, near: 0.1, far: 500 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <fog attach="fog" args={['#0a0a14', 20, 100]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, -20, 5]} intensity={2} color="#F2552C" distance={60} decay={2} />
        <pointLight position={[10, -60, 0]} intensity={1.5} color="#3B82F6" distance={80} decay={2} />
        <pointLight position={[-10, -120, 5]} intensity={1} color="#D4A853" distance={100} decay={2} />
        <VortexTunnel count={2500} />
        {cloudLayers.map((cl, i) => <CloudLayer key={i} {...cl} />)}
        <DataStreaks count={25} />
        <AtmosFog count={600} />
        <SceneBackground />
        <CameraController />
      </Canvas>
    </div>
  )
}
