# paseka.dev — Browser OS Specification

> **The vision:** A browser-based operating system experience that's so polished, so alive, so full of secrets that visitors can't stop clicking. Every interaction should feel physical. Every detail should reward curiosity.

---

## 🎯 PHILOSOPHY & PERSONALITY

### The Vibe
This is a **power user's machine** — someone who builds things, plays games, and keeps secrets. It should feel like walking into Alex's actual digital space, not a corporate portfolio.

### Design Direction: "Cyberpunk Terminal"
- Deep space darkness with electric purple accents
- Monospace typography where it counts (windows, terminal)
- Neon glow effects that feel alive, not decorative
- Subtle scanlines and CRT vibes without being gimmicky
- Glassmorphism with actual blur and depth

### Color Palette
```
Background:     #0a0a12 (deep void)
Glass panels:   rgba(15, 15, 25, 0.88)
Primary:        #b87aff (electric lilac)
Accent:         #ff2d95 (hot pink)
Secondary:      #7dd3fc (ice blue)
Text primary:   #ffffff
Text muted:     rgba(255, 255, 255, 0.5)
Success:        #00ff88 (neon green)
Error:          #ff6b6b (soft red)
```

### Typography
- **Titles/Logo:** Orbitron (bold, techy feel)
- **Body/UI:** Inter (clean, readable)
- **Terminal/Code:** JetBrains Mono (developer aesthetic)
- **Decorative:** VT323 (retro accents)

---

## 🏗️ ARCHITECTURE

### Current State
Single monolithic `Intro.jsx` (~800 lines) handling everything. This works for now but the spec below describes where we're heading.

### Target Architecture (Phase 4+)
```
src/
├── components/
│   ├── Desktop.jsx           # Main layout, background layers
│   ├── Dock.jsx              # Magnification dock
│   ├── Taskbar.jsx           # Bottom bar
│   ├── MenuBar.jsx           # Top thin bar
│   ├── Window.jsx            # Reusable window shell
│   ├── WindowManager.jsx     # Centralized window state
│   ├── Spotlight.jsx         # Search overlay (Ctrl+K)
│   ├── ContextMenu.jsx       # Right-click menu
│   ├── Toast.jsx             # Notification toasts
│   └── ParticleCanvas.jsx    # Cursor trail canvas
├── apps/
│   ├── AboutApp.jsx
│   ├── ProjectsApp.jsx
│   ├── ContactApp.jsx
│   ├── TerminalApp.jsx
│   ├── MusicApp.jsx
│   ├── CalculatorApp.jsx    # NEW
│   ├── SettingsApp.jsx       # NEW
│   ├── FilesApp.jsx          # NEW
│   ├── ClockApp.jsx          # NEW (calendar easter egg)
│   └── NotesApp.jsx          # NEW
├── hooks/
│   ├── useWindowManager.js
│   ├── useSettings.js
│   ├── useParticles.js
│   └── useAudioAnalyzer.js
└── utils/
    ├── commands.js           # Terminal commands
    └── constants.js
```

### State Management
- **Window state:** Centralized in context, persisted to localStorage
- **Settings:** localStorage (music autoplay, particle toggle, rain default)
- **Window positions:** localStorage, restored on load
- **Session data:** sessionStorage (boot animation, first visit flag)

---

## 🪟 WINDOW SYSTEM — The Core

### Window Anatomy
```
┌─────────────────────────────────────────────────────┐
│ ● ● ●   [ Window Title                ]   [─][□][×] │  ← Header (draggable)
├─────────────────────────────────────────────────────┤
│                                                       │
│                   CONTENT AREA                        │
│                                                       │
│                                                       │
└─────────────────────────────────────────────────────┘
                              └── Resize handles on all edges + corners
```

### Window States
- **Normal:** User-positioned, resizable
- **Maximized:** Fills screen minus taskbar/menubar
- **Minimized:** Hidden, represented in dock
- **Focused:** Highest z-index, subtle border glow

### Window Behaviors

**Dragging:**
- Grab window header → window follows cursor with slight LAG (2-3 frames)
- Visual feedback: shadow deepens, slight scale up (1.02)
- Drop: window "settles" with micro-bounce

**Resizing:**
- 8-directional resize handles (N, NE, E, SE, S, SW, W, NW)
- Cursor changes on hover (nwse-resize, nesw-resize, etc.)
- Minimum size: 300x200px

**Z-Index Management:**
- Track `highestZIndex` ref, increment on focus
- Click anywhere on window → bring to front
- Active window has subtle glowing border

