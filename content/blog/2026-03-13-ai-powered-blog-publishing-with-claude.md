---
title: "My New Blog Posting Routine"
date: "2026-03-13"
slug: "ai-powered-blog-publishing-with-claude"
description: "How I ditched CMS platforms and built a blog publishing routine using Claude and the GitHub API — with or without AI."
author: "Paal Aleksander Kaasa"
image: ""
image_alt: ""
tags:
  - claude
  - nextjs
  - typescript
  - automation
  - github-api
draft: false
---

I'm done with CMSs. Setting them up is always an annoying chore, and the freemium-to-premium pressure doesn't help. Although it's all understandable from a business perspective, I'd rather have full control over my own content and how it gets published.

So I turned to Claude and asked it to set up a publishing routine that goes straight from a conversation to my Git-hosted portfolio — and it works beautifully. This post was created exactly that way.

## How It Works

The system is a single TypeScript script (`publish.ts`) that commits `.md` files and images directly to your GitHub repo via the API. That's it — no CMS, no database, no third-party platform.

There are two ways to use it:

### Option 1 — Write it yourself

Write your post in any editor, save it as a `.md` file with the right frontmatter, and run the script. No AI involved at all.

```powershell
npx tsx publish.ts --blog personal --publish "drafts\my-post.md"
```

### Option 2 — Draft with Claude

Start a conversation in Claude and ask it to write the post. Iterate until you're happy, then say "ship it". Claude saves the approved markdown and runs the publish command for you.

> "Let's write a blog post about React Server Components"

Claude writes a full draft with frontmatter right in the chat. You read it, give feedback, and iterate. Nothing gets committed until you approve it.

Both options use the exact same script and end up with the same result — a `.md` file committed to your repo, picked up by Next.js on the next build.

## Prerequisites

- A Next.js blog repo on GitHub with `.md` files for posts
- Node.js installed
- A GitHub personal access token

## Step 1 — Create the Project Folder

```bash
mkdir -p ~/Documents/ai-tools/blog-publisher
cd ~/Documents/ai-tools/blog-publisher
```

Also create a `drafts/` subfolder — this is where your `.md` files and images live before publishing:

```bash
mkdir drafts
```

## Step 2 — Add the Files

Create `package.json`:

```json
{
  "name": "blog-publisher",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@octokit/rest": "^20.1.1",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "tsx": "^4.7.0",
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0"
  }
}
```

Create `blogs.config.json` with your blog details:

```json
{
  "blogs": {
    "personal": {
      "label": "My Blog",
      "github_owner": "your-username",
      "github_repo": "your-blog-repo",
      "github_branch": "master",
      "blog_dir": "content/blog",
      "image_dir": "public/images/blog",
      "author": "Your Name"
    }
  }
}
```

Create `.env` with your GitHub token:

```
GITHUB_TOKEN=github_pat_...
```

Then add `publish.ts` — the full script is available in the repo linked at the bottom.

## Step 3 — Install Dependencies

```bash
npm install
```

Verify everything is wired up:

```bash
npx tsx publish.ts --list
```

You should see your configured blogs printed out.

## Step 4 — Get a GitHub Token

Go to **github.com/settings/personal-access-tokens/new** and create a fine-grained token:

| Setting | Value |
|---------|-------|
| Repository access | Only your blog repo |
| Contents permission | Read and Write |

Everything else stays at "No access". Paste the token into your `.env` file.

## Step 5 — Install the Claude Skill (optional)

If you want to use Option 2, download `blog-publisher.skill` and upload it in **Claude Settings → Skills**. Once installed, Claude automatically knows to use this workflow whenever you mention writing a blog post.

If you're writing posts yourself, skip this step entirely.

## Step 6 — Publish

Store your `.md` file in the `drafts/` folder. If you have a hero image, put it there too.

Without image:
```powershell
npx tsx publish.ts --blog personal --publish "drafts\my-post.md"
```

With image:
```powershell
npx tsx publish.ts --blog personal --publish "drafts\my-post.md" --image "drafts\hero.png"
```

The image gets committed to `public/images/blog/` and the `image` field is automatically injected into the frontmatter.

## All Files

Everything you need is in the repo:

- `publish.ts` — the publishing script
- `blogs.config.json` — blog configuration
- `blog-publisher.skill` — the Claude skill (optional)
- `draft-template.md` — a frontmatter template to start new posts

---

Full control over your content. No CMS. No freemium pressure. Write it yourself or draft it with Claude — either way, one command gets it live.
