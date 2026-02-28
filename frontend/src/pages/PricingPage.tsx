import { Link } from '@tanstack/react-router'

export function PricingPage() {
  return (
    <section className="page-stack">
      <section className="card-surface intro-block premium-intro">
        <p className="eyebrow">Pricing</p>
        <h1>Choose a plan that matches your portfolio size</h1>
      </section>

      <section className="pricing-grid premium-pricing">
        <article className="price-card">
          <h3>Starter</h3>
          <p className="price-tag">$29 / month</p>
          <ul>
            <li>1 property</li>
            <li>Up to 40 rooms</li>
            <li>Owner + 2 staff</li>
            <li>Core reporting</li>
          </ul>
          <Link to="/register" className="button-link button-primary">
            Choose Starter
          </Link>
        </article>

        <article className="price-card price-card-highlight">
          <p className="badge">Most Popular</p>
          <h3>Growth</h3>
          <p className="price-tag">$79 / month</p>
          <ul>
            <li>Up to 5 properties</li>
            <li>Up to 300 rooms</li>
            <li>Unlimited staff</li>
            <li>Advanced billing analytics</li>
          </ul>
          <Link to="/register" className="button-link button-primary">
            Choose Growth
          </Link>
        </article>

        <article className="price-card">
          <h3>Scale</h3>
          <p className="price-tag">Custom</p>
          <ul>
            <li>Multi-branch operations</li>
            <li>Priority support</li>
            <li>Custom integrations</li>
            <li>Dedicated onboarding</li>
          </ul>
          <Link to="/about" className="button-link button-ghost">
            Contact Sales
          </Link>
        </article>
      </section>
    </section>
  )
}
