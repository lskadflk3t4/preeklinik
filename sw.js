/* Preclinical Drills service worker – offline-first. VERSION changes on every build. */
const VERSION = 'md-2026-11-06-272ec033';
const FONTS = 'md-fonts';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./style.css?v=2026-11-06-272ec033", "./data1.js?v=2026-11-06-272ec033", "./data2.js?v=2026-11-06-272ec033", "./data3.js?v=2026-11-06-272ec033", "./data4.js?v=2026-11-06-272ec033", "./app.js?v=2026-11-06-272ec033", "./bx.js?v=2026-11-06-272ec033", "./bdata1.js?v=2026-11-06-272ec033", "./bdata2.js?v=2026-11-06-272ec033", "./bdata3.js?v=2026-11-06-272ec033", "./pdata1.js?v=2026-11-06-272ec033", "./pdata2.js?v=2026-11-06-272ec033", "./ui.js?v=2026-11-06-272ec033", "./review.js?v=2026-11-06-272ec033", "./sync.js?v=2026-11-06-272ec033", "./apple-touch-icon.png", "./favicon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(a => new Request(a, {cache:'reload'}))))); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'api.github.com' || url.hostname.endsWith('githubusercontent.com')) return; // sync always goes to the network
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(async c => { const hit = await c.match(req); if (hit) return hit;
      try { const r = await fetch(req); if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; } catch(err){ return new Response('', {status:504}); } }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate'){
    e.respondWith(caches.open(VERSION).then(c => c.match('./index.html')).then(r => r || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
