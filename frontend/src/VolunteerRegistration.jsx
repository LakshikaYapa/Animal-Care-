import { useState } from 'react'

export default function VolunteerRegistration() {
  const [volunteer, setVolunteer] = useState({ fullName: '', address: '', email: '' })
  const [photoUnavailable, setPhotoUnavailable] = useState(false)

  function updateVolunteer(event) {
    const { name, value } = event.target
    setVolunteer((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <main className="min-h-svh px-[6%] pt-8 pb-16">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">??</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#register">Back to roles</a>
      </header>
      <section className="mx-auto mt-10 grid max-w-[1120px] overflow-hidden rounded-3xl border border-[#dce4d8] bg-white min-[601px]:mt-16 lg:grid-cols-[380px_minmax(0,1fr)]" aria-labelledby="volunteer-title">
        <aside className="relative isolate min-h-[320px] overflow-hidden bg-[#34503c] lg:min-h-[700px]" aria-label="Volunteering with animals">
          {!photoUnavailable && (
            <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_60%]" src="/media/volunteer-care.jpg" alt="A volunteer caring for dogs at an animal shelter" width={1080} height={1920} onError={() => setPhotoUnavailable(true)} />
          )}
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291bf2] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-white">
            <p className="text-[11px] font-bold tracking-[2.5px] text-[#d7edaa]">YOUR TIME. THEIR HAPPINESS.</p>
            <p className="mt-4 text-[36px] leading-[1.15] font-medium tracking-[-1px]">A little kindness.<br />A lasting difference.</p>
          </div>
        </aside>
        <div className="min-w-0 p-[clamp(24px,4vw,48px)]">
        <p className="text-[11px] font-bold tracking-[2.5px]">JOIN AS A VOLUNTEER</p>
        <h1 className="my-5 text-[clamp(30px,4vw,44px)] leading-[1.15] font-medium tracking-[-1px]" id="volunteer-title">Volunteer registration</h1>
        <p className="leading-[1.7] text-[#52655c]">Tell us about yourself and help us care for animals together.</p>
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
        </div>
      </section>
    </main>
  )
}
