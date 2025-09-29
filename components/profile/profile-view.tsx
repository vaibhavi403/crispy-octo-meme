"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Calendar, Edit, User, ChefHat } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Profile } from "@/types/profile"

interface ProfileViewProps {
  profile: Profile | null
  onEdit: () => void
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
  const { user } = useAuth()

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No profile data available
          </div>
        </CardContent>
      </Card>
    )
  }

  const getInitials = () => {
    if (profile.display_name) {
      return profile.display_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    }
    if (profile.first_name || profile.last_name) {
      const name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
      return name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    }
    if (profile.email) {
      return profile.email.substring(0, 2).toUpperCase()
    }
    return "U"
  }

  const getDisplayName = () => {
    if (profile.display_name) {
      return profile.display_name
    }
    if (profile.first_name || profile.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
    }
    if (profile.email) {
      return profile.email
    }
    return 'User'
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={profile.profile_image_path} 
                  alt={getDisplayName()} 
                />
                <AvatarFallback className="bg-orange-500 text-white text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl mb-2">{getDisplayName()}</CardTitle>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="capitalize">
                    {profile.role}
                  </Badge>
                  {profile.location && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                  )}
                </div>
                {profile.bio && (
                  <p className="text-muted-foreground mt-2 max-w-md">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>
            <Button onClick={onEdit} className="bg-orange-500 hover:bg-orange-600">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">First Name</h4>
              <p className="text-lg">{profile?.first_name || "Not provided"}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Last Name</h4>
              <p className="text-lg">{profile?.last_name || "Not provided"}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Display Name</h4>
              <p className="text-lg">{profile?.display_name || "Not set"}</p>
            </div>
            {profile?.dob && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Date of Birth</h4>
                <p className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(profile.dob)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Email</h4>
              <p className="text-lg flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {profile?.email || "Not provided"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Phone</h4>
              <p className="text-lg flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {profile?.phone || "Not provided"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Location</h4>
              <p className="text-lg flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {profile?.location || "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
