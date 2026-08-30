'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface RevealTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
}

/**
 * Simple mask reveal — wraps each child in an overflow-hidden line.
 * Preserves text (spacing intact); no word splitting.
 */
export function RevealText({ children, as = 'p', className = '' }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.rl-inner'),
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const Tag = as as 'div'

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className}>
      <span className="block overflow-hidden">
        <span className="rl-inner block will-change-transform">{children}</span>
      </span>
    </Tag>
  )
}