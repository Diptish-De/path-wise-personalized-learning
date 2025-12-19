import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

import WateryCursor from "@/components/ui/watery-cursor"

export default function Home() {
  return (
    <main className="min-h-screen bg-background landing">
      <WateryCursor />
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
