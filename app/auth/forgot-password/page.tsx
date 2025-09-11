import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </div>
  )
}
