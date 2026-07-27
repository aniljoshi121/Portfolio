import { useRef, useEffect } from "react"

const BASE_IMAGE = "/images/persona-2.jpg"
const REVEAL_IMAGE = "/images/persona-1.jpg"

export function PersonaReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const target = useRef({ x: 50, y: 50 })
  const current = useRef({ x: 50, y: 50 })
  const rafId = useRef<number | null>(null)
  const active = useRef(false)

  useEffect(() => {
    const tick = () => {
      // Ease current position toward target — smaller factor = smoother/slower catch-up
      current.current.x += (target.current.x - current.current.x) * 0.18
      current.current.y += (target.current.y - current.current.y) * 0.18

      if (maskRef.current) {
        maskRef.current.style.setProperty("--x", `${current.current.x}%`)
        maskRef.current.style.setProperty("--y", `${current.current.y}%`)
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const setTarget = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    target.current.x = ((clientX - rect.left) / rect.width) * 100
    target.current.y = ((clientY - rect.top) / rect.height) * 100
  }

  const showMask = () => {
    active.current = true
    if (maskRef.current) maskRef.current.style.opacity = "1"
  }

  const hideMask = () => {
    active.current = false
    if (maskRef.current) maskRef.current.style.opacity = "0"
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setTarget(e.clientX, e.clientY)
    if (!active.current) showMask()
  }

  const handleMouseLeave = () => hideMask()

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (!touch) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      // Snap current position immediately on first touch so it doesn't glide in from center
      current.current.x = ((touch.clientX - rect.left) / rect.width) * 100
      current.current.y = ((touch.clientY - rect.top) / rect.height) * 100
    }
    setTarget(touch.clientX, touch.clientY)
    showMask()
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (touch) setTarget(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => hideMask()

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center sm:max-w-lg"
    >
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <img
          src={BASE_IMAGE}
          alt="Portrait"
          className="h-full w-full object-cover object-[center_15%] grayscale"
        />

        <div
          ref={maskRef}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), black 60%, transparent 100%)",
            maskImage:
              "radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), black 60%, transparent 100%)",
          }}
        >
          <img
            src={REVEAL_IMAGE}
            alt="Portrait alternate"
            className="h-full w-full scale-190 object-cover object-[center_25%] grayscale"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50" />
    </div>
  )
}