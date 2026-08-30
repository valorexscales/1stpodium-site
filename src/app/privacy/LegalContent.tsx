'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
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
      { heading: '3. INTELLECTUAL PROPERTY', body: 'All content, designs, code, and materials on this website are the intellectual property of 1stPodium or its licensors. Client project deliverables\' ownership is defined in the project agreement.' },
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.legal-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="legal min-h-screen bg-black relative">
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto legal-content">
          <div className="mb-12">
            <span className="text-micro font-mono text-grey-100 uppercase tracking-widest">LEGAL</span>
            <h1 className="text-display font-bold tracking-tighter text-white mt-4">{data.title}</h1>
          </div>

          <div className="space-y-10 text-grey-200 leading-relaxed">
            {data.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-title font-bold tracking-tight text-white mb-4">{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <MagneticButton variant="secondary" data-cursor-text="RETURN HOME">
              <Link href="/" className="inline-flex">RETURN HOME</Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}