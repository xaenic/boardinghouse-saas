export function AboutPage() {
  return (
    <section className="page-stack">
      <section className="card-surface intro-block premium-intro">
        <p className="eyebrow">About</p>
        <h1>We build focused SaaS infrastructure for rental businesses</h1>
        <p className="lead">
          BoardingHouse SaaS helps property operators improve collections, tighten controls, and run
          reliable monthly workflows at scale.
        </p>
      </section>

      <section className="about-grid">
        <article className="feature-card">
          <h3>Mission</h3>
          <p>
            Bring enterprise-grade discipline to rental operations without adding enterprise
            complexity.
          </p>
        </article>
        <article className="feature-card">
          <h3>Reliability</h3>
          <p>Designed around auditable billing flows and consistent financial state transitions.</p>
        </article>
        <article className="feature-card">
          <h3>Security</h3>
          <p>
            Tenant isolation and role boundaries are first-class implementation concerns, not
            afterthoughts.
          </p>
        </article>
      </section>
    </section>
  )
}
