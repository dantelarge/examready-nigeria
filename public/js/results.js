/* ============================================================
   ExamReady Nigeria — results.js
   Reads exam result from sessionStorage, renders score circle,
   grade, motivational message, full review, leaderboard submit
   ============================================================ */

'use strict';

(function initResults() {
  /* ── DOM refs ── */
  const noResultsEl    = document.getElementById('noResultsState');
  const resultsContent = document.getElementById('resultsContent');
  const scoreCircleEl  = document.getElementById('resultScoreCircle');
  const scoreFractionEl= document.getElementById('resultScoreFraction');
  const scorePctEl     = document.getElementById('resultScorePct');
  const gradeBadgeEl   = document.getElementById('resultGradeBadge');
  const subjectNameEl  = document.getElementById('resultSubjectName');
  const examTypeEl     = document.getElementById('resultExamType');
  const messageEl      = document.getElementById('resultMessage');
  const tryAgainBtn    = document.getElementById('tryAgainBtn');
  const nicknameInput  = document.getElementById('nicknameInput');
  const submitLbBtn    = document.getElementById('submitLbBtn');
  const submitFeedback = document.getElementById('submitFeedback');
  const reviewList     = document.getElementById('reviewList');
  const reviewSummary  = document.getElementById('reviewSummaryTag');

  /* ── Load result from sessionStorage ── */
  const raw = sessionStorage.getItem('examResult');
  if (!raw) {
    noResultsEl.classList.remove('hidden');
    return;
  }

  let result;
  try {
    result = JSON.parse(raw);
  } catch {
    noResultsEl.classList.remove('hidden');
    return;
  }

  if (!result || typeof result.score !== 'number') {
    noResultsEl.classList.remove('hidden');
    return;
  }

  /* ── Save to local progress history ── */
  saveToHistory(result);

  /* ── Show results ── */
  resultsContent.classList.remove('hidden');

  const { subject, mode, score, total, pct, grade, answers, date } = result;

  // Score circle
  scoreFractionEl.textContent = `${score}/${total}`;
  scorePctEl.textContent      = `${pct}%`;
  scoreCircleEl.className     = `score-circle grade-${grade}`;

  // Grade badge
  gradeBadgeEl.textContent = `Grade ${grade}`;
  gradeBadgeEl.className   = `grade-badge grade-${grade}`;

  // Subject & mode
  const emoji = SUBJECT_EMOJIS[subject] || '📚';
  subjectNameEl.textContent = `${emoji} ${subject}`;
  examTypeEl.textContent    = mode === 'mock' ? 'Mock Exam' : 'Practice Mode';
  if (date) examTypeEl.textContent += ` — ${formatDate(date)}`;

  // Motivational message
  messageEl.textContent = getGradeMessage(grade);

  // Page title
  document.title = `Results: ${score}/${total} (${pct}%) — ExamReady Nigeria`;

  // Review summary tag
  if (Array.isArray(answers)) {
    const correct   = answers.filter(a => a.isCorrect).length;
    const incorrect = answers.length - correct;
    reviewSummary.textContent = `${correct} correct, ${incorrect} incorrect`;
  }

  /* ── PDF download button ── */
  const pdfBtn = document.getElementById('downloadResultsPdfBtn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      const pdfResult = {
        subject,
        mode: mode === 'mock' ? 'Mock Exam' : 'Practice',
        score,
        total,
        pct,
        grade,
        date: result.date,
        questions: (answers || []).map(a => ({
          question:    a.question   || '',
          options:     a.options    || {},
          answer:      a.answer     || '',
          chosen:      a.chosen     || 'Skipped',
          correct:     a.correct    || false,
          explanation: a.explanation|| '',
        })),
      };
      downloadResultsPDF(pdfResult);
    });
  }

  /* ── Try Again button ── */
  tryAgainBtn.addEventListener('click', () => {
    if (mode === 'mock') {
      window.location.href = `exam.html?subject=${encodeURIComponent(subject)}`;
    } else {
      window.location.href = `quiz.html?subject=${encodeURIComponent(subject)}`;
    }
  });

  /* ── Render full question review ── */
  if (Array.isArray(answers) && answers.length > 0) {
    renderReview(answers);
  } else {
    reviewList.innerHTML = '<div class="lb-empty" style="padding:32px;"><p>No detailed review available.</p></div>';
  }

  function renderReview(answerList) {
    reviewList.innerHTML = answerList.map((a, i) => {
      const isCorrect = a.isCorrect;
      const icon = isCorrect ? '✅' : '❌';
      const chosenDisplay = a.chosen || '<em style="color:var(--muted)">Not answered</em>';
      const chosenClass = a.chosen
        ? (isCorrect ? 'correct' : 'wrong')
        : '';

      return `
        <div class="review-item">
          <div class="review-item-q">
            <span class="q-num-badge">Q${i + 1} ${icon}</span>
            <span class="q-text">${escapeHtml(a.question)}</span>
          </div>
          <div class="review-answers">
            <div class="review-row">
              <span class="review-row-label">Your answer:</span>
              <span class="review-row-val ${chosenClass}">${a.chosen ? escapeHtml(a.chosen) : '<em>Not answered</em>'}</span>
            </div>
            ${!isCorrect ? `
            <div class="review-row">
              <span class="review-row-label">Correct answer:</span>
              <span class="review-row-val correct-answer">${escapeHtml(a.correct)}</span>
            </div>` : ''}
            ${a.explanation ? `
            <div class="review-row" style="align-items:flex-start;">
              <span class="review-row-label">Explanation:</span>
              <span class="review-explanation">${escapeHtml(a.explanation)}</span>
            </div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ── Leaderboard submission ── */
  submitLbBtn.addEventListener('click', async () => {
    const nickname = nicknameInput.value.trim();
    if (!nickname) {
      nicknameInput.focus();
      showFeedback('Please enter a nickname before submitting.', 'error');
      return;
    }
    if (nickname.length < 2) {
      showFeedback('Nickname must be at least 2 characters.', 'error');
      return;
    }

    submitLbBtn.disabled   = true;
    submitLbBtn.textContent = 'Submitting…';

    try {
      const payload = {
        nickname,
        subject,
        score,
        total,
        pct,
        grade,
        mode: mode || 'practice',
        date: date || new Date().toISOString(),
      };

      const res = await fetch('/api/leaderboard', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error: ${res.status}`);
      }

      showFeedback(`Score submitted! Good luck, ${escapeHtml(nickname)}! 🎉`, 'success');
      submitLbBtn.textContent = 'Submitted ✓';
      nicknameInput.disabled  = true;

      // Slight delay then go to leaderboard
      setTimeout(() => {
        window.location.href = `leaderboard.html?subject=${encodeURIComponent(subject)}`;
      }, 2200);

    } catch (err) {
      submitLbBtn.disabled    = false;
      submitLbBtn.textContent = 'Submit Score';
      showFeedback(err.message || 'Failed to submit. Please try again.', 'error');
    }
  });

  function showFeedback(message, type) {
    submitFeedback.textContent = message;
    submitFeedback.className   = `submit-feedback ${type}`;
  }

  /* ── Allow Enter key in nickname field ── */
  nicknameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitLbBtn.click();
  });
})();
