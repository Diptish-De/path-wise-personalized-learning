import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students already experiencing personalized, adaptive learning with PathWise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup?type=student"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium"
          >
            Start Learning Today
          </Link>
          <Link
            href="/signup?type=educator"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition font-medium"
          >
            Educator Sign Up
          </Link>
        </div>
      </div>
    </section>
  )
}
