"use client"

import { useEffect, useState } from "react"

const DRIVER_QUOTES = [
  "Precision tuning meets intelligent safety - your engine deserves the best.",
  "Every millisecond of timing matters. We calculate them all.",
  "Trust the data. Trust the process. Trust RedBox.",
  "Your car speaks through telemetry. We translate it into power.",
  "Performance without compromise. Safety without limits.",
  "Where engineering excellence meets artificial intelligence.",
  "Unlock hidden potential your manufacturer left on the table.",
  "Real-time analysis. Real results. Real performance gains.",
  "Built by enthusiasts who understand the thrill of the drive.",
  "Your engine's health is our top priority. Power comes second.",
  "From street to track, we optimize for your driving style.",
  "Intelligent recommendations backed by thousands of data points.",
  "The future of vehicle tuning is here. It's safe. It's smart.",
  "Every boost adjustment validated. Every risk calculated.",
  "Professional-grade diagnostics in the palm of your hand.",
  "We don't guess. We analyze, simulate, then recommend.",
  "Your vehicle's AI co-pilot for peak performance.",
  "Transforming raw data into driving excellence.",
  "Because your passion for driving deserves precision engineering.",
  "Drive with confidence. Optimize with intelligence.",
]

export function RotatingQuote() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Set initial random quote
    setCurrentQuote(Math.floor(Math.random() * DRIVER_QUOTES.length))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % DRIVER_QUOTES.length)
        setIsVisible(true)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center py-8">
      <p
        className={`text-lg md:text-xl italic text-muted-foreground max-w-2xl mx-auto transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        &quot;{DRIVER_QUOTES[currentQuote]}&quot;
      </p>
    </div>
  )
}

// Export quotes for SEO usage
export { DRIVER_QUOTES }
