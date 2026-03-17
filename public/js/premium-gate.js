/* ============================================================
   ExamReady Nigeria — premium-gate.js
   Premium enforcement: ad removal, daily limits, badge, gating
   ============================================================ */

'use strict';

/* ── Storage keys ─────────────────────────────────────────── */
const PG_KEY          = 'isPremium';
const PG_EMAIL_KEY    = 'premiumEmail';
const PG_EXPIRY_KEY   = 'premiumExpiry';  // ISO date string
const PG_MOCK_KEY     = 'mockExamUsage'; // { date: 'YYYY-MM-DD', count: N }

/* ── Constants ────────────────────────────────────────────── */
const FREE_DAILY_MOCK_LIMIT = 3;

/* ──────────────────────────────────────────────────────────
   isPremium()
   Returns true if user has active premium access.
   ──────────────────────────────────────────────────────────*/
function isPremium() {
  const flag = localStorage.getItem(PG_KEY);
  if (!flag) return false;

  // If an expiry was stored, honour it
  const expiry = localStorage.getItem(PG_EXPIRY_KEY);
  if (expiry) {
    if (new Date() > new Date(expiry)) {
      // Expired — clear premium flags
      clearPremium();
      return false;
    }
  }
  return true;
}

/* ──────────────────────────────────────────────────────────
   setPremium(email, daysValid)
   Activate premium for this browser session.
   Called from premium.html after successful Paystack payment.
   ──────────────────────────────────────────────────────────*/
function setPremium(email, daysValid = 31) {
  localStorage.setItem(PG_KEY, '1');
  if (email) localStorage.setItem(PG_EMAIL_KEY, email);

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + daysValid);
  localStorage.setItem(PG_EXPIRY_KEY, expiry.toISOString());

  applyPremiumUI();
}

/* ──────────────────────────────────────────────────────────
   clearPremium()
   Remove all premium flags (expiry, cancel).
   ──────────────────────────────────────────────────────────*/
function clearPremium() {
  localStorage.removeItem(PG_KEY);
  localStorage.removeItem(PG_EMAIL_KEY);
  localStorage.removeItem(PG_EXPIRY_KEY);
}

/* ──────────────────────────────────────────────────────────
   Mock Exam Daily Limit
   Free users: max FREE_DAILY_MOCK_LIMIT per calendar day.
   Returns { allowed: bool, used: N, limit: N }
   ──────────────────────────────────────────────────────────*/
function getMockUsageToday() {
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  try {
    const raw = localStorage.getItem(PG_MOCK_KEY);
    if (raw) {
      const usage = JSON.parse(raw);
      if (usage.date === today) return usage;
    }
  } catch (_) {}
  return { date: today, count: 0 };
}

function canTakeMockExam() {
  if (isPremium()) return { allowed: true, used: 0, limit: Infinity };
  const usage = getMockUsageToday();
  return {
    allowed: usage.count < FREE_DAILY_MOCK_LIMIT,
    used:    usage.count,
    limit:   FREE_DAILY_MOCK_LIMIT,
  };
}

function recordMockExamTaken() {
  if (isPremium()) return; // no need to track for premium
  const usage = getMockUsageToday();
  usage.count += 1;
  localStorage.setItem(PG_MOCK_KEY, JSON.stringify(usage));
}

/* ──────────────────────────────────────────────────────────
   Ad removal
   Hides .adsbygoogle slots for premium users, shows for free.
   ──────────────────────────────────────────────────────────*/
function applyAdVisibility() {
  const adSlots = document.querySelectorAll('.adsbygoogle, .ad-slot, [data-ad-slot]');
  adSlots.forEach(slot => {
    slot.style.display = isPremium() ? 'none' : '';
  });
}

/* ──────────────────────────────────────────────────────────
   Premium badge in navbar
   Adds a ⭐ badge next to the user's nav avatar / logo area
   when premium is active.
   ──────────────────────────────────────────────────────────*/
