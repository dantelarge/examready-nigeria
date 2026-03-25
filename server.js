require('dotenv').config();
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const https   = require('https');

const app  = express();
const PORT = process.env.PORT || 3001;

const QUESTIONS_FILE   = path.join(__dirname, 'data', 'questions.json');
const LEADERBOARD_FILE = path.join(__dirname, 'data', 'leaderboard.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders(res, filePath) {
    // Service worker must be served from root scope with correct MIME
    if (filePath.endsWith('sw.js')) {
      res.setHeader('Service-Worker-Allowed', '/');
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

function readJSON(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

// ── Questions ──────────────────────────────────────────────────────────────
// GET /api/questions?subject=Mathematics
app.get('/api/questions', (req, res) => {
  const all = readJSON(QUESTIONS_FILE);
  const { subject } = req.query;
  const filtered = subject ? all.filter(q => q.subject === subject) : all;
  res.json(filtered);
});

// GET /api/questions/random?subject=Mathematics&count=40
app.get('/api/questions/random', (req, res) => {
  const all = readJSON(QUESTIONS_FILE);
  const subject = req.query.subject;
  const count   = parseInt(req.query.count) || 40;
  let pool = subject ? all.filter(q => q.subject === subject) : all;
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, count);
  res.json(shuffled);
});

// GET /api/subjects — list all subjects with question counts
app.get('/api/subjects', (req, res) => {
  const all = readJSON(QUESTIONS_FILE);
  const map = {};
  all.forEach(q => { map[q.subject] = (map[q.subject] || 0) + 1; });
  const subjects = Object.entries(map).map(([name, count]) => ({ name, count }));
  res.json(subjects);
});

// ── Leaderboard ────────────────────────────────────────────────────────────
// GET /api/leaderboard?subject=Mathematics
app.get('/api/leaderboard', (req, res) => {
  const all = readJSON(LEADERBOARD_FILE);
  const { subject } = req.query;
  let filtered = subject ? all.filter(e => e.subject === subject) : all;
  filtered = filtered.sort((a, b) => b.score - a.score).slice(0, 20);
  res.json(filtered);
});

// POST /api/leaderboard  { nickname, subject, score, total }
app.post('/api/leaderboard', (req, res) => {
  const { nickname, subject, score, total } = req.body;
  if (!nickname || !subject || score === undefined || !total) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const all = readJSON(LEADERBOARD_FILE);
  const entry = {
    id:       Date.now().toString(),
    nickname: nickname.trim().slice(0, 20),
    subject,
    score,
    total,
    percent:  Math.round((score / total) * 100),
    date:     new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
  };
  all.push(entry);
  writeJSON(LEADERBOARD_FILE, all);
  res.json(entry);
});

// ── ALOC Online Question Sync ──────────────────────────────────────────────
// Fetches real JAMB/WAEC past questions from questions.aloc.com.ng
// Set ALOC_TOKEN in your .env file (get free token at questions.aloc.com.ng)

const ALOC_TOKEN  = process.env.ALOC_TOKEN || '';
const ALOC_BASE   = 'https://questions.aloc.com.ng/api/v2';

// Map our subject names → ALOC subject slugs
const ALOC_SUBJECT_MAP = {
  'Mathematics':          'mathematics',
  'English Language':     'english',
  'Physics':              'physics',
  'Chemistry':            'chemistry',
  'Biology':              'biology',
  'Government':           'government',
  'Economics':            'economics',
  'Literature in English':'english-literature',
  'Geography':            'geography',
  'Commerce':             'commerce',
};

function alocFetch(urlPath, token) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(ALOC_BASE + urlPath);
    const reqOpts = {
      hostname: fullUrl.hostname,
      path:     fullUrl.pathname + fullUrl.search,
      method:   'GET',
      headers: {
        'Accept':      'application/json',
        'AccessToken': token,
        'User-Agent':  'ExamReadyNigeria/1.0',
      },
      timeout: 15000,
    };
    const req = https.request(reqOpts, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          // ALOC returns { status: 406, error: "..." } for bad tokens
          if (parsed.status === 406 || parsed.error) {
            reject(new Error('ALOC_AUTH_ERROR: ' + (parsed.error || 'Token rejected')));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error('Invalid JSON from ALOC: ' + body.slice(0, 150)));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
    req.end();
  });
}

