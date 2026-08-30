import { Hero } from '@/sections/Hero'
import { Intro } from '@/sections/Intro'
import { Services } from '@/sections/Services'
import { Capabilities } from '@/sections/Capabilities'
import { Process } from '@/sections/Process'
import { EngineeringPrinciples } from '@/sections/EngineeringPrinciples'
import { CodeMoment } from '@/sections/CodeMoment'
import { Work } from '@/sections/Work'
import { About } from '@/sections/About'
import { FinalCTA } from '@/sections/FinalCTA'
import { ContactFlow } from '@/sections/ContactFlow'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Capabilities />
      <Process />
      <EngineeringPrinciples />
      <CodeMoment />
      <Work />
      <About />
      <FinalCTA />
      <ContactFlow />
    </>
  )
}