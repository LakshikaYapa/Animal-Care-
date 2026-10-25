import { useState } from 'react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const identifier = form.elements.identifier
    if (!identifier.value.trim()) {
      identifier.setCustomValidity('Enter your staffID or email address.')
      identifier.reportValidity()
      return
    }
    setMessage('Sign-in is not available yet. Please try again once account sign-in has been connected.')
  }

  return (
    <main className="flex min-h-svh flex-col px-[4%] py-4">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">🐾</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#">Back to home</a>
      </header>
      <section className="mx-auto mt-4 grid w-full max-w-280 flex-1 overflow-hidden rounded-3xl border border-[#dce4d8] bg-white lg:grid-cols-2" aria-labelledby="login-title">
        <aside className="relative isolate min-h-64 overflow-hidden bg-[#34503c] lg:min-h-0">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/media/registration-dog.jpg" alt="Golden retriever outdoors" width={900} height={1200} />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291bf2] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-white">
            <p className="text-[11px] font-bold tracking-[2.5px] text-[#d7edaa]">A LITTLE CARE. A BETTER WORLD.</p>
            <p className="mt-4 text-[36px] leading-[1.15] font-medium tracking-[-1px]">Together, we make<br />a difference.</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
          <p className="text-[11px] font-bold tracking-[2.5px]">WELCOME BACK</p>
          <h1 className="my-3 text-[clamp(30px,3vw,40px)] leading-[1.15] font-medium tracking-[-1px]" id="login-title">Log in to Animal Care</h1>
          <p className="text-sm leading-relaxed text-[#52655c]">Continue your journey of caring for animals.</p>
          <form className="mt-8 grid gap-5" onSubmit={handleSubmit} onInput={() => setMessage('')}>
            <label className="grid gap-2 text-sm font-medium" htmlFor="login-identifier">
              Username or email
              <input className="w-full rounded-xl border border-[#b7c5b4] px-4 py-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="login-identifier" name="identifier" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} placeholder="Enter your username or email" required onChange={(event) => event.target.setCustomValidity('')} />
            </label>
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="login-password">Password</label>
              <div className="relative">
                <input className="w-full rounded-xl border border-[#b7c5b4] py-3 pr-20 pl-4 text-base focus:outline-2 focus:outline-offset-2 focus:outline-[#386844]" id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" required />
                <button className="absolute inset-y-0 right-2 my-1 cursor-pointer rounded-lg px-3 text-sm font-medium text-[#386844] focus-visible:outline-[#386844]" type="button" aria-controls="login-password" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>
            <button className="cursor-pointer rounded-full bg-[#d7edaa] px-6 py-3.5 text-sm font-bold text-[#173a27] hover:bg-[#c6e493] focus-visible:outline-[#386844]" type="submit">Log in</button>
            <p className="text-sm leading-relaxed text-[#52655c]" role="status">{message}</p>
          </form>
          <p className="mt-6 text-center text-sm text-[#52655c]">New to Animal Care? <a className="font-bold text-[#386844] underline underline-offset-4 focus-visible:outline-[#386844]" href="#register">Create an account</a></p>
        </div>
      </section>
    </main>
  )
}
