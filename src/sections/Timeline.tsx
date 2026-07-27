import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type TimelineItem = {
  year: string
  title: string
  description: string
}

const TIMELINE: TimelineItem[] = [
  {
    year: "Jun 2023 – Jul 2023",
    title: "Social Intern — R Foundation",
    description: "Collected and analyzed orphan demographic data for an NGO; findings directly informed resource allocation for medical care and education programs serving 50+ children.",
  },
  {
    year: "Jun 2025 – Jul 2025",
    title: "Research Intern — DEAL, DRDO",
    description: "Analyzed DMR Layer 2 protocols and burst structures per ETSI TS 102 361-1. Redesigned a CRC-8 encoder/decoder in Python, eliminating edge-case frame-length errors and improving data integrity verification accuracy.",
  },
  {
    year: "Aug 2025 – Sep 2025",
    title: "Software Development Intern — XcelGrad",
    description: "Developed a Learning Management System on Moodle, scaling to 200+ active users. Built an automated resume analyzer improving hiring efficiency by 40% and reducing screening time by 60%. Collaborated in Agile sprints using Git.",
  },
]

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item")
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 85%" } }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto max-w-3xl px-6 py-32">
      <p className="text-center text-xs tracking-widest text-muted-foreground uppercase">Journey</p>
      <h2 className="mt-3 text-center text-4xl font-semibold sm:text-5xl">Experience</h2>

      <div className="relative mt-20 border-l border-border pl-8">
        {TIMELINE.map((item) => (
          <div key={item.title} className="timeline-item relative mb-12 last:mb-0">
            <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="text-sm font-medium text-accent">{item.year}</p>
            <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}