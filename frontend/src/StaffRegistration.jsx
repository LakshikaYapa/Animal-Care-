import { useState } from 'react'

export default function StaffRegistration() {
  const [staff, setStaff] = useState({ fullName: '', staffId: '', email: '', password: '', confirmPassword: '' })

  const [confirmationTouched, setConfirmationTouched] = useState(false)
  const passwordsMismatch = confirmationTouched && staff.password !== staff.confirmPassword

  function updateStaff(event) {
    const { name, value } = event.target
    setStaff((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <main className="min-h-svh px-[6%] pt-8 pb-16">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#register">Back to roles</a>
      </header>
      <section className="mx-auto mt-10 grid max-w-[1120px] overflow-hidden rounded-3xl border border-[#dce4d8] bg-white min-[601px]:mt-16 lg:grid-cols-[380px_minmax(0,1fr)]" aria-labelledby="staff-title">
        <aside className="relative isolate min-h-[320px] overflow-hidden bg-[#34503c] lg:min-h-[700px]" aria-label="Our animal care team">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/media/staff-care.jpg" alt="Veterinary staff posing together with dogs outside their clinic" width={459} height={612} />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291bf2] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-white">
            <p className="text-[11px] font-bold tracking-[2.5px] text-[#d7edaa]">ONE TEAM. SHARED COMPASSION.</p>
            <p className="mt-4 text-[36px] leading-[1.15] font-medium tracking-[-1px]">Together we care.<br />Together we help.</p>
          </div>
        </aside>
        <div className="min-w-0 p-[clamp(24px,4vw,48px)]">
        <p className="text-[11px] font-bold tracking-[2.5px]">EXISTING STAFF MEMBERS</p>
        <h1 className="my-5 text-[clamp(30px,4vw,44px)] leading-[1.15] font-medium tracking-[-1px]" id="staff-title">Staff member registration</h1>
        <p className="leading-[1.7] text-[#52655c]">Already part of our animal care team? Register using your existing staff ID.</p>
          <fieldset className="mt-8 grid gap-5 border-t border-[#dce4d8] pt-6">
            <legend className="px-2 text-xl font-medium">Staff details</legend>
            <p className="text-sm text-[#52655c]">All fields are required.</p>
            {[
              { name: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name', maxLength: 150 },
              { name: 'staffId', label: 'Staff ID', type: 'text', autoComplete: 'username', maxLength: 50 },
              { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', maxLength: 254 },
              { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
              { name: 'confirmPassword', label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
            ].map((field) => (
              <label className="grid gap-2 text-sm font-medium" htmlFor={`staff-${field.name}`} key={field.name}>
                {field.label}
                <input className="w-full rounded-xl border border-[#b7c5b4] bg-white px-4 py-3 text-base font-normal focus:border-[#386844] focus:outline-2 focus:outline-offset-2 focus:outline-[#386844] aria-invalid:border-red-600" id={`staff-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} required value={staff[field.name]} onChange={updateStaff} onBlur={field.name === 'confirmPassword' ? () => setConfirmationTouched(true) : undefined} aria-invalid={field.name === 'confirmPassword' && passwordsMismatch ? true : undefined} aria-describedby={field.name === 'confirmPassword' && passwordsMismatch ? 'staff-password-error' : undefined} />
              </label>
            ))}
            {passwordsMismatch && <p className="text-sm text-red-700" id="staff-password-error" role="alert">Passwords do not match.</p>}
          </fieldset>
        </div>
      </section>
    </main>
  )
}
