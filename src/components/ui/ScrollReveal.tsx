'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface ScrollRevealProps {
  children: ReactNode
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'clip-reveal'
  delay?: number
  duration?: number
  className?: string
  trigger?: string
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  trigger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const from: gsap.TweenVars = { opacity: 0 }
    const to: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: trigger ? el.closest(trigger) || el : el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }

    switch (variant) {
      case 'fade-up':
        from.y = 30
        to.y = 0
        break
      case 'fade-in':
        break
      case 'slide-left':
        from.x = 40
        to.x = 0
        break
      case 'slide-right':
        from.x = -40
        to.x = 0
        break
      case 'scale-in':
        from.scale = 0.92
        to.scale = 1
        break
      case 'clip-reveal':
        from.clipPath = 'inset(100% 0 0 0)'
        to.clipPath = 'inset(0% 0 0 0)'
        to.duration = duration * 1.3
        break
    }

    const tween = gsap.fromTo(el, from, to)
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [variant, delay, duration, trigger])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
