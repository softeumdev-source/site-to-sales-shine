'use client'

import React, { useEffect, useRef, ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange'
  customSize?: boolean
}

const spotlightColor: Record<string, string> = {
  blue:   'hsla(210,100%,70%,0.15)',
  purple: 'hsla(280,100%,70%,0.15)',
  green:  'hsla(120,100%,60%,0.13)',
  red:    'hsla(0,100%,70%,0.15)',
  orange: 'hsla(30,100%,65%,0.15)',
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--x', (e.clientX - rect.left).toFixed(1))
      el.style.setProperty('--y', (e.clientY - rect.top).toFixed(1))
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  const color = spotlightColor[glowColor]

  return (
    <div
      ref={cardRef}
      style={{
        background: `radial-gradient(280px circle at calc(var(--x,-999) * 1px) calc(var(--y,-999) * 1px), ${color}, transparent 70%), rgba(255,255,255,0.025)`,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        position: 'relative',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      className={`
        ${customSize ? '' : 'w-64 h-80 p-4'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
