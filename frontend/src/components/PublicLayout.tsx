import { Link, Outlet } from '@tanstack/react-router'

export function PublicLayout() {
  return (
    <div className="app-bg">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <header className="site-header">
        <div className="brand-wrap">
          <div className="brand-mark" />
          <span className="brand-name">BoardingHouse SaaS</span>
        </div>
        <nav className="site-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/features" className="nav-link">
            Features
          </Link>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link nav-link-cta">
            Start Free
          </Link>
        </nav>
      </header>
      <main className="main-shell">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>© 2026 BoardingHouse SaaS</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/register">Get Started</Link>
        </div>
      </footer>
    </div>
  )
}
