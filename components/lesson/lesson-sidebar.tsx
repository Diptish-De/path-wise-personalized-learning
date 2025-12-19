"use client"

import { CheckCircle, Play, X } from "lucide-react"
import { useState } from "react"

export default function LessonSidebar({
  sections,
  currentSection,
  onSelectSection,
}: {
  sections: any[]
  currentSection: number
  onSelectSection: (idx: number) => void
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-l border-border bg-card h-screen sticky top-0 overflow-auto">
        <div className="p-6 border-b border-border">
          <h2 className="font-bold text-foreground">Lesson Contents</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => onSelectSection(idx)}
              className={`w-full text-left p-3 rounded-lg transition ${
                idx === currentSection
                  ? "bg-primary/10 border border-primary text-foreground"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                {idx < currentSection ? (
                  <CheckCircle size={18} className="text-accent" />
                ) : idx === currentSection ? (
                  <Play size={18} className="text-primary" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted" />
                )}
                <span className="text-sm font-medium">{section.title}</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Play size={24} />}
        </button>
      </div>
    </>
  )
}
