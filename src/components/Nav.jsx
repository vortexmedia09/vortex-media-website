import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      padding: scrolled ? '14px 40px' : '20px 40px',
      background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/vortex-rocket.png" alt="Vortex" style={{ width: 32, height: 32 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
          VORTEX<span style={{ color: '#F2552C' }}>.</span>MEDIA
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {['About', 'Services', 'Clients', 'Process', 'Contact'].map(s => (
          <a key={s} href={'#' + s.toLowerCase()}
            style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.01em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#F2552C'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>{s}</a>
        ))}
        <a href="https://vortex-os-aldq.vercel.app" target="_blank" rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 18px', borderRadius: 99,
            background: 'rgba(242,85,44,0.15)', border: '1px solid rgba(242,85,44,0.3)',
            color: '#F2552C', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,85,44,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(242,85,44,0.15)'}>
          Team Login
        </a>
      </div>
    </nav>
  )
}
