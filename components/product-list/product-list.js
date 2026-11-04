// init(container) is called after the markup is on the page:
// by include.js on the landing, and by example.html itself.
// There may be several copies of the component inside the container.

import { products } from '/js/products.js';
import { include } from '/js/include.js';

export function init(container) {
  const { group, heading } = container.dataset ?? {};
  if (!group) return;

  const headingElement = container.querySelector('.product-list__heading');
  const grid = container.querySelector('.product-list__grid');

  if (heading) {
    headingElement.textContent = heading;
  }

  const groupProducts = products.filter((product) => product.group === group);

  const placeholders = groupProducts.map((product) => {
    const placeholder = document.createElement('div');
    placeholder.dataset.include = 'product-card';
    Object.assign(placeholder.dataset, product);
    return placeholder;
  });

  grid.replaceChildren(...placeholders);
  include(grid);
}
