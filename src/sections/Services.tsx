'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { SoftwareCoreCanvas } from '@/components/webgl/SoftwareCore'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'web-applications',
    index: '01',
    title: 'WEB APPLICATIONS',
    description: 'Full-stack web applications built with modern architectures. From dashboards to complex platforms.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    icon: 'web',
  },
  {
    id: 'mobile-applications',
    index: '02',
    title: 'MOBILE APPLICATIONS',
    description: 'Native and cross-platform mobile apps for iOS and Android. Performance-first approach.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    icon: 'mobile',
  },
  {
    id: 'desktop-software',
    index: '03',
    title: 'DESKTOP SOFTWARE',
    description: 'Cross-platform desktop applications. Electron, Tauri, and native solutions for Windows, macOS, Linux.',
    technologies: ['Electron', 'Tauri', 'C++', 'Rust', '.NET'],
    icon: 'desktop',
  },
  {
    id: 'backend-api',
    index: '04',
    title: 'BACKEND & APIs',
    description: 'Scalable backend systems, REST APIs, GraphQL, real-time systems, microservices architecture.',
    technologies: ['Node.js', 'Java', 'Spring Boot', 'Python', 'Go', 'PostgreSQL'],
    icon: 'backend',
  },
  {
    id: 'authentication',
    index: '05',
    title: 'AUTHENTICATION & IDENTITY',
    description: 'Enterprise-grade auth systems. OAuth 2.0, OpenID Connect, SSO, JWT, MFA, RBAC, passwordless.',
    technologies: ['OAuth 2.0', 'OIDC', 'JWT', 'Keycloak', 'Auth0', 'Custom'],
    icon: 'auth',
  },
  {
    id: 'saas-products',
    index: '06',
    title: 'SAAS PRODUCTS',
    description: 'End-to-end SaaS development. Multi-tenancy, billing, subscriptions, admin panels, analytics.',
    technologies: ['Stripe', 'PostgreSQL', 'Redis', 'Next.js', 'AWS', 'Vercel'],
    icon: 'saas',
  },
  {
    id: 'automation',
    index: '07',
    title: 'AUTOMATION & INTEGRATIONS',
    description: 'Workflow automation, third-party integrations, webhooks, ETL pipelines, business process automation.',
    technologies: ['n8n', 'Zapier', 'Custom', 'Webhooks', 'Message Queues', 'Event-Driven'],
    icon: 'automation',
  },
  {
    id: 'custom-software',
    index: '08',
    title: 'CUSTOM SOFTWARE',
    description: 'Any custom software requirement. Legacy modernization, unique business logic, specialized systems.',
    technologies: ['Any Stack', 'Architecture First', 'Tailored Solutions', 'Long-term Partnership'],
    icon: 'custom',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeService, setActiveService] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const serviceRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !isDesktop) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=3000',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const serviceIndex = Math.min(Math.floor(progress * services.length), services.length - 1)
          const currentService = services[serviceIndex].id
          if (currentService !== activeService) {
            setActiveService(currentService)
          }
        },
      })

      gsap.fromTo(
        '.services-headline .reveal-line',
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
    }, section)

    return () => ctx.revert()
  }, [isDesktop, activeService])

  return (
    <section
      ref={sectionRef}
      className="services relative bg-black border-t border-white/10"
      aria-labelledby="services-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10">
        <RevealText as="h2" id="services-heading" type="lines" className="services-headline mb-16 lg:mb-24" stagger={0.12} duration={1}>
          <span className="text-display font-bold tracking-tighter text-white">WHAT WE</span>
          <span className="text-display font-bold tracking-tighter text-white">BUILD</span>
        </RevealText>

        {isDesktop ? (
          <div className="grid grid-cols-[320px_1fr] gap-12 lg:gap-16">
            <div className="sticky top-32 lg:top-40 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={clsx(
                    'service-nav-item relative group cursor-pointer transition-all duration-500 ease-out',
                    activeService === service.id ? 'active' : ''
                  )}
                  onMouseEnter={() => setActiveService(service.id)}
                  onClick={() => {
                    document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  data-cursor-text={service.title}
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-micro font-mono text-grey-100 uppercase tracking-wider transition-colors group-hover:text-white">
                      {service.index}
                    </span>
                    <RevealText as="h3" type="words" className="text-title font-bold tracking-tight text-white group-hover:text-white transition-colors" stagger={0.05} duration={0.6}>
                      <span>{service.title}</span>
                    </RevealText>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/20 transition-all duration-500 ease-out origin-top"
                    style={{
                      transform: activeService === service.id
                        ? 'translateY(-50%) scaleY(1)'
                        : 'translateY(-50%) scaleY(0)',
                      transformOrigin: activeService === service.id ? 'center' : 'top',
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="relative min-h-[calc(100vh-8rem)]">
              <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <SoftwareCoreCanvas section="services" className="w-full h-full" />
              </div>

              <div className="relative z-10 space-y-8 pb-20">
                {services.map((service, index) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    index={index}
                    isActive={activeService === service.id}
                    ref={(el) => { if (el) serviceRefs.current[index] = el }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8 pb-20">
            {services.map((service, index) => (
              <ServiceRow key={service.id} service={service} index={index} isActive={false} ref={(el) => { if (el) serviceRefs.current[index] = el }} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

interface ServiceRowProps {
  service: typeof services[0]
  index: number
  isActive: boolean
  ref?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>
}

function ServiceRow({ service, index, isActive, ref }: ServiceRowProps) {
  const rowRef = { current: null as HTMLDivElement | null }
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!rowRef.current) return

    const ctx = gsap.context(() => {
      if (isActive) {
        gsap.fromTo(
          rowRef.current!,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
        )
      }
    }, rowRef.current)

    return () => ctx.revert()
  }, [isActive])

  const combinedRef = (el: HTMLDivElement | null) => {
    rowRef.current = el
    if (ref && typeof ref === 'function') {
      ref(el)
    }
  }

  return (
    <div
      ref={combinedRef}
      id={service.id}
      className={clsx(
        'service-row relative group overflow-hidden rounded-xl transition-all duration-500 ease-out',
        'bg-black border border-white/10',
        'hover:bg-black-100 hover:border-white/20',
        isHovered && 'bg-black-100 border-white/20',
        isActive && 'ring-1 ring-white/10'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-text={service.title}
      style={{ willChange: 'transform, background-color, border-color' }}
    >
      <div className="relative flex items-center justify-between p-6 lg:p-8 transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'translateX(16px)' : 'translateX(0)',
        }}
      >
        <div className="flex items-baseline gap-4 flex-1 min-w-0">
          <span className="text-micro font-mono text-grey-100 uppercase tracking-wider shrink-0">
            {service.index}
          </span>
          <h3 className="text-title font-bold tracking-tight text-white truncate">
            {service.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-8">
          <div className="hidden md:flex items-center gap-2 text-micro font-medium text-grey-100 uppercase tracking-wider">
            {service.technologies.slice(0, 3).map((tech, i) => (
              <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[0.65rem]">
                {tech}
              </span>
            ))}
            {service.technologies.length > 3 && (
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[0.65rem] text-grey-100">
                +{service.technologies.length - 3}
              </span>
            )}
          </div>

          <MagneticButton variant="secondary" arrow={false} className="hidden md:inline-flex">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      <div className="service-preview absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 opacity-0 transition-all duration-700 ease-out pointer-events-none"
        style={{
          transform: isHovered
            ? 'translateY(-50%) translateX(-20px) scale(1)'
            : 'translateY(-50%) translateX(0) scale(0.8)',
          opacity: isHovered ? 1 : 0,
          width: isHovered ? '300px' : '0',
          height: isHovered ? '200px' : '0',
        }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-black-100 border border-white/10 rounded-lg p-4 flex items-center justify-center">
          <ServicePreviewIcon type={service.icon} />
        </div>
      </div>
    </div>
  )
}

function ServicePreviewIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    web: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    mobile: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    desktop: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <rect x="2" y="17" width="20" height="4" rx="1" />
        <path d="M6 17v4M18 17v4" />
      </svg>
    ),
    backend: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <path d="M4 4h16M4 12h16M4 20h16" />
        <path d="M8 4v16M16 4v16" />
      </svg>
    ),
    auth: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 10v6M9 13h6" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    saas: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="3" fill="none" strokeWidth="1.5" />
      </svg>
    ),
    automation: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    custom: (
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
        <path d="M12 3L2 7v10l10 4 10-4V7L12 3z" />
        <path d="M2 7l10 4 10-4M2 17l10-4 10 4" />
      </svg>
    ),
  }

  return icons[type] || icons.custom
}