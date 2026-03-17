/* ============================================================
   ExamReady Nigeria — progress.js
   Reads exam history from localStorage, renders:
   - Summary stats (total sessions, avg score, best streak, sessions this week)
   - Best scores per subject (progress bars)
   - Full session history table
   ============================================================ */

'use strict';

const PROGRESS_KEY = 'examHistory';
const MAX_HISTORY  = 100; // cap stored sessions

/* ── Weak topic tracking key ─────────────────────────────── */
const WEAK_TOPICS_KEY = 'weakTopics'; // { subject: { questionText: missCount } }

/* ── Save a result (called from results.js after submission) ── */
function saveToHistory(resultData) {
  if (!resultData || typeof resultData.score !== 'number') return;
  const history = loadHistory();
  history.unshift({
    id:       Date.now(),
    subject:  resultData.subject,
    mode:     resultData.mode || 'practice',
    score:    resultData.score,
    total:    resultData.total,
    pct:      resultData.pct,
    grade:    resultData.grade,
    date:     resultData.date || new Date().toISOString(),
  });
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));

  // Track wrong answers for weak topic identification
  if (Array.isArray(resultData.answers)) {
    const subject = resultData.subject;
    let weakMap = {};
    try { weakMap = JSON.parse(localStorage.getItem(WEAK_TOPICS_KEY) || '{}'); } catch (_) {}
    if (!weakMap[subject]) weakMap[subject] = {};
    resultData.answers.forEach(a => {
      // exam.js uses `isCorrect`; quiz.js may use `correct` (boolean)
      const wrong = a.isCorrect === false || a.correct === false;
      if (wrong && a.question) {
        const key = a.question.slice(0, 80); // truncate for storage efficiency
        weakMap[subject][key] = (weakMap[subject][key] || 0) + 1;
      }
    });
    localStorage.setItem(WEAK_TOPICS_KEY, JSON.stringify(weakMap));
  }
}

function loadWeakTopics(subject) {
  try {
    const raw = localStorage.getItem(WEAK_TOPICS_KEY);
    if (!raw) return [];
    const map = JSON.parse(raw);
    if (!map[subject]) return [];
    // Sort by miss count desc, return top 5
    return Object.entries(map[subject])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([q, count]) => ({ question: q, missCount: count }));
  } catch { return []; }
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

