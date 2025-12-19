import { Users, TrendingUp, Target, Award } from "lucide-react"

export default function ClassOverview() {
  const stats = [
    { icon: Users, label: "Total Students", value: "28", color: "text-primary" },
    { icon: TrendingUp, label: "Avg Progress", value: "72%", color: "text-accent" },
    { icon: Target, label: "Active Today", value: "22", color: "text-secondary" },
    { icon: Award, label: "Certificates", value: "14", color: "text-primary" },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Class Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <Icon size={24} className={stat.color} />
                <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
