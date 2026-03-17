/* ============================================================
   ExamReady Nigeria — pdf-download.js
   Browser-based PDF generation using jsPDF (CDN loaded).
   Premium feature — always call gatePdfDownload() first.
   ============================================================ */

'use strict';

/* ── jsPDF loader ─────────────────────────────────────────── */
function _loadJsPDF() {
  return new Promise((resolve, reject) => {
    if (window.jspdf && window.jspdf.jsPDF) {
      resolve(window.jspdf.jsPDF);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload  = () => resolve(window.jspdf.jsPDF);
    script.onerror = () => reject(new Error('Failed to load jsPDF'));
    document.head.appendChild(script);
  });
}

/* ── Shared PDF helpers ───────────────────────────────────── */
function _addHeader(doc, title, subtitle) {
  const pageW = doc.internal.pageSize.getWidth();

  // Blue header bar
  doc.setFillColor(37, 99, 235); // --blue
  doc.rect(0, 0, pageW, 28, 'F');

  // Logo text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('ExamReady Nigeria', 14, 12);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 220, 255);
  doc.text('Nigeria\'s #1 Free JAMB & WAEC Exam Prep', 14, 20);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39);
  doc.text(title, 14, 42);

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(subtitle, 14, 52);
  }

  return subtitle ? 60 : 52; // return next Y position
}

function _addFooter(doc) {
  const pageW  = doc.internal.pageSize.getWidth();
  const pageH  = doc.internal.pageSize.getHeight();
  const pages  = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(229, 231, 235);
    doc.line(14, pageH - 16, pageW - 14, pageH - 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175);
    doc.text('ExamReady Nigeria  |  examreadynigeria.com', 14, pageH - 8);
    doc.text(`Page ${i} of ${pages}`, pageW - 14, pageH - 8, { align: 'right' });
  }
}

function _checkNewPage(doc, y, needed = 10) {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + needed > pageH - 24) {
    doc.addPage();
    return 16;
  }
  return y;
}

/* ──────────────────────────────────────────────────────────
   downloadNotesPDF(subject, topics)
   Generates a study-notes cheat-sheet PDF.

   @param subject  {string}  e.g. 'Mathematics'
   @param topics   {Array}   Array of { title, points: string[] }
   ──────────────────────────────────────────────────────────*/
async function downloadNotesPDF(subject, topics) {
  // Premium gate
  if (typeof gatePdfDownload === 'function' && !gatePdfDownload()) return;

  let JsPDF;
  try {
    JsPDF = await _loadJsPDF();
  } catch (e) {
    showToast('Could not load PDF engine. Check your internet connection.', 'error');
    return;
  }

  const doc    = new JsPDF({ unit: 'mm', format: 'a4' });
  const pageW  = doc.internal.pageSize.getWidth();
  const colW   = (pageW - 42) / 2; // two-column layout

  let y = _addHeader(
    doc,
    `${subject} — Study Notes`,
    `Key revision points for JAMB & WAEC  ·  Generated ${new Date().toLocaleDateString('en-GB')}`
  );

  y += 6;

  let col = 0; // 0 = left, 1 = right
  const colX = [14, 14 + colW + 14];

  topics.forEach((topic, ti) => {
    // Estimate card height
    const linesNeeded = topic.points.reduce((acc, p) => {
      return acc + doc.splitTextToSize(p, colW - 12).length;
    }, 0);
    const cardH = 10 + linesNeeded * 5 + 8;

    // If right column would overflow, move to next page left column
    let cx = colX[col];
    let cy = y;

    if (col === 0 && cy + cardH > doc.internal.pageSize.getHeight() - 24) {
      doc.addPage();
      cy = 16;
      y  = 16;
    } else if (col === 1 && cy + cardH > doc.internal.pageSize.getHeight() - 24) {
      doc.addPage();
      col = 0;
      cx  = colX[0];
      cy  = 16;
      y   = 16;
    }

    // Card background
    doc.setFillColor(239, 246, 255); // blue-light
    doc.roundedRect(cx, cy, colW, cardH, 2, 2, 'F');

    // Topic title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text(topic.title, cx + 5, cy + 7);

    // Points
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(55, 65, 81);

    let py = cy + 13;
    topic.points.forEach(point => {
      const lines = doc.splitTextToSize('→ ' + point, colW - 12);
      lines.forEach(line => {
        doc.text(line, cx + 5, py);
        py += 4.5;
      });
    });

    // Advance column / row
    if (col === 0) {
      col = 1;
    } else {
      col = 0;
      y  += cardH + 6;
    }

    // Sync y for right column start
    if (col === 1) {
      // right col starts at same y as left
    } else {
      // after right col renders, y was already advanced
    }
  });

  // If left col rendered last, advance y too
  if (col === 1) y += (topics[topics.length - 1]
    ? (10 + topics[topics.length - 1].points.length * 5 + 8 + 6)
    : 0);

  _addFooter(doc);
  doc.save(`ExamReady_${subject.replace(/\s+/g, '_')}_Study_Notes.pdf`);
  showToast('📄 PDF downloaded!', 'success');
}

