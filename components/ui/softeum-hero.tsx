'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const SofteumHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grainCanvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const grainCanvas = grainCanvasRef.current
    if (!canvas || !grainCanvas) return

    const ctx = canvas.getContext('2d')
    const grainCtx = grainCanvas.getContext('2d')
    if (!ctx || !grainCtx) return

    const density = ' .:-=+*#%@'

    const params = {
      rotation: 0,
      atmosphereShift: 0,
      glitchIntensity: 0,
    }

    const t1 = gsap.to(params, { rotation: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' })
    const t2 = gsap.to(params, { atmosphereShift: 1, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    const t3 = gsap.to(params, {
      glitchIntensity: 1,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      repeatDelay: Math.random() * 3 + 1,
    })

    const generateFilmGrain = (width: number, height: number, intensity = 0.15) => {
      const imageData = grainCtx.createImageData(width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * intensity * 255
        data[i] = Math.max(0, Math.min(255, 128 + grain))
        data[i + 1] = Math.max(0, Math.min(255, 128 + grain))
        data[i + 2] = Math.max(0, Math.min(255, 128 + grain))
        data[i + 3] = Math.abs(grain) * 3
      }
      return imageData
    }

    const drawGlitchedOrb = (
      centerX: number,
      centerY: number,
      radius: number,
      hue: number,
      glitchIntensity: number
    ) => {
      ctx.save()
      const shouldGlitch = Math.random() < 0.1 && glitchIntensity > 0.5
      const glitchOffset = shouldGlitch ? (Math.random() - 0.5) * 20 * glitchIntensity : 0
      const glitchScale = shouldGlitch ? 1 + (Math.random() - 0.5) * 0.3 * glitchIntensity : 1

      if (shouldGlitch) {
        ctx.translate(glitchOffset, glitchOffset * 0.8)
        ctx.scale(glitchScale, 1 / glitchScale)
      }

      const orbGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5)
      orbGradient.addColorStop(0, `hsla(${hue + 10}, 100%, 95%, 0.9)`)
      orbGradient.addColorStop(0.2, `hsla(${hue + 20}, 90%, 80%, 0.7)`)
      orbGradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.4)`)
      orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = orbGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerRadius = radius * 0.3
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, 0.8)`
      ctx.beginPath()
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
      ctx.fill()

      if (shouldGlitch) {
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = `hsla(100, 100%, 50%, ${0.6 * glitchIntensity})`
        ctx.beginPath()
        ctx.arc(centerX + glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `hsla(240, 100%, 50%, ${0.5 * glitchIntensity})`
        ctx.beginPath()
        ctx.arc(centerX - glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
        ctx.strokeStyle = `rgba(255,255,255,${0.6 * glitchIntensity})`
        ctx.lineWidth = 1
        for (let i = 0; i < 5; i++) {
          const y = centerY - radius + Math.random() * radius * 2
          ctx.beginPath()
          ctx.moveTo(centerX - radius + Math.random() * 20, y)
          ctx.lineTo(centerX + radius - Math.random() * 20, y)
          ctx.stroke()
        }
        ctx.fillStyle = `rgba(255,0,255,${0.4 * glitchIntensity})`
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            centerX - radius + Math.random() * radius * 2,
            centerY - radius + Math.random() * radius * 2,
            Math.random() * 10 + 2,
            Math.random() * 10 + 2
          )
        }
      }

      ctx.strokeStyle = `hsla(${hue + 20}, 80%, 70%, 0.6)`
      ctx.lineWidth = 2
      if (shouldGlitch) {
        for (let i = 0; i < 8; i++) {
          const ringRadius = radius * 1.2 + (Math.random() - 0.5) * 10 * glitchIntensity
          ctx.beginPath()
          ctx.arc(centerX, centerY, ringRadius, (i / 8) * Math.PI * 2, ((i + 1) / 8) * Math.PI * 2)
          ctx.stroke()
        }
      } else {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (shouldGlitch && Math.random() < 0.3) {
        ctx.globalCompositeOperation = 'difference'
        ctx.fillStyle = `rgba(255,255,255,${0.8 * glitchIntensity})`
        for (let i = 0; i < 3; i++) {
          const barY = centerY - radius + Math.random() * radius * 2
          ctx.fillRect(centerX - radius, barY, radius * 2, Math.random() * 5 + 1)
        }
        ctx.globalCompositeOperation = 'source-over'
      }
      ctx.restore()
    }

    const render = () => {
      timeRef.current += 0.016
      const time = timeRef.current
      const width = (canvas.width = grainCanvas.width = window.innerWidth)
      const height = (canvas.height = grainCanvas.height = window.innerHeight)

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.2

      const hue = 200 + params.atmosphereShift * 40
      const bgGradient = ctx.createRadialGradient(centerX, centerY - 50, 0, centerX, centerY, Math.max(width, height) * 0.8)
      bgGradient.addColorStop(0, `hsla(${hue + 40}, 80%, 60%, 0.3)`)
      bgGradient.addColorStop(0.3, `hsla(${hue}, 60%, 40%, 0.2)`)
      bgGradient.addColorStop(0.6, `hsla(${hue - 20}, 40%, 20%, 0.15)`)
      bgGradient.addColorStop(1, 'rgba(0,0,0,0.9)')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      drawGlitchedOrb(centerX, centerY, radius, hue, params.glitchIntensity)

      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const spacing = 9
      const cols = Math.floor(width / spacing)
      const rows = Math.floor(height / spacing)

      for (let i = 0; i < cols && i < 150; i++) {
        for (let j = 0; j < rows && j < 100; j++) {
          const x = (i - cols / 2) * spacing + centerX
          const y = (j - rows / 2) * spacing + centerY
          const dx = x - centerX
          const dy = y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius && Math.random() > 0.4) {
            const z = Math.sqrt(Math.max(0, radius * radius - dx * dx - dy * dy))
            const rotZ = dx * Math.sin(params.rotation) + z * Math.cos(params.rotation)
            const brightness = (rotZ + radius) / (radius * 2)

            if (rotZ > -radius * 0.3) {
              let char = density[Math.floor(brightness * (density.length - 1))]
              if (dist < radius * 0.8 && params.glitchIntensity > 0.8 && Math.random() < 0.3) {
                const gc = ['█', '▓', '▒', '░', '▄', '▀', '■', '□']
                char = gc[Math.floor(Math.random() * gc.length)]
              }
              ctx.fillStyle = `rgba(255,255,255,${Math.max(0.2, brightness)})`
              ctx.fillText(char, x, y)
            }
          }
        }
      }

      // Film grain
      grainCtx.clearRect(0, 0, width, height)
      grainCtx.putImageData(generateFilmGrain(width, height, 0.22 + Math.sin(time * 10) * 0.03), 0, 0)

      if (params.glitchIntensity > 0.5) {
        grainCtx.globalCompositeOperation = 'screen'
        for (let i = 0; i < 200; i++) {
          const opacity = Math.random() * 0.5 * params.glitchIntensity
          grainCtx.fillStyle = `rgba(255,255,255,${opacity})`
          grainCtx.beginPath()
          grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 0.5, 0, Math.PI * 2)
          grainCtx.fill()
        }
      }

      grainCtx.globalCompositeOperation = 'screen'
      for (let i = 0; i < 100; i++) {
        grainCtx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`
        grainCtx.beginPath()
        grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2)
        grainCtx.fill()
      }

      grainCtx.globalCompositeOperation = 'multiply'
      for (let i = 0; i < 50; i++) {
        grainCtx.fillStyle = `rgba(0,0,0,${Math.random() * 0.5 + 0.5})`
        grainCtx.beginPath()
        grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5 + 0.5, 0, Math.PI * 2)
        grainCtx.fill()
      }

      frameRef.current = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      grainCanvas.width = window.innerWidth
      grainCanvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      t1.kill()
      t2.kill()
      t3.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Canvas de fundo */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* Film grain overlay */}
      <canvas
        ref={grainCanvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity: 0.6,
        }}
      />

      {/* Texto central — absolutamente posicionado dentro da section */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            textShadow: '0 0 60px rgba(255,255,255,0.2)',
          }}
        >
          SOFTEUM
        </div>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.55rem, 1.1vw, 0.85rem)',
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}
        >
          Inteligência Empresarial · Software de Gestão
        </div>
      </div>

      {/* Texto lado esquerdo */}
      <div
        style={{
          position: 'absolute',
          left: '2rem',
          top: '44%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            maxWidth: 130,
          }}
        >
          Transforme<br />processos em<br />resultados reais
        </p>
      </div>

      {/* Texto lado direito */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          top: '44%',
          pointerEvents: 'none',
          zIndex: 10,
          textAlign: 'right',
        }}
      >
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            maxWidth: 130,
          }}
        >
          +18 soluções<br />integradas<br />para sua empresa
        </p>
      </div>

      {/* Indicador de scroll */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 9,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </div>
    </section>
  )
}
