"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Clock, Users, MapPin, Phone, Mail, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    // Mock booking data - in real app, fetch from API
    setBooking({
      id: "BK-2024-001",
      status: "confirmed",
      date: "2024-01-15",
      time: "06:00 PM",
      duration: "3 hours",
      guests: 4,
      serviceType: "Home Cooking",
      totalAmount: 2847,
      chef: {
        name: "Rajesh Kumar",
        image: "/professional-indian-chef.jpg",
        phone: "+91 98765 43210",
        email: "rajesh@bookmychef.com",
        specialties: ["North Indian", "Punjabi", "Tandoor"],
      },
      address: "123 Green Park, New Delhi - 110016",
      paymentMethod: "Credit Card ending in 4567",
      specialRequests: "Vegetarian meal with less spice",
    })
  }, [])

  if (!booking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your chef booking has been successfully confirmed. You'll receive a confirmation email shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Booking Details</span>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-gray-600">January 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-gray-600">
                        {booking.time} ({booking.duration})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Guests</p>
                      <p className="text-sm text-gray-600">{booking.guests} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Service Type</p>
                      <p className="text-sm text-gray-600">{booking.serviceType}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-2">Service Address</p>
                  <p className="text-sm text-gray-600">{booking.address}</p>
                </div>

                {booking.specialRequests && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Special Requests</p>
                      <p className="text-sm text-gray-600">{booking.specialRequests}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Chef Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Chef</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <img
                    src={booking.chef.image || "/placeholder.svg"}
                    alt={booking.chef.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{booking.chef.name}</h3>
                    <div className="flex gap-2 mt-2 mb-3">
                      {booking.chef.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-orange-100 text-orange-800">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{booking.chef.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{booking.chef.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your chef will contact you 24 hours before the service to confirm details and
                    discuss the menu.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Chef Confirmation</p>
                      <p className="text-sm text-gray-600">
                        Your chef will contact you within 2 hours to confirm the booking
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Menu Planning</p>
                      <p className="text-sm text-gray-600">
                        Discuss your preferred dishes and finalize the menu 24 hours before service
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Service Day</p>
                      <p className="text-sm text-gray-600">
                        Your chef will arrive on time and provide exceptional service
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary & Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-mono font-bold text-lg">{booking.id}</p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service Amount:</span>
                    <span>₹2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹432</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee:</span>
                    <span>₹99</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid:</span>
                    <span className="text-green-600">₹{booking.totalAmount}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p>Payment Method: {booking.paymentMethod}</p>
                  <p>Transaction ID: TXN-2024-001</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Booking
                  </Button>
                  <Link href="/dashboard" className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">View All Bookings</Button>
                  </Link>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                  <p className="text-yellow-800 font-medium">Cancellation Policy</p>
                  <p className="text-yellow-700 mt-1">
                    Free cancellation up to 24 hours before service. 50% refund for cancellations within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
