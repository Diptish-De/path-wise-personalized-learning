"use client"

import Link from "next/link"
import { useState } from "react"
import { LayoutGrid, BookOpen, BarChart3, Users, Settings, LogOut, Menu, X } from "lucide-react"

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "My Lessons", href: "/lessons" },
  { icon: BarChart3, label: "Progress", href: "/progress" },
  { icon: Users, label: "Study Groups", href: "/groups" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card h-screen sticky top-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PW</span>
            </div>
            <span className="font-bold text-foreground">PathWise</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </>
  )
}
