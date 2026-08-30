'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const layers = [
  { id: 'frontend', title: 'FRONTEND', tech: 'React · Next.js · TypeScript · JavaScript', icon: '</>' },
  { id: 'backend', title: 'BACKEND', tech: 'Node.js · Java · Spring Boot · Python · .NET', icon: '{ }' },
  { id: 'mobile', title: 'MOBILE', tech: 'React Native · Flutter · Swift · Kotlin', icon: '📱' },
  { id: 'desktop', title: 'DESKTOP', tech: 'Electron · Java · .NET · C++', icon: '🖥' },
  { id: 'data', title: 'DADOS', tech: 'PostgreSQL · MySQL · MongoDB · Redis', icon: '◆' },
  { id: 'infrastructure', title: 'INFRAESTRUTURA', tech: 'Docker · Cloud · Linux · CI/CD', icon: '⬡' },
  { id: 'security', title: 'SEGURANÇA', tech: 'OAuth · JWT · SSO · MFA · RBAC', icon: '◇' },
]

export function Capabilities() {
  const root = useRef<HTMLElement>(null)
  const lineRefs = useRef<HTMLSpanElement[]>([])
  const layerRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo(
        layerRefs.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.cap-layers', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section section-darker overflow-hidden" aria-label="Tecnologias">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label mb-10" data-index="04 / TECNOLOGIA">TODA CAMADA</p>

        <h2 className="text-white font-bold tracking-tighter mb-4" style={{ fontSize: 'clamp(40px,5vw,80px)', lineHeight: 0.98 }}>
          <span className="block overflow-hidden"><span ref={(el) => { if (el) lineRefs.current[0] = el }} className="block">TECNOLOGIA</span></span>
          <span className="block overflow-hidden"><span ref={(el) => { if (el) lineRefs.current[1] = el }} className="block text-stroke">É FERRAMENTA.</span></span>
        </h2>
        <p className="text-white/40 text-body-lg mb-16 max-w-lg">
          Resultado é o objetivo. Escolhemos a tecnologia certa para cada problema.
        </p>

        <ul className="cap-layers grid sm:grid-cols-2 gap-3">
          {layers.map((l, i) => (
            <li
              key={l.id}
              ref={(el) => { layerRefs.current[i] = el }}
              className="group flex flex-col gap-2 px-5 py-5 border hairline bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 rounded"
              data-cursor-text={l.title}
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-white/20 font-mono text-xs">{l.icon}</span>
                <span className="font-medium tracking-tight text-white/90" style={{ fontSize: 'clamp(18px,1.8vw,26px)' }}>
                  {l.title}
                </span>
              </div>
              <span className="u-0-7rem text-white/35 track-12 uppercase pl-7">{l.tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
