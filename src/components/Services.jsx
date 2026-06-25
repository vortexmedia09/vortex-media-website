import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SERVICES = [
  { title: 'Social Media Management', desc: 'Instagram, Facebook, LinkedIn \u2014 strategy, content, scheduling, and analytics.', color: '#F2552C' },
  { title: 'Brand Identity & Design', desc: 'Logo, brand guidelines, visual systems \u2014 everything to stand out and stay consistent.', color: '#D4A853' },
  { title: 'Website & Landing Pages', desc: 'High-converting websites built for speed, SEO, and results.', color: '#3B82F6' },
  { title: 'Content Production', desc: 'Photography, videography, reels, motion graphics \u2014 content that captures.', color: '#10B981' },
  { title: 'Performance Marketing', desc: 'Meta Ads, Google Ads \u2014 targeted campaigns optimized for maximum ROI.', color: '#8B5CF6' },
  { title: 'SEO & Local Presence', desc: 'Google My Business, local SEO, reputation management \u2014 dominate search.', color: '#F59E0B' },
]

export default function Services() {
  const ref = useRef()
  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.svc-card'), {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="services" ref={ref} style={{ padding: '120px 24px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        background: 'rgba(10,10,15,0.5)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2552C', marginBottom: 16 }}>What We Do</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: 40 }}>
          Services that move the needle<span style={{ color: '#F2552C' }}>.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {SERVICES.map(s => (
            <div key={s.title} className="svc-card" style={{
              padding: 24, borderRadius: 14,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = s.color + '44' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, marginBottom: 16, boxShadow: '0 0 12px ' + s.color + '66' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
