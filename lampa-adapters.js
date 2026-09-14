/* OriTV adapters for Lampa-compatible data flows. */
(()=>{
'use strict';
const E=window.OriTVLampaEngine||{};
const S=E.Storage;
const events=E.Events;
const favorites={
key:'oritv-favorites',
all(){return S.get(this.key,[])},
has(id){return this.all().some(x=>String(x.id)===String(id))},
toggle(item){let a=this.all().filter(x=>String(x.id)!==String(item.id));if(!this.has(item.id))a.unshift(item);S.set(this.key,a);events.emit('favorite',a);return a}
};
const timeline={
key:'oritv-timeline',
get(id){return S.get(this.key,{})[String(id)]||null},
set(id,time,duration){const a=S.get(this.key,{});a[String(id)]={time:Number(time)||0,duration:Number(duration)||0,percent:duration?Math.round(time/duration*100):0,updated:Date.now()};S.set(this.key,a);events.emit('timeline',a[String(id)])}
};
const api={
async json(url,options={}){const r=await fetch(url,options);if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}
};
window.Lampa=window.Lampa||{};
window.Lampa.Favorite=favorites;
window.Lampa.Timeline=timeline;
window.Lampa.Api=api;
window.OriTVLampaAdapters={favorites,timeline,api};
})();