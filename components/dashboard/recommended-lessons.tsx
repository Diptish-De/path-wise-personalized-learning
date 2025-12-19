import { BookOpen, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const lessons = [
  {
    id: 1,
    title: "Quadratic Equations Part 1",
    subject: "Mathematics",
    difficulty: "Intermediate",
    duration: "15 mins",
    progress: 0,
  },
  {
    id: 2,
    title: "Shakespeare's Sonnets",
    subject: "English",
    difficulty: "Advanced",
    duration: "20 mins",
    progress: 30,
  },
  {
    id: 3,
    title: "Industrial Revolution Timeline",
    subject: "History",
    difficulty: "Beginner",
    duration: "12 mins",
    progress: 0,
  },
]

export default function RecommendedLessons() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen size={24} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
        </div>
        <Link href="/lessons" className="text-primary text-sm hover:underline font-medium">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{lesson.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{lesson.subject}</span>
                  <span>•</span>
                  <span>{lesson.difficulty}</span>
                </div>
              </div>
              <ArrowRight size={18} className="text-muted-foreground" />
            </div>

            {lesson.progress > 0 && (
              <>
                <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${lesson.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{lesson.progress}% Complete</p>
              </>
            )}

            {lesson.progress === 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={14} />
                <span>{lesson.duration}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
