/* OriTV mobile controls: touch-first navigation */
(()=>{'use strict';
const MOBILE_MAX=700;
function action(name){const el=document.querySelector('[data-action="'+name+'"]');if(el)el.click()}
function route(){const h=location.hash||'#/home';return (h.split('/')[1]||'home')}
function build(){if(window.innerWidth>MOBILE_MAX||document.querySelector('.mobile-nav'))return;const nav=document.createElement('nav');nav.className='mobile-nav';nav.setAttribute('aria-label','Мобильная навигация');nav.innerHTML='<button data-mobile="home"><span>⌂</span><b>Главная</b></button><button data-mobile="movies"><span>▣</span><b>Фильмы</b></button><button data-mobile="series"><span>▤</span><b>Сериалы</b></button><button data-mobile="favorites"><span>♡</span><b>Избранное</b></button><button data-mobile="search"><span>⌕</span><b>Поиск</b></button>';nav.addEventListener('click',e=>{const b=e.target.closest('button[data-mobile]');if(!b)return;action(b.dataset.mobile);mark(b.dataset.mobile)});document.body.appendChild(nav);mark(route())}
function mark(name){const active=name==='detail'?'home':name;document.querySelectorAll('.mobile-nav button').forEach(b=>{const on=b.dataset.mobile===active;b.classList.toggle('active',on);b.setAttribute('aria-current',on?'page':'false')})}
function sync(){if(window.innerWidth<=MOBILE_MAX){if(!document.querySelector('.mobile-nav'))build();else mark(route())}else{const n=document.querySelector('.mobile-nav');if(n)n.remove()}}
window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);window.addEventListener('resize',sync);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
