import { Metadata } from 'next'
import { Process } from '@/sections/Process'

export const metadata: Metadata = {
  title: 'Processo',
  description: 'Nosso processo de engenharia: Entendimento, Arquitetura, Experiência, Desenvolvimento, Qualidade, Lançamento e Evolução.',
}

export default function ProcessPage() {
  return (
    <Process />
  )
}