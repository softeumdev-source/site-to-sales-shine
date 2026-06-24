import { cn } from '@/lib/utils'
import React from 'react'

type FeatureItem = {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
}

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureItem
  index?: number
}

export function FeatureCard({ feature, index = 0, className, ...props }: FeatureCardProps) {
  const p = deterministicPattern(feature.title + index)

  return (
    <div className={cn('relative overflow-hidden p-6', className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-white/5 stroke-white/10 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>

      <feature.icon className="text-white/70 size-6" strokeWidth={1} aria-hidden />
      <h3 className="mt-8 text-sm font-semibold text-white md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 text-xs font-light text-white/50 leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<'svg'> & {
  width: number
  height: number
  x: string
  y: string
  squares?: number[][]
}) {
  const patternId = React.useId()

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], i) => (
            <rect
              strokeWidth="0"
              key={i}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}

function deterministicPattern(seed: string, length = 5): number[][] {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i)
    h |= 0
  }
  return Array.from({ length }, (_, i) => [
    (Math.abs(h + i * 17) % 4) + 7,
    (Math.abs(h + i * 11) % 6) + 1,
  ])
}
