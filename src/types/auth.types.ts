import type { User } from './user.types'
import type { ResponseApi } from './utils.types'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
