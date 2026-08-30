'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

const services = [
  { id: 'web-applications', index: '01', title: 'APLICAÇÕES WEB', desc: 'Plataformas, sistemas internos, dashboards, SaaS e produtos web personalizados.', tech: 'React · Next.js · TypeScript' },
  { id: 'mobile-applications', index: '02', title: 'APLICATIVOS MOBILE', desc: 'Experiências para Android e iOS com performance nativa.', tech: 'React Native · Flutter · Swift' },
  { id: 'desktop-software', index: '03', title: 'SOFTWARE PARA COMPUTADOR', desc: 'Aplicações para Windows, macOS e Linux.', tech: 'Electron · Java · .NET' },
  { id: 'backend-api', index: '04', title: 'BACKEND & APIs', desc: 'A estrutura por trás do produto: dados, integrações, regras e comunicação.', tech: 'Node.js · Java · Python · Go' },
  { id: 'authentication', index: '05', title: 'LOGIN & SEGURANÇA', desc: 'Autenticação, permissões, OAuth, SSO, MFA e usuários.', tech: 'OAuth 2.0 · OIDC · JWT · MFA' },
  { id: 'saas-products', index: '06', title: 'SAAS', desc: 'Produtos completos com login, assinatura, pagamentos e administração.', tech: 'Multi-tenant · Billing · Admin' },
  { id: 'automation-integrations', index: '07', title: 'AUTOMAÇÕES', desc: 'Integrações entre sistemas e processos automáticos.', tech: 'Webhooks · Pipelines · API' },
  { id: 'custom-software', index: '08', title: 'SOFTWARE SOB MEDIDA', desc: 'Soluções criadas especificamente para uma operação ou ideia.', tech: 'Qualquer stack · Arquitetura primeiro' },
]

export function Services() {
  const root = useRef<HTMLElement>(null)
  const rows = useRef<(HTMLElement | null)[]>([])
  const [activeIdx, setActiveIdx] = useState(0)

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
          opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        rows.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.06, ease: 'expo.out',
          scrollTrigger: { trigger: '.svc-list', start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      rows.current.forEach((row, i) => {
        if (!row) return
        const rect = row.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const viewCenter = window.innerHeight / 2
        if (Math.abs(center - viewCenter) < 120) {
          setActiveIdx(i)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={root} className="relative section section-darker overflow-hidden" aria-label="Serviços">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-14">
          <p className="label svc-head" data-index="02 / SERVIÇOS" style={{ opacity: 0 }}>O QUE CONSTRUÍMOS</p>
          <p className="svc-head hidden lg:block text-right u-0-8rem text-white/35" style={{ opacity: 0 }}>
            Da primeira arquitetura à produção — um parceiro em cada camada.
          </p>
        </div>

        <h2 className="svc-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(40px,4.5vw,72px)', lineHeight: 1.02, opacity: 0 }}>
          DO PRIMEIRO
          <br />
          CLIQUE AO
          <br />
          <span className="text-stroke">SISTEMA INTEIRO.</span>
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14">
          {/* Left: services list */}
          <ul className="svc-list divide-y divide-hairline">
            {services.map((s, i) => (
              <li
                key={s.id}
                ref={(el) => { rows.current[i] = el }}
                className={`group cursor-pointer transition-all duration-500 ${i === activeIdx ? 'bg-white/[0.04]' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                style={{ opacity: 0 }}
              >
                <div className="flex items-baseline gap-5 py-5 lg:py-6 px-4 -mx-4 rounded">
                  <span className="shrink-0 font-mono u-0-7rem text-white/25 tracking-widest w-7">{s.index}</span>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block font-medium tracking-tight transition-all duration-500 ${
                        i === activeIdx ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                      }`}
                      style={{ fontSize: 'clamp(22px, 2.4vw, 36px)', lineHeight: 1.1 }}
                    >
                      {s.title}
                    </span>
                    <span className={`mt-2 block u-0-75rem transition-all duration-500 ${
                      i === activeIdx ? 'text-white/50 max-h-20 opacity-100' : 'text-white/0 max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {s.desc}
                    </span>
                  </div>
                  <span className="hidden md:block shrink-0 u-0-65rem text-white/25 track-12 uppercase">{s.tech}</span>
                  <span className={`shrink-0 transition-all duration-500 ${i === activeIdx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Right: visual */}
          <div className="hidden lg:block relative service-visual-sticky">
            <div className="absolute inset-0 rounded-lg overflow-hidden border hairline bg-white/[0.02]">
              <SoftwareCoreCanvas className="absolute inset-0" section="services" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="hud-dot" />
                  <span className="font-mono u-0-55rem track-25 text-white/30 uppercase">{services[activeIdx].title}</span>
                </div>
                <p className="text-white/50 text-body max-w-sm">{services[activeIdx].desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA after services */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-6 border-t hairline pt-10">
          <div className="flex-1">
            <p className="text-white/70 font-medium text-body-lg">Não sabe exatamente o que precisa?</p>
            <p className="mt-2 text-white/40 text-body">Conte o problema ou a ideia. Nós ajudamos a transformar isso em uma solução técnica.</p>
          </div>
          <Link href="/contact" className="btn-primary btn-magnetic shrink-0" data-cursor-text="CONTATAR SOBRE O PROJETO">
            CONTATAR SOBRE O PROJETO
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
