import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getCurrentUser, loginAccount, logoutAccount, registerAccount } from '../src/api/auth.js'

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

test('a disconnected backend returns a displayable error instead of crashing registration', async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch') }
  try {
    await assert.rejects(registerAccount({}), (error) => {
      assert.match(error.message, /backend is running/)
      assert.deepEqual(error.validationErrors, [])
      return true
    })
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('registration sends the API payload with credentialed JSON requests', async () => {
  const originalFetch = globalThis.fetch
  let captured
  globalThis.fetch = async (url, options) => {
    captured = { url, options }
    return jsonResponse({ success: true, data: { user: { id: '1' } } }, 201)
  }

  try {
    const result = await registerAccount({ email: 'alex@example.com', roles: ['adopter'] })
    assert.deepEqual(result.user, { id: '1' })
    assert.equal(captured.url, 'http://localhost:5000/api/auth/register')
    assert.equal(captured.options.method, 'POST')
    assert.equal(captured.options.credentials, 'include')
    assert.equal(captured.options.headers['Content-Type'], 'application/json')
    assert.deepEqual(JSON.parse(captured.options.body), { email: 'alex@example.com', roles: ['adopter'] })
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('login, current-user, and logout use the HTTP-only cookie through credentialed requests', async () => {
  const originalFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options })
    return jsonResponse({ success: true, data: { user: { id: '1' } } })
  }

  try {
    await loginAccount({ identifier: 'alex@example.com', password: 'example' })
    await getCurrentUser()
    await logoutAccount()
    assert.deepEqual(calls.map(({ url }) => url), [
      'http://localhost:5000/api/auth/login',
      'http://localhost:5000/api/auth/me',
      'http://localhost:5000/api/auth/logout',
    ])
    assert.ok(calls.every(({ options }) => options.credentials === 'include'))
    assert.equal(calls[1].options.method, undefined)
    assert.equal(calls[2].options.method, 'POST')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('backend validation errors are retained for display', async () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => jsonResponse({
    success: false,
    message: 'Request validation failed.',
    errors: [{ field: 'email', message: 'A valid email address is required.' }],
  }, 400)

  try {
    await assert.rejects(registerAccount({}), (error) => {
      assert.equal(error.status, 400)
      assert.equal(error.message, 'Request validation failed.')
      assert.deepEqual(error.validationErrors, [{ field: 'email', message: 'A valid email address is required.' }])
      return true
    })
  } finally {
    globalThis.fetch = originalFetch
  }
})
