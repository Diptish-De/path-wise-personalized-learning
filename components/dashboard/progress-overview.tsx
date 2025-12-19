import { BarChart3 } from "lucide-react"

export default function ProgressOverview() {
  const skills = [
    { name: "Mathematics", progress: 72, target: 85 },
    { name: "English Literature", progress: 68, target: 80 },
    { name: "History", progress: 85, target: 90 },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Progress Overview</h2>
      </div>

      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">{skill.name}</h3>
              <span className="text-sm text-muted-foreground">{skill.progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: {skill.target}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
