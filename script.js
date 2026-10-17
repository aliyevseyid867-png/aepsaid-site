const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const menuToggle = $('#menuToggle');
const mobileNav = $('#mobileNav');
menuToggle?.addEventListener('click', () => mobileNav.classList.toggle('open'));
$$('#mobileNav a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

// Before/after CC slider.
const preview = $('#ccPreview');
const range = $('#compareRange');
const compareLine = $('#compareLine');
function updateCompare() {
  preview.style.setProperty('--split', `${range.value}%`);
  compareLine.style.left = `${range.value}%`;
}
range.addEventListener('input', updateCompare);
updateCompare();
$$('.swatch').forEach(button => button.addEventListener('click', () => {
  $$('.swatch').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  $('#ccName').textContent = button.dataset.name;
  $('#previewAfter').style.filter = button.dataset.filter;
}));

// A small candle-light interaction in the dark section.
const scene = $('#candleScene');
const glow = $('#candleGlow');
scene.addEventListener('pointermove', event => {
  const rect = scene.getBoundingClientRect();
  glow.style.left = `${event.clientX - rect.left}px`;
  glow.style.top = `${event.clientY - rect.top}px`;
});
scene.addEventListener('pointerleave', () => { glow.style.left = '50%'; glow.style.top = '50%'; });

const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
$('#ccButton').addEventListener('click', () => showToast('Add your product price and checkout link in index.html when you are ready.'));
$('#orderForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    'Hi! I would like to ask about a project.',
    `Name: ${data.get('name')}`,
    `Request: ${data.get('type')}`,
    `Details: ${data.get('details')}`,
    `Contact: ${data.get('contact')}`
  ].join('\n');
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(message).then(() => showToast('Inquiry copied! Paste it into your preferred messaging app.')).catch(() => showMessageFallback(message));
  } else showMessageFallback(message);
});
function showMessageFallback(message) {
  const area = document.createElement('textarea');
  area.value = message; area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;opacity:0;left:-9999px';
  document.body.appendChild(area); area.select();
  try { document.execCommand('copy'); showToast('Inquiry copied! Paste it into your preferred messaging app.'); }
  catch { showToast('Copy failed. Please copy the form details manually.'); }
  area.remove();
}
