import { Zap, Activity, BarChart3, Shield, Settings } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "MORE POWER",
    description: "Unleash hidden performance",
  },
  {
    icon: Activity,
    title: "SMART DIAGNOSTICS",
    description: "AI-powered fault detection & analysis",
  },
  {
    icon: BarChart3,
    title: "REAL-TIME DATA",
    description: "Live monitoring & performance insights",
  },
  {
    icon: Shield,
    title: "DRIVE SAFE",
    description: "Predict issues before they happen",
  },
  {
    icon: Settings,
    title: "CUSTOM SOLUTIONS",
    description: "Tailored tuning for your vehicle",
  },
]

export function FeaturesStrip() {
  return (
    <section className="border-y border-border bg-card/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 min-w-[200px]"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
