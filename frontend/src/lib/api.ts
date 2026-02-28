const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function ensureCsrfCookie(): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`Failed to initialize CSRF cookie (${response.status}).`)
    }
  } catch {
    throw new Error('Unable to reach backend. Verify Vite proxy or API base URL configuration.')
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    })
  } catch {
    throw new Error('Unable to reach backend. Verify Vite proxy or API base URL configuration.')
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    if (!response.ok) {
      throw new Error(`Request failed (${response.status}).`)
    }

    return null as T
  }

  const payload = (await response.json()) as {
    success?: boolean
    message?: string
    data: T
  }

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message ?? `Request failed (${response.status}).`)
  }

  return payload.data
}

export { API_BASE_URL }
