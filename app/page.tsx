import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Gauge,
  Shield,
  Zap,
  Activity,
  Smartphone,
  Car,
  ArrowRight,
  Check,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Image
            src="/images/redbox-logo.jpeg"
            alt="RedBox Performance"
            width={140}
            height={50}
            className="object-contain h-auto"
            priority
          />
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Vehicle Intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Unlock Your Vehicle&apos;s
              <span className="text-primary"> True Potential</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Connect, analyze, and safely optimize your vehicle performance with cutting-edge AI technology. Real-time telemetry, health monitoring, and intelligent recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link href="/auth/sign-up">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, analyze, and optimize your vehicle performance safely.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Activity}
              title="Real-Time Telemetry"
              description="Monitor RPM, boost, temperatures, AFR, and more in real-time through your OBD connection."
            />
            <FeatureCard
              icon={Gauge}
              title="AI Health Analysis"
              description="Advanced AI algorithms analyze your engine health and predict potential issues before they occur."
            />
            <FeatureCard
              icon={Zap}
              title="Smart Optimization"
              description="Get AI-powered recommendations for safe performance improvements tailored to your vehicle."
            />
            <FeatureCard
              icon={Shield}
              title="Safety First"
              description="All optimizations go through rigorous validation to ensure they are within safe parameters."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile Ready"
              description="Access your dashboard from any device. Install as a PWA for the best mobile experience."
            />
            <FeatureCard
              icon={Car}
              title="Multi-Vehicle Support"
              description="Manage multiple vehicles from a single account with individual profiles and history."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple setup process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              step={1}
              title="Connect Your Vehicle"
              description="Plug in your OBD adapter and connect to RedBox via Bluetooth or WiFi."
            />
            <StepCard
              step={2}
              title="Analyze Performance"
              description="Our AI analyzes your telemetry data to build a comprehensive health model."
            />
            <StepCard
              step={3}
              title="Optimize Safely"
              description="Receive validated recommendations to improve performance within safe limits."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of car enthusiasts using RedBox to understand and optimize their vehicles.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8">
            <Link href="/auth/sign-up">
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Image
              src="/images/redbox-logo.jpeg"
              alt="RedBox Performance"
              width={120}
              height={40}
              className="object-contain h-auto"
            />
            <p className="text-sm text-muted-foreground">
              2026 RedBox Performance AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Activity
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-primary">{step}</span>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
