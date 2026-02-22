/**
 * Oyster House — Librairie photo
 * Gestion des onglets par année
 */

(function () {
  const tabs = document.querySelectorAll('.galerie__tab');
  const countEl = document.getElementById('galerieCount');

  const yearCounts = {};
  document.querySelectorAll('.photo-card').forEach(function (card) {
    const y = card.dataset.year;
    yearCounts[y] = (yearCounts[y] || 0) + 1;
  });

  function filterGalerie(year) {
    const cards = document.querySelectorAll('.photo-card');
    let visible = 0;
    cards.forEach(function (card) {
      const show = card.dataset.year === year;
      card.style.display = show ? 'block' : 'none';
      if (show) visible++;
    });
    return visible;
  }

  function updateCount(year, visible) {
    if (!countEl) return;
    const total = Object.keys(yearCounts).length;
    countEl.textContent = 'Affichage de ' + visible + ' photo' + (visible > 1 ? 's' : '') + ' · ' + total + ' éditions disponibles';
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const year = tab.dataset.year;
      const visible = filterGalerie(year);
      updateCount(year, visible);
    });
  });

  const showAllBtn = document.getElementById('galerieShowAll');
  if (showAllBtn) {
    showAllBtn.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.photo-card').forEach(function (card) {
        card.style.display = 'block';
      });
      const total = document.querySelectorAll('.photo-card').length;
      if (countEl) countEl.textContent = 'Affichage de ' + total + ' photos · 9 éditions disponibles';
    });
  }

  // Init : afficher 2026
  const visible = filterGalerie('2026');
  updateCount('2026', visible);
})();
