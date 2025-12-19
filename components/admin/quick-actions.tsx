import { Plus, Send, BarChart3, Settings } from "lucide-react"

const actions = [
  { icon: Plus, label: "Create Assignment", color: "bg-primary" },
  { icon: Send, label: "Send Announcement", color: "bg-accent" },
  { icon: BarChart3, label: "View Reports", color: "bg-secondary" },
  { icon: Settings, label: "Manage Paths", color: "bg-primary" },
]

export default function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition flex flex-col items-center gap-2"
            >
              <Icon size={24} className={`${action.color} text-white`} />
              <span className="text-xs font-medium text-foreground text-center line-clamp-2">{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
