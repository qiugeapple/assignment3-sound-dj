/* One deterministic arrangement for live audio, compatible audio and WAV export. */
(function(root){
 'use strict';
 const ids=['pearl','coconut','bean','pudding','taro','strawberry','grass','sago'];
 function build(recipe,bpm){
  const active=ids.filter(id=>Number(recipe[id])>0),beat=60/Number(bpm),intro=2+active.length*2,events=[];
  events.push({id:'base',at:0,length:1.8,shift:0,phase:'intro'});
  active.forEach((id,slot)=>{for(let note=0;note<2;note++)events.push({id,at:2+slot*2+note*.65,length:.6,index:note,phase:'intro',volume:.17})});
  const mix=1/(1+Math.max(0,active.length-4)*.07);
  for(let bar=0;bar<8;bar++){
   const shift=[0,-5,-3,-7][bar%4];
   for(let half=0;half<2;half++)events.push({id:'base',at:intro+bar*4+half*2,length:1.95,shift,phase:'mix'});
   for(let step=0;step<8;step++)for(const id of active){
    const allowed={pearl:step%2===0,coconut:step%2===1,bean:step%2===0,pudding:step===1||step===5,taro:step===0||step===4,strawberry:step===2||step===6,grass:step===0||step===4,sago:true}[id];
    if(!allowed)continue;
    const voices={pearl:1,coconut:.92,bean:1,pudding:1.1,taro:1.1,strawberry:1.25,grass:1.5,sago:.7};
    const index=bar*2+(step<4?0:1);
    events.push({id,at:intro+bar*4+step/2,length:id==='grass'?1.5:.45,index,phase:'mix',volume:(.09+Math.sqrt(Math.min(6,Number(recipe[id])))*.012)*mix*voices[id]});
   }
  }
  return {active,beat,introBeats:intro,duration:(intro+32)*beat,events};
 }
 const api={build};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BobaMusic=api;
})(globalThis);
