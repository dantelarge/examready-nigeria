/* ============================================================
   ExamReady Nigeria — exam.js
   Timed mock exam: 45-minute countdown, question navigator,
   flag support, no instant feedback, submit → results.html
   ============================================================ */

'use strict';

(async function initExam() {
  /* ── Constants ── */
  const TOTAL_TIME_SECS = 45 * 60; // 45 minutes
  const EXAM_COUNT = 10;            // demo: 10 questions

  /* ── DOM refs ── */
  const loadingEl       = document.getElementById('loadingState');
  const errorEl         = document.getElementById('errorState');
  const errorMsgEl      = document.getElementById('errorMessage');
  const examUI          = document.getElementById('examUI');
  const examSubjectTitle = document.getElementById('examSubjectTitle');
  const examSubjectPill = document.getElementById('examSubjectPill');
  const examProgressFill= document.getElementById('examProgressFill');
  const examProgressBar = document.getElementById('examProgressBar');
  const examProgressLbl = document.getElementById('examProgressLabel');
  const examQTag        = document.getElementById('examQTag');
  const examQText       = document.getElementById('examQText');
  const examOptsList    = document.getElementById('examOptionsList');
  const prevBtn         = document.getElementById('prevBtn');
  const nextExamBtn     = document.getElementById('nextExamBtn');
  const flagBtn         = document.getElementById('flagBtn');
  const submitBtn       = document.getElementById('submitExamBtn');
  const timerDisplay    = document.getElementById('timerDisplay');
  const navGrid         = document.getElementById('navGrid');
  const submitModal     = document.getElementById('submitModal');
  const cancelSubmitBtn = document.getElementById('cancelSubmitBtn');
  const confirmSubmitBtn= document.getElementById('confirmSubmitBtn');
  const modalAnsweredCount = document.getElementById('modalAnsweredCount');

  /* ── State ── */
  const subject    = getQueryParam('subject') || 'Mathematics';
  let questions    = [];
  let currentIndex = 0;
  let timerInterval;
  let secondsLeft  = TOTAL_TIME_SECS;

  // Per-question state: answered index, flagged
  const answered = {};  // { [qIndex]: selectedOptionIndex }
  const flagged  = new Set();

  /* ── Subject display ── */
  const emoji = SUBJECT_EMOJIS[subject] || '📚';
  examSubjectTitle.textContent = `${emoji} Mock Exam`;
  examSubjectPill.textContent  = subject;
  document.title = `Mock Exam: ${subject} — ExamReady Nigeria`;

  /* ── Fetch questions ── */
  let fetchedQuestions;
  try {
    // Try random endpoint first, fall back to regular questions endpoint
    let res = await fetch(
      `/api/questions/random?subject=${encodeURIComponent(subject)}&count=${EXAM_COUNT}`
    );
    if (!res.ok) {
      // Fallback: use standard questions endpoint
      res = await fetch(`/api/questions?subject=${encodeURIComponent(subject)}`);
    }
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    fetchedQuestions = await res.json();
    if (!Array.isArray(fetchedQuestions) || fetchedQuestions.length === 0) {
      throw new Error('No questions available for this subject.');
    }
  } catch (err) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    errorMsgEl.textContent = err.message || 'Failed to load exam questions.';
    return;
  }

  // Limit to EXAM_COUNT and shuffle
  questions = shuffleArray(fetchedQuestions).slice(0, EXAM_COUNT);

  loadingEl.classList.add('hidden');
  examUI.classList.remove('hidden');

  /* ── Build navigator grid ── */
  function buildNavGrid() {
    navGrid.innerHTML = '';
    questions.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-btn';
      btn.textContent = i + 1;
      btn.setAttribute('aria-label', `Question ${i + 1}`);
      btn.addEventListener('click', () => goToQuestion(i));
      navGrid.appendChild(btn);
    });
  }

  /* ── Update navigator grid styles ── */
  function updateNavGrid() {
    const buttons = navGrid.querySelectorAll('.nav-btn');
    buttons.forEach((btn, i) => {
      btn.className = 'nav-btn';
      if (i === currentIndex) btn.classList.add('current');
      if (answered[i] !== undefined) btn.classList.add('answered');
      if (flagged.has(i)) btn.classList.add('flagged');
    });
  }

  /* ── Render a question ── */
  function renderQuestion(index) {
    const q = questions[index];
    const total = questions.length;

    // Progress
    const pct = Math.round(((index) / total) * 100);
    examProgressFill.style.width = `${pct}%`;
    examProgressBar.setAttribute('aria-valuenow', pct);
    examProgressLbl.textContent = `Question ${index + 1} of ${total}`;

    // Question
    examQTag.textContent  = `Question ${index + 1}`;
    examQText.textContent = q.question;

    // Options
    const options = Array.isArray(q.options) ? q.options : [q.optionA, q.optionB, q.optionC, q.optionD];
    examOptsList.innerHTML = '';
    options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.setAttribute('role', 'listitem');
      const isSelected = answered[index] === i;
      if (isSelected) btn.classList.add('selected-exam');
      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${optionLetter(i)}</span>
        <span class="option-text">${escapeHtml(opt)}</span>
      `;
      btn.addEventListener('click', () => selectOption(index, i, options, q));
      examOptsList.appendChild(btn);
    });

    // Flag button
    const isFlagged = flagged.has(index);
    flagBtn.classList.toggle('flagged', isFlagged);
    flagBtn.setAttribute('aria-pressed', isFlagged);
    flagBtn.textContent = isFlagged ? '🚩 Flagged' : '🚩 Flag';

    // Prev/next buttons
    prevBtn.disabled    = index === 0;
    nextExamBtn.textContent = index === total - 1 ? 'Finish →' : 'Next →';

    updateNavGrid();
  }

  /* ── Select an option (no feedback) ── */
  function selectOption(qIndex, optIndex) {
    answered[qIndex] = optIndex;

    // Update UI immediately
    const optBtns = examOptsList.querySelectorAll('.option-btn');
    optBtns.forEach((btn, i) => {
      btn.classList.toggle('selected-exam', i === optIndex);
    });

    updateNavGrid();
  }

  /* ── Navigate ── */
  function goToQuestion(index) {
    currentIndex = index;
    renderQuestion(index);
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) goToQuestion(currentIndex - 1);
  });

  nextExamBtn.addEventListener('click', () => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    } else {
      openSubmitModal();
    }
  });

  /* ── Flag ── */
  flagBtn.addEventListener('click', () => {
    if (flagged.has(currentIndex)) {
      flagged.delete(currentIndex);
      flagBtn.classList.remove('flagged');
      flagBtn.setAttribute('aria-pressed', 'false');
      flagBtn.textContent = '🚩 Flag';
    } else {
      flagged.add(currentIndex);
      flagBtn.classList.add('flagged');
      flagBtn.setAttribute('aria-pressed', 'true');
      flagBtn.textContent = '🚩 Flagged';
    }
    updateNavGrid();
  });

  /* ── Countdown timer ── */
  function startTimer() {
    updateTimerDisplay(secondsLeft);
    timerInterval = setInterval(() => {
      secondsLeft--;
      updateTimerDisplay(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        showToast('Time is up! Submitting your exam…', 'error', 4000);
        setTimeout(submitExam, 1500);
      }
    }, 1000);
  }

  function updateTimerDisplay(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;

    timerDisplay.className = 'timer-value';
    if (secs <= 300) timerDisplay.classList.add('danger');
    else if (secs <= 600) timerDisplay.classList.add('warning');
  }

  /* ── Submit modal ── */
  function openSubmitModal() {
    const answeredCount = Object.keys(answered).length;
    const total = questions.length;
    const unanswered = total - answeredCount;
    modalAnsweredCount.textContent =
      `Answered: ${answeredCount}/${total}` +
      (unanswered > 0 ? ` (${unanswered} unanswered)` : '');
    submitModal.style.display = 'flex';
    confirmSubmitBtn.focus();
  }

  submitBtn.addEventListener('click', openSubmitModal);
  cancelSubmitBtn.addEventListener('click', () => { submitModal.style.display = 'none'; });

  confirmSubmitBtn.addEventListener('click', () => {
    submitModal.style.display = 'none';
    submitExam();
  });

  // Close modal on backdrop click
  submitModal.addEventListener('click', (e) => {
    if (e.target === submitModal) submitModal.style.display = 'none';
  });

  /* ── Submit exam ── */
  function submitExam() {
    clearInterval(timerInterval);

    const total = questions.length;
    let score = 0;

    const userAnswers = questions.map((q, i) => {
      const options = Array.isArray(q.options) ? q.options : [q.optionA, q.optionB, q.optionC, q.optionD];
      const chosenIndex = answered[i] !== undefined ? answered[i] : null;
      const correctIndex = getCorrectIndex(q, options);
      const isCorrect = chosenIndex !== null && chosenIndex === correctIndex;
      if (isCorrect) score++;

      return {
        questionId:  q._id || q.id || i,
        question:    q.question,
        options,
        chosen:      chosenIndex !== null ? options[chosenIndex] : null,
        chosenIndex,
        correct:     options[correctIndex] || q.answer,
        correctIndex,
        isCorrect,
        explanation: q.explanation || '',
      };
    });

    const pct   = Math.round((score / total) * 100);
    const grade = getGrade(pct);
    const timeUsed = TOTAL_TIME_SECS - secondsLeft;

    const resultData = {
      subject,
      mode:    'mock',
      score,
      total,
      pct,
      grade,
      timeUsed,
      answers: userAnswers,
      date:    new Date().toISOString(),
    };

    sessionStorage.setItem('examResult', JSON.stringify(resultData));
    window.location.href = 'results.html';
  }

  /* ── Derive correct option index ── */
  function getCorrectIndex(q, options) {
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
      const letter = q.answer.trim().toUpperCase();
      const map = { A:0, B:1, C:2, D:3 };
      if (map[letter] !== undefined) return map[letter];
    }

    return 0;
  }

  /* ── Init ── */
  buildNavGrid();
  renderQuestion(0);
  startTimer();
})();
