export default function Footer() {
  return (
    <footer style={{ padding: '40px 24px', background: '#06060A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/rocket.png" alt="Vortex" style={{ width: 28, height: 28, borderRadius: 6, background: '#fff', padding: 3 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
            VORTEX<span style={{ color: 'var(--accent)' }}>.</span>MEDIA
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {[
            { label: 'Instagram', href: 'https://instagram.com/vortex.agency' },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/vortexmedia09' },
            { label: 'Facebook', href: 'https://facebook.com/vortexmedia09' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>{s.label}</a>
          ))}
          <a href="https://vortex-os-aldq.vercel.app" target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 99,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}>
            🔑 Team Portal
          </a>
        </div>
        <div style={{ width: '100%', textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>
          © {new Date().getFullYear()} Vortex Media · Valsad, Gujarat, India
        </div>
      </div>
    </footer>
  )
}
