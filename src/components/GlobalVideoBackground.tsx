export function GlobalVideoBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        src="/hero-background.mp4"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
    </div>
  )
}