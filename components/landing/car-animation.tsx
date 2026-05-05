"use client"

import { useEffect, useState } from "react"

export function CarAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden">
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-800">
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-12 h-1 bg-yellow-500 animate-[roadMove_1s_linear_infinite]"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Car SVG */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="relative animate-[carBounce_0.5s_ease-in-out_infinite]">
          {/* Car body */}
          <svg
            width="180"
            height="80"
            viewBox="0 0 180 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Car body */}
            <path
              d="M20 50 L35 50 L45 30 L80 25 L130 25 L145 35 L165 40 L165 55 L160 60 L145 60 L145 55 L40 55 L40 60 L25 60 L20 55 Z"
              fill="url(#carGradient)"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            
            {/* Windows */}
            <path
              d="M50 32 L75 28 L75 45 L48 45 Z"
              fill="#1a3a5c"
              stroke="#2d5a8a"
              strokeWidth="1"
            />
            <path
              d="M80 28 L125 28 L135 38 L135 45 L80 45 Z"
              fill="#1a3a5c"
              stroke="#2d5a8a"
              strokeWidth="1"
            />
            
            {/* Headlights */}
            <ellipse cx="158" cy="45" rx="4" ry="6" fill="#ffeb3b" className="animate-pulse" />
            <ellipse cx="158" cy="45" rx="2" ry="3" fill="#fff" />
            
            {/* Taillights */}
            <rect x="22" y="42" width="6" height="8" rx="1" fill="#dc2626" className="animate-pulse" />
            
            {/* Racing stripes */}
            <line x1="50" y1="50" x2="140" y2="50" stroke="#fff" strokeWidth="2" opacity="0.3" />
            <line x1="55" y1="53" x2="135" y2="53" stroke="#fff" strokeWidth="1" opacity="0.2" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
          </svg>

          {/* Wheels */}
          <div className="absolute bottom-0 left-[30px]">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border-4 border-zinc-700 animate-spin" style={{ animationDuration: "0.3s" }}>
              <div className="absolute inset-2 rounded-full bg-zinc-600">
                <div className="absolute inset-1 rounded-full bg-zinc-800 flex items-center justify-center">
                  <div className="w-1 h-full bg-zinc-500" />
                  <div className="absolute w-full h-1 bg-zinc-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-[25px]">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border-4 border-zinc-700 animate-spin" style={{ animationDuration: "0.3s" }}>
              <div className="absolute inset-2 rounded-full bg-zinc-600">
                <div className="absolute inset-1 rounded-full bg-zinc-800 flex items-center justify-center">
                  <div className="w-1 h-full bg-zinc-500" />
                  <div className="absolute w-full h-1 bg-zinc-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Exhaust particles */}
          <div className="absolute -left-4 bottom-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-zinc-400/50 animate-[exhaust_0.8s_ease-out_infinite]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          {/* Speed lines */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-0.5 bg-gradient-to-r from-primary to-transparent animate-[speedLine_0.5s_linear_infinite]"
                style={{
                  width: `${40 + Math.random() * 30}px`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.6 - i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Performance stats floating */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="px-3 py-1 bg-primary/20 rounded-full text-xs font-mono text-primary animate-pulse">
          +15% POWER
        </div>
        <div className="px-3 py-1 bg-green-500/20 rounded-full text-xs font-mono text-green-400 animate-pulse" style={{ animationDelay: "0.5s" }}>
          OPTIMIZED
        </div>
      </div>

      {/* RPM indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="text-2xl font-bold font-mono text-primary animate-pulse">
          4,200
        </div>
        <div className="text-xs text-muted-foreground">RPM</div>
      </div>
    </div>
  )
}
