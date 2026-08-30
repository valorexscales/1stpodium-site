'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLogo, setShowLogo] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sessionLoaded = sessionStorage.getItem('1stpodium-loaded')
    if (sessionLoaded) {
      setIsLoading(false)
      setIsComplete(true)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReducedMotion ? 300 : 1800

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true)
        sessionStorage.setItem('1stpodium-loaded', 'true')
        setTimeout(() => setIsLoading(false), 500)
      },
    })

    tl.to({}, { duration: 0.1 })
      .call(() => setShowLogo(true))
      .to(
        { val: 0 },
        {
          val: 100,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: function () {
            setProgress(Math.round(this.targets()[0].val))
          },
        }
      )
      .to({}, { duration: 0.3 })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'expo.inOut',
      }, '-=0.2')

    return () => {
      tl.kill()
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center pointer-events-none"
      role="status"
      aria-label="Loading"
      style={{ willChange: 'opacity' }}
    >
      <div className="mb-8 opacity-0" style={{ opacity: showLogo ? 1 : 0 }}>
        <Image
          src="/1STPodium.png"
          alt="1stPodium"
          width={180}
          height={180}
          className="grayscale"
          priority
          unoptimized
        />
      </div>

      <div className="text-micro font-medium text-grey-200 uppercase tracking-widest mb-6">
        SYSTEM INITIALIZING
      </div>

      <div className="relative w-[300px] max-w-[80vw]">
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full origin-left"
            style={{
              transform: `scaleX(${progress / 100})`,
              transformOrigin: 'left center',
              willChange: 'transform',
            }}
          />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-micro font-mono text-grey-100">
          {progress}%
        </div>
      </div>
    </div>
  )
}