'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Six layers — one team, every layer. Text + labels approach, dark mode.
const layers = [
  { id: 'frontend', title: 'FRONTEND', tech: 'React · Next.js · TypeScript · JavaScript' },
  { id: 'backend', title: 'BACKEND', tech: 'Node.js · Java · Spring Boot · Python · .NET' },
  { id: 'mobile', title: 'MOBILE', tech: 'React Native · Flutter · Swift · Kotlin' },
  { id: 'desktop', title: 'DESKTOP', tech: 'Electron · Java · .NET · C++' },
  { id: 'data', title: 'DATA', tech: 'PostgreSQL · MySQL · MongoDB · Redis' },
  { id: 'infrastructure', title: 'INFRASTRUCTURE', tech: 'Docker · Cloud · Linux · CI/CD · Monitoring' },
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
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.cap-layers', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Capabilities">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label mb-10" data-index="03 / CAPABILITIES">ONE TEAM</p>

        <h2 className="text-white font-bold tracking-tighter mb-10" style={{ fontSize: 'clamp(42px,5.5vw,88px)', lineHeight: 0.98 }}>
          <span className="block overflow-hidden"><span ref={(el) => { if (el) lineRefs.current[0] = el }} className="block">ONE TEAM.</span></span>
          <span className="block overflow-hidden"><span ref={(el) => { if (el) lineRefs.current[1] = el }} className="block">EVERY LAYER.</span></span>
        </h2>

        <p className="max-w-md text-white/55 text-body-lg mb-16">
          Full-stack capability across every layer of modern software architecture. No handoffs. No gaps.
        </p>

        <ul className="cap-layers space-y-3">
          {layers.map((l, i) => (
            <li
              key={l.id}
              ref={(el) => { layerRefs.current[i] = el }}
              className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 px-5 sm:px-7 py-5 border hairline bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors duration-500 rounded"
              data-cursor-text={l.title}
              style={{ opacity: 0 }}
            >
              <span className="font-medium tracking-tight text-white/90" style={{ fontSize: 'clamp(20px,2vw,30px)' }}>
                {l.title}
              </span>
              <span className="sm:ml-auto sm:max-w-xs text-right md:block u-0-7rem text-white/35 track-12 uppercase">
                {l.tech}
              </span>
            </li>
          ))}
        </ul>

        {/* Security as distinct engineering note (no giant white card) */}
        <div className="mt-14 flex flex-col md:flex-row md:items-center gap-3 md:gap-10 border-t hairline pt-10">
          <span className="label" data-index="01">SECURITY</span>
          <p className="text-white/45 text-body">
            OAuth 2.0 · OpenID Connect · JWT · SSO · MFA · RBAC — identity built in, not bolted on.
          </p>
        </div>
      </div>
    </section>
  )
}