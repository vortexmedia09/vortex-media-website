import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import InkShader from './components/InkShader'
import CustomCursor from './components/CustomCursor'
import { BRAND, SERVICES, PROCESS, WHY_US } from './data/content'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.6, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 60), { passive: true })

    // Line reveals
    document.querySelectorAll('.reveal-line').forEach(el => {
      gsap.fromTo(el,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top 80%', once: true },
          delay: parseFloat(el.dataset.d || 0) }
      )
    })

    // Fade
    document.querySelectorAll('[data-fade]').forEach(el => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          delay: parseFloat(el.dataset.fade || 0) }
      )
    })

    return () => lenis.destroy()
  }, [loaded])

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />

  const T = ({ children, size = 'clamp(56px,8vw,110px)', weight = 700, color = '#fff', d = 0, lh = 0.95 }) => (
    <div style={{ overflow: 'hidden' }}>
      <div className="reveal-line" data-d={d} style={{
        fontFamily: 'var(--font-display)', fontSize: size, fontWeight: weight,
        lineHeight: lh, letterSpacing: '-0.04em', color,
      }}>{children}</div>
    </div>
  )

  return (
    <>
      <CustomCursor />
      <InkShader />
      <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>

        {/* NAV */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
          padding: scrolled ? '14px 48px' : '24px 48px',
          background: scrolled ? 'rgba(6,6,14,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <a href="#" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/vortex-rocket.png" alt="" style={{ width: 28 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>
              VORTEX<span style={{ color: 'var(--accent)' }}>.</span>MEDIA
            </span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {['Services', 'Process', 'Contact'].map(s => (
              <a key={s} href={'#' + s.toLowerCase()} className="interactive"
                style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>{s}</a>
            ))}
            <a href={BRAND.os} target="_blank" rel="noreferrer" className="interactive" style={{
              padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 600,
              background: 'rgba(242,85,44,0.15)', border: '1px solid rgba(242,85,44,0.3)',
              color: 'var(--accent)', transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,85,44,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(242,85,44,0.15)'}>
              Team Login
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', position: 'relative' }}>
          <div style={{ marginBottom: 48 }}>
            <img src="/vortex-rocket.png" alt="" data-fade="0" style={{ width: 80, filter: 'drop-shadow(0 0 60px rgba(242,85,44,0.5)) drop-shadow(0 0 120px rgba(242,85,44,0.2))', animation: 'rFloat 4s ease-in-out infinite' }} />
          </div>
          <T d={0.1}>We Launch</T>
          <T d={0.2} color="var(--accent)">Brands</T>
          <T d={0.3}>Into Orbit<span style={{ color: 'var(--accent)' }}>.</span></T>
          <div data-fade="0.5" style={{ display: 'flex', gap: 14, marginTop: 48 }}>
            <a href="#contact" className="interactive" style={{
              padding: '16px 36px', borderRadius: 99, background: 'var(--accent)', color: '#fff',
              fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-body)',
              boxShadow: '0 8px 40px rgba(242,85,44,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 50px rgba(242,85,44,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(242,85,44,0.35)' }}>
              Start a Project
            </a>
            <a href="#services" className="interactive" style={{
              padding: '16px 36px', borderRadius: 99, background: 'transparent',
              color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'border-color 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
              Explore
            </a>
          </div>
          <div style={{ position: 'absolute', bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Scroll to explore</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,rgba(255,255,255,0.2),transparent)', animation: 'pulse 2.5s ease-in-out infinite' }} />
          </div>
        </section>

        {/* STATEMENT */}
        <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', padding: '120px 48px' }}>
          <div style={{ maxWidth: 900 }}>
            <T size="clamp(40px,6vw,80px)" color="rgba(255,255,255,0.25)" d={0}>Integrated.</T>
            <T size="clamp(40px,6vw,80px)" color="#fff" d={0.12}>Impact-Driven.</T>
            <T size="clamp(40px,6vw,80px)" color="var(--accent)" d={0.24}>Built to Scale.</T>
            <p data-fade="0.36" style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', maxWidth: 520, lineHeight: 1.8, marginTop: 32 }}>
              An advanced marketing and brand consultancy engineered for scale.
              We partner with ambitious organisations to solve complex challenges
              with clarity, data, and design.
            </p>
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            {Array(8).fill('Integrated · Impact-Driven · Built to Scale · Vortex Media · Strategy + Execution · ').join('')}
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" style={{ padding: '140px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
            <span data-fade="0" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16 }}>What We Deliver</span>
            <T size="clamp(32px,5vw,60px)" d={0.08}>Six engines of growth<span style={{ color: 'var(--accent)' }}>.</span></T>
            <div style={{ marginTop: 64 }}>
              {SERVICES.map((s, i) => (
                <div key={s.title} data-fade={0.04 * i} className="interactive" style={{
                  display: 'flex', alignItems: 'center', padding: '28px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'padding 0.4s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '16px' }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.2)', width: 48, flexShrink: 0, letterSpacing: '0.06em' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0, marginRight: 28, boxShadow: '0 0 16px ' + s.color }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, flex: 1, letterSpacing: '-0.02em' }}>{s.title}</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 380, justifyContent: 'flex-end' }}>
                    {s.items.slice(0, 3).map(item => (
                      <span key={item} style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ORANGE MARQUEE */}
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '16px 0', background: 'var(--accent)' }}>
          <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite reverse', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff' }}>
            {Array(8).fill('Brand Strategy · Digital Experience · Content · Paid Media · CRM · Events · ').join('')}
          </div>
        </div>

        {/* PROCESS */}
        <section id="process" style={{ padding: '140px 48px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <span data-fade="0" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16 }}>Operating Model</span>
            <T size="clamp(32px,5vw,60px)" d={0.08}>Discover. Design.<br /><span style={{ color: 'var(--accent)' }}>Deploy. Optimize.</span></T>
            <div style={{ marginTop: 72 }}>
              {PROCESS.map((step, i) => (
                <div key={step.num} data-fade={0.1 * i} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', paddingBottom: 52, position: 'relative' }}>
                  {i < PROCESS.length - 1 && <div style={{ position: 'absolute', left: 23, top: 52, width: 1, height: 'calc(100% - 32px)', background: 'linear-gradient(to bottom,' + step.color + '44,rgba(255,255,255,0.04))' }} />}
                  <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: step.color + '18', border: '1px solid ' + step.color + '44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: step.color, position: 'relative', zIndex: 1 }}>{step.num}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>{step.title}</div>
                    <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ padding: '100px 48px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {[
              { num: '6+', label: 'Service Verticals' },
              { num: '3x', label: 'Average ROI' },
              { num: '100%', label: 'Strategy + Execution' },
              { num: '∞', label: 'Scalability' },
            ].map((s, i) => (
              <div key={s.label} data-fade={i * 0.1} style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,88px)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.05em' }}>{s.num}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section style={{ padding: '140px 48px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span data-fade="0" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16 }}>Why Vortex Media</span>
            <T size="clamp(32px,5vw,60px)" d={0.08}>Strategy + Execution<br /><span style={{ color: 'var(--accent)' }}>= Scalable Results.</span></T>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, marginTop: 64, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
              {WHY_US.map((w, i) => (
                <div key={w.title} data-fade={i * 0.08} className="interactive" style={{ padding: '32px 24px', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'background 0.4s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,85,44,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.08em', marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{w.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,85,44,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
            <span data-fade="0" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 20 }}>Ready for the Future</span>
            <T size="clamp(40px,7vw,88px)" d={0.08}>Built for</T>
            <T size="clamp(40px,7vw,88px)" d={0.16}>Business Impact<span style={{ color: 'var(--accent)' }}>.</span></T>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, margin: '48px 0' }}>
              {[
                { l: 'Email', v: BRAND.email, h: 'mailto:' + BRAND.email },
                { l: 'Phone', v: BRAND.phone, h: 'tel:+919662395522' },
                { l: 'Location', v: BRAND.location, h: 'https://maps.google.com/?q=Valsad+Gujarat' },
              ].map(c => (
                <a key={c.l} href={c.h} target="_blank" rel="noreferrer" className="interactive" style={{ padding: '20px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', transition: 'background 0.3s,border-color 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>{c.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{c.v}</div>
                </a>
              ))}
            </div>
            <a data-fade="0.24" href={'https://wa.me/' + BRAND.whatsapp} target="_blank" rel="noreferrer" className="interactive" style={{ display: 'inline-block', padding: '18px 48px', borderRadius: 99, background: '#25D366', color: '#fff', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(37,211,102,0.25)', transition: 'transform 0.2s,box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(37,211,102,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.25)' }}>
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '32px 48px', background: '#06060A', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/vortex-rocket.png" alt="" style={{ width: 20 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>VORTEX<span style={{ color: 'var(--accent)' }}>.</span>MEDIA</span>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['Instagram', 'https://instagram.com/vortex.agency'], ['LinkedIn', 'https://linkedin.com/company/vortexmedia09'], ['Facebook', 'https://facebook.com/vortexmedia09']].map(([n, h]) => (
                <a key={n} href={h} target="_blank" rel="noreferrer" className="interactive" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 500, transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}>{n}</a>
              ))}
              <a href={BRAND.os} target="_blank" rel="noreferrer" className="interactive" style={{ padding: '4px 14px', borderRadius: 99, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.3s,color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}>
                Team Portal
              </a>
            </div>
            <div style={{ width: '100%', textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.1)', marginTop: 8 }}>
              {new Date().getFullYear()} Vortex Media. Valsad, Gujarat, India.
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes rFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes pulse { 0%,100%{opacity:0.2} 50%{opacity:0.5} }
          @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          * { cursor: none !important; }
          @media(max-width:768px) {
            * { cursor:auto !important; }
            nav { padding:14px 20px !important; }
          }
        `}</style>
      </div>
    </>
  )
}
