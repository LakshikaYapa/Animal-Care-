import { useState } from 'react'

const roles = [
  { value: 'volunteer', label: 'Volunteer', description: 'Give your time and skills to help animals.' },
  { value: 'adopter', label: 'Adopter', description: 'Give an animal a loving place to call home.' },
  { value: 'funder', label: 'Funder', description: 'Support animal care through financial contributions.' },
  { value: 'staff', label: 'Staff Member', description: 'Register as an existing member of the animal care team.' },
]

export default function Registration() {
  const [role, setRole] = useState('')
  const selectedRole = roles.find((option) => option.value === role)


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
          <a className="mt-6 inline-flex rounded-full bg-[#d7edaa] px-7 py-3 text-sm font-bold text-[#173a27] hover:bg-[#e7f7c8] focus-visible:outline-[#386844]" href="#register/volunteer">Continue as Volunteer ?</a>
        )}
      </section>
    </main>
  )
}
