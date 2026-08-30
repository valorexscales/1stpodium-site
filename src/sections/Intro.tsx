'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function Intro() {
  const root = useRef<HTMLElement>(null)
  const lineRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current,
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        el.querySelectorAll('.intro-fade'),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const lines = [
    { text: 'WE DON’T JUST', outline: false },
    { text: 'WRITE CODE.', outline: true },
    { text: 'WE ENGINEER', outline: false },
    { text: 'DIGITAL SYSTEMS.', outline: false },
  ]
  const isOutline = (i: number) => i === 1

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="What we do">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="label intro-fade mb-10" data-index="01 / 07" style={{ opacity: 0 }}>
            WHAT WE DO
          </p>

          <h2 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(42px,5.5vw,88px)', lineHeight: 0.98 }}>
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden py-track">
                <span
                  ref={(el) => { if (el) lineRefs.current[i] = el }}
                  className={`block will-change-transform ${isOutline(i) ? 'text-stroke' : ''}`}
                >
                  {l.text}
                </span>
              </span>
            ))}
          </h2>

          <p className="intro-fade mt-8 max-w-md text-white/60 text-body-lg" style={{ opacity: 0 }}>
            1stPodium designs, develops and evolves custom digital products across web, mobile, desktop and
            backend infrastructure.
          </p>
        </div>

        <div className="relative w-full h-60vh minh-420 lg-h-70vh">
          <SoftwareCoreCanvas className="absolute inset-0" section="services" />
        </div>
      </div>
    </section>
  )
}