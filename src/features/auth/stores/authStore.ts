import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { cookieManager } from '../utils'
import { AuthState, AuthUser } from '../types/IAuthTypes'

// Create the store
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  // Initialize auth state from cookies
  initialize: () => {
    try {
      const token = cookieManager.getStoredToken()
      if (token) {
        get().login(token)
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error)
      get().logout()
    }
  },

  setUser: (user) => set((state) => ({
    user: { ...state.user, ...user } as AuthUser
  })),

  setAccessToken: (token) => {
    set({ accessToken: token })
    if (token) {
      cookieManager.setAuthCookie(token)
    } else {
      cookieManager.clearAuthCookies()
    }
  },

  login: (token) => {
    try {
      const decoded = jwtDecode<AuthUser & { exp?: number }>(token)

      // Check token expiration
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        throw new Error('Token expired')
      }

      // Extract user data from token
      const user: AuthUser = {
        id: decoded.id,
        name: decoded.name || '',
        email: decoded.email || '',
        role: decoded.role || [],
        imageUrl: decoded.imageUrl || ''
      }

      set({
        user,
        accessToken: token,
        isAuthenticated: true
      })

      cookieManager.setAuthCookie(token)
    } catch (error) {
      console.error('Login failed:', error)
      get().logout()
      throw new Error('Invalid authentication token')
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false
    })
    cookieManager.clearAuthCookies()
  }
}))

// Hook for accessing auth state and actions
export const useAuth = () => useAuthStore();