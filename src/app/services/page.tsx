import { Metadata } from 'next'
import { Services } from '@/sections/Services'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Custom software engineering services. Web applications, mobile apps, desktop software, backend systems, authentication, SaaS products, and custom digital products.',
}

export default function ServicesPage() {
  return (
    <Services />
  )
}