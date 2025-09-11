"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Users, MapPin, Phone, Star, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock bookings data
  const bookings = {
    upcoming: [
      {
        id: "BK-2024-001",
        chef: {
          name: "Rajesh Kumar",
          image: "/professional-indian-chef.jpg",
          phone: "+91 98765 43210",
          specialties: ["North Indian", "Punjabi"],
        },
        date: "2024-01-15",
        time: "06:00 PM",
        duration: "3 hours",
        guests: 4,
        serviceType: "Home Cooking",
        status: "confirmed",
        totalAmount: 2847,
        address: "123 Green Park, New Delhi",
      },
      {
        id: "BK-2024-002",
        chef: {
          name: "Priya Sharma",
          image: "/professional-indian-female-chef.jpg",
          phone: "+91 98765 43211",
          specialties: ["South Indian", "Kerala"],
        },
        date: "2024-01-20",
        time: "07:00 PM",
        duration: "4 hours",
        guests: 6,
        serviceType: "Party Catering",
        status: "pending",
        totalAmount: 4200,
        address: "456 Vasant Vihar, New Delhi",
      },
    ],
    completed: [
      {
        id: "BK-2023-045",
        chef: {
          name: "Marco Rossi",
          image: "/professional-italian-chef.jpg",
          phone: "+91 98765 43212",
          specialties: ["Italian", "Continental"],
        },
        date: "2023-12-20",
        time: "07:30 PM",
        duration: "3 hours",
        guests: 2,
        serviceType: "Home Cooking",
        status: "completed",
        totalAmount: 3200,
        address: "789 Khan Market, New Delhi",
        rating: 5,
        review: "Excellent service! Marco prepared amazing pasta and the tiramisu was perfect.",
      },
    ],
    cancelled: [
      {
        id: "BK-2023-030",
        chef: {
          name: "Amit Singh",
          image: "/professional-indian-chef.jpg",
          phone: "+91 98765 43213",
          specialties: ["Punjabi", "Tandoor"],
        },
        date: "2023-11-15",
        time: "06:00 PM",
        duration: "3 hours",
        guests: 8,
        serviceType: "Party Catering",
        status: "cancelled",
        totalAmount: 5600,
        address: "321 CP, New Delhi",
        cancellationReason: "Cancelled by customer due to change in plans",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const BookingCard = ({ booking, showActions = true }: { booking: any; showActions?: boolean }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">Booking #{booking.id}</h3>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{booking.serviceType}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">₹{booking.totalAmount}</p>
            <p className="text-sm text-gray-600">{booking.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={booking.chef.image || "/placeholder.svg"}
            alt={booking.chef.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{booking.chef.name}</p>
            <div className="flex gap-2">
              {booking.chef.specialties.map((specialty: string) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>
              {booking.time} ({booking.duration})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{booking.guests} guests</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{booking.chef.phone}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">{booking.address}</span>
        </div>

        {booking.rating && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(booking.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">Your Rating</span>
            </div>
            <p className="text-sm text-gray-600">{booking.review}</p>
          </div>
        )}

        {booking.cancellationReason && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Cancellation Reason:</strong> {booking.cancellationReason}
            </p>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-4 border-t">
            {booking.status === "confirmed" && (
              <>
                <Button size="sm" variant="outline">
                  Contact Chef
                </Button>
                <Button size="sm" variant="outline">
                  Modify Booking
                </Button>
                <Button size="sm" variant="destructive">
                  Cancel Booking
                </Button>
              </>
            )}
            {booking.status === "pending" && (
              <Button size="sm" variant="outline">
                Cancel Request
              </Button>
            )}
            {booking.status === "completed" && !booking.rating && (
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Rate & Review
              </Button>
            )}
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage all your chef bookings in one place</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search bookings by chef name, booking ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({bookings.upcoming.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({bookings.completed.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({bookings.cancelled.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {bookings.upcoming.length > 0 ? (
              bookings.upcoming.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-4">Book a chef for your next meal or event</p>
                  <Link href="/chefs">
                    <Button className="bg-orange-500 hover:bg-orange-600">Browse Chefs</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {bookings.completed.map((booking) => (
              <BookingCard key={booking.id} booking={booking} showActions={false} />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {bookings.cancelled.map((booking) => (
              <BookingCard key={booking.id} booking={booking} showActions={false} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
