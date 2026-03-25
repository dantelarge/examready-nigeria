/* ============================================================
   ExamReady Nigeria — Service Worker
   Cache-first strategy for offline support + installability
   ============================================================ */

const CACHE = 'examready-v3';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/subjects.html',
  '/quiz.html',
  '/exam.html',
  '/results.html',
  '/leaderboard.html',
  '/notes.html',
  '/progress.html',
  '/css/style.css',
  '/js/main.js',
  '/js/quiz.js',
  '/js/exam.js',
  '/js/results.js',
  '/js/leaderboard.js',
  '/js/notes.js',
  '/js/progress.js',
  '/manifest.json',
];

/* ── Install: cache all static assets ── */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

/* ── Activate: delete old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: network-first for API, cache-first for assets ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always hit network for API calls (leaderboard, questions)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'Offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
