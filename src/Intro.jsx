import { useState, useEffect, useRef, useCallback } from 'react'
import './Intro.css'

// ============================================
// MOUSE CURSOR EFFECTS
// ============================================
function CursorEffects() {
  const canvasRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const particles = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      // Add new particles on mouse move
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 3 + 1,
          hue: Math.random() * 60 + 160 // cyan to purple range
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.current = particles.current.filter(p => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.015
        p.vy += 0.02 // slight gravity
        
        if (p.life <= 0) return false
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life * 0.8})`
        ctx.fill()
        
        // Glow
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${p.life})`
        
        return true
      })
      
      // Draw cursor glow
      const mp = mousePos.current
      const gradient = ctx.createRadialGradient(mp.x, mp.y, 0, mp.x, mp.y, 80)
      gradient.addColorStop(0, 'rgba(0, 245, 255, 0.15)')
      gradient.addColorStop(0.5, 'rgba(191, 0, 255, 0.05)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(mp.x - 80, mp.y - 80, 160, 160)
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-canvas" />
}

// ============================================
// PARALLAX AVATAR - About window avatar that follows mouse
// ============================================
function ParallaxAvatar({ mousePosition }) {
  const offset = 10 // max pixels of movement
  const x = (mousePosition.x / window.innerWidth - 0.5) * offset
  const y = (mousePosition.y / window.innerHeight - 0.5) * offset
  
  return (
    <div className="about-avatar parallax" style={{
      transform: `translate(${x}px, ${y}px)`
    }}>
      <img src="/avi.jpg" alt="Alex" />
      <div className="avatar-ring" />
    </div>
  )
}

// ============================================
// WINDOW MANAGER HOOK
// ============================================
function useWindowManager() {
  const [windows, setWindows] = useState([
    { id: 'about', title: 'About', open: false, minimized: false, maximized: false, zIndex: 100, x: 150, y: 80 },
    { id: 'projects', title: 'Projects', open: false, minimized: false, maximized: false, zIndex: 100, x: 180, y: 100 },
    { id: 'skills', title: 'Skills', open: false, minimized: false, maximized: false, zIndex: 100, x: 100, y: 120 },
    { id: 'contact', title: 'Contact', open: false, minimized: false, maximized: false, zIndex: 100, x: 200, y: 140 },
    { id: 'terminal', title: 'Terminal', open: false, minimized: false, maximized: false, zIndex: 100, x: 220, y: 160 },
    { id: 'files', title: 'Files', open: false, minimized: false, maximized: false, zIndex: 100, x: 240, y: 180 },
    { id: 'settings', title: 'Settings', open: false, minimized: false, maximized: false, zIndex: 100, x: 260, y: 200 },
  ])
  const [activeWindow, setActiveWindow] = useState(null)
  const [maxZ, setMaxZ] = useState(100)

  const openWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, open: true, minimized: false } : w))
    setMaxZ(prev => prev + 1)
    setActiveWindow(id)
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, open: false } : w))
    if (activeWindow === id) setActiveWindow(null)
  }, [activeWindow])

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w))
    if (activeWindow === id) setActiveWindow(null)
  }, [activeWindow])

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w))
  }, [])

  const focusWindow = useCallback((id) => {
    setMaxZ(prev => prev + 1)
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w))
    setActiveWindow(id)
  }, [maxZ])

  const updateWindowPosition = useCallback((id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w))
  }, [])

  return { windows, activeWindow, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition }
}

