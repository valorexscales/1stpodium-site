import { Metadata } from 'next'
import { LegalContent } from '../privacy/LegalContent'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: '1stPodium Terms of Service. Terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return <LegalContent type="terms" />
}