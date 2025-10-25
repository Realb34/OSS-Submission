/* =========================================
   OSS - Open Submission Series
   Centralized JavaScript with WOW Effects
   ========================================= */

// =======================
// UTILITY FUNCTIONS
// =======================

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// =======================
// CURSOR TRAIL EFFECT
// =======================

class CursorTrail {
  constructor() {
    this.coords = [];
    this.cursors = [];
    this.colors = [
      'rgba(224, 80, 36, 0.5)',
      'rgba(255, 246, 141, 0.5)',
      'rgba(0, 229, 255, 0.5)'
    ];
    this.init();
  }

  init() {
    for (let i = 0; i < 20; i++) {
      const cursor = document.createElement('div');
      cursor.className = 'cursor-trail';
      cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${this.colors[i % 3]};
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.15s ease-out;
      `;
      document.body.appendChild(cursor);
      this.cursors.push(cursor);
      this.coords.push({ x: 0, y: 0 });
    }

    document.addEventListener('mousemove', throttle((e) => {
      this.coords[0] = { x: e.clientX, y: e.clientY };
    }, 10));

    this.animate();
  }

  animate() {
    let x = this.coords[0].x;
    let y = this.coords[0].y;

    this.cursors.forEach((cursor, index) => {
      cursor.style.left = x - 4 + 'px';
      cursor.style.top = y - 4 + 'px';
      cursor.style.transform = `scale(${(this.cursors.length - index) / this.cursors.length})`;

      if (index < this.coords.length - 1) {
        const next = this.coords[index + 1] || this.coords[0];
        x += (next.x - x) * 0.3;
        y += (next.y - y) * 0.3;
        this.coords[index + 1] = { x, y };
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

// =======================
// PARALLAX SCROLL EFFECT
// =======================

class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.pageYOffset;

      this.elements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    }, 10));
  }
}

// =======================
// MAGNETIC BUTTONS
// =======================

class MagneticButtons {
  constructor(selector = '.btn, .filter, .action') {
    this.buttons = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
}

// =======================
// TYPING EFFECT
// =======================

class TypingEffect {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }

  start() {
    this.element.textContent = '';
    this.type();
  }
}

// =======================
// MOBILE NAV TOGGLE
// =======================

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');

    document.querySelectorAll('[data-dropdown].open').forEach(d => {
      d.classList.remove('open');
      d.setAttribute('aria-expanded', 'false');
      d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.addEventListener('click', (e) => {
    const isLink = e.target.closest('a.nav-link');
    if (isLink && window.matchMedia('(max-width: 820px)').matches) {
      closeMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      if (window.matchMedia('(max-width: 820px)').matches) closeMenu();
    }
  });
}

// =======================
// ACCESSIBLE DROPDOWNS
// =======================

function initDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  const isMobile = () => window.matchMedia('(max-width: 820px)').matches;

  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.dropdown-toggle');
    const menu = drop.querySelector('.dropdown-menu');
    const items = Array.from(menu.querySelectorAll('a'));
    let closeTimeout = null;

    function open() {
      // Clear any pending close timeout
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      drop.classList.add('open');
      drop.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
      if (isMobile()) menu.style.display = 'block';
    }

    function close(immediate = false) {
      if (immediate || isMobile()) {
        drop.classList.remove('open');
        drop.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
        if (isMobile()) menu.style.display = 'none';
      } else {
        // Add delay before closing to prevent accidental dismissal
        closeTimeout = setTimeout(() => {
          drop.classList.remove('open');
          drop.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-expanded', 'false');
          menu.classList.remove('show');
          closeTimeout = null;
        }, 300);
      }
    }

    function toggle() {
      drop.classList.contains('open') ? close(true) : open();
    }

    // Desktop hover behavior (non-touch devices)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      drop.addEventListener('mouseenter', () => {
        if (!isMobile()) open();
      });

      drop.addEventListener('mouseleave', () => {
        if (!isMobile()) close();
      });
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMobile()) {
        document.querySelectorAll('[data-dropdown].open').forEach(d => {
          if (d !== drop) d.classList.remove('open');
        });
      }
      toggle();
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        items[0]?.focus();
      }
    });

    menu.addEventListener('keydown', (e) => {
      const i = items.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
        btn.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[Math.min(i + 1, items.length - 1)]?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[Math.max(i - 1, 0)]?.focus();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      }
      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!drop.contains(e.target) && drop.classList.contains('open') && isMobile()) {
        close(true);
      }
    });

    drop.addEventListener('focusout', (e) => {
      if (!drop.contains(e.relatedTarget) && !isMobile()) {
        close(true);
      }
    });
  });
}

// =======================
// SCROLL REVEAL
// =======================

function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, index * 100);
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in-view'));
  }
}

// =======================
// SMOOTH SCROLL & FOCUS
// =======================

function initSmoothScroll() {
  function focusHashTarget() {
    const id = location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
    }
  }

  window.addEventListener('hashchange', focusHashTarget);
  if (location.hash) {
    setTimeout(focusHashTarget, 100);
  }
}

// =======================
// NAVBAR SCROLL EFFECT
// =======================

function initNavbarScroll() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 50) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  }, 100));
}

// =======================
// RIPPLE EFFECT
// =======================

class RippleEffect {
  constructor(selector = '.btn, .card, .filter') {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      el.style.position = 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: radial-gradient(circle, rgba(255,255,255,0.3), transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: ripple-animation 0.6s ease-out;
        `;

        el.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple-animation {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// =======================
// PARTICLE BACKGROUND
// =======================

class ParticleBackground {
  constructor(containerId = 'particle-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      this.container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      `;
      document.body.insertBefore(this.container, document.body.firstChild);
    }
    this.particles = [];
    this.init();
  }

  init() {
    // Create fewer particles for performance
    for (let i = 0; i < 30; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(224, 80, 36, 0.6), transparent);
      border-radius: 50%;
      left: ${x}%;
      bottom: -5%;
      animation: float-up ${duration}s ${delay}s infinite ease-in;
      opacity: 0.5;
    `;

    this.container.appendChild(particle);
    this.particles.push(particle);

    // Add float animation if not exists
    if (!document.getElementById('particle-float-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-float-styles';
      style.textContent = `
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// =======================
// TEXT GLITCH EFFECT
// =======================

class GlitchEffect {
  constructor(selector = '.go-title') {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      setInterval(() => {
        if (Math.random() > 0.9) {
          el.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px rgba(255, 0, 0, 0.7),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px rgba(0, 255, 255, 0.7)
          `;
          setTimeout(() => {
            el.style.textShadow = '';
          }, 50);
        }
      }, 3000);
    });
  }
}

// =======================
// TILT EFFECT ON CARDS
// =======================

class TiltEffect {
  constructor(selector = '.card') {
    this.cards = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

// =======================
// INIT YEAR IN FOOTER
// =======================

function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// =======================
// PERFORMANCE MONITOR
// =======================

function checkPerformance() {
  // Disable heavy effects on low-performance devices
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  return {
    enableCursorTrail: !prefersReducedMotion && !isLowPerformance,
    enableParticles: !prefersReducedMotion && !isLowPerformance,
    enableTilt: !prefersReducedMotion,
    enableGlitch: !prefersReducedMotion
  };
}

// =======================
// INITIALIZE EVERYTHING
// =======================

document.addEventListener('DOMContentLoaded', () => {
  const perf = checkPerformance();

  // Core functionality (always on)
  initMobileNav();
  initDropdowns();
  initScrollReveal();
  initSmoothScroll();
  initNavbarScroll();
  initFooterYear();
  new MagneticButtons();
  new RippleEffect();

  // Performance-based features
  if (perf.enableCursorTrail) {
    new CursorTrail();
  }

  if (perf.enableParticles) {
    new ParticleBackground();
  }

  if (perf.enableTilt) {
    new TiltEffect();
  }

  if (perf.enableGlitch) {
    new GlitchEffect();
  }

  new ParallaxEffect();

  // Page-specific initializations
  // These will be called from individual pages if needed
  console.log('OSS Website initialized with WOW effects! 🎉');
});

// =======================
// EXPORT FOR PAGE-SPECIFIC USE
// =======================

window.OSSUtils = {
  debounce,
  throttle,
  TypingEffect,
  ParallaxEffect,
  MagneticButtons,
  RippleEffect,
  TiltEffect,
  GlitchEffect
};
