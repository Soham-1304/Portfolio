import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  achievements,
  coCurricular,
  experience,
  projects,
  skillCategories,
  siteLinks,
  type Project,
  type SkillGroup,
} from "./data"
import { ArrowRight, GitHubIcon, JigsawPieceIcon, useReveal } from "./lib"
import { Safari } from "./components/ui/safari"

// ---- Shared Section Header ------------------------------------------------
export function SectionHead({
  num,
  title,
  intro,
  id,
}: {
  num: string
  title: string
  intro?: string
  id?: string
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal relative mb-10 md:mb-12" id={id} data-section-header={id}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-ink text-white px-3 py-1 rounded-sm mb-3.5 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase font-bold">
              {num}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-ink">
            {title}
          </h2>
          {intro && <p className="mt-3.5 text-ash max-w-2xl text-base md:text-lg leading-relaxed">{intro}</p>}
        </div>

        {/* Animated Pop-out Jigsaw Piece at Top-Right */}
        <div
          title="Interlocking module"
          className="hidden sm:grid place-items-center h-11 w-11 rounded-xl bg-surface border border-line-strong text-ink shadow-xs shrink-0 transition-transform duration-300 hover:rotate-12 hover:scale-110 select-none"
        >
          <JigsawPieceIcon size={22} className="piece-pop" />
        </div>
      </div>
    </div>
  )
}

function SeeMore({ onClick, label = "See more" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider border-b-2 border-ink pb-1 hover:gap-3.5 transition-all cursor-pointer"
    >
      {label}
      <ArrowRight className="transition-transform group-hover:translate-x-1" />
    </button>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-mono font-medium tracking-wide text-ink border border-line-strong bg-white px-2.5 py-1 rounded-xs shadow-2xs">
      {children}
    </span>
  )
}

const Section = ({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`px-5 md:px-10 py-20 md:py-28 ${className}`}>
    <div className="max-w-[1240px] mx-auto">{children}</div>
  </section>
)

// ---- Compact Architecture Diagram -----------------------------------------
function MiniArch({ project }: { project: Project }) {
  const kindStyle: Record<string, string> = {
    client: "bg-white text-ink border-ink",
    service: "bg-ink text-white border-ink",
    data: "bg-white text-ink border-dashed border-ink",
    external: "bg-surface text-mute border-line-strong",
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.arch.map((n, i) => (
        <div key={n.node} className="flex items-center gap-2">
          <span className={`text-[11px] font-mono font-semibold px-3 py-1 border rounded-xs ${kindStyle[n.kind]}`}>
            {n.node}
          </span>
          {i < project.arch.length - 1 && <span className="text-line-strong font-mono text-sm">→</span>}
        </div>
      ))}
    </div>
  )
}

