import { Metadata } from 'next'
import { LegalContent } from './LegalContent'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da 1stPodium. Como coletamos, usamos e protegemos suas informações.',
}

export default function PrivacyPage() {
  return <LegalContent type="privacy" />
}