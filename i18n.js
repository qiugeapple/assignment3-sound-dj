'use strict';
// Translate presentation text without replacing controls or changing recipe/audio state.
(() => {
 const phrases={
  '啵啵音乐铺':'Boba Melody',
  '一杯灵感，一口旋律':'A sip of inspiration, a little melody',
  '今天，想喝什么':'What does today ', '旋律':'sound like', '？':'?',
  '把喜欢的小料放进杯子，让每一种味道，都有自己的声音。':'Add your favourite toppings. Give every flavour its own sound.',
  '调一杯你的灵感':'Mix your inspiration',
  '先选一个基底':'Choose your base',
  '温柔的和弦，从这里开始':'Every melody starts with a gentle chord',
  '再加一点小料':'Add a little character',
  '8 种味道，8 种声音 · 点一下，加一勺':'8 flavours, 8 sounds · Tap to add a spoonful',
  '牛奶':'Milk','红茶':'Black tea','咖啡':'Coffee',
  '柔软和弦':'Soft chords','暖暖弦乐':'Warm strings','低音律动':'Bass groove',
  '黑糖珍珠':'Brown sugar pearls','清甜椰果':'Coconut jelly','绵绵红豆':'Red beans','软软布丁':'Pudding',
  '糯糯芋圆':'Taro balls','草莓果粒':'Strawberry bits','嫩嫩仙草':'Grass jelly','晶莹西米':'Sago pearls',
  '钢琴 · 跳跃的音符':'Piano · Playful notes', '铃音 · 清脆的灵感':'Bells · Bright ideas',
  '鼓点 · 心跳的节奏':'Drums · A little heartbeat','木琴 · 慵懒的午后':'Xylophone · Lazy afternoons',
  '贝斯 · 软糯的低音':'Bass · Soft and mellow','拨弦 · 酸甜的跳跃':'Plucked strings · Sweet sparks',
  '长笛 · 清新的微风':'Flute · A gentle breeze','沙锤 · 细碎的节拍':'Shaker · Tiny rhythms',
  '正在调制 · 灵感特饮':'Now mixing · Your signature sound',
  '一杯还没开始的旋律':'A melody waiting to happen',
  '先给旋律加个基底吧':'Choose a base for your melody',
  '拖动旋转 · 双击回到正面 ↔':'Drag to rotate · Double-tap to face front ↔',
  '拖动杯子，转个角度看看 ↔':'Drag the cup to explore ↔',
  '你的音乐配方':'Your music recipe',
  '一人份的快乐 / ONE HAPPY CUP':'ONE RECIPE, ONE HAPPY CUP',
  '还缺少一个温柔的基底…':'A gentle base is still missing…',
  '今日心情':'Today’s mood','等待一点灵感 ♡':'Waiting for inspiration ♡',
  '丰富又热闹 ♫':'A joyful mix ♫','轻轻甜甜 ♡':'Soft and sweet ♡',
  '旋律的步调':'Set the tempo','慢慢放空':'Slow and dreamy','快乐摇摆':'Upbeat and playful',
  '✦ 制作完成，听听这杯':'✦ Finish & hear your mix','↺ 重新调一杯':'↺ Start a fresh cup',
  '完成后，所有味道才会合奏成一首歌。':'Finish your drink to bring every flavour together.',
  '属于你的旋律，还在酝酿':'Your melody is brewing',
  '选一个基底，加上小料，开始今天的创作吧。':'Choose a base and toppings to start creating.',
  '每一勺都是新的灵感，完成后听听整杯的声音。':'Every spoonful adds an idea. Finish to hear the whole mix.',
  '正在播放：每一种味道，都在自己的节拍里。':'Playing: every flavour has found its rhythm.',
  '这一杯很好听。再听一次，或调一杯新的吧。':'A lovely mix. Play it again or make a fresh cup.',
  '旋律已停止，点击播放从头再听。':'Stopped. Press play to listen from the beginning.',
  '制作完成！你的奶茶开始合奏啦 ♫':'Your drink is ready! Let the flavours play ♫',
  '播放合成音乐':'Play your composition','停止播放':'Stop playback',
  '用一点甜，给生活配个乐。':'A little sweetness. A soundtrack for your day.',
  '↓ 保存旋律 WAV':'↓ Save music as WAV','正在保存…':'Saving…','你的旋律已保存 ♡':'Your melody has been saved ♡',
  '保存失败，请使用较新的 Chrome 或 Edge 重试':'Could not save. Please try a current version of Chrome or Edge.',
  '杯子满啦，先移除一勺再添加吧':'Your cup is full. Remove a spoonful before adding more.',
  '♫ 声音已开启':'♫ Sound on','♫ 声音已关闭':'♫ Sound off',
  '♫ 声音引擎已启动':'♫ Audio engine ready','♫ 点击开启声音':'♫ Enable sound',
  '先点“开启声音”，听到提示音后开始调制。':'Tap “Enable sound” first. Listen for the test notes, then start mixing.',
  '♫ 开启声音 / 测试音':'♫ Enable sound / Test',
  '听不到？生成兼容音频':'No sound? Prepare compatible audio',
  '声音未能启动。请点“开启声音”重试；完成配方后也可生成兼容音频。':'Audio could not start. Tap “Enable sound” to retry, or prepare compatible audio after finishing your drink.',
  '请点“开启声音”重试，或使用兼容音频':'Retry “Enable sound”, or use compatible audio.',
  '声音被暂停或中断，请点“开启声音”恢复。':'Audio was paused or interrupted. Tap “Enable sound” to resume.',
  '声音引擎已启动。若没有听到声音，可在制作完成后使用兼容音频。':'Audio engine ready. If it is still silent, finish your drink and try compatible audio.',
  '已发送三声测试音。听到了就可以开始；没听到请检查媒体音量，或制作完成后用兼容音频。':'Three test notes sent. If you hear them, start mixing. Otherwise check media volume or use compatible audio after finishing.',
  '已回到网页，请点“开启声音”恢复音频。':'Welcome back. Tap “Enable sound” to resume audio.',
  '浏览器暂时无法开启声音，请重试':'The browser could not start audio. Please try again.',
  '正在生成兼容音频…':'Preparing compatible audio…',
  '▶ 播放兼容音频':'▶ Play compatible audio',
  '兼容音频已准备好，请再点“播放兼容音频”。':'Audio is ready. Tap “Play compatible audio” to listen.',
  '旋律已准备好，点击上方“播放兼容音频”试听。':'Your mix is ready. Tap “Play compatible audio” above.',
  '重新生成兼容音频':'Prepare compatible audio again',
  '兼容音频生成失败，请用系统浏览器重试。':'Could not prepare audio. Try your phone’s standalone browser.',
  '正在使用兼容音频播放这杯旋律。':'Playing your mix in compatible audio mode.',
  '兼容音频正在播放；若仍无声，请检查媒体音量、静音模式和蓝牙输出。':'Compatible audio is playing. If silent, check media volume, silent mode and Bluetooth output.',
  '播放被浏览器阻止，请再点“播放兼容音频”，或复制链接到系统浏览器打开。':'Playback was blocked. Tap “Play compatible audio” again, or open this link in your standalone browser.',
  '兼容音频播放结束，可以重播或调一杯新的。':'Your mix has finished. Replay it or make a fresh cup.',
  '当前浏览器无法读取兼容音频，请尝试系统浏览器。':'This browser could not read the audio. Try your standalone browser.',
  '可拖动旋转的三维奶茶杯':'Three-dimensional milk tea cup; drag to rotate',
  '啵啵音乐铺 · BOBA MELODY':'Boba Melody · Your Music Café'
 };
 const shortNames={'珍珠':'Pearls','椰果':'Coconut jelly','红豆':'Red beans','布丁':'Pudding','芋圆':'Taro balls','果粒':'Strawberry','仙草':'Grass jelly','西米':'Sago'};
 function english(text){
  const value=text.trim();let result=phrases[value];
  if(result===undefined){let match;
   if((match=value.match(/^(.+) · (\d+) 勺灵感$/)))result=`${english(match[1])} · ${match[2]} spoonful${match[2]==='1'?'':'s'} of inspiration`;
   else if((match=value.match(/^(.+) · 等待小料$/)))result=`${english(match[1])} · Add some toppings`;
   else if((match=value.match(/^♡ 每种最多 (\d+) 勺 · 已加 (\d+) \/ (\d+) 勺$/)))result=`♡ Up to ${match[1]} per topping · ${match[2]} / ${match[3]} spoonfuls`;
   else if((match=value.match(/^♡ 每种最多 (\d+) 勺，小料一共最多 (\d+) 勺$/)))result=`♡ Up to ${match[1]} per topping · ${match[2]} spoonfuls total`;
   else if((match=value.match(/^这份小料已经加了 (\d+) 勺啦$/)))result=`This topping already has ${match[1]} spoonfuls.`;
   else if((match=value.match(/^添加(.+)，试听(.+)$/)))result=`Add ${english(match[1])}; preview ${english(match[2])}`;
   else if((match=value.match(/^移除一勺(.+)$/)))result=`Remove one spoonful of ${english(match[1])}`;
   else if((match=value.match(/^(🥛|🍵|☕) (.+)基底$/u)))result=`${match[1]} ${english(match[2])} base`;
   else if(value==='和弦 × 1')result='Chords × 1';
   else if((match=value.match(/^(.+)与(.+)小夜曲$/)))result=`${english(match[1])} serenade · ${match[2].split('、').map(name=>shortNames[name]||english(name)).join(', ')}`;
   else if((match=value.match(/^啵啵音乐铺-(.+)小夜曲\.wav$/)))result=`Boba-Melody-${english(match[1])}-Serenade.wav`;
  }
  return result===undefined?text:text.slice(0,text.indexOf(value))+result+text.slice(text.indexOf(value)+value.length);
 }
 let language='en';try{const saved=localStorage.getItem('boba-language');if(saved==='zh'||saved==='en')language=saved}catch(e){/* Storage is optional. */}
 const originalText=new WeakMap(),originalAttributes=new WeakMap();
 function applyText(node){
  if(node.parentElement?.closest('script,style,[data-language-toggle]'))return;
  const previous=originalText.get(node),source=previous&&node.nodeValue===previous.rendered?previous.source:node.nodeValue;
  const rendered=language==='en'?english(source):source;originalText.set(node,{source,rendered});if(node.nodeValue!==rendered)node.nodeValue=rendered;
 }
 function applyAttributes(element){
  if(element.hasAttribute('data-language-toggle'))return;
  let cache=originalAttributes.get(element);if(!cache){cache={};originalAttributes.set(element,cache)}
  for(const name of ['aria-label','title','download']){const value=element.getAttribute(name);if(value===null)continue;const previous=cache[name],source=previous&&value===previous.rendered?previous.source:value,rendered=language==='en'?english(source):source;cache[name]={source,rendered};if(value!==rendered)element.setAttribute(name,rendered)}
 }
 function translateTree(root){
  if(root.nodeType===Node.TEXT_NODE){applyText(root);return}
  if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
  if(root.nodeType===Node.ELEMENT_NODE)applyAttributes(root);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode())){if(node.nodeType===Node.TEXT_NODE)applyText(node);else applyAttributes(node)}
 }
 const toggle=document.createElement('button');toggle.type='button';toggle.className='quiet language-toggle';toggle.setAttribute('data-language-toggle','');$('header').insertBefore(toggle,$('#sound'));
 function applyLanguage(){
  document.documentElement.lang=language==='en'?'en':'zh-CN';toggle.textContent=language==='en'?'中文':'English';toggle.setAttribute('aria-label',language==='en'?'切换为中文':'Switch to English');toggle.title=language==='en'?'Switch to Chinese':'切换为英文';translateTree(document.documentElement);
 }
 toggle.onclick=()=>{language=language==='en'?'zh':'en';try{localStorage.setItem('boba-language',language)}catch(e){}applyLanguage()};
 // Dynamic text is updated by audio and recipe handlers. Translate only changed subtrees.
 const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')applyText(record.target);else if(record.type==='attributes')applyAttributes(record.target);else for(const node of record.addedNodes)translateTree(node)}});
 observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','download']});
 applyLanguage();
})();
