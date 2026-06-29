export default function Marquee({ text = 'Integrated · Impact-Driven · Built to Scale · Vortex Media · ', dark = false }) {
  const content = Array(6).fill(text).join('')
  return (
    <div style={{
      overflow: 'hidden', whiteSpace: 'nowrap',
      padding: '18px 0',
      background: dark ? '#F2552C' : 'var(--dark)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        display: 'inline-block',
        animation: 'marquee 20s linear infinite',
        fontFamily: 'var(--font-display)',
        fontSize: 13, fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#fff',
        opacity: dark ? 1 : 0.4,
      }}>
        {content}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
