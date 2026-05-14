# 🎨 Alex Paseka Personal Site

Browser-based desktop OS experience — a personal portfolio that feels like an operating system.

**Live:** [paseka.dev](https://paseka.dev)

## ✨ Features

- **Desktop OS UI** — Draggable windows, start menu, dock, taskbar
- **Music Player** — Multiple ambient tracks (sax jazz, piano, rain sounds)
- **Projects Gallery** — Browse all projects with modal details and GitHub links
- **About Window** — Bio, education, social links
- **Contact Window** — Quick links to GitHub, email, website
- **Weather Widget** — Zip code weather lookup in taskbar
- **Particle Effects** — Mouse trail with glow effects
- **Rain Mode** — Toggleable rain overlay
- **Double-Click Name** — Sparkle burst animation
- **10x Avatar Click** — Easter egg crazy mode

## 🎵 Music Tracks

- **Sax Jazz** — Smooth instrumental jazz
- **Piano Dreams** — Calm ambient piano
- **Rain Sounds** — Peaceful rain ambience

## 🛠️ Tech Stack

- React 18
- Vite
- Canvas API (particle effects)
- Web Audio API (music player)
- Zippopotam + Open-Meteo APIs (weather)

## 📁 Project Structure

```
src/
  ├── Intro.jsx     # Main OS desktop component
  ├── Intro.css    # All desktop styling
  ├── main.jsx     # Entry point
  └── index.css    # Base styles
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🌐 Deploy

Vercel auto-deploys from main branch to paseka.dev