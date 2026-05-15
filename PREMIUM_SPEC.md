# PREMIUM_SPEC.md — paseka.dev Browser OS
## The Definitive Creative Specification for the Ultimate Premium Portfolio Experience

> *"A browser OS that feels more real than most native apps — where every pixel has purpose and every interaction rewards curiosity."*

---

## 1. 🎯 PHILOSOPHY

### The One Sentence
> **paseka.dev is a fully-immersive browser OS that blurs the line between portfolio and operating system — built by a power user, for people who appreciate the art of building things.**

### What "Premium" Means Here

**Premium is not "expensive" — it's "considered."**

Every element earns its place. Nothing decorative without function. Nothing functional without elegance.

- **Physical weight** — Windows feel like they have mass. Dragging has resistance. Dropping has impact.
- **Response without delay** — Every interaction responds within a single frame. 60fps or nothing.
- **Discovery as design** — The site rewards curiosity. Every secret found is a "they thought of THAT?" moment.
- **Cohesion in chaos** — Many apps, many features, one unified visual language.
- **Personality over polish** — A slightly imperfect edge that feels human > sterile corporate perfection.

### Tradeoffs Made (and why)

| Choice | Tradeoff | Why It's Worth It |
|--------|---------|-----------------|
| No actual backend | Limited real data | Portfolio stays fast, self-contained |
| No mobile full OS | Mobile sees simplified view | Power-user desktop is the statement |
| Heavy animations | Performance risk on low-end | First-impression quality > marginal reach |
| Many easter eggs | More surface area for bugs | Delight > marginal risk |
| Custom window system | Steeper dev curve | The OS IS the portfolio — core to the value |

---

## 2. 👁️ SENSORY DESIGN

### Color System — Every Hex Has Purpose

```
DEEP VOID background:  #05050a  — the infinite canvas everything sits on
SURFACE elevated:      #0a0a12  — raised panels, cards
PANEL glass:          #12121f  — glass panel backgrounds

ELECTRIC LILAC:       #b87aff  — primary interactive, signature glow
SOFT LILAC:           #9d6ae8  — hover states, secondary glow
MIST highlight:       #d4a9ff  — text on dark, bright moments

HOT PINK:             #ff2d95  — accent, urgent actions, 18+ tag
SOFT PINK:            #ff6eb4  — pink hover states

ICE BLUE:             #7dd3fc  — secondary accent, contrast moments
SKY BLUE:             #38bdf8  — interactive blue elements

NEON GREEN:            #00ff88  — success, "available" pulse
SOFT RED:             #ff6b6b  — error, warning states

GLASS BG:             rgba(15, 15, 25, 0.88) — all glass panels
TEXT PRIMARY:          rgba(255, 255, 255, 1.0)
TEXT SECONDARY:        rgba(255, 255, 255, 0.6)
TEXT MUTED:           rgba(255, 255, 255, 0.35)
```

### Typography Scale

```
FONT FAMILIES
• Display/Logo:   Orbitron 800   — aggressive, techy
• Headings:       Orbitron 600  — section titles
• Body/UI:         Inter 400-600 — clean, readable
• Terminal/Code:  JetBrains Mono — developer aesthetic
• Retro:           VT323        — scanline vibes

TYPE SCALE (8px base, 1.25 modular scale)
micro:     11px / 16px  — tooltips, clock seconds
caption:   13px / 20px  — labels, metadata
body:      15px / 24px  — primary content
ui:        17px / 26px  — buttons, menu items
subtitle:  20px / 30px  — card titles
heading:   26px / 34px  — window titles
display:   34px / 42px  — About name
hero:      48px / 56px  — main title
massive:   72px / 80px  — boot sequence logo

LETTER SPACING
• ALL CAPS titles: 0.15em
• Mono/terminal:  -0.02em
• Normal:         0 (default)

LINE HEIGHTS
• Tight headings: 1.1
• Normal body:    1.5
• Relaxed:        1.7
```

### Spacing System — 4px Grid

