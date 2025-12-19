"use client"

import { useEffect, useState } from "react"

type User = { name?: string | null; email?: string | null } | null

export default function useAuth() {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (!mounted) return
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setUser(data.user || { name: "User", email: null })
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error(err)
        setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchMe()
    return () => {
      mounted = false
    }
  }, [])

  return { user, loading, authenticated: !!user }
}
