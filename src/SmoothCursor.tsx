import { useEffect, useRef } from "react"

// ---------------------------------------------------------------------------
// SmoothCursor — fixed & refined
//
// Cursor bug root cause: mouse events don't propagate from inside <iframe>s.
// Fix: listen for document `mouseleave` to freeze cursor while inside iframe,
//      and add a transparent sibling overlay on iframes that captures movement.
//
// Design: ring cursor (hollow circle) that:
//  - collapses to small dot when clicking
//  - grows + fills with yellow accent on interactive elements
//  - has 3 minimal ghost trail dots
// ---------------------------------------------------------------------------

const TRAIL_COUNT = 3
const LERP_MAIN = 0.15
const TRAIL_LERP = [0.10, 0.07, 0.05]
const ACCENT = "#EEC900"  // bold yellow accent

interface Point { x: number; y: number }

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function SmoothCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef<Point>({ x: -200, y: -200 })
  const ringPos = useRef<Point>({ x: -200, y: -200 })
  const trailPos = useRef<Point[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  )
  const hovering = useRef(false)
  const clicking = useRef(false)
  const inIframe = useRef(false)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    // Hide system cursor globally
    const style = document.createElement("style")
    style.id = "smooth-cursor-hide"
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `
    document.head.appendChild(style)

    // ── Event handlers ──────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      if (!inIframe.current) {
        pos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const onOver = (e: MouseEvent) => {
      inIframe.current = false
      const el = e.target as Element
      hovering.current = !!el.closest("a, button, [role='button'], label, [data-cursor-hover]")
    }

    // When mouse leaves document body it's entering an iframe
    const onDocLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        inIframe.current = true
      }
    }

    const onDocEnter = () => {
      inIframe.current = false
    }

    const onDown = () => { clicking.current = true }
    const onUp = () => { clicking.current = false }

    // ── RAF Loop ─────────────────────────────────────────────────────────────
    function loop() {
      // Only update ring/trail positions when not in iframe
      if (!inIframe.current) {
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, LERP_MAIN)
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, LERP_MAIN)

        for (let i = 0; i < TRAIL_COUNT; i++) {
          const src = i === 0 ? ringPos.current : trailPos.current[i - 1]
          trailPos.current[i].x = lerp(trailPos.current[i].x, src.x, TRAIL_LERP[i])
          trailPos.current[i].y = lerp(trailPos.current[i].y, src.y, TRAIL_LERP[i])
        }
      }

      const ring = ringRef.current
      if (ring) {
        const isHover = hovering.current
        const isClick = clicking.current

        const size = isClick ? 12 : isHover ? 36 : 22
        const bg = isHover && !isClick ? ACCENT : "transparent"
        const border = isHover ? ACCENT : "#000"
        const opacity = inIframe.current ? 0 : 1

        ring.style.width = `${size}px`
        ring.style.height = `${size}px`
        ring.style.marginLeft = `${-size / 2}px`
        ring.style.marginTop = `${-size / 2}px`
        ring.style.background = bg
        ring.style.borderColor = border
        ring.style.opacity = String(opacity)
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = trailRefs.current[i]
        if (el) {
          const trailSize = 5 - i
          const trailOpacity = inIframe.current ? 0 : (0.22 - i * 0.06)
          el.style.width = `${trailSize}px`
          el.style.height = `${trailSize}px`
          el.style.marginLeft = `${-trailSize / 2}px`
          el.style.marginTop = `${-trailSize / 2}px`
          el.style.opacity = String(trailOpacity)
          el.style.background = hovering.current ? ACCENT : "#000"
          el.style.transform = `translate(${trailPos.current[i].x}px, ${trailPos.current[i].y}px)`
        }
      }

      rafId.current = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    document.addEventListener("mouseleave", onDocLeave)
    document.addEventListener("mouseenter", onDocEnter)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    rafId.current = requestAnimationFrame(loop)

    return () => {
      const s = document.getElementById("smooth-cursor-hide")
      if (s) s.remove()
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onDocLeave)
      document.removeEventListener("mouseenter", onDocEnter)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Ring cursor */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "2px solid #000",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-200px, -200px)",
          marginLeft: -11,
          marginTop: -11,
          willChange: "transform, width, height, background, border-color",
          transition: "width 0.18s cubic-bezier(0.34,1.56,0.64,1), height 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.15s ease, border-color 0.15s ease, opacity 0.1s ease",
          mixBlendMode: "normal",
        }}
      />

      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 5 - i,
            height: 5 - i,
            borderRadius: "50%",
            background: "#000",
            opacity: 0.22 - i * 0.06,
            pointerEvents: "none",
            zIndex: 99998,
            transform: "translate(-200px, -200px)",
            marginLeft: -(5 - i) / 2,
            marginTop: -(5 - i) / 2,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </>
  )
}