```
spacing: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64px

RADIUS
• Buttons:      8px
• Cards/Panels: 14px
• Windows:      14px
• Dock icons:   12px
• Chips/badges: 6px
• Full round:   9999px (pills, dots)

SHADOWS
• Level 1:  0 4px 16px rgba(0,0,0,0.3)   — subtle lift
• Level 2:  0 8px 32px rgba(0,0,0,0.4)   — standard card
• Level 3:  0 16px 48px rgba(0,0,0,0.5)  — floating window
• Level 4:  0 24px 64px rgba(0,0,0,0.6)  — drag/elevated
• Lilac glow: 0 0 20px rgba(184,122,255,0.3)
• Active:    0 0 40px rgba(184,122,255,0.5)
```

### Motion Philosophy — Physics, Not Math

```
SPRING PHYSICS (interactive elements)
cubic-bezier(0.34, 1.56, 0.64, 1) — 34% overshoot
Used: button press, window open, card hover lift

EASE-OUT (elements entering)
cubic-bezier(0.0, 0.0, 0.2, 1) — fast start, gentle arrival
Used: modals opening, notifications, tooltips

EASE-IN (elements leaving)
cubic-bezier(0.4, 0.0, 1.0, 1.0) — gentle start, quick exit
Used: modals closing, notifications dismissing

INSTANT (direct manipulation)
transition: none — cursor lag for mass sensation
Used: drag, resize

DURATION SCALE
• Micro:     80-120ms  — hover state changes, button clicks
• Short:     150-200ms — small reveals, toggles
• Medium:    250-350ms — window open/close, card animations
• Long:      400-600ms — major transitions, boot sequence
• Dramatic:  800ms+    — boot logo, easter egg moments

PHYSICAL WINDOW DRAGGING
When dragging:
  • position updates every frame (no transition)
  • shadow deepens: level 3 → level 4
  • slight scale: 1.0 → 1.02 (peels off surface)
On drop:
  • spring settle animation (150ms)
  • window "lands" with subtle micro-bounce

WINDOW OPEN SEQUENCE
1. Spawns at cursor/centered position
2. Starts scale(0.85), opacity 0
3. Springs to scale(1.02) at 200ms
4. Settles to scale(1.0) at 300ms
5. Shadow: level 3 → 4 → 3

WINDOW CLOSE SEQUENCE
1. Shrinks to scale(0.95) (100ms)
2. Fades to opacity 0 (150ms)
3. (Optional: shrinks toward dock icon)
```

### Icon Style

```
• All icons: SVG, monochrome (#b87aff or rgba white)
• Stroke weight: 1.5px consistent
• Size: 24px UI, 52px dock, 20px in-text
• Hover: color → full white + subtle glow

DOCK MAGNIFICATION SIZES
• Default:     52×52px (scale 1.0)
• Center:      78×78px (scale 1.5)
• Immediate:   62×62px (scale 1.2)
• Neighbor:     58×58px (scale 1.1)
```

### Micro-Copy Tone

**Voice: Direct, slightly playful, never corporate.**

```
Boot:  "Loading paseka.dev OS v1.0..." → "Initializing..." → "Almost there..."

Terminal welcome:
╔═══════════════════════════════════════╗
║  ◉ Terminal v1.0 | Type 'help'         ║
║    for commands.                      ║
╚═══════════════════════════════════════╝

Errors:
  "404: That file doesn't exist here."
  "Permission denied. Nice try. 🦀"
  "Weather not found. Check your zip code."

Success (toast, 3s):
  "Music started."
  "Window minimized."
  "Theme updated."

Easter eggs:
  sudo → "Permission denied. Nice try. 🦀"
  matrix → "Wake up, Neo..." → matrix rain
  hack → "ACCESSING THE MATRIX..." → "Just kidding."
```

---

## 3. 🖥️ CORE OS STRUCTURE

### Desktop Layer Stack (bottom → top)

```
1. Background image (brightness 0.2, saturate 0.6)
2. Glow blobs (animated radial gradients, 0.05-0.1 opacity)
3. Vignette (radial gradient dark edges)
4. Scanlines (2px repeat, 0.03 opacity, CRT texture)
5. Mouse-reactive parallax (3 layers, 0.02-0.08× mouse delta)
6. Particle canvas (cursor trail, z-index: 2)
7. OS UI (desktop layout, windows, dock, z-index: 10+)
```