function mapAlocQuestion(q, subjectName) {
  // ALOC shape: { id, question, option:{ a,b,c,d }, answer, section, solution }
  if (!q || !q.question) return null;
  const opts = q.option || q.options || {};
  const answer = String(q.answer || '').trim().toUpperCase();
  // ALOC sometimes returns answer as full text like "640" not "A" — skip those
  if (!['A','B','C','D'].includes(answer)) return null;
  return {
    id:          'aloc_' + q.id,
    subject:     subjectName,
    year:        q.section ? 'JAMB ' + q.section : 'JAMB Past',
    question:    String(q.question).trim(),
    options: {
      A: String(opts.a || opts.A || '').trim(),
      B: String(opts.b || opts.B || '').trim(),
      C: String(opts.c || opts.C || '').trim(),
      D: String(opts.d || opts.D || '').trim(),
    },
    answer,
    explanation: String(q.solution || q.explanation || '').trim(),
  };
}

// POST /api/sync-questions  { token?: string }
app.post('/api/sync-questions', async (req, res) => {
  const token = (req.body && req.body.token) || ALOC_TOKEN;
  if (!token) {
    return res.status(400).json({
      error: 'ALOC token required.',
      hint:  'Get your free token at https://questions.aloc.com.ng — sign up, verify email, then copy your token.'
    });
  }

  // Validate token with a quick test request before doing full sync
  try {
    await alocFetch('/m?subject=mathematics&type=utme', token);
  } catch (err) {
    if (err.message.startsWith('ALOC_AUTH_ERROR')) {
      return res.status(401).json({
        error: 'Token not activated. Please verify your email at questions.aloc.com.ng then try again.',
        steps: [
          '1. Go to https://questions.aloc.com.ng',
          '2. Log into your account',
          '3. Check your email inbox for a verification link and click it',
          '4. Come back here and sync again'
        ]
      });
    }
    return res.status(502).json({ error: 'Could not reach ALOC API: ' + err.message });
  }

  const results = { synced: 0, skipped: 0, errors: [] };
  let existing  = readJSON(QUESTIONS_FILE);
  const existingAlocIds = new Set(
    existing.filter(q => String(q.id).startsWith('aloc_')).map(q => q.id)
  );

  // Fetch both UTME and WASSCE question sets for more coverage
  const examTypes = ['utme', 'wassce'];

  for (const [subjectName, alocSlug] of Object.entries(ALOC_SUBJECT_MAP)) {
    for (const examType of examTypes) {
      try {
        const data = await alocFetch(
          `/m?subject=${encodeURIComponent(alocSlug)}&type=${examType}`, token
        );
        const questions = Array.isArray(data)      ? data
                        : Array.isArray(data.data) ? data.data
                        : [];

        questions.forEach(raw => {
          const mapped = mapAlocQuestion(raw, subjectName);
          if (!mapped) return;
          if (existingAlocIds.has(mapped.id)) { results.skipped++; return; }
          existing.push(mapped);
          existingAlocIds.add(mapped.id);
          results.synced++;
        });

        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        if (!err.message.startsWith('ALOC_AUTH_ERROR')) {
          results.errors.push({ subject: subjectName, type: examType, error: err.message });
        }
      }
    }
  }

  writeJSON(QUESTIONS_FILE, existing);
  res.json({
    message: `Sync complete. ${results.synced} new questions added.`,
    synced:  results.synced,
    skipped: results.skipped,
    total:   existing.length,
    errors:  results.errors,
  });
});

// GET /api/sync-status — shows question counts per subject
app.get('/api/sync-status', (req, res) => {
  const all = readJSON(QUESTIONS_FILE);
  const bySubject = {};
  all.forEach(q => {
    if (!bySubject[q.subject]) bySubject[q.subject] = { local: 0, aloc: 0 };
    if (String(q.id).startsWith('aloc_')) bySubject[q.subject].aloc++;
    else bySubject[q.subject].local++;
  });
  res.json({ total: all.length, bySubject });
});

app.listen(PORT, () => {
  console.log(`\n✅ ExamReady Nigeria is running!`);
  console.log(`   http://localhost:${PORT}\n`);
  if (!ALOC_TOKEN) {
    console.log(`   ℹ️  To sync real JAMB/WAEC questions, get a free token at:`);
    console.log(`      https://questions.aloc.com.ng`);
    console.log(`      Then add ALOC_TOKEN=ALOC-yourtoken to your .env file\n`);
  }

  // Keep-alive: ping self every 14 min to prevent Render free-tier sleep
  const appUrl = process.env.RENDER_EXTERNAL_URL;
  if (appUrl) {
    setInterval(() => {
      https.get(appUrl + '/api/subjects', res => {
        console.log(`[keep-alive] ping OK (${res.statusCode})`);
      }).on('error', err => {
        console.error('[keep-alive] ping failed:', err.message);
      });
    }, 14 * 60 * 1000);
    console.log(`   🔄 Keep-alive enabled → pinging every 14 min\n`);
  }
});
