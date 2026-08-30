'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  {
    id: 'discovery',
    index: '01',
    title: 'DISCOVERY',
    description: 'Deep dive into requirements, constraints, and opportunities. We understand before we build.',
  },
  {
    id: 'architecture',
    index: '02',
    title: 'ARCHITECTURE',
    description: 'System design, technology selection, data models, API contracts, and infrastructure planning.',
  },
  {
    id: 'product-design',
    index: '03',
    title: 'PRODUCT DESIGN',
    description: 'UX research, interaction design, design systems, prototyping, and usability validation.',
  },
  {
    id: 'engineering',
    index: '04',
    title: 'ENGINEERING',
    description: 'Clean code, modular architecture, automated testing, code reviews, and continuous integration.',
  },
  {
    id: 'quality',
    index: '05',
    title: 'QUALITY',
    description: 'E2E testing, performance profiling, security auditing, accessibility compliance, load testing.',
  },
  {
    id: 'deployment',
    index: '06',
    title: 'DEPLOYMENT',
    description: 'Production rollout, monitoring setup, CI/CD pipelines, disaster recovery, and runbooks.',
  },
  {
    id: 'evolution',
    index: '07',
    title: 'EVOLUTION',
    description: 'Ongoing maintenance, feature development, scaling, modernization, and technical debt management.',
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const stageRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-headline .reveal-line',
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

      const path = pathRef.current
      if (path) {
        const pathLength = path.getTotalLength()
        gsap.fromTo(
          path,
          { strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        )
      }

      stages.forEach((stage, index) => {
        const stageEl = stageRefs.current.get(stage.id)
        if (!stageEl) return

        gsap.fromTo(
          stageEl,
          { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: stageEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        ScrollTrigger.create({
          trigger: stageEl,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => stageEl.classList.add('active'),
          onLeave: () => stageEl.classList.remove('active'),
          onEnterBack: () => stageEl.classList.add('active'),
          onLeaveBack: () => stageEl.classList.remove('active'),
        })
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          stages.forEach((stage, index) => {
            const meshName = `layer-${index}`
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const pathData = 'M 100 100 Q 250 100 400 100 Q 550 100 700 100 Q 850 100 1000 100 Q 1150 100 1300 100 Q 1450 100 1600 100 Q 1750 100 1900 100'

  return (
    <section
      ref={sectionRef}
      className="process relative min-h-screen flex items-center bg-black border-t border-white/10 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <RevealText as="h2" id="process-heading" type="lines" className="process-headline mb-16 lg:mb-24 max-w-2xl" stagger={0.12} duration={1}>
          <span className="text-display font-bold tracking-tighter text-white">FROM IDEA</span>
          <span className="text-display font-bold tracking-tighter text-white">TO PRODUCTION.</span>
        </RevealText>

        <div className="relative" style={{ minHeight: '700px' }}>
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <SoftwareCoreCanvas section="process" className="w-full h-full" />
          </div>

          <div className="relative z-10">
            <svg className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" viewBox="0 0 2 800" preserveAspectRatio="none" aria-hidden="true">
              <path
                ref={pathRef}
                d="M 1 0 L 1 800"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="8 12"
                strokeLinecap="round"
                opacity="0.2"
              />
              <path
                ref={pathRef}
                d="M 1 0 L 1 800"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="800 800"
                strokeDashoffset="800"
                strokeLinecap="round"
                className="process-path"
              />
              {stages.map((stage, index) => (
                <circle
                  key={stage.id}
                  cx="1"
                  cy={100 + index * 100}
                  r="6"
                  fill="white"
                  className="stage-marker"
                  style={{ opacity: 0.3, transition: 'opacity 0.5s ease-out' }}
                />
              ))}
            </svg>

            <div className="pl-20 lg:pl-32 space-y-20">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  ref={(el) => {
                    if (el) stageRefs.current.set(stage.id, el)
                  }}
                  className="process-stage relative group"
                  style={{ minHeight: '120px' }}
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/20 flex items-center justify-center bg-black transition-all duration-500 group-hover:border-white group-active:border-white">
                    <span className="text-micro font-mono font-bold text-white/50 group-hover:text-white group-active:text-black transition-colors">
                      {stage.index}
                    </span>
                  </div>

                  <div className="ml-16 lg:ml-20">
                    <h3 className="text-title font-bold tracking-tight text-white mb-3 transition-colors group-hover:text-white group-active:text-white">
                      {stage.title}
                    </h3>
                    <p className="text-body text-grey-100 max-w-xl leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-4 h-4 rounded-full bg-white/10 transition-all duration-500 group-active:bg-white group-active:scale-150" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}