import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { BookOpen, Building2, Package } from 'lucide-react'

export function PublicLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <div className="site-root">
      <div className="bg-glow glow-a" />
      <div className="bg-glow glow-b" />
      <header className="top-nav">
        <div className="logo-wrap">
          <div className="logo-mark" />
          <span>NovaBoard CRM</span>
        </div>

        {isAuthPage ? (
          <nav className="menu-links">
            <Link to="/">Back to home</Link>
            <Link to="/pricing">Pricing</Link>
          </nav>
        ) : (
          <>
            <nav className="menu-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/blog">Blog</Link>
            </nav>

            <Link to="/register" className="btn btn-primary">
              Get a demo
            </Link>
          </>
        )}
      </header>

      <main className={isAuthPage ? 'main-wrap main-wrap-auth' : 'main-wrap'}>
        <Outlet />
      </main>

      {!isAuthPage && (
        <footer className="footer">
          <div className="footer-top">
            <div>
              <div className="logo-wrap">
                <div className="logo-mark" />
                <span>NovaBoard CRM</span>
              </div>
              <p className="muted">Premium platform for modern rental operations.</p>
            </div>

            <div className="footer-cols">
              <div>
                <h4 className="footer-head">
                  <Package size={14} /> Product
                </h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Integrations</a>
              </div>
              <div>
                <h4 className="footer-head">
                  <Building2 size={14} /> Company
                </h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
              </div>
              <div>
                <h4 className="footer-head">
                  <BookOpen size={14} /> Resources
                </h4>
                <a href="#">Documentation</a>
                <a href="#">API</a>
                <a href="#">Support</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">© 2026 NovaBoard CRM</div>
        </footer>
      )}
    </div>
  )
}
