import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef()
  const titleRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(titleRef.current.children, { y: 80, opacity: 0, stagger: 0.12, duration: 1, delay: 0.3 })
      .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  }, [])

  return (
    <section ref={containerRef} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '120px 24px 80px', position: 'relative', overflow: 'hidden',
    }}>


      <div ref={titleRef} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--navy)' }}>
          We Launch
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
          <span style={{ color: 'var(--accent)' }}>Brands</span> Into
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--navy)' }}>
          Orbit<span style={{ color: 'var(--accent)' }}>.</span>
        </div>
      </div>

      <p ref={subRef} style={{
        fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 20px)',
        color: 'var(--text-2)', maxWidth: 560, lineHeight: 1.6,
        marginTop: 28, position: 'relative', zIndex: 1, fontWeight: 400,
      }}>
        Vortex Media is a digital marketing agency that transforms brands through
        strategic content, stunning visuals, and data-driven growth.
      </p>

      <div ref={ctaRef} style={{ display: 'flex', gap: 16, marginTop: 40, position: 'relative', zIndex: 1 }}>
        <a href="#contact" style={{
          padding: '16px 36px', borderRadius: 99,
          background: 'var(--accent)', color: '#fff',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
          boxShadow: '0 8px 30px rgba(242,85,44,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(242,85,44,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(242,85,44,0.3)' }}>
          Start a Project →
        </a>
        <a href="#services" style={{
          padding: '16px 36px', borderRadius: 99,
          background: 'transparent', color: 'var(--navy)',
          fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
          border: '1.5px solid rgba(22,24,31,0.15)',
          transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(22,24,31,0.15)'}>
          Our Services
        </a>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text-3), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>
    </section>
  )
}
