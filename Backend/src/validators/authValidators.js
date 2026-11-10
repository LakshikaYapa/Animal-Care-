import { body } from 'express-validator'

const allowedRoles = new Set(['adopter', 'volunteer', 'funder', 'staff'])
const profileFields = {
  adopter: new Set(['address']),
  volunteer: new Set(['address']),
  funder: new Set(['funderType', 'organizationName', 'phone']),
  staff: new Set(['staffId']),
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function validateProfiles(profiles, { req }) {
  const roles = req.body?.roles
  if (!isPlainObject(profiles)) throw new Error('Profiles must be an object keyed by selected role.')
  if (!Array.isArray(roles) || roles.some((role) => !allowedRoles.has(role))) return true

  for (const role of roles) {
    const profile = profiles[role]
    if (!isPlainObject(profile)) throw new Error(`A ${role} profile is required.`)
    if (Object.keys(profile).some((field) => !profileFields[role].has(field))) {
      throw new Error(`The ${role} profile contains an unsupported field.`)
    }

    if (role === 'adopter' || role === 'volunteer') {
      if (typeof profile.address !== 'string' || !profile.address.trim() || profile.address.trim().length > 500) {
        throw new Error(`${role} address is required and must be 500 characters or fewer.`)
      }
    }

    if (role === 'funder') {
      if (!['individual', 'organization'].includes(profile.funderType)) {
        throw new Error('Funder type must be individual or organization.')
      }
      if (profile.funderType === 'organization' && (typeof profile.organizationName !== 'string' || !profile.organizationName.trim())) {
        throw new Error('Organization name is required for organization funders.')
      }
      if (typeof profile.organizationName === 'string' && profile.organizationName.trim().length > 200) {
        throw new Error('Organization name must be 200 characters or fewer.')
      }
      if (profile.phone !== undefined && (typeof profile.phone !== 'string' || profile.phone.length > 40)) {
        throw new Error('Phone number must be 40 characters or fewer.')
      }
    }

    if (role === 'staff' && (typeof profile.staffId !== 'string' || !profile.staffId.trim() || profile.staffId.trim().length > 50)) {
      throw new Error('Staff ID is required and must be 50 characters or fewer.')
    }
  }

  if (Object.keys(profiles).some((role) => !roles.includes(role))) {
    throw new Error('A profile was supplied for a role that was not selected.')
  }

  return true
}

export const registerValidator = [
  body().custom((_value, { req }) => isPlainObject(req.body)).withMessage('Request body must be a JSON object.'),
  body('fullName').isString().withMessage('Full name is required.').bail().trim().notEmpty().withMessage('Full name is required.').isLength({ max: 150 }).withMessage('Full name must be 150 characters or fewer.'),
  body('email').isString().withMessage('A valid email address is required.').bail().trim().isEmail().withMessage('A valid email address is required.').customSanitizer((value) => value.toLowerCase()).isLength({ max: 254 }).withMessage('Email address must be 254 characters or fewer.'),
  body('password').isString().withMessage('Password is required.').bail().notEmpty().withMessage('Password is required.').custom((value) => Buffer.byteLength(value, 'utf8') <= 72).withMessage('Password must be 72 UTF-8 bytes or fewer.'),
  body('confirmPassword').isString().withMessage('Password confirmation is required.').bail().custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.'),
  body('roles').isArray({ min: 1 }).withMessage('Select at least one role.').bail().custom((roles) => roles.every((role) => allowedRoles.has(role)) && new Set(roles).size === roles.length).withMessage('Roles must be valid and unique.'),
  body('profiles').custom(validateProfiles),
]

export const loginValidator = [
  body().custom((_value, { req }) => isPlainObject(req.body)).withMessage('Request body must be a JSON object.'),
  body('identifier').isString().withMessage('Email or staff ID is required.').bail().trim().notEmpty().withMessage('Email or staff ID is required.').isLength({ max: 254 }).withMessage('Identifier is too long.'),
  body('password').isString().withMessage('Password is required.').bail().notEmpty().withMessage('Password is required.'),
]
