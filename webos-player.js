/* OriTV WebOS player adapter. Keeps OriTV UI independent from playback implementation. */
(()=>{'use strict';
const isWebOS=/Web0S|WebOS/i.test(navigator.userAgent||'');
function open(media){
 if(!media||!media.url)return null;
 const v=document.createElement('video');v.className='oritv-player';v.src=media.url;v.autoplay=true;v.controls=false;v.playsInline=true;
 Object.assign(v.style,{position:'fixed',inset:'0',zIndex:'20000',width:'100%',height:'100%',background:'#000'});
 document.body.appendChild(v);
 const close=()=>{try{v.pause();v.removeAttribute('src');v.load()}catch(_){}v.remove()};
 v.addEventListener('ended',close,{once:true});
 v.addEventListener('error',()=>window.OriTVEngine?.emit('player:error',v.error));
 v.play().catch(()=>{});
 window.OriTVWebOSPlayer={video:v,close};
 return v;
}
window.OriTVWebOSPlayer={open,available:isWebOS,video:null,close:()=>{try{window.OriTVWebOSPlayer.video?.remove()}catch(_){}}};
if(window.OriTVEngine)window.OriTVEngine.on('player:play',media=>{if(isWebOS&&media?.url)open(media)});
})();
