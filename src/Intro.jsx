import { useState, useEffect, useRef } from 'react'
import './Intro.css'

export default function Intro() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeWindow, setActiveWindow] = useState(null)

  // Clock state
  const [time, setTime] = useState(new Date())
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
      setDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openWindow = (windowName) => {
    setActiveWindow(windowName)
    if (windowName === 'about') setAboutOpen(true)
    if (windowName === 'projects') setProjectsOpen(true)
    if (windowName === 'skills') setSkillsOpen(true)
    if (windowName === 'contact') setContactOpen(true)
  }

  const closeWindow = (windowName) => {
    if (windowName === 'about') setAboutOpen(false)
    if (windowName === 'projects') { setProjectsOpen(false); setSelectedProject(null) }
    if (windowName === 'skills') setSkillsOpen(false)
    if (windowName === 'contact') setContactOpen(false)
    if (activeWindow === windowName) setActiveWindow(null)
  }

  const formatTime = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes} ${ampm}`
  }

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
  }

  return (
    <div className="os-container">
      {/* Animated Background */}
      <div className="bg-layer"></div>
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      
      {/* Desktop Icons */}
      <div className="desktop-icons">
        <button 
          className={`desktop-icon ${activeWindow === 'about' && aboutOpen ? 'active' : ''}`}
          onClick={() => openWindow('about')}
        >
          <div className="icon-avatar">
            <img src="/avi.jpg" alt="Alex" />
          </div>
          <span>About Me</span>
        </button>
        
        <button 
          className={`desktop-icon ${activeWindow === 'projects' && projectsOpen ? 'active' : ''}`}
          onClick={() => openWindow('projects')}
        >
          <div className="icon-box">🎮</div>
          <span>Projects</span>
        </button>
        
        <button 
          className={`desktop-icon ${activeWindow === 'skills' && skillsOpen ? 'active' : ''}`}
          onClick={() => openWindow('skills')}
        >
          <div className="icon-box">⚡</div>
          <span>Skills</span>
        </button>

        <button 
          className={`desktop-icon ${activeWindow === 'contact' && contactOpen ? 'active' : ''}`}
          onClick={() => openWindow('contact')}
        >
          <div className="icon-box">📧</div>
          <span>Contact</span>
        </button>
      </div>

      {/* Windows */}
      <div className={`window-frame about-window ${aboutOpen ? 'open' : ''}`}>
        <div className="window-inner">
          <div className="window-titlebar" onClick={() => openWindow('about')}>
            <div className="titlebar-left">
              <div className="traffic-lights">
                <button className="light red" onClick={(e) => { e.stopPropagation(); closeWindow('about') }}></button>
                <button className="light yellow"></button>
                <button className="light green"></button>
              </div>
              <span className="window-title-text">About</span>
            </div>
            <div className="titlebar-right">
              <span className="window-id">001</span>
            </div>
          </div>
          <div className="window-body">
            <div className="about-hero">
              <div className="about-avatar-large">
                <img src="/avi.jpg" alt="Alex" />
                <div className="avatar-ring"></div>
              </div>
              <div className="about-info">
                <h1 className="about-name">Alex Paseka</h1>
                <p className="about-role">Full Stack Developer</p>
                <div className="about-badge">
                  <span className="badge-dot"></span>
                  <span>Available for work</span>
                </div>
              </div>
            </div>
            
            <div className="about-section">
              <h2 className="section-title">
                <span className="section-icon">🎓</span>
                Education
              </h2>
              <p>B.S. Computer Science — CUNY Brooklyn College</p>
            </div>

            <div className="about-section">
              <h2 className="section-title">
                <span className="section-icon">💡</span>
                About
              </h2>
              <p>I build things for the web — games, apps, and everything in between. Passionate about creating polished, interactive experiences with a focus on performance and aesthetics.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`window-frame projects-window ${projectsOpen ? 'open' : ''}`}>
        <div className="window-inner">
          <div className="window-titlebar" onClick={() => openWindow('projects')}>
            <div className="titlebar-left">
              <div className="traffic-lights">
                <button className="light red" onClick={(e) => { e.stopPropagation(); closeWindow('projects') }}></button>
                <button className="light yellow"></button>
                <button className="light green"></button>
              </div>
              <span className="window-title-text">Projects</span>
            </div>
            <div className="titlebar-right">
              <span className="window-id">002</span>
            </div>
          </div>
          <div className="window-body">
            <div className="projects-grid">
              <button 
                className={`project-card ${selectedProject === 'bob-pants' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bob-pants' ? null : 'bob-pants')}
              >
                <div className="card-image">
                  <img src="/spongebob.png" alt="Bob Pants" />
                </div>
                <div className="card-content">
                  <h3>Bob Pants <span className="tag-18">18+</span></h3>
                  <p>Spongebob parody with web games and simulated casino games.</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'goonclicker' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'goonclicker' ? null : 'goonclicker')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png" alt="GoonClicker" />
                </div>
                <div className="card-content">
                  <h3>GoonClicker <span className="tag-18">18+</span></h3>
                  <p>The ultimate idle clicker game. Click, level up your arm!</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'bulk-os' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bulk-os' ? null : 'bulk-os')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png" alt="bulkOS" />
                </div>
                <div className="card-content">
                  <h3>bulkOS</h3>
                  <p>Browser Operating System. Play bulk games in your browser.</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'bulk-bros' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bulk-bros' ? null : 'bulk-bros')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png" alt="bulk Bros" />
                </div>
                <div className="card-content">
                  <h3>bulk Bros</h3>
                  <p>6-world platformer with checkpoints, boss fights, combo system.</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'bulkagachi' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bulkagachi' ? null : 'bulkagachi')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png" alt="bulkagachi" />
                </div>
                <div className="card-content">
                  <h3>bulkagachi</h3>
                  <p>Virtual pet game. Care for Bulk through all life stages. 74 hand-made sprites!</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'bulk-climb' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bulk-climb' ? null : 'bulk-climb')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png" alt="bulk Climb" />
                </div>
                <div className="card-content">
                  <h3>bulk Climb</h3>
                  <p>Vertical climbing game. Jump between platforms, climb as high as possible!</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'bulk-flappy' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bulk-flappy' ? null : 'bulk-flappy')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png" alt="bulk Flappy" />
                </div>
                <div className="card-content">
                  <h3>bulk Flappy</h3>
                  <p>Flappy Bird clone. Tap to flap, avoid pipes, get the highest score!</p>
                </div>
              </button>
              
              <button 
                className={`project-card ${selectedProject === 'bulk-runner' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'bulk-runner' ? null : 'bulk-runner')}
              >
                <div className="card-image">
                  <img src="https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png" alt="bulk Runner" />
                </div>
                <div className="card-content">
                  <h3>bulk Runner</h3>
                  <p>Side-scrolling runner. Run, jump, slide under obstacles!</p>
                </div>
              </button>

              <button 
                className={`project-card ${selectedProject === 'ready-heady' ? 'selected' : ''}`}
                onClick={() => setSelectedProject(selectedProject === 'ready-heady' ? null : 'ready-heady')}
              >
                <div className="card-image placeholder">
                  <span>⏱️</span>
                </div>
                <div className="card-content">
                  <h3>Ready Heady</h3>
                  <p>Webapp timer for productivity. Built with React.</p>
                </div>
              </button>
            </div>

            {selectedProject && (
              <div className="project-detail">
                <div className="detail-header">
                  <h3>Project Details</h3>
                  <button className="detail-close" onClick={() => setSelectedProject(null)}>×</button>
                </div>
                <div className="detail-body">
                  {selectedProject === 'bob-pants' && (
                    <>
                      <p>Spongebob parody with web games and simulated casino games. Click your way to success!</p>
                      <div className="detail-actions">
                        <a href="https://www.cockpants.lol" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/cockpants" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'goonclicker' && (
                    <>
                      <p>The ultimate idle clicker game. Click, level up your arm, reach Arm Level 10!</p>
                      <div className="detail-actions">
                        <a href="https://www.cooming.lol" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/Coomer" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-os' && (
                    <>
                      <p>Browser Operating System. Play bulk games in your browser.</p>
                      <div className="detail-actions">
                        <a href="https://www.bulked.lol/os" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-bros' && (
                    <>
                      <p>6-world platformer with checkpoints, boss fights, and combo system.</p>
                      <div className="detail-actions">
                        <a href="https://www.bulked.lol/games/bulkbros" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulkagachi' && (
                    <>
                      <p>Virtual pet game. Care for Bulk through all life stages. 74 hand-made sprites!</p>
                      <div className="detail-actions">
                        <a href="https://www.bulked.lol/games/bulkagachi" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-climb' && (
                    <>
                      <p>Vertical climbing game. Jump between platforms, climb as high as possible!</p>
                      <div className="detail-actions">
                        <a href="https://www.bulked.lol/games/climb" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-flappy' && (
                    <>
                      <p>Flappy Bird clone. Tap to flap, avoid pipes, get the highest score!</p>
                      <div className="detail-actions">
                        <a href="https://www.bulked.lol/games/flappy" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'bulk-runner' && (
                    <>
                      <p>Side-scrolling runner. Run, jump, slide under obstacles!</p>
                      <div className="detail-actions">
                        <a href="https://www.bulked.lol/games/runner" target="_blank" rel="noopener noreferrer" className="action-btn primary">Play →</a>
                        <a href="https://github.com/pasekaalex/bulk" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                  {selectedProject === 'ready-heady' && (
                    <>
                      <p>Webapp timer for productivity. Built with React.</p>
                      <div className="detail-actions">
                        <a href="https://github.com/pasekaalex/readyheady" target="_blank" rel="noopener noreferrer" className="action-btn">GitHub</a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`window-frame skills-window ${skillsOpen ? 'open' : ''}`}>
        <div className="window-inner">
          <div className="window-titlebar" onClick={() => openWindow('skills')}>
            <div className="titlebar-left">
              <div className="traffic-lights">
                <button className="light red" onClick={(e) => { e.stopPropagation(); closeWindow('skills') }}></button>
                <button className="light yellow"></button>
                <button className="light green"></button>
              </div>
              <span className="window-title-text">Skills</span>
            </div>
            <div className="titlebar-right">
              <span className="window-id">003</span>
            </div>
          </div>
          <div className="window-body">
            <div className="skills-categories">
              <div className="skill-category">
                <h3 className="category-title">
                  <span className="cat-icon">🎨</span>
                  Frontend
                </h3>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">HTML/CSS</span>
                  <span className="skill-tag">Three.js</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3 className="category-title">
                  <span className="cat-icon">⚙️</span>
                  Backend
                </h3>
                <div className="skill-tags">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">PostgreSQL</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3 className="category-title">
                  <span className="cat-icon">🛠️</span>
                  Tools
                </h3>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">Linux</span>
                  <span className="skill-tag">Vite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`window-frame contact-window ${contactOpen ? 'open' : ''}`}>
        <div className="window-inner">
          <div className="window-titlebar" onClick={() => openWindow('contact')}>
            <div className="titlebar-left">
              <div className="traffic-lights">
                <button className="light red" onClick={(e) => { e.stopPropagation(); closeWindow('contact') }}></button>
                <button className="light yellow"></button>
                <button className="light green"></button>
              </div>
              <span className="window-title-text">Contact</span>
            </div>
            <div className="titlebar-right">
              <span className="window-id">004</span>
            </div>
          </div>
          <div className="window-body">
            <div className="contact-links">
              <a href="https://github.com/pasekaalex" target="_blank" rel="noopener noreferrer" className="contact-card">
                <span className="contact-icon">🐙</span>
                <div className="contact-info">
                  <h4>GitHub</h4>
                  <p>@pasekaalex</p>
                </div>
                <span className="contact-arrow">→</span>
              </a>
              
              <a href="mailto:alex@paseka.dev" className="contact-card">
                <span className="contact-icon">📧</span>
                <div className="contact-info">
                  <h4>Email</h4>
                  <p>alex@paseka.dev</p>
                </div>
                <span className="contact-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className="dock">
        <div className="dock-items">
          <button 
            className={`dock-item ${aboutOpen ? 'active' : ''}`}
            onClick={() => openWindow('about')}
          >
            <div className="dock-icon">👤</div>
            <span className="dock-label">About</span>
            {aboutOpen && <div className="dock-indicator"></div>}
          </button>
          
          <button 
            className={`dock-item ${projectsOpen ? 'active' : ''}`}
            onClick={() => openWindow('projects')}
          >
            <div className="dock-icon">🎮</div>
            <span className="dock-label">Projects</span>
            {projectsOpen && <div className="dock-indicator"></div>}
          </button>
          
          <button 
            className={`dock-item ${skillsOpen ? 'active' : ''}`}
            onClick={() => openWindow('skills')}
          >
            <div className="dock-icon">⚡</div>
            <span className="dock-label">Skills</span>
            {skillsOpen && <div className="dock-indicator"></div>}
          </button>

          <button 
            className={`dock-item ${contactOpen ? 'active' : ''}`}
            onClick={() => openWindow('contact')}
          >
            <div className="dock-icon">📧</div>
            <span className="dock-label">Contact</span>
            {contactOpen && <div className="dock-indicator"></div>}
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="menu-bar">
        <div className="menu-left">
          <span className="menu-logo">paseka.dev</span>
        </div>
        <div className="menu-center">
          {aboutOpen && <span className="menu-breadcrumb">About</span>}
          {projectsOpen && <span className="menu-breadcrumb">Projects</span>}
          {skillsOpen && <span className="menu-breadcrumb">Skills</span>}
          {contactOpen && <span className="menu-breadcrumb">Contact</span>}
        </div>
        <div className="menu-right">
          <span className="menu-date">{formatDate(date)}</span>
          <span className="menu-time">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  )
}