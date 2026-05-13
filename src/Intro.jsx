import { useState, useEffect, useRef } from 'react'
import './Intro.css'

export default function Intro() {
  const [windowOpen, setWindowOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="os-container">
      {/* Background */}
      <div className="bg-layer" />
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-vignette" />

      {/* Desktop Content */}
      <div className="desktop-content">
        <h1 className="desktop-title">paseka.dev</h1>
        <p className="desktop-subtitle">Click to explore</p>
        
        <div className="desktop-icons">
          <button className="icon-btn" onClick={() => setWindowOpen(true)}>
            <span className="icon">👤</span>
            <span className="icon-label">About</span>
          </button>
        </div>
      </div>

      {/* Window */}
      {windowOpen && (
        <div className="os-window open">
          <div className="window-header">
            <span className="window-title">About</span>
            <button className="win-close" onClick={() => setWindowOpen(false)}>×</button>
          </div>
          <div className="window-content">
            <div className="about-content">
              <img src="/avi.jpg" alt="Alex" className="avatar" />
              <h2>Alex Paseka</h2>
              <p>Full Stack Developer</p>
              <p>B.S. Computer Science — CUNY Brooklyn College</p>
              <div className="skills">
                <span className="skill">React</span>
                <span className="skill">JavaScript</span>
                <span className="skill">TypeScript</span>
                <span className="skill">Node.js</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dock */}
      <div className="dock">
        <button className="dock-item" onClick={() => setWindowOpen(true)}>
          <span className="dock-icon">👤</span>
        </button>
      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <span className="taskbar-left">paseka</span>
        <span className="taskbar-right">
          {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}