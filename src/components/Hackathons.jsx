import { useEffect, useRef, useState } from 'react'

const milestones = [
  {
    id: 1,
    year: '2025',
    name: 'AOS Hackathon',
    role: 'Team Leader',
    achievement: 'Top 25 Teams',
    project: 'DeFi Dashboard',
    description: 'Led research, ideation, and full-stack development. Built a modular DeFi Dashboard that chains swaps, staking, and yield splitting — reaching the Top 25 out of all competing teams.',
    tags: ['Leadership', 'Full-Stack', 'DeFi', 'React'],
    accent: '#00FFE5',
    accentDim: 'rgba(0,255,229,0.08)',
    icon: '⚡',
  },
  {
    id: 2,
    year: '2026',
    name: 'Tata Technologies InnoVent',
    role: 'Team Leader',
    achievement: null,
    project: 'AI/ML Vehicle Health Diagnostic System',
    description: 'Led the architecture and development of an AI-driven vehicle health diagnostic platform. Coordinated ML model discussions, solution planning, and end-to-end technical implementation.',
    tags: ['AI/ML', 'Architecture', 'Leadership', 'Python'],
    accent: '#007EAB',
    accentDim: 'rgba(0,126,171,0.08)',
    icon: '🤖',
  },
  {
    id: 3,
    year: '2026',
    name: 'Cognizant Technoverse',
    role: 'Team Leader',
    achievement: 'Agent Builder Challenge',
    project: 'Digital Twin Dashboard',
    description: 'Developed a Digital Twin Dashboard with real-time visualization and simulation capabilities. The team advanced to the prestigious Agent Builder Challenge round.',
    tags: ['Digital Twin', 'Visualization', 'Agent AI', 'Leadership'],
    accent: '#00A2DC',
    accentDim: 'rgba(0,162,220,0.08)',
    icon: '🌐',
  },
]

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function MilestoneCard({ milestone, index, lineProgress }) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const cardRef = useRef(null)
  const [cardRef2, cardVisible] = useScrollReveal(0.1)

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const isLeft = index % 2 === 0

  return (
    <div
      ref={cardRef2}
      className="relative flex items-center w-full"
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible
          ? 'translateY(0)'
          : `translateY(${isLeft ? 40 : 40}px)`,
        transition: `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`,
      }}
    >
      {/* Desktop layout: alternating left/right */}
      <div className="hidden md:grid grid-cols-[1fr_60px_1fr] w-full items-center gap-0">

        {/* Left slot */}
        <div className={`pr-8 ${isLeft ? '' : 'invisible'}`}>
          {isLeft && (
            <CardContent
              milestone={milestone}
              hovered={hovered}
              mouse={mouse}
              cardRef={cardRef}
              setHovered={setHovered}
              handleMouseMove={handleMouseMove}
              align="right"
            />
          )}
        </div>

        {/* Center node */}
        <div className="flex flex-col items-center relative z-10">
          <div
            className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 cursor-default"
            style={{
              borderColor: hovered ? milestone.accent : `${milestone.accent}60`,
              backgroundColor: hovered ? `${milestone.accent}20` : 'rgba(21,24,37,0.95)',
              boxShadow: hovered
                ? `0 0 0 6px ${milestone.accent}18, 0 0 30px ${milestone.accent}50`
                : `0 0 0 3px ${milestone.accent}10`,
              transform: hovered ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            <span className="text-xl leading-none">{milestone.icon}</span>
            {/* Ping animation */}
            {hovered && (
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ backgroundColor: milestone.accent }}
              />
            )}
          </div>
          {/* Year label */}
          <div
            className="mt-2 text-xs font-bold tracking-widest transition-all duration-300"
            style={{ color: hovered ? milestone.accent : `${milestone.accent}80` }}
          >
            {milestone.year}
          </div>
        </div>

        {/* Right slot */}
        <div className={`pl-8 ${!isLeft ? '' : 'invisible'}`}>
          {!isLeft && (
            <CardContent
              milestone={milestone}
              hovered={hovered}
              mouse={mouse}
              cardRef={cardRef}
              setHovered={setHovered}
              handleMouseMove={handleMouseMove}
              align="left"
            />
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden w-full pl-10">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <div
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500"
            style={{
              borderColor: milestone.accent,
              backgroundColor: `${milestone.accent}15`,
              boxShadow: `0 0 16px ${milestone.accent}40`,
            }}
          >
            <span className="text-sm">{milestone.icon}</span>
          </div>
        </div>
        <CardContent
          milestone={milestone}
          hovered={hovered}
          mouse={mouse}
          cardRef={cardRef}
          setHovered={setHovered}
          handleMouseMove={handleMouseMove}
          align="left"
        />
      </div>
    </div>
  )
}

