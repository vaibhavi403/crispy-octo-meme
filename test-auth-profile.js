// Test profile creation with authentication
import { createClient } from './utils/supabase/client.js'

const supabase = createClient()

async function testAuthenticatedProfileCreation() {
  console.log('Testing authenticated profile creation...')
  
  try {
    // First, let's try to sign up a test user
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'test123456'
    
    console.log('1. Signing up test user:', testEmail)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          first_name: 'Test',
          last_name: 'User',
          role: 'client',
          display_name: 'Test User'
        }
      }
    })
    
    if (authError) {
      console.log('Auth signup failed:', authError)
      return
    }
    
    console.log('2. Auth signup successful:', authData.user?.id)
    
    if (authData.user) {
      // Now try to create a profile
      console.log('3. Creating profile for user:', authData.user.id)
      
      const profileData = {
        id: authData.user.id,
        role: 'client',
        email: testEmail,
        first_name: 'Test',
        last_name: 'User',
        display_name: 'Test User'
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single()
      
      if (error) {
        console.log('Profile creation failed:', error)
        console.log('Error details:', JSON.stringify(error, null, 2))
      } else {
        console.log('Profile created successfully:', data)
        
        // Clean up - delete the test user profile
        const { error: deleteError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', authData.user.id)
        
        if (deleteError) {
          console.log('Cleanup failed:', deleteError)
        } else {
          console.log('Test profile cleaned up')
        }
      }
    }
    
  } catch (err) {
    console.log('Unexpected error:', err.message)
  }
}

testAuthenticatedProfileCreation()
