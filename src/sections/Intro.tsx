'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function Intro() {
  const root = useRef<HTMLElement>(null)
  const lineRefs = useRef<HTMLSpanElement[]>([])
  const layersRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current,
        { yPercent: 110 },
        {
          yPercent: 0, stagger: 0.1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        el.querySelectorAll('.intro-fade'),
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      )

      /* layers stagger */
      gsap.fromTo(
        layersRef.current,
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: '.arch-layers', start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )

      /* parallax on canvas */
      const canvas = el.querySelector('.intro-canvas-wrap')
      if (canvas) {
        gsap.fromTo(canvas, { y: 50 }, {
          y: -50, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      }
    }, el)
    return () => ctx.revert()
  }, [])

  const layers = [
    { label: 'INTERFACE', desc: 'O que o usuário vê e interage.' },
    { label: 'BACKEND', desc: 'Lógica, regras e processamento.' },
    { label: 'AUTENTICAÇÃO', desc: 'Identidade, permissões e segurança.' },
    { label: 'DADOS', desc: 'Armazenamento, consultas e integridade.' },
    { label: 'INFRAESTRUTURA', desc: 'Servidores, rede e escalabilidade.' },
  ]

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Arquitetura">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="label intro-fade mb-10" data-index="03 / ARQUITETURA" style={{ opacity: 0 }}>
            POR TRÁS DE CADA TELA
          </p>

          <h2 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(40px,5vw,80px)', lineHeight: 0.98 }}>
            {['POR TRÁS', 'DE CADA TELA,', 'EXISTE', 'UM SISTEMA.'].map((t, i) => (
              <span key={i} className="block overflow-hidden py-track">
                <span
                  ref={(el) => { if (el) lineRefs.current[i] = el }}
                  className={`block will-change-transform ${i === 3 ? 'text-stroke' : ''}`}
                >
                  {t}
                </span>
              </span>
            ))}
          </h2>

          <p className="intro-fade mt-8 max-w-md text-white/55 text-body-lg leading-relaxed" style={{ opacity: 0 }}>
            Não construímos apenas o que o usuário vê. Projetamos o que faz tudo funcionar por trás.
          </p>

          {/* Architecture layers */}
          <div className="arch-layers mt-12 space-y-3">
            {layers.map((l, i) => (
              <div
                key={l.label}
                ref={(el) => { layersRef.current[i] = el }}
                className="flex items-center gap-4 px-4 py-3 border hairline rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                style={{ opacity: 0 }}
              >
                <div className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                <div>
                  <span className="font-mono u-0-65rem track-14 text-white/50 uppercase">{l.label}</span>
                  <span className="ml-3 text-white/35 u-0-72rem">{l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="intro-canvas-wrap relative w-full h-60vh min-h-[400px] lg:h-[70vh]">
          <SoftwareCoreCanvas className="absolute inset-0" section="services" />
        </div>
      </div>
    </section>
  )
}
