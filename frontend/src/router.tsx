import { createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router'

function RootLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">BoardingHouse SaaS</div>
        <nav>
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}

function DashboardPage() {
  return (
    <section className="panel">
      <h1>Rent Manager</h1>
      <p>Frontend shell is ready with TanStack Router + Query integration.</p>
    </section>
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
