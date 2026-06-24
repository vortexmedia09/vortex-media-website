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
    <section id="clients" ref={ref} style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto', background: 'rgba(247,243,236,0.85)', backdropFilter: 'blur(20px)', borderRadius: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Our Clients</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: 48 }}>
        Trusted by brands that dare to grow<span style={{ color: 'var(--accent)' }}>.</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {CLIENTS.map(c => (
          <div key={c.name} className="client-card" style={{
            padding: '28px 24px', borderRadius: 16, textAlign: 'center',
            background: '#fff', border: '1px solid rgba(22,24,31,0.06)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--accent)' + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 24, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
              {c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.industry}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
