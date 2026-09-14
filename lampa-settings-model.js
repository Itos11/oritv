/* OriTV adapted Lampa settings model. Upstream: https://github.com/yumata/lampa-source | GPL-2.0 */
(()=>{'use strict';
const S=window.OriTVLampaStorage;
const values={},defaults={};
function select(n,v,d){values[n]=v;defaults[n]=d}
function toggle(n,d){values[n]={true:'Да',false:'Нет'};defaults[n]=d}
const webos=/web0s|webos/i.test(navigator.userAgent);
select('player',webos?{inner:'Встроенный',webos:'WebOS'}:{inner:'Встроенный'},webos?'inner':'inner');
select('player_iptv',webos?{inner:'Встроенный',webos:'WebOS'}:{inner:'Встроенный'},webos?'inner':'inner');
select('player_torrent',webos?{inner:'Встроенный',webos:'WebOS'}:{inner:'Встроенный'},webos?'inner':'inner');
select('interface_size',{small:'Маленький',normal:'Обычный',bigger:'Большой'},'normal');
select('background_type',{blur:'Размытие',dark:'Тёмный',original:'Оригинальный'},'blur');
select('screensaver_type',{nature:'Природа',chrome:'ChromeCast',cub:'CUB',aerial:'Aerial'},'aerial');
select('keyboard_type',{lampa:'Lampa',integrate:'Системная'},'integrate');
select('navigation_type',{controll:'Пульт',mouse:'Мышь',touch:'Сенсор'},'controll');
select('protocol',{http:'Нет',https:'Да'},'https');
select('tmdb_lang',{ru:'Русский',en:'English',uk:'Українська'},'ru');
toggle('glass_style',false);toggle('advanced_animation',false);toggle('request_caching',true);
select('start_page',{main:'Главная',continue:'Продолжить'},'main');
toggle('card_quality',true);toggle('card_episodes',true);toggle('menu_always',false);toggle('light_version',false);toggle('screensaver',true);toggle('plugins_use',true);toggle('torrents_use',true);toggle('account_use',false);
function field(n){return S.get(n,defaults[n])}
function set(n,v){S.set(n,v)}
window.OriTVLampaSettings={values,defaults,field,set,select,toggle,webos};
})();