import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Intro.css'

export default function Intro() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [chaosMode, setChaosMode] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nameHovered, setNameHovered] = useState(false)
  const [nameTyping, setNameTyping] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [easterEgg, setEasterEgg] = useState(false)
  const [ripples, setRipples] = useState([])
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const profileCenterRef = useRef({ x: 0, y: 0 })
  const rippleIdRef = useRef(0)
  const typingTimeoutRef = useRef(null)
  const audioRef = useRef(null)
  const lastShakeRef = useRef(0)
  const shakeThresholdRef = useRef(15)

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

  const handleProfileDoubleClick = () => {
    setEasterEgg(true)
    // Create explosion of particles
    const rect = document.querySelector('.profile-pic')?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      // Create burst of 50 particles
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50
        const speed = 5 + Math.random() * 5
        createParticles(centerX, centerY, 1)
        // Give them radial velocity
        const lastParticle = particlesRef.current[particlesRef.current.length - 1]
        lastParticle.vx = Math.cos(angle) * speed
        lastParticle.vy = Math.sin(angle) * speed
      }
    }
    setTimeout(() => setEasterEgg(false), 2000)
  }

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = rippleIdRef.current++
    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 600)
  }

  const startTypingAnimation = () => {
    if (nameTyping) return // Don't restart if already typing

    setNameTyping(true)
    setTypedText('')
    const fullName = 'Alex Paseka'
    let currentIndex = 0

    const typeNextChar = () => {
      if (currentIndex < fullName.length) {
        setTypedText(fullName.slice(0, currentIndex + 1))
        currentIndex++
        typingTimeoutRef.current = setTimeout(typeNextChar, 100)
      } else {
        // Wait 2 seconds then reset
        typingTimeoutRef.current = setTimeout(() => {
          setNameTyping(false)
          setTypedText('')
        }, 2000)
      }
    }

    typeNextChar()
  }

  const handleNameHover = () => {
    setNameHovered(true)
    startTypingAnimation()
  }

  const handleNameClick = () => {
    // Only trigger on mobile/touch devices
    if (!('ontouchstart' in window)) return
    startTypingAnimation()
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

  useEffect(() => {
    // Cleanup typing timeout on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

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

  useEffect(() => {
    // Set up audio to loop
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Set volume to 30%
      audioRef.current.loop = true
    }
  }, [])

  useEffect(() => {
    // Shake detection for mobile
    const handleShake = (event) => {
      const acceleration = event.accelerationIncludingGravity
      if (!acceleration) return

      const currentTime = new Date().getTime()
      if (currentTime - lastShakeRef.current < 1000) return // Debounce 1 second

      const x = Math.abs(acceleration.x || 0)
      const y = Math.abs(acceleration.y || 0)
      const z = Math.abs(acceleration.z || 0)

      if (x > shakeThresholdRef.current || y > shakeThresholdRef.current || z > shakeThresholdRef.current) {
        lastShakeRef.current = currentTime
        setChaosMode(prev => !prev)
      }
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleShake)
      return () => window.removeEventListener('devicemotion', handleShake)
    }
  }, [])

  return (
    <div
      className={`intro-container ${aboutOpen ? 'zoomed' : ''} ${chaosMode ? 'chaos-mode' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="particle-canvas" />
      <audio ref={audioRef} src="/background-music.mp3" />
      <div className="intro-content">
        <h1
          className={`name-title ${nameHovered ? 'name-hovered' : ''} ${nameTyping ? 'name-typing' : ''}`}
          onMouseEnter={handleNameHover}
          onMouseLeave={() => setNameHovered(false)}
          onClick={handleNameClick}
        >
          {nameTyping ? (
            <>
              {typedText}
              <span className="typing-cursor">|</span>
            </>
          ) : (
            <>
              Alex Paseka
            </>
          )}
        </h1>
        <div className="profile-pic-container">
          <img
            src="/avi.jpg"
            alt="Alex Paseka"
            className={`profile-pic ${easterEgg ? 'easter-egg-active' : ''}`}
            style={{
              transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`
            }}
            onDoubleClick={handleProfileDoubleClick}
          />
        </div>

        <div className="about-section">
          <button
            className="about-button"
            onClick={(e) => {
              createRipple(e)
              setAboutOpen(!aboutOpen)
            }}
          >
            About {aboutOpen ? '▼' : '▶'}
            {ripples.map(ripple => (
              <span
                key={ripple.id}
                className="ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y
                }}
              />
            ))}
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

        <div className="skills-section">
          <button
            className="skills-button"
            onClick={(e) => {
              createRipple(e)
              setSkillsOpen(!skillsOpen)
            }}
          >
            Skills {skillsOpen ? '▼' : '▶'}
            {ripples.map(ripple => (
              <span
                key={ripple.id}
                className="ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y
                }}
              />
            ))}
          </button>

          {skillsOpen && (
            <div className="skills-dropdown">
              <div className="dropdown-item skills-grid">
                <div className="skill-item">
                  <span className="skill-icon">💎</span>
                  <span className="skill-name">Object Oriented Programming</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">⚛️</span>
                  <span className="skill-name">React.js</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🌐</span>
                  <span className="skill-name">Web Development</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">📁</span>
                  <span className="skill-name">File Server Management</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🐧</span>
                  <span className="skill-name">Linux Expertise</span>
                </div>
                <div className="skill-item">
                  <span className="skill-icon">🔧</span>
                  <span className="skill-name">System Administration</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="projects-section">
          <button
            className="projects-button"
            onClick={(e) => {
              createRipple(e)
              setProjectsOpen(!projectsOpen)
            }}
          >
            Projects {projectsOpen ? '▼' : '▶'}
            {ripples.map(ripple => (
              <span
                key={ripple.id}
                className="ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y
                }}
              />
            ))}
          </button>

          {projectsOpen && (
            <div className="projects-dropdown">
              <div className="dropdown-item">
                <a href="https://www.cockpants.lol" target="_blank" rel="noopener noreferrer" className="project-link-button spongebob-button">🧽 Cockpants →</a>
                <a href="https://www.cooming.lol" target="_blank" rel="noopener noreferrer" className="project-link-button cooming-button">💀 Cooming →</a>
                <a href="https://www.bulked.lol/os" target="_blank" rel="noopener noreferrer" className="project-link-button purple-button">🖥️ bulkOS →</a>
                <a href="https://readyheady.github.io/" target="_blank" rel="noopener noreferrer" className="project-link-button">⏱️ Ready Heady →</a>
                <a href="https://www.bulked.lol/games/bulkbros" target="_blank" rel="noopener noreferrer" className="project-link-button">🎮 bulk Bros →</a>
                <a href="https://www.bulked.lol/games/bulkagachi" target="_blank" rel="noopener noreferrer" className="project-link-button">🐾 bulkagachi →</a>
                <a href="https://www.bulked.lol/games/climb" target="_blank" rel="noopener noreferrer" className="project-link-button">🧗 bulk Climb →</a>
                <a href="https://www.bulked.lol/games/flappy" target="_blank" rel="noopener noreferrer" className="project-link-button">🐦 bulk Flappy →</a>
                <a href="https://www.bulked.lol/games/runner" target="_blank" rel="noopener noreferrer" className="project-link-button">🏃 bulk Runner →</a>
                <a href="https://www.bulked.lol" target="_blank" rel="noopener noreferrer" className="project-link-button purple-button">💪 All Bulk Games →</a>
                
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

      <button
        className="music-button"
        onClick={toggleMusic}
      >
        {musicPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  )
}

