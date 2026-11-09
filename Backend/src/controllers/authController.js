import { AUTH_COOKIE_NAME, getAuthCookieOptions } from '../config/auth.js'
import { authenticateUser, registerUser, serializeUser } from '../services/authService.js'

export async function register(request, response) {
  const user = await registerUser(request.body)
  response.status(201).json({
    success: true,
    message: 'Registration successful. Log in to access your account.',
    data: { user },
  })
}

export async function login(request, response) {
  const { user, token } = await authenticateUser(request.body)
  response.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions(true))
  response.json({ success: true, message: 'Login successful.', data: { user } })
}

export function currentUser(request, response) {
  response.json({ success: true, data: { user: serializeUser(request.user) } })
}

export function logout(_request, response) {
  response.clearCookie(AUTH_COOKIE_NAME, getAuthCookieOptions())
  response.json({ success: true, message: 'Logged out successfully.' })
}
