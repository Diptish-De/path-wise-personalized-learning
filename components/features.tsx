import { BookOpen, TrendingUp, Zap, Users, BarChart3, Settings } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Personalized Learning",
    description: "AI-powered recommendations adapt to your learning style and pace",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visual dashboards showing your growth, achievements, and areas to improve",
  },
  {
    icon: Zap,
    title: "Adaptive Difficulty",
    description: "Content difficulty adjusts based on your performance in real-time",
  },
  {
    icon: Users,
    title: "Educator Tools",
    description: "Teachers can monitor student progress and customize learning paths",
  },
  {
    icon: BarChart3,
    title: "Achievement Badges",
    description: "Earn badges and certificates as you complete milestones",
  },
  {
    icon: Settings,
    title: "Accessibility First",
    description: "Text-to-speech, adjustable fonts, and dark mode for everyone",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need to Learn Better
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PathWise combines adaptive learning technology with accessibility features designed for every student
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
