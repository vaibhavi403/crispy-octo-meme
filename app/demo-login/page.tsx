"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChefHat, User, MapPin } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { demoUsers, createDemoSession } from "@/lib/demo-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DemoLoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleDemoLogin = async (userId: string) => {
    setIsLoading(userId)
    
    try {
      const user = demoUsers.find(u => u.id === userId)
      if (user) {
        // Create demo session
        createDemoSession(user.email)
        
        // Login through auth context
        login(user)
        
        // Redirect based on role
        if (user.role === "chef") {
          router.push("/chef/dashboard")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (error) {
      console.error("Demo login error:", error)
    } finally {
      setIsLoading(null)
    }
  }

  const clientUsers = demoUsers.filter(user => user.role === "client")
  const chefUsers = demoUsers.filter(user => user.role === "chef")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Demo Login</h1>
            <p className="text-gray-600">
              Choose a demo user to test the application functionality
            </p>
          </div>

          {/* Client Users */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-6 w-6 text-blue-500" />
              Client Users
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clientUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.profile_image_path} alt={user.display_name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {(user.first_name?.[0] || 'U')}{(user.last_name?.[0] || 'U')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{user.display_name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      Client
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {user.bio}
                    </p>
                    <Button
                      onClick={() => handleDemoLogin(user.id)}
                      disabled={isLoading === user.id}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      {isLoading === user.id ? "Logging in..." : "Login as Client"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chef Users */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-orange-500" />
              Chef Users
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chefUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.profile_image_path} alt={user.display_name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {(user.first_name?.[0] || 'C')}{(user.last_name?.[0] || 'C')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{user.display_name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit bg-orange-100 text-orange-600">
                      Chef
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {user.bio}
                    </p>
                    <Button
                      onClick={() => handleDemoLogin(user.id)}
                      disabled={isLoading === user.id}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      {isLoading === user.id ? "Logging in..." : "Login as Chef"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Card className="inline-block p-4 bg-blue-50 border-blue-200">
              <CardDescription className="text-blue-700">
                💡 This is a demo environment. All data is simulated for testing purposes.
              </CardDescription>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
