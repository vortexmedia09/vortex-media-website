import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Stars({ count = 1500 }) {
  const ref = useRef()
  const scrollY = useRef(0)

  useEffect(() => {
    const fn = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const palette = [
      new THREE.Color('#F2552C'),
      new THREE.Color('#D4A853'),
      new THREE.Color('#3B82F6'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#F59E0B'),
    ]
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = Math.random() * -300
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
      siz[i] = Math.random() * 0.3 + 0.05
    }
    return [pos, col, siz]
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posArr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.2 + i * 0.1) * 0.005
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function AtmosphereParticles({ count = 800 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = -300 + Math.random() * -100
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posArr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += Math.sin(t * 0.1 + i) * 0.01
      posArr[i * 3 + 2] += Math.cos(t * 0.1 + i) * 0.01
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} color="#D4A853" transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const scrollY = useRef(0)
  const maxScroll = useRef(1)

  useEffect(() => {
    const fn = () => {
      scrollY.current = window.scrollY
      maxScroll.current = Math.max(1, document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    fn()
    return () => { window.removeEventListener('scroll', fn); window.removeEventListener('resize', fn) }
  }, [])

  useFrame((state) => {
    const progress = scrollY.current / maxScroll.current
    const t = state.clock.elapsedTime

    // Camera flies downward through the universe
    camera.position.y = -progress * 350
    camera.position.x = Math.sin(t * 0.05) * 2
    camera.position.z = 15 + Math.sin(progress * Math.PI) * 5
    camera.rotation.z = Math.sin(t * 0.03) * 0.01
  })
  return null
}

function BackgroundColor() {
  const { scene } = useThree()
  const scrollY = useRef(0)
  const maxScroll = useRef(1)

  useEffect(() => {
    const fn = () => {
      scrollY.current = window.scrollY
      maxScroll.current = Math.max(1, document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const dark = new THREE.Color('#0A0A0F')
  const mid = new THREE.Color('#0f1a2e')
  const sky = new THREE.Color('#1a3a5c')
  const cream = new THREE.Color('#F7F3EC')

  useFrame(() => {
    const p = scrollY.current / maxScroll.current
    let color
    if (p < 0.25) {
      color = dark.clone().lerp(mid, p / 0.25)
    } else if (p < 0.5) {
      color = mid.clone().lerp(sky, (p - 0.25) / 0.25)
    } else {
      color = sky.clone().lerp(cream, (p - 0.5) / 0.5)
    }
    scene.background = color
    scene.fog.color = color
  })
  return null
}

export default function LaunchScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <fog attach="fog" args={['#0A0A0F', 25, 90]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, -50, 10]} intensity={0.8} color="#F2552C" distance={100} />
        <pointLight position={[-10, -150, 5]} intensity={0.5} color="#3B82F6" distance={100} />
        <pointLight position={[0, -300, 0]} intensity={0.6} color="#D4A853" distance={150} />
        <Stars count={2000} />
        <AtmosphereParticles count={600} />
        <BackgroundColor />
        <CameraRig />
      </Canvas>
    </div>
  )
}
