import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">PW</span>
              </div>
              <span className="font-bold text-foreground">PathWise</span>
            </div>
            <p className="text-sm text-muted-foreground">Personalized learning for everyone.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 PathWise. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-foreground transition">
              Twitter
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-foreground transition">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
