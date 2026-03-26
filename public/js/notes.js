/* ============================================================
   ExamReady Nigeria — notes.js
   Tab switching + level filter for pre-rendered notes panels.
   Content is embedded in notes.html — this file only handles UX.
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ── Tab switching ── */
  const tabs   = document.querySelectorAll('.notes-tab[data-panel]');
  const panels = document.querySelectorAll('.notes-panel');

  function activateTab(tab) {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.dataset.panel);
    if (panel) {
      panel.classList.add('active');
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  /* ── Open subject from URL ?subject=Mathematics ── */
  if (typeof getQueryParam === 'function') {
    const urlSubject = getQueryParam('subject');
    if (urlSubject) {
      const match = Array.from(tabs).find(t =>
        t.textContent.toLowerCase().includes(urlSubject.toLowerCase())
      );
      if (match) activateTab(match);
    }
  }

  /* ── Level filter (per panel) ── */
  document.querySelectorAll('.notes-filter').forEach(filter => {
    const panel = filter.closest('.notes-panel');
    if (!panel) return;
    filter.querySelectorAll('.level-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filter.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const level = btn.dataset.level;
        panel.querySelectorAll('.topic-card').forEach(card => {
          card.classList.toggle('level-hidden', level !== 'all' && card.dataset.level !== level);
        });
      });
    });
  });

});
