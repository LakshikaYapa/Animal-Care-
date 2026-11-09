import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRegistrationPayload, sharedRegistrationDetailsMatch } from '../src/api/registration.js'

const roles = [
  { value: 'adopter' },
  { value: 'volunteer' },
  { value: 'funder' },
  { value: 'staff' },
]

const roleValues = {
  adopter: { fullName: 'Alex Paw', email: 'alex@example.com', password: 'sample-password', confirmPassword: 'sample-password', address: 'Adopter address' },
  volunteer: { fullName: 'Alex Paw', email: 'ALEX@example.com', password: 'sample-password', confirmPassword: 'sample-password', address: 'Volunteer address' },
  funder: { fullName: 'Alex Paw', email: 'alex@example.com', password: 'sample-password', confirmPassword: 'sample-password', funderType: 'organization', organizationName: 'PawCare Friends', phone: '' },
  staff: { fullName: 'Alex Paw', email: 'alex@example.com', password: 'sample-password', confirmPassword: 'sample-password', staffId: 'PAW-STAFF-010' },
}

test('one account payload contains all selected role profiles and shared credentials', () => {
  assert.equal(sharedRegistrationDetailsMatch(roles, roleValues), true)
  assert.deepEqual(createRegistrationPayload(roles, roleValues), {
    fullName: 'Alex Paw',
    email: 'alex@example.com',
    password: 'sample-password',
    confirmPassword: 'sample-password',
    roles: ['adopter', 'volunteer', 'funder', 'staff'],
    profiles: {
      adopter: { address: 'Adopter address' },
      volunteer: { address: 'Volunteer address' },
      funder: { funderType: 'organization', organizationName: 'PawCare Friends', phone: '' },
      staff: { staffId: 'PAW-STAFF-010' },
    },
  })
})

test('shared credentials must match across selected roles', () => {
  const changed = { ...roleValues, volunteer: { ...roleValues.volunteer, password: 'different-password' } }
  assert.equal(sharedRegistrationDetailsMatch(roles, changed), false)
})
