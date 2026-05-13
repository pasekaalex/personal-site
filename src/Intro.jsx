import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Intro.css'

export default function Intro() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Clock state
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="os-container" style={{ backgroundImage: `url(/desktop-bg.jpg)` }}>
      
      {/* Desktop Area */}
      <div className="desktop-area">
        
        {/* About Window */}
        <div className={`os-window ${aboutOpen ? 'open' : ''}`}>
          <div className="window-header">
            <span className="window-title">About</span>
            <button className="window-close" onClick={() => setAboutOpen(false)}>×</button>
          </div>
          {aboutOpen && (
            <div className="window-content">
              <div className="about-content">
                <img src="/avi.jpg" alt="Alex" className="about-avatar" />
                <div className="about-text">
                  <p><strong>Education:</strong> Bachelors of Science in Computer Science, CUNY Brooklyn College</p>
                </div>
              </div>
            </div>
          )}
          {!aboutOpen && (
            <button className="window-launcher" onClick={() => setAboutOpen(true)}>
              <span className="launcher-icon">👤</span>
              <span className="launcher-label">About</span>
            </button>
          )}
        </div>

        {/* Projects Window */}
        <div className={`os-window ${projectsOpen ? 'open' : ''}`}>
          <div className="window-header">
            <span className="window-title">Projects</span>
            <button className="window-close" onClick={() => { setProjectsOpen(false); setSelectedProject(null); }}>×</button>
          </div>
          {projectsOpen ? (
            <div className="window-content projects-content">
              <div className="projects-row">
                <button 
                  className={`project-tile ${selectedProject === 'bob-pants' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bob-pants' ? null : 'bob-pants')}
                >
                  <img src="/spongebob.png" alt="Bob Pants" className="tile-img" />
                  <span>Bob Pants</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'goonclicker' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'goonclicker' ? null : 'goonclicker')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png" alt="GoonClicker" className="tile-img" />
                  <span>GoonClicker</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'bulk-os' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bulk-os' ? null : 'bulk-os')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png" alt="bulkOS" className="tile-img" />
                  <span>bulkOS</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'bulk-bros' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bulk-bros' ? null : 'bulk-bros')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png" alt="bulk Bros" className="tile-img" />
                  <span>bulk Bros</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'bulkagachi' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bulkagachi' ? null : 'bulkagachi')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png" alt="bulkagachi" className="tile-img" />
                  <span>bulkagachi</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'bulk-climb' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bulk-climb' ? null : 'bulk-climb')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png" alt="bulk Climb" className="tile-img" />
                  <span>bulk Climb</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'bulk-flappy' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bulk-flappy' ? null : 'bulk-flappy')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png" alt="bulk Flappy" className="tile-img" />
                  <span>bulk Flappy</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'bulk-runner' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'bulk-runner' ? null : 'bulk-runner')}
                >
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png" alt="bulk Runner" className="tile-img" />
                  <span>bulk Runner</span>
                </button>
                <button 
                  className={`project-tile ${selectedProject === 'ready-heady' ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(selectedProject === 'ready-heady' ? null : 'ready-heady')}
                >
                  <div className="tile-placeholder">⏱️</div>
                  <span>Ready Heady</span>
                </button>
              </div>

              {selectedProject && (
                <div className="project-detail-panel">
                  {selectedProject === 'bob-pants' && (
                    <>
                      <h3>Bob Pants <span className="tag-18">18+</span></h3>
                      <p>Spongebob parody with web games and simulated casino games.</p>
                      <div className="detail-links">
                        <a href="https://www.cockpants.lol" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/cockpants" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'goonclicker' && (
                    <>
                      <h3>GoonClicker <span className="tag-18">18+</span></h3>
                      <p>The ultimate idle clicker game. Click, level up your arm, reach Arm Level 10!</p>
                      <div className="detail-links">
                        <a href="https://www.cooming.lol" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/Coomer" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-os' && (
                    <>
                      <h3>bulkOS</h3>
                      <p>Browser Operating System. Play bulk games in your browser.</p>
                      <div className="detail-links">
                        <a href="https://www.bulked.lol/os" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-bros' && (
                    <>
                      <h3>bulk Bros</h3>
                      <p>6-world platformer with checkpoints, boss fights, and combo system.</p>
                      <div className="detail-links">
                        <a href="https://www.bulked.lol/games/bulkbros" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulkagachi' && (
                    <>
                      <h3>bulkagachi</h3>
                      <p>Virtual pet game. Care for Bulk through all life stages. 74 hand-made sprites!</p>
                      <div className="detail-links">
                        <a href="https://www.bulked.lol/games/bulkagachi" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-climb' && (
                    <>
                      <h3>bulk Climb</h3>
                      <p>Vertical climbing game. Jump between platforms, climb as high as possible!</p>
                      <div className="detail-links">
                        <a href="https://www.bulked.lol/games/climb" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-flappy' && (
                    <>
                      <h3>bulk Flappy</h3>
                      <p>Flappy Bird clone. Tap to flap, avoid pipes, get the highest score!</p>
                      <div className="detail-links">
                        <a href="https://www.bulked.lol/games/flappy" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-runner' && (
                    <>
                      <h3>bulk Runner</h3>
                      <p>Side-scrolling runner. Run, jump, slide under obstacles!</p>
                      <div className="detail-links">
                        <a href="https://www.bulked.lol/games/runner" target="_blank" rel="noopener noreferrer" className="os-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'ready-heady' && (
                    <>
                      <h3>Ready Heady</h3>
                      <p>Webapp timer for productivity. Built with React.</p>
                      <div className="detail-links">
                        <a href="https://github.com/pasekaalex/readyheady" target="_blank" rel="noopener noreferrer" className="os-btn">GitHub →</a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button className="window-launcher" onClick={() => setProjectsOpen(true)}>
              <span className="launcher-icon">🎮</span>
              <span className="launcher-label">Projects</span>
            </button>
          )}
        </div>

        {/* Skills Window */}
        <div className={`os-window ${skillsOpen ? 'open' : ''}`}>
          <div className="window-header">
            <span className="window-title">Skills</span>
            <button className="window-close" onClick={() => setSkillsOpen(false)}>×</button>
          </div>
          {skillsOpen ? (
            <div className="window-content">
              <div className="skills-grid">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Linux</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">PostgreSQL</span>
              </div>
            </div>
          ) : (
            <button className="window-launcher" onClick={() => setSkillsOpen(true)}>
              <span className="launcher-icon">⚡</span>
              <span className="launcher-label">Skills</span>
            </button>
          )}
        </div>

      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <span className="taskbar-user">paseka</span>
        </div>
        <div className="taskbar-right">
          <span className="taskbar-time">
            {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}