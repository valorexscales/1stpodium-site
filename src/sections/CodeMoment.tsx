'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'

gsap.registerPlugin(ScrollTrigger)

const codeLines = [
  'class SoftwareCore {',
  '  constructor(architecture: Architecture) {',
  '    this.layers = architecture.decompose()',
  '    this.contracts = new Map<Interface, Implementation>()',
  '  }',
  '',
  '  async deploy(): Promise<DeploymentResult> {',
  '    const validated = await this.validate()',
  '    const optimized = this.optimize(validated)',
  '    return this.pipeline.execute(optimized)',
  '  }',
  '',
  '  private optimize(code: CodeBase): OptimizedCode {',
  '    return code',
  '      .treeShake()',
  '      .minify()',
  '      .splitChunks()',
  '      .prefetchCritical()',
  '  }',
  '}',
  '',
  '// Engineering is in the details.',
  'const core = new SoftwareCore(architecture)',
  'await core.deploy()',
]

export function CodeMoment() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.codemoment-headline .reveal-line',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.code-line',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.code-block',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="codemoment relative min-h-screen flex items-center bg-black border-t border-white/10"
      aria-labelledby="codemoment-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="relative z-20">
            <RevealText as="h2" id="codemoment-heading" type="lines" className="codemoment-headline mb-10" stagger={0.12} duration={1}>
              <span className="text-display font-bold tracking-tighter text-white">ENGINEERING</span>
              <span className="text-display font-bold tracking-tighter text-white">IS IN THE</span>
              <span className="text-display font-bold tracking-tighter text-white">DETAILS.</span>
            </RevealText>

            <RevealText as="p" type="lines" className="text-body-lg text-grey-200 leading-relaxed max-w-xl" stagger={0.1} duration={0.8}>
              <span>Clean abstractions. Explicit contracts. Zero runtime surprises. The best code reads like documentation.</span>
            </RevealText>
          </div>

          <div className="relative code-block">
            <div className="bg-black-100 border border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-black">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-micro font-mono text-grey-100 ml-4">software-core.ts</span>
              </div>

              <pre className="p-6 lg:p-8 overflow-x-auto font-mono text-sm leading-relaxed text-grey-300">
                <code className="language-typescript">
                  {codeLines.map((line, index) => (
                    <div key={index} className="code-line" style={{ opacity: 0 }}>
                      <span className="text-grey-100 select-none pr-4" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      {line === '' ? (
                        <span />
                      ) : (
                        <span>{line.replace(/(\/\/.*$)/, '<span class="text-grey-1">$1</span>')}</span>
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl opacity-0" style={{ opacity: 0.1 }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}