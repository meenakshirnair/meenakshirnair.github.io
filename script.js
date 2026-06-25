/* ============================================================
   MEENAKSHI RAJEEV NAIR — Portfolio Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ── Nav colour shift (home page only) ── */
  const nav = document.getElementById('main-nav');
  if (nav && document.body.dataset.page === 'home') {
    const hero   = document.querySelector('.hero');
    const heroH  = hero ? hero.offsetHeight : 400;

    const update = () => {
      if (window.scrollY > heroH - 100) {
        nav.classList.remove('nav-dark');
        nav.classList.add('nav-light');
      } else {
        nav.classList.remove('nav-light');
        nav.classList.add('nav-dark');
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Scroll reveal ── */
  const animEls = document.querySelectorAll('[data-animate]');
  if (animEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    animEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── Current year in footer ── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
