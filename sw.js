/* Preclinical Drills service worker – offline-first. VERSION changes on every build. */
const VERSION = 'md-2026-11-13-chem8';
const FONTS = 'md-fonts';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./style.css?v=2026-11-13-chem8", "./data1.js?v=2026-11-13-chem8", "./data2.js?v=2026-11-13-chem8", "./data3.js?v=2026-11-13-chem8", "./data4.js?v=2026-11-13-chem8", "./app.js?v=2026-11-13-chem8", "./bx.js?v=2026-11-13-chem8", "./bdata1.js?v=2026-11-13-chem8", "./bdata2.js?v=2026-11-13-chem8", "./bdata3.js?v=2026-11-13-chem8", "./mdata.js?v=2026-11-13-chem8", "./bdata4.js?v=2026-11-13-chem8", "./pdata1.js?v=2026-11-13-chem8", "./pdata2.js?v=2026-11-13-chem8", "./vis.js?v=2026-11-13-chem8", "./ui.js?v=2026-11-13-chem8", "./review.js?v=2026-11-13-chem8", "./sync.js?v=2026-11-13-chem8", "./diagrams.js?v=2026-11-13-chem8", "./manual.js?v=2026-11-13-chem8", "./ux.js?v=2026-11-13-chem8", "./glossary.js?v=2026-11-13-chem8", "./sx.js?v=2026-11-13-chem8", "./cdata.js?v=2026-11-13-chem8", "./cdata2.js?v=2026-11-13-chem8", "./edata.js?v=2026-11-13-chem8", "./edata2.js?v=2026-11-13-chem8", "./adata.js?v=2026-11-13-chem8", "./adata2.js?v=2026-11-13-chem8", "./xdata.js?v=2026-11-13-chem8", "./ndata.js?v=2026-11-13-chem8", "./nut.js?v=2026-11-13-chem8", "./sdata.js?v=2026-11-13-chem8", "./kdata.js?v=2026-11-13-chem8", "./kdata2.js?v=2026-11-13-chem8", "./rdata.js?v=2026-11-13-chem8", "./rdata2.js?v=2026-11-13-chem8", "./gdata.js?v=2026-11-13-chem8", "./fdata.js?v=2026-11-13-chem8", "./idata.js?v=2026-11-13-chem8", "./idata2.js?v=2026-11-13-chem8", "./hdata.js?v=2026-11-13-chem8", "./ydata.js?v=2026-11-13-chem8", "./study.js?v=2026-11-13-chem8", "./tdata.js?v=2026-11-13-chem8", "./ldata.js?v=2026-11-13-chem8", "./fdata2.js?v=2026-11-13-chem8", "./xcase.js?v=2026-11-13-chem8", "./kmol.js?v=2026-11-13-chem8", "./kdata3.js?v=2026-11-13-chem8", "./kids.js?v=2026-11-13-chem8", "./kids2.js?v=2026-11-13-chem8", "./lv.js?v=2026-11-13-chem8", "./pmol.js?v=2026-11-13-chem8", "./pw.js?v=2026-11-13-chem8", "./plan.js?v=2026-11-13-chem8", "./apple-touch-icon.png", "./favicon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
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
