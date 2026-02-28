import { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { apiRequest, ensureCsrfCookie } from '../lib/api'
import type { AuthUser, RegisterPayload } from '../types/auth'

export function RegisterPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState('Create your tenant workspace and owner account.')
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
      navigate({ to: '/app' })
    },
    onError: (error) => setResult((error as Error).message),
  })

  return (
    <section className="auth-layout">
      <aside className="auth-side card-surface">
        <p className="eyebrow">Create Workspace</p>
        <h1>Start your rental SaaS workspace</h1>
        <p>Provision tenant account, owner role, and secure auth context in one setup.</p>
      </aside>

      <form
        className="auth-form card-surface"
        onSubmit={(event) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        <h2>Register</h2>
        <label>
          <span>Business Name</span>
          <input
            value={form.tenant_name}
            onChange={(event) => setForm((prev) => ({ ...prev, tenant_name: event.target.value }))}
            placeholder="Sunrise Boarding House"
          />
        </label>
        <label>
          <span>Tenant Slug</span>
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
            placeholder="Repeat password"
          />
        </label>

        <button type="submit" disabled={mutation.isPending || !isComplete}>
          {mutation.isPending ? 'Creating...' : 'Create Workspace'}
        </button>

        <p className="footnote">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <pre className="result-card">{result}</pre>
      </form>
    </section>
  )
}
