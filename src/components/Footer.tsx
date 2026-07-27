export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Anil Joshi. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://linkedin.com/in/anil-joshi-b88bb733a/" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href="https://github.com/aniljoshi121" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
        </div>
      </div>
    </footer>
  )
}