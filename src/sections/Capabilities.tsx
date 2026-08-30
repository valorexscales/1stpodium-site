'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

gsap.registerPlugin(ScrollTrigger)

const layers = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    technologies: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
    color: '#ffffff',
    depth: 0,
  },
  {
    id: 'backend',
    title: 'BACKEND',
    technologies: ['Node.js', 'Java', 'Spring Boot', 'Python', '.NET'],
    color: '#e0e0e0',
    depth: 1,
  },
  {
    id: 'mobile',
    title: 'MOBILE',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    color: '#cccccc',
    depth: 2,
  },
  {
    id: 'desktop',
    title: 'DESKTOP',
    technologies: ['Electron', 'Java', '.NET', 'C++'],
    color: '#b0b0b0',
    depth: 3,
  },
  {
    id: 'data',
    title: 'DATA',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    color: '#909090',
    depth: 4,
  },
  {
    id: 'infrastructure',
    title: 'INFRASTRUCTURE',
    technologies: ['Docker', 'Cloud', 'Linux', 'CI/CD', 'Monitoring'],
    color: '#707070',
    depth: 5,
  },
  {
    id: 'security',
    title: 'SECURITY',
    technologies: ['OAuth 2.0', 'OpenID Connect', 'JWT', 'SSO', 'MFA', 'RBAC'],
    color: '#505050',
    depth: 6,
  },
]

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.capabilities-headline .reveal-line',
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

      layers.forEach((layer, index) => {
        gsap.fromTo(
          `.capability-layer-${layer.id}`,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${80 - index * 5}%`,
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
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
          layers.forEach((layer, index) => {
            const layerEl = document.querySelector(`.capability-layer-${layer.id}`)
            if (layerEl) {
              const z = progress * 200 - index * 30
              gsap.set(layerEl, {
                z,
                transformOrigin: 'center center',
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
      className="capabilities relative min-h-screen flex items-center bg-black border-t border-white/10"
      aria-labelledby="capabilities-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="max-w-3xl mb-20 lg:mb-32">
          <RevealText as="h2" id="capabilities-heading" type="lines" className="capabilities-headline mb-8" stagger={0.12} duration={1}>
            <span className="text-display font-bold tracking-tighter text-white">ONE TEAM.</span>
            <span className="text-display font-bold tracking-tighter text-white">EVERY LAYER.</span>
          </RevealText>

          <RevealText as="p" type="lines" className="text-body-lg text-grey-200 leading-relaxed" stagger={0.1} duration={0.8}>
            <span>Full-stack capability across every layer of modern software architecture. No handoffs. No gaps.</span>
          </RevealText>
        </div>

        <div className="relative perspective-1000" style={{ minHeight: '600px', height: '70vh' }}>
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <SoftwareCoreCanvas section="capabilities" className="w-full h-full" />
          </div>

          <div className="relative z-10 space-y-6">
            {layers.map((layer, index) => (
              <CapabilityLayer
                key={layer.id}
                layer={layer}
                index={index}
                total={layers.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface CapabilityLayerProps {
  layer: typeof layers[0]
  index: number
  total: number
}

function CapabilityLayer({ layer, index, total }: CapabilityLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!layerRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(layerRef.current, {
        transformStyle: 'preserve-3d',
        z: -index * 30,
      })
    }, layerRef.current)

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={layerRef}
      className={`capability-layer-${layer.id} relative transform-style-3d`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      <div className="flex items-center gap-8 p-6 lg:p-8 bg-black border border-white/10 rounded-xl transition-all duration-500 hover:border-white/20 hover:bg-black-100">
        <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
          <span className="text-micro font-bold tracking-wider text-white uppercase">{layer.title}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-title font-bold tracking-tight text-white mb-4">{layer.title}</h3>
          <div className="flex flex-wrap gap-2">
            {layer.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-small font-medium text-grey-100 bg-white/5 border border-white/10 rounded transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
      </div>

      {index < total - 1 && (
        <div className="absolute left-10 lg:left-[90px] top-full bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" aria-hidden="true" />
      )}
    </div>
  )
}