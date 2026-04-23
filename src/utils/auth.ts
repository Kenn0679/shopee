export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token) //nếu lưu vào cookies thì có thể bỏ qua vì cookies sẽ tự động gửi lên server khi có request
}

export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}
