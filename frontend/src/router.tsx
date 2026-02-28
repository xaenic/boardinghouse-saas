import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router'
import { API_BASE_URL, apiRequest, ensureCsrfCookie } from './lib/api'

type AuthUser = {
  id: string
  tenant_id: string | null
  name: string
  email: string
  roles: string[]
}

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
  const [result, setResult] = useState<string>('No request yet.')

  const [registerInput, setRegisterInput] = useState({
    tenant_name: 'Boarding One',
    tenant_slug: 'boarding-one',
    owner_name: 'Owner One',
    owner_email: 'owner@example.com',
    password: 'secret123',
    password_confirmation: 'secret123',
  })

  const [loginInput, setLoginInput] = useState({
    tenant_slug: 'boarding-one',
    email: 'owner@example.com',
    password: 'secret123',
  })

  const registerMutation = useMutation({
    mutationFn: async (): Promise<AuthUser> => {
      await ensureCsrfCookie()

      return apiRequest<AuthUser>('/api/v1/auth/register-tenant', {
        method: 'POST',
        body: JSON.stringify(registerInput),
      })
    },
    onSuccess: (data) => {
      setResult(`Registered tenant owner: ${data.email} (${data.roles.join(', ')})`)
    },
    onError: (error) => {
      setResult((error as Error).message)
    },
  })

  const loginMutation = useMutation({
    mutationFn: async (): Promise<AuthUser> => {
      await ensureCsrfCookie()

      return apiRequest<AuthUser>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInput),
      })
    },
    onSuccess: (data) => {
      setResult(`Logged in as: ${data.email} (${data.roles.join(', ')})`)
    },
    onError: (error) => {
      setResult((error as Error).message)
    },
  })

  const meMutation = useMutation({
    mutationFn: () =>
      apiRequest<AuthUser>('/api/v1/auth/me', {
        method: 'GET',
      }),
    onSuccess: (data) => {
      setResult(`Current user: ${JSON.stringify(data)}`)
    },
    onError: (error) => {
      setResult((error as Error).message)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await ensureCsrfCookie()
      return apiRequest<null>('/api/v1/auth/logout', {
        method: 'POST',
      })
    },
    onSuccess: () => {
      setResult('Logged out successfully.')
    },
    onError: (error) => {
      setResult((error as Error).message)
    },
  })

  return (
    <section className="panel">
      <h1>Rent Manager Auth Bootstrap</h1>
      <p className="subtitle">API base: {API_BASE_URL}</p>

      <div className="grid">
        <form
          className="card"
          onSubmit={(event) => {
            event.preventDefault()
            registerMutation.mutate()
          }}
        >
          <h2>Register Tenant + Owner</h2>
          <input
            value={registerInput.tenant_name}
            onChange={(event) =>
              setRegisterInput((prev) => ({ ...prev, tenant_name: event.target.value }))
            }
            placeholder="Tenant Name"
          />
          <input
            value={registerInput.tenant_slug}
            onChange={(event) =>
              setRegisterInput((prev) => ({ ...prev, tenant_slug: event.target.value }))
            }
            placeholder="Tenant Slug"
          />
          <input
            value={registerInput.owner_name}
            onChange={(event) =>
              setRegisterInput((prev) => ({ ...prev, owner_name: event.target.value }))
            }
            placeholder="Owner Name"
          />
          <input
            value={registerInput.owner_email}
            onChange={(event) =>
              setRegisterInput((prev) => ({ ...prev, owner_email: event.target.value }))
            }
            placeholder="Owner Email"
          />
          <input
            type="password"
            value={registerInput.password}
            onChange={(event) =>
              setRegisterInput((prev) => ({
                ...prev,
                password: event.target.value,
                password_confirmation: event.target.value,
              }))
            }
            placeholder="Password"
          />
          <button type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </button>
        </form>

        <form
          className="card"
          onSubmit={(event) => {
            event.preventDefault()
            loginMutation.mutate()
          }}
        >
          <h2>Login</h2>
          <input
            value={loginInput.tenant_slug}
            onChange={(event) =>
              setLoginInput((prev) => ({ ...prev, tenant_slug: event.target.value }))
            }
            placeholder="Tenant Slug"
          />
          <input
            value={loginInput.email}
            onChange={(event) => setLoginInput((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
          />
          <input
            type="password"
            value={loginInput.password}
            onChange={(event) =>
              setLoginInput((prev) => ({ ...prev, password: event.target.value }))
            }
            placeholder="Password"
          />
          <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
          <div className="row">
            <button
              type="button"
              onClick={() => meMutation.mutate()}
              disabled={meMutation.isPending}
              className="ghost"
            >
              /auth/me
            </button>
            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="ghost"
            >
              Logout
            </button>
          </div>
        </form>
      </div>

      <pre className="result">{result}</pre>
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
