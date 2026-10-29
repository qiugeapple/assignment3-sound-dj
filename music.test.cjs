const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const {build}=require('./music.js');
const ids=['pearl','coconut','bean','pudding','taro','strawberry','grass','sago'];
test('all 255 non-empty selections include every chosen part in introduction AND ensemble',()=>{
 for(let mask=1;mask<256;mask++){
  const counts=Object.fromEntries(ids.map((id,i)=>[id,mask&(1<<i)?1:0]));
  const plan=build(counts,90),expected=ids.filter(id=>counts[id]);
  for(const phase of ['intro','mix'])assert.deepEqual([...new Set(plan.events.filter(e=>e.phase===phase&&e.id!=='base').map(e=>e.id))].sort(),expected.slice().sort());
  assert(plan.events.every(e=>e.at>=0&&e.at+e.length<=plan.duration/plan.beat));
 }
});
test('removing a topping to zero excludes it from the entire composition',()=>{
 const counts={pearl:6,grass:1};build(counts,90);counts.grass=0;
 assert(!build(counts,90).events.some(e=>e.id==='grass'));
});
test('score is deterministic, quantity affects level, tempo affects duration',()=>{
 assert.deepEqual(build({pearl:2,sago:1},90),build({pearl:2,sago:1},90));
 const level=count=>build({pearl:count},90).events.find(e=>e.id==='pearl'&&e.phase==='mix').volume;
 assert(level(6)>level(1));assert(build({pearl:1},70).duration>build({pearl:1},120).duration);
});
test('real composer schedules all selected sounds through the same output bus',()=>{
 const source=readFileSync(require('node:path').join(__dirname,'app.js'),'utf8');
 const fn=source.slice(source.indexOf('function compose('),source.indexOf('async function play('));
 for(const base of [{id:'milk',chord:[48,52,55]},{id:'coffee',chord:[41,45,48]}]){
  const actual=[],scope=vm.createContext({BobaMusic:{build},counts:Object.fromEntries(ids.map(id=>[id,3])),base,$:()=>({value:'90'}),baseVoice:(c,out,b,time,dur)=>actual.push({id:'base',time,dur}),ingredient:(c,out,id,time,dur)=>actual.push({id,time,dur})});
  vm.runInContext(fn,scope);const compressor={threshold:{},knee:{},ratio:{},attack:{},release:{},connect(){}};
  const duration=scope.compose({createDynamicsCompressor:()=>compressor},{},1);
  assert.deepEqual([...new Set(actual.map(e=>e.id))].sort(),['base',...ids].sort());assert(duration>0);
 }
});
test('milk and coffee base envelopes sustain and include an upper octave',()=>{
 const source=readFileSync(require('node:path').join(__dirname,'app.js'),'utf8');
 const fn=source.slice(source.indexOf('function baseVoice('),source.indexOf('function refreshTracks('));
 const scope=vm.createContext({});vm.runInContext(fn,scope);
 for(const id of ['milk','coffee']){
  const envelopes=[],oscillators=[];
  const c={createOscillator(){const o={frequency:{},connect(){},start(){},stop(){}};oscillators.push(o);return o},createGain(){const values=[];envelopes.push(values);return {gain:{setValueAtTime(v,t){values.push([v,t])},linearRampToValueAtTime(v,t){values.push([v,t])},exponentialRampToValueAtTime(v,t){values.push([v,t])}},connect(){}}}};
  scope.baseVoice(c,{}, {id,chord:[48,52,55],wave:'sine'},0,2);
  assert.equal(oscillators.length,6);assert(envelopes.some(values=>values.some(([v,t])=>t>1&&v>.06)));
  assert(Math.abs(oscillators[1].frequency.value/oscillators[0].frequency.value-2)<.0001);
 }
});
