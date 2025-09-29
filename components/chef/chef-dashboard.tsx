"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Banknote,
  Users,
  TrendingUp,
  Bell,
  Settings,
  CheckCircle,
  X,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

const bookingRequests = [
  {
    id: 1,
    customer: "Anita Patel",
    customerImage: "/happy-indian-woman-customer-testimonial.jpg",
    date: "2024-01-15",
    time: "18:00",
    duration: "3 hours",
    guests: 6,
    cuisine: "North Indian",
    location: "Bandra West, Mumbai",
    amount: 2400,
    status: "pending",
    requestedAt: "2 hours ago",
    specialRequests: "Please prepare vegetarian dishes only. Family has nut allergies.",
    customerPhone: "+91 98765 43210",
    customerEmail: "anita.patel@email.com",
    customerAddress: "301, Sunrise Apartments, Bandra West, Mumbai - 400050",
    foodType: "Vegetarian",
    occasionType: "Family Dinner",
  },
  {
    id: 2,
    customer: "Rohit Mehta",
    customerImage: "/satisfied-indian-man-customer-review.jpg",
    date: "2024-01-20",
    time: "12:00",
    duration: "4 hours",
    guests: 12,
    cuisine: "Punjabi",
    location: "Powai, Mumbai",
    amount: 3200,
    status: "pending",
    requestedAt: "5 hours ago",
    specialRequests: "Birthday party for 8-year-old. Need kid-friendly dishes.",
    customerPhone: "+91 87654 32109",
    customerEmail: "rohit.mehta@email.com",
    customerAddress: "B-502, Lake View Society, Powai, Mumbai - 400076",
    foodType: "Non-Vegetarian",
    occasionType: "Birthday Party",
  },
]

const confirmedBookings = [
  {
    id: 3,
    customer: "Kavya Reddy",
    customerImage: "/happy-indian-working-mother-testimonial.jpg",
    date: "2024-01-18",
    time: "19:00",
    duration: "2 hours",
    guests: 4,
    cuisine: "North Indian",
    location: "Juhu, Mumbai",
    amount: 1600,
    status: "confirmed",
    customerPhone: "+91 98765 43210",
    customerEmail: "kavya.reddy@email.com",
  },
]

const completedBookings = [
  {
    id: 4,
    customer: "Arjun Singh",
    date: "2024-01-10",
    time: "18:30",
    duration: "3 hours",
    amount: 2400,
    rating: 5,
    review: "Excellent service! The food was amazing and Chef Priya was very professional.",
  },
  {
    id: 5,
    customer: "Maria D'Souza",
    date: "2024-01-05",
    time: "12:00",
    duration: "4 hours",
    amount: 3200,
    rating: 4,
    review: "Great food, arrived on time. Would book again!",
  },
]

const earnings = {
  thisMonth: 15600,
  lastMonth: 12400,
  totalEarnings: 89500,
  pendingPayouts: 4800,
  completedBookings: 23,
  averageRating: 4.9,
}

