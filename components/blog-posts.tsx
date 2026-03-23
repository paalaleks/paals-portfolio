import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function BlogPosts() {
  const posts = getAllPosts()

  if (posts.length === 0) return null

  return (
    <section id="blog" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Writing
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Blog
        </h2>

        <div className="grid gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <Card>
                <div className="flex items-start gap-5 p-6">
                  {post.image && (
                    <div className="relative hidden aspect-video w-40 shrink-0 overflow-hidden rounded-lg sm:block">
                      <Image
                        src={post.image}
                        alt={post.image_alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <CardHeader className="p-0">
                      <CardDescription>
                        <time>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </CardDescription>
                      <CardTitle>
                        {post.title}
                      </CardTitle>
                      <CardAction>
                        <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </CardAction>
                    </CardHeader>
                    <CardContent className="mt-2 flex flex-col gap-4 p-0">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all posts
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
