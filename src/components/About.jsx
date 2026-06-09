import { useEffect, useRef } from 'react'
import profileImg2 from '../img/about.png'

const smoothScroll = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about-bg py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-jersey text-5xl md:text-6xl text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-14 h-1 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center animate-on-scroll">
            <div className="relative group">
              <div className="absolute inset-[-8px] rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />
              <div className="absolute inset-[-16px] rounded-2xl border border-primary/10 group-hover:border-primary/20 transition-colors duration-500" />
              <div
                className="relative w-64 h-80 md:w-72 md:h-88 rounded-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-2"
                style={{ boxShadow: '0 0 40px rgba(0,255,229,0.12)' }}
              >
                <img src={profileImg2} alt="Boobesh K" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2031]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-bg-card border border-primary/30 rounded-xl px-4 py-2 backdrop-blur-sm shadow-lg">
                <p className="text-primary text-sm font-bold">Fresher</p>
                <p className="text-white/60 text-xs">Ready to Learn</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4 animate-on-scroll">
            <p className="text-white/75 text-sm leading-relaxed">
              I am a dedicated <span className="text-primary font-semibold">UI/UX Designer</span> and{' '}
              <span className="text-primary font-semibold">Front-End Developer</span> with a strong
              interest in crafting seamless digital experiences. I enjoy solving real-world problems
              through thoughtful design and clean, scalable code.
            </p>
            <p className="text-white/75 text-sm leading-relaxed">
              With hands-on experience in Figma, HTML, CSS, JavaScript, and modern UI practices,
              I design and develop responsive interfaces that enhance usability and engagement. I
              focus on understanding user behavior, improving interaction flow, and delivering
              impactful user experiences.
            </p>
            <p className="text-white/75 text-sm leading-relaxed">
              I constantly learn new technologies and design trends to improve both my design
              creativity and development efficiency.
            </p>

            {/* Stats — updated for fresher */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              {[
                { number: '10+', label: 'Projects Done' },
                { number: '5+', label: 'UI/UX Designs' },
                { number: '8+', label: 'Tools Mastered' },
              ].map(({ number, label }) => (
                <div key={label} className="bg-bg-dark rounded-xl p-3 text-center border border-white/5 hover:border-primary/20 transition-colors duration-300">
                  <p className="text-primary text-xl font-extrabold">{number}</p>
                  <p className="text-white/50 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => smoothScroll('contact')}
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
