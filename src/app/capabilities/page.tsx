import { Metadata } from 'next'
import { Capabilities } from '@/sections/Capabilities'

export const metadata: Metadata = {
  title: 'Tecnologias',
  description: 'Capacidades full-stack: frontend, backend, mobile, desktop, dados, infraestrutura e segurança.',
}

export default function CapabilitiesPage() {
  return (
    <Capabilities />
  )
}