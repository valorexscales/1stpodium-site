'use client'

import Link from 'next/link'
import Image from 'next/image'

const cols = [
  {
    title: 'NAVIGATE',
    links: [
      { href: '/services', label: 'Services' },
      { href: '/work', label: 'Work' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'CAPABILITIES',
    links: [
      { href: '/capabilities', label: 'Capabilities' },
      { href: '/process', label: 'Process' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
  {
    title: 'SOCIAL',
    links: [
      { href: 'https://github.com', label: 'GitHub', external: true },
      { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
      { href: 'https://instagram.com', label: 'Instagram', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative bg-black border-t hairline overflow-hidden">
      <div className="container-main pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Image
              src="/1STPodium.png"
              alt="1stPodium"
              width={160}
              height={58}
              className="w-auto h-auto max-h-10 object-contain mb-6"
              unoptimized
            />
            <p className="u-0-8rem track-18 text-white/40 uppercase">
              Software engineered<br />to perform.
            </p>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="u-0-65rem track-2 text-white/35 uppercase mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => {
                  const external = l.href.startsWith('http')
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="u-0-85rem text-white/60 hover:text-white transition-colors duration-300"
                        data-cursor-text={l.label.toUpperCase()}
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="divider-h mt-14" />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="u-0-75rem text-white/35">© 2026 1stPodium. All rights reserved.</p>
          <p className="u-0-75rem text-white/35">Engineered from first architecture to production.</p>
        </div>
      </div>

      {/* large clipped wordmark */}
      <div aria-hidden="true" className="pointer-events-none select-none -mb-[3vw]">
        <p className="text-center font-bold leading-none tracking-tighter text-[clamp(90px,16vw,220px)] text-white/[0.05]">
          1STPODIUM
        </p>
      </div>
    </footer>
  )
}