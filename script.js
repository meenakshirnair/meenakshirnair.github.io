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

  /* ── Skill filter (work page) ── */
  const params      = new URLSearchParams(window.location.search);
  const filterSkill = params.get('filter');

  if (filterSkill && document.querySelector('.projects-section')) {
    const projects  = document.querySelectorAll('.project-item');
    const matched   = [];

    projects.forEach(function (proj) {
      var skills = (proj.dataset.skills || '').split(' ');
      if (skills.indexOf(filterSkill) !== -1) {
        proj.classList.add('proj-matched');
        matched.push(proj);
      } else {
        proj.classList.add('proj-dimmed');
      }
    });

    // Build label from slug: "claude-api" → "Claude Api"
    var label = filterSkill
      .replace(/-/g, ' ')
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });

    var banner = document.createElement('div');
    banner.className = 'filter-banner';

    if (matched.length > 0) {
      banner.innerHTML =
        '<span class="filter-banner-text">Showing projects for <strong>' + label + '</strong></span>' +
        '<a href="work.html" class="filter-clear">Show all &times;</a>';
    } else {
      // No direct match — restore all to full opacity and explain
      projects.forEach(function (proj) {
        proj.classList.remove('proj-dimmed');
        proj.classList.remove('proj-matched');
      });
      banner.innerHTML =
        '<span class="filter-banner-text"><strong>' + label + '</strong>: applied at EY and during coursework. No standalone project for it yet.</span>' +
        '<a href="work.html" class="filter-clear">Clear &times;</a>';
    }

    var container = document.querySelector('.projects-section .container');
    container.insertBefore(banner, container.firstChild);

    // Scroll first matched project into view
    if (matched.length > 0) {
      setTimeout(function () {
        matched[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    }
  }


  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
