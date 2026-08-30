'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const stages = [
  { index: '01', title: 'DISCOVERY', desc: 'Deep dive into requirements, constraints and opportunities.' },
  { index: '02', title: 'ARCHITECTURE', desc: 'System design, technology selection and data models.' },
  { index: '03', title: 'PRODUCT DESIGN', desc: 'UX research, prototypes and design systems.' },
  { index: '04', title: 'ENGINEERING', desc: 'Clean code, reviews, automated testing, CI/CD.' },
  { index: '05', title: 'QUALITY', desc: 'E2E tests, performance profiling, security auditing.' },
  { index: '06', title: 'DEPLOYMENT', desc: 'Production rollout, monitoring and runbooks.' },
  { index: '07', title: 'EVOLUTION', desc: 'Maintenance, scaling and modernization.' },
]

export function Process() {
  const root = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLElement | null)[]>([])
  const active = useRef(0)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const onUpdate = (i: number) => {
      const idx = Math.min(i, stages.length - 1)
      if (idx === active.current) return
      active.current = idx
      items.current.forEach((item, k) => {
        if (!item) return
        const activeStage = k <= idx
        item.style.opacity = activeStage ? '1' : '0.38'
        item.style.transform = activeStage ? 'translateX(0)' : 'translateX(-6px)'
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      })
    }

    active.current = -1
    onUpdate(0)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.process-head'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } }
      )
    }, el)

    // daytime minimal scroll-driven activation without breaking rows readability
    const st = gsap.to(fillRef.current, {
      scaleY: 1,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 55%',
        end: 'bottom 80%',
        scrub: 0.6,
        onUpdate: (self) => onUpdate(Math.floor(self.progress * stages.length)),
      },
    })

    return () => {
      ctx.revert()
      st.scrollTrigger?.kill()
      st.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Process">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label process-head mb-10" data-index="04 / PROCESS">HOW WE DELIVER</p>

        <h2 className="process-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(42px,5vw,80px)', lineHeight: 1.02, opacity: 0 }}>
          FROM IDEA
          <br />
          TO PRODUCTION.
        </h2>

        <div className="relative">
          {/* vertical progress rail — thin grey lines, white active fill */}
          <div ref={trackRef} className="absolute left-7 top-1 bottom-1 w-px bg-white/10" aria-hidden="true" />
          <div ref={fillRef} className="absolute left-7 top-1 bottom-1 w-px bg-white origin-top" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />

          <ol className="space-y-12 pl-9">
            {stages.map((s, i) => (
              <li
                key={s.index}
                ref={(el) => { items.current[i] = el }}
                className={`stage-item relative transition-colors duration-500 ${i === 0 ? 'stage-active' : ''}`}
              >
                <span
                  className="absolute left-neg35 top-1.5 w-15 rounded-full border transition-all duration-500"
                  style={{ borderColor: 'rgba(255,255,255,0.22)', background: '#000' }}
                  aria-hidden="true"
                />
                <p className="font-mono u-0-7rem track-2 text-white/35 mb-2">{s.index}</p>
                <h3 className="text-white font-medium tracking-tight transition-opacity duration-500" style={{ fontSize: 'clamp(24px,2.6vw,40px)', opacity: 1 }}>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-white/45 text-body transition-opacity duration-500">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}