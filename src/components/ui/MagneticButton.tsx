'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { clsx } from 'clsx'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  arrow?: boolean
  magnetic?: boolean
}

export function MagneticButton({
  children,
  variant = 'primary',
  arrow = true,
  magnetic = true,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const boundsRef = useRef<DOMRect>()

  useEffect(() => {
    if (!magnetic || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const button = buttonRef.current
    const arrowEl = arrowRef.current
    const contentEl = contentRef.current

    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      boundsRef.current = button.getBoundingClientRect()
      const x = e.clientX - boundsRef.current.left - boundsRef.current.width / 2
      const y = e.clientY - boundsRef.current.top - boundsRef.current.height / 2

      gsap.to([arrowEl, contentEl], {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'expo.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to([arrowEl, contentEl], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magnetic])

  const baseStyles = `
    relative inline-flex items-center gap-3 px-8 py-4 font-medium text-body-sm uppercase tracking-wider
    overflow-hidden transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
  `

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-grey-300 active:scale-[0.98]',
    secondary: 'bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5 active:scale-[0.98]',
  }

  return (
    <button
      ref={buttonRef}
      className={clsx(baseStyles, variantStyles[variant], className)}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-cursor-text={typeof children === 'string' ? children : 'BUTTON'}
      {...props}
    >
      <span ref={contentRef} className="relative z-10 flex items-center gap-3" style={{ willChange: 'transform' }}>
        {children}
        {arrow && (
          <span
            ref={arrowRef}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 transition-transform duration-300"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </span>

      <span
        className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
    </button>
  )
}