'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/MagneticButton'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'project-001',
    title: 'PRIVATE',
    subtitle: 'COMING SOON',
    year: '2026',
    industry: 'FINTECH',
    services: ['Backend & APIs', 'Authentication', 'SaaS Products'],
    technologies: ['Node.js', 'PostgreSQL', 'React', 'Docker'],
    description: 'Enterprise payment processing platform with real-time settlement.',
    cover: null,
  },
  {
    id: 'project-002',
    title: 'PRIVATE',
    subtitle: 'COMING SOON',
    year: '2026',
    industry: 'HEALTHTECH',
    services: ['Web Applications', 'Mobile Applications', 'Backend & APIs'],
    technologies: ['React Native', 'Next.js', 'TypeScript', 'AWS'],
    description: 'Patient management system with telemedicine integration.',
    cover: null,
  },
  {
    id: 'project-003',
    title: 'PRIVATE',
    subtitle: 'COMING SOON',
    year: '2025',
    industry: 'LOGISTICS',
    services: ['Desktop Software', 'Automation', 'Custom Software'],
    technologies: ['Electron', 'Python', 'Rust', 'Redis'],
    description: 'Fleet management and route optimization desktop suite.',
    cover: null,
  },
  {
    id: 'project-004',
    title: 'PRIVATE',
    subtitle: 'COMING SOON',
    year: '2025',
    industry: 'E-COMMERCE',
    services: ['SaaS Products', 'Web Applications', 'Authentication'],
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
    description: 'Multi-vendor marketplace with automated vendor onboarding.',
    cover: null,
  },
]

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-headline .reveal-line',
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
        '.work-project',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.work-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.work-project', {
            x: (progress - 0.5) * 60,
            duration: 0.5,
            ease: 'none',
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={sectionRef}
      className="work relative bg-black border-t border-white/10"
      onMouseMove={handleMouseMove}
      aria-labelledby="work-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <RevealText as="h2" id="work-heading" type="lines" className="work-headline mb-16 lg:mb-24" stagger={0.12} duration={1}>
          <span className="text-display font-bold tracking-tighter text-white">SELECTED</span>
          <span className="text-display font-bold tracking-tighter text-white">WORK</span>
        </RevealText>

        <div className="work-grid space-y-8 lg:space-y-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
              mousePosition={mousePosition}
            />
          ))}
        </div>

        <div className="mt-24 text-center">
          <RevealText as="p" type="lines" className="text-body text-grey-100 mb-8" stagger={0.1} duration={0.8}>
            <span>Case studies are confidential. Detailed architecture reviews available under NDA.</span>
          </RevealText>
          <MagneticButton variant="secondary" data-cursor-text="CONTACT US">
            <Link href="/contact" className="inline-flex">
              DISCUSS A PROJECT
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  mousePosition: { x: number; y: number }
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, mousePosition }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const handleMove = (e: MouseEvent) => {
      if (!isHovered) return
      const rect = cardRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(cardRef.current!.querySelector('.project-image'), {
        x: x * 0.05,
        y: y * 0.05,
        duration: 0.4,
        ease: 'expo.out',
      })

      gsap.to(cardRef.current!.querySelector('.project-content'), {
        x: -x * 0.03,
        y: -y * 0.03,
        duration: 0.4,
        ease: 'expo.out',
      })
    }

    cardRef.current.addEventListener('mousemove', handleMove)
    return () => cardRef.current?.removeEventListener('mousemove', handleMove)
  }, [isHovered])

  return (
    <div
      ref={cardRef}
      className="work-project relative group overflow-hidden rounded-2xl bg-black border border-white/10 transition-all duration-500 hover:border-white/20"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor-text={isHovered ? 'VIEW CASE' : project.title}
      style={{ willChange: 'transform, border-color' }}
    >
      <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
        <div
          className="project-image absolute inset-0 bg-gradient-to-br from-white/5 via-black to-white/5 transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6M9 15h6M9 12h4" />
            </svg>
          </div>
          {project.cover && (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
          <MagneticButton variant="primary" className="w-full justify-center" data-cursor-text="VIEW CASE">
            <Link href={`/work/${project.id}`}>
              VIEW CASE STUDY
            </Link>
          </MagneticButton>
        </div>
      </div>

      <div className="project-content p-6 lg:p-8 relative z-10 transition-all duration-500 ease-out">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-micro font-mono text-grey-100 uppercase tracking-wider">
            PROJECT / {String(index + 1).padStart(3, '0')}
          </span>
          <span className="px-2 py-1 text-[0.6rem] font-medium text-grey-100 bg-white/5 border border-white/10 rounded uppercase tracking-wider">
            {project.year}
          </span>
        </div>

        <h3 className="text-title font-bold tracking-tight text-white mb-2">
          {project.title}
          {project.subtitle && <span className="text-grey-100 font-normal ml-2">{project.subtitle}</span>}
        </h3>

        <p className="text-body text-grey-100 mb-6 leading-relaxed max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.services.slice(0, 3).map((service) => (
            <span key={service} className="px-3 py-1 text-small font-medium text-grey-100 bg-white/5 border border-white/10 rounded">
              {service}
            </span>
          ))}
          {project.services.length > 3 && (
            <span className="px-3 py-1 text-small font-medium text-grey-100 bg-white/5 border border-white/10 rounded text-grey-200">
              +{project.services.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
    </div>
  )
}