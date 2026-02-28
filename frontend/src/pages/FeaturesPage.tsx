export function FeaturesPage() {
  const items = [
    {
      title: 'Property & Room Management',
      text: 'Organize multiple properties, room inventory, occupancy status, and pricing plans.',
    },
    {
      title: 'Tenant & Lease Lifecycle',
      text: 'Onboard tenants, start leases, renew contracts, and track historical records.',
    },
    {
      title: 'Billing & Penalties',
      text: 'Generate recurring charges with late fees and transparent statement history.',
    },
    {
      title: 'Payment Reconciliation',
      text: 'Support partial payments and map transactions to outstanding balances.',
    },
    {
      title: 'Role-Based Access',
      text: 'Owner and staff roles with permission gates and secured API endpoints.',
    },
    {
      title: 'CSV Export',
      text: 'Export financial and occupancy reports for accounting and operations review.',
    },
  ]

  return (
    <section className="page-stack">
      <section className="card-surface intro-block">
        <p className="eyebrow">Features</p>
        <h1>Everything needed for apartment and boarding-house operations</h1>
      </section>
      <section className="feature-grid">
        {items.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </section>
  )
}
