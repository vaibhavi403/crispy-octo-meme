"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Star, Search, Plus, Bell, User } from "lucide-react"
import Link from "next/link"

// Mock data
const upcomingBookings = [
  {
    id: 1,
    chef: "Chef Priya Sharma",
    chefImage: "/professional-indian-female-chef-smiling-in-kitchen.jpg",
    cuisine: "North Indian",
    date: "2024-01-15",
    time: "18:00",
    duration: "3 hours",
    location: "Home Kitchen",
    status: "confirmed",
    totalAmount: 2400,
  },
  {
    id: 2,
    chef: "Chef Rajesh Kumar",
    chefImage: "/professional-indian-male-chef-in-white-uniform-coo.jpg",
    cuisine: "South Indian",
    date: "2024-01-20",
    time: "12:00",
    duration: "4 hours",
    location: "Home Kitchen",
    status: "pending",
    totalAmount: 3000,
  },
]

const pastBookings = [
  {
    id: 3,
    chef: "Chef Maria D'Souza",
    chefImage: "/professional-female-chef-preparing-continental-dis.jpg",
    cuisine: "Continental",
    date: "2024-01-05",
    time: "19:00",
    duration: "2 hours",
    location: "Home Kitchen",
    status: "completed",
    totalAmount: 1800,
    rating: 5,
    review: "Absolutely amazing! The pasta was restaurant quality.",
  },
]

const notifications = [
  {
    id: 1,
    type: "booking_confirmed",
    message: "Your booking with Chef Priya Sharma has been confirmed for Jan 15th",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "chef_message",
    message: "Chef Rajesh sent you a message about your upcoming booking",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "review_reminder",
    message: "Please rate your experience with Chef Maria D'Souza",
    time: "3 days ago",
    read: true,
  },
]

export function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Anita!</h1>
              <p className="text-muted-foreground">Manage your bookings and discover amazing chefs</p>
            </div>
            <div className="flex gap-3">
              <Link href="/chefs">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Find Chefs
                </Button>
              </Link>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pastBookings.length + upcomingBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
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
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Average Rating Given</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="space-y-6">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your confirmed and pending chef bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={booking.chefImage || "/placeholder.svg"}
                              alt={booking.chef}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{booking.chef}</h3>
                              <p className="text-sm text-muted-foreground">{booking.cuisine}</p>
                            </div>
                          </div>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {booking.time} ({booking.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="font-semibold">Total: ₹{booking.totalAmount}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {booking.status === "pending" && (
                              <Button variant="destructive" size="sm">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                      <p className="text-muted-foreground mb-4">Book a chef to get started</p>
                      <Link href="/chefs">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Book a Chef
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Past Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Past Bookings</CardTitle>
                  <CardDescription>Your completed chef experiences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.chefImage || "/placeholder.svg"}
                            alt={booking.chef}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{booking.chef}</h3>
                            <p className="text-sm text-muted-foreground">{booking.cuisine}</p>
                          </div>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {booking.time} ({booking.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-accent fill-current" />
                          <span>{booking.rating}/5</span>
                        </div>
                      </div>

                      {booking.review && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">"{booking.review}"</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="font-semibold">Total: ₹{booking.totalAmount}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Rebook Chef
                          </Button>
                          <Button variant="outline" size="sm">
                            View Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Chefs</CardTitle>
                <CardDescription>Chefs you've saved for future bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorite chefs yet</h3>
                  <p className="text-muted-foreground mb-4">Save chefs you love to easily book them again</p>
                  <Link href="/chefs">
                    <Button>Discover Chefs</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with your bookings and messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 ${!notification.read ? "bg-primary/5 border-primary/20" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input defaultValue="Anita Patel" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="anita.patel@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input defaultValue="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input defaultValue="Mumbai, Maharashtra" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dietary Preferences</label>
                      <Input placeholder="e.g., Vegetarian, Vegan, No Nuts" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kitchen Type</label>
                      <Input defaultValue="Home Kitchen" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Change Password</Button>
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
