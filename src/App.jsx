import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import LaunchScene from './components/LaunchScene'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Clients from './components/Clients'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
    return () => { lenis.destroy() }
  }, [loaded])

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />

  return (
    <>
      <LaunchScene />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <About />
        <Services />
        <Clients />
        <Process />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
