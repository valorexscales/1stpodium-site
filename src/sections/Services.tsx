'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const services = [
  { id: 'web-applications', index: '01', title: 'WEB APPLICATIONS', tech: 'React · Next.js · TypeScript' },
  { id: 'mobile-applications', index: '02', title: 'MOBILE APPLICATIONS', tech: 'React Native · Flutter · Swift' },
  { id: 'desktop-software', index: '03', title: 'DESKTOP SOFTWARE', tech: 'Electron · Tauri · .NET' },
  { id: 'backend-api', index: '04', title: 'BACKEND & APIs', tech: 'Node.js · Java · Go · Python' },
  { id: 'authentication', index: '05', title: 'AUTHENTICATION & IDENTITY', tech: 'OAuth 2.0 · OIDC · JWT · MFA' },
  { id: 'saas-products', index: '06', title: 'SAAS PRODUCTS', tech: 'Multi-tenant · Billing · Admin' },
  { id: 'automation-integrations', index: '07', title: 'AUTOMATION & INTEGRATIONS', tech: 'Webhooks · Pipelines · API' },
  { id: 'custom-software', index: '08', title: 'CUSTOM SOFTWARE', tech: 'Any stack · Architecture first' },
]

export function Services() {
  const root = useRef<HTMLElement>(null)
  const rows = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.svc-head'),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        rows.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 64%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Services">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-14">
          <p className="label svc-head" data-index="02 / SERVICES" style={{ opacity: 0 }}>WHAT WE BUILD</p>
          <p className="svc-head hidden lg:block text-right u-0-8rem text-white/35" style={{ opacity: 0 }}>
            From first architecture to production — one engineering partner across every layer.
          </p>
        </div>

        <h2 className="svc-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(42px,5vw,80px)', lineHeight: 1.02, opacity: 0 }}>
          WHAT WE BUILD.
        </h2>

        <ul className="divide-y divide-hairline">
          {services.map((s, i) => (
            <li key={s.id} ref={(el) => { rows.current[i] = el }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-baseline gap-5 lg:gap-8 py-6 lg:py-7"
                data-cursor-text={s.title}
                style={{ opacity: 0 }}
              >
                <span className="shrink-0 font-mono u-0-7rem text-white/30 tracking-widest w-7">{s.index}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out font-medium tracking-tight text-white/90"
                  style={{ fontSize: 'clamp(30px, 3.4vw, 54px)', lineHeight: 1.06, flex: 1, minWidth: 0 }}>
                  {s.title}
                </span>
                <span className="hidden md:block shrink-0 u-0-7rem text-white/35 track-14 uppercase">{s.tech}</span>
                <span className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}