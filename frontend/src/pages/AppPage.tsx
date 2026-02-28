import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { apiRequest, ensureCsrfCookie } from '../lib/api'
import type { AuthUser } from '../types/auth'

export function AppPage() {
  const [summary, setSummary] = useState('This is your authenticated app workspace.')

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
    <section className="page-stack">
      <section className="card-surface intro-block">
        <p className="eyebrow">App Workspace</p>
        <h1>Operations Dashboard</h1>
        <p className="lead">
          This route is where property, lease, billing, and payment modules will live.
        </p>
      </section>

      <section className="card-surface action-block">
        <div className="hero-actions">
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
          <Link to="/" className="button-link button-ghost">
            Back to Marketing Site
          </Link>
        </div>
        <pre className="result-card">{summary}</pre>
      </section>
    </section>
  )
}