// =====================================================================
// 01 / EXPERIENCE
// =====================================================================
export function ExperienceHome({ onDeep }: { onDeep: () => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <Section id="experience">
      <SectionHead
        id="experience"
        num="01 / Experience"
        title="Building the platform others build on."
        intro="One focused engagement — depth over breadth."
      />
      <div ref={ref} className="reveal border-2 border-ink p-7 md:p-12 rounded-xl bg-white shadow-sm">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 md:gap-14">
          <div>
            <p className="eyebrow font-mono mb-2 text-xs">{experience.date} · {experience.location}</p>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink">{experience.org}</h3>
            <p className="text-ash mt-1.5 text-lg font-semibold">{experience.role}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {experience.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div>
            <p className="text-ink leading-relaxed text-base md:text-lg font-medium">{experience.summary}</p>
            <ul className="mt-6 space-y-3.5">
              {experience.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm md:text-base text-ash">
                  <span className="mt-2 h-1.5 w-1.5 bg-ink shrink-0 rotate-45" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border border-line bg-surface p-5 rounded-lg">
              <p className="eyebrow font-mono mb-3 text-[10px] text-ink font-bold">Open-source contributions</p>
              <div className="space-y-2">
                {experience.openSource.map((o) => (
                  <div key={o.repo} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
                    <span className="font-mono text-ink font-bold">{o.repo}</span>
                    <span className="text-mute text-xs sm:text-sm">— {o.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <SeeMore onClick={onDeep} label="Full experience details" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// =====================================================================
// 02 / PROJECTS — Classic Clean Showcase with Magic UI Safari
// =====================================================================
export function ProjectsHome({ onDeep }: { onDeep: (id?: string) => void }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const ref = useReveal<HTMLDivElement>()
  const p = projects[activeIdx]

  const go = (n: number) => {
    const next = (n + projects.length) % projects.length
    setActiveIdx(next)
    setIframeLoaded(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return
      if (e.key === "ArrowLeft") go(activeIdx - 1)
      if (e.key === "ArrowRight") go(activeIdx + 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeIdx])

  return (
    <Section id="projects" className="bg-white border-y border-line">
      <SectionHead
        id="projects"
        num="02 / Projects"
        title="Things I've shipped."
        intro="Full-stack systems built end-to-end. Browse live deploy embeds inside the Safari workspace."
      />

      <div ref={ref} className="reveal mt-6 space-y-6">
        {/* ── TOP HORIZONTAL INFO BAR (Same Lane Action Links) ── */}
        <div className="border-2 border-ink bg-white p-5 md:p-7 rounded-2xl shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <span className="font-mono text-xs font-bold text-mute uppercase tracking-wider">
                  Project {String(activeIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                <span className="font-mono text-xs text-ash font-semibold truncate">{p.tagline}</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                {p.name}
              </h3>
              {/* Shortened 1-line description */}
              <p className="text-ash text-sm mt-1 max-w-2xl line-clamp-1 leading-normal">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>

            {/* Same Lane Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-ink text-white text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-ash transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <GitHubIcon size={14} /> Source Code
              </a>
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 border-2 border-ink text-ink text-xs font-bold px-4 py-2.5 rounded-md hover:bg-ink hover:text-white transition-all cursor-pointer bg-white active:scale-95"
              >
                Live Demo ↗
              </a>
              <button
                onClick={() => onDeep(p.id)}
                className="text-xs font-mono font-bold text-ink underline underline-offset-4 px-2 py-1 cursor-pointer"
              >
                Case Study →
              </button>
            </div>
          </div>
        </div>

        {/* ── MAC-SIZED SAFARI WINDOW FLANKED BY LEFT & RIGHT CAROUSEL BUTTONS ── */}
        <div className="relative flex items-center justify-between gap-3 sm:gap-5">
          {/* Left Circular Carousel Button */}
          <button
            onClick={() => go(activeIdx - 1)}
            aria-label="Previous project"
            className="hidden sm:grid place-items-center h-12 w-12 rounded-full border-2 border-ink bg-white text-ink shadow-md hover:bg-ink hover:text-white transition-all cursor-pointer active:scale-90 shrink-0 select-none z-10"
          >
            <ArrowRight className="rotate-180 w-4 h-4" />
          </button>

          {/* Center Safari Preview Frame */}
          <div className="relative flex-1 max-w-5xl mx-auto">
            <Safari url={`https://${p.domain}`} className="w-full shadow-lg">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] bg-[#18181b] overflow-hidden">
                {!iframeLoaded && (
                  <div className="absolute inset-0 bg-[#18181b] flex flex-col items-center justify-center p-6 text-center z-10 animate-pulse text-white">
                    <div className="h-8 w-8 rounded-full border-2 border-white border-t-transparent animate-spin mb-2.5" />
                    <p className="text-xs font-mono text-zinc-400">Loading live deploy for {p.name}...</p>
                  </div>
                )}

                <iframe
                  key={p.id}
                  src={p.demoUrl}
                  title={`${p.name} Live Application`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="absolute inset-0 w-full h-full border-0 block bg-[#18181b]"
                  onLoad={() => setIframeLoaded(true)}
                />

                {/* Status Badge */}
                <div className="absolute bottom-3 right-3 bg-ink/90 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-sm shadow-md pointer-events-none flex items-center gap-2 border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Sandbox: {p.name}</span>
                </div>
              </div>
            </Safari>
          </div>

          {/* Right Circular Carousel Button */}
          <button
            onClick={() => go(activeIdx + 1)}
            aria-label="Next project"
            className="hidden sm:grid place-items-center h-12 w-12 rounded-full border-2 border-ink bg-white text-ink shadow-md hover:bg-ink hover:text-white transition-all cursor-pointer active:scale-90 shrink-0 select-none z-10"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Carousel Bar */}
        <div className="flex sm:hidden items-center justify-between border-t border-line pt-3">
          <button
            onClick={() => go(activeIdx - 1)}
            className="inline-flex items-center gap-1.5 border border-line-strong px-3 py-1.5 rounded-md font-mono text-xs font-bold"
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
            className="inline-flex items-center gap-1.5 bg-ink text-white px-3 py-1.5 rounded-md font-mono text-xs font-bold"
          >
            Next →
          </button>
        </div>

        <div className="mt-8 text-center pt-2">
          <SeeMore onClick={() => onDeep()} label="View full project case studies & system designs" />
        </div>
      </div>
    </Section>
  )
}

// =====================================================================
// 03 / SKILLS — Modern Tech Stack Cards with Interactive Tooltips
// =====================================================================
import { topSkills, type SkillItem } from "./data"
import { tierColor, tierLabel, type Tier } from "./lib"

export function SkillTile({ skill }: { skill: SkillItem }) {
  const color = tierColor[skill.tier]
  const tooltipText = `${skill.name} (${tierLabel[skill.tier]}) · ${skill.experience} ${skill.focus ? `· ${skill.focus}` : ""}`

  return (
    <div
      title={tooltipText}
      className="group border border-line hover:border-ink bg-white hover:bg-surface p-4 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3.5 select-none cursor-default"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="h-11 w-11 rounded-lg bg-surface border border-line group-hover:border-ink/40 group-hover:bg-white flex items-center justify-center p-2 shrink-0 transition-colors shadow-2xs">
          <img
            src={skill.logo}
            alt={skill.name}
            className="h-7 w-7 object-contain select-none group-hover:scale-110 transition-transform duration-200"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-ink leading-tight truncate">
              {skill.name}
            </span>
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
          </div>
          {skill.focus && (
            <p className="text-xs text-mute font-medium truncate mt-0.5">
              {skill.focus}
            </p>
          )}
        </div>
      </div>

      <span className="font-mono text-[11px] font-semibold text-ink bg-surface border border-line-strong px-2.5 py-1 rounded-md shrink-0">
        {skill.experience}
      </span>
    </div>
  )
}

export function SkillsHome({ onDeep }: { onDeep: () => void }) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Section id="skills">
      <SectionHead
        id="skills"
        num="03 / Skills"
        title="Technical Stack & Competencies."
        intro="Core systems, languages, and distributed tooling used in production. Verified by experience and technical proficiency."
      />

      {/* Top Featured Skills Grid */}
      <div ref={ref} className="reveal border-2 border-ink bg-white p-6 md:p-8 rounded-xl shadow-xs">
        <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
          <div>
            <h3 className="font-display font-extrabold text-xl text-ink tracking-tight">
              Primary Daily Drivers
            </h3>
            <p className="text-xs text-mute mt-0.5">Core languages, distributed data stores, and framework engines.</p>
          </div>
          <span className="font-mono text-xs font-bold text-ink bg-surface border border-line-strong px-3 py-1 rounded-md">
            {topSkills.length} Featured
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {topSkills.map((skill) => (
            <SkillTile key={skill.name} skill={skill} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <SeeMore onClick={onDeep} label="Explore all 25+ skills, systems & credentials per category →" />
      </div>
    </Section>
  )
}

// =====================================================================
// 04 / ABOUT
// =====================================================================
export function About() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <Section id="about" className="bg-white border-y border-line">
      <div ref={ref} className="reveal grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-20 items-start">
        <div>
          <SectionHead id="about" num="04 / About" title="Engineer, first." />
          <p className="text-xl md:text-2xl leading-relaxed font-display font-medium text-ink">
            I like problems that live below the interface — schedulers, streaming pipelines,
            retrieval systems, and the underlying infrastructure that must be rock solid before anything else can succeed.
          </p>
          <p className="mt-6 text-ash leading-relaxed max-w-xl text-base">
            I'm a final-year B.Tech Computer Science student specializing in backend systems and applied AI/ML.
            I focus on resilient API contracts, distributed observability, idempotency, and writing documentation
            that empowers team speed.
          </p>
        </div>
        <dl className="space-y-4 md:pt-16 bg-surface border border-line p-6 md:p-8 rounded-xl">
          {[
            ["Education", "B.Tech Computer Science & Engineering (2022–2026)"],
            ["Focus", "Backend Systems · Distributed Architecture · Applied ML"],
            ["Currently", "Building Nexus & contributing upstream to open source"],
            ["Location", "India · Available for remote & on-site opportunities"],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
              <dt className="eyebrow mb-1 font-mono text-[10px]">{k}</dt>
              <dd className="text-ink font-semibold text-sm md:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

// =====================================================================
// 05 / ACHIEVEMENTS
// =====================================================================
export function Achievements() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <Section id="achievements">
      <SectionHead
        id="achievements"
        num="05 / Achievements"
        title="Selected wins."
        intro="Milestones where technical depth and execution speed were measured under pressure."
      />
      <div ref={ref} className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((a) => (
          <div
            key={a.label}
            className="border-2 border-line bg-surface p-7 md:p-8 rounded-xl hover:border-ink hover:bg-white transition-all shadow-xs group"
          >
            <span className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-ink block group-hover:scale-105 transition-transform origin-left">
              {a.metric}
            </span>
            <p className="font-display font-bold text-lg mt-3 text-ink">{a.label}</p>
            <p className="text-mute text-xs md:text-sm mt-2 leading-relaxed">{a.note}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// =====================================================================
// 06 / CO-CURRICULAR
// =====================================================================
export function CoCurricular() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <Section id="cocurricular" className="bg-white border-y border-line">
      <SectionHead
        id="cocurricular"
        num="06 / Co-curricular"
        title="Beyond the code."
        intro="Leadership, technical writing, and mentoring in developer communities."
      />
      <div ref={ref} className="reveal divide-y divide-line border-y border-line">
        {coCurricular.map((c) => (
          <div key={c.title} className="grid md:grid-cols-[180px_1fr_auto] gap-2 md:gap-8 py-6 items-baseline group">
            <span className="eyebrow font-mono text-xs">{c.period}</span>
            <div>
              <span className="font-display font-extrabold text-lg text-ink group-hover:translate-x-1 transition-transform inline-block">
                {c.title}
              </span>
            </div>
            <span className="text-mute text-sm md:text-right max-w-md">{c.note}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

// =====================================================================
// 07 / FOOTER (Minimal Modern)
// =====================================================================
export function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer id="contact" className="bg-ink text-white border-t border-line">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight">
                Soham Karandikar
              </span>
            </div>
            <p className="text-white/60 text-xs md:text-sm font-mono mt-1">
              Backend Systems & Applied AI Engineer
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            <a
              href={`mailto:${siteLinks.email}`}
              className="text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Email
            </a>
            <a
              href={siteLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline underline-offset-4 cursor-pointer"
            >
              GitHub ↗
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline underline-offset-4 cursor-pointer"
            >
              LinkedIn ↗
            </a>
            <a
              href={siteLinks.resume}
              onClick={(e) => {
                if (siteLinks.resume === "#") {
                  e.preventDefault()
                  onNav("top")
                }
              }}
              className="text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Résumé
            </a>
            <button
              onClick={() => onNav("top")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-white/40 text-xs font-mono gap-3">
          <span>© {new Date().getFullYear()} Soham Karandikar. All rights reserved.</span>
          <span>Engineered with React & Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
