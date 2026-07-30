(function () {
  if (window.__oysterPlayerInit) return;
  window.__oysterPlayerInit = true;

  var VOLUME_KEY = 'oh-volume';
  var PLAYING_KEY = 'oh-playing';

  var inIframe = window.self !== window.top;
  var isEmbed = /(?:^|[?&])embed=1(?:&|$)/.test(location.search);

  // Pages dans l’iframe : pas de lecteur (il vit dans le parent)
  if (inIframe) return;

  if (!isEmbed) {
    bootShell();
  } else {
    // URL ?embed=1 ouverte seule
    whenBody(bootPlayer);
  }

  function whenBody(fn) {
    if (document.body) fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function buildEmbedUrl(pathWithSearchHash) {
    var a = document.createElement('a');
    a.href = pathWithSearchHash;
    var path = a.pathname || '/';
    var search = a.search || '';
    var hash = a.hash || '';
    if (!/[?&]embed=1(?:&|$)/.test(search)) {
      search += (search ? '&' : '?') + 'embed=1';
    }
    return path + search + hash;
  }

  function stripEmbed(url) {
    return String(url || '')
      .replace(/([?&])embed=1(&|$)/, function (_, p1, p2) {
        if (p1 === '?' && p2 === '&') return '?';
        if (p1 === '?' && p2 === '') return '';
        if (p2 === '') return '';
        return p1 === '?' ? '?' : p2;
      })
      .replace(/\?$/, '')
      .replace(/&&/g, '&')
      .replace(/\?&/, '?');
  }

  function bootShell() {
    whenBody(function () {
      var embedUrl = buildEmbedUrl(location.pathname + location.search + location.hash);

      document.documentElement.style.height = '100%';
      document.body.style.cssText = 'margin:0;height:100%;overflow:hidden;background:#0f2a28;';

      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }

      var iframe = document.createElement('iframe');
      iframe.id = 'oh-content-frame';
      iframe.title = 'Oyster House';
      iframe.src = embedUrl;
      iframe.style.cssText =
        'position:fixed;inset:0;width:100%;height:100%;border:0;display:block;z-index:1;';
      document.body.appendChild(iframe);

      bootPlayer();

      iframe.addEventListener('load', function () {
        try {
          var loc = iframe.contentWindow.location;
          var clean = stripEmbed(loc.pathname + loc.search) + loc.hash;
          if (clean && clean !== location.pathname + location.search + location.hash) {
            history.replaceState(null, '', clean);
          }
        } catch (_) {}
      });
    });
  }

  function bootPlayer() {
    var audio = document.createElement('audio');
    audio.id = 'oh-radio-audio';
    audio.loop = true;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.setAttribute('playsinline', '');
    // Chemin absolu depuis la racine du site
    audio.src = new URL('assets/audio/tatie-dee-set-2025.m4a', location.origin + '/').href;
    document.body.appendChild(audio);

    var savedVolume = localStorage.getItem(VOLUME_KEY);
    var volume = savedVolume !== null ? Number(savedVolume) : 0.4;
    if (Number.isNaN(volume)) volume = 0.4;
    audio.volume = Math.min(1, Math.max(0, volume));

    var root = document.createElement('div');
    root.className = 'oyster-player';
    root.innerHTML =
      '<button type="button" class="oyster-player__btn" aria-label="Lecture">▶</button>' +
      '<div class="oyster-player__meta">' +
      '<div class="oyster-player__label">Oyster House Radio</div>' +
      '<div class="oyster-player__title">Tatie Dee - Mix 2025</div>' +
      '</div>' +
      '<input class="oyster-player__volume" type="range" min="0" max="100" aria-label="Volume" />';
    document.body.appendChild(root);

    var btn = root.querySelector('.oyster-player__btn');
    var slider = root.querySelector('.oyster-player__volume');
    slider.value = String(Math.round(audio.volume * 100));

    function setPlayingUI(isPlaying) {
      btn.textContent = isPlaying ? '❚❚' : '▶';
      btn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Lecture');
      try {
        sessionStorage.setItem(PLAYING_KEY, isPlaying ? '1' : '0');
      } catch (_) {}
    }

    function playAudio() {
      return audio.play().then(function () {
        setPlayingUI(true);
      });
    }

    function tryPlay() {
      playAudio().catch(function () {
        setPlayingUI(false);
      });
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (audio.paused) {
        playAudio().catch(function () {
          setPlayingUI(false);
        });
      } else {
        audio.pause();
        setPlayingUI(false);
      }
    });

    slider.addEventListener('input', function () {
      audio.volume = Number(slider.value) / 100;
      localStorage.setItem(VOLUME_KEY, String(audio.volume));
    });

    // Clic dans le site (iframe) → démarre la radio si elle est en pause
    window.addEventListener('message', function (e) {
      if (!e.data || e.data.type !== 'oh-user-gesture') return;
      if (audio.paused) tryPlay();
    });

    var frame = document.getElementById('oh-content-frame');
    if (frame) {
      frame.addEventListener('load', function () {
        try {
          var doc = frame.contentDocument;
          if (!doc || doc.documentElement.getAttribute('data-oh-bridge')) return;
          doc.documentElement.setAttribute('data-oh-bridge', '1');
          doc.addEventListener(
            'pointerdown',
            function () {
              window.parent.postMessage({ type: 'oh-user-gesture' }, '*');
            },
            { once: true, capture: true }
          );
        } catch (_) {}
      });
    }

    // Tentative autoplay (souvent bloquée tant qu’il n’y a pas d’interaction)
    function scheduleAutoplay() {
      tryPlay();
    }
    if (audio.readyState >= 2) {
      scheduleAutoplay();
    } else {
      audio.addEventListener('canplay', scheduleAutoplay, { once: true });
      setTimeout(scheduleAutoplay, 1200);
    }
  }
})();