**Window Controls:**
- **Close (×):** Animate shrink toward dock, then hide
- **Minimize (–):** Animate toward dock icon position, hide, dock shows indicator
- **Maximize (□):** Animate to full screen, icon changes to restore (❐)
- Double-click header → toggle maximize

### Window Positions — Persistence
```javascript
// Save to localStorage on every position change
{
  "about": { "x": 150, "y": 100, "width": 560, "height": 400 },
  "terminal": { "x": 300, "y": 200, "width": 700, "height": 560 },
  ...
}
```

---

## 🖥️ MENU BAR (Top)

Thin bar at very top, fixed position.

```
◉ paseka.dev              Music ♪        🔋 100%    [clock]
```

- **Left:** Logo (◉) + site name
- **Right:** Music toggle icon, battery icon (decorative), clock
- Height: 28px
- Background: semi-transparent with blur
- Border-bottom: subtle purple gradient line

---

## 📌 DOCK — macOS-Style Magnification

### Visual Design
- Centered at bottom, above taskbar
- Glass background with blur
- Rounded rectangle (pill shape)
- Icons: 52x52px with 12px border-radius

### Magnification Effect
When cursor hovers over dock:
- Icon at cursor position scales to `1.8x`
- Icons further away scale less: `1.6x`, `1.4x`, `1.2x`, `1.0x`
- Uses `transform-origin` based on icon position for proper scaling direction
- Smooth transition (150ms)

### Active State
- Open window → indicator dot below icon (glowing purple)
- Hover → bounce animation
- Click → ripple effect

### Dock Items
```
[About] [Projects] [Contact] [Terminal] [Music] [Calculator] [Files] [Clock]
```

---

## 🔍 SPOTLIGHT SEARCH (Ctrl+K / ⌘K)

### Trigger
- Global keyboard shortcut: `Ctrl+K` (Windows) / `⌘K` (Mac)
- Click on menubar clock area

### Visual Design
- Centered modal, 500px wide
- Backdrop blur + dark overlay
- Large input field at top
- Results appear below as you type

### Search Targets
```
Apps:        About, Projects, Contact, Terminal, Music, Calculator, Files, Settings
Projects:    Bob Pants, GoonClicker, Bulk-OS, Bulk Bros, etc.
Actions:     Toggle Music, Toggle Rain, Toggle Theme, Refresh Wallpaper
Quick:       "weather [zip]" shows weather directly
```

### Keyboard Navigation
- ↑/↓ arrows to navigate results
- Enter to open selected
- Escape to close
- Tab for autocomplete

### Animation
- Open: fade in + scale from 0.95 → 1.0 (200ms)
- Close: fade out + scale to 0.95 (150ms)

---

## 🎛️ TASKBAR (Bottom)

### Layout
```
[☰ Menu] | [🎵] [🌤️] [🌧️] [☀️] | Session: 5m 32s | May 14, 2026 | 11:16:42 PM
```

### Components
- **Start Menu button:** Opens start menu
- **Music:** Toggle play/pause, double-click to mute
- **Weather:** Shows current temp + condition, click for popup with zip input
- **Rain:** Toggle rain overlay + sound
- **Theme:** Toggle light/dark mode
- **Session timer:** How long on site (resets on load)
- **Date:** Current date
- **Clock:** HH:MM:SS with tabular nums (monospace for stability)

### Clock Double-Click Easter Egg
- Double-click clock → opens Clock app with calendar view
- Calendar shows current month, arrow keys navigate months
- Current day highlighted, click shows day of week name

---

## 🎬 BOOT SEQUENCE

### First Load Only
- Show once per session (sessionStorage `hasBooted` flag)

### Animation Sequence (2.5 seconds total)
```
0.0s - Screen black
0.3s - ASCII logo fades in (◉ symbol, purple glow)
0.8s - "paseka.dev OS v1.0" text
1.2s - Progress bar starts (Loading modules...)
1.8s - Progress bar completes
2.0s - Screen flash white briefly
2.2s - Fade into desktop
```

### ASCII Logo
```
    ╔═══════════════════════════╗
    ║     ◉  paseka.dev         ║
    ╚═══════════════════════════╝
```

### Skip Option
- Press any key or click to skip animation

---

## 📱 APPLICATIONS

### About App
- Profile photo, name, role
- "Available for work" status with pulsing green dot
- Bio text
- Education (B.S. Computer Science — CUNY Brooklyn College)
- Links: GitHub, Email
- **Polish:** Hover on photo → subtle glow intensifies

