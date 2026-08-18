import { useEffect, useRef, useState, type CSSProperties } from "react"

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

export type Tier = "gold" | "silver" | "bronze"

export const tierColor: Record<Tier, string> = {
  gold: "#d4af37",
  silver: "#a8a8a8",
  bronze: "#cd7f32",
}

export const tierLabel: Record<Tier, string> = {
  gold: "Expert · Daily Driver",
  silver: "Proficient",
  bronze: "Familiar",
}


export function ArrowRight({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  )
}

export function JigsawPieceIcon({
  size = 20,
  className = "",
  style,
}: {
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z" />
    </svg>
  )
}

/** FLIP-style overlay from jigsaw piece to section header */
export function runFlipTransition(fromEl: HTMLElement, toEl: HTMLElement, onComplete?: () => void) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onComplete?.()
    return
  }

  const from = fromEl.getBoundingClientRect()
  const to = toEl.getBoundingClientRect()
  const overlay = document.createElement("div")
  overlay.className = "flip-overlay"
  overlay.style.setProperty("--flip-from-x", `${from.left}px`)
  overlay.style.setProperty("--flip-from-y", `${from.top}px`)
  overlay.style.setProperty("--flip-from-w", `${from.width}px`)
  overlay.style.setProperty("--flip-from-h", `${from.height}px`)
  overlay.style.setProperty("--flip-to-x", `${to.left}px`)
  overlay.style.setProperty("--flip-to-y", `${to.top}px`)
  overlay.style.setProperty("--flip-to-w", `${to.width}px`)
  overlay.style.setProperty("--flip-to-h", `${to.height}px`)
  document.body.appendChild(overlay)

  const cleanup = () => {
    overlay.remove()
    toEl.classList.add("section-flash")
    setTimeout(() => toEl.classList.remove("section-flash"), 600)
    onComplete?.()
  }

  overlay.addEventListener("animationend", cleanup, { once: true })
  setTimeout(cleanup, 450)
}
