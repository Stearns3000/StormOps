const CACHE='storm-ops-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('periodicsync',event=>{if(event.tag==='storm-ops-check')event.waitUntil(checkAlerts())});
async function checkAlerts(){
 const url='https://api.weather.gov/alerts/active?point=42.538,-110.114';
 const r=await fetch(url,{headers:{Accept:'application/geo+json'}});
 if(!r.ok)return;
 const j=await r.json(), fs=j.features||[];
 const cache=await caches.open(CACHE), old=await cache.match('./last-alert-ids');
 const oldIds=old?await old.json():[];
 const ids=fs.map(f=>f.id||f.properties?.event+f.properties?.effective);
 const fresh=fs.filter(f=>!oldIds.includes(f.id||f.properties?.event+f.properties?.effective));
 await cache.put('./last-alert-ids',new Response(JSON.stringify(ids)));
 for(const f of fresh){const p=f.properties||{};await self.registration.showNotification('STORM OPS: '+(p.event||'Weather alert'),{body:(p.headline||'New NWS alert near Big Piney').slice(0,180),icon:'./icon-192.png',tag:f.id||p.event, data:{url:'https://www.weather.gov/alerts'}})}
}