/* ──────────────────────────────────────────────────────────
   downloadResultsPDF(result)
   Generates an exam results summary PDF.

   @param result {Object} {
     subject, mode, score, total, pct, grade,
     date, questions: [{ question, options, answer, chosen, correct, explanation }]
   }
   ──────────────────────────────────────────────────────────*/
async function downloadResultsPDF(result) {
  if (typeof gatePdfDownload === 'function' && !gatePdfDownload()) return;

  let JsPDF;
  try {
    JsPDF = await _loadJsPDF();
  } catch (e) {
    showToast('Could not load PDF engine. Check your internet connection.', 'error');
    return;
  }

  const doc   = new JsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();

  let y = _addHeader(
    doc,
    `${result.subject} — Exam Results`,
    `${result.mode || 'Practice'}  ·  ${new Date(result.date || Date.now()).toLocaleDateString('en-GB')}`
  );

  y += 8;

  // Score summary card
  const gradeColor = result.grade === 'A' ? [5, 150, 105]
                   : result.grade === 'B' ? [37, 99, 235]
                   : result.grade === 'C' ? [217, 119, 6]
                   : [220, 38, 38];

  doc.setFillColor(...gradeColor);
  doc.roundedRect(14, y, pageW - 28, 30, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text(`${result.score}/${result.total}`, 26, y + 18);

  doc.setFontSize(11);
  doc.text(`${result.pct}%  —  Grade ${result.grade}`, 26, y + 27);

  // Right side of card
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 252, 231);
  const rightX = pageW - 14;
  doc.text(`Correct: ${result.score}`, rightX, y + 12, { align: 'right' });
  doc.text(`Wrong:   ${result.total - result.score}`, rightX, y + 19, { align: 'right' });
  doc.text(`Subject: ${result.subject}`, rightX, y + 26, { align: 'right' });

  y += 38;

  // Question review
  if (result.questions && result.questions.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(17, 24, 39);
    doc.text('Full Question Review', 14, y);
    y += 8;

    result.questions.forEach((q, idx) => {
      y = _checkNewPage(doc, y, 28);

      const isCorrect = q.correct;
      const bgColor   = isCorrect ? [240, 253, 244] : [254, 242, 242];
      const lineH     = 6;

      // Estimate height needed
      const qLines = doc.splitTextToSize(`${idx + 1}. ${q.question}`, pageW - 42);
      const expLines = q.explanation ? doc.splitTextToSize(q.explanation, pageW - 42) : [];
      const cardH = (qLines.length + expLines.length) * lineH + 22;

      y = _checkNewPage(doc, y, cardH);

      doc.setFillColor(...bgColor);
      doc.roundedRect(14, y, pageW - 28, cardH, 2, 2, 'F');

      // Status dot + question text
      doc.setFillColor(...(isCorrect ? [5, 150, 105] : [220, 38, 38]));
      doc.circle(21, y + 5.5, 2.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(17, 24, 39);
      qLines.forEach((line, li) => {
        doc.text(line, 26, y + 6 + li * lineH);
      });

      let iy = y + 6 + qLines.length * lineH + 2;

      // Answer info
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(55, 65, 81);
      doc.text(`Your answer: ${q.chosen || 'Skipped'}  |  Correct: ${q.answer}`, 26, iy);
      iy += lineH;

      if (expLines.length) {
        doc.setTextColor(107, 114, 128);
        expLines.forEach(line => {
          doc.text(line, 26, iy);
          iy += lineH - 1;
        });
      }

      y += cardH + 4;
    });
  }

  _addFooter(doc);
  doc.save(`ExamReady_${result.subject.replace(/\s+/g, '_')}_Results.pdf`);
  showToast('📄 Results PDF downloaded!', 'success');
}
