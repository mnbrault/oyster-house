(function () {
  'use strict';

  var deck = document.getElementById('deck');
  var track = document.getElementById('track');
  var slides = Array.prototype.slice.call(track.querySelectorAll('.slide'));
  var counter = document.getElementById('counter');
  var dotsWrap = document.getElementById('dots');
  var hint = document.getElementById('hint');
  var btnPrev = document.getElementById('prev');
  var btnNext = document.getElementById('next');

  var total = slides.length;
  var index = 0;
  var startX = 0;
  var startY = 0;
  var deltaX = 0;
  var dragging = false;
  var lockedAxis = null;
  var hintHidden = false;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  for (var i = 0; i < total; i++) {
    var dot = document.createElement('span');
    if (i === 0) dot.className = 'is-active';
    dotsWrap.appendChild(dot);
  }
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function pad(n) {
    return n < 10 ? '00' + n : (n < 100 ? '0' + n : String(n));
  }

  function updateUI() {
    counter.textContent = pad(index + 1) + ' / ' + pad(total);
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('is-active', d === index);
    }
    btnPrev.setAttribute('aria-disabled', index === 0 ? 'true' : 'false');
    btnNext.setAttribute('aria-disabled', index === total - 1 ? 'true' : 'false');
  }

  function goTo(next, instant) {
    index = Math.max(0, Math.min(total - 1, next));
    if (instant || reduceMotion) {
      track.style.transition = 'none';
      track.style.transform = 'translate3d(' + (-index * 100) + '%, 0, 0)';
      // force reflow then restore transition
      void track.offsetWidth;
      track.style.transition = '';
    } else {
      track.style.transform = 'translate3d(' + (-index * 100) + '%, 0, 0)';
    }
    updateUI();
  }

  function hideHint() {
    if (hintHidden || !hint) return;
    hintHidden = true;
    hint.classList.add('is-hidden');
  }

  function next() {
    if (index < total - 1) {
      goTo(index + 1);
      hideHint();
    }
  }

  function prev() {
    if (index > 0) {
      goTo(index - 1);
      hideHint();
    }
  }

  btnPrev.addEventListener('click', function (e) {
    e.preventDefault();
    prev();
  });

  btnNext.addEventListener('click', function (e) {
    e.preventDefault();
    next();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(total - 1);
    }
  });

  function onStart(x, y) {
    dragging = true;
    lockedAxis = null;
    startX = x;
    startY = y;
    deltaX = 0;
    deck.classList.add('is-dragging');
  }

  function onMove(x, y) {
    if (!dragging) return;
    var dx = x - startX;
    var dy = y - startY;

    if (!lockedAxis) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        lockedAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      } else {
        return;
      }
    }

    if (lockedAxis !== 'x') return;

    deltaX = dx;
    var width = deck.clientWidth || window.innerWidth;
    var offset = (-index * width) + deltaX;
    // resistance at edges
    if ((index === 0 && deltaX > 0) || (index === total - 1 && deltaX < 0)) {
      offset = (-index * width) + deltaX * 0.35;
    }
    track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
  }

  function onEnd() {
    if (!dragging) return;
    dragging = false;
    deck.classList.remove('is-dragging');

    var width = deck.clientWidth || window.innerWidth;
    var threshold = Math.min(80, width * 0.18);

    if (lockedAxis === 'x' && Math.abs(deltaX) > threshold) {
      if (deltaX < 0) next();
      else prev();
    } else {
      goTo(index);
    }

    deltaX = 0;
    lockedAxis = null;
  }

  deck.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    onStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  deck.addEventListener('touchmove', function (e) {
    if (!dragging || e.touches.length !== 1) return;
    if (lockedAxis === 'x') e.preventDefault();
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  deck.addEventListener('touchend', onEnd);
  deck.addEventListener('touchcancel', onEnd);

  // mouse drag for desktop preview
  deck.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    onStart(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    onMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onEnd);

  // prevent native vertical bounce fighting the deck
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  goTo(0, true);
})();