### Projects App
- Grid of project cards (3-4 columns)
- Card hover: lift + glow + image brightens
- Click card → detail view (larger image, full description, links)
- Filter by tag when projects have many
- **Polish:** Cards have staggered entrance animation

### Contact App
- Clean list of contact methods
- GitHub, Email, Website
- Hover → slide right + purple highlight

### Terminal App ✨ (Already implemented, upgrade it)
**Current commands:**
- `help` — Show all commands
- `clear` — Clear terminal
- `date` — Show date
- `whoami` — "guest"
- `echo` — Echo text
- `neofetch` — ASCII art + system info
- `calc` — Math expression
- `roll` — Dice roller (2d6)
- `8ball` — Magic 8-ball
- `coinflip` — Flip coin
- `joke` — Random joke
- `guess` — Number guessing game
- `rps` — Rock paper scissors
- `poker` — Dice poker

**Add these commands:**
```javascript
// Fun commands
matrix        → Green character rain effect (3 seconds)
hack          → Fake "ACCESSING THE MATRIX" animation, then "JUST KIDDING"
rickroll      → ASCII Rick Astley + "Never Gonna Give You Up" link
sudo          → "Permission denied. Nice try." with funny message
cd /          → "Nice try. This isn't a real filesystem."

// Utility commands
ls            → List "files" (fake FS)
cat config    → Show fake system config
weather [zip] → Inline weather (no need to open widget)
open [app]    → Open a window (open projects, open about)
clear         → Clear screen

// Secrets
konami        → Triggers konami code easter egg globally
slap          → Terminal tells you to stop slapping the terminal

// Projects shortcut
projects      → Opens Projects window
about         → Opens About window
contact       → Opens Contact window
```

**Terminal UX Improvements:**
- Command history with ↑/↓ arrows (persist last 50 commands)
- Tab completion for known commands
- Cursor blink animation
- Typing sound effect (optional, toggleable)
- Auto-scroll to bottom on new output
- Copy/paste support

---

### Calculator App 🆕

**Design:** Floating window, doesn't maximize. Compact.

**Features:**
- Basic ops: +, −, ×, ÷
- Clear (C), Backspace (⌫)
- Decimal point
- Plus/minus toggle
- Percentage
- Display shows current input + last result
- Keyboard support (type numbers and operators directly)

**Visual:**
```
┌──────────────────────────────┐
│ Calculator           [─][×] │
├──────────────────────────────┤
│                      123.45 │  ← Big number display
├──────────────────────────────┤
│  C   ⌫   %   ÷              │
│  7   8   9   ×              │
│  4   5   6   −              │
│  1   2   3   +              │
│  ±   0   .   =              │
└──────────────────────────────┘
```

**Button interactions:**
- Hover: lift + glow
- Click: press down effect + subtle sound
- Operator highlights when active

---

### Settings App 🆕

**Design:** Window with grouped sections

**Options:**
```
┌─ System ─────────────────┐
│ [✓] Music autoplay on load
│ [✓] Cursor particle trail
│ [ ] Rain mode on by default
│ [ ] 24-hour time format
└─────────────────────────┘

┌─ Appearance ────────────┐
│ [●] Dark mode   ( ) Light mode
│ Accent color: [Purple ●][Blue ○][Pink ○]
└────────────────────────┘

┌─ About ────────────────┐
│ paseka.dev OS v1.0
│ Built with React + Vite
│ © 2024 Alex Paseka
└────────────────────────┘
```

**Persist:** Save to localStorage, apply on load

---

### Files App 🆕

**Design:** Fake file system explorer

**Structure:**
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

**Behavior:**
- Click folder → navigate into it (breadcrumb updates)
- Click file → open in new tab (for URLs) or show content (for .txt)
- Back button to go up
- Breadcrumb trail: Home > Projects

---

### Music App 🆕

**Design:** Dedicated music player window

**Current state:** Simple taskbar popup
**Upgrade to:** Full window with visualizer

```
┌──────────────────────────────────────────────────┐
│ 🎵 Music Player                      [─][□][×]   │
├──────────────────────────────────────────────────┤
│                                                  │
│              ┌─────────────────┐                 │
│              │     🎹         │                 │  ← Album art / visualizer
│              │   [playing]    │                 │
│              └─────────────────┘                 │
│                                                  │
│             🎷 Sax Jazz                          │  ← Track name
│                                                  │
│  ───────────●────────────────────  2:34 / 3:45   │  ← Progress bar
│                                                  │
│        ⏮️      ▶️      ⏭️        🔊 ━━━━━●━━━   │  ← Controls + volume
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ 🎷 Sax  │  │ 🎹 Piano│  │ 🌧️ Rain │          │  ← Track select
│  └─────────┘  └─────────┘  └─────────┘          │
└──────────────────────────────────────────────────┘
```

