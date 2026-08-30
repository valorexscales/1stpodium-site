import { Metadata } from 'next'
import { LegalContent } from './LegalContent'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: '1stPodium Privacy Policy. How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return <LegalContent type="privacy" />
}