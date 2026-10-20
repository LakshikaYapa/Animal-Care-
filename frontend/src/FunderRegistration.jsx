import { useEffect, useRef, useState } from 'react'

export default function FunderRegistration() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (preference.matches) videoRef.current?.pause()
      else videoRef.current?.play().catch(() => {})
    }
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  function togglePlayback() {
    if (videoRef.current.paused) videoRef.current.play().catch(() => {})
    else videoRef.current.pause()
  }

  const [funder, setFunder] = useState({ fullName: '', email: '', password: '', confirmPassword: '', funderType: '', organizationName: '', phone: '' })

  const [confirmationTouched, setConfirmationTouched] = useState(false)
  const passwordsMismatch = confirmationTouched && funder.password !== funder.confirmPassword

  function updateFunder(event) {
    const { name, value } = event.target
    setFunder((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <main className="flex min-h-svh flex-col px-[4%] py-4">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#register">Back to roles</a>
      </header>
      <section className="mx-auto mt-4 grid w-full max-w-[1120px] flex-1 overflow-hidden rounded-3xl border border-[#dce4d8] bg-white  lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.6fr)]" aria-labelledby="funder-title">
        <aside className="relative isolate min-h-[320px] overflow-hidden bg-[#34503c] lg:min-h-0" aria-label="Supporting a kinder future">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/media/funder-care.jpg" alt="A glass savings jar with coins against a pink background" width={1080} height={1920} />
          <video ref={videoRef} className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" muted loop playsInline preload="metadata" poster="/media/funder-care.jpg" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
            <source src="/media/funder-care.mp4" type="video/mp4" />
          </video>
          <button className="absolute top-5 right-5 cursor-pointer rounded-full border border-white/50 bg-black/40 px-4 py-2 text-xs text-white" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause funder background video' : 'Play funder background video'}>{playing ? 'Pause video' : 'Play video'}</button>
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291bf2] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-white">
            <p className="text-[11px] font-bold tracking-[2.5px] text-[#d7edaa]">YOUR SUPPORT. THEIR FUTURE.</p>
            <p className="mt-4 text-[36px] leading-[1.15] font-medium tracking-[-1px]">Give with kindness.<br />Help them thrive.</p>
          </div>
        </aside>
        <div className="min-w-0 p-5 lg:p-6">
        <p className="text-[11px] font-bold tracking-[2.5px]">SUPPORT ANIMAL CARE</p>
        <h1 className="my-3 text-[clamp(26px,2.5vw,34px)] leading-[1.15] font-medium tracking-[-1px]" id="funder-title">Funder registration</h1>
        <p className="text-sm leading-relaxed text-[#52655c]">Register as an individual or organization and help fund a brighter future for animals.</p>
          <fieldset className="mt-4 grid gap-3 border-t border-[#dce4d8] pt-3 sm:grid-cols-2">
            <legend className="px-2 text-xl font-medium">Funder details</legend>
            <p className="text-sm text-[#52655c] sm:col-span-2">All fields are required except phone number.</p>
            {[
              { name: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name', maxLength: 150 },
              { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', maxLength: 254 },
              { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
              { name: 'confirmPassword', label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
            ].map((field) => (
              <label className={`grid content-start gap-1 text-sm font-medium ${field.name === 'password' ? 'sm:col-start-1' : ''}`} htmlFor={`funder-${field.name}`} key={field.name}>
                {field.label}
                <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844] aria-invalid:border-red-600" id={`funder-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} required value={funder[field.name]} onChange={updateFunder} onBlur={field.name === 'confirmPassword' ? () => setConfirmationTouched(true) : undefined} aria-invalid={field.name === 'confirmPassword' && passwordsMismatch ? true : undefined} aria-describedby={field.name === 'confirmPassword' && passwordsMismatch ? 'funder-password-error' : undefined} />
              </label>
            ))}
            {passwordsMismatch && <p className="text-sm text-red-700 sm:col-span-2" id="funder-password-error" role="alert">Passwords do not match.</p>}
            <label className="grid content-start gap-1 text-sm font-medium" htmlFor="funder-type">
              Funder type
              <select className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="funder-type" name="funderType" required value={funder.funderType} onChange={updateFunder}>
                <option value="" disabled>Select funder type</option>
                <option value="individual">Individual</option>
                <option value="organization">Organization</option>
              </select>
            </label>
            {funder.funderType === 'organization' && (
              <label className="grid content-start gap-1 text-sm font-medium" htmlFor="funder-organization">
                Organization name
                <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="funder-organization" name="organizationName" type="text" autoComplete="organization" placeholder="Company / foundation name" maxLength={200} required value={funder.organizationName} onChange={updateFunder} />
              </label>
            )}
            <label className="grid content-start gap-1 text-sm font-medium" htmlFor="funder-phone">
              Phone number (optional)
              <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-3 py-2 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="funder-phone" name="phone" type="tel" autoComplete="tel" placeholder="Contact number" maxLength={40} value={funder.phone} onChange={updateFunder} />
            </label>
          </fieldset>
        </div>
      </section>
    </main>
  )
}
