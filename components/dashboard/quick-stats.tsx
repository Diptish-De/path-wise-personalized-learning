import { TrendingUp, Flame, Target, Trophy } from "lucide-react"

const stats = [
  { icon: TrendingUp, label: "Learning Streak", value: "7 days", color: "text-secondary" },
  { icon: Flame, label: "Points Today", value: "245 XP", color: "text-accent" },
  { icon: Target, label: "Current Goal", value: "75% Complete", color: "text-primary" },
  { icon: Trophy, label: "Achievements", value: "12 Earned", color: "text-secondary" },
]

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <Icon size={20} className={stat.color} />
              <span className="text-xs text-muted-foreground font-medium uppercase">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
