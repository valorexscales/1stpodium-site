import { Metadata } from 'next'
import { Work } from '@/sections/Work'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected work and case studies from 1stPodium. Custom software engineering projects across fintech, healthtech, logistics, and e-commerce.',
}

export default function WorkPage() {
  return (
    <Work />
  )
}