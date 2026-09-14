/* OriTV platform layer: normalizes remote/keyboard input without swipe gestures. */
(()=>{
'use strict';
const map={37:'left',38:'up',39:'right',40:'down',13:'ok',27:'back',8:'back',461:'back'};
window.OriTVPlatform={
  isTV: /Web0S|WebOS|SMART-TV|Tizen|NetCast/i.test(navigator.userAgent),
  isTouch: ('ontouchstart' in window)||navigator.maxTouchPoints>0,
  keyName(code){return map[code]||null},
  version:'1.0.0'
};
})();
