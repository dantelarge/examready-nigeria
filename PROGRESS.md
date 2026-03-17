# ExamReady Nigeria — Development Progress

## Project
- **Type:** JAMB & WAEC exam prep web app (Nigerian students)
- **Stack:** Node.js + Express backend, vanilla HTML/CSS/JS frontend
- **Location:** `C:\Users\HP\Desktop\examready-nigeria\`
- **Run:** `npm start` → http://localhost:3001

## What's Built (current state)

### Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, stats, features, subject grid |
| `subjects.html` | All 10 subjects with Practice / Mock Exam buttons |
| `quiz.html` | Practice mode — one question at a time, instant feedback |
| `exam.html` | Mock exam — 45-min timer, nav grid, flag questions |
| `results.html` | Results — score circle, grade, full review, leaderboard submit |
| `leaderboard.html` | Top scores per subject (podium + table) |
| `notes.html` | Study Notes — key revision points per subject (tabbed) |
| `progress.html` | My Progress — session history, best scores per subject |

### Backend (`server.js`)
- `GET /api/questions?subject=` — all questions for a subject
- `GET /api/questions/random?subject=&count=` — random N questions
- `GET /api/subjects` — list all subjects with counts
- `GET /api/leaderboard?subject=` — top 20 scores
- `POST /api/leaderboard` — submit a score

### Data
- `data/questions.json` — **400 questions** (40 per subject × 10 subjects)
- `data/leaderboard.json` — persisted leaderboard entries

### PWA (Installable App)
- `public/manifest.json` — app metadata, icons, theme
- `public/sw.js` — service worker (cache-first, offline support)
- `public/icons/icon-192.png` + `icon-512.png` — app icons
- Anti-flash dark mode script in every `<head>`

### Features Added
- **Dark Mode** — toggle button in navbar (🌙/☀️), persists via localStorage, respects system preference
- **Study Notes** (`notes.html` + `notes.js`) — tabbed per-subject revision cards covering all JAMB topics
- **Progress Tracking** (`progress.html` + `progress.js`) — saves every session to localStorage, shows avg score, best per subject, full history table
- **PWA** — installable on Android, iOS, Windows, Mac via "Add to Home Screen" / browser install prompt

## Subjects (10)
Mathematics, English Language, Physics, Chemistry, Biology, Government, Economics, Literature in English, Geography, Commerce

## Session Notes

### Session 2 (2026-03-16) — completed
- Expanded question bank: 100 → 400 questions (40 per subject)
- Added dark mode with flash prevention and localStorage persistence
- Added Study Notes page with full JAMB revision notes per subject
- Added Progress Tracking page with session history + best scores
- Made it a PWA: manifest.json + service worker + app icons
- Added "Study Notes" and "My Progress" nav links to all pages

## What Could Come Next
- [ ] User accounts / cloud sync (currently all local)
- [ ] More questions (target: 100 per subject = 1000 total)
- [ ] JAMB year filters (e.g. "only 2023 questions")
- [ ] Timer for practice mode (optional)
- [ ] Offline question download notification
- [ ] Share results feature
- [ ] Subject-specific study tips / mnemonics
- [ ] Deployment to Vercel / Railway / Render
