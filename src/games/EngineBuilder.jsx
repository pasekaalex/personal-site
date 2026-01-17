import { useState, useRef, useEffect } from 'react'
import './EngineBuilder.css'

export default function EngineBuilder() {
  const [stage, setStage] = useState('assembly') // assembly, tune, start
  const [parts, setParts] = useState({
    // Block & Bottom End
    engineBlock: { placed: false, x: 100, y: 150, rotation: 15 },
    crankshaft: { placed: false, x: 250, y: 200, rotation: -20 },
    mainBearings: { placed: false, x: 400, y: 180, rotation: 45 },
    pistons: { placed: false, x: 150, y: 350, rotation: -10 },
    connectingRods: { placed: false, x: 320, y: 380, rotation: 30 },
    pistonRings: { placed: false, x: 500, y: 220, rotation: -25 },
    oilPump: { placed: false, x: 180, y: 500, rotation: 10 },
    oilPan: { placed: false, x: 420, y: 450, rotation: -15 },
    // Head & Top End
    cylinderHead: { placed: false, x: 280, y: 120, rotation: 20 },
    headGasket: { placed: false, x: 550, y: 300, rotation: -30 },
    camshaft: { placed: false, x: 120, y: 280, rotation: 5 },
    vtecSolenoid: { placed: false, x: 380, y: 520, rotation: -40 },
    rockerArms: { placed: false, x: 450, y: 150, rotation: 25 },
    valveSprings: { placed: false, x: 200, y: 420, rotation: -5 },
    valves: { placed: false, x: 520, y: 380, rotation: 15 },
    valveCover: { placed: false, x: 350, y: 280, rotation: -20 },
    // Timing & Accessories
    timingBelt: { placed: false, x: 140, y: 480, rotation: 35 },
    timingCover: { placed: false, x: 480, y: 500, rotation: -10 },
    waterPump: { placed: false, x: 300, y: 450, rotation: 20 },
    tensioner: { placed: false, x: 550, y: 150, rotation: -35 },
    // Manifolds & Fuel
    intakeManifold: { placed: false, x: 160, y: 220, rotation: 10 },
    exhaustManifold: { placed: false, x: 420, y: 320, rotation: -25 },
    fuelInjectors: { placed: false, x: 260, y: 520, rotation: 40 },
    fuelRail: { placed: false, x: 140, y: 160, rotation: -12 },
    sparkPlugs: { placed: false, x: 500, y: 420, rotation: -15 },
    ignitionCoil: { placed: false, x: 180, y: 360, rotation: 25 },
    distributor: { placed: false, x: 380, y: 240, rotation: -30 },
    // External
    alternator: { placed: false, x: 520, y: 260, rotation: 15 },
    starterMotor: { placed: false, x: 240, y: 180, rotation: -20 },
    throttleBody: { placed: false, x: 460, y: 360, rotation: 10 },
  })
  const [dragging, setDragging] = useState(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [engineTuned, setEngineTuned] = useState(false)
  const [engineRunning, setEngineRunning] = useState(false)
  const [afr, setAfr] = useState(50)
  const [timing, setTiming] = useState(50)
  const [idle, setIdle] = useState(50)

  const containerRef = useRef(null)

  const partNames = {
    engineBlock: 'Engine Block D16Y8',
    crankshaft: 'Crankshaft',
    mainBearings: 'Main Bearings',
    pistons: '4x Pistons',
    connectingRods: '4x Connecting Rods',
    pistonRings: 'Piston Ring Set',
    oilPump: 'Oil Pump',
    oilPan: 'Oil Pan',
    cylinderHead: 'SOHC VTEC Head',
    headGasket: 'Head Gasket',
    camshaft: 'VTEC Camshaft',
    vtecSolenoid: 'VTEC Solenoid',
    rockerArms: 'Rocker Arms',
    valveSprings: 'Valve Springs',
    valves: '16x Valves',
    valveCover: 'Valve Cover',
    timingBelt: 'Timing Belt',
    timingCover: 'Timing Cover',
    waterPump: 'Water Pump',
    tensioner: 'Belt Tensioner',
    intakeManifold: 'Intake Manifold',
    exhaustManifold: 'Exhaust Manifold',
    fuelInjectors: '4x Fuel Injectors',
    fuelRail: 'Fuel Rail',
    sparkPlugs: '4x Spark Plugs',
    ignitionCoil: 'Ignition Coil',
    distributor: 'Distributor',
    alternator: 'Alternator',
    starterMotor: 'Starter Motor',
    throttleBody: 'Throttle Body',
  }

  const handleMouseDown = (e, partKey) => {
    if (parts[partKey].placed || stage !== 'assembly') return
    setDragging(partKey)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!dragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    setParts(prev => ({
      ...prev,
      [dragging]: {
        ...prev[dragging],
        x: prev[dragging].x + dx,
        y: prev[dragging].y + dy,
      }
    }))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    if (!dragging) return

    // Check if part is in assembly area (right side)
    const part = parts[dragging]
    if (part.x > window.innerWidth / 2) {
      setParts(prev => ({
        ...prev,
        [dragging]: { ...prev[dragging], placed: true, rotation: 0 }
      }))
    }
    setDragging(null)
  }

  const allPartsPlaced = () => {
    return Object.values(parts).every(part => part.placed)
  }

  const handleTune = () => {
    // Check if all three sliders are in the sweet spot (45-55%)
    if (afr >= 45 && afr <= 55 && timing >= 45 && timing <= 55 && idle >= 45 && idle <= 55) {
      setEngineTuned(true)
    }
  }

  const handleStart = () => {
    if (engineTuned) {
      setEngineRunning(true)
    }
  }

  const resetGame = () => {
    setStage('assembly')
    setParts({
      engineBlock: { placed: false, x: 100, y: 150, rotation: 15 },
      crankshaft: { placed: false, x: 250, y: 200, rotation: -20 },
      mainBearings: { placed: false, x: 400, y: 180, rotation: 45 },
      pistons: { placed: false, x: 150, y: 350, rotation: -10 },
      connectingRods: { placed: false, x: 320, y: 380, rotation: 30 },
      pistonRings: { placed: false, x: 500, y: 220, rotation: -25 },
      oilPump: { placed: false, x: 180, y: 500, rotation: 10 },
      oilPan: { placed: false, x: 420, y: 450, rotation: -15 },
      cylinderHead: { placed: false, x: 280, y: 120, rotation: 20 },
      headGasket: { placed: false, x: 550, y: 300, rotation: -30 },
      camshaft: { placed: false, x: 120, y: 280, rotation: 5 },
      vtecSolenoid: { placed: false, x: 380, y: 520, rotation: -40 },
      rockerArms: { placed: false, x: 450, y: 150, rotation: 25 },
      valveSprings: { placed: false, x: 200, y: 420, rotation: -5 },
      valves: { placed: false, x: 520, y: 380, rotation: 15 },
      valveCover: { placed: false, x: 350, y: 280, rotation: -20 },
      timingBelt: { placed: false, x: 140, y: 480, rotation: 35 },
      timingCover: { placed: false, x: 480, y: 500, rotation: -10 },
      waterPump: { placed: false, x: 300, y: 450, rotation: 20 },
      tensioner: { placed: false, x: 550, y: 150, rotation: -35 },
      intakeManifold: { placed: false, x: 160, y: 220, rotation: 10 },
      exhaustManifold: { placed: false, x: 420, y: 320, rotation: -25 },
      fuelInjectors: { placed: false, x: 260, y: 520, rotation: 40 },
      fuelRail: { placed: false, x: 140, y: 160, rotation: -12 },
      sparkPlugs: { placed: false, x: 500, y: 420, rotation: -15 },
      ignitionCoil: { placed: false, x: 180, y: 360, rotation: 25 },
      distributor: { placed: false, x: 380, y: 240, rotation: -30 },
      alternator: { placed: false, x: 520, y: 260, rotation: 15 },
      starterMotor: { placed: false, x: 240, y: 180, rotation: -20 },
      throttleBody: { placed: false, x: 460, y: 360, rotation: 10 },
    })
    setEngineTuned(false)
    setEngineRunning(false)
    setAfr(50)
    setTiming(50)
    setIdle(50)
  }

  useEffect(() => {
    if (allPartsPlaced() && stage === 'assembly') {
      setTimeout(() => setStage('tune'), 1000)
    }
  }, [parts, stage])

  const partsRemaining = Object.values(parts).filter(p => !p.placed).length

  return (
    <div
      className="engine-builder-game"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="game-title">
        <h1>🔧 Build a Honda D16Y8 Engine</h1>
        <p className="engine-spec">1.6L SOHC VTEC • 127hp @ 6600rpm • 1996-2000 Civic</p>
      </div>

      {stage === 'assembly' && (
        <>
          <div className="parts-counter">
            <span className="parts-count">{partsRemaining}</span> parts remaining
          </div>

          <div className="workshop">
            <div className="parts-scatter-area">
              <div className="area-label">PARTS BIN</div>
              {Object.entries(parts).map(([key, part]) => (
                !part.placed && (
                  <div
                    key={key}
                    className={`engine-part ${dragging === key ? 'dragging' : ''}`}
                    style={{
                      left: `${part.x}px`,
                      top: `${part.y}px`,
                      transform: `rotate(${part.rotation}deg)`,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, key)}
                  >
                    <div className="part-label">{partNames[key]}</div>
                  </div>
                )
              ))}
            </div>

            <div className="assembly-area">
              <div className="area-label">ASSEMBLY STAND</div>
              <div className="assembled-parts">
                {Object.entries(parts).map(([key, part]) => (
                  part.placed && (
                    <div key={key} className="assembled-part">
                      <div className="part-label-assembled">{partNames[key]}</div>
                    </div>
                  )
                ))}
              </div>
              {partsRemaining === 0 && (
                <div className="complete-message">
                  ✓ ENGINE ASSEMBLED!
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {stage === 'tune' && (
        <div className="tuning-stage">
          <h2>Tune the Engine</h2>
          <div className="tuning-panel-large">
            <div className="control-row">
              <label>Air/Fuel Ratio</label>
              <input
                type="range"
                min="0"
                max="100"
                value={afr}
                onChange={(e) => setAfr(parseInt(e.target.value))}
                className="tuning-slider"
              />
              <span className="value-display">{afr}%</span>
            </div>
            <div className="control-row">
              <label>Ignition Timing</label>
              <input
                type="range"
                min="0"
                max="100"
                value={timing}
                onChange={(e) => setTiming(parseInt(e.target.value))}
                className="tuning-slider"
              />
              <span className="value-display">{timing}°</span>
            </div>
            <div className="control-row">
              <label>Idle Speed (RPM)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={idle}
                onChange={(e) => setIdle(parseInt(e.target.value))}
                className="tuning-slider"
              />
              <span className="value-display">{idle * 15} RPM</span>
            </div>

            <button className="test-tune-btn" onClick={handleTune}>
              TEST TUNE
            </button>

            {engineTuned ? (
              <div className="tune-success">
                <div className="success-icon">✓</div>
                <p>Perfect tune achieved!</p>
                <button className="continue-btn" onClick={() => setStage('start')}>
                  START ENGINE →
                </button>
              </div>
            ) : (
              <p className="tune-hint">Adjust all three settings to 45-55% range</p>
            )}
          </div>
        </div>
      )}

      {stage === 'start' && (
        <div className="start-stage">
          {!engineRunning ? (
            <>
              <div className="engine-visual">
                <div className="engine-icon">🚗</div>
                <h2>Ready to Fire!</h2>
              </div>
              <button className="start-engine-btn" onClick={handleStart}>
                🔑 TURN KEY
              </button>
            </>
          ) : (
            <div className="running-stage">
              <div className="engine-icon running-animation">🚗</div>
              <h1 className="success-title">ENGINE RUNNING!</h1>
              <p className="success-desc">D16Y8 VTEC engaged at 127hp</p>
              <div className="engine-stats">
                <div className="stat">
                  <span className="stat-label">RPM</span>
                  <span className="stat-value">750</span>
                </div>
                <div className="stat">
                  <span className="stat-label">A/F Ratio</span>
                  <span className="stat-value">14.7:1</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Timing</span>
                  <span className="stat-value">16° BTDC</span>
                </div>
              </div>
              <button className="rebuild-btn" onClick={resetGame}>
                BUILD ANOTHER ENGINE
              </button>
            </div>
          )}
        </div>
      )}

      <a href="/" className="home-link">← Back to Home</a>
    </div>
  )
}
