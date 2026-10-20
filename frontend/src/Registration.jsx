import { useState } from 'react'

const roles = [
  { value: 'volunteer', label: 'Volunteer', description: 'Give your time and skills to help animals.' },
  { value: 'adopter', label: 'Adopter', description: 'Give an animal a loving place to call home.' },
  { value: 'funder', label: 'Funder', description: 'Support animal care through financial contributions.' },
  { value: 'staff', label: 'Staff Member', description: 'Register as an existing member of the animal care team.' },
]

export default function Registration() {
  const [role, setRole] = useState('')
  const [volunteer, setVolunteer] = useState({ fullName: '', address: '', email: '' })
  const selectedRole = roles.find((option) => option.value === role)

  function updateVolunteer(event) {
    const { name, value } = event.target
    setVolunteer((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <main className="min-h-svh px-[6%] pt-8 pb-16">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] no-underline focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">🐾</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#">Back to home</a>
      </header>
      <section className="mx-auto mt-10 max-w-[720px] rounded-3xl border border-[#dce4d8] bg-white p-[clamp(24px,5vw,48px)] min-[601px]:mt-16" aria-labelledby="registration-title">
        <p className="text-[11px] font-bold tracking-[2.5px]">JOIN OUR COMMUNITY</p>
        <h1 className="my-5 text-[clamp(30px,4vw,44px)] leading-[1.15] font-medium tracking-[-1px]" id="registration-title">How would you like to help?</h1>
        <p className="leading-[1.7] text-[#52655c]">Start by choosing your role. Your registration questions will be tailored to the way you want to help.</p>
        <fieldset className="mt-7 grid grid-cols-1 gap-3.5 border-0 p-0 min-[601px]:grid-cols-2">
          <legend className="mb-4 font-bold">Choose your role</legend>
          {roles.map((option) => (
            <label className={`flex cursor-pointer items-start gap-3 rounded-[14px] border-2 p-5 focus-within:outline-2 focus-within:outline-offset-[3px] focus-within:outline-[#386844] ${role === option.value ? 'border-[#386844] bg-[#f0f7e8]' : 'border-[#e0e6dc] hover:border-[#90ad7b]'}`} key={option.value}>
              <input className="mt-[3px] shrink-0 accent-[#386844]" type="radio" name="role" value={option.value} checked={role === option.value} onChange={(event) => setRole(event.target.value)} />
              <span><strong>{option.label}</strong><span className="mt-2 block text-sm leading-[1.6] text-[#52655c]">{option.description}</span></span>
            </label>
          ))}
        </fieldset>
        <p className="mt-6 text-sm text-[#386844]" role="status">{selectedRole ? `Selected role: ${selectedRole.label}` : 'Choose one role to get started.'}</p>
        {role === 'volunteer' && (
          <fieldset className="mt-8 grid gap-5 border-t border-[#dce4d8] pt-6">
            <legend className="px-2 text-xl font-medium">Volunteer registration</legend>
            <p className="text-sm text-[#52655c]">All fields are required.</p>
            <label className="grid gap-2 text-sm font-medium" htmlFor="volunteer-name">
              Full name
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="volunteer-name" name="fullName" type="text" autoComplete="name" maxLength={150} required value={volunteer.fullName} onChange={updateVolunteer} />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="volunteer-address">
              Address
              <textarea className="min-h-28 w-full resize-y rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="volunteer-address" name="address" autoComplete="street-address" rows={3} maxLength={500} required value={volunteer.address} onChange={updateVolunteer} />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="volunteer-email">
              Email address
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="volunteer-email" name="email" type="email" autoComplete="email" maxLength={254} required value={volunteer.email} onChange={updateVolunteer} />
            </label>
          </fieldset>
        )}
      </section>
    </main>
  )
}
