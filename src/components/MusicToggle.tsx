import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { gsap } from "gsap"

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay might still be blocked in some browsers; ignore silently
      })
    }
    setPlaying((p) => !p)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, ease: "power2.out" })
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" })
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="none" />
      <button
        onClick={toggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor={playing ? "Mute" : "Play"}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-md transition-colors hover:bg-secondary"
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  )
}