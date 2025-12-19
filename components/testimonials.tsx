import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Student, 12th Grade",
    content:
      "PathWise made learning feel personalized for the first time. The difficulty adjusts perfectly to my level.",
    rating: 5,
    avatar: "👩‍🎓",
  },
  {
    name: "Mr. Patel",
    role: "High School Teacher",
    content:
      "I love the admin dashboard. I can see exactly where each student needs help and adjust paths accordingly.",
    rating: 5,
    avatar: "👨‍🏫",
  },
  {
    name: "Alex Rodriguez",
    role: "Parent",
    content: "My son was struggling with math, but PathWise's adaptive approach finally clicked for him.",
    rating: 5,
    avatar: "👨‍👧",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Loved by Learners and Educators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what students and teachers are saying about their PathWise experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
