'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const headLines = useRef<HTMLSpanElement[]>([])
  const coreWrap = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35, defaults: { ease: 'expo.out' } })
      tl.fromTo(el.querySelector('.hero-eyebrow'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.15)
      headLines.current.forEach((span, i) => {
        tl.fromTo(span, { yPercent: 110 }, { yPercent: 0, duration: 1.05 }, 0.25 + i * 0.09)
      })
      tl.fromTo(el.querySelector('.hero-copy'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.75)
      tl.fromTo(el.querySelector('.hero-meta'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.92)
      tl.fromTo(el.querySelector('.hero-ctas'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.05)
      tl.fromTo(coreWrap.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.4 }, 0.45)

      /* scroll parallax — content drifts up, 3D fades */
      if (copyRef.current) {
        gsap.to(copyRef.current, {
          y: -80,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
      gsap.to(coreWrap.current, {
        y: -40,
        scale: 0.92,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const lines = ['WE ENGINEER', "WHAT'S NEXT."]

  return (
    <section
      ref={root}
      className="relative min-h-svh flex items-center overflow-hidden bg-black"
      style={{ paddingTop: 96 }}
      aria-label="1stPodium — we engineer what’s next"
    >
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 grid-hero">
        {/* LEFT / copy */}
        <div ref={copyRef}>
          <p className="hero-eyebrow eyebrow opacity-0 mb-8" style={{ opacity: 0 }}>
            1STPODIUM / SOFTWARE ENGINEERING
          </p>

          <h1 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(64px,8vw,128px)', lineHeight: 0.92 }}>
            <span className="block overflow-hidden">
              <span ref={(el) => { if (el) headLines.current[0] = el }} className="block will-change-transform">
                {lines[0]}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={(el) => { if (el) headLines.current[1] = el }} className="block will-change-transform">
                {lines[1]}
              </span>
            </span>
          </h1>

          <p className="hero-copy mt-8 max-w-md text-white/65 text-body-lg" style={{ opacity: 0 }}>
            Custom software engineered from architecture to deployment.
          </p>

          <p className="hero-meta mt-6 text-micro text-white/40 uppercase track-2" style={{ opacity: 0 }}>
            Web &nbsp;/&nbsp; Mobile &nbsp;/&nbsp; Desktop &nbsp;/&nbsp; Backend &nbsp;/&nbsp; Systems
          </p>

          <div className="hero-ctas mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn-primary" data-cursor-text="START A PROJECT">
              START A PROJECT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/services" className="btn-secondary" data-cursor-text="EXPLORE SERVICES">
              EXPLORE SERVICES
            </Link>
          </div>
        </div>

        {/* RIGHT / 3D — confined canvas, ~46vw on desktop */}
        <div
          ref={coreWrap}
          className="core-box relative"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <SoftwareCoreCanvas className="absolute inset-0" section="hero" />
        </div>
      </div>
    </section>
  )
}