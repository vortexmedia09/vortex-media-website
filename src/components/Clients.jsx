import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CLIENTS = [
  { name: 'Dr. Vidhi Doshi', industry: 'Healthcare', desc: 'Ozone Therapy Clinic, Valsad' },
  { name: 'Nature Cure', industry: 'Wellness', desc: 'Naturopathy Clinic, Valsad' },
  { name: 'Shantivan Sanidhya', industry: 'Real Estate', desc: 'Luxury Bungalows, Valsad' },
  { name: 'Virtual Vision 3D', industry: 'Technology', desc: '3D Visualization Studio' },
  { name: 'Corbitose', industry: 'Technology', desc: 'Software Development' },
  { name: 'Vortex Media', industry: 'Agency', desc: 'Our Own Brand' },
]

export default function Clients() {
  const ref = useRef()
  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.client-card'), {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      scale: 0.9, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'back.out(1.5)'
    })
  }, [])

  return (
    <section id="clients" ref={ref} style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2552C', marginBottom: 16 }}>Our Clients</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: 40 }}>
          Trusted by brands that dare to grow<span style={{ color: '#F2552C' }}>.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {CLIENTS.map(c => (
            <div key={c.name} className="client-card" style={{
              padding: '24px 20px', borderRadius: 14, textAlign: 'center',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(242,85,44,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(242,85,44,0.1)', border: '1px solid rgba(242,85,44,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', fontSize: 18, fontWeight: 700,
                color: '#F2552C', fontFamily: 'var(--font-display)',
              }}>
                {c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#F2552C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{c.industry}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