// ============================================
// CONTEXT MENU
// ============================================
function ContextMenu({ x, y, onClose, openWindow }) {
  const menuRef = useRef(null)
  useEffect(() => {
    const handleClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) onClose() }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [onClose])

  const items = [
    { icon: '👤', label: 'About', action: () => { openWindow('about'); onClose() } },
    { icon: '🎮', label: 'Projects', action: () => { openWindow('projects'); onClose() } },
    { icon: '⚡', label: 'Skills', action: () => { openWindow('skills'); onClose() } },
    { icon: '📧', label: 'Contact', action: () => { openWindow('contact'); onClose() } },
    { icon: '💻', label: 'Terminal', action: () => { openWindow('terminal'); onClose() } },
    { icon: '📁', label: 'Files', action: () => { openWindow('files'); onClose() } },
    { icon: '⚙️', label: 'Settings', action: () => { openWindow('settings'); onClose() } },
  ]

  return (
    <div className="context-menu" style={{ left: x, top: y }} ref={menuRef}>
      {items.map((item, i) => (
        <button key={i} className="context-item" onClick={item.action}>
          <span className="ctx-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// ============================================
// DRAGGABLE WINDOW
// ============================================
function Window({ window, onClose, onMinimize, onMaximize, onFocus, onPositionChange, children }) {
  const [isDragging, setIsDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return
    setIsDragging(true)
    dragOffset.current = { x: e.clientX - window.x, y: e.clientY - window.y }
    onFocus()
  }

  const handleMouseMove = useCallback((e) => {
    if (isDragging && !window.maximized) {
      let newX = e.clientX - dragOffset.current.x
      let newY = e.clientY - dragOffset.current.y
      if (newX < 10) newX = 0
      if (newY < 50) newY = 50
      onPositionChange(window.id, newX, newY)
    }
  }, [isDragging, window, onPositionChange])

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove])

  const windowStyle = window.maximized
    ? { top: 50, left: 0, width: '100%', height: 'calc(100vh - 90px)', borderRadius: 0, zIndex: window.zIndex }
    : { top: window.y, left: window.x, width: 520, height: 450, zIndex: window.zIndex }

  return (
    <div className={`os-window ${window.open && !window.minimized ? 'open' : ''} ${window.maximized ? 'maximized' : ''}`} style={windowStyle}>
      <div className="window-header" onMouseDown={handleMouseDown}>
        <div className="window-title"><span className="window-title-text">{window.title}</span></div>
        <div className="window-controls">
          <button className="win-btn minimize" onClick={() => onMinimize(window.id)}>─</button>
          <button className="win-btn maximize" onClick={() => onMaximize(window.id)}>□</button>
          <button className="win-btn close" onClick={() => onClose(window.id)}>×</button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  )
}

// ============================================
// TERMINAL
// ============================================
function Terminal() {
  const [lines, setLines] = useState([
    { type: 'system', text: '╔════════════════════════════════════╗' },
    { type: 'system', text: '║  Welcome to pasekaOS Terminal v1   ║' },
    { type: 'system', text: '╚════════════════════════════════════╝' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type "help" for commands.' },
    { type: 'output', text: '' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  const commands = {
    help: () => [
      { type: 'output', text: '' }, { type: 'output', text: '  help      - Show help' },
      { type: 'output', text: '  about     - About Alex' }, { type: 'output', text: '  projects  - List projects' },
      { type: 'output', text: '  skills    - Show skills' }, { type: 'output', text: '  contact   - Contact info' },
      { type: 'output', text: '  neofetch  - System info' }, { type: 'output', text: '  clear     - Clear terminal' },
      { type: 'output', text: '' },
    ],
    about: () => [
      { type: 'output', text: '' }, { type: 'output', text: '  Alex Paseka' },
      { type: 'output', text: '  Full Stack Developer' }, { type: 'output', text: '' },
      { type: 'output', text: '  B.S. Computer Science' }, { type: 'output', text: '  CUNY Brooklyn College' },
      { type: 'output', text: '' },
    ],
    projects: () => [
      { type: 'output', text: '' }, { type: 'output', text: '  [1] Bob Pants' },
      { type: 'output', text: '  [2] GoonClicker' }, { type: 'output', text: '  [3] bulkOS' },
      { type: 'output', text: '  [4] bulk Bros' }, { type: 'output', text: '  [5] bulkagachi' },
      { type: 'output', text: '' },
    ],
    skills: () => [
      { type: 'output', text: '' }, { type: 'output', text: '  React, JavaScript, TypeScript' },
      { type: 'output', text: '  Node.js, Python, PostgreSQL' }, { type: 'output', text: '  Git, Docker, Linux' },
      { type: 'output', text: '' },
    ],
    contact: () => [
      { type: 'output', text: '' }, { type: 'output', text: '  GitHub: github.com/pasekaalex' },
      { type: 'output', text: '  Email: alex@paseka.dev' }, { type: 'output', text: '' },
    ],
    clear: () => 'CLEAR',
    neofetch: () => [
      { type: 'output', text: '' }, { type: 'output', text: '  pasekaOS 1.0.0' },
      { type: 'output', text: '  Shell: bash' }, { type: 'output', text: '  Theme: Cyberpunk Neon' },
      { type: 'output', text: '' },
    ],
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    let newLines = [...lines, { type: 'input', text: `> ${input}` }]
    if (cmd === 'clear') {
      setLines([{ type: 'system', text: 'Terminal cleared.' }])
    } else if (commands[cmd]) {
      newLines = [...newLines, ...commands[cmd]()]
    } else if (cmd) {
      newLines.push({ type: 'error', text: `Unknown: ${cmd}` })
    }
    setLines(newLines)
    setInput('')
    setTimeout(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight }, 10)
  }

  return (
    <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef}>
        {lines.map((line, i) => <div key={i} className={`term-line ${line.type}`}>{line.text}</div>)}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-line">
        <span className="term-prompt">$</span>
        <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} className="term-input" autoFocus />
      </form>
    </div>
  )
}

// ============================================
// FILES EXPLORER
// ============================================
function FilesExplorer() {
  return (
    <div className="files-explorer">
      <div className="files-sidebar">
        <div className="sidebar-section">
          <h4>Favorites</h4>
          <div className="sidebar-item">⭐ GitHub</div>
          <div className="sidebar-item">⭐ Projects</div>
        </div>
      </div>
      <div className="files-main">
        <div className="files-path">/home/paseka</div>
        <div className="files-grid">
          <div className="file-item folder"><span>📁 Projects</span></div>
          <div className="file-item folder"><span>📁 Games</span></div>
          <div className="file-item"><span>📄 README.md</span><span className="file-size">2.4 KB</span></div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SETTINGS
// ============================================
function Settings({ accentColor, setAccentColor }) {
  return (
    <div className="settings-window">
      <div className="settings-section">
        <h3>🎨 Accent Color</h3>
        <div className="color-options">
          {['#00f5ff', '#ff00ff', '#bf00ff', '#3b82f6', '#4cd964', '#ff9500'].map(c => (
            <button key={c} className={`color-btn ${accentColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => setAccentColor(c)} />
          ))}
        </div>
      </div>
      <div className="settings-section">
        <h3>⌨️ Shortcuts</h3>
        <div className="shortcut-list">
          <div className="shortcut-item"><kbd>⌘1</kbd>-<kbd>7</kbd> <span>Open apps</span></div>
          <div className="shortcut-item"><kbd>Esc</kbd> <span>Close menu</span></div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================
export default function Intro() {
  const { windows, activeWindow, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition } = useWindowManager()
  const [contextMenu, setContextMenu] = useState(null)
  const [toasts, setToasts] = useState([])
  const [accentColor, setAccentColor] = useState('#00f5ff')
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { setContextMenu(null); setStartMenuOpen(false) }
      if (e.key === 'Delete' && activeWindow) closeWindow(activeWindow)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeWindow, closeWindow])

  const handleContextMenu = (e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }) }
  const showToast = (message) => {
    setToasts(prev => [...prev, { id: Date.now(), message }])
    setTimeout(() => setToasts(prev => prev.slice(1)), 3000)
  }
  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
  }
  const handleDockClick = (id) => {
    const win = windows.find(w => w.id === id)
    if (!win.open) openWindow(id)
    else if (win.minimized) { minimizeWindow(id); focusWindow(id) }
    else if (activeWindow === id) minimizeWindow(id)
    else focusWindow(id)
  }

  return (
    <div className="os-container" onContextMenu={handleContextMenu} style={{ '--accent': accentColor }}>
      {/* Mouse Cursor Effects */}
      <CursorEffects />

      {/* Background Layers */}
      <div className="bg-layer" /><div className="bg-grid" /><div className="bg-glow" /><div className="bg-vignette" />

      {/* Windows */}
      <Window window={windows.find(w => w.id === 'about')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('about')} onPositionChange={updateWindowPosition}>
        <div className="about-content">
          <div className="about-hero">
            <ParallaxAvatar mousePosition={mousePosition} />
            <div className="about-info">
              <h1 className="about-name">Alex Paseka</h1>
              <p className="about-role">Full Stack Developer</p>
              <div className="about-badge"><span className="badge-dot" /><span>Available for work</span></div>
            </div>
          </div>
          <div className="about-section"><h2 className="section-title">🎓 Education</h2><p>B.S. Computer Science — CUNY Brooklyn College</p></div>
          <div className="about-section"><h2 className="section-title">💡 About</h2><p>I build things for the web — games, apps, and everything in between.</p></div>
        </div>
      </Window>

      <Window window={windows.find(w => w.id === 'projects')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('projects')} onPositionChange={updateWindowPosition}>
        <div className="projects-grid">
          {[
            { name: 'Bob Pants', desc: 'Spongebob parody', img: '/spongebob.png', url: 'https://www.cockpants.lol' },
            { name: 'GoonClicker', desc: 'Idle clicker game', img: 'https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png', url: 'https://www.cooming.lol' },
            { name: 'bulkOS', desc: 'Browser OS', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png', url: 'https://www.bulked.lol/os' },
            { name: 'bulk Bros', desc: 'Platformer game', img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png', url: 'https://www.bulked.lol/games/bulkbros' },
          ].map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="card-image">{p.img ? <img src={p.img} alt={p.name} /> : <span>⏱️</span>}</div>
              <div className="card-content"><h3>{p.name}</h3><p>{p.desc}</p></div>
            </a>
          ))}
        </div>
      </Window>

      <Window window={windows.find(w => w.id === 'skills')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('skills')} onPositionChange={updateWindowPosition}>
        <div className="skills-categories">
          <div className="skill-category"><h3 className="category-title">🎨 Frontend</h3><div className="skill-tags"><span className="skill-tag">React</span><span className="skill-tag">JavaScript</span><span className="skill-tag">TypeScript</span></div></div>
          <div className="skill-category"><h3 className="category-title">⚙️ Backend</h3><div className="skill-tags"><span className="skill-tag">Node.js</span><span className="skill-tag">Python</span></div></div>
        </div>
      </Window>

      <Window window={windows.find(w => w.id === 'contact')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('contact')} onPositionChange={updateWindowPosition}>
        <div className="contact-links">
          <a href="https://github.com/pasekaalex" target="_blank" rel="noopener noreferrer" className="contact-card"><span className="contact-icon">🐙</span><div className="contact-info"><h4>GitHub</h4><p>@pasekaalex</p></div></a>
          <a href="mailto:alex@paseka.dev" className="contact-card"><span className="contact-icon">📧</span><div className="contact-info"><h4>Email</h4><p>alex@paseka.dev</p></div></a>
        </div>
      </Window>

      <Window window={windows.find(w => w.id === 'terminal')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('terminal')} onPositionChange={updateWindowPosition}><Terminal /></Window>
      <Window window={windows.find(w => w.id === 'files')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('files')} onPositionChange={updateWindowPosition}><FilesExplorer /></Window>
      <Window window={windows.find(w => w.id === 'settings')} onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow} onFocus={() => focusWindow('settings')} onPositionChange={updateWindowPosition}><Settings accentColor={accentColor} setAccentColor={setAccentColor} /></Window>

      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} openWindow={openWindow} />}
      <div className="toast-container">{toasts.map(t => <div key={t.id} className="toast">{t.message}</div>)}</div>

      <div className="menu-bar">
        <div className="menu-left">
          <button className="start-btn" onClick={() => setStartMenuOpen(!startMenuOpen)}><span className="start-icon">◉</span></button>
        </div>
        <div className="menu-right">
          <span className="menu-date">{formatDate(time)}</span>
          <span className="menu-time">{formatTime(time)}</span>
        </div>
      </div>

      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-header"><div className="start-logo">◉ paseka.dev</div></div>
          <div className="start-apps">
            {[{ icon: '👤', name: 'About', id: 'about' }, { icon: '🎮', name: 'Projects', id: 'projects' }, { icon: '⚡', name: 'Skills', id: 'skills' }, { icon: '📧', name: 'Contact', id: 'contact' }, { icon: '💻', name: 'Terminal', id: 'terminal' }, { icon: '📁', name: 'Files', id: 'files' }, { icon: '⚙️', name: 'Settings', id: 'settings' }].map(app => (
              <button key={app.id} className="start-app" onClick={() => { openWindow(app.id); setStartMenuOpen(false) }}><span className="app-icon">{app.icon}</span><span className="app-name">{app.name}</span></button>
            ))}
          </div>
        </div>
      )}

      <div className="dock">
        <div className="dock-items">
          {[{ icon: '👤', id: 'about' }, { icon: '🎮', id: 'projects' }, { icon: '⚡', id: 'skills' }, { icon: '📧', id: 'contact' }, { icon: '💻', id: 'terminal' }, { icon: '📁', id: 'files' }, { icon: '⚙️', id: 'settings' }].map(app => (
            <button key={app.id} className={`dock-item ${windows.find(w => w.id === app.id)?.open ? 'has-app' : ''}`} onClick={() => handleDockClick(app.id)}>
              <div className="dock-icon">{app.icon}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}