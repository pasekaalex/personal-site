# CSS PREMIUM SYSTEM - paseka.dev Browser OS

> The definitive CSS craft guide for world-class styling.

---

## 1. CURRENT CSS AUDIT

### What's Already Built
- Color system (purple/black/lilac palette)
- Typography (JetBrains Mono, system fonts)
- Spacing (various, not systematic)
- Animations (window open/close, fade, pulse)
- Effects (shadows, glows, gradients)
- Layout (OS container, desktop, taskbar, windows)

### What's MISSING (Premium Opportunities)
- No CSS custom properties (variables) refactor
- No backdrop-filter usage (frosted glass)
- No container queries
- No :has() selector usage
- No CSS nesting
- Inconsistent border-radius
- No proper shadow scale system
- No glass morphism effects
- Limited animation curves (mostly linear/ease)
- No reduced-motion support
- Custom scrollbars incomplete

---

## 2. COLOR PALETTE (with PURPOSE)

```css
:root {
  /* VOID & SURFACES - Layer system from deepest to highest */
  --void:           #050508;
  --void-soft:       #0a0a12;
  --surface-0:      #0f0f18;
  --surface-1:      #14141f;
  --surface-2:      #1a1a28;
  --surface-3:      #222238;
  
  /* PURPLE SYSTEM */
  --purple-deep:    #2d1b4e;
  --purple-dark:    #4a2c7a;
  --purple:         #9b59b6;
  --purple-bright:  #bb77dd;
  --purple-glow:    #d4a5e8;
  --purple-light:   #e8d4f0;
  
  /* TEXT */
  --text-primary:   #ffffff;
  --text-secondary: #d4c4e8;
  --text-tertiary:  #a89bc4;
  --text-muted:     #6b5f8a;
  
  /* SEMANTIC */
  --accent:         var(--purple);
  --accent-glow:    rgba(155, 89, 182, 0.5);
  --accent-subtle:  rgba(155, 89, 182, 0.15);
  --success:        #4ade80;
  --warning:        #fbbf24;
  --error:          #f87171;
  --info:           #60a5fa;
  
  /* BORDERS */
  --border-subtle:   rgba(155, 89, 182, 0.15);
  --border-default:  rgba(155, 89, 182, 0.25);
  --border-strong:   rgba(155, 89, 182, 0.4);
  --border-glow:     rgba(187, 119, 221, 0.6);
}
```

---

## 3. TYPOGRAPHY SYSTEM

```css
:root {
  --font-display: 'Inter', -apple-system, sans-serif;
  --font-body:    'Inter', -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
  
  /* Type scale (1.25 modular) */
  --text-xs:    0.64rem;
  --text-sm:    0.8rem;
  --text-base:  1rem;
  --text-lg:    1.25rem;
  --text-xl:    1.563rem;
  --text-2xl:   1.953rem;
  --text-3xl:   2.441rem;
  --text-4xl:   3.052rem;
  
  /* Line heights */
  --leading-none:    1;
  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  
  /* Letter spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight:   -0.025em;
  --tracking-normal:  0em;
  --tracking-wide:    0.025em;
  --tracking-wider:   0.05em;
}
```

---

## 4. SPACING SYSTEM (8px base)

```css
:root {
  --space-0:    0;
  --space-1:    0.25rem;   /* 4px */
  --space-2:    0.5rem;    /* 8px */
  --space-3:    0.75rem;   /* 12px */
  --space-4:    1rem;      /* 16px */
  --space-5:    1.25rem;   /* 20px */
  --space-6:    1.5rem;    /* 24px */
  --space-8:    2rem;      /* 32px */
  --space-10:   2.5rem;    /* 40px */
  --space-12:   3rem;      /* 48px */
  --space-16:   4rem;      /* 64px */
}
```

---

## 5. SHADOW SYSTEM

```css
:root {
  --shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
  --shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
  
  /* Glow effects */
  --shadow-glow-sm: 0 0 10px var(--accent-glow);
  --shadow-glow-md: 0 0 20px var(--accent-glow);
  --shadow-glow-lg: 0 0 30px var(--accent-glow), 0 0 60px rgba(155, 89, 182, 0.3);
  
  /* Special */
  --shadow-window: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border-subtle);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

---

## 6. ANIMATION LIBRARY

```css
:root {
  /* Timing functions */
  --ease-instant:    steps(1);
  --ease-quick:      cubic-bezier(0.4, 0, 0.2, 1);
  --ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth:     cubic-bezier(0, 0, 0.2, 1);
  --ease-enter:      cubic-bezier(0, 0, 0.2, 1);
  --ease-exit:       cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:     cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Durations */
  --duration-instant: 0ms;
  --duration-fastest: 50ms;
  --duration-fast:    100ms;
  --duration-normal:  200ms;
  --duration-slow:    300ms;
  --duration-slower:  400ms;
  --duration-slowest: 500ms;
}

