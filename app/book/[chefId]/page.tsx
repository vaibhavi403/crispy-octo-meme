"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Users, CreditCard, Shield, User, MapPin } from "lucide-react"
import { format } from "date-fns"

export default function BookChefPage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [guests, setGuests] = useState("2")
  const [serviceType, setServiceType] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    foodType: "",
    occasionType: "",
    dietaryRestrictions: "",
    allergies: "",
    preferredCuisine: "",
    budgetRange: "",
    additionalNotes: "",
  })

  // Mock chef data
  const chef = {
    id: params.chefId,
    name: "Rajesh Kumar",
    image: "/professional-indian-chef.jpg",
    rating: 4.8,
    reviews: 156,
    specialties: ["North Indian", "Punjabi", "Tandoor"],
    hourlyRate: 1500,
    minimumHours: 3,
  }

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ]

  const serviceTypes = [
    { value: "home-cooking", label: "Home Cooking", price: 1500 },
    { value: "party-catering", label: "Party Catering", price: 2000 },
    { value: "cooking-class", label: "Cooking Class", price: 1800 },
    { value: "meal-prep", label: "Meal Prep", price: 1200 },
  ]

  const foodTypes = ["Vegetarian", "Non-Vegetarian", "Vegan", "Jain", "Mixed"]
  const occasionTypes = [
    "Family Dinner",
    "Birthday Party",
    "Anniversary",
    "Festival Celebration",
    "Corporate Event",
    "Wedding Function",
    "Casual Meal",
    "Special Diet Meal",
  ]
  const cuisinePreferences = [
    "North Indian",
    "South Indian",
    "Punjabi",
    "Gujarati",
    "Bengali",
    "Chinese",
    "Continental",
    "Italian",
    "Thai",
    "Mexican",
  ]

  const calculateTotal = () => {
    const selectedService = serviceTypes.find((s) => s.value === serviceType)
    const basePrice = selectedService?.price || chef.hourlyRate
    const guestCount = Number.parseInt(guests)
    const hours = chef.minimumHours

    const subtotal = basePrice * hours * (guestCount > 4 ? 1.2 : 1)
    const tax = subtotal * 0.18 // 18% GST
    const platformFee = 99

    return {
      subtotal: Math.round(subtotal),
      tax: Math.round(tax),
      platformFee,
      total: Math.round(subtotal + tax + platformFee),
    }
  }

  const handleBooking = async () => {
    setIsLoading(true)

    const bookingData = {
      chefId: chef.id,
      chefName: chef.name,
      customer: customerDetails,
      bookingDetails: {
        date: selectedDate,
        time: selectedTime,
        guests: Number.parseInt(guests),
        serviceType,
        address: customerDetails.address,
        specialRequests,
        paymentMethod,
        pricing: calculateTotal(),
      },
      timestamp: new Date().toISOString(),
      status: "pending",
    }

    console.log("[v0] Booking submitted with data:", bookingData)

    const existingBookings = JSON.parse(localStorage.getItem("customerBookings") || "[]")
    existingBookings.push(bookingData)
    localStorage.setItem("customerBookings", JSON.stringify(existingBookings))

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Redirect to confirmation page with booking data
    localStorage.setItem("latestBooking", JSON.stringify(bookingData))
    window.location.href = "/booking/confirmation"
  }

  const pricing = calculateTotal()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chef Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={chef.image || "/placeholder.svg"}
                    alt={chef.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{chef.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-yellow-500">★</span>
                      <span>
                        {chef.rating} ({chef.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {chef.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-orange-100 text-orange-800">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={customerDetails.firstName}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={customerDetails.lastName}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                  <Input
                    id="alternatePhone"
                    placeholder="+91 87654 32109"
                    value={customerDetails.alternatePhone}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, alternatePhone: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={selectedTime === time ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Service & Food Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service-type">Service Type *</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label} - ₹{service.price}/hr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="foodType">Food Type *</Label>
                    <Select
                      value={customerDetails.foodType}
                      onValueChange={(value) => setCustomerDetails((prev) => ({ ...prev, foodType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select food type" />
                      </SelectTrigger>
                      <SelectContent>
                        {foodTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="occasionType">Occasion Type</Label>
                    <Select
                      value={customerDetails.occasionType}
                      onValueChange={(value) => setCustomerDetails((prev) => ({ ...prev, occasionType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        {occasionTypes.map((occasion) => (
                          <SelectItem key={occasion} value={occasion}>
                            {occasion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredCuisine">Preferred Cuisine</Label>
                  <Select
                    value={customerDetails.preferredCuisine}
                    onValueChange={(value) => setCustomerDetails((prev) => ({ ...prev, preferredCuisine: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisinePreferences.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine}>
                          {cuisine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                    <Input
                      id="dietaryRestrictions"
                      placeholder="e.g., No onion, No garlic"
                      value={customerDetails.dietaryRestrictions}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, dietaryRestrictions: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Food Allergies</Label>
                    <Input
                      id="allergies"
                      placeholder="e.g., Nuts, Dairy, Gluten"
                      value={customerDetails.allergies}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, allergies: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Service Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="House/Flat No., Building Name, Street Name"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="landmark">Landmark</Label>
                    <Input
                      id="landmark"
                      placeholder="Near Metro Station"
                      value={customerDetails.landmark}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, landmark: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Mumbai"
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="400001"
                      value={customerDetails.pincode}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, pincode: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="special-requests">Special Requests & Additional Notes</Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any specific dishes you'd like, cooking preferences, or special instructions for the chef"
                    value={customerDetails.additionalNotes}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {[
                    { id: "card", label: "Credit/Debit Card", icon: "💳" },
                    { id: "upi", label: "UPI Payment", icon: "📱" },
                    { id: "wallet", label: "Digital Wallet", icon: "💰" },
                    { id: "cash", label: "Cash on Service", icon: "💵" },
                  ].map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{method.icon}</span>
                        <span className="font-medium">{method.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-medium">
                      {customerDetails.firstName && customerDetails.lastName
                        ? `${customerDetails.firstName} ${customerDetails.lastName}`
                        : "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium">{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">
                      {serviceTypes.find((s) => s.value === serviceType)?.label || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food Type:</span>
                    <span className="font-medium">{customerDetails.foodType || "Not selected"}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({chef.minimumHours}hrs):</span>
                    <span>₹{pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{pricing.tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee:</span>
                    <span>₹{pricing.platformFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-orange-600">₹{pricing.total}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2 text-green-700">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Secure Booking</span>
                  </div>
                  <p className="text-green-600 mt-1">
                    Your payment is protected. Cancel up to 24 hours before service for full refund.
                  </p>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={
                    !selectedDate ||
                    !selectedTime ||
                    !serviceType ||
                    !customerDetails.firstName ||
                    !customerDetails.lastName ||
                    !customerDetails.email ||
                    !customerDetails.phone ||
                    !customerDetails.address ||
                    !customerDetails.city ||
                    !customerDetails.pincode ||
                    !customerDetails.foodType ||
                    !paymentMethod ||
                    isLoading
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                  size="lg"
                >
                  {isLoading ? "Processing..." : `Confirm Booking - ₹${pricing.total}`}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
