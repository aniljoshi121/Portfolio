import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ScrollSpider() {
  const spiderRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const currentAngle = useRef(0)
  const threadLength = useRef(0)

  useEffect(() => {
    const updateThreadCurve = () => {
      if (!pathRef.current) return
      const bow = currentAngle.current * 1.4
      const height = threadLength.current || 1
      pathRef.current.setAttribute(
        "d",
        `M 14 0 Q ${14 + bow} ${height / 2} 14 ${height}`
      )
    }

    const swingTl = gsap.to(currentAngle, {
      current: 14,
      duration: 0.7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        if (spiderRef.current) {
          spiderRef.current.style.transform = `rotate(${currentAngle.current}deg)`
        }
        updateThreadCurve()
      },
    })

    const onScroll = () => {
      const scrollY = window.scrollY
      const maxThread = 220
      const length = Math.min(scrollY * 0.4, maxThread)
      threadLength.current = length

      if (svgRef.current) {
        svgRef.current.setAttribute("height", String(length))
      }
      updateThreadCurve()
    }

    window.addEventListener("scroll", onScroll)
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      swingTl.kill()
    }
  }, [])

  return (
    <div className="pointer-events-none fixed right-4 top-0 z-40 flex flex-col items-center sm:right-8">
      <svg ref={svgRef} width="28" height="0" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <linearGradient id="threadSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 14 0 Q 14 0 14 0"
          fill="none"
          stroke="url(#threadSheen)"
          strokeWidth="0.6"
        />
      </svg>
      <div
        ref={spiderRef}
        className="w-16 overflow-hidden rounded-md sm:w-28"
        style={{ mixBlendMode: "screen", transformOrigin: "top center" }}
      >
        <video
          src="/spider-noir.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}