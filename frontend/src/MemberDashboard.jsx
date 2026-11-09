import ThemeToggle from './ThemeToggle.jsx'

export default function MemberDashboard() {
  const waysToHelp = [
    { title: 'Adopt a companion', description: 'Give an animal a loving home and a fresh start.', symbol: '♡', label: 'Adopt' },
    { title: 'Give your time', description: 'Lend a helping hand and make brighter days possible.', symbol: '☀', label: 'Volunteer' },
    { title: 'Support their care', description: 'Help provide food, shelter, and medical care for animals in need.', symbol: '✧', label: 'Support' },
  ]

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

        <section className="pb-8" aria-labelledby="ways-to-help-title">
          <h2 className="text-xl font-bold tracking-tight" id="ways-to-help-title">Ways to help</h2>
          <p className="mt-2 text-sm text-[#52655c]">Find a way to make a difference, big or small.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {waysToHelp.map((way) => (
              <article key={way.label} className="rounded-2xl border border-[#18372e]/10 bg-white p-5 sm:p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4edda] text-2xl text-[#386844]" aria-hidden="true">{way.symbol}</span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#63833e]">{way.label}</p>
                <h3 className="mt-2 text-lg font-bold">{way.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#52655c]">{way.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
