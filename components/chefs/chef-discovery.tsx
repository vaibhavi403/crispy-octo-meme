"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Star, Clock, Heart, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// Mock chef data
const allChefs = [
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
    verified: true,
    responseTime: "Usually responds in 2 hours",
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
    verified: true,
    responseTime: "Usually responds in 1 hour",
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
    verified: true,
    responseTime: "Usually responds in 3 hours",
  },
  {
    id: 4,
    name: "Chef Arjun Singh",
    image: "/professional-indian-chef.jpg",
    specialty: "Punjabi Cuisine",
    experience: "10 years",
    rating: 4.9,
    reviews: 156,
    location: "Delhi",
    hourlyRate: 850,
    available: true,
    cuisines: ["Punjabi", "North Indian", "Tandoor"],
    verified: true,
    responseTime: "Usually responds in 1 hour",
  },
  {
    id: 5,
    name: "Chef Kavya Reddy",
    image: "/professional-indian-female-chef.jpg",
    specialty: "South Indian Cuisine",
    experience: "7 years",
    rating: 4.6,
    reviews: 94,
    location: "Hyderabad",
    hourlyRate: 700,
    available: true,
    cuisines: ["South Indian", "Andhra", "Telangana"],
    verified: false,
    responseTime: "Usually responds in 4 hours",
  },
  {
    id: 6,
    name: "Chef Marco Rossi",
    image: "/professional-italian-chef.jpg",
    specialty: "Italian Cuisine",
    experience: "15 years",
    rating: 4.8,
    reviews: 178,
    location: "Mumbai",
    hourlyRate: 1200,
    available: true,
    cuisines: ["Italian", "Continental", "Mediterranean"],
    verified: true,
    responseTime: "Usually responds in 2 hours",
  },
]

const cuisineOptions = [
  "North Indian",
  "South Indian",
  "Punjabi",
  "Gujarati",
  "Bengali",
  "Maharashtrian",
  "Continental",
  "Italian",
  "Chinese",
  "Thai",
  "Mediterranean",
]

const locationOptions = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"]

export function ChefDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [priceRange, setPriceRange] = useState([300, 1500])
  const [availableOnly, setAvailableOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  const filteredChefs = allChefs.filter((chef) => {
    const matchesSearch =
      chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.cuisines.some((cuisine) => cuisine.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCuisine =
      selectedCuisines.length === 0 || selectedCuisines.some((cuisine) => chef.cuisines.includes(cuisine))

    const matchesLocation = !selectedLocation || chef.location === selectedLocation

    const matchesPrice = chef.hourlyRate >= priceRange[0] && chef.hourlyRate <= priceRange[1]

    const matchesAvailability = !availableOnly || chef.available

    const matchesVerification = !verifiedOnly || chef.verified

    return (
      matchesSearch && matchesCuisine && matchesLocation && matchesPrice && matchesAvailability && matchesVerification
    )
  })

  const sortedChefs = [...filteredChefs].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.hourlyRate - b.hourlyRate
      case "price-high":
        return b.hourlyRate - a.hourlyRate
      case "experience":
        return Number.parseInt(b.experience) - Number.parseInt(a.experience)
      default:
        return 0
    }
  })

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Amazing Chefs</h1>
          <p className="text-muted-foreground">Find the perfect chef for your culinary needs</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by chef name, cuisine, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(selectedCuisines.length > 0 || selectedLocation || availableOnly || verifiedOnly) && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCuisines.length +
                    (selectedLocation ? 1 : 0) +
                    (availableOnly ? 1 : 0) +
                    (verifiedOnly ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{sortedChefs.length} chefs found</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Cuisine Filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Cuisine Type</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {cuisineOptions.map((cuisine) => (
                        <div key={cuisine} className="flex items-center space-x-2">
                          <Checkbox
                            id={cuisine}
                            checked={selectedCuisines.includes(cuisine)}
                            onCheckedChange={() => handleCuisineToggle(cuisine)}
                          />
                          <label htmlFor={cuisine} className="text-sm">
                            {cuisine}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Location</h3>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locationOptions.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Price Range (₹/hour)</h3>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={2000}
                        min={300}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Additional Filters</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available" checked={availableOnly} onCheckedChange={setAvailableOnly} />
                        <label htmlFor="available" className="text-sm">
                          Available Now
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                        <label htmlFor="verified" className="text-sm">
                          Verified Only
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCuisines([])
                      setSelectedLocation("")
                      setPriceRange([300, 1500])
                      setAvailableOnly(false)
                      setVerifiedOnly(false)
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chef Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedChefs.map((chef) => (
            <Card key={chef.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img src={chef.image || "/placeholder.svg"} alt={chef.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {chef.available ? (
                    <Badge className="bg-secondary">Available</Badge>
                  ) : (
                    <Badge variant="secondary">Busy</Badge>
                  )}
                  {chef.verified && (
                    <Badge variant="outline" className="bg-background">
                      Verified
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
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
                  {chef.cuisines.slice(0, 3).map((cuisine) => (
                    <Badge key={cuisine} variant="outline" className="text-xs">
                      {cuisine}
                    </Badge>
                  ))}
                  {chef.cuisines.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{chef.cuisines.length - 3} more
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">{chef.responseTime}</p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-primary">₹{chef.hourlyRate}</span>
                    <span className="text-sm text-muted-foreground">/hour</span>
                  </div>
                  <Link href={`/chef/${chef.id}`}>
                    <Button disabled={!chef.available}>{chef.available ? "View Profile" : "View Profile"}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedChefs.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No chefs found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCuisines([])
                setSelectedLocation("")
                setPriceRange([300, 1500])
                setAvailableOnly(false)
                setVerifiedOnly(false)
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
