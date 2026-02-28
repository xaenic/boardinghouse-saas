import { Link } from '@tanstack/react-router'

const features = [
  {
    title: 'Tenant-Safe Data Layer',
    body: 'Global tenant scoping and middleware context enforce strict account isolation.',
  },
  {
    title: 'Smart Billing Engine',
    body: 'Recurring invoices, penalties, and partial payment reconciliation in one workflow.',
  },
  {
    title: 'Portfolio Analytics',
    body: 'Live occupancy, receivables, and revenue visibility across all properties.',
  },
  {
    title: 'Role-Based Access',
    body: 'Owner and staff permissions powered by enforceable authorization policies.',
  },
  {
    title: 'CSV and Financial Export',
    body: 'Generate reports instantly for accounting and operational reviews.',
  },
  {
    title: 'Operational Alerts',
    body: 'Flag overdue accounts and expiring leases before they become risk points.',
  },
]

const testimonials = [
  {
    name: 'Nina Park',
    role: 'Finance Director, UrbanNest',
    quote:
      'Collection workflows became dramatically faster and our monthly close is now predictable.',
  },
  {
    name: 'Marco Dela Cruz',
    role: 'COO, StayScale Group',
    quote: 'The product feels premium and gives our team confidence when scaling to new branches.',
  },
]

export function LandingPage() {
  return (
    <section className="landing-stack">
      <section className="hero-grid">
        <div>
          <p className="eyebrow">Premium SaaS for Rental Ops</p>
          <h1 className="hero-title">Run your rental business with a modern CRM-grade platform</h1>
          <p className="hero-text">
            Beautiful, secure, and tenant-safe software for properties, leases, billing, and
            payments. Designed for serious operators.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Start free trial
            </Link>
            <Link to="/features" className="btn btn-ghost">
              View features
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dash-head">
            <span>Revenue Overview</span>
            <strong>+18.2%</strong>
          </div>
          <div className="line-chart">
            <svg viewBox="0 0 320 140" preserveAspectRatio="none">
              <path d="M0 110 C40 95, 60 100, 95 80 S150 70, 190 55 S250 40, 320 20" />
            </svg>
          </div>
          <div className="dash-stats">
            <article>
              <span className="dot dot-purple" />
              <div>
                <h4>$182k</h4>
                <p>Monthly billed</p>
              </div>
            </article>
            <article>
              <span className="dot dot-blue" />
              <div>
                <h4>96.4%</h4>
                <p>Collected on time</p>
              </div>
            </article>
            <article>
              <span className="dot dot-green" />
              <div>
                <h4>412</h4>
                <p>Active tenants</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-head">
          <p className="eyebrow">Features</p>
          <h2>Everything your operations team needs</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="glass-card hover-lift">
              <div className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="highlight-grid">
        <article className="glass-card big-card hover-lift">
          <p className="eyebrow">Workflow Intelligence</p>
          <h3>Operational timeline of bills, penalties, and payments</h3>
          <p>
            Visualize every account state transition so teams can collect faster with fewer
            disputes.
          </p>
        </article>
        <article className="glass-card big-card hover-lift">
          <p className="eyebrow">Portfolio Visibility</p>
          <h3>Property-level performance in one dashboard</h3>
          <p>Track occupancy, overdue balances, and lease risk with clean analytics cards.</p>
        </article>
      </section>

      <section className="pricing-section">
        <div className="section-head">
          <p className="eyebrow">Pricing</p>
          <h2>Choose your plan</h2>
        </div>

        <div className="pricing-grid">
          <article className="price-card hover-lift">
            <h3>Starter</h3>
            <p className="price">$29/mo</p>
            <ul>
              <li>1 property</li>
              <li>40 rooms</li>
              <li>3 team members</li>
            </ul>
            <Link to="/register" className="btn btn-ghost">
              Select
            </Link>
          </article>

          <article className="price-card featured hover-lift">
            <span className="pill">Most Popular</span>
            <h3>Growth</h3>
            <p className="price">$79/mo</p>
            <ul>
              <li>5 properties</li>
              <li>300 rooms</li>
              <li>Unlimited staff</li>
            </ul>
            <Link to="/register" className="btn btn-primary">
              Select
            </Link>
          </article>

          <article className="price-card hover-lift">
            <h3>Scale</h3>
            <p className="price">Custom</p>
            <ul>
              <li>Multi-branch</li>
              <li>Custom integrations</li>
              <li>Priority support</li>
            </ul>
            <Link to="/about" className="btn btn-ghost">
              Contact
            </Link>
          </article>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section-head">
          <p className="eyebrow">Testimonials</p>
          <h2>Trusted by operators scaling fast</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="glass-card hover-lift">
              <p>“{item.quote}”</p>
              <div className="author">
                <span className="avatar" />
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
