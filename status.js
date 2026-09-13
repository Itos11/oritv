(()=>{
'use strict';
window.addEventListener('load',()=>{
  const e=window.OriTVEngine||{};
  const top=document.querySelector('.head-actions');
  if(top&&!document.querySelector('.engine-status')){
    const s=document.createElement('span');
    s.className='engine-status';
    s.textContent='CORE '+(e.version||'0.1.0')+' · '+String(e.platform||'web').toUpperCase();
    top.prepend(s);
  }
  const hero=document.querySelector('.hero-inner');
  if(hero&&!document.querySelector('.engine-chip')){
    const c=document.createElement('div');
    c.className='engine-chip';
    c.innerHTML='<span></span> OriTV Engine активен';
    hero.prepend(c);
  }
});
})();
