/* OriTV player adapter. HTML5 fallback with WebOS-aware hooks. */
(()=>{
'use strict';
const E=window.OriTVLampaEngine||{};
const T=window.OriTVLampaAdapters&&window.OriTVLampaAdapters.timeline;
let video=null,work=null;
function create(){if(video)return video;video=document.createElement('video');video.controls=true;video.preload='metadata';video.playsInline=true;video.style.cssText='position:fixed;inset:0;width:100%;height:100%;background:#000;z-index:99999';return video}
function play(data){work=data||{};const v=create();v.src=work.url||'';document.body.appendChild(v);const saved=T&&T.get(work.id);v.onloadedmetadata=()=>{if(saved&&saved.time>5&&saved.percent<95)v.currentTime=saved.time;v.play().catch(()=>{})};v.ontimeupdate=()=>{if(T&&v.duration)T.set(work.id,v.currentTime,v.duration)};v.onended=()=>{if(T&&v.duration)T.set(work.id,v.duration,v.duration);E.Events&&E.Events.emit('player_end',work)};E.Events&&E.Events.emit('player_start',work);return v}
function stop(){if(video){video.pause();video.remove();video=null}E.Events&&E.Events.emit('player_stop',work);work=null}
function current(){return video}
window.Lampa=window.Lampa||{};
window.Lampa.Player={play,stop,current,isWebOS:()=>E.Platform&&E.Platform.is('webos')};
window.OriTVLampaPlayer={play,stop,current};
})();