const response = await fetch('/css/theme.css');
const css = await response.text();
const style = document.createElement('style');
style.setAttribute('type', 'text/tailwindcss');
style.textContent = css;
document.head.append(style);
