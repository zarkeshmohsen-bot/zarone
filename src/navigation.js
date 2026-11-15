// Progressive enhancement; the native summary remains usable without JavaScript.
const menu = document.querySelector('.mobile-navigation');
if (menu) {
  const trigger = menu.querySelector('summary');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      trigger.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
  });
  window.matchMedia('(max-width: 48rem)').addEventListener('change', () => { menu.open = false; });
}
