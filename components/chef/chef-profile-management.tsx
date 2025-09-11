"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, Plus, Save, Camera, Star, MapPin, Clock } from "lucide-react"

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

export function ChefProfileManagement() {
  const [profileData, setProfileData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("chefProfile")
      if (savedProfile) {
        return JSON.parse(savedProfile)
      }
    }
    return {
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      experience: "6-10 years",
      hourlyRate: 800,
      bio: "Passionate chef with 8 years of experience in authentic North Indian cuisine. Specialized in traditional Punjabi and Mughlai dishes. I believe in using fresh, locally sourced ingredients to create memorable dining experiences.",
      specialties: ["North Indian", "Punjabi", "Mughlai"],
      profileImage: "/professional-indian-female-chef-smiling-in-kitchen.jpg",
    }
  })

  const [galleryImages, setGalleryImages] = useState(() => {
    if (typeof window !== "undefined") {
      const savedGallery = localStorage.getItem("chefGallery")
      if (savedGallery) {
        return JSON.parse(savedGallery)
      }
    }
    return [
      "/north-indian-food-platter.jpg",
      "/punjabi-dal-makhani.png",
      "/tandoor-naan-bread.jpg",
      "/butter-chicken-curry.png",
    ]
  })

  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chefProfile", JSON.stringify(profileData))
      console.log("[v0] Profile data auto-saved to localStorage")
    }
  }, [profileData])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chefGallery", JSON.stringify(galleryImages))
      console.log("[v0] Gallery images auto-saved to localStorage")
    }
  }, [galleryImages])

  const handleSpecialtyToggle = (specialty: string) => {
    setProfileData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In real app, upload to server and get URL
      const imageUrl = URL.createObjectURL(file)
      setProfileData((prev) => ({ ...prev, profileImage: imageUrl }))
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file)
      setGalleryImages((prev) => [...prev, imageUrl])
    })
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setSaveStatus("saving")

    try {
      const saveData = {
        ...profileData,
        lastUpdated: new Date().toISOString(),
        userId: "chef_" + profileData.email.replace("@", "_").replace(".", "_"),
      }

      // Simulate API call with more realistic delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      localStorage.setItem("chefProfile", JSON.stringify(saveData))
      localStorage.setItem("chefGallery", JSON.stringify(galleryImages))
      localStorage.setItem("profileLastSaved", new Date().toISOString())

      console.log("[v0] Profile successfully saved with timestamp:", saveData.lastUpdated)

      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("[v0] Error saving profile:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserProfile = (userId: string) => {
    const userProfileKey = `chefProfile_${userId}`
    const savedProfile = localStorage.getItem(userProfileKey)
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile)
      setProfileData(profileData)
      console.log(`[v0] Loaded profile for user: ${userId}`)
      return profileData
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
          <p className="text-muted-foreground">
            Update your professional information and showcase your culinary expertise
          </p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback>{profileData.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      onClick={() => document.getElementById("profile-image")?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a professional photo of yourself in chef attire
                    </p>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={profileData.location}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Showcase your culinary expertise and specialties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={profileData.experience}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                    <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      min="300"
                      max="5000"
                      value={profileData.hourlyRate}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, hourlyRate: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Cuisine Specialties</Label>
                  <p className="text-sm text-muted-foreground">Select all cuisines you specialize in</p>
                  <div className="grid grid-cols-3 gap-3">
                    {cuisineOptions.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={profileData.specialties.includes(cuisine)}
                          onCheckedChange={() => handleSpecialtyToggle(cuisine)}
                        />
                        <Label htmlFor={cuisine} className="text-sm">
                          {cuisine}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {profileData.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profileData.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                          {specialty}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleSpecialtyToggle(specialty)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    rows={5}
                    placeholder="Tell customers about your culinary journey, specialties, and what makes your cooking unique..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">{profileData.bio.length}/500 characters</p>
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
                <CardDescription>This is how customers will see your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback>{profileData.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Chef {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-primary font-medium">{profileData.specialties[0] || "Cuisine Specialist"}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-accent fill-current" />
                          <span>4.9 (127 reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{profileData.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{profileData.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">{profileData.bio}</p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹{profileData.hourlyRate}</span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                    <Button disabled>Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Food Gallery</CardTitle>
                <CardDescription>Showcase your signature dishes and culinary creations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Dish ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" variant="destructive" onClick={() => removeGalleryImage(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Image */}
                  <div
                    className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => document.getElementById("gallery-upload")?.click()}
                  >
                    <div className="text-center">
                      <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Add Photo</p>
                    </div>
                  </div>
                </div>

                <input
                  id="gallery-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                />

                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => document.getElementById("gallery-upload")?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Upload high-quality photos of your signature dishes. Maximum 10 photos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive booking requests and updates via email</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Get instant notifications for urgent booking requests
                      </p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-muted-foreground">Make your profile visible to customers</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                </div>

                <div className="pt-6 border-t space-y-4">
                  <h3 className="font-medium">Account Actions</h3>
                  <div className="flex gap-4">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Download Data</Button>
                    <Button variant="destructive">Deactivate Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            {saveStatus === "saved" && <span className="text-green-600">✓ Changes saved successfully</span>}
            {saveStatus === "saving" && <span className="text-blue-600">Saving changes...</span>}
            {saveStatus === "error" && <span className="text-red-600">Error saving changes. Please try again.</span>}
            {saveStatus === "idle" && profileData.lastUpdated && (
              <span>Last saved: {new Date(profileData.lastUpdated).toLocaleString()}</span>
            )}
          </div>
          <Button onClick={handleSave} disabled={isLoading} size="lg">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
