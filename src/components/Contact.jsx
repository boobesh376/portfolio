import { useEffect, useRef, useState } from 'react'

/**
 * ─────────────────────────────────────────────────────────────────
 *  EMAILJS SETUP (one-time, free)
 * ─────────────────────────────────────────────────────────────────
 *  1. Go to https://emailjs.com and create a free account
 *  2. Add an Email Service (Gmail recommended) → copy SERVICE_ID
 *  3. Create an Email Template with these variables:
 *       {{from_name}}  {{from_email}}  {{subject}}  {{message}}
 *     Set "To Email" = boobeshkaruna@gmail.com → copy TEMPLATE_ID
 *  4. Go to Account → API Keys → copy PUBLIC_KEY
 *  5. Replace the three placeholders below:
 * ─────────────────────────────────────────────────────────────────
 */
const EMAILJS_SERVICE_ID  = 'service_13hzala'
const EMAILJS_TEMPLATE_ID = 'template_01nogzh'
const EMAILJS_PUBLIC_KEY  = 'eU0v5gvy75eiCpeGe'

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

// Load EmailJS SDK dynamically
const loadEmailJS = () =>
  new Promise((resolve) => {
    if (window.emailjs) return resolve(window.emailjs)
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
      resolve(window.emailjs)
    }
    document.head.appendChild(script)
  })

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const ejs = await loadEmailJS()
      await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    form.message,
        to_email:   'boobeshkaruna@gmail.com',
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" ref={sectionRef} className="contact-bg py-24 relative overflow-hidden">
      <div className="absolute top-24 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 left-0 w-56 h-56 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="font-jersey text-5xl md:text-6xl text-white">
            Contact <span className="text-primary">Me</span>
          </h2>
          <div className="w-14 h-1 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── Contact Form ── */}
          <div className="animate-on-scroll">
            <div className="bg-bg-card rounded-2xl p-7 border border-white/5 hover:border-primary/15 transition-colors duration-500">
              <h3 className="text-lg font-semibold mb-5">
                Contact <span className="text-primary">Form</span>
              </h3>

              {/* Status banners */}
              {status === 'success' && (
                <div className="mb-5 p-4 bg-primary/10 border border-primary/30 rounded-xl text-primary text-sm font-medium flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Something went wrong. Please try again or email directly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white text-xs font-bold mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-bg-input text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-bold mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-bg-input text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-bold mb-1.5 uppercase tracking-wider">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full bg-bg-input text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-bold mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-bg-input text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── Contact Info ── */}
          <div className="animate-on-scroll">
            <div className="bg-bg-card rounded-2xl p-7 border border-white/5 hover:border-primary/15 transition-colors duration-500 h-full flex flex-col justify-between">
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00FFE5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5 uppercase tracking-wider">Email</p>
                    <a href="mailto:boobeshkaruna@gmail.com" className="text-white font-semibold hover:text-primary transition-colors text-sm">
                      boobeshkaruna@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00FFE5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5 uppercase tracking-wider">Location</p>
                    <p className="text-white font-semibold text-sm">Chennai, India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00FFE5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5 uppercase tracking-wider">Phone</p>
                    <p className="text-white font-semibold text-sm">7010818371</p>
                  </div>
                </div>

                <div className="border-t border-white/8 pt-5">
                  <p className="text-white/40 text-xs mb-4 text-center uppercase tracking-wider">Connect with me</p>
                  <div className="flex justify-center gap-3">
                    {socialLinks.map(({ href, label, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="social-icon text-white/50 w-10 h-10"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability badge */}
              <div className="mt-6">
                <div
                  className="text-center text-sm font-semibold py-3.5 rounded-full border-2 border-primary text-white"
                  style={{ background: 'rgba(28,32,49,0.8)', boxShadow: '0 0 20px rgba(0,255,229,0.12)' }}
                >
                  ✦ Available for Internship
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EmailJS setup note — visible in dev, remove when done */}
        {(EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') && (
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-xs leading-relaxed">
            <p className="font-bold mb-1">⚠ EmailJS Not Configured Yet</p>
            <p>To enable real email sending: (1) Sign up free at <a href="https://emailjs.com" target="_blank" className="underline">emailjs.com</a> → (2) Create a Gmail service → (3) Create a template with variables: <code>from_name, from_email, subject, message</code> → (4) Replace the 3 placeholders at the top of Contact.jsx with your IDs.</p>
          </div>
        )}
      </div>
    </section>
  )
}
