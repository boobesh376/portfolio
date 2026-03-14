import { useEffect, useRef, useState } from 'react'

const devSkills = [
  { name: 'HTML',        icon: 'https://www.figma.com/api/mcp/asset/2b920dd4-42a0-4c8a-b059-62141853cd49', level: 90 },
  { name: 'CSS',         icon: 'https://www.figma.com/api/mcp/asset/742405c1-8cc1-46f8-a30c-dc9637de9c1c', level: 85 },
  { name: 'JavaScript',  icon: 'https://www.figma.com/api/mcp/asset/bbcbd729-68ee-479d-b7a1-0904e047c3f2', level: 60 },
  { name: 'Tailwind CSS',icon: 'https://www.figma.com/api/mcp/asset/37ddb6cd-394a-4daa-9dc4-088c4fe0e513', level: 88 },
  { name: 'React JS',    icon: 'https://www.figma.com/api/mcp/asset/20aa13b5-5ab9-400c-8bcb-b4a85c455cd3', level: 75 },
  { name: 'Java',        icon: 'https://www.figma.com/api/mcp/asset/10cd6953-ca8a-4d30-a6fd-97fcfc485e12', level: 55 },
]

const designSkills = [
  { name: 'Figma',             icon: 'https://www.figma.com/api/mcp/asset/c65a2651-3172-4eec-9b53-552df905f2eb', level: 88 },
  { name: 'Photoshop',         icon: 'https://www.figma.com/api/mcp/asset/e5c7fa25-ee6f-4861-bd1e-7023e639ab42', level: 60 },
  { name: 'Adobe Illustrator', icon: 'https://www.figma.com/api/mcp/asset/c215f28a-c6ea-4cc3-aa66-af67cc172879', level: 50 },
  { name: 'Canva',             icon: 'https://www.figma.com/api/mcp/asset/bd4b64fc-2ea9-486d-9281-7c2f2251f9e3', level: 88 },
]

const softSkills = [
  { name: 'Creativity',      pct: 80 },
  { name: 'Problem Solving', pct: 70 },
  { name: 'Communication',   pct: 55 },
  { name: 'Teamwork',        pct: 70 },
]

function SkillBar({ name, icon, level, animate, delay = 0 }) {
  return (
    <div
      className="flex items-center gap-4 group hover:bg-white/3 rounded-xl p-2 -mx-2 transition-colors duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-[#242424] rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors duration-300">
        <img src={icon} alt={name} className="w-7 h-7 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1.5">
          <span className="text-white text-sm font-semibold truncate">{name}</span>
          <span className="text-primary text-xs font-bold ml-2">{level}%</span>
        </div>
        <div className="skill-bar">
          <div
            className="skill-bar-fill"
            style={{ width: animate ? `${level}%` : '0%', transitionDelay: `${delay}ms` }}
          />
        </div>
      </div>
    </div>
  )
}

const RADIUS = 36
const CIRC   = 2 * Math.PI * RADIUS

function CircularSkill({ name, pct, animate, delay = 0 }) {
  const offset = CIRC - (pct / 100) * CIRC
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="block">
          <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="rgba(246,246,246,0.12)" strokeWidth="7" />
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="none"
            stroke="#00FFE5"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={animate ? offset : CIRC}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '48px 48px',
              transition: `stroke-dashoffset 1.5s ease-in-out ${delay}ms`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-base font-extrabold group-hover:scale-110 transition-transform duration-300">{pct}%</span>
        </div>
      </div>
      <p className="text-white text-xs font-bold text-center">{name}</p>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true)
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-bg-card relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-jersey text-5xl md:text-6xl text-white">
            <span className="text-primary">My</span> Skills
          </h2>
          <div className="w-14 h-1 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        {/* Developer Skills */}
        <div className="mb-14 animate-on-scroll">
          <h3 className="text-center text-xl font-jersey mb-8">
            <span className="text-primary">Developer</span> Skills
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {devSkills.map((s, i) => (
              <SkillBar key={s.name} {...s} animate={animate} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Designer Skills */}
        <div className="mb-14 animate-on-scroll">
          <h3 className="text-center text-xl font-jersey mb-8">
            <span className="text-primary">Designer</span> Skills
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {designSkills.map((s, i) => (
              <SkillBar key={s.name} {...s} animate={animate} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="animate-on-scroll">
          <h3 className="text-center text-xl font-jersey mb-8">
            <span className="text-primary">Soft</span> Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
            {softSkills.map((s, i) => (
              <CircularSkill key={s.name} name={s.name} pct={s.pct} animate={animate} delay={i * 150} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
