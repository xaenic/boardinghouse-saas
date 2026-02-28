import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { apiRequest, ensureCsrfCookie } from '../lib/api'
import type { AuthUser, LoginPayload } from '../types/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState('Sign in to access your tenant workspace.')
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
      navigate({ to: '/app' })
    },
    onError: (error) => setResult((error as Error).message),
  })

  return (
    <section className="auth-layout">
      <aside className="auth-side card-surface">
        <p className="eyebrow">Secure Access</p>
        <h1>Login to your operations console</h1>
        <p>Tenant-aware session authentication with strict isolation.</p>
      </aside>

      <form
        className="auth-form card-surface"
        onSubmit={(event) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <h2>Welcome Back</h2>
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
          Need an account? <Link to="/register">Create one</Link>
        </p>
        <pre className="result-card">{result}</pre>
      </form>
    </section>
  )
}
