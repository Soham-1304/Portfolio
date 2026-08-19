import { useEffect, useState } from "react"
import { ArrowRight } from "./lib"
import { KineticText } from "./components/ui/kinetic-text"
import { ShineBorder } from "./components/ui/shine-border"

const roles = [
  "Backend Systems",
  "Distributed Architecture",
  "Applied AI / ML",
]

export default function Hero({ onCta }: { onCta: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const step = (i: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(24px)",
    transition: `opacity 0.6s ${0.15 + i * 0.14}s cubic-bezier(0.22,1,0.36,1), transform 0.6s ${0.15 + i * 0.14}s cubic-bezier(0.22,1,0.36,1)`,
  })

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 mono-grid opacity-[0.35]" aria-hidden />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 md:px-10 pt-24">
        <p className="eyebrow" style={step(0)}>
          Software Engineer
        </p>

        {/* Kinetic hero name — font weight, scale, and golden/yellow hue on pointer proximity */}
        <div style={step(1)} className="mt-6 mb-4 flex flex-col items-start gap-1">
          <KineticText
            text="Soham"
            as="h1"
            className="font-display font-extrabold text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] leading-[0.84] tracking-[-5%] text-ink [font-optical-sizing:auto]"
          />
          <KineticText
            text="Karandikar"
            as="h1"
            className="font-display font-extrabold text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] leading-[0.84] tracking-[-5%] text-ink [font-optical-sizing:auto]"
          />
        </div>

        {/* Cycling role subtitle */}
        <div className="h-8 overflow-hidden" style={step(2)}>
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-10 rounded-full bg-ink" />
            <span
              key={roleIdx}
              className="font-body text-base md:text-lg font-medium text-ash inline-block"
              style={{
                animation: "projectSwap 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {roles[roleIdx]}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-10" style={step(3)}>
          <button
            onClick={onCta}
            className="relative self-start md:self-auto uppercase tracking-wide overflow-hidden inline-flex items-center gap-3 bg-ink text-white text-sm font-medium px-7 py-4 rounded-lg transition-transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <ShineBorder shineColor={["#ffffff", "#EEC90088"]} duration={6} borderWidth={1} />
            View My Work
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={step(4)}>
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="relative block h-9 w-px bg-line-strong overflow-hidden">
          <span
            className="absolute top-0 left-0 h-3 w-px bg-ink"
            style={{ animation: "scrollcue 1.8s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  )
}
