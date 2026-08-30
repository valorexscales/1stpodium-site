'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const faqs = [
  { q: 'QUE TIPO DE SOFTWARE A 1STPODIUM DESENVOLVE?', a: 'Aplicações web, aplicativos mobile, software para computador, SaaS, backends, APIs, automações e sistemas personalizados. Qualquer tipo de produto digital que demands engenharia de software real.' },
  { q: 'VOCÊS FAZEM O PROJETO INTEIRO?', a: 'Sim. Do conceito à produção: arquitetura, design, desenvolvimento, testes, deploy e evolução. Uma equipe, todas as camadas.' },
  { q: 'POSSO CHEGAR APENAS COM UMA IDEIA?', a: 'Claro. Muitos dos nossos projetos começam com uma ideia ou problema. Nós ajudamos a transformar isso em uma solução técnica viável.' },
  { q: 'VOCÊS CONSEGUEM TRABALHAR EM UM SISTEMA EXISTENTE?', a: 'Sim. Fazemos modernização, escalabilidade, refatoração e integração com sistemas existentes.' },
  { q: 'VOCÊS CRIAM APLICATIVOS?', a: 'Sim. Desenvolvemos aplicativos para Android e iOS usando React Native, Flutter ou Swift.' },
  { q: 'VOCÊS CRIAM SOFTWARE PARA COMPUTADOR?', a: 'Sim. Aplicações desktop para Windows, macOS e Linux usando Electron, Java ou .NET.' },
  { q: 'VOCÊS IMPLEMENTAM LOGIN E SEGURANÇA?', a: 'Sim. Autenticação completa: OAuth 2.0, OpenID Connect, JWT, SSO, MFA, RBAC e controle de permissões.' },
  { q: 'VOCÊS FAZEM AUTOMAÇÕES?', a: 'Sim. Integrações entre sistemas, pipelines de dados, webhooks e processos automáticos.' },
  { q: 'QUANTO CUSTA?', a: 'Depende do escopo. Projetos simples começam a partir de R$5 mil. Projetos complexos são orçados após entendimento completo dos requisitos.' },
  { q: 'QUANTO TEMPO LEVA?', a: 'Depende da complexidade. Um MVP pode levar 4–8 semanas. Produtos completos, 3–6 meses. Orçamento e cronograma são apresentados após a fase de entendimento.' },
  { q: 'VOCÊS DÃO SUPORTE APÓS O LANÇAMENTO?', a: 'Sim. Oferecemos suporte contínuo, manutenção, evolução e monitoramento após o lançamento.' },
]

export function FAQ() {
  const root = useRef<HTMLElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.faq-head'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo(
        el.querySelectorAll('.faq-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: '.faq-list', start: 'top 80%', toggleActions: 'play none none reverse' } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section section-darker overflow-hidden" aria-label="Perguntas frequentes">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 max-w-3xl">
        <p className="label faq-head mb-10" data-index="11 / FAQ" style={{ opacity: 0 }}>PERGUNTAS FREQUENTES</p>

        <h2 className="faq-head text-white font-bold tracking-tighter mb-14" style={{ fontSize: 'clamp(40px,4.5vw,72px)', lineHeight: 1.02, opacity: 0 }}>
          DÚVIDAS?
          <br />
          <span className="text-stroke">RESPONDIDAS.</span>
        </h2>

        <div className="faq-list divide-y divide-hairline">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item" style={{ opacity: 0 }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left py-5 flex items-center gap-4 group"
                aria-expanded={openIdx === i}
              >
                <span className="flex-1 text-white/80 group-hover:text-white transition-colors font-medium text-body-lg">
                  {faq.q}
                </span>
                <span className={`shrink-0 w-6 h-6 flex items-center justify-center text-white/40 transition-transform duration-300 ${openIdx === i ? 'rotate-45' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{ maxHeight: openIdx === i ? '200px' : '0', opacity: openIdx === i ? 1 : 0 }}
              >
                <p className="text-white/45 text-body pb-5 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
