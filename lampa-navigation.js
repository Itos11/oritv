/* OriTV unified navigation — Lampa-style input/focus architecture */
(()=>{'use strict';
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
let focused=null, down=null, suppressClick=false;
const visible=e=>{if(!e||e.disabled)return false;const r=e.getBoundingClientRect(),c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0};
const items=()=>qa('.focusable').filter(visible);
function focus(el){if(!visible(el))return;qa('.focused').forEach(x=>x.classList.remove('focused'));focused=el;el.classList.add('focused');try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(_){} }
function current(){return visible(focused)?focused:(q('.focused')||items()[0]);}
function activate(el=current()){if(!el)return;el.click()}
function nearest(dir){const from=current();if(!from)return null;const r=from.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let best=null,score=Infinity;for(const el of items()){if(el===from)continue;const x=el.getBoundingClientRect(),ex=x.left+x.width/2,ey=x.top+x.height/2;const primary=dir==='left'?cx-ex:dir==='right'?ex-cx:dir==='up'?cy-ey:ey-cy;if(primary<6)continue;const cross=(dir==='left'||dir==='right')?Math.abs(ey-cy):Math.abs(ex-cx);const s=primary+cross*2.4;if(s<score){score=s;best=el}}return best}
function move(dir){const n=nearest(dir);if(n)focus(n)}
function closeOverlay(){const detail=q('#detail'),search=q('#search');if(detail&&!detail.classList.contains('hidden')){detail.classList.add('hidden');if(location.hash.startsWith('#/detail/'))history.back();return true}if(search&&!search.classList.contains('hidden')){search.classList.add('hidden');return true}return false}
function back(){if(closeOverlay())return true;if(typeof window.goBack==='function'){window.goBack();return true}if(window.OriTVEngine?.back){window.OriTVEngine.back();return true}history.back();return true}
function pointerDown(e){if(e.pointerType==='mouse')return;const t=e.target.closest('.focusable,button,[data-action]');if(t)down={x:e.clientX,y:e.clientY,target:t};}
function pointerUp(e){if(!down)return;const d=down,dx=e.clientX-d.x,dy=e.clientY-d.y;down=null;if(Math.hypot(dx,dy)>=14){suppressClick=true;setTimeout(()=>suppressClick=false,350);if(dx>70&&Math.abs(dy)<80&&d.x<70)back();}}
function bind(){document.addEventListener('pointerdown',pointerDown,{passive:true});document.addEventListener('pointerup',pointerUp,{passive:true});document.addEventListener('pointercancel',()=>down=null,{passive:true});document.addEventListener('click',e=>{if(!suppressClick)return;e.preventDefault();e.stopPropagation();suppressClick=false},{capture:true});document.addEventListener('focusin',e=>{if(e.target.classList.contains('focusable'))focus(e.target)});new MutationObserver(()=>{if(!visible(focused)){const f=q('.focused')||items()[0];if(f)focus(f)}}).observe(document.body,{subtree:true,childList:true});}
window.OriTVNavigation={focus,activate,move,back,nearest,current,items};window.OriTVLampaNavigation=window.OriTVNavigation;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
