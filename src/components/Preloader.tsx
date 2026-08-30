'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export function Preloader() {
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const bar = barRef.current
    const pct = pctRef.current
    const line = lineRef.current
    if (!root || !bar || !pct || !line) return

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
      setDone(true)
      return
    }

    tl.to(counter, {
      v: 100,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (bar) bar.style.transform = `scaleX(${counter.v / 100})`
        if (pct) pct.textContent = String(Math.round(counter.v)).padStart(3, '0')
      },
    })
      .to('.pre-label', { opacity: 1, duration: 0.3 }, 0.1)
      .to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 0.6)
      .to(root, { opacity: 0, duration: 0.5, ease: 'expo.inOut' }, '+=0.15')
      .call(() => {
        sessionStorage.setItem('podium-preloaded', '1')
        setDone(true)
      })

    return () => { tl.kill() }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <Image src="/1STPodium.png" alt="" width={140} height={50} unoptimized className="mb-10 opacity-90" />

      <div className="w-64 h-px bg-white/10 overflow-hidden">
        <div ref={barRef} className="h-full bg-white/80 w-full origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span className="pre-label opacity-0 font-mono u-0-55rem track-25 text-white/40 uppercase">
          SISTEMA / INICIALIZANDO
        </span>
        <span ref={pctRef} className="font-mono u-0-6rem text-white/50 tabular-nums">000</span>
      </div>

      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/20 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
