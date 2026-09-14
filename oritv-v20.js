(()=>{'use strict';
function ready(){
 const C=window.OriTVCore;if(!C)return;
 const findCard=e=>e.closest&&e.closest('[data-id],[data-tmdb-id],.movie-card,.card');
 document.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('[data-action="watch"],[data-action="play"]');
  if(b){const id=b.dataset.id||b.closest('[data-id]')?.dataset.id;if(id&&window.TMDB?.details){window.TMDB.details(id,'movie').then(x=>{if(x?.url)C.play({id:x.id,title:x.title||x.name,url:x.url});else window.dispatchEvent(new CustomEvent('oritv:source-needed',{detail:x}))}).catch(()=>{})}}
  const f=e.target.closest&&e.target.closest('[data-action="favorite"]');if(f){const d={id:f.dataset.id,title:f.dataset.title,poster_path:f.dataset.poster};C.favorite(d)}
 },true);
 window.addEventListener('oritv:play',e=>{if(e.detail?.url)C.play(e.detail)});
 C.on('remote',k=>{if(k==='back'&&document.querySelector('.oritv-player'))C.closePlayer()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();