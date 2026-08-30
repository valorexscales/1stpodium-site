'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx } from 'clsx'

interface RevealTextProps {
  children: React.ReactNode
  type?: 'lines' | 'words' | 'chars' | 'mask' | 'blur'
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  trigger?: string | Element
  start?: string
  once?: boolean
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'
  id?: string
}

export function RevealText({
  children,
  type = 'lines',
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.08,
  trigger,
  start = 'top 85%',
  once = true,
  as = 'div',
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<gsap.Context>()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.style.opacity = '1'
      return
    }

    ctxRef.current = gsap.context(() => {
      const splitType = type

      let targets: Element[]

      if (splitType === 'lines') {
        targets = Array.from(element.querySelectorAll('.reveal-line')) || [element]
      } else if (splitType === 'words') {
        targets = Array.from(element.querySelectorAll('.reveal-word')) || [element]
      } else if (splitType === 'chars') {
        targets = Array.from(element.querySelectorAll('.reveal-char')) || [element]
      } else {
        targets = [element]
      }

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: splitType === 'mask' ? '100%' : 30,
          filter: splitType === 'blur' ? 'blur(20px)' : 'none',
          clipPath: splitType === 'mask' ? 'inset(100% 0 0 0)' : 'none',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          clipPath: 'inset(0 0 0 0)',
          duration,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: trigger || element,
            start,
            toggleActions: once ? 'play none none reverse' : 'play reverse play reverse',
            once,
          },
        }
      )
    }, element)

    return () => ctxRef.current?.revert()
  }, [type, delay, duration, stagger, trigger, start, once])

  const processChildren = (nodes: React.ReactNode): React.ReactNode[] => {
    const result: React.ReactNode[] = []
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) {
        if (child != null) result.push(child)
        return
      }

      if (type === 'lines' && typeof child.props.children === 'string') {
        result.push(
          <div className="reveal-line overflow-hidden" key={Math.random()}>
            <span className="block">{child.props.children}</span>
          </div>
        )
        return
      }

      if (type === 'words' && typeof child.props.children === 'string') {
        const words = child.props.children.split(' ')
        result.push(
          <span className="inline-block" key={Math.random()}>
            {words.map((word: string, i: number) => (
              <span key={i} className="reveal-word inline-block overflow-hidden" style={{ display: 'inline-block' }}>
                <span className="inline-block">{word}</span>
                {i < words.length - 1 && <span className="inline-block"> </span>}
              </span>
            ))}
          </span>
        )
        return
      }

      if (type === 'chars' && typeof child.props.children === 'string') {
        const chars = child.props.children.split('')
        result.push(
          <span className="inline-block" key={Math.random()}>
            {chars.map((char: string, i: number) => (
              <span key={i} className="reveal-char inline-block overflow-hidden" style={{ display: 'inline-block' }}>
                <span className="inline-block">{char === ' ' ? ' ' : char}</span>
              </span>
            ))}
          </span>
        )
        return
      }

      result.push(React.cloneElement(child, {}, processChildren(child.props.children)))
    })
    return result
  }

  const Component = as
  const processedChildren = processChildren(children)

  return (
    <Component ref={ref} className={clsx(className)}>
      {processedChildren}
    </Component>
  )
}

interface SplitTextProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function SplitText({ children, className = '', as = 'div' }: SplitTextProps) {
  const Component = as
  return (
    <Component className={className}>
      {typeof children === 'string'
        ? children.split('\n').map((line, i) => (
            <div key={i} className="reveal-line overflow-hidden">
              <span className="block">{line}</span>
            </div>
          ))
        : children}
    </Component>
  )
}