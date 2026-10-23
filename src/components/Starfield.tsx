import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  r: number
  phase: number
  speed: number
  hue: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let stars: Star[] = []
    let shooters: ShootingStar[] = []
    let raf = 0
    let mouseX = 0
    let mouseY = 0
    let nextShooter = 120

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(Math.floor((width * height) / 4500), 280)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.3 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.15,
        hue: Math.random(),
      }))
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 2
      mouseY = (e.clientY / height - 0.5) * 2
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        const parallax = 12 * s.z
        const x = s.x - mouseX * parallax
        const y = s.y - mouseY * parallax
        const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase))
        const color = s.hue > 0.82 ? '170, 210, 255' : '190, 200, 235'
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color}, ${alpha * (0.35 + 0.65 * s.z)})`
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduced && Math.random() < 0.004 && shooters.length < 3) {
        const fromLeft = Math.random() > 0.5
        shooters.push({
          x: fromLeft ? Math.random() * width * 0.4 : Math.random() * width,
          y: Math.random() * height * 0.4,
          vx: (fromLeft ? 1 : -1) * (Math.random() * 3 + 3),
          vy: Math.random() * 1.4 + 1.2,
          life: 1,
        })
      }

      shooters = shooters.filter((s) => s.life > 0)
      for (const s of shooters) {
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.012
        const tail = 90
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail)
        grad.addColorStop(0, `rgba(170, 200, 255, ${0.85 * s.life})`)
        grad.addColorStop(1, 'rgba(170, 200, 255, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail)
        ctx.stroke()
      }

      if (t * 0.001 > nextShooter) nextShooter = t * 0.001 + Math.random() * 40

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    if (!reduced) raf = requestAnimationFrame(draw)
    else {
      // Draw a single static frame.
      draw(0)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: 'radial-gradient(circle, #6c8cff 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-56 -right-40 h-[42rem] w-[42rem] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: 'radial-gradient(circle, #5eead4 0%, transparent 70%)' }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #8a6cff 0%, transparent 70%)' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
