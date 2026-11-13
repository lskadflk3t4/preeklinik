/* Preclinical Drills service worker – offline-first. VERSION changes on every build. */
const VERSION = 'md-2026-11-13-study1';
const FONTS = 'md-fonts';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./style.css?v=2026-11-13-study1", "./data1.js?v=2026-11-13-study1", "./data2.js?v=2026-11-13-study1", "./data3.js?v=2026-11-13-study1", "./data4.js?v=2026-11-13-study1", "./app.js?v=2026-11-13-study1", "./bx.js?v=2026-11-13-study1", "./bdata1.js?v=2026-11-13-study1", "./bdata2.js?v=2026-11-13-study1", "./bdata3.js?v=2026-11-13-study1", "./mdata.js?v=2026-11-13-study1", "./bdata4.js?v=2026-11-13-study1", "./pdata1.js?v=2026-11-13-study1", "./pdata2.js?v=2026-11-13-study1", "./vis.js?v=2026-11-13-study1", "./ui.js?v=2026-11-13-study1", "./review.js?v=2026-11-13-study1", "./sync.js?v=2026-11-13-study1", "./diagrams.js?v=2026-11-13-study1", "./manual.js?v=2026-11-13-study1", "./ux.js?v=2026-11-13-study1", "./glossary.js?v=2026-11-13-study1", "./sx.js?v=2026-11-13-study1", "./cdata.js?v=2026-11-13-study1", "./cdata2.js?v=2026-11-13-study1", "./edata.js?v=2026-11-13-study1", "./edata2.js?v=2026-11-13-study1", "./adata.js?v=2026-11-13-study1", "./adata2.js?v=2026-11-13-study1", "./xdata.js?v=2026-11-13-study1", "./ndata.js?v=2026-11-13-study1", "./nut.js?v=2026-11-13-study1", "./sdata.js?v=2026-11-13-study1", "./kdata.js?v=2026-11-13-study1", "./kdata2.js?v=2026-11-13-study1", "./rdata.js?v=2026-11-13-study1", "./rdata2.js?v=2026-11-13-study1", "./gdata.js?v=2026-11-13-study1", "./fdata.js?v=2026-11-13-study1", "./idata.js?v=2026-11-13-study1", "./idata2.js?v=2026-11-13-study1", "./hdata.js?v=2026-11-13-study1", "./ydata.js?v=2026-11-13-study1", "./study.js?v=2026-11-13-study1", "./tdata.js?v=2026-11-13-study1", "./ldata.js?v=2026-11-13-study1", "./fdata2.js?v=2026-11-13-study1", "./xcase.js?v=2026-11-13-study1", "./kids.js?v=2026-11-13-study1", "./kids2.js?v=2026-11-13-study1", "./lv.js?v=2026-11-13-study1", "./pmol.js?v=2026-11-13-study1", "./pw.js?v=2026-11-13-study1", "./plan.js?v=2026-11-13-study1", "./apple-touch-icon.png", "./favicon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
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
