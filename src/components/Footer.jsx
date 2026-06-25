export default function Footer() {
  return (
    <footer style={{ padding: '36px 24px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/vortex-rocket.png" alt="Vortex" style={{ width: 24, height: 24 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
            VORTEX<span style={{ color: '#F2552C' }}>.</span>MEDIA
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {[
            { label: 'Instagram', href: 'https://instagram.com/vortex.agency' },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/vortexmedia09' },
            { label: 'Facebook', href: 'https://facebook.com/vortexmedia09' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#F2552C'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>{s.label}</a>
          ))}
          <a href="https://vortex-os-aldq.vercel.app" target="_blank" rel="noreferrer"
            style={{
              padding: '5px 12px', borderRadius: 99,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F2552C'; e.currentTarget.style.color = '#F2552C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}>
            Team Portal
          </a>
        </div>
        <div style={{ width: '100%', textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 12 }}>
          {new Date().getFullYear()} Vortex Media. Valsad, Gujarat, India.
        </div>
      </div>
    </footer>
  )
}
