import { useEffect, useRef, useState } from 'react'
import './App.css'
import Registration from './Registration.jsx'

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
      <section className="hero" aria-labelledby="hero-title">
        <video ref={videoRef} className="hero-video" muted loop playsInline preload="metadata" poster="/media/hero-dog.jpg" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="/media/hero-dog.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <header className="hero-header">
          <a className="brand" href="#">Animal Care <span aria-hidden="true">🐾</span></a>
          <span className="header-note">A little care. A better world.</span>
        </header>
        <div className="hero-content">
          <p className="eyebrow">LOVE. CARE. TOGETHER.</p>
          <h1 id="hero-title">Every animal<br />deserves a little love.</h1>
          <p className="hero-description">Caring for animals, together. Help us make their world a happier, kinder place.</p>
          <a className="hero-cta" href="#register">Get Started <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-footer">
          <a className="discover" href="#get-started">Discover how you can help ↓</a>
          <button className="video-toggle" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? 'Pause video Ⅱ' : 'Play video ▶'}</button>
        </div>
      </section>
      <section className="intro" id="get-started" aria-labelledby="intro-title">
        <p className="eyebrow">SMALL ACTS. BIG DIFFERENCE.</p>
        <h2 id="intro-title">Care starts with you.</h2>
        <p>Give an animal your time, your kindness, or a place to call home. Every act of care matters.</p>
      </section>
    </main>
  )
}

export default App