**Audio Visualizer:**
- Canvas-based bar visualizer
- Uses Web Audio API `AnalyserNode` to get frequency data
- Bars respond to bass/mids/treble
- Color: purple gradient matching theme
- Falls back gracefully if audio fails

---

### Clock App 🆕

**Two modes:**

**Mode 1: World Clock** (default)
- Shows current time in large format
- Date below
- Analog clock option (CSS-drawn)

**Mode 2: Calendar** (double-click taskbar clock to open here)
- Month view grid
- Today highlighted
- Arrow keys navigate months
- Click date → shows "Wednesday, May 14, 2026" toast

**Easter egg:** Type `calendar` in terminal → opens this app

---

### Notes App 🆕

**Design:** Floating sticky notes

**Features:**
- Click dock icon → creates new note
- Each note is a draggable mini-window
- Editable textarea
- Color selector: yellow, purple, blue, green
- Close button → confirm delete
- Notes persist to localStorage
- Max 10 notes (show warning at limit)

**Note window:**
```
┌─ 📝 Note 1 ──────── [yellow ●][purple ●][blue ●][green ●][×]─┐
│                                                                  │
│  Type your note here...                                        │
│  This persists!                                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🎮 EASTER EGGS & SECRETS

### 1. Konami Code (↑↑↓↓←→←→BA)
**Trigger:** Press the sequence on keyboard
**Effect:**
- Screen flash
- Confetti explosion (canvas particles, colorful)
- Sound effect (optional)
- Text overlay: "DEV MODE ACTIVATED" (fades after 2s)
- **Real effect:** Shows FPS counter + debug overlay for 10 seconds

### 2. Double-Click Desktop
**Trigger:** Double-click empty desktop area
**Effect:** Firework burst at cursor position (spark particles)

### 3. Type "matrix" in Terminal
**Effect:** Green characters rain down screen for 3 seconds, Matrix-style, then fade

### 4. Type "hack" in Terminal
**Effect:**
```
> hack
[■■■■■■■■■■■] ACCESSING MAINFRAME...
[■■■■■■■■■■■] BYPASSING FIREWALL...
[■■■■■■■■■■■]窃取数据...
[■■■■■■■■■■■] COMPLETE!
> Just kidding. This is a portfolio.
```

### 5. Double-Click Clock → Calendar
**Effect:** Opens Clock app in calendar view (month grid)

### 6. Click Avatar 10 Times (Fast)
**Effect:** 10 clicks in 800ms → Crazy Mode (5 seconds)
- Avatar spins and pulses rainbow
- Screen gets subtle shake effect
- "Seriously, stop clicking the avatar" toast

### 7. Hidden Konami → Dev Console
**Effect after Konami:**
- Overlay slides in showing:
  - FPS: 60
  - Windows: 3 open
  - Particles: 47 active
  - Session: 5m 32s
  - Clicks: 127
- Press ESC or click outside to dismiss

### 8. Type "sudo rm -rf /" in Terminal
**Effect:**
```
> sudo rm -rf /
Nice try. This isn't a real filesystem.
But I appreciate the enthusiasm. 🦀
```

### 9. Type "rickroll" in Terminal
**Effect:**
```
🎵 Never Gonna Give You Up 🎵

   ╔═══════════════════════════════════╗
   ║   You just got RICKROLLED!         ║
   ║   https://youtu.be/dQw4w9WgXcQ     ║
   ╚═══════════════════════════════════╝