**Wallpaper Mouse Parallax:**
- Layer 1 (glow blobs): 0.02× mouse delta
- Layer 2 (gradient overlay): 0.05× mouse delta
- Layer 3 (vignette): 0.08× mouse delta
- Uses lerp for smooth following
- Idle after 5s: subtle blob drift animation

**Desktop Interactions:**
- Single-click desktop: deselect all, close menus
- Double-click desktop: sparkle burst at cursor
- Right-click desktop: context menu at cursor
- Drag window to edge: virtual desktop switch

**Avatar Section (center):**
- Floating: translateY ±10px over 6s
- Glowing halo (radial gradient, pulsing)
- Rotating ring (20s full rotation, lilac dot on edge)
- Click 10× in 800ms: "Crazy Mode" (5s rainbow spin)
- Hover: scale 1.08, border brightens, glow intensifies

### Window System — The Heart of the Experience

```
WINDOW ANATOMY
┌─────────────────────────────────────────────────┐
│ ● ● ●   [ Window Title            ]   [─][□][×] │  ← 32px header
├─────────────────────────────────────────────────┤
│                                                   │
│               CONTENT AREA                       │
│            (scrollable if needed)                 │
│                                                   │
└─────────────────────────────────────────────────┘
    ↑ invisible resize handles on all 8 edges/corners
```

**Header (32px):**
- Traffic lights: ● ● ● (12px circles) — left side
- Window title: centered, 13px, muted color
- Window controls: right side, [─] [□] [×]
- Glass background + 1px white top highlight line
- Cursor: 'move' on entire header

**Body:**
- Background: rgba(10, 10, 18, 0.95)
- backdrop-filter: blur(60px)
- Border: 1px solid rgba(255, 255, 255, 0.06)
- Border-radius: 14px
- Box-shadow: level 3, color shifts per window type:
  - About: lilac shadow
  - Projects: blue shadow
  - Contact: green shadow
  - Terminal: dark purple shadow

**Window States:**
- Normal: user-positioned, resizable
- Focused: highest z-index, border glow, intensified shadow
- Maximized: fills viewport minus menubar/dock
- Minimized: hidden, dock shows indicator dot
- Dragging: elevated (level 4 shadow), scale 1.02
- Resizing: cursor changes per direction, live resize

**Size Constraints:**
- Minimum: 300×200px
- Default: 560×400px
- Maximized: calc(100vw × 100vh - 28px menubar - 70px dock)

**Z-Index:**
- Base: 500
- Each focus: highestZIndex++
- Modals (spotlight, context menu): 1000+
- Toasts: 1100
- Boot sequence: 2000

**Position Persistence:**
- Save to localStorage on every change
- Key: "paseka_windows" → JSON {windowId: {x, y, width, height}}
- Restore on load (fallback: centered default)
- Maximized/minimized state also persisted

**Window Snap to Edges:**
- Left 10% → snap left 50%
- Right 10% → snap right 50%
- Top 10% → maximize
- Visual guide: semi-transparent overlay shows snap zone
- Release → animate to snap (200ms spring)

**Resize Handles (invisible):**
- 8 handles: N, NE, E, SE, S, SW, W, NW
- 8×8px corners, 6px edges
- Cursor: nwse-resize / nesw-resize / ew-resize / ns-resize

### Taskbar & Dock

```
MENU BAR (top, 28px)
╔═══════════════════════════════════════════════════════════════╗
║  ◉ paseka.dev          🎵 Music    🔋 100%   11:16:42 PM   ║
╚═══════════════════════════════════════════════════════════════╝
```
- Fixed top-0, full width, z-index 800
- Left: ◉ logo (14px) + "paseka.dev" text
- Right: Music toggle, battery (decorative), clock
- Glass background, lilac gradient bottom border
- Clock: HH:MM:SS, tabular-nums, monospace
- Double-click clock → Clock app in calendar view
- Click clock area → Spotlight search

