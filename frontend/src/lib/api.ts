const resolvedBaseUrl =
  typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:8000`
    : 'http://127.0.0.1:8000'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? resolvedBaseUrl

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
    throw new Error(`Unable to reach backend at ${API_BASE_URL}. Check network/API URL.`)
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
    throw new Error(`Unable to reach backend at ${API_BASE_URL}. Check network/API URL.`)
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
