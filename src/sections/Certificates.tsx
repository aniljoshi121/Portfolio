type Certificate = {
  title: string
  issuer: string
  year: string
}

const CERTIFICATES: Certificate[] = [
  { title: "Introduction to Cloud", issuer: "AWS Academy", year: "2024" },
  { title: "Cloud Architecting", issuer: "AWS Academy", year: "2024" },
  { title: "Cloud Practitioner Essentials", issuer: "AWS", year: "2024" },
  { title: "Cloud Security Foundations", issuer: "AWS Academy", year: "2024" },
  { title: "Microsoft Azure Essentials", issuer: "Microsoft", year: "2024" },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte Australia / Forage", year: "2025" },
]

export function Certificates() {
  const items = [...CERTIFICATES, ...CERTIFICATES]

  return (
    <section className="py-32">
      <p className="text-center text-xs tracking-widest text-muted-foreground uppercase">Recognition</p>
      <h2 className="mt-3 text-center text-4xl font-semibold sm:text-5xl">Certifications</h2>

      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee flex w-max gap-6">
          {items.map((cert, i) => (
            <div key={i} className="w-72 shrink-0 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:border-accent/50">
              <p className="text-lg font-semibold">{cert.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="mt-4 text-xs text-accent">{cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}