function applyPremiumBadge() {
  // Remove any existing badge first
  document.querySelectorAll('.premium-nav-badge').forEach(el => el.remove());

  if (!isPremium()) return;

  // Find the Premium link in the nav and mark it differently
  document.querySelectorAll('a[href="premium.html"]').forEach(link => {
    link.textContent = '⭐ Premium ✓';
    link.style.color = 'var(--gold, #d97706)';
    link.style.fontWeight = '800';
  });

  // Add a small badge next to the logo
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    const badge = document.createElement('span');
    badge.className = 'premium-nav-badge';
    badge.setAttribute('aria-label', 'Premium member');
    badge.style.cssText = `
      display:inline-flex;align-items:center;justify-content:center;
      background:linear-gradient(135deg,#d97706,#b45309);
      color:#fff;font-size:.6rem;font-weight:800;
      padding:2px 7px;border-radius:100px;
      margin-left:8px;letter-spacing:.3px;vertical-align:middle;
      text-transform:uppercase;
    `;
    badge.textContent = 'PRO';
    logo.appendChild(badge);
  }
}

/* ──────────────────────────────────────────────────────────
   Mock exam gate — call this at the START of exam.html load.
   If user is over limit, shows a paywall overlay and returns false.
   ──────────────────────────────────────────────────────────*/
function gateMockExam() {
  const status = canTakeMockExam();
  if (status.allowed) return true;

  // Show paywall overlay
  showMockLimitOverlay(status.used, status.limit);
  return false;
}

