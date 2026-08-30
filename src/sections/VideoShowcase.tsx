'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const videos = [
  { src: '/videos/snapinsta-1786752292182.mp4', label: 'ENGINEERING IN MOTION', desc: 'Precision-built systems running at scale.' },
  { src: '/videos/snapinsta-1787100220223.mp4', label: 'DIGITAL ARCHITECTURE', desc: 'From concept to deployment — every layer engineered.' },
  { src: '/videos/snapinsta-1787100237021.mp4', label: 'PRODUCT IN ACTION', desc: 'Software that performs, not just functions.' },
]

export function VideoShowcase() {
  const root = useRef<HTMLElement>(null)
  const items = useRef<(HTMLDivElement | null)[]>([])
  const videosRef = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.vid-head'),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      )

      items.current.forEach((item, i) => {
        if (!item) return
        const vid = videosRef.current[i]
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.fromTo(item, { opacity: 0, y: 50, scale: 0.96 }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'expo.out',
        })

        if (vid) {
          gsap.fromTo(vid, { opacity: 0 }, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })

          const playVideo = () => { vid.play().catch(() => {}) }
          const pauseVideo = () => { vid.pause() }

          ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            end: 'bottom 10%',
            onEnter: playVideo,
            onLeave: pauseVideo,
            onEnterBack: playVideo,
            onLeaveBack: pauseVideo,
          })
        }
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative section bg-black overflow-hidden" aria-label="Video showcase">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-14">
          <p className="label vid-head" data-index="07A / SHOWCASE" style={{ opacity: 0 }}>
            IN MOTION
          </p>
          <p className="vid-head hidden lg:block text-right u-0-8rem text-white/35" style={{ opacity: 0 }}>
            Systems engineered to perform — seen in real operation.
          </p>
        </div>

        <h2 className="vid-head text-white font-bold tracking-tighter mb-16" style={{ fontSize: 'clamp(42px,5vw,80px)', lineHeight: 1.02, opacity: 0 }}>
          SEE THE
          <br />
          ENGINEERING.
        </h2>

        <div className="space-y-20">
          {videos.map((v, i) => (
            <div
              key={v.src}
              ref={(el) => { items.current[i] = el }}
              className="group relative rounded-lg overflow-hidden border hairline bg-white/[0.02]"
              style={{ opacity: 0 }}
            >
              <div className="video-container relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
                <video
                  ref={(el) => { videosRef.current[i] = el }}
                  src={v.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                  <p className="font-mono u-0-65rem track-2 text-white/50 uppercase mb-2">{v.label}</p>
                  <p className="text-white/80 text-body-lg max-w-md">{v.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
