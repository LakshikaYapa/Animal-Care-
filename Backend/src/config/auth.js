export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'pawcare_token'

export function getAuthCookieOptions(includeMaxAge = false) {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  }

  if (includeMaxAge) options.maxAge = 7 * 24 * 60 * 60 * 1000
  return options
}
