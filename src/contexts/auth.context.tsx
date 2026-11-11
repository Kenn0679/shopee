import React, { createContext, useState } from 'react'
import type { AuthContextType } from '~/types/context.types'
import type { User } from '~/types/user.types'
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'

const initialAuthContext: AuthContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAuthContext.profile)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
