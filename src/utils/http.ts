import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { refreshToken } from '~/apis/auth.api'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

http.interceptors.response.use(undefined, async (error: AxiosError) => {
  if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
    const data: any | undefined = error.response?.data
    const message = data.message ?? error.message
    toast.error(message)
  }

  if (error.response?.status === 401) {
    await refreshToken(localStorage.getItem('refreshToken') || '')
    return http(error.config!)
  }
  throw error
})

export default http
