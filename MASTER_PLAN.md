# paseka.dev - MASTER UPGRADE PLAN

## The Problem
Current site is mid. It has features but they don't feel cohesive, impressive, or memorable. It's a website pretending to be an OS, not a real experience.

## The Goal
Make visitors say "holy shit this is cool" - not "eh nice portfolio."

## Research: What Makes Browser OS Experiences Impressive

### 1. Past.io / Ethereal OS / Desktop.ai
- Window management that ACTUALLY works
- Dragging feels physical (momentum, shadow depth changes)
- Real clock, real date - feels alive
- Spotlight/search that works
- Multiple virtual desktops

### 2. What Linear/Raycast Do Right
- Every interaction is SMOOTH (60fps no questions)
- Keyboard shortcuts EVERYWHERE
- Commands palette / search feels instant
- Animations have WEIGHT (ease-out, not linear)

### 3. What Makes People Remember Sites
- SURPRISING interactions they didn't expect
- Details that show someone CARED
- Stuff they want to show their friends
- "Wait, you can DO that?!"

## Design Philosophy for paseka.dev

### Personality Direction
Alex is into: gaming, crypto, building things, memes, projects

This should feel like:
- A POWER USER's machine
- Someone who BUILDS things
- Gaming vibes, not corporate vibes
- The kind of desktop that has secrets

