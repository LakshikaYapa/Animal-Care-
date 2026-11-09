import ThemeToggle from './ThemeToggle.jsx'

export default function MemberDashboard() {
  return (
    <main className="min-h-svh px-4 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#18372e]/10 pb-5">
          <a className="flex items-center gap-3 rounded-lg focus-visible:outline-[#386844]" href="#" aria-label="Animal Care home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e4edda] text-xl" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span>
            <span>
              <span className="block text-xl font-bold tracking-tight">Animal Care</span>
              <span className="block text-xs text-[#52655c]">Member space</span>
            </span>
          </a>
          <ThemeToggle />
        </header>

        <section className="py-9 sm:py-12" aria-labelledby="member-dashboard-title">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#63833e]">YOUR ANIMAL CARE COMMUNITY</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" id="member-dashboard-title">A little kindness. A big difference.</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#52655c]">Adopt a new companion, volunteer your time, or support animal care. Every act of kindness makes a difference.</p>
        </section>
      </div>
    </main>
  )
}
