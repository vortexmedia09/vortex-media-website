import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef()
  const logoRef = useRef()
  const textRef = useRef()
  const barRef = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0, duration: 0.6, ease: 'power2.inOut',
          onComplete: () => onComplete()
        })
      }
    })

    // Simulate loading
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 15
      })
    }, 100)

    // Logo animation: scale up + fade in
    tl.from(logoRef.current, { scale: 0.3, opacity: 0, duration: 1.2, ease: 'back.out(1.7)', delay: 0.3 })
      .from(textRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to({}, { duration: 1.5 }) // wait for "loading"
      .to(logoRef.current, { y: -30, scale: 1.1, duration: 0.8, ease: 'power2.in' })
      .to(textRef.current, { opacity: 0, duration: 0.3 }, '-=0.6')

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#0A0A0F',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)',
    }}>
      {/* Subtle star particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          borderRadius: '50%',
          background: ['#F2552C', '#D4A853', '#3B82F6', '#fff', '#fff', '#fff'][Math.floor(Math.random() * 6)],
          opacity: Math.random() * 0.5 + 0.1,
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
        }} />
      ))}

      {/* Rocket logo */}
      <div ref={logoRef} style={{ marginBottom: 32 }}>
        <img src="/vortex-rocket.png" alt="Vortex Media" style={{
          width: 120, height: 'auto', filter: 'drop-shadow(0 0 40px rgba(242,85,44,0.3))',
        }} />
      </div>

      {/* Brand text */}
      <div ref={textRef} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>
          VORTEX<span style={{ color: '#F2552C' }}>.</span>MEDIA
        </div>
        <div style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Launching brands into orbit
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 60, width: 200 }}>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
          <div ref={barRef} style={{
            height: '100%', background: 'linear-gradient(90deg, #F2552C, #D4A853)',
            borderRadius: 99, width: Math.min(progress, 100) + '%',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.6} }
      `}</style>
    </div>
  )
}
