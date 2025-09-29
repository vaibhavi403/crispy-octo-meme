"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Shield, Heart, Target, Eye, ChefHat, Star, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Expert Chefs", value: "500+", icon: ChefHat },
    { label: "Cities Served", value: "25+", icon: MapPin },
    { label: "Average Rating", value: "4.8", icon: Star },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "We believe great food brings people together and creates lasting memories.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All our chefs are thoroughly vetted and background-checked for your peace of mind.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in culinary expertise and customer service.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a community where food lovers and talented chefs can connect and thrive.",
    },
  ]

  const team = [
    {
      name: "Aditi Jogdand",
      role: "Head of Development & Technical Operations",
      image: "/team_member1.jpg",
      bio: "Leading our technical vision and development strategy. Aditi ensures our platform delivers a seamless, secure, and innovative experience for both chefs and customers.",
    },
    {
      name: "Vaibhavi Pimpale",
      role: "Head of Marketing",
      image: "/team_member2.jpg",
      bio: "Driving brand growth and community engagement. Vaibhavi connects our culinary platform with food enthusiasts and chefs across India through strategic marketing initiatives.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bringing Culinary Excellence to Your Home
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Book My Chef was born from a simple belief: everyone deserves access to exceptional culinary experiences. We
            connect passionate home cooks and event hosts with skilled professional chefs across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/chefs">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Find a Chef
              </Button>
            </Link>
            <Link href="/chef/join">
              <Button size="lg" variant="outline">
                Join as Chef
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To democratize access to professional culinary experiences by creating a trusted platform that
                  connects skilled chefs with food enthusiasts. We aim to preserve and celebrate India's rich culinary
                  heritage while embracing modern cooking techniques and global cuisines.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-8 h-8 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become India's most trusted culinary platform, where every meal is an opportunity to create
                  memories, celebrate culture, and bring people together. We envision a future where exceptional food
                  experiences are accessible to everyone, everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the experience we create for our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals working together to revolutionize the culinary experience in India.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="text-center w-full sm:w-96 flex-shrink-0">
                <CardContent className="p-8">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-orange-100"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <div className="mb-4">
                    <Badge variant="secondary" className="px-3 py-1 text-sm whitespace-normal leading-relaxed">
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Book My Chef started in 2020 when our founder, Arjun Mehta, a former chef himself, realized that many
              talented culinary professionals were struggling to find consistent work, while food enthusiasts were
              craving authentic, restaurant-quality experiences at home.
            </p>

            <p className="mb-6">
              What began as a small network of chefs in Delhi has now grown into India's leading platform for culinary
              services, serving over 25 cities and connecting thousands of customers with hundreds of verified
              professional chefs.
            </p>

            <p className="mb-6">
              During the pandemic, we saw an unprecedented demand for safe, home-based dining experiences. This
              challenge became our opportunity to innovate and create a platform that not only serves customers but also
              provides sustainable livelihoods for our chef community.
            </p>

            <p>
              Today, Book My Chef is more than just a service platform – we're a community that celebrates food,
              culture, and the joy of sharing meals with loved ones. Every booking creates a story, every meal builds a
              memory, and every chef brings their passion to your table.
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience Culinary Excellence?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who have discovered the joy of professional chef services at home.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/chefs">
                  <Button size="lg" variant="secondary">
                    Book a Chef Now
                  </Button>
                </Link>
                <Link href="/chef/join">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-orange-500 bg-transparent"
                  >
                    Become a Chef Partner
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
