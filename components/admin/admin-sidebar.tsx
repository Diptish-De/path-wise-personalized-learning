"use client"

import Link from "next/link"
import { LayoutGrid, Users, BarChart3, BookOpen, Settings, LogOut } from "lucide-react"

const menuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/admin" },
  { icon: Users, label: "Students", href: "/admin/students" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">PW</span>
          </div>
          <span className="font-bold text-foreground">PathWise</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-2">Teacher Dashboard</p>
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
  )
}
