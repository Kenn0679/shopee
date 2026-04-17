import endpoints from '~/constants/endpoints'
import type { AuthResponse } from '~/types/auth.types'
import http from '~/utils/http'

export const registerAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>(endpoints.auth.register, body)
}

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>(endpoints.auth.login, body)
}

export const logoutAccount = () => {
  return http.post(endpoints.auth.logout)
}

export const refreshToken = (refreshToken: string) => {
  return http.post(endpoints.auth.refreshToklen, { refreshToken })
}
