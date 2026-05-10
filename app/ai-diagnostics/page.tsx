import { Metadata } from "next"
import Link from "next/link"
import { NavigationHeader } from "@/components/landing/navigation-header"
import { Footer } from "@/components/shared/footer"
import { Brain, Scan, AlertTriangle, CheckCircle, ArrowRight, Cpu, Zap, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Diagnostics | RedBox Performance",
  description: "NeuroDrive AI-powered vehicle diagnostics - intelligent fault detection and predictive analysis.",
}

export default function AIDiagnosticsPage() {
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
                NEURODRIVE AI
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-metallic">AI POWERED</span>
                <br />
                <span className="text-primary italic">DIAGNOSTICS</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our advanced AI system scans every module, analyzes live data, and delivers accurate solutions in seconds. Predict issues before they happen.
              </p>
            </div>
          </div>
        </section>

        {/* NeuroDrive Visual */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-primary red-glow" />
                </div>
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s" }}>
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-2" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "7s", animationDirection: "reverse" }}>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary/60 rounded-full -translate-x-1/2 translate-y-2" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "12s" }}>
                  <div className="absolute top-1/2 right-0 w-2.5 h-2.5 bg-primary/80 rounded-full translate-x-2" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">NeuroDrive Engine</h2>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Machine learning models trained on millions of vehicle data points to detect anomalies and predict failures.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-card border border-border card-glow">
                <Scan className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Full System Scan</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comprehensive diagnostic scan of all ECU modules including engine, transmission, ABS, airbags, and more.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border card-glow">
                <AlertTriangle className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Predictive Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI algorithms analyze patterns to predict potential failures before they occur, saving time and money.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border card-glow">
                <CheckCircle className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Instant Solutions</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get detailed repair recommendations and verified fixes for detected issues instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Step
                number={1}
                icon={Cpu}
                title="Connect"
                description="Plug in your OBD adapter and connect to RedBox"
              />
              <Step
                number={2}
                icon={Scan}
                title="Scan"
                description="AI performs comprehensive system analysis"
              />
              <Step
                number={3}
                icon={Brain}
                title="Analyze"
                description="NeuroDrive processes data through ML models"
              />
              <Step
                number={4}
                icon={Shield}
                title="Resolve"
                description="Receive verified solutions and recommendations"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Experience AI Diagnostics
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of users who trust NeuroDrive to keep their vehicles running at peak performance.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all"
            >
              TRY NEURODRIVE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Step({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number
  icon: typeof Cpu
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {number}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
