export function sharedRegistrationDetailsMatch(roles, roleValues) {
  const firstValues = roleValues[roles[0]?.value]
  if (!firstValues) return false

  return roles.every(({ value }) => {
    const currentValues = roleValues[value]
    return currentValues
      && currentValues.fullName.trim() === firstValues.fullName.trim()
      && currentValues.email.trim().toLowerCase() === firstValues.email.trim().toLowerCase()
      && currentValues.password === firstValues.password
  })
}

export function createRegistrationPayload(roles, roleValues) {
  const primaryValues = roleValues[roles[0].value]
  const profiles = Object.fromEntries(roles.map(({ value }) => {
    const currentValues = roleValues[value]
    if (value === 'adopter' || value === 'volunteer') return [value, { address: currentValues.address }]
    if (value === 'funder') {
      return [value, {
        funderType: currentValues.funderType,
        organizationName: currentValues.organizationName,
        phone: currentValues.phone,
      }]
    }
    return [value, { staffId: currentValues.staffId }]
  }))

  return {
    fullName: primaryValues.fullName,
    email: primaryValues.email,
    password: primaryValues.password,
    confirmPassword: primaryValues.confirmPassword,
    roles: roles.map(({ value }) => value),
    profiles,
  }
}
