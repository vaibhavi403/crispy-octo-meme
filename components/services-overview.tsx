import { Card, CardContent } from "@/components/ui/card"
import { Shield, Utensils, DollarSign, Calendar } from "lucide-react"

const services = [
  {
    icon: Shield,
    title: "Verified Chefs",
    description:
      "All our chefs are background-verified professionals with proven culinary expertise and hygiene certifications.",
  },
  {
    icon: Utensils,
    title: "Multi-Cuisine Options",
    description:
      "From authentic Indian regional cuisines to international flavors - find the perfect chef for your taste preferences.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent pricing with no hidden costs. Choose from hourly rates or package deals that fit your budget.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Simple 3-step booking process. Select your chef, choose date & time, and confirm your booking instantly.",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose Book My Chef?</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            We make it simple to find and book professional chefs for any occasion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