function showMockLimitOverlay(used, limit) {
  // Remove existing
  const existing = document.getElementById('mockLimitOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'mockLimitOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'mockLimitTitle');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9999;
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;
  overlay.innerHTML = `
    <div style="
      background:var(--white,#fff);border-radius:16px;padding:36px 32px;
      max-width:420px;width:100%;text-align:center;
      box-shadow:0 25px 50px rgba(0,0,0,.35);
      animation:fadeInUp .3s ease;
    ">
      <div style="font-size:3rem;margin-bottom:12px;">⏱</div>
      <h2 id="mockLimitTitle" style="font-size:1.375rem;font-weight:800;margin-bottom:10px;color:var(--text,#111);">
        Daily Limit Reached
      </h2>
      <p style="color:var(--muted,#6b7280);font-size:.9375rem;margin-bottom:6px;">
        You've used <strong>${used}/${limit}</strong> free mock exams today.
      </p>
      <p style="color:var(--muted,#6b7280);font-size:.875rem;margin-bottom:28px;">
        Upgrade to Premium for <strong>unlimited</strong> mock exams every day,
        plus ad-free practice and PDF downloads.
      </p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <a href="premium.html" style="
          display:block;padding:14px 24px;
          background:linear-gradient(135deg,#d97706,#b45309);
          color:#fff;border-radius:8px;font-weight:800;font-size:.9375rem;
          text-decoration:none;
        ">⭐ Get Premium — ₦500/mo</a>
        <a href="subjects.html" style="
          display:block;padding:12px 24px;
          border:1.5px solid var(--border,#e5e7eb);
          color:var(--muted,#6b7280);border-radius:8px;font-weight:600;font-size:.875rem;
          text-decoration:none;
        ">Go to Practice Mode instead</a>
        <p style="font-size:.75rem;color:var(--muted,#9ca3af);margin:0;">
          Limit resets at midnight. Practice mode is always unlimited.
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/* ──────────────────────────────────────────────────────────
   PDF gating — call before triggering a PDF download.
   Returns true if allowed, shows upgrade prompt if not.
   ──────────────────────────────────────────────────────────*/
function gatePdfDownload() {
  if (isPremium()) return true;
  showPdfGatePrompt();
  return false;
}

function showPdfGatePrompt() {
  const existing = document.getElementById('pdfGateOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pdfGateOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9999;
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;
  overlay.innerHTML = `
    <div style="
      background:var(--white,#fff);border-radius:16px;padding:36px 32px;
      max-width:380px;width:100%;text-align:center;
      box-shadow:0 25px 50px rgba(0,0,0,.35);
    ">
      <div style="font-size:3rem;margin-bottom:12px;">📄</div>
      <h2 style="font-size:1.25rem;font-weight:800;margin-bottom:10px;color:var(--text,#111);">
        Premium Feature
      </h2>
      <p style="color:var(--muted,#6b7280);font-size:.9rem;margin-bottom:24px;">
        PDF downloads are available on the <strong>Premium plan</strong>.
        Upgrade for ₦500/month to download study notes and exam results as PDFs.
      </p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <a href="premium.html" style="
          display:block;padding:14px;
          background:linear-gradient(135deg,#d97706,#b45309);
          color:#fff;border-radius:8px;font-weight:800;
          text-decoration:none;font-size:.9375rem;
        ">⭐ Upgrade to Premium</a>
        <button onclick="document.getElementById('pdfGateOverlay').remove()" style="
          padding:10px;border:1.5px solid var(--border,#e5e7eb);
          background:none;border-radius:8px;cursor:pointer;
          color:var(--muted,#6b7280);font-size:.875rem;font-weight:600;
        ">Maybe later</button>
      </div>
    </div>
  `;
  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

/* ──────────────────────────────────────────────────────────
   Analytics gating — show upgrade prompt for analytics tab
   ──────────────────────────────────────────────────────────*/
function gateAnalytics(containerEl) {
  if (isPremium()) return true;
  if (!containerEl) return false;

  containerEl.innerHTML = `
    <div style="text-align:center;padding:52px 20px;border:2px dashed var(--border,#e5e7eb);border-radius:12px;">
      <div style="font-size:2.5rem;margin-bottom:12px;">📊</div>
      <h3 style="font-size:1.125rem;font-weight:800;margin-bottom:8px;color:var(--text,#111);">
        Detailed Analytics — Premium
      </h3>
      <p style="color:var(--muted,#6b7280);font-size:.875rem;margin-bottom:20px;max-width:320px;margin-left:auto;margin-right:auto;">
        Unlock subject performance charts, weak topic identification, and improvement trends with Premium.
      </p>
      <a href="premium.html" style="
        display:inline-block;padding:12px 28px;
        background:linear-gradient(135deg,#d97706,#b45309);
        color:#fff;border-radius:8px;font-weight:800;
        text-decoration:none;font-size:.9rem;
      ">⭐ Get Premium — ₦500/mo</a>
    </div>
  `;
  return false;
}

/* ──────────────────────────────────────────────────────────
   applyPremiumUI()
   Master function — call once on DOMContentLoaded on every page.
   Applies all visual premium states.
   ──────────────────────────────────────────────────────────*/
function applyPremiumUI() {
  applyAdVisibility();
  applyPremiumBadge();
}

/* ──────────────────────────────────────────────────────────
   Premium status card — renders on premium.html
   to show logged-in premium state.
   ──────────────────────────────────────────────────────────*/
function renderPremiumStatus() {
  const container = document.getElementById('premiumStatusCard');
  if (!container) return;

  if (isPremium()) {
    const email  = localStorage.getItem(PG_EMAIL_KEY) || 'your account';
    const expiry = localStorage.getItem(PG_EXPIRY_KEY);
    const expiryStr = expiry ? new Date(expiry).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    }) : 'N/A';

    container.innerHTML = `
      <div style="
        background:linear-gradient(135deg,#d97706,#b45309);
        color:#fff;border-radius:12px;padding:24px 28px;
        margin-bottom:28px;display:flex;align-items:center;gap:16px;
        flex-wrap:wrap;
      ">
        <span style="font-size:2.5rem;">⭐</span>
        <div>
          <div style="font-size:1.125rem;font-weight:800;margin-bottom:4px;">Premium Active</div>
          <div style="font-size:.85rem;opacity:.9;">${escapeHtml(email)}</div>
          <div style="font-size:.8rem;opacity:.8;margin-top:2px;">Valid until ${expiryStr}</div>
        </div>
        <button onclick="if(confirm('Cancel premium and return to free?')){clearPremium();location.reload();}" style="
          margin-left:auto;background:rgba(255,255,255,.2);border:1.5px solid rgba(255,255,255,.4);
          color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:.8rem;font-weight:600;
        ">Cancel</button>
      </div>
    `;
  } else {
    // Non-premium: show a subtle "you're on Free" note above the plans
    container.innerHTML = `
      <div style="
        background:var(--bg,#f9fafb);border:1.5px dashed var(--border,#e5e7eb);
        border-radius:12px;padding:16px 20px;margin-bottom:24px;
        display:flex;align-items:center;gap:12px;
      ">
        <span style="font-size:1.5rem;">🆓</span>
        <div>
          <div style="font-size:.9rem;font-weight:700;color:var(--text,#111);">You're on the Free plan</div>
          <div style="font-size:.8rem;color:var(--muted,#6b7280);">Upgrade below to unlock all Premium features instantly.</div>
        </div>
      </div>
    `;
  }
}

/* ── Auto-init on DOMContentLoaded ────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyPremiumUI();
    renderPremiumStatus();
  });
} else {
  applyPremiumUI();
  renderPremiumStatus();
}
