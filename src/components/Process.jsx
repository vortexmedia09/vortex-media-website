import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive into your brand, audience, competitors, and goals.', color: '#3B82F6' },
  { num: '02', title: 'Strategy', desc: 'Custom roadmap with content themes, platforms, and timelines.', color: '#D4A853' },
  { num: '03', title: 'Create', desc: 'Our design team produces scroll-stopping content \u2014 fast.', color: '#F2552C' },
  { num: '04', title: 'Launch & Optimize', desc: 'Publish, monitor, and optimize for maximum impact.', color: '#10B981' },
]

export default function Process() {
  const ref = useRef()
  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.step'), {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      x: -40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="process" ref={ref} style={{ padding: '120px 24px' }}>
      <div style={{
        maxWidth: 800, margin: '0 auto',
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 'clamp(32px, 5vw, 56px)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2552C', marginBottom: 16 }}>How We Work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: 48 }}>
          From brief to orbit in 4 steps<span style={{ color: '#F2552C' }}>.</span>
        </h2>
        {STEPS.map((s, i) => (
          <div key={s.num} className="step" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', position: 'relative', paddingBottom: i < STEPS.length - 1 ? 40 : 0 }}>
            {i < STEPS.length - 1 && <div style={{ position: 'absolute', left: 23, top: 52, width: 2, height: 'calc(100% - 36px)', background: 'linear-gradient(to bottom, ' + s.color + '44, ' + STEPS[i + 1].color + '44)' }} />}
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: s.color + '15', border: '1px solid ' + s.color + '33',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: s.color,
              position: 'relative', zIndex: 1,
            }}>{s.num}</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', maxWidth: 400 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
