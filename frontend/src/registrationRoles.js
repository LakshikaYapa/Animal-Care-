export const registrationRoles = [
  { value: 'volunteer', label: 'Volunteer', description: 'Give your time and skills to help animals.' },
  { value: 'adopter', label: 'Adopter', description: 'Give an animal a loving place to call home.' },
  { value: 'funder', label: 'Funder', description: 'Support animal care through financial contributions.' },
  { value: 'staff', label: 'Staff Member', description: 'Register as an existing member of the animal care team.' },
]

export function selectedRolesFromHash(hash) {
  const requested = new URLSearchParams(hash.split('?')[1]).get('roles')?.split(',') || []
  return registrationRoles.filter((role) => requested.includes(role.value))
}
