import { Zap, BarChart3, Car, Users, ShieldCheck } from "lucide-react"

const stats = [
  {
    icon: Zap,
    value: "+50-120",
    unit: "HP",
    label: "Potential Gain",
  },
  {
    icon: BarChart3,
    value: "15+",
    unit: "",
    label: "Live Parameters",
  },
  {
    icon: Car,
    value: "1000+",
    unit: "",
    label: "Vehicles Tuned",
  },
  {
    icon: Users,
    value: "5K+",
    unit: "",
    label: "Happy Customers",
  },
  {
    icon: ShieldCheck,
    value: "98",
    unit: "%",
    label: "Success Rate",
  },
]

export function StatsBar() {
  return (
    <section className="py-8 bg-gradient-to-r from-card via-background to-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 min-w-[160px]"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold text-foreground tabular-nums">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-sm font-medium text-primary">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
