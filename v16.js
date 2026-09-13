(()=>{'use strict';
const KEY='oritv-v16-sources';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(_){return []}};
const write=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch(_){}};
function openSources(){
 let old=document.querySelector('.v16-source-overlay');if(old)old.remove();
 const box=document.createElement('div');box.className='v16-source-overlay';box.innerHTML='<div class="v16-source-panel"><div class="v16-source-head"><div><div class="eyebrow">ORITV ENGINE</div><h2>Источники</h2></div><button class="v16-close">×</button></div><p class="empty">Добавь адрес своего JSON/API каталога. Настройки сохраняются на телевизоре.</p><div class="v16-source-form"><input class="v16-url" placeholder="https://example.com/catalog.json"><button class="v16-add">Добавить</button></div><div class="v16-source-list"></div><div class="v16-source-status">Lampa-compatible adapter готов к подключению вашего каталога.</div></div>';
 document.body.appendChild(box);const list=box.querySelector('.v16-source-list');
 const render=()=>{const a=read();list.innerHTML=a.map((s,i)=>'<div class="v16-source-item"><div><strong>'+s.name+'</strong><small>'+s.url+'</small></div><button data-i="'+i+'">Удалить</button></div>').join('')||'<p class="empty">Источников пока нет.</p>';list.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=read();a.splice(+b.dataset.i,1);write(a);render()})};
 box.querySelector('.v16-close').onclick=()=>box.remove();box.querySelector('.v16-add').onclick=()=>{const input=box.querySelector('.v16-url'),url=input.value.trim();if(!url)return;const a=read();if(!a.some(x=>x.url===url)){a.push({name:'Источник '+(a.length+1),url});write(a)}input.value='';render()};render();
}
function boot(){const stamp=document.createElement('div');stamp.className='v16-build';stamp.textContent='OriTV v16 · Lampa adapter';document.body.appendChild(stamp);document.addEventListener('click',e=>{const setting=e.target.closest('.setting');if(setting&&(setting.textContent||'').includes('Источники')){e.preventDefault();e.stopPropagation();openSources()}},true);window.OriTVV16={openSources,sources:read};}
window.addEventListener('load',boot);
})();