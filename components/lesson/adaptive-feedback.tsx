"use client"

import { Lightbulb, TrendingUp, AlertCircle } from "lucide-react"

export default function AdaptiveFeedback({
  score,
  difficulty,
  onContinue,
}: {
  score: number
  difficulty: string
  onContinue: () => void
}) {
  let feedback = {
    title: "",
    message: "",
    icon: AlertCircle,
    color: "text-muted-foreground",
  }

  if (score >= 80) {
    feedback = {
      title: "Excellent! Moving to Advanced",
      message:
        "Your score shows you've mastered this concept! We're increasing the difficulty for the next lesson to keep you challenged.",
      icon: TrendingUp,
      color: "text-accent",
    }
  } else if (score >= 60) {
    feedback = {
      title: "Good Work!",
      message: "You're on the right track! The next lesson will build on these concepts. Keep practicing!",
      icon: Lightbulb,
      color: "text-secondary",
    }
  } else {
    feedback = {
      title: "Let's Review",
      message:
        "No worries! We're adjusting to a more beginner-friendly approach. You'll review key concepts before moving forward.",
      icon: Lightbulb,
      color: "text-primary",
    }
  }

  const Icon = feedback.icon

  return (
    <div className="mb-8 p-6 rounded-lg border border-border bg-card space-y-4">
      <div className="flex items-start gap-4">
        <Icon size={28} className={`${feedback.color} flex-shrink-0`} />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-1">{feedback.title}</h3>
          <p className="text-muted-foreground">{feedback.message}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Your Score: <span className="font-bold text-foreground">{score}%</span>
        </div>
        <button
          onClick={onContinue}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
