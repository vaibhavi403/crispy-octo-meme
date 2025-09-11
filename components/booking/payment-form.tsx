"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, Lock } from "lucide-react"

interface PaymentFormProps {
  amount: number
  onPaymentSuccess: () => void
}

export default function PaymentForm({ amount, onPaymentSuccess }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    onPaymentSuccess()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <Label>Select Payment Method</Label>
          <div className="grid gap-3 mt-2">
            {[
              { id: "card", label: "Credit/Debit Card", icon: "💳", popular: true },
              { id: "upi", label: "UPI Payment", icon: "📱", popular: true },
              { id: "netbanking", label: "Net Banking", icon: "🏦" },
              { id: "wallet", label: "Digital Wallet", icon: "💰" },
            ].map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors relative ${
                  paymentMethod === method.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium">{method.label}</span>
                  {method.popular && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* UPI Payment Form */}
        {paymentMethod === "upi" && (
          <div>
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input id="upi-id" placeholder="yourname@paytm" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            <p className="text-sm text-gray-600 mt-2">Enter your UPI ID to receive payment request</p>
          </div>
        )}

        {/* Net Banking */}
        {paymentMethod === "netbanking" && (
          <div>
            <Label>Select Your Bank</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbi">State Bank of India</SelectItem>
                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
                <SelectItem value="axis">Axis Bank</SelectItem>
                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                <SelectItem value="pnb">Punjab National Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Digital Wallet */}
        {paymentMethod === "wallet" && (
          <div>
            <Label>Select Wallet</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {["Paytm", "PhonePe", "Google Pay", "Amazon Pay"].map((wallet) => (
                <Button key={wallet} variant="outline" className="h-12 bg-transparent">
                  {wallet}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Payment Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>₹{Math.round(amount / 1.18)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (18%):</span>
            <span>₹{Math.round(amount - amount / 1.18)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span className="text-orange-600">₹{amount}</span>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <Lock className="w-3 h-3" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
          size="lg"
        >
          {isProcessing ? "Processing Payment..." : `Pay ₹${amount}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By proceeding, you agree to our Terms & Conditions and Privacy Policy
        </p>
      </CardContent>
    </Card>
  )
}
