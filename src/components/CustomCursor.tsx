import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const pos = { x: 0, y: 0 }
    const mouse = { x: 0, y: 0 }
    const speed = 0.2

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", onMouseMove)

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * speed
      pos.y += (mouse.y - pos.y) * speed
      gsap.set(cursor, { x: pos.x, y: pos.y })
    })

    const onEnterHoverable = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const cursorLabel = el.dataset.cursor
      setLabel(cursorLabel ?? "")
      gsap.to(cursor, {
        scale: cursorLabel ? 4 : 2.2,
        duration: 0.3,
        ease: "power2.out",
      })
    }
    const onLeaveHoverable = () => {
      setLabel("")
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" })
    }

    const hoverables = document.querySelectorAll("a, button")
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHoverable)
      el.addEventListener("mouseleave", onLeaveHoverable)
    })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable)
        el.removeEventListener("mouseleave", onLeaveHoverable)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent mix-blend-difference sm:flex"
    >
      {label && (
        <span className="whitespace-nowrap text-[8px] font-medium text-background">
          {label}
        </span>
      )}
    </div>
  )
}