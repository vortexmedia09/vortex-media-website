import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import LaunchScene from './components/LaunchScene'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { title: 'Social Media Management', desc: 'Strategy, content, scheduling, and analytics across all platforms.', color: '#F2552C' },
  { title: 'Brand Identity & Design', desc: 'Logo, guidelines, visual systems — stand out and stay consistent.', color: '#D4A853' },
  { title: 'Website & Landing Pages', desc: 'High-converting sites built for speed, SEO, and results.', color: '#3B82F6' },
  { title: 'Content Production', desc: 'Photography, reels, motion graphics — content that captures.', color: '#10B981' },
  { title: 'Performance Marketing', desc: 'Meta Ads, Google Ads — campaigns optimized for maximum ROI.', color: '#8B5CF6' },
  { title: 'SEO & Local Presence', desc: 'GMB, local SEO, reputation — dominate search results.', color: '#F59E0B' },
]
const CLIENTS = [
  { name: 'Dr. Vidhi Doshi', industry: 'Healthcare', desc: 'Ozone Therapy Clinic' },
  { name: 'Nature Cure', industry: 'Wellness', desc: 'Naturopathy Clinic' },
  { name: 'Shantivan Sanidhya', industry: 'Real Estate', desc: 'Luxury Bungalows' },
  { name: 'Virtual Vision 3D', industry: 'Technology', desc: '3D Studio' },
  { name: 'Corbitose', industry: 'Technology', desc: 'Software Dev' },
  { name: 'Vortex Media', industry: 'Agency', desc: 'Our Own Brand' },
]
const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive into your brand, audience, and goals.', color: '#3B82F6' },
  { num: '02', title: 'Strategy', desc: 'Custom roadmap with themes, platforms, timelines.', color: '#D4A853' },
  { num: '03', title: 'Create', desc: 'Scroll-stopping content, designed fast.', color: '#F2552C' },
  { num: '04', title: 'Launch & Optimize', desc: 'Publish, monitor, and maximize impact.', color: '#10B981' },
]

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Reveal animations on scroll
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
      })
    })

    return () => lenis.destroy()
  }, [loaded])

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />

  return (
    <>
      <CustomCursor />
      <LaunchScene />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />

        {/* ═══ HERO ═══ */}
        <section className="section hero">
          <img src="/vortex-rocket.png" alt="Vortex Media" className="hero-rocket reveal" />
          <h1 className="reveal" data-delay="0.1">
            We Launch<br /><span className="accent">Brands</span> Into Orbit<span className="accent">.</span>
          </h1>
          <p className="reveal" data-delay="0.2">
            A digital marketing agency that transforms brands through
            strategic content, stunning visuals, and data-driven growth.
          </p>
          <div className="hero-cta reveal" data-delay="0.3">
            <a href="#contact" className="btn-primary interactive">Start a Project</a>
            <a href="#services" className="btn-outline interactive">Our Services</a>
          </div>
          <div className="scroll-hint">
            <span>Scroll to explore</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ═══ THE MISSION ═══ */}
        <section className="section" id="about">
          <div className="section-inner">
            <div className="section-label reveal">The Mission</div>
            <h2 className="section-title reveal" data-delay="0.1">
              We don't just market.<br />We <span className="accent">engineer growth</span>.
            </h2>
            <p className="section-body reveal" data-delay="0.15">
              Every brand has a story worth telling. We find it, shape it, and launch it to the right
              audience at the right time. No templates. No shortcuts.
            </p>
            <div className="card-grid cols-3 reveal" data-delay="0.2">
              {[
                { num: '01', title: 'Strategy First', desc: 'Market research, competitor analysis, and a clear roadmap before a single pixel is designed.' },
                { num: '02', title: 'Design That Converts', desc: 'Visuals built to stop the scroll, build trust, and drive action.' },
                { num: '03', title: 'Data-Driven', desc: 'Every metric tracked, every campaign optimized. Numbers guide us.' },
              ].map(c => (
                <div key={c.num} className="glass-card interactive">
                  <div className="num">{c.num}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE ENGINES ═══ */}
        <section className="section" id="services">
          <div className="section-inner">
            <div className="section-label reveal">The Engines</div>
            <h2 className="section-title reveal" data-delay="0.1">
              Services that move the needle<span className="accent">.</span>
            </h2>
            <div className="card-grid cols-3 reveal" data-delay="0.15">
              {SERVICES.map(s => (
                <div key={s.title} className="glass-card interactive">
                  <div className="svc-dot" style={{ background: s.color, boxShadow: '0 0 14px ' + s.color + '66' }} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE CREW ═══ */}
        <section className="section" id="clients">
          <div className="section-inner">
            <div className="section-label reveal">The Crew</div>
            <h2 className="section-title reveal" data-delay="0.1">
              Trusted by brands that dare to grow<span className="accent">.</span>
            </h2>
            <div className="card-grid cols-6 reveal" data-delay="0.15">
              {CLIENTS.map(c => (
                <div key={c.name} className="glass-card interactive" style={{ textAlign: 'center' }}>
                  <div className="avatar">{c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                  <h3 style={{ fontSize: 13 }}>{c.name}</h3>
                  <p style={{ fontSize: 10, color: '#F2552C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{c.industry}</p>
                  <p style={{ fontSize: 11 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE LAUNCH SEQUENCE ═══ */}
        <section className="section" id="process">
          <div className="section-inner narrow">
            <div className="section-label reveal">The Launch Sequence</div>
            <h2 className="section-title reveal" data-delay="0.1">
              From brief to orbit in 4 steps<span className="accent">.</span>
            </h2>
            <div className="steps reveal" data-delay="0.15">
              {STEPS.map((s, i) => (
                <div key={s.num} className="step">
                  {i < STEPS.length - 1 && (
                    <div className="step-line" style={{ background: 'linear-gradient(to bottom, ' + s.color + '44, ' + STEPS[i + 1].color + '44)' }} />
                  )}
                  <div className="step-icon" style={{ background: s.color + '15', border: '1px solid ' + s.color + '33', color: s.color }}>
                    {s.num}
                  </div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE DESTINATION ═══ */}
        <section className="section" id="contact">
          <div className="section-inner narrow" style={{ textAlign: 'center' }}>
            <div className="section-label reveal">The Destination</div>
            <h2 className="section-title reveal" data-delay="0.1">
              Ready to launch<span className="accent">?</span>
            </h2>
            <p className="section-body reveal" data-delay="0.15" style={{ margin: '0 auto 36px', maxWidth: 420 }}>
              Let's talk about your brand, your goals, and how we can make it happen.
            </p>
            <div className="contact-grid reveal" data-delay="0.2">
              {[
                { label: 'Call', value: '+91 96016 71536', href: 'tel:+919601671536' },
                { label: 'Email', value: 'hello@vortexmedia.co.in', href: 'mailto:hello@vortexmedia.co.in' },
                { label: 'Location', value: 'Valsad, Gujarat', href: 'https://maps.google.com/?q=Valsad+Gujarat' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-card interactive">
                  <div className="label">{c.label}</div>
                  <div className="value">{c.value}</div>
                </a>
              ))}
            </div>
            <a className="btn-wa interactive reveal" data-delay="0.25" href="https://wa.me/919601671536?text=Hi%20Vortex%20Media!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/vortex-rocket.png" alt="Vortex" />
              <span>VORTEX<span className="accent">.</span>MEDIA</span>
            </div>
            <div className="footer-links">
              <a href="https://instagram.com/vortex.agency" target="_blank" rel="noreferrer" className="interactive">Instagram</a>
              <a href="https://linkedin.com/company/vortexmedia09" target="_blank" rel="noreferrer" className="interactive">LinkedIn</a>
              <a href="https://facebook.com/vortexmedia09" target="_blank" rel="noreferrer" className="interactive">Facebook</a>
              <a href="https://vortex-os-aldq.vercel.app" target="_blank" rel="noreferrer" className="portal-btn interactive">Team Portal</a>
            </div>
            <div className="footer-copy">{new Date().getFullYear()} Vortex Media. Valsad, Gujarat, India.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
