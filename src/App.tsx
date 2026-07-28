import { useState } from "react"
import { useLenis } from "@/hooks/useLenis"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CustomCursor } from "@/components/CustomCursor"
import { MusicToggle } from "@/components/MusicToggle"
import { ScrollSpider } from "@/components/ScrollSpider"
import { GlobalVideoBackground } from "@/components/GlobalVideoBackground"
import { ScrollTextReveal } from "@/components/ScrollTextReveal"
import { Loader } from "@/components/Loader"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Projects } from "@/sections/Projects"
import { Timeline } from "@/sections/Timeline"
import { Certificates } from "@/sections/Certificates"
import { Contact } from "@/sections/Contact"

function App() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <main className="relative text-foreground min-h-screen">
        <GlobalVideoBackground />
        <CustomCursor />
        <Navbar />
        <MusicToggle />
        <ScrollSpider />
        <div id="home" className="relative z-10">
          <Hero />
        </div>
        <div className="relative z-10">
          <ScrollTextReveal />
          <About />
          <Projects />
          <Timeline />
          <Certificates />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App