import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import './Intro.css'

// Desktop icons config
const DESKTOP_ICONS = [
  { id: 'about', icon: '/icons/about.png', label: 'About' },
  { id: 'projects', icon: '/icons/projects.png', label: 'Projects' },
  { id: 'contact', icon: '/icons/contact.png', label: 'Contact' },
]

// Projects data
const PROJECTS = [
  {
    name: 'Bob Pants',
    img: '/spongebob.png',
    url: 'https://www.cockpants.lol',
    github: 'https://github.com/pasekaalex/bobpants',
    desc: '18+ content platform'
  },
  {
    name: 'GoonClicker',
    img: 'https://raw.githubusercontent.com/pasekaalex/Coomer/master/assets/nav-banner.png',
    url: 'https://www.cooming.lol',
    github: 'https://github.com/pasekaalex/coomer',
    desc: 'Clicker game'
  },
  {
    name: 'Bulk-OS',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/OS-bulk.png',
    url: 'https://www.bulked.lol/os',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Custom operating system'
  },
  {
    name: 'Bulk Bros',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverbros.png',
    url: 'https://www.bulked.lol/games/bulkbros',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Co-op arcade game'
  },
  {
    name: 'Bulkagachi',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/cover-baby.png',
    url: 'https://www.bulked.lol/games/bulkagachi',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Baby tamagotchi game'
  },
  {
    name: 'Bulk Climb',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverclimb.png',
    url: 'https://www.bulked.lol/games/climb',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Platform climbing game'
  },
  {
    name: 'Flappy Bulk',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverflappy.png',
    url: 'https://www.bulked.lol/games/flappy',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Flappy bird style game'
  },
  {
    name: 'Bulk Runner',
    img: 'https://raw.githubusercontent.com/pasekaalex/bulk/master/bulk-react/public/images/coverrunner.png',
    url: 'https://www.bulked.lol/games/runner',
    github: 'https://github.com/pasekaalex/bulk',
    desc: 'Endless runner game'
  },
]

// Skills data


