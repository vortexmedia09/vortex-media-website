import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import LaunchScene from './components/LaunchScene'
import CustomCursor from './components/CustomCursor'
import ScrollRocket from './components/ScrollRocket'
import { BRAND, PILLARS, INDUSTRIES, PROCESS, SERVICES, WHY_US, RESULTS } from './data/content'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Nav scroll
    const onScroll = () => setNavScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Reveal animations
    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        delay: parseFloat(el.dataset.reveal || 0)
      })
    })



    // Counter animations
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count)
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 2, ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        snap: { innerText: 1 },
        onUpdate: function() { el.innerText = Math.ceil(this.targets()[0].innerText) + (el.dataset.suffix || '') }
      })
    })

    return () => { lenis.destroy(); window.removeEventListener('scroll', onScroll) }
  }, [loaded])

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />

  return (
    <>
      <CustomCursor />
      <ScrollRocket />
      <LaunchScene />

      <div className="content-layer">
        {/* ═══ NAV ═══ */}
        <nav className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
          <a href="#" className="nav-brand interactive">
            <img src="/vortex-rocket.png" alt="" />
            <span>VORTEX<i>.</i>MEDIA</span>
          </a>
          <div className="nav-right">
            {['About','Services','Industries','Process','Contact'].map(s => (
              <a key={s} href={'#'+s.toLowerCase()} className="nav-link interactive">{s}</a>
            ))}
            <a href={BRAND.os} target="_blank" rel="noreferrer" className="nav-cta interactive">Team Login</a>
          </div>
        </nav>

        {/* ═══ 01: HERO — Full viewport, huge type ═══ */}
        <section className="s-hero">
          <h1 data-reveal="0.1">
            <span className="line">We Launch</span>
            <span className="line"><em>Brands</em> Into</span>
            <span className="line">Orbit<em>.</em></span>
          </h1>
          <p className="hero-desc" data-reveal="0.2">{BRAND.description}</p>
          <div className="hero-actions" data-reveal="0.3">
            <a href="#contact" className="btn btn--fill interactive">Start a Project</a>
            <a href="#services" className="btn btn--line interactive">Explore Services</a>
          </div>
          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* ═══ 02: MANIFESTO — Editorial, left-aligned big text ═══ */}
        <section className="s-manifesto" id="about">
          <div className="container">
            <span className="label" data-reveal="0">Our Mission</span>
            <h2 className="manifesto-title" data-reveal="0.08">
              To architect <em>transformative growth</em> for brands ready to lead.
            </h2>
            <div className="pillars" data-reveal="0.16">
              {PILLARS.map((p,i) => (
                <div key={p.title} className="pillar interactive">
                  <div className="pillar-line" style={{background: p.color}} />
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 03: SERVICES ═══ */}
        <section className="s-services" id="services">
          <div className="container">
            <div className="svc-header" data-reveal="0">
              <span className="label">What We Deliver</span>
              <h2>Six engines<br />of growth<em>.</em></h2>
            </div>
            <div className="svc-grid" data-reveal="0.1">
              {SERVICES.map((s,i) => (
                <div key={s.title} className="svc-card interactive" style={{'--svc': s.color}}>
                  <div className="svc-num">{String(i+1).padStart(2,'0')}</div>
                  <div className="svc-line" />
                  <h3>{s.title}</h3>
                  <ul>{s.items.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 04: INDUSTRIES — Minimal grid ═══ */}
        <section className="s-industries" id="industries">
          <div className="container">
            <span className="label" data-reveal="0">Who We Work With</span>
            <h2 data-reveal="0.08">Partnerships across<br />high-impact industries<em>.</em></h2>
            <div className="ind-grid" data-reveal="0.16">
              {INDUSTRIES.map((ind,i) => (
                <div key={ind.title} className="ind-card interactive">
                  <div className="ind-num">{String(i+1).padStart(2,'0')}</div>
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 05: PROCESS — Vertical timeline, cinematic ═══ */}
        <section className="s-process" id="process">
          <div className="container container--narrow">
            <span className="label" data-reveal="0">Operating Model</span>
            <h2 data-reveal="0.08">Discover. Design.<br />Deploy. <em>Optimize.</em></h2>
            <div className="process-timeline" data-reveal="0.16">
              {PROCESS.map((step, i) => (
                <div key={step.num} className="proc-step" style={{'--step': step.color}}>
                  {i < PROCESS.length - 1 && <div className="proc-line" />}
                  <div className="proc-dot">{step.num}</div>
                  <div className="proc-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 06: WHY VORTEX — Staggered cards ═══ */}
        <section className="s-why">
          <div className="container">
            <span className="label" data-reveal="0">Why Vortex Media</span>
            <h2 data-reveal="0.08">Strategy + Execution<br />= <em>Scalable Results</em></h2>
            <div className="why-grid" data-reveal="0.16">
              {WHY_US.map((w,i) => (
                <div key={w.title} className="why-card interactive">
                  <span className="why-num">{String(i+1).padStart(2,'0')}</span>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 07: RESULTS — Stats counters ═══ */}
        <section className="s-results">
          <div className="container">
            <span className="label" data-reveal="0">Client Wins</span>
            <h2 data-reveal="0.08">Real results.<br />Real growth. <em>Delivered.</em></h2>
            <div className="results-grid" data-reveal="0.16">
              {RESULTS.map(r => (
                <div key={r.metric} className="result-card interactive">
                  <h3>{r.metric}</h3>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 08: CONTACT — CTA section ═══ */}
        <section className="s-contact" id="contact">
          <div className="container container--narrow" style={{textAlign:'center'}}>
            <span className="label" data-reveal="0">Ready for the future</span>
            <h2 className="contact-title" data-reveal="0.08">
              Built for business impact<em>.</em><br />
              <em>Ready for the future.</em>
            </h2>
            <div className="contact-cards" data-reveal="0.16">
              <a href={'mailto:'+BRAND.email} className="c-card interactive">
                <span className="c-label">Email</span>
                <span className="c-val">{BRAND.email}</span>
              </a>
              <a href={'tel:'+BRAND.phone.replace(/\s/g,'')} className="c-card interactive">
                <span className="c-label">Phone</span>
                <span className="c-val">{BRAND.phone}</span>
              </a>
              <a href="https://maps.google.com/?q=Valsad+Gujarat" target="_blank" rel="noreferrer" className="c-card interactive">
                <span className="c-label">Location</span>
                <span className="c-val">{BRAND.location}</span>
              </a>
            </div>
            <a data-reveal="0.24" href={'https://wa.me/'+BRAND.whatsapp+'?text=Hi%20Vortex%20Media!%20I%27d%20like%20to%20discuss%20a%20project.'} target="_blank" rel="noreferrer" className="btn btn--wa interactive">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/vortex-rocket.png" alt="" />
              <span>VORTEX<i>.</i>MEDIA</span>
            </div>
            <div className="footer-mid">
              <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="interactive">Instagram</a>
              <a href={BRAND.social.linkedin} target="_blank" rel="noreferrer" className="interactive">LinkedIn</a>
              <a href={BRAND.social.facebook} target="_blank" rel="noreferrer" className="interactive">Facebook</a>
            </div>
            <a href={BRAND.os} target="_blank" rel="noreferrer" className="footer-portal interactive">Team Portal</a>
          </div>
          <div className="footer-copy">{new Date().getFullYear()} {BRAND.name}. {BRAND.location}.</div>
        </footer>
      </div>
    </>
  )
}
