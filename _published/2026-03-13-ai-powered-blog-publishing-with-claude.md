---
title: "My New Blog Posting Routine"
date: "2026-03-13"
slug: "ai-powered-blog-publishing-with-claude"
description: "How I ditched CMS platforms and built a blog publishing routine using Claude and the GitHub API — with or without AI."
author: "Paal Aleksander Kaasa"
image: "/images/blog/meg.png"
image_alt: "A gathering of 19th century writers around a table"
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

The tool is a globally-installed CLI called `blog-publishing-routine` that commits `.md` files and images directly to your GitHub repo via the API. No CMS, no database, no third-party platform.

There are two ways to use it:

### Option 1 — Write it yourself

Write your post in any editor, save it as a `.md` file with the right frontmatter, and run the command. No AI involved at all.

```bash
blog-publishing-routine --blog personal --publish drafts/my-post.md
```

### Option 2 — Draft with Claude Code

Open Claude Code and ask it to write a blog post. Iterate until you're happy, then say "ship it". Claude saves the approved markdown and runs the publish command for you.

> "Let's write a blog post about React Server Components"

Claude writes a full draft with frontmatter right in the chat. You read it, give feedback, and iterate. Nothing gets committed until you approve it.

Both options use the exact same CLI and end up with the same result — a `.md` file committed to your repo, picked up by Next.js on the next build.

## Prerequisites

- A Next.js blog repo on GitHub with `.md` files for posts
- Node.js installed
- A GitHub personal access token

## Step 1 — Install the Tool

Clone the repo and link it globally:

```bash
git clone https://github.com/paalaleks/blog-publishing-routine.git
cd blog-publishing-routine
npm install
npm link
```

This registers `blog-publishing-routine` as a global command you can run from anywhere.

## Step 2 — Create a GitHub Token

Go to **github.com/settings/personal-access-tokens/new** and create a fine-grained token:

| Setting | Value |
|---------|-------|
| Repository access | Only your blog repo |
| Contents permission | Read and Write |

Everything else stays at "No access". Keep the token handy for the next step.

## Step 3 — Set Up Your Blog Project

From your blog project root, run the init command:

```bash
cd path/to/your-blog-repo
blog-publishing-routine init
```

This creates two files:

- `blogs.config.json` — edit with your GitHub repo details
- `.env` — paste your GitHub token here

Then verify everything is wired up:

```bash
blog-publishing-routine --list
```

You should see your configured blogs printed out. Add these to your `.gitignore`:

```
.env
drafts/
_published/
```

## Step 4 — Install the Claude Code Skill (optional)

If you want to use Option 2, copy or symlink the skill into your Claude Code skills folder:

```bash
mkdir -p ~/.claude/skills/blog-publishing-routine
cp skill/SKILL.md ~/.claude/skills/blog-publishing-routine/SKILL.md
```

Or symlink it so it stays in sync with the repo:

```bash
mkdir -p ~/.claude/skills/blog-publishing-routine
ln -s "$(pwd)/skill/SKILL.md" ~/.claude/skills/blog-publishing-routine/SKILL.md
```

Once installed, Claude Code picks up the skill automatically. Say _"let's write a blog post"_ and it handles the rest.

If you're writing posts yourself, skip this step entirely.

## Commands

Run all commands from your blog project root.

### Publish a new post

```bash
blog-publishing-routine --blog personal --publish drafts/my-post.md
```

### Publish with a hero image

```bash
blog-publishing-routine --blog personal --publish drafts/my-post.md --image drafts/hero.png
```

The image gets committed to `public/images/blog/` and the `image` field is automatically injected into the frontmatter.

### Update an existing post

Edit the local copy in `_published/`, then push the changes:

```bash
blog-publishing-routine --blog personal --update my-post-slug
```

### Add or update a hero image on an existing post

```bash
blog-publishing-routine --blog personal --add-image my-post-slug --image drafts/hero.png
```

### Fetch a post from GitHub

Pull a published post down to your local `_published/` folder:

```bash
blog-publishing-routine --blog personal --fetch my-post-slug
```

### Remove a post

```bash
blog-publishing-routine --blog personal --remove my-post-slug
```

## Folder Structure

```
blog-publishing-routine/          <- the tool (installed once, linked globally)
├── publish.ts
├── package.json
├── tsconfig.json
├── bin/
│   └── blog-publishing-routine.js
├── skill/
│   └── SKILL.md                  <- Claude Code skill
├── prompt/
│   └── use-this-blog-prompt-in-IDE.md
└── drafts/
    └── draft-template.md

your-blog-repo/                   <- your Next.js project (run commands from here)
├── blogs.config.json             <- created by `blog-publishing-routine init`
├── .env                          <- created by `blog-publishing-routine init`
├── content/blog/                 <- committed posts (on GitHub)
├── public/images/blog/           <- committed images (on GitHub)
├── drafts/                       <- work in progress (gitignored)
└── _published/                   <- local copies of live posts (gitignored)
```

---

Full control over your content. No CMS. No freemium pressure. Write it yourself or draft it with Claude Code — either way, one command gets it live.
