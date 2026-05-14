# 🔮 ALEX PASEKA — Browser OS Upgrade Plan

> **Vision:** Transform `arcade` into the most impressive, immersive browser OS experience ever built. Every interaction should feel like touching a real OS — with cyberpunk soul, silky animations, and moments of genuine delight.

---

## PRIORITY 1 — Must-Have (Impress Immediately)

These features transform the experience from "portfolio website" to "real OS feel" within 1-2 days of work.

### 1.1 Window Management — Drag + Resize + Z-Index

- **Drag windows** by their header bar anywhere on screen
- **Resize handles** on all 4 edges + corners (8-directional)
- **Click-to-focus** raises window z-index above others
- Window state: `position: fixed` already in use — just track `{x, y, width, height}` per window
- CSS: smooth `transition` on position/size changes, `will-change: transform` for GPU acceleration

### 1.2 Desktop Right-Click Context Menu

- Intercept `onContextMenu` on desktop
- Show a styled menu with options: About, Projects, Contact, Settings, Refresh Wallpaper
- Menu appears at cursor position, dismisses on outside click
- Style: glassmorphism card matching OS aesthetic

### 1.3 Dock Magnification + Active Indicator Glow

- On hover: dock icons scale up dramatically (`scale(1.8)` at center, fall off toward edges)
- Use CSS `transform: scale()` with `transform-origin` based on icon position
- Active window = indicator dot glows solid + icon gets permanent slight glow
- Subtle bounce animation on click

### 1.4 Maximize / Restore Windows

- Add maximize button (□) to window header alongside close (×)
- On click: animate window to fill screen minus taskbar (or snap to top half / bottom half if you want multi-window)
- Double-click header bar to toggle maximize
- Track `isMaximized` state per window

### 1.5 Minimized Windows → Dock Indicator

- Add minimize button (–) to window header
- On minimize: animate window shrinking/fading toward its dock icon, then hide
- Dock icon shows "minimized" state (dimmed or pulsing)
- Click dock icon to restore (animate back from dock position)

### 1.6 Wallpaper Parallax / Mouse-Reactive Background

- Background layers move subtly based on mouse position (`translateX/Y = mouseDelta * factor`)
- 3 layers: base image, glow blobs, grid — each at different parallax speeds (0.02x, 0.05x, 0.08x)
- Adds incredible depth without extra assets

---

## PRIORITY 2 — Should-Have (High Impact)

These make it feel polished and production-quality.

### 2.1 Boot Sequence (First Load Only)

- On very first visit: show a brief "boot" screen
- Elements: ASCII logo, progress bar, "Loading..." text, scan line effect
- Duration: 2-3 seconds
- Store `hasBooted` in `sessionStorage` to only show once per session
- After boot: smooth fade into desktop

### 2.2 Spotlight Search (⌘K / Ctrl+K)

- Global keyboard shortcut opens centered search overlay
- Animated backdrop blur effect
- Search through: app names, project names, contact links
- Keyboard navigable results with Enter to open
- Escape to close

### 2.3 Real Glassmorphism Windows (Backdrop Blur)

- Windows already have `backdrop-filter: blur(60px)` — verify it's working on all elements
- Add inner glow/shine effect on window header (a subtle white gradient line at top of window)
- Window corners: slight inner shadow for depth
- Optional: window drop shadow shifts color based on window type (About=purple, Projects=blue, Contact=green)

### 2.4 Notification / Toast System

- `notify(message, type)` function: shows toast in bottom-right (above dock)
- Types: success (green), error (red), info (purple)
- Auto-dismiss after 3 seconds
- Slide-in animation from right
- Trigger toasts on: music toggle, window open/close, weather fetch success/fail

### 2.5 Settings Window

- New window with toggles:
  - Music autoplay on/off
  - Cursor particles on/off
  - Rain mode on/off
  - (Night mode / accent color — future)
- Persisted to `localStorage`
- Read settings on mount and apply them

### 2.6 Window Snap (Drag to Edges)

- When dragging a window near screen edges, snap it to that half of the screen
- Left edge → left 50%, right edge → right 50%, top edge → full width
- Visual guide (semi-transparent overlay) shows where it will snap before releasing

### 2.7 Fake File System Pretend

- Add a `Files` app to dock that opens a window showing folders
- Folders: `Projects/`, `Downloads/`, `Documents/`
- Folders open as nested windows
- Files inside are links to actual projects/URLs
- Adds real OS authenticity

### 2.8 Menu Bar (Top, Apple-Style)

- Thin bar at very top with: Apple logo (◉), app name, help link
- Right side: music toggle icon, Wi-Fi icon (decorative), battery icon (decorative)
- Makes it look like a real desktop environment
- Position `fixed, top: 0, z-index: 800`

---

## PRIORITY 3 — Nice-to-Have (Cool but Complex)

These are the "wow" features that separate this from everything else.

### 3.1 Terminal Window

- Fake terminal UI with blinking cursor
- Commands: `help`, `ls`, `cat about.txt`, `open projects`, `weather [zip]`, `clear`
- Tab completion, command history (↑/↓ arrows)
- Retro green-on-black or cyberpunk purple text
- Fun Easter egg commands: `sudo rm -rf /` (fake warning), `matrix` (visual effect)

### 3.2 Music Player with Audio Visualizer

- Replace music toggle with a proper `Music` dock app
- Opens a window with album art, track name, progress bar
- Canvas-based audio visualizer (analyze audio via Web Audio API `AnalyserNode`)
- Bars or waveform responding to music frequency data
- Play/pause/next controls

