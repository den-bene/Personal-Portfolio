"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import ProjectCard from "./project-card"

const projects = [
  {
    title: "Cardojo",
    url: "https://cardojo-i90vb0evg-danielbenedettini-9504s-projects.vercel.app/",
    description: "Flashcard learning app with spaced repetition algorithm",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Job Scraper",
    url: "https://findyourjob-a7pw.onrender.com",
    description: "Job search aggregator with advanced filtering",
    tags: ["Python", "JavaScript", "HTML/CSS"],
  },
  {
    title: "MP3 Player",
    url: "https://den-bene.github.io/MP3-player/",
    description: "Feature-rich audio player with playlist management",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "To-Do List",
    url: "https://den-bene.github.io/ToDo-list/",
    description: "Productivity app with task organization",
    tags: ["HTML", "CSS", "JavaScript"],
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 0.8
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (!containerRef.current) return
    snapToCard()
  }

  const snapToCard = () => {
    if (!containerRef.current) return
    const cardWidth = 400
    const gap = 16
    const itemWidth = cardWidth + gap
    const scrollLeft = containerRef.current.scrollLeft
    const nearestCard = Math.round(scrollLeft / itemWidth) * itemWidth
    containerRef.current.scrollTo({ left: nearestCard, behavior: "smooth" })
  }

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const cardWidth = 400
    const gap = 16
    const itemWidth = cardWidth + gap
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return
    e.preventDefault()
    containerRef.current.scrollLeft += e.deltaY * 0.5
  }

  return (
    <section id="projects" ref={ref} className="w-full py-20 px-4 bg-background" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2
            id="projects-heading"
            className={`text-4xl md:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Projects
          </h2>
          <p
            className={`text-lg text-muted-foreground transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: inView ? "100ms" : "0ms" }}
          >
            A selection of my work showcasing expertise in web development
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4">
          {/* Projects Carousel - improved scroll behavior with better drag and wheel handling */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            className="flex gap-4 overflow-x-auto scroll-smooth px-4 cursor-grab active:cursor-grabbing"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "auto",
            }}
            aria-label="Projects carousel"
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`flex-shrink-0 w-full sm:w-96 transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{
                  transitionDelay: inView ? `${index * 100}ms` : "0ms",
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2">
            <button
              onClick={() => scroll("left")}
              className="pointer-events-auto p-3 rounded-full bg-accent text-white hover:bg-accent/90 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className="pointer-events-auto p-3 rounded-full bg-accent text-white hover:bg-accent/90 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50"
              aria-label="Next project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
