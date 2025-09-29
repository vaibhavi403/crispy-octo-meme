"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChefHat, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { ProfileButton } from "@/components/profile-button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  // Debug logging
  console.log("Header render - isAuthenticated:", isAuthenticated, "user:", user, "isLoading:", isLoading)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Book My Chef</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/chefs" className="text-foreground hover:text-primary transition-colors">
              Find Chefs
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/help" className="text-foreground hover:text-primary transition-colors">
              Help
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth/User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : !isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              </>
            ) : (
              <>
                <ProfileButton />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/chefs" className="text-foreground hover:text-primary transition-colors">
                Find Chefs
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/help" className="text-foreground hover:text-primary transition-colors">
                Help
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>

              {isLoading ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : !isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-3 p-3 mb-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white font-medium text-sm">
                      {user?.role === "chef" ? "👨‍🍳" : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user?.display_name || `${user?.first_name} ${user?.last_name}`}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                  </div>
                  
                  {user?.role === "client" && (
                    <>
                      <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/bookings">
                        <Button variant="ghost" className="w-full justify-start">
                          My Bookings
                        </Button>
                      </Link>
                    </>
                  )}
                  {user?.role === "chef" && (
                    <>
                      <Link href="/chef/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                          Chef Dashboard
                        </Button>
                      </Link>
                      <Link href="/chef/profile">
                        <Button variant="ghost" className="w-full justify-start">
                          Manage Profile
                        </Button>
                      </Link>
                    </>
                  )}
                  <Button variant="ghost" className="w-full justify-start">
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
