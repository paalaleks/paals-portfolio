import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Blog | Paal Aleksander",
  description: "Articles on development, design, and creative projects.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="px-8 py-24 md:px-16 lg:px-24">
      <div className="max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Home
        </Link>

        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Writing
        </p>
        <h1 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Blog
        </h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-border hover:bg-card"
              >
                <div className="mb-2 flex items-center gap-3">
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
