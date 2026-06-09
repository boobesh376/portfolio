import { useEffect, useState } from 'react'
import profileImg from '../img/home.png'

const roles = ['Frontend Developer', 'UI/UX Designer', 'React Developer']

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/boobesh-k-82b59b293/',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/boobesh376',
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    href: 'https://leetcode.com/u/boobesh03/',
    label: 'LeetCode',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/boobesh_2k6/',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
]

const smoothScroll = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Hero() {
  const [roleIdx, setRoleIdx]   = useState(0)
  const [displayed, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    let timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplay(displayed.slice(0, -1)), 40)
    } else {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <section id="home" className="hero-bg min-h-screen pt-20 flex items-center relative overflow-hidden">

      {/* ── Background decorative orbs ── */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 left-10 w-32 h-32 bg-primary/4 rounded-full blur-2xl pointer-events-none" />

      {/* ── Floating dot grid (decorative) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#00ffe5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center py-12 relative z-10">

        {/* ── LEFT: Text content ── */}
        <div
          className={`order-2 md:order-1 transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <p className="text-white/50 text-xs font-light mb-3 tracking-[0.3em] uppercase">Hello It's Me</p>

          <h1 className="font-sen font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
            Boobesh K
          </h1>

          <p className="text-white text-sm font-semibold mb-1 h-6">
            And I'm a{' '}
            <span className="text-primary typing-cursor">{displayed}</span>
          </p>

          <p className="text-white/55 text-sm leading-relaxed mt-4 mb-7 max-w-md">
            I create modern, user-centered digital experiences by combining creative design
            thinking with efficient front-end development. Passionate about building visually
            appealing interfaces and transforming ideas into responsive, interactive web applications.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mb-7">
            {socialLinks.map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-icon text-white/50">
                {icon}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button onClick={() => smoothScroll('projects')} className="btn-primary text-sm px-9 py-3">
            Explore My Work
          </button>
        </div>

        {/* ── RIGHT: Profile card – full-body design ── */}
        <div
          className={`order-1 md:order-2 flex justify-center transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative" style={{ width: '320px', height: '460px' }}>

            {/* ── Outer hex-ish glow ring ── */}
            <div
              className="absolute inset-0 rounded-[40px] animate-spin-slow opacity-50"
              style={{
                background: 'conic-gradient(from 0deg, #00ffe5, transparent, #007eab, transparent, #00ffe5)',
                padding: '2px',
                borderRadius: '42px',
                animationDuration: '8s',
              }}
            >
              <div className="w-full h-full rounded-[40px] bg-bg-dark" />
            </div>

            {/* ── Second rotating ring ── */}
            <div
              className="absolute inset-[-10px] rounded-[50px] animate-spin-slow opacity-20"
              style={{
                background: 'conic-gradient(from 180deg, #00ffe5, transparent, transparent, #00ffe5)',
                animationDuration: '14s',
                animationDirection: 'reverse',
              }}
            />

            {/* ── Glow blobs behind card ── */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 h-20 bg-primary/30 rounded-full blur-2xl" />
            <div className="absolute top-[-10px] right-[-10px] w-24 h-24 bg-secondary/30 rounded-full blur-2xl" />

            {/* ── Corner accents ── */}
            {/* Top-left */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-xl z-20 opacity-80" />
            {/* Top-right */}
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-xl z-20 opacity-80" />
            {/* Bottom-left */}
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-xl z-20 opacity-80" />
            {/* Bottom-right */}
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl z-20 opacity-80" />

            {/* ── Scan line animation ── */}
            <div className="absolute inset-2 rounded-[36px] overflow-hidden z-10 pointer-events-none">
              <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"
                style={{ animation: 'scanline 3s linear infinite' }}
              />
            </div>

            {/* ── Main card ── */}
            <div
              className="absolute inset-[3px] rounded-[38px] overflow-hidden z-10"
              style={{
                background: 'linear-gradient(160deg, #1a1f35 0%, #151825 50%, #0e1120 100%)',
                boxShadow: '0 0 40px rgba(0,255,229,0.15), inset 0 0 40px rgba(0,0,0,0.4)',
              }}
            >
              {/* Inner mesh pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00ffe5" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 via-transparent to-transparent z-10" />

              {/* Profile image — full cover */}
              <img
                src={profileImg}
                alt="Boobesh K"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
              />

              {/* ── Bottom name plate ── */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4"
                style={{
                  background: 'linear-gradient(to top, rgba(21,24,37,0.97) 70%, transparent)',
                }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-primary text-xs font-bold tracking-widest uppercase mb-0.5"></p>
                    <p className="text-white text-base font-bold">Boobesh K</p>
                  </div>
                  {/* Availability dot */}
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    <span className="text-primary text-xs font-medium">Open to work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating badges ── */}
            {/* Left badge — UI/UX */}
            <div
              className="absolute -left-12 top-1/3 z-30 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white profile-float"
              style={{
                background: 'rgba(0,126,171,0.25)',
                border: '1px solid rgba(0,126,171,0.5)',
                backdropFilter: 'blur(8px)',
                animationDelay: '0.5s',
                boxShadow: '0 4px 20px rgba(0,126,171,0.2)',
              }}
            >
              <span className="text-secondary text-base">🎨</span>
              <span className="text-white/90">UI/UX</span>
            </div>

            {/* Right badge — React */}
            <div
              className="absolute -right-12 top-1/2 z-30 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white profile-float"
              style={{
                background: 'rgba(0,255,229,0.1)',
                border: '1px solid rgba(0,255,229,0.3)',
                backdropFilter: 'blur(8px)',
                animationDelay: '1.2s',
                boxShadow: '0 4px 20px rgba(0,255,229,0.1)',
              }}
            >
              <span className="text-base">⚛️</span>
              <span className="text-white/90">React</span>
            </div>

            {/* Top badge — Fresher */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(21,24,37,0.9)',
                border: '1px solid rgba(0,255,229,0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(0,255,229,0.2)',
              }}
            >
              <span className="text-primary">✦</span>
              <span className="text-white mx-1.5">Fresher</span>
              <span className="text-primary">✦</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-35 z-10">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary" />
        <div className="w-1 h-1 rounded-full bg-primary animate-bounce" />
      </div>

      {/* ── Scanline keyframe ── */}
      <style>{`
        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
