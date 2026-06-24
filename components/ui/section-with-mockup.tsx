'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface SectionWithMockupProps {
  title: string | React.ReactNode
  description: string | React.ReactNode
  children: React.ReactNode
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function SectionWithMockup({
  title,
  description,
  children,
}: SectionWithMockupProps) {
  return (
    <section className="relative py-20 md:py-24 bg-black overflow-hidden">
      <div className="max-w-6xl w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Text */}
          <motion.div
            className="flex flex-col items-start gap-5 max-w-[540px]"
            variants={itemVariants}
          >
            <h2 className="text-white text-3xl md:text-[38px] font-semibold leading-tight">
              {title}
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-7">
              {description}
            </p>
          </motion.div>

          {/* Mockup slot */}
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
