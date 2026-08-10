import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

const formulas = [
  // Matemáticas
  '∫ f(x) dx', '∑ n²', 'lim(x→∞)', '∂f/∂x', '∇·E = ρ/ε₀', 'e^(iπ) + 1 = 0',
  'a² + b² = c²', 'σ = √(∑(x-μ)²/n)', 'P(A∩B) = P(A)·P(B)', 'logₐ(x) = y',
  '∮ E·dA = Q/ε₀', 'f(z) = Σ aₙzⁿ', 'Γ(n) = (n-1)!', '|z| = √(a²+b²)',
  'e^x = Σ xⁿ/n!', '∏ (1 - 1/pˢ)⁻¹', '∫₀^∞ e^(-x²) dx = √π/2',
  'z → z² + c', 'r = a·φ^(2θ/π)', 'μ = |z - z₀|', '|λ| < 1 ⟺ estable',
  // Química
  'C₆H₁₂O₆ + 6O₂ →', 'H₂O', 'CH₄ + 2O₂ → CO₂', 'C₂H₅OH', 'C₈H₁₀N₄O₂',
  'N₂ + 3H₂ ⇌ 2NH₃', 'PV = nRT', 'ΔH = ΣHᵣ - ΣHₚ', 'pH = -log[H⁺]',
  'e⁻ + H₂O → H⁺ + OH⁻', 'CH₃COOH ⇌ H⁺ + CH₃COO⁻', 'K = e^(-ΔG/RT)',
  'ΔG = ΔH - TΔS', 'E° = RT/nF · lnK', 'k = A·e^(-Ea/RT)',
  // Física
  'E = mc²', 'F = ma', 'v = d/t', 'E = h·f', 'F = G·m₁m₂/r²',
  'PV = nRT', 'KE = ½mv²', 'ΔE = mc²', 'I = V/R', 'f = 1/T',
  'λ = h/p', 'E = ½kx²', 'τ = r × F', 'ΔU = Q + W', 'p = γmv',
  // Ingeniería
  'Re = ρvD/μ', 'Q = A·v', 'ΔP = f·(L/D)·(ρv²/2)', 'η = Wₒᵤₜ/Wᵢₙ',
  'V = IR', 'P = VI', 'f = 1/(2π√(LC))', 'dB = 10·log(P₂/P₁)',
  'PID: u = Kp·e + Ki·∫e + Kd·de/dt', 't₆₃ = τ = RC', 'H(s) = K/(τs+1)',
  // Ciberseguridad y cómputo
  '0xDEADBEEF', 'b2h3k4m5n6', 'SSH-2.0', 'AES-256-GCM',
  '10110110', 'XOR ⊕ Y', '{0,1}ⁿ → {0,1}', 'SHA-256', 'ECDH · P-256',
  'O(n log n)', 'while (true) { run(); }', 'if (p ∧ q) → r', 'λx. λy. x+y',
  'k-means: min Σ||x-μ||²', '∇L(θ) → 0', 'softmax(xᵢ)', 'ReLU(x) = max(0,x)',
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
  large: boolean
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const style = getComputedStyle(document.documentElement)
    const accent = style.getPropertyValue('--accent').trim() || '#00f5d4'
    const neutral = style.getPropertyValue('--accent-neutral').trim() || '#c8c8d4'

    const count = isMobile
      ? Math.min(16, Math.floor(window.innerWidth / 45))
      : Math.min(48, Math.floor(window.innerWidth / 32))

    particles = Array.from({ length: count }, (_, i) => {
      const large = !isMobile && i % 7 === 0
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 1.5 - canvas.height * 0.25,
        text: formulas[Math.floor(Math.random() * formulas.length)],
        size: large
          ? 22 + Math.random() * 10
          : isMobile
            ? 11 + Math.random() * 6
            : 12 + Math.random() * 8,
        speed: large ? 0.05 + Math.random() * 0.07 : 0.15 + Math.random() * 0.22,
        drift: large ? 0 : (Math.random() - 0.5) * 0.3,
        opacity: large
          ? 0.06 + Math.random() * 0.06
          : isMobile
            ? 0.12 + Math.random() * 0.10
            : 0.10 + Math.random() * 0.10,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? accent : neutral,
        large,
      }
    })

    const time = { value: 0 }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time.value += reduceMotion ? 0 : 0.005

      for (const p of particles) {
        if (!reduceMotion) {
          p.y -= p.speed
          p.x += Math.sin(time.value + p.phase) * p.drift
          if (p.y + 20 < 0) {
            p.y = canvas.height + 20
            p.x = Math.random() * canvas.width
            p.text = formulas[Math.floor(Math.random() * formulas.length)]
          }
        }

        ctx.globalAlpha = p.opacity + (reduceMotion ? 0 : Math.sin(time.value * 2 + p.phase) * 0.03)
        ctx.font = `${p.size}px "Times New Roman", serif`
        ctx.fillStyle = p.color
        ctx.textAlign = 'center'
        ctx.fillText(p.text, p.x, p.y)
      }

      ctx.globalAlpha = 1
      if (reduceMotion) return
      animId = requestAnimationFrame(step)
    }

    step()

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
