// init(container) is called after the markup is on the page:
// by include.js on the landing, and by example.html itself.
// There may be several copies of the component inside the container.

export function init(container) {
  const forms = container.querySelectorAll('.newsletter__form');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  });
}
