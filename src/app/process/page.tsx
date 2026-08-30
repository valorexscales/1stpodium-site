import { Metadata } from 'next'
import { Process } from '@/sections/Process'

export const metadata: Metadata = {
  title: 'Process',
  description: 'Our software engineering process: Discovery, Architecture, Product Design, Engineering, Quality, Deployment, and Evolution.',
}

export default function ProcessPage() {
  return (
    <Process />
  )
}