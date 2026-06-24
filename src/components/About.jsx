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
    <section id="about" ref={ref} style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto', background: 'rgba(247,243,236,0.85)', backdropFilter: 'blur(20px)', borderRadius: 24 }}>
      <div className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>About Us</div>
      <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', maxWidth: 700, marginBottom: 32 }}>
        We don't just market.<br />We <span style={{ color: 'var(--accent)' }}>engineer growth</span>.
      </h2>
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {[
          { num: '01', title: 'Strategy First', desc: 'Every campaign starts with deep market research, competitor analysis, and a clear roadmap. No guesswork.' },
          { num: '02', title: 'Design That Converts', desc: 'Our visuals don\'t just look good — they\'re engineered to stop the scroll, build trust, and drive action.' },
          { num: '03', title: 'Data-Driven Decisions', desc: 'We track every metric that matters. Reach, engagement, conversions — and optimize relentlessly.' },
        ].map(item => (
          <div key={item.num} style={{
            padding: 32, borderRadius: 20,
            background: '#fff', border: '1px solid rgba(22,24,31,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: 'var(--accent)', opacity: 0.2, marginBottom: 12 }}>{item.num}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{item.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-2)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
