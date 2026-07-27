import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const counter = { value: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          scale: 1.1,
          filter: "blur(20px)",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        })
      },
    })

    tl.to(counter, {
      value: 100,
      duration: 8, // temporarily slowed down for testing — change back to 2 once confirmed
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.floor(counter.value)),
    })
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
      <div className="text-2xl font-semibold tracking-tight">Anil Joshi</div>
      <div className="mt-6 text-sm text-muted-foreground">{progress}%</div>
      <div className="mt-4 h-px w-40 overflow-hidden bg-border">
        <div
          className="h-full bg-accent transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}