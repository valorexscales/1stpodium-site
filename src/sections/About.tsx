'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [bgColor, setBgColor] = useState(0)
  const [textColor, setTextColor] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-headline .reveal-line',
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
        '.about-copy',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-copy',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      )

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const eased = gsap.parseEase('power2.inOut')(progress)

          const newBgColor = Math.round(255 * eased)
          const newTextColor = 1 - eased

          document.documentElement.style.setProperty('--about-bg', `rgb(${newBgColor}, ${newBgColor}, ${newBgColor})`)
          document.documentElement.style.setProperty('--about-text', `rgb(${255 * newTextColor}, ${255 * newTextColor}, ${255 * newTextColor})`)

          setBgColor(newBgColor)
          setTextColor(newTextColor)
        },
      })

      gsap.to('.about-3d-object', {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        filter: 'invert(1) hue-rotate(180deg)',
        ease: 'none',
      })
    }, section)

    return () => {
      ctx.revert()
      document.documentElement.style.removeProperty('--about-bg')
      document.documentElement.style.removeProperty('--about-text')
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="about relative min-h-screen flex items-center"
      style={{
        backgroundColor: `rgb(${bgColor}, ${bgColor}, ${bgColor})`,
        color: `rgb(${255 * textColor}, ${255 * textColor}, ${255 * textColor})`,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" style={{ opacity: textColor * 0.02 }} aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="relative" style={{ minHeight: '700px' }}>
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <SoftwareCoreCanvas section="capabilities" className="w-full h-full about-3d-object" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div id="about-heading">
              <RevealText as="h2" type="lines" className="about-headline mb-10" stagger={0.12} duration={1}>
                <span className="text-hero font-bold tracking-tighter">SOFTWARE</span>
                <span className="text-hero font-bold tracking-tighter">SHOULD DO MORE</span>
                <span className="text-hero font-bold tracking-tighter">THAN WORK.</span>
              </RevealText>
            </div>

            <RevealText as="p" type="lines" className="about-copy text-body-lg leading-relaxed" stagger={0.1} duration={0.8}>
              <span className="text-display font-medium tracking-tight">IT SHOULD PERFORM.</span>
            </RevealText>

            <RevealText as="p" type="lines" className="about-copy text-body-lg leading-relaxed mt-10 max-w-3xl" stagger={0.1} duration={0.8}>
              <span>1stPodium combines product thinking, software engineering and modern technology to transform ideas into reliable digital products.</span>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  )
}