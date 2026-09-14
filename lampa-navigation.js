/* OriTV unified navigation — Lampa-style input/focus architecture */
(()=>{'use strict';
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
let focused=null, down=null;
const visible=e=>{if(!e||e.disabled)return false;const r=e.getBoundingClientRect(),c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0};
const items=()=>qa('.focusable').filter(visible);
function focus(el){if(!visible(el))return;qa('.focused').forEach(x=>x.classList.remove('focused'));focused=el;el.classList.add('focused');try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(_){}}
function current(){return visible(focused)?focused:(q('.focused')||items()[0]);}
function activate(el=current()){if(!el)return;el.click()}
function nearest(dir){const from=current();if(!from)return null;const r=from.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let best=null,score=Infinity;for(const el of items()){if(el===from)continue;const x=el.getBoundingClientRect(),ex=x.left+x.width/2,ey=x.top+x.height/2;const primary=dir==='left'?cx-ex:dir==='right'?ex-cx:dir==='up'?cy-ey:ey-cy;if(primary<6)continue;const cross=(dir==='left'||dir==='right')?Math.abs(ey-cy):Math.abs(ex-cx);const s=primary+cross*2.4;if(s<score){score=s;best=el}}return best}
function move(dir){const n=nearest(dir);if(n)focus(n);}
function back(){const detail=q('#detail'),search=q('#search');if(detail&&!detail.classList.contains('hidden')){q('[data-action="close-detail"]')?.click();return true}if(search&&!search.classList.contains('hidden')){q('[data-action="close-search"]')?.click();return true}if(typeof window.goBack==='function'){window.goBack();return true}if(window.OriTVEngine?.back){window.OriTVEngine.back();return true}history.back();return true}
function key(e){const k=e.keyCode||e.which;if(![37,38,39,40,13,461,27,8].includes(k))return;if(e.target.matches('input,textarea,[contenteditable="true"]')&&!([461,27,8].includes(k)))return;e.preventDefault();if(k===13)activate();else if([461,27,8].includes(k))back();else move({37:'left',38:'up',39:'right',40:'down'}[k]);}
function pointerDown(e){if(e.pointerType==='mouse')return;const t=e.target.closest('.focusable,button,[data-action]');if(t)down={x:e.clientX,y:e.clientY,target:t,scroller:t.closest('.cards')};}
function pointerUp(e){if(!down)return;const d=down,dx=e.clientX-d.x,dy=e.clientY-d.y;down=null;if(Math.hypot(dx,dy)<14){activate(d.target);return}if(d.scroller&&Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>20){d.scroller.scrollLeft-=dx;return}if(dx>70&&Math.abs(dy)<80&&d.x<70)back();}
function bind(){document.addEventListener('keydown',key,true);document.addEventListener('pointerdown',pointerDown,{passive:true});document.addEventListener('pointerup',pointerUp,{passive:true});document.addEventListener('pointercancel',()=>down=null,{passive:true});document.addEventListener('focusin',e=>{if(e.target.classList.contains('focusable'))focus(e.target)});new MutationObserver(()=>{if(!visible(focused)){const f=q('.focused')||items()[0];if(f)focus(f)}}).observe(document.body,{subtree:true,childList:true});}
window.OriTVNavigation={focus,activate,move,back,nearest,current,items};window.OriTVLampaNavigation=window.OriTVNavigation;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
