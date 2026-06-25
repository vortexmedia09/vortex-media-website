import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()
  const rocketRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(rocketRef.current, { y: 60, opacity: 0, scale: 0.8, duration: 1, delay: 0.2 })
      .from(titleRef.current.children, { y: 80, opacity: 0, stagger: 0.12, duration: 1 }, '-=0.5')
      .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  }, [])

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '120px 24px 80px', position: 'relative',
    }}>
      {/* Rocket logo */}
      <div ref={rocketRef} style={{ marginBottom: 32 }}>
        <img src="/vortex-rocket.png" alt="Vortex Media" style={{
          width: 100, height: 'auto',
          filter: 'drop-shadow(0 0 60px rgba(242,85,44,0.4)) drop-shadow(0 0 120px rgba(242,85,44,0.15))',
        }} />
      </div>

      <div ref={titleRef}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff' }}>
          We Launch
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
          <span style={{ color: '#F2552C' }}>Brands</span> <span style={{ color: '#fff' }}>Into</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff' }}>
          Orbit<span style={{ color: '#F2552C' }}>.</span>
        </div>
      </div>

      <p ref={subRef} style={{
        fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.8vw, 18px)',
        color: 'rgba(255,255,255,0.45)', maxWidth: 520, lineHeight: 1.7,
        marginTop: 28, fontWeight: 400,
      }}>
        A digital marketing agency that transforms brands through strategic content,
        stunning visuals, and data-driven growth.
      </p>

      <div ref={ctaRef} style={{ display: 'flex', gap: 16, marginTop: 40 }}>
        <a href="#contact" style={{
          padding: '16px 36px', borderRadius: 99,
          background: '#F2552C', color: '#fff',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
          boxShadow: '0 8px 40px rgba(242,85,44,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 50px rgba(242,85,44,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(242,85,44,0.35)' }}>
          Start a Project
        </a>
        <a href="#services" style={{
          padding: '16px 36px', borderRadius: 99,
          background: 'transparent', color: 'rgba(255,255,255,0.7)',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'border-color 0.2s, color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#F2552C'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
          Our Services
        </a>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`@keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }`}</style>
    </section>
  )
}
