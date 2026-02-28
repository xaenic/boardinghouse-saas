import { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { API_BASE_URL, apiRequest, ensureCsrfCookie } from './lib/api'

type AuthUser = {
  id: string
  tenant_id: string | null
  name: string
  email: string
  roles: string[]
}

type RegisterPayload = {
  tenant_name: string
  tenant_slug: string
  owner_name: string
  owner_email: string
  password: string
  password_confirmation: string
}

type LoginPayload = {
  tenant_slug: string
  email: string
  password: string
}

function RootLayout() {
  return (
    <div className="app-bg">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <header className="shell-header">
        <div className="shell-brand">BoardingHouse SaaS</div>
        <nav className="shell-nav">
          <Link to="/" className="nav-pill">
            Dashboard
          </Link>
          <Link to="/login" className="nav-pill">
            Login
          </Link>
          <Link to="/register" className="nav-pill nav-pill-cta">
            Register
          </Link>
        </nav>
      </header>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  )
}

function DashboardPage() {
  const [summary, setSummary] = useState('Click refresh to check authenticated session state.')

  const meMutation = useMutation({
    mutationFn: () => apiRequest<AuthUser>('/api/v1/auth/me', { method: 'GET' }),
    onSuccess: (data) => setSummary(`Signed in as ${data.name} (${data.email})`),
    onError: (error) => setSummary((error as Error).message),
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await ensureCsrfCookie()
      return apiRequest<null>('/api/v1/auth/logout', { method: 'POST' })
    },
    onSuccess: () => setSummary('Logged out successfully.'),
    onError: (error) => setSummary((error as Error).message),
  })

  return (
    <section className="panel dashboard-panel">
      <p className="eyebrow">Product Preview</p>
      <h1>Apartment Rent Manager</h1>
      <p className="subtle">Modern tenancy-first auth is ready. API base: {API_BASE_URL}</p>

      <div className="metric-grid">
        <article className="metric-card">
          <h3>Tenancy</h3>
          <p>Global tenant scope + middleware isolation</p>
        </article>
        <article className="metric-card">
          <h3>Auth</h3>
          <p>Sanctum SPA cookies + Owner/Staff roles</p>
        </article>
        <article className="metric-card">
          <h3>Architecture</h3>
          <p>Service + Repository implementation in place</p>
        </article>
      </div>

      <div className="action-row">
        <button onClick={() => meMutation.mutate()} disabled={meMutation.isPending}>
          {meMutation.isPending ? 'Checking...' : 'Refresh Session'}
        </button>
        <button
          className="button-ghost"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? 'Signing out...' : 'Logout'}
        </button>
      </div>

      <pre className="result-card">{summary}</pre>
    </section>
  )
}

function RegisterPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState('Create your first tenant and owner account.')
  const [form, setForm] = useState<RegisterPayload>({
    tenant_name: '',
    tenant_slug: '',
    owner_name: '',
    owner_email: '',
    password: '',
    password_confirmation: '',
  })

  const isComplete = useMemo(
    () =>
      Object.values(form).every((value) => value.trim().length > 0) &&
      form.password.length >= 8 &&
      form.password === form.password_confirmation,
    [form],
  )

  const mutation = useMutation({
    mutationFn: async (): Promise<AuthUser> => {
      await ensureCsrfCookie()
      return apiRequest<AuthUser>('/api/v1/auth/register-tenant', {
        method: 'POST',
        body: JSON.stringify(form),
      })
    },
    onSuccess: (data) => {
      setResult(`Registered ${data.email} as ${data.roles.join(', ')}`)
      navigate({ to: '/' })
    },
    onError: (error) => {
      setResult((error as Error).message)
    },
  })

  return (
    <section className="auth-wrap">
      <aside className="auth-hero">
        <p className="eyebrow">Onboarding</p>
        <h1>Launch a new property business in minutes</h1>
        <p>
          Create tenant workspace, assign owner role, and start managing rooms, leases, bills, and
          payments in a secure multi-tenant environment.
        </p>
      </aside>

      <form
        className="auth-card"
        onSubmit={(event) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <h2>Create Account</h2>
        <p className="subtle">Start by registering your organization and owner profile.</p>

        <label>
          <span>Business Name</span>
          <input
            value={form.tenant_name}
            onChange={(event) => setForm((prev) => ({ ...prev, tenant_name: event.target.value }))}
            placeholder="Sunrise Boarding House"
          />
        </label>

        <label>
          <span>Workspace Slug</span>
          <input
            value={form.tenant_slug}
            onChange={(event) => setForm((prev) => ({ ...prev, tenant_slug: event.target.value }))}
            placeholder="sunrise-boarding"
          />
        </label>

        <label>
          <span>Owner Name</span>
          <input
            value={form.owner_name}
            onChange={(event) => setForm((prev) => ({ ...prev, owner_name: event.target.value }))}
            placeholder="Alex Rivera"
          />
        </label>

        <label>
          <span>Owner Email</span>
          <input
            type="email"
            value={form.owner_email}
            onChange={(event) => setForm((prev) => ({ ...prev, owner_email: event.target.value }))}
            placeholder="owner@sunrise.com"
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Minimum 8 characters"
          />
        </label>

        <label>
          <span>Confirm Password</span>
          <input
            type="password"
            value={form.password_confirmation}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password_confirmation: event.target.value }))
            }
            placeholder="Re-enter password"
          />
        </label>

        <button type="submit" disabled={mutation.isPending || !isComplete}>
          {mutation.isPending ? 'Creating workspace...' : 'Create Workspace'}
        </button>

        <p className="footnote">
          Already registered? <Link to="/login">Sign in here</Link>
        </p>
        <pre className="result-card">{result}</pre>
      </form>
    </section>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState('Enter your tenant slug and account credentials.')
  const [form, setForm] = useState<LoginPayload>({
    tenant_slug: '',
    email: '',
    password: '',
  })

  const mutation = useMutation({
    mutationFn: async (): Promise<AuthUser> => {
      await ensureCsrfCookie()
      return apiRequest<AuthUser>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      })
    },
    onSuccess: (data) => {
      setResult(`Welcome back ${data.name}.`)
      navigate({ to: '/' })
    },
    onError: (error) => {
      setResult((error as Error).message)
    },
  })

  return (
    <section className="auth-wrap auth-wrap-login">
      <aside className="auth-hero">
        <p className="eyebrow">Secure Access</p>
        <h1>Sign in to your workspace</h1>
        <p>
          Owner and staff accounts are scoped to your tenant. Data isolation is enforced at query
          level.
        </p>
      </aside>

      <form
        className="auth-card"
        onSubmit={(event) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <h2>Welcome Back</h2>
        <p className="subtle">Use the same tenant slug you registered with.</p>

        <label>
          <span>Tenant Slug</span>
          <input
            value={form.tenant_slug}
            onChange={(event) => setForm((prev) => ({ ...prev, tenant_slug: event.target.value }))}
            placeholder="sunrise-boarding"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="owner@sunrise.com"
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="••••••••"
          />
        </label>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="footnote">
          New to the platform? <Link to="/register">Create an account</Link>
        </p>
        <pre className="result-card">{result}</pre>
      </form>
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

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const routeTree = rootRoute.addChildren([indexRoute, registerRoute, loginRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
