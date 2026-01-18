import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './EngineBuilder.css'

// Engine part definitions with 3D properties
const ENGINE_PARTS = {
  // Block & Bottom End (Layer 1 - must be placed first)
  engineBlock: {
    name: 'Engine Block D16Y8',
    layer: 1,
    color: 0x4a4a4a,
    position: [0, 0, 0],
    size: [1.2, 1.5, 0.8],
    geometry: 'block'
  },
  oilPan: {
    name: 'Oil Pan',
    layer: 1,
    color: 0x3a3a3a,
    position: [0, -0.9, 0],
    size: [1.0, 0.25, 0.7],
    geometry: 'box'
  },
  crankshaft: {
    name: 'Crankshaft',
    layer: 2,
    color: 0x666666,
    position: [0, -0.4, 0],
    size: [0.15, 0.15, 1.4],
    geometry: 'cylinder'
  },
  mainBearings: {
    name: 'Main Bearings',
    layer: 2,
    color: 0xc0c0c0,
    position: [0, -0.4, 0.3],
    size: [0.2, 0.08, 0.2],
    geometry: 'torus'
  },
  pistons: {
    name: '4x Pistons',
    layer: 3,
    color: 0x888888,
    position: [0, 0.1, 0],
    size: [0.18, 0.25, 0.18],
    geometry: 'pistons'
  },
  connectingRods: {
    name: '4x Connecting Rods',
    layer: 3,
    color: 0x777777,
    position: [0, -0.15, 0],
    size: [0.05, 0.5, 0.05],
    geometry: 'rods'
  },
  // Head & Top End (Layer 4-5)
  headGasket: {
    name: 'Head Gasket',
    layer: 4,
    color: 0x2a5a2a,
    position: [0, 0.75, 0],
    size: [1.1, 0.03, 0.7],
    geometry: 'box'
  },
  cylinderHead: {
    name: 'SOHC VTEC Head',
    layer: 5,
    color: 0x5a5a5a,
    position: [0, 1.05, 0],
    size: [1.15, 0.55, 0.75],
    geometry: 'head'
  },
  camshaft: {
    name: 'VTEC Camshaft',
    layer: 6,
    color: 0x555555,
    position: [0, 1.35, 0],
    size: [0.08, 0.08, 1.0],
    geometry: 'cylinder'
  },
  valves: {
    name: '16x Valves',
    layer: 6,
    color: 0x999999,
    position: [0, 0.95, 0],
    size: [0.03, 0.35, 0.03],
    geometry: 'valves'
  },
  valveSprings: {
    name: 'Valve Springs',
    layer: 6,
    color: 0x4488ff,
    position: [0, 1.1, 0],
    size: [0.06, 0.15, 0.06],
    geometry: 'springs'
  },
  rockerArms: {
    name: 'Rocker Arms',
    layer: 7,
    color: 0x666666,
    position: [0, 1.3, 0],
    size: [0.8, 0.08, 0.5],
    geometry: 'box'
  },
  vtecSolenoid: {
    name: 'VTEC Solenoid',
    layer: 7,
    color: 0x222222,
    position: [0.65, 1.2, 0],
    size: [0.15, 0.15, 0.25],
    geometry: 'box'
  },
  valveCover: {
    name: 'Valve Cover',
    layer: 8,
    color: 0x1a1a1a,
    position: [0, 1.5, 0],
    size: [1.1, 0.2, 0.7],
    geometry: 'cover'
  },
  // Timing System
  timingBelt: {
    name: 'Timing Belt',
    layer: 4,
    color: 0x111111,
    position: [-0.7, 0.5, 0],
    size: [0.08, 1.2, 0.3],
    geometry: 'belt'
  },
  waterPump: {
    name: 'Water Pump',
    layer: 4,
    color: 0x4a4a6a,
    position: [-0.75, 0, 0],
    size: [0.2, 0.25, 0.25],
    geometry: 'pump'
  },
  tensioner: {
    name: 'Belt Tensioner',
    layer: 4,
    color: 0x333333,
    position: [-0.7, -0.3, 0.15],
    size: [0.1, 0.1, 0.15],
    geometry: 'cylinder'
  },
  timingCover: {
    name: 'Timing Cover',
    layer: 5,
    color: 0x2a2a2a,
    position: [-0.75, 0.4, 0],
    size: [0.15, 1.4, 0.6],
    geometry: 'box'
  },
  // Intake & Exhaust
  intakeManifold: {
    name: 'Intake Manifold',
    layer: 9,
    color: 0x3a3a4a,
    position: [0, 1.2, -0.55],
    size: [0.9, 0.4, 0.3],
    geometry: 'manifold'
  },
  throttleBody: {
    name: 'Throttle Body',
    layer: 10,
    color: 0x4a4a4a,
    position: [0.3, 1.35, -0.75],
    size: [0.2, 0.2, 0.2],
    geometry: 'cylinder'
  },
  exhaustManifold: {
    name: 'Exhaust Manifold',
    layer: 9,
    color: 0x5a4a3a,
    position: [0, 0.9, 0.55],
    size: [0.8, 0.35, 0.25],
    geometry: 'exhaust'
  },
  // Fuel & Ignition
  fuelRail: {
    name: 'Fuel Rail',
    layer: 10,
    color: 0x3a3a3a,
    position: [0, 1.0, -0.45],
    size: [0.8, 0.06, 0.06],
    geometry: 'cylinder'
  },
  fuelInjectors: {
    name: '4x Fuel Injectors',
    layer: 10,
    color: 0x222222,
    position: [0, 0.9, -0.4],
    size: [0.04, 0.15, 0.04],
    geometry: 'injectors'
  },
  sparkPlugs: {
    name: '4x Spark Plugs',
    layer: 8,
    color: 0xcccccc,
    position: [0, 1.55, 0],
    size: [0.03, 0.2, 0.03],
    geometry: 'plugs'
  },
  distributor: {
    name: 'Distributor',
    layer: 8,
    color: 0x2a2a2a,
    position: [0.5, 1.45, 0.3],
    size: [0.15, 0.2, 0.15],
    geometry: 'cylinder'
  },
  ignitionCoil: {
    name: 'Ignition Coil',
    layer: 8,
    color: 0x1a1a2a,
    position: [0.55, 1.6, 0],
    size: [0.1, 0.15, 0.2],
    geometry: 'box'
  },
  // Accessories
  alternator: {
    name: 'Alternator',
    layer: 7,
    color: 0x3a3a3a,
    position: [0.75, 0.2, 0.3],
    size: [0.2, 0.2, 0.25],
    geometry: 'alternator'
  },
  starterMotor: {
    name: 'Starter Motor',
    layer: 3,
    color: 0x2a2a2a,
    position: [0.6, -0.5, 0.35],
    size: [0.15, 0.15, 0.35],
    geometry: 'cylinder'
  },
  oilPump: {
    name: 'Oil Pump',
    layer: 2,
    color: 0x3a3a3a,
    position: [-0.4, -0.6, 0],
    size: [0.2, 0.15, 0.2],
    geometry: 'box'
  },
}

