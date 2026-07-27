import { useLenis } from "@/hooks/useLenis"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CustomCursor } from "@/components/CustomCursor"
import { MusicToggle } from "@/components/MusicToggle"
import { ScrollSpider } from "@/components/ScrollSpider"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Projects } from "@/sections/Projects"
import { Timeline } from "@/sections/Timeline"
import { Certificates } from "@/sections/Certificates"
import { Contact } from "@/sections/Contact"

function App() {
  useLenis()

  return (
    <main className="bg-background text-foreground min-h-screen">
      <CustomCursor />
      <Navbar />
      <MusicToggle />
      <ScrollSpider />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Projects />
      <Timeline />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  )
}

export default App