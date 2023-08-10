'use client'

import Apis from '@/shared/config/apis'
import ky from 'ky'
import { createContext, useContext, useEffect, useState } from 'react'

export const AuthStatuses = {
  unauthenticated: 'unauthenticated',
  authenticated: 'authenticated',
  loading: 'loading',
}

interface User {
  id: string
  name: string
  email: string
}

interface AuthInitialState {
  authStatus: string
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const authInitialState: AuthInitialState = {
  authStatus: AuthStatuses.loading,
  user: null,
  setUser: () => {},
  logout: () => {},
}

export const authContext = createContext(authInitialState)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState(AuthStatuses.loading)
  const [user, userSetter] = useState<User | null>(null)

  function setUser(user: User) {
    userSetter(user)
    setAuthStatus(AuthStatuses.authenticated)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as any
        setUser(parsedUser)
        setAuthStatus(AuthStatuses.authenticated)
      } catch (err) {
        console.log('Error', err)
      }
    } 
  }, [])

  async function logout() {
    try {
      const res: any = await ky
        .get(Apis.auth.logout, {
          credentials: 'include',
        })
        .json()
      userSetter(null)
      setAuthStatus(AuthStatuses.unauthenticated)
      localStorage.clear()
    } catch (error) {}
  }
  return (
    <authContext.Provider value={{ authStatus, user, setUser, logout }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => useContext(authContext)
