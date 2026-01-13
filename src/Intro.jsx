import { useState } from 'react'
import './Intro.css'

export default function Intro({ onEnter }) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [chaosMode, setChaosMode] = useState(false)

  return (
    <div className={`intro-container ${aboutOpen ? 'zoomed' : ''} ${chaosMode ? 'chaos-mode' : ''}`}>
      <div className="intro-content">
        <h1 className="name-title">Alex Paseka</h1>
        <img
          src="/avi.jpg"
          alt="Alex Paseka"
          className="profile-pic"
        />

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

