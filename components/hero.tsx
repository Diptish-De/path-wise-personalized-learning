import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Learning Paths Tailored to <span className="text-primary">You</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl text-balance">
                Adaptive learning platform that adjusts to your pace, recognizes your strengths, and challenges you to
                grow.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-started?role=student"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium"
              >
                Get Started as Student
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/get-started?role=educator"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition font-medium"
              >
                Join as Educator
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <p className="text-sm text-muted-foreground">Active Learners</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">500+</div>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">95%</div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl"></div>
            <div className="absolute top-12 right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-12 left-12 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/30 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <div className="text-4xl">📚</div>
                </div>
                <p className="text-muted-foreground">Your learning journey starts here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
