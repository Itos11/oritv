/* OriTV mobile controls: tap navigation, no swipe gestures */
(()=>{'use strict';
function action(name){const el=document.querySelector('[data-action="'+name+'"]');if(el)el.click()}
function build(){if(window.innerWidth>700||document.querySelector('.mobile-nav'))return;const nav=document.createElement('nav');nav.className='mobile-nav';nav.setAttribute('aria-label','Мобильная навигация');nav.innerHTML='<button data-mobile="home"><span>⌂</span>Главная</button><button data-mobile="movies"><span>▣</span>Фильмы</button><button data-mobile="series"><span>▤</span>Сериалы</button><button data-mobile="favorites"><span>♡</span>Избранное</button><button data-mobile="search"><span>⌕</span>Поиск</button>';nav.addEventListener('click',e=>{const b=e.target.closest('button[data-mobile]');if(!b)return;action(b.dataset.mobile);mark(b.dataset.mobile)});document.body.appendChild(nav);mark('home')}
function mark(name){document.querySelectorAll('.mobile-nav button').forEach(b=>b.classList.toggle('active',b.dataset.mobile===name))}
window.addEventListener('hashchange',()=>{const p=(location.hash.split('/')[1]||'home');mark(p)});
window.addEventListener('resize',()=>{const n=document.querySelector('.mobile-nav');if(window.innerWidth<=700){if(!n)build()}else if(n)n.remove()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
