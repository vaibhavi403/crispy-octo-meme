"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  MapPin,
  Clock,
  Heart,
  Share2,
  CalendarIcon,
  Users,
  Award,
  CheckCircle,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

interface ChefProfileProps {
  chefId: string
}

// Mock chef data - in real app this would be fetched based on chefId
const chefData = {
  id: 1,
  name: "Chef Priya Sharma",
  image: "/professional-indian-female-chef-smiling-in-kitchen.jpg",
  specialty: "North Indian Cuisine",
  experience: "8 years",
  rating: 4.9,
  reviews: 127,
  location: "Mumbai, Maharashtra",
  hourlyRate: 800,
  available: true,
  cuisines: ["North Indian", "Punjabi", "Mughlai", "Tandoor", "Vegetarian"],
  verified: true,
  responseTime: "Usually responds in 2 hours",
  bio: "Passionate chef with 8 years of experience in authentic North Indian cuisine. Specialized in traditional Punjabi and Mughlai dishes. I believe in using fresh, locally sourced ingredients to create memorable dining experiences. Whether it's a family dinner or a special celebration, I bring restaurant-quality food to your home kitchen.",
  achievements: [
    "Certified Professional Chef",
    "Food Safety Certified",
    "Winner - Mumbai Food Festival 2023",
    "Featured in Times Food Guide",
  ],
  gallery: [
    "/north-indian-food-platter.jpg",
    "/punjabi-dal-makhani.png",
    "/tandoor-naan-bread.jpg",
    "/butter-chicken-curry.png",
  ],
  availability: {
    "2024-01-15": ["10:00", "14:00", "18:00"],
    "2024-01-16": ["12:00", "16:00"],
    "2024-01-17": ["10:00", "18:00"],
    "2024-01-18": ["14:00", "18:00"],
  },
}

const reviews = [
  {
    id: 1,
    customer: "Anita Patel",
    avatar: "/happy-indian-woman-customer-testimonial.jpg",
    rating: 5,
    date: "2024-01-05",
    comment:
      "Chef Priya made our anniversary dinner absolutely magical! The authentic Gujarati thali was prepared with such love and attention to detail. Every dish was perfectly spiced and beautifully presented. Highly recommended!",
    dishes: ["Dal Makhani", "Butter Naan", "Paneer Makhani"],
  },
  {
    id: 2,
    customer: "Rohit Mehta",
    avatar: "/satisfied-indian-man-customer-review.jpg",
    rating: 5,
    date: "2023-12-28",
    comment:
      "Booked Chef Priya for my son's birthday party. The North Indian feast was incredible and all our guests were impressed. Professional service, punctual, and the food was restaurant quality. Will definitely book again!",
    dishes: ["Chole Bhature", "Rajma", "Jeera Rice"],
  },
  {
    id: 3,
    customer: "Kavya Reddy",
    avatar: "/happy-indian-working-mother-testimonial.jpg",
    rating: 4,
    date: "2023-12-20",
    comment:
      "Great experience overall. Chef Priya was very professional and the food was delicious. The only minor issue was that she arrived 15 minutes late, but she made up for it with excellent service and amazing food.",
    dishes: ["Palak Paneer", "Garlic Naan", "Biryani"],
  },
]

export function ChefProfile({ chefId }: ChefProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)

  const availableTimes = selectedDate ? chefData.availability[selectedDate.toISOString().split("T")[0]] || [] : []

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chef Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <img
                  src={chefData.image || "/placeholder.svg"}
                  alt={chefData.name}
                  className="w-48 h-48 rounded-2xl object-cover mx-auto md:mx-0"
                />
                {chefData.verified && (
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{chefData.name}</h1>
                    {chefData.available ? (
                      <Badge className="bg-secondary">Available</Badge>
                    ) : (
                      <Badge variant="secondary">Busy</Badge>
                    )}
                  </div>
                  <p className="text-xl text-primary font-medium">{chefData.specialty}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span className="font-medium">{chefData.rating}</span>
                    <span>({chefData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{chefData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{chefData.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{chefData.responseTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {chefData.cuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="outline">
                      {cuisine}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Chef Priya</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{chefData.hourlyRate}</div>
                    <div className="text-sm text-muted-foreground">per hour</div>
                  </div>
                </CardTitle>
                <CardDescription>Select your preferred date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    className="rounded-md border"
                  />
                </div>

                {selectedDate && availableTimes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Available Times</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedDate && availableTimes.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">No available times for this date</p>
                  </div>
                )}

                <Link
                  href={`/booking/new?chef=${chefData.id}&date=${selectedDate?.toISOString()}&time=${selectedTime}`}
                >
                  <Button className="w-full" disabled={!chefData.available || !selectedDate || !selectedTime}>
                    {chefData.available ? "Book Now" : "Currently Unavailable"}
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center">
                  You won't be charged until your booking is confirmed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chef Details Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Chef Priya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{chefData.bio}</p>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {chefData.cuisines.map((cuisine) => (
                        <Badge key={cuisine} variant="secondary">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Service Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-medium">{chefData.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hourly Rate:</span>
                        <span className="font-medium">₹{chefData.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="font-medium">2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum Booking:</span>
                        <span className="font-medium">3 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Food Gallery</CardTitle>
                <CardDescription>See some of Chef Priya's signature dishes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {chefData.gallery.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Dish ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  {chefData.reviews} reviews • {chefData.rating} average rating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.customer} />
                        <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{review.customer}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-accent fill-current" />
                              ))}
                              <span className="text-sm text-muted-foreground ml-2">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>

                        <div className="flex flex-wrap gap-2">
                          {review.dishes.map((dish) => (
                            <Badge key={dish} variant="outline" className="text-xs">
                              {dish}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Certifications</CardTitle>
                <CardDescription>Professional credentials and recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {chefData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                      <Award className="h-6 w-6 text-accent" />
                      <span className="font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
