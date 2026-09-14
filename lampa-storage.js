/* OriTV adapted subset of Lampa Storage logic. Upstream: https://github.com/yumata/lampa-source | GPL-2.0 */
(()=>{'use strict';
const cache=Object.create(null), listeners=new Set();
function parse(v,f){if(v===null||typeof v==='undefined'||v==='')return f;if(v==='true')return true;if(v==='false')return false;if(/^\d+$/.test(String(v)))return parseInt(v,10);if(typeof v==='string'&&(v[0]==='['||v[0]==='{')){try{return JSON.parse(v)}catch(_){}}return v}
function get(n,e){if(Object.prototype.hasOwnProperty.call(cache,n))return cache[n];const v=parse(localStorage.getItem(n),e);cache[n]=v;return v}
function set(n,v,no){cache[n]=v;let w=v;if(typeof v==='object'&&v!==null){try{w=JSON.stringify(v)}catch(_){w=''}}try{localStorage.setItem(n,String(w))}catch(_){}if(!no){const x={name:n,value:v};listeners.forEach(fn=>{try{fn(x)}catch(_){}})}}
function add(n,v,no){const a=get(n,[]);if(Array.isArray(a)&&!a.includes(v)){a.push(v);set(n,a,no);return true}return false}
function remove(n,v){const a=get(n,[]);if(Array.isArray(a)){const b=a.filter(x=>x!==v);set(n,b);return b}}
function on(fn){listeners.add(fn);return()=>listeners.delete(fn)}
function clear(full){if(full)localStorage.clear();else Object.keys(localStorage).filter(k=>/^(online_|file_view_|storage_)/.test(k)||['search_history','recomends_list','timetable'].includes(k)).forEach(k=>localStorage.removeItem(k));Object.keys(cache).forEach(k=>delete cache[k])}
window.OriTVLampaStorage={get,set,add,remove,on,clear,value:(n,e)=>localStorage.getItem(n)||e||'',field:(n,d)=>get(n,d)};
})();