/* ── Render Progress Page ── */
(function renderProgressPage() {
  const layout = document.getElementById('progressLayout');
  if (!layout) return;

  const history = loadHistory();

  if (history.length === 0) {
    layout.innerHTML = `
      <div class="prog-empty">
        <span class="prog-empty-icon" aria-hidden="true">📊</span>
        <h3>No sessions yet</h3>
        <p>Complete a practice or mock exam to start tracking your progress here.</p>
        <a href="subjects.html" class="btn btn-primary">Start Practising</a>
      </div>
    `;
    return;
  }

  // ── Compute summary stats ──
  const totalSessions = history.length;
  const avgPct = Math.round(history.reduce((s, h) => s + h.pct, 0) / totalSessions);
  const bestPct = Math.max(...history.map(h => h.pct));

  // Sessions in the last 7 days
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = history.filter(h => new Date(h.date).getTime() > weekAgo).length;

  // ── Best score per subject ──
  const bestBySubject = {};
  SUBJECTS.forEach(s => { bestBySubject[s.name] = null; });
  history.forEach(h => {
    if (!bestBySubject[h.subject] || h.pct > bestBySubject[h.subject].pct) {
      bestBySubject[h.subject] = h;
    }
  });

  layout.innerHTML = `
    <!-- Summary -->
    <div class="prog-summary">
      <div class="prog-stat-card">
        <div class="prog-stat-num">${totalSessions}</div>
        <div class="prog-stat-label">Sessions</div>
      </div>
      <div class="prog-stat-card">
        <div class="prog-stat-num">${avgPct}%</div>
        <div class="prog-stat-label">Avg Score</div>
      </div>
      <div class="prog-stat-card">
        <div class="prog-stat-num">${bestPct}%</div>
        <div class="prog-stat-label">Best Score</div>
      </div>
      <div class="prog-stat-card">
        <div class="prog-stat-num">${thisWeek}</div>
        <div class="prog-stat-label">This Week</div>
      </div>
    </div>

    <!-- Best Scores -->
    <div class="prog-section-title">🏅 Best Score Per Subject</div>
    <div class="best-scores-grid" id="bestScoresGrid"></div>

    <!-- Weak Topics (Premium) -->
    <div class="prog-section-title" style="margin-top:8px;">🎯 Weak Topics to Revise</div>
    <div id="weakTopicsSection"></div>

    <!-- History Table -->
    <div class="history-card">
      <div class="history-card-header">
        <span>📋 Session History (${totalSessions})</span>
        <button class="clear-btn" id="clearHistoryBtn" title="Clear all history">Clear All</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Mode</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="historyTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  // ── Render best score bars ──
  const bestGrid = document.getElementById('bestScoresGrid');
  SUBJECTS.forEach(s => {
    const best = bestBySubject[s.name];
    const pct  = best ? best.pct : 0;
    const grade = best ? getGrade(pct) : '';
    const card = document.createElement('div');
    card.className = 'best-score-card' + (best ? '' : ' no-data');
    card.innerHTML = `
      <span class="best-score-emoji" aria-hidden="true">${s.emoji}</span>
      <div class="best-score-info">
        <div class="best-score-subject">${escapeHtml(s.name)}</div>
        <div class="best-score-bar-wrap">
          <div class="best-score-bar" style="width:${pct}%"></div>
        </div>
      </div>
      <span class="best-score-pct${grade ? ' grade-badge grade-' + grade : ''}" style="font-size:.8rem; padding:2px 8px;">
        ${best ? pct + '%' : '—'}
      </span>
    `;
    bestGrid.appendChild(card);
  });

  // ── Render weak topics ──
  const weakSection = document.getElementById('weakTopicsSection');
  if (weakSection) {
    if (typeof isPremium === 'function' && isPremium()) {
      // Find subjects with most missed questions
      const subjectsWithData = SUBJECTS
        .map(s => ({ ...s, weak: loadWeakTopics(s.name) }))
        .filter(s => s.weak.length > 0);

      if (subjectsWithData.length === 0) {
        weakSection.innerHTML = `
          <div style="padding:16px 20px;border:1px dashed var(--border);border-radius:8px;color:var(--muted);font-size:.875rem;">
            Complete a few practice sessions to see your weak topics here.
          </div>`;
      } else {
        weakSection.innerHTML = subjectsWithData.map(s => `
          <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius-card);padding:16px 20px;margin-bottom:12px;box-shadow:var(--shadow-sm);">
            <div style="font-weight:700;font-size:.9rem;margin-bottom:10px;">${s.emoji} ${escapeHtml(s.name)}</div>
            ${s.weak.map(w => `
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:var(--red-light,#fee2e2);color:#b91c1c;border-radius:100px;font-size:.7rem;font-weight:700;padding:2px 8px;flex-shrink:0;">✗ ${w.missCount}×</span>
                <span style="font-size:.8125rem;color:var(--text-2);">${escapeHtml(w.question)}…</span>
              </div>
            `).join('')}
            <a href="subjects.html?subject=${encodeURIComponent(s.name)}" style="display:inline-block;margin-top:8px;font-size:.8rem;color:var(--blue);font-weight:600;text-decoration:none;">Practise ${s.name} →</a>
          </div>
        `).join('');
      }
    } else {
      // Gate for free users
      if (typeof gateAnalytics === 'function') {
        gateAnalytics(weakSection);
      }
    }
  }

  // ── Render history rows ──
  const tbody = document.getElementById('historyTableBody');
  tbody.innerHTML = history.map((h, i) => {
    const grade = getGrade(h.pct);
    return `
      <tr>
        <td style="color:var(--muted); font-size:.8rem;">${i + 1}</td>
        <td style="font-weight:600;">${escapeHtml(SUBJECT_EMOJIS[h.subject] || '')} ${escapeHtml(h.subject)}</td>
        <td><span class="mode-badge ${h.mode}">${h.mode === 'mock' ? 'Mock Exam' : 'Practice'}</span></td>
        <td style="font-weight:700; color:var(--blue);">${h.score}/${h.total} <span style="color:var(--muted); font-size:.8rem;">(${h.pct}%)</span></td>
        <td><span class="grade-badge grade-${grade}" style="font-size:.75rem; padding:2px 10px;">${grade}</span></td>
        <td style="color:var(--muted); font-size:.8rem;">${formatDate(h.date)}</td>
      </tr>
    `;
  }).join('');

  // ── Clear history ──
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    if (confirm('Clear all progress history? This cannot be undone.')) {
      localStorage.removeItem(PROGRESS_KEY);
      location.reload();
    }
  });
})();
