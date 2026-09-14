/* OriTV mobile controls: touch-first scrolling and navigation */
(()=>{'use strict';
const MOBILE_MAX=700;let touch=null;
function action(name){const el=document.querySelector('[data-action="'+name+'"]');if(el)el.click()}
function route(){const h=location.hash||'#/home';return (h.split('/')[1]||'home')}
function build(){if(window.innerWidth>MOBILE_MAX||document.querySelector('.mobile-nav'))return;const nav=document.createElement('nav');nav.className='mobile-nav';nav.setAttribute('aria-label','Мобильная навигация');nav.innerHTML='<button data-mobile="home"><span>⌂</span><b>Главная</b></button><button data-mobile="movies"><span>▣</span><b>Фильмы</b></button><button data-mobile="series"><span>▤</span><b>Сериалы</b></button><button data-mobile="favorites"><span>♡</span><b>Избранное</b></button><button data-mobile="search"><span>⌕</span><b>Поиск</b></button>';nav.addEventListener('click',e=>{const b=e.target.closest('button[data-mobile]');if(!b)return;action(b.dataset.mobile);mark(b.dataset.mobile)});document.body.appendChild(nav);mark(route())}
function touchStyles(){if(window.innerWidth>700)return;const v=document.querySelector('.view');if(v)v.style.touchAction='pan-y';document.querySelectorAll('.cards').forEach(x=>x.style.touchAction='pan-x pan-y');document.querySelectorAll('.cards .card').forEach(x=>x.style.touchAction='auto');document.querySelectorAll('.grid .card,.back-btn,.action,.mobile-nav button').forEach(x=>x.style.touchAction='manipulation')}
function mark(name){const active=name==='detail'?'home':name;document.querySelectorAll('.mobile-nav button').forEach(b=>{const on=b.dataset.mobile===active;b.classList.toggle('active',on);b.setAttribute('aria-current',on?'page':'false')})}
function bindTouch(){
 document.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;const p=e.touches[0],target=e.target.closest('button,a,[data-action],.focusable'),cards=e.target.closest('.cards');touch={x:p.clientX,y:p.clientY,lastX:p.clientX,lastY:p.clientY,target,cards,moved:false,mode:null};},{passive:true});
 document.addEventListener('touchmove',e=>{if(!touch||e.touches.length!==1)return;const p=e.touches[0],dx=p.clientX-touch.x,dy=p.clientY-touch.y;if(!touch.mode&&Math.hypot(dx,dy)>6){touch.mode=Math.abs(dx)>Math.abs(dy)?'x':'y';touch.moved=true}
  if(!touch.mode)return;
  e.preventDefault();
  const ddx=p.clientX-touch.lastX,ddy=p.clientY-touch.lastY;touch.lastX=p.clientX;touch.lastY=p.clientY;
  if(touch.mode==='x'&&touch.cards)touch.cards.scrollLeft-=ddx;
  else if(touch.mode==='y'){const v=document.querySelector('.view');if(v)v.scrollTop-=ddy;}
 },{passive:false});
 document.addEventListener('touchend',e=>{if(!touch||e.changedTouches.length!==1)return;const d=touch,p=e.changedTouches[0];touch=null;if(d.moved)return;e.preventDefault();if(d.target)d.target.click()},{passive:false});
 document.addEventListener('touchcancel',()=>touch=null,{passive:true});
 new MutationObserver(touchStyles).observe(document.body,{subtree:true,childList:true})
}
function sync(){if(window.innerWidth<=MOBILE_MAX){if(!document.querySelector('.mobile-nav'))build();else mark(route());touchStyles()}else{const n=document.querySelector('.mobile-nav');if(n)n.remove()}}
window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);window.addEventListener('resize',sync);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{build();bindTouch();touchStyles()});else{build();bindTouch();touchStyles()}
})();