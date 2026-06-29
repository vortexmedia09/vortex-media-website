import { useRef, useEffect } from 'react'

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_scroll;
  uniform vec2 u_drops[8];
  uniform float u_drop_times[8];
  uniform int u_drop_count;

  float ripple(vec2 uv, vec2 center, float t) {
    float d = length(uv - center);
    float wave = sin(d * 18.0 - t * 3.0) * exp(-d * 3.5 - t * 0.8);
    return wave * (1.0 - smoothstep(0.0, 1.2, t));
  }

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 uva = uv * aspect;

    // Base deep navy
    vec3 col = vec3(0.04, 0.04, 0.09);

    // Scroll-driven ink spread from bottom
    float inkLevel = u_scroll * 1.4;
    float inkEdge = smoothstep(inkLevel - 0.15, inkLevel + 0.05, 1.0 - uv.y);

    // Ink color: deep navy to rich dark blue
    vec3 inkColor = mix(vec3(0.06, 0.06, 0.14), vec3(0.03, 0.03, 0.08), uv.y);
    col = mix(col, inkColor, inkEdge * 0.6);

    // Orange glow at ink edge
    float glowEdge = smoothstep(inkLevel - 0.08, inkLevel, 1.0 - uv.y)
                   * (1.0 - smoothstep(inkLevel, inkLevel + 0.06, 1.0 - uv.y));
    col += vec3(0.95, 0.33, 0.17) * glowEdge * 0.6;

    // Ripple drops
    float totalRipple = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= u_drop_count) break;
      float t = u_time - u_drop_times[i];
      if (t > 0.0 && t < 3.0) {
        totalRipple += ripple(uva, u_drops[i] * aspect, t);
      }
    }

    // Ripple color: orange-gold
    col += vec3(0.95, 0.55, 0.17) * totalRipple * 0.35;

    // Ambient particles
    float grain = noise(uv * 400.0 + u_time * 0.05) * 0.025;
    col += grain * inkEdge;

    // Vignette
    float vig = 1.0 - length((uv - 0.5) * 1.3);
    col *= smoothstep(0.0, 0.7, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function InkShader() {
  const canvasRef = useRef()
  const stateRef = useRef({
    drops: Array(8).fill([0.5, 0.5]),
    dropTimes: Array(8).fill(-999),
    dropCount: 0,
    scroll: 0,
    maxScroll: 1,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Compile shaders
    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uScroll = gl.getUniformLocation(prog, 'u_scroll')
    const uDrops = gl.getUniformLocation(prog, 'u_drops')
    const uDropTimes = gl.getUniformLocation(prog, 'u_drop_times')
    const uDropCount = gl.getUniformLocation(prog, 'u_drop_count')

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Scroll
    const onScroll = () => {
      stateRef.current.maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      stateRef.current.scroll = window.scrollY / stateRef.current.maxScroll
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Click/tap drops
    let dropIdx = 0
    const addDrop = (x, y, t) => {
      const s = stateRef.current
      s.drops[dropIdx % 8] = [x / window.innerWidth, 1 - y / window.innerHeight]
      s.dropTimes[dropIdx % 8] = t
      s.dropCount = Math.min(s.dropCount + 1, 8)
      dropIdx++
    }
    const onClick = (e) => addDrop(e.clientX, e.clientY, performance.now() / 1000)
    window.addEventListener('click', onClick)

    // Auto drops every 3s
    let autoT = 0
    const autoDrop = (t) => {
      if (t - autoT > 3000) {
        addDrop(Math.random() * window.innerWidth, Math.random() * window.innerHeight, t / 1000)
        autoT = t
      }
    }

    // Render loop
    let raf
    const render = (t) => {
      const ts = t / 1000
      const s = stateRef.current
      autoDrop(t)

      gl.uniform1f(uTime, ts)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uScroll, s.scroll)
      gl.uniform2fv(uDrops, s.drops.flat())
      gl.uniform1fv(uDropTimes, s.dropTimes)
      gl.uniform1i(uDropCount, s.dropCount)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      zIndex: 0, display: 'block',
    }} />
  )
}
