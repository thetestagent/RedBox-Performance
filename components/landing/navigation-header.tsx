"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/services", label: "SERVICES" },
  { href: "/performance", label: "PERFORMANCE" },
  { href: "/ai-diagnostics", label: "AI DIAGNOSTICS" },
  { href: "/shop", label: "SHOP" },
  { href: "/contact", label: "CONTACT" },
]

export function NavigationHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg
              viewBox="0 0 48 48"
              className="w-12 h-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hexagon shape */}
              <path
                d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
                fill="rgba(220, 38, 38, 0.1)"
                stroke="rgb(220, 38, 38)"
                strokeWidth="2"
              />
              {/* Engine piston icon */}
              <path
                d="M18 18H30V22H28V26H30V30H18V26H20V22H18V18Z"
                fill="rgb(220, 38, 38)"
              />
              <rect x="22" y="14" width="4" height="4" fill="rgb(220, 38, 38)" />
            </svg>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary tracking-tight">RED</span>
            <span className="text-xl font-bold text-primary tracking-tight">BOX</span>
            <span className="text-xl font-light text-foreground tracking-wide ml-1">PERFORMANCE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/auth/sign-up"
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            GET STARTED
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-3 px-4 text-sm font-medium tracking-wide rounded-md transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/sign-up"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium text-sm"
            >
              GET STARTED
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
