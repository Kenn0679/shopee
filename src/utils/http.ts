import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { refreshToken } from '~/apis/auth.api'
import type { AuthResponse } from '~/types/auth.types'
import { getAccessToken, removeAuth, saveAccessToken, saveProfile } from './auth'
import endpoints from '~/constants/endpoints'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken //nếu sài cookies thì bỏ qua bước này vì cookies sẽ tự động gửi lên server khi có request
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    //response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url === endpoints.auth.login || url === endpoints.auth.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          saveAccessToken(this.accessToken)
          saveProfile(data.data.user)
        } else if (url === endpoints.auth.logout) {
          this.accessToken = ''
          removeAuth()
        }
        return response
      },
      async (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message ?? error.message
          toast.error(message)
        }

        if (error.response?.status === 401) {
          await refreshToken(localStorage.getItem('refreshToken') || '')
          return http(error.config!)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
