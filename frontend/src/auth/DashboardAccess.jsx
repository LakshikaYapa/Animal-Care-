import { useEffect } from 'react'
import { useAuth } from './AuthContext.js'
import { dashboardForUser } from './dashboard.js'

export default function DashboardAccess({ page, children }) {
  const { user, isLoading } = useAuth()
  const destination = user ? dashboardForUser(user) : '#login'

  useEffect(() => {
    if (!isLoading && destination && destination !== page) window.location.replace(destination)
  }, [destination, isLoading, page])

  if (isLoading) return <p className="p-8" role="status">Checking your account…</p>
  if (!destination) return <p className="p-8" role="alert">Your account does not have dashboard access. Please contact the Animal Care team.</p>
  if (destination !== page) return <p className="p-8" role="status">Taking you to your page…</p>
  return children
}
