import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import LaunchScene from './components/LaunchScene'
import CustomCursor from './components/CustomCursor'
import ScrollRocket from './components/ScrollRocket'
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

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Line-by-line text reveal
    document.querySelectorAll('.line-reveal').forEach(el => {
      gsap.fromTo(el, { y: '100%', opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true },
          delay: parseFloat(el.dataset.d || 0) })
    })

    // Fade reveals
    document.querySelectorAll('[data-fade]').forEach(el => {
      gsap.fromTo(el, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          delay: parseFloat(el.dataset.fade || 0) })
    })

    return () => { lenis.destroy(); window.removeEventListener('scroll', onScroll) }
  }, [loaded])

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />

  return (
    <>
      <CustomCursor />
      <LaunchScene />
      <ScrollRocket />

      {/* NAV */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:999,
        padding: scrolled ? '14px 48px' : '22px 48px',
        background: scrolled ? 'rgba(247,243,236,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(22,24,31,0.06)' : 'none',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <a href="#" className="interactive" style={{display:'flex',alignItems:'center',gap:10}}>
          <img src="/vortex-rocket.png" alt="" style={{width:28}} />
          <span style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--dark)',letterSpacing:'-0.01em'}}>
            VORTEX<span style={{color:'var(--accent)'}}>.</span>MEDIA
          </span>
        </a>
        <div style={{display:'flex',alignItems:'center',gap:24}}>
          {['Services','Process','Contact'].map(s => (
            <a key={s} href={'#'+s.toLowerCase()} className="interactive"
              style={{fontSize:13,fontWeight:500,color:'rgba(22,24,31,0.4)',transition:'color 0.3s'}}
              onMouseEnter={e=>e.target.style.color='var(--accent)'}
              onMouseLeave={e=>e.target.style.color='rgba(22,24,31,0.4)'}>{s}</a>
          ))}
          <a href={BRAND.os} target="_blank" rel="noreferrer" className="interactive" style={{
            padding:'8px 18px',borderRadius:99,fontSize:12,fontWeight:600,
            background:'var(--dark)',color:'#fff',
            transition:'transform 0.2s,box-shadow 0.2s',
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 6px 20px rgba(22,24,31,0.2)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
            Team Login
          </a>
        </div>
      </nav>

      {/* 01: HERO */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'0 24px',position:'relative'}}>
        <div style={{overflow:'hidden',marginBottom:8}}>
          <div className="line-reveal" data-d="0" style={{fontFamily:'var(--font-display)',fontSize:'clamp(60px,10vw,130px)',fontWeight:700,lineHeight:0.95,letterSpacing:'-0.05em',color:'var(--dark)'}}>We Launch</div>
        </div>
        <div style={{overflow:'hidden',marginBottom:8}}>
          <div className="line-reveal" data-d="0.1" style={{fontFamily:'var(--font-display)',fontSize:'clamp(60px,10vw,130px)',fontWeight:700,lineHeight:0.95,letterSpacing:'-0.05em'}}>
            <span style={{color:'var(--accent)'}}>Brands</span> <span style={{color:'var(--dark)'}}>Into</span>
          </div>
        </div>
        <div style={{overflow:'hidden',marginBottom:48}}>
          <div className="line-reveal" data-d="0.2" style={{fontFamily:'var(--font-display)',fontSize:'clamp(60px,10vw,130px)',fontWeight:700,lineHeight:0.95,letterSpacing:'-0.05em',color:'var(--dark)'}}>
            Orbit<span style={{color:'var(--accent)'}}>.</span>
          </div>
        </div>
        <div data-fade="0.3" style={{display:'flex',gap:14}}>
          <a href="#contact" className="interactive" style={{padding:'16px 36px',borderRadius:99,background:'var(--accent)',color:'#fff',fontSize:15,fontWeight:600,fontFamily:'var(--font-body)',boxShadow:'0 8px 40px rgba(242,85,44,0.3)',transition:'transform 0.2s,box-shadow 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 50px rgba(242,85,44,0.4)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 40px rgba(242,85,44,0.3)'}}>
            Start a Project
          </a>
          <a href="#services" className="interactive" style={{padding:'16px 36px',borderRadius:99,background:'transparent',color:'rgba(22,24,31,0.5)',fontSize:15,fontWeight:600,fontFamily:'var(--font-body)',border:'1.5px solid rgba(22,24,31,0.1)',transition:'border-color 0.3s,color 0.3s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(22,24,31,0.1)';e.currentTarget.style.color='rgba(22,24,31,0.5)'}}>
            Explore
          </a>
        </div>
        <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
          <span style={{fontSize:9,fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(22,24,31,0.25)'}}>Scroll</span>
          <div style={{width:1,height:48,background:'linear-gradient(to bottom,rgba(22,24,31,0.2),transparent)',animation:'pulse 2.5s ease-in-out infinite'}} />
        </div>
      </section>

      {/* 02: STATEMENT */}
      <section style={{minHeight:'80vh',display:'flex',alignItems:'center',padding:'120px 48px',background:'var(--dark)'}}>
        <div style={{maxWidth:900}}>
          <div style={{overflow:'hidden',marginBottom:8}}>
            <div className="line-reveal" style={{fontFamily:'var(--font-display)',fontSize:'clamp(36px,5.5vw,72px)',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.04em',color:'rgba(255,255,255,0.2)'}}>
              Integrated.
            </div>
          </div>
          <div style={{overflow:'hidden',marginBottom:8}}>
            <div className="line-reveal" data-d="0.1" style={{fontFamily:'var(--font-display)',fontSize:'clamp(36px,5.5vw,72px)',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.04em',color:'#fff'}}>
              Impact-Driven.
            </div>
          </div>
          <div style={{overflow:'hidden',marginBottom:40}}>
            <div className="line-reveal" data-d="0.2" style={{fontFamily:'var(--font-display)',fontSize:'clamp(36px,5.5vw,72px)',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.04em',color:'var(--accent)'}}>
              Built to Scale.
            </div>
          </div>
          <p data-fade="0.3" style={{fontSize:'clamp(15px,1.6vw,18px)',color:'rgba(255,255,255,0.35)',maxWidth:560,lineHeight:1.8,fontFamily:'var(--font-body)'}}>
            An advanced marketing and brand consultancy engineered for scale.
            We partner with ambitious organisations to solve complex challenges
            with clarity, data, and design.
          </p>
        </div>
      </section>

      {/* 03: SERVICES */}
      <section id="services" style={{padding:'160px 0',background:'var(--cream)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 48px'}}>
          <div style={{overflow:'hidden',marginBottom:4}}>
            <div className="line-reveal" style={{fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)'}}>What We Deliver</div>
          </div>
          <div style={{overflow:'hidden',marginBottom:64}}>
            <div className="line-reveal" data-d="0.08" style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,5vw,56px)',fontWeight:700,letterSpacing:'-0.04em',color:'var(--dark)'}}>
              Six engines of growth<span style={{color:'var(--accent)'}}>.</span>
            </div>
          </div>
        </div>
        {SERVICES.map((s,i) => (
          <div key={s.title} data-fade={i*0.06} className="interactive" style={{
            borderTop:'1px solid rgba(22,24,31,0.07)',
            padding:'32px 48px',
            display:'flex',alignItems:'center',
            maxWidth:1100,margin:'0 auto',
            transition:'background 0.4s',
          }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(242,85,44,0.02)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <span style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color:'rgba(22,24,31,0.2)',letterSpacing:'0.06em',width:48,flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
            <div style={{width:8,height:8,borderRadius:'50%',background:s.color,marginRight:32,flexShrink:0,boxShadow:'0 0 12px '+s.color+'88'}} />
            <span style={{fontFamily:'var(--font-display)',fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:'var(--dark)',flex:1,letterSpacing:'-0.02em'}}>{s.title}</span>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,maxWidth:400,justifyContent:'flex-end'}}>
              {s.items.slice(0,3).map(item => (
                <span key={item} style={{fontSize:11,fontWeight:500,color:'rgba(22,24,31,0.35)',padding:'4px 10px',borderRadius:99,background:'rgba(22,24,31,0.04)',border:'1px solid rgba(22,24,31,0.06)'}}>{item}</span>
              ))}
            </div>
          </div>
        ))}
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 48px'}}>
          <div style={{borderTop:'1px solid rgba(22,24,31,0.07)'}} />
        </div>
      </section>

      {/* 04: PROCESS */}
      <section id="process" style={{padding:'160px 48px',background:'var(--dark)'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{overflow:'hidden',marginBottom:4}}>
            <div className="line-reveal" style={{fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)'}}>Operating Model</div>
          </div>
          <div style={{overflow:'hidden',marginBottom:80}}>
            <div className="line-reveal" data-d="0.08" style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,5vw,56px)',fontWeight:700,letterSpacing:'-0.04em',color:'#fff'}}>
              Discover. Design.<br /><span style={{color:'var(--accent)'}}>Deploy. Optimize.</span>
            </div>
          </div>
          {PROCESS.map((step,i) => (
            <div key={step.num} data-fade={i*0.1} style={{
              display:'flex',gap:32,alignItems:'flex-start',
              paddingBottom:56,marginBottom:0,position:'relative',
            }}>
              {i < PROCESS.length-1 && <div style={{position:'absolute',left:23,top:52,width:1,height:'calc(100% - 32px)',background:'linear-gradient(to bottom,'+step.color+'44,rgba(255,255,255,0.04))'}} />}
              <div style={{width:48,height:48,borderRadius:14,flexShrink:0,background:step.color+'18',border:'1px solid '+step.color+'33',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color:step.color,position:'relative',zIndex:1}}>{step.num}</div>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(22px,3vw,32px)',fontWeight:700,color:'#fff',marginBottom:6,letterSpacing:'-0.02em'}}>{step.title}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.35)',lineHeight:1.7}}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05: WHY */}
      <section style={{padding:'160px 48px',background:'var(--cream)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{overflow:'hidden',marginBottom:4}}>
            <div className="line-reveal" style={{fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)'}}>Why Vortex Media</div>
          </div>
          <div style={{overflow:'hidden',marginBottom:80}}>
            <div className="line-reveal" data-d="0.08" style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,5vw,56px)',fontWeight:700,letterSpacing:'-0.04em',color:'var(--dark)'}}>
              Strategy + Execution<br /><span style={{color:'var(--accent)'}}>= Scalable Results.</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:0,borderTop:'1px solid rgba(22,24,31,0.08)',borderLeft:'1px solid rgba(22,24,31,0.08)'}}>
            {WHY_US.map((w,i) => (
              <div key={w.title} data-fade={i*0.08} className="interactive" style={{padding:'32px 24px',borderRight:'1px solid rgba(22,24,31,0.08)',borderBottom:'1px solid rgba(22,24,31,0.08)',transition:'background 0.4s'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(242,85,44,0.03)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{fontSize:11,fontWeight:700,color:'var(--accent)',letterSpacing:'0.08em',marginBottom:12,opacity:0.5}}>{String(i+1).padStart(2,'0')}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,color:'var(--dark)',marginBottom:6}}>{w.title}</div>
                <div style={{fontSize:12,color:'rgba(22,24,31,0.4)',lineHeight:1.6}}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06: CONTACT */}
      <section id="contact" style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'160px 24px',background:'var(--dark)',position:'relative',overflow:'hidden',textAlign:'center'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(242,85,44,0.12) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div style={{position:'relative',zIndex:1,maxWidth:700}}>
          <div style={{overflow:'hidden',marginBottom:4}}>
            <div className="line-reveal" style={{fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)'}}>Ready for the Future</div>
          </div>
          <div style={{overflow:'hidden',marginBottom:8}}>
            <div className="line-reveal" data-d="0.08" style={{fontFamily:'var(--font-display)',fontSize:'clamp(40px,7vw,80px)',fontWeight:700,lineHeight:1.04,letterSpacing:'-0.04em',color:'#fff'}}>Built for</div>
          </div>
          <div style={{overflow:'hidden',marginBottom:8}}>
            <div className="line-reveal" data-d="0.14" style={{fontFamily:'var(--font-display)',fontSize:'clamp(40px,7vw,80px)',fontWeight:700,lineHeight:1.04,letterSpacing:'-0.04em',color:'#fff'}}>Business Impact<span style={{color:'var(--accent)'}}>.</span></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,margin:'48px 0',}}>
            {[
              {l:'Email',v:BRAND.email,h:'mailto:'+BRAND.email},
              {l:'Phone',v:BRAND.phone,h:'tel:'+BRAND.phone.replace(/\s/g,'')},
              {l:'Location',v:BRAND.location,h:'https://maps.google.com/?q=Valsad+Gujarat'},
            ].map(c => (
              <a key={c.l} href={c.h} target="_blank" rel="noreferrer" className="interactive" style={{padding:'20px 14px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',textAlign:'center',transition:'background 0.3s,border-color 0.3s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.borderColor='var(--accent)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:10,fontWeight:700,color:'var(--accent)',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:6}}>{c.l}</div>
                <div style={{fontSize:13,fontWeight:500,color:'#fff'}}>{c.v}</div>
              </a>
            ))}
          </div>
          <a data-fade="0.3" href={'https://wa.me/'+BRAND.whatsapp+'?text=Hi%20Vortex%20Media!'} target="_blank" rel="noreferrer" className="interactive" style={{display:'inline-block',padding:'18px 48px',borderRadius:99,background:'#25D366',color:'#fff',fontSize:16,fontWeight:700,fontFamily:'var(--font-body)',boxShadow:'0 8px 32px rgba(37,211,102,0.25)',transition:'transform 0.2s,box-shadow 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 44px rgba(37,211,102,0.35)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 32px rgba(37,211,102,0.25)'}}>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'32px 48px',background:'#06060A',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/vortex-rocket.png" alt="" style={{width:20}} />
            <span style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.3)'}}>VORTEX<span style={{color:'var(--accent)'}}>.</span>MEDIA</span>
          </div>
          <div style={{display:'flex',gap:20}}>
            {['Instagram','LinkedIn','Facebook'].map((s,i) => (
              <a key={s} href={['https://instagram.com/vortex.agency','https://linkedin.com/company/vortexmedia09','https://facebook.com/vortexmedia09'][i]} target="_blank" rel="noreferrer" className="interactive" style={{fontSize:12,color:'rgba(255,255,255,0.2)',fontWeight:500,transition:'color 0.3s'}}
                onMouseEnter={e=>e.target.style.color='var(--accent)'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.2)'}>{s}</a>
            ))}
            <a href={BRAND.os} target="_blank" rel="noreferrer" className="interactive" style={{padding:'4px 12px',borderRadius:99,fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.25)',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',transition:'border-color 0.3s,color 0.3s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.25)'}}>
              Team Portal
            </a>
          </div>
          <div style={{width:'100%',textAlign:'center',fontSize:10,color:'rgba(255,255,255,0.1)',marginTop:8}}>
            {new Date().getFullYear()} Vortex Media. Valsad, Gujarat, India.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.2} 50%{opacity:0.5} }
        * { cursor: none !important; }
        @media (max-width:768px) {
          * { cursor: auto !important; }
          nav { padding: 14px 20px !important; }
          nav > div:last-child a:not(:last-child) { display: none; }
        }
      `}</style>
    </>
  )
}
