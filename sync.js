/* ===================== PWA: GitHub Gist sync, backup, install, offline updates ===================== */
Object.assign(U, {
syncTitle:"Sync & offline|Synchronisation et hors ligne|Synchronisation & offline",
syncNav:"Sync|Sync|Sync",
syncIntro:"This app works fully offline. To share progress between devices, connect a private GitHub Gist: each device adds its own answers and the totals are merged.|Cette application fonctionne entièrement hors ligne. Pour partager la progression entre appareils, connectez un Gist GitHub privé : chaque appareil ajoute ses propres réponses et les totaux sont fusionnés.|Diese App funktioniert vollständig offline. Um den Fortschritt zwischen Geräten zu teilen, verbinde einen privaten GitHub-Gist: Jedes Gerät trägt seine eigenen Antworten bei, die Summen werden zusammengeführt.",
tokenLbl:"GitHub token (needs Gist read/write)|Jeton GitHub (accès Gist lecture/écriture)|GitHub-Token (Gist-Lese-/Schreibzugriff)",
tokenHelp:"Create it at github.com → Settings → Developer settings → Personal access tokens. Fine-grained: Account permissions → Gists → Read and write. Classic: scope “gist”. The token is stored only on this device.|À créer sur github.com → Settings → Developer settings → Personal access tokens. Fine-grained : Account permissions → Gists → Read and write. Classique : scope « gist ». Le jeton est stocké uniquement sur cet appareil.|Erstellen unter github.com → Settings → Developer settings → Personal access tokens. Fine-grained: Account permissions → Gists → Read and write. Classic: Scope „gist“. Das Token wird nur auf diesem Gerät gespeichert.",
deviceName:"Name of this device|Nom de cet appareil|Name dieses Geräts",
connect:"Connect & sync|Connecter et synchroniser|Verbinden & synchronisieren", syncNow:"Sync now|Synchroniser maintenant|Jetzt synchronisieren", disconnect:"Disconnect this device|Déconnecter cet appareil|Gerät trennen",
autoSync:"Sync automatically (on open, after answers, when leaving)|Synchroniser automatiquement (à l'ouverture, après les réponses, en quittant)|Automatisch synchronisieren (beim Öffnen, nach Antworten, beim Verlassen)",
connectedAs:"Connected as {u}|Connecté en tant que {u}|Verbunden als {u}", lastSync:"Last sync: {t}|Dernière synchro : {t}|Letzte Synchronisation: {t}", never:"never|jamais|nie",
stSyncing:"Syncing…|Synchronisation…|Synchronisiere…", stOk:"Synced|Synchronisé|Synchronisiert", stOffline:"Offline – will sync when back online|Hors ligne – synchronisation au retour du réseau|Offline – Synchronisation, sobald wieder online",
stErr:"Sync failed: {e}|Échec de la synchro : {e}|Synchronisation fehlgeschlagen: {e}", stBadToken:"GitHub rejected the token (check it and its Gist permission).|GitHub a refusé le jeton (vérifiez-le et son accès Gist).|GitHub hat das Token abgelehnt (Token und Gist-Berechtigung prüfen).",
needToken:"Paste a token first.|Collez d'abord un jeton.|Bitte zuerst ein Token einfügen.",
devicesLbl:"Devices in this sync|Appareils synchronisés|Geräte in dieser Synchronisation", thisDevice:"this device|cet appareil|dieses Gerät", unnamed:"Unnamed device|Appareil sans nom|Unbenanntes Gerät",
answersN:"{n} answers|{n} réponses|{n} Antworten",
backupTitle:"Backup without GitHub|Sauvegarde sans GitHub|Sicherung ohne GitHub", exportBtn:"Download progress file|Télécharger la progression|Fortschritt herunterladen", importBtn:"Import / merge a progress file|Importer / fusionner un fichier|Fortschrittsdatei importieren / zusammenführen",
importOk:"Progress file merged.|Fichier de progression fusionné.|Fortschrittsdatei zusammengeführt.", importBad:"That file is not a progress file from this app.|Ce fichier n'est pas un fichier de progression de cette application.|Diese Datei ist keine Fortschrittsdatei dieser App.",
installTitle:"Install|Installer|Installieren", installBtn:"Install app on this device|Installer l'application sur cet appareil|App auf diesem Gerät installieren",
installHelp:"On Android Chrome you can also use ⋮ → Install app / Add to Home screen.|Sur Chrome Android, vous pouvez aussi utiliser ⋮ → Installer l'application / Ajouter à l'écran d'accueil.|In Chrome für Android geht auch ⋮ → App installieren / Zum Startbildschirm hinzufügen.",
installed:"Installed – running as an app.|Installée – fonctionne comme une application.|Installiert – läuft als App.",
offlineReady:"Offline ready: everything is stored on this device.|Prêt hors ligne : tout est stocké sur cet appareil.|Offline bereit: alles ist auf diesem Gerät gespeichert.",
updateReady:"A new version is ready.|Une nouvelle version est prête.|Eine neue Version ist bereit.", reload:"Reload|Recharger|Neu laden",
syncHome:"Sync between devices and backups|Synchronisation entre appareils et sauvegardes|Synchronisation zwischen Geräten und Sicherungen"
});

