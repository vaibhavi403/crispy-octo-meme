// Profile types based on our SQL schema
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

// Chef-specific profile fields
export interface ChefProfile extends BaseProfile {
  role: "chef"
  experience?: string
  specialties?: string
  hourly_rate?: number
  certifications?: string
  availability?: string
}

// Client-specific profile fields
export interface ClientProfile extends BaseProfile {
  role: "client"
  dietary_preferences?: string
  favorite_cuisines?: string
  allergies?: string
  cooking_skill_level?: string
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
  // Chef fields
  experience?: string
  specialties?: string
  hourly_rate?: number | string
  certifications?: string
  availability?: string
  // Client fields
  dietary_preferences?: string
  favorite_cuisines?: string
  allergies?: string
  cooking_skill_level?: string
}

// Props for profile components
export interface ProfileViewProps {
  profileData: Profile
  onEdit: () => void
}

export interface ProfileEditFormProps {
  initialData?: ProfileFormData
  onSave?: (data: Profile) => void
  isEditable?: boolean
}
