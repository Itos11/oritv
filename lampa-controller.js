/* OriTV adapter of Lampa-style Controller concepts. Upstream: https://github.com/yumata/lampa-source | GPL-2.0 */
(()=>{'use strict';
const handlers={};let active=true;
function add(name,fn){if(!name||typeof fn!=='function')return;handlers[name]=fn}
function remove(name){delete handlers[name]}
function trigger(name,data){if(!active)return false;const fn=handlers[name];if(typeof fn!=='function')return false;try{fn(data);return true}catch(_){return false}}
function toggle(v){active=v!==false}
window.OriTVLampaController={add,remove,trigger,toggle,handlers};
if(window.OriTVEngine){window.OriTVEngine.on('remote',key=>trigger(key))}
})();
