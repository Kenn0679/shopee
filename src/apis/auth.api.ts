import endpoints from '~/constants/endpoints'
import type { AuthResponse } from '~/types/auth.types'
import http from '~/utils/http'

const AuthApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(endpoints.auth.register, body)
  },
  loginAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>(endpoints.auth.login, body)
  },
  logoutAccount: () => {
    return http.post(endpoints.auth.logout)
  },
  refreshToken: (refreshToken: string) => {
    return http.post(endpoints.auth.refreshToken, { refreshToken })
  }
}

export default AuthApi
