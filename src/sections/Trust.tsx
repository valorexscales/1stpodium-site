'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const reasons = [
  { title: 'PONTA A PONTA', desc: 'Do produto à infraestrutura. Uma equipe, todas as camadas.', icon: '→' },
  { title: 'SOB MEDIDA', desc: 'Tecnologia escolhida para o problema. Não o contrário.', icon: '◇' },
  { title: 'SEGURANÇA', desc: 'Pensada desde a arquitetura. Não adicionada depois.', icon: '◆' },
  { title: 'EVOLUÇÃO', desc: 'Código preparado para manutenção e crescimento.', icon: '↗' },
  { title: 'CLAREZA', desc: 'Você não precisa ser desenvolvedor para acompanhar seu projeto.', icon: '○' },
]

export function Trust() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.trust-head'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo(
        el.querySelectorAll('.trust-item'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.trust-grid', start: 'top 78%', toggleActions: 'play none none reverse' } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Por que 1stPodium">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label trust-head mb-10" data-index="10 / CONFIANÇA" style={{ opacity: 0 }}>POR QUE 1STPODIUM?</p>

        <h2 className="trust-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(40px,4.5vw,72px)', lineHeight: 1.02, opacity: 0 }}>
          POR QUE
          <br />
          <span className="text-stroke">1STPODIUM?</span>
        </h2>

        <div className="trust-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="trust-item group p-6 border hairline rounded bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded border border-white/10 text-white/40 font-mono text-xs mb-4 group-hover:border-white/25 group-hover:text-white/60 transition-all duration-500">
                {r.icon}
              </span>
              <h3 className="text-white font-medium tracking-tight mb-2" style={{ fontSize: 'clamp(18px,1.8vw,24px)' }}>
                {r.title}
              </h3>
              <p className="text-white/40 text-body">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
