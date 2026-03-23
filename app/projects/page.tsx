import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PageNav } from "@/components/page-nav"
import { getProjects } from "@/lib/github"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="relative z-10">
      <PageNav backHref="/" backLabel="Back" />

      <section className="mx-auto max-w-7xl px-8 pt-20 pb-24 md:px-16">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Selected Work
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          All Projects
        </h2>

        <div className="grid justify-center gap-8 md:grid-cols-2">
          {projects.map((project) => {
            const tech = project.topics.length > 0
              ? project.topics
              : project.language
                ? [project.language]
                : []

            return (
              <a
                key={project.repo}
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
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          style={{ objectPosition: "calc(50% - 10rem) center" }}
                        />
                      ) : (
                        <div className="project-placeholder flex h-full items-center justify-center">
                          <span className="text-2xl font-bold tracking-tight text-foreground/10">
                            {project.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center">
                      <CardHeader>
                        <CardDescription>{project.category}</CardDescription>
                        <CardTitle>{project.name}</CardTitle>
                        <CardAction>
                          <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </CardAction>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4">
                        <div className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                          {project.tagline && <p>{project.tagline}</p>}
                          {project.description && <p>{project.description}</p>}
                        </div>
                        {tech.length > 0 && (
                          <div className="flex flex-wrap gap-2">
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
            )
          })}
        </div>
      </section>
    </div>
  )
}
