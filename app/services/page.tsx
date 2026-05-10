import { Metadata } from "next"
import Link from "next/link"
import { NavigationHeader } from "@/components/landing/navigation-header"
import { Footer } from "@/components/shared/footer"
import { Zap, Cpu, BarChart3, Settings, Shield, Wrench, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Services | RedBox Performance",
  description: "Explore our range of performance tuning and diagnostic services - ECU tuning, AI diagnostics, and more.",
}

const services = [
  {
    icon: Zap,
    title: "ECU Tuning",
    description: "Custom engine calibrations that unlock your vehicle's hidden potential while maintaining reliability.",
    features: ["Stage 1-3 Tunes", "Custom Mapping", "Safety Validated"],
  },
  {
    icon: Cpu,
    title: "AI Diagnostics",
    description: "Advanced AI-powered fault detection that identifies issues before they become problems.",
    features: ["Full System Scan", "Predictive Analysis", "Real-Time Monitoring"],
  },
  {
    icon: BarChart3,
    title: "Performance Monitoring",
    description: "Live telemetry and data logging to track your vehicle's performance metrics.",
    features: ["15+ Parameters", "Historical Data", "Trend Analysis"],
  },
  {
    icon: Settings,
    title: "Custom Solutions",
    description: "Bespoke tuning packages tailored to your specific vehicle and performance goals.",
    features: ["Track Optimization", "Fuel Economy", "Custom Requests"],
  },
  {
    icon: Shield,
    title: "Safety Validation",
    description: "Every tune goes through rigorous testing to ensure safe operation parameters.",
    features: ["Thermal Analysis", "Knock Detection", "AFR Monitoring"],
  },
  {
    icon: Wrench,
    title: "Hardware Integration",
    description: "Support for aftermarket parts including intakes, exhausts, and turbo upgrades.",
    features: ["Part Calibration", "Boost Control", "Sensor Integration"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-medium tracking-widest text-sm mb-4 italic">
                WHAT WE OFFER
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-metallic">OUR</span>
                <br />
                <span className="text-primary italic">SERVICES</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From basic diagnostics to full performance packages, we provide comprehensive solutions for every enthusiast.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border card-glow group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us today to discuss your performance goals and find the right solution for your vehicle.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all"
            >
              CONTACT US
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