const GIST_FILE = 'metabolism-drills-progress.json';
const GIST_DESC = 'Metabolism Drills – progress (managed by the app, do not edit)';
let GH = store.get('gh', {token:'', gistId:'', auto:true, last:0, login:''});
let SYNC_STATE = {s:'idle', msg:''};
let syncTimer = null, syncBusy = false, syncAgain = false;
function saveGH(){ store.set('gh', GH); }

async function gh(path, opts){
  opts = opts || {};
  const r = await fetch('https://api.github.com' + path, Object.assign({}, opts, {
    headers: Object.assign({'Accept':'application/vnd.github+json', 'Authorization':'Bearer ' + GH.token, 'X-GitHub-Api-Version':'2022-11-28'}, opts.body ? {'Content-Type':'application/json'} : {}),
    cache: 'no-store'
  }));
  if (r.status === 401 || r.status === 403){ const e = new Error('auth'); e.auth = true; throw e; }
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.status === 204 ? null : r.json();
}
function payload(){ return JSON.stringify({app:'metabolism-drills', v:1, resetAt:PROG.resetAt, devices:PROG.devices, rv:PROG.rv}, null, 1); }
async function findOrCreateGist(){
  for (let page = 1; page <= 5; page++){
    const list = await gh('/gists?per_page=100&page=' + page);
    const g = list.find(x => x.files && x.files[GIST_FILE]);
    if (g) return g.id;
    if (list.length < 100) break;
  }
  const g = await gh('/gists', {method:'POST', body:JSON.stringify({description:GIST_DESC, public:false, files:{[GIST_FILE]:{content:payload()}}})});
  return g.id;
}
async function readGist(){
  const g = await gh('/gists/' + GH.gistId);
  const f = g.files && g.files[GIST_FILE]; if (!f) return null;
  let txt = f.content;
  if (f.truncated && f.raw_url){ const r = await fetch(f.raw_url, {cache:'no-store'}); txt = await r.text(); }
  try { return JSON.parse(txt); } catch(e){ return null; }
}
function setSync(s, msg){ SYNC_STATE = {s, msg:msg || ''}; renderHeader(); if (VIEW === 'sync') render(); }
async function syncNow(){
  if (!GH.token || !GH.gistId) return;
  if (syncBusy){ syncAgain = true; return; }
  if (!navigator.onLine){ setSync('offline'); return; }
  syncBusy = true; setSync('busy');
  try {
    const remote = await readGist();
    if (remote) mergeProg(remote);
    await gh('/gists/' + GH.gistId, {method:'PATCH', body:JSON.stringify({files:{[GIST_FILE]:{content:payload()}}})});
    GH.last = Date.now(); saveGH(); setSync('ok');
    if (VIEW !== 'sync') render();
  } catch(e){
    if (e.auth) setSync('err', u('stBadToken'));
    else if (!navigator.onLine) setSync('offline');
    else setSync('err', u('stErr', {e:e.message}));
  } finally {
    syncBusy = false; if (syncAgain){ syncAgain = false; setTimeout(syncNow, 500); }
  }
}
function scheduleSync(ms){ if (!GH.token || !GH.gistId || !GH.auto) return; clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, ms == null ? 15000 : ms); }
ON_SCORE = () => scheduleSync();

