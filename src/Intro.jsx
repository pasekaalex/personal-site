import { useState, useEffect, useRef, useCallback } from 'react'
import './Intro.css'

// Desktop icons config
const DESKTOP_ICONS = [
  { id: 'about', icon: '/icons/about.png', label: 'About' },
  { id: 'projects', icon: '/icons/projects.png', label: 'Projects' },
  { id: 'contact', icon: '/icons/contact.png', label: 'Contact' },
]

// Projects data
const PROJECTS = [
  { name: 'Bob Pants', img: '/spongebob.png', url: 'https://www.cockpants.lol', tag: '18+' },
  { name: 'GoonClicker', img: 'https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png', url: 'https://www.cooming.lol', tag: '18+' },
  { name: 'bulkOS', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png', url: 'https://www.bulked.lol/os' },
  { name: 'bulk Bros', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png', url: 'https://www.bulked.lol/games/bulkbros' },
  { name: 'bulkagachi', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png', url: 'https://www.bulked.lol/games/bulkagachi' },
  { name: 'bulk Climb', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png', url: 'https://www.bulked.lol/games/climb' },
  { name: 'bulk Flappy', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png', url: 'https://www.bulked.lol/games/flappy' },
  { name: 'bulk Runner', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png', url: 'https://www.bulked.lol/games/runner' },
  { name: 'Ready Heady', img: null, url: 'https://github.com/pasekaalex/readyheady' },
]

// ── EASTER EGGS ──────────────────────────────────────────────
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA']
const RAINBOW_COLORS = ['#ff0000','#ff7f00','#ffff00','#00ff00','#0000ff','#4b0082','#9400d3','#ff00ff']
const GLITCH_WORD = 'glitch'

export default function Intro() {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState({})
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rainMode, setRainMode] = useState(false)
  const [avatarClicks, setAvatarClicks] = useState(0)
  const [crazyMode, setCrazyMode] = useState(false)
  const avatarClickTimer = useRef(null)
  const [activeWindow, setActiveWindow] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const particleIdRef = useRef(0)

  // Easter Egg States
  const [rainbowMode, setRainbowMode] = useState(false)
  const [glitchMode, setGlitchMode] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [confettiBurst, setConfettiBurst] = useState(false)
  const [sparkBurst, setSparkBurst] = useState(null)
  const [shakingWindows, setShakingWindows] = useState({})
  const [titleClicks, setTitleClicks] = useState(0)
  const [hiddenCounter, setHiddenCounter] = useState(0)

  // Refs
  const konamiRef = useRef([])
  const glitchBufferRef = useRef('')
  const lastClickTimeRef = useRef(0)
  const lastDblClickRef = useRef(0)
  const titleClickTimerRef = useRef(null)
  const confettiCanvasRef = useRef(null)
  const containerRef = useRef(null)

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mouse particle trail
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame
    let pos = { x: 0, y: 0 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      setMousePos({ x: e.clientX, y: e.clientY })
      for (let i = 0; i < 3; i++) {
        const id = ++particleIdRef.current
        const p = {
          id,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          alpha: 0.9,
          radius: Math.random() * 5 + 3,
          color: Math.random() > 0.3 ? '#9b59b6' : '#c39bd3'
        }
        setParticles(prev => [...prev.slice(-50), p])
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (rainMode) {
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const length = Math.random() * 20 + 10
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x - 2, y + length)
          ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          alpha: p.alpha - 0.025,
          radius: p.radius * 0.97,
          x: p.x + (Math.random() - 0.5) * 1.5,
          y: p.y - 0.8
        })).filter(p => p.alpha > 0)
        updated.forEach(p => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(155, 89, 182, ${p.alpha * 0.15})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(195, 155, 211, ${p.alpha * 0.3})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
          ctx.fill()
        })
        return updated
      })
      const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 100)
      gradient.addColorStop(0, 'rgba(155, 89, 182, 0.25)')
      gradient.addColorStop(0.5, 'rgba(155, 89, 182, 0.08)')
      gradient.addColorStop(1, 'rgba(155, 89, 182, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(pos.x - 100, pos.y - 100, 200, 200)
      animFrame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animFrame)
    }
  }, [rainMode])

  // ── CONFETTI BURST ──────────────────────────────────────────
  useEffect(() => {
    if (!confettiBurst) return
    const canvas = confettiCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5 - 50,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * 6 + 3,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 12,
      alpha: 1
    }))

    let frame = 0
    const maxFrames = 120

    const animate = () => {
      if (frame >= maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setConfettiBurst(false)
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.25
        p.rot += p.rotV
        p.alpha = 1 - frame / maxFrames
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot * Math.PI / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })
      frame++
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [confettiBurst])

  // ── SPARK BURST ────────────────────────────────────────────
  useEffect(() => {
    if (!sparkBurst) return
    const canvas = confettiCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const sparks = Array.from({ length: 30 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 8 + 4
      return {
        x: sparkBurst.x,
        y: sparkBurst.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? '#ffdd00' : '#ff8800'
      }
    })

    let frame = 0
    const maxFrames = 60

    const animate = () => {
      if (frame >= maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setSparkBurst(null)
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparks.forEach(s => {
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.3
        s.alpha -= 0.025
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = Math.max(0, s.alpha)
        ctx.fill()
        ctx.globalAlpha = 1
      })
      frame++
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [sparkBurst])

  // ── RAINBOW MODE ──────────────────────────────────────────
  useEffect(() => {
    if (!rainbowMode) return
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % RAINBOW_COLORS.length
      document.documentElement.style.setProperty('--lilac', RAINBOW_COLORS[i])
      document.documentElement.style.setProperty('--lilac-dim', RAINBOW_COLORS[i] + '26')
    }, 300)
    const timer = setTimeout(() => {
      clearInterval(interval)
      setRainbowMode(false)
      document.documentElement.style.setProperty('--lilac', '#9b59b6')
      document.documentElement.style.setProperty('--lilac-dim', 'rgba(155, 89, 182, 0.15)')
    }, 5000)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [rainMode])

  // ── KONAMI CODE LISTENER ──────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      konamiRef.current.push(e.code)
      konamiRef.current = konamiRef.current.slice(-KONAMI.length)
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        setConfettiBurst(true)
        konamiRef.current = []
      }
      glitchBufferRef.current += e.key.toLowerCase()
      if (glitchBufferRef.current.length > GLITCH_WORD.length + 3) {
        glitchBufferRef.current = glitchBufferRef.current.slice(-(GLITCH_WORD.length + 3))
      }
      if (glitchBufferRef.current.includes(GLITCH_WORD)) {
        setGlitchMode(true)
        glitchBufferRef.current = ''
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // ── GLITCH MODE ───────────────────────────────────────────
  useEffect(() => {
    if (!glitchMode) return
    const timer = setTimeout(() => setGlitchMode(false), 3000)
    return () => clearTimeout(timer)
  }, [glitchMode])

  // ── CLICK COUNTER (100 clicks) ───────────────────────────
  useEffect(() => {
    if (clickCount < 100) return
    const ids = Object.keys(openWindows).filter(k => openWindows[k])
    if (ids.length > 0) {
      ids.forEach(id => {
        setShakingWindows(prev => ({ ...prev, [id]: true }))
        setTimeout(() => setShakingWindows(prev => ({ ...prev, [id]: false })), 800)
      })
    } else {
      setSparkBurst({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }
    setClickCount(0)
  }, [clickCount, openWindows])

  // ── DESKTOP DOUBLE-CLICK DETECTION ────────────────────────
  const handleDesktopDoubleClick = useCallback((e) => {
    const target = e.target
    const isDesktopBackground =
      target === containerRef.current ||
      target.classList.contains('bg-layer') ||
      target === document.getElementById('root') ||
      target === document.body
    if (!isDesktopBackground) return
    const now = Date.now()
    if (now - lastDblClickRef.current < 400) {
      setSparkBurst({ x: e.clientX, y: e.clientY })
      lastDblClickRef.current = 0
    } else {
      lastDblClickRef.current = now
    }
  }, [])

  // ── TRIPLE-CLICK WINDOW HEADER ────────────────────────────
  const handleWindowHeaderClick = useCallback((windowId, e) => {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastClickTimeRef.current < 400) {
      setShakingWindows(prev => ({ ...prev, [windowId]: !prev[windowId] }))
      lastClickTimeRef.current = 0
    } else {
      lastClickTimeRef.current = now
    }
  }, [])

  // ── TITLE 7-CLICK (RAINBOW) ──────────────────────────────
  const handleTitleClick = useCallback(() => {
    setTitleClicks(prev => {
      const next = prev + 1
      if (next >= 7) {
        setRainbowMode(true)
        clearTimeout(titleClickTimerRef.current)
        return 0
      }
      clearTimeout(titleClickTimerRef.current)
      titleClickTimerRef.current = setTimeout(() => setTitleClicks(0), 1200)
      return next
    })
  }, [])

  // ── MASTER CLICK HANDLER ─────────────────────────────────
  const handleGlobalClick = useCallback(() => {
    setClickCount(prev => prev + 1)
    setHiddenCounter(prev => prev + 1)
  }, [])

  // Window management
  const openWindow = useCallback((id) => {
    setOpenWindows(prev => ({ ...prev, [id]: true }))
    setActiveWindow(id)
  }, [])

  const closeWindow = useCallback((id, e) => {
    e?.stopPropagation()
    setOpenWindows(prev => ({ ...prev, [id]: false }))
    setActiveWindow(prev => prev === id ? null : prev)
  }, [])

  // ── WINDOW Z-INDEX & FOCUS ─────────────────────────────────────────────
  const bringToFront = useCallback((id) => {
    topZIndex.current += 1
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: topZIndex.current }
    }))
    setActiveWindow(id)
  }, [])

  // ── WINDOW DRAG ───────────────────────────────────────────────────────
  const startWindowDrag = useCallback((id, e) => {
    e.stopPropagation()
    const win = windowStates[id]
    if (win?.maximized) return
    bringToFront(id)
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], dragging: true, dragOffsetX: e.clientX - (prev[id]?.x || 0), dragOffsetY: e.clientY - (prev[id]?.y || 0) }
    }))
  }, [windowStates, bringToFront])
  const onWindowDrag = useCallback((id, e) => {
    const win = windowStates[id]
    if (!win?.dragging || win.maximized) return
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], x: e.clientX - prev[id].dragOffsetX, y: e.clientY - prev[id].dragOffsetY }
    }))
  }, [windowStates])
  const stopWindowDrag = useCallback((id) => {
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], dragging: false }
    }))
  }, [])

  // ── WINDOW MAXIMIZE / MINIMIZE ───────────────────────────────────────
  const toggleMaximize = useCallback((id, e) => {
    e?.stopPropagation()
    setWindowStates(prev => {
      const win = prev[id]
      const newMaximized = !win.maximized
      return {
        ...prev,
        [id]: {
          ...win,
          maximized: newMaximized,
          x: newMaximized ? win._normalX : win.x,
          y: newMaximized ? win._normalY : win.y,
          _normalX: newMaximized ? win.x : win._normalX,
          _normalY: newMaximized ? win.y : win._normalY,
        }
      }
    })
    bringToFront(id)
  }, [bringToFront])

  const toggleMinimize = useCallback((id, e) => {
    e?.stopPropagation()
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], minimized: true }
    }))
    setActiveWindow(prev => prev === id ? null : prev)
  }, [])

  const restoreWindow = useCallback((id) => {
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], minimized: false }
    }))
    bringToFront(id)
  }, [bringToFront])

  // Double-click header to toggle maximize
  const handleHeaderDoubleClick = useCallback((id, e) => {
    e.stopPropagation()
    toggleMaximize(id)
  }, [toggleMaximize])

  // ── RIGHT-CLICK CONTEXT MENU ─────────────────────────────────────────
  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [])
  const closeContextMenu = useCallback(() => setContextMenu(null), [])
  useEffect(() => {
    if (!contextMenu) return
    const handler = () => closeContextMenu()
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [contextMenu, closeContextMenu])

  // ── PARALLAX MOUSE EFFECT ────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      setParallaxPos({ x: dx, y: dy })
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ── WALLPAPER CYCLING ────────────────────────────────────────────────
  const cycleWallpaper = useCallback(() => {
    setWallpaperIndex(prev => (prev + 1) % wallpapers.length)
  }, [wallpapers.length])

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) { audioRef.current.pause(); setMusicPlaying(false) }
      else { audioRef.current.play(); setMusicPlaying(true) }
    }
  }

  const [weatherPos, setWeatherPos] = useState({ x: null, y: 20, dragging: false, offsetX: 0, offsetY: 0 })
  const weatherRef = useRef(null)

  const startWeatherDrag = (e) => {
    const rect = weatherRef.current.getBoundingClientRect()
    setWeatherPos(prev => ({ ...prev, dragging: true, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top }))
  }
  const onWeatherDrag = (e) => {
    if (!weatherPos.dragging) return
    setWeatherPos(prev => ({ ...prev, x: e.clientX - prev.offsetX, y: e.clientY - prev.offsetY }))
  }
  const stopWeatherDrag = () => setWeatherPos(prev => ({ ...prev, dragging: false }))

  const fetchWeather = async () => {
    const zip = document.getElementById('weatherZip')?.value?.trim()
    if (!zip || zip.length !== 5) return
    try {
      const geoRes = await fetch(`https://api.zippopotam.us/us/${zip}`)
      const geoData = await geoRes.json()
      if (!geoRes.ok) { document.getElementById('weatherError').style.display = 'block'; document.getElementById('weatherDisplay').style.display = 'none'; return }
      const { latitude, longitude } = geoData.places[0]
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
      const weatherData = await weatherRes.json()
      const code = weatherData.current_weather.weathercode
      const max = Math.round(weatherData.daily.temperature_2m_max[0])
      const min = Math.round(weatherData.daily.temperature_2m_min[0])
      const icons = { 0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️', 71: '🌨️', 73: '🌨️', 75: '🌨️', 80: '🌦️', 81: '🌦️', 82: '🌦️', 95: '⛈️', 96: '⛈️', 99: '⛈️' }
      const conditions = { 0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Cloudy', 45: 'Foggy', 48: 'Foggy', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle', 61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow', 80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Severe Thunderstorm' }
      document.getElementById('weatherIcon').textContent = icons[code] || '🌤️'
      document.getElementById('weatherTemp').textContent = `${Math.round(weatherData.current_weather.temperature)}°`
      document.getElementById('weatherCondition').textContent = conditions[code] || 'Unknown'
      document.getElementById('weatherHighLow').textContent = `H: ${max}° L: ${min}°`
      document.getElementById('weatherError').style.display = 'none'
      document.getElementById('weatherDisplay').style.display = 'block'
    } catch { document.getElementById('weatherError').style.display = 'block'; document.getElementById('weatherDisplay').style.display = 'none' }
  }

  return (
    <div className="os-container" ref={containerRef} onClick={handleGlobalClick} onDoubleClick={handleDesktopDoubleClick}>
      <canvas ref={confettiCanvasRef} className="confetti-canvas" />
      <audio ref={audioRef} src="/jazz-chill.mp3" loop />

      <div className="bg-layer" />
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />
      <div className="bg-vignette" />
      <div className="bg-scanlines" />

      {/* Hidden Easter Egg Counter */}
      <div className="hidden-counter" title="keep clicking...">{hiddenCounter}</div>

      {/* Fixed Weather Widget */}
      <div className="weather-widget" id="weatherWidget" ref={weatherRef}
        style={{ left: weatherPos.x === null ? 'auto' : weatherPos.x, right: weatherPos.x === null ? '20px' : 'auto', top: weatherPos.y, cursor: weatherPos.dragging ? 'grabbing' : 'grab' }}
        onMouseDown={startWeatherDrag} onMouseMove={onWeatherDrag} onMouseUp={stopWeatherDrag} onMouseLeave={stopWeatherDrag}
      >
        <div className="weather-header">
          <span className="weather-title">Weather</span>
          <button className="weather-toggle" onClick={() => document.querySelector('.weather-widget').classList.toggle('collapsed')}>−</button>
        </div>
        <div className="weather-body">
          <div className="weather-input-row">
            <input type="text" placeholder="Zip" className="weather-input" id="weatherZip" maxLength={5} />
            <button className="weather-search" onClick={fetchWeather}>→</button>
          </div>
          <div id="weatherDisplay" className="weather-display" style={{display: 'none'}}>
            <span className="weather-icon" id="weatherIcon">☀️</span>
            <span className="weather-temp" id="weatherTemp">--°</span>
            <span className="weather-details" id="weatherCondition">--</span>
            <span className="weather-highlow" id="weatherHighLow">--</span>
          </div>
          <div id="weatherError" className="weather-error" style={{display: 'none'}}>Not found</div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-layout">
        <div className="avatar-section">
          <div className="avatar-glow" />
          <img src="/avi.jpg" alt="Alex Paseka" className={`main-avatar ${crazyMode ? 'crazy-avatar' : ''}`} onClick={() => {
            setAvatarClicks(prev => {
              const newCount = prev + 1
              if (newCount >= 10) { setCrazyMode(true); setTimeout(() => setCrazyMode(false), 5000); return 0 }
              if (avatarClickTimer.current) clearTimeout(avatarClickTimer.current)
              avatarClickTimer.current = setTimeout(() => setAvatarClicks(0), 800)
              return newCount
            })
          }} onMouseLeave={() => { if (avatarClickTimer.current) clearTimeout(avatarClickTimer.current); avatarClickTimer.current = setTimeout(() => setAvatarClicks(0), 800) }} />
          <div className="avatar-ring" />
        </div>

        <div className="title-block">
          <h1 className={`desktop-title ${glitchMode ? 'glitch-text' : ''}`} onClick={handleTitleClick} data-text="ALEX PASEKA">
            <span className="title-alex">ALEX</span>
            <span className="title-paseka">PASEKA</span>
          </h1>
          <div className="title-divider" />
        </div>

        <div className="desktop-icons">
          {DESKTOP_ICONS.map(icon => (
            <button key={icon.id} className={`desktop-icon ${openWindows[icon.id] ? 'active' : ''}`} onClick={() => openWindow(icon.id)}>
              <span className="icon-glow" />
              <img src={icon.icon} alt={icon.label} className="icon-img" />
              <span className="icon-label">{icon.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ABOUT Window */}
      {openWindows.about && (
        <div className={`os-window ${openWindows.about ? 'open' : ''} ${shakingWindows.about ? 'window-shake' : ''}`} onClick={() => setActiveWindow('about')}>
          <div className="window-header" onClick={(e) => handleWindowHeaderClick('about', e)}>
            <div className="window-controls">
              <button className="win-close" onClick={(e) => { e.stopPropagation(); closeWindow('about', e) }}>×</button>
            </div>
            <span className="window-title">About Me</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="about-grid">
              <div className="about-avatar-wrap">
                <img src="/avi.jpg" alt="Alex" className="window-avatar" />
                <div className="about-status"><span className="status-dot" />Available for work</div>
              </div>
              <div className="about-info">
                <h2 className="about-name">Alex Paseka</h2>
                <p className="about-role">Developer & Blockchain Enthusiast</p>
                <div className="about-divider" />
                <p className="about-bio">Passionate about building scalable web applications and exploring the intersection of Web3 and modern software architecture. I love turning complex problems into elegant solutions.</p>
                <div className="about-education">
                  <span className="edu-icon">🎓</span>
                  <div><strong>B.S. Computer Science</strong><span>CUNY Brooklyn College</span></div>
                </div>
                <div className="about-links">
                  <a href="https://github.com/pasekaalex" target="_blank" rel="noopener" className="about-link"><span>GH</span> GitHub</a>
                  <a href="mailto:alexpaseka97@gmail.com" className="about-link"><span>✉</span> Email</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS Window */}
      {openWindows.projects && (
        <div className={`os-window window-projects ${openWindows.projects ? 'open' : ''} ${shakingWindows.projects ? 'window-shake' : ''}`} onClick={() => setActiveWindow('projects')}>
          <div className="window-header" onClick={(e) => handleWindowHeaderClick('projects', e)}>
            <div className="window-controls">
              <button className="win-close" onClick={(e) => { e.stopPropagation(); closeWindow('projects', e) }}>×</button>
            </div>
            <span className="window-title">Projects</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="projects-grid">
              {PROJECTS.map((proj, i) => (
                <a key={i} href={proj.url} target="_blank" rel="noopener" className="project-card">
                  <div className="project-image-wrap">
                    {proj.img ? <img src={proj.img} alt={proj.name} className="project-image" /> : <div className="project-emoji-placeholder">⏱️</div>}
                    {proj.tag && <span className="project-tag">{proj.tag}</span>}
                    <div className="project-overlay" />
                  </div>
                  <div className="project-info"><h3 className="project-title">{proj.name}</h3></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT Window */}
      {openWindows.contact && (
        <div className={`os-window ${openWindows.contact ? 'open' : ''} ${shakingWindows.contact ? 'window-shake' : ''}`} onClick={() => setActiveWindow('contact')}>
          <div className="window-header" onClick={(e) => handleWindowHeaderClick('contact', e)}>
            <div className="window-controls">
              <button className="win-close" onClick={(e) => { e.stopPropagation(); closeWindow('contact', e) }}>×</button>
            </div>
            <span className="window-title">Contact</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="contact-grid">
              <p className="contact-intro">Let's build something amazing together</p>
              <div className="contact-links">
                <a href="https://github.com/pasekaalex" target="_blank" rel="noopener" className="contact-link"><span className="contact-icon">⌨</span><div><strong>GitHub</strong><span>@pasekaalex</span></div></a>
                <a href="mailto:alexpaseka97@gmail.com" className="contact-link"><span className="contact-icon">✉</span><div><strong>Email</strong><span>alexpaseka97@gmail.com</span></div></a>
                <a href="https://paseka.dev" target="_blank" rel="noopener" className="contact-link"><span className="contact-icon">🌐</span><div><strong>Website</strong><span>paseka.dev</span></div></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header"><span className="start-menu-logo">◉</span><span>paseka.dev</span></div>
          <div className="start-menu-apps">
            {DESKTOP_ICONS.map(icon => (
              <button key={icon.id} className="start-menu-item" onClick={() => { openWindow(icon.id); setStartMenuOpen(false) }}>
                <img src={icon.icon} alt={icon.label} className="start-menu-icon" />
                <span>{icon.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dock */}
      <div className="dock">
        {DESKTOP_ICONS.map(icon => (
          <button key={icon.id} className={`dock-item ${openWindows[icon.id] ? 'open' : ''}`} onClick={() => openWindow(icon.id)} title={icon.label}>
            <img src={icon.icon} alt={icon.label} className="dock-icon" />
          </button>
        ))}
      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button className="start-button" onClick={() => setStartMenuOpen(!startMenuOpen)}>
            <span className="start-icon">☰</span>
            <span className="start-text">Menu</span>
          </button>
        </div>
        <div className="taskbar-right">
          <button className="music-toggle" onClick={toggleMusic} title={musicPlaying ? 'Mute' : 'Play Music'}>{musicPlaying ? '🔊' : '🔇'}</button>
          <button className="rain-toggle" onClick={() => setRainMode(!rainMode)} title={rainMode ? 'Rain Off' : 'Rain On'}>🌧️</button>
          <span className="taskbar-date">{formatDate(time)}</span>
          <span className="taskbar-clock">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  )
}
