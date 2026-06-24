import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SERVICES = [
  { icon: '📱', title: 'Social Media Management', desc: 'Instagram, Facebook, LinkedIn — strategy, content creation, scheduling, and analytics across all platforms.', color: '#F2552C' },
  { icon: '🎨', title: 'Brand Identity & Design', desc: 'Logo design, brand guidelines, visual systems — everything your brand needs to stand out and stay consistent.', color: '#D4A853' },
  { icon: '🌐', title: 'Website & Landing Pages', desc: 'High-converting websites built for speed, SEO, and results. From single pages to full web experiences.', color: '#3B82F6' },
  { icon: '📸', title: 'Content Production', desc: 'Photography, videography, reels, motion graphics — we create content that captures attention and tells stories.', color: '#10B981' },
  { icon: '📊', title: 'Performance Marketing', desc: 'Meta Ads, Google Ads — targeted campaigns optimized for leads, conversions, and maximum ROI.', color: '#8B5CF6' },
  { icon: '🔍', title: 'SEO & Local Presence', desc: 'Google My Business, local SEO, reputation management — dominate search results in your area.', color: '#F59E0B' },
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
    <section id="services" ref={ref} style={{ padding: '100px 24px 120px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>What We Do</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: 48 }}>
          Services that move the needle<span style={{ color: 'var(--accent)' }}>.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.title} className="svc-card" style={{
              padding: 28, borderRadius: 16,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = s.color + '44' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
