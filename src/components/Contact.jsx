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
    <section id="contact" ref={ref} style={{ padding: '120px 24px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Get In Touch</div>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20 }}>
          Ready to launch<span style={{ color: 'var(--accent)' }}>?</span>
        </h2>
        <p className="reveal" style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
          Let's talk about your brand, your goals, and how we can help you grow. No commitments — just a conversation.
        </p>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '📞', label: 'Call Us', value: '+91 96016 71536', href: 'tel:+919601671536' },
            { icon: '✉️', label: 'Email', value: 'hello@vortexmedia.co.in', href: 'mailto:hello@vortexmedia.co.in' },
            { icon: '📍', label: 'Visit', value: 'Valsad, Gujarat, India', href: 'https://maps.google.com/?q=Valsad+Gujarat' },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
              padding: 24, borderRadius: 16,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center', transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{c.value}</div>
            </a>
          ))}
        </div>
        <a className="reveal" href="https://wa.me/919601671536?text=Hi%20Vortex%20Media!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 40px', borderRadius: 99,
            background: '#25D366', color: '#fff',
            fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-body)',
            boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.3)' }}>
          💬 Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}
