import { Metadata } from 'next'
import { About } from '@/sections/About'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Sobre a 1stPodium. Empresa de engenharia de software combinando pensamento de produto, excelência técnica e tecnologia moderna.',
}

export default function AboutPage() {
  return (
    <About />
  )
}