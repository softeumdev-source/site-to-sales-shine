'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export const HorizonHero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [progressWidth, setProgressWidth] = useState(0)
  const [sectionLabel, setSectionLabel] = useState('01')
  const [fontSize, setFontSize] = useState('10rem')

  const threeRefs = useRef<{
    renderer: THREE.WebGLRenderer | null
    camera: THREE.PerspectiveCamera | null
    scene: THREE.Scene | null
    stars: THREE.Points[]
    mountains: THREE.Mesh[]
    nebula: THREE.Mesh | null
    animId: number
    targetZ: number
    currentZ: number
  }>({
    renderer: null, camera: null, scene: null,
    stars: [], mountains: [], nebula: null,
    animId: 0, targetZ: 300, currentZ: 300,
  })

  /* ─── Three.js scene ─── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const refs = threeRefs.current

    const w = window.innerWidth
    const h = window.innerHeight

    refs.scene = new THREE.Scene()
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025)
    const scene = refs.scene

    refs.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 2000)
    refs.camera.position.set(0, 25, 300)

    refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    refs.renderer.setSize(w, h)
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    refs.renderer.setClearColor(0x000000)
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
    refs.renderer.toneMappingExposure = 0.6

    /* Stars — 3 layers */
    for (let layer = 0; layer < 3; layer++) {
      const count = 4000
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      const col = new Float32Array(count * 3)
      for (let j = 0; j < count; j++) {
        const r = 200 + Math.random() * 800
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        pos[j * 3] = r * Math.sin(phi) * Math.cos(theta)
        pos[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[j * 3 + 2] = r * Math.cos(phi)
        const c = new THREE.Color()
        const p = Math.random()
        if (p < 0.7) c.setHSL(0, 0, 0.8 + Math.random() * 0.2)
        else if (p < 0.9) c.setHSL(0.08, 0.5, 0.8)
        else c.setHSL(0.6, 0.5, 0.8)
        col[j * 3] = c.r; col[j * 3 + 1] = c.g; col[j * 3 + 2] = c.b
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
      const mat = new THREE.PointsMaterial({
        size: 1.2, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true,
      })
      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      refs.stars.push(pts)
    }

    /* Nebula */
    refs.nebula = new THREE.Mesh(
      new THREE.PlaneGeometry(8000, 4000),
      new THREE.MeshBasicMaterial({ color: 0x0033ff, transparent: true, opacity: 0.06, side: THREE.DoubleSide }),
    )
    refs.nebula.position.z = -1050
    scene.add(refs.nebula)

    /* Mountains */
    const layers = [
      { z: -50, h: 60, color: 0x1a1a2e, op: 1.0 },
      { z: -100, h: 80, color: 0x16213e, op: 0.8 },
      { z: -150, h: 100, color: 0x0f3460, op: 0.6 },
      { z: -200, h: 120, color: 0x0a4668, op: 0.4 },
    ]
    layers.forEach(({ z, h, color, op }) => {
      const pts: THREE.Vector2[] = []
      for (let i = 0; i <= 50; i++) {
        pts.push(new THREE.Vector2(
          (i / 50 - 0.5) * 1000,
          Math.sin(i * 0.1) * h + Math.sin(i * 0.05) * h * 0.5 - 100,
        ))
      }
      pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300))
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(pts)),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, side: THREE.DoubleSide }),
      )
      mesh.position.set(0, z, z)
      scene.add(mesh)
      refs.mountains.push(mesh)
    })

    /* Render loop */
    let t = 0
    const animate = () => {
      refs.animId = requestAnimationFrame(animate)
      t += 0.016
      refs.stars.forEach(s => { s.rotation.y += 0.00006 })
      refs.currentZ += (refs.targetZ - refs.currentZ) * 0.04
      if (refs.camera) {
        refs.camera.position.set(
          Math.sin(t * 0.08) * 3,
          25 + Math.cos(t * 0.12),
          refs.currentZ,
        )
        refs.camera.lookAt(0, 10, -600)
      }
      refs.mountains.forEach((m, i) => { m.position.x = Math.sin(t * 0.08) * 2 * (1 + i * 0.4) })
      refs.renderer?.render(scene, refs.camera!)
    }
    animate()

    /* Resize */
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight
      refs.camera!.aspect = nw / nh
      refs.camera!.updateProjectionMatrix()
      refs.renderer!.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(refs.animId)
      window.removeEventListener('resize', onResize)
      refs.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose() })
      refs.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose() })
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose() }
      refs.renderer?.dispose()
      refs.stars = []
      refs.mountains = []
      refs.nebula = null
      refs.renderer = null
      refs.camera = null
      refs.scene = null
    }
  }, [])

  /* ─── Calcula font-size baseado no viewport real ─── */
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth
      const size = Math.min(Math.max(vw * 0.15, 80), 220)
      setFontSize(`${size}px`)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  /* ─── GSAP entrance (usa set() para esconder imediatamente, depois anima) ─── */
  useEffect(() => {
    const menu = menuRef.current
    const title = titleRef.current
    const progress = progressRef.current
    const subtitle = subtitleRef.current
    if (!menu || !title || !progress || !subtitle) return

    const lines = subtitle.querySelectorAll<HTMLElement>('span')

    /* Esconde imediatamente para não piscar */
    gsap.set(menu, { x: -80, opacity: 0 })
    gsap.set(title, { y: 80, opacity: 0 })
    gsap.set(lines, { y: 30, opacity: 0 })
    gsap.set(progress, { opacity: 0, y: 15 })

    const tl = gsap.timeline({ delay: 0.4 })
    tl.to(menu, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
    tl.to(title, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }, '-=0.5')
    tl.to(lines, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8')
    tl.to(progress, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')

    return () => {
      tl.kill()
      /* Garante que ficam visíveis se o componente for desmontado no meio da animação */
      gsap.set([menu, title, ...Array.from(lines), progress], { clearProps: 'all' })
    }
  }, [])

  /* ─── Scroll: câmera avança conforme a seção passa pela viewport ─── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const rawProgress = 1 - rect.bottom / (vh + rect.height)
      const progress = Math.max(0, Math.min(1, rawProgress))
      threeRefs.current.targetZ = 300 - progress * 350
      setProgressWidth(progress * 100)
      setSectionLabel(progress < 0.5 ? '01' : '02')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        flexShrink: 0,
      }}
    >
      {/* Canvas Three.js */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Menu lateral */}
      <div
        ref={menuRef}
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }}
            />
          ))}
        </div>
        <span
          style={{
            writingMode: 'vertical-rl',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 9,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginTop: 8,
          }}
        >
          SPACE
        </span>
      </div>

      {/* Título e subtítulo — centro vertical da tela */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div
          ref={titleRef}
          className="font-black"
          style={{
            fontFamily: '"Inter", Arial Black, sans-serif',
            fontSize: fontSize,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            textShadow: '0 0 80px rgba(255,255,255,0.25)',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          SOFTEUM
        </div>

        <div ref={subtitleRef} style={{ marginTop: '1.2rem' }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>
            Inteligência Empresarial · Software de Gestão
          </span>
        </div>
      </div>

      {/* Scroll progress */}
      <div
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2rem',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 8,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          SCROLL
        </span>
        <div style={{
          width: 80, height: 1,
          background: 'rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${progressWidth}%`,
            background: 'rgba(255,255,255,0.6)',
            transition: 'width 0.15s linear',
          }} />
        </div>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 9,
          letterSpacing: 2,
          color: 'rgba(255,255,255,0.3)',
        }}>
          {sectionLabel} / 02
        </span>
      </div>
    </section>
  )
}
