# ExamReady Nigeria — Claude Instructions

This file tells Claude how to work on this project. Always read and follow these rules before touching any file.

---

## Project Overview
**ExamReady Nigeria** is a free JAMB & WAEC exam prep web app for Nigerian secondary school students.
- **Stack**: Node.js + Express backend (port 3001), vanilla HTML/CSS/JS frontend
- **Data**: JSON file-based (`data/questions.json`, `data/leaderboard.json`)
- **PWA**: manifest.json + sw.js service worker
- **No build step** — plain HTML/CSS/JS, no React, no bundler
- **1,083 questions** in the database across 10 subjects

---

## Design & Styling Rules

### Color Palette (ALWAYS use these CSS variables — NEVER hardcode colours)
```css
--blue:        #2563eb   /* primary brand blue */
--blue-dark:   #1d4ed8
--blue-light:  #eff6ff
--green:       #059669
--green-dark:  #065f46
--green-light: #ecfdf5
--gold:        #d97706   /* premium / accent */
--red:         #dc2626
--red-light:   #fee2e2
--text:        #111827
--text-2:      #374151
--muted:       #6b7280
--border:      #e5e7eb
--bg:          #f9fafb
--white:       #ffffff
--radius-card: 12px
--radius-lg:   16px
--shadow-sm:   0 1px 3px rgba(0,0,0,.08)
--shadow-md:   0 4px 12px rgba(0,0,0,.1)
--shadow-blue: 0 4px 14px rgba(37,99,235,.25)
--transition:  0.2s ease
```

### Typography
- Font: **Inter** (loaded from Google Fonts or system fallback)
- Base font size: `15px` / `0.9375rem`
- Headings: `font-weight: 800` or `900`, tight `letter-spacing`

### Component Patterns
- **Cards**: `background: var(--white)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-sm)`
- **Buttons (primary)**: `background: var(--blue)`, white text, `border-radius: 8px`, `font-weight: 700`
- **Navbar**: glassmorphism — `backdrop-filter: blur(16px)`, semi-transparent background; adds `.scrolled` class on scroll
- **Hero sections**: dark gradient background with dot-grid overlay + floating glow blobs (`.hero-glow-1/2/3`)
- **Stats/numbers**: gradient text `linear-gradient(135deg, var(--blue), var(--green))`
- **Hover on cards**: `translateY(-4px)` + increased shadow + coloured top border reveal
- **Per-subject colours**: use `data-subject="mathematics|english|physics|chemistry|biology|government|economics|literature|geography|commerce"` on `.subject-card` and `.subject-card-full` elements — CSS handles the gradient tinting automatically
- **Dark mode**: all components must support `[data-theme="dark"]` overrides

### Dark Mode
Every page has this inline script in `<head>` (anti-flash — MUST be first script):
```html
<script>
  (function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();
</script>
```
Dark mode variables live in `css/style.css` under `[data-theme="dark"]`.

---

## File Structure
```
examready-nigeria/
├── public/
│   ├── css/style.css          ← ALL shared styles (1,800+ lines, v3 design)
│   ├── js/
│   │   ├── main.js            ← shared utils: SUBJECTS, getQueryParam, formatDate,
│   │   │                         getGrade, showToast, escapeHtml, shuffleArray,
│   │   │                         optionLetter, dark mode, navbar scroll effect, SW reg
│   │   ├── premium-gate.js    ← isPremium(), setPremium(), clearPremium(),
│   │   │                         canTakeMockExam(), recordMockExamTaken(),
│   │   │                         gateMockExam(), gatePdfDownload(), gateAnalytics(),
│   │   │                         applyPremiumUI()
│   │   ├── pdf-download.js    ← downloadNotesPDF(subject, topics),
│   │   │                         downloadResultsPDF(result) — uses jsPDF CDN
│   │   ├── progress.js        ← saveToHistory(), loadHistory(), loadWeakTopics(),
│   │   │                         weak topic tracking per subject
│   │   ├── results.js         ← renders results page from sessionStorage
│   │   ├── exam.js            ← timed mock exam logic (gates with gateMockExam)
│   │   ├── quiz.js            ← practice quiz logic
│   │   ├── notes.js           ← study notes data + render + PDF button
│   │   ├── leaderboard.js     ← leaderboard fetch + render
│   │   └── subjects.js        ← (unused — subjects page uses inline script)
│   ├── index.html             ← homepage with hero glow blobs, data-subject cards
│   ├── subjects.html          ← JS-rendered subject grid with data-subject attrs
│   ├── exam.html              ← mock exam page
│   ├── results.html           ← results page with PDF download button
│   ├── progress.html          ← progress + weak topic analytics
│   ├── notes.html             ← study notes with PDF download
│   ├── leaderboard.html       ← leaderboard
│   ├── premium.html           ← pricing page with Paystack + WhatsApp mentorship
│   ├── admin-sync.html        ← admin UI to sync questions from ALOC API
│   ├── manifest.json
│   ├── sw.js                  ← service worker
│   └── icons/
├── data/
│   ├── questions.json         ← 1,083 JAMB/WAEC questions
│   └── leaderboard.json
├── scripts/
│   └── add-questions.js       ← script to bulk-add questions to questions.json
├── server.js                  ← Express server (port 3001), uses dotenv
├── .env                       ← ALOC_TOKEN=, PORT=3001
├── package.json
├── CLAUDE.md                  ← this file
└── Procfile                   ← web: node server.js (for Render.com)
```

