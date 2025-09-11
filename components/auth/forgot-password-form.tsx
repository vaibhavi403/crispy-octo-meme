"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Mail, Phone, ArrowLeft } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [resetType, setResetType] = useState<"email" | "phone">("email")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <ChefHat className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Check Your {resetType === "email" ? "Email" : "Phone"}</h1>
          <p className="text-muted-foreground">
            We've sent password reset instructions to your {resetType === "email" ? "email address" : "phone number"}
          </p>
        </div>

        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the {resetType === "email" ? "email" : "message"}? Check your spam folder or{" "}
              <Button variant="link" className="p-0 h-auto" onClick={() => setIsSubmitted(false)}>
                try again
              </Button>
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <ChefHat className="h-12 w-12 text-primary mx-auto" />
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-muted-foreground">
          Enter your {resetType === "email" ? "email address" : "phone number"} and we'll send you reset instructions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>Choose how you'd like to receive reset instructions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label>Reset via</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={resetType === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResetType("email")}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={resetType === "phone" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResetType("phone")}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Phone
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">{resetType === "email" ? "Email Address" : "Phone Number"}</Label>
              <Input
                id="contact"
                type={resetType === "email" ? "email" : "tel"}
                placeholder={resetType === "email" ? "Enter your email address" : "Enter your phone number"}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1 inline" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
