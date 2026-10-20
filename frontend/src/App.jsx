import { useEffect, useRef, useState } from 'react'
import Registration from './Registration.jsx'
import VolunteerRegistration from './VolunteerRegistration.jsx'

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

  if (page === '#register/volunteer') return <VolunteerRegistration />
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
    if (videoRef.current.paused) videoRef.current.play().catch(() => {})
    else videoRef.current.pause()
  }

  return (
    <main>
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#25432b] bg-[url('/media/hero-dog.jpg')] bg-cover bg-position-[center_65%] bg-no-repeat text-white" aria-labelledby="hero-title">
        <video ref={videoRef} className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_65%]" muted loop playsInline preload="metadata" poster="/media/hero-dog.jpg" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="/media/hero-dog.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(90deg,#08190fbf,#08190f50)] min-[601px]:bg-[linear-gradient(90deg,#08190fb8,#08190f29),linear-gradient(0deg,#08190f8c,transparent_35%)]" />
        <header className="flex items-center justify-between gap-6 px-[6%] pt-6 pb-8 min-[601px]:pt-8">
          <a className="text-2xl font-bold tracking-[-1px] no-underline" href="#">Animal Care <span className="ml-2" aria-hidden="true">🐾</span></a>
          <span className="hidden text-[13px] opacity-85 min-[601px]:inline">A little care. A better world.</span>
        </header>
        <div className="my-auto w-full max-w-[880px] px-[6%] py-[65px] min-[601px]:py-20">
          <p className="text-[11px] font-bold tracking-[2.5px]">LOVE. CARE. TOGETHER.</p>
          <h1 className="my-6 text-[clamp(44px,6vw,84px)] leading-[1.06] font-medium tracking-[-1.8px] min-[601px]:tracking-[-3px]" id="hero-title">Every animal<br />deserves a little love.</h1>
          <p className="max-w-[380px] text-base leading-[1.7] text-[#edf1e9] min-[601px]:text-[17px]">Caring for animals, together. Help us make their world a happier, kinder place.</p>
          <a className="mt-[22px] inline-flex items-center gap-10 rounded-[40px] bg-[#d7edaa] px-[26px] py-[18px] text-sm font-bold text-[#173a27] no-underline hover:bg-[#e7f7c8]" href="#register">Get Started <span aria-hidden="true">↗</span></a>
        </div>
        <div className="flex items-end justify-between gap-5 px-[6%] py-7 min-[601px]:items-center">
          <a className="max-w-[155px] text-xs leading-[1.8] no-underline min-[601px]:max-w-none min-[601px]:leading-normal" href="#get-started">Discover how you can help ↓</a>
          <button className="cursor-pointer rounded-[28px] border border-white/50 bg-[#10251e55] px-[18px] py-3 text-xs text-white" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? 'Pause video Ⅱ' : 'Play video ▶'}</button>
        </div>
      </section>
      <section className="max-w-[850px] scroll-mt-[30px] px-[6%] py-20" id="get-started" aria-labelledby="intro-title">
        <p className="text-[11px] font-bold tracking-[2.5px]">SMALL ACTS. BIG DIFFERENCE.</p>
        <h2 className="my-[18px] text-[clamp(32px,4vw,48px)] font-medium tracking-[-1px]" id="intro-title">Care starts with you.</h2>
        <p className="max-w-[570px] text-[17px] leading-[1.8]">Give an animal your time, your kindness, or a place to call home. Every act of care matters.</p>
      </section>
    </main>
  )
}

export default App
