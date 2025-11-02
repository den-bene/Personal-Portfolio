import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <About />
      <Projects />
      <Footer />
    </main>
  )
}
