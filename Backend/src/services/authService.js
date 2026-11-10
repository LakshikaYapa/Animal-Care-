import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import ApiError from '../middleware/ApiError.js'
import ApprovedStaffId from '../models/ApprovedStaffId.js'
import User from '../models/User.js'

const BCRYPT_ROUNDS = 12
const TOKEN_LIFETIME = process.env.JWT_EXPIRES_IN || '7d'

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new ApiError(500, 'Authentication is not configured. Set a JWT_SECRET of at least 32 characters.')
  }
  return secret
}

export function serializeUser(user) {
  const userObject = typeof user.toObject === 'function' ? user.toObject() : user
  const profiles = {}
  for (const role of userObject.roles) {
    if (userObject.profiles?.[role]) profiles[role] = userObject.profiles[role]
  }

  return {
    id: String(userObject._id),
    fullName: userObject.fullName,
    email: userObject.email,
    roles: userObject.roles,
    profiles,
    createdAt: userObject.createdAt,
  }
}

function isDuplicateEmailError(error) {
  return error?.code === 11000 && (error.keyPattern?.email || error.keyValue?.email)
}

export async function registerUser({ fullName, email, password, roles, profiles }) {
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
  const normalizedProfiles = {}

  for (const role of roles) {
    const profile = profiles[role]
    if (role === 'adopter' || role === 'volunteer') {
      normalizedProfiles[role] = { address: profile.address.trim() }
    } else if (role === 'funder') {
      normalizedProfiles.funder = {
        funderType: profile.funderType,
        ...(profile.organizationName?.trim() ? { organizationName: profile.organizationName.trim() } : {}),
        ...(profile.phone?.trim() ? { phone: profile.phone.trim() } : {}),
      }
    } else if (role === 'staff') {
      normalizedProfiles.staff = { staffId: profile.staffId.trim().toUpperCase() }
    }
  }

  const userData = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    roles,
    profiles: normalizedProfiles,
  }

  try {
    let user
    if (roles.includes('staff')) {
      const session = await mongoose.startSession()
      try {
        await session.withTransaction(async () => {
          const candidate = new User(userData)
          const claim = await ApprovedStaffId.updateOne(
            { staffId: normalizedProfiles.staff.staffId, active: true, claimedBy: null },
            { $set: { claimedBy: candidate._id } },
            { session },
          )

          if (claim.modifiedCount !== 1) {
            throw new ApiError(403, 'Staff ID is not approved or has already been used.')
          }

          await candidate.save({ session })
          user = candidate
        })
      } finally {
        await session.endSession()
      }
    } else {
      user = await User.create(userData)
    }

    return serializeUser(user)
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (isDuplicateEmailError(error)) throw new ApiError(409, 'An account with this email address already exists.')
    throw error
  }
}

export async function authenticateUser({ identifier, password }) {
  const trimmedIdentifier = identifier.trim()
  const query = trimmedIdentifier.includes('@')
    ? { email: trimmedIdentifier.toLowerCase() }
    : { roles: 'staff', 'profiles.staff.staffId': trimmedIdentifier.toUpperCase() }

  const user = await User.findOne(query).select('+passwordHash')
  const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false

  if (!passwordMatches) throw new ApiError(401, 'Invalid email or staff ID and password.')

  const token = jwt.sign(
    { sub: String(user._id) },
    getJwtSecret(),
    { algorithm: 'HS256', expiresIn: TOKEN_LIFETIME },
  )

  return { user: serializeUser(user), token }
}

export function getVerifiedUserId(token) {
  const payload = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] })
  if (!payload || typeof payload !== 'object' || typeof payload.sub !== 'string') {
    throw new ApiError(401, 'Authentication is required.')
  }
  return payload.sub
}

export async function getUserById(id) {
  return User.findById(id)
}
