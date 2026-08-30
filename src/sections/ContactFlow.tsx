'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

type StepId = 'what' | 'stage' | 'priority' | 'details' | 'budget'

const steps: { id: StepId; title: string; prompt: string; options?: string[] }[] = [
  { id: 'what', title: 'O QUE VOCÊ PRECISA?', prompt: 'Selecione o tipo de projeto.', options: ['Aplicação Web', 'Aplicativo Mobile', 'Software para Computador', 'SaaS', 'Automação', 'Sistema Empresarial', 'Backend / API', 'Login / Autenticação', 'Software Personalizado', 'Ainda não sei'] },
  { id: 'stage', title: 'EM QUE MOMENTO ESTÁ?', prompt: 'Onde está o projeto hoje?', options: ['Tenho uma ideia', 'Estou planejando', 'Já tenho um produto', 'Preciso reconstruir', 'Preciso escalar'] },
  { id: 'priority', title: 'O QUE MAIS IMPORTA?', prompt: 'Prioridade do projeto.', options: ['Performance', 'Segurança', 'Rapidez para lançar', 'Escalabilidade', 'Integrações', 'Automação', 'Projeto completo'] },
  { id: 'details', title: 'DETALHES', prompt: 'O último passo.', options: undefined },
  { id: 'budget', title: 'ORÇAMENTO', prompt: 'Faixa de investimento (opcional).', options: ['Ainda estou definindo', 'Até R$5 mil', 'R$5–10 mil', 'R$10–25 mil', 'R$25 mil+', 'Prefiro conversar'] },
]

const fieldDef = {
  name: { label: 'NOME', type: 'text' as const, ph: 'Seu nome' },
  email: { label: 'EMAIL', type: 'email' as const, ph: 'voce@empresa.com' },
  company: { label: 'EMPRESA', type: 'text' as const, ph: 'Empresa (opcional)' },
  description: { label: 'CONTE SOBRE O PROJETO', type: 'textarea' as const, ph: 'O que você está construindo, e o que seria sucesso?' },
}

export function ContactFlow() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const current = steps[step]

  const pick = (v: string) => {
    setData((d) => ({ ...d, [current.id]: v }))
  }
  const next = () => {
    if (current.options && !data[current.id]) {
      setError('Selecione uma opção para continuar.')
      return
    }
    setError('')
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const name = data.name?.trim()
    const email = data.email?.trim()
    const desc = data.description?.trim()
    if (!name || !email || !desc || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Preencha seu nome, um email válido e uma breve descrição.')
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: data.what, stage: data.stage, priority: data.priority, budget: data.budget, ...data }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Algo deu errado. Por favor, tente novamente ou nos envie um email.')
    }
  }

  if (status === 'success') {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-black" aria-live="polite">
        <div className="container-main text-center">
          <h2 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(44px,6vw,88px)' }}>PROJETO RECEBIDO.</h2>
          <p className="mt-6 text-white/55 text-body-lg">Vamos analisar e entrar em contato.</p>
          <Link href="/" className="btn-secondary mt-10 inline-flex">VOLTAR AO INÍCIO</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative section bg-black overflow-hidden" aria-label="Iniciar projeto">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 max-w-3xl">
        <p className="label" data-index="12 / CONTATO">O QUE VAMOS CONSTRUIR?</p>
        <p className="mt-4 text-white/40 text-body-lg">Você explica a ideia. A parte técnica pode ficar com a gente.</p>

        <div className="mt-10 flex items-center gap-3" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.id} className={`h-px flex-1 transition-colors duration-500 ${i <= step ? 'bg-white' : 'bg-white/10'}`} />
          ))}
        </div>
        <p className="mt-3 text-micro text-white/35 uppercase track-18 font-mono">
          ETAPA {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')} — {current.title}
        </p>

        <form onSubmit={submit} className="mt-12">
          {current.options ? (
            <fieldset>
              <legend className="text-white font-medium" style={{ fontSize: 'clamp(22px,2.4vw,36px)' }}>{current.prompt}</legend>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {current.options.map((o) => {
                  const selected = data[current.id] === o
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => pick(o)}
                      className={`text-left px-5 py-4 border rounded transition-colors duration-300 text-body ${
                        selected ? 'border-white bg-white/[0.06] text-white' : 'border-white/12 text-white/55 hover:border-white/30 hover:text-white'
                      }`}
                      data-cursor-text="SELECIONAR"
                      aria-pressed={selected}
                    >
                      {o}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : (
            <fieldset className="space-y-6">
              <legend className="sr-only">Detalhes do projeto</legend>
              {Object.entries(fieldDef).map(([key, f]) => (
                <label key={key} className="block">
                  <span className="text-micro text-white/35 track-18 uppercase font-mono">{f.label}</span>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={data[key] || ''}
                      onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                      placeholder={f.ph}
                      rows={5}
                      className="mt-2 w-full bg-white/[0.03] border border-white/12 rounded px-4 py-3 text-white placeholder:text-white/25 focus:border-white/40 transition-colors resize-y"
                    />
                  ) : (
                    <input
                      type={f.type}
                      value={data[key] || ''}
                      onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                      placeholder={f.ph}
                      className="mt-2 w-full bg-white/[0.03] border border-white/12 rounded px-4 py-3 text-white placeholder:text-white/25 focus:border-white/40 transition-colors"
                    />
                  )}
                </label>
              ))}
            </fieldset>
          )}

          {error && <p className="mt-6 text-white/60 text-body" role="alert">{error}</p>}

          <div className="mt-10 flex justify-end gap-4">
            {step > 0 && (
              <button type="button" onClick={back} className="btn-secondary" data-cursor-text="VOLTAR">VOLTAR</button>
            )}
            {step < steps.length - 1 ? (
              <button type="button" onClick={next} className="btn-primary btn-magnetic" data-cursor-text="PRÓXIMO">
                PRÓXIMO
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button type="submit" disabled={status === 'loading'} className="btn-primary btn-magnetic disabled:opacity-50" data-cursor-text="ENVIAR">
                {status === 'loading' ? 'ENVIANDO…' : 'ENVIAR PROJETO'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
