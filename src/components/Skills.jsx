import { useEffect, useRef, useState } from 'react'

const categories = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: '{ }',
    accent: '#22D3EE',
    skills: ['Java', 'Python', 'JavaScript'],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: '</> ',
    accent: '#3B82F6',
    skills: ['HTML', 'CSS', 'ReactJS', 'Tailwind CSS'],
  },
  {
    id: 'ai',
    label: 'AI / Machine Learning',
    icon: '⬡',
    accent: '#A855F7',
    skills: ['NumPy', 'Pandas', 'Scikit-Learn', 'Data Preprocessing', 'Data Visualization'],
  },
  {
    id: 'db',
    label: 'Databases',
    icon: '⊛',
    accent: '#34D399',
    skills: ['MongoDB', 'PostgreSQL'],
  },
  {
    id: 'uiux',
    label: 'UI / UX',
    icon: '◈',
    accent: '#F472B6',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'UI Principles', 'Design Systems', 'Responsive Design'],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: '⊞',
    accent: '#FB923C',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Antigravity'],
  },
]

const softSkillsAccent = '#EAB308'

const softSkills = [
  { name: 'Problem Solving', icon: '🧩' },
  { name: 'Team Leadership', icon: '🎯' },
  { name: 'Communication', icon: '💬' },
  { name: 'Collaboration', icon: '🤝' },
  { name: 'Critical Thinking', icon: '🔍' },
  { name: 'Adaptability', icon: '⚡' },
  { name: 'Continuous Learning', icon: '📚' },
  { name: 'Time Management', icon: '⏱' },
]

function useScrollReveal(threshold = 0.1) {
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

function SkillTag({ name, accent, delay = 0, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="skill-tag inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-3px) scale(1.06)' : 'translateY(0) scale(1)'
          : 'translateY(12px) scale(0.9)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.35s cubic-bezier(.34,1.56,.64,1) ${visible ? 0 : delay}ms, border-color 0.3s, background 0.35s, box-shadow 0.35s, color 0.3s`,
        borderColor: hovered ? `${accent}80` : 'rgba(255,255,255,0.08)',
        background: hovered
          ? `linear-gradient(135deg, ${accent}22, ${accent}0a)`
          : 'rgba(255,255,255,0.03)',
        color: hovered ? accent : 'rgba(255,255,255,0.65)',
        boxShadow: hovered
          ? `0 8px 20px -4px ${accent}40, 0 0 0 1px ${accent}25, 0 0 18px ${accent}30`
          : 'none',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
        style={{
          backgroundColor: hovered ? accent : `${accent}60`,
          boxShadow: hovered ? `0 0 8px ${accent}` : 'none',
        }}
      />
      {name}
    </span>
  )
}

function CategoryCard({ category, index }) {
  const [cardRef, visible] = useScrollReveal(0.08)
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const innerRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = innerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
  }

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        filter: visible ? 'blur(0px)' : 'blur(6px)',
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.09}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.09}s, filter 0.7s ease-out ${index * 0.09}s`,
      }}
    >
      <div
        className={visible ? 'skill-card-float' : ''}
        style={{ animationDelay: `${index * 0.4}s`, position: 'relative' }}
      >
      {/* Animated gradient border frame */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0.5,
          background: `conic-gradient(from var(--border-angle, 0deg), ${category.accent}00, ${category.accent}, ${category.accent}00 35%)`,
          animation: 'border-spin 5s linear infinite',
          borderRadius: '1rem',
        }}
      />

      <div
        ref={innerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative rounded-2xl overflow-hidden transition-all duration-500 cursor-default"
        style={{
          margin: '1px',
          background: 'rgba(22,26,42,0.78)',
          boxShadow: hovered
            ? `0 24px 70px -10px rgba(0,0,0,0.45), 0 0 40px ${category.accent}1a, inset 0 1px 0 rgba(255,255,255,0.06)`
            : '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
          transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
          backdropFilter: 'blur(18px) saturate(140%)',
        }}
      >
        {/* Spotlight following cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${mouse.x * 100}% ${mouse.y * 100}%, ${category.accent}16, transparent 65%)`,
          }}
        />

        {/* Ambient corner glow */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle, ${category.accent}20, transparent 70%)`,
            opacity: hovered ? 0.9 : 0.35,
            filter: 'blur(10px)',
          }}
        />

        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
            opacity: hovered ? 0.9 : 0.2,
          }}
        />

        <div className="relative z-10 p-5">
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-mono font-bold shrink-0 transition-all duration-300"
              style={{
                backgroundColor: hovered ? `${category.accent}22` : `${category.accent}0d`,
                color: category.accent,
                border: `1px solid ${category.accent}35`,
                boxShadow: hovered ? `0 0 18px ${category.accent}30` : 'none',
                transform: hovered ? 'scale(1.08) rotate(-4deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              {category.icon}
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">{category.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{category.skills.length} skills</p>
            </div>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <SkillTag
                key={skill}
                name={skill}
                accent={category.accent}
                delay={i * 60}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

function SoftSkillPill({ skill, index, visible }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setTilt({ x, y })
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMove}
      className="group relative flex items-center gap-3 p-4 rounded-2xl border cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0) rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 6}deg) scale(${hovered ? 1.025 : 1})`
          : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform ${hovered ? '0.15s ease-out' : '0.55s cubic-bezier(.22,1,.36,1)'} ${visible ? 0 : index * 0.08}s, border-color 0.3s, background 0.35s, box-shadow 0.35s`,
        background: hovered
          ? `linear-gradient(135deg, ${softSkillsAccent}14, rgba(22,26,42,0.7))`
          : 'rgba(22,26,42,0.6)',
        borderColor: hovered ? `${softSkillsAccent}55` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 12px 36px -8px ${softSkillsAccent}30, 0 0 0 1px ${softSkillsAccent}20` : 'none',
        backdropFilter: 'blur(12px)',
        transformStyle: 'preserve-3d',
      }}
    >
      <span
        className="text-xl shrink-0 transition-transform duration-300"
        style={{ transform: hovered ? 'scale(1.2) rotate(-6deg)' : 'scale(1) rotate(0deg)' }}
      >
        {skill.icon}
      </span>
      <span
        className="text-sm font-medium transition-colors duration-300"
        style={{ color: hovered ? softSkillsAccent : 'rgba(255,255,255,0.65)' }}
      >
        {skill.name}
      </span>

      {/* Right accent line */}
      <div
        className="absolute right-0 top-1/4 bottom-1/4 w-0.5 rounded-full transition-all duration-400"
        style={{
          background: softSkillsAccent,
          opacity: hovered ? 0.8 : 0,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
        }}
      />
    </div>
  )
}

