import Link from "next/link"
import { ChefHat, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Book My Chef</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting food lovers with professional chefs across India. Experience authentic flavors in the comfort
              of your home.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/chefs" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Find Chefs
              </Link>
              <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                How It Works
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Blog & Recipes
              </Link>
            </nav>
          </div>

          {/* For Chefs */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Chefs</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/chef/join" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Join as Chef
              </Link>
              <Link href="/chef/login" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Chef Login
              </Link>
              <Link
                href="/chef/requirements"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Requirements
              </Link>
              <Link href="/chef/support" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Chef Support
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@bookmychef.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Delhi, Bangalore</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 Book My Chef. All rights reserved.</p>
          <nav className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
