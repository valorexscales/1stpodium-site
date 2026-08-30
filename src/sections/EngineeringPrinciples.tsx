'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const principles = [
  {
    word: 'PERFORMANCE',
    headline: ['RÁPIDO', 'POR PROJETO,', 'NÃO POR ACASO.'],
    desc: 'Sistemas rápidos e arquitetura de software eficiente.',
    visual: 'particles',
  },
  {
    word: 'SEGURANÇA',
    headline: ['SEGURANÇA', 'DESDE A', 'ESTRUTURA.'],
    desc: 'Segurança pensada desde a primeira decisão de arquitetura.',
    visual: 'auth',
  },
  {
    word: 'ESCALA',
    headline: ['CONSTRUÍDO', 'PARA', 'CRESCER.'],
    desc: 'Produtos desenhados para evoluir com a demanda.',
    visual: 'network',
  },
  {
    word: 'CONFIABILIDADE',
    headline: ['SOFTWARE', 'PARA O', 'MUNDO REAL.'],
    desc: 'Software construído para operação real, não para demonstração.',
    visual: 'datacenter',
  },
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
      gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' } }
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section section-darker overflow-hidden" aria-label="Princípios">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label mb-10" data-index="06 / PRINCÍPIOS">COMO TRABALHAMOS</p>
        <h2 className="text-white font-bold tracking-tighter mb-8" style={{ fontSize: 'clamp(40px,4.5vw,72px)', lineHeight: 1.02 }}>
          CONSTRUÍDO
          <br />
          <span className="text-stroke">DIFFERENTLY.</span>
        </h2>

        <div className="mt-20 space-y-1">
          {principles.map((p, i) => (
            <div
              key={p.word}
              data-chapter
              className="group relative border-b hairline"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(-1)}
            >
              <div className="py-6 lg:py-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8">
                  <span className="font-mono u-0-7rem text-white/25 tracking-widest w-8 shrink-0">0{i + 1}</span>
                  <h3
                    className={`font-bold tracking-tighter transition-all duration-500 ${
                      activeIdx >= 0 && activeIdx !== i ? 'opacity-20' : 'opacity-100'
                    }`}
                    style={{ fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1 }}
                    data-cursor-text={p.word}
                  >
                    {p.word}
                  </h3>
                </div>

                {/* Hover explanation */}
                <div
                  className="pointer-events-none mt-3 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 max-w-sm text-right transition-opacity duration-400 lg:pr-8"
                  style={{ opacity: activeIdx === i ? 1 : 0 }}
                >
                  <p className="text-white/55 text-body">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
