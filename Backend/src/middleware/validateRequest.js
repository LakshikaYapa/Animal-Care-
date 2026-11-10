import { validationResult } from 'express-validator'

export function validateRequest(request, response, next) {
  const result = validationResult(request)
  if (result.isEmpty()) return next()

  return response.status(400).json({
    success: false,
    message: 'Request validation failed.',
    errors: result.array().map(({ path, msg }) => ({ field: path, message: msg })),
  })
}
