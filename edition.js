/**
 * Oyster House — Carousel pages édition
 */
(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');

  if (!track || slides.length === 0) return;

  let index = 0;

  function getStep() {
    if (slides.length === 0) return 0;
    const slide = slides[0];
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 16;
    return slide.offsetWidth + gap;
  }

  function getMaxIndex() {
    const viewport = carousel.querySelector('.carousel__viewport');
    if (!viewport) return 0;
    const visible = window.innerWidth >= 700 ? 3 : 1;
    return Math.max(0, slides.length - visible);
  }

  function update() {
    const max = getMaxIndex();
    index = Math.max(0, Math.min(index, max));
    track.style.transform = 'translateX(-' + (index * getStep()) + 'px)';
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { index--; update(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { index++; update(); });

  window.addEventListener('resize', function () {
    index = Math.min(index, getMaxIndex());
    update();
  });
})();
