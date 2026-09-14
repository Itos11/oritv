(()=>{
'use strict';
const files=['lampa-engine.js','lampa-adapters.js','lampa-player.js'];
function next(i){if(i>=files.length)return;const s=document.createElement('script');s.src=files[i]+'?v=1';s.onload=()=>next(i+1);document.head.appendChild(s)}
next(0);
})();