function CardContent({ milestone, hovered, mouse, cardRef, setHovered, handleMouseMove, align }) {
  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-default"
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(28,32,53,0.98), rgba(22,26,44,0.95))`
          : 'rgba(24,28,45,0.85)',
        borderColor: hovered ? `${milestone.accent}40` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${milestone.accent}18`
          : '0 4px 24px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Spotlight effect following mouse */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px at ${mouse.x * 100}% ${mouse.y * 100}%, ${milestone.accent}10, transparent 70%)`,
          }}
        />
      )}

      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${milestone.accent}, transparent)`,
          opacity: hovered ? 0.8 : 0.2,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            {/* Year pill */}
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 transition-all duration-300"
              style={{
                color: milestone.accent,
                backgroundColor: `${milestone.accent}15`,
                border: `1px solid ${milestone.accent}30`,
              }}
            >
              {milestone.year}
            </span>
            <h3 className="text-white font-bold text-base leading-tight">{milestone.name}</h3>
          </div>

          {/* Achievement badge */}
          {milestone.achievement && (
            <div
              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-400"
              style={{
                color: milestone.accent,
                borderColor: `${milestone.accent}50`,
                backgroundColor: `${milestone.accent}10`,
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hovered ? `0 0 16px ${milestone.accent}30` : 'none',
              }}
            >
              {milestone.achievement}
            </div>
          )}
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: milestone.accent }} />
          <span className="text-xs text-white/60 font-semibold uppercase tracking-widest">{milestone.role}</span>
        </div>

        {/* Project */}
        <div className="mb-3 p-3 rounded-xl border" style={{ borderColor: `${milestone.accent}18`, backgroundColor: `${milestone.accent}06` }}>
          <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Project</p>
          <p className="text-white text-sm font-semibold leading-snug">{milestone.project}</p>
        </div>

        {/* Description */}
        <p className="text-white/55 text-xs leading-relaxed mb-4">{milestone.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {milestone.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg border transition-all duration-300"
              style={{
                borderColor: hovered ? `${milestone.accent}35` : `${milestone.accent}18`,
                backgroundColor: hovered ? `${milestone.accent}12` : `${milestone.accent}06`,
                color: hovered ? `${milestone.accent}` : `${milestone.accent}90`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnimatedLine({ milestones }) {
  const lineRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return
      const rect = lineRef.current.getBoundingClientRect()
      const windowH = window.innerHeight
      const total = rect.height
      const scrolled = Math.max(0, windowH - rect.top)
      const pct = Math.min(1, scrolled / (total + windowH * 0.3))
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={lineRef} className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none">
      {/* Base line (faint) */}
      <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.04)' }} />
      {/* Animated fill */}
      <div
        className="absolute top-0 left-0 w-full transition-all duration-100"
        style={{
          height: `${progress * 100}%`,
          background: 'linear-gradient(to bottom, #00FFE5, #007EAB, #00A2DC)',
          boxShadow: '0 0 8px rgba(0,255,229,0.4), 0 0 20px rgba(0,255,229,0.15)',
        }}
      />
      {/* Moving glow tip */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-100"
        style={{
          top: `calc(${progress * 100}% - 6px)`,
          backgroundColor: '#00FFE5',
          boxShadow: '0 0 12px rgba(0,255,229,0.8), 0 0 30px rgba(0,255,229,0.4)',
          opacity: progress > 0.02 && progress < 0.98 ? 1 : 0,
        }}
      />
    </div>
  )
}

export default function Hackathons() {
  const [headerRef, headerVisible] = useScrollReveal(0.2)

  return (
    <section id="hackathons" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0f1220' }}>
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,255,229,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,126,171,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0,162,220,0.04) 0%, transparent 70%)' }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hackGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00FFE5" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hackGrid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20 md:mb-28"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-primary/60 text-xs font-light tracking-[0.5em] uppercase mb-4">
            Leadership · Innovation · Problem Solving
          </p>
          <h2 className="font-jersey text-5xl md:text-7xl text-white mb-4">
            Hackathon <span className="text-primary">Journey</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <AnimatedLine milestones={milestones} />

          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(0,255,229,0.3), rgba(0,126,171,0.3), rgba(0,162,220,0.3))' }}
          />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, i) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={i} />
            ))}
          </div>
        </div>

        {/* Footer accent */}
        <div className="mt-20 md:mt-28 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {milestones.map((m) => (
              <div key={m.id} className="w-2 h-2 rounded-full" style={{ backgroundColor: m.accent, opacity: 0.6 }} />
            ))}
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">More to come</p>
        </div>
      </div>
    </section>
  )
}
