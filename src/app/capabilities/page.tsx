import { Metadata } from 'next'
import { Capabilities } from '@/sections/Capabilities'

export const metadata: Metadata = {
  title: 'Capabilities',
  description: 'Full-stack software engineering capabilities across frontend, backend, mobile, desktop, data, infrastructure, and security.',
}

export default function CapabilitiesPage() {
  return (
    <Capabilities />
  )
}