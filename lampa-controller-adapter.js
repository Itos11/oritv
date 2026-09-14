/* OriTV Lampa Controller adapter — GPL-2.0 compatible adaptation.
 * Upstream architecture: https://github.com/yumata/lampa-source
 */
(()=>{'use strict';
const listeners=new Map();let active='content';const controls=new Map();let focused=null;
const on=(n,f)=>{if(!listeners.has(n))listeners.set(n,[]);listeners.get(n).push(f);return()=>listeners.set(n,(listeners.get(n)||[]).filter(x=>x!==f))};
const emit=(n,d)=>{(listeners.get(n)||[]).slice().forEach(f=>{try{f(d)}catch(e){}})};
function collection(){return [...document.querySelectorAll('.focusable,[data-action]')].filter(e=>e.offsetParent!==null&&!e.disabled)}
function focus(el){if(!el)return;document.querySelectorAll('.focused').forEach(x=>x.classList.remove('focused'));focused=el;el.classList.add('focused');el.scrollIntoView({block:'nearest',inline:'nearest'});emit('focus',{element:el})}
function initial(){if(!focused)focus(collection()[0])}
function add(name,obj){controls.set(name,obj||{})}
function toggle(name){active=name;emit('toggle',{name});if(controls.has(name)&&controls.get(name).toggle)controls.get(name).toggle()}
function enter(){if(focused){focused.click();emit('enter',{element:focused})}}
function move(dir){const els=collection();if(!els.length)return;let i=Math.max(0,els.indexOf(focused));let target=null;if(dir==='right'||dir==='left'){target=els[i+(dir==='right'?1:-1)]}else{const r=focused&&focused.getBoundingClientRect();let best=null,bestD=1e9;els.forEach((e,j)=>{if(e===focused)return;const q=e.getBoundingClientRect();if(dir==='down'&&q.top<r.bottom-4)return;if(dir==='up'&&q.bottom>r.top+4)return;const d=Math.abs(q.left-r.left)+Math.abs(q.top-r.top)*2;if(d<bestD){bestD=d;best=e}});target=best}if(target)focus(target)}
function back(){emit('back');if(window.OriTVEngine&&window.OriTVEngine.back)window.OriTVEngine.back()}
window.OriTVLampaController={on,emit,add,toggle,move,enter,back,focus,initial,enabled:()=>active,clear:()=>{focused=null;document.querySelectorAll('.focused').forEach(x=>x.classList.remove('focused'))}};
function key(e){const k=e.keyCode||e.which;const map={37:'left',38:'up',39:'right',40:'down',13:'enter',461:'back',27:'back',8:'back',415:'play',19:'pause',403:'red',404:'green',405:'yellow',406:'blue'};const a=map[k];if(!a)return;e.preventDefault();if(a==='left'||a==='right'||a==='up'||a==='down')move(a);else if(a==='enter')enter();else if(a==='back')back();else emit(a)}
window.addEventListener('keydown',key,true);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initial);else initial();new MutationObserver(()=>{if(!focused)initial()}).observe(document.body,{childList:true,subtree:true});
})();
