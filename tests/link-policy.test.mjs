import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublicAddress, validateTarget, checkLink, classifyStatus } from '../scripts/link-policy.mjs';
const allowed=['example.com','www.example.com'];
const dns=async()=>[{address:'93.184.216.34',family:4}];
test('public-address guard rejects private, mapped, metadata and reserved networks',()=> {
  for(const a of ['127.0.0.1','10.1.2.3','172.16.1.1','192.168.1.1','169.254.169.254','100.64.1.1','0.0.0.0','224.0.0.1','::1','::ffff:127.0.0.1','fc00::1','fe80::1','2001:db8::1']) assert.equal(isPublicAddress(a),false,a);
  assert.equal(isPublicAddress('93.184.216.34'),true);
  assert.equal(isPublicAddress('2606:4700:4700::1111'),true);
});
test('allowlist uses exact hosts; URL credentials and ports rejected',()=> {
  for(const u of ['https://example.com.evil.test/','https://127.0.0.1/','https://x:secret@example.com/','http://example.com/','https://example.com:8443/']) assert.throws(()=>validateTarget(u,allowed));
});
test('DNS pin passed to request; restricted and broken statuses classified',async()=> {
  const result=await checkLink('https://example.com/',allowed,{resolveHost:dns,request:async(url,pin)=>{assert.equal(url.hostname,'example.com');assert.equal(pin.address,'93.184.216.34');return {status:403};}});
  assert.equal(result.status,'restricted');
  for(const [s,expected] of [[429,'restricted'],[404,'broken'],[410,'broken'],[503,'temporary-error'],[200,'http-ok']]) assert.equal(classifyStatus(s),expected);
});
test('mixed public/private DNS answers are blocked before connecting',async()=> {
  const result=await checkLink('https://example.com/',allowed,{resolveHost:async()=>[{address:'93.184.216.34',family:4},{address:'127.0.0.1',family:4}],request:async()=>{throw new Error('should not connect');}});
  assert.equal(result.reason,'blocked-address');
});
test('redirects to unknown hosts are blocked before next request',async()=> {
  let calls=0;
  const result=await checkLink('https://example.com/',allowed,{resolveHost:dns,request:async()=>{calls++;return {status:302,location:'https://private.example/'};}});
  assert.equal(result.reason,'blocked-host');assert.equal(calls,1);
});
test('redirect loops stop at three redirects and DNS timeouts are bounded',async()=> {
  let calls=0;
  const loop=await checkLink('https://example.com/',allowed,{resolveHost:dns,request:async()=>{calls++;return {status:301,location:'/again'};}});
  assert.equal(loop.reason,'redirect-limit');assert.equal(calls,4);
  const timeout=await checkLink('https://example.com/',allowed,{timeoutMs:10,resolveHost:()=>new Promise(()=>{})});assert.equal(timeout.reason,'timeout');
});
