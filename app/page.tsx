import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesOverview } from "@/components/services-overview"
import { FeaturedChefs } from "@/components/featured-chefs"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesOverview />
        <FeaturedChefs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
