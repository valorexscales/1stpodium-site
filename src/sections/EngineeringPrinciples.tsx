'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const principles = [
  { word: 'PERFORMANCE', desc: 'Fast systems and efficient software architecture.' },
  { word: 'SECURITY', desc: 'Security considered from the first architectural decision.' },
  { word: 'SCALABILITY', desc: 'Products designed to evolve with demand.' },
  { word: 'ARCHITECTURE', desc: 'Structured systems instead of disposable code.' },
  { word: 'EXPERIENCE', desc: 'Interfaces engineered to feel effortless.' },
  { word: 'RELIABILITY', desc: 'Software built for real-world operation.' },
]

export function EngineeringPrinciples() {
  const root = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-word]').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reverse' } }
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Engineering principles">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label mb-10" data-index="05 / PRINCIPLES">HOW WE WORK</p>
        <h2 className="text-white font-bold tracking-tighter mb-8" style={{ fontSize: 'clamp(42px,5vw,80px)', lineHeight: 1.02 }}>
          BUILT
          <br />
          DIFFERENTLY.
        </h2>

        <div className="mt-20 space-y-1">
          {principles.map((p, i) => (
            <div
              key={p.word}
              data-word
              className="group relative py-5 border-b hairline"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(-1)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8">
                <span className="font-mono u-0-7rem text-white/30 tracking-widest w-8 shrink-0">0{i + 1}</span>
                <h3
                  className={`font-bold tracking-tighter transition-all duration-500 ${
                    activeIdx >= 0 && activeIdx !== i ? 'opacity-25' : 'opacity-100'
                  }`}
                  style={{ fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1 }}
                  data-cursor-text={p.word}
                >
                  {p.word}
                </h3>
              </div>
              {/* hover explanation */}
              <div
                className="pointer-events-none mt-2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 max-w-xs text-right text-white/60 text-body transition-opacity duration-400 lg:pr-8"
                style={{ opacity: activeIdx === i ? 1 : 0 }}
              >
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}