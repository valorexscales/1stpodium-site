'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '@/components/ui/MagneticButton'

interface LegalContentProps {
  type: 'privacy' | 'terms'
}

const content = {
  privacy: {
    title: 'PRIVACY POLICY',
    sections: [
      { heading: '1. INFORMATION WE COLLECT', body: 'We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, company name, and project details.' },
      { heading: '2. HOW WE USE YOUR INFORMATION', body: 'We use the information we collect to respond to your inquiries, provide our services, improve our website, and communicate with you about your project. We do not sell your personal information to third parties.' },
      { heading: '3. DATA RETENTION', body: 'We retain your information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.' },
      { heading: '4. SECURITY', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
      { heading: '5. YOUR RIGHTS', body: 'You have the right to access, correct, or delete your personal information. You may also object to or restrict processing of your data. Contact us at valorexscales@gmail.com to exercise these rights.' },
      { heading: '6. CHANGES TO THIS POLICY', body: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.' },
      { heading: '7. CONTACT US', body: 'If you have questions about this privacy policy, please contact us at valorexscales@gmail.com' },
    ],
  },
  terms: {
    title: 'TERMS OF SERVICE',
    sections: [
      { heading: '1. ACCEPTANCE OF TERMS', body: 'By accessing and using the 1stPodium website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.' },
      { heading: '2. SERVICES', body: '1stPodium provides custom software engineering services including web applications, mobile applications, desktop software, backend systems, authentication systems, SaaS products, and custom software development. The scope of each project is defined in a separate agreement.' },
      { heading: '3. INTELLECTUAL PROPERTY', body: 'All content, designs, code, and materials on this website are the intellectual property of 1stPodium or its licensors. Client project deliverables’ ownership is defined in the project agreement.' },
      { heading: '4. CONFIDENTIALITY', body: 'We treat all client information as confidential. We will not disclose your proprietary information, trade secrets, or project details to third parties without your written consent, except as required by law.' },
      { heading: '5. LIMITATION OF LIABILITY', body: '1stPodium shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to our services. Our total liability shall not exceed the fees paid for the specific project.' },
      { heading: '6. TERMINATION', body: 'Either party may terminate the engagement with written notice. Upon termination, you are responsible for payment of all services rendered up to the termination date.' },
      { heading: '7. GOVERNING LAW', body: 'These terms shall be governed by the laws of the jurisdiction where 1stPodium operates. Any disputes shall be resolved through binding arbitration.' },
      { heading: '8. CHANGES TO TERMS', body: 'We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.' },
      { heading: '9. CONTACT US', body: 'If you have questions about these terms, please contact us at valorexscales@gmail.com' },
    ],
  },
}

export function LegalContent({ type }: LegalContentProps) {
  const data = content[type]
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.legal-fade'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out' }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="min-h-screen bg-black relative">
      <div className="bg-env" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container-main relative z-10 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="legal-fade font-mono u-0-7rem track-3 text-white/30" style={{ opacity: 0 }}>LEGAL</p>
          <h1 className="legal-fade text-white font-bold tracking-tighter mt-4" style={{ fontSize: 'clamp(38px,5vw,64px)', opacity: 0 }}>
            {data.title}
          </h1>

          <div className="mt-12 space-y-12">
            {data.sections.map((s) => (
              <section key={s.heading} className="legal-fade" style={{ opacity: 0 }}>
                <h2 className="text-white font-medium tracking-tight" style={{ fontSize: 'clamp(20px,2vw,28px)' }}>{s.heading}</h2>
                <p className="mt-3 text-white/60 text-body leading-relaxed max-w-2xl">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <MagneticButton variant="secondary" href="/" data-cursor-text="RETURN HOME">
              RETURN HOME
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}