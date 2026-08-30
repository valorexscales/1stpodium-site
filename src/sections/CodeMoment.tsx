'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const codeLines = [
  { text: 'export class SoftwareCore {', accent: 'keyword' },
  { text: '  constructor(architecture: Architecture) {', accent: 'plain' },
  { text: '    this.layers = await architecture.decompose()', accent: 'plain' },
  { text: '    this.contracts = design.contracts.resolve()', accent: 'plain' },
  { text: '  }', accent: 'plain' },
  { text: '', accent: 'plain' },
  { text: '  async deploy(): Promise<Deployment> {', accent: 'plain' },
  { text: '    const tested   = await this.runSuite()', accent: 'plain' },
  { text: '    const optimized = this.optimize(tested)', accent: 'plain' },
  { text: '    return this.pipeline.execute(optimized)', accent: 'plain' },
  { text: '  }', accent: 'plain' },
  { text: '}', accent: 'plain' },
  { text: '', accent: 'plain' },
  { text: '// Engenharia está nos detalhes.', accent: 'comment' },
]

export function CodeMoment() {
  const root = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.code-head'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo(
        lineRefs.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.04, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: '.code-block', start: 'top 82%', toggleActions: 'play none none reverse' } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const color = (accent: string) =>
    accent === 'keyword' ? 'text-white' : accent === 'comment' ? 'text-white/30' : 'text-white/60'

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Detalhes da engenharia">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="label code-head mb-10" data-index="07 / CRAFT">PRECISÃO</p>
          <h2 className="text-white font-bold tracking-tighter code-head" style={{ fontSize: 'clamp(40px,5vw,80px)', lineHeight: 0.98, opacity: 0 }}>
            ENGENHARIA
            <br />
            ESTÁ NOS
            <br />
            <span className="text-stroke">DETALHES.</span>
          </h2>
        </div>

        <div className="code-block">
          <div className="border hairline bg-white/[0.02] rounded overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b hairline">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono u-0-65rem text-white/30 tracking-wider">software-core.ts</span>
            </div>
            <pre className="p-6 overflow-x-auto">
              <code>
                {codeLines.map((line, i) => (
                  <div key={i} ref={(el) => { lineRefs.current[i] = el }} className="flex gap-4 font-mono text-xs leading-loose" style={{ opacity: 0 }}>
                    <span className="select-none text-white/15 w-4 text-right shrink-0">{i + 1}</span>
                    <span className={`whitespace-pre ${color(line.accent)}`}>{line.text || ' '}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
