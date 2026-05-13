import { useState, useEffect, useRef, useCallback } from 'react'
import './Intro.css'

// Desktop icons config
const DESKTOP_ICONS = [
  { id: 'about', icon: '👤', label: 'About' },
  { id: 'projects', icon: '🚀', label: 'Projects' },
  { id: 'contact', icon: '📧', label: 'Contact' },
]

// Projects data
const PROJECTS = [
  {
    title: 'Bob Pants',
    desc: 'Procedurally generated NFT collection on the Blockchain',
    img: '/spongebob.png',
    link: 'https://opensea.io/collection/bobpants',
    color: '#9b59b6'
  },
  {
    title: 'GoonClicker',
    desc: 'Clicker game built with clicker mechanics',
    img: 'https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png',
    link: 'https://github.com/pasekaalex/Coomer',
    color: '#9b59b6'
  },
  {
    title: 'bulkOS',
    desc: 'Custom OS-themed React interface',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png',
    link: 'https://github.com/pasekaalex/bulk',
    color: '#9b59b6'
  },
  {
    title: 'bulk Bros',
    desc: 'Bulk-themed gaming project',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png',
    link: 'https://github.com/pasekaalex/bulk',
    color: '#9b59b6'
  },
  {
    title: 'bulkagachi',
    desc: 'Virtual pet / Tamagotchi style bulk game',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png',
    link: 'https://github.com/pasekaalex/bulk',
    color: '#9b59b6'
  },
  {
    title: 'bulk Climb',
    desc: 'Vertical climbing game',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png',
    link: 'https://github.com/pasekaalex/bulk',
    color: '#9b59b6'
  },
  {
    title: 'bulk Flappy',
    desc: 'Flappy Bird style bulk game',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png',
    link: 'https://github.com/pasekaalex/bulk',
    color: '#9b59b6'
  },
  {
    title: 'bulk Runner',
    desc: 'Endless runner game',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png',
    link: 'https://github.com/pasekaalex/bulk',
    color: '#9b59b6'
  },
  {
    title: 'Ready Heady',
    desc: 'Timer & productivity app',
    img: null,
    link: 'https://github.com/pasekaalex',
    color: '#9b59b6'
  },
]

// Skills data


export default function Intro() {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState({})
  const [activeWindow, setActiveWindow] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)
  const particleIdRef = useRef(0)

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
      
      // Add particle
      const id = ++particleIdRef.current
      const p = { id, x: e.clientX, y: e.clientY, alpha: 0.8, radius: 4, color: Math.random() > 0.5 ? '#9b59b6' : '#2d1b4e' }
      setParticles(prev => [...prev.slice(-30), p])
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          alpha: p.alpha - 0.03,
          radius: p.radius * 0.96,
          y: p.y - 0.5
        })).filter(p => p.alpha > 0)
        
        updated.forEach(p => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color + Math.floor(p.alpha * 80).toString(16).padStart(2, '0')
          ctx.fill()
        })
        
        return updated
      })

      // Mouse glow
      const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 60)
      gradient.addColorStop(0, 'rgba(155, 89, 182, 0.15)')
      gradient.addColorStop(1, 'rgba(155, 89, 182, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(pos.x - 60, pos.y - 60, 120, 120)

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

  return (
    <div className="os-container">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />

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
          <img src="/avi.jpg" alt="Alex Paseka" className="main-avatar" />
          <div className="avatar-ring" />
        </div>

        {/* Title Block */}
        <div className="title-block">
          <h1 className="desktop-title">
            <span className="title-alex">ALEX</span>
            <span className="title-paseka">PASEKA</span>
          </h1>
          <div className="title-divider" />
          <p className="desktop-subtitle">
            <span className="subtitle-bracket">[</span>
            Developer
            <span className="subtitle-bracket">]</span>
          </p>
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
              <span className="icon-emoji">{icon.icon}</span>
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
                <a key={i} href={proj.link} target="_blank" rel="noopener" className="project-card" style={{ '--proj-color': proj.color }}>
                  <div className="project-image-wrap">
                    {proj.img ? (
                      <img src={proj.img} alt={proj.title} className="project-image" />
                    ) : (
                      <div className="project-emoji-placeholder">⏱️</div>
                    )}
                    <div className="project-overlay" />
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.desc}</p>
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

      {/* Dock */}
      <div className="dock">
        {DESKTOP_ICONS.map(icon => (
          <button
            key={icon.id}
            className={`dock-item ${openWindows[icon.id] ? 'open' : ''}`}
            onClick={() => openWindow(icon.id)}
            title={icon.label}
          >
            <span className="dock-icon">{icon.icon}</span>
          </button>
        ))}
      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <span className="taskbar-user">paseka</span>
        </div>
        <div className="taskbar-right">
          <span className="taskbar-clock">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  )
}