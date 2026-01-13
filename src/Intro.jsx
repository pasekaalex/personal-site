import { useState } from 'react'
import './Intro.css'

export default function Intro({ onEnter }) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [chaosMode, setChaosMode] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = ((e.clientX - centerX) / rect.width) * 100
    const y = ((e.clientY - centerY) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <div
      className={`intro-container ${aboutOpen ? 'zoomed' : ''} ${chaosMode ? 'chaos-mode' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div className="intro-content">
        <h1 className="name-title">Alex Paseka</h1>
        <div className="profile-pic-container">
          <div
            className="orbit-ring ring-1"
            style={{
              transform: `rotateZ(${mousePos.x * 0.5}deg) rotateX(${mousePos.y * 0.3}deg)`
            }}
          />
          <div
            className="orbit-ring ring-2"
            style={{
              transform: `rotateZ(${-mousePos.x * 0.3}deg) rotateY(${mousePos.y * 0.5}deg)`
            }}
          />
          <div
            className="orbit-ring ring-3"
            style={{
              transform: `rotateZ(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`
            }}
          />
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

