'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

type StepId = 'what' | 'stage' | 'budget' | 'details'

const steps: { id: StepId; title: string; prompt: string; options?: string[] }[] = [
  { id: 'what', title: 'WHAT ARE WE BUILDING?', prompt: 'Select the type of project.', options: ['Web Application', 'Mobile Application', 'Desktop Software', 'SaaS Product', 'Backend / API', 'Authentication System', 'Automation & Integrations', 'Custom Software', 'Other'] },
  { id: 'stage', title: 'PROJECT STAGE', prompt: 'Where is the project today?', options: ['Idea / Concept', 'Planning / Specification', 'Existing Product (Scaling)', 'Existing Product (Rebuild / Modernization)', 'MVP Development'] },
  { id: 'budget', title: 'BUDGET RANGE', prompt: 'Approximate investment range.', options: ['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000+', "Let's discuss"] },
  { id: 'details', title: 'PROJECT DETAILS', prompt: 'The last step.', options: undefined },
]

const fieldDef = {
  name: { label: 'FULL NAME', type: 'text' as const, ph: 'Your name' },
  email: { label: 'EMAIL ADDRESS', type: 'email' as const, ph: 'you@company.com' },
  company: { label: 'COMPANY', type: 'text' as const, ph: 'Company (optional)' },
  description: { label: 'PROJECT DESCRIPTION', type: 'textarea' as const, ph: 'What are you building, and what does success look like?' },
}

export function ContactFlow() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('');
  const current = steps[step]

  const pick = (v: string) => {
    setData((d) => ({ ...d, [current.id]: v }))
  }
  const next = () => {
    if (current.options && !data[current.id]) {
      setError('Please select an option to continue.')
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
      setError('Please fill in your name, a valid email and a short description.')
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: data.what, stage: data.stage, budget: data.budget, ...data }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again, or email us directly.')
    }
  }

  /* ----- success state ----- */
  if (status === 'success') {
    return (
      <section className="minh-70vh flex items-center justify-center bg-black" aria-live="polite">
        <div className="container-main text-center">
          <h2 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(44px,6vw,88px)' }}>PROJECT RECEIVED.</h2>
          <p className="mt-6 text-white/60 text-body-lg">We&apos;ll review your inquiry and be in touch.</p>
          <Link href="/" className="btn-secondary mt-10 inline-flex">RETURN HOME</Link>
        </div>
      </section>
    )
  }

  /* ----- multi-step form ----- */
  return (
    <section className="relative section bg-black overflow-hidden" aria-label="Start a project">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 max-w-3xl">
        <p className="label" data-index="10 / CONTACT">START A PROJECT</p>

        {/* progress */}
        <div className="mt-10 flex items-center gap-3" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.id} className={`h-px flex-1 transition-colors duration-500 ${i <= step ? 'bg-white' : 'bg-white/15'}`} />
          ))}
        </div>
        <p className="mt-3 text-micro text-white/40 uppercase track-18">
          STEP {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')} — {current.title}
        </p>

        <form onSubmit={submit} className="mt-12">
          {/* option step */}
          {current.options ? (
            <fieldset>
              <legend className="text-white font-medium" style={{ fontSize: 'clamp(24px,2.6vw,38px)' }}>{current.prompt}</legend>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {current.options.map((o) => {
                  const selected = data[current.id] === o
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => pick(o)}
                      className={`text-left px-5 py-4 border rounded transition-colors duration-300 text-body ${
                        selected ? 'border-white bg-white/[0.06] text-white' : 'border-white/15 text-white/65 hover:border-white/40 hover:text-white'
                      }`}
                      data-cursor-text="SELECT"
                      aria-pressed={selected}
                    >
                      {o}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : (
            /* detail step */
            <fieldset className="space-y-6">
              <legend className="sr-only">Project details</legend>
              {Object.entries(fieldDef).map(([key, f]) => (
                <label key={key} className="block">
                  <span className="text-micro text-white/40 track-18 uppercase">{f.label}</span>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={data[key] || ''}
                      onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                      placeholder={f.ph}
                      rows={5}
                      className="mt-2 w-full bg-black/50 border border-white/15 rounded px-4 py-3 text-white placeholder:text-white/30 focus:border-white transition-colors resize-y"
                    />
                  ) : (
                    <input
                      type={f.type}
                      value={data[key] || ''}
                      onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                      placeholder={f.ph}
                      className="mt-2 w-full bg-black/50 border border-white/15 rounded px-4 py-3 text-white placeholder:text-white/30 focus:border-white transition-colors"
                    />
                  )}
                </label>
              ))}
            </fieldset>
          )}

          {error && <p className="mt-6 text-white/70 text-body" role="alert">{error}</p>}

          <div className="mt-10 flex justify-end gap-4">
            {step > 0 && (
              <button type="button" onClick={back} className="btn-secondary" data-cursor-text="BACK">BACK</button>
            )}
            {step < steps.length - 1 ? (
              <button type="button" onClick={next} className="btn-primary" data-cursor-text="NEXT">
                NEXT
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-50" data-cursor-text="SUBMIT">
                {status === 'loading' ? 'SUBMITTING…' : 'SUBMIT PROJECT'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}