```
DOCK (bottom, 70px)
    [About] [Projects] [Contact] [Terminal] [Music] [Calc] [Files] [Clock]
                              ● · · ·      ↑glowing dot = active window
```
- Fixed bottom-0, centered, z-index 700
- Shape: pill (glass background)
- Icons: 52×52px, 12px border-radius

**Dock Magnification:**
- Hover: icon at cursor position scales to 1.5× (78px)
- Adjacent icons: 1.2× (62px), 1.1× (58px)
- Uses CSS transform + transform-origin based on icon position
- Smooth 150ms transition

**Dock Interactions:**
- Open window → glowing dot below icon
- Hover → bounce animation
- Click → ripple effect
- Minimized window: icon dimmed/pulsing
- Tooltip on hover showing app name

### Start Menu

- Triggered by clicking "paseka.dev" logo in menubar
- Position: slides up from bottom-left (below menubar)
- Glass card with sections:
  - **Apps:** About, Projects, Contact, Terminal, Calculator, Files, Clock
  - **Quick Actions:** Toggle Music, Toggle Rain, Refresh Wallpaper, Settings
- Each item shows keyboard shortcut (e.g., ⌘K for search)
- Search filter at top
- Backdrop click or ESC to close

---

## 4. 📱 APPLICATION SUITE

### About App
- Profile photo with glow that intensifies on hover
- Name, role ("Builder · Gamer · Crustafarian")
- "Available for work" status with pulsing green dot
- Bio text (2-3 sentences)
- Education: B.S. Computer Science — CUNY Brooklyn College
- Links: GitHub, Email
- Tech skills displayed as icon grid

### Projects App
- Grid of project cards (3-4 columns responsive)
- Card: thumbnail, name, short desc, tags
- Hover: lift + glow + image brightens + shows "Visit →" and "GitHub →"
- Click: detail view (larger image, full description, links)
- Filter by tag (18+, gaming, crypto, tools)
- Staggered entrance animation (50ms delay per card)
- Tags use colored chips (18+ → pink, gaming → blue, etc.)

### Contact App
- Clean list: GitHub, Email, Website
- Hover: slide right + purple highlight
- Each item: icon + label + arrow
- Subtle background pattern

### Terminal App ✨ (Star Feature)
**Current commands:** help, clear, date, whoami, echo, neofetch, calc, roll, 8ball, coinflip, joke, guess, rps, poker

**Add these commands:**
```
// Fun
matrix        → green Matrix rain effect (3 seconds)
hack          → fake "ACCESSING MAINFRAME" animation → "JUST KIDDING"
rickroll      → ASCII Rick Astley + YouTube link
sudo [any]    → "Permission denied. Nice try. 🦀"
cd /          → "Nice try. This isn't a real filesystem."

// Utility
ls            → list "files" (fake FS)
cat config    → show fake system config
weather [zip] → inline weather
open [app]    → open window (open projects, open about)
clear         → clear screen

// Secrets
konami        → triggers Konami code easter egg globally
slap          → "Stop slapping the terminal."

// Shortcuts
projects      → opens Projects window
about         → opens About window
contact       → opens Contact window
```

**Terminal UX:**
- Arrow ↑/↓ for command history (last 50)
- Tab completion for known commands
- Blinking cursor animation
- Typing sound effect (optional, toggleable in Settings)
- Auto-scroll to bottom on output
- Copy/paste support
- Selectable text
- Retro green-on-black OR cyberpunk purple (configurable)

