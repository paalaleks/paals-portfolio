import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card } from "@/components/card"

const projects = [
  {
    title: "CunningFox",
    tagline: "Better context while you read",
    description:
      "A reading companion that keeps up with you. Click any highlighted name for an instant character card. Look up archaic terms, places, and concepts in a spoiler-aware encyclopedia.",
    category: "Web App",
    tech: ["Next.js", "TypeScript", "Prisma"],
    image: "/project_encyclopedia-cd82970e-36fd-4160-a825-3767cc3d02cf.webp",
    imageAlt: "CunningFox — encyclopedia view",
    href: "https://cunningfox.app",
  },
  {
    title: "Portfolio",
    tagline: "Dark editorial aesthetic",
    description:
      "Personal portfolio site built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Designed with a dark editorial aesthetic and smooth animations.",
    category: "Website",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/project_try-works-dark.png",
    imageAlt: "Portfolio site",
    href: "https://github.com/paalalex/paals-portfolio",
  },
  {
    title: "API Gateway",
    tagline: "Lightweight request orchestration",
    description:
      "Lightweight API gateway with rate limiting, authentication middleware, and request transformation.",
    category: "Backend",
    tech: ["Node.js", "Express", "Redis"],
    image: "/project_ships-forecastle-dark.png",
    imageAlt: "API Gateway",
    href: "https://github.com/paalalex/api-gateway",
  },
  {
    title: "Component Library",
    tagline: "Accessible primitives, unified theming",
    description:
      "Reusable UI component library with accessible primitives, theming support, and comprehensive documentation.",
    category: "Design System",
    tech: ["React", "Storybook", "CSS Modules"],
    image: "/project_ships-forecastle-dark.png",
    imageAlt: "Component Library",
    href: "https://github.com/paalalex/component-lib",
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-8 pt-12 md:px-16">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-8 py-24 md:px-16">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Selected Work
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          All Projects
        </h2>

        <div className="grid justify-center gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} {...project} />
          ))}
        </div>
      </section>
    </div>
  )
}
