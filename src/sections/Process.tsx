'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const stages = [
  { index: '01', title: 'ENTENDIMENTO', desc: 'Identificamos objetivo, contexto, requisitos e limitações.' },
  { index: '02', title: 'ARQUITETURA', desc: 'Estruturamos tecnologias, dados, segurança e integrações.' },
  { index: '03', title: 'EXPERIÊNCIA', desc: 'Criamos fluxos e interface do produto.' },
  { index: '04', title: 'DESENVOLVIMENTO', desc: 'Construímos o produto com código limpo e revisado.' },
  { index: '05', title: 'QUALIDADE', desc: 'Testamos o funcionamento real em cenários reais.' },
  { index: '06', title: 'LANÇAMENTO', desc: 'Levamos para produção com monitoramento.' },
  { index: '07', title: 'EVOLUÇÃO', desc: 'Mantemos, escalamos e melhoramos continuamente.' },
]

export function Process() {
  const root = useRef<HTMLElement>(null)
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
        const isActive = k <= idx
        item.style.opacity = isActive ? '1' : '0.3'
        item.style.transform = isActive ? 'translateX(0)' : 'translateX(-6px)'
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      })
    }

    active.current = -1
    onUpdate(0)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.proc-head'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } }
      )
    }, el)

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
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Processo">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <p className="label proc-head mb-10" data-index="05 / PROCESSO">COMO ENTREGAMOS</p>

        <h2 className="proc-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(40px,4.5vw,72px)', lineHeight: 1.02, opacity: 0 }}>
          DA IDEIA
          <br />
          À <span className="text-stroke">PRODUÇÃO.</span>
        </h2>

        <div className="relative">
          <div ref={fillRef} className="absolute left-7 top-1 bottom-1 w-px bg-white origin-top" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />
          <div className="absolute left-7 top-1 bottom-1 w-px bg-white/10" aria-hidden="true" />

          <ol className="space-y-12 pl-9">
            {stages.map((s, i) => (
              <li
                key={s.index}
                ref={(el) => { items.current[i] = el }}
                className="relative"
              >
                <span
                  className="absolute left-neg35 top-1.5 w-15 rounded-full border transition-all duration-500"
                  style={{ borderColor: 'rgba(255,255,255,0.22)', background: '#000' }}
                  aria-hidden="true"
                />
                <p className="font-mono u-0-7rem track-2 text-white/30 mb-2">{s.index}</p>
                <h3 className="text-white font-medium tracking-tight" style={{ fontSize: 'clamp(22px,2.4vw,36px)' }}>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-white/40 text-body">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
