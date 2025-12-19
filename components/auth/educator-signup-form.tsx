"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Lock, User, Building2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EducatorSignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const name = formData.get("educator-name") as string
      const school = formData.get("school") as string
      const email = formData.get("educator-email") as string
      const password = formData.get("educator-password") as string

      console.log("Submitting educator signup form with:", { name, email, role: "educator" })

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "educator", school }),
      })

      const responseData = await res.json()
      console.log("Signup response:", { status: res.status, data: responseData })

      if (!res.ok) {
        setError(responseData.message || "Signup failed. Please try again.")
        setIsLoading(false)
        return
      }

      // Success - redirect to `next` if provided, otherwise to landing page
      console.log("Signup successful, redirecting")
      try {
        const params = new URLSearchParams(window.location.search)
        const next = params.get("next")
        router.push(next || "/")
      } catch (err) {
        router.push("/")
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" method="POST">
      {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="educator-name" className="block text-sm font-medium text-foreground">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            id="educator-name"
            name="educator-name"
            type="text"
            placeholder="Jane Smith"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* School/Organization */}
      <div className="space-y-2">
        <label htmlFor="school" className="block text-sm font-medium text-foreground">
          School or Organization
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            id="school"
            name="school"
            type="text"
            placeholder="Lincoln High School"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="educator-email" className="block text-sm font-medium text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            id="educator-email"
            name="educator-email"
            type="email"
            placeholder="educator@example.com"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="educator-password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            id="educator-password"
            name="educator-password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-2">
        <input
          id="educator-terms"
          type="checkbox"
          className="w-4 h-4 rounded border-border accent-primary cursor-pointer mt-1"
          required
        />
        <label htmlFor="educator-terms" className="text-sm text-muted-foreground cursor-pointer">
          I agree to the <span className="text-primary hover:underline">Terms of Service</span> and{" "}
          <span className="text-primary hover:underline">Privacy Policy</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? (
          "Creating account..."
        ) : (
          <>
            Create Account
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  )
}
