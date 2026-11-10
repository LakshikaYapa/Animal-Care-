import test from 'node:test'
import assert from 'node:assert/strict'
import { dashboardForUser } from '../src/auth/dashboard.js'

test('staff dashboard takes priority for staff with multiple roles', () => {
  assert.equal(dashboardForUser({ roles: ['staff'] }), '#staff/dashboard')
  assert.equal(dashboardForUser({ roles: ['adopter', 'staff', 'funder'] }), '#staff/dashboard')
})

test('each member role and multiple member roles use the shared dashboard', () => {
  for (const roles of [['adopter'], ['volunteer'], ['funder'], ['adopter', 'volunteer', 'funder']]) {
    assert.equal(dashboardForUser({ roles }), '#dashboard')
  }
})

test('missing, malformed or unknown roles do not grant dashboard access', () => {
  for (const user of [null, {}, { roles: [] }, { roles: 'staff' }, { roles: ['admin'] }]) {
    assert.equal(dashboardForUser(user), null)
  }
})
