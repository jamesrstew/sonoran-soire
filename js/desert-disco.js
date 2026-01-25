(function () {
  'use strict';

  var PASSWORD = 'sonoran';
  var STORAGE_KEY = 'desertDiscoUnlocked';

  // ----- Password gate -----
  function initPasswordGate() {
    var gate = document.getElementById('password-gate');
    if (!gate) return;

    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      gate.classList.add('hidden');
      return;
    }

    var input = gate.querySelector('input[type="password"], input[name="password"]');
    var btn = gate.querySelector('.btn-unlock');
    var err = gate.querySelector('.gate-error');

    function unlock() {
      var val = (input && input.value) ? input.value.trim() : '';
      if (val === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, '1');
        gate.classList.add('hidden');
        if (err) err.classList.remove('visible');
        document.body.classList.add('just-unlocked');
        setTimeout(function () { document.body.classList.remove('just-unlocked'); }, 2500);
      } else {
        gate.classList.add('shake');
        if (err) err.classList.add('visible');
        setTimeout(function () { gate.classList.remove('shake'); }, 500);
      }
    }

    if (btn) btn.addEventListener('click', unlock);
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') unlock();
      });
    }
  }

  // ----- Nav toggle (mobile) -----
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      document.documentElement.classList.toggle('nav-open');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth < 768) {
          nav.classList.remove('open');
          document.documentElement.classList.remove('nav-open');
        }
      });
    });
  }

  // ----- Lookbook lightbox -----
  function initLookbookLightbox() {
    var lightbox = document.getElementById('lookbook-lightbox');
    if (!lightbox) return;

    var imgEl = lightbox.querySelector('.lightbox-image');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var triggers = document.querySelectorAll('.lookbook-zoom');
    var lastFocused = null;

    function openLightbox(src, alt) {
      if (!imgEl) return;
      lastFocused = document.activeElement;
      imgEl.src = src;
      imgEl.alt = alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
      if (!imgEl) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      imgEl.src = '';
      imgEl.alt = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        var src = btn.getAttribute('data-full') || (img ? img.src : '');
        var alt = img ? img.alt : '';
        if (src) openLightbox(src, alt);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  // ----- Collapsibles -----
  function initCollapsibles() {
    document.querySelectorAll('.collapse-trigger').forEach(function (btn) {
      var id = btn.getAttribute('aria-controls');
      var panel = id ? document.getElementById(id) : btn.nextElementSibling;
      if (!panel) return;

      btn.setAttribute('aria-expanded', 'false');
      panel.classList.add('collapse-panel');
      panel.style.height = '0px';

      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        var h = panel.scrollHeight;
        if (h < 40) h = 400;
        panel.style.height = open ? '0px' : (h + 'px');
      });
    });
  }

  // ----- Run on DOM ready -----
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initPasswordGate();
    initNav();
    initLookbookLightbox();
    initCollapsibles();
  });
})();
