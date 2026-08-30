'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/process', label: 'Process' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolled = currentScrollY > 100
      const hidden = currentScrollY > lastScrollY.current && currentScrollY > 200

      setIsScrolled(scrolled)
      setIsHidden(hidden)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current!,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          delay: 1.5,
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? 'bg-black/80 backdrop-blur-[20px] border-b border-white/10 py-4' : 'bg-transparent py-6'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ willChange: 'transform, background-color, border-color' }}
    >
      <div className="container-main flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-medium text-body-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
          data-cursor-text="HOME"
        >
          <span className="text-display font-bold tracking-tighter">1STPODIUM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-grey-100 font-medium text-body-sm uppercase tracking-wider hover:text-white transition-colors duration-300"
              data-cursor-text={item.label.toUpperCase()}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              {item.label}
              <span
                className="absolute bottom-[-4px] left-0 h-0.5 w-0 bg-white origin-left transition-transform duration-500 ease-out"
                style={{ transform: 'scaleX(0)' }}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="btn-primary hidden sm:inline-flex"
            data-cursor-text="START A PROJECT"
          >
            START A PROJECT
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Menu"
            data-cursor-text="MENU"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}