import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Features from '@/components/sections/Features'
import Studios from '@/components/sections/Studios'
import HowItWorks from '@/components/sections/HowItWorks'
import PricingPreview from '@/components/sections/PricingPreview'
import { FAQPreview, CTA } from '@/components/sections/FAQAndCTA'

export const metadata: Metadata = {
  title: 'سعوديو — أول استوديو سعودي ذكي لتصوير منتجات المتاجر الإلكترونية',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Studios />
      <HowItWorks />
      <PricingPreview />
      <FAQPreview />
      <CTA />
    </>
  )
}
