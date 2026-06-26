import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef()
  const logoRef = useRef()
  const textRef = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0, duration: 0.5, ease: 'power2.inOut',
          onComplete: () => onComplete()
        })
      }
    })
    const interval = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(interval); return 100 } return p + Math.random() * 18 })
    }, 80)
    tl.from(logoRef.current, { scale: 0.5, opacity: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.2 })
      .from(textRef.current, { y: 15, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to({}, { duration: 1.2 })
      .to(logoRef.current, { y: -20, scale: 1.05, duration: 0.7, ease: 'power2.in' })
      .to(textRef.current, { opacity: 0, duration: 0.3 }, '-=0.5')
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#F7F3EC',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)',
    }}>
      <div ref={logoRef} style={{ marginBottom: 28 }}>
        <img src="/vortex-rocket.png" alt="Vortex Media" style={{
          width: 80, height: 'auto',
          filter: 'drop-shadow(0 8px 32px rgba(242,85,44,0.2))',
        }} />
      </div>
      <div ref={textRef} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#16181F', letterSpacing: '-0.02em', marginBottom: 4 }}>
          VORTEX<span style={{ color: '#F2552C' }}>.</span>MEDIA
        </div>
        <div style={{ fontSize: 11, fontWeight: 400, color: '#8A8A9A', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Integrated. Impact-Driven.
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 60, width: 160 }}>
        <div style={{ height: 2, background: 'rgba(22,24,31,0.06)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #F2552C, #D4A853)', borderRadius: 99, width: Math.min(progress, 100) + '%', transition: 'width 0.2s ease' }} />
        </div>
      </div>
    </div>
  )
}
