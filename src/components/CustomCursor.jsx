import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const hovered = useRef(false)

  useEffect(() => {
    const move = (e) => { target.current = { x: e.clientX, y: e.clientY } }
    const over = () => { hovered.current = true }
    const out = () => { hovered.current = false }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })

    let raf
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      if (dot.current) {
        dot.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`
      }
      if (ring.current) {
        const scale = hovered.current ? 1.8 : 1
        ring.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px) scale(${scale})`
        ring.current.style.borderColor = hovered.current ? '#F2552C' : 'rgba(255,255,255,0.4)'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 8, height: 8, borderRadius: '50%', background: '#F2552C',
        pointerEvents: 'none', transition: 'none',
      }} />
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: 40, height: 40, borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.4)',
        pointerEvents: 'none',
        transition: 'border-color 0.3s, transform 0.08s ease-out',
      }} />
    </>
  )
}
