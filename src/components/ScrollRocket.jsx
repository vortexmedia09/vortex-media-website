import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollRocket() {
  const rocketRef = useRef()

  useEffect(() => {
    const el = rocketRef.current
    if (!el) return

    // Create the scroll-driven rocket journey
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    })

    // Rocket journey keyframes
    tl
      // Hero: centered, large, glowing
      .fromTo(el, {
        x: '0vw', y: '0vh', scale: 1, rotation: 0, opacity: 1,
      }, {
        x: '30vw', y: '15vh', scale: 0.7, rotation: 15, opacity: 0.9,
        duration: 1, ease: 'none',
      })
      // About: flies to the right
      .to(el, {
        x: '-25vw', y: '8vh', scale: 0.5, rotation: -10,
        duration: 1, ease: 'none',
      })
      // Services: swoops across
      .to(el, {
        x: '35vw', y: '-5vh', scale: 0.45, rotation: 20,
        duration: 1.5, ease: 'none',
      })
      // Industries: dips down
      .to(el, {
        x: '-20vw', y: '12vh', scale: 0.4, rotation: -15,
        duration: 1, ease: 'none',
      })
      // Process: rises up
      .to(el, {
        x: '15vw', y: '-10vh', scale: 0.5, rotation: 5,
        duration: 1, ease: 'none',
      })
      // Why: centers
      .to(el, {
        x: '0vw', y: '0vh', scale: 0.55, rotation: 0,
        duration: 1, ease: 'none',
      })
      // Results: small fly-by
      .to(el, {
        x: '30vw', y: '5vh', scale: 0.35, rotation: 25,
        duration: 1, ease: 'none',
      })
      // Contact: arrives at destination, grows, lands
      .to(el, {
        x: '0vw', y: '0vh', scale: 0.9, rotation: 0, opacity: 1,
        duration: 1.5, ease: 'none',
      })

    return () => tl.kill()
  }, [])

  return (
    <div ref={rocketRef} style={{
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
      pointerEvents: 'none',
      willChange: 'transform',
      filter: 'drop-shadow(0 8px 32px rgba(242,85,44,0.25))',
    }}>
      <img src="/vortex-rocket.png" alt="" style={{ width: 80, height: 'auto' }} />
      {/* Rocket trail */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
        width: 4, height: 40,
        background: 'linear-gradient(to bottom, rgba(242,85,44,0.6), rgba(212,168,83,0.3), transparent)',
        borderRadius: 99, filter: 'blur(2px)',
      }} />
    </div>
  )
}
