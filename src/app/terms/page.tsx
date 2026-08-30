import { Metadata } from 'next'
import { LegalContent } from '../privacy/LegalContent'

export const metadata: Metadata = {
  title: 'Termos de Serviço',
  description: 'Termos de Serviço da 1stPodium. Termos e condições para uso do nosso site e serviços.',
}

export default function TermsPage() {
  return <LegalContent type="terms" />
}