import { NavigationHeader } from "@/components/landing/navigation-header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesStrip } from "@/components/landing/features-strip"
import { FeatureCards } from "@/components/landing/feature-cards"
import { StatsBar } from "@/components/landing/stats-bar"
import { Footer } from "@/components/shared/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <FeaturesStrip />
        <FeatureCards />
        <StatsBar />
      </main>
      <Footer />
    </div>
  )
}
