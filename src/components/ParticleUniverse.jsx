import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }) {
  const mesh = useRef()
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)

    const palette = [
      new THREE.Color('#F2552C'), // Storm orange
      new THREE.Color('#D4A853'), // Gold
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#ffffff'), // White stars
      new THREE.Color('#F59E0B'), // Warm yellow
    ]

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      siz[i] = Math.random() * 0.4 + 0.1
    }
    return [pos, col, siz]
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY.current / maxScroll : 0

    // Camera flies forward as user scrolls
    mesh.current.position.y = progress * 150
    mesh.current.rotation.y = progress * 0.5
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02

    // Gentle rotation
    const geo = mesh.current.geometry
    const posArray = geo.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i * 0.01) * 0.003
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingOrbs() {
  const group = useRef()
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((orb, i) => {
      orb.position.x = Math.sin(t * 0.2 + i * 2) * (8 + i * 3)
      orb.position.z = Math.cos(t * 0.15 + i * 2) * (8 + i * 3)
      orb.position.y = Math.sin(t * 0.1 + i) * 5 - (scrollY.current * 0.02)
    })
  })

  return (
    <group ref={group}>
      {[
        { color: '#F2552C', size: 1.5, emissive: '#F2552C' },
        { color: '#D4A853', size: 1, emissive: '#D4A853' },
        { color: '#3B82F6', size: 0.8, emissive: '#3B82F6' },
      ].map((orb, i) => (
        <mesh key={i}>
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.emissive}
            emissiveIntensity={0.6}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY.current / maxScroll : 0

    // Camera flies forward through the universe
    camera.position.z = 15 - progress * 30
    camera.position.y = progress * -8
    camera.rotation.x = progress * -0.15
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 1.5
  })
  return null
}

export default function ParticleUniverse() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      zIndex: 0, background: 'var(--cream)',
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#F7F3EC']} />
        <fog attach="fog" args={['#F7F3EC', 20, 80]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#F2552C" />
        <pointLight position={[-10, -10, 5]} intensity={0.3} color="#3B82F6" />
        <Particles count={3000} />
        <FloatingOrbs />
        <CameraRig />
      </Canvas>
    </div>
  )
}
