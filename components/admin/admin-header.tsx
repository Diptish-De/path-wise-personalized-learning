"use client"

import { Bell, Search, Settings } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 items-center max-w-md">
          <Search className="text-muted-foreground absolute ml-3" size={18} />
          <input
            type="search"
            placeholder="Search students, classes..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold">👨‍🏫</span>
          </div>
        </div>
      </div>
    </header>
  )
}
