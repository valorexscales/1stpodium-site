'use client'

import Link from 'next/link'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const footerLinks = {
  navigate: [
    { href: '/services', label: 'Services' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
  social: [
    { href: 'https://github.com', label: 'GitHub', external: true },
    { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
    { href: 'https://instagram.com', label: 'Instagram', external: true },
  ],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current!,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-black border-t border-white/10">
      <div className="container-main py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="block mb-6" data-cursor-text="HOME">
              <span className="text-display font-bold tracking-tighter">1STPODIUM</span>
            </Link>
            <p className="text-grey-100 text-body-lg max-w-xs leading-relaxed">
              SOFTWARE ENGINEERED TO PERFORM.
            </p>
          </div>

          <nav aria-label="Navigation">
            <h3 className="text-micro font-medium text-grey-200 mb-4 tracking-wider">NAVIGATE</h3>
            <ul className="space-y-3">
              {footerLinks.navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-grey-100 hover:text-white transition-colors duration-300 text-body-sm uppercase tracking-wider"
                    data-cursor-text={link.label.toUpperCase()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-micro font-medium text-grey-200 mb-4 tracking-wider">LEGAL</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-grey-100 hover:text-white transition-colors duration-300 text-body-sm uppercase tracking-wider"
                    data-cursor-text={link.label.toUpperCase()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-micro font-medium text-grey-200 mb-4 tracking-wider">CONNECT</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-grey-100 hover:text-white transition-colors duration-300 text-body-sm uppercase tracking-wider flex items-center gap-2"
                    data-cursor-text={link.label.toUpperCase()}
                  >
                    {link.label}
                    {link.external && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-grey-100 text-small">
            © 2026 1stPodium. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <span className="text-grey-100 text-small">valorexscales@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="text-display lg:text-hero font-bold tracking-tighter text-white/5 uppercase select-none" style={{ lineHeight: '0.8' }}>
          1STPODIUM
        </div>
      </div>
    </footer>
  )
}