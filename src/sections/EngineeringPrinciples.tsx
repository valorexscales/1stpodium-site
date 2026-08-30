'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  {
    id: 'performance',
    title: 'PERFORMANCE',
    description: 'Fast systems and efficient software architecture. Every millisecond counts.',
    keywords: ['Bundle Optimization', 'Lazy Loading', 'Caching Strategy', 'Core Web Vitals'],
  },
  {
    id: 'security',
    title: 'SECURITY',
    description: 'Security considered from the first architectural decision. Not an afterthought.',
    keywords: ['Threat Modeling', 'OAuth 2.0 / OIDC', 'Encryption', 'Security Audits'],
  },
  {
    id: 'scalability',
    title: 'SCALABILITY',
    description: 'Products designed to evolve with demand. Horizontal scaling built-in.',
    keywords: ['Microservices', 'Stateless Design', 'Database Sharding', 'Load Balancing'],
  },
  {
    id: 'architecture',
    title: 'ARCHITECTURE',
    description: 'Structured systems instead of disposable code. Maintainable by design.',
    keywords: ['Domain-Driven Design', 'Clean Architecture', 'SOLID Principles', 'Modularity'],
  },
  {
    id: 'experience',
    title: 'EXPERIENCE',
    description: 'Interfaces engineered to feel effortless. Complexity hidden, clarity exposed.',
    keywords: ['Design Systems', 'Accessibility', 'Interaction Design', 'Performance UX'],
  },
  {
    id: 'reliability',
    title: 'RELIABILITY',
    description: 'Software built for real-world operation. Observability, resilience, recovery.',
    keywords: ['Observability', 'Circuit Breakers', 'Graceful Degradation', 'Disaster Recovery'],
  },
]

export function EngineeringPrinciples() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredPrinciple, setHoveredPrinciple] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.principles-headline .reveal-line',
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

      principles.forEach((principle, index) => {
        gsap.fromTo(
          `.principle-${principle.id}`,
          { x: index % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: `.principle-${principle.id}`,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.08,
          }
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          principles.forEach((principle, index) => {
            const el = document.querySelector(`.principle-${principle.id}`)
            if (el) {
              const speed = 0.02 + index * 0.005
              gsap.set(el, {
                x: (progress - 0.5) * window.innerWidth * speed * (index % 2 === 0 ? 1 : -1),
              })
            }
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="principles relative bg-black border-t border-white/10"
      aria-labelledby="principles-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <RevealText as="h2" id="principles-heading" type="lines" className="principles-headline mb-16 lg:mb-24 max-w-3xl" stagger={0.12} duration={1}>
          <span className="text-display font-bold tracking-tighter text-white">BUILT</span>
          <span className="text-display font-bold tracking-tighter text-white">DIFFERENTLY.</span>
        </RevealText>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {principles.map((principle) => (
            <PrincipleCard
              key={principle.id}
              principle={principle}
              isHovered={hoveredPrinciple === principle.id}
              onHover={() => setHoveredPrinciple(principle.id)}
              onLeave={() => setHoveredPrinciple(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface PrincipleCardProps {
  principle: typeof principles[0]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function PrincipleCard({ principle, isHovered, onHover, onLeave }: PrincipleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className={`principle-${principle.id} relative group overflow-hidden rounded-xl p-8 lg:p-10 bg-black border border-white/10 transition-all duration-500 ease-out hover:border-white/20 hover:bg-black-100`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor-text={principle.title}
      style={{ willChange: 'transform, border-color, background-color' }}
    >
      <div className="relative z-10">
        <h3 className="text-hero-sm font-bold tracking-tighter text-white mb-6 leading-[0.95]">
          {principle.title}
        </h3>

        <p className="text-body-lg text-grey-200 leading-relaxed mb-8 max-w-xs">
          {principle.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {principle.keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 text-small font-medium text-grey-100 bg-white/5 border border-white/10 rounded transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl opacity-0 transition-all duration-700 ease-out"
          style={{
            opacity: isHovered ? 0.3 : 0,
            transform: isHovered ? 'translate(20%, 20%) scale(1)' : 'translate(0, 0) scale(0.8)',
          }}
        />
      </div>

      <div
        className="absolute -bottom-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 opacity-0 transition-all duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.05 : 0,
          transform: isHovered ? 'translate(0, 0)' : 'translate(20px, 20px)',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
          <circle cx="50" cy="50" r="45" strokeDasharray="280" strokeDashoffset="280" className="principle-ring" />
        </svg>
      </div>
    </div>
  )
}