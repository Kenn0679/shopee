export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token) //nếu lưu vào cookies thì có thể bỏ qua vì cookies sẽ tự động gửi lên server khi có request
}

export const removeAuth = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const getProfile = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const saveProfile = (profile: any) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
