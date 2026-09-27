import { BlockList, isIP } from 'node:net';
import { lookup } from 'node:dns/promises';
import https from 'node:https';
import { isHttpsUrl } from '../lib/content-policy.mjs';
const blocked = new BlockList();
for (const [address,prefix] of [['0.0.0.0',8],['10.0.0.0',8],['100.64.0.0',10],['127.0.0.0',8],['169.254.0.0',16],['172.16.0.0',12],['192.0.0.0',24],['192.0.2.0',24],['192.168.0.0',16],['198.18.0.0',15],['198.51.100.0',24],['203.0.113.0',24],['224.0.0.0',3]]) blocked.addSubnet(address,prefix,'ipv4');
blocked.addSubnet('2001::',23,'ipv6');
blocked.addSubnet('2001:db8::',32,'ipv6');
blocked.addSubnet('2002::',16,'ipv6');
const globalV6 = new BlockList(); globalV6.addSubnet('2000::',3,'ipv6');
export function isPublicAddress(address) {
  const family = isIP(address);
  return family === 4 ? !blocked.check(address,'ipv4') : family === 6 && globalV6.check(address,'ipv6') && !blocked.check(address,'ipv6');
}
export function validateTarget(value, allowedHosts) {
  if (!isHttpsUrl(value)) throw new Error('blocked-url');
  const u = new URL(value);
  if (!allowedHosts.includes(u.hostname) || isIP(u.hostname.replace(/^\[|\]$/g,''))) throw new Error('blocked-host');
  return u;
}
export function classifyStatus(status) {
  if (status === 403 || status === 429) return 'restricted';
  if (status === 404 || status === 410) return 'broken';
  if (status >= 200 && status < 300) return 'http-ok';
  if (status >= 500) return 'temporary-error';
  return 'http-error';
}
function requestHeaders(url, pinned, timeoutMs) {
  return new Promise((resolve,reject) => {
    const req = https.get(url,{
      agent:false,
      headers:{'user-agent':'ToolPilot-link-review/1.0'},
      // Connect only to the already validated DNS address; no second resolution.
      lookup: (_host, options, callback) => options.all
        ? callback(null,[pinned]) : callback(null,pinned.address,pinned.family),
    },res => { resolve({status:res.statusCode,location:res.headers.location}); res.destroy(); });
    const timer = setTimeout(() => req.destroy(new Error('timeout')),timeoutMs);
    req.on('close',() => clearTimeout(timer));
    req.on('error',reject);
  });
}
export async function checkLink(url, allowedHosts, { resolveHost = host => lookup(host,{all:true}), request = requestHeaders, timeoutMs=15000 } = {}) {
  let current = url;
  try {
    for (let redirects=0;redirects<=3;redirects++) {
      const target = validateTarget(current,allowedHosts);
      let timer;
      const started = Date.now();
      let addresses;
      try { addresses = await Promise.race([resolveHost(target.hostname),new Promise((_,reject) => { timer=setTimeout(() => reject(new Error('timeout')),timeoutMs); })]); }
      finally { clearTimeout(timer); }
      if (!addresses.length || addresses.some(a => !isPublicAddress(a.address))) throw new Error('blocked-address');
      const response = await request(target,addresses[0],Math.max(1,timeoutMs-(Date.now()-started)));
      if ([301,302,303,307,308].includes(response.status)) {
        if (!response.location || redirects === 3) throw new Error('redirect-limit');
        current = new URL(response.location,target).href;
        continue;
      }
      return {status:classifyStatus(response.status),httpStatus:response.status,finalOrigin:target.origin,finalPath:target.pathname};
    }
  } catch (error) {
    const reason = ['blocked-url','blocked-host','blocked-address','redirect-limit','timeout'].includes(error.message) ? error.message : 'network-error';
    return {status:reason.startsWith('blocked-') ? 'blocked' : 'temporary-error',reason};
  }
}
