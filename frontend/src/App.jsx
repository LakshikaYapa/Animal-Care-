import { useEffect, useRef, useState } from 'react'
import Registration from './Registration.jsx'
import VolunteerRegistration from './VolunteerRegistration.jsx'
import AdopterRegistration from './AdopterRegistration.jsx'
import StaffRegistration from './StaffRegistration.jsx'
import FunderRegistration from './FunderRegistration.jsx'
import Login from './Login.jsx'

function App() {
  const [page, setPage] = useState(window.location.hash)

  useEffect(() => {
    const onNavigate = () => {
      setPage(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onNavigate)
    return () => window.removeEventListener('hashchange', onNavigate)
  }, [])

  if (page === '#login') return <Login />
  if (page === '#register/volunteer') return <VolunteerRegistration />
  if (page === '#register/adopter') return <AdopterRegistration />
  if (page === '#register/staff') return <StaffRegistration />
  if (page === '#register/funder') return <FunderRegistration />
  return page === '#register' ? <Registration /> : <Home />
}

function Home() {
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
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  const waysToHelp = [
    { role: 'adopter', title: 'Find your new best friend', description: 'Make room for a little more love.', image: 'adopter-care.jpg', label: 'Adopt', color: 'bg-[#f1e9dc]' },
    { role: 'volunteer', title: 'Show up. Make tails wag.', description: 'A little of your time goes a long way.', image: 'volunteer-care.jpg', label: 'Volunteer', color: 'bg-[#e6eddf]' },
    { role: 'funder', title: 'Help good things happen', description: 'Support the care every animal deserves.', image: 'funder-care.jpg', label: 'Support', color: 'bg-[#f4e5e5]' },
  ]

  return (
    <main className="w-full px-3 sm:px-5 lg:px-8">
      <header className="flex items-center justify-between gap-4 border-b border-[#18372e]/10 py-5">
        <a className="flex items-center gap-3 focus-visible:outline-[#386844]" href="#"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e4edda] text-xl" aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span><span><span className="block text-xl font-bold tracking-[-1px]">Animal Care</span><span className="block text-[9px] font-medium tracking-[2px] text-[#52655c]">KINDNESS IN ACTION</span></span></a>
        <nav className="flex items-center gap-5 text-sm" aria-label="Main navigation">
          <a className="hidden hover:underline focus-visible:outline-[#386844] sm:block" href="#get-started">Ways to help</a>
          <a className="hidden hover:underline focus-visible:outline-[#386844] md:block" href="#how-it-works">How it works</a>
          <a className="rounded-full bg-[#18372e] px-5 py-2.5 font-bold text-white hover:bg-[#386844] focus-visible:outline-[#386844]" href="#login">Log in <span aria-hidden="true">&#8599;</span></a>
        </nav>
      </header>
      <section className="relative isolate my-6 overflow-hidden rounded-[28px] bg-[#25432b] text-white sm:my-8" aria-labelledby="hero-title">
          <video ref={videoRef} className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_65%]" muted loop playsInline preload="metadata" poster="/media/hero-dog.jpg" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
            <source src="/media/hero-dog.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,30,18,0.85),rgba(9,30,18,0.5)_50%,rgba(9,30,18,0.12))]" />
        <div className="px-6 py-14 sm:px-10 sm:py-16">
          <p className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[2px] text-[#e2efcf]"><span className="h-2 w-2 rounded-full bg-[#d7edaa]" aria-hidden="true" /> LITTLE ACTS. HAPPY TAILS.</p>
          <h1 className="max-w-120 text-[clamp(36px,4.5vw,52px)] leading-[1.08] font-bold tracking-[-2px]" id="hero-title">Their better day<br />starts with <span className="text-[#d7edaa]">you.</span></h1>
          <p className="mt-4 max-w-85 text-sm leading-7 text-[#edf1e9]">A home, a helping hand, a little kindness. There&#8217;s a place for everyone at Animal Care.</p>
          <a className="mt-5 inline-flex items-center gap-6 rounded-full bg-[#d7edaa] px-5 py-3 text-sm font-bold text-[#18372e] hover:bg-[#c6e493]" href="#register">Join the care <span aria-hidden="true">&#8599;</span></a>
          <a className="ml-5 inline-block py-3 text-sm underline underline-offset-4" href="#get-started">Explore ways to help</a>
        </div>
          <button className="absolute top-3 right-3 cursor-pointer rounded-full border border-white/40 bg-black/45 px-3 py-2 text-xs text-white" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause dog video' : 'Play dog video'}>{playing ? 'Pause' : 'Play'}</button>
          <div className="absolute right-6 bottom-6 hidden max-w-52 rounded-2xl border border-white/25 bg-[#10291b]/65 p-4 backdrop-blur-md lg:block">
            <span className="text-[10px] font-bold tracking-[2px] text-[#d7edaa]">OUR SHARED PURPOSE</span>
            <p className="mt-2 text-lg leading-snug">A little kindness.<br />A whole new beginning.</p>
          </div>
      </section>
      <section className="scroll-mt-6 pb-8" id="get-started" aria-labelledby="help-title">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div><p className="mb-2 text-[10px] font-bold tracking-[2px] text-[#63833e]">FIND YOUR WAY TO GIVE</p><h2 className="text-2xl font-bold tracking-[-0.7px]" id="help-title">Small acts. Real possibilities.</h2></div>
          <p className="text-xs text-[#52655c]">Three ways to make a difference.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {waysToHelp.map((way, index) => (
            <a key={way.role} href={`#register/${way.role}`} className={`group overflow-hidden rounded-2xl border border-[#18372e]/10 ${way.color} transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-[#386844]`}>
              <div className="relative h-36 overflow-hidden sm:h-40">
                <img className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" src={`/media/${way.image}`} alt="" loading="lazy" />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{way.label}</span>
              </div>
              <div className="p-4">
                <p className="mb-2 text-[10px] font-bold tracking-widest text-[#52655c]">0{index + 1} / {way.label.toUpperCase()}</p>
                <h3 className="flex items-center justify-between gap-2 text-base font-bold">{way.title}<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#18372e]/20 transition-colors group-hover:bg-[#18372e] group-hover:text-white" aria-hidden="true">&#8599;</span></h3>
                <p className="mt-2 text-xs leading-5 text-[#52655c]">{way.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="mb-8 grid scroll-mt-6 gap-6 rounded-3xl border border-[#dce4d8] bg-[#edf1e7] p-6 md:grid-cols-[0.8fr_2fr] md:gap-10 md:p-8" id="how-it-works" aria-labelledby="steps-title">
        <div>
          <p className="text-[10px] font-bold tracking-[2px] text-[#63833e]">YOUR NEXT CHAPTER</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.7px]" id="steps-title">Good things start<br />with one small step.</h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-3">
          {[
            { title: 'Find your place', text: 'Choose to adopt, volunteer, or support animal care.' },
            { title: 'Introduce yourself', text: 'Create an account with the details for your chosen role.' },
            { title: 'Begin your journey', text: 'Take the first step toward making animal care part of your life.' },
          ].map((step, index) => (
            <li key={step.title}>
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#b7c5b4] text-xs font-bold">0{index + 1}</span>
              <h3 className="text-sm font-bold">{step.title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#52655c]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mb-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-[#18372e] px-6 py-7 text-white sm:px-8" aria-labelledby="join-title">
        <div><p className="mb-2 text-[10px] font-bold tracking-[2px] text-[#d7edaa]">THERE'S ROOM FOR YOU HERE</p><h2 className="text-xl font-medium tracking-[-0.5px] sm:text-2xl" id="join-title">Be someone&#8217;s reason for a better tomorrow.</h2></div>
        <a className="inline-flex items-center gap-6 rounded-full bg-[#d7edaa] px-5 py-3 text-sm font-bold text-[#18372e] hover:bg-[#e7f7c8]" href="#register">Find your role <span aria-hidden="true">&#8599;</span></a>
      </section>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#18372e]/10 py-4 text-xs text-[#52655c]">
        <p>A little care. A better world.</p>
        <a className="underline-offset-4 hover:underline focus-visible:outline-[#386844]" href="#register/staff">Part of the team? Staff registration &#8599;</a>
      </footer>
    </main>
  )
}

export default App
