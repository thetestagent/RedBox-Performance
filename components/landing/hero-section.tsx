import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Cpu } from "lucide-react"
import { PerformanceIndex } from "./performance-index"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Hero car image */}
      <div className="absolute inset-0 flex items-center justify-end pr-0 lg:pr-8">
        <div className="relative w-full lg:w-3/5 h-full">
          <Image
            src="/images/hero-car.jpg"
            alt="RedBox Performance BMW"
            fill
            className="object-contain object-right"
            priority
          />
          {/* Light trail effect */}
          <div className="absolute bottom-20 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary/60 to-transparent light-trail" />
        </div>
      </div>

      {/* Performance Index Widget - Top Right */}
      <div className="absolute top-8 right-8 z-10 hidden lg:block">
        <PerformanceIndex />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Tagline */}
          <p className="text-primary font-medium tracking-widest text-sm mb-4 italic">
            UNLEASH. OPTIMIZE. DOMINATE.
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-metallic">ENGINEERED</span>
            <br />
            <span className="text-metallic">TO </span>
            <span className="text-primary italic">PERFORM</span>
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            Red Box Performance delivers elite tuning, advanced diagnostics, and real-world performance solutions for drivers who demand more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/performance"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all group"
            >
              EXPLORE PERFORMANCE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ai-diagnostics"
              className="flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground rounded-md font-semibold text-sm tracking-wide hover:border-primary/50 hover:bg-card transition-all group"
            >
              <Cpu className="w-4 h-4" />
              AI DIAGNOSTICS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
