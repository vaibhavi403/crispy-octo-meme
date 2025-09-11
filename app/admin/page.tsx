"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  ChefHat,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  MapPin,
} from "lucide-react"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock admin data
  const stats = {
    totalUsers: 2847,
    totalChefs: 156,
    totalBookings: 1234,
    totalRevenue: 2847500,
    activeBookings: 45,
    pendingApprovals: 12,
    completedBookings: 1089,
    cancelledBookings: 100,
  }

  const recentBookings = [
    {
      id: "BK-2024-001",
      customer: "Rahul Sharma",
      chef: "Rajesh Kumar",
      date: "2024-01-15",
      amount: 2847,
      status: "confirmed",
      service: "Home Cooking",
    },
    {
      id: "BK-2024-002",
      customer: "Priya Singh",
      chef: "Marco Rossi",
      date: "2024-01-16",
      amount: 4200,
      status: "pending",
      service: "Party Catering",
    },
    {
      id: "BK-2024-003",
      customer: "Amit Patel",
      chef: "Priya Sharma",
      date: "2024-01-14",
      amount: 1800,
      status: "completed",
      service: "Cooking Class",
    },
  ]

  const pendingChefs = [
    {
      id: "CH-2024-001",
      name: "Vikram Singh",
      email: "vikram@email.com",
      phone: "+91 98765 43210",
      experience: "8 years",
      specialties: ["Rajasthani", "Gujarati"],
      appliedDate: "2024-01-10",
      documents: ["ID Proof", "Experience Certificate", "Food Safety Certificate"],
    },
    {
      id: "CH-2024-002",
      name: "Meera Nair",
      email: "meera@email.com",
      phone: "+91 98765 43211",
      experience: "5 years",
      specialties: ["Kerala", "South Indian"],
      appliedDate: "2024-01-12",
      documents: ["ID Proof", "Experience Certificate"],
    },
  ]

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Book My Chef platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Chefs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalChefs}</p>
                </div>
                <ChefHat className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+15% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+22% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="chefs">Chef Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{booking.id}</span>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {booking.customer} → {booking.chef}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.service} • {booking.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{booking.amount}</p>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="font-medium">{stats.completedBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">Active</span>
                    </div>
                    <span className="font-medium">{stats.activeBookings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="font-medium">{stats.pendingApprovals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Cancelled</span>
                    </div>
                    <span className="font-medium">{stats.cancelledBookings}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chef Management */}
          <TabsContent value="chefs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Chef Approvals ({pendingChefs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingChefs.map((chef) => (
                    <div key={chef.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{chef.name}</h3>
                          <p className="text-gray-600">{chef.email}</p>
                          <p className="text-gray-600">{chef.phone}</p>
                        </div>
                        <Badge variant="secondary">Pending Review</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Experience</p>
                          <p className="text-sm text-gray-600">{chef.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Applied Date</p>
                          <p className="text-sm text-gray-600">{chef.appliedDate}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specialties</p>
                        <div className="flex gap-2">
                          {chef.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="bg-orange-100 text-orange-800">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Documents Submitted</p>
                        <div className="flex gap-2">
                          {chef.documents.map((doc) => (
                            <Badge key={doc} variant="outline" className="text-green-700 border-green-300">
                              ✓ {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-green-600 hover:bg-green-700">Approve Chef</Button>
                        <Button variant="destructive">Reject</Button>
                        <Button variant="outline">Request More Info</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Registered Users</span>
                    <span className="font-bold">{stats.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active This Month</span>
                    <span className="font-bold">1,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>New Registrations (7d)</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Premium Users</span>
                    <span className="font-bold">234</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { city: "New Delhi", users: 847, bookings: 234 },
                    { city: "Mumbai", users: 623, bookings: 189 },
                    { city: "Bangalore", users: 456, bookings: 145 },
                    { city: "Pune", users: 234, bookings: 78 },
                    { city: "Hyderabad", users: 189, bookings: 56 },
                  ].map((location) => (
                    <div key={location.city} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{location.city}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {location.users} users • {location.bookings} bookings
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Revenue</span>
                    <span className="font-bold text-green-600">₹{(stats.totalRevenue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-bold">₹4.2L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform Commission</span>
                    <span className="font-bold">₹42,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Booking Value</span>
                    <span className="font-bold">₹2,847</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Booking Success Rate</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Chef Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">4.7</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Retention</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Chef Utilization</span>
                    <span className="font-bold">67%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