/* Keyframes */
@keyframes windowOpen {
  from { opacity: 0; transform: scale(0.92) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes windowClose {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.95); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulseGlow {
  0%, 100% { filter: brightness(1); }
  50%       { filter: brightness(1.2); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-4px); }
  40%      { transform: translateX(4px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
```

---

## 7. GLASS & BLUR EFFECTS

```css
:root {
  --glass-bg:        rgba(15, 15, 24, 0.8);
  --glass-border:    rgba(155, 89, 182, 0.2);
  --glass-blur-sm:   8px;
  --glass-blur-md:   16px;
  --glass-blur-lg:   24px;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--glass-border);
}

.frosted-window {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}
```

---

## 8. BORDER SYSTEM

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;
}
```

---

## 9. BUTTON SYSTEM

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  font: var(--font-body);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow-sm);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-primary {
  background: var(--purple);
  color: white;
}

.btn-secondary {
  background: var(--surface-1);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  background: var(--accent-subtle);
  color: var(--purple-bright);
}
```

---

## 10. INPUT SYSTEM

```css
.input {
  background: var(--surface-0);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  color: var(--text-primary);
  font: var(--font-body);
  transition: all var(--duration-fast) var(--ease-default);
}

.input:hover {
  border-color: var(--border-strong);
}

.input:focus {
  outline: none;
  border-color: var(--purple);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.input::placeholder {
  color: var(--text-muted);
}
```

---

## 11. SCROLLBAR STYLING

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--surface-0);
}

::-webkit-scrollbar-thumb {
  background: var(--purple-dark);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--purple);
}
```

---

## 12. SELECTION

```css
::selection {
  background: var(--purple);
  color: white;
}
```

---

## 13. FOCUS STATES

```css
:focus-visible {
  outline: 2px solid var(--purple);
  outline-offset: 2px;
}
```

---

## 14. REDUCED MOTION

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 15. TERMINAL SPECIFIC

```css
.terminal {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  background: var(--void);
  color: var(--purple-glow);
}

.terminal-prompt {
  color: var(--purple-bright);
  text-shadow: var(--shadow-glow-sm);
}

.terminal-input {
  color: white;
  caret-color: var(--purple-bright);
}

.terminal-line.error {
  color: var(--error);
}

.terminal-line.success {
  color: var(--success);
}
```

---

## 16. WINDOW SYSTEM

```css
.window {
  display: flex;
  flex-direction: column;
  width: min(700px, 92vw);
  min-width: 320px;
  position: absolute;
  background: var(--surface-0);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-window);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
}

.window.open {
  animation: windowOpen var(--duration-slow) var(--ease-spring) forwards;
}

.window.closing {
  animation: windowClose var(--duration-fast) var(--ease-exit) forwards;
}

.window-header {
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  background: var(--surface-1);
  border-bottom: 1px solid var(--border-subtle);
  cursor: move;
}

.window-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
```

---

## 17. TASKBAR

```css
.taskbar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: 46px;
  padding: 0 var(--space-3);
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(8px) saturate(150%);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
  border-top: 1px solid var(--border-subtle);
}

.taskbar-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all var(--duration-fast) var(--ease-bounce);
}

.taskbar-btn:hover {
  background: var(--accent-subtle);
  transform: scale(1.1);
}
```

---

## 18. START MENU

```css
.start-menu {
  position: absolute;
  bottom: 54px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background: rgba(15, 15, 24, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-4);
}

.start-menu-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
}

.start-menu-item:hover {
  background: var(--accent-subtle);
}
```

---

## 19. UTILITY CLASSES

```css
/* Spacing */
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }

.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }

/* Flex */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.flex-1 { flex: 1; }

/* Text */
.text-center { text-align: center; }
.text-sm { font-size: var(--text-sm); }
.text-lg { font-size: var(--text-lg); }
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-accent { color: var(--purple-bright); }

/* Visibility */
.hidden { display: none; }
.visible { visibility: visible; }
.invisible { visibility: hidden; }
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }
```
