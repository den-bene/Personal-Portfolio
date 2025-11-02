"use client"

import { useState } from "react"

interface Project {
  title: string
  url: string
  description: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const placeholderGradient = `linear-gradient(135deg, var(--color-accent) 0%, rgba(255, 165, 0, 0.6) 100%)`

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full flex flex-col rounded-2xl overflow-hidden bg-card border border-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      aria-label={`${project.title} project`}
    >
      {/* Cover Image Placeholder */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <div
          className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
          style={{ background: placeholderGradient }}
        >
          <div className="text-center text-white/80">
            <div className="text-4xl font-bold mb-2">{project.title.charAt(0)}</div>
            <div className="text-sm font-medium">{project.title}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Button */}
        <button
          className="w-full py-3 px-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95"
          onClick={(e) => {
            e.preventDefault()
            window.open(project.url, "_blank")
          }}
          aria-label={`View ${project.title}`}
        >
          View Project →
        </button>
      </div>
    </a>
  )
}
