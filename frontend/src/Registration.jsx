import ThemeToggle from './ThemeToggle.jsx'
import { useState } from 'react'
import { registrationRoles as roles, selectedRolesFromHash } from './registrationRoles.js'

export default function Registration() {
  const [selectedRoles, setSelectedRoles] = useState(() => selectedRolesFromHash(window.location.hash).map((role) => role.value))

  function toggleRole(value) {
    setSelectedRoles((previous) => previous.includes(value) ? previous.filter((role) => role !== value) : [...previous, value])
  }

  return (
    <main className="flex min-h-svh flex-col px-[4%] py-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <a className="text-xl font-bold tracking-[-1px] no-underline focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">🐾</span></a>
        <div className="flex items-center gap-3 sm:gap-5">
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#">Back to home</a>
          <ThemeToggle />
        </div>
      </header>
      <section className="mx-auto mt-4 grid w-full max-w-280 flex-1 overflow-hidden rounded-3xl border border-[#dce4d8] bg-white  lg:grid-cols-[340px_minmax(0,1fr)]" aria-labelledby="registration-title">
        <aside className="relative isolate min-h-70 overflow-hidden bg-[#34503c] lg:min-h-0" aria-label="A happier world for animals">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/media/registration-dog.jpg" alt="Golden retriever outdoors" width={900} height={1200} />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291be6] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-8 text-center text-white lg:pb-12">
            <p className="text-[clamp(28px,3vw,40px)] leading-[1.15] font-medium tracking-[-1px]">A happier<br />world for<br />every dog.</p>
            <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
              <span className="h-1 w-8 rounded-full bg-[#d7edaa]" />
              <span className="h-1 w-3 rounded-full bg-white/40" />
              <span className="h-1 w-3 rounded-full bg-white/40" />
            </div>
          </div>
        </aside>
        <div className="min-w-0 p-5 lg:p-6">
        <h1 className="my-3 text-[clamp(26px,2.5vw,34px)] leading-[1.15] font-medium tracking-[-1px]" id="registration-title">How would you like to help?</h1>
        <p className="text-sm leading-relaxed text-[#52655c]">Choose one or more roles. You can provide details for each selected role on the next page.</p>
        <fieldset className="mt-4">
          <legend className="mb-4 font-bold">Choose your roles</legend>
          <div className="grid grid-cols-1 gap-3.5 min-[601px]:grid-cols-2">
            {roles.map((option) => (
              <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border-2 border-[#e0e6dc] p-4 hover:border-[#90ad7b] hover:bg-[#f0f7e8] has-checked:border-[#90ad7b] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-[#386844]" key={option.value}>
                <input className="mt-1 h-4 w-4 shrink-0 accent-[#386844]" type="checkbox" name="roles" value={option.value} checked={selectedRoles.includes(option.value)} onChange={() => toggleRole(option.value)} />
                <span className="min-w-0 flex-1"><strong>{option.label}</strong><span className="mt-2 block text-sm leading-[1.6] text-[#52655c]">{option.description}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <p className="mt-4 text-sm text-[#52655c]" role="status">{selectedRoles.length ? `${selectedRoles.length} role${selectedRoles.length === 1 ? '' : 's'} selected` : 'Select at least one role to continue.'}</p>
        <button className="mt-4 rounded-full bg-[#d7edaa] px-6 py-3 text-sm font-bold text-[#18372e] enabled:cursor-pointer enabled:hover:bg-[#c6e493] disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={!selectedRoles.length} onClick={() => { window.location.hash = `register/details?roles=${roles.filter((role) => selectedRoles.includes(role.value)).map((role) => role.value).join(',')}` }}>Continue <span aria-hidden="true">&rarr;</span></button>
        <p className="mt-6 text-sm text-[#52655c]">Already have an account? <a className="font-bold text-[#386844] underline underline-offset-4 focus-visible:outline-[#386844]" href="#login">Log in</a></p>
        </div>
      </section>
    </main>
  )
}
