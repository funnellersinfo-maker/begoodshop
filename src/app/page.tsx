'use client'

import { HeroSection } from '@/components/landing/hero-section'
import { CatalogSection } from '@/components/landing/catalog-section'
import { GuaranteesSection } from '@/components/landing/guarantees-section'
import { CtaFinalSection } from '@/components/landing/cta-final-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark">
      <HeroSection />
      <CatalogSection />
      <GuaranteesSection />
      <CtaFinalSection />
      <Footer />
    </div>
  )
}
