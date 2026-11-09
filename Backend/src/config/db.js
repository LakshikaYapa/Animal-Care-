import { setServers } from 'node:dns'
import mongoose from 'mongoose'

// Use public DNS resolvers before Mongoose performs an Atlas SRV lookup.
setServers(['8.8.8.8', '8.8.4.4'])

function redactConnectionDetails(message, uri) {
  let safeMessage = String(message ?? '').replace(
    /mongodb(?:\+srv)?:\/\/[^\s"'<>]+/gi,
    '[REDACTED_MONGODB_URI]',
  )

  try {
    const parsedUri = new URL(uri)
    const secrets = [parsedUri.username, parsedUri.password]
      .filter(Boolean)
      .flatMap((value) => {
        try {
          return [value, decodeURIComponent(value)]
        } catch {
          return [value]
        }
      })

    for (const secret of secrets) {
      safeMessage = safeMessage.replaceAll(secret, '[REDACTED]')
    }
  } catch {
    // URI validation errors are logged without ever printing the URI itself.
  }

  return safeMessage
}

function logConnectionError(error, uri) {
  const reason = error.reason
  console.error(`[MongoDB] ${error.name || 'ConnectionError'}: ${redactConnectionDetails(error.message, uri)}`)

  if (!reason?.servers) return

  if (reason.type) console.error(`[MongoDB] Topology type: ${reason.type}`)

  for (const [address, server] of reason.servers) {
    const serverError = server.error
    if (serverError) {
      console.error(`[MongoDB] Server ${address}: ${serverError.name || 'ServerError'}: ${redactConnectionDetails(serverError.message, uri)}`)
    } else {
      console.error(`[MongoDB] Server ${address}: ${server.type || 'No server error details available'}`)
    }
  }
}

/** Connect to MongoDB when a URI is configured. */
export async function connectDatabase(uri = process.env.MONGODB_URI) {
  if (!uri) {
    console.warn('MONGODB_URI is not set. Starting without a database connection.')
    return false
  }

  const serverSelectionTimeoutMS = process.env.NODE_ENV === 'development' ? 10_000 : 30_000

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS })
  } catch (error) {
    logConnectionError(error, uri)
    throw error
  }

  console.log('Connected to MongoDB.')
  return true
}
