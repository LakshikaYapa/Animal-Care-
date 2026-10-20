import { useState } from 'react'

export default function AdopterRegistration() {
  const [adopter, setAdopter] = useState({ fullName: '', address: '', email: '' })

  function updateAdopter(event) {
    const { name, value } = event.target
    setAdopter((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <main className="min-h-svh px-[6%] pt-8 pb-16">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#register">Back to roles</a>
      </header>
      <section className="mx-auto mt-10 max-w-[720px] rounded-3xl border border-[#dce4d8] bg-white p-[clamp(24px,5vw,48px)] min-[601px]:mt-16" aria-labelledby="adopter-title">
        <p className="text-[11px] font-bold tracking-[2.5px]">JOIN AS AN ADOPTER</p>
        <h1 className="my-5 text-[clamp(30px,4vw,44px)] leading-[1.15] font-medium tracking-[-1px]" id="adopter-title">Adopter registration</h1>
        <p className="leading-[1.7] text-[#52655c]">Tell us about yourself and take the first step toward giving an animal a loving home.</p>
          <fieldset className="mt-8 grid gap-5 border-t border-[#dce4d8] pt-6">
            <legend className="px-2 text-xl font-medium">Adopter registration</legend>
            <p className="text-sm text-[#52655c]">All fields are required.</p>
            <label className="grid gap-2 text-sm font-medium" htmlFor="adopter-name">
              Full name
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="adopter-name" name="fullName" type="text" autoComplete="name" maxLength={150} required value={adopter.fullName} onChange={updateAdopter} />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="adopter-address">
              Address
              <textarea className="min-h-28 w-full resize-y rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="adopter-address" name="address" autoComplete="street-address" rows={3} maxLength={500} required value={adopter.address} onChange={updateAdopter} />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="adopter-email">
              Email address
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="adopter-email" name="email" type="email" autoComplete="email" maxLength={254} required value={adopter.email} onChange={updateAdopter} />
            </label>
          </fieldset>
      </section>
    </main>
  )
}
