// Only public portfolio data; no tracking, external service or client history is stored.
const form = document.querySelector('[data-project-filter]');
if (form) {
  const input = form.querySelector('input'), cards = [...document.querySelectorAll('[data-project-search]')];
  const count = document.querySelector('[data-project-count]'), empty = document.querySelector('[data-project-empty]');
  const fold = s => s.normalize('NFKC').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[۰-۹]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[\u200c\u200d]/g,' ').toLowerCase().replace(/\s+/g,' ').trim();
  const apply = (updateUrl = true) => {
    const words = fold(input.value).split(' ').filter(Boolean); let matches = 0;
    cards.forEach(card => { const show = words.every(w => fold(card.dataset.projectSearch).includes(w)); card.hidden = !show; if(show) matches++; });
    count.hidden = words.length === 0;
    count.textContent = `${new Intl.NumberFormat('fa-IR').format(matches)} از ${new Intl.NumberFormat('fa-IR').format(cards.length)} پروژه`;
    empty.hidden = matches !== 0;
    form.querySelector('[data-clear-projects]').hidden = !input.value;
    if(updateUrl) { const url = new URL(location.href); input.value.trim() ? url.searchParams.set('q',input.value.trim()) : url.searchParams.delete('q'); history.replaceState(null,'',url); }
  };
  const restore = () => { input.value = (new URL(location.href).searchParams.get('q') ?? '').slice(0,120); apply(false); };
  form.hidden = false; restore();
  input.addEventListener('input',() => apply());
  form.addEventListener('submit',e => { e.preventDefault(); apply(); });
  form.querySelector('[data-clear-projects]').addEventListener('click',() => { input.value=''; apply(); input.focus(); });
  window.addEventListener('popstate',restore);
}
