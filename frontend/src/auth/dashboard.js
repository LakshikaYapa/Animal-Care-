export function dashboardForUser(user) {
  const roles = Array.isArray(user?.roles) ? user.roles : []
  if (roles.includes('staff')) return '#staff/dashboard'
  if (roles.some((role) => ['adopter', 'volunteer', 'funder'].includes(role))) return '#dashboard'
  return null
}
