'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface CursorPosition {
  x: number
  y: number
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const animationRef = useRef<number>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouch) return

    const cursor = cursorRef.current
    const cursorInner = cursorInnerRef.current

    if (!cursor || !cursorInner) return

    setIsVisible(true)

    const updatePosition = () => {
      const dx = targetPosition.x - position.x
      const dy = targetPosition.y - position.y

      const newX = position.x + dx * 0.15
      const newY = position.y + dy * 0.15

      setPosition({ x: newX, y: newY })

      if (cursor) {
        cursor.style.transform = `translate(${newX}px, ${newY}px)`
      }

      animationRef.current = requestAnimationFrame(updatePosition)
    }

    animationRef.current = requestAnimationFrame(updatePosition)

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)

    const handleInteractiveEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const text = target.getAttribute('data-cursor-text')
      if (text) {
        setCursorText(text)
        setIsInteractive(true)
      }
    }

    const handleInteractiveLeave = () => {
      setIsInteractive(false)
      setCursorText('')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleInteractiveEnter)
    document.addEventListener('mouseout', handleInteractiveLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleInteractiveEnter)
      document.removeEventListener('mouseout', handleInteractiveLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [position, targetPosition])

  if (typeof window === 'undefined') return null

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  if (prefersReducedMotion || isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 select-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        willChange: 'transform, opacity',
      }}
      aria-hidden="true"
    >
      <div
        ref={cursorInnerRef}
        className="relative w-1.5 h-1.5 rounded-full bg-white/80 mix-blend-difference"
        style={{
          transform: isInteractive ? 'scale(4)' : isDragging ? 'scale(2.5)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {isInteractive && (
          <span
            ref={cursorTextRef}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap text-micro font-medium text-white/70 opacity-0"
            style={{
              opacity: isInteractive ? 1 : 0,
              transition: 'opacity 0.2s ease-out, transform 0.3s ease-out',
              transform: isInteractive ? 'translateX(0)' : 'translateX(10px)',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>

      {isInteractive && (
        <div
          className="absolute -top-3 -left-3 w-10 h-10 rounded-full border border-white/20"
          style={{
            transform: 'scale(4)',
            animation: 'pulseSubtle 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
  )
}