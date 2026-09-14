/* OriTV unified navigation — Lampa-style input/focus architecture */
(()=>{'use strict';
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
let focused=null;
const visible=e=>{if(!e||e.disabled)return false;const r=e.getBoundingClientRect(),c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0};
const items=()=>qa('.focusable').filter(visible);
function focus(el){if(!visible(el))return;qa('.focused').forEach(x=>x.classList.remove('focused'));focused=el;el.classList.add('focused');try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(_){} }
function current(){return visible(focused)?focused:(q('.focused')||items()[0]);}
function activate(el=current()){if(el)el.click()}
function nearest(dir){const from=current();if(!from)return null;const r=from.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let best=null,score=Infinity;for(const el of items()){if(el===from)continue;const x=el.getBoundingClientRect(),ex=x.left+x.width/2,ey=x.top+x.height/2;const primary=dir==='left'?cx-ex:dir==='right'?ex-cx:dir==='up'?cy-ey:ey-cy;if(primary<6)continue;const cross=(dir==='left'||dir==='right')?Math.abs(ey-cy):Math.abs(ex-cx),s=primary+cross*2.4;if(s<score){score=s;best=el}}return best}
function move(dir){const n=nearest(dir);if(n)focus(n)}
function closeOverlay(){const detail=q('#detail'),search=q('#search');if(detail&&!detail.classList.contains('hidden')){detail.classList.add('hidden');if(location.hash.startsWith('#/detail/'))history.back();return true}if(search&&!search.classList.contains('hidden')){search.classList.add('hidden');return true}return false}
function back(){if(closeOverlay())return true;if(typeof window.goBack==='function'){window.goBack();return true}if(window.OriTVEngine?.back){window.OriTVEngine.back();return true}history.back();return true}
function bind(){document.addEventListener('focusin',e=>{if(e.target.classList.contains('focusable'))focus(e.target)});new MutationObserver(()=>{if(!visible(focused)){const f=q('.focused')||items()[0];if(f)focus(f)}}).observe(document.body,{subtree:true,childList:true})}
window.OriTVNavigation={focus,activate,move,back,nearest,current,items};window.OriTVLampaNavigation=window.OriTVNavigation;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
