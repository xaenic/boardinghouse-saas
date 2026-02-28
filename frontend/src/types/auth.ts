export type AuthUser = {
  id: string
  tenant_id: string | null
  tenant_slug: string | null
  name: string
  email: string
  roles: string[]
}

export type RegisterPayload = {
  tenant_name: string
  owner_name: string
  owner_email: string
  password: string
  password_confirmation: string
}

export type LoginPayload = {
  tenant_slug: string
  email: string
  password: string
}
