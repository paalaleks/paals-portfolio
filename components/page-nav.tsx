"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function PageNav({
  backHref,
  backLabel,
}: {
  backHref?: string
  backLabel?: string
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 md:px-16 lg:px-24">
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>
      ) : (
        <div />
      )}
      <ModeToggle />
    </nav>
  )
}
