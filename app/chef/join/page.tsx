import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChefSignupForm } from "@/components/auth/chef-signup-form"

export default function ChefJoinPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <ChefSignupForm />
      </main>
      <Footer />
    </div>
  )
}
