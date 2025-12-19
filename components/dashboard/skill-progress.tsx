import { Zap, TrendingUp } from "lucide-react"

const skillLevels = [
  { name: "Problem Solving", level: 78, max: 100 },
  { name: "Critical Thinking", level: 65, max: 100 },
  { name: "Time Management", level: 82, max: 100 },
  { name: "Collaboration", level: 71, max: 100 },
]

export default function SkillProgress() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap size={24} className="text-accent" />
        <h2 className="text-lg font-bold text-foreground">Skill Development</h2>
      </div>

      <div className="space-y-4">
        {skillLevels.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-foreground">{skill.name}</p>
              <span className="text-xs text-primary font-semibold">{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
                style={{ width: `${(skill.level / skill.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20 flex items-center gap-3">
        <TrendingUp size={20} className="text-accent flex-shrink-0" />
        <p className="text-sm text-foreground">
          You've improved <span className="font-semibold">+8%</span> this week!
        </p>
      </div>
    </div>
  )
}
