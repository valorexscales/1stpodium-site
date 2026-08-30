'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const overlay = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = overlay.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el, { scaleY: 1, transformOrigin: 'bottom center' })
      gsap.to(el, { scaleY: 0, transformOrigin: 'top center', duration: 0.6, ease: 'expo.inOut' })
    })
    return () => ctx.revert()
  }, [pathname])

  return (
    <>
      <div ref={overlay} className="fixed inset-0 z-9800 bg-black pointer-events-none" style={{ transformOrigin: 'bottom center' }} aria-hidden="true" />
      {children}
    </>
  )
}