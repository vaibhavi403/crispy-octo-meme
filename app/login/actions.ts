'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// LOGIN
export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: sessionData, error } = await supabase.auth.signInWithPassword(data)

  console.log('🔎 login attempt:', { email: data.email, error, sessionData })

  if (error) {
    console.error('❌ login error:', error.message)
    // Option 1: redirect with query param
    redirect(`/error?msg=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// SIGNUP
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signupData, error } = await supabase.auth.signUp(data)

  console.log('🔎 signUp result:', { email: data.email, error, signupData })

  if (error) {
    console.error('❌ signup error:', error.message)
    redirect('/error')
  }

  // If email confirmations are ON, user must click the link in their inbox
  // Best UX: redirect to a "Check your email" page instead of `/`
  redirect('/check-email')
}
