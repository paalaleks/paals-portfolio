import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface CardProps {
  title: string
  tagline: string
  description: string
  category: string
  tech: string[]
  image: string
  imageAlt: string
  href: string
}

export function Card({
  title,
  tagline,
  description,
  category,
  tech,
  image,
  imageAlt,
  href,
}: CardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-border/50 bg-card/30 transition-all duration-500 hover:border-border hover:bg-card/60"
    >
      <div className="grid sm:grid-cols-[1fr_1fr]">
        {/* Image column */}
        <div className="relative aspect-[3/4] overflow-hidden sm:aspect-auto sm:min-h-[520px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: "calc(50% - 10rem) center" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/30 dark:to-card/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent sm:from-transparent" />
        </div>

        {/* Text column */}
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {category}
            </span>
            <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <h3 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h3>

          <p className="mb-4 text-lg leading-snug font-medium text-foreground/80 sm:text-xl">
            {tagline}
          </p>

          <div className="mb-6 h-px w-12 bg-border" />

          <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}
