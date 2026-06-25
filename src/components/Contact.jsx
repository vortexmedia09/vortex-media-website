import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Contact() {
  const ref = useRef()
  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.reveal'), {
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 24px' }}>
      <div style={{
        maxWidth: 700, margin: '0 auto', textAlign: 'center',
        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 'clamp(36px, 5vw, 64px)',
      }}>
        <div className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F2552C', marginBottom: 16 }}>Get In Touch</div>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>
          Ready to launch<span style={{ color: '#F2552C' }}>?</span>
        </h2>
        <p className="reveal" style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 36 }}>
          Let's talk about your brand, your goals, and how we can help you grow.
        </p>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
          {[
            { label: 'Call', value: '+91 96016 71536', href: 'tel:+919601671536' },
            { label: 'Email', value: 'hello@vortexmedia.co.in', href: 'mailto:hello@vortexmedia.co.in' },
            { label: 'Location', value: 'Valsad, Gujarat', href: 'https://maps.google.com/?q=Valsad+Gujarat' },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="reveal" style={{
              padding: '20px 14px', borderRadius: 14,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#F2552C' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#F2552C', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{c.value}</div>
            </a>
          ))}
        </div>
        <a className="reveal" href="https://wa.me/919601671536?text=Hi%20Vortex%20Media!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '16px 40px', borderRadius: 99,
            background: '#25D366', color: '#fff',
            fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)',
            boxShadow: '0 8px 30px rgba(37,211,102,0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(37,211,102,0.35)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.25)' }}>
          Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}