---

## HTML Page Template (every page MUST have all of these)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="..." />
  <title>Page Title — ExamReady Nigeria</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0052cc" />
  <!-- Anti-flash dark mode MUST be first script -->
  <script>
    (function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();
  </script>
</head>
<body>
  <!-- Navbar with hamburger (copy from any existing page) -->
  <!-- nav-drawer for mobile -->
  <!-- Main content -->
  <!-- Footer -->
  <script src="js/main.js"></script>
  <script src="js/premium-gate.js"></script>
  <!-- page-specific scripts -->
</body>
</html>
```

---

## Navigation (all pages must have these links in both `.nav-links` AND `.nav-drawer`)
```
Subjects | Practice | Mock Exam | Leaderboard | Study Notes | My Progress | ⭐ Premium
```
- "Practice" links to `subjects.html`
- "⭐ Premium" uses `style="color:var(--gold);font-weight:800;"`
- Every page needs the hamburger button + drawer + JS toggle logic

---

## Premium System
- `isPremium()` → checks `localStorage['isPremium']` + `localStorage['premiumExpiry']`
- `setPremium(email, daysValid)` → sets both keys in localStorage
- `clearPremium()` → removes all premium localStorage keys
- **Free limits**: 3 mock exams/day (`localStorage['mockExamDate']` + `localStorage['mockExamCount']`), no PDF downloads, ads shown, no detailed analytics
- **Premium**: unlimited mocks, PDF downloads, ad-free, weak topic analytics
- Payment: **Paystack** public key `pk_test_d203da630e792cf0d824533c458ec`
- Amount: ₦500/month = **50000 kobo**
- After payment success: call `setPremium(email, 31)` then redirect or `showToast()`
- Owner WhatsApp for mentorship: **08160630956** → `https://wa.me/2348160630956`
- Support email: **dantilange@gmail.com**

---

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/questions?subject=X` | All questions for a subject |
| GET | `/api/questions/random?subject=X&count=N` | Random N questions |
| GET | `/api/subjects` | All subjects with counts |
| GET | `/api/leaderboard?subject=X` | Top 20 leaderboard entries |
| POST | `/api/leaderboard` | Submit a score `{ name, subject, score, total }` |
| POST | `/api/sync-questions` | Sync from ALOC API `{ token: "ALOC-..." }` |
| GET | `/api/sync-status` | Question counts per subject (local vs ALOC) |

---

## Subjects (always in this order, always these data-subject values)
| # | Name | Emoji | data-subject value |
|---|------|-------|-------------------|
| 1 | Mathematics | 🔢 | `mathematics` |
| 2 | English Language | 📝 | `english` |
| 3 | Physics | ⚡ | `physics` |
| 4 | Chemistry | 🧪 | `chemistry` |
| 5 | Biology | 🌿 | `biology` |
| 6 | Government | 🏛️ | `government` |
| 7 | Economics | 💹 | `economics` |
| 8 | Literature in English | 📖 | `literature` |
| 9 | Geography | 🌍 | `geography` |
| 10 | Commerce | 🏪 | `commerce` |

The `data-subject` attribute on `.subject-card` and `.subject-card-full` elements enables per-subject CSS gradient tinting defined in `style.css`.

---

## Code Style
- `'use strict'` at top of every JS file
- Use `escapeHtml()` for any dynamic user-facing content
- `showToast(message, 'success'|'error'|'default')` for all notifications
- **Never use `alert()`** — use `showToast()` or a modal
- CSS: mobile-first, CSS Grid + Flexbox, no external CSS frameworks
- No TypeScript, no React, no build tools
- Comments only where logic isn't self-evident
- Never hardcode colours — always `var(--variable-name)`

---

## ALOC API (online question source)
- Base URL: `https://questions.aloc.com.ng/api/v2`
- Auth header: `AccessToken: ALOC-b4adac42a3327c1b6728`
- Token requires email verification at questions.aloc.com.ng to activate (returns 406 if not verified)
- `/m?subject=mathematics&type=utme` → 40 UTME questions
- `/m?subject=mathematics&type=wassce` → 40 WASSCE questions
- Admin sync UI: `http://localhost:3001/admin-sync.html`

---

## Running Locally
```bash
cd examready-nigeria
npm install
node server.js      # starts on http://localhost:3001
```
If port 3001 is busy: `netstat -ano | grep :3001` → get PID → `taskkill //PID <pid> //F`
