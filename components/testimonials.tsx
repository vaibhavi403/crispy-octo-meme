import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Anita Patel",
    location: "Mumbai",
    rating: 5,
    text: "Chef Priya made our anniversary dinner absolutely magical! The authentic Gujarati thali was prepared with such love and attention to detail. Highly recommended!",
    image: "/happy-indian-woman-customer-testimonial.jpg",
  },
  {
    name: "Rohit Mehta",
    location: "Delhi",
    rating: 5,
    text: "Booked Chef Rajesh for my son's birthday party. The South Indian feast was incredible and all our guests were impressed. Professional service and amazing food!",
    image: "/satisfied-indian-man-customer-review.jpg",
  },
  {
    name: "Kavya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "As a working mom, Book My Chef has been a lifesaver. Chef Maria's continental dishes are restaurant-quality, and the booking process is so convenient!",
    image: "/happy-indian-working-mother-testimonial.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Real experiences from families who trust Book My Chef
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
