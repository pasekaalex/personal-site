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
  {
    name: 'Bob Pants',
    img: '/spongebob.png',
    url: 'https://www.cockpants.lol',
    tag: '18+'
  },
  {
    name: 'GoonClicker',
    img: 'https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png',
    url: 'https://www.cooming.lol',
    tag: '18+'
  },
  {
    name: 'bulkOS',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png',
    url: 'https://www.bulked.lol/os'
  },
  {
    name: 'bulk Bros',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png',
    url: 'https://www.bulked.lol/games/bulkbros'
  },
  {
    name: 'bulkagachi',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png',
    url: 'https://www.bulked.lol/games/bulkagachi'
  },
  {
    name: 'bulk Climb',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png',
    url: 'https://www.bulked.lol/games/climb'
  },
  {
    name: 'bulk Flappy',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png',
    url: 'https://www.bulked.lol/games/flappy'
  },
  {
    name: 'bulk Runner',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png',
    url: 'https://www.bulked.lol/games/runner'
  },
  {
    name: 'Ready Heady',
    img: null,
    url: 'https://github.com/pasekaalex/readyheady'
  },
]

// Skills data


export default function Intro() {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState({})
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicVolume, setMusicVolume] = useState(0.5)
  const [rainMode, setRainMode] = useState(false)
  const rainModeRef = useRef(false)
  const [typedName, setTypedName] = useState('')
  const fullName = 'ALEX PASEKA'
  const [avatarClicks, setAvatarClicks] = useState(0)
  const [crazyMode, setCrazyMode] = useState(false)
  const avatarClickTimer = useRef(null)
  const [activeWindow, setActiveWindow] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const particleIdRef = useRef(0)

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Typing animation for name
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setTypedName(fullName.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Mouse particle trail
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let pos = { x: 0, y: 0 }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Add more particles for richer trail - ENHANCED
      for (let i = 0; i < 5; i++) {
        const id = ++particleIdRef.current
        const p = { 
          id, 
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          alpha: 1,
          radius: Math.random() * 8 + 4,
          color: Math.random() > 0.4 ? '#b87aff' : '#ff2d95'
        }
        setParticles(prev => [...prev.slice(-80), p])
      }
    }


    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Rain effect
      if (rainModeRef.current) {
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
          alpha: p.alpha - 0.02,
          radius: p.radius * 0.98,
          x: p.x + (p.vx || 0) + (Math.random() - 0.5) * 0.5,
          y: p.y + (p.vy || 0) - 0.3
        })).filter(p => p.alpha > 0)
        
        updated.forEach(p => {
          // Big outer glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(184, 122, 255, ${p.alpha * 0.1})`
          ctx.fill()
          
          // Medium glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 45, 149, ${p.alpha * 0.2})`
          ctx.fill()
          
          // Inner core
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
          ctx.fill()
        })
        
        return updated
      })


      // Stronger mouse glow aura
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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
        setMusicPlaying(false)
      } else {
        audioRef.current.play()
        setMusicPlaying(true)
      }
    }
  }

  const [weatherPos, setWeatherPos] = useState({ x: null, y: 20, dragging: false, offsetX: 0, offsetY: 0 })

  const weatherRef = useRef(null)


  const startWeatherDrag = (e) => {
    const rect = weatherRef.current.getBoundingClientRect()
    setWeatherPos(prev => ({
      ...prev,
      dragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    }))
  }

  const onWeatherDrag = (e) => {
    if (!weatherPos.dragging) return
    setWeatherPos(prev => ({
      ...prev,
      x: e.clientX - prev.offsetX,
      y: e.clientY - prev.offsetY,
      left: e.clientX - prev.offsetX,
      top: e.clientY - prev.offsetY,
      right: 'auto'
    }))
  }


  const stopWeatherDrag = () => {
    setWeatherPos(prev => ({ ...prev, dragging: false }))
  }

  const fetchWeather = async () => {
    const zip = document.getElementById('weatherZip')?.value?.trim()
    if (!zip || zip.length !== 5) return

    try {
      const geoRes = await fetch(`https://api.zippopotam.us/us/${zip}`)
      const geoData = await geoRes.json()

      if (!geoRes.ok) {
        document.getElementById('weatherError').style.display = 'block'
        document.getElementById('weatherDisplay').style.display = 'none'
        return
      }
      const { latitude, longitude } = geoData.places[0]

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
      const weatherData = await weatherRes.json()

      const code = weatherData.current_weather.weathercode
      const max = Math.round(weatherData.daily.temperature_2m_max[0])
      const min = Math.round(weatherData.daily.temperature_2m_min[0])

      const icons = {
        0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
        45: '🌫️', 48: '🌫️',
        51: '🌧️', 53: '🌧️', 55: '🌧️',
        61: '🌧️', 63: '🌧️', 65: '🌧️',
        71: '🌨️', 73: '🌨️', 75: '🌨️',
        80: '🌦️', 81: '🌦️', 82: '🌦️',
        95: '⛈️', 96: '⛈️', 99: '⛈️'
      }
      const conditions = {
        0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
        45: 'Foggy', 48: 'Foggy',
        51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
        61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
        71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow',
        80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers',
        95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Severe Thunderstorm'
      }

      document.getElementById('weatherIcon').textContent = icons[code] || '🌤️'
      document.getElementById('weatherTemp').textContent = `${Math.round(weatherData.current_weather.temperature)}°`
      document.getElementById('weatherCondition').textContent = conditions[code] || 'Unknown'
      document.getElementById('weatherHighLow').textContent = `H: ${max}° L: ${min}°`
      document.getElementById('weatherError').style.display = 'none'
      document.getElementById('weatherDisplay').style.display = 'block'
      // Update taskbar weather
      document.getElementById('weatherIconTaskbar').textContent = icons[code] || '🌤️'
      document.getElementById('weatherTempTaskbar').textContent = `${Math.round(weatherData.current_weather.temperature)}°`
      document.getElementById('weatherConditionTaskbar').textContent = conditions[code] || 'Unknown'
      document.getElementById('weatherHighLowTaskbar').textContent = `H: ${max}° L: ${min}°`
      document.getElementById('weatherErrorTaskbar').style.display = 'none'
      document.getElementById('weatherDisplayTaskbar').style.display = 'block'
    } catch (err) {
      document.getElementById('weatherError').style.display = 'block'
      document.getElementById('weatherDisplay').style.display = 'none'
      document.getElementById('weatherErrorTaskbar').style.display = 'block'
      document.getElementById('weatherDisplayTaskbar').style.display = 'none'
    }
  }

  return (
    <div className="os-container">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />
      <audio ref={audioRef} src="/jazz-chill.mp3" loop volume={musicVolume} />

      {/* Music Player Popup */}
      {musicPlaying && (
        <div className="music-popup">
          <div className="music-header">Now Playing</div>
          <div className="music-info">Chill Jazz Vibes</div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={musicVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value)
              setMusicVolume(v)
              if (audioRef.current) audioRef.current.volume = v
            }}
            className="volume-slider"
          />
          <button className="music-close" onClick={() => { audioRef.current?.pause(); setMusicPlaying(false) }}>×</button>
        </div>
      )}

      {/* Animated Background */}
      <div className="bg-layer" />
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />
      <div className="bg-vignette" />
      <div className="bg-scanlines" />

      {/* Fixed Weather Widget */}
      <div className="weather-widget" id="weatherWidget" ref={weatherRef}
        style={{
          left: weatherPos.x === null ? 'auto' : weatherPos.x,
          right: weatherPos.x === null ? '20px' : 'auto',
          top: weatherPos.y,
          cursor: weatherPos.dragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={startWeatherDrag}
        onMouseMove={onWeatherDrag}
        onMouseUp={stopWeatherDrag}
        onMouseLeave={stopWeatherDrag}
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
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-glow" />
          <img src="/avi.jpg" alt="Alex Paseka" className={`main-avatar ${crazyMode ? 'crazy-avatar' : ''}`} onClick={() => {
            setAvatarClicks(prev => {
              const newCount = prev + 1
              if (newCount >= 10) {
                setCrazyMode(true)
                setTimeout(() => setCrazyMode(false), 5000)
                return 0
              }
              if (avatarClickTimer.current) clearTimeout(avatarClickTimer.current)
              avatarClickTimer.current = setTimeout(() => setAvatarClicks(0), 800)
              return newCount
            })
          }} onMouseLeave={() => {
            if (avatarClickTimer.current) clearTimeout(avatarClickTimer.current)
            avatarClickTimer.current = setTimeout(() => setAvatarClicks(0), 800)
          }} />
          <div className="avatar-ring" />
        </div>

        {/* Title Block */}
        <div className="title-block">
          <h1 className="desktop-title" onDoubleClick={() => {
            // Double click name effect - burst of sparkles
            const rect = document.querySelector('.desktop-title').getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            for (let i = 0; i < 20; i++) {
              const p = {
                id: Date.now() + i,
                x: centerX + (Math.random() - 0.5) * 100,
                y: centerY + (Math.random() - 0.5) * 50,
                alpha: 1,
                radius: Math.random() * 6 + 4,
                color: Math.random() > 0.5 ? '#9b59b6' : '#ff2d95'
              }
              setParticles(prev => [...prev.slice(-60), p])
            }
          }}>
            <span className="title-typed">{typedName}</span><span className="cursor-blink">|</span>
          </h1>
          <div className="title-divider" />
        </div>

        {/* Desktop Icons */}
        <div className="desktop-icons">
          {DESKTOP_ICONS.map(icon => (
            <button
              key={icon.id}
              className={`desktop-icon ${openWindows[icon.id] ? 'active' : ''}`}
              onClick={() => openWindow(icon.id)}
            >
              <span className="icon-glow" />
              <img src={icon.icon} alt={icon.label} className="icon-img" />
              <span className="icon-label">{icon.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ABOUT Window */}
      {openWindows.about && (
        <div className={`os-window ${openWindows.about ? 'open' : ''}`} onClick={() => setActiveWindow('about')}>
          <div className="window-header">
            <div className="window-controls">
              <button className="win-close" onClick={(e) => closeWindow('about', e)}>×</button>
            </div>
            <span className="window-title">About Me</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="about-grid">
              <div className="about-avatar-wrap">
                <img src="/avi.jpg" alt="Alex" className="window-avatar" />
                <div className="about-status">
                  <span className="status-dot" />
                  Available for work
                </div>
              </div>
              <div className="about-info">
                <h2 className="about-name">Alex Paseka</h2>
                <p className="about-role">Developer & Blockchain Enthusiast</p>
                <div className="about-divider" />
                <p className="about-bio">
                  Passionate about building scalable web applications and exploring the intersection of 
                  Web3 and modern software architecture. I love turning complex problems into elegant solutions.
                </p>
                <div className="about-education">
                  <span className="edu-icon">🎓</span>
                  <div>
                    <strong>B.S. Computer Science</strong>
                    <span>CUNY Brooklyn College</span>
                  </div>
                </div>
                <div className="about-links">
                  <a href="https://github.com/pasekaalex" target="_blank" rel="noopener" className="about-link">
                    <span>GH</span> GitHub
                  </a>
                  <a href="mailto:alexpaseka97@gmail.com" className="about-link">
                    <span>✉</span> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS Window */}
      {openWindows.projects && (
        <div className={`os-window window-projects ${openWindows.projects ? 'open' : ''}`} onClick={() => setActiveWindow('projects')}>
          <div className="window-header">
            <div className="window-controls">
              <button className="win-close" onClick={(e) => closeWindow('projects', e)}>×</button>
            </div>
            <span className="window-title">Projects</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="projects-grid">
              {PROJECTS.map((proj, i) => (
                <a key={i} href={proj.url} target="_blank" rel="noopener" className="project-card">
                  <div className="project-image-wrap">
                    {proj.img ? (
                      <img src={proj.img} alt={proj.name} className="project-image" />
                    ) : (
                      <div className="project-emoji-placeholder">⏱️</div>
                    )}
                    {proj.tag && <span className="project-tag">{proj.tag}</span>}
                    <div className="project-overlay" />
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{proj.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT Window */}
      {openWindows.contact && (
        <div className={`os-window ${openWindows.contact ? 'open' : ''}`} onClick={() => setActiveWindow('contact')}>
          <div className="window-header">
            <div className="window-controls">
              <button className="win-close" onClick={(e) => closeWindow('contact', e)}>×</button>
            </div>
            <span className="window-title">Contact</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="contact-grid">
              <p className="contact-intro">Let's build something amazing together</p>
              <div className="contact-links">
                <a href="https://github.com/pasekaalex" target="_blank" rel="noopener" className="contact-link">
                  <span className="contact-icon">⌨</span>
                  <div>
                    <strong>GitHub</strong>
                    <span>@pasekaalex</span>
                  </div>
                </a>
                <a href="mailto:alexpaseka97@gmail.com" className="contact-link">
                  <span className="contact-icon">✉</span>
                  <div>
                    <strong>Email</strong>
                    <span>alexpaseka97@gmail.com</span>
                  </div>
                </a>
                <a href="https://paseka.dev" target="_blank" rel="noopener" className="contact-link">
                  <span className="contact-icon">🌐</span>
                  <div>
                    <strong>Website</strong>
                    <span>paseka.dev</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header">
            <span className="start-menu-logo">◉</span>
            <span>paseka.dev</span>
          </div>
          <div className="start-menu-apps">
            {DESKTOP_ICONS.map(icon => (
              <button
                key={icon.id}
                className="start-menu-item"
                onClick={() => { openWindow(icon.id); setStartMenuOpen(false) }}
              >
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
          <button
            key={icon.id}
            className={`dock-item ${openWindows[icon.id] ? 'open' : ''}`}
            onClick={() => openWindow(icon.id)}
            title={icon.label}
          >
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
          <button className="music-toggle" onClick={toggleMusic} title={musicPlaying ? 'Mute' : 'Play Music'}>
            {musicPlaying ? '🔊' : '🔇'}
          </button>
          <button className="rain-toggle" onClick={() => {
            const newVal = !rainMode
            setRainMode(newVal)
            rainModeRef.current = newVal
          }} title={rainMode ? 'Rain Off' : 'Rain On'}>
            🌧️
          </button>
          <div className="weather-taskbar" style={{position: 'relative'}}>
            <button className="weather-taskbar-btn" onClick={() => document.querySelector('.weather-popup-taskbar').classList.toggle('show')} title="Weather">
              🌤️
            </button>
            <div className="weather-popup-taskbar">
              <div className="weather-popup-header">Weather</div>
              <div className="weather-popup-input-row">
                <input type="text" placeholder="Zip" className="weather-popup-input" id="weatherZipTaskbar" maxLength={5} />
                <button className="weather-popup-search" onClick={() => {
                  const zip = document.getElementById('weatherZipTaskbar').value.trim()
                  if (zip && zip.length === 5) {
                    document.getElementById('weatherZip').value = zip
                    fetchWeather()
                  }
                }}>→</button>
              </div>
              <div id="weatherDisplayTaskbar" className="weather-popup-display" style={{display: 'none'}}>
                <span className="weather-popup-icon" id="weatherIconTaskbar">☀️</span>
                <span className="weather-popup-temp" id="weatherTempTaskbar">--°</span>
                <span className="weather-popup-details" id="weatherConditionTaskbar">--</span>
                <span className="weather-popup-highlow" id="weatherHighLowTaskbar">--</span>
              </div>
              <div id="weatherErrorTaskbar" className="weather-popup-error" style={{display: 'none'}}>Not found</div>
            </div>
          </div>
          <span className="taskbar-date">{formatDate(time)}</span>
          <span className="taskbar-clock">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  )
}