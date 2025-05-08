"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { subscribeUser } from "../../lib/subscription"

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: "$29.99",
      description: "Billed monthly",
      features: ["Unlimited conversations", "Conversation history", "24/7 access"],
    },
    {
      id: "quarterly",
      name: "Quarterly",
      price: "$79.99",
      description: "Billed every 3 months",
      features: ["Unlimited conversations", "Conversation history", "24/7 access", "10% savings"],
    },
    {
      id: "annual",
      name: "Annual",
      price: "$299.99",
      description: "Billed annually",
      features: ["Unlimited conversations", "Conversation history", "24/7 access", "15% savings", "Priority support"],
    },
  ]

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      setError("Please select a plan")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await subscribeUser(selectedPlan)
      if (success) {
        router.push("/chat")
      } else {
        setError("Failed to process subscription. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="mt-2 text-gray-500">Select a subscription plan to continue</p>
      </div>

      {error && (
        <div className="mb-6 w-full max-w-3xl bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">{error}</div>
      )}

      <div className="grid gap-6 w-full max-w-3xl md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all ${
              selectedPlan === plan.id ? "border-primary ring-2 ring-primary ring-opacity-50" : ""
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{plan.price}</div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${selectedPlan === plan.id ? "bg-primary text-white" : "border border-gray-300"}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Button className="mt-8 w-full max-w-md" disabled={!selectedPlan || isLoading} onClick={handleSubscribe}>
        {isLoading ? "Processing..." : "Continue to Payment"}
      </Button>
    </div>
  )
}
