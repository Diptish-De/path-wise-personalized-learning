import { ArrowLeft, Volume2, Settings } from "lucide-react"
import Link from "next/link"

export default function LessonHeader({ lesson }: any) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={20} className="text-muted-foreground" />
          </Link>
          <div>
            <h1 className="font-bold text-foreground">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">{lesson.subject}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition" aria-label="Text to speech">
            <Volume2 size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition" aria-label="Settings">
            <Settings size={20} className="text-muted-foreground" />
          </button>
          <div className="px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground">{lesson.difficulty}</div>
        </div>
      </div>
    </header>
  )
}
