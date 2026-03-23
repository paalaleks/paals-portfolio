const GITHUB_USERNAME = "paalaleks"

export type ProjectConfig = {
  repo: string
  featured?: boolean
  category?: string
  tagline?: string
  description?: string
  image?: string
  imageAlt?: string
  /** For private/external projects not on your public GitHub */
  private?: boolean
  name?: string
  url?: string
  language?: string
  topics?: string[]
}

export type Project = {
  name: string
  repo: string
  url: string
  homepage: string | null
  description: string
  language: string | null
  stars: number
  topics: string[]
  category: string
  tagline: string
  image: string | null
  imageAlt: string
  hasImage: boolean
  featured: boolean
}

/**
 * Local overrides for GitHub repos — add images, taglines, categories,
 * and descriptions that the GitHub API can't provide.
 */
const projectOverrides: ProjectConfig[] = [
  {
    repo: "cunningfox",
    private: true,
    featured: true,
    name: "CunningFox",
    url: "https://cunningfox.app",
    category: "Web App",
    tagline: "Better context while you read",
    description:
      "A reading companion that keeps up with you. Click any highlighted name for an instant character card. Look up archaic terms, places, and concepts in a spoiler-aware encyclopedia. My most advanced side project yet.",
    language: "TypeScript",
    topics: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Gemini",
    ],
    image: "/project_encyclopedia-cd82970e-36fd-4160-a825-3767cc3d02cf.webp",
    imageAlt: "CunningFox — encyclopedia view",
  },
  {
    repo: "blog-publishing-routine",
    category: "Tooling",
    tagline: "Automated blog publishing",
    description:
      "A CLI routine for drafting, iterating, and publishing blog posts to a GitHub-hosted Next.js blog.",
  },
  {
    repo: "imagegen-routine",
    category: "Tooling",
    tagline: "AI image generation pipeline",
    description: "Shell-based routine for generating images with AI models.",
  },
]

type GitHubRepo = {
  name: string
  html_url: string
  homepage: string | null
  description: string | null
  language: string | null
  stargazers_count: number
  topics: string[]
  fork: boolean
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) return []
  return res.json()
}

const excludedRepos = new Set(["paals-portfolio", "buildingblock-cms"])

export async function getProjects(): Promise<Project[]> {
  const repos = await fetchGitHubRepos()
  const overrideMap = new Map(projectOverrides.map((o) => [o.repo, o]))

  // GitHub-backed projects
  const projects: Project[] = repos
    .filter((r) => !r.fork && !excludedRepos.has(r.name))
    .map((repo) => {
      const override = overrideMap.get(repo.name)
      return {
        name: override?.name || formatRepoName(repo.name),
        repo: repo.name,
        url: repo.html_url,
        homepage: repo.homepage || null,
        description: override?.description || repo.description || "",
        language: repo.language,
        stars: repo.stargazers_count,
        topics: override?.topics || repo.topics,
        category: override?.category || repo.language || "Project",
        tagline: override?.tagline || "",
        image: override?.image || null,
        imageAlt: override?.imageAlt || formatRepoName(repo.name),
        hasImage: !!override?.image,
        featured: override?.featured || false,
      }
    })

  // Private / external projects (no public GitHub repo)
  const privateProjects: Project[] = projectOverrides
    .filter((o) => o.private)
    .map((o) => ({
      name: o.name || formatRepoName(o.repo),
      repo: o.repo,
      url: o.url || "",
      homepage: o.url || null,
      description: o.description || "",
      language: o.language || null,
      stars: 0,
      topics: o.topics || [],
      category: o.category || "Project",
      tagline: o.tagline || "",
      image: o.image || null,
      imageAlt: o.imageAlt || o.name || formatRepoName(o.repo),
      hasImage: !!o.image,
      featured: o.featured || false,
    }))

  const all = [...privateProjects, ...projects]

  // Sort: featured first, then by stars
  all.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return b.stars - a.stars
  })

  return all
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((p) => p.featured) || projects[0] || null
}

function formatRepoName(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}
