'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress
          },
        },
      })

      tl.fromTo(
        '.hero-headline .reveal-line',
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
        0.2
      )
        .fromTo(
          '.hero-subheadline',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          0.6
        )
        .fromTo(
          '.hero-meta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          0.9
        )
        .fromTo(
          '.hero-cta-group',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out' },
          1.1
        )
        .fromTo(
          '.hero-tech-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.5, ease: 'expo.out' },
          0.4
        )

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.hero-3d-object', {
            z: progress * 300,
            rotationY: progress * 0.15,
            rotationX: -progress * 0.05,
            duration: 0.5,
            ease: 'none',
          })
        },
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="hero relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[calc(100vh-8rem)]">
          <div className="relative z-20">
            <RevealText as="h1" id="hero-heading" type="lines" className="hero-headline mb-8" stagger={0.12} duration={1}>
              <span className="text-hero font-bold tracking-tighter text-white">WE ENGINEER</span>
              <span className="text-hero font-bold tracking-tighter text-white">WHAT'S NEXT.</span>
            </RevealText>

            <RevealText as="p" type="lines" className="hero-subheadline text-body-lg text-grey-200 max-w-lg mb-12" stagger={0.1} duration={0.8}>
              <span>Custom software engineered from architecture to deployment.</span>
            </RevealText>

            <div className="hero-meta flex flex-wrap items-center gap-8 text-micro font-medium text-grey-100 uppercase tracking-wider">
              <span>WEB</span>
              <span className="text-white/30 mx-1">/</span>
              <span>MOBILE</span>
              <span className="text-white/30 mx-1">/</span>
              <span>DESKTOP</span>
              <span className="text-white/30 mx-1">/</span>
              <span>BACKEND</span>
              <span className="text-white/30 mx-1">/</span>
              <span>SYSTEMS</span>
            </div>

            <div className="hero-cta-group flex flex-wrap items-center gap-6 mt-12">
              <MagneticButton variant="primary" data-cursor-text="START A PROJECT">
                <Link href="/contact" className="inline-flex">
                  START A PROJECT
                </Link>
              </MagneticButton>
              <MagneticButton variant="secondary" data-cursor-text="EXPLORE WORK">
                <Link href="/work" className="inline-flex">
                  EXPLORE OUR WORK
                </Link>
              </MagneticButton>
            </div>

            <div className="hero-tech-line absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-16" aria-hidden="true" />
          </div>

          <div className="relative hero-3d-object lg:ml-auto" style={{ minHeight: '500px', height: '70vh' }}>
            <SoftwareCoreCanvas section="hero" className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block animate-bounce" style={{ animationDuration: '3s' }} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}