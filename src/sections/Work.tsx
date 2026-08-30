'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

interface Project {
  number: string
  title: string
  tag: string
  desc: string
}

const projects: Project[] = [
  { number: '001', title: 'PRIVATE PROJECT', tag: 'PRIVATE', desc: 'Custom software for an internal engagement. Case study restricted per NDA.' },
  { number: '002', title: 'IN DEVELOPMENT', tag: 'IN DEVELOPMENT', desc: 'Digital product currently being engineered. Details coming soon.' },
  { number: '003', title: 'CONFIDENTIAL', tag: 'CONFIDENTIAL', desc: 'Engineering project under a confidential engagement. Case study unavailable.' },
]

export function Work() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.work-head'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo(
        el.querySelectorAll('.work-item'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 68%', toggleActions: 'play none none reverse' } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Selected work">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-14">
          <p className="label work-head" data-index="07 / WORK" style={{ opacity: 0 }}>SELECTED WORK</p>
          <p className="work-head hidden lg:block text-right u-0-8rem text-white/35" style={{ opacity: 0 }}>
            Case studies are confidential. Detailed architecture reviews available under NDA.
          </p>
        </div>

        <h2 className="work-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(42px,5vw,80px)', lineHeight: 1.02, opacity: 0 }}>
          SELECTED WORK
        </h2>

        <ul className="divide-y divide-hairline">
          {projects.map((p) => (
            <li key={p.number} className="work-item" style={{ opacity: 0 }}>
              <Link
                href="/contact"
                className="group relative flex items-center gap-5 lg:gap-8 py-7 lg:py-8 overflow-hidden"
                data-cursor-text="VIEW CASE"
              >
                <span className="shrink-0 font-mono u-0-7rem text-white/30 tracking-widest w-10">
                  PROJECT / {p.number}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-medium tracking-tight text-white/90 transition-transform duration-500 group-hover:translate-x-3"
                    style={{ fontSize: 'clamp(26px,3vw,48px)', lineHeight: 1.1 }}>
                    {p.title}
                  </span>
                  <span className="mt-2 block u-0-8rem text-white/40 transition-opacity duration-300 group-hover:opacity-70">
                    {p.desc}
                  </span>
                </span>
                <span className="shrink-0 hidden md:inline-flex u-0-65rem track-2 text-white/35 uppercase border border-white/20 py-1.5 px-4 rounded-full">
                  {p.tag}
                </span>
                <span className="shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-xl text-white/40 text-body">
          Some of our projects are private. Public case studies are coming soon — until then, we're happy to walk
          through approach and architecture directly.
        </p>
      </div>
    </section>
  )
}