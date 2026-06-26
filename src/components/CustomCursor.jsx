import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const hovered = useRef(false)

  useEffect(() => {
    const move = (e) => { target.current = { x: e.clientX, y: e.clientY } }
    const addHover = () => {
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('mouseenter', () => { hovered.current = true })
        el.addEventListener('mouseleave', () => { hovered.current = false })
      })
    }
    window.addEventListener('mousemove', move)
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    let raf
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (dot.current) dot.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`
      if (ring.current) {
        const s = hovered.current ? 2 : 1
        ring.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px) scale(${s})`
        ring.current.style.borderColor = hovered.current ? '#F2552C' : 'rgba(22,24,31,0.25)'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); observer.disconnect() }
  }, [])

  return (
    <>
      <div ref={dot} style={{ position:'fixed', top:0, left:0, zIndex:99999, width:8, height:8, borderRadius:'50%', background:'#F2552C', pointerEvents:'none' }} />
      <div ref={ring} style={{ position:'fixed', top:0, left:0, zIndex:99998, width:40, height:40, borderRadius:'50%', border:'1.5px solid rgba(22,24,31,0.25)', pointerEvents:'none', transition:'border-color 0.3s, transform 0.06s ease-out' }} />
    </>
  )
}
