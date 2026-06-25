import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
  const ref = useRef()
  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.reveal'), {
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      y: 60, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="about" ref={ref} style={{ padding: '140px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
      }}>
        <div className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2552C', marginBottom: 16 }}>About Us</div>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', maxWidth: 600, marginBottom: 36 }}>
          We don't just market. We <span style={{ color: '#F2552C' }}>engineer growth</span>.
        </h2>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { num: '01', title: 'Strategy First', desc: 'Every campaign starts with deep market research, competitor analysis, and a clear roadmap. No guesswork.' },
            { num: '02', title: 'Design That Converts', desc: 'Our visuals don\'t just look good \u2014 they\'re built to stop the scroll, build trust, and drive action.' },
            { num: '03', title: 'Data-Driven Decisions', desc: 'We track every metric that matters and optimize relentlessly for results.' },
          ].map(item => (
            <div key={item.num} style={{
              padding: 28, borderRadius: 16,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(242,85,44,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#F2552C', opacity: 0.25, marginBottom: 12 }}>{item.num}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
