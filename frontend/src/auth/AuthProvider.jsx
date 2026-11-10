import { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginAccount, logoutAccount } from '../api/auth.js'
import { AuthContext } from './AuthContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    getCurrentUser()
      .then(({ user: currentUser }) => {
        if (mounted) setUser(currentUser)
      })
      .catch(() => {
        if (mounted) setUser(null)
      })
      .finally(() => {
        if (mounted) setIsLoading(false)
      })

    return () => { mounted = false }
  }, [])

  async function login(credentials) {
    const { user: authenticatedUser } = await loginAccount(credentials)
    setUser(authenticatedUser)
    return authenticatedUser
  }

  async function logout() {
    await logoutAccount()
    setUser(null)
  }

  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
