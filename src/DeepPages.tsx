import { useEffect } from "react"
import {
  certifications,
  experience,
  projects,
  skillCategories,
  type Project,
} from "./data"
import { ArrowRight, GitHubIcon, useReveal } from "./lib"

function DeepShell({
  kicker,
  title,
  onBack,
  children,
}: {
  kicker: string
  title: string
  onBack: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      {/* Compact, sleek header */}
      <header className="bg-ink text-white px-5 md:px-10 pt-24 pb-6 md:pt-28 md:pb-8 border-b border-line">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-white/50 mb-1 font-mono text-[10px]">{kicker}</p>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-white">
              {title}
            </h1>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-white text-ink text-xs font-mono font-bold px-3.5 py-2 rounded-lg hover:bg-surface transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <ArrowRight className="rotate-180 w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </button>
        </div>
      </header>
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-8 md:py-12">{children}</div>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-mono font-medium tracking-wide text-ash border border-line-strong bg-white px-2.5 py-1 rounded-xs">
      {children}
    </span>
  )
}

import { Safari } from "./components/ui/safari"

// ---- PROJECTS deep — Page-Wide Interactive Showcase with Safari & Flip Card -----------------
export function ProjectsDeep({ onBack, focus }: { onBack: () => void; focus?: string }) {
  const initialIdx = focus ? Math.max(0, projects.findIndex((p) => p.id === focus)) : 0
  const [activeIdx, setActiveIdx] = useState(initialIdx)
  const [isFlipped, setIsFlipped] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const ref = useReveal<HTMLDivElement>()
  const p = projects[activeIdx]

  const go = (n: number) => {
    const next = (n + projects.length) % projects.length
    setActiveIdx(next)
    setIframeLoaded(false)
    setIsFlipped(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return
      if (e.key === "ArrowLeft") go(activeIdx - 1)
      if (e.key === "ArrowRight") go(activeIdx + 1)
      if (e.key.toLowerCase() === "f") setIsFlipped((prev) => !prev)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeIdx])

  return (
    <DeepShell kicker="02 / Projects" title="Projects Showcase" onBack={onBack}>
      <div ref={ref} className="reveal space-y-8 max-w-6xl mx-auto">
        {/* Project Header Info Card */}
        <div className="border-2 border-ink bg-white p-6 md:p-8 rounded-2xl shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-mute uppercase tracking-wider">
                  CASE STUDY {String(activeIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                <span className="font-mono text-xs text-ash font-semibold">{p.tagline}</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight">
                {p.name}
              </h2>
              <p className="text-ash text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>

            {/* Same Lane Action Buttons: Source Code & Live App */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-ash transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <GitHubIcon size={14} /> Source Code
              </a>
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink text-xs font-bold px-4 py-2.5 rounded-md hover:bg-ink hover:text-white transition-all cursor-pointer bg-white active:scale-95"
              >
                Live App ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── MAC-SIZED SAFARI SHOWCASE FLANKED BY LEFT & RIGHT CAROUSEL BUTTONS ── */}
        <div className="relative flex items-center justify-between gap-3 sm:gap-5">
          {/* Left Carousel Button */}
          <button
            onClick={() => go(activeIdx - 1)}
            aria-label="Previous project"
            className="hidden sm:grid place-items-center h-12 w-12 rounded-full border-2 border-ink bg-white text-ink shadow-md hover:bg-ink hover:text-white transition-all cursor-pointer active:scale-90 shrink-0 select-none z-10"
          >
            <ArrowRight className="rotate-180 w-4 h-4" />
          </button>

          {/* Center Safari Showcase Frame */}
          <div className="relative flex-1 aspect-[16/10] sm:aspect-[16/9.5] min-h-[460px] md:min-h-[560px] perspective-1000">
            <div
              className={`relative w-full h-full transform-style-3d transition-transform duration-500 ease-in-out ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* FRONT SIDE · Live Safari Sandbox Embed */}
              <div className="w-full h-full backface-hidden">
                <div className="relative w-full h-full rounded-2xl border-2 border-ink bg-white shadow-xl overflow-hidden flex flex-col">
                  {/* Safari Chrome Header with Embedded Professional Flip Button */}
                  <div className="flex h-11 items-center justify-between border-b border-line bg-[#f6f6f6] px-4 gap-3 select-none shrink-0">
                    {/* macOS Window Controls */}
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                      <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                      <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                    </div>

                    {/* Address Bar */}
                    <div className="flex flex-1 items-center justify-center max-w-md mx-auto">
                      <div className="flex h-7 w-full items-center justify-between rounded-md border border-line bg-white px-3 text-xs shadow-2xs">
                        <div className="flex items-center gap-2 text-mute truncate">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-mute shrink-0">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span className="font-mono text-[11px] text-ink font-medium truncate">
                            {p.domain}
                          </span>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      </div>
                    </div>

                    {/* Professional Flip Button on Safari Chrome */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setIsFlipped(true)}
                        title="View Architecture Specification"
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-surface border border-line-strong text-ink text-xs font-mono font-bold px-3 py-1 rounded-md transition-all cursor-pointer shadow-2xs active:scale-95"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        <span>Architecture Spec</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Viewport Frame */}
                  <div className="relative flex-1 w-full bg-[#18181b] overflow-hidden">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 bg-[#18181b] flex flex-col items-center justify-center p-6 text-center z-10 animate-pulse text-white">
                        <div className="h-8 w-8 rounded-full border-2 border-white border-t-transparent animate-spin mb-3" />
                        <p className="text-xs font-mono text-zinc-400">Loading live deploy for {p.name}...</p>
                      </div>
                    )}

                    <iframe
                      key={p.id}
                      src={p.demoUrl}
                      title={`${p.name} Full Screen Live Sandbox`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className="absolute inset-0 w-full h-full border-0 block bg-[#18181b]"
                      onLoad={() => setIframeLoaded(true)}
                    />

                    {/* Status Badge */}
                    <div className="absolute bottom-3 right-3 bg-ink/90 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-md shadow-lg pointer-events-none flex items-center gap-2 border border-white/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Sandbox: {p.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK SIDE · Deep Architectural Spec */}
              <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden border-2 border-ink bg-white p-8 md:p-12 rounded-2xl shadow-xl flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
                    <div>
                      <span className="eyebrow font-mono text-xs font-bold text-mute uppercase">Architectural Blueprint</span>
                      <h3 className="font-display font-extrabold text-3xl text-ink tracking-tight mt-0.5">{p.name} Deep Dive</h3>
                    </div>
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="inline-flex items-center gap-1.5 bg-ink text-white font-mono text-xs font-bold px-3.5 py-2 rounded-md hover:bg-ash transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 2v6h6M2.66 15.57a10 10 0 0 0 18.66-3.57" />
                      </svg>
                      <span>Return to Live Window</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 text-sm md:text-base">
                    <div>
                      <p className="font-mono text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">01 — System Overview</p>
                      <p className="text-ash leading-relaxed">{p.overview}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">02 — The Problem</p>
                      <p className="text-ash leading-relaxed">{p.problem}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-line">
                    <p className="font-mono text-xs font-bold text-ink mb-3 uppercase tracking-wider">03 — Architecture Pipeline Flow</p>
                    <div className="border border-line bg-surface p-5 rounded-xl flex flex-wrap items-center gap-3">
                      {p.arch.map((n, i) => (
                        <div key={n.node} className="flex items-center gap-3">
                          <span
                            className={`text-xs font-mono font-semibold px-3 py-1.5 border rounded-sm ${
                              n.kind === "service"
                                ? "bg-ink text-white border-ink"
                                : n.kind === "data"
                                ? "bg-white text-ink border-dashed border-ink"
                                : n.kind === "external"
                                ? "bg-surface text-mute border-line-strong"
                                : "bg-white text-ink border-ink"
                            }`}
                          >
                            {n.node}
                          </span>
                          {i < p.arch.length - 1 && <span className="text-line-strong font-mono">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-line grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-mono text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">04 — Core Engineering Contribution</p>
                      <p className="text-ash leading-relaxed text-sm md:text-base">{p.contribution}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">05 — Production Metrics & Scope</p>
                      <p className="text-ash leading-relaxed text-sm md:text-base font-medium">{p.results}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Carousel Button */}
          <button
            onClick={() => go(activeIdx + 1)}
            aria-label="Next project"
            className="hidden sm:grid place-items-center h-12 w-12 rounded-full border-2 border-ink bg-white text-ink shadow-md hover:bg-ink hover:text-white transition-all cursor-pointer active:scale-90 shrink-0 select-none z-10"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Carousel Bar */}
        <div className="flex sm:hidden items-center justify-between border-t border-line pt-4">
          <button
            onClick={() => go(activeIdx - 1)}
            className="inline-flex items-center gap-2 border border-line-strong px-4 py-2 rounded-md font-mono text-xs font-bold"
          >
            ← Prev
          </button>
          <div className="flex items-center gap-1.5">
            {projects.map((_, k) => (
              <span
                key={k}
                className={`h-2 rounded-full transition-all ${k === activeIdx ? "w-6 bg-ink" : "w-2 bg-line-strong"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(activeIdx + 1)}
            className="inline-flex items-center gap-2 bg-ink text-white px-4 py-2 rounded-md font-mono text-xs font-bold"
          >
            Next →
          </button>
        </div>
      </div>
    </DeepShell>
  )
}

// ---- EXPERIENCE deep -------------------------------------------------------
export function ExperienceDeep({ onBack }: { onBack: () => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <DeepShell kicker="01 / Experience" title="Work Experience" onBack={onBack}>
      <div ref={ref} className="reveal border-2 border-ink p-8 md:p-14 rounded-xl bg-white shadow-sm">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 border-b border-line pb-10 mb-12">
          <div>
            <p className="eyebrow mb-2 font-mono text-[10px]">{experience.date} · {experience.location}</p>
            <h2 className="font-display text-3xl font-extrabold text-ink">{experience.role}</h2>
            <div className="flex flex-wrap gap-2 mt-5">
              {experience.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div>
            <p className="text-ink text-lg leading-relaxed font-medium">{experience.summary}</p>
            <p className="text-ash mt-4 leading-relaxed text-sm md:text-base">{experience.fullDescription}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <p className="eyebrow mb-4 font-mono text-xs font-bold text-ink">Responsibilities & Key Impact</p>
            <ul className="space-y-4">
              {experience.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ash leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 bg-ink shrink-0 rotate-45" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 font-mono text-xs font-bold text-ink">Architectural Learnings</p>
            <p className="text-ash leading-relaxed">{experience.learnings}</p>
            <p className="text-mute text-sm mt-4 leading-relaxed">
              Working on platform infrastructure reinforced the importance of backward compatibility, graceful degradation, and production instrumentation.
            </p>
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-line">
          <p className="eyebrow mb-5 font-mono text-xs font-bold text-ink">Open-source Contributions Upstream</p>
          <div className="divide-y divide-line border-y border-line">
            {experience.openSource.map((o) => (
              <div key={o.repo} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 py-4">
                <span className="font-mono font-semibold text-ink w-56">{o.repo}</span>
                <span className="text-ash text-sm">{o.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeepShell>
  )
}

// ---- SKILLS deep -----------------------------------------------------------
import { useState } from "react"
import { tierColor, tierLabel, type Tier } from "./lib"

function DeepSkillCard({ skill }: { skill: import("./data").SkillItem }) {
  const color = tierColor[skill.tier]
  const tooltipText = `${skill.name} (${tierLabel[skill.tier]}) · ${skill.experience} ${skill.focus ? `· ${skill.focus}` : ""}`

  return (
    <div
      title={tooltipText}
      className="group border border-line hover:border-ink bg-white hover:bg-surface p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between select-none cursor-default"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-surface border border-line group-hover:border-ink/40 group-hover:bg-white flex items-center justify-center p-2.5 shrink-0 transition-colors shadow-2xs">
            <img
              src={skill.logo}
              alt={skill.name}
              className="h-8 w-8 object-contain select-none group-hover:scale-110 transition-transform duration-200"
              loading="lazy"
            />
          </div>
          <span className="font-mono text-xs font-bold text-ink bg-surface border border-line-strong px-2.5 py-1 rounded-md">
            {skill.experience}
          </span>
        </div>

        <h4 className="font-display font-bold text-lg text-ink tracking-tight">
          {skill.name}
        </h4>
        {skill.focus && (
          <p className="text-xs text-mute mt-1 leading-relaxed font-medium">
            {skill.focus}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <span className="text-[11px] font-mono text-mute font-medium">
            {tierLabel[skill.tier].split(" · ")[0]}
          </span>
        </div>
      </div>
    </div>
  )
}

export function SkillsDeep({ onBack }: { onBack: () => void }) {
  const ref = useReveal<HTMLDivElement>()
  const [activeTab, setActiveTab] = useState<string>("all")

  const tabs = [
    { id: "all", label: "All Skills" },
    ...skillCategories.map((c) => ({ id: c.name, label: c.name })),
  ]

  const displayedGroups =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.name === activeTab)

  return (
    <DeepShell kicker="03 / Skills" title="Technical Stack" onBack={onBack}>
      {/* Category Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-ink text-white shadow-xs"
                : "bg-surface text-mute border border-line hover:border-ink hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filtered Category Groups */}
      <div ref={ref} className="reveal space-y-10">
        {displayedGroups.map((group) => (
          <div key={group.name} className="border-2 border-ink bg-white p-6 md:p-9 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-ink tracking-tight">{group.name}</h3>
                <p className="text-mute text-xs mt-1 leading-relaxed max-w-2xl">{group.description}</p>
              </div>
              <span className="font-mono text-xs font-bold text-ink bg-surface border border-line-strong px-3 py-1 rounded-md">
                {group.skills.length} tools
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.skills.map((skill) => (
                <DeepSkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-8 text-ink">
          Verified Certifications
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {certifications.map((c) => (
            <div key={c.name} className="grid md:grid-cols-[1.5fr_1fr_auto_auto] gap-2 md:gap-8 py-5 items-baseline">
              <span className="font-display font-bold text-lg text-ink">{c.name}</span>
              <span className="text-ash text-sm">{c.issuer}</span>
              <span className="text-mute text-sm font-mono">{c.date}</span>
              <a
                href={c.verify}
                onClick={(e) => {
                  if (c.verify === "#") e.preventDefault()
                }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:underline cursor-pointer"
              >
                Verify Credential <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </DeepShell>
  )
}