async function connect(){
  const inp = document.getElementById('gh-token'), nm = document.getElementById('dev-name');
  const tok = (inp && inp.value.trim()) || GH.token;
  if (nm){ PROG.devices[DEVICE].name = nm.value.trim(); PROG.devices[DEVICE].updated = Date.now(); saveProg(); }
  if (!tok){ setSync('err', u('needToken')); return; }
  GH.token = tok; saveGH(); setSync('busy');
  try {
    const me = await gh('/user'); GH.login = me.login || '';
    GH.gistId = await findOrCreateGist(); saveGH();
    await syncNow();
  } catch(e){
    if (e.auth){ GH.token = ''; saveGH(); setSync('err', u('stBadToken')); }
    else setSync('err', u('stErr', {e:e.message}));
  }
}

/* ---------- header button + views ---------- */
HEADER_EXTRA = () => {
  const on = GH.token && GH.gistId; const st = !on ? 'off' : SYNC_STATE.s === 'idle' ? 'ok' : SYNC_STATE.s;
  return `<a class="syncbtn st-${st}" href="#sync" aria-label="${esc(u('syncTitle'))}" title="${esc(u('syncTitle'))}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 16.6A4.5 4.5 0 0 0 17.5 8h-1.3A7 7 0 1 0 4 14.9"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 17l4 4 4-4M12 12v9"/></svg><span class="dot" aria-hidden="true"></span></a>`;
};
HOME_EXTRA = () => `<p class="foot"><a href="#sync">${u('syncHome')} →</a></p>`;

