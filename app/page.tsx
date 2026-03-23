import { PageNav } from "@/components/page-nav"
import { Hero } from "@/components/hero"
import { FeaturedProject } from "@/components/featured-project"
import { BlogPosts } from "@/components/blog-posts"
import { Artwork } from "@/components/artwork"
import { Contact } from "@/components/contact"

export default function Page() {
  return (
    <>
      <PageNav />
      <Hero />
      <div className="relative z-10 lg:mr-[40vw]">
        <FeaturedProject />
        <BlogPosts />
        <Artwork />
        <Contact />
      </div>
    </>
  )
}