### Calculator App 🆕
- Floating window (doesn't maximize)
- Basic ops: +, −, ×, ÷, C, ⌫, +/−, %, =
- Keyboard support (type numbers/operators directly)
- Button hover: lift + glow
- Button click: press down effect (scale 0.95)
- Operator button highlights when active
- Display: current input + last result
- Max digits: 12

### Settings App 🆕
```
┌─ System ─────────────────┐
│ [✓] Music autoplay on load
│ [✓] Cursor particles
│ [ ] Rain mode default
│ [ ] 24-hour time
└─────────────────────────┘

┌─ Appearance ────────────┐
│ [●] Dark mode  ( ) Light
│ Accent: [●Purple][○Blue][○Pink]
└────────────────────────┘

┌─ About ────────────────┐
│ paseka.dev OS v1.0
│ Built with React + Vite
│ © 2024-2026 Alex Paseka
└────────────────────────┘
```
- Persisted to localStorage
- Applied on load

### Files App 🆕
```
📁 Home
├── 📁 Projects
│   ├── 📄 Bob Pants.url
│   ├── 📄 GoonClicker.url
│   └── 📄 Bulk-OS.url
├── 📁 Downloads
│   └── 📄 resume.pdf
├── 📁 Documents
│   ├── 📄 about.txt
│   └── 📄 contact.txt
└── 📁 Images
    └── 📄 avatar.jpg
```
- Click folder → navigate (breadcrumb updates)
- Click file → open URL in new tab / show .txt content
- Back button, breadcrumb trail
- Folder icons open, file icons show type

### Music App 🆕
```
┌──────────────────────────────────────┐
│ 🎵 Music Player              [─][×] │
├──────────────────────────────────────┤
│        ┌─────────────────┐          │
│        │   [Visualizer]   │          │
│        │    Canvas bars   │          │
│        └─────────────────┘          │
│                                       │
│        🎷 Sax Jazz                    │
│                                       │
│  ──────────●─────────────  2:34/3:45  │
│                                       │
│      ⏮️    ▶️    ⏭️     🔊 ━━━━●━━   │
│                                       │
│  [🎷 Sax Jazz] [🎹 Piano] [🌧️ Rain]  │
└──────────────────────────────────────┘
```
- Web Audio API AnalyserNode → frequency data
- Canvas bar visualizer (purple gradient)
- Play/pause/next controls
- Volume slider
- Crossfade 500ms between tracks
- Track select buttons

### Clock App 🆕
- Tabs: World Clock | Alarm | Timer
- World Clock: large time + date, analog option
- Double-click taskbar clock → opens Clock app in **calendar view**
- Calendar: month grid, today highlighted, arrow keys navigate, click date → toast
- Alarm: set time + name, shows toast at trigger time
- Timer: countdown with toast when complete

### Notes App 🆕
- Dock icon → creates new floating note
- Each note: draggable mini-window, editable textarea
- Color selector: yellow | purple | blue | green
- Close → confirm delete
- Persist to localStorage
- Max 10 notes (warning at limit)
- Note window: 200×180px default, resizable

---

## 5. 🔍 SPOTLIGHT SEARCH (Ctrl+K / ⌘K)

**Trigger:** Ctrl+K / ⌘K global shortcut OR click menubar clock area

**Visual:**
- Centered modal, 500px wide
- Backdrop blur + dark overlay
- Large input at top, auto-focused
- Results appear below as you type

**Search targets:**
```
Apps:     About, Projects, Contact, Terminal, Music, Calculator, Files, Settings, Clock, Notes
Projects:  Bob Pants, GoonClicker, Bulk-OS, Bulk Bros, etc.
Actions:  Toggle Music, Toggle Rain, Refresh Wallpaper, Toggle Theme
Quick:    "weather [zip]" shows weather directly
```

**Keyboard:**
- ↑/↓ navigate results
- Enter opens selected
- Escape closes
- Tab for autocomplete

**Animation:**
- Open: fade in + scale from 0.95→1.0 (200ms)
- Close: fade out + scale to 0.95 (150ms)

---

## 6. 🎬 BOOT SEQUENCE (First Load Only)

**Trigger:** Once per session (sessionStorage `hasBooted` flag)

```
TIMING:
0.0s — Screen black
0.3s — ASCII logo fades in (◉, purple glow)
0.8s — "paseka.dev OS v1.0" text
1.2s — Progress bar (Loading modules...)
1.8s — Progress bar completes
2.0s — Screen flash white briefly
2.2s — Fade into desktop
Press any key / click → skip
```

**ASCII Logo:**
```
    ╔═══════════════════════════╗
    ║     ◉  paseka.dev         ║
    ╚═══════════════════════════╝
```

---

## 7. 🎮 EASTER EGGS & DISCOVERIES

### 1. Konami Code (↑↑↓↓←→←→BA)
**Trigger:** Press sequence on keyboard
**Effect:**
- Screen flash
- Confetti explosion (colorful canvas particles)
- "DEV MODE ACTIVATED" text overlay (fades after 2s)
- Debug overlay slides in showing:
  - FPS: 60
  - Windows: N open
  - Particles: N active
  - Session: Xm Xs
  - Clicks: N
- 10 seconds auto-dismiss, ESC to close early

### 2. Double-Click Desktop
**Trigger:** Double-click empty desktop area
**Effect:** Firework burst at cursor position (spark particles)

### 3. Type "matrix" in Terminal
**Effect:** Green characters rain down screen (3s), then fade

### 4. Type "hack" in Terminal
```
> hack
[■■■■■■■■■■■] ACCESSING MAINFRAME...
[■■■■■■■■■■■] BYPASSING FIREWALL...
[■■■■■■■■■■■] 窃取数据...
[■■■■■■■■■■■] COMPLETE!
> Just kidding. This is a portfolio.
```

### 5. Double-Click Taskbar Clock → Calendar
**Effect:** Opens Clock app in calendar view (month grid)

### 6. Click Avatar 10× Fast
**Trigger:** 10 clicks in 800ms → "Crazy Mode" (5s)
- Avatar spins + rainbow pulse
- Screen gets subtle shake
- Toast: "Seriously, stop clicking the avatar"

### 7. Type "sudo rm -rf /" in Terminal
```
> sudo rm -rf /
Nice try. This isn't a real filesystem.
But I appreciate the enthusiasm. 🦀
```

### 8. Type "rickroll" in Terminal
```
🎵 Never Gonna Give You Up 🎵
   ╔═══════════════════════════════════════╗
   ║   You just got RICKROLLED!             ║
   ║   https://youtu.be/dQw4w9WgXcQ         ║
   ╚═══════════════════════════════════════╝
```

### 9. Idle Animation (5+ seconds no mouse)
- Name slowly pulses/floats
- Dock icons have subtle breathing glow
- Background shifts slightly
- Avatar ring rotates faster momentarily

### 10. Hidden: Click Logo 5×
**Effect:** Logo color cycles through palette (lilac → blue → pink → green)

### 11. Type "joke" 5× in Terminal
**Effect:** 5th joke is a very long pause then "Knock knock. Who's there? ... You're the joke for typing 'joke' 5 times."

---

## 8. ⚡ PERFORMANCE & TECH

### What Makes It Fast

```
60fps MANDATORY
• Use CSS transforms (translate, scale, rotate) — GPU-accelerated
• Use opacity for fades — composited layer
• will-change: transform on dragged elements (remove after)
• Avoid animating top/left/bottom/right

PARTICLE SYSTEM
• Canvas-based (not DOM elements)
• requestAnimationFrame loop
• Cap at 150 particles
• Object pooling (reuse particle objects)

REACT PERFORMANCE
• Memoize window components (React.memo)
• useCallback for event handlers passed as props
• Avoid re-renders: separate state for particles/window positions
• Virtualize long lists (projects grid) if > 20 items

ANIMATION PERFORMANCE
• transforms + opacity only — never animate width/height/top/left
• Debounce window position saves (100ms)
• Use CSS transitions where possible, JS only for complex physics
```

### Lazy Loading Strategy

```
• Images: loading="lazy" on all project thumbnails
• Audio: load on first play, not on mount
• Window content: render only when open (conditional)
• Boot sequence: critical CSS inline, rest async
```

### Accessibility

```
• All interactive elements keyboard-accessible
• Focus visible outlines (custom styled, not browser default)
• ARIA labels on icon-only buttons
• Reduced motion: respects prefers-reduced-motion
  → Disable: parallax, floating animation, cursor particles
  → Keep: window open/close (simplified)
