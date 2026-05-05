"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface RedBoxLoaderProps {
  size?: "sm" | "md" | "lg"
  message?: string
  className?: string
}

export function RedBoxLoader({ size = "md", message, className }: RedBoxLoaderProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const containerSizeClasses = {
    sm: "min-h-[120px]",
    md: "min-h-[180px]",
    lg: "min-h-[240px]",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", containerSizeClasses[size], className)}>
      <div className="relative">
        {/* Outer ring pulse */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-primary/20 animate-ping",
          sizeClasses[size]
        )} />
        
        {/* Rotating ring */}
        <div className={cn(
          "absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin",
          sizeClasses[size]
        )} style={{ animationDuration: "1s" }} />
        
        {/* Second rotating ring */}
        <div className={cn(
          "absolute inset-0 rounded-full border-4 border-transparent border-b-primary/50 animate-spin",
          sizeClasses[size]
        )} style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
        
        {/* Logo container with pulse */}
        <div className={cn(
          "relative flex items-center justify-center animate-pulse",
          sizeClasses[size]
        )} style={{ animationDuration: "2s" }}>
          <Image
            src="/images/redbox-badge.jpeg"
            alt="Loading..."
            width={size === "sm" ? 48 : size === "md" ? 72 : 96}
            height={size === "sm" ? 48 : size === "md" ? 72 : 96}
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Loading message */}
      {message && (
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>
          <div className="flex justify-center gap-1 mt-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}
    </div>
  )
}

// Full page loader
export function RedBoxPageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <RedBoxLoader size="lg" message={message} />
    </div>
  )
}

// Skeleton with RedBox branding
export function RedBoxSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-muted", className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </div>
  )
}
