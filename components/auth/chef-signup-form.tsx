"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Mail, Phone, Eye, EyeOff, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"

const cuisineOptions = [
  "North Indian",
  "South Indian",
  "Punjabi",
  "Gujarati",
  "Bengali",
  "Maharashtrian",
  "Rajasthani",
  "Chinese",
  "Continental",
  "Italian",
  "Mediterranean",
  "Thai",
  "Mexican",
  "Japanese",
]

const experienceLevels = ["1-2 years", "3-5 years", "6-10 years", "10+ years"]

export function ChefSignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupType, setSignupType] = useState<"email" | "phone">("email")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const router = useRouter()

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    if (selectedCuisines.length === 0) {
      alert("Please select at least one cuisine specialty")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful signup - redirect to verification
    router.push("/chef/verify-profile")

    setIsLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <ChefHat className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">Join as a Professional Chef</h1>
        <p className="text-muted-foreground">Share your culinary expertise and connect with food lovers across India</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chef Registration</CardTitle>
          <CardDescription>Complete your profile to start receiving booking requests from customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Contact Method</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={signupType === "email" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSignupType("email")}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={signupType === "phone" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSignupType("phone")}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Phone
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">{signupType === "email" ? "Email Address" : "Phone Number"}</Label>
                <Input
                  id="contact"
                  type={signupType === "email" ? "email" : "tel"}
                  placeholder={signupType === "email" ? "Enter your email" : "Enter your phone number"}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Primary Location</Label>
                  <Input id="location" placeholder="e.g., Mumbai, Delhi" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <Input id="hourlyRate" type="number" placeholder="e.g., 800" min="300" max="5000" required />
              </div>

              <div className="space-y-2">
                <Label>Cuisine Specialties</Label>
                <p className="text-sm text-muted-foreground">Select all cuisines you specialize in</p>
                <div className="grid grid-cols-3 gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={() => handleCuisineToggle(cuisine)}
                      />
                      <Label htmlFor={cuisine} className="text-sm">
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedCuisines.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCuisines.map((cuisine) => (
                      <Badge key={cuisine} variant="secondary" className="flex items-center gap-1">
                        {cuisine}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleCuisineToggle(cuisine)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell customers about your culinary journey, specialties, and what makes your cooking unique..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("profileImage")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  {profileImage && <span className="text-sm text-muted-foreground">{profileImage.name}</span>}
                </div>
                <p className="text-xs text-muted-foreground">Upload a professional photo of yourself in chef attire</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                ,{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link href="/chef/guidelines" className="text-primary hover:underline">
                  Chef Guidelines
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !agreedToTerms || selectedCuisines.length === 0}
            >
              {isLoading ? "Creating chef profile..." : "Create Chef Profile"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have a chef account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
