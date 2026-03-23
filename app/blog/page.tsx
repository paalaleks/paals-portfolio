import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageNav } from "@/components/page-nav"
import { getAllPosts } from "@/lib/posts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Blog | Paal Aleksander",
  description: "Articles on development, design, and creative projects.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
    <PageNav backHref="/" backLabel="Home" />
    <section className="px-8 pt-20 pb-24 md:px-16 lg:px-24">
      <div className="max-w-3xl">

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
                className="group"
              >
                <Card>
                  <div className="flex flex-col sm:flex-row">
                    {post.image && (
                      <div className="relative shrink-0 overflow-hidden rounded-t-lg sm:w-48 sm:rounded-l-lg sm:rounded-tr-none">
                        <Image
                          src={post.image}
                          alt={post.image_alt || post.title}
                          width={384}
                          height={216}
                          className="h-40 w-full object-cover sm:h-full"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
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
        )}
      </div>
    </section>
    </>
  )
}