### 3.3 Sticky Notes App

- New dock app: `Notes`
- Creates floating mini-windows you can type in
- Persisted to `localStorage`
- Multiple notes, draggable, resizable
- Color-coded tabs (yellow, purple, blue)

### 3.4 Calculator Widget

- New dock app: `Calc`
- Functional calculator (basic ops +/−×÷, backspace, clear)
- Keyboard input support
- Floats above other windows

### 3.5 Secret Developer Console Easter Egg

- Konami code (↑↑↓↓←→←→BA) triggers "DEV MODE"
- Dev mode: shows FPS counter, enables debug overlay showing all window states, particles count, etc.
- Or: click the avatar 20 times in 3 seconds → developer console slides in

### 3.6 Clock / Alarm App

- New dock app: `Clock`
- Tabs: World Clock (show times in different TZ), Alarm (set alarm with name), Timer
- Uses `Intl.DateTimeFormat` for timezone conversions

### 3.7 Desktop Icons That Are Drag-and-Drop Reorderable

- Currently icons are rendered in order. Make them drag-to-reorder
- Persist order to `localStorage`
- Dragging shows insertion indicator line

### 3.8 Window Open/Close Animations

- **Open:** window scales from 0.8 → 1.0, opacity 0 → 1, with slight overshoot spring
- **Close:** window scales to 0.95, opacity → 0, shrinks toward dock icon
- Use CSS keyframes + JS trigger classes

### 3.9 Spotlight Search as Launcher

- Search can also open folders, trigger toggles (music, rain), show weather for saved zip
- Shows recent files/projects as you type
- "Lucky" feeling when it finds what you want instantly

### 3.10 Autohide Dock

- Dock slides off-screen bottom when mouse is idle (3s)
- Slides back in when mouse approaches bottom edge
- `pointer-events: none` when hidden so it doesn't block anything

---

## Implementation Order Recommendation

```
PHASE 1 (Days 1-2): Foundation
├── Boot sequence (first load only)
├── Window drag + resize + z-index
├── Window maximize/restore/minimize (to dock)
├── Dock magnification on hover
└── Desktop right-click context menu

PHASE 2 (Days 3-4): Polish
├── Wallpaper parallax (mouse-reactive layers)
├── Menu bar (top thin bar)
├── Spotlight search (Ctrl+K / Cmd+K)
├── Toast notification system
├── Settings window + localStorage persistence
└── Window snap to edges

PHASE 3 (Days 5-7): Apps & Depth
├── Files app (fake FS, folders)
├── Terminal window (fun commands)
├── Music player with visualizer
├── Calculator widget
└── Clock/Alarm app

PHASE 4 (Polish & Delight):
├── Sticky Notes
├── Window open/close animations
├── Autohide dock
├── Dev console Easter egg
└── Audio-reactive avatar glow (beat detection)
```

---

## Architecture Notes

### Component Structure Recommendation

```
src/
├── App.jsx                  # Router + boot logic
├── components/
│   ├── Desktop.jsx          # Main desktop (icons, layout)
│   ├── Window.jsx           # Reusable window shell (handles drag/resize/z-index)
│   ├── WindowManager.jsx    # Centralized window state + positioning
│   ├── Dock.jsx             # Dock with magnification
│   ├── Taskbar.jsx          # Bottom taskbar
│   ├── MenuBar.jsx          # Top menu bar
│   ├── Spotlight.jsx        # Search overlay
│   ├── Toast.jsx            # Toast notifications
│   └── ContextMenu.jsx      # Right-click menu
├── apps/
│   ├── AboutApp.jsx
│   ├── ProjectsApp.jsx
│   ├── ContactApp.jsx
│   ├── WeatherApp.jsx
│   ├── SettingsApp.jsx
│   ├── FilesApp.jsx
│   ├── TerminalApp.jsx
│   ├── MusicApp.jsx
│   ├── CalculatorApp.jsx
│   ├── ClockApp.jsx
│   └── NotesApp.jsx
├── hooks/
│   ├── useWindowManager.js  # All window CRUD + positioning
│   ├── useSettings.js       # localStorage settings
│   ├── useNotifications.js  # Toast queue
│   └── useAudioAnalyzer.js  # Web Audio API → visualizer data
├── utils/
│   ├── commands.js          # Terminal command definitions
│   └── constants.js
└── data/
    └── filesystem.js        # Fake FS tree for Files app
```

### Key Implementation Details

- **WindowManager**: Single source of truth for all window states (`{x, y, width, height, minimized, maximized, zIndex}`)
- **CSS Variables**: Centralize all theming in CSS vars for easy tweaking
- **Animation**: Use CSS transitions for simple things, JS `requestAnimationFrame` for complex (particles, audio visualizer)
- **Performance**: Use `will-change: transform` sparingly, prefer `transform` and `opacity` over `top/left` for animations
- **Mobile**: Disable drag/resize on touch devices, keep tap-to-open behavior

---

## Wildcard Ideas (If You Want to Go Insane)

- **Window tab bar** — multiple "tabs" inside one window (like a browser)
- **Pinned windows** — "always on top" toggle
- **Virtual desktop switching** — swipe or use shortcuts to switch between 2-3 "workspaces" with different arrangements
- **Click-to-screenshot** — fake screenshot that saves to Downloads folder
- **MRing/AR** — use webcam as a weird background effect layer
- **Shared state** — two browser tabs open = windows can be dragged between tabs (lol)
- **Window "stacking"** — hold Shift + click to bring up a window picker overlay (like macOS)

---

*Plan authored by vyv ⚡ — Let's build this.*