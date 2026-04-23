import { createContext, useState } from 'react'
import type { AuthContextType } from '~/types/context.types'

const initialAuthContext: AuthContextType = {
  isAuthenticated: Boolean(localStorage.getItem('access_token')),
  setIsAuthenticated: () => null
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated)

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
}
