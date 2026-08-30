'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

gsap.registerPlugin(ScrollTrigger)

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      tl.fromTo(
        '.intro-label',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
        0
      )
        .fromTo(
          '.intro-headline .reveal-line',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' },
          0.2
        )
        .fromTo(
          '.intro-copy',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          0.6
        )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="intro relative min-h-screen flex items-center bg-black border-t border-white/10"
      aria-labelledby="intro-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative z-20">
            <RevealText as="p" type="lines" className="intro-label text-micro font-medium text-grey-200 uppercase tracking-widest mb-6" stagger={0.1} duration={0.6}>
              <span>01 / 07  WHAT WE DO</span>
            </RevealText>

            <RevealText as="h2" id="intro-heading" type="lines" className="intro-headline mb-10" stagger={0.12} duration={1}>
              <span className="text-display font-bold tracking-tighter text-white">WE DON'T JUST</span>
              <span className="text-display font-bold tracking-tighter text-white">WRITE CODE.</span>
              <span className="text-display font-bold tracking-tighter text-white">WE ENGINEER</span>
              <span className="text-display font-bold tracking-tighter text-white">DIGITAL SYSTEMS.</span>
            </RevealText>

            <RevealText as="p" type="lines" className="intro-copy text-body-lg text-grey-200 max-w-xl leading-relaxed" stagger={0.1} duration={0.8}>
              <span>1stPodium designs, develops and evolves custom digital products across web, mobile, desktop and backend infrastructure.</span>
            </RevealText>
          </div>

          <div className="relative lg:ml-auto" style={{ minHeight: '400px', height: '60vh' }}>
            <SoftwareCoreCanvas section="services" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}