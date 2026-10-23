// Node-only regression checks for audio startup states. No packages required.
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {test}=require('node:test');
const source=readFileSync(join(__dirname,'app.js'),'utf8');
const audioFunction=source.slice(source.indexOf('function audio(){'),source.indexOf('function testAudio(){'));
function fixture(state,mode='success'){
 let resumed=0,created=0;
 class Context{
  constructor(){this.state=state;this.sampleRate=44100;this.destination={};created++}
  createGain(){return {gain:{value:0},connect(){}}}
  createBufferSource(){return {connect(){},start(){}}}
  createBuffer(){return {}}
  resume(){resumed++;if(mode==='reject')return Promise.reject(new Error('blocked'));if(mode==='pending')return new Promise(()=>{});if(mode!=='stuck')this.state='running';return Promise.resolve()}
 }
 const scope=vm.createContext({window:{AudioContext:Context},navigator:{},setTimeout,clearTimeout,Promise,Error,$:()=>({classList:{contains:()=>false}}),soundUI(){},soundStatus(){},stop(){}});
 vm.runInContext('let ctx,master,audioReady=false,audioAttempt=0,muted=false;'+audioFunction,scope);
 return {scope,resume:()=>resumed,created:()=>created,start:()=>vm.runInContext('audio()',scope)};
}
test('requests resume synchronously for suspended and interrupted contexts',async()=>{
 for(const state of ['suspended','interrupted']){const f=fixture(state);const pending=f.start();assert.equal(f.resume(),1);const ctx=await pending;assert.equal(ctx.state,'running')}
});
test('does not claim success when a context remains interrupted',async()=>{
 const f=fixture('interrupted','stuck');await assert.rejects(f.start(),/not running/);
});
test('propagates browser playback rejection',async()=>{
 const f=fixture('suspended','reject');await assert.rejects(f.start(),/blocked/);
});
test('times out when resume never resolves',async()=>{
 const f=fixture('suspended','pending');await assert.rejects(f.start(),/timed out/);
});
test('recreates a closed context on the next gesture',async()=>{
 const f=fixture('running');await f.start();vm.runInContext('ctx.state="closed"',f.scope);await f.start();assert.equal(f.created(),2);
});
