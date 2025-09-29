import { createClient } from './client'
import { Profile, ProfileFormData } from '@/types/profile'

const supabase = createClient()

export interface ProfileData {
  id?: string
  role: "chef" | "client"
  display_name?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  location?: string
  dob?: string // date field
  bio?: string
  profile_image_path?: string
  created_at?: string // timestamp with time zone
}

// Create a new profile
export async function createProfile(profileData: Partial<ProfileData>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return { data: null, error }
    }

    console.log('Profile created successfully:', data)
    return { data: data as Profile, error: null }
  } catch (error) {
    console.error('Unexpected error creating profile:', error)
    return { data: null, error }
  }
}

// Get a profile by ID (public access - no auth required)
export async function getPublicProfile(id: string) {
  try {
    // Create a client without authentication for public access
    const { createClient } = await import('@supabase/supabase-js')
    const publicSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    const { data, error } = await publicSupabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching public profile:', error)
      return { data: null, error }
    }

    console.log('Public profile fetched successfully:', data)
    return { data: data as Profile, error: null }
  } catch (error) {
    console.error('Unexpected error fetching public profile:', error)
    return { data: null, error }
  }
}

// Get a profile by ID (authenticated access - for editing)
export async function getProfile(id: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return { data: null, error }
    }

    console.log('Profile fetched successfully:', data)
    return { data: data as Profile, error: null }
  } catch (error) {
    console.error('Unexpected error fetching profile:', error)
    return { data: null, error }
  }
}

// Update a profile
export async function updateProfile(id: string, updates: Partial<ProfileData>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }

    console.log('Profile updated successfully:', data)
    return { data: data as Profile, error: null }
  } catch (error) {
    console.error('Unexpected error updating profile:', error)
    return { data: null, error }
  }
}

// Delete a profile
export async function deleteProfile(id: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting profile:', error)
      return { error }
    }

    console.log('Profile deleted successfully')
    return { error: null }
  } catch (error) {
    console.error('Unexpected error deleting profile:', error)
    return { error }
  }
}

// Get all profiles by role (public access)
export async function getPublicProfilesByRole(role: "chef" | "client") {
  try {
    // Create a client without authentication for public access
    const { createClient } = await import('@supabase/supabase-js')
    const publicSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    const { data, error } = await publicSupabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching public profiles by role:', error)
      return { data: null, error }
    }

    console.log(`Public profiles fetched successfully for role ${role}:`, data?.length || 0, 'profiles')
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error fetching public profiles by role:', error)
    return { data: null, error }
  }
}

// Get all profiles by role (authenticated access)
export async function getProfilesByRole(role: "chef" | "client") {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching profiles by role:', error)
      return { data: null, error }
    }

    console.log(`Profiles fetched successfully for role ${role}:`, data)
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error fetching profiles by role:', error)
    return { data: null, error }
  }
}

// Search profiles by display name or location
export async function searchProfiles(query: string, role?: "chef" | "client") {
  try {
    let queryBuilder = supabase
      .from('profiles')
      .select('*')
      .or(`display_name.ilike.%${query}%,location.ilike.%${query}%,bio.ilike.%${query}%`)

    if (role) {
      queryBuilder = queryBuilder.eq('role', role)
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching profiles:', error)
      return { data: null, error }
    }

    console.log('Profile search completed:', data)
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error searching profiles:', error)
    return { data: null, error }
  }
}

// Upload profile image
export async function uploadProfileImage(file: File, userId: string) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Math.random()}.${fileExt}`
    const filePath = `profile-images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      return { data: null, error: uploadError }
    }

    const { data } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath)

    console.log('Profile image uploaded successfully:', data.publicUrl)
    return { data: data.publicUrl, error: null }
  } catch (error) {
    console.error('Unexpected error uploading image:', error)
    return { data: null, error }
  }
}