export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal(0.2)
  const [softRef, softVisible] = useScrollReveal(0.1)

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#151825' }}>
      {/* Ambient background: mesh gradients + drifting blobs + particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl skills-blob-1"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full blur-3xl skills-blob-2"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl skills-blob-3"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full blur-3xl skills-blob-1"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 70%)', animationDelay: '-4s' }} />

        {/* Tiny ambient particles */}
        <div className="skills-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="skills-particle"
              style={{
                left: `${(i * 37 + 5) % 100}%`,
                top: `${(i * 53 + 10) % 100}%`,
                animationDelay: `${(i % 9) * 0.9}s`,
                animationDuration: `${6 + (i % 5)}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 skills-header-reveal ${headerVisible ? 'visible' : ''}`}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(28px)',
          }}
        >
          <p className="text-primary/60 text-xs font-light tracking-[0.4em] uppercase mb-3">Technology Ecosystem</p>
          <h2 className="font-jersey text-5xl md:text-6xl text-white">
            <span className="text-primary">My</span> Skills
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="w-1 h-1 rounded-full bg-primary/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>

        {/* Skill categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {/* Soft Skills */}
        <div ref={softRef}>
          <div
            className="text-center mb-10"
            style={{
              opacity: softVisible ? 1 : 0,
              transform: softVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-2">Human-centered</p>
            <h3 className="text-white text-2xl font-jersey">
              <span className="text-primary">Soft</span> Skills
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ perspective: '800px' }}>
            {softSkills.map((skill, i) => (
              <SoftSkillPill key={skill.name} skill={skill} index={i} visible={softVisible} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes border-spin {
          to { --border-angle: 360deg; }
        }
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes skill-card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .skill-card-float {
          animation: skill-card-float 6s ease-in-out infinite;
        }
        @keyframes blob-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes blob-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.05); }
        }
        @keyframes blob-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 35px) scale(0.95); }
        }
        .skills-blob-1 { animation: blob-drift-1 16s ease-in-out infinite; }
        .skills-blob-2 { animation: blob-drift-2 18s ease-in-out infinite; }
        .skills-blob-3 { animation: blob-drift-3 14s ease-in-out infinite; }

        .skills-particles { position: absolute; inset: 0; }
        .skills-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(34,211,238,0.35);
          animation: particle-drift ease-in-out infinite;
        }
        @keyframes particle-drift {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 0.5; }
          50% { transform: translateY(-24px) translateX(10px); opacity: 0.7; }
          85% { opacity: 0.3; }
        }

        .skills-header-reveal {
          filter: blur(6px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1), filter 0.7s ease-out;
        }
        .skills-header-reveal.visible {
          filter: blur(0px);
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-card-float, .skills-blob-1, .skills-blob-2, .skills-blob-3, .skills-particle {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}