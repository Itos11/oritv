/* OriTV engine bridge, based on Lampa architecture. Lampa source is GPL-2.0. */
(()=>{
'use strict';
const root=window.Lampa=window.Lampa||{};
const storage={get:(k,d)=>{try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(_){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}},remove:k=>{try{localStorage.removeItem(k)}catch(_){}}};
const listeners={};
const on=(name,fn)=>{(listeners[name]||(listeners[name]=[])).push(fn);return()=>{listeners[name]=(listeners[name]||[]).filter(x=>x!==fn)}};
const emit=(name,data)=>{(listeners[name]||[]).slice().forEach(fn=>{try{fn(data)}catch(e){console.error(e)}})};
const ua=navigator.userAgent.toLowerCase();
const platform=typeof webOS!=='undefined'&&webOS.platform&&webOS.platform.tv?'webos':typeof tizen!=='undefined'?'tizen':/android tv|googletv|mibox|mitv|smarttv/.test(ua)?'android_tv':'browser';
root.Storage=storage;
root.Platform={get:()=>platform,is:p=>Array.isArray(p)?p.includes(platform):platform===p,tv:()=>['webos','tizen','android_tv'].includes(platform)};
root.Events={on,emit};
root.Controller={add:()=>{},toggle:()=>{},run:()=>{},move:dir=>emit('controller',{direction:dir}),back:()=>emit('back',{})};
window.OriTVLampaEngine={version:'1.0',Storage:storage,Platform:root.Platform,Events:root.Events,Controller:root.Controller};
})();