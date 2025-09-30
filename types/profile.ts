// Profile types matching the actual database schema
export interface BaseProfile {
  id: string
  role: "chef" | "client"
  display_name?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  location?: string
  dob?: string
  bio?: string
  profile_image_path?: string
  created_at?: string
}

// Chef profile (same as base for now)
export interface ChefProfile extends BaseProfile {
  role: "chef"
}

// Client profile (same as base for now)
export interface ClientProfile extends BaseProfile {
  role: "client"
}

// Union type for all profiles
export type Profile = ChefProfile | ClientProfile

// For form data that might have incomplete information
export interface ProfileFormData {
  id?: string
  role?: "chef" | "client"
  display_name?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  location?: string
  dob?: string
  bio?: string
  profile_image_path?: string
}

// Props for profile components
export interface ProfileViewProps {
  profile: Profile | null
  onEdit: () => void
}

export interface ProfileEditFormProps {
  profile?: Profile | null
  onSave?: (data: ProfileFormData) => void
  onCancel?: () => void
  isEditable?: boolean
}
