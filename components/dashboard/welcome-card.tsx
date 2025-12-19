import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WelcomeCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20 p-8">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Sarah! 👋</h1>
        <p className="text-muted-foreground mb-4 max-w-2xl">
          You're on a 7-day learning streak! Keep it up with today's recommended lesson.
        </p>
        <Link
          href="/lessons"
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
        >
          Continue Learning
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-accent/5 rounded-full blur-2xl -mb-20"></div>
    </div>
  )
}
