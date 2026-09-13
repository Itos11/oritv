/* OriTV Engine Layer
 * Platform-neutral foundation inspired by the architecture of open-source TV clients.
 * Lampa integration is kept behind adapters so OriTV can retain its own UI.
 */
(()=>{
'use strict';
const ua=navigator.userAgent||'';
const platform=/Web0S|WebOS/i.test(ua)?'webos':/Tizen/i.test(ua)?'tizen':/Android/i.test(ua)?'android':/iPhone|iPad|iPod/i.test(ua)?'ios':/Windows/i.test(ua)?'windows':/Macintosh/i.test(ua)?'macos':'web';
const KEY='oritv-engine-state';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(_){return {}}};
const write=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch(_) {}};
const state=read();
const listeners={};
function on(name,fn){(listeners[name]||(listeners[name]=[])).push(fn);return()=>{listeners[name]=(listeners[name]||[]).filter(x=>x!==fn)}}
function emit(name,data){(listeners[name]||[]).forEach(fn=>{try{fn(data)}catch(_){}})}
const sources=new Map();
function registerSource(id,source){if(!id||!source)return; sources.set(id,source);emit('source:add',{id,source})}
function removeSource(id){sources.delete(id);emit('source:remove',id)}
function getSources(){return [...sources.entries()].map(([id,source])=>({id,source}))}
function normalizeKey(e){const k=e.keyCode||e.which;return ({37:'left',38:'up',39:'right',40:'down',13:'ok',461:'back',27:'back',8:'back',403:'red',404:'green',405:'yellow',406:'blue'})[k]||null}
function platformBack(){if(platform==='webos'&&window.webOS&&typeof window.webOS.service==='function')return false;return false}
function pushRoute(route){if(!route)return;window.history.pushState({oritv:true},'',route);emit('route',route)}
function back(){if(window.history.length>1){window.history.back();return true}return platformBack()}
function play(media){emit('player:play',media);if(media&&media.url){const v=document.createElement('video');v.src=media.url;v.controls=true;v.autoplay=true;v.playsInline=true;Object.assign(v.style,{position:'fixed',inset:'0',zIndex:'9999',width:'100%',height:'100%',background:'#000'});document.body.appendChild(v);v.play().catch(()=>{});v.addEventListener('ended',()=>v.remove(),{once:true});return v}return null}
window.OriTVEngine={version:'0.1.0',platform,on,emit,normalizeKey,pushRoute,back,play,registerSource,removeSource,getSources,state};
window.addEventListener('keydown',e=>{const key=normalizeKey(e);if(key)emit('remote',key)});
})();
