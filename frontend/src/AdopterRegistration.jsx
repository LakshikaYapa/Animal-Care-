import { useState } from 'react'

export default function AdopterRegistration() {
  const [adopter, setAdopter] = useState({ fullName: '', address: '', email: '', password: '', confirmPassword: '' })

  const [confirmationTouched, setConfirmationTouched] = useState(false)
  const passwordsMismatch = confirmationTouched && adopter.password !== adopter.confirmPassword

  function updateAdopter(event) {
    const { name, value } = event.target
    setAdopter((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <main className="flex min-h-svh flex-col px-[4%] py-4">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#register">Back to roles</a>
      </header>
      <section className="mx-auto mt-4 grid w-full max-w-[1120px] flex-1 overflow-hidden rounded-3xl border border-[#dce4d8] bg-white  lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.6fr)]" aria-labelledby="adopter-title">
        <aside className="relative isolate min-h-[320px] overflow-hidden bg-[#34503c] lg:min-h-0" aria-label="Give a shelter dog a home">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/media/adopter-care.jpg" alt="A shelter dog looking through kennel bars with its paws resting on a rail" width={425} height={640} />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291bf2] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-white">
            <p className="text-[11px] font-bold tracking-[2.5px] text-[#d7edaa]">A NEW HOME. A NEW BEGINNING.</p>
            <p className="mt-4 text-[36px] leading-[1.15] font-medium tracking-[-1px]">Open your heart.<br />Change a life.</p>
          </div>
        </aside>
        <div className="min-w-0 p-5 lg:p-6">
        <p className="text-[11px] font-bold tracking-[2.5px]">JOIN AS AN ADOPTER</p>
        <h1 className="my-3 text-[clamp(26px,2.5vw,34px)] leading-[1.15] font-medium tracking-[-1px]" id="adopter-title">Adopter registration</h1>
        <p className="text-sm leading-relaxed text-[#52655c]">Tell us about yourself and take the first step toward giving an animal a loving home.</p>
          <fieldset className="mt-4 grid gap-3 border-t border-[#dce4d8] pt-3 sm:grid-cols-2">
            <legend className="px-2 text-xl font-medium">Adopter registration</legend>
            <p className="text-sm text-[#52655c] sm:col-span-2">All fields are required.</p>
            <label className="grid content-start gap-1 text-sm font-medium" htmlFor="adopter-name">
              Full name
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="adopter-name" name="fullName" type="text" autoComplete="name" maxLength={150} required value={adopter.fullName} onChange={updateAdopter} />
            </label>
            <label className="grid content-start gap-1 text-sm font-medium" htmlFor="adopter-address">
              Address
              <textarea className="min-h-20 w-full resize-y rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="adopter-address" name="address" autoComplete="street-address" rows={2} maxLength={500} required value={adopter.address} onChange={updateAdopter} />
            </label>
            <label className="grid content-start gap-1 text-sm font-medium" htmlFor="adopter-email">
              Email address
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="adopter-email" name="email" type="email" autoComplete="email" maxLength={254} required value={adopter.email} onChange={updateAdopter} />
            </label>
            {[
              { name: 'password', label: 'Password' },
              { name: 'confirmPassword', label: 'Confirm password' },
            ].map((field) => (
              <label className={`grid content-start gap-1 text-sm font-medium ${field.name === 'password' ? 'sm:col-start-1' : ''}`} htmlFor={`adopter-${field.name}`} key={field.name}>
                {field.label}
                <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844] aria-invalid:border-red-600" id={`adopter-${field.name}`} name={field.name} type="password" autoComplete="new-password" required value={adopter[field.name]} onChange={updateAdopter} onBlur={field.name === 'confirmPassword' ? () => setConfirmationTouched(true) : undefined} aria-invalid={field.name === 'confirmPassword' && passwordsMismatch ? true : undefined} aria-describedby={field.name === 'confirmPassword' && passwordsMismatch ? 'adopter-password-error' : undefined} />
              </label>
            ))}
            {passwordsMismatch && <p className="text-sm text-red-700 sm:col-span-2" id="adopter-password-error" role="alert">Passwords do not match.</p>}
          </fieldset>
        </div>
      </section>
    </main>
  )
}
