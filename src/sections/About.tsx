'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function About() {
  const root = useRef<HTMLElement>(null)
  const [t, setT] = useState(0) // 0 dark → 1 light

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('.ab-head'), { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
      })

      /* parallax on the 3D canvas */
      const canvas = el.querySelector('.ab-canvas-wrap')
      if (canvas) {
        gsap.fromTo(canvas, { y: 40 }, {
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      }
    }, el)

    const st = gsap.to({}, {
      scrollTrigger: {
        trigger: el,
        start: 'top 50%',
        end: 'top top',
        scrub: 0.6,
        onUpdate: (self) => setT(self.progress),
      },
    })

    return () => {
      ctx.revert()
      st.scrollTrigger?.kill()
      st.kill()
    }
  }, [])

  const bg = `rgb(${Math.round(0 + t * 242)}, ${Math.round(0 + t * 242)}, ${Math.round(0 + t * 242)})` // → #F2F2F0
  const ink = t > 0.55 ? '#080808' : '#fff'
  const muted = t > 0.55 ? 'rgba(8,8,8,0.62)' : 'rgba(255,255,255,0.62)'
  const label = t > 0.55 ? 'rgba(8,8,8,0.42)' : 'rgba(255,255,255,0.42)'

  return (
    <section
      ref={root}
      className="relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: bg, color: ink }}
      aria-label="Software should do more than work"
    >
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-[1] py-28 lg:py-40">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 items-center">
          {/* LEFT text — never overlapped */}
          <div className="relative z-[2]">
            <p className="label mb-8" data-index="08 / PHILOSOPHY" style={{ color: label }}>
              SOFTWARE SHOULD
            </p>

            <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(54px,7vw,110px)', lineHeight: 0.96, color: ink }}>
              SOFTWARE
              <br />
              SHOULD DO MORE
              <br />
              THAN WORK.
              <br />
              <span
                className="ab-head"
                style={{ color: ink }}
              >
                IT SHOULD PERFORM.
              </span>
            </h2>

            <p className="mt-10 max-w-md text-body-lg" style={{ color: muted }}>
              1stPodium combines product thinking, software engineering and modern technology to transform ideas
              into reliable digital products.
            </p>
          </div>

          {/* RIGHT visual — contained in its own composition area */}
          <div className="ab-canvas-wrap relative w-full maxh-70vh maxw-600 ml-auto aspect-square" aria-hidden="true">
            <SoftwareCoreCanvas className="absolute inset-0" section="capabilities" light={t > 0.55} />
          </div>
        </div>
      </div>
    </section>
  )
}