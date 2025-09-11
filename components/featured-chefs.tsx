"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"

const featuredChefs = [
  {
    id: 1,
    name: "Chef Priya Sharma",
    image: "/professional-indian-female-chef-smiling-in-kitchen.jpg",
    specialty: "North Indian Cuisine",
    experience: "8 years",
    rating: 4.9,
    reviews: 127,
    location: "Mumbai",
    hourlyRate: 800,
    available: true,
    cuisines: ["North Indian", "Punjabi", "Mughlai"],
  },
  {
    id: 2,
    name: "Chef Rajesh Kumar",
    image: "/professional-indian-male-chef-in-white-uniform-coo.jpg",
    specialty: "South Indian Cuisine",
    experience: "12 years",
    rating: 4.8,
    reviews: 203,
    location: "Bangalore",
    hourlyRate: 750,
    available: true,
    cuisines: ["South Indian", "Tamil", "Kerala"],
  },
  {
    id: 3,
    name: "Chef Maria D'Souza",
    image: "/professional-female-chef-preparing-continental-dis.jpg",
    specialty: "Continental Cuisine",
    experience: "6 years",
    rating: 4.7,
    reviews: 89,
    location: "Delhi",
    hourlyRate: 900,
    available: false,
    cuisines: ["Continental", "Italian", "Mediterranean"],
  },
]

export function FeaturedChefs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Meet Our Featured Chefs</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover talented chefs ready to create amazing culinary experiences for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredChefs.map((chef) => (
            <Card key={chef.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img src={chef.image || "/placeholder.svg"} alt={chef.name} className="w-full h-full object-cover" />
                {chef.available ? (
                  <Badge className="absolute top-4 right-4 bg-secondary">Available</Badge>
                ) : (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Busy
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{chef.name}</h3>
                  <p className="text-primary font-medium">{chef.specialty}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span>{chef.rating}</span>
                    <span>({chef.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{chef.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{chef.experience}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {chef.cuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="outline" className="text-xs">
                      {cuisine}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-primary">₹{chef.hourlyRate}</span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                  <Link href={`/chef/${chef.id}`}>
                    <Button disabled={!chef.available}>{chef.available ? "Book Now" : "View Profile"}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/chefs">
            <Button variant="outline" size="lg">
              View All Chefs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
