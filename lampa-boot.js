(()=>{
'use strict';
function boot(){
const E=window.OriTVLampaEngine;
if(!E)return;
window.addEventListener('keydown',e=>{const map={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};if(map[e.key])E.Controller.move(map[e.key]);if(e.key==='Escape')E.Controller.back()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();