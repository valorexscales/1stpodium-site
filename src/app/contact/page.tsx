import { Metadata } from 'next'
import { ContactFlow } from '@/sections/ContactFlow'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Inicie um projeto com a 1stPodium. Engenharia de software completa da arquitetura à produção.',
}

export default function ContactPage() {
  return (
    <ContactFlow />
  )
}