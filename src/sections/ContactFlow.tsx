'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { clsx } from 'clsx'

gsap.registerPlugin(ScrollTrigger)

interface SelectField {
  name: string
  label: string
  type: 'select'
  required: boolean
  options: string[]
}

interface TextField {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
  placeholder: string
}

type Field = SelectField | TextField

interface Step {
  id: string
  title: string
  fields: Field[]
}

const steps: Step[] = [
  {
    id: 'what',
    title: 'WHAT ARE WE BUILDING?',
    fields: [
      { name: 'type', label: 'Project Type', type: 'select', required: true, options: [
        'Web Application',
        'Mobile Application',
        'Desktop Software',
        'SaaS Product',
        'Backend / API',
        'Authentication System',
        'Automation & Integrations',
        'Custom Software',
        'Other',
      ]},
    ],
  },
  {
    id: 'stage',
    title: 'PROJECT STAGE',
    fields: [
      { name: 'stage', label: 'Current Stage', type: 'select', required: true, options: [
        'Idea / Concept',
        'Planning / Specification',
        'Existing Product (Scaling)',
        'Existing Product (Rebuild / Modernization)',
        'MVP Development',
      ]},
    ],
  },
  {
    id: 'budget',
    title: 'BUDGET RANGE',
    fields: [
      { name: 'budget', label: 'Investment Range', type: 'select', required: true, options: [
        'Under $1,000',
        '$1,000 – $5,000',
        '$5,000 – $10,000',
        '$10,000 – $25,000',
        '$25,000 – $50,000',
        '$50,000+',
        "Let's discuss",
      ]},
    ],
  },
  {
    id: 'details',
    title: 'PROJECT DETAILS',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Your name' },
      { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@company.com' },
      { name: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Company name (optional)' },
      { name: 'description', label: 'Project Description', type: 'textarea', required: true, placeholder: 'Describe your project, goals, timeline, and any specific requirements...' },
    ],
  },
]

export function ContactFlow() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const stepRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-headline .reveal-line',
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
        '.contact-progress',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-progress',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex]
    const newErrors: Record<string, string> = {}

    step.fields.forEach((field) => {
      const value = formData[field.name]?.trim()
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`
      }
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = 'Invalid email address'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)

      if (stepRefs.current[nextStep]) {
        gsap.fromTo(
          stepRefs.current[nextStep],
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
        )
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In production, integrate with your backend:
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

    setSubmitStatus('success')
    setIsSubmitting(false)

    // Reset after delay
    setTimeout(() => {
      setCurrentStep(0)
      setFormData({})
      setSubmitStatus('idle')
    }, 5000)
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  if (submitStatus === 'success') {
    return (
      <section
        ref={sectionRef}
        className="contact relative min-h-screen flex items-center justify-center bg-black border-t border-white/10"
        aria-labelledby="contact-heading"
      >
        <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
        <div className="absolute inset-0 radial-glow" aria-hidden="true" />

        <div className="container-main relative z-10 py-20 lg:py-32 text-center">
          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <RevealText as="h2" type="lines" className="text-display font-bold tracking-tighter text-white mb-4" stagger={0.12} duration={1}>
                <span>PROJECT</span>
                <span>RECEIVED.</span>
              </RevealText>
              <RevealText as="p" type="lines" className="text-body-lg text-grey-200 leading-relaxed" stagger={0.1} duration={0.8}>
                <span>We'll review your inquiry and be in touch within 24 hours.</span>
              </RevealText>
            </div>

            <MagneticButton variant="secondary" onClick={() => { setSubmitStatus('idle'); setCurrentStep(0); setFormData({}) }} data-cursor-text="BACK HOME">
              <a href="/">RETURN HOME</a>
            </MagneticButton>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="contact relative bg-black border-t border-white/10"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 grain grain-subtle" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <RevealText as="h2" id="contact-heading" type="lines" className="contact-headline mb-16 lg:mb-24 max-w-2xl" stagger={0.12} duration={1}>
          <span className="text-display font-bold tracking-tighter text-white">START A</span>
          <span className="text-display font-bold tracking-tighter text-white">PROJECT</span>
        </RevealText>

        <div className="contact-progress mb-12 lg:mb-16">
          <div className="flex items-center gap-4 mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-micro font-bold transition-all duration-500',
                    index < currentStep ? 'bg-white text-black' : index === currentStep ? 'bg-white/10 border border-white/20 text-white' : 'bg-white/5 border border-white/10 text-grey-100'
                  )}
                >
                  {index < currentStep ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    String(index + 1)
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={clsx(
                      'hidden lg:block h-px w-20 transition-all duration-500',
                      index < currentStep ? 'bg-white' : 'bg-white/10'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-micro font-medium text-grey-100 uppercase tracking-wider mt-4 text-center">
            STEP {currentStep + 1} OF {steps.length} — {currentStepData.title}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" noValidate>
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { if (el) stepRefs.current[index] = el }}
              className={clsx('contact-step', index === currentStep ? 'block' : 'hidden')}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="space-y-6">
                {step.fields.map((field) => (
                  <div key={field.name} className="relative">
                    <label htmlFor={field.name} className="block text-micro font-medium text-grey-100 uppercase tracking-wider mb-3">
                      {field.label}
                    </label>

                    {field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={clsx(
                          'w-full px-6 py-4 bg-black border rounded-lg text-white text-body placeholder-grey-100',
                          'focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent',
                          'transition-all duration-300',
                          errors[field.name] ? 'border-white/50' : 'border-white/10 hover:border-white/20'
                        )}
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                        required={field.required}
                      >
                        <option value="" disabled>Select an option</option>
                        {field.options.map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={6}
                        className={clsx(
                          'w-full px-6 py-4 bg-black border rounded-lg text-white text-body placeholder-grey-100 resize-none',
                          'focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent',
                          'transition-all duration-300',
                          errors[field.name] ? 'border-white/50' : 'border-white/10 hover:border-white/20'
                        )}
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                        required={field.required}
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={clsx(
                          'w-full px-6 py-4 bg-black border rounded-lg text-white text-body placeholder-grey-100',
                          'focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent',
                          'transition-all duration-300',
                          errors[field.name] ? 'border-white/50' : 'border-white/10 hover:border-white/20'
                        )}
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                        required={field.required}
                      />
                    )}

                    {errors[field.name] && (
                      <p id={`${field.name}-error`} className="mt-2 text-small text-red-400" role="alert">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
                {index > 0 && (
                  <MagneticButton variant="secondary" type="button" onClick={handleBack} data-cursor-text="BACK">
                    BACK
                  </MagneticButton>
                )}

                <div className="flex items-center gap-4">
                  {index < steps.length - 1 ? (
                    <MagneticButton variant="primary" type="button" onClick={handleNext} disabled={isSubmitting} data-cursor-text="NEXT">
                      NEXT
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </MagneticButton>
                  ) : (
                    <MagneticButton variant="primary" type="submit" disabled={isSubmitting} data-cursor-text="SUBMIT">
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT PROJECT'}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </MagneticButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </section>
  )
}