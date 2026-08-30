'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function NotFound() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.not-found-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="not-found-content min-h-screen flex items-center justify-center bg-black relative">
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 text-center">
        <div className="mb-8">
          <span className="text-micro font-mono text-grey-100 uppercase tracking-widest">404</span>
        </div>

        <h1 className="text-hero font-bold tracking-tighter text-white mb-6">
          ROUTE NOT FOUND.
        </h1>

        <p className="text-body-lg text-grey-200 max-w-lg mx-auto mb-12 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <MagneticButton variant="primary" data-cursor-text="RETURN HOME">
          <Link href="/" className="inline-flex">
            RETURN HOME
          </Link>
        </MagneticButton>
      </div>
    </div>
  )
}