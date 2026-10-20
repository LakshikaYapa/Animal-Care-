const roles = [
  { value: 'volunteer', label: 'Volunteer', description: 'Give your time and skills to help animals.' },
  { value: 'adopter', label: 'Adopter', description: 'Give an animal a loving place to call home.' },
  { value: 'funder', label: 'Funder', description: 'Support animal care through financial contributions.' },
  { value: 'staff', label: 'Staff Member', description: 'Register as an existing member of the animal care team.' },
]

export default function Registration() {
  return (
    <main className="min-h-svh px-[6%] pt-8 pb-16">
      <header className="flex items-center justify-between gap-6">
        <a className="text-xl font-bold tracking-[-1px] no-underline focus-visible:outline-[#386844] min-[601px]:text-2xl" href="#">Animal Care <span className="ml-2" aria-hidden="true">🐾</span></a>
        <a className="text-sm underline-offset-4 focus-visible:outline-[#386844]" href="#">Back to home</a>
      </header>
      <section className="mx-auto mt-10 grid max-w-[1120px] overflow-hidden rounded-3xl border border-[#dce4d8] bg-white min-[601px]:mt-16 lg:grid-cols-[340px_minmax(0,1fr)]" aria-labelledby="registration-title">
        <aside className="relative isolate min-h-[280px] overflow-hidden bg-[#34503c] lg:min-h-[640px]" aria-label="A happier world for animals">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/media/registration-dog.jpg" alt="Golden retriever outdoors" width={900} height={1200} />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#10291be6] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-8 pb-8 text-center text-white lg:pb-12">
            <p className="text-[clamp(28px,3vw,40px)] leading-[1.15] font-medium tracking-[-1px]">A happier<br />world for<br />every dog.</p>
            <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
              <span className="h-1 w-8 rounded-full bg-[#d7edaa]" />
              <span className="h-1 w-3 rounded-full bg-white/40" />
              <span className="h-1 w-3 rounded-full bg-white/40" />
            </div>
            <a className="mt-5 inline-block text-[10px] text-white/75 underline underline-offset-2" href="https://unsplash.com/photos/a-close-up-of-a-golden-retrievers-face-outdoors-wANqTQHVN7o" target="_blank" rel="noreferrer">Photo by Helena Lopes / Unsplash</a>
          </div>
        </aside>
        <div className="min-w-0 p-[clamp(24px,4vw,48px)]">
        <p className="text-[11px] font-bold tracking-[2.5px]">JOIN OUR COMMUNITY</p>
        <h1 className="my-5 text-[clamp(30px,4vw,44px)] leading-[1.15] font-medium tracking-[-1px]" id="registration-title">How would you like to help?</h1>
        <p className="leading-[1.7] text-[#52655c]">Start by choosing your role. Your registration questions will be tailored to the way you want to help.</p>
        <nav className="mt-7" aria-label="Choose your registration role">
          <h2 className="mb-4 font-bold">Choose your role</h2>
          <div className="grid grid-cols-1 gap-3.5 min-[601px]:grid-cols-2">
            {roles.map((option) => (
              <a className="flex items-start gap-3 rounded-[14px] border-2 border-[#e0e6dc] p-5 no-underline hover:border-[#90ad7b] hover:bg-[#f0f7e8] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#386844]" href={`#register/${option.value}`} key={option.value}>
                <span className="min-w-0 flex-1"><strong>{option.label}</strong><span className="mt-2 block text-sm leading-[1.6] text-[#52655c]">{option.description}</span></span>
                <span className="text-[#386844]" aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </nav>
        </div>
      </section>
    </main>
  )
}
