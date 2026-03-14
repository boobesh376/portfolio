export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-white/5 py-6">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-white/40 text-xs font-extralight tracking-widest">
          Designed &amp; Developed by{' '}
          <span className="text-primary font-semibold">Boobesh K</span>
        </p>
        <p className="text-white/20 text-xs mt-1 tracking-wider">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
