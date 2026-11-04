// init(container) is called after the markup is on the page:
// by include.js on the landing, and by example.html itself.
// There may be several copies of the component inside the container.

export function init(container) {
  if (!container.dataset?.title) return;

  const { title, photo, price, rating, oldPrice, discount } = container.dataset;

  const image = container.querySelector('.product-card__image');
  image.src = photo;
  image.alt = title;

  container.querySelector('.product-card__title').textContent = title;
  container.querySelector('.product-card__price').textContent = `$${price}`;
  container.querySelector('.product-card__rating-value').textContent =
    `${Number(rating).toFixed(1)}/5`;
  container.querySelector('.product-card__stars').style.setProperty('--rating', rating);

  const oldPriceElement = container.querySelector('.product-card__old-price');
  if (oldPrice) {
    oldPriceElement.textContent = `$${oldPrice}`;
  } else {
    oldPriceElement.remove();
  }

  const discountElement = container.querySelector('.product-card__discount');
  if (discount) {
    discountElement.textContent = `-${discount}%`;
  } else {
    discountElement.remove();
  }
}
