import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "./lib"

interface PieceData {
  id: string
  label: string
  subtitle: string
  path: string
  centerX: number
  centerY: number
  fontSize: number
  order: number
}

const W = 1200
const H = 600

// 6 Interlocking jigsaw puzzle pieces with clean geometric tabs & slots
const pieces: PieceData[] = [
  {
    id: "projects",
    label: "PROJECTS",
    subtitle: "Interactive Safari Demos & Architectures",
    order: 0,
    centerX: 370,
    centerY: 160,
    fontSize: 34,
    // Top-left large piece (x: 10 to 740, y: 10 to 300)
    // - Right edge has tab at y=100 into Skills, slot at y=230 from About
    // - Bottom edge has slot at x=230 from Experience, tab at x=600 into Achievements
    path: `M 10 10 
      L 740 10 
      L 740 70 C 740 70 780 75 780 105 C 780 135 740 140 740 140 
      L 740 200 C 740 200 700 205 700 235 C 700 265 740 270 740 270 
      L 740 300 
      L 635 300 C 635 300 630 335 600 335 C 570 335 565 300 565 300 
      L 460 300 
      L 265 300 C 265 300 260 265 230 265 C 200 265 195 300 195 300 
      L 10 300 
      Z`,
  },
  {
    id: "skills",
    label: "SKILLS",
    subtitle: "Tiered Hexagonal Matrix",
    order: 1,
    centerX: 970,
    centerY: 80,
    fontSize: 26,
    // Top-right top piece (x: 740 to 1190, y: 10 to 155)
    // - Left edge receives tab from Projects at y=105
    // - Bottom edge has tab down into About at x=965
    path: `M 740 10 
      L 1190 10 
      L 1190 155 
      L 1000 155 C 1000 155 995 190 965 190 C 935 190 930 155 930 155 
      L 740 155 
      L 740 140 C 740 140 780 135 780 105 C 780 75 740 70 740 70 
      Z`,
  },
  {
    id: "about",
    label: "ABOUT",
    subtitle: "Background & Core Principles",
    order: 3,
    centerX: 970,
    centerY: 230,
    fontSize: 26,
    // Top-right bottom piece (x: 740 to 1190, y: 155 to 300)
    // - Top edge receives tab from Skills at x=965
    // - Left edge has tab left into Projects at y=235
    // - Bottom edge has slot receiving tab from Co-curricular at x=1010
    path: `M 740 155 
      L 930 155 C 930 155 935 190 965 190 C 995 190 1000 155 1000 155 
      L 1190 155 
      L 1190 300 
      L 1045 300 C 1045 300 1040 265 1010 265 C 980 265 975 300 975 300 
      L 740 300 
      L 740 270 C 740 270 700 265 700 235 C 700 205 740 200 740 200 
      Z`,
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    subtitle: "Platform Engineering & Open Source",
    order: 2,
    centerX: 235,
    centerY: 450,
    fontSize: 30,
    // Bottom-left large piece (x: 10 to 460, y: 300 to 590)
    // - Top edge has tab up into Projects at x=230
    // - Right edge has tab right into Achievements at y=450
    path: `M 10 300 
      L 195 300 C 195 300 200 265 230 265 C 260 265 265 300 265 300 
      L 460 300 
      L 460 420 C 460 420 495 425 495 450 C 495 475 460 480 460 480 
      L 460 590 
      L 10 590 
      Z`,
  },
  {
    id: "achievements",
    label: "ACHIEVEMENTS",
    subtitle: "ICPC, Hackathons & Metrics",
    order: 4,
    centerX: 645,
    centerY: 450,
    fontSize: 24,
    // Bottom-middle piece (x: 460 to 830, y: 300 to 590)
    // - Top edge receives tab from Projects at x=600
    // - Left edge receives tab from Experience at y=450
    // - Right edge receives tab from Co-curricular at y=450
    path: `M 460 300 
      L 565 300 C 565 300 570 335 600 335 C 630 335 635 300 635 300 
      L 830 300 
      L 830 420 C 830 420 795 425 795 450 C 795 475 830 480 830 480 
      L 830 590 
      L 460 590 
      L 460 480 C 460 480 495 475 495 450 C 495 425 460 420 460 420 
      Z`,
  },
  {
    id: "cocurricular",
    label: "CO-CURRICULAR",
    subtitle: "Leadership, Community & Writing",
    order: 5,
    centerX: 1010,
    centerY: 450,
    fontSize: 22,
    // Bottom-right piece (x: 830 to 1190, y: 300 to 590)
    // - Top edge has tab up into About at x=1010
    // - Left edge has tab left into Achievements at y=450
    path: `M 830 300 
      L 975 300 C 975 300 980 265 1010 265 C 1040 265 1045 300 1045 300 
      L 1190 300 
      L 1190 590 
      L 830 590 
      L 830 480 C 830 480 795 475 795 450 C 795 425 830 420 830 420 
      Z`,
  },
]

