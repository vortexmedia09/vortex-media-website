import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'We deep-dive into your brand, audience, competitors, and goals.', icon: '🔍', color: '#3B82F6' },
  { num: '02', title: 'Strategy', desc: 'A custom roadmap with content themes, platforms, and timelines.', icon: '🎯', color: '#D4A853' },
  { num: '03', title: 'Create', desc: 'Our design team produces scroll-stopping content — fast.', icon: '🎨', color: '#F2552C' },
  { num: '04', title: 'Launch & Optimize', desc: 'We publish, monitor, and optimize for maximum impact.', icon: '🚀', color: '#10B981' },
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
    <section id="process" ref={ref} style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>How We Work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--navy)', marginBottom: 56 }}>
          From brief to orbit in 4 steps<span style={{ color: 'var(--accent)' }}>.</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={s.num} className="step" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', position: 'relative', paddingBottom: 48 }}>
              {/* Timeline line */}
              {i < STEPS.length - 1 && <div style={{ position: 'absolute', left: 27, top: 56, width: 2, height: 'calc(100% - 40px)', background: 'linear-gradient(to bottom, ' + s.color + ', ' + STEPS[i + 1].color + ')' }} />}
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: s.color + '14', border: '2px solid ' + s.color + '33',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, position: 'relative', zIndex: 1,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: s.color, letterSpacing: '0.1em', marginBottom: 6 }}>STEP {s.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-2)', maxWidth: 440 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
