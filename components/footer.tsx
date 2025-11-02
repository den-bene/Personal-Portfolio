"use client"

import { useRef, useEffect, useState } from "react"

export default function Footer() {
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
    <footer
      id="contact"
      ref={ref}
      className="w-full bg-background px-4 py-20 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-7xl md:text-8xl font-bold text-accent/5 select-none whitespace-nowrap">CONTACT</div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <h2
          id="contact-heading"
          className={`text-4xl md:text-5xl font-bold text-foreground mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Let's Connect
        </h2>

        <div className="flex flex-col items-center gap-6">
          {/* Email */}
          <div
            className={`text-lg transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: inView ? "100ms" : "0ms" }}
          >
            <span className="text-muted-foreground">Mail: </span>
            <a
              href="mailto:den.bene05@gmail.com"
              className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background rounded px-1"
              aria-label="Email: den.bene05@gmail.com"
            >
              den.bene05@gmail.com
            </a>
          </div>

          {/* Instagram */}
          <div
            className={`text-lg transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: inView ? "150ms" : "0ms" }}
          >
            <span className="text-muted-foreground">Instagram: </span>
            <a
              href="https://instagram.com/daniel_benedettini"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background rounded px-1"
              aria-label="Instagram: @daniel_benedettini"
            >
              @daniel_benedettini
            </a>
          </div>

          {/* GitHub */}
          <div
            className={`text-lg transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: inView ? "200ms" : "0ms" }}
          >
            <span className="text-muted-foreground">Github: </span>
            <a
              href="https://github.com/den-bene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background rounded px-1"
              aria-label="GitHub: den-bene"
            >
              den-bene
            </a>
          </div>

          {/* Location */}
          <div
            className={`text-lg transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: inView ? "250ms" : "0ms" }}
          >
            <span className="text-muted-foreground">Location: </span>
            <span className="text-foreground">Milan, Italy</span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />

        <p
          className={`text-sm text-muted-foreground text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: inView ? "300ms" : "0ms" }}
        >
          © 2025 Daniel Benedettini. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
