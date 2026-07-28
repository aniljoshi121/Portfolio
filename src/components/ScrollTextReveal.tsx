import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
import { useRef } from "react"

type CharacterProps = {
  char: string
  index: number
  centerIndex: number
  scrollYProgress: MotionValue<number>
}

function Character({ char, index, centerIndex, scrollYProgress }: CharacterProps) {
  const isSpace = char === " "
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0.1, 0.75], [distanceFromCenter * 50, 0])
  const rotateX = useTransform(scrollYProgress, [0.1, 0.75], [distanceFromCenter * 50, 0])

  return (
    <motion.span
      className={`inline-block ${isSpace ? "w-4" : ""}`}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  )
}

type WordProps = {
  word: string
  index: number
  centerIndex: number
  scrollYProgress: MotionValue<number>
}

function Word({ word, index, centerIndex, scrollYProgress }: WordProps) {
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0.1, 0.75], [distanceFromCenter * 90, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.75], [-Math.abs(distanceFromCenter) * 20, 0])
  const scale = useTransform(scrollYProgress, [0.1, 0.75], [0.75, 1])

  return (
    <motion.span
      className="inline-block rounded-full border border-border px-5 py-2 text-base sm:text-lg"
      style={{ x, y, scale, transformOrigin: "center" }}
    >
      {word}
    </motion.span>
  )
}

export function ScrollTextReveal() {
  const headingRef = useRef<HTMLDivElement | null>(null)
  const skillsRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress: headingRaw } = useScroll({ target: headingRef })
  const { scrollYProgress: skillsRaw } = useScroll({ target: skillsRef })

  const headingProgress = useSpring(headingRaw, { stiffness: 80, damping: 20, mass: 0.5 })
  const skillsProgress = useSpring(skillsRaw, { stiffness: 80, damping: 20, mass: 0.5 })

  const text = "into the dev-verse"
  const characters = text.split("")
  const centerIndex = Math.floor(characters.length / 2)

  const skills = ["Python", "AWS", "Docker", "React", "TypeScript", "Streamlit"]
  const skillsCenterIndex = Math.floor(skills.length / 2)

  return (
    <>
      <div ref={headingRef} className="relative h-[130vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden p-[2vw]">
          <div
            className="w-full max-w-4xl text-center text-4xl font-bold uppercase tracking-tighter text-foreground sm:text-6xl"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <Character
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={headingProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={skillsRef} className="relative h-[130vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8 overflow-hidden p-[2vw]">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Built with the stack I actually use
          </p>
          <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-4">
            {skills.map((skill, index) => (
              <Word
                key={skill}
                word={skill}
                index={index}
                centerIndex={skillsCenterIndex}
                scrollYProgress={skillsProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}