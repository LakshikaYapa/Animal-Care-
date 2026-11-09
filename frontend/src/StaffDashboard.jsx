import ThemeToggle from './ThemeToggle.jsx'

export default function StaffDashboard() {
  return (
    <main className="min-h-svh px-4 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#18372e]/10 pb-5">
          <a className="flex items-center gap-3 rounded-lg focus-visible:outline-[#386844]" href="#" aria-label="Animal Care home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e4edda] text-xl" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span>
            <span>
              <span className="block text-xl font-bold tracking-tight">Animal Care</span>
              <span className="block text-xs text-[#52655c]">Staff workspace</span>
            </span>
          </a>
          <ThemeToggle />
        </header>

        <section className="py-9 sm:py-12" aria-labelledby="staff-dashboard-title">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#63833e]">ANIMAL CARE TEAM</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" id="staff-dashboard-title">Staff Dashboard</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#52655c]">A shared space to coordinate animal care and support the people who make it possible.</p>
        </section>

        <section className="pb-8" aria-labelledby="quick-actions-title">
          <h2 className="text-lg font-bold" id="quick-actions-title">Quick actions</h2>
          <p className="mt-1 text-sm text-[#52655c]">Keep animal care, adoption requests, and volunteer support in view.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-[#18372e]/10 bg-white p-5 sm:p-6" aria-labelledby="animals-title">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4edda] text-[#386844]" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="7" cy="7" rx="2" ry="3" />
                  <ellipse cx="17" cy="7" rx="2" ry="3" />
                  <ellipse cx="3.5" cy="12" rx="1.5" ry="2" />
                  <ellipse cx="20.5" cy="12" rx="1.5" ry="2" />
                  <path d="M7 20c-3 0-3-4-1-5l3-3a4 4 0 0 1 6 0l3 3c2 1 2 5-1 5-2 0-3-1-5-1s-3 1-5 1Z" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold" id="animals-title">Animals</h3>
              <p className="mt-2 text-sm leading-6 text-[#52655c]">A place for animal profiles, care details, and adoption availability.</p>
              <p className="mt-5 text-xs font-medium text-[#63833e]">Coming soon</p>
            </article>
            <article className="rounded-2xl border border-[#18372e]/10 bg-white p-5 sm:p-6" aria-labelledby="requests-title">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4edda] text-[#386844]" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="4" width="14" height="18" rx="2" />
                  <rect x="9" y="2" width="6" height="4" rx="1" />
                  <path d="M9 11h6M9 15h6M9 19h3" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold" id="requests-title">Adoption requests</h3>
              <p className="mt-2 text-sm leading-6 text-[#52655c]">A place to review applications and follow each animal’s journey to a new home.</p>
              <p className="mt-5 text-xs font-medium text-[#63833e]">Coming soon</p>
            </article>
            <article className="rounded-2xl border border-[#18372e]/10 bg-white p-5 sm:p-6" aria-labelledby="volunteers-title">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4edda] text-[#386844]" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M21 21v-2a6 6 0 0 0-4-5.66" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold" id="volunteers-title">Volunteers</h3>
              <p className="mt-2 text-sm leading-6 text-[#52655c]">A place to coordinate volunteer shifts, assign care tasks, and support the team.</p>
              <p className="mt-5 text-xs font-medium text-[#63833e]">Coming soon</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
