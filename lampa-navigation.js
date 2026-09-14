/* OriTV Lampa-style navigation layer
 * Input/focus behavior is kept separate from the UI so the same navigation
 * works with touch, mouse, keyboard and TV remotes.
 */
(()=>{'use strict';
const isMobile=()=>window.matchMedia('(max-width:700px)').matches;
let down=null;
const qs=s=>document.querySelector(s);
const visible=e=>{if(!e)return false;const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0&&!e.disabled};
const focusables=()=>[...document.querySelectorAll('.focusable')].filter(visible);
function focus(el){if(!el)return;document.querySelectorAll('.focused').forEach(x=>x.classList.remove('focused'));el.classList.add('focused');try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(_){};if(window.OriTVLampaController&&window.OriTVLampaController.focus)window.OriTVLampaController.focus(el)}
function activate(el){if(!el)return;el.click()}
function back(){const detail=qs('#detail'),search=qs('#search');if(detail&&!detail.classList.contains('hidden')){qs('[data-action="close-detail"]')?.click();return true}if(search&&!search.classList.contains('hidden')){qs('[data-action="close-search"]')?.click();return true}if(window.OriTVLampaController&&window.OriTVLampaController.back)return window.OriTVLampaController.back(),true;if(window.OriTVEngine&&window.OriTVEngine.back)return window.OriTVEngine.back();return false}
function nearest(from,dir){const all=focusables(),r=from?.getBoundingClientRect();if(!r)return null;const cx=r.left+r.width/2,cy=r.top+r.height/2;let best=null,score=Infinity;for(const e of all){if(e===from)continue;const q=e.getBoundingClientRect(),x=q.left+q.width/2,y=q.top+q.height/2;let primary=dir==='left'?cx-x:dir==='right'?x-cx:dir==='up'?cy-y:y-cy;if(primary<8)continue;const cross=(dir==='left'||dir==='right')?Math.abs(y-cy):Math.abs(x-cx),s=primary+cross*2.2;if(s<score){score=s;best=e}}return best}
function move(dir){const cur=qs('.focused')||focusables()[0];if(!cur)return focusables()[0]&&focus(focusables()[0]);const n=nearest(cur,dir);if(n)focus(n)}
function pointerStart(e){if(!isMobile()||e.pointerType==='mouse')return;const t=e.target.closest('.focusable,button,[data-action]');if(!t)return;down={x:e.clientX,y:e.clientY,target:t,time:Date.now(),scroller:t.closest('.cards')};}
function pointerEnd(e){if(!down)return;const d=down,dx=e.clientX-d.x,dy=e.clientY-d.y,dist=Math.hypot(dx,dy);down=null;if(dist<12){activate(d.target);return}if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>35){if(d.scroller){d.scroller.scrollBy({left:-dx,behavior:'smooth'});return}if(dx>80&&d.x<70)back();}}
function touchCancel(){down=null}
function key(e){const k=e.keyCode||e.which;if(![37,38,39,40,13,461,27,8].includes(k))return;if(e.target.matches('input,textarea,[contenteditable="true"]')&&k!==461&&k!==27&&k!==8)return;e.preventDefault();if(k===13){activate(qs('.focused'));return}if(k===461||k===27||k===8){back();return}move({37:'left',38:'up',39:'right',40:'down'}[k])}
function bind(){document.addEventListener('pointerdown',pointerStart,{passive:true});document.addEventListener('pointerup',pointerEnd,{passive:true});document.addEventListener('pointercancel',touchCancel,{passive:true});document.addEventListener('keydown',key,true);document.addEventListener('click',e=>{const b=e.target.closest('.back-btn');if(b&&!b.dataset.lampaBound){b.dataset.lampaBound='1';activate(b)}},{capture:true});document.addEventListener('focusin',e=>{if(e.target.classList.contains('focusable'))focus(e.target)});}
window.OriTVNavigation={focus,activate,back,move,nearest,focusables};
window.OriTVLampaNavigation=window.OriTVNavigation;
if(window.OriTVLampaController){window.OriTVLampaController.add('navigation',()=>{});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
