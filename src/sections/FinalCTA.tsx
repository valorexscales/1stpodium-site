'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/MagneticButton'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-headline .reveal-line',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cta-copy',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.cta-copy',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      )

      gsap.fromTo(
        '.cta-buttons',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.cta-buttons',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.5,
        }
      )

      gsap.fromTo(
        '.cta-logo',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.cta-logo',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: 1,
        }
      )

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          // The 3D object converges as we approach the CTA
          gsap.to('.cta-3d-object', {
            scale: 1 - progress * 0.5,
            opacity: 1 - progress,
            duration: 0.5,
            ease: 'none',
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="cta relative min-h-screen flex items-center justify-center bg-black border-t border-white/10"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32 text-center">
        <div className="relative max-w-4xl mx-auto" style={{ minHeight: '600px' }}>
          <div className="absolute inset-0 cta-3d-object" style={{ zIndex: 1 }}>
            <SoftwareCoreCanvas section="cta" className="w-full h-full" />
          </div>

          <div className="relative z-20">
            <RevealText as="h2" id="cta-heading" type="lines" className="cta-headline mb-8" stagger={0.12} duration={1}>
              <span className="text-hero font-bold tracking-tighter text-white">HAVE AN</span>
              <span className="text-hero font-bold tracking-tighter text-white">IDEA?</span>
            </RevealText>

            <RevealText as="p" type="lines" className="cta-copy text-body-lg text-grey-200 leading-relaxed mb-16" stagger={0.1} duration={0.8}>
              <span className="text-title font-medium tracking-tight">LET'S BUILD IT.</span>
            </RevealText>

            <RevealText as="p" type="lines" className="cta-copy text-small text-grey-100 uppercase tracking-wider mb-16" stagger={0.1} duration={0.8}>
              <span>FROM FIRST ARCHITECTURE</span>
              <span>TO PRODUCTION.</span>
            </RevealText>

            <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
              <MagneticButton variant="primary" data-cursor-text="START A PROJECT">
                <Link href="/contact" className="inline-flex">
                  START A PROJECT
                </Link>
              </MagneticButton>
              <MagneticButton variant="secondary" data-cursor-text="CONTACT US">
                <Link href="/contact" className="inline-flex">
                  CONTACT US
                </Link>
              </MagneticButton>
            </div>

            <div className="cta-logo mt-24 relative">
              <Image
                src="/1STPodium.png"
                alt="1stPodium"
                width={200}
                height={200}
                className="mx-auto grayscale opacity-80 hover:opacity-100 transition-opacity duration-500"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}