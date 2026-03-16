/* ============================================================
   ExamReady Nigeria — leaderboard.js
   Fetches /api/leaderboard, renders podium + table,
   handles subject filter
   ============================================================ */

'use strict';

(async function initLeaderboard() {
  /* ── DOM refs ── */
  const subjectFilter = document.getElementById('subjectFilter');
  const podiumRow     = document.getElementById('podiumRow');
  const loadingEl     = document.getElementById('loadingState');
  const tableWrap     = document.getElementById('tableWrap');
  const tableBody     = document.getElementById('lbTableBody');
  const emptyEl       = document.getElementById('emptyState');
  const errorEl       = document.getElementById('errorState');
  const errorMsgEl    = document.getElementById('errorMessage');

  /* ── Populate subject filter dropdown ── */
  SUBJECTS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = `${s.emoji} ${s.name}`;
    subjectFilter.appendChild(opt);
  });

  // Pre-select from URL param
  const urlSubject = getQueryParam('subject');
  if (urlSubject) subjectFilter.value = urlSubject;

  /* ── Load leaderboard ── */
  async function loadLeaderboard() {
    const selectedSubject = subjectFilter.value;

    // Reset UI
    podiumRow.innerHTML   = '';
    tableBody.innerHTML   = '';
    loadingEl.classList.remove('hidden');
    tableWrap.classList.add('hidden');
    emptyEl.classList.add('hidden');
    errorEl.classList.add('hidden');

    let entries;
    try {
      const url = selectedSubject
        ? `/api/leaderboard?subject=${encodeURIComponent(selectedSubject)}`
        : '/api/leaderboard';

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      entries = await res.json();

      if (!Array.isArray(entries)) {
        // Some APIs wrap in { data: [...] }
        entries = entries.data || entries.entries || [];
      }
    } catch (err) {
      loadingEl.classList.add('hidden');
      errorEl.classList.remove('hidden');
      errorMsgEl.textContent = err.message || 'Could not load leaderboard data.';
      return;
    }

    loadingEl.classList.add('hidden');

    if (!entries || entries.length === 0) {
      emptyEl.classList.remove('hidden');
      return;
    }

    // Sort by pct desc, then by score desc
    entries.sort((a, b) => (b.pct - a.pct) || (b.score - a.score));

    // Render podium (top 3)
    renderPodium(entries.slice(0, 3));

    // Render full table (rank 4+, or all if fewer than 4 total)
    renderTable(entries);

    tableWrap.classList.remove('hidden');
  }

  /* ── Podium ── */
  function renderPodium(topThree) {
    if (!topThree || topThree.length === 0) return;

    const medals = ['🥇', '🥈', '🥉'];
    const rankClass = ['rank-1', 'rank-2', 'rank-3'];

    // Arrange: 2nd | 1st | 3rd (classic podium order if we have 3)
    let order = topThree;
    if (topThree.length === 3) {
      order = [topThree[1], topThree[0], topThree[2]];
    }

    podiumRow.innerHTML = order.map(entry => {
      const originalRank = topThree.indexOf(entry); // 0,1,2
      return `
        <div class="podium-card ${rankClass[originalRank]}" aria-label="Rank ${originalRank + 1}: ${escapeHtml(entry.nickname)}">
          <span class="podium-medal" aria-hidden="true">${medals[originalRank]}</span>
          <div class="podium-name">${escapeHtml(entry.nickname)}</div>
          <div class="podium-subject">${escapeHtml(entry.subject || '')}</div>
          <div class="podium-score">${entry.score}/${entry.total || 10}</div>
          <div class="podium-pct">${entry.pct}%</div>
        </div>
      `;
    }).join('');
  }

  /* ── Full table ── */
  function renderTable(entries) {
    const rankLabels = ['top-1', 'top-2', 'top-3'];

    tableBody.innerHTML = entries.map((entry, i) => {
      const rank      = i + 1;
      const rankClass = rank <= 3 ? rankLabels[rank - 1] : '';
      const grade     = getGrade(entry.pct);
      const pctPill   = `<span class="pct-pill ${grade}">${entry.pct}%</span>`;

      return `
        <tr>
          <td class="lb-rank ${rankClass}" aria-label="Rank ${rank}">
            ${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}
          </td>
          <td class="lb-nick">${escapeHtml(entry.nickname)}</td>
          <td>${escapeHtml(entry.subject || 'All')}</td>
          <td class="lb-score">${entry.score}/${entry.total || 10}</td>
          <td class="lb-pct">${pctPill}</td>
          <td style="color:var(--muted); font-size:.8rem;">${formatDate(entry.date || entry.createdAt)}</td>
        </tr>
      `;
    }).join('');
  }

  /* ── Filter change ── */
  subjectFilter.addEventListener('change', () => {
    loadLeaderboard();
  });

  /* ── Initial load ── */
  await loadLeaderboard();
})();