export function ChefDashboard() {
  const { user } = useAuth()
  
  // Mock data with actual user data
  const chefProfile = {
    name: user?.display_name || `${user?.first_name} ${user?.last_name}` || "Chef",
    image: user?.profile_image_path || "/professional-indian-female-chef-smiling-in-kitchen.jpg",
    specialty: "North Indian Cuisine",
    rating: 4.9,
    reviews: 127,
    location: user?.location || "Mumbai, Maharashtra",
    isAvailable: true,
    verified: true,
  }
  
  const [isAvailable, setIsAvailable] = useState(chefProfile.isAvailable)
  const [bookings, setBookings] = useState(bookingRequests)
  const [processingBooking, setProcessingBooking] = useState<number | null>(null)

  const handleBookingAction = async (bookingId: number, action: "accept" | "decline") => {
    setProcessingBooking(bookingId)

    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] Chef ${action}ed booking ${bookingId}`)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: action === "accept" ? "confirmed" : "declined" } : booking,
      ),
    )

    setTimeout(() => {
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId))
    }, 2000)

    setProcessingBooking(null)

    alert(`Booking ${action}ed successfully! Customer has been notified.`)
  }

  const handleViewProfile = (chefId: string) => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] Chef profile ${chefId} viewed`)

    localStorage.setItem(
      "lastProfileView",
      JSON.stringify({
        chefId,
        timestamp,
        viewCount: JSON.parse(localStorage.getItem("profileViewCount") || "0") + 1,
      }),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chef Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={chefProfile.image || "/placeholder.svg"} alt={chefProfile.name} />
                <AvatarFallback>{chefProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{chefProfile.name}</h1>
                  {chefProfile.verified && <CheckCircle className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-muted-foreground">{chefProfile.specialty}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span>
                      {chefProfile.rating} ({chefProfile.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{chefProfile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Available for bookings</span>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
              <Link href="/chef/profile">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={() => handleViewProfile(chefProfile.name)}>
                View Public Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Banknote className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{earnings.thisMonth.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{earnings.averageRating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{earnings.completedBookings}</p>
                  <p className="text-sm text-muted-foreground">Completed Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="requests">
              Requests
              {bookings.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {bookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>Review and respond to customer booking requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={booking.customerImage || "/placeholder.svg"} alt={booking.customer} />
                            <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{booking.customer}</h3>
                            <p className="text-sm text-muted-foreground">Requested {booking.requestedAt}</p>
                            <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                            <p className="text-xs text-muted-foreground">{booking.customerPhone}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">New Request</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {booking.time} ({booking.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.guests} guests</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Food Type: </span>
                            <span className="font-medium">{booking.foodType}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Cuisine: </span>
                            <span className="font-medium">{booking.cuisine}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Occasion: </span>
                            <span className="font-medium">{booking.occasionType}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-bold text-primary">₹{booking.amount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-3">
                        <h4 className="text-sm font-medium mb-1">Service Address:</h4>
                        <p className="text-sm text-muted-foreground">{booking.customerAddress}</p>
                      </div>

                      {booking.specialRequests && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h4 className="text-sm font-medium mb-1">Special Requests:</h4>
                          <p className="text-sm text-muted-foreground">{booking.specialRequests}</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          onClick={() => handleBookingAction(booking.id, "accept")}
                          className="flex-1"
                          disabled={processingBooking === booking.id}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {processingBooking === booking.id ? "Accepting..." : "Accept Booking"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleBookingAction(booking.id, "decline")}
                          className="flex-1"
                          disabled={processingBooking === booking.id}
                        >
                          <X className="h-4 w-4 mr-2" />
                          {processingBooking === booking.id ? "Declining..." : "Decline"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                    <p className="text-muted-foreground">New booking requests will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Confirmed Bookings</CardTitle>
                <CardDescription>Your upcoming confirmed bookings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {confirmedBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={booking.customerImage || "/placeholder.svg"} alt={booking.customer} />
                          <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{booking.customer}</h3>
                          <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                        </div>
                      </div>
                      <Badge>Confirmed</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {booking.time} ({booking.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.guests} guests</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Amount: </span>
                          <span className="font-bold text-primary">₹{booking.amount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Customer
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Bookings</CardTitle>
                <CardDescription>Your booking history and customer reviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{booking.customer}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()} • {booking.time} • {booking.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(booking.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-accent fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-primary">₹{booking.amount}</span>
                      </div>
                    </div>

                    {booking.review && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm">"{booking.review}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your financial summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-bold">₹{earnings.thisMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Month</span>
                      <span className="font-medium">₹{earnings.lastMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Earnings</span>
                      <span className="font-bold text-primary">₹{earnings.totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-muted-foreground">Pending Payouts</span>
                      <span className="font-bold text-secondary">₹{earnings.pendingPayouts.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your service statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed Bookings</span>
                      <span className="font-bold">{earnings.completedBookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Rating</span>
                      <span className="font-bold">{earnings.averageRating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Rate</span>
                      <span className="font-bold">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Repeat Customers</span>
                      <span className="font-bold">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>Your recent payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">December 2023 Earnings</p>
                      <p className="text-sm text-muted-foreground">Paid on Jan 5, 2024</p>
                    </div>
                    <span className="font-bold text-green-600">₹12,400</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">November 2023 Earnings</p>
                      <p className="text-sm text-muted-foreground">Paid on Dec 5, 2023</p>
                    </div>
                    <span className="font-bold text-green-600">₹9,800</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">October 2023 Earnings</p>
                      <p className="text-sm text-muted-foreground">Paid on Nov 5, 2023</p>
                    </div>
                    <span className="font-bold text-green-600">₹11,200</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Availability</CardTitle>
                <CardDescription>Set your working hours and available dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Availability Calendar</h3>
                  <p className="text-muted-foreground mb-4">Manage your schedule and set available time slots</p>
                  <Button>Configure Availability</Button>
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
