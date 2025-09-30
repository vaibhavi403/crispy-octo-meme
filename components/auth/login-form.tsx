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
import { createProfile, getProfile } from "@/utils/supabase/profiles"
import { createClient } from "@/utils/supabase/client"
import { ensureUserProfile } from "@/utils/supabase/ensure-profile"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginType, setLoginType] = useState<"email" | "phone">("email")
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent, userRole: "client" | "chef") => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const emailOrPhone = formData.get("emailOrPhone") as string
      const password = formData.get("password") as string

      const supabase = createClient()

      // Try to sign in with Supabase Auth
      console.log('Attempting Supabase Auth login...')
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: emailOrPhone,
        password: password
      })

      if (authError) {
        console.error('Supabase Auth login failed:', authError)
        alert(`Login failed: ${authError.message}`)
        setIsLoading(false)
        return
      }

      console.log('Supabase Auth login successful:', authData)

      // Ensure user has a profile (create one if they don't)
      let userData
      if (authData.user) {
        try {
          console.log('Ensuring user has a profile...')
          const profileResult = await ensureUserProfile(authData.user.id, { role: userRole })
          
          if (profileResult.data) {
            userData = profileResult.data
            console.log('Profile loaded/created:', userData)
          } else {
            console.error('Failed to ensure profile:', profileResult.error)
            // Fallback to minimal user data
            userData = {
              id: authData.user.id,
              role: userRole,
              email: authData.user.email,
              display_name: authData.user.email || 'User'
            }
          }
        } catch (error) {
          console.error('Error ensuring profile:', error)
          // Fallback to minimal user data
          userData = {
            id: authData.user.id,
            role: userRole,
            email: authData.user.email,
            display_name: authData.user.email || 'User'
          }
        }
      }

      if (userData) {
        login(userData as any)

        // Redirect to appropriate dashboard
        if (userRole === "client") {
          router.push("/dashboard")
        } else {
          router.push("/chef/dashboard")
        }
      }

    } catch (error) {
      console.error('Login error:', error)
      alert('Something went wrong during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async (userRole: "client" | "chef") => {
    setIsLoading(true)
    
    try {
      const supabase = createClient()
      
      // Sign in with Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            role: userRole
          }
        }
      })

      if (error) {
        console.error('Google login failed:', error)
        alert(`Google login failed: ${error.message}`)
      }
      
      // The redirect will happen automatically if successful
    } catch (error) {
      console.error('Google login error:', error)
      alert('Something went wrong with Google login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <ChefHat className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your Book My Chef account</p>
      </div>

      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="client">Client</TabsTrigger>
          <TabsTrigger value="chef">Chef</TabsTrigger>
        </TabsList>

        <TabsContent value="client">
          <Card>
            <CardHeader>
              <CardTitle>Client Login</CardTitle>
              <CardDescription>Access your bookings and find amazing chefs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => handleLogin(e, "client")} className="space-y-4">
                <div className="space-y-2">
                  <Label>Login with</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={loginType === "email" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoginType("email")}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginType === "phone" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoginType("phone")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Phone
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-login">{loginType === "email" ? "Email Address" : "Phone Number"}</Label>
                  <Input
                    id="customer-login"
                    name="emailOrPhone"
                    type={loginType === "email" ? "email" : "tel"}
                    placeholder={loginType === "email" ? "Enter your email" : "Enter your phone number"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="customer-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
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
                onClick={() => handleGoogleLogin("client")}
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

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chef">
          <Card>
            <CardHeader>
              <CardTitle>Chef Login</CardTitle>
              <CardDescription>Access your chef dashboard and manage bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => handleLogin(e, "chef")} className="space-y-4">
                <div className="space-y-2">
                  <Label>Login with</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={loginType === "email" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoginType("email")}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginType === "phone" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoginType("phone")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Phone
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chef-login">{loginType === "email" ? "Email Address" : "Phone Number"}</Label>
                  <Input
                    id="chef-login"
                    name="emailOrPhone"
                    type={loginType === "email" ? "email" : "tel"}
                    placeholder={loginType === "email" ? "Enter your email" : "Enter your phone number"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chef-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="chef-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
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
                onClick={() => handleGoogleLogin("chef")}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