### Color Palette - Current is OK but could be STRONGER
Current: Dark purple/lilac
Keep but make it MORE PURPOSEFUL:
- Background: Deep void black (#05050a) - like staring into space
- Primary: Electric lilac (#b87aff) - not generic purple, more neon-adjacent
- Accent: Hot pink (#ff2d95) - for important things
- Secondary: Ice blue (#7dd3fc) - for contrast moments
- Glass: rgba(15, 15, 25, 0.8) - for panels

### Typography
- Title: JetBrains Mono or Orbitron (already have Orbitron - KEEP but maybe use it more aggressively)
- Body: Inter or Geist Sans
- Mono: JetBrains Mono for any "code" feel

## Priority 1: MUST FIX (feels broken right now)

### 1.1 Window System Rewrite
Windows should feel PHYSICAL:
- Drag: Window follows cursor with slight LAG (2-3 frames) - feels like weight
- Drop shadow INCREASES when dragging (depth)
- Window "pops" slightly when dropped
- Double-click header: maximize with ANIMATION, not snap
- Resize handles on corners/edges (cursor changes)
- Windows STACK properly (shadows show depth)

### 1.2 Dock Overhaul  
Current dock is sad. Make it like macOS dock:
- Icons MAGNIFY on hover (parallax effect as you move mouse over)
- Bounce animation when app opens
- Active apps have a glowing DOT below
- If window minimized, icon in dock has indicator
- Hover shows app name tooltip

### 1.3 Taskbar Polish
- Click on time: maybe show date prominently for 2 seconds
- Music toggle should show what's playing
- Rain toggle should show droplet icon animation when active
- Maybe: battery indicator (fake but looks cool)

## Priority 2: IMPRESSIVE Features

### 2.1 Spotlight Search (⌘K / Ctrl+K)
- Opens a centered search bar (like macOS Spotlight)
- Type to filter: About, Projects, Contact, Settings, Weather
- Or type project names to filter
- ESC or click outside to close
- Should feel INSTANT and SMOOTH

### 2.2 Multiple Virtual Desktops (this is the killer feature)
- Small indicator dots on right side showing # of desktops
- Drag windows to right edge to create NEW desktop
- Drag to left to go to previous desktop
- Switch with three-finger swipe or click dots
- Each desktop has different wallpaper tint or same with offset

### 2.3 Command Bar / Action Menu
- Right-click context menu is good start but needs more
- Menu items should have keyboard shortcuts shown
- "About" shows system info that looks cool
- "Change Wallpaper" cycles with FLIP animation

### 2.4 Wallpaper That Moves
- Current parallax is barely noticeable
- Make it RESPOND to mouse position more aggressively
- Maybe 3-4 layers moving at different speeds
- The furthest layer barely moves, closest layer moves a LOT

## Priority 3: DELIGHT Features (the secrets)

### 3.1 The Clock Secret
- Double-click the clock in taskbar
- Shows full calendar view for current month
- Arrow keys navigate months
- Click date to see what DAY of the week it is

### 3.2 Easter Eggs That Actually Work
Previous easter eggs were half-baked. Make them REAL:

**Konami Code (↑↑↓↓←→←→BA)**
- Confetti EXPLOSION - not just particles
- Sound effect (optional)
- Background flashes
- Takes 3 seconds to fully animate

**Type "matrix"**
- Green characters rain down the screen briefly
- Then fades

**Type "hack"**
- Terminal window opens automatically
- Shows fake "hacking" animation with text scrolling
- Says something funny like "ACCESSING THE MATRIX" then "JUST KIDDING"

**Double-click desktop**
- Firework/spark burst at click point
- Satisfying pop

### 3.3 Weather Widget - Make it Actually Useful
- Auto-detect location (ask permission)
- If no zip entered, use auto-detected location
- Show 3-day forecast (expandable)
- Temperature in big numbers
- Condition icon (sunny, cloud, rain)
- Maybe: small animated weather icon

### 3.4 Projects Window - Make it GORGEOUS
- Current project cards are basic
- Hover should show MORE info
- Maybe a LIVE preview of the project thumbnails
- Each card should have nice shadows and borders
- Filter by tag (18+, gaming, crypto, etc)

## Priority 4: Polish (the 1% details)

### 4.1 Cursor Trail - Make it SEXY
Current trail is boring. Make it:
- Particles have more VARIETY (different sizes, speeds)
- Some particles leave SHORTER trails, some leave LONGER
- Color should vary slightly (not all same purple)
- Maybe occasional WHITE particle mixed in
- When RAIN is on, trail has WATER droplet effect

### 4.2 Sound Design
This is controversial but:
- Optional subtle click sounds on buttons
- Window open/close sounds
- Not annoying, just... satisfying
- Mute option obviously

### 4.3 Loading/Boot Sequence
When site first loads:
- Brief "boot" animation (0.5 seconds max)
- "Loading paseka.dev..." text
- Or just: fade in from black
- NOT a progress bar unless it takes >2 seconds

### 4.4 Idle Animations
When user is NOT interacting (5+ seconds):
- Name slowly pulses/floats
- Background subtly shifts
- Dock icons have subtle breathing glow
- Rain falls on its own when enabled

## Priority 5: Technical Improvements

### 5.1 Performance
- Everything should be 60fps
- Use CSS transforms, not top/left for animations
- Use requestAnimationFrame properly
- Minimize re-renders in React

### 5.2 State Management
- Too much state is local/disorganized
- Consider a simple context or just cleaner state structure
- Window positions should persist in localStorage
- Remember which desktop was active

### 5.3 Mobile Responsiveness
- On mobile, maybe just show simplified version
- Or: full OS on tablet, basic on phone
- Not critical but would be impressive

## What NOT To Do

1. **Don't add too much** - this is a portfolio, not an actual OS
2. **Don't break what works** - ship incremental, test each thing
3. **Don't make it SLOW** - performance is features
4. **Don't copy macOS exactly** - make it YOUR thing
5. **Don't add features nobody asked for** - ask first

## Implementation Order

### Week 1: Foundation
1. Fix window dragging (make it feel physical)
2. Dock magnification
3. Better spotlight search (Ctrl+K)

### Week 2: Polish
4. Wallpaper parallax (make it actually move)
5. Better window animations
6. Command menu improvements

### Week 3: Delight
7. Better easter eggs
8. Better weather widget
9. Idle animations

### Week 4: Details
10. Sound effects (optional)
11. Mobile polish
12. Boot sequence

## The Secret Sauce

The thing that will make this site MEMORABLE:

**IT SHOULD FEEL LIKE A POWER USER'S MACHINE**

Not a corporate demo. Not a tech showcase. A REAL machine that someone built for THEMSELVES.

- Secrets everywhere
- Keyboard shortcuts
- Things you discover by accident
- The kind of desktop you WANT to show people

---

*Last updated: 2026-05-13*
