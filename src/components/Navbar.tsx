import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Showcase", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      setHidden(currentY > lastScrollY.current && currentY > 150 && !mobileOpen)
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [mobileOpen])

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled || mobileOpen ? "border-b border-border bg-background/70 backdrop-blur-md" : "bg-transparent"} ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-sm font-semibold tracking-tight">Anil Joshi</a>

        <ul className="hidden gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} label={link.label} href={link.href} />
          ))}
        </ul>

        <button onClick={() => setMobileOpen((v) => !v)} className="text-foreground sm:hidden" aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 pb-6 pt-2 sm:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

function NavLink({ label, href }: { label: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    gsap.to(el, { x: x * 0.3, duration: 0.3, ease: "power2.out" })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" })
  }

  return (
    <li>
      <a ref={ref} href={href} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</a>
    </li>
  )
}