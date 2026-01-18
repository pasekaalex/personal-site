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
  const [engineRunning, setEngineRunning] = useState(false)
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

  // Create 3D geometry for a part with detailed modeling
  const createPartGeometry = (part) => {
    const [sx, sy, sz] = part.size
    const material = new THREE.MeshStandardMaterial({
      color: part.color,
      metalness: 0.8,
      roughness: 0.3
    })

    switch (part.geometry) {
      case 'block': {
        // Engine block with cylinder bores
        const group = new THREE.Group()

        // Main block body
        const blockGeo = new THREE.BoxGeometry(sx, sy, sz)
        const blockMesh = new THREE.Mesh(blockGeo, material)
        group.add(blockMesh)

        // Cylinder bores (4 cylinders)
        const boreMaterial = new THREE.MeshStandardMaterial({
          color: 0x2a2a2a,
          metalness: 0.9,
          roughness: 0.1
        })
        for (let i = 0; i < 4; i++) {
          const bore = new THREE.CylinderGeometry(0.085, 0.085, 0.3, 24)
          const boreMesh = new THREE.Mesh(bore, boreMaterial)
          boreMesh.position.set(-0.27 + i * 0.18, sy * 0.3, 0)
          group.add(boreMesh)
        }

        // Bolt holes around perimeter
        const boltMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          metalness: 0.9,
          roughness: 0.2
        })
        const boltPositions = [
          [-sx/2 + 0.1, sy/2 - 0.1, sz/2 - 0.1],
          [sx/2 - 0.1, sy/2 - 0.1, sz/2 - 0.1],
          [-sx/2 + 0.1, sy/2 - 0.1, -sz/2 + 0.1],
          [sx/2 - 0.1, sy/2 - 0.1, -sz/2 + 0.1],
        ]
        boltPositions.forEach(pos => {
          const bolt = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 8)
          const boltMesh = new THREE.Mesh(bolt, boltMaterial)
          boltMesh.position.set(...pos)
          group.add(boltMesh)
        })

        // Cooling passages
        const coolantGeo = new THREE.CylinderGeometry(0.04, 0.04, sy * 0.7, 12)
        const coolantMat = new THREE.MeshStandardMaterial({
          color: 0x3a5a7a,
          metalness: 0.6,
          roughness: 0.4
        })
        const coolantMesh = new THREE.Mesh(coolantGeo, coolantMat)
        coolantMesh.position.set(sx/2 - 0.15, 0, 0)
        coolantMesh.rotation.z = Math.PI / 2
        group.add(coolantMesh)

        return group
      }

      case 'head': {
        // Cylinder head with ports
        const group = new THREE.Group()

        // Main head casting
        const headGeo = new THREE.BoxGeometry(sx, sy, sz)
        const headMesh = new THREE.Mesh(headGeo, material)
        group.add(headMesh)

        // Combustion chambers
        const chamberMaterial = new THREE.MeshStandardMaterial({
          color: 0x3a3a3a,
          metalness: 0.85,
          roughness: 0.2
        })
        for (let i = 0; i < 4; i++) {
          const chamber = new THREE.SphereGeometry(0.09, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2)
          const chamberMesh = new THREE.Mesh(chamber, chamberMaterial)
          chamberMesh.position.set(-0.27 + i * 0.18, -sy/2, 0)
          chamberMesh.rotation.x = Math.PI
          group.add(chamberMesh)
        }

        // Valve guide towers
        for (let i = 0; i < 4; i++) {
          const tower = new THREE.CylinderGeometry(0.06, 0.08, sy * 0.6, 12)
          const towerMesh = new THREE.Mesh(tower, material)
          towerMesh.position.set(-0.27 + i * 0.18, sy * 0.15, 0.12)
          group.add(towerMesh)

          const tower2 = towerMesh.clone()
          tower2.position.z = -0.12
          group.add(tower2)
        }

        // Coolant passages
        const coolantGeo = new THREE.TorusGeometry(0.35, 0.03, 8, 24)
        const coolantMat = new THREE.MeshStandardMaterial({
          color: 0x4a6a8a,
          metalness: 0.7,
          roughness: 0.3
        })
        const coolantMesh = new THREE.Mesh(coolantGeo, coolantMat)
        coolantMesh.rotation.x = Math.PI / 2
        coolantMesh.position.y = sy / 3
        group.add(coolantMesh)

        return group
      }

      case 'cover': {
        // Valve cover with Honda styling
        const group = new THREE.Group()

        // Main cover body (slightly rounded)
        const coverShape = new THREE.Shape()
        const radius = 0.08
        coverShape.moveTo(-sx/2 + radius, -sz/2)
        coverShape.lineTo(sx/2 - radius, -sz/2)
        coverShape.quadraticCurveTo(sx/2, -sz/2, sx/2, -sz/2 + radius)
        coverShape.lineTo(sx/2, sz/2 - radius)
        coverShape.quadraticCurveTo(sx/2, sz/2, sx/2 - radius, sz/2)
        coverShape.lineTo(-sx/2 + radius, sz/2)
        coverShape.quadraticCurveTo(-sx/2, sz/2, -sx/2, sz/2 - radius)
        coverShape.lineTo(-sx/2, -sz/2 + radius)
        coverShape.quadraticCurveTo(-sx/2, -sz/2, -sx/2 + radius, -sz/2)

        const extrudeSettings = {
          depth: sy,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
          bevelSegments: 3
        }
        const coverGeo = new THREE.ExtrudeGeometry(coverShape, extrudeSettings)
        const coverMesh = new THREE.Mesh(coverGeo, material)
        coverMesh.rotation.x = Math.PI / 2
        coverMesh.position.y = -sy/2
        group.add(coverMesh)

        // Ribbing for strength
        const ribMaterial = new THREE.MeshStandardMaterial({
          color: part.color,
          metalness: 0.85,
          roughness: 0.25
        })
        for (let i = 0; i < 3; i++) {
          const rib = new THREE.BoxGeometry(sx - 0.2, 0.03, 0.05)
          const ribMesh = new THREE.Mesh(rib, ribMaterial)
          ribMesh.position.set(0, sy/2 - 0.02, -sz/3 + i * sz/3)
          group.add(ribMesh)
        }

        // Oil filler cap
        const capGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.08, 16)
        const capMat = new THREE.MeshStandardMaterial({
          color: 0x2a2a2a,
          metalness: 0.9,
          roughness: 0.1
        })
        const capMesh = new THREE.Mesh(capGeo, capMat)
        capMesh.position.set(sx/3, sy/2 + 0.04, 0)
        group.add(capMesh)

        // Honda logo embossing (simple raised area)
        const logoGeo = new THREE.BoxGeometry(0.15, 0.01, 0.08)
        const logoMesh = new THREE.Mesh(logoGeo, ribMaterial)
        logoMesh.position.set(-sx/4, sy/2 - 0.01, 0)
        group.add(logoMesh)

        return group
      }

      case 'pistons': {
        // Detailed pistons with rings
        const group = new THREE.Group()

        for (let i = 0; i < 4; i++) {
          const pistonGroup = new THREE.Group()

          // Piston skirt
          const skirtGeo = new THREE.CylinderGeometry(sx * 0.95, sx, sy * 0.7, 24)
          const skirtMesh = new THREE.Mesh(skirtGeo, material)
          skirtMesh.position.y = -sy * 0.15
          pistonGroup.add(skirtMesh)

          // Piston crown (dome)
          const crownGeo = new THREE.SphereGeometry(sx, 16, 12, 0, Math.PI * 2, 0, Math.PI / 3)
          const crownMesh = new THREE.Mesh(crownGeo, material)
          crownMesh.position.y = sy * 0.35
          pistonGroup.add(crownMesh)

          // Piston rings
          const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555,
            metalness: 0.95,
            roughness: 0.05
          })
          for (let j = 0; j < 3; j++) {
            const ring = new THREE.TorusGeometry(sx * 0.98, 0.008, 8, 24)
            const ringMesh = new THREE.Mesh(ring, ringMaterial)
            ringMesh.rotation.x = Math.PI / 2
            ringMesh.position.y = sy * 0.15 - j * 0.03
            pistonGroup.add(ringMesh)
          }

          // Wrist pin boss
          const bossGeo = new THREE.CylinderGeometry(sx * 0.4, sx * 0.4, sx * 1.8, 16)
          const bossMesh = new THREE.Mesh(bossGeo, material)
          bossMesh.rotation.z = Math.PI / 2
          bossMesh.position.y = -sy * 0.25
          pistonGroup.add(bossMesh)

          pistonGroup.position.z = -0.45 + i * 0.3
          group.add(pistonGroup)
        }

        return group
      }

      case 'rods': {
        // Detailed connecting rods
        const group = new THREE.Group()

        for (let i = 0; i < 4; i++) {
          const rodGroup = new THREE.Group()

          // Rod beam (I-beam profile)
          const beamGeo = new THREE.BoxGeometry(sx * 2, sy, sx * 1.5)
          const beamMesh = new THREE.Mesh(beamGeo, material)
          rodGroup.add(beamMesh)

          // Big end (crank side)
          const bigEndGeo = new THREE.TorusGeometry(sx * 3, sx * 1.2, 12, 24)
          const bigEndMesh = new THREE.Mesh(bigEndGeo, material)
          bigEndMesh.rotation.x = Math.PI / 2
          bigEndMesh.position.y = -sy/2
          rodGroup.add(bigEndMesh)

          // Small end (piston side)
          const smallEndGeo = new THREE.TorusGeometry(sx * 2, sx, 12, 24)
          const smallEndMesh = new THREE.Mesh(smallEndGeo, material)
          smallEndMesh.rotation.x = Math.PI / 2
          smallEndMesh.position.y = sy/2
          rodGroup.add(smallEndMesh)

          // Rod bolts
          const boltMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.95,
            roughness: 0.1
          })
          for (let j = 0; j < 2; j++) {
            const bolt = new THREE.CylinderGeometry(sx * 0.8, sx * 0.8, sx * 2.5, 8)
            const boltMesh = new THREE.Mesh(bolt, boltMaterial)
            boltMesh.position.set(j === 0 ? sx * 2.5 : -sx * 2.5, -sy/2, 0)
            boltMesh.rotation.x = Math.PI / 2
            rodGroup.add(boltMesh)
          }

          rodGroup.position.z = -0.45 + i * 0.3
          group.add(rodGroup)
        }

        return group
      }

      case 'valves': {
        // Realistic intake/exhaust valves
        const group = new THREE.Group()

        const valveMaterial = new THREE.MeshStandardMaterial({
          color: 0x999999,
          metalness: 0.95,
          roughness: 0.05
        })

        for (let cyl = 0; cyl < 4; cyl++) {
          for (let valve = 0; valve < 4; valve++) {
            const valveGroup = new THREE.Group()

            // Valve stem
            const stemGeo = new THREE.CylinderGeometry(sx, sx, sy * 0.85, 16)
            const stemMesh = new THREE.Mesh(stemGeo, valveMaterial)
            stemMesh.position.y = sy * 0.42
            valveGroup.add(stemMesh)

            // Valve head (mushroom)
            const headGeo = new THREE.CylinderGeometry(sx * 4, sx * 3, sy * 0.15, 24)
            const headMesh = new THREE.Mesh(headGeo, valveMaterial)
            headMesh.position.y = sy * 0.075
            valveGroup.add(headMesh)

            // Valve tip (keeper groove)
            const tipGeo = new THREE.CylinderGeometry(sx * 0.8, sx, sy * 0.1, 16)
            const tipMat = new THREE.MeshStandardMaterial({
              color: 0x777777,
              metalness: 0.9,
              roughness: 0.2
            })
            const tipMesh = new THREE.Mesh(tipGeo, tipMat)
            tipMesh.position.y = sy * 0.85
            valveGroup.add(tipMesh)

            const xPos = -0.15 + (valve % 2) * 0.3
            const zPos = -0.35 + cyl * 0.25 + (valve < 2 ? -0.05 : 0.05)
            valveGroup.position.set(xPos, 0, zPos)
            group.add(valveGroup)
          }
        }

        return group
      }

      case 'springs': {
        // Coiled valve springs
        const group = new THREE.Group()

        const springMaterial = new THREE.MeshStandardMaterial({
          color: part.color,
          metalness: 0.8,
          roughness: 0.2
        })

        for (let cyl = 0; cyl < 4; cyl++) {
          for (let valve = 0; valve < 4; valve++) {
            // Create coiled spring using multiple toruses
            const springGroup = new THREE.Group()

            const coils = 8
            for (let i = 0; i < coils; i++) {
              const coil = new THREE.TorusGeometry(sx * 0.8, sx * 0.2, 8, 16)
              const coilMesh = new THREE.Mesh(coil, springMaterial)
              coilMesh.rotation.x = Math.PI / 2
              coilMesh.position.y = (i / coils) * sy * 3 - sy * 1.5
              springGroup.add(coilMesh)
            }

            // Spring retainer on top
            const retainerGeo = new THREE.CylinderGeometry(sx * 1.2, sx * 0.9, sx * 0.3, 16)
            const retainerMat = new THREE.MeshStandardMaterial({
              color: 0x666666,
              metalness: 0.9,
              roughness: 0.1
            })
            const retainerMesh = new THREE.Mesh(retainerGeo, retainerMat)
            retainerMesh.position.y = sy * 1.5
            springGroup.add(retainerMesh)

            const xPos = -0.15 + (valve % 2) * 0.3
            const zPos = -0.35 + cyl * 0.25 + (valve < 2 ? -0.05 : 0.05)
            springGroup.position.set(xPos, 0, zPos)
            group.add(springGroup)
          }
        }

        return group
      }

      case 'plugs': {
        // Detailed spark plugs
        const group = new THREE.Group()

        for (let i = 0; i < 4; i++) {
          const plugGroup = new THREE.Group()

          // Plug body (ceramic)
          const bodyGeo = new THREE.CylinderGeometry(sx * 2, sx * 2, sy * 0.5, 16)
          const bodyMat = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            metalness: 0.1,
            roughness: 0.8
          })
          const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
          bodyMesh.position.y = sy * 0.25
          plugGroup.add(bodyMesh)

          // Hex nut
          const nutGeo = new THREE.CylinderGeometry(sx * 3, sx * 3, sy * 0.2, 6)
          const nutMat = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.9,
            roughness: 0.2
          })
          const nutMesh = new THREE.Mesh(nutGeo, nutMat)
          nutMesh.position.y = sy * 0.5
          plugGroup.add(nutMesh)

          // Terminal
          const termGeo = new THREE.CylinderGeometry(sx * 1.5, sx * 1.5, sy * 0.3, 16)
          const termMesh = new THREE.Mesh(termGeo, nutMat)
          termMesh.position.y = sy * 0.85
          plugGroup.add(termMesh)

          // Threads
          for (let j = 0; j < 4; j++) {
            const thread = new THREE.TorusGeometry(sx * 1.8, sx * 0.3, 6, 12)
            const threadMesh = new THREE.Mesh(thread, nutMat)
            threadMesh.rotation.x = Math.PI / 2
            threadMesh.position.y = sy * 0.05 + j * 0.025
            plugGroup.add(threadMesh)
          }

          // Ground electrode
          const electrodeGeo = new THREE.BoxGeometry(sx * 0.5, sy * 0.3, sx * 4)
          const electrodeMesh = new THREE.Mesh(electrodeGeo, nutMat)
          electrodeMesh.position.set(sx * 2.5, -sy * 0.15, 0)
          plugGroup.add(electrodeMesh)

          plugGroup.position.z = -0.35 + i * 0.25
          group.add(plugGroup)
        }

        return group
      }

      case 'injectors': {
        // Fuel injectors
        const group = new THREE.Group()

        for (let i = 0; i < 4; i++) {
          const injectorGroup = new THREE.Group()

          // Injector body
          const bodyGeo = new THREE.CylinderGeometry(sx * 2, sx * 2.5, sy * 0.7, 16)
          const bodyMat = new THREE.MeshStandardMaterial({
            color: part.color,
            metalness: 0.85,
            roughness: 0.2
          })
          const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat)
          bodyMesh.position.y = sy * 0.35
          injectorGroup.add(bodyMesh)

          // Electrical connector
          const connectorGeo = new THREE.BoxGeometry(sx * 3, sy * 0.3, sx * 4)
          const connectorMat = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.7,
            roughness: 0.4
          })
          const connectorMesh = new THREE.Mesh(connectorGeo, connectorMat)
          connectorMesh.position.set(sx * 3, sy * 0.5, 0)
          injectorGroup.add(connectorMesh)

          // O-ring seals
          const oringMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.3,
            roughness: 0.9
          })
          const oring1 = new THREE.TorusGeometry(sx * 2.3, sx * 0.5, 8, 16)
          const oring1Mesh = new THREE.Mesh(oring1, oringMaterial)
          oring1Mesh.rotation.x = Math.PI / 2
          oring1Mesh.position.y = sy * 0.6
          injectorGroup.add(oring1Mesh)

          const oring2 = oring1Mesh.clone()
          oring2.position.y = sy * 0.1
          injectorGroup.add(oring2)

          // Nozzle tip
          const nozzleGeo = new THREE.CylinderGeometry(sx * 0.8, sx * 1.5, sy * 0.15, 16)
          const nozzleMesh = new THREE.Mesh(nozzleGeo, bodyMat)
          nozzleMesh.position.y = sy * 0.075
          injectorGroup.add(nozzleMesh)

          injectorGroup.position.z = -0.35 + i * 0.25
          group.add(injectorGroup)
        }

        return group
      }

      case 'manifold': {
        // Detailed intake manifold
        const group = new THREE.Group()

        // Main plenum chamber
        const plenumGeo = new THREE.CylinderGeometry(sx * 0.35, sx * 0.4, sy * 0.6, 24)
        const plenumMesh = new THREE.Mesh(plenumGeo, material)
        plenumMesh.rotation.z = Math.PI / 2
        plenumMesh.position.y = sy * 0.25
        group.add(plenumMesh)

        // Individual runners to each cylinder
        const runnerMaterial = new THREE.MeshStandardMaterial({
          color: part.color,
          metalness: 0.75,
          roughness: 0.3
        })

        for (let i = 0; i < 4; i++) {
          // Curved runner
          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, sy * 0.15, 0),
            new THREE.Vector3(0, -sy * 0.1, 0.1),
            new THREE.Vector3(0, -sy * 0.2, 0.2)
          )

          const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.06, 12, false)
          const tubeMesh = new THREE.Mesh(tubeGeo, runnerMaterial)
          tubeMesh.position.x = -0.3 + i * 0.2
          group.add(tubeMesh)

          // Runner flange
          const flangeGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.04, 16)
          const flangeMesh = new THREE.Mesh(flangeGeo, material)
          flangeMesh.rotation.x = Math.PI / 2
          flangeMesh.position.set(-0.3 + i * 0.2, -sy * 0.2, 0.2)
          group.add(flangeMesh)
        }

        // Throttle body mounting flange
        const tbFlangeGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.06, 24)
        const tbFlangeMesh = new THREE.Mesh(tbFlangeGeo, material)
        tbFlangeMesh.rotation.z = Math.PI / 2
        tbFlangeMesh.position.set(sx/2 + 0.05, sy * 0.25, 0)
        group.add(tbFlangeMesh)

        return group
      }

      case 'exhaust': {
        // Tubular exhaust manifold
        const group = new THREE.Group()

        const pipeMaterial = new THREE.MeshStandardMaterial({
          color: part.color,
          metalness: 0.7,
          roughness: 0.4
        })

        // Primary pipes from each cylinder
        for (let i = 0; i < 4; i++) {
          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0.1, -0.05, 0.08),
            new THREE.Vector3(0.35, -0.1, 0.15)
          )

          const pipeGeo = new THREE.TubeGeometry(curve, 16, 0.06, 12, false)
          const pipeMesh = new THREE.Mesh(pipeGeo, pipeMaterial)
          pipeMesh.position.x = -0.3 + i * 0.2
          group.add(pipeMesh)

          // Exhaust port flange
          const flangeGeo = new THREE.CylinderGeometry(0.07, 0.075, 0.04, 12)
          const flangeMat = new THREE.MeshStandardMaterial({
            color: 0x4a3a2a,
            metalness: 0.8,
            roughness: 0.3
          })
          const flangeMesh = new THREE.Mesh(flangeGeo, flangeMat)
          flangeMesh.rotation.x = Math.PI / 2
          flangeMesh.position.set(-0.3 + i * 0.2, 0, 0)
          group.add(flangeMesh)
        }

        // Collector
        const collectorGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.3, 16)
        const collectorMesh = new THREE.Mesh(collectorGeo, pipeMaterial)
        collectorMesh.rotation.x = Math.PI / 2
        collectorMesh.position.set(0.35, -0.1, 0.25)
        group.add(collectorMesh)

        // Merge collector
        const mergeGeo = new THREE.ConeGeometry(0.11, 0.15, 16)
        const mergeMesh = new THREE.Mesh(mergeGeo, pipeMaterial)
        mergeMesh.rotation.x = -Math.PI / 2
        mergeMesh.position.set(0.35, -0.1, 0.1)
        group.add(mergeMesh)

        return group
      }

      case 'belt': {
        // Timing belt with teeth
        const group = new THREE.Group()

        // Main belt body
        const curve = new THREE.EllipseCurve(
          0, 0,
          0.15, sy / 2,
          0, 2 * Math.PI,
          false,
          0
        )

        const points = curve.getPoints(50)
        const beltShape = new THREE.Shape(points)

        const extrudeSettings = {
          depth: 0.04,
          bevelEnabled: false,
          steps: 1
        }

        const beltGeo = new THREE.ExtrudeGeometry(beltShape, extrudeSettings)
        const beltMat = new THREE.MeshStandardMaterial({
          color: part.color,
          metalness: 0.2,
          roughness: 0.9
        })
        const beltMesh = new THREE.Mesh(beltGeo, beltMat)
        beltMesh.rotation.y = Math.PI / 2
        beltMesh.position.x = -0.02
        group.add(beltMesh)

        return group
      }

      case 'pump': {
        // Water pump
        const group = new THREE.Group()

        // Pump housing
        const housingGeo = new THREE.CylinderGeometry(sx * 1.2, sx, sy, 24)
        const housingMesh = new THREE.Mesh(housingGeo, material)
        group.add(housingMesh)

        // Pulley
        const pulleyGeo = new THREE.CylinderGeometry(sx * 1.5, sx * 1.4, sy * 0.4, 32)
        const pulleyMat = new THREE.MeshStandardMaterial({
          color: 0x3a3a3a,
          metalness: 0.9,
          roughness: 0.2
        })
        const pulleyMesh = new THREE.Mesh(pulleyGeo, pulleyMat)
        pulleyMesh.position.y = sy * 0.7
        group.add(pulleyMesh)

        // Pulley grooves
        for (let i = 0; i < 3; i++) {
          const groove = new THREE.TorusGeometry(sx * 1.3, sx * 0.15, 8, 24)
          const grooveMesh = new THREE.Mesh(groove, new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.85,
            roughness: 0.3
          }))
          grooveMesh.rotation.x = Math.PI / 2
          grooveMesh.position.y = sy * 0.6 + i * 0.08
          group.add(grooveMesh)
        }

        // Mounting flange
        const flangeGeo = new THREE.CylinderGeometry(sx * 1.8, sx * 1.6, sy * 0.15, 6)
        const flangeMesh = new THREE.Mesh(flangeGeo, material)
        flangeMesh.position.y = -sy * 0.4
        group.add(flangeMesh)

        return group
      }

      case 'alternator': {
        // Alternator with pulley
        const group = new THREE.Group()

        // Main housing
        const housingGeo = new THREE.CylinderGeometry(sx * 1.1, sx * 1.2, sz, 32)
        const housingMesh = new THREE.Mesh(housingGeo, material)
        housingMesh.rotation.x = Math.PI / 2
        group.add(housingMesh)

        // Front cover
        const coverGeo = new THREE.CylinderGeometry(sx * 1.15, sx * 1.05, sz * 0.2, 32)
        const coverMat = new THREE.MeshStandardMaterial({
          color: 0x2a2a2a,
          metalness: 0.85,
          roughness: 0.2
        })
        const coverMesh = new THREE.Mesh(coverGeo, coverMat)
        coverMesh.rotation.x = Math.PI / 2
        coverMesh.position.z = sz * 0.6
        group.add(coverMesh)

        // Pulley
        const pulleyGeo = new THREE.CylinderGeometry(sx * 0.9, sx * 0.85, sz * 0.3, 32)
        const pulleyMesh = new THREE.Mesh(pulleyGeo, coverMat)
        pulleyMesh.rotation.x = Math.PI / 2
        pulleyMesh.position.z = sz * 0.75
        group.add(pulleyMesh)

        // Voltage regulator
        const regGeo = new THREE.BoxGeometry(sx * 0.8, sz * 0.4, sx * 1.2)
        const regMat = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          metalness: 0.7,
          roughness: 0.4
        })
        const regMesh = new THREE.Mesh(regGeo, regMat)
        regMesh.position.set(sx * 0.9, sz * 0.2, 0)
        group.add(regMesh)

        // Mounting brackets
        const bracketGeo = new THREE.BoxGeometry(sx * 0.3, sz * 0.15, sz * 1.2)
        const bracketMesh = new THREE.Mesh(bracketGeo, material)
        bracketMesh.position.y = sz * 0.6
        group.add(bracketMesh)

        return group
      }

      case 'cylinder':
      case 'torus':
      default: {
        // Fallback for simple parts
        let geo
        if (part.geometry === 'cylinder') {
          geo = new THREE.CylinderGeometry(sx, sx, sz, 24)
          geo.rotateX(Math.PI / 2)
        } else if (part.geometry === 'torus') {
          geo = new THREE.TorusGeometry(sx, sy, 12, 24)
        } else {
          geo = new THREE.BoxGeometry(sx, sy, sz)
        }
        return geo
      }
    }
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
      // Enable shadows for all meshes in the group
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    } else {
      const material = new THREE.MeshStandardMaterial({
        color: part.color,
        metalness: 0.7,
        roughness: 0.3,
        envMapIntensity: 0.5
      })
      mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...part.position)
      mesh.castShadow = true
      mesh.receiveShadow = true
    }

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
      setTimeout(() => setStage('start'), 1500)
    }
  }, [placedParts, stage])

  // Handle engine start
  const handleStart = () => {
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
    setEngineRunning(false)
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

      {stage === 'start' && (
        <div className="start-overlay">
          {!engineRunning ? (
            <div className="start-panel">
              <h2>Ready to Fire!</h2>
              <p>Your D16Y8 is fully assembled and ready</p>
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
