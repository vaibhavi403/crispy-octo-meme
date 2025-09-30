"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Upload, Save, Trash2, MapPin, Phone, Mail, User, Camera } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { updateProfile as updateSupabaseProfile, uploadProfileImage } from "@/utils/supabase/profiles"
import { useToast } from "@/hooks/use-toast"
import { Profile, ProfileFormData } from "@/types/profile"

interface ProfileEditFormProps {
  profile?: Profile | null
  onSave?: (data: ProfileFormData) => void
  onCancel?: () => void
  isEditable?: boolean
}

export function ProfileEditForm({ profile, onSave, onCancel, isEditable = true }: ProfileEditFormProps) {
  const { user, updateProfile: updateAuthProfile } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [profileData, setProfileData] = useState<ProfileFormData>({
    first_name: "",
    last_name: "",
    display_name: "",
    email: "",
    phone: "",
    location: "",
    dob: "",
    bio: "",
    profile_image_path: "",
  })

  useEffect(() => {
    if (profile) {
      setProfileData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        display_name: profile.display_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        dob: profile.dob || "",
        bio: profile.bio || "",
        profile_image_path: profile.profile_image_path || "",
      })
    } else if (user) {
      setProfileData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        display_name: user.display_name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        dob: user.dob || "",
        bio: user.bio || "",
        profile_image_path: user.profile_image_path || "",
      })
    }
  }, [profile, user])

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      console.log('Starting profile save with data:', profileData)
      
      let imageUrl = profileData.profile_image_path

      // Upload image if a new one was selected
      if (imageFile) {
        console.log('Uploading new profile image...')
        const { data: uploadData, error: uploadError } = await uploadProfileImage(imageFile, user.id)
        if (uploadError) {
          console.error('Image upload error:', uploadError)
          throw new Error("Failed to upload image")
        }
        console.log('Image uploaded successfully:', uploadData)
        imageUrl = uploadData || profileData.profile_image_path
      }

      // Update profile data
      const updateData: ProfileFormData = {
        ...profileData,
        profile_image_path: imageUrl
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })

      if (onSave) {
        console.log('Calling onSave callback...')
        onSave(updateData)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    const name = profileData.display_name || `${profileData.first_name} ${profileData.last_name}`
    return name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={imagePreview || profileData.profile_image_path} 
                  alt={profileData.display_name || "Profile"} 
                />
                <AvatarFallback className="bg-orange-500 text-white text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {isEditable && (
                <Label 
                  htmlFor="profile-image" 
                  className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </Label>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">
                {profileData.display_name || `${profileData.first_name} ${profileData.last_name}` || "Your Profile"}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="capitalize">
                  {user?.role}
                </Badge>
                {profileData.location && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {profileData.location}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profileData.first_name || ""}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="Enter your first name"
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profileData.last_name || ""}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Enter your last name"
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={profileData.display_name || ""}
                  onChange={(e) => handleInputChange("display_name", e.target.value)}
                  placeholder="How you want to be displayed"
                  disabled={!isEditable}
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={profileData.dob || ""}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  disabled={!isEditable}
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-10"
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={profileData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, State"
                    className="pl-10"
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div>
                <Label htmlFor="bio">About Me</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio || ""}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={6}
                  disabled={!isEditable}
                />
              </div>
            </TabsContent>
          </Tabs>

          {isEditable && (
            <div className="flex justify-end gap-4 pt-6 border-t">
              {onCancel && (
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
