'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function About() {
  const root = useRef<HTMLElement>(null)
  const [t, setT] = useState(0)

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
      const canvas = el.querySelector('.ab-canvas-wrap')
      if (canvas) {
        gsap.fromTo(canvas, { y: 40 }, {
          y: -40, ease: 'none',
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

  const bg = `rgb(${Math.round(0 + t * 242)}, ${Math.round(0 + t * 242)}, ${Math.round(0 + t * 239)})`
  const ink = t > 0.55 ? '#080808' : '#fff'
  const muted = t > 0.55 ? 'rgba(8,8,8,0.58)' : 'rgba(255,255,255,0.58)'
  const label = t > 0.55 ? 'rgba(8,8,8,0.38)' : 'rgba(255,255,255,0.38)'

  return (
    <section
      ref={root}
      className="relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: bg, color: ink }}
      aria-label="Software deve fazer mais do que funcionar"
    >
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-[1] py-28 lg:py-40">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 items-center">
          <div className="relative z-[2]">
            <p className="label mb-8" data-index="08 / FILOSOFIA" style={{ color: label }}>
              SOFTWARE DEVE
            </p>

            <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(48px,6vw,100px)', lineHeight: 0.96, color: ink }}>
              SOFTWARE
              <br />
              DEVE FAZER MAIS
              <br />
              DO QUE
              <br />
              <span className="ab-head" style={{ color: ink }}>FUNCIONAR.</span>
            </h2>

            <p className="mt-6 font-mono u-0-7rem track-14 uppercase" style={{ color: label }}>
              PRECISA PERFORMAR.
            </p>

            <p className="mt-10 max-w-md text-body-lg leading-relaxed" style={{ color: muted }}>
              Cada decisão técnica deve contribuir para um produto mais rápido, confiável e fácil de evoluir.
            </p>
          </div>

          <div className="ab-canvas-wrap relative w-full max-h-[70vh] max-w-[600px] ml-auto aspect-square" aria-hidden="true">
            <SoftwareCoreCanvas className="absolute inset-0" section="capabilities" light={t > 0.55} />
          </div>
        </div>
      </div>
    </section>
  )
}
