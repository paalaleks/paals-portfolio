import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Portfolio",
    description:
      "Personal portfolio site built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Designed with a dark editorial aesthetic.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/paalalex/paals-portfolio",
  },
  {
    title: "CunningFox",
    description:
      "A platform for book lovers featuring curated collections, character encyclopedias, and community features.",
    tech: ["Next.js", "TypeScript", "Prisma"],
    githubUrl: "https://github.com/paalalex/cunningfox",
  },
  {
    title: "API Gateway",
    description:
      "Lightweight API gateway with rate limiting, authentication middleware, and request transformation.",
    tech: ["Node.js", "Express", "Redis"],
    githubUrl: "https://github.com/paalalex/api-gateway",
  },
  {
    title: "Component Library",
    description:
      "Reusable UI component library with accessible primitives, theming support, and comprehensive documentation.",
    tech: ["React", "Storybook", "CSS Modules"],
    githubUrl: "https://github.com/paalalex/component-lib",
  },
]

export function Projects() {
  return (
    <section id="work" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Selected Work
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-border hover:bg-card"
            >
              <div className="mb-4 flex items-start justify-between">
                <Github className="size-5 text-muted-foreground" />
                <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
