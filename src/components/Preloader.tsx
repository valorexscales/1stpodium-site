'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export function Preloader() {
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const bar = barRef.current
    const pct = pctRef.current
    if (!root || !bar || !pct) return

    // Skip / shorten if already visited this session
    if (sessionStorage.getItem('podium-preloaded')) {
      setDone(true)
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('podium-preloaded', '1')
        setDone(true)
      },
    })

    const counter = { v: 0 }
    if (reduced) {
      counter.v = 100
      if (pct) pct.textContent = '100'
      if (bar) bar.style.transform = 'scaleX(1)'
      tl.to(root, { opacity: 0, duration: 0.2 }).call(() => setDone(true))
      return
    }

    tl.to(counter, {
      v: 100,
      duration: 1.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (bar) bar.style.transform = `scaleX(${counter.v / 100})`
        if (pct) pct.textContent = String(Math.round(counter.v))
      },
    })
      .to('.pre-word', { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'expo.out' }, 0.15)
      .to('.pre-code', { opacity: 1, duration: 0.4 }, 0.4)
      .to(root, { opacity: 0, duration: 0.7, ease: 'expo.inOut' }, '+=0.25')
      .call(() => {
        sessionStorage.setItem('podium-preloaded', '1')
        setDone(true)
      })

    return () => {
      tl.kill()
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex items-baseline overflow-hidden">
        <span className="pre-word inline-block translate-y-full opacity-0 font-bold tracking-tighter text-2xl text-white/95">
          1STPODIUM
        </span>
      </div>
      <div className="mt-8 w-56 h-px bg-white/15 overflow-hidden">
        <div ref={barRef} className="h-full bg-white w-full origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="pre-code opacity-0 u-0-55rem track-25 text-white/40 uppercase font-mono">
          SYSTEM INITIALIZING
        </span>
        <span ref={pctRef} className="u-0-6rem text-white/50 font-mono">0</span>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
        <Image src="/1STPodium.png" alt="" width={90} height={32} unoptimized className="opacity-40" />
      </div>
    </div>
  )
}