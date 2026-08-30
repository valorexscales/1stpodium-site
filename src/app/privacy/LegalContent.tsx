'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

interface LegalContentProps {
  type: 'privacy' | 'terms'
}

const content = {
  privacy: {
    title: 'POLÍTICA DE PRIVACIDADE',
    sections: [
      { heading: '1. INFORMAÇÕES QUE COLETAMOS', body: 'Coletamos informações que você nos fornece diretamente, como ao preencher um formulário de contato, solicitar um orçamento ou se comunicar conosco. Isso pode incluir seu nome, endereço de email, nome da empresa e detalhes do projeto.' },
      { heading: '2. COMO USAMOS SUAS INFORMAÇÕES', body: 'Usamos as informações coletadas para responder a suas solicitações, fornecer nossos serviços, melhorar nosso site e se comunicar com você sobre seu projeto. Não vendemos suas informações pessoais a terceiros.' },
      { heading: '3. RETENÇÃO DE DADOS', body: 'Mantemos suas informações apenas pelo tempo necessário para cumprir os objetivos descritos nesta política, salvo se um período mais longo for exigido por lei.' },
      { heading: '4. SEGURANÇA', body: 'Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.' },
      { heading: '5. SEUS DIREITOS', body: 'Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode se opor ou restringir o processamento de seus dados. Entre em contato conosco em valorexscales@gmail.com para exercer esses direitos.' },
      { heading: '6. ALTERAÇÕES NESTA POLÍTICA', body: 'Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página com uma data de vigência atualizada.' },
      { heading: '7. CONTATO', body: 'Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco em valorexscales@gmail.com' },
    ],
  },
  terms: {
    title: 'TERMOS DE SERVIÇO',
    sections: [
      { heading: '1. ACEITAÇÃO DOS TERMOS', body: 'Ao acessar e usar o site e serviços da 1stPodium, você concorda em ficar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, poderá não usar nossos serviços.' },
      { heading: '2. SERVIÇOS', body: 'A 1stPodium fornece serviços de engenharia de software personalizados, incluindo aplicações web, aplicativos mobile, software para computador, sistemas backend, sistemas de autenticação, produtos SaaS e desenvolvimento de software sob medida. O escopo de cada projeto é definido em um acordo separado.' },
      { heading: '3. PROPRIEDADE INTELECTUAL', body: 'Todo o conteúdo, designs, código e materiais neste site são propriedade intelectual da 1stPodium ou de seus licenciadores. A propriedade dos entregáveis do cliente é definida no acordo do projeto.' },
      { heading: '4. CONFIDENCIALIDADE', body: 'Tratamos todas as informações do cliente como confidenciais. Não divulgaremos suas informações proprietárias, segredos comerciais ou detalhes do projeto a terceiros sem seu consentimento por escrito, exceto quando exigido por lei.' },
      { heading: '5. LIMITAÇÃO DE RESPONSABILIDADE', body: 'A 1stPodium não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes ou relacionados aos nossos serviços. Nossa responsabilidade total não excederá as taxas pagas pelo projeto específico.' },
      { heading: '6. RESCISÃO', body: 'Qualquer uma das partes pode rescindir o contrato com aviso por escrito. Após a rescisão, você é responsável pelo pagamento de todos os serviços prestados até a data de rescisão.' },
      { heading: '7. LEI APLICÁVEL', body: 'Estes termos serão regidos pelas leis da jurisdição onde a 1stPodium opera. Quaisquer disputas serão resolvidas por arbitragem vinculativa.' },
      { heading: '8. ALTERAÇÕES NOS TERMOS', body: 'Podemos modificar estes termos a qualquer momento. O uso continuado de nossos serviços após as alterações constitui aceitação dos novos termos.' },
      { heading: '9. CONTATO', body: 'Se você tiver dúvidas sobre estes termos, entre em contato conosco em valorexscales@gmail.com' },
    ],
  },
}

export function LegalContent({ type }: LegalContentProps) {
  const data = content[type]
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.legal-fade'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out' }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="min-h-screen bg-black relative">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="legal-fade font-mono u-0-7rem track-3 text-white/30" style={{ opacity: 0 }}>LEGAL</p>
          <h1 className="legal-fade text-white font-bold tracking-tighter mt-4" style={{ fontSize: 'clamp(38px,5vw,64px)', opacity: 0 }}>
            {data.title}
          </h1>

          <div className="mt-12 space-y-12">
            {data.sections.map((s) => (
              <section key={s.heading} className="legal-fade" style={{ opacity: 0 }}>
                <h2 className="text-white font-medium tracking-tight" style={{ fontSize: 'clamp(20px,2vw,28px)' }}>{s.heading}</h2>
                <p className="mt-3 text-white/55 text-body leading-relaxed max-w-2xl">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <Link href="/" className="btn-secondary" data-cursor-text="VOLTAR AO INÍCIO">
              VOLTAR AO INÍCIO
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
