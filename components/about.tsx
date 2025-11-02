"use client"

import { useRef, useEffect, useState } from "react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-20 px-4 bg-gradient-to-br from-background via-background to-accent/5"
      aria-labelledby="about-heading"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-8 text-foreground transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          id="about-heading"
        >
          About Me
        </h2>

        <div
          className={`space-y-6 p-8 rounded-2xl bg-card border border-border shadow-sm transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: inView ? "100ms" : "0ms" }}
        >
          <p className="text-lg leading-relaxed text-foreground">
            I'm an AI student at the University of Milan, University of Bicocca and University of Pavia.
            Currently working on programming projects and AI-related projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: inView ? "150ms" : "0ms" }}
            >
              <h3 className="font-semibold text-accent mb-3">Stack</h3>
              <p className="text-sm text-muted-foreground">
                Next.js, TypeScript, React, Tailwind CSS, Node.js, Python, SQL
              </p>
            </div>

            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: inView ? "200ms" : "0ms" }}
            >
              <h3 className="font-semibold text-accent mb-3">Interests</h3>
              <p className="text-sm text-muted-foreground">
                Web development, AI/ML, performance optimization, accessible design
              </p>
            </div>

            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: inView ? "250ms" : "0ms" }}
            >
              <h3 className="font-semibold text-accent mb-3">Goal</h3>
              <p className="text-sm text-muted-foreground">
                Build impactful products that solve real problems and delight users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
