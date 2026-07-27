import { useEffect, useRef, lazy, Suspense } from "react"
import { gsap } from "gsap"
import { PersonaReveal } from "@/components/PersonaReveal"

const HeroCanvas = lazy(() => import("@/components/HeroCanvas"))

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!nameRef.current) return

      const text = nameRef.current.textContent ?? ""
      nameRef.current.innerHTML = text
        .split("")
        .map((char) =>
          char === " " ? " " : `<span class="inline-block opacity-0 translate-y-8">${char}</span>`
        )
        .join("")

      const chars = nameRef.current.querySelectorAll("span")
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(chars, { opacity: 1, y: 0, duration: 0.8, stagger: 0.03 })
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
    })

    return () => ctx.revert()
  }, [])

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canHover()) return
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canHover()) return
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" })
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(circle at 50% 40%, var(--accent) 0%, transparent 60%)" }}
      />

      <PersonaReveal />

      <p
        className="relative z-10 mt-10 text-lg uppercase tracking-widest sm:text-2xl"
        style={{ fontFamily: "'Passion One', sans-serif", fontStyle: "italic", fontWeight: 700, color: "#facc15" }}
      >
        Software Engineer · Building Digital Experiences
      </p>

      <h1
        ref={nameRef}
        className="relative z-10 mt-4 text-[clamp(2.5rem,14vw,10rem)] uppercase leading-none -skew-x-6"
        style={{
          fontFamily: "'Anton', sans-serif",
          color: "#f5f0e6",
          WebkitTextStroke: "2px #dc2626",
          textShadow: `
            3px 3px 0px #dc2626,
            -1px -1px 0 #dc2626,
            1px -1px 0 #dc2626,
            -1px 1px 0 #dc2626,
            1px 1px 0 #dc2626,
            6px 6px 12px rgba(0,0,0,0.5)
          `,
        }}
      >
        Anil Joshi
      </h1>

      <p ref={subRef} className="relative z-10 mt-6 max-w-xl px-4 text-base text-muted-foreground sm:text-lg">
        Frontend Developer building clean, modern, and impactful digital experiences.
      </p>

      <button
        ref={ctaRef}
        data-cursor="View"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 mt-10 cursor-pointer border-2 border-red-500 px-8 py-3 uppercase italic tracking-wide text-red-500 transition-colors hover:bg-red-500 hover:text-white"
        style={{ fontFamily: "'Passion One', sans-serif", fontWeight: 700 }}
      >
        View My Work
      </button>
    </section>
  )
}