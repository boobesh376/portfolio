import { useEffect, useRef, useState } from 'react'
import profileImg2 from '../img/about.png'

const smoothScroll = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function About() {
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isImageHovered, setIsImageHovered] = useState(false)

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 160)
            })
          }
        })
      },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Mouse parallax on image card
  useEffect(() => {
    const el = imageWrapRef.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePos({ x, y })
    }
    const handleLeave = () => {
      setMousePos({ x: 0, y: 0 })
      setIsImageHovered(false)
    }
    const handleEnter = () => setIsImageHovered(true)

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    el.addEventListener('mouseenter', handleEnter)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      el.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  const tiltX = mousePos.y * 12
  const tiltY = mousePos.x * -12

  return (
    <section id="about" ref={sectionRef} className="about-bg py-28 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-primary/70 text-xs font-light tracking-[0.4em] uppercase mb-3">Get to know me</p>
          <h2 className="font-jersey text-5xl md:text-6xl text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-14 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <div className="flex justify-center animate-on-scroll about-image-reveal">
            <div
              ref={imageWrapRef}
              className="relative cursor-default w-64 h-80 md:w-72 md:h-[22rem]"
              style={{ perspective: '1000px' }}
            >
              {/* Ambient glow behind image — fixed position, only intensity/opacity changes on hover */}
              <div
                className="absolute rounded-3xl transition-opacity duration-700 pointer-events-none"
                style={{
                  inset: '-32px',
                  background: 'radial-gradient(ellipse at center, rgba(0,255,229,0.18) 0%, rgba(0,126,171,0.08) 50%, transparent 70%)',
                  opacity: isImageHovered ? 1 : 0.4,
                }}
              />

              {/* Tilt card — the only element that rotates; size matches wrapper exactly */}
              <div
                className="absolute inset-0"
                style={{
                  transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                  transition: isImageHovered ? 'transform 0.15s ease-out' : 'transform 0.7s cubic-bezier(.22,1,.36,1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Outer ring 1 — fixed position, only border/glow change */}
                <div
                  className="absolute rounded-2xl border transition-all duration-700 pointer-events-none"
                  style={{
                    inset: '-12px',
                    borderColor: isImageHovered ? 'rgba(0,255,229,0.35)' : 'rgba(0,255,229,0.1)',
                    boxShadow: isImageHovered ? '0 0 40px rgba(0,255,229,0.12)' : 'none',
                  }}
                />
                {/* Outer ring 2 — fixed position, only border changes */}
                <div
                  className="absolute rounded-3xl border transition-all duration-700 pointer-events-none"
                  style={{
                    inset: '-24px',
                    borderColor: isImageHovered ? 'rgba(0,255,229,0.12)' : 'rgba(0,255,229,0.04)',
                  }}
                />

                {/* Main image — fills the tilt card exactly, never moves; only shadow + inner scale change */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: isImageHovered
                      ? '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,229,0.15)'
                      : '0 20px 60px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,229,0.06)',
                    transition: 'box-shadow 0.6s ease',
                  }}
                >
                  <img
                    src={profileImg2}
                    alt="Boobesh K"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
                    style={{ transform: isImageHovered ? 'scale(1.02)' : 'scale(1)' }}
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2031]/70 via-transparent to-[#1c2031]/20" />
                  {/* Soft sheen on hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)',
                      opacity: isImageHovered ? 1 : 0,
                    }}
                  />
                </div>

                {/* Badge — bottom right, fixed anchor position; only lift + glow change on hover */}
                <div
                  className="absolute transition-all duration-500"
                  style={{
                    bottom: '-16px',
                    right: '-20px',
                    background: 'rgba(21,24,37,0.92)',
                    border: '1px solid rgba(0,255,229,0.3)',
                    borderRadius: '14px',
                    padding: '10px 16px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: isImageHovered ? '0 8px 32px rgba(0,255,229,0.2)' : '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <p className="text-primary text-sm font-bold leading-none">Fresher</p>
                  <p className="text-white/50 text-xs mt-0.5">Ready to Learn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="space-y-7 animate-on-scroll">
            {/* Intro line */}
            <div>
              <p className="text-white/80 text-sm leading-[1.9] mb-4">
                I am a dedicated{' '}
                <span className="text-primary font-semibold relative">
                  UI/UX Designer
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary/40" />
                </span>{' '}
                and{' '}
                <span className="text-primary font-semibold relative">
                  Full Stack Developer
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary/40" />
                </span>{' '}
                with a growing focus on{' '}
                <span className="text-primary font-semibold">AI & Machine Learning</span>.
                I enjoy solving real-world problems through thoughtful design and clean, scalable code.
              </p>
              <p className="text-white/65 text-sm leading-[1.9] mb-4">
                With hands-on experience in Figma, React, Python, and modern AI/ML tools, I design and develop
                responsive interfaces and intelligent systems that enhance usability and drive real impact.
              </p>
              <p className="text-white/65 text-sm leading-[1.9]">
                I constantly learn new technologies and design trends to improve both my creative output
                and engineering depth.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['React', 'Python', 'Figma', 'AI/ML', 'Tailwind', 'Java'].map((tag) => (
                <span
                  key={tag}
                  className="about-tag text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => smoothScroll('contact')}
                className="about-cta-btn group inline-flex items-center gap-2.5 text-sm font-semibold px-7 py-3 rounded-full border border-primary/50 text-white transition-all duration-400"
                style={{
                  background: 'rgba(28,32,49,0.7)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-cta-btn:hover {
          background: rgba(0,255,229,0.08);
          border-color: rgba(0,255,229,0.7);
          box-shadow: 0 0 24px rgba(0,255,229,0.2), inset 0 0 20px rgba(0,255,229,0.05);
          transform: translateY(-2px);
        }
        .about-image-reveal {
          filter: blur(8px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1), filter 0.8s ease-out;
        }
        .about-image-reveal.visible {
          filter: blur(0px);
        }
      `}</style>
    </section>
  )
}