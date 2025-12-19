import { TrendingUp, AlertCircle, Award } from "lucide-react"

export default function PerformanceInsights() {
  return (
    <div className="space-y-6">
      {/* Top Performers */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award size={24} className="text-secondary" />
          <h3 className="font-bold text-foreground">Top Performers</h3>
        </div>

        <div className="space-y-3">
          {[
            { name: "Emma Wilson", score: 91 },
            { name: "Maria Garcia", score: 85 },
            { name: "Sarah Chen", score: 72 },
          ].map((student, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{student.name}</span>
              <span className="text-sm font-bold text-primary">{student.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Students Needing Help */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle size={24} className="text-destructive" />
          <h3 className="font-bold text-foreground">Need Support</h3>
        </div>

        <div className="space-y-3">
          {[
            { name: "Alex Johnson", score: 42 },
            { name: "John Smith", score: 58 },
          ].map((student, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
              <span className="text-sm text-foreground">{student.name}</span>
              <button className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition">
                Help
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={24} className="text-accent" />
          <h3 className="font-bold text-foreground">Weekly Trend</h3>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Average engagement: <span className="font-bold text-foreground">+12%</span>
          </p>
          <p>
            Active students: <span className="font-bold text-foreground">22/28</span>
          </p>
          <p>
            Lessons completed: <span className="font-bold text-foreground">156</span>
          </p>
        </div>
      </div>
    </div>
  )
}
