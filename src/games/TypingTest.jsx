import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './TypingTest.css'

const WORD_POOL = [
  // 3-4 letter words
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his',
  'how', 'its', 'may', 'new', 'now', 'old', 'see', 'way', 'who', 'did',
  'let', 'say', 'she', 'too', 'use', 'big', 'run', 'try', 'ask', 'men',
  'put', 'own', 'set', 'top', 'red', 'hot', 'cut', 'add', 'act', 'job',
  'age', 'end', 'far', 'low', 'pay', 'air', 'car', 'few', 'box', 'sit',
  // 5-6 letter words
  'about', 'other', 'which', 'their', 'there', 'first', 'would', 'these',
  'click', 'after', 'think', 'years', 'great', 'could', 'right', 'value',
  'world', 'place', 'where', 'being', 'under', 'water', 'still', 'house',
  'every', 'power', 'small', 'found', 'human', 'music', 'party', 'build',
  'point', 'night', 'story', 'young', 'study', 'light', 'early', 'paper',
  'group', 'often', 'black', 'white', 'large', 'start', 'earth', 'state',
  'never', 'cross', 'enter', 'plant', 'money', 'serve', 'sense', 'catch',
  'field', 'watch', 'drive', 'among', 'river', 'table', 'queen', 'month',
  'speed', 'media', 'train', 'focus', 'beach', 'force', 'space', 'front',
  'heart', 'sound', 'voice', 'share', 'happy', 'prove', 'dream', 'stone',
  // 7+ letter words
  'between', 'country', 'another', 'program', 'problem', 'because',
  'through', 'example', 'general', 'company', 'several', 'however',
  'million', 'believe', 'already', 'nothing', 'include', 'develop',
  'process', 'product', 'quality', 'natural', 'kitchen', 'picture',
  'project', 'morning', 'reading', 'outside', 'history', 'network',
  'society', 'thought', 'service', 'control', 'meeting', 'subject',
  'chapter', 'culture', 'balance', 'forward', 'imagine', 'student',
  'machine', 'weather', 'pattern', 'library', 'teacher', 'element',
  'weekend', 'digital', 'surface', 'compare', 'journey', 'finally',
  'science', 'minutes', 'connect', 'special', 'perfect', 'western',
]

const WORD_COUNT = 50