```

### 10. Idle Animation (5+ seconds no mouse)
**Effect:**
- Name slowly pulses/floats
- Dock icons have subtle breathing glow
- Background shifts slightly

---

## ✨ POLISH & DETAILS

### Cursor Trail (Upgrade)
Current: Basic particles
**Upgrade to:**
- Variety in particle size (2-6px)
- Color variation (purple, pink, occasional white)
- Trail length varies per particle
- When rain is active: water droplet effect (stretched particles)
- Performance cap: max 150 particles

### Window Open Animation
```
Scale: 0.85 → 1.0
Opacity: 0 → 1
Duration: 250ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1) [spring overshoot]
```

### Window Close Animation
```
Scale: 1.0 → 0.85
Opacity: 1 → 0
Duration: 200ms
Easing: ease-out
Movement: Shrinks toward dock icon
```

### Window Minimize Animation
- Window scales down while moving toward dock icon position
- Duration: 300ms
- Dock icon bounces when complete

### Wallpaper Parallax (Mouse-Reactive)
- Layer 1 (base image): moves at 0.02x mouse delta
- Layer 2 (glow blobs): moves at 0.05x mouse delta
- Layer 3 (grid/vignette): moves at 0.08x mouse delta
- Smooth interpolation, never jarring

### Sound Design (Optional)
Toggle in Settings:
- Window open: soft "pop" (sine wave, 200ms)
- Window close: soft "whoosh" (filtered noise, 150ms)
- Button hover: subtle tick
- Button click: soft click
- Use Web Audio API, no external files needed

### Toast Notifications
**Position:** Bottom-right, above dock
**Types:**
- Success (green): "Music started"
- Error (red): "Weather not found"
- Info (purple): "Window minimized"

**Behavior:**
- Slide in from right (300ms)
- Stay 3 seconds
- Stack if multiple (max 3 visible)
- Click to dismiss

---

## 📱 MOBILE EXPERIENCE

### Current State
- Shows "Please use desktop" message on screens < 768px

### Future: Tablet Support (iPad-level)
- Full OS experience on tablet
- Touch: tap to open, drag windows
- Pinch to zoom (optional, might be complex)
- Dock: bottom center, touch-friendly sizing (60px icons)

### Future: Phone
- Simplified mode: single-window, swipe between apps
- Or: show desktop with tap-to-open, but no drag

---

## 🚀 PHASED ROADMAP

### Phase 1: Foundation (Days 1-2)
- [ ] Window drag + resize + z-index (full implementation)
- [ ] Window maximize/minimize/restore
- [ ] Dock magnification (CSS-only approach)
- [ ] Menu bar (top thin bar)
- [ ] Window state persistence (localStorage)

### Phase 2: Polish (Days 3-4)
- [ ] Spotlight search (Ctrl+K)
- [ ] Toast notification system
- [ ] Window snap to edges (drag to screen edge → snap)
- [ ] Boot sequence (first load only)
- [ ] Wallpaper parallax (mouse-reactive layers)

### Phase 3: Apps (Days 5-6)
- [ ] Calculator app
- [ ] Settings app
- [ ] Files app (fake filesystem)
- [ ] Music app with visualizer
- [ ] Clock app with calendar

### Phase 4: Delight (Days 7-8)
- [ ] Terminal upgrades (more commands, history, tab complete)
- [ ] Notes app
- [ ] Easter eggs (Konami, matrix, etc.)
- [ ] Sound effects (optional)
- [ ] Idle animations

### Phase 5: Mobile (Optional)
- [ ] Tablet layout
- [ ] Touch window dragging
- [ ] Simplified phone mode

---

## 🎯 SUCCESS METRICS

A visitor should:
1. Click something within 5 seconds (discover there's interaction)
2. Open at least 2 windows
3. Discover at least 1 secret/easter egg
4. Say "wait, this is actually cool" by the end

The site is successful if people share it with "bro check this out" not "nice portfolio."

---

## 📁 FILE STRUCTURE (Target)

```
arcade/
├── src/
│   ├── main.jsx
│   ├── Intro.jsx              # Current: split into components
│   ├── Intro.css
│   ├── index.css
│   ├── components/
│   │   ├── Desktop.jsx
│   │   ├── Window.jsx
│   │   ├── WindowManager.jsx
│   │   ├── Dock.jsx
│   │   ├── Taskbar.jsx
│   │   ├── MenuBar.jsx
│   │   ├── Spotlight.jsx
│   │   ├── ContextMenu.jsx
│   │   ├── Toast.jsx
│   │   ├── ParticleCanvas.jsx
│   │   └── BootSequence.jsx
│   ├── apps/
│   │   ├── AboutApp.jsx
│   │   ├── ProjectsApp.jsx
│   │   ├── ContactApp.jsx
│   │   ├── TerminalApp.jsx
│   │   ├── MusicApp.jsx
│   │   ├── CalculatorApp.jsx
│   │   ├── SettingsApp.jsx
│   │   ├── FilesApp.jsx
│   │   ├── ClockApp.jsx
│   │   └── NotesApp.jsx
│   ├── hooks/
│   ├── utils/
│   └── data/
├── public/
│   ├── avi.jpg
│   ├── background.jpg
│   ├── icons/
│   ├── piano-v2.mp3
│   ├── sax-jazz.mp3
│   └── rain-sounds.mp3
├── index.html
├── package.json
├── vite.config.js
└── SPEC.md
```

---

*Last updated: 2026-05-14*
*Authored by vyv ⚡ for paseka.dev*