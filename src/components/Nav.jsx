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
      background: scrolled ? 'rgba(247,243,236,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(22,24,31,0.06)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/rocket.png" alt="Vortex" style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', padding: 4 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
          VORTEX<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['About', 'Services', 'Clients', 'Process', 'Contact'].map(s => (
          <a key={s} href={'#' + s.toLowerCase()}
            style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--text-2)', letterSpacing: '0.01em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-2)'}>{s}</a>
        ))}
        <a href="https://vortex-os-aldq.vercel.app" target="_blank" rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 18px', borderRadius: 99,
            background: 'var(--navy)', color: '#fff',
            fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(10,10,15,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
          🔑 Team Login
        </a>
      </div>
    </nav>
  )
}