function getRandomWords(count) {
  const shuffled = [...WORD_POOL]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

function countCorrectChars(expected, typed) {
  let correct = 0
  for (let i = 0; i < Math.min(expected.length, typed.length); i++) {
    if (expected[i] === typed[i]) correct++
  }
  return correct
}

export default function TypingTest() {
  // Game state
  const [gameState, setGameState] = useState('idle')
  const [countdown, setCountdown] = useState(3)

  // Words
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typedChars, setTypedChars] = useState('')
  const [wordResults, setWordResults] = useState([])

  // Timing
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const wordStartTimeRef = useRef(null)

  // Stats
  const [finalWpm, setFinalWpm] = useState(0)
  const [finalAccuracy, setFinalAccuracy] = useState(100)
  const [liveWpm, setLiveWpm] = useState(0)
  const [liveAccuracy, setLiveAccuracy] = useState(100)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const totalCharsRef = useRef(0)
  const correctCharsRef = useRef(0)

  // Best score
  const [bestScore, setBestScore] = useState(null)
  const [isNewRecord, setIsNewRecord] = useState(false)

  // Visual effects
  const [shaking, setShaking] = useState(false)
  const [streakFlash, setStreakFlash] = useState(false)

  // Refs
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const wordsContainerRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)
  const liveWpmRef = useRef(null)
  const countdownRef = useRef(null)

  // Load best score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('typingTestBest')
      if (saved) setBestScore(JSON.parse(saved))
    } catch (e) { /* ignore */ }
  }, [])

  // Particle system
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const ps = particlesRef.current

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.06
        p.life -= p.decay

        if (p.life <= 0) {
          ps.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Live WPM updater
  useEffect(() => {
    if (gameState === 'typing' && startTime) {
      liveWpmRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 60000
        if (elapsed > 0 && correctCharsRef.current > 0) {
          setLiveWpm(Math.round((correctCharsRef.current / 5) / elapsed))
        }
        if (totalCharsRef.current > 0) {
          setLiveAccuracy(Math.round((correctCharsRef.current / totalCharsRef.current) * 100))
        }
      }, 400)
    }
    return () => clearInterval(liveWpmRef.current)
  }, [gameState, startTime])

  // Auto-scroll words container
  useEffect(() => {
    if (gameState !== 'typing') return
    const activeEl = document.querySelector('.tt-word.active')
    const container = wordsContainerRef.current
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect()
      const wordRect = activeEl.getBoundingClientRect()
      if (wordRect.top > containerRect.top + containerRect.height * 0.55) {
        container.scrollTop += wordRect.top - containerRect.top - containerRect.height * 0.3
      }
    }
  }, [currentWordIndex, gameState])

  const spawnParticles = useCallback((type, customX, customY) => {
    let cx = customX, cy = customY
    if (cx === undefined) {
      const el = document.querySelector('.tt-input-display')
      if (el) {
        const rect = el.getBoundingClientRect()
        cx = rect.left + rect.width / 2
        cy = rect.top + rect.height / 2
      } else {
        cx = window.innerWidth / 2
        cy = window.innerHeight / 2
      }
    }

    const colors = type === 'correct'
      ? ['#00ff66', '#00f5ff', '#00ffa5', '#00ffff']
      : type === 'incorrect'
      ? ['#ff3b3b', '#ff6b00', '#ff0040', '#ff4040']
      : ['#00f5ff', '#bf00ff', '#ff6b00', '#00ff66', '#ffd700', '#ffffff']

    const count = type === 'celebration' ? 100 : type === 'correct' ? 14 : 10

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const speed = type === 'celebration' ? 3 + Math.random() * 10 : 2 + Math.random() * 5
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (type === 'celebration' ? 4 : 2),
        size: type === 'celebration' ? 2 + Math.random() * 5 : 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: type === 'celebration' ? 0.006 + Math.random() * 0.004 : 0.015 + Math.random() * 0.01,
      })
    }
  }, [])

  const triggerShake = useCallback(() => {
    setShaking(true)
    setTimeout(() => setShaking(false), 300)
  }, [])

  const triggerStreakFlash = useCallback(() => {
    setStreakFlash(true)
    setTimeout(() => setStreakFlash(false), 400)
  }, [])

  const startGame = useCallback(() => {
    const newWords = getRandomWords(WORD_COUNT)
    setWords(newWords)
    setCurrentWordIndex(0)
    setTypedChars('')
    setWordResults([])
    setStartTime(null)
    setEndTime(null)
    setFinalWpm(0)
    setFinalAccuracy(100)
    setLiveWpm(0)
    setLiveAccuracy(100)
    setStreak(0)
    setMaxStreak(0)
    setIsNewRecord(false)
    totalCharsRef.current = 0
    correctCharsRef.current = 0
    wordStartTimeRef.current = null
    setGameState('countdown')
    setCountdown(3)

    let count = 3
    countdownRef.current = setInterval(() => {
      count--
      if (count <= 0) {
        clearInterval(countdownRef.current)
        setGameState('typing')
        setStartTime(Date.now())
        wordStartTimeRef.current = Date.now()
        setTimeout(() => inputRef.current?.focus(), 50)
      } else {
        setCountdown(count)
      }
    }, 800)
  }, [])

  const finishGame = useCallback((results, words) => {
    const end = Date.now()
    setEndTime(end)

    const elapsed = (end - startTime) / 60000
    const wpm = elapsed > 0 ? Math.round((correctCharsRef.current / 5) / elapsed) : 0
    const acc = totalCharsRef.current > 0
      ? Math.round((correctCharsRef.current / totalCharsRef.current) * 100)
      : 100

    setFinalWpm(wpm)
    setFinalAccuracy(acc)
    setGameState('results')

    // Celebration particles
    spawnParticles('celebration', window.innerWidth / 2, window.innerHeight / 2)

    // Check for new record
    try {
      const current = JSON.parse(localStorage.getItem('typingTestBest') || '{}')
      if (!current.wpm || wpm > current.wpm) {
        const best = { wpm, accuracy: acc, date: Date.now() }
        localStorage.setItem('typingTestBest', JSON.stringify(best))
        setBestScore(best)
        setIsNewRecord(true)
      }
    } catch (e) { /* ignore */ }
  }, [startTime, spawnParticles])

  const handleInput = useCallback((e) => {
    if (gameState !== 'typing') return

    const value = e.target.value
    const currentWord = words[currentWordIndex]

    if (value.endsWith(' ')) {
      const trimmed = value.trim()
      const isCorrect = trimmed === currentWord
      const wordTime = Date.now() - (wordStartTimeRef.current || Date.now())

      const charCount = trimmed.length
      const correctCount = isCorrect ? currentWord.length : countCorrectChars(currentWord, trimmed)

      totalCharsRef.current += charCount
      correctCharsRef.current += correctCount

      const newResult = {
        word: currentWord,
        typed: trimmed,
        correct: isCorrect,
        time: wordTime,
      }

      const newResults = [...wordResults, newResult]
      setWordResults(newResults)

      if (isCorrect) {
        const newStreak = streak + 1
        setStreak(newStreak)
        if (newStreak > maxStreak) setMaxStreak(newStreak)
        spawnParticles('correct')
        if (newStreak > 0 && newStreak % 5 === 0) triggerStreakFlash()
      } else {
        setStreak(0)
        triggerShake()
        spawnParticles('incorrect')
      }

      const nextIndex = currentWordIndex + 1
      if (nextIndex >= words.length) {
        // Add the last word's chars before finishing
        e.target.value = ''
        setTypedChars('')
        finishGame(newResults, words)
        return
      }

      setCurrentWordIndex(nextIndex)
      wordStartTimeRef.current = Date.now()
      e.target.value = ''
      setTypedChars('')
      return
    }

    setTypedChars(value)
  }, [gameState, words, currentWordIndex, wordResults, streak, maxStreak, spawnParticles, triggerShake, triggerStreakFlash, finishGame])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') e.preventDefault()
    if (e.key === 'Escape') {
      clearInterval(countdownRef.current)
      clearInterval(liveWpmRef.current)
      setGameState('idle')
    }
  }, [])

  const handleContainerClick = useCallback(() => {
    if (gameState === 'typing') inputRef.current?.focus()
  }, [gameState])

  const renderActiveWord = useCallback((word) => {
    const chars = []
    for (let i = 0; i < word.length; i++) {
      let cls = 'tt-char'
      if (i < typedChars.length) {
        cls += typedChars[i] === word[i] ? ' correct' : ' incorrect'
      } else if (i === typedChars.length) {
        cls += ' current'
      }
      chars.push(<span key={i} className={cls}>{word[i]}</span>)
    }
    // Show extra typed chars beyond word length
    if (typedChars.length > word.length) {
      for (let i = word.length; i < typedChars.length; i++) {
        chars.push(<span key={`extra-${i}`} className="tt-char extra">{typedChars[i]}</span>)
      }
    }
    return chars
  }, [typedChars])

  const getWordClass = useCallback((index) => {
    if (index < currentWordIndex) {
      return wordResults[index]?.correct ? 'completed-correct' : 'completed-incorrect'
    }
    if (index === currentWordIndex) return 'active'
    return 'pending'
  }, [currentWordIndex, wordResults])

  // Computed stats for results
  const totalTime = startTime && endTime
    ? ((endTime - startTime) / 1000).toFixed(1)
    : '0'
  const correctWords = wordResults.filter(r => r.correct).length
  const fastestWord = wordResults.length > 0
    ? wordResults.reduce((best, r) => r.correct && r.time < best.time ? r : best, { time: Infinity, word: '-' })
    : { word: '-', time: 0 }
  const fastestWordDisplay = fastestWord.word !== '-'
    ? `${fastestWord.word} (${(fastestWord.time / 1000).toFixed(1)}s)`
    : '-'

  return (
    <div
      className={`typing-test-game${shaking ? ' shake' : ''}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <canvas ref={canvasRef} className="tt-particle-canvas" />

      {/* Header */}
      <div className="tt-header">
        <Link to="/" className="tt-home-link">← Back</Link>
        <div className="tt-title-area">
          <h1 className="tt-title">Typing Test</h1>
          <p className="tt-subtitle">Type {WORD_COUNT} words as fast as you can</p>
        </div>
      </div>

      {/* Idle Screen */}
      {gameState === 'idle' && (
        <div className="tt-idle-screen">
          <div className="tt-hero">
            <span className="tt-keyboard-icon">&#9000;</span>
            <h2>Ready to Test Your Speed?</h2>
            <p>Type {WORD_COUNT} random words. Accuracy matters.</p>
            <div className="tt-best-score">
              {bestScore
                ? `Best: ${bestScore.wpm} WPM | ${bestScore.accuracy}% accuracy`
                : 'No attempts yet'}
            </div>
            <button className="tt-start-btn" onClick={startGame}>
              START TEST
            </button>
          </div>
        </div>
      )}

      {/* Countdown */}
      {gameState === 'countdown' && (
        <div className="tt-countdown-overlay">
          <div className="tt-countdown-number" key={countdown}>{countdown}</div>
        </div>
      )}

      {/* Typing Area */}
      {gameState === 'typing' && (
        <div className="tt-typing-area">
          <div className="tt-live-stats">
            <div className="tt-stat">
              <span className="tt-stat-label">WPM</span>
              <span className="tt-stat-value">{liveWpm}</span>
            </div>
            <div className="tt-stat">
              <span className="tt-stat-label">Accuracy</span>
              <span className="tt-stat-value">{liveAccuracy}%</span>
            </div>
            <div className="tt-stat">
              <span className="tt-stat-label">Streak</span>
              <span className="tt-stat-value">{streak}</span>
            </div>
            <div className="tt-stat">
              <span className="tt-stat-label">Progress</span>
              <span className="tt-stat-value">{currentWordIndex}/{WORD_COUNT}</span>
            </div>
          </div>

          <div className="tt-progress-bar">
            <div
              className="tt-progress-fill"
              style={{ width: `${(currentWordIndex / WORD_COUNT) * 100}%` }}
            />
          </div>

          <div
            className={`tt-words-container${streakFlash ? ' streak-flash' : ''}`}
            ref={wordsContainerRef}
          >
            <div className="tt-words-inner">
              {words.map((word, i) => (
                <span key={i} className={`tt-word ${getWordClass(i)}`}>
                  {i === currentWordIndex ? renderActiveWord(word) : word}
                </span>
              ))}
            </div>
          </div>

          <input
            ref={inputRef}
            className="tt-hidden-input"
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />

          <div className="tt-input-display">
            <span className="tt-input-text">{typedChars}</span>
            <span className="tt-input-cursor">|</span>
            {typedChars.length === 0 && (
              <span className="tt-input-hint">Start typing...</span>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {gameState === 'results' && (
        <div className="tt-results-screen">
          <div className="tt-results-card">
            <h2 className="tt-results-title">Test Complete!</h2>
            {isNewRecord && <div className="tt-new-record">New Personal Best!</div>}

            <div className="tt-results-primary">
              <div className="tt-big-stat wpm">
                <span className="tt-big-value">{finalWpm}</span>
                <span className="tt-big-label">WPM</span>
              </div>
              <div className="tt-big-stat accuracy">
                <span className="tt-big-value">{finalAccuracy}%</span>
                <span className="tt-big-label">Accuracy</span>
              </div>
            </div>

            <div className="tt-results-secondary">
              <div className="tt-result-item">
                <span>Time</span>
                <span>{totalTime}s</span>
              </div>
              <div className="tt-result-item">
                <span>Correct</span>
                <span>{correctWords}/{WORD_COUNT}</span>
              </div>
              <div className="tt-result-item">
                <span>Max Streak</span>
                <span>{maxStreak}</span>
              </div>
              <div className="tt-result-item">
                <span>Fastest</span>
                <span>{fastestWordDisplay}</span>
              </div>
              <div className="tt-result-item">
                <span>Characters</span>
                <span>{correctCharsRef.current}/{totalCharsRef.current}</span>
              </div>
              <div className="tt-result-item">
                <span>Words</span>
                <span>{WORD_COUNT}</span>
              </div>
            </div>

            <div className="tt-word-breakdown">
              {wordResults.map((r, i) => (
                <span key={i} className={`tt-result-word ${r.correct ? 'correct' : 'incorrect'}`}>
                  {r.word}
                </span>
              ))}
            </div>

            <button className="tt-retry-btn" onClick={startGame}>
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
