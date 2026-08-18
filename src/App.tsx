import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Hero from "./Hero"
import Jigsaw from "./Jigsaw"
import {
  About,
  Achievements,
  CoCurricular,
  ExperienceHome,
  Footer,
  ProjectsHome,
  SkillsHome,
} from "./Sections"
import { ExperienceDeep, ProjectsDeep, SkillsDeep } from "./DeepPages"

type Route =
  | { name: "home" }
  | { name: "projects"; focus?: string }
  | { name: "experience" }
  | { name: "skills" }

export default function App() {
  const [route, setRoute] = useState<Route>({ name: "home" })

  // Global scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )

    const elements = document.querySelectorAll(".reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [route])

  const scrollTo = (id: string) => {
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" })
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Jigsaw / Navbar / Footer jump handler
  const goSection = (id: string) => {
    if (id === "projects") {
      setRoute({ name: "projects" })
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (id === "skills") {
      setRoute({ name: "skills" })
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (id === "experience") {
      setRoute({ name: "experience" })
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (route.name !== "home") {
      setRoute({ name: "home" })
      requestAnimationFrame(() => setTimeout(() => scrollTo(id), 100))
    } else {
      scrollTo(id)
    }
  }

  const back = () => {
    setRoute({ name: "home" })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (route.name === "projects")
    return (
      <div className="bg-white text-ink selection:bg-ink selection:text-white min-h-screen">
        <Navbar onNav={goSection} activeRoute={route.name} />
        <ProjectsDeep onBack={back} focus={route.focus} />
        <Footer onNav={goSection} />
      </div>
    )

  if (route.name === "experience")
    return (
      <div className="bg-white text-ink selection:bg-ink selection:text-white min-h-screen">
        <Navbar onNav={goSection} activeRoute={route.name} />
        <ExperienceDeep onBack={back} />
        <Footer onNav={goSection} />
      </div>
    )

  if (route.name === "skills")
    return (
      <div className="bg-white text-ink selection:bg-ink selection:text-white min-h-screen">
        <Navbar onNav={goSection} activeRoute={route.name} />
        <SkillsDeep onBack={back} />
        <Footer onNav={goSection} />
      </div>
    )

  return (
    <div className="bg-white text-ink selection:bg-ink selection:text-white min-h-screen flex flex-col">
      <Navbar onNav={goSection} activeRoute={route.name} />
      <main className="flex-1">
        <Hero onCta={() => scrollTo("jigsaw")} />
        <Jigsaw onSelect={scrollTo} />
        <ExperienceHome onDeep={() => setRoute({ name: "experience" })} />
        <ProjectsHome onDeep={(id) => setRoute({ name: "projects", focus: id })} />
        <SkillsHome onDeep={() => setRoute({ name: "skills" })} />
        <About />
        <Achievements />
        <CoCurricular />
      </main>
      <Footer onNav={goSection} />
    </div>
  )
}
