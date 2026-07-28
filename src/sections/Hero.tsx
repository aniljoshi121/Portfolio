import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { PersonaReveal } from "@/components/PersonaReveal"

function NameCharacter({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: {
  char: string
  index: number
  centerIndex: number
  scrollYProgress: MotionValue<number>
}) {
  const isSpace = char === " "
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 40, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 30, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <motion.span
      className={`inline-block ${isSpace ? "w-4 sm:w-8" : ""}`}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const name = "Anil Joshi"
  const characters = name.split("")
  const centerIndex = Math.floor(characters.length / 2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
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

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 0.95,
      backgroundColor: "#dc2626",
      color: "#ffffff",
      duration: 0.15,
    })
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "transparent",
      color: "#ef4444",
      duration: 0.25,
      delay: 0.1,
    })
  }

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center sm:pt-32"
    >
      <PersonaReveal />

      <p
        className="relative z-10 mt-10 text-lg uppercase tracking-widest sm:text-2xl"
        style={{ fontFamily: "'Passion One', sans-serif", fontStyle: "italic", fontWeight: 700, color: "#facc15" }}
      >
        Software Engineer · Building Digital Experiences
      </p>

      <h1
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
          perspective: "600px",
        }}
      >
        {characters.map((char, index) => (
          <NameCharacter
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </h1>

      <p ref={subRef} className="relative z-10 mt-6 max-w-xl px-4 text-base text-muted-foreground sm:text-lg">
        Frontend Developer building clean, modern, and impactful digital experiences.
      </p>

      <button
        ref={ctaRef}
        data-cursor="View"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={scrollToProjects}
        className="relative z-10 mt-10 cursor-pointer border-2 border-red-500 px-8 py-3 uppercase italic tracking-wide text-red-500 transition-colors active:bg-red-500 active:text-white hover:bg-red-500 hover:text-white"
        style={{ fontFamily: "'Passion One', sans-serif", fontWeight: 700 }}
      >
        View My Work
      </button>
    </section>
  )
}