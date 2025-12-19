"use client"

import Link from "next/link"
import { useState } from "react"
import useAuth from "@/hooks/use-auth"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading, authenticated } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PW</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">PathWise</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && authenticated ? (
              <>
                <span className="text-sm text-muted-foreground">Hello{user?.name ? `, ${user.name}` : ""}</span>
                <Link href="/api/auth/signout" className="text-sm px-4 py-2 rounded-lg text-foreground hover:bg-muted transition">
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm px-4 py-2 rounded-lg text-foreground hover:bg-muted transition">
                  Sign In
                </Link>
                <Link
                  href="/get-started"
                  className="text-sm px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Features
            </Link>
            <Link href="#testimonials" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Testimonials
            </Link>
            <Link href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground px-2 py-2">
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {!loading && authenticated ? (
                <>
                  <span className="block text-sm text-muted-foreground px-2 py-2 text-center">Hello{user?.name ? `, ${user.name}` : ""}</span>
                  <Link href="/api/auth/signout" className="text-sm px-4 py-2 rounded-lg text-foreground hover:bg-muted transition text-center">
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm px-4 py-2 rounded-lg text-foreground hover:bg-muted transition text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/get-started"
                    className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
