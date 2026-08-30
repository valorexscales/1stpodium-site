'use client'

import { ReactNode, useRef } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export function MagneticButton({
  variant = 'primary',
  children,
  className = '',
  href,
  type = 'button',
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power3.out' })
  }
  const onLeave = () => {
    const el = ref.current
    if (el) gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power4.out' })
  }

  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`
  const extras = { onMouseMove: onMove, onMouseLeave: onLeave }

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...extras}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} disabled={disabled} onClick={onClick} className={cls} {...extras}>
      {children}
    </button>
  )
}