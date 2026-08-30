'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'

const navItems = [
  { href: '/services', label: 'SERVIÇOS' },
  { href: '/capabilities', label: 'CAPACIDADES' },
  { href: '/process', label: 'PROCESSO' },
  { href: '/work', label: 'CASES' },
  { href: '/about', label: 'SOBRE' },
]

export function Header() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(lastY.current < y && y > 320)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 1.2 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'bg-black/85 backdrop-blur-xl border-b hairline' : 'bg-transparent border-b border-transparent'}`}
      style={{ height: scrolled ? 72 : 84 }}
    >
      <div className="container-main h-full flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="1stPodium — home" data-cursor-text="HOME">
          <span className="flex items-center">
            <Image
              src="/1STPodium.png"
              alt="1stPodium"
              width={scrolled ? 112 : 128}
              height={scrolled ? 40 : 46}
              className="w-auto h-auto max-h-10 object-contain"
              priority
              unoptimized
            />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group u-0-72rem track-16 text-white/50 hover:text-white transition-colors duration-300"
              data-cursor-text={item.label}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <Link href="/contact" className="btn-primary !py-3 !px-6" data-cursor-text="INICIAR PROJETO">
            INICIAR PROJETO
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </nav>

        <button
          className="lg:hidden p-2"
          aria-label="Abrir menu"
          data-cursor-text="MENU"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  )
}