export default function EngineBuilder() {
  const [stage, setStage] = useState('assembly')
  const [placedParts, setPlacedParts] = useState({})
  const [selectedPart, setSelectedPart] = useState(null)
  const [engineTuned, setEngineTuned] = useState(false)
  const [engineRunning, setEngineRunning] = useState(false)
  const [afr, setAfr] = useState(50)
  const [timing, setTiming] = useState(50)
  const [idle, setIdle] = useState(50)
  const [rpm, setRpm] = useState(0)
  const [showHint, setShowHint] = useState(true)

  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const engineGroupRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  // Get available parts (based on layer requirements)
  const getAvailableParts = useCallback(() => {
    const placedLayers = new Set()
    Object.keys(placedParts).forEach(key => {
      placedLayers.add(ENGINE_PARTS[key].layer)
    })

    return Object.entries(ENGINE_PARTS).filter(([key, part]) => {
      if (placedParts[key]) return false
      // Layer 1 always available, others need previous layer
      if (part.layer === 1) return true
      // Check if any part from previous layers is placed
      for (let i = 1; i < part.layer; i++) {
        const hasPartInLayer = Object.entries(ENGINE_PARTS).some(
          ([k, p]) => p.layer === i && placedParts[k]
        )
        if (!hasPartInLayer && i < part.layer - 1) continue
        if (hasPartInLayer) return true
      }
      return part.layer <= Math.max(...placedLayers, 0) + 2
    })
  }, [placedParts])

  // Create 3D geometry for a part
  const createPartGeometry = (part) => {
    const [sx, sy, sz] = part.size
    let geometry

    switch (part.geometry) {
      case 'block':
        geometry = new THREE.BoxGeometry(sx, sy, sz)
        // Add cylinder bores
        break
      case 'head':
        geometry = new THREE.BoxGeometry(sx, sy, sz)
        break
      case 'cover':
        // Rounded valve cover
        geometry = new THREE.BoxGeometry(sx, sy, sz)
        break
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(sx, sx, sz, 16)
        geometry.rotateX(Math.PI / 2)
        break
      case 'torus':
        geometry = new THREE.TorusGeometry(sx, sy, 8, 16)
        break
      case 'pistons':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          const piston = new THREE.CylinderGeometry(sx, sx, sy, 16)
          const mesh = new THREE.Mesh(piston, new THREE.MeshStandardMaterial({ color: part.color }))
          mesh.position.z = -0.45 + i * 0.3
          geometry.add(mesh)
        }
        return geometry
      case 'rods':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          const rod = new THREE.CylinderGeometry(sx, sx * 0.8, sy, 8)
          const mesh = new THREE.Mesh(rod, new THREE.MeshStandardMaterial({ color: part.color }))
          mesh.position.z = -0.45 + i * 0.3
          geometry.add(mesh)
        }
        return geometry
      case 'valves':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const valve = new THREE.CylinderGeometry(sx, sx * 1.5, sy, 8)
            const mesh = new THREE.Mesh(valve, new THREE.MeshStandardMaterial({ color: part.color }))
            mesh.position.set(-0.15 + j * 0.1, 0, -0.35 + i * 0.25)
            geometry.add(mesh)
          }
        }
        return geometry
      case 'springs':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const spring = new THREE.TorusGeometry(sx, 0.015, 8, 16)
            const mesh = new THREE.Mesh(spring, new THREE.MeshStandardMaterial({ color: part.color }))
            mesh.rotation.x = Math.PI / 2
            mesh.position.set(-0.15 + j * 0.1, 0, -0.35 + i * 0.25)
            geometry.add(mesh)
          }
        }
        return geometry
      case 'plugs':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          const plug = new THREE.CylinderGeometry(sx, sx, sy, 8)
          const mesh = new THREE.Mesh(plug, new THREE.MeshStandardMaterial({ color: part.color }))
          mesh.position.z = -0.35 + i * 0.25
          geometry.add(mesh)
        }
        return geometry
      case 'injectors':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          const injector = new THREE.CylinderGeometry(sx, sx, sy, 8)
          const mesh = new THREE.Mesh(injector, new THREE.MeshStandardMaterial({ color: part.color }))
          mesh.position.z = -0.35 + i * 0.25
          geometry.add(mesh)
        }
        return geometry
      case 'manifold':
        geometry = new THREE.Group()
        // Main plenum
        const plenum = new THREE.BoxGeometry(sx, sy * 0.6, sz)
        const plenumMesh = new THREE.Mesh(plenum, new THREE.MeshStandardMaterial({ color: part.color }))
        plenumMesh.position.y = sy * 0.2
        geometry.add(plenumMesh)
        // Runners
        for (let i = 0; i < 4; i++) {
          const runner = new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8)
          const mesh = new THREE.Mesh(runner, new THREE.MeshStandardMaterial({ color: part.color }))
          mesh.rotation.x = Math.PI / 2
          mesh.position.set(0, -sy * 0.15, 0.15)
          mesh.position.x = -0.3 + i * 0.2
          geometry.add(mesh)
        }
        return geometry
      case 'exhaust':
        geometry = new THREE.Group()
        for (let i = 0; i < 4; i++) {
          const pipe = new THREE.CylinderGeometry(0.06, 0.08, sz, 8)
          const mesh = new THREE.Mesh(pipe, new THREE.MeshStandardMaterial({ color: part.color }))
          mesh.rotation.x = Math.PI / 2
          mesh.position.x = -0.3 + i * 0.2
          geometry.add(mesh)
        }
        // Collector
        const collector = new THREE.CylinderGeometry(0.1, 0.08, 0.3, 8)
        const collectorMesh = new THREE.Mesh(collector, new THREE.MeshStandardMaterial({ color: part.color }))
        collectorMesh.rotation.x = Math.PI / 2
        collectorMesh.position.set(0.35, -0.1, 0.15)
        geometry.add(collectorMesh)
        return geometry
      case 'belt':
        // Create a belt shape
        const beltShape = new THREE.Shape()
        beltShape.moveTo(0, -sy/2)
        beltShape.lineTo(0, sy/2)
        const extrudeSettings = { depth: 0.02, bevelEnabled: false }
        geometry = new THREE.ExtrudeGeometry(beltShape, extrudeSettings)
        break
      case 'pump':
        geometry = new THREE.CylinderGeometry(sx, sx, sy, 16)
        break
      case 'alternator':
        geometry = new THREE.CylinderGeometry(sx, sx, sz, 16)
        geometry.rotateX(Math.PI / 2)
        break
      default:
        geometry = new THREE.BoxGeometry(sx, sy, sz)
    }

    return geometry
  }

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a15)
    scene.fog = new THREE.Fog(0x0a0a15, 5, 15)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(3, 2, 4)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 8
    controls.maxPolarAngle = Math.PI * 0.85
    controls.target.set(0, 0.5, 0)
    controlsRef.current = controls

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5)
    mainLight.position.set(5, 8, 5)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 2048
    mainLight.shadow.mapSize.height = 2048
    mainLight.shadow.camera.near = 0.5
    mainLight.shadow.camera.far = 50
    scene.add(mainLight)

    const fillLight = new THREE.DirectionalLight(0xff6b00, 0.3)
    fillLight.position.set(-5, 3, -5)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x00f5ff, 0.4)
    rimLight.position.set(0, -2, 5)
    scene.add(rimLight)

    // Engine stand / platform
    const platformGeometry = new THREE.CylinderGeometry(1.5, 1.7, 0.15, 32)
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x222233,
      metalness: 0.8,
      roughness: 0.3
    })
    const platform = new THREE.Mesh(platformGeometry, platformMaterial)
    platform.position.y = -1.2
    platform.receiveShadow = true
    scene.add(platform)

    // Stand pole
    const poleGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 16)
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0x333344,
      metalness: 0.9,
      roughness: 0.2
    })
    const pole = new THREE.Mesh(poleGeometry, poleMaterial)
    pole.position.y = -0.7
    scene.add(pole)

    // Engine mount bracket
    const bracketGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.4)
    const bracket = new THREE.Mesh(bracketGeometry, poleMaterial)
    bracket.position.y = -0.25
    scene.add(bracket)

    // Engine group (for rotation/vibration when running)
    const engineGroup = new THREE.Group()
    engineGroup.position.y = 0
    scene.add(engineGroup)
    engineGroupRef.current = engineGroup

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 20, 0x222244, 0x111133)
    gridHelper.position.y = -1.25
    scene.add(gridHelper)

    // Particle system for sparks
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff6b00,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.visible = false
    scene.add(particles)

    // Animation loop
    let time = 0
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      time += 0.016

      controls.update()

      // Engine vibration when running
      if (engineRunning && engineGroupRef.current) {
        const intensity = 0.003 + (rpm / 10000) * 0.005
        engineGroupRef.current.position.x = Math.sin(time * 50) * intensity
        engineGroupRef.current.position.y = Math.cos(time * 60) * intensity
        engineGroupRef.current.rotation.z = Math.sin(time * 55) * intensity * 0.5
      }

      // Update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life -= 0.02
        if (p.life <= 0) {
          if (p.mesh.parent) p.mesh.parent.remove(p.mesh)
          return false
        }
        p.mesh.position.add(p.velocity)
        p.velocity.y -= 0.002
        p.mesh.material.opacity = p.life
        return true
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
      renderer.dispose()
    }
  }, [engineRunning, rpm])

  // Add part to engine
  const addPartToEngine = useCallback((partKey) => {
    if (!engineGroupRef.current || !sceneRef.current) return

    const part = ENGINE_PARTS[partKey]
    const geometry = createPartGeometry(part)

    let mesh
    if (geometry instanceof THREE.Group) {
      mesh = geometry
      mesh.position.set(...part.position)
    } else {
      const material = new THREE.MeshStandardMaterial({
        color: part.color,
        metalness: 0.7,
        roughness: 0.3,
        envMapIntensity: 0.5
      })
      mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...part.position)
    }

    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.name = partKey

    // Animate part appearing
    mesh.scale.set(0, 0, 0)
    engineGroupRef.current.add(mesh)

    // Scale up animation
    let scale = 0
    const animateScale = () => {
      scale += 0.08
      if (scale >= 1) {
        mesh.scale.set(1, 1, 1)
        // Spawn particles
        spawnParticles(part.position)
        return
      }
      mesh.scale.set(scale, scale, scale)
      requestAnimationFrame(animateScale)
    }
    animateScale()

    setPlacedParts(prev => ({ ...prev, [partKey]: true }))
    setSelectedPart(null)
  }, [])

  // Spawn particles effect
  const spawnParticles = (position) => {
    if (!sceneRef.current) return

    for (let i = 0; i < 15; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8)
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0xff6b00 : 0x00f5ff,
        transparent: true,
        opacity: 1
      })
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set(
        position[0] + (Math.random() - 0.5) * 0.3,
        position[1] + (Math.random() - 0.5) * 0.3,
        position[2] + (Math.random() - 0.5) * 0.3
      )
      sceneRef.current.add(particle)

      particlesRef.current.push({
        mesh: particle,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          Math.random() * 0.05 + 0.02,
          (Math.random() - 0.5) * 0.05
        ),
        life: 1
      })
    }
  }

  // Check if all parts placed
  useEffect(() => {
    const totalParts = Object.keys(ENGINE_PARTS).length
    const placedCount = Object.keys(placedParts).length

    if (placedCount === totalParts && stage === 'assembly') {
      setTimeout(() => setStage('tune'), 1500)
    }
  }, [placedParts, stage])

  // Handle tuning
  const handleTune = () => {
    if (afr >= 45 && afr <= 55 && timing >= 45 && timing <= 55 && idle >= 45 && idle <= 55) {
      setEngineTuned(true)
    }
  }

  // Handle engine start
  const handleStart = () => {
    if (engineTuned) {
      setEngineRunning(true)
      // Simulate RPM rise
      let currentRpm = 0
      const rpmInterval = setInterval(() => {
        currentRpm += 50
        if (currentRpm >= 750) {
          clearInterval(rpmInterval)
          setRpm(750)
        } else {
          setRpm(currentRpm)
        }
      }, 30)
    }
  }

  // Reset game
  const resetGame = () => {
    // Remove all parts from engine group
    if (engineGroupRef.current) {
      while (engineGroupRef.current.children.length > 0) {
        engineGroupRef.current.remove(engineGroupRef.current.children[0])
      }
    }

    setStage('assembly')
    setPlacedParts({})
    setSelectedPart(null)
    setEngineTuned(false)
    setEngineRunning(false)
    setAfr(50)
    setTiming(50)
    setIdle(50)
    setRpm(0)
  }

  const partsRemaining = Object.keys(ENGINE_PARTS).length - Object.keys(placedParts).length
  const availableParts = getAvailableParts()

  return (
    <div className="engine-builder-game" ref={containerRef}>
      <canvas ref={canvasRef} className="engine-canvas" />

      <div className="game-header">
        <Link to="/" className="home-link">← Back</Link>
        <div className="game-title">
          <h1>Honda D16Y8 Engine Builder</h1>
          <p className="engine-spec">1.6L SOHC VTEC • 127hp @ 6600rpm • 1996-2000 Civic</p>
        </div>
      </div>

      {stage === 'assembly' && (
        <>
          <div className="parts-panel">
            <div className="panel-header">
              <span className="parts-count">{partsRemaining}</span>
              <span className="parts-label">parts remaining</span>
            </div>

            {showHint && (
              <div className="hint-box" onClick={() => setShowHint(false)}>
                Click a part to select, then it will be added to the engine
                <span className="close-hint">×</span>
              </div>
            )}

            <div className="parts-list">
              {availableParts.map(([key, part]) => (
                <button
                  key={key}
                  className={`part-button ${selectedPart === key ? 'selected' : ''}`}
                  onClick={() => addPartToEngine(key)}
                >
                  <span className="part-layer">L{part.layer}</span>
                  <span className="part-name">{part.name}</span>
                </button>
              ))}
            </div>

            {availableParts.length === 0 && partsRemaining > 0 && (
              <div className="waiting-message">
                Waiting for prerequisites...
              </div>
            )}
          </div>

          {partsRemaining === 0 && (
            <div className="complete-overlay">
              <div className="complete-message">
                <span className="check-icon">✓</span>
                ENGINE ASSEMBLED!
              </div>
            </div>
          )}
        </>
      )}

      {stage === 'tune' && (
        <div className="tuning-overlay">
          <div className="tuning-panel">
            <h2>Tune the Engine</h2>

            <div className="control-group">
              <label>Air/Fuel Ratio</label>
              <div className="slider-row">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={afr}
                  onChange={(e) => setAfr(parseInt(e.target.value))}
                  className="tuning-slider"
                />
                <span className="value-display">{(10 + afr * 0.1).toFixed(1)}:1</span>
              </div>
            </div>

            <div className="control-group">
              <label>Ignition Timing</label>
              <div className="slider-row">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={timing}
                  onChange={(e) => setTiming(parseInt(e.target.value))}
                  className="tuning-slider"
                />
                <span className="value-display">{Math.round(timing * 0.35)}° BTDC</span>
              </div>
            </div>

            <div className="control-group">
              <label>Idle Speed</label>
              <div className="slider-row">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={idle}
                  onChange={(e) => setIdle(parseInt(e.target.value))}
                  className="tuning-slider"
                />
                <span className="value-display">{500 + Math.round(idle * 10)} RPM</span>
              </div>
            </div>

            <button className="tune-button" onClick={handleTune}>
              TEST TUNE
            </button>

            {engineTuned ? (
              <div className="tune-success">
                <div className="success-icon">✓</div>
                <p>Perfect tune achieved!</p>
                <button className="continue-button" onClick={() => setStage('start')}>
                  START ENGINE →
                </button>
              </div>
            ) : (
              <p className="tune-hint">Adjust all settings to the optimal range (45-55%)</p>
            )}
          </div>
        </div>
      )}

      {stage === 'start' && (
        <div className="start-overlay">
          {!engineRunning ? (
            <div className="start-panel">
              <h2>Ready to Fire!</h2>
              <p>Your D16Y8 is assembled and tuned</p>
              <button className="start-button" onClick={handleStart}>
                <span className="key-icon">🔑</span>
                TURN KEY
              </button>
            </div>
          ) : (
            <div className="running-panel">
              <h1 className="running-title">ENGINE RUNNING!</h1>
              <p className="running-subtitle">D16Y8 VTEC • 127hp Ready</p>

              <div className="gauges">
                <div className="gauge">
                  <div className="gauge-value">{rpm}</div>
                  <div className="gauge-label">RPM</div>
                </div>
                <div className="gauge">
                  <div className="gauge-value">14.7:1</div>
                  <div className="gauge-label">A/F Ratio</div>
                </div>
                <div className="gauge">
                  <div className="gauge-value">16°</div>
                  <div className="gauge-label">Timing</div>
                </div>
              </div>

              <button className="rebuild-button" onClick={resetGame}>
                BUILD ANOTHER ENGINE
              </button>
            </div>
          )}
        </div>
      )}

      <div className="controls-hint">
        <span>🖱️ Drag to rotate</span>
        <span>⚙️ Scroll to zoom</span>
      </div>
    </div>
  )
}
