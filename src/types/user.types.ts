type Role = 'Admin' | 'User'
export type User = {
  _id: number
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}
