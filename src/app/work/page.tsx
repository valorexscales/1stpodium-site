import { Metadata } from 'next'
import { Work } from '@/sections/Work'

export const metadata: Metadata = {
  title: 'Cases',
  description: 'Projetos e cases da 1stPodium. Engenharia de software personalizada.',
}

export default function WorkPage() {
  return (
    <Work />
  )
}