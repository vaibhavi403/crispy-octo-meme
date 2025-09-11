"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChefHat, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Mock authentication state - in real app, this would come from auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<"customer" | "chef" | "admin">("customer")

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
            {!isAuthenticated ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                </Link>
                <Link href="/chef/join">
                  <Button variant="secondary">Join as Chef</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {userType === "customer" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/bookings">My Bookings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {userType === "chef" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/chef/dashboard">Chef Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/chef/profile">Manage Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/chef/bookings">My Bookings</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {userType === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                  </Link>
                  <Link href="/chef/join">
                    <Button variant="secondary" className="w-full">
                      Join as Chef
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {userType === "customer" && (
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
                  {userType === "chef" && (
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
                  {userType === "admin" && (
                    <Link href="/admin">
                      <Button variant="ghost" className="w-full justify-start">
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" className="w-full justify-start">
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600"
                    onClick={() => setIsAuthenticated(false)}
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
