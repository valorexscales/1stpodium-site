'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname, useSearchParams } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    const overlay = overlayRef.current
    const text = textRef.current

    if (!overlay || !text) return

    const tl = gsap.timeline()

    tl.to(overlay, {
      scaleY: 1,
      transformOrigin: 'bottom center',
      duration: 0.6,
      ease: 'expo.inOut',
    })
      .to(text, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'expo.out',
      }, '-=0.3')
      .to(overlay, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.6,
        ease: 'expo.inOut',
      })
      .to(text, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'expo.in',
      }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [pathname, searchParams])

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-[9998] pointer-events-none"
        style={{ transformOrigin: 'bottom center', transform: 'scaleY(0)' }}
        aria-hidden="true"
      />
      <div
        ref={textRef}
        className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
        aria-hidden="true"
      >
        <div className="text-micro font-medium text-grey-200 uppercase tracking-widest">
          {pathname.toUpperCase().replace('/', '') || 'HOME'}
        </div>
      </div>
      {children}
    </>
  )
}