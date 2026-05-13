import { useState, useEffect, useRef, useCallback } from 'react'
import './Intro.css'

// Desktop icons config
const DESKTOP_ICONS = [
  { id: 'about', icon: '👤', label: 'About' },
  { id: 'projects', icon: '🚀', label: 'Projects' },
  { id: 'skills', icon: '⚡', label: 'Skills' },
  { id: 'contact', icon: '📧', label: 'Contact' },
]

// Projects data
const PROJECTS = [
  {
    title: 'Bob Pants',
    desc: 'Procedurally generated NFT collection on the Blockchain',
    img: '/spongebob.png',
    link: 'https://opensea.io/collection/bobpants',
    color: '#FFD700'
  },
  {
    title: 'Arcade',
    desc: 'Onchain gaming platform with real rewards',
    img: '/background.jpg',
    link: 'https://github.com/pasekaalex/arcade',
    color: '#00f5ff'
  },
  {
    title: 'DeFi Dashboard',
    desc: 'Portfolio tracker & analytics for DeFi investments',
    img: 'https://raw.githubusercontent.com/pasekaalex/arcade/main/public/background.jpg',
    link: 'https://github.com/pasekaalex',
    color: '#bf00ff'
  },
  {
    title: 'AI Agent Kit',
    desc: 'Framework for building autonomous onchain agents',
    img: 'https://raw.githubusercontent.com/pasekaalex/arcade/main/public/background.jpg',
    link: 'https://github.com/pasekaalex',
    color: '#00ff88'
  },
]

// Skills data
const SKILLS = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 80 },
  { name: 'Solidity', level: 75 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'Docker', level: 78 },
  { name: 'AWS', level: 76 },
  { name: 'GraphQL', level: 80 },
  { name: 'Rust', level: 65 },
  { name: 'Next.js', level: 85 },
]

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
      const p = { id, x: e.clientX, y: e.clientY, alpha: 0.8, radius: 4, color: Math.random() > 0.5 ? '#00f5ff' : '#bf00ff' }
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
      gradient.addColorStop(0, 'rgba(0, 245, 255, 0.15)')
      gradient.addColorStop(1, 'rgba(0, 245, 255, 0)')
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
            Full Stack Developer
            <span className="subtitle-bracket">]</span>
          </p>
          <p className="desktop-tagline">Building the future, one commit at a time</p>
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
                <p className="about-role">Full Stack Developer & Blockchain Enthusiast</p>
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
                  <a href="mailto:alex@paseka.dev" className="about-link">
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
                    <img src={proj.img} alt={proj.title} className="project-image" />
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

      {/* SKILLS Window */}
      {openWindows.skills && (
        <div className={`os-window ${openWindows.skills ? 'open' : ''}`} onClick={() => setActiveWindow('skills')}>
          <div className="window-header">
            <div className="window-controls">
              <button className="win-close" onClick={(e) => closeWindow('skills', e)}>×</button>
            </div>
            <span className="window-title">Skills</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="skills-grid">
              {SKILLS.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
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
                <a href="mailto:alex@paseka.dev" className="contact-link">
                  <span className="contact-icon">✉</span>
                  <div>
                    <strong>Email</strong>
                    <span>alex@paseka.dev</span>
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