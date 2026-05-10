import { Metadata } from "next"
import Link from "next/link"
import { NavigationHeader } from "@/components/landing/navigation-header"
import { Footer } from "@/components/shared/footer"
import { ShoppingBag, Bell, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Shop | RedBox Performance",
  description: "Shop RedBox Performance merchandise, hardware, and tuning packages.",
}

const products = [
  {
    name: "OBD Bluetooth Adapter",
    price: "$89",
    category: "Hardware",
    comingSoon: true,
  },
  {
    name: "Stage 1 Tune Package",
    price: "$299",
    category: "Tuning",
    comingSoon: true,
  },
  {
    name: "Stage 2 Tune Package",
    price: "$499",
    category: "Tuning",
    comingSoon: true,
  },
  {
    name: "Full Diagnostic License",
    price: "$149/yr",
    category: "Software",
    comingSoon: true,
  },
  {
    name: "RedBox T-Shirt",
    price: "$35",
    category: "Apparel",
    comingSoon: true,
  },
  {
    name: "Performance Cap",
    price: "$28",
    category: "Apparel",
    comingSoon: true,
  },
]

export default function ShopPage() {
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
                GEAR UP
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-metallic">REDBOX</span>
                <br />
                <span className="text-primary italic">SHOP</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Premium hardware, tuning packages, and merchandise for the dedicated enthusiast.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Banner */}
        <section className="py-8 bg-primary/10 border-y border-primary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <p className="text-foreground font-medium">
                Our shop is launching soon. Preview our upcoming products below.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border card-glow relative overflow-hidden"
                >
                  {product.comingSoon && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded">
                      Coming Soon
                    </div>
                  )}
                  <div className="w-full h-32 bg-muted/20 rounded-lg mb-4 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                  <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-foreground">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notify CTA */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Get Notified When We Launch
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Be the first to know when our shop goes live. Sign up for early access and exclusive discounts.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all"
            >
              SIGN UP FOR EARLY ACCESS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
