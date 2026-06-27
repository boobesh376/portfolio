import { useState, useEffect } from 'react'

const navItems = [
  { label: 'HOME',     href: 'home' },
  { label: 'ABOUT',   href: 'about' },
  { label: 'PROJECTS',href: 'projects' },
  { label: 'HACKATHONS', href: 'hackathons' },
  { label: 'SKILLS',  href: 'skills' },
  { label: 'CONTACT', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false)
  const [activeSection, setActive] = useState('home')
  const [menuOpen, setMenuOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['home', 'about', 'projects', 'hackathons', 'skills', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#191b21]/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-[#191b21]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-baseline gap-1 cursor-pointer">
          <span className="font-jersey text-primary text-3xl leading-none">MY</span>
          <span className="font-jersey text-white text-3xl leading-none">PORTFOLIO</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={`nav-link text-xs tracking-widest font-light uppercase transition-colors duration-200 ${
                activeSection === href ? 'text-primary active' : 'text-white/80 hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4'}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80 border-t border-white/10' : 'max-h-0'}`}>
        <div className="bg-[#191b21] px-6 py-4 flex flex-col gap-4">
          {navItems.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={`text-left text-sm tracking-widest font-light uppercase transition-colors duration-200 ${
                activeSection === href ? 'text-primary' : 'text-white/70'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
