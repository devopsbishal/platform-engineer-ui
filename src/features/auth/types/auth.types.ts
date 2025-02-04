// src/types/auth.ts
export interface CookieOptions {
  expires?: number
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'None' | 'Lax' | 'Strict'
}

export interface AuthUser {
  id: string
  name?: string
  email?: string
  role?: string[]
  imageUrl?: string
}

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  initialize: () => void
  setUser: (user: AuthUser | null) => void
  setAccessToken: (token: string | null) => void
  login: (token: string) => void
  logout: () => void
}