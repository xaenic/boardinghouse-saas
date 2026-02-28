export function AboutPage() {
  return (
    <section className="page-stack">
      <section className="card-surface intro-block">
        <p className="eyebrow">About</p>
        <h1>Built for property operators who need discipline and speed</h1>
        <p className="lead">
          BoardingHouse SaaS is focused on operational clarity for managers handling recurring rent,
          lease compliance, and collections.
        </p>
      </section>

      <section className="about-grid">
        <article className="feature-card">
          <h3>Our Mission</h3>
          <p>
            Reduce payment leakage and operational chaos in rental businesses through reliable
            software workflows.
          </p>
        </article>
        <article className="feature-card">
          <h3>Security First</h3>
          <p>
            Tenant data boundaries are enforced through scoped queries and middleware-level context
            checks.
          </p>
        </article>
        <article className="feature-card">
          <h3>Practical Product</h3>
          <p>
            Designed for teams that care about collections, occupancy, and accountability every
            month.
          </p>
        </article>
      </section>
    </section>
  )
}