function fmtTime(t){ if (!t) return u('never'); try { return new Date(t).toLocaleString(L === 'en' ? 'en-GB' : L); } catch(e){ return new Date(t).toISOString(); } }
EXTRA_VIEWS.sync = () => {
  const on = GH.token && GH.gistId; const me = PROG.devices[DEVICE];
  let st = '';
  if (SYNC_STATE.s === 'busy') st = `<p class="note">${u('stSyncing')}</p>`;
  else if (SYNC_STATE.s === 'ok') st = `<div class="fb ok inline"><strong>${u('stOk')}</strong></div>`;
  else if (SYNC_STATE.s === 'offline') st = `<p class="note warn">${u('stOffline')}</p>`;
  else if (SYNC_STATE.s === 'err') st = `<div class="fb no"><strong>${esc(SYNC_STATE.msg)}</strong></div>`;
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><h1>${u('syncTitle')}</h1></div><p class="ddesc">${u('syncIntro')}</p></div>`;
  h += `<div class="card"><p class="note">${u('offlineReady')}</p>`;
  if (on) h += `<p><strong>${esc(u('connectedAs', {u:GH.login || 'GitHub'}))}</strong> · ${esc(u('lastSync', {t:fmtTime(GH.last)}))}</p>`;
  h += `<label class="field"><span>${u('deviceName')}</span><input id="dev-name" class="txtin" value="${esc(me.name || '')}" placeholder="Pixel, laptop…" autocomplete="off"></label>`;
  if (!on) h += `<label class="field"><span>${u('tokenLbl')}</span><input id="gh-token" class="txtin" type="password" autocomplete="off" spellcheck="false" placeholder="github_pat_… / ghp_…"></label><p class="note">${u('tokenHelp')}</p>`;
  h += `<label class="check"><input type="checkbox" id="gh-auto"${GH.auto ? ' checked' : ''}> ${u('autoSync')}</label>`;
  h += `<div class="actions">` + (on ? `<button type="button" class="btn primary" data-act="syncnow">${u('syncNow')}</button><button type="button" class="btn" data-act="syncoff">${u('disconnect')}</button>` : `<button type="button" class="btn primary" data-act="syncconnect">${u('connect')}</button>`) + `</div>${st}</div>`;
  // devices
  h += `<div class="card"><h3>${u('devicesLbl')}</h3><ul class="devlist">`;
  Object.keys(PROG.devices).forEach(id => { const d = PROG.devices[id]; if ((d.epoch || 0) < (PROG.resetAt || 0)) return; let n = 0; for (const k in d.scores) n += d.scores[k].n;
    h += `<li><span>${esc(d.name || u('unnamed'))}${id === DEVICE ? ` <span class="chip muted">${u('thisDevice')}</span>` : ''}</span><span class="note">${u('answersN', {n})} · ${esc(fmtTime(d.updated))}</span></li>`; });
  h += `</ul></div>`;
  // backup
  h += `<div class="card"><h3>${u('backupTitle')}</h3><div class="actions"><button type="button" class="btn" data-act="exportprog">${u('exportBtn')}</button><label class="btn filebtn">${u('importBtn')}<input type="file" id="imp-file" accept="application/json,.json" hidden></label></div><p class="note" id="imp-msg"></p></div>`;
  // install
  const standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  h += `<div class="card"><h3>${u('installTitle')}</h3>` + (standalone ? `<p class="note">${u('installed')}</p>` : `${DEFER_PROMPT ? `<div class="actions"><button type="button" class="btn primary" data-act="install">${u('installBtn')}</button></div>` : ''}<p class="note">${u('installHelp')}</p>`) + `</div>`;
  return h;
};
Object.assign(A, {
  syncconnect(){ GH.auto = !!(document.getElementById('gh-auto') || {}).checked; saveGH(); connect(); },
  syncnow(){ const nm = document.getElementById('dev-name'); if (nm){ PROG.devices[DEVICE].name = nm.value.trim(); PROG.devices[DEVICE].updated = Date.now(); saveProg(); } syncNow(); },
  syncoff(){ GH = {token:'', gistId:'', auto:GH.auto, last:0, login:''}; saveGH(); SYNC_STATE = {s:'idle', msg:''}; render(); },
  exportprog(){ const blob = new Blob([payload()], {type:'application/json'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'metabolism-progress-' + new Date().toISOString().slice(0, 10) + '.json'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); },
  install(){ if (!DEFER_PROMPT) return; DEFER_PROMPT.prompt(); DEFER_PROMPT.userChoice.finally(() => { DEFER_PROMPT = null; render(); }); }
});
document.addEventListener('change', e => {
  if (e.target.id === 'gh-auto'){ GH.auto = e.target.checked; saveGH(); }
  if (e.target.id === 'dev-name'){ PROG.devices[DEVICE].name = e.target.value.trim(); PROG.devices[DEVICE].updated = Date.now(); saveProg(); scheduleSync(2000); }
  if (e.target.id === 'imp-file' && e.target.files && e.target.files[0]){
    const fr = new FileReader(); fr.onload = () => { let ok = false; try { const d = JSON.parse(fr.result); ok = d && d.app === 'metabolism-drills' && mergeProg(d); } catch(err){}
      if (ok){ scheduleSync(1000); render(); } const m = document.getElementById('imp-msg'); if (m) m.textContent = ok ? u('importOk') : u('importBad'); };
    fr.readAsText(e.target.files[0]);
  }
});

/* ---------- lifecycle ---------- */
let DEFER_PROMPT = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); DEFER_PROMPT = e; if (VIEW === 'sync') render(); });
window.addEventListener('online', () => scheduleSync(1000));
window.addEventListener('offline', () => { if (GH.token) setSync('offline'); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && GH.auto && syncTimer){ clearTimeout(syncTimer); syncNow(); }
  if (document.visibilityState === 'visible') scheduleSync(1500); });
window.addEventListener('load', () => scheduleSync(800));

function showUpdate(reg){
  const bar = document.createElement('div'); bar.className = 'toast'; bar.setAttribute('role', 'status');
  bar.innerHTML = `<span>${esc(u('updateReady'))}</span><button type="button" class="btn primary">${esc(u('reload'))}</button>`;
  bar.querySelector('button').onclick = () => { if (reg.waiting) reg.waiting.postMessage('skipWaiting'); };
  document.body.appendChild(bar);
}
if ('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg);
      reg.addEventListener('updatefound', () => { const w = reg.installing; if (!w) return;
        w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) showUpdate(reg); }); });
    }).catch(() => {});
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading) return; reloading = true; location.reload(); });
  });
}
