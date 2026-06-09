import { useEffect, useRef, useState } from 'react'
import projectImg1 from '../img/p1.png'
import projectImg2 from '../img/c.png'
import projectImg3 from '../img/jeni.png'

const projects = [
  {
    id: 1,
    title: 'DeFi Lego Dashboard',
    shortDesc: 'A modular DeFi platform that chains swaps, staking & yield splitting into one-click workflows.',
    description: `DeFi LEGO Dashboard is an intelligent, modular platform designed to simplify decentralized finance by treating complex protocols like building blocks. It empowers users to automate sophisticated "Pathways" — chaining swaps, staking, and yield splitting into seamless, one-click workflows. Featuring a beginner-friendly interface, it transforms fragmented liquidity into a unified, high-yield financial engine.\n\nThe dashboard provides real-time analytics, drag-and-drop protocol chaining, portfolio overview, and smart notifications — all wrapped in a sleek dark UI built for both novice and power DeFi users.`,
    image: projectImg1,
    live: 'https://aos-hackthon.vercel.app/',
    tech: ['React JS', 'Tailwind CSS', 'JavaScript'],
    type: 'Web App',
  },
  {
    id: 2,
    title: 'Calvin Klein Perfume Project',
    shortDesc: 'A luxury UI/UX design for the Eternity fragrance collection with premium micro-interactions.',
    description: `Calvin Klein Perfume is a visually immersive UI/UX project inspired by the elegance of the Eternity fragrance collection. The design emphasizes luxury aesthetics, refined typography, and smooth micro-interactions to reflect the brand's premium identity.\n\nWith animated transitions and interactive "Explore" flows, it delivers a clean, modern, high-end digital shopping experience. The project features a custom product viewer, scent story storytelling section, and a seamless add-to-cart flow — all crafted in Figma with pixel-perfect attention to detail.`,
    image: projectImg2,
    live: 'https://www.figma.com/proto/vvHWvzYUsNTDIR6qfmVM7K/Calvin-Klein?node-id=25-705&starting-point-node-id=25%3A779',
    tech: ['Figma', 'Photopea'],
    type: 'UI/UX Design',
  },
  {
    id: 3,
    title: "Jeni's Splendid Ice Cream Project",
    shortDesc: "A playful, modern UI/UX concept capturing Jeni's joyful, artisanal ice cream brand essence.",
    description: `Jeni's Spindle Ice Cream is a playful and modern UI/UX concept that captures the brand's joyful, artisanal essence. The design combines soft colors, bold typography, and engaging product visuals to create an inviting browsing experience.\n\nWith intuitive navigation and smooth transitions, it transforms a traditional ice cream shop into a vibrant, user-focused digital experience. The project includes a flavor discovery section, a custom "build your scoop" interactive feature, and a loyalty rewards screen — all designed to make the user smile while they shop.`,
    image: projectImg3,
    live: 'https://www.figma.com/proto/83K8WX92BdFpDXHQrzBlDS/Jeni-s-Splendid-Ice-Creams?node-id=2054-2&starting-point-node-id=2054%3A2',
    tech: ['Figma', 'Photopea'],
    type: 'UI/UX Design',
  },
]

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="project-card border border-white/5 relative group overflow-hidden"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Glow behind card on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="grid md:grid-cols-5 gap-0">
        {/* Image — takes 2/5 on md */}
        <div className={`md:col-span-2 relative overflow-hidden ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
          <div className="h-52 md:h-full min-h-[220px] relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-bg-card/60 pointer-events-none" />
            {/* Type badge */}
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 backdrop-blur-sm">
                {project.type}
              </span>
            </div>
          </div>
        </div>

        {/* Content — takes 3/5 */}
        <div className={`md:col-span-3 p-6 md:p-8 flex flex-col justify-between ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
          <div>
            {/* Title + live link */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-white text-lg font-semibold leading-snug">{project.title}</h3>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent-blue text-xs font-medium shrink-0 hover:text-primary transition-colors group/link"
              >
                Live
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5 rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((t, i) => (
                <span key={t} className="text-xs text-white/50 font-light">
                  {t}{i < project.tech.length - 1 && <span className="text-white/20 ml-2 font-black">·</span>}
                </span>
              ))}
            </div>

            {/* Short description always visible */}
            <p className="text-white/60 text-sm leading-relaxed">{project.shortDesc}</p>
          </div>

          {/* View More button */}
          <div className="mt-5">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-all duration-300 border border-primary/20 hover:border-primary/50 group/btn"
            >
              {expanded ? 'Show Less' : 'View More'}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : 'group-hover/btn:translate-y-0.5'}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable description — slides down */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/5 mx-6 md:mx-8" />
        <div className="px-6 md:px-8 py-6">
          <p className="text-sm font-semibold mb-3">
            <span className="text-primary">Project</span> Description
          </p>
          <div className="text-white/65 text-sm leading-relaxed space-y-3">
            {project.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white hover:text-bg-dark text-sm font-semibold rounded-xl px-5 py-2.5 transition-all duration-300"
            >
              Open Live Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 rotate-45">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <button
              onClick={() => setExpanded(false)}
              className="text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 200)
            })
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-bg-dark relative overflow-hidden">
      <div className="absolute top-24 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-0 w-64 h-64 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-jersey text-5xl md:text-6xl text-white">
            <span className="text-primary">My</span> Projects
          </h2>
          <div className="w-14 h-1 bg-primary mx-auto mt-3 rounded-full" />
          <p className="text-white/40 text-sm mt-3">Click "View More" on any project to see details</p>
        </div>

        <div className="space-y-6">
          {projects.map((project, idx) => (
            <div key={project.id} className="animate-on-scroll">
              <ProjectCard project={project} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
