"use client"

import { Trophy } from "lucide-react"

const badges = [
  { id: 1, name: "First Steps", emoji: "🚀", unlocked: true },
  { id: 2, name: "Week Warrior", emoji: "⚡", unlocked: true },
  { id: 3, name: "Century Club", emoji: "💯", unlocked: true },
  { id: 4, name: "Perfectionist", emoji: "✨", unlocked: false },
  { id: 5, name: "Marathon", emoji: "🏃", unlocked: false },
  { id: 6, name: "Master", emoji: "👑", unlocked: false },
]

export default function AchievementBadges() {
  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy size={24} className="text-secondary" />
          <div>
            <h2 className="text-lg font-bold text-foreground">Achievements</h2>
            <p className="text-xs text-muted-foreground">
              {unlockedCount} of {badges.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition ${
              badge.unlocked
                ? "border-secondary/50 bg-secondary/10 hover:border-secondary"
                : "border-muted bg-muted/50 opacity-50"
            }`}
            title={badge.name}
          >
            <span className="text-2xl mb-1">{badge.emoji}</span>
            <span className="text-xs text-center text-foreground font-medium line-clamp-1">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
