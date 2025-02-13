import Cookies from 'js-cookie'
import { COOKIE_KEYS } from './authConstants'
import { CookieOptions } from '../types/IAuthTypes'

const isProduction = import.meta.env.PROD

const getCookieOptions = (expiresInDays: number = 1): CookieOptions => ({
  expires: expiresInDays,
  secure: isProduction,
  sameSite: isProduction ? 'Strict' : 'Lax',
  path: '/'
})

export const cookieManager = {
  setAuthCookie: (token: string, expiresInDays?: number) => {
    const options = getCookieOptions(expiresInDays)
    Cookies.set(COOKIE_KEYS.AUTH.LOGGED_IN, 'true', options)
    Cookies.set(COOKIE_KEYS.AUTH.ACCESS_TOKEN, token, options)
  },

  clearAuthCookies: () => {
    Cookies.remove(COOKIE_KEYS.AUTH.LOGGED_IN)
    Cookies.remove(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
  },

  getStoredToken: () => Cookies.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
}