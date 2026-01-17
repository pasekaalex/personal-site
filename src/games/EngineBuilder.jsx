import { useState, useRef } from 'react'
import './EngineBuilder.css'

export default function EngineBuilder({ onBack }) {
  const [stage, setStage] = useState('bottomEnd') // bottomEnd, topEnd, timing, install, tune, start
  const [parts, setParts] = useState({
    // Bottom End
    crankshaft: { placed: false, x: 0, y: 0 },
    mainBearings: { placed: false, x: 0, y: 0 },
    pistons: { placed: false, x: 0, y: 0 },
    connectingRods: { placed: false, x: 0, y: 0 },
    oilPump: { placed: false, x: 0, y: 0 },
    oilPan: { placed: false, x: 0, y: 0 },
    // Top End
    cylinderHead: { placed: false, x: 0, y: 0 },
    camshaft: { placed: false, x: 0, y: 0 },
    vtecSolenoid: { placed: false, x: 0, y: 0 },
    valveCover: { placed: false, x: 0, y: 0 },
    // Timing
    timingBelt: { placed: false, x: 0, y: 0 },
    waterPump: { placed: false, x: 0, y: 0 },
    // Install
    transmission: { placed: false, x: 0, y: 0 },
    intakeManifold: { placed: false, x: 0, y: 0 },
    exhaustManifold: { placed: false, x: 0, y: 0 },
  })
  const [dragging, setDragging] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [carburetorTuned, setCarburetorTuned] = useState(false)
  const [engineRunning, setEngineRunning] = useState(false)
  const [fuelMixture, setFuelMixture] = useState(50)
  const [idleSpeed, setIdleSpeed] = useState(50)

  const workbenchRef = useRef(null)

  const handleMouseDown = (e, partName) => {
    if (parts[partName].placed) return

    const rect = e.currentTarget.getBoundingClientRect()
    setDragging(partName)
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e) => {
    if (!dragging || !workbenchRef.current) return

    const rect = workbenchRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - dragOffset.x
    const y = e.clientY - rect.top - dragOffset.y

    setParts(prev => ({
      ...prev,
      [dragging]: { ...prev[dragging], x, y }
    }))
  }

  const handleMouseUp = (e) => {
    if (!dragging || !workbenchRef.current) return

    const rect = workbenchRef.current.getBoundingClientRect()
    const dropZone = document.querySelector('.drop-zone')
    const dropRect = dropZone?.getBoundingClientRect()

    if (dropRect) {
      const partRect = {
        left: e.clientX - dragOffset.x,
        right: e.clientX - dragOffset.x + 100,
        top: e.clientY - dragOffset.y,
        bottom: e.clientY - dragOffset.y + 100
      }

      // Check if part is dropped in the drop zone
      if (
        partRect.left < dropRect.right &&
        partRect.right > dropRect.left &&
        partRect.top < dropRect.bottom &&
        partRect.bottom > dropRect.top
      ) {
        setParts(prev => ({
          ...prev,
          [dragging]: { ...prev[dragging], placed: true }
        }))
      }
    }

    setDragging(null)
  }

  const checkStageComplete = () => {
    if (stage === 'bottomEnd') {
      return parts.crankshaft.placed && parts.mainBearings.placed &&
             parts.pistons.placed && parts.connectingRods.placed &&
             parts.oilPump.placed && parts.oilPan.placed
    } else if (stage === 'topEnd') {
      return parts.cylinderHead.placed && parts.camshaft.placed &&
             parts.vtecSolenoid.placed && parts.valveCover.placed
    } else if (stage === 'timing') {
      return parts.timingBelt.placed && parts.waterPump.placed
    } else if (stage === 'install') {
      return parts.transmission.placed && parts.intakeManifold.placed &&
             parts.exhaustManifold.placed
    } else if (stage === 'tune') {
      return carburetorTuned
    }
    return false
  }

  const advanceStage = () => {
    if (stage === 'bottomEnd') setStage('topEnd')
    else if (stage === 'topEnd') setStage('timing')
    else if (stage === 'timing') setStage('install')
    else if (stage === 'install') setStage('tune')
    else if (stage === 'tune') setStage('start')
  }

  const tuneCarburetor = () => {
    // Check if settings are in the "sweet spot" for fuel injection tuning
    if (fuelMixture >= 45 && fuelMixture <= 55 && idleSpeed >= 45 && idleSpeed <= 55) {
      setCarburetorTuned(true)
    }
  }

  const startEngine = () => {
    if (carburetorTuned) {
      setEngineRunning(true)
    }
  }

  const resetGame = () => {
    setStage('bottomEnd')
    setParts({
      crankshaft: { placed: false, x: 0, y: 0 },
      mainBearings: { placed: false, x: 0, y: 0 },
      pistons: { placed: false, x: 0, y: 0 },
      connectingRods: { placed: false, x: 0, y: 0 },
      oilPump: { placed: false, x: 0, y: 0 },
      oilPan: { placed: false, x: 0, y: 0 },
      cylinderHead: { placed: false, x: 0, y: 0 },
      camshaft: { placed: false, x: 0, y: 0 },
      vtecSolenoid: { placed: false, x: 0, y: 0 },
      valveCover: { placed: false, x: 0, y: 0 },
      timingBelt: { placed: false, x: 0, y: 0 },
      waterPump: { placed: false, x: 0, y: 0 },
      transmission: { placed: false, x: 0, y: 0 },
      intakeManifold: { placed: false, x: 0, y: 0 },
      exhaustManifold: { placed: false, x: 0, y: 0 },
    })
    setCarburetorTuned(false)
    setEngineRunning(false)
    setFuelMixture(50)
    setIdleSpeed(50)
  }

  const getPartsList = () => {
    if (stage === 'bottomEnd') {
      return ['crankshaft', 'mainBearings', 'pistons', 'connectingRods', 'oilPump', 'oilPan']
    } else if (stage === 'topEnd') {
      return ['cylinderHead', 'camshaft', 'vtecSolenoid', 'valveCover']
    } else if (stage === 'timing') {
      return ['timingBelt', 'waterPump']
    } else if (stage === 'install') {
      return ['transmission', 'intakeManifold', 'exhaustManifold']
    }
    return []
  }

  const getPartLabel = (partName) => {
    const labels = {
      crankshaft: 'Crankshaft',
      mainBearings: 'Main Bearings',
      pistons: 'Pistons & Rings',
      connectingRods: 'Connecting Rods',
      oilPump: 'Oil Pump',
      oilPan: 'Oil Pan',
      cylinderHead: 'Cylinder Head',
      camshaft: 'SOHC VTEC Camshaft',
      vtecSolenoid: 'VTEC Solenoid',
      valveCover: 'Valve Cover',
      timingBelt: 'Timing Belt',
      waterPump: 'Water Pump',
      transmission: 'S40 Transmission',
      intakeManifold: 'Intake Manifold',
      exhaustManifold: 'Exhaust Manifold'
    }
    return labels[partName] || partName
  }

  const getStageTitle = () => {
    const titles = {
      bottomEnd: 'D16Y8 Bottom End Assembly',
      topEnd: 'Install Top End Components',
      timing: 'Install Timing Belt & Water Pump',
      install: 'Final Assembly',
      tune: 'Tune Fuel Injection',
      start: 'Fire It Up!'
    }
    return titles[stage]
  }

  return (
    <div className="engine-builder" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <button className="back-button" onClick={onBack}>← Back</button>

      <div className="game-header">
        <h1>🔧 Honda Civic D16Y8 Engine Builder</h1>
        <p className="engine-specs">1.6L SOHC VTEC • 127hp @ 6600rpm • 1996-2000 Civic</p>
        <h2>{getStageTitle()}</h2>
      </div>

      {stage !== 'tune' && stage !== 'start' && (
        <>
          <div className="parts-tray">
            <h3>Parts:</h3>
            <div className="parts-container">
              {getPartsList().map(partName => (
                !parts[partName].placed && (
                  <div
                    key={partName}
                    className={`part ${dragging === partName ? 'dragging' : ''}`}
                    style={{
                      left: dragging === partName ? parts[partName].x : 'auto',
                      top: dragging === partName ? parts[partName].y : 'auto',
                      position: dragging === partName ? 'absolute' : 'relative'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, partName)}
                  >
                    <div className="part-placeholder">
                      {getPartLabel(partName)}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <div ref={workbenchRef} className="workbench">
            <div className="drop-zone">
              <p>Drop parts here</p>
              <div className="placed-parts">
                {getPartsList().map(partName => (
                  parts[partName].placed && (
                    <div key={partName} className="part placed">
                      <div className="part-placeholder">
                        {getPartLabel(partName)}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {checkStageComplete() && (
            <button className="next-button" onClick={advanceStage}>
              Continue →
            </button>
          )}
        </>
      )}

      {stage === 'tune' && (
        <div className="tuning-panel">
          <div className="tuning-controls">
            <div className="control-group">
              <label>Air/Fuel Ratio</label>
              <input
                type="range"
                min="0"
                max="100"
                value={fuelMixture}
                onChange={(e) => setFuelMixture(parseInt(e.target.value))}
              />
              <span>{fuelMixture}% (Target: 14.7:1)</span>
            </div>
            <div className="control-group">
              <label>Idle RPM</label>
              <input
                type="range"
                min="0"
                max="100"
                value={idleSpeed}
                onChange={(e) => setIdleSpeed(parseInt(e.target.value))}
              />
              <span>{idleSpeed}% (Target: 700-800 RPM)</span>
            </div>
          </div>
          <button className="tune-button" onClick={tuneCarburetor}>
            Test Tune
          </button>
          {carburetorTuned && (
            <div className="success-message">
              ✓ Carburetor tuned perfectly!
              <button className="next-button" onClick={advanceStage}>
                Continue →
              </button>
            </div>
          )}
          {!carburetorTuned && fuelMixture !== 50 && (
            <p className="hint">Adjust both settings to 45-55% for optimal performance</p>
          )}
        </div>
      )}

      {stage === 'start' && (
        <div className="start-panel">
          {!engineRunning ? (
            <>
              <div className="engine-display">
                <div className="engine-icon">🚗</div>
                <p>Ready to start!</p>
              </div>
              <button className="start-button" onClick={startEngine}>
                Turn Key 🔑
              </button>
            </>
          ) : (
            <div className="success-panel">
              <div className="engine-running">
                <div className="engine-icon running">🚗</div>
                <h2>ENGINE RUNNING!</h2>
                <p>You've successfully built and started the engine!</p>
              </div>
              <button className="reset-button" onClick={resetGame}>
                Build Another Engine
              </button>
            </div>
          )}
        </div>
      )}

      <div className="progress-indicator">
        <div className={`step ${stage === 'bottomEnd' ? 'active' : parts.oilPan.placed ? 'complete' : ''}`}>
          Bottom End
        </div>
        <div className={`step ${stage === 'topEnd' ? 'active' : parts.valveCover.placed ? 'complete' : ''}`}>
          Top End
        </div>
        <div className={`step ${stage === 'timing' ? 'active' : parts.waterPump.placed ? 'complete' : ''}`}>
          Timing
        </div>
        <div className={`step ${stage === 'install' ? 'active' : parts.exhaustManifold.placed ? 'complete' : ''}`}>
          Install
        </div>
        <div className={`step ${stage === 'tune' ? 'active' : carburetorTuned ? 'complete' : ''}`}>
          Tune
        </div>
        <div className={`step ${stage === 'start' ? 'active' : engineRunning ? 'complete' : ''}`}>
          Start
        </div>
      </div>
    </div>
  )
}
