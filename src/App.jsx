import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import LaunchScene from './components/LaunchScene'
import Nav from './components/Nav'
import './story.css'

gsap.registerPlugin(ScrollTrigger)

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

    // Animate each chapter on scroll
    document.querySelectorAll('.chapter').forEach(ch => {
      gsap.from(ch.querySelectorAll('.ch-reveal'), {
        scrollTrigger: { trigger: ch, start: 'top 75%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out'
      })
    })

    return () => lenis.destroy()
  }, [loaded])

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />

  return (
    <>
      <LaunchScene />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />

        {/* ═══ CHAPTER 1: THE LAUNCHPAD ═══ */}
        <section className="chapter ch-hero">
          <img src="/vortex-rocket.png" alt="Vortex Media" className="ch-reveal hero-rocket" />
          <h1 className="ch-reveal hero-title">
            We Launch<br /><span className="accent">Brands</span> Into Orbit<span className="accent">.</span>
          </h1>
          <p className="ch-reveal hero-sub">
            A digital marketing agency that transforms brands through
            strategic content, stunning visuals, and data-driven growth.
          </p>
          <div className="ch-reveal hero-cta">
            <a href="#contact" className="btn-primary">Start a Project</a>
            <a href="#ch-services" className="btn-ghost">Our Services</a>
          </div>
          <div className="scroll-hint">
            <span>Scroll to explore</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ═══ CHAPTER 2: THE MISSION ═══ */}
        <section className="chapter ch-mission" id="about">
          <div className="chapter-card wide">
            <div className="ch-label ch-reveal">The Mission</div>
            <h2 className="ch-reveal">
              We don't just market.<br />We <span className="accent">engineer growth</span>.
            </h2>
            <p className="ch-reveal ch-body">
              Every brand has a story worth telling. We find it, shape it, and launch it to the right audience
              at the right time. No templates, no shortcuts — just strategy, craft, and relentless optimization.
            </p>
            <div className="mission-grid ch-reveal">
              <div className="mission-card">
                <div className="mc-num">01</div>
                <h3>Strategy First</h3>
                <p>Deep market research, competitor analysis, and a clear roadmap before a single pixel is designed.</p>
              </div>
              <div className="mission-card">
                <div className="mc-num">02</div>
                <h3>Design That Converts</h3>
                <p>Visuals built to stop the scroll, build trust, and drive action — not just look pretty.</p>
              </div>
              <div className="mission-card">
                <div className="mc-num">03</div>
                <h3>Data-Driven Decisions</h3>
                <p>Every metric tracked, every campaign optimized. We let the numbers guide us.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CHAPTER 3: THE ENGINES ═══ */}
        <section className="chapter ch-engines" id="ch-services">
          <div className="chapter-card wide">
            <div className="ch-label ch-reveal">The Engines</div>
            <h2 className="ch-reveal">
              Services that move the needle<span className="accent">.</span>
            </h2>
            <div className="services-grid ch-reveal">
              {[
                { title: 'Social Media Management', desc: 'Instagram, Facebook, LinkedIn — strategy, content, scheduling, analytics.', color: '#F2552C' },
                { title: 'Brand Identity & Design', desc: 'Logo, brand guidelines, visual systems — stand out and stay consistent.', color: '#D4A853' },
                { title: 'Website & Landing Pages', desc: 'High-converting sites built for speed, SEO, and results.', color: '#3B82F6' },
                { title: 'Content Production', desc: 'Photography, videography, reels, motion graphics — content that captures.', color: '#10B981' },
                { title: 'Performance Marketing', desc: 'Meta Ads, Google Ads — campaigns optimized for maximum ROI.', color: '#8B5CF6' },
                { title: 'SEO & Local Presence', desc: 'GMB, local SEO, reputation management — dominate search results.', color: '#F59E0B' },
              ].map(s => (
                <div key={s.title} className="svc-card" style={{ '--svc-color': s.color }}>
                  <div className="svc-dot" />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CHAPTER 4: THE CREW ═══ */}
        <section className="chapter ch-crew" id="clients">
          <div className="chapter-card wide">
            <div className="ch-label ch-reveal">The Crew</div>
            <h2 className="ch-reveal">
              Trusted by brands that dare to grow<span className="accent">.</span>
            </h2>
            <div className="clients-grid ch-reveal">
              {[
                { name: 'Dr. Vidhi Doshi', industry: 'Healthcare', desc: 'Ozone Therapy Clinic, Valsad' },
                { name: 'Nature Cure', industry: 'Wellness', desc: 'Naturopathy Clinic, Valsad' },
                { name: 'Shantivan Sanidhya', industry: 'Real Estate', desc: 'Luxury Bungalows, Valsad' },
                { name: 'Virtual Vision 3D', industry: 'Technology', desc: '3D Visualization Studio' },
                { name: 'Corbitose', industry: 'Technology', desc: 'Software Development' },
                { name: 'Vortex Media', industry: 'Agency', desc: 'Our Own Brand' },
              ].map(c => (
                <div key={c.name} className="client-card">
                  <div className="client-avatar">
                    {c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="client-name">{c.name}</div>
                  <div className="client-industry">{c.industry}</div>
                  <div className="client-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CHAPTER 5: THE SEQUENCE ═══ */}
        <section className="chapter ch-sequence" id="process">
          <div className="chapter-card narrow">
            <div className="ch-label ch-reveal">The Launch Sequence</div>
            <h2 className="ch-reveal">
              From brief to orbit in 4 steps<span className="accent">.</span>
            </h2>
            <div className="process-steps ch-reveal">
              {[
                { num: '01', title: 'Discovery', desc: 'Deep-dive into your brand, audience, competitors, and goals.', color: '#3B82F6' },
                { num: '02', title: 'Strategy', desc: 'Custom roadmap with content themes, platforms, and timelines.', color: '#D4A853' },
                { num: '03', title: 'Create', desc: 'Our design team produces scroll-stopping content — fast.', color: '#F2552C' },
                { num: '04', title: 'Launch & Optimize', desc: 'Publish, monitor, and optimize for maximum impact.', color: '#10B981' },
              ].map((s, i, arr) => (
                <div key={s.num} className="step" style={{ '--step-color': s.color }}>
                  {i < arr.length - 1 && <div className="step-line" style={{ background: `linear-gradient(to bottom, ${s.color}44, ${arr[i+1].color}44)` }} />}
                  <div className="step-num">{s.num}</div>
                  <div className="step-content">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CHAPTER 6: THE DESTINATION ═══ */}
        <section className="chapter ch-destination" id="contact">
          <div className="chapter-card narrow" style={{ textAlign: 'center' }}>
            <div className="ch-label ch-reveal">The Destination</div>
            <h2 className="ch-reveal">
              Ready to launch<span className="accent">?</span>
            </h2>
            <p className="ch-reveal ch-body" style={{ maxWidth: 440, margin: '0 auto 36px' }}>
              Let's talk about your brand, your goals, and how we can make it happen.
            </p>
            <div className="contact-grid ch-reveal">
              <a href="tel:+919601671536" className="contact-card">
                <div className="cc-label">Call</div>
                <div className="cc-value">+91 96016 71536</div>
              </a>
              <a href="mailto:hello@vortexmedia.co.in" className="contact-card">
                <div className="cc-label">Email</div>
                <div className="cc-value">hello@vortexmedia.co.in</div>
              </a>
              <a href="https://maps.google.com/?q=Valsad+Gujarat" target="_blank" rel="noreferrer" className="contact-card">
                <div className="cc-label">Location</div>
                <div className="cc-value">Valsad, Gujarat</div>
              </a>
            </div>
            <a className="ch-reveal btn-whatsapp" href="https://wa.me/919601671536?text=Hi%20Vortex%20Media!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/vortex-rocket.png" alt="Vortex" />
              <span>VORTEX<span className="accent">.</span>MEDIA</span>
            </div>
            <div className="footer-links">
              <a href="https://instagram.com/vortex.agency" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://linkedin.com/company/vortexmedia09" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://facebook.com/vortexmedia09" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://vortex-os-aldq.vercel.app" target="_blank" rel="noreferrer" className="portal-link">Team Portal</a>
            </div>
            <div className="footer-copy">{new Date().getFullYear()} Vortex Media. Valsad, Gujarat, India.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
