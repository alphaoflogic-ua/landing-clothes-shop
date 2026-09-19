// init(container) is called after the markup is on the page:
// by include.js on the landing, and by example.html itself.
// There may be several copies of the component inside the container.

export function init(container) {
  for (const example of container.querySelectorAll('.example')) {
    const toggle = example.querySelector('.example__toggle');
    const details = example.querySelector('.example__details');

    toggle.addEventListener('click', () => {
      details.hidden = !details.hidden;
      toggle.textContent = details.hidden ? 'Show details' : 'Hide details';
    });
  }
}
