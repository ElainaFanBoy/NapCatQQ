const _0x2546f5=_0x1dce;(function(_0x5e6503,_0x55f2ab){const _0x5399fc=_0x1dce,_0x1baf58=_0x5e6503();while(!![]){try{const _0x357885=parseInt(_0x5399fc(0xcb))/0x1*(parseInt(_0x5399fc(0xdd))/0x2)+parseInt(_0x5399fc(0xc8))/0x3*(parseInt(_0x5399fc(0xc9))/0x4)+parseInt(_0x5399fc(0xd0))/0x5+parseInt(_0x5399fc(0xd7))/0x6*(-parseInt(_0x5399fc(0xe0))/0x7)+-parseInt(_0x5399fc(0xcc))/0x8*(parseInt(_0x5399fc(0xda))/0x9)+-parseInt(_0x5399fc(0xd9))/0xa+parseInt(_0x5399fc(0xe7))/0xb;if(_0x357885===_0x55f2ab)break;else _0x1baf58['push'](_0x1baf58['shift']());}catch(_0x189e42){_0x1baf58['push'](_0x1baf58['shift']());}}}(_0x385a,0xe947f));import{BuddyListener,napCatCore}from'@/core';import{logDebug}from'@/common/utils/log';import{uid2UinMap}from'@/core/data';import{randomUUID}from'crypto';function _0x1dce(_0x1a7c38,_0x178c2d){const _0x385a8a=_0x385a();return _0x1dce=function(_0x1dce2b,_0x466b2b){_0x1dce2b=_0x1dce2b-0xc7;let _0x262e72=_0x385a8a[_0x1dce2b];return _0x262e72;},_0x1dce(_0x1a7c38,_0x178c2d);}const buddyChangeTasks=new Map(),buddyListener=new BuddyListener();buddyListener[_0x2546f5(0xe3)]=_0x18931a=>{const _0x274358=_0x2546f5,_0x110ce0={'MoFzh':function(_0x4a38a5,_0x353579){return _0x4a38a5(_0x353579);}};for(const [_0x3396fd,_0x2ea7a1]of buddyChangeTasks){_0x110ce0[_0x274358(0xd4)](_0x2ea7a1,_0x18931a),buddyChangeTasks[_0x274358(0xe4)](_0x3396fd);}},setTimeout(()=>{const _0x5ce6b7=_0x2546f5;napCatCore[_0x5ce6b7(0xd2)](()=>{const _0x4eea9a=_0x5ce6b7;napCatCore[_0x4eea9a(0xd8)](buddyListener);});},0x64);function _0x385a(){const _0x5480a5=['fIBGF','383403afMGth','4ZuzLlA','approvalFriendRequest','32743BNgalv','8nRFlxQ','leJSw','session','set','9006820tqRBjR','Epjme','onLoginSuccess','handleFriendRequest','MoFzh','uid','IlWOo','6ygrkuM','addListener','12910870cLijSR','13901931TFplsS','reqTime','then','28rUTEfK','getFriends','DmsIu','2621283TOLhGw','MnLuK','获取好友列表超时','onBuddyListChange','delete','获取好友列表完成','ggUHg','19559837RfVBpL'];_0x385a=function(){return _0x5480a5;};return _0x385a();}export class NTQQFriendApi{static async[_0x2546f5(0xde)](_0x1b6efa=![]){const _0x1f6da8=_0x2546f5,_0x385f7f={'fIBGF':_0x1f6da8(0xe5),'IlWOo':function(_0x3c492a,_0x1fe161){return _0x3c492a(_0x1fe161);},'Epjme':function(_0x21aec0,_0x5df8bc,_0xb9a280){return _0x21aec0(_0x5df8bc,_0xb9a280);},'DmsIu':'开始获取好友列表','MnLuK':_0x1f6da8(0xe2),'SgzUB':function(_0x5a0cfc,_0x3bfc7a,_0x308f2f){return _0x5a0cfc(_0x3bfc7a,_0x308f2f);},'mIlic':function(_0x7b14a1){return _0x7b14a1();}};return new Promise((_0x3db1b7,_0x212a6d)=>{const _0x39468d=_0x1f6da8,_0x560aa0={'ggUHg':function(_0x519127,_0x22a1e5){const _0x19c887=_0x1dce;return _0x385f7f[_0x19c887(0xd6)](_0x519127,_0x22a1e5);},'leJSw':_0x385f7f[_0x39468d(0xe1)]};let _0x42452c=![];_0x385f7f['SgzUB'](setTimeout,()=>{const _0x1fda34=_0x39468d;!_0x42452c&&(logDebug('获取好友列表超时'),_0x560aa0[_0x1fda34(0xe6)](_0x212a6d,_0x560aa0[_0x1fda34(0xcd)]));},0x1388);const _0x2bf2d9=[],_0x1753cf=_0x51eed0=>{const _0x252886=_0x39468d;for(const _0x2aab96 of _0x51eed0){for(const _0x620915 of _0x2aab96['buddyList']){_0x2bf2d9['push'](_0x620915),uid2UinMap[_0x620915[_0x252886(0xd5)]]=_0x620915['uin'];}}_0x42452c=!![],logDebug(_0x385f7f[_0x252886(0xc7)],_0x2bf2d9),_0x385f7f[_0x252886(0xd6)](_0x3db1b7,_0x2bf2d9);};buddyChangeTasks[_0x39468d(0xcf)](_0x385f7f['mIlic'](randomUUID),_0x1753cf),napCatCore[_0x39468d(0xce)]['getBuddyService']()['getBuddyList'](_0x1b6efa)[_0x39468d(0xdc)](_0x2075b4=>{const _0x105f12=_0x39468d;_0x385f7f[_0x105f12(0xd1)](logDebug,_0x385f7f[_0x105f12(0xdf)],_0x2075b4);});});}static async[_0x2546f5(0xd3)](_0x1977dd,_0x49a9bd){const _0x5f2f6f=_0x2546f5;napCatCore[_0x5f2f6f(0xce)]['getBuddyService']()?.[_0x5f2f6f(0xca)]({'friendUid':_0x1977dd['friendUid'],'reqTime':_0x1977dd[_0x5f2f6f(0xdb)],'accept':_0x49a9bd});}}