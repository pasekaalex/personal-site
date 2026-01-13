import { useState, useEffect, useRef } from 'react'
import './Intro.css'

export default function Intro({ onEnter }) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [chaosMode, setChaosMode] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const profileCenterRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = ((e.clientX - centerX) / rect.width) * 100
    const y = ((e.clientY - centerY) / rect.height) * 100
    setMousePos({ x, y })

    // Create particles at mouse position
    createParticles(e.clientX, e.clientY, 3)
  }

  const createParticles = (x, y, count) => {
    const colors = ['#00f5ff', '#bf00ff', '#ff6b00', '#ffffff', '#a78bfa']
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.01
      })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d')

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Emit particles from profile picture
      if (profileCenterRef.current.x && profileCenterRef.current.y) {
        if (Math.random() > 0.7) {
          const angle = Math.random() * Math.PI * 2
          const distance = 100 + Math.random() * 20
          const x = profileCenterRef.current.x + Math.cos(angle) * distance
          const y = profileCenterRef.current.y + Math.sin(angle) * distance
          createParticles(x, y, 1)
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // gravity
        particle.life -= particle.decay

        if (particle.life > 0) {
          ctx.save()
          ctx.globalAlpha = particle.life
          ctx.fillStyle = particle.color
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
          return true
        }
        return false
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Update profile center position
    const updateProfileCenter = () => {
      const profilePic = document.querySelector('.profile-pic')
      if (profilePic) {
        const rect = profilePic.getBoundingClientRect()
        profileCenterRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      }
    }
    updateProfileCenter()
    window.addEventListener('resize', updateProfileCenter)
    return () => window.removeEventListener('resize', updateProfileCenter)
  }, [])

  return (
    <div
      className={`intro-container ${aboutOpen ? 'zoomed' : ''} ${chaosMode ? 'chaos-mode' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="intro-content">
        <h1 className="name-title">Alex Paseka</h1>
        <div className="profile-pic-container">
          <img
            src="/avi.jpg"
            alt="Alex Paseka"
            className="profile-pic"
            style={{
              transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`
            }}
          />
        </div>

        <div className="about-section">
          <button
            className="about-button"
            onClick={() => setAboutOpen(!aboutOpen)}
          >
            About {aboutOpen ? '▼' : '▶'}
          </button>

          {aboutOpen && (
            <div className="about-dropdown">
              <div className="dropdown-item">
                <strong>Education:</strong>
                <p>Bachelors of Science in Computer Science</p>
                <p>CUNY Brooklyn College</p>
              </div>
            </div>
          )}
        </div>

        <div className="projects-section">
          <button
            className="projects-button"
            onClick={() => setProjectsOpen(!projectsOpen)}
          >
            Projects {projectsOpen ? '▼' : '▶'}
          </button>

          {projectsOpen && (
            <div className="projects-dropdown">
              <div className="dropdown-item">
                <button
                  className="project-link-button"
                  onClick={onEnter}
                >
                  React Arcade →
                </button>
                <a
                  href="https://www.Bulked.lol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-button purple-button"
                >
                  $Bulk →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        className="chaos-button"
        onClick={() => setChaosMode(!chaosMode)}
      >
        {chaosMode ? '⚠ disable ⚠' : '⚡ chaos'}
      </button>
    </div>
  )
}

