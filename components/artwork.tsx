"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { X } from "lucide-react"

const artworks = [
  {
    src: "/artwork_airbaloon.webp",
    alt: "Air balloon illustration",
    title: "Air Balloon",
    width: 1528,
    height: 2095,
  },
  {
    src: "/artwork_bugsandviruses.png",
    alt: "Bugs and viruses illustration",
    title: "Bugs and Viruses",
    width: 2133,
    height: 1600,
  },
  {
    src: "/artwork_detmgfremmover.webp",
    alt: "Det mg fremme over illustration",
    title: "Det mg fremme over",
    width: 1528,
    height: 1023,
  },
  {
    src: "/artwork_hund_og_meg.webp",
    alt: "Hund og meg illustration",
    title: "Hund og meg",
    width: 2488,
    height: 1714,
  },
  {
    src: "/artwork_Prvoelser.webp",
    alt: "Prøvelser illustration",
    title: "Prøvelser",
    width: 1528,
    height: 1080,
  },
  {
    src: "/artwork_Ungolve_2.webp",
    alt: "Ungolve illustration",
    title: "Ungolve",
    width: 1528,
    height: 1080,
  },
]

export function Artwork() {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (selected === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [selected, close])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selected])

  return (
    <section id="artwork" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Creative Work
        </p>
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Artwork
        </h2>

        <div className="columns-2 gap-3 sm:columns-3 md:gap-4">
          {artworks.map((art, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="artwork-card group relative mb-3 block w-full overflow-hidden rounded-lg md:mb-4"
            >
              <Image
                src={art.src}
                alt={art.alt}
                width={art.width}
                height={art.height}
                className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm font-medium text-white">{art.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected !== null && (
        <div
          className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <div
            className="lightbox-content relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl sm:max-w-[70vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={artworks[selected].src}
              alt={artworks[selected].alt}
              width={artworks[selected].width}
              height={artworks[selected].height}
              className="h-auto max-h-[85vh] w-auto object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-lg font-medium text-white">
                {artworks[selected].title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
