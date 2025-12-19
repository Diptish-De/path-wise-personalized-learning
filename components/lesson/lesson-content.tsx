import { Play, BookOpen, Lightbulb } from "lucide-react"

export default function LessonContent({ section }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
        <p className="text-lg text-muted-foreground">{section.content}</p>
      </div>

      {section.type === "video" && (
        <div className="rounded-xl overflow-hidden border border-border bg-muted aspect-video flex items-center justify-center">
          <button className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition">
            <Play size={32} fill="currentColor" />
          </button>
        </div>
      )}

      {section.type === "interactive" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-border bg-card p-8 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen size={24} className="text-primary" />
              <h3 className="font-semibold text-lg text-foreground">Key Points</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground">Quadratic equations have a degree of 2</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground">Standard form: ax² + bx + c = 0</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground">Solutions can be real or complex</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb size={24} className="text-accent" />
              <h3 className="font-semibold text-lg text-foreground">Real-World Example</h3>
            </div>
            <p className="text-foreground mb-4">
              A projectile is launched upward with initial velocity. Its height at time t is:
            </p>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 font-mono text-sm text-foreground">
              h(t) = -4.9t² + 20t + 1.5
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-primary/5 p-6">
        <h3 className="font-semibold text-foreground mb-3">💡 Tip</h3>
        <p className="text-muted-foreground">
          Try breaking down complex quadratic equations into smaller, manageable parts before solving.
        </p>
      </div>
    </div>
  )
}
