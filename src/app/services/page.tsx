import { Metadata } from 'next'
import { Services } from '@/sections/Services'

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Serviços de engenharia de software sob medida. Aplicações web, mobile, desktop, SaaS, backends, APIs e sistemas personalizados.',
}

export default function ServicesPage() {
  return (
    <Services />
  )
}