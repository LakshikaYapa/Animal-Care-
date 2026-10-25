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
        <a className="text-xl font-bold tracking-[-1px] focus-visible:outline-[#386844]" href="#">Animal Care <span aria-hidden="true">{String.fromCodePoint(0x1F43E)}</span></a>
        <nav className="flex items-center gap-5 text-sm" aria-label="Main navigation">
          <a className="hidden hover:underline focus-visible:outline-[#386844] sm:block" href="#get-started">Ways to help</a>
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
        </div>
          <button className="absolute top-3 right-3 cursor-pointer rounded-full border border-white/40 bg-black/45 px-3 py-2 text-xs text-white" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause dog video' : 'Play dog video'}>{playing ? 'Pause' : 'Play'}</button>
      </section>
      <section className="scroll-mt-6 pb-8" id="get-started" aria-labelledby="help-title">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold tracking-[-0.5px]" id="help-title">What feels like you?</h2>
          <p className="text-xs text-[#52655c]">Three ways to make a difference.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {waysToHelp.map((way) => (
            <a key={way.role} href={`#register/${way.role}`} className={`group overflow-hidden rounded-2xl border border-[#18372e]/5 ${way.color} transition-transform hover:-translate-y-1 motion-reduce:transform-none focus-visible:outline-[#386844]`}>
              <div className="relative h-28 overflow-hidden">
                <img className="h-full w-full object-cover object-center" src={`/media/${way.image}`} alt="" loading="lazy" />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{way.label}</span>
              </div>
              <div className="p-4">
                <h3 className="flex items-center justify-between gap-2 text-sm font-bold">{way.title}<span aria-hidden="true">&#8599;</span></h3>
                <p className="mt-2 text-xs leading-5 text-[#52655c]">{way.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#18372e]/10 py-4 text-xs text-[#52655c]">
        <p>A little care. A better world.</p>
        <a className="underline-offset-4 hover:underline focus-visible:outline-[#386844]" href="#register/staff">Part of the team? Staff registration &#8599;</a>
      </footer>
    </main>
  )
}

export default App
