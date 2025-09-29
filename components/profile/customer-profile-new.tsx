"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileEditForm } from "@/components/profile/profile-edit-form"

export function CustomerProfile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and preferences
          </p>
        </div>
        
        <ProfileEditForm />
      </main>
      
      <Footer />
    </div>
  )
}
