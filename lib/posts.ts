import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content", "blog")

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  author: string
  image: string | null
  image_alt: string
  tags: string[]
  draft: boolean
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"))

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "")
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        author: data.author ?? "",
        image: data.image ?? null,
        image_alt: data.image_alt ?? "",
        tags: data.tags ?? [],
        draft: data.draft ?? false,
      } satisfies PostMeta
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContents)

  if (data.draft) {
    return null
  }

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    author: data.author ?? "",
    image: data.image ?? null,
    image_alt: data.image_alt ?? "",
    tags: data.tags ?? [],
    draft: data.draft ?? false,
    content,
  }
}
