import { useState } from "react"
import { ArrowRight, GitHubIcon } from "./lib"
import { siteLinks } from "./data"

const links = [
  { label: "Home", target: "top" },
  { label: "Projects", target: "projects" },
  { label: "Skills", target: "skills" },
  { label: "Experience", target: "experience" },
]

export default function Navbar({
  onNav,
  activeRoute = "home",
}: {
  onNav: (id: string) => void
  activeRoute?: string
}) {
  const [open, setOpen] = useState(false)

  const go = (id: string) => {
    setOpen(false)
    onNav(id)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8 pt-3 sm:pt-4">
        <div className="max-w-[1240px] mx-auto flex items-center gap-2.5 sm:gap-3">
          {/* Floating Back Button placed outside the main navbar to the left */}
          {activeRoute !== "home" && (
            <button
              onClick={() => go("top")}
              title="Back to Overview"
              aria-label="Back to overview"
              className="pointer-events-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-line-strong bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <ArrowRight className="rotate-180 w-4 h-4" />
            </button>
          )}

          {/* Main Floating Navbar Pill */}
          <div className="flex-1 pointer-events-auto bg-white/95 backdrop-blur-md border border-line-strong shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl h-12 sm:h-14 md:h-16 px-4 sm:px-6 flex items-center justify-between">
            <button
              onClick={() => go("top")}
              className="flex items-center gap-2.5 font-display font-extrabold text-ink hover:opacity-80 transition-opacity cursor-pointer select-none"
              aria-label="Soham Karandikar — home"
            >
              <span className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-ink text-white flex items-center justify-center font-display font-extrabold text-xs sm:text-sm tracking-wider shadow-2xs">
                SK
              </span>
            </button>

          <nav className="hidden md:flex items-center gap-1 bg-surface border border-line p-1 rounded-xl">
            {links.map((l) => {
              const isActive =
                (activeRoute === "home" && l.target === "top") ||
                activeRoute === l.target
              return (
                <button
                  key={l.target}
                  onClick={() => go(l.target)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-ink text-white shadow-xs"
                      : "text-mute hover:text-ink hover:bg-white"
                  }`}
                >
                  {l.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={siteLinks.resume}
              onClick={(e) => {
                if (siteLinks.resume === "#") {
                  e.preventDefault()
                  go("contact")
                }
              }}
              className="hidden sm:inline-flex items-center bg-ink text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-ash transition-colors cursor-pointer shadow-xs"
            >
              Résumé
            </a>
            <a
              href={siteLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden sm:grid place-items-center h-8 w-8 border border-line-strong text-ink hover:bg-ink hover:text-white transition-colors rounded-lg bg-white"
            >
              <GitHubIcon size={16} />
            </a>
            <button
              className="md:hidden grid place-items-center h-9 w-9 border border-line-strong rounded-lg bg-surface text-ink cursor-pointer"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <div className="space-y-1">
                <span className="block h-[1.5px] w-5 bg-ink" />
                <span className="block h-[1.5px] w-5 bg-ink" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-[60] bg-ink text-white transition-all duration-500 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          clipPath: open ? "circle(150% at 90% 6%)" : "circle(0% at 90% 6%)",
        }}
      >
        <div className="h-full px-6 py-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="font-display font-bold text-lg">Soham Karandikar</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-3xl leading-none text-white cursor-pointer"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Home", target: "top" },
              { label: "Projects", target: "projects" },
              { label: "Skills", target: "skills" },
              { label: "Experience", target: "experience" },
              { label: "About", target: "about" },
              { label: "Contact", target: "contact" },
            ].map((t, i) => (
              <button
                key={t.target}
                onClick={() => go(t.target)}
                className="text-left font-display font-extrabold text-4xl capitalize py-1.5 hover:text-white/60 transition-colors cursor-pointer"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(16px)",
                  transition: `all 0.5s ${0.1 + i * 0.05}s`,
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-6 text-sm text-white/60 border-t border-white/10 pt-4 font-mono">
            <a
              href={siteLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={siteLinks.resume}
              onClick={(e) => {
                e.preventDefault()
                go("contact")
              }}
              className="hover:text-white"
            >
              Résumé
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
