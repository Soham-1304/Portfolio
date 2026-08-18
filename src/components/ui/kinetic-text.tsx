import { useRef, useCallback, type CSSProperties, type ElementType } from "react"

export interface KineticTextProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  className?: string
  style?: CSSProperties
}

/**
 * MagicUI KineticText:
 * Interactively animates font-weight and character scale on pointer proximity.
 */
export function KineticText({
  text,
  as: Tag = "h1",
  className = "",
  style,
}: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const charsRef = useRef<(HTMLSpanElement | null)[]>([])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current
    if (!container) return
    const chars = charsRef.current

    chars.forEach((charEl) => {
      if (!charEl) return
      const rect = charEl.getBoundingClientRect()
      const charCenterX = rect.left + rect.width / 2
      const charCenterY = rect.top + rect.height / 2
      const dist = Math.sqrt(
        (e.clientX - charCenterX) ** 2 + (e.clientY - charCenterY) ** 2
      )
      // Proximity radius in px
      const radius = 160
      const t = Math.max(0, 1 - dist / radius)
      // Interpolate font weight up to 950 and scale slightly
      const weight = Math.round(700 + t * 250)
      const scale = 1 + t * 0.08
      const translateY = -t * 5

      charEl.style.fontWeight = String(weight)
      charEl.style.transform = `scale(${scale}) translateY(${translateY}px)`
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    charsRef.current.forEach((charEl) => {
      if (charEl) {
        charEl.style.fontWeight = ""
        charEl.style.transform = ""
      }
    })
  }, [])

  const Component = Tag as ElementType

  return (
    <Component
      ref={containerRef}
      className={`inline-block select-none cursor-default [font-optical-sizing:auto] ${className}`}
      style={{
        fontVariationSettings: "'wght' 700",
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          ref={(el) => {
            charsRef.current[i] = el
          }}
          className="inline-block transition-all duration-150 ease-out will-change-transform"
          style={{
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </Component>
  )
}
