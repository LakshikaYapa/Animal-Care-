const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

async function authRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(result.message || 'The request could not be completed.')
    error.status = response.status
    error.validationErrors = Array.isArray(result.errors) ? result.errors : []
    throw error
  }

  return result.data
}

export async function registerAccount(account) {
  return authRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(account),
  })
}

export async function loginAccount(credentials) {
  return authRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function getCurrentUser() {
  return authRequest('/auth/me')
}

export async function logoutAccount() {
  return authRequest('/auth/logout', { method: 'POST' })
}
