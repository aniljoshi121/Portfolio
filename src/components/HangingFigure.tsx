import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function HangingFigure() {
  const armRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

    tl.to(armRef.current, {
      rotation: -35,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "70px 30px",
    })
      .to(armRef.current, {
        rotation: -10,
        duration: 0.3,
        ease: "power1.inOut",
        transformOrigin: "70px 30px",
      })
      .to(armRef.current, {
        rotation: -35,
        duration: 0.3,
        ease: "power1.inOut",
        transformOrigin: "70px 30px",
      })
      .to(armRef.current, {
        rotation: -10,
        duration: 0.3,
        ease: "power1.inOut",
        transformOrigin: "70px 30px",
      })
      .to(armRef.current, {
        rotation: 0,
        duration: 0.4,
        ease: "power2.in",
        transformOrigin: "70px 30px",
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16 drop-shadow-[0_0_12px_rgba(239,68,68,0.35)]">
      {/* Hood/mask body */}
      <path
        d="M50 12
           C 68 12, 82 27, 82 48
           C 82 69, 68 82, 50 82
           C 32 82, 18 69, 18 48
           C 18 27, 32 12, 50 12 Z"
        fill="#0a0a0a"
        stroke="#ef4444"
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Left eye lens */}
      <ellipse cx="37" cy="45" rx="10" ry="13" fill="#f5f5f5" />
      <ellipse cx="37" cy="45" rx="10" ry="13" fill="none" stroke="#0a0a0a" strokeWidth="2" />

      {/* Right eye lens */}
      <ellipse cx="63" cy="45" rx="10" ry="13" fill="#f5f5f5" />
      <ellipse cx="63" cy="45" rx="10" ry="13" fill="none" stroke="#0a0a0a" strokeWidth="2" />

      {/* Subtle seam lines for texture */}
      <path d="M50 12 L50 82" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.2" />

      {/* Waving arm, pivoting from a shoulder point */}
      <g ref={armRef}>
        <path
          d="M70 30
             C 78 24, 86 18, 90 8
             C 92 5, 96 5, 97 9
             C 98 14, 93 22, 88 28
             C 84 33, 78 36, 72 36 Z"
          fill="#0a0a0a"
          stroke="#ef4444"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Little "hand" tip */}
        <circle cx="93" cy="10" r="6" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" />
      </g>
    </svg>
  )
}