import { useRef } from "react"

const BASE_IMAGE = "/images/persona-2.jpg"
const REVEAL_IMAGE = "/images/persona-1.jpg"

export function PersonaReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  const updateMask = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || !maskRef.current) return

    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100

    maskRef.current.style.setProperty("--x", `${x}%`)
    maskRef.current.style.setProperty("--y", `${y}%`)
    maskRef.current.style.opacity = "1"
  }

  const hideMask = () => {
    if (maskRef.current) maskRef.current.style.opacity = "0"
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateMask(e.clientX, e.clientY)
  }

  const handleMouseLeave = () => {
    hideMask()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (touch) updateMask(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (touch) updateMask(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    hideMask()
  }

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
        {/* Base photo (Spider-Man), always visible */}
        <img
          src={BASE_IMAGE}
          alt="Portrait"
          className="h-full w-full object-cover object-[center_15%] grayscale"
        />

        {/* Reveal photo (formal), masked to a circle that follows the cursor/touch */}
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