import { Metadata } from 'next'
import { ContactFlow } from '@/sections/ContactFlow'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with 1stPodium. Custom software engineering from architecture to deployment.',
}

export default function ContactPage() {
  return (
    <ContactFlow />
  )
}