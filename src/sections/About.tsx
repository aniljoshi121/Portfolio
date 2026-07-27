import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type SkillGroup = {
  category: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  { category: "Languages", skills: ["Python", "SQL"] },
  { category: "Web & Frameworks", skills: ["HTML", "CSS", "JavaScript", "Streamlit", "React", "Node.js"] },
  { category: "Cloud & Platforms", skills: ["AWS (EC2, S3, IAM, CloudWatch)", "Docker", "Moodle"] },
  { category: "Tools & DevOps", skills: ["Git", "GitHub"] },
  { category: "Backend", skills: ["FastAPI", "Express", "ChromaDB", "SQLite"] },
  { category: "Soft Skills", skills: ["Leadership", "Communication", "Adaptability", "Problem Solving"] },
]

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )

      const cards = gsap.utils.toArray<HTMLElement>(".skill-card")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -8
    const rotateY = ((x - rect.width / 2) / rect.width) * 8
    gsap.to(card, { rotateX, rotateY, duration: 0.3, ease: "power2.out", transformPerspective: 600 })
  }

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" })
  }

  return (
    <section id="about" ref={sectionRef} className="mx-auto max-w-5xl px-6 py-32 text-center">
      <h2 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">About</h2>

      <p ref={textRef} className="mt-6 text-2xl leading-relaxed text-foreground sm:text-3xl">
        Hi, I'm Anil Joshi, a final-year B.Tech CSE student at UPES, specializing in Cloud Computing & Virtualization. 
        I enjoy building things that actually solve problems—whether it's a Moodle-based LMS used by 200+ learners
         or a resume analyzer that saves recruiters from reading resumes line by line (you're welcome, recruiters 😄). 
         I've worked with Python, AWS, Streamlit, and Docker, explored DMR Layer 2 protocols during my research internship at DRDO-DEAL, 
         and even spent time using technology for social impact through an NGO. I'm someone who loves learning, 
         breaking things, fixing them, and turning ideas into useful applications—preferably before the coffee gets cold.
      </p>

      <div className="mt-20">
        <p className="mb-10 text-xs tracking-widest text-muted-foreground uppercase">Skills & Tools</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltLeave}
              className="skill-card rounded-2xl border border-border bg-card/60 p-6 text-left backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-accent/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="text-sm font-semibold text-accent">{group.category}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}