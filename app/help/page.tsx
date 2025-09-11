"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Users,
  ChefHat,
  CreditCard,
  Shield,
  HelpCircle,
  BookOpen,
  Headphones,
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of using Book My Chef",
      articles: 12,
    },
    {
      icon: ChefHat,
      title: "For Chefs",
      description: "Information for chef partners",
      articles: 8,
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Payment methods, refunds, and billing",
      articles: 15,
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Your safety and security guidelines",
      articles: 6,
    },
  ]

  const faqs = [
    {
      question: "How do I book a chef?",
      answer:
        "To book a chef, browse our chef profiles, select your preferred chef, choose your date and time, specify your requirements, and complete the payment. You'll receive a confirmation email with all the details.",
    },
    {
      question: "What is included in the chef service?",
      answer:
        "Our chef service includes menu planning, grocery shopping (optional), cooking at your location, serving, and basic cleanup. The chef brings their own cooking tools and expertise to create a memorable dining experience.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify your booking up to 24 hours before the scheduled service for a full refund. Cancellations within 24 hours are subject to a 50% cancellation fee.",
    },
    {
      question: "How are chefs verified?",
      answer:
        "All our chefs undergo a thorough verification process including background checks, cooking skill assessments, food safety certification verification, and customer review analysis before joining our platform.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI payments, net banking, digital wallets, and cash on service. All online payments are processed securely through encrypted payment gateways.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Customer satisfaction is our priority. If you're not satisfied with the service, please contact our support team within 24 hours. We'll work with you to resolve the issue and may offer a refund or credit for future bookings.",
    },
    {
      question: "Do chefs bring their own ingredients?",
      answer:
        "Chefs can either bring ingredients (with cost included in the service) or shop for fresh ingredients on the day of service. You can also provide ingredients yourself. This can be discussed during the booking process.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 24-48 hours in advance to ensure chef availability. However, same-day bookings may be possible depending on chef availability in your area.",
    },
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "24/7 Available",
      action: "Start Chat",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      availability: "Mon-Sun, 8 AM - 10 PM",
      action: "Call Now",
      contact: "+91 1800-123-4567",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions",
      availability: "Response within 2 hours",
      action: "Send Email",
      contact: "support@bookmychef.com",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-lg"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpCategories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <category.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <Badge variant="secondary">{category.articles} articles</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactOptions.map((option) => (
                  <div key={option.title} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <option.icon className="w-5 h-5 text-orange-500 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{option.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{option.description}</p>
                        <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
                          <Clock className="w-3 h-3" />
                          <span>{option.availability}</span>
                        </div>
                        {option.contact && <p className="text-sm font-medium text-gray-900 mb-2">{option.contact}</p>}
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          {option.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "How to become a chef partner",
                  "Safety guidelines for customers",
                  "Payment and refund policy",
                  "Terms of service",
                  "Privacy policy",
                  "Community guidelines",
                ].map((link) => (
                  <Button key={link} variant="ghost" className="w-full justify-start text-left h-auto p-2">
                    {link}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Describe your issue or question..." rows={4} />
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
