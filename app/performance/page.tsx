import { Metadata } from "next"
import Link from "next/link"
import { NavigationHeader } from "@/components/landing/navigation-header"
import { Footer } from "@/components/shared/footer"
import { SpeedometerGauge } from "@/components/landing/speedometer-gauge"
import { Gauge, Timer, Thermometer, Droplet, Wind, Activity, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Performance | RedBox Performance",
  description: "Real-time performance monitoring and tracking tools for your vehicle.",
}

const metrics = [
  { icon: Gauge, label: "RPM", value: "7,200", unit: "rpm" },
  { icon: Timer, label: "0-100", value: "4.2", unit: "sec" },
  { icon: Thermometer, label: "Coolant", value: "92", unit: "°C" },
  { icon: Droplet, label: "Oil Temp", value: "105", unit: "°C" },
  { icon: Wind, label: "Boost", value: "1.4", unit: "bar" },
  { icon: Activity, label: "AFR", value: "14.7", unit: ":1" },
]

export default function PerformancePage() {
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
                REAL-TIME DATA
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-metallic">PERFORMANCE</span>
                <br />
                <span className="text-primary italic">MONITORING</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Track every metric that matters. From dyno runs to daily driving, our monitoring tools give you complete visibility into your vehicle&apos;s performance.
              </p>
            </div>
          </div>
        </section>

        {/* Speedometer showcase */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <div className="mb-8">
                <SpeedometerGauge value={284} maxValue={320} />
              </div>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Live speed monitoring with precision accuracy. Track your acceleration, top speed, and lap times in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Live Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-card border border-border card-glow text-center"
                >
                  <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground tabular-nums">
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{metric.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lap Timer</h3>
                <p className="text-sm text-muted-foreground">
                  GPS-based lap timing with sector analysis and historical comparison.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Data Logging</h3>
                <p className="text-sm text-muted-foreground">
                  Record and analyze every parameter with detailed session logs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Virtual Dyno</h3>
                <p className="text-sm text-muted-foreground">
                  Estimate horsepower and torque through acceleration data analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Start Tracking Your Performance
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Sign up to access real-time performance monitoring and data analysis tools.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all"
            >
              GET STARTED
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
