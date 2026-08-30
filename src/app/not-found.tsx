'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function NotFound() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.nf-elt'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'expo.out' }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 text-center">
        <p className="nf-elt font-mono u-0-7rem track-3 text-white/30" style={{ opacity: 0 }}>404</p>
        <h1 className="nf-elt text-white font-bold tracking-tighter mt-6" style={{ fontSize: 'clamp(44px,7vw,110px)', lineHeight: 1.02, opacity: 0 }}>
          ROUTE NOT FOUND.
        </h1>
        <p className="nf-elt mt-6 text-white/55 text-body-lg" style={{ opacity: 0 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="nf-elt mt-10" style={{ opacity: 0 }}>
          <MagneticButton variant="primary" href="/" data-cursor-text="RETURN HOME">
            RETURN HOME
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}