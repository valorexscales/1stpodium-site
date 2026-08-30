'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'default' | 'active' | 'view'>('default')
  const [label, setLabel] = useState('VIEW')

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    const labelEl = labelRef.current
    if (!cursor || !ring || !labelEl) return

    gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 0 })

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })

    let visible = false

    const onMove = (e: MouseEvent) => {
      if (!visible) return
      moveX(e.clientX)
      moveY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor-text]') as HTMLElement | null
      if (target) {
        const text = target.getAttribute('data-cursor-text') || 'VIEW'
        setLabel(text)
        setMode('view')
        gsap.to(ring, { scale: 2.6, opacity: 1, duration: 0.35, ease: 'expo.out' })
      } else {
        setMode('default')
        gsap.to(ring, { scale: 0, opacity: 0, duration: 0.35, ease: 'expo.out' })
      }
    }

    const onEnter = () => {
      visible = true
      gsap.to(cursor, { opacity: 1, duration: 0.3 })
    }
    const onLeave = () => {
      visible = false
      gsap.to(cursor, { opacity: 0, duration: 0.3 })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(cursor)
      gsap.killTweensOf(ring)
    }
  }, [])

  return (
    <div className="hidden lg:block" aria-hidden="true">
      {/* small white point */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-9900 w-2 h-2 rounded-full bg-white opacity-0"
        style={{ mixBlendMode: mode === 'view' ? 'normal' : 'difference' }}
      />
      {/* expandable ring for interactive elements */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-9899 w-14 h-14 rounded-full border border-white/40 flex items-center justify-center opacity-0"
      >
        <span ref={labelRef} className="u-0-55rem track-18 uppercase text-white/90 font-medium">
          {label}
        </span>
      </div>
    </div>
  )
}