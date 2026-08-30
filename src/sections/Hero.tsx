'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const headLines = useRef<HTMLSpanElement[]>([])
  const coreWrap = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'expo.out' } })

      tl.fromTo(el.querySelector('.hero-eyebrow'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
      headLines.current.forEach((span, i) => {
        tl.fromTo(span, { yPercent: 110 }, { yPercent: 0, duration: 1.0 }, 0.2 + i * 0.09)
      })
      tl.fromTo(el.querySelector('.hero-sub'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.65)
      tl.fromTo(el.querySelector('.hero-copy'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.8)
      tl.fromTo(el.querySelector('.hero-meta'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.95)
      tl.fromTo(el.querySelector('.hero-ctas'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.05)
      tl.fromTo(el.querySelector('.hero-micro'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.2)
      tl.fromTo(coreWrap.current, { opacity: 0, scale: 1.08, filter: 'blur(10px)' }, {
        opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out'
      }, 0.3)

      tl.fromTo(el.querySelectorAll('.hud-float'), { opacity: 0 }, {
        opacity: 1, stagger: 0.1, duration: 0.4
      }, 1.0)

      if (copyRef.current) {
        gsap.to(copyRef.current, {
          y: -80, opacity: 0.2, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
      }
      gsap.to(coreWrap.current, {
        y: -30, scale: 0.95, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const lines = ['TRANSFORMAMOS', 'IDEIAS EM', 'SOFTWARE.']

  return (
    <section
      ref={root}
      className="relative min-h-svh flex items-center overflow-hidden bg-black"
      style={{ paddingTop: 96 }}
      aria-label="1stPodium — Engenharia de Software"
    >
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* Grid perspective behind */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] grid-perspective opacity-30" />
      </div>

      <div className="container-main relative z-10 grid-hero">
        {/* LEFT / copy */}
        <div ref={copyRef}>
          <p className="hero-eyebrow eyebrow opacity-0 mb-8 flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="hud-dot" />
            ENGENHARIA DE SOFTWARE / 01
          </p>

          <h1 className="text-white font-bold tracking-tighter" style={{ fontSize: 'clamp(48px,7vw,110px)', lineHeight: 0.92 }}>
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  ref={(el) => { if (el) headLines.current[i] = el }}
                  className={`block will-change-transform ${i === 2 ? 'text-stroke' : ''}`}
                >
                  {l}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 font-mono u-0-7rem track-14 text-white/35 uppercase" style={{ opacity: 0 }}>
            DO SISTEMA À ESCALA.
          </p>

          <p className="hero-copy mt-6 max-w-md text-white/60 text-body-lg leading-relaxed" style={{ opacity: 0 }}>
            Criamos sistemas, plataformas e produtos digitais sob medida — da primeira ideia à arquitetura, desenvolvimento e produção.
          </p>

          <p className="hero-meta mt-5 text-micro text-white/35 uppercase track-2 font-mono" style={{ opacity: 0 }}>
            Web &nbsp;/&nbsp; Mobile &nbsp;/&nbsp; Desktop &nbsp;/&nbsp; Backend &nbsp;/&nbsp; Automações
          </p>

          <div className="hero-ctas mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn-primary btn-magnetic" data-cursor-text="INICIAR PROJETO">
              INICIAR PROJETO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
            <Link href="/services" className="btn-secondary" data-cursor-text="CONHECER SOLUÇÕES">
              CONHECER SOLUÇÕES
            </Link>
          </div>

          <p className="hero-micro mt-8 text-white/25 u-0-72rem italic" style={{ opacity: 0 }}>
            Você traz o objetivo. Nós cuidamos da engenharia.
          </p>
        </div>

        {/* RIGHT / 3D Core */}
        <div ref={coreWrap} className="core-box relative" style={{ opacity: 0 }} aria-hidden="true">
          <SoftwareCoreCanvas className="absolute inset-0" section="hero" />

          {/* HUD labels */}
          <div className="hud-float absolute top-4 right-4 opacity-0" style={{ opacity: 0 }}>
            <span className="hud-label">CORE / ACTIVE</span>
          </div>
          <div className="hud-float absolute bottom-8 left-4 opacity-0" style={{ opacity: 0 }}>
            <span className="hud-label">SYSTEM / ONLINE</span>
          </div>
          <div className="hud-float absolute top-1/2 right-0 opacity-0" style={{ opacity: 0 }}>
            <span className="hud-label">NODE / 01</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono u-0-55rem track-25 text-white/40 uppercase">SCROLL TO EXPLORE</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
