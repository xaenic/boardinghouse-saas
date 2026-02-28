import { Link } from '@tanstack/react-router'

export function LandingPage() {
  return (
    <section className="page-stack">
      <section className="hero card-surface">
        <p className="eyebrow">Multi-Tenant Rent Platform</p>
        <h1>Run your boarding house operations like a modern SaaS company</h1>
        <p className="lead">
          Manage properties, rooms, tenants, leases, billing, and payments with strict tenant
          isolation and role-based access.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="button-link button-primary">
            Start Free Trial
          </Link>
          <Link to="/features" className="button-link button-ghost">
            Explore Features
          </Link>
        </div>
      </section>

      <section className="kpi-grid">
        <article className="kpi-card">
          <h3>99.9%</h3>
          <p>Uptime target for core billing workflows</p>
        </article>
        <article className="kpi-card">
          <h3>Tenant-Safe</h3>
          <p>Global tenancy scope and middleware boundaries</p>
        </article>
        <article className="kpi-card">
          <h3>Owner + Staff</h3>
          <p>Role-based permissions via Spatie</p>
        </article>
      </section>

      <section className="feature-strip card-surface">
        <article>
          <h3>Revenue Control</h3>
          <p>Track monthly bills, penalties, partial payments, and aging balances.</p>
        </article>
        <article>
          <h3>Operations View</h3>
          <p>See occupancy, active leases, and overdue trends at a glance.</p>
        </article>
        <article>
          <h3>Team Workflow</h3>
          <p>Separate owner and staff responsibilities with auditable actions.</p>
        </article>
      </section>
    </section>
  )
}
