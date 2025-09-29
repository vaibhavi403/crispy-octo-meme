'use client'

import { useState, useEffect } from 'react'
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function CheckEmailPage() {
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleResendEmail = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsResending(false)
    setEmailSent(true)
    setTimeLeft(60)
    setCanResend(false)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <Mail className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              We&apos;ve sent a magic link to your email address. Click the link to complete your sign-up and start your culinary journey!
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {emailSent && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Email sent successfully! Check your inbox.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Didn&apos;t receive the email?</span>
            </div>

            <Button
              onClick={handleResendEmail}
              disabled={!canResend || isResending}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : canResend ? (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Email
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Resend in {timeLeft}s
                </>
              )}
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500">
                Having trouble? Check your spam folder or try a different email address.
              </p>
              <Link href="/login">
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
