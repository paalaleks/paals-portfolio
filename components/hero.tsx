"use client"

import { useRef, useEffect } from "react"

const PAUSE_DURATION = 25_000 // 25 seconds

function useLoopingVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const handleEnded = () => {
      timeoutRef.current = setTimeout(() => {
        if (!video) return
        video.currentTime = 0
        video.play().catch(() => {})
      }, PAUSE_DURATION)
    }

    video.addEventListener("ended", handleEnded)
    return () => {
      video.removeEventListener("ended", handleEnded)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return ref
}

export function Hero() {
  const desktopVideoRef = useLoopingVideo()
  const mobileVideoRef = useLoopingVideo()

  return (
    <section className="relative min-h-dvh">
      {/* Character video — fixed on desktop, inline on mobile */}
      <div className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden lg:block">
        <video
          ref={desktopVideoRef}
          src="/paal.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/paal.jpg"
          className="h-full w-auto lg:block hidden"
        />
        <div className="hero-image-fade-edge" />
      </div>

      {/* Text Block */}
      <div className="relative z-10 -mt-32 flex min-h-dvh flex-col items-center justify-center px-8 py-20 text-center lg:mt-0 lg:mr-[40vw] lg:items-start lg:px-24 lg:text-left">
        <p className="hero-fade-in mb-4 text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Developer &amp; Designer
        </p>
        <h1 className="hero-fade-in hero-delay-1 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          Paal
          <br />
          Aleksander
        </h1>
        <p className="hero-fade-in hero-delay-2 mt-6 max-w-md text-lg leading-relaxed text-balance text-muted-foreground lg:text-xl">
          Fullstack developer with formal training in both frontend and backend
          engineering. Building digital experiences with care, craft, and a
          sharp eye for detail.
        </p>
        <div className="hero-fade-in hero-delay-3 mt-10">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground/70 uppercase transition-colors hover:text-foreground"
          >
            See my work
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile/tablet video — inline, not fixed */}
      <div className="relative -mt-54 h-[84vh] w-full lg:hidden">
        <video
          ref={mobileVideoRef}
          src="/paal.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/paal.jpg"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="hero-gradient-overlay" />
      </div>
    </section>
  )
}
