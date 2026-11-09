import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { after, before, test } from 'node:test'
import mongoose from 'mongoose'
import request from 'supertest'
import 'dotenv/config'

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = randomBytes(48).toString('hex')

const [{ default: app }, { default: User }, { default: ApprovedStaffId }, { getAuthCookieOptions }] = await Promise.all([
  import('../src/app.js'),
  import('../src/models/User.js'),
  import('../src/models/ApprovedStaffId.js'),
  import('../src/config/auth.js'),
])

let testDatabaseName

function getIsolatedTestUri() {
  const configuredUri = process.env.TEST_MONGODB_URI || process.env.MONGODB_URI
  if (!configuredUri) throw new Error('Set MONGODB_URI or TEST_MONGODB_URI to run API integration tests.')

  const uri = new URL(configuredUri)
  testDatabaseName = `pawcare_auth_test_${process.pid}_${Date.now()}`
  uri.pathname = `/${testDatabaseName}`
  return uri.toString()
}

before(async () => {
  await import('../src/config/db.js')
  await mongoose.connect(getIsolatedTestUri(), { serverSelectionTimeoutMS: 10_000 })
  await Promise.all([User.init(), ApprovedStaffId.init()])
})

after(async () => {
  try {
    if (mongoose.connection.readyState === 1 && testDatabaseName) {
      await Promise.all([User.deleteMany({}), ApprovedStaffId.deleteMany({})])
      try {
        await mongoose.connection.dropDatabase()
      } catch (error) {
        console.warn(`Test data was cleared; temporary database removal was unavailable (${error.name}).`)
      }
    }
  } finally {
    await mongoose.disconnect()
  }
})

function adopterRegistration(email = 'adopter@example.com') {
  return {
    fullName: 'PawCare Test User',
    email,
    password: 'safe test password',
    confirmPassword: 'safe test password',
    roles: ['adopter'],
    profiles: { adopter: { address: '10 Test Street' } },
  }
}

function staffRegistration(email = 'staff@example.com', staffId = 'PAW-STAFF-010') {
  return {
    fullName: 'PawCare Staff User',
    email,
    password: 'safe staff password',
    confirmPassword: 'safe staff password',
    roles: ['staff'],
    profiles: { staff: { staffId } },
  }
}

test('registration validates input, prevents duplicate email, and stores only a password hash', async () => {
  const registration = {
    ...adopterRegistration(),
    roles: ['adopter', 'funder'],
    profiles: {
      adopter: { address: '10 Test Street' },
      funder: { funderType: 'organization', organizationName: 'PawCare Test Foundation', phone: '' },
    },
  }
  const created = await request(app).post('/api/auth/register').send(registration)
  assert.equal(created.status, 201)
  assert.equal(created.body.data.user.email, registration.email)
  assert.deepEqual(created.body.data.user.roles, ['adopter', 'funder'])
  assert.equal('password' in created.body.data.user, false)
  assert.equal('passwordHash' in created.body.data.user, false)

  const storedUser = await User.findOne({ email: registration.email }).select('+passwordHash')
  assert.notEqual(storedUser.passwordHash, registration.password)
  assert.equal(await (await import('bcrypt')).default.compare(registration.password, storedUser.passwordHash), true)

  const duplicate = await request(app).post('/api/auth/register').send(registration)
  assert.equal(duplicate.status, 409)

  const invalid = await request(app).post('/api/auth/register').send({ ...adopterRegistration('invalid@example.com'), email: 'not-an-email' })
  assert.equal(invalid.status, 400)
  assert.equal(invalid.body.success, false)

  const invalidBody = await request(app).post('/api/auth/register').set('Content-Type', 'application/json').send('null')
  assert.equal(invalidBody.status, 400)
})

test('staff registration rejects unapproved IDs and claims an approved ID once', async () => {
  const rejected = await request(app).post('/api/auth/register').send(staffRegistration('unapproved@example.com', 'NOT-APPROVED'))
  assert.equal(rejected.status, 403)

  await ApprovedStaffId.create({ staffId: 'PAW-STAFF-010' })
  const created = await request(app).post('/api/auth/register').send(staffRegistration())
  assert.equal(created.status, 201)

  const approved = await ApprovedStaffId.findOne({ staffId: 'PAW-STAFF-010' })
  assert.equal(String(approved.claimedBy), created.body.data.user.id)

  const secondUse = await request(app).post('/api/auth/register').send(staffRegistration('another-staff@example.com'))
  assert.equal(secondUse.status, 403)
})

test('login accepts email or approved staff ID and rejects unknown users and wrong passwords', async () => {
  const emailLogin = await request(app).post('/api/auth/login').send({ identifier: 'adopter@example.com', password: 'safe test password' })
  assert.equal(emailLogin.status, 200)
  assert.match(emailLogin.headers['set-cookie'][0], /pawcare_token=.*HttpOnly/i)

  const staffLogin = await request(app).post('/api/auth/login').send({ identifier: 'paw-staff-010', password: 'safe staff password' })
  assert.equal(staffLogin.status, 200)
  assert.deepEqual(staffLogin.body.data.user.roles, ['staff'])

  const wrongPassword = await request(app).post('/api/auth/login').send({ identifier: 'adopter@example.com', password: 'wrong password' })
  assert.equal(wrongPassword.status, 401)

  const unknownUser = await request(app).post('/api/auth/login').send({ identifier: 'missing@example.com', password: 'some password' })
  assert.equal(unknownUser.status, 401)
})

test('profile requires a valid cookie, returns a safe user, and logout clears the cookie', async () => {
  const unauthenticated = await request(app).get('/api/auth/me')
  assert.equal(unauthenticated.status, 401)

  const login = await request(app).post('/api/auth/login').send({ identifier: 'adopter@example.com', password: 'safe test password' })
  const cookie = login.headers['set-cookie'][0].split(';')[0]
  const profile = await request(app).get('/api/auth/me').set('Cookie', cookie)
  assert.equal(profile.status, 200)
  assert.equal(profile.body.data.user.email, 'adopter@example.com')
  assert.equal('passwordHash' in profile.body.data.user, false)

  const logout = await request(app).post('/api/auth/logout').set('Cookie', cookie)
  assert.equal(logout.status, 200)
  assert.match(logout.headers['set-cookie'][0], /pawcare_token=.*Expires=Thu, 01 Jan 1970/i)
})

test('authentication cookie is HTTP-only and secure in production', () => {
  const developmentOptions = getAuthCookieOptions(true)
  assert.equal(developmentOptions.httpOnly, true)
  assert.equal(developmentOptions.secure, false)
  assert.equal(developmentOptions.sameSite, 'lax')
  assert.equal(developmentOptions.maxAge, 7 * 24 * 60 * 60 * 1000)

  process.env.NODE_ENV = 'production'
  try {
    assert.equal(getAuthCookieOptions().secure, true)
  } finally {
    process.env.NODE_ENV = 'test'
  }
})
