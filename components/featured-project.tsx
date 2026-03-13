import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/card"

export function FeaturedProject() {
  return (
    <section id="work" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Selected Work
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h2>

        <Card
          title="CunningFox"
          tagline="Better context while you read"
          description="A reading companion that keeps up with you. Click any highlighted name for an instant character card. Look up archaic terms, places, and concepts in a spoiler-aware encyclopedia. Catch up on story beats when life interrupts your reading — always context, never spoilers."
          category="Web App"
          tech={["Next.js", "TypeScript", "Prisma"]}
          image="/project_encyclopedia-cd82970e-36fd-4160-a825-3767cc3d02cf.webp"
          imageAlt="CunningFox — encyclopedia view"
          href="https://cunningfox.app"
        />

        <div className="mt-10">
          <Link
            href="/projects"
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all projects
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
