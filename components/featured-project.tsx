import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProject } from "@/lib/github"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export async function FeaturedProject() {
  const project = await getFeaturedProject()

  if (!project) return null

  const tech = project.topics.length > 0
    ? project.topics
    : project.language
      ? [project.language]
      : []

  return (
    <section id="work" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Selected Work
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h2>

        <a
          href={project.homepage || project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card>
            <div className="grid sm:grid-cols-[1fr_1fr]">
              <div className="relative aspect-video overflow-hidden sm:aspect-auto sm:min-h-[360px]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:object-[calc(50%-10rem)_center]"
                  />
                ) : (
                  <div className="project-placeholder flex h-full items-center justify-center">
                    <span className="text-4xl font-bold tracking-tight text-foreground/10">
                      {project.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <CardHeader className="mt-2">
                  <CardDescription>{project.category}</CardDescription>
                  <CardTitle>{project.name}</CardTitle>
                  <CardAction>
                    <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardAction>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 pb-4">
                  {project.tagline && (
                    <p className="text-base font-medium text-foreground/80">{project.tagline}</p>
                  )}
                  {project.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  )}
                  {tech.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2 border-t border-border/50 pt-4">
                      {tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        </a>

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
