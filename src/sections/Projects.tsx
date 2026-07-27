import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type Project = {
  number: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

const PROJECTS: Project[] = [
  {
    number: "01",
    title: "Resume Analyzer",
    description: "Automated PDF/DOCX parsing with Python and regex-based patterns, using efficient data structures for tokenization and synonym normalization. Cut recruiter screening time by 60%, with structured Excel exports and a Streamlit interface for recruiters.",
    tech: ["Python", "Streamlit", "SQL", "Git"],
  },
  {
    number: "02",
    title: "AI-Powered Banking Support Chatbot",
    description: "A RAG-based banking support chatbot combining FastAPI, ChromaDB, and Groq's LLM API to deliver accurate, document-grounded answers. Deployed across Vercel and Railway.",
    tech: ["FastAPI", "ChromaDB", "Groq API", "Vercel"],
  },
  {
    number: "03",
    title: "Team Task Manager",
    description: "A team task management platform with role-based access control, JWT authentication, and Kanban-style tracking. Built with React and Node.js/Express, deployed on Vercel and Railway.",
    tech: ["React", "Node.js", "Express", "SQLite"],
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-panel")

      cards.forEach((card) => {
        const number = card.querySelector(".project-number")
        const content = card.querySelector(".project-content")

        gsap.fromTo(
          number,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 70%" } }
        )

        gsap.fromTo(
          content,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: card, start: "top 70%" } }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-6xl px-6 py-32">
      <p className="text-center text-xs tracking-widest text-muted-foreground uppercase">Showcase</p>
      <h2 className="mt-3 text-center text-4xl font-semibold sm:text-5xl">Portfolio Showcase</h2>

      <div className="mt-24 flex flex-col gap-32">
        {PROJECTS.map((project) => (
          <ProjectPanel key={project.number} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectPanel({ project }: { project: Project }) {
  return (
    <div className="project-panel relative flex min-h-[70vh] flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-16 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        style={{ background: "radial-gradient(circle at 20% 30%, var(--accent) 0%, transparent 60%)" }}
      />

      <span className="project-number text-6xl font-bold text-accent/20 sm:text-8xl lg:text-9xl">{project.number}</span>

      <div className="project-content mt-6 max-w-2xl">
        <h3 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{project.title}</h3>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" data-cursor="Code" className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:bg-secondary">
              <Code2 size={16} /> Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" data-cursor="Open" className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}