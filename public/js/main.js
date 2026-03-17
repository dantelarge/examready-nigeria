/* ============================================================
   ExamReady Nigeria — main.js
   Shared utilities, constants, and helpers used across all pages
   ============================================================ */

'use strict';

/* ── 1. Subject list ──────────────────────────────────────── */
const SUBJECTS = [
  { name: 'Mathematics',          emoji: '🔢' },
  { name: 'English Language',     emoji: '📝' },
  { name: 'Physics',              emoji: '⚡' },
  { name: 'Chemistry',            emoji: '🧪' },
  { name: 'Biology',              emoji: '🌿' },
  { name: 'Government',           emoji: '🏛️' },
  { name: 'Economics',            emoji: '💹' },
  { name: 'Literature in English', emoji: '📖' },
  { name: 'Geography',            emoji: '🌍' },
  { name: 'Commerce',             emoji: '🏪' },
];

/* ── 2. Subject emoji lookup map ──────────────────────────── */
const SUBJECT_EMOJIS = Object.fromEntries(SUBJECTS.map(s => [s.name, s.emoji]));

/* ── 3. URL query param helper ────────────────────────────── */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

/* ── 4. Date formatter ────────────────────────────────────── */
function formatDate(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ── 5. Grade helper ──────────────────────────────────────── */
function getGrade(pct) {
  if (pct >= 80) return 'A';
  if (pct >= 60) return 'B';
  if (pct >= 45) return 'C';
  return 'F';
}

function getGradeMessage(grade) {
  const messages = {
    A: 'Excellent! You are well-prepared for JAMB & WAEC. Keep it up! 🎉',
    B: 'Good performance! A bit more practice and you will ace the exam. 💪',
    C: 'Fair attempt. Focus on your weak areas and try again. 📚',
    F: "Don't give up! Revise the topics and try again. You can do this! 🇳🇬",
  };
  return messages[grade] || messages.F;
}

/* ── 6. Toast notification ────────────────────────────────── */
function showToast(message, type = 'default', duration = 3500) {
  const existing = document.getElementById('globalToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'globalToast';
  toast.className = `toast${type === 'success' ? ' toast-success' : type === 'error' ? ' toast-error' : ''}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ── 7. Escape HTML (prevent XSS in dynamic content) ─────── */
function escapeHtml(str) {
  const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

/* ── 8. Shuffle array (Fisher-Yates) ─────────────────────── */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── 9. Build option letter label ─────────────────────────── */
function optionLetter(index) {
  return ['A', 'B', 'C', 'D'][index] || String(index + 1);
}

/* ── 10. Dark Mode ────────────────────────────────────────── */
(function initDarkMode() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function applyDarkToggle(btn) {
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function setupDarkToggle() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  applyDarkToggle(btn);
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyDarkToggle(btn);
  });
}

/* ── 11. Navbar scroll effect ────────────────────────────── */
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const update = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 12. PWA Service Worker ───────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Run setup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDarkToggle);
} else {
  setupDarkToggle();
}
