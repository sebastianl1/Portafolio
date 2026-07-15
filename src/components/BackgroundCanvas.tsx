import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

const formulas = [
  // Matemáticas
  '∫ f(x) dx', '∑ n²', 'lim(x→∞)', '∂f/∂x', '∇·E = ρ/ε₀', 'e^(iπ) + 1 = 0',
  'a² + b² = c²', 'σ = √(∑(x-μ)²/n)', 'P(A∩B) = P(A)·P(B)', 'logₐ(x) = y',
  // Química
  'C₆H₁₂O₆ + 6O₂ →', 'H₂O', 'CH₄ + 2O₂ → CO₂', 'C₂H₅OH', 'C₈H₁₀N₄O₂',
  'N₂ + 3H₂ ⇌ 2NH₃', 'PV = nRT', 'ΔH = ΣHᵣ - ΣHₚ', 'pH = -log[H⁺]',
  'e⁻ + H₂O → H⁺ + OH⁻', 'CH₃COOH ⇌ H⁺ + CH₃COO⁻',
  // Física
  'E = mc²', 'F = ma', 'v = d/t', 'E = h·f', 'F = G·m₁m₂/r²',
  'PV = nRT', 'KE = ½mv²', 'ΔE = mc²', 'I = V/R', 'f = 1/T',
  'λ = h/p', 'E = ½kx²', 'τ = r × F', 'ΔU = Q + W',
  // Ingeniería
  'Re = ρvD/μ', 'Q = A·v', 'ΔP = f·(L/D)·(ρv²/2)', 'η = Wₒᵤₜ/Wᵢₙ',
  'V = IR', 'P = VI', 'f = 1/(2π√(LC))', 'dB = 10·log(P₂/P₁)',
  // Ciberseguridad
  '0xDEADBEEF', 'b2h3k4m5n6', 'SSH-2.0', 'AES-256-GCM',
  '10110110', 'XOR ⊕ Y', '{0,1}ⁿ → {0,1}',
]

interface Particle {
  x: number
  y: number
  text: string
  size: number
  speed: number
  drift: number
  opacity: number
  phase: number
  color: string
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = isMobile
      ? Math.min(10, Math.floor(window.innerWidth / 60))
      : Math.min(25, Math.floor(window.innerWidth / 50))

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 1.5 - canvas.height * 0.25,
      text: formulas[Math.floor(Math.random() * formulas.length)],
      size: isMobile ? 11 + Math.random() * 6 : 12 + Math.random() * 8,
      speed: 0.15 + Math.random() * 0.2,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: isMobile ? 0.12 + Math.random() * 0.10 : 0.10 + Math.random() * 0.10,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#00f5d4' : '#c8c8d4',
    }))

    const time = { value: 0 }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time.value += 0.005

      for (const p of particles) {
        p.y -= p.speed
        p.x += Math.sin(time.value + p.phase) * p.drift

        if (p.y + 20 < 0) {
          p.y = canvas.height + 20
          p.x = Math.random() * canvas.width
          p.text = formulas[Math.floor(Math.random() * formulas.length)]
        }

        ctx.globalAlpha = p.opacity + Math.sin(time.value * 2 + p.phase) * 0.03
        ctx.font = `${p.size}px "Times New Roman", serif`
        ctx.fillStyle = p.color
        ctx.textAlign = 'center'
        ctx.fillText(p.text, p.x, p.y)
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
