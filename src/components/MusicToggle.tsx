import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const bars = 5
  const getRandomHeights = () => Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2)
  const [heights, setHeights] = useState(getRandomHeights())

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
    }
  }, [])

  useEffect(() => {
    if (playing) {
      const intervalId = setInterval(() => {
        setHeights(getRandomHeights())
      }, 100)
      return () => clearInterval(intervalId)
    }
    setHeights(Array(bars).fill(0.15))
  }, [playing])

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

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="none" />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {!playing && (
          <span className="max-w-[10ch] text-center text-[10px] uppercase leading-tight tracking-widest text-muted-foreground">
            Click to play the music
          </span>
        )}
        <motion.button
          onClick={toggle}
          data-cursor={playing ? "Mute" : "Play"}
          aria-label={playing ? "Mute background music" : "Play background music"}
          initial={{ padding: "16px 16px" }}
          whileHover={{ padding: "20px 24px" }}
          whileTap={{ padding: "20px 24px" }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-accent bg-background/90 shadow-lg backdrop-blur-md"
        >
          <div className="flex h-6 items-center justify-center gap-1">
            {heights.map((height, index) => (
              <motion.div
                key={index}
                className="w-1 rounded-full bg-accent"
                initial={{ height: 3 }}
                animate={{ height: Math.max(6, height * 24) }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              />
            ))}
          </div>
        </motion.button>
      </div>
    </>
  )
}