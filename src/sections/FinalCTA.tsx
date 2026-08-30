'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function FinalCTA() {
  const root = useRef<HTMLElement>(null)
  const lineRefs = useRef<HTMLSpanElement[]>([])
  const coreWrap = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('.cta-fade'), { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
      })
      gsap.fromTo(lineRefs.current, { yPercent: 110 }, {
        yPercent: 0, stagger: 0.1, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
      })
      gsap.fromTo(coreWrap.current, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 65%', toggleActions: 'play none none reverse' },
      })
      gsap.fromTo(logoRef.current, { opacity: 0, scale: 0.85 }, {
        opacity: 0.7, scale: 1, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: logoRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const lines = ["LET'S BUILD", 'WHAT’S NEXT.']

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Start a project">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label cta-fade mb-8" data-index="09 / START" style={{ opacity: 0 }}>
          HAVE A PROJECT?
        </p>

        <h2 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(64px,9vw,140px)', lineHeight: 0.94 }}>
          {lines.map((l, i) => (
            <span key={i} className="block overflow-hidden py-track">
              <span ref={(e) => { if (e) lineRefs.current[i] = e }} className="block will-change-transform">
                {l}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-10 flex flex-wrap gap-4 cta-fade" style={{ opacity: 0 }}>
          <Link href="/contact" className="btn-primary" data-cursor-text="START A PROJECT">
            START A PROJECT
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/contact" className="btn-secondary" data-cursor-text="CONTACT US">
            CONTACT US
          </Link>
        </div>

        {/* core slowly reconstructs behind — then fades; official mark remains */}
        <div className="relative mt-16 h-40vh minh-300" aria-hidden="true">
          <div ref={coreWrap} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-full maxw-38vw" style={{ opacity: 0 }}>
            <SoftwareCoreCanvas className="absolute inset-0" section="cta" />
          </div>
        </div>

        <div ref={logoRef} className="flex justify-center pt-8" style={{ opacity: 0 }}>
          <Image
            src="/1STPodium.png"
            alt="1stPodium"
            width={210}
            height={76}
            className="w-auto h-auto max-h-12 object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}