/* ============================================================
   ExamReady Nigeria — quiz.js
   Practice mode: one question at a time, instant feedback,
   explanation, final score card → redirect to results.html
   ============================================================ */

'use strict';

(async function initQuiz() {
  /* ── DOM refs ── */
  const loadingEl       = document.getElementById('loadingState');
  const errorEl         = document.getElementById('errorState');
  const errorMsgEl      = document.getElementById('errorMessage');
  const quizUI          = document.getElementById('quizUI');
  const subjectEmoji    = document.getElementById('subjectEmoji');
  const subjectNameEl   = document.getElementById('subjectName');
  const scoreCounterEl  = document.getElementById('scoreCounter');
  const progressTextEl  = document.getElementById('progressText');
  const progressPctEl   = document.getElementById('progressPct');
  const progressFillEl  = document.getElementById('progressFill');
  const progressBarEl   = document.getElementById('progressBar');
  const qTagEl          = document.getElementById('questionTag');
  const qTextEl         = document.getElementById('questionText');
  const optionsListEl   = document.getElementById('optionsList');
  const explBoxEl       = document.getElementById('explanationBox');
  const explTextEl      = document.getElementById('explanationText');
  const nextBtnEl       = document.getElementById('nextBtn');
  const finalCardEl     = document.getElementById('finalScoreCard');
  const questionCardEl  = document.getElementById('questionCard');
  const finalFractionEl = document.getElementById('finalScoreFraction');
  const finalPctEl      = document.getElementById('finalScorePct');
  const finalGradeEl    = document.getElementById('finalGradeBadge');
  const finalMsgEl      = document.getElementById('finalMessage');
  const viewResultsBtn  = document.getElementById('viewResultsBtn');
  const tryAgainBtn     = document.getElementById('tryAgainBtn');

  /* ── State ── */
  const subject = getQueryParam('subject') || 'Mathematics';
  let questions    = [];
  let currentIndex = 0;
  let score        = 0;
  const userAnswers = []; // { questionId, chosen, correct, isCorrect }

  /* ── Set subject display ── */
  const emoji = SUBJECT_EMOJIS[subject] || '📚';
  subjectEmoji.textContent = emoji;
  subjectNameEl.textContent = subject;
  document.title = `${subject} Practice — ExamReady Nigeria`;

  /* ── Fetch questions ── */
  let fetchedQuestions;
  try {
    const res = await fetch(`/api/questions?subject=${encodeURIComponent(subject)}`);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    fetchedQuestions = await res.json();
    if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {
      throw new Error('No questions returned for this subject.');
    }
  } catch (err) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    errorMsgEl.textContent = err.message || 'Failed to load questions.';
    return;
  }

  questions = fetchedQuestions;
  loadingEl.classList.add('hidden');
  quizUI.classList.remove('hidden');

  /* ── Render a question ── */
  function renderQuestion(index) {
    const q = questions[index];
    const total = questions.length;
    const pct = Math.round((index / total) * 100);

    // Progress
    progressTextEl.textContent = `Question ${index + 1} of ${total}`;
    progressPctEl.textContent  = `${pct}%`;
    progressFillEl.style.width = `${pct}%`;
    progressBarEl.setAttribute('aria-valuenow', pct);

    // Question
    qTagEl.textContent  = `Question ${index + 1}`;
    qTextEl.textContent = q.question;

    // Hide explanation
    explBoxEl.classList.remove('visible');
    explTextEl.textContent = '';

    // Hide next button
    nextBtnEl.classList.add('hidden');

    // Build options
    optionsListEl.innerHTML = '';
    const options = Array.isArray(q.options) ? q.options : [q.optionA, q.optionB, q.optionC, q.optionD];
    options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('type', 'button');
      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${optionLetter(i)}</span>
        <span class="option-text">${escapeHtml(opt)}</span>
      `;
      btn.addEventListener('click', () => handleAnswer(btn, i, options, q));
      optionsListEl.appendChild(btn);
    });
  }

  /* ── Handle answer selection ── */
  function handleAnswer(selectedBtn, selectedIndex, options, q) {
    // Disable all options
    const allBtns = optionsListEl.querySelectorAll('.option-btn');
    allBtns.forEach(b => { b.disabled = true; });

    // Determine correct index
    const correctIndex = getCorrectIndex(q, options);
    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      score++;
      scoreCounterEl.textContent = `Score: ${score}`;
    } else {
      selectedBtn.classList.add('wrong');
      if (correctIndex >= 0 && correctIndex < allBtns.length) {
        allBtns[correctIndex].classList.add('correct');
      }
    }

    // Record answer
    userAnswers.push({
      questionId: q._id || q.id || currentIndex,
      question:   q.question,
      options:    options,
      chosen:     options[selectedIndex],
      chosenIndex: selectedIndex,
      correct:    options[correctIndex] || q.answer,
      correctIndex: correctIndex,
      isCorrect:  isCorrect,
      explanation: q.explanation || '',
    });

    // Show explanation
    if (q.explanation) {
      explTextEl.textContent = q.explanation;
      explBoxEl.classList.add('visible');
    }

    // Show next / finish button
    nextBtnEl.classList.remove('hidden');
    if (currentIndex + 1 >= questions.length) {
      nextBtnEl.textContent = 'View Results';
    } else {
      nextBtnEl.textContent = 'Next Question →';
    }
  }

  /* ── Derive correct option index ── */
  function getCorrectIndex(q, options) {
    // API may return `answer` (string) or `correctIndex` (number) or `correct` (letter A-D)
    if (typeof q.correctIndex === 'number') return q.correctIndex;

    if (q.correct && typeof q.correct === 'string') {
      const letter = q.correct.trim().toUpperCase();
      const map = { A:0, B:1, C:2, D:3 };
      if (map[letter] !== undefined) return map[letter];
    }

    if (q.answer && typeof q.answer === 'string') {
      const idx = options.findIndex(o =>
        o && o.trim().toLowerCase() === q.answer.trim().toLowerCase()
      );
      if (idx !== -1) return idx;
      // Maybe answer is A/B/C/D
      const letter = q.answer.trim().toUpperCase();
      const map = { A:0, B:1, C:2, D:3 };
      if (map[letter] !== undefined) return map[letter];
    }

    return 0; // fallback to first option
  }

  /* ── Next button ── */
  nextBtnEl.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= questions.length) {
      showFinalScore();
    } else {
      renderQuestion(currentIndex);
    }
  });

  /* ── Show final score ── */
  function showFinalScore() {
    questionCardEl.classList.add('hidden');
    nextBtnEl.classList.add('hidden');
    explBoxEl.classList.remove('visible');

    const total = questions.length;
    const pct   = Math.round((score / total) * 100);
    const grade = getGrade(pct);

    // Store in sessionStorage for results.html
    const resultData = {
      subject,
      mode:    'practice',
      score,
      total,
      pct,
      grade,
      answers: userAnswers,
      date:    new Date().toISOString(),
    };
    sessionStorage.setItem('examResult', JSON.stringify(resultData));

    // Update final card
    finalFractionEl.textContent = `${score}/${total}`;
    finalPctEl.textContent      = `${pct}%`;
    finalGradeEl.textContent    = `Grade: ${grade}`;
    finalGradeEl.className      = `grade-badge grade-${grade}`;
    finalMsgEl.textContent      = getGradeMessage(grade);

    // Update score circle border colour
    const circleEl = finalCardEl.querySelector('.score-circle');
    if (circleEl) {
      circleEl.className = `score-circle grade-${grade}`;
    }

    // Update progress to 100%
    progressFillEl.style.width = '100%';
    progressPctEl.textContent  = '100%';
    progressTextEl.textContent = `Completed — ${total} of ${total}`;

    finalCardEl.classList.remove('hidden');
    finalCardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── View results button ── */
  viewResultsBtn.addEventListener('click', () => {
    window.location.href = 'results.html';
  });

  /* ── Try again button ── */
  tryAgainBtn.addEventListener('click', () => {
    window.location.reload();
  });

  /* ── Kick off ── */
  renderQuestion(0);
  scoreCounterEl.textContent = 'Score: 0';
})();
