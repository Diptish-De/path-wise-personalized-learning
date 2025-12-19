"use client"

import { useState } from "react"
import { Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError("")
    try {
      console.log("Submitting login form with:", { email: data.email })

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })

      const responseData = await res.json()
      console.log("Login response:", { status: res.status, data: responseData })

      if (!res.ok) {
        setError(responseData.message || "Login failed. Please try again.")
        setIsLoading(false)
        return
      }

      // Success - redirect to `next` if provided, otherwise to landing page
      console.log("Login successful, redirecting")
      try {
        const params = new URLSearchParams(window.location.search)
        const next = params.get("next")
        router.push(next || "/")
      } catch (err) {
        router.push("/")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    // Redirect to server route that starts Google OAuth flow. Server will redirect to Google.
    window.location.href = "/api/auth/google"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.email ? "border-destructive" : "border-border"
            }`}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            aria-invalid={!!errors.password}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.password ? "border-destructive" : "border-border"
            }`}
          />
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input id="remember" type="checkbox" {...register("remember")} className="w-4 h-4 rounded border-border accent-primary cursor-pointer" />
        <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground cursor-pointer">
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? (
          "Signing in..."
        ) : (
          <>
            Sign In
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition text-sm font-medium"
          aria-label="Sign in with Google"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/api/auth/microsoft")}
          className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition text-sm font-medium"
        >
          Microsoft
        </button>
      </div>
    </form>
  )
}
