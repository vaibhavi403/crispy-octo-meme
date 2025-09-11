"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "The Art of Indian Spice Blending: A Chef's Guide to Authentic Flavors",
    excerpt:
      "Discover the secrets behind creating perfect spice blends that bring authentic Indian flavors to your kitchen. Learn from master chefs about traditional techniques passed down through generations.",
    image: "/north-indian-food-platter.jpg",
    author: "Chef Rajesh Kumar",
    date: "January 10, 2024",
    readTime: "8 min read",
    category: "Cooking Tips",
    featured: true,
  }

  const blogPosts = [
    {
      id: 2,
      title: "5 Essential Kitchen Tools Every Home Chef Needs",
      excerpt: "From sharp knives to the right pans, discover the must-have tools that will elevate your cooking game.",
      image: "/assorted-kitchen-tools.png",
      author: "Chef Priya Sharma",
      date: "January 8, 2024",
      readTime: "5 min read",
      category: "Kitchen Tips",
    },
    {
      id: 3,
      title: "Regional Indian Cuisines: A Culinary Journey Across States",
      excerpt:
        "Explore the diverse flavors and cooking styles from different regions of India, each with its unique character.",
      image: "/indian-regional-food.jpg",
      author: "Chef Amit Singh",
      date: "January 5, 2024",
      readTime: "12 min read",
      category: "Culture",
    },
    {
      id: 4,
      title: "Healthy Cooking: Making Traditional Dishes Nutritious",
      excerpt:
        "Learn how to prepare your favorite traditional dishes with healthier ingredients without compromising on taste.",
      image: "/healthy-indian-food.jpg",
      author: "Chef Meera Nair",
      date: "January 3, 2024",
      readTime: "7 min read",
      category: "Health",
    },
    {
      id: 5,
      title: "Mastering the Perfect Biryani: Tips from Professional Chefs",
      excerpt:
        "The secrets to creating restaurant-quality biryani at home, from rice selection to layering techniques.",
      image: "/biryani-cooking.jpg",
      author: "Chef Vikram Singh",
      date: "December 28, 2023",
      readTime: "10 min read",
      category: "Recipes",
    },
    {
      id: 6,
      title: "Seasonal Cooking: Making the Most of Fresh Ingredients",
      excerpt: "How to plan your meals around seasonal produce for the best flavors and nutritional value.",
      image: "/seasonal-vegetables.jpg",
      author: "Chef Anjali Gupta",
      date: "December 25, 2023",
      readTime: "6 min read",
      category: "Seasonal",
    },
  ]

  const categories = ["All", "Cooking Tips", "Recipes", "Health", "Culture", "Kitchen Tips", "Seasonal"]

  const getCategoryColor = (category: string) => {
    const colors = {
      "Cooking Tips": "bg-orange-100 text-orange-800",
      Recipes: "bg-green-100 text-green-800",
      Health: "bg-blue-100 text-blue-800",
      Culture: "bg-purple-100 text-purple-800",
      "Kitchen Tips": "bg-yellow-100 text-yellow-800",
      Seasonal: "bg-pink-100 text-pink-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Culinary Stories & Tips</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover cooking secrets, cultural stories, and professional tips from our community of expert chefs
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">Search</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <Badge className="mb-4 bg-orange-100 text-orange-800">Featured</Badge>
              <Badge className={`mb-4 ml-2 ${getCategoryColor(featuredPost.category)}`}>{featuredPost.category}</Badge>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{featuredPost.title}</h2>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <Link href={`/blog/${featuredPost.id}`}>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>{post.category}</Badge>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}
