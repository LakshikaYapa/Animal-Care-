import ApiError from './ApiError.js'
import { getVerifiedUserId } from '../services/authService.js'
import { AUTH_COOKIE_NAME } from '../config/auth.js'
import { getUserById } from '../services/authService.js'

export async function authenticate(request, _response, next) {
  const token = request.cookies?.[AUTH_COOKIE_NAME]
  if (!token) return next(new ApiError(401, 'Authentication is required.'))

  try {
    const userId = getVerifiedUserId(token)
    const user = await getUserById(userId)
    if (!user) return next(new ApiError(401, 'Authentication is required.'))
    request.user = user
    return next()
  } catch (error) {
    if (error instanceof ApiError && error.statusCode !== 401) return next(error)
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' || error.statusCode === 401) {
      return next(new ApiError(401, 'Authentication is required.'))
    }
    return next(error)
  }
}
