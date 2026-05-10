import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Brain, Car } from "lucide-react"
import { SpeedometerGauge } from "./speedometer-gauge"

export function FeatureCards() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Powered Diagnostics Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-background border border-border p-6 card-glow group">
            {/* Background glow effect */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-primary tracking-wider mb-1 italic">
                AI POWERED
              </h3>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                DIAGNOSTICS
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Our NeuroDrive AI system scans every module, analyzes live data, and gives you accurate solutions in seconds.
              </p>
              
              {/* NeuroDrive visual */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-primary red-glow" />
                  </div>
                  {/* Orbiting dots */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1" />
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }}>
                    <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full -translate-x-1/2 translate-y-1" />
                  </div>
                </div>
              </div>
              
              <Link
                href="/ai-diagnostics"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded px-4 py-2 hover:border-primary/50 transition-colors group"
              >
                DISCOVER NEURODRIVE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Real-World Performance Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-background border border-border p-6 card-glow">
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-primary tracking-wider mb-1 italic">
                REAL-WORLD
              </h3>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                PERFORMANCE
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                From 0-100 to dyno runs, track every metric that matters and push your limits with confidence.
              </p>
              
              {/* Speedometer */}
              <div className="flex justify-center mb-4">
                <SpeedometerGauge value={284} maxValue={320} />
              </div>
              
              <Link
                href="/performance"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded px-4 py-2 hover:border-primary/50 transition-colors group"
              >
                VIEW PERFORMANCE TOOLS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Built for Enthusiasts Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-background border border-border p-6 card-glow">
            {/* Car silhouette with glow */}
            <div className="absolute right-0 bottom-0 w-full h-32 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-foreground tracking-wider mb-1">
                BUILT FOR
              </h3>
              <h2 className="text-2xl font-bold text-primary mb-4 italic">
                ENTHUSIASTS
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Whether it&apos;s daily driving or track days, we provide the edge you need to stay ahead.
              </p>
              
              {/* Car icon with glow effect */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Car className="w-20 h-20 text-primary/80" />
                  <div className="absolute inset-0 blur-xl bg-primary/30 -z-10" />
                </div>
              </div>
              
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded px-4 py-2 hover:border-primary/50 transition-colors group"
              >
                SEE OUR SERVICES
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
