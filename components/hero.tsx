"use client"

import { useRef, useEffect, useState } from "react"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center px-4 py-20"
      aria-label="Hero section"
    >
      <div className={`mb-8 transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center font-bold text-5xl text-white shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #FF8A00 0%, #FFA726 100%)",
            boxShadow: "0 20px 40px rgba(255, 138, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <span>DB</span>
        </div>
      </div>

      {/* Main Heading */}
      <div
        className={`text-center space-y-4 max-w-2xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        <p
          className="text-lg text-muted-foreground font-medium transition-all duration-600"
          style={{ transitionDelay: "200ms" }}
        >
          Hi, I'm
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold text-pretty text-foreground transition-all duration-600"
          style={{ transitionDelay: "300ms" }}
        >
          Daniel Benedettini
        </h1>

        <p
          className="text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-600"
          style={{ transitionDelay: "400ms" }}
        >
          Full-stack developer passionate about building beautiful, performant web experiences
        </p>
      </div>

      {/* CTAs */}
      <div
        className={`flex flex-col sm:flex-row gap-4 mt-12 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <button
          onClick={() => handleScroll("projects")}
          className="px-8 py-3 rounded-full bg-accent text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
          aria-label="See my work - scroll to projects"
        >
          See my work
        </button>

        <button
          onClick={() => handleScroll("contact")}
          className="px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Contact me - scroll to footer"
        >
          Contact me
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        aria-label="Scroll to continue"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
