"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, ChefHat, Calendar, UserCog } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function ProfileButton() {
  const { user, logout } = useAuth()

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getProfileEmoji = () => {
    switch (user.role) {
      case "chef":
        return "👨‍🍳"
      default:
        return "�"
    }
  }

  const getDisplayName = () => {
    return user.display_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User'
  }

  return (
    <div className="relative">
      {/* Main Profile Button - Clickable to go to profile */}
      <Button
        asChild
        variant="ghost"
        className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200"
      >
        <Link href={user.role === "client" ? "/profile" : "/chef/profile"}>
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white font-medium text-sm">
            {user.profile_image_path ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profile_image_path} alt={getDisplayName()} />
                <AvatarFallback className="bg-orange-500 text-white text-xs">
                  {getInitials(getDisplayName())}
                </AvatarFallback>
              </Avatar>
            ) : (
              <span className="text-lg">{getProfileEmoji()}</span>
            )}
          </div>
        </Link>
      </Button>

      {/* Dropdown Menu - Shows on right click or long press */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground p-0"
          >
            <span className="text-xs">⋯</span>
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <div className="flex items-center gap-3 p-2 mb-2 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white font-medium">
            {user.profile_image_path ? (
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profile_image_path} alt={getDisplayName()} />
                <AvatarFallback className="bg-orange-500 text-white">
                  {getInitials(getDisplayName())}
                </AvatarFallback>
              </Avatar>
            ) : (
              <span className="text-lg">{getProfileEmoji()}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{getDisplayName()}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <p className="text-xs text-primary capitalize">{user.role}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {user.role === "client" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                My Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <UserCog className="w-4 h-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {user.role === "chef" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/chef/dashboard" className="flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                Chef Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/chef/profile" className="flex items-center gap-2">
                <UserCog className="w-4 h-4" />
                Manage Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/chef/bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                My Bookings
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/help" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
