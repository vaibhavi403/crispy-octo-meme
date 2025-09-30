import { createClient } from './client'
import { Profile } from '@/types/profile'

const supabase = createClient()

// Ensure a user has a profile, create one if they don't
export async function ensureUserProfile(userId: string, userData?: Partial<any>): Promise<{ data: Profile | null, error: any }> {
  try {
    console.log('Checking if profile exists for user:', userId)
    
    // First, try to get existing profile
    const { data: existingProfile, error: getError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (existingProfile) {
      console.log('Profile already exists:', existingProfile)
      return { data: existingProfile as Profile, error: null }
    }

    if (getError && getError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking for existing profile:', getError)
      return { data: null, error: getError }
    }

    // Profile doesn't exist, create one
    console.log('Profile does not exist, creating new profile')
    
    // Get user info from Supabase Auth
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Could not get authenticated user:', userError)
      return { data: null, error: userError || new Error('User not authenticated') }
    }

    // Create minimal profile data matching your database schema
    const profileData = {
      id: userId,
      role: userData?.role || 'client', // Default to client if role not specified
      email: user.email,
      first_name: userData?.first_name || user.user_metadata?.first_name || '',
      last_name: userData?.last_name || user.user_metadata?.last_name || '',
      display_name: userData?.display_name || user.user_metadata?.display_name || user.email || 'User',
      phone: userData?.phone || user.user_metadata?.phone,
      location: userData?.location || null,
      dob: userData?.dob || null,
      bio: userData?.bio || null,
      profile_image_path: userData?.profile_image_path || null
      // Note: created_at will be set automatically by the database
    }

    console.log('Creating profile with data:', profileData)

    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single()

    if (createError) {
      console.error('Failed to create profile:', createError)
      return { data: null, error: createError }
    }

    console.log('Profile created successfully:', newProfile)
    return { data: newProfile as Profile, error: null }

  } catch (error) {
    console.error('Unexpected error in ensureUserProfile:', error)
    return { data: null, error }
  }
}
