export function init(container) {
  const promoBar = container.querySelector('.promo-bar');
  const closeButton = promoBar.querySelector('.promo-bar__close');

  closeButton.addEventListener('click', () => {
    promoBar.hidden = true;
  });
}
