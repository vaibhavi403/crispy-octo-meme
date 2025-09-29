"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPublicProfile } from "@/utils/supabase/profiles"
import { Profile } from "@/types/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function PublicProfilePage() {
  const params = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const profileId = params.id as string

  useEffect(() => {
    async function fetchProfile() {
      if (!profileId) return

      try {
        setLoading(true)
        const result = await getPublicProfile(profileId)
        
        if (result.error) {
          setError("Profile not found")
          setProfile(null)
        } else {
          setProfile(result.data)
          setError(null)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setError("Failed to load profile")
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [profileId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The profile you're looking for doesn't exist."}</p>
            <Link href="/chefs">
              <Button>Browse All Chefs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isOwnProfile = user?.id === profile.id

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile.display_name?.[0]?.toUpperCase() || profile.first_name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {profile.display_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'User'}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={profile.role === 'chef' ? 'default' : 'secondary'}>
                        {profile.role === 'chef' ? '👨‍🍳 Chef' : '🍽️ Client'}
                      </Badge>
                      {profile.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {isOwnProfile && (
                  <Link href="/profile">
                    <Button variant="outline">Edit Profile</Button>
                  </Link>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.first_name && (
                  <div>
                    <span className="font-medium">First Name:</span>
                    <span className="ml-2 text-muted-foreground">{profile.first_name}</span>
                  </div>
                )}
                {profile.last_name && (
                  <div>
                    <span className="font-medium">Last Name:</span>
                    <span className="ml-2 text-muted-foreground">{profile.last_name}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2 text-muted-foreground">{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2 text-muted-foreground">{profile.phone}</span>
                  </div>
                )}
                {profile.dob && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">Date of Birth:</span>
                    <span className="ml-2 text-muted-foreground">{new Date(profile.dob).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bio */}
            {profile.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{profile.bio}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && profile.role === 'chef' && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-4 justify-center">
                  <Button size="lg">
                    Book This Chef
                  </Button>
                  <Button variant="outline" size="lg">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