export default function Intro() {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    contact: false,
    terminal: false,
  })
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [musicVolume, setMusicVolume] = useState(0.2)
  const [selectedTrack, setSelectedTrack] = useState('piano')
  const [selectedProject, setSelectedProject] = useState(null)
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: '' },
    { type: 'output', text: '╔═══════════════════════════════════════════════╗' },
    { type: 'output', text: '║     ◉  Terminal v1.0  |  paseka.dev  |  2024   ║' },
    { type: 'output', text: '╠═══════════════════════════════════════════════╣' },
    { type: 'output', text: '║  help      - all commands                      ║' },
    { type: 'output', text: '║  neofetch  - system info & ASCII art           ║' },
    { type: 'output', text: '║  games     - list of games                     ║' },
    { type: 'output', text: '╚═══════════════════════════════════════════════╝' },
    { type: 'output', text: '' },
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistoryIndex, setTerminalHistoryIndex] = useState(-1)
  const [terminalCommandHistory, setTerminalCommandHistory] = useState([])
  const [guessNumber, setGuessNumber] = useState(null)
  const [guessAttempts, setGuessAttempts] = useState(0)
  const [pokerDice, setPokerDice] = useState([1,1,1,1,1])
  const [pokerKept, setPokerKept] = useState([false,false,false,false,false])
  const [pokerRolls, setPokerRolls] = useState(0)
  const [highLowCard, setHighLowCard] = useState(null)
  const [highLowPrev, setHighLowPrev] = useState(null)
  const [highLowWins, setHighLowWins] = useState(0)
  const [wordleWord, setWordleWord] = useState(null)
  const [wordleGuesses, setWordleGuesses] = useState([])
  const [wordleDone, setWordleDone] = useState(false)
  const terminalInputRef = useRef(null)
  const terminalRef = useRef(null)
  const [projectsView, setProjectsView] = useState('gallery')
  const [embeddedProject, setEmbeddedProject] = useState(null)
  const [rainMode, setRainMode] = useState(false)
  const [raining, setRaining] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const rainModeRef = useRef(false)
  const rainingRef = useRef(false)
  const [typedName, setTypedName] = useState('')
  const fullName = 'ALEX PASEKA'
  const [avatarClicks, setAvatarClicks] = useState(0)
  const [crazyMode, setCrazyMode] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [totalClicks, setTotalClicks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('avatarClicks')
      return saved ? parseInt(saved, 10) : 0
    }
    return 0
  })
  const avatarClickTimer = useRef(null)
  const [activeWindow, setActiveWindow] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const rainAudioRef = useRef(null)
  
  // Window drag state
  const [windowPositions, setWindowPositions] = useState({})
  const [dragState, setDragState] = useState({ dragging: false, windowId: null, startX: 0, startY: 0, startPosX: 0, startPosY: 0 })
  const highestZIndex = useRef(600)
  
  
  
  // Initialize window position when opened
  const getWindowPosition = (windowId) => {
    if (windowPositions[windowId]) return windowPositions[windowId]
    // Default centered
    const defaults = {
      'project-embed': { x: window.innerWidth / 2 - 540, y: window.innerHeight / 2 - 350 },
      
      'about': { x: window.innerWidth / 2 - 280, y: window.innerHeight / 2 - 200 },
      'projects': { x: window.innerWidth / 2 - 280, y: window.innerHeight / 2 - 200 },
      'contact': { x: window.innerWidth / 2 - 280, y: window.innerHeight / 2 - 200 },
      'terminal': { x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 }
    }
    return defaults[windowId] || { x: window.innerWidth / 2 - 280, y: window.innerHeight / 2 - 200 }
  }
  // Autoplay piano on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "/piano-v2.mp3"
      audioRef.current.volume = 0.2
      audioRef.current.play().catch(() => {})
    }
    // Setup rain audio
    if (rainAudioRef.current) {
      rainAudioRef.current.src = "/rain-sounds.mp3"
      rainAudioRef.current.volume = 0.2
      rainAudioRef.current.loop = true
    }
  }, [])

  const particleIdRef = useRef(0)

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => setSessionTime(prev => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  // Typing animation for name
  const restartTypingAnimation = useCallback(() => {
    setTypedName('')
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setTypedName(fullName.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
  }, [fullName])

  // Run typing animation on mount
  useEffect(() => {
    restartTypingAnimation()
  }, [restartTypingAnimation])

  // Cursor sparkle trail
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let pos = { x: -100, y: -100 }
    let lastPos = { x: -100, y: -100 }
    let particles = []

    const onMove = (e) => {
      pos = { x: e.clientX, y: e.clientY }
      // Spawn pixels along the path
      if (Math.abs(pos.x - lastPos.x) > 8 || Math.abs(pos.y - lastPos.y) > 8) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: pos.x + (Math.random() - 0.5) * 10,
            y: pos.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            size: Math.random() * 3 + 2,
            alpha: 1,
            color: `hsl(${Math.random() * 60 + 260}, 80%, ${50 + Math.random() * 30}%)`,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.3
          })
        }
        lastPos = pos
      }
    }

    const onClick = (e) => {
      // Burst of pixels on click
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5
        const speed = Math.random() * 4 + 3
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 3,
          alpha: 1,
          color: `hsl(${Math.random() * 60 + 260}, 90%, ${60 + Math.random() * 20}%)`,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.4
        })
      }
    }

    // Rain drops state
    let rainDrops = []

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw and update pixels
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15 // gravity
        p.vx *= 0.98 // friction
        p.alpha -= 0.025
        p.rotation += p.rotSpeed
        
        if (p.alpha > 0) {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.globalAlpha = p.alpha
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          ctx.restore()
        }
      })
      particles = particles.filter(p => p.alpha > 0)
      
      // Keep particles limited
      if (particles.length > 150) {
        particles = particles.slice(-150)
      }
      
      // Draw rain using ref
      if (rainingRef.current) {
        for (let i = 0; i < 5; i++) {
          rainDrops.push({
            x: Math.random() * canvas.width,
            y: -10,
            speed: Math.random() * 10 + 15,
            length: Math.random() * 20 + 15
          })
        }
        ctx.strokeStyle = 'rgba(180, 200, 255, 0.5)'
        ctx.lineWidth = 1.5
        rainDrops.forEach((drop, i) => {
          drop.y += drop.speed
          drop.x += 1.5
          ctx.beginPath()
          ctx.moveTo(drop.x, drop.y)
          ctx.lineTo(drop.x + 4, drop.y - drop.length)
          ctx.stroke()
        })
        rainDrops = rainDrops.filter(d => d.y < canvas.height)
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  // Window management
  const openWindow = useCallback((id) => {
    setOpenWindows(prev => ({ ...prev, [id]: true }))
    setActiveWindow(id)
  }, [])

  const closeWindow = useCallback((id, e) => {
    e?.stopPropagation()
    // Add closing animation
    const winEl = document.querySelector(`.os-window${id === 'terminal' ? '.window-terminal' : ''}[style*="z-index"]`)
    if (winEl) {
      winEl.classList.add('closing')
      setTimeout(() => {
        setOpenWindows(prev => ({ ...prev, [id]: false }))
        setActiveWindow(prev => prev === id ? null : prev)
      }, 240)
    } else {
      setOpenWindows(prev => ({ ...prev, [id]: false }))
      setActiveWindow(prev => prev === id ? null : prev)
    }
  }, [])

  // Window drag handlers
  const handleWindowMouseDown = (e, windowId) => {
    e.preventDefault()
    const pos = getWindowPosition(windowId)
    highestZIndex.current += 1
    setDragState({
      dragging: true,
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y
    })
  }

  useEffect(() => {
    if (!dragState.dragging) return
    
    const handleMouseMove = (e) => {
      const dx = e.clientX - dragState.startX
      const dy = e.clientY - dragState.startY
      setWindowPositions(prev => ({
        ...prev,
        [dragState.windowId]: {
          x: dragState.startPosX + dx,
          y: dragState.startPosY + dy
        }
      }))
    }
    
    const handleMouseUp = () => {
      setDragState(prev => ({ ...prev, dragging: false }))
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragState])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatSessionTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`
    if (mins > 0) return `${mins}m ${secs}s`
    return `${secs}s`
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
        setMusicPlaying(false)
      } else {
        audioRef.current.play().catch(()=>{})
        setMusicPlaying(true)
      }
    }
  }

  const executeCommand = useCallback((cmd) => {
    const input = cmd.trim().toLowerCase()
    const parts = input.split(' ')
    const command = parts[0]
    const args = parts.slice(1).join(' ')

    const addOutput = (text, msgType = 'output') => {
      setTerminalHistory(prev => {
        const newHist = [...prev, { type: msgType, text }]
        return newHist.slice(-50)
      })
    }

    const addInput = (text) => {
      setTerminalHistory(prev => {
        const newHist = [...prev, { type: 'input', text }]
        return newHist.slice(-50)
      })
      // Add to command history
      setTerminalCommandHistory(prev => {
        const newHistory = [cmd, ...prev.filter(c => c !== cmd)].slice(0, 50)
        return newHistory
      })
      setTerminalHistoryIndex(-1)
    }

    // Execute the command
    let outputType = 'output'
    switch (command) {
      case 'help':
        addOutput(`
╔══════════════════════════════════════════════════╗
║           ◉  TERMINAL COMMANDS  ◉                ║
╠══════════════════════════════════════════════════╣
║  GENERAL                                        ║
║  ───────────────────────────────────────────    ║
║  help      - show this help                     ║
║  clear     - clear terminal                     ║
║  date      - show current date/time             ║
║  whoami    - display user info                  ║
║  echo      - echo text (echo hello)             ║
║  neofetch  - system info + ASCII art            ║
║  calc      - calculator (calc 2+2)              ║
║  history   - show command history               ║
║                                                    ║
║  FUN                                            ║
║  ───────────────────────────────────────────    ║
║  8ball     - magic 8-ball (8ball question)      ║
║  joke      - random joke                        ║
║  coinflip  - flip a coin                        ║
║  roll      - roll dice (roll 2d6)               ║
║  fortune   - fortune cookie message              ║
║                                                    ║
║  GAMES                                          ║
║  ───────────────────────────────────────────    ║
║  games     - show available games               ║
║  slots     - slot machine game                   ║
║  guess     - number guessing game                ║
║  rps       - rock paper scissors                 ║
║  poker     - dice poker                         ║
╚══════════════════════════════════════════════════╝`)
        break
      case 'clear':
      case 'cls':
        setTerminalHistory([])
        break
      case 'date':
        addOutput(new Date().toString())
        break
      case 'whoami':
        addOutput('guest')
        break
      case 'echo':
        addOutput(args || '')
        break
      case 'neofetch':
        addOutput('\n  ██████╗ ███████╗\n  ██╔══██╗██╔════╝\n  ██████╔╝█████╗  \n  ██╔═══╝ ██╔══╝  \n  ██║     ███████╗\n  ╚═╝     ╚══════╝\n\n  OS: paseka.dev OS v1.0\n  Host: paseka.dev\n  Kernel: React 18.x\n  Shell: bash 5.1\n  Terminal: paseka-terminal', 'success')
        break
      case 'calc':
        try { addOutput(`${args} = ${eval(args)}`, 'success') } catch { addOutput('Error: invalid expression', 'error') }
        break
      case 'roll': {
        const diceMatch = args.match(/(\d+)d(\d+)/)
        if (diceMatch) {
          const numDice = parseInt(diceMatch[1])
          const sides = parseInt(diceMatch[2])
          if (numDice > 20 || sides > 100) { addOutput('Too many dice/sides!', 'error'); break }
          const rolls = []
          for (let i = 0; i < numDice; i++) rolls.push(Math.floor(Math.random() * sides) + 1)
          addOutput(`Rolling ${numDice}d${sides}... [${rolls.join(', ')}] = ${rolls.reduce((a,b)=>a+b,0)}`, 'info')
        } else { addOutput('Usage: roll XdY (e.g. roll 2d6)', 'error') }
        break
      }
      case '8ball': {
        const r8 = ['It is certain.','Reply hazy, try again.','Don\'t count on it.','It is decidedly so.','Ask again later.','My reply is no.','Without a doubt.','Better not tell you now.','My sources say no.','Yes — definitely.']
        addOutput(`🎱 ${r8[Math.floor(Math.random() * r8.length)]}`, 'success')
        break
      }
      case 'coinflip':
        addOutput(Math.random() > 0.5 ? '🪙 Heads' : '🪙 Tails', 'success')
        break
      case 'joke': {
        const jokes = ['Why do developers prefer dark mode? Because light attracts bugs.','There are only 10 types of people: those who understand binary and those who don\'t.','I\'m not lazy, I\'m just on energy-saving mode.','Why do JavaScript devs wear glasses? Because they can\'t C#.']
        addOutput(jokes[Math.floor(Math.random() * jokes.length)], 'info')
        break
      }
      case 'games':
        addOutput(`\n╔════════════════════════════════════╗\n║         ◉ AVAILABLE GAMES        ║\n╠════════════════════════════════════╣\n║  slots     - Slot machine           ║\n║  guess     - Number guessing (1-100) ║\n║  rps       - Rock paper scissors     ║\n║  poker     - Dice poker             ║\n║  8ball     - Magic 8-ball            ║\n║  coinflip  - Flip a coin            ║\n║  roll      - Roll dice (roll 2d6)    ║\n║  fortune   - Fortune cookie         ║
║  highlow   - High or low card game   ║
║  wordle    - 5-letter word game       ║\n╚════════════════════════════════════╝`, 'info')
        break
      case 'history': {
        const cmds = terminalHistory.filter(h => h.type === 'input').map(h => h.text)
        addOutput(cmds.length > 0 ? cmds.join('\n') : 'No history yet', 'info')
        break
      }
      case 'slots': {
        const emojis = ['🍒', '🍋', '🍇', '⭐', '🔔', '💎']
        const spin = () => emojis[Math.floor(Math.random() * emojis.length)]
        const r1 = spin(), r2 = spin(), r3 = spin()
        const isJackpot = r1 === r2 && r2 === r3
        const isDouble = r1 === r2 || r2 === r3 || r1 === r3
        addOutput(`┌─────────────────┐\n│  ${r1} │ ${r2} │ ${r3}  │\n└─────────────────┘\n${isJackpot ? '🎰 JACKPOT!!! 🎰' : isDouble ? '✨ Two of a kind!' : 'Try again...'}`, isJackpot ? 'success' : isDouble ? 'info' : 'error')
        break
      }
      case 'fortune': {
        const fortunes = ['A beautiful journey awaits you.', 'Your hard work will pay off soon.', 'Trust your instincts — they are right.', 'Someone is thinking of you right now.', 'New opportunities are just around the corner.', 'Your creativity is at an all-time high.']
        addOutput(`🍀 ${fortunes[Math.floor(Math.random() * fortunes.length)]}`, 'success')
        break
      }
      case 'highlow': {
        const suits = ['♠','♥','♦','♣']
        const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
        const newCard = { v: values[Math.floor(Math.random()*13)], s: suits[Math.floor(Math.random()*4)] }
        if (!highLowCard) {
          setHighLowCard(newCard)
          setHighLowPrev(null)
          setHighLowWins(0)
          addOutput(`First card: ${newCard.v}${newCard.s} — Higher or lower? (highlow high/low)`, 'info')
        } else {
          const prevVal = values.indexOf(highLowCard.v)
          const newVal = values.indexOf(newCard.v)
          const prev = args.toLowerCase().includes('high') ? 'high' : 'low'
          const won = (prev === 'high' && newVal > prevVal) || (prev === 'low' && newVal < prevVal)
          const wins = won ? highLowWins + 1 : 0
          setHighLowWins(wins)
          setHighLowPrev(highLowCard)
          setHighLowCard(newCard)
          addOutput(`Card: ${highLowCard.v}${highLowCard.s} → New: ${newCard.v}${newCard.s} | ${won ? `✅ WIN! Streak: ${wins}` : '❌ LOSE! Streak reset!'}`, won ? 'success' : 'error')
        }
        break
      }
      case 'wordle': {
        if (wordleDone || wordleGuesses.length >= 6) {
          const words5 = ['APPLE','BEACH','CRANE','DREAM','EAGLE','FLAME','GRAPE','HOUSE','JUICE','KNIFE','LEMON','MANGO','NIGHT','OCEAN','PIANO','QUEEN','ROBOT','SNAKE','TIGER','UNCLE','VOICE','WATER','YOUNG','ZEBRA']
          const word = words5[Math.floor(Math.random() * words5.length)]
          setWordleWord(word)
          setWordleGuesses([])
          setWordleDone(false)
          addOutput('🎮 WORDLE — Guess a 5-letter word! (wordle [WORD])', 'info')
        } else {
          const guess = args.toUpperCase().slice(0,5)
          if (guess.length !== 5) { addOutput('Enter a 5-letter word: wordle [WORD]', 'error'); break }
          const word = wordleWord
          let result = ''
          for (let i = 0; i < 5; i++) {
            if (guess[i] === word[i]) result += '🟩'
            else if (word.includes(guess[i])) result += '🟨'
            else result += '⬛'
          }
          const newGuesses = [...wordleGuesses, guess]
          setWordleGuesses(newGuesses)
          const won = guess === word
          if (won) { setWordleDone(true); addOutput(`${result}
🎉 CORRECT! Word was: ${word}`, 'success') }
          else if (newGuesses.length >= 6) { setWordleDone(true); addOutput(`${result}
💀 GAME OVER! Word was: ${word}`, 'error') }
          else { addOutput(`${result} | Attempts: ${newGuesses.length}/6`, 'info') }
        }
        break
      }
      case 'guess': {
        if (!guessNumber) {
          setGuessNumber(Math.floor(Math.random() * 100) + 1)
          setGuessAttempts(0)
          addOutput('I\'m thinking of a number 1-100. Start guessing!', 'info')
        } else {
          const guess = parseInt(args)
          if (isNaN(guess)) { addOutput('Enter a number: guess [number]', 'error') }
          else if (guess < guessNumber) { setGuessAttempts(p => p + 1); addOutput('📈 Higher!', 'error') }
          else if (guess > guessNumber) { setGuessAttempts(p => p + 1); addOutput('📉 Lower!', 'error') }
          else { setGuessAttempts(p => p + 1); addOutput(`🎉 Correct! You got it in ${guessAttempts + 1} attempts!`, 'success'); setGuessNumber(null); setGuessAttempts(0) }
        }
        break
      }
      case 'rps': {
        const choices = ['rock','paper','scissors']
        const player = args.toLowerCase()
        if (!choices.includes(player)) { addOutput('Usage: rps [rock|paper|scissors]', 'error') }
        else {
          const comp = choices[Math.floor(Math.random() * 3)]
          let result
          if (player === comp) result = '🤝 TIE!'
          else if ((player === 'rock' && comp === 'scissors') || (player === 'paper' && comp === 'rock') || (player === 'scissors' && comp === 'paper')) result = '🎉 YOU WIN!'
          else result = '😢 YOU LOSE!'
          addOutput(`You: ${player} vs Computer: ${comp}\n${result}`, result.includes('WIN') ? 'success' : result.includes('LOSE') ? 'error' : 'info')
        }
        break
      }
      case 'poker': {
        if (pokerRolls === 0) {
          const nd = [1,2,3,4,5].map(() => Math.floor(Math.random() * 6) + 1)
          setPokerDice(nd); setPokerRolls(1); setPokerKept([false,false,false,false,false])
          addOutput(`Roll 1: [${nd.join(', ')}]\nChoose keep [1-5] or run 'poker' again`, 'info')
        } else if (pokerRolls === 1) {
          const nd = pokerDice.map((d,i) => pokerKept[i] ? d : Math.floor(Math.random() * 6) + 1)
          setPokerDice(nd); setPokerRolls(2); addOutput(`Roll 2: [${nd.join(', ')}]`, 'info')
        } else {
          const counts = {}
          pokerDice.forEach(d => { counts[d] = (counts[d]||0) + 1 })
          const vals = Object.values(counts)
          let hand = 'High Card'
          if (vals.includes(5)) hand = '🎰 FIVE OF A KIND!'
          else if (vals.includes(4)) hand = '🎰 FOUR OF A KIND!'
          else if (vals.includes(3) && vals.includes(2)) hand = '🃏 FULL HOUSE!'
          else if (vals.includes(3)) hand = '🔱 THREE OF A KIND!'
          else if (vals.filter(v=>v===2).length===2) hand = '✌️ TWO PAIR!'
          else if (vals.includes(2)) hand = '🎴 ONE PAIR!'
          else { const s=[...pokerDice].sort(); if (s[4]-s[0]===4) hand='📐 STRAIGHT!' }
          addOutput(`Final: [${pokerDice.join(', ')}] → ${hand}`, 'info')
          setPokerRolls(0); setPokerKept([false,false,false,false,false])
        }
        break
      }
      case 'keep': {
        const idxs = args.split('').map(n=>parseInt(n)-1).filter(n=>n>=0&&n<5)
        const nk = [...pokerKept]
        idxs.forEach(i=>{ nk[i]=!nk[i] })
        setPokerKept(nk)
        addOutput(`Kept: [${pokerDice.map((d,i)=>nk[i]?d:'-').join(', ')}]`, 'info')
        break
      }
      default:
        addOutput(`Command not found: ${command}\nType 'help' for available commands.`, 'error')
    }
  }, [guessNumber, guessAttempts, pokerDice, pokerKept, pokerRolls, highLowCard, highLowWins, wordleWord, wordleGuesses, wordleDone, terminalHistory])

  const handleTerminalSubmit = (e) => {
    e.preventDefault()
    if (!terminalInput.trim()) return
    executeCommand(terminalInput)
    setTerminalInput('')
  }

  // Arrow key history navigation
  const handleTerminalKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = terminalHistoryIndex + 1
      if (newIndex < terminalCommandHistory.length) {
        setTerminalHistoryIndex(newIndex)
        setTerminalInput(terminalCommandHistory[newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = terminalHistoryIndex - 1
      if (newIndex >= -1) {
        setTerminalHistoryIndex(newIndex)
        setTerminalInput(newIndex === -1 ? '' : terminalCommandHistory[newIndex] || '')
      }
    }
  }

  // Auto-scroll terminal output to bottom
  useEffect(() => {
    const output = terminalRef.current?.querySelector('.terminal-output')
    if (output) {
      output.scrollTop = output.scrollHeight
    }
  }, [terminalHistory])

  // Focus input when terminal window opens
  useEffect(() => {
    if (openWindows.terminal && terminalInputRef.current) {
      terminalInputRef.current.focus()
    }
  }, [openWindows.terminal])

  const fetchWeather = async (zip) => {
    if (!zip || zip.length !== 5) return

    try {
      const geoRes = await fetch(`https://api.zippopotam.us/us/${zip}`)
      const geoData = await geoRes.json()

      if (!geoRes.ok) {
        document.getElementById('weatherError').style.display = 'block'
        document.getElementById('weatherDisplay').style.display = 'none'
        return
      }
      const { latitude, longitude } = geoData.places[0]

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
      const weatherData = await weatherRes.json()

      const code = weatherData.current_weather.weathercode
      const max = Math.round(weatherData.daily.temperature_2m_max[0])
      const min = Math.round(weatherData.daily.temperature_2m_min[0])

      const icons = {
        0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
        45: '🌫️', 48: '🌫️',
        51: '🌧️', 53: '🌧️', 55: '🌧️',
        61: '🌧️', 63: '🌧️', 65: '🌧️',
        71: '🌨️', 73: '🌨️', 75: '🌨️',
        80: '🌦️', 81: '🌦️', 82: '🌦️',
        95: '⛈️', 96: '⛈️', 99: '⛈️'
      }
      const conditions = {
        0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
        45: 'Foggy', 48: 'Foggy',
        51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
        61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
        71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow',
        80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers',
        95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Severe Thunderstorm'
      }

      document.getElementById('weatherIcon').textContent = icons[code] || '🌤️'
      document.getElementById('weatherTemp').textContent = `${Math.round(weatherData.current_weather.temperature)}°`
      document.getElementById('weatherCondition').textContent = conditions[code] || 'Unknown'
      document.getElementById('weatherHighLow').textContent = `H: ${max}° L: ${min}°`
      document.getElementById('weatherError').style.display = 'none'
      document.getElementById('weatherDisplay').style.display = 'block'
      // Update taskbar weather
      document.getElementById('weatherIconTaskbar').textContent = icons[code] || '🌤️'
      document.getElementById('weatherTempTaskbar').textContent = `${Math.round(weatherData.current_weather.temperature)}°`
      document.getElementById('weatherConditionTaskbar').textContent = conditions[code] || 'Unknown'
      document.getElementById('weatherHighLowTaskbar').textContent = `H: ${max}° L: ${min}°`
      document.getElementById('weatherErrorTaskbar').style.display = 'none'
      document.getElementById('weatherDisplayTaskbar').style.display = 'block'
    } catch (err) {
      document.getElementById('weatherError').style.display = 'block'
      document.getElementById('weatherDisplay').style.display = 'none'
      document.getElementById('weatherErrorTaskbar').style.display = 'block'
      document.getElementById('weatherDisplayTaskbar').style.display = 'none'
    }
  }

  return (
    <Fragment>
      <div className="mobile-message">
        <div className="mobile-message-content">
          <h2>◉ paseka.dev</h2>
          <p>Please use desktop for this website</p>
        </div>
      </div>
      <div className={`os-container${lightMode ? ' light-mode' : ''}`}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />
      <audio ref={audioRef} loop volume={musicVolume} />
      <audio ref={rainAudioRef} />

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
          <img src="/avi.jpg" alt="Alex Paseka" className={`main-avatar ${crazyMode ? 'crazy-avatar' : ''}`} onClick={() => {
            setAvatarClicks(prev => {
              const newCount = prev + 1
              const newTotal = totalClicks + 1
              setTotalClicks(newTotal)
              localStorage.setItem('avatarClicks', newTotal.toString())
              if (newCount >= 10) {
                setCrazyMode(true)
                setTimeout(() => setCrazyMode(false), 5000)
                return 0
              }
              if (avatarClickTimer.current) clearTimeout(avatarClickTimer.current)
              avatarClickTimer.current = setTimeout(() => setAvatarClicks(0), 800)
              return newCount
            })
          }} onMouseLeave={() => {
            if (avatarClickTimer.current) clearTimeout(avatarClickTimer.current)
            avatarClickTimer.current = setTimeout(() => setAvatarClicks(0), 800)
          }} />
          <div className="avatar-ring" />
        </div>

        {/* Title Block */}
        <div className="title-block">
          <h1 className="desktop-title" onDoubleClick={() => {
            restartTypingAnimation()
            // Double click name effect - burst of sparkles
            const rect = document.querySelector('.desktop-title').getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            for (let i = 0; i < 30; i++) {
              const p = {
                id: Date.now() + i,
                x: centerX + (Math.random() - 0.5) * 150,
                y: centerY + (Math.random() - 0.5) * 80,
                alpha: 1,
                radius: Math.random() * 8 + 4,
                color: Math.random() > 0.3 ? '#ffffff' : '#d8a9e8',
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 3
              }
              setParticles(prev => [...prev.slice(-80), p])
            }
          }}>
            <span className="title-typed">{typedName}</span><span className="cursor-blink">|</span>
          </h1>
          <div className="title-divider" />
        </div>

        {/* Desktop Icons */}
        <div className="desktop-icons">
          {DESKTOP_ICONS.map(icon => (
            <button
              key={icon.id}
              className={`desktop-icon ${openWindows[icon.id] ? 'active' : ''}`}
              onClick={() => openWindow(icon.id)}
              onDoubleClick={() => openWindow(icon.id)}
            >
              <span className="icon-glow" />
              <img src={icon.icon} alt={icon.label} className="icon-img" />
              <span className="icon-label">{icon.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ABOUT Window */}
      {openWindows.about && (() => {
        const pos = getWindowPosition('about')
        const zIndex = highestZIndex.current
        return (
        <div 
          className={`os-window ${openWindows.about ? 'open' : ''}${activeWindow === 'about' ? ' focused' : ''}`} 
          onClick={() => setActiveWindow('about')}
          style={{
            transform: 'none',
            left: pos.x,
            top: pos.y,
            zIndex,
            transition: dragState.dragging && dragState.windowId === 'about' ? 'none' : undefined
          }}
        >
          <div 
            className="window-header"
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleWindowMouseDown(e, 'about')}
          >
            <div className="window-controls">
              <button className="win-minimize" onClick={(e) => e.stopPropagation()}>
              </button>
              <button className="win-maximize" onClick={(e) => e.stopPropagation()}>
              </button>
              <button className="win-close" onClick={(e) => closeWindow('about', e)}>
              </button>
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
        )})()}

      {/* PROJECTS Window */}
      {openWindows.projects && (() => {
        const pos = getWindowPosition('projects')
        const zIndex = highestZIndex.current
        return (
        <div 
          className={`os-window window-projects open${activeWindow === 'projects' ? ' focused' : ''}`} 
          onClick={() => setActiveWindow('projects')}
          style={{
            transform: 'none',
            left: pos.x,
            top: pos.y,
            zIndex,
            transition: dragState.dragging && dragState.windowId === 'projects' ? 'none' : undefined
          }}
        >
          <div 
            className="window-header"
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleWindowMouseDown(e, 'projects')}
          >
            <div className="window-controls">
              <button className="win-minimize" onClick={(e) => e.stopPropagation()}>
              </button>
              <button className="win-maximize" onClick={(e) => e.stopPropagation()}>
              </button>
              <button className="win-close" onClick={(e) => closeWindow('projects', e)}>
              </button>
            </div>
            <span className="window-title">Projects</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content" style={{padding: projectsView === 'detail' ? '20px' : '0'}}>
            {projectsView === 'gallery' ? (
              <div className="projects-grid">
                {PROJECTS.map((proj, i) => (
                  <button key={i} className="project-card" onClick={() => { setSelectedProject(proj); setProjectsView('detail'); }}>
                    <div className="project-image-wrap">
                      {proj.img ? (
                        <img src={proj.img} alt={proj.name} className="project-image" />
                      ) : (
                        <div className="project-emoji-placeholder">⏱️</div>
                      )}
                      <div className="project-overlay" />
                    </div>
                    <div className="project-name">{proj.name}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="project-detail-view">
                <button className="project-back-btn" onClick={() => setProjectsView('gallery')}>← Back</button>
                <div className="project-detail-full-image">
                  {selectedProject && selectedProject.img ? (
                    <img src={selectedProject.img} alt={selectedProject.name} />
                  ) : (
                    <div className="project-emoji-placeholder">⏱️</div>
                  )}
                </div>
                <h2 className="project-detail-full-name">{selectedProject ? selectedProject.name : ''}</h2>
                <p className="project-detail-full-desc">{selectedProject ? selectedProject.desc : ''}</p>
                <div className="project-detail-full-links">
                  {selectedProject && (
                    <>
                      <a href={selectedProject.url} target="_blank" rel="noopener" className="project-link-btn primary">Visit Project</a>
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener" className="project-link-btn">GitHub</a>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        )
      })()}





      {/* TERMINAL Window */}


      {/* TERMINAL Window */}
      {openWindows.terminal && (() => {
        const pos = getWindowPosition('terminal')
        const zIndex = highestZIndex.current
        return (
        <div 
          className={`os-window window-terminal ${openWindows.terminal ? 'open' : ''}${activeWindow === 'terminal' ? ' focused' : ''}`} 
          onClick={() => setActiveWindow('terminal')}
          style={{
            transform: 'none',
            left: pos.x,
            top: pos.y,
            zIndex,
            transition: dragState.dragging && dragState.windowId === 'terminal' ? 'none' : undefined
          }}
        >
          <div 
            className="window-header"
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleWindowMouseDown(e, 'terminal')}
          >
            <div className="window-controls">
              <button className="win-minimize" onClick={(e) => e.stopPropagation()}>
              </button>
              <button className="win-maximize" onClick={(e) => e.stopPropagation()}>
              </button>
              <button className="win-close" onClick={(e) => closeWindow('terminal', e)}>
              </button>
            </div>
            <span className="window-title">Terminal</span>
            <div className="window-spacer" />
          </div>
          <div className="terminal-body" ref={terminalRef} onClick={() => terminalInputRef.current?.focus()}>
            <div className="terminal-output">
              {terminalHistory.map((entry, i) => (
                <div key={i} className={`terminal-line terminal-${entry.type}`}>
                  <pre>{entry.text}</pre>
                </div>
              ))}
            </div>
            <form className="terminal-input-line" onSubmit={handleTerminalSubmit}>
              <span className="terminal-prompt" style={{ color: '#bb77dd', marginRight: '8px' }}>guest@paseka:~$ </span>
              <input
                ref={terminalInputRef}
                className="terminal-input"
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleTerminalKeyDown}
                placeholder="guest@paseka:~$ "
                autoFocus
              />
            </form>
          </div>
        </div>
        )
      })()}


      {/* CONTACT Window */}
      {openWindows.contact && (() => {
        const pos = getWindowPosition('contact')
        const zIndex = highestZIndex.current
        return (
        <div 
          className={`os-window ${openWindows.contact ? 'open' : ''}${activeWindow === 'contact' ? ' focused' : ''}`} 
          onClick={() => setActiveWindow('contact')}
          style={{
            transform: 'none',
            left: pos.x,
            top: pos.y,
            zIndex
          }}
        >
          <div 
            className="window-header"
            style={{ cursor: 'move' }}
            onMouseDown={(e) => handleWindowMouseDown(e, 'contact')}
          >
            <div className="window-controls">
              <button className="win-close" onClick={(e) => closeWindow('contact', e)}>×</button>
            </div>
            <span className="window-title">Contact</span>
            <div className="window-spacer" />
          </div>
          <div className="window-content">
            <div className="contact-grid">
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
        )})()}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-header">
            <span className="start-menu-logo">◉</span>
            <div className="start-menu-title">
              <span>paseka.dev</span>
              <span className="start-menu-time">{formatTime(time)}</span>
              <span className="start-menu-date">{formatDate(time)}</span>
            </div>
          </div>
          <div className="start-menu-section">
            <div className="start-menu-section-title">System</div>
            <div className="start-menu-quick-settings">
              <button className={`start-menu-toggle ${raining ? 'active' : ''}`} onClick={() => { setRaining(!raining); rainModeRef.current = !raining; rainingRef.current = !raining; if (rainAudioRef.current) { if (!raining) rainAudioRef.current.play().catch(()=>{}); else rainAudioRef.current.pause(); } }} title="Toggle Rain">
                🌧️ Rain
              </button>
              <button className={`start-menu-toggle ${lightMode ? 'active' : ''}`} onClick={() => setLightMode(!lightMode)} title="Toggle Theme">
                {lightMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>
          <div className="start-menu-divider"></div>
          <div className="start-menu-section">
            <div className="start-menu-section-title">Stats</div>
            <div className="start-menu-stats">
              <div className="start-menu-stat">
                <span className="stat-icon">⏱️</span>
                <span className="stat-label">Session</span>
                <span className="stat-value">{formatSessionTime(sessionTime)}</span>
              </div>
              <div className="start-menu-stat click-counter" title="Total avatar clicks (hidden)">
                <span className="stat-icon">🐭</span>
                <span className="stat-label">Clicks</span>
                <span className="stat-value">{totalClicks}</span>
              </div>
            </div>
          </div>
          <div className="start-menu-divider"></div>
          <div className="start-menu-section">
            <div className="start-menu-section-title">Apps</div>
            <div className="start-menu-apps">
              {DESKTOP_ICONS.map(icon => (
                <button
                  key={icon.id}
                  className="start-menu-item"
                  onClick={() => { openWindow(icon.id); setStartMenuOpen(false) }}
                >
                  <img src={icon.icon} alt={icon.label} className="start-menu-icon" />
                  <span>{icon.label}</span>
                </button>
              ))}
              <button
                className="start-menu-item"
                onClick={() => { openWindow('terminal'); setStartMenuOpen(false) }}
              >
                <span className="start-menu-icon" style={{fontSize: '1.2rem'}}>💻</span>
                <span>Terminal</span>
              </button>
              
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button className="start-button" onClick={() => setStartMenuOpen(!startMenuOpen)}>
            <span className="start-icon">☰</span>
            <span className="start-text">Menu</span>
          </button>
        </div>
        <div className="taskbar-right">
          <div className="music-taskbar" style={{position: 'relative'}}>
            <button className="music-taskbar-btn" onClick={() => document.querySelector('.music-popup-taskbar').classList.toggle('show')} onDoubleClick={() => { if (audioRef.current) { if (audioRef.current.volume > 0) { audioRef.current.volume = 0; setMusicVolume(0) } else { audioRef.current.volume = 0.2; setMusicVolume(0.2) } } }} title="Music (dbl click to mute)">
              {musicPlaying ? '🎵' : '🎶'}
            </button>
            <div className="music-popup-taskbar">
              <div className="music-popup-header">🎵 Music</div>
              <div className="music-popup-track">{selectedTrack === 'jazz' ? 'Sax Jazz' : 'Piano Dreams'}</div>
              <div className="music-popup-controls">
                <button className="music-playpause-btn" onClick={() => { if (audioRef.current) { if (musicPlaying) { audioRef.current.pause() } else { audioRef.current.play().catch(()=>{}) }; setMusicPlaying(!musicPlaying) } }}>
                  {musicPlaying ? '⏸️' : '▶️'}
                </button>
              </div>
              <div className="music-popup-tracks">
                <button className={`music-track-btn ${selectedTrack === 'jazz' ? 'active' : ''}`} onClick={() => { setSelectedTrack('jazz'); if (audioRef.current) { audioRef.current.src = '/sax-jazz.mp3'; audioRef.current.load(); audioRef.current.play().catch(()=>{}); setMusicPlaying(true) } }}>🎷 Sax</button>
                <button className={`music-track-btn ${selectedTrack === 'piano' ? 'active' : ''}`} onClick={() => { setSelectedTrack('piano'); if (audioRef.current) { audioRef.current.src = '/piano-v2.mp3'; audioRef.current.load(); audioRef.current.play().catch(()=>{}); setMusicPlaying(true) } }}>🎹 Piano</button>
              </div>
              <div className="music-popup-vol">
                <span>🔊</span>
                <input type="range" min="0" max="1" step="0.05" value={musicVolume} onChange={(e) => { const v = parseFloat(e.target.value); setMusicVolume(v); if (audioRef.current) audioRef.current.volume = v }} className="music-vol-slider" />
              </div>
            </div>
          </div>
          <div className="weather-taskbar" style={{position: 'relative'}}>
            <button className="weather-taskbar-btn" onClick={() => document.querySelector('.weather-popup-taskbar').classList.toggle('show')} title="Weather">
              🌤️
            </button>
            <div className="weather-popup-taskbar">
              <div className="weather-popup-header">Weather</div>
              <div className="weather-popup-input-row">
                <input type="text" placeholder="Zip" className="weather-popup-input" id="weatherZipTaskbar" maxLength={5} />
                <button className="weather-popup-search" onClick={() => {
                  const zip = document.getElementById('weatherZipTaskbar').value.trim()
                  if (zip && zip.length === 5) fetchWeather(zip)
                }}>→</button>
              </div>
              <div id="weatherDisplayTaskbar" className="weather-popup-display" style={{display: 'none'}}>
                <span className="weather-popup-icon" id="weatherIconTaskbar">☀️</span>
                <span className="weather-popup-temp" id="weatherTempTaskbar">--°</span>
                <span className="weather-popup-details" id="weatherConditionTaskbar">--</span>
                <span className="weather-popup-highlow" id="weatherHighLowTaskbar">--</span>
              </div>
              <div id="weatherErrorTaskbar" className="weather-popup-error" style={{display: 'none'}}>Not found</div>
            </div>
          </div>
          <button className="rain-toggle" onClick={() => {
            const newVal = !raining
            setRaining(newVal)
            setRainMode(newVal)
            rainModeRef.current = newVal
            rainingRef.current = newVal
            if (rainAudioRef.current) {
              if (newVal) {
                rainAudioRef.current.play().catch(() => {})
              } else {
                rainAudioRef.current.pause()
              }
            }
          }} title={raining ? 'Rain Off' : 'Rain On'}>
            {raining ? '🌧️' : '💧'}
          </button>
          <button className="theme-toggle" onClick={() => setLightMode(!lightMode)} title={lightMode ? 'Dark Mode' : 'Light Mode'}>
            {lightMode ? '☀️' : '🌙'}
          </button>
          <span className="taskbar-sep">|</span>
          <span className="taskbar-date">{formatDate(time)}</span>
          <span className="taskbar-clock" style={{fontVariantNumeric: 'tabular-nums', minWidth: '75px'}}>{formatTime(time)}</span>
        </div>
      </div>
    </div>
    </Fragment>
  )
}
