import { Metadata } from "next"
import { NavigationHeader } from "@/components/landing/navigation-header"
import { Footer } from "@/components/shared/footer"
import { Users, Award, Target, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | RedBox Performance",
  description: "Learn about RedBox Performance - Elite tuning and AI-powered diagnostics for automotive enthusiasts.",
}

export default function AboutPage() {
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
                OUR STORY
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-metallic">DRIVEN BY</span>
                <br />
                <span className="text-primary italic">PASSION</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded by automotive enthusiasts, RedBox Performance combines cutting-edge AI technology with decades of tuning expertise to deliver unmatched performance solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard
                icon={Target}
                title="Precision"
                description="Every tune is crafted with meticulous attention to detail and validated for safety."
              />
              <ValueCard
                icon={Award}
                title="Excellence"
                description="We pursue the highest standards in performance optimization and customer service."
              />
              <ValueCard
                icon={Users}
                title="Community"
                description="Building a global network of enthusiasts who share our passion for performance."
              />
              <ValueCard
                icon={Wrench}
                title="Innovation"
                description="Pioneering AI-powered diagnostics and real-time performance monitoring."
              />
            </div>
          </div>
        </section>

        {/* Team placeholder */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team of expert engineers and automotive specialists are dedicated to pushing the boundaries of vehicle performance.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">Team profiles coming soon</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border card-glow">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}
