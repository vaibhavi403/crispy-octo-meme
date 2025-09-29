"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileView } from "@/components/profile/profile-view"
import { ProfileEditForm } from "@/components/profile/profile-edit-form"
import { useAuth } from "@/contexts/auth-context"
import { getProfile, updateProfile as updateSupabaseProfile } from "@/utils/supabase/profiles"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Profile, ProfileFormData } from "@/types/profile"
import { Card } from "@/components/ui/card"


export function CustomerProfile() {
  const { user, updateProfile: updateAuthProfile, isAuthenticated } = useAuth()
  const [profileData, setProfileData] = useState<Profile | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Authentication check
  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Role check - ensure only clients can access this component
  if (user.role !== "client") {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">This page is only available for clients.</p>
            <Button asChild>
              <Link href={user.role === "chef" ? "/chef/profile" : "/dashboard"}>
                Go to Your Dashboard
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("CustomerProfile: Current user:", user)
      
      if (!user?.id) {
        console.log("CustomerProfile: No user ID found, stopping fetch")
        setIsLoading(false)
        return
      }

      const userRole = user.role
      console.log("CustomerProfile: User role:", userRole)
      
      if (userRole !== "client") {
        console.log("CustomerProfile: User is not a client, role:", userRole)
        setIsLoading(false)
        return
      }

      try {
        console.log("CustomerProfile: Fetching profile for user:", user.id)
        const result = await getProfile(user.id)
        console.log("CustomerProfile: Fetched profile result:", result)
        
        if (result.data) {
          console.log("CustomerProfile: Setting profile data:", result.data)
          setProfileData(result.data)
        } else if (result.error) {
          console.error("CustomerProfile: Profile fetch error:", result.error)
          setError("Failed to load profile")
        }
      } catch (error) {
        console.error("CustomerProfile: Error fetching profile:", error)
        setError("Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user?.id, user?.role])

  const handleSave = async (formData: ProfileFormData) => {
    if (!user?.id) return

    try {
      console.log("Saving profile data:", formData)
      
      // Convert form data to the correct format
      const profileUpdate = {
        ...formData,
        hourly_rate: formData.hourly_rate ? Number(formData.hourly_rate) : undefined
      }
      
      // Update in Supabase
      const result = await updateSupabaseProfile(user.id, profileUpdate)
      console.log("Updated profile:", result)
      
      if (result.data) {
        // Update local state
        setProfileData(result.data)
        
        // Update auth context
        updateAuthProfile(result.data)
        
        // Exit edit mode
        setIsEditMode(false)
      } else if (result.error) {
        console.error("Profile update error:", result.error)
        setError("Failed to save profile")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      setError("Failed to save profile")
    }
  }

  const handleCancel = () => {
    setIsEditMode(false)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <div className="text-center">Loading profile...</div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <div className="text-center text-red-600">{error}</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditMode && (
          <Button onClick={() => setIsEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {isEditMode ? (
        <ProfileEditForm
          profile={profileData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileView 
          profile={profileData} 
          onEdit={() => setIsEditMode(true)}
        />
      )}
    </div>
  )
}
