// Fills every <div data-include="card"> with the component from components/card/.
//
// For each placeholder:
//   1. adds /components/card/card.css to <head> (once per file)
//   2. fetches /components/card/card.html, takes the first element with class "card"
//      and puts it inside the placeholder
//   3. fills nested placeholders inside that element
//   4. imports /components/card/card.js and calls its exported init(placeholder)
//
// The name must be listed in js/components.js.

import { components } from './components.js';

const loadedStyles = new Set();

function loadStyle(href) {
  if (loadedStyles.has(href)) return Promise.resolve();
  loadedStyles.add(href);

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = () => reject(new Error(`Cannot load ${href}`));
    document.head.append(link);
  });
}

async function loadMarkup(url, name) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Cannot load ${url}: ${response.status}`);
  const page = new DOMParser().parseFromString(await response.text(), 'text/html');
  const root = page.querySelector(`.${name}`);
  if (!root) throw new Error(`${url} has no element with class "${name}"`);
  return root;
}

async function fillPlaceholder(placeholder) {
  const name = placeholder.dataset.include;
  const base = `/components/${name}/${name}`;

  try {
    if (!components.includes(name)) {
      throw new Error(`"${name}" is not listed in js/components.js`);
    }
    await loadStyle(`${base}.css`);
    placeholder.replaceChildren(await loadMarkup(`${base}.html`, name));
    await include(placeholder);

    const module = await import(`${base}.js`);
    module.init(placeholder);
  } catch (error) {
    placeholder.textContent = `Failed to include "${name}"`;
    console.error(error);
  }
}

export function include(container) {
  const placeholders = [...container.querySelectorAll('[data-include]')];
  return Promise.all(placeholders.map(fillPlaceholder));
}

await include(document);
