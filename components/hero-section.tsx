import { Button } from "@/components/ui/button"
import { Search, Star, Users, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Hire Professional Chefs <span className="text-primary">Anytime, Anywhere</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Experience authentic Indian cuisine and global flavors prepared by verified professional chefs in the
                comfort of your home.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">500+ Verified Chefs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">4.8+ Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Same Day Booking</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chefs">
                <Button size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Book a Chef
                </Button>
              </Link>
              <Link href="/chef/join">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Join as Chef
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border">
              <img
                src="/professional-indian-chef-cooking-traditional-dishe.jpg"
                alt="Professional chef preparing Indian cuisine"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Top Rated</p>
                  <p className="text-xs text-muted-foreground">4.9/5 Rating</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quick Booking</p>
                  <p className="text-xs text-muted-foreground">Same Day Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
