"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ChefHat, Mail, Phone, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createProfile } from "@/utils/supabase/profiles"
import { createClient } from "@/utils/supabase/client"

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupType, setSignupType] = useState<"email" | "phone">("email")
  const router = useRouter()
  const { login } = useAuth()

  const handleSignup = async (e: React.FormEvent, userRole: "client" | "chef") => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const firstName = formData.get("firstName") as string
      const lastName = formData.get("lastName") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string
      const password = formData.get("password") as string
      const confirmPassword = formData.get("confirmPassword") as string

      // Basic validation
      if (password !== confirmPassword) {
        alert("Passwords don't match!")
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long!")
        setIsLoading(false)
        return
      }

      const supabase = createClient()

      // Sign up with Supabase Auth
      console.log('Signing up with Supabase Auth...')
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupType === "email" ? email : `${phone}@temp.com`, // Use email or create temp email for phone
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: userRole,
            phone: signupType === "phone" ? phone : undefined,
            display_name: `${firstName} ${lastName}`
          }
        }
      })

      if (authError) {
        console.error('Supabase Auth signup failed:', authError)
        alert(`Signup failed: ${authError.message}`)
        setIsLoading(false)
        return
      }

      console.log('Supabase Auth signup successful:', authData)

      // Create profile data
      const userData = {
        id: authData.user?.id,
        role: userRole,
        email: signupType === "email" ? email : undefined,
        phone: signupType === "phone" ? phone : undefined,
        first_name: firstName,
        last_name: lastName,
        display_name: `${firstName} ${lastName}`,
        created_at: new Date().toISOString()
      }

      console.log('Creating profile with data:', userData)

      // Create profile in database (this will work now that user is authenticated)
      try {
        const result = await createProfile(userData)
        if (result.error) {
          console.error('Profile creation failed:', result.error)
          // Don't fail completely - the user account was created
          console.log('User account created but profile creation failed')
        } else {
          console.log('Profile successfully created:', result.data)
        }
      } catch (error) {
        console.error('Unexpected error during profile creation:', error)
        // Don't fail completely - the user account was created
      }

      // Update local auth context
      login(userData as any) // Type will be properly handled by the auth context

      // Redirect to confirmation page
      router.push("/check-email")

    } catch (error) {
      console.error('Signup error:', error)
      alert('Something went wrong during signup. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async (userRole: "client" | "chef") => {
    setIsLoading(true)
    
    try {
      const supabase = createClient()
      
      // Sign up with Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/check-email`,
          queryParams: {
            role: userRole
          }
        }
      })

      if (error) {
        console.error('Google signup failed:', error)
        alert(`Google signup failed: ${error.message}`)
      }
      
      // The redirect will happen automatically if successful
    } catch (error) {
      console.error('Google signup error:', error)
      alert('Something went wrong with Google signup. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <ChefHat className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">Join Book My Chef and start your culinary journey</p>
      </div>

      <Tabs defaultValue="client" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="client">Client</TabsTrigger>
          <TabsTrigger value="chef">Chef</TabsTrigger>
        </TabsList>

        <TabsContent value="client">
          <Card>
            <CardHeader>
              <CardTitle>Client Signup</CardTitle>
              <CardDescription>Create an account to book amazing chefs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => handleSignup(e, "client")} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-first-name">First Name</Label>
                    <Input
                      id="client-first-name"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-last-name">Last Name</Label>
                    <Input
                      id="client-last-name"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sign up with</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={signupType === "email" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSignupType("email")}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={signupType === "phone" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSignupType("phone")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Phone
                    </Button>
                  </div>
                </div>

                {signupType === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email Address</Label>
                    <Input
                      id="client-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone Number</Label>
                    <Input
                      id="client-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="client-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="client-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="client-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleGoogleSignup("client")}
                disabled={isLoading}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chef">
          <Card>
            <CardHeader>
              <CardTitle>Chef Signup</CardTitle>
              <CardDescription>Join our platform and showcase your culinary skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => handleSignup(e, "chef")} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="chef-first-name">First Name</Label>
                    <Input
                      id="chef-first-name"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chef-last-name">Last Name</Label>
                    <Input
                      id="chef-last-name"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sign up with</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={signupType === "email" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSignupType("email")}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={signupType === "phone" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSignupType("phone")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Phone
                    </Button>
                  </div>
                </div>

                {signupType === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="chef-email">Email Address</Label>
                    <Input
                      id="chef-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="chef-phone">Phone Number</Label>
                    <Input
                      id="chef-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="chef-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="chef-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chef-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="chef-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Chef Account"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleGoogleSignup("chef")}
                disabled={isLoading}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
