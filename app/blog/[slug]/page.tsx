import Image from "next/image"
import { notFound } from "next/navigation"
import { PageNav } from "@/components/page-nav"
import { remark } from "remark"
import remarkHtml from "remark-html"
import { getAllPosts, getPostBySlug, getReadingTime } from "@/lib/posts"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Paal Aleksander`,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(post.content)
  const contentHtml = processed.toString()
  const readingTime = getReadingTime(post.content)

  return (
    <>
    <PageNav backHref="/blog" backLabel="All posts" />
    <section className="px-6 pt-20 pb-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-2xl">

        {post.image && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-xl border border-border/50">
            <Image
              src={post.image}
              alt={post.image_alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>{readingTime} min read</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            {post.title}
          </h1>

          <p className="mt-3 text-base text-muted-foreground">
            By {post.author}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="mb-12 border-border" />

        <article
          className="blog-article prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </section>
    </>
  )
}
