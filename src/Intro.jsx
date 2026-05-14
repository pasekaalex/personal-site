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
    github: 'https://github.com/pasekaalex/bobpants',
    desc: '18+ content platform'
  },
  {
    name: 'GoonClicker',
    img: 'https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png',
    url: 'https://www.cooming.lol',
    github: 'https://github.com/pasekaalex/coomer',
    desc: 'Clicker game'
  },
  {
    name: 'Bulk-OS',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png',
    url: 'https://www.bulked.lol/os',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Custom operating system'
  },
  {
    name: 'Bulk Bros',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png',
    url: 'https://www.bulked.lol/games/bulkbros',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Co-op arcade game'
  },
  {
    name: 'Bulkagachi',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png',
    url: 'https://www.bulked.lol/games/bulkagachi',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Baby tamagotchi game'
  },
  {
    name: 'Bulk Climb',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png',
    url: 'https://www.bulked.lol/games/climb',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Platform climbing game'
  },
  {
    name: 'Flappy Bulk',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png',
    url: 'https://www.bulked.lol/games/flappy',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Flappy bird style game'
  },
  {
    name: 'Bulk Runner',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png',
    url: 'https://www.bulked.lol/games/runner',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Endless runner game'
  },
]

// Skills data


export default function Intro() {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState({})
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [musicVolume, setMusicVolume] = useState(0.2)
  const [selectedTrack, setSelectedTrack] = useState('piano')
  const [selectedProject, setSelectedProject] = useState(null)
  const [rainMode, setRainMode] = useState(false)
  const [raining, setRaining] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const rainModeRef = useRef(false)
  const rainingRef = useRef(false)
  const [typedName, setTypedName] = useState('')
  const fullName = 'ALEX PASEKA'
  const [avatarClicks, setAvatarClicks] = useState(0)
  const [crazyMode, setCrazyMode] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [totalClicks, setTotalClicks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('avatarClicks')
      return saved ? parseInt(saved, 10) : 0
    }
    return 0
  })
  const avatarClickTimer = useRef(null)
  const [activeWindow, setActiveWindow] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  
  // Window drag state
  const [windowPositions, setWindowPositions] = useState({})
  const [dragState, setDragState] = useState({ dragging: false, windowId: null, startX: 0, startY: 0, startPosX: 0, startPosY: 0 })
  const highestZIndex = useRef(600)
  
  // Initialize window position when opened
  const getWindowPosition = (windowId) => {
    if (windowPositions[windowId]) return windowPositions[windowId]
    // Default centered
    return { x: window.innerWidth / 2 - 280, y: window.innerHeight / 2 - 200 }
  }
  // Autoplay piano on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "/piano-v2.mp3"
      audioRef.current.volume = 0.2
      audioRef.current.play().catch(() => {})
    }
  }, [])

  const particleIdRef = useRef(0)

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => setSessionTime(prev => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  // Typing animation for name
  const restartTypingAnimation = useCallback(() => {
    setTypedName('')
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setTypedName(fullName.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
  }, [fullName])

  // Run typing animation on mount
  useEffect(() => {
    restartTypingAnimation()
  }, [restartTypingAnimation])

  // Cursor sparkle trail
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let pos = { x: -100, y: -100 }
    let trail = []

    const onMove = (e) => {
      pos = { x: e.clientX, y: e.clientY }
    }

    // Rain drops state
    let rainDrops = []

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw sparkle trail
      trail.push({ x: pos.x, y: pos.y, alpha: 1, size: Math.random() * 3 + 2 })
      if (trail.length > 15) trail.shift()
      
      trail.forEach((t, i) => {
        t.alpha -= 0.08
        if (t.alpha > 0) {
          ctx.beginPath()
          ctx.arc(t.x, t.y, t.size * t.alpha, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(184, 122, 255, ${t.alpha})`
          ctx.fill()
        }
      })
      trail = trail.filter(t => t.alpha > 0)
      
      // Draw rain using ref
      if (rainingRef.current) {
        for (let i = 0; i < 5; i++) {
          rainDrops.push({
            x: Math.random() * canvas.width,
            y: -10,
            speed: Math.random() * 10 + 15,
            length: Math.random() * 20 + 15
          })
        }
        ctx.strokeStyle = 'rgba(180, 200, 255, 0.5)'
        ctx.lineWidth = 1.5
        rainDrops.forEach((drop, i) => {
          drop.y += drop.speed
          drop.x += 1.5
          ctx.beginPath()
          ctx.moveTo(drop.x, drop.y)
          ctx.lineTo(drop.x + 4, drop.y - drop.length)
          ctx.stroke()
        })
        rainDrops = rainDrops.filter(d => d.y < canvas.height)
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
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

  // Window drag handlers
  const handleWindowMouseDown = (e, windowId) => {
    e.preventDefault()
    const pos = getWindowPosition(windowId)
    highestZIndex.current += 1
    setDragState({
      dragging: true,
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y
    })
  }

  useEffect(() => {
    if (!dragState.dragging) return
    
    const handleMouseMove = (e) => {
      const dx = e.clientX - dragState.startX
      const dy = e.clientY - dragState.startY
      setWindowPositions(prev => ({
        ...prev,
        [dragState.windowId]: {
          x: dragState.startPosX + dx,
          y: dragState.startPosY + dy
        }
      }))
    }
    
    const handleMouseUp = () => {
      setDragState(prev => ({ ...prev, dragging: false }))
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragState])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatSessionTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`
    if (mins > 0) return `${mins}m ${secs}s`
    return `${secs}s`
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

  const fetchWeather = async (zip) => {
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
    <div className={`os-container${lightMode ? ' light-mode' : ''}`}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />
      <audio ref={audioRef} src={`/${selectedTrack === 'jazz' ? 'sax-jazz' : selectedTrack === 'piano' ? 'piano-v2' : 'rain-sounds'}.mp3`} loop volume={musicVolume} />

      {/* Animated Background */}
      <div className="bg-layer" />
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />
      <div className="bg-vignette" />
      <div className="bg-scanlines" />

      {/* Desktop Layout */}
      <div className="desktop-layout">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-glow" />
          <img src="/avi.jpg" alt="Alex Paseka" className={`main-avatar ${crazyMode ? 'crazy-avatar' : ''}`} onClick={() => {
            setAvatarClicks(prev => {
              const newCount = prev + 1
              const newTotal = totalClicks + 1
              setTotalClicks(newTotal)
              localStorage.setItem('avatarClicks', newTotal.toString())
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
            restartTypingAnimation()
            // Double click name effect - burst of sparkles
            const rect = document.querySelector('.desktop-title').getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            for (let i = 0; i < 30; i++) {
              const p = {
                id: Date.now() + i,
                x: centerX + (Math.random() - 0.5) * 150,
                y: centerY + (Math.random() - 0.5) * 80,
                alpha: 1,
                radius: Math.random() * 8 + 4,
                color: Math.random() > 0.3 ? '#ffffff' : '#d8a9e8',
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 3
              }
              setParticles(prev => [...prev.slice(-80), p])
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
      {openWindows.about && (() => {
        const pos = getWindowPosition('about')
        const zIndex = highestZIndex.current
        return (
        <div 
          className={`os-window ${openWindows.about ? 'open' : ''}`} 
          onClick={() => setActiveWindow('about')}
          style={{
            transform: 'none',
            left: pos.x,
            top: pos.y,
            zIndex,
            transition: dragState.dragging && dragState.windowId === 'about' ? 'none' : undefined
          }}
        >
          <div 
            className="window-header"
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleWindowMouseDown(e, 'about')}
          >
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
        )})()}

      {/* PROJECTS Window */}
      {openWindows.projects && (
        <div className={`os-window window-projects ${openWindows.projects ? 'open' : ''}`} onClick={() => setActiveWindow('projects')} onMouseDown={(e) => handleWindowMouseDown(e, 'projects')}>
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
                <button key={i} className="project-card" onClick={() => setSelectedProject(proj)}>
                  <div className="project-image-wrap">
                    {proj.img ? (
                      <img src={proj.img} alt={proj.name} className="project-image" />
                    ) : (
                      <div className="project-emoji-placeholder">⏱️</div>
                    )}
                    <div className="project-overlay" />
                  </div>
                  <div className="project-name">{proj.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-detail-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-detail-content" onClick={e => e.stopPropagation()}>
            <button className="project-detail-close" onClick={() => setSelectedProject(null)}>×</button>
            <div className="project-detail-image">
              {selectedProject.img ? (
                <img src={selectedProject.img} alt={selectedProject.name} />
              ) : (
                <div className="project-emoji-placeholder">⏱️</div>
              )}
            </div>
            <h2 className="project-detail-name">{selectedProject.name}</h2>
            <p className="project-detail-desc">{selectedProject.desc}</p>
            <div className="project-detail-links">
              <a href={selectedProject.url} target="_blank" rel="noopener" className="project-detail-link primary">
                Visit Project →
              </a>
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener" className="project-detail-link">
                  View on GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT Window */}
      {openWindows.contact && (() => {
        const pos = getWindowPosition('contact')
        const zIndex = highestZIndex.current
        return (
        <div 
          className={`os-window ${openWindows.contact ? 'open' : ''}`} 
          onClick={() => setActiveWindow('contact')}
          style={{
            transform: 'none',
            left: pos.x,
            top: pos.y,
            zIndex
          }}
        >
          <div 
            className="window-header"
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleWindowMouseDown(e, 'contact')}
          >
            <div className="window-controls">
              <button className="win-close" onClick={(e) => closeWindow('contact', e)}>×</button>
            </div>
            <span className="window-title">Contact</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="contact-grid">
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
        )})()}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header">
            <span className="start-menu-logo">◉</span>
            <span>paseka.dev</span>
          </div>
          <div className="start-menu-stats">
            <div className="start-menu-stat">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">Session</span>
              <span className="stat-value">{formatSessionTime(sessionTime)}</span>
            </div>
            <div className="start-menu-stat">
              <span className="stat-icon">🕐</span>
              <span className="stat-label">Time</span>
              <span className="stat-value">{formatTime(time)}</span>
            </div>
            <div className="start-menu-stat click-counter" title="Total avatar clicks (hidden)">
              <span className="stat-icon">🐭</span>
              <span className="stat-label">Clicks</span>
              <span className="stat-value">{totalClicks}</span>
            </div>
          </div>
          <div className="start-menu-divider"></div>
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

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button className="start-button" onClick={() => setStartMenuOpen(!startMenuOpen)}>
            <span className="start-icon">☰</span>
            <span className="start-text">Menu</span>
          </button>
        </div>
        <div className="taskbar-right">
          <button className="rain-toggle" onClick={() => {
            const newVal = !raining
            setRaining(newVal)
            setRainMode(newVal)
            rainModeRef.current = newVal
            rainingRef.current = newVal
          }} title={raining ? 'Rain Off' : 'Rain On'}>
            {raining ? '🌧️' : '💧'}
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
                  if (zip && zip.length === 5) fetchWeather(zip)
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
          <div className="music-taskbar" style={{position: 'relative'}}>
            <button className="music-taskbar-btn" onClick={() => document.querySelector('.music-popup-taskbar').classList.toggle('show')} title={musicPlaying ? 'Pause Music' : 'Play Music'}>
              {musicPlaying ? '🎵' : '🎶'}
            </button>
            <div className="music-popup-taskbar">
              <div className="music-popup-header">🎵 Music</div>
              <div className="music-popup-track">{selectedTrack === 'jazz' ? 'Sax Jazz' : selectedTrack === 'piano' ? 'Piano Dreams' : 'Rain Sounds'}</div>
              <div className="music-popup-controls">
                <button className="music-playpause-btn" onClick={() => { if (audioRef.current) { if (musicPlaying) { audioRef.current.pause() } else { audioRef.current.play() }; setMusicPlaying(!musicPlaying) } }}>
                  {musicPlaying ? '⏸️' : '▶️'}
                </button>
              </div>
              <div className="music-popup-tracks">
                <button className={`music-track-btn ${selectedTrack === 'jazz' ? 'active' : ''}`} onClick={() => { setSelectedTrack('jazz'); if (audioRef.current) { audioRef.current.src = '/sax-jazz.mp3'; audioRef.current.play(); setMusicPlaying(true) } }}>🎷 Sax</button>
                <button className={`music-track-btn ${selectedTrack === 'piano' ? 'active' : ''}`} onClick={() => { setSelectedTrack('piano'); if (audioRef.current) { audioRef.current.src = '/piano-v2.mp3'; audioRef.current.play(); setMusicPlaying(true) } }}>🎹 Piano</button>
                <button className={`music-track-btn ${selectedTrack === 'rain' ? 'active' : ''}`} onClick={() => { setSelectedTrack('rain'); if (audioRef.current) { audioRef.current.src = '/rain-sounds.mp3'; audioRef.current.play(); setMusicPlaying(true) } }}>🌧️ Rain</button>
              </div>
              <div className="music-popup-vol">
                <span>🔊</span>
                <input type="range" min="0" max="1" step="0.05" value={musicVolume} onChange={(e) => { const v = parseFloat(e.target.value); setMusicVolume(v); if (audioRef.current) audioRef.current.volume = v }} className="music-vol-slider" />
              </div>
            </div>
          </div>
          <span className="taskbar-date">{formatDate(time)}</span>
          <span className="taskbar-clock">{formatTime(time)}</span>
          <button className="theme-toggle" onClick={() => setLightMode(!lightMode)} title={lightMode ? 'Dark Mode' : 'Light Mode'}>
            {lightMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  )
}