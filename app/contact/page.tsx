import { Metadata } from "next"
import { NavigationHeader } from "@/components/landing/navigation-header"
import { Footer } from "@/components/shared/footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Contact | RedBox Performance",
  description: "Get in touch with RedBox Performance - We are here to help with your tuning and diagnostic needs.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@redboxperformance.com",
    href: "mailto:support@redboxperformance.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Austin, Texas, USA",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri 9AM-6PM CST",
    href: null,
  },
]

export default function ContactPage() {
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
                GET IN TOUCH
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-metallic">CONTACT</span>
                <br />
                <span className="text-primary italic">US</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Have questions about our services? Need support with your tune? We&apos;re here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="p-8 rounded-xl bg-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle (Optional)</Label>
                    <Input
                      id="vehicle"
                      placeholder="2023 BMW M3"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or question..."
                      rows={5}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ teaser */}
                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check our FAQ section for quick answers to common questions about tuning, diagnostics, and more.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    FAQ section coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
