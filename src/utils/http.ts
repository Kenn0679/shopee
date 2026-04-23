import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { refreshToken } from '~/apis/auth.api'
import type { AuthResponse } from '~/types/auth.types'
import { getAccessToken, removeAccessToken, saveAccessToken } from './auth'

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

        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data.access_token
          saveAccessToken(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          removeAccessToken()
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