export default function Jigsaw({ onSelect }: { onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [assembled, setAssembled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll assembly animation: pieces fall into place when entering viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAssembled(true)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePieceClick = (id: string) => {
    setActive(id)
    onSelect(id)
    setTimeout(() => setActive(null), 200)
  }

  const mobilePieces = [
    { id: "projects", num: "01", title: "Projects", desc: "Interactive Safari Laptop Carousel & Live Demos" },
    { id: "experience", num: "02", title: "Experience", desc: "Backend Engineering, Observability & Open Source" },
    { id: "skills", num: "03", title: "Skills", desc: "Tiered Matrix with Skill Badges" },
    { id: "about", num: "04", title: "About", desc: "Background, Focus Areas & Engineering Principles" },
    { id: "achievements", num: "05", title: "Achievements", desc: "Competitive Programming & Hackathon Wins" },
    { id: "cocurricular", num: "06", title: "Co-curricular", desc: "Open Source Leadership & Technical Writing" },
  ]

  // Fall offset calculations for initial unassembled state
  const getFallTransform = (order: number, isHovered: boolean, isActive: boolean) => {
    if (isActive) return "scale(1.02)"
    if (isHovered) return "scale(1.01)"
    if (!assembled) {
      const offsets = [
        "translate(0px, -45px) rotate(-1.5deg)",
        "translate(25px, -35px) rotate(2deg)",
        "translate(-25px, 40px) rotate(-2deg)",
        "translate(30px, 30px) rotate(1.5deg)",
        "translate(0px, 45px) rotate(-1deg)",
        "translate(25px, 45px) rotate(2deg)",
      ]
      return offsets[order % offsets.length]
    }
    return "translate(0px, 0px) rotate(0deg) scale(1)"
  }

  return (
    <section id="jigsaw" className="px-5 md:px-10 py-20 md:py-28 bg-white border-t border-line">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-ink text-white px-3 py-1 text-xs font-mono tracking-widest uppercase mb-3">
              <span>●</span>
              <span>INDEX · 6 PIECES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-ink">
              Pick a piece,
              <br />
              explore the architecture.
            </h2>
          </div>
          <p className="text-mute max-w-sm text-sm md:text-right leading-relaxed">
            Click any interlocking component to jump straight to its section, or scroll continuously.
          </p>
        </div>

        {/* Desktop Interactive SVG Puzzle Board */}
        <div ref={containerRef} className="hidden sm:block relative w-full bg-white rounded-xl border border-line p-2 md:p-4 shadow-sm overflow-hidden">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto drop-shadow-xs select-none"
            style={{ overflow: "visible" }}
          >
            <defs>
              <filter id="puzzleShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
              </filter>
            </defs>

            {pieces.map((p) => {
              const isHovered = hovered === p.id
              const isActive = active === p.id
              return (
                <g
                  key={p.id}
                  onClick={() => handlePieceClick(p.id)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    transformOrigin: `${p.centerX}px ${p.centerY}px`,
                    transform: getFallTransform(p.order, isHovered, isActive),
                    opacity: assembled ? 1 : 0.4,
                    transitionDelay: assembled ? `${p.order * 65}ms` : "0ms",
                    filter: isHovered || isActive ? "url(#puzzleShadow)" : "none",
                  }}
                >
                  {/* Puzzle piece polygon path */}
                  <path
                    d={p.path}
                    fill={isHovered || isActive ? "#000000" : "#ffffff"}
                    stroke="#000000"
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    className="transition-colors duration-200"
                  />

                  {/* Piece Title */}
                  <text
                    x={p.centerX}
                    y={p.centerY - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHovered || isActive ? "#ffffff" : "#000000"}
                    className="font-display font-extrabold tracking-tight transition-colors duration-200"
                    style={{ fontSize: p.fontSize }}
                  >
                    {p.label}
                  </text>

                  {/* Piece Subtitle */}
                  <text
                    x={p.centerX}
                    y={p.centerY + 18}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHovered || isActive ? "#cccccc" : "#666666"}
                    className="font-mono transition-colors duration-200"
                    style={{ fontSize: 11, letterSpacing: "0.05em" }}
                  >
                    {p.subtitle}
                  </text>

                  {/* Arrow Indicator on Hover */}
                  {isHovered && (
                    <text
                      x={p.centerX + (p.label.length * (p.fontSize * 0.32)) + 12}
                      y={p.centerY - 9}
                      textAnchor="start"
                      dominantBaseline="middle"
                      fill="#ffffff"
                      fontSize={p.fontSize * 0.75}
                      className="animate-pulse font-bold"
                    >
                      →
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Mobile View: 6 Puzzle Cards */}
        <div className="sm:hidden grid gap-3">
          {mobilePieces.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="group flex items-center justify-between border-2 border-ink bg-white p-5 text-left transition-all duration-200 hover:bg-ink hover:text-white active:scale-98 rounded-lg shadow-xs"
            >
              <div>
                <span className="font-mono text-xs text-mute group-hover:text-white/60 font-semibold">{p.num}</span>
                <h3 className="font-display font-extrabold text-2xl mt-0.5 text-ink group-hover:text-white">{p.title}</h3>
                <p className="text-xs text-mute group-hover:text-white/75 mt-1">{p.desc}</p>
              </div>
              <div className="h-9 w-9 rounded-full border border-line-strong group-hover:border-white/50 flex items-center justify-center group-hover:bg-white/10 shrink-0 ml-3">
                <ArrowRight className="w-4 h-4 text-ink group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
