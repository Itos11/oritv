/* OriTV TV navigation fix — keep horizontal movement inside the current row */
(()=>{'use strict';
const visible=e=>{if(!e||e.disabled)return false;const r=e.getBoundingClientRect(),c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&r.width>0&&r.height>0};
let lastKey='',lastKeyAt=0;
document.addEventListener('keydown',e=>{
 const code=e.keyCode||e.which;
 if(code!==37&&code!==39)return;
 const nav=window.OriTVNavigation;
 const cur=nav&&nav.current&&nav.current();
 const row=cur&&cur.closest&&cur.closest('.row');
 if(!row)return;
 const list=[...row.querySelectorAll('.cards .focusable')].filter(visible);
 const i=list.indexOf(cur),ni=code===37?i-1:i+1;
 const now=Date.now();
 if(code===lastKey&&now-lastKeyAt<130){e.preventDefault();e.stopImmediatePropagation();return}
 lastKey=code;lastKeyAt=now;
 e.preventDefault();e.stopImmediatePropagation();
 if(ni>=0&&ni<list.length&&nav&&nav.focus)nav.focus(list[ni]);
},{capture:true});
})();
