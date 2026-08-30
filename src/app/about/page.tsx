import { Metadata } from 'next'
import { About } from '@/sections/About'

export const metadata: Metadata = {
  title: 'About',
  description: 'About 1stPodium. A software engineering company combining product thinking, engineering excellence, and modern technology.',
}

export default function AboutPage() {
  return (
    <About />
  )
}