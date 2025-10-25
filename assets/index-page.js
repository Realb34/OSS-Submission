/* =========================================
   Index Page Specific JavaScript
   ========================================= */

// Events data
const events = [
  { date: '2025-09-12', title: 'District Championship', location: 'Downtown Ft Myers', url: '#' },
  { date: '2025-10-05', title: 'Roll around the wings', location: 'Blue store', url: '#' },
  { date: '2025-11-22', title: 'Sign ups and Meet & Greet', location: 'Edison Mall', url: '#' },
  { date: '2025-07-18', title: 'District Championship', location: 'Cape High School', url: '#' },
  { date: '2025-06-02', title: 'Community Blood Drive Tournament', location: 'Scoops & Treats', url: '#' },
];

function formatDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(d);
}

function renderTables() {
  const upcomingBody = document.getElementById('upcoming-body');
  const previousBody = document.getElementById('previous-body');

  if (!upcomingBody || !previousBody) return;

  upcomingBody.innerHTML = '';
  previousBody.innerHTML = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [], previous = [];
  for (const ev of events) {
    const d = new Date(ev.date + 'T00:00:00');
    if (!Number.isNaN(d.getTime()) && d >= today) upcoming.push(ev);
    else previous.push(ev);
  }

  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  previous.sort((a, b) => b.date.localeCompare(a.date));

  const row = (ev) => {
    const safeTitle = ev.title || 'Untitled';
    const safeLoc = ev.location || '—';
    const safeUrl = ev.url || '#';
    const display = formatDate(ev.date);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><time datetime="${ev.date}">${display}</time></td>
      <td>${safeTitle}</td>
      <td>${safeLoc}</td>
      <td><a class="link" href="${safeUrl}" target="_blank" rel="noopener">View</a></td>
    `;
    return tr;
  };

  if (upcoming.length === 0) {
    upcomingBody.innerHTML = `<tr><td colspan="4" class="empty">No upcoming events yet. Check back soon.</td></tr>`;
  } else {
    upcoming.forEach(ev => upcomingBody.appendChild(row(ev)));
  }

  if (previous.length === 0) {
    previousBody.innerHTML = `<tr><td colspan="4" class="empty">No previous events on record.</td></tr>`;
  } else {
    previous.forEach(ev => previousBody.appendChild(row(ev)));
  }
}

// Grand Opening Countdown
function initCountdown() {
  const cdRoot = document.getElementById('go-countdown');
  if (!cdRoot) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const iso = cdRoot.getAttribute('data-datetime');
    const target = new Date(iso);
    const now = new Date();
    const diff = target - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (Number.isNaN(target.getTime())) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    if (diff <= 0) {
      cdRoot.innerHTML = '<div class="cd-seg"><span class="num">🎉</span><span class="lab">We\'re Open!</span></div>';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    // Add flip animation
    if (daysEl.textContent !== pad(d)) {
      daysEl.classList.add('flip');
      setTimeout(() => daysEl.classList.remove('flip'), 600);
    }
    if (secsEl.textContent !== pad(s)) {
      secsEl.classList.add('flip');
      setTimeout(() => secsEl.classList.remove('flip'), 600);
    }

    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Confetti system
function initConfetti() {
  const section = document.getElementById('grand-opening');
  const confettiWrap = document.getElementById('confetti');
  const triggerBtn = document.getElementById('confettiButton');

  if (!section || !confettiWrap) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#ff7a18', '#af002d', '#f6d365', '#00e5ff', '#7b61ff', '#fff68d', '#e05024'];

  function makePiece(width, height) {
    const el = document.createElement('span');
    el.className = 'piece';
    const w = Math.max(6, Math.min(14, Math.floor(width || (6 + Math.random() * 10))));
    const h = Math.max(8, Math.min(18, Math.floor(height || (8 + Math.random() * 12))));
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.left = Math.floor(Math.random() * 100) + 'vw';
    el.style.top = '-10vh';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = (6 + Math.random() * 5) + 's, ' + (2 + Math.random() * 2.5) + 's';
    el.style.animationDelay = (Math.random() * 1.2) + 's, ' + (Math.random() * 1) + 's';
    el.style.transform = 'translateY(-10vh) rotate(0deg)';
    return el;
  }

  function burst(count = 120) {
    if (prefersReduced) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      frag.appendChild(makePiece());
    }
    confettiWrap.appendChild(frag);
    setTimeout(() => {
      confettiWrap.querySelectorAll('.piece').forEach(p => p.remove());
    }, 13000);
  }

  // Activate burst when section enters view
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          burst(160);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    io.observe(section);
  } else {
    burst(140);
  }

  // Manual re-burst on click/tap
  section.addEventListener('click', () => burst(80));
  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      burst(100);
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderTables();
  initCountdown();
  initConfetti();
});
