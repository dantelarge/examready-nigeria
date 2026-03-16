const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3001;

const QUESTIONS_FILE   = path.join(__dirname, 'data', 'questions.json');
const LEADERBOARD_FILE = path.join(__dirname, 'data', 'leaderboard.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
  console.log(`\n✅ ExamReady Nigeria is running!`);
  console.log(`   http://localhost:${PORT}\n`);
});
