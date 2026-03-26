'use strict';
/* Builds static notes.html from NOTES_DATA in notes.js */
const fs   = require('fs');
const path = require('path');

// Load NOTES_DATA via the pre-exported module
const NOTES_DATA = require('./notes_data_tmp.js');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const subjects = Object.keys(NOTES_DATA);
let tabsHtml   = '';
let panelsHtml = '';

subjects.forEach((subjectName, idx) => {
  const data    = NOTES_DATA[subjectName];
  const id      = 'notes-' + subjectName.replace(/\s+/g, '-').toLowerCase();
  const isFirst = idx === 0;

  tabsHtml += `    <button type="button" class="notes-tab${isFirst ? ' active' : ''}" data-panel="${id}" role="tab" aria-controls="${id}" aria-selected="${isFirst}">${data.emoji} ${esc(subjectName)}</button>\n`;

  panelsHtml += `    <div class="notes-panel${isFirst ? ' active' : ''}" id="${id}" role="tabpanel">\n`;
  panelsHtml += `      <div class="notes-header"><span class="notes-header-emoji" aria-hidden="true">${data.emoji}</span><div><h2>${esc(subjectName)}</h2><p>${esc(data.desc)}</p></div></div>\n`;
  panelsHtml += `      <div class="notes-filter">\n`;
  panelsHtml += `        <span class="notes-filter-label">Filter:</span>\n`;
  panelsHtml += `        <button class="level-btn active" data-level="all">All</button>\n`;
  panelsHtml += `        <button class="level-btn" data-level="SS1">SS1</button>\n`;
  panelsHtml += `        <button class="level-btn" data-level="SS2">SS2</button>\n`;
  panelsHtml += `        <button class="level-btn" data-level="SS3">SS3</button>\n`;
  panelsHtml += `      </div>\n`;
  panelsHtml += `      <div class="topics-grid">\n`;

  data.topics.forEach(t => {
    panelsHtml += `        <div class="topic-card" data-level="${t.level}">\n`;
    panelsHtml += `          <div class="topic-title">${esc(t.title)}<span class="topic-level ${t.level.toLowerCase()}">${t.level}</span></div>\n`;
    panelsHtml += `          <ul class="topic-points">\n`;
    t.points.forEach(p => {
      panelsHtml += `            <li>${esc(p)}</li>\n`;
    });
    panelsHtml += `          </ul>\n`;
    panelsHtml += `        </div>\n`;
  });

  panelsHtml += `      </div>\n`;
  panelsHtml += `      <div class="notes-cta">\n`;
  panelsHtml += `        <p>📚 Ready to test your knowledge on ${esc(subjectName)}?</p>\n`;
  panelsHtml += `        <div class="cta-btns">\n`;
  panelsHtml += `          <a href="subjects.html?subject=${encodeURIComponent(subjectName)}" class="btn btn-primary btn-sm">Practice Now</a>\n`;
  panelsHtml += `          <a href="exam.html?subject=${encodeURIComponent(subjectName)}" class="btn btn-outline btn-sm">Mock Exam</a>\n`;
  panelsHtml += `        </div>\n`;
  panelsHtml += `      </div>\n`;
  panelsHtml += `    </div>\n`;
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="WAEC &amp; JAMB study notes for all 10 subjects — SS1, SS2, SS3 revision summaries on ExamReady Nigeria." />
  <title>Study Notes — ExamReady Nigeria</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0052cc" />
  <script>
    (function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();
  </script>
  <style>
    .notes-layout { max-width: 960px; margin: 0 auto; padding: 32px 20px 60px; }

    .notes-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
    .notes-tab {
      padding: 8px 16px; border: 2px solid var(--border); border-radius: 100px;
      font-size: .8125rem; font-weight: 600; cursor: pointer;
      background: var(--white); color: var(--muted); transition: all var(--transition);
    }
    .notes-tab:hover { border-color: var(--blue); color: var(--blue); }
    .notes-tab.active { background: var(--blue); border-color: var(--blue); color: #fff; }

    .notes-panel { display: none; }
    .notes-panel.active { display: block; }

    .notes-header { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
    .notes-header-emoji { font-size: 2.25rem; }
    .notes-header h2 { font-size: 1.5rem; font-weight: 800; }
    .notes-header p { color: var(--muted); font-size: .875rem; margin-top: 2px; }

    .topics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (max-width: 640px) { .topics-grid { grid-template-columns: 1fr; } }

    .topic-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: var(--radius-card); padding: 20px 18px; box-shadow: var(--shadow-sm);
    }
    .topic-title {
      font-size: .9rem; font-weight: 700; color: var(--blue);
      margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
    }
    .topic-title::before {
      content: ''; display: inline-block; width: 8px; height: 8px;
      border-radius: 50%; background: var(--blue); flex-shrink: 0;
    }
    .topic-points { list-style: none; display: flex; flex-direction: column; gap: 5px; }
    .topic-points li {
      font-size: .8375rem; color: var(--text); line-height: 1.55;
      padding-left: 14px; position: relative;
    }
    .topic-points li::before { content: '→'; position: absolute; left: 0; color: var(--muted); font-size: .75rem; }

    .notes-filter { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
    .notes-filter-label { font-size: .78rem; font-weight: 700; color: var(--muted); }
    .level-btn {
      padding: 5px 14px; border: 2px solid var(--border); border-radius: 100px;
      font-size: .75rem; font-weight: 700; cursor: pointer;
      background: var(--white); color: var(--muted); transition: all var(--transition);
    }
    .level-btn:hover { border-color: var(--blue); color: var(--blue); }
    .level-btn.active[data-level="all"],
    .level-btn.active[data-level="SS1"] { background: var(--blue); border-color: var(--blue); color: #fff; }
    .level-btn.active[data-level="SS2"] { background: var(--green); border-color: var(--green); color: #fff; }
    .level-btn.active[data-level="SS3"] { background: var(--gold); border-color: var(--gold); color: #fff; }

    .topic-level {
      margin-left: auto; font-size: .65rem; font-weight: 800;
      padding: 2px 7px; border-radius: 100px;
      text-transform: uppercase; letter-spacing: .3px; flex-shrink: 0;
    }
    .topic-level.ss1 { background: var(--blue-light); color: var(--blue); }
    .topic-level.ss2 { background: var(--green-light); color: var(--green-dark); }
    .topic-level.ss3 { background: #fef3c7; color: #92400e; }
    .topic-card.level-hidden { display: none; }

    .notes-cta {
      margin-top: 28px; padding: 20px 24px; background: var(--blue-light);
      border: 1px solid var(--border); border-radius: var(--radius-card);
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .notes-cta p { font-weight: 600; color: var(--blue); font-size: .9375rem; }
    .cta-btns { display: flex; gap: 10px; flex-wrap: wrap; }
  </style>
</head>
<body>

<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="ExamReady Nigeria Home">
      <div class="logo-icon" aria-hidden="true">📚</div>
      <span><span class="logo-name">ExamReady</span> <span class="logo-accent">Nigeria</span></span>
    </a>
    <div class="nav-links">
      <a href="subjects.html">Subjects</a>
      <a href="subjects.html">Practice</a>
      <a href="exam.html">Mock Exam</a>
      <a href="leaderboard.html">Leaderboard</a>
      <a href="notes.html" class="active">Study Notes</a>
      <a href="progress.html">My Progress</a>
      <a href="premium.html" style="color:var(--gold);font-weight:800;">⭐ Premium</a>
    </div>
    <button class="dark-toggle" id="darkToggle" aria-label="Toggle dark mode">🌙</button>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-drawer" id="navDrawer" aria-hidden="true">
  <a href="subjects.html">Subjects</a>
  <a href="subjects.html">Practice</a>
  <a href="exam.html">Mock Exam</a>
  <a href="leaderboard.html">Leaderboard</a>
  <a href="notes.html" class="active">Study Notes</a>
  <a href="progress.html">My Progress</a>
  <a href="premium.html" style="color:var(--gold);font-weight:800;">⭐ Premium</a>
</div>

<main>
  <header class="page-header">
    <h1>📒 Study Notes</h1>
    <p>WAEC &amp; JAMB key revision points — SS1, SS2 &amp; SS3 for all 10 subjects</p>
  </header>

  <div class="notes-layout">

    <div class="notes-tabs" id="notesTabs" role="tablist" aria-label="Subject notes">
${tabsHtml}    </div>

    <div id="notesPanels">
${panelsHtml}    </div>

  </div>
</main>

<footer class="footer">
  <strong>ExamReady Nigeria</strong> &copy; 2024 &mdash;
  Free exam prep for every Nigerian student 🇳🇬
</footer>

<script src="js/main.js"></script>
<script src="js/premium-gate.js"></script>
<script src="js/notes.js"></script>
<script>
  const hamburger = document.getElementById('hamburger');
  const navDrawer  = document.getElementById('navDrawer');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navDrawer.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    navDrawer.setAttribute('aria-hidden', !open);
  });
  navDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navDrawer.classList.remove('open');
    });
  });
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '../public/notes.html'), html, 'utf8');
console.log('notes.html written:', Math.round(html.length / 1024), 'KB');
