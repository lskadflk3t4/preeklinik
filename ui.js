/* ===================== STUDY UI =====================
   Phone: bottom navigation bar. Desktop: drill sidebar. Both: today's goal + streak, continue / random / weakest drill,
   session stats, settings (text size, theme, layout, goal, vibration, keyboard hints), keyboard shortcuts. */
Object.assign(U, {
  navHome:"Home|Accueil|Start", navCont:"Continue|Reprendre|Weiter", navRand:"Random|Au hasard|Zufall", navSet:"Settings|Réglages|Einstellungen", navNext:"Next drill|Suivant|Nächste",
  today:"Today|Aujourd'hui|Heute", ofGoal:"{n} of {g} answers|{n} sur {g} réponses|{n} von {g} Antworten",
  streak:"{n}-day streak|{n} jours d'affilée|{n} Tage in Folge", noStreak:"Answer a question to start a streak|Répondez à une question pour lancer une série|Beantworte eine Frage, um eine Serie zu starten",
  goalDone:"Daily goal reached ✓|Objectif du jour atteint ✓|Tagesziel erreicht ✓",
  session:"This session|Cette session|Diese Sitzung", accShort:"correct|justes|richtig",
  contT:"Continue: {d}|Reprendre : {d}|Weiter: {d}", startT:"Start: {d}|Commencer : {d}|Starten: {d}", randT:"Random drill|Exercice au hasard|Zufällige Übung",
  weakT:"Practise weakest: {d} ({p}%)|Retravailler le plus faible : {d} ({p} %)|Schwächste üben: {d} ({p} %)",
  setT:"Settings|Réglages|Einstellungen", setD:"Make the app comfortable to study with. Settings are saved on this device.|Adaptez l'application à votre façon d'étudier. Réglages enregistrés sur cet appareil.|Passe die App an deine Lernweise an. Die Einstellungen werden auf diesem Gerät gespeichert.",
  textSize:"Text size|Taille du texte|Schriftgröße", theme:"Theme|Thème|Design", thAuto:"Auto|Auto|Auto", thLight:"Light|Clair|Hell", thDark:"Dark|Sombre|Dunkel",
  layout:"Drill list|Liste des exercices|Übungsliste", lyCards:"Cards|Cartes|Karten", lyCompact:"Compact|Compacte|Kompakt",
  goalSet:"Daily goal (answers)|Objectif du jour (réponses)|Tagesziel (Antworten)",
  vibe:"Vibrate on right/wrong answers (phone)|Vibrer selon la réponse (téléphone)|Bei richtig/falsch vibrieren (Handy)",
  kbdHints:"Show number keys on answer buttons (computer)|Afficher les touches numériques sur les réponses (ordinateur)|Zifferntasten auf Antwortknöpfen anzeigen (Computer)",
  on:"On|Activé|An", off:"Off|Désactivé|Aus", langT:"Language|Langue|Sprache",
  progT:"Progress|Progression|Fortschritt", resetAll:"Reset all scores|Réinitialiser tous les scores|Alle Ergebnisse zurücksetzen",
  resetSure:"Tap again to confirm reset|Touchez encore pour confirmer|Zum Bestätigen erneut tippen",
  syncLink:"Sync between devices|Synchroniser entre appareils|Zwischen Geräten synchronisieren",
  keysT:"Keyboard shortcuts|Raccourcis clavier|Tastenkürzel",
  keys:[["1 – 9|1 – 9|1 – 9","Choose answer 1–9|Choisir la réponse 1–9|Antwort 1–9 wählen"],["Enter|Entrée|Enter","Check / Next|Vérifier / Suivant|Prüfen / Weiter"],
        ["R|R|R","Random drill|Exercice au hasard|Zufällige Übung"],["[  ]|[  ]|[  ]","Previous / next drill|Exercice précédent / suivant|Vorherige / nächste Übung"],
        ["V|V|V","Review mistakes|Revoir les erreurs|Fehler wiederholen"],["H, Esc|H, Échap|H, Esc","Home|Accueil|Start"],["?|?|?","Show this list|Afficher cette liste|Diese Liste zeigen"]],
  sideAll:"All drills|Tous les exercices|Alle Übungen"
});

const UIS = Object.assign({size:'m', theme:'auto', layout:'cards', goal:30, vibe:true, kbd:true}, store.get('ui', {}));
const SIZES = {s:15, m:16, l:18, xl:20};
function uiSave(){ store.set('ui', UIS); uiApply(); }
function uiApply(){ if (typeof document === 'undefined') return; const de = document.documentElement;
  de.style.fontSize = (SIZES[UIS.size] || 16) + 'px';
  if (UIS.theme === 'auto') de.removeAttribute('data-theme'); else de.setAttribute('data-theme', UIS.theme);
  de.classList.toggle('ly-compact', UIS.layout === 'compact'); de.classList.toggle('kbd-on', !!UIS.kbd); }

/* ---- daily log (device-local) ---- */
function dayKey(d){ d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
let DAYS = store.get('days', {});
const SESS = {c:0, n:0};
function streak(){ let n = 0; const d = new Date(); if (!DAYS[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (DAYS[dayKey(d)] && DAYS[dayKey(d)].n > 0){ n++; d.setDate(d.getDate() - 1); } return n; }
const _addScore = addScore;
addScore = function(id, c, n){ const k = dayKey(); const t = DAYS[k] || (DAYS[k] = {c:0, n:0}); t.c += c; t.n += n; SESS.c += c; SESS.n += n;
  const keys = Object.keys(DAYS).sort(); while (keys.length > 120) delete DAYS[keys.shift()];
  store.set('days', DAYS);
  if (UIS.vibe && typeof navigator !== 'undefined' && navigator.vibrate && n){ try { navigator.vibrate(c >= n ? 18 : [40, 60, 40]); } catch(e){} }
  _addScore(id, c, n); };

/* ---- helpers ---- */
const GRPS = [['met', 'grpMet'], ['bio', 'grpBio'], ['phy', 'grpPhy']];
function drSorted(){ const out = []; GRPS.forEach(g => DR.filter(d => (d.g || 'met') === g[0]).sort((x, y) => String(x.n).localeCompare(String(y.n), undefined, {numeric:true})).forEach(d => out.push(d))); return out; }
function dnum(d){ return typeof d.n === 'number' ? String(d.n).padStart(2, '0') : d.n; }
function dname(d){ return u(d.k + 't'); }
function pct(id){ const s = SCORES[id]; return s && s.n ? Math.round(100*s.c/s.n) : null; }
function lastDrill(){ const id = store.get('last', null); return DR.find(d => d.id === id) || null; }
function weakest(){ let w = null; DR.forEach(d => { const s = SCORES[d.id]; if (!s || s.n < 5) return; const p = s.c/s.n; if (p < .85 && (!w || p < w.p)) w = {d, p}; }); return w; }
function bar(p){ return `<span class="pbar${p == null ? ' none' : p >= 80 ? ' good' : p >= 50 ? ' warn' : ' bad'}"><i style="width:${p == null ? 0 : p}%"></i></span>`; }
function goTo(id){ if (location.hash === '#' + id) render(); else location.hash = id; }

/* ---- home dashboard ---- */
function dashHTML(){
  const t = DAYS[dayKey()] || {c:0, n:0}, g = UIS.goal, p = Math.min(100, Math.round(100*t.n/g)), st = streak();
  const last = lastDrill(), first = drSorted()[0], w = weakest();
  let h = `<section class="dash"><div class="dgoal"><div class="ring" style="--p:${p}" role="img" aria-label="${t.n} / ${g}"><b>${t.n}</b><small>/${g}</small></div><div class="dgtxt">`
    + `<strong>${t.n >= g ? u('goalDone') : u('today')}</strong>`
    + `<span>${u('ofGoal', {n:t.n, g})}${t.n ? ' · ' + Math.round(100*t.c/t.n) + '% ' + u('accShort') : ''}</span>`
    + `<span class="streak">${st ? '🔥 ' + u('streak', {n:st}) : u('noStreak')}</span></div></div><div class="dbtns">`
    + (typeof rvDue === 'function' && rvActive().length ? (rvDue().length ? `<a class="btn rvbtn" href="#review">🔁 ${u('rvHome', {n:rvDue().length})}</a>` : `<a class="btn" href="#review">🔁 ${u('rvHomeNone', {n:rvActive().length})}</a>`) : '')
    + `<a class="btn primary" href="#${(last || first).id}">▶ ${last ? u('contT', {d:esc(dname(last))}) : u('startT', {d:esc(dname(first))})}</a>`
    + `<button type="button" class="btn" data-act="uirand">🔀 ${u('randT')}</button>`
    + (w ? `<a class="btn" href="#${w.d.id}">🎯 ${u('weakT', {d:esc(dname(w.d)), p:Math.round(100*w.p)})}</a>` : '')
    + `</div><div class="gprog">`;
  GRPS.forEach(gr => { let c = 0, n = 0; DR.filter(d => (d.g || 'met') === gr[0]).forEach(d => { const s = SCORES[d.id]; if (s){ c += s.c; n += s.n; } });
    const gp = n ? Math.round(100*c/n) : null;
    h += `<button type="button" class="gp" data-act="jump" data-v="grp-${gr[0]}"><span>${u(gr[1])}</span>${bar(gp)}<span class="gpn">${gp == null ? '–' : gp + '%'}</span></button>`; });
  return h + `</div></section>`;
}
const _renderHome = renderHome;
renderHome = function(){ return dashHTML() + _renderHome(); };

/* ---- sidebar (desktop) + bottom nav (phone) ---- */
function ensureShell(){
  if (document.getElementById('side')) return;
  const side = document.createElement('nav'); side.id = 'side'; side.setAttribute('aria-label', 'Drills'); document.body.appendChild(side);
  const bn = document.createElement('nav'); bn.id = 'bnav'; bn.setAttribute('aria-label', 'Navigation'); document.body.appendChild(bn);
}
function sidebarHTML(){
  const t = DAYS[dayKey()] || {n:0};
  let h = `<a class="sitem shome${VIEW === 'home' ? ' cur' : ''}" href="#home"><span class="snum">⌂</span><span class="sname">${u('navHome')}</span><span class="smeta">${t.n}/${UIS.goal}</span></a>`;
  if (typeof rvDue === 'function'){ const nd = rvDue().length; h += `<a class="sitem${VIEW === 'review' ? ' cur' : ''}" href="#review"><span class="snum">🔁</span><span class="sname">${u('rvNav')}</span><span class="smeta">${nd ? `<em class="badge">${nd}</em>` : rvActive().length || ''}</span></a>`; }
  GRPS.forEach(g => { const ds = drSorted().filter(d => (d.g || 'met') === g[0]); if (!ds.length) return;
    h += `<h4>${u(g[1])}</h4>`;
    ds.forEach(d => { const p = pct(d.id); h += `<a class="sitem${VIEW === d.id ? ' cur' : ''}" href="#${d.id}"${VIEW === d.id ? ' aria-current="page"' : ''}><span class="snum">${dnum(d)}</span><span class="sname">${esc(dname(d))}</span><span class="smeta">${p == null ? '' : p + '%'}</span>${bar(p)}</a>`; }); });
  h += `<div class="sfoot">`;
  if (SESS.n) h += `<p class="sess">${u('session')}: ${SESS.n} · ${Math.round(100*SESS.c/SESS.n)}%</p>`;
  h += `<a class="sitem${VIEW === 'settings' ? ' cur' : ''}" href="#settings"><span class="snum">⚙</span><span class="sname">${u('navSet')}</span></a>`;
  if (EXTRA_VIEWS.sync) h += `<a class="sitem${VIEW === 'sync' ? ' cur' : ''}" href="#sync"><span class="snum">⇅</span><span class="sname">${u('syncLink')}</span></a>`;
  return h + `</div>`;
}
function bnavHTML(){
  const last = lastDrill(), isDrill = DR.some(d => d.id === VIEW);
  const it = (cls, href, act, ico, lbl, cur) => `<${href ? `a href="${href}"` : `button type="button" data-act="${act}"`} class="bn ${cls}${cur ? ' cur' : ''}"${cur ? ' aria-current="page"' : ''}><span class="bi" aria-hidden="true">${ico}</span><span class="bl">${lbl}</span></${href ? 'a' : 'button'}>`;
  return it('', '#home', '', '⌂', u('navHome'), VIEW === 'home')
    + (isDrill ? it('', '', 'uinext', '⏭', u('navNext'), false) : it('', '', 'uicont', '▶', u('navCont'), false))
    + (typeof rvDue === 'function' ? `<a href="#review" class="bn${VIEW === 'review' ? ' cur' : ''}"><span class="bi" aria-hidden="true">🔁${rvDue().length ? `<em class="badge">${rvDue().length}</em>` : ''}</span><span class="bl">${u('rvNav')}</span></a>` : it('', '', 'uirand', '🔀', u('navRand'), false))
    + it('', '#settings', '', '⚙', u('navSet'), VIEW === 'settings');
}
const _render = render;
render = function(){
  if (DR.some(d => d.id === VIEW)) store.set('last', VIEW);
  _render();
  if (typeof document === 'undefined') return;
  ensureShell();
  document.getElementById('side').innerHTML = sidebarHTML();
  document.getElementById('bnav').innerHTML = bnavHTML();
  const cur = document.querySelector('#side .cur'); if (cur && cur.scrollIntoView && VIEW !== 'home'){ const s = document.getElementById('side'), r = cur.getBoundingClientRect(), sr = s.getBoundingClientRect(); if (r.top < sr.top || r.bottom > sr.bottom) cur.scrollIntoView({block:'nearest'}); }
  if (DR.some(d => d.id === VIEW) && SESS.n){ const dh = document.querySelector('.dhead .dtitle'); if (dh && !dh.querySelector('.sesschip')) dh.insertAdjacentHTML('beforeend', `<span class="chip muted sesschip" title="${esc(u('session'))}">${u('session')}: ${SESS.c}/${SESS.n}</span>`); }
  const hh = document.getElementById('hdr'); if (hh) document.documentElement.style.setProperty('--hh', hh.offsetHeight + 'px');
};

/* ---- settings view ---- */
function segUI(k, opts){ return `<div class="seg" role="group">` + opts.map(o => `<button type="button" class="${String(UIS[k]) === String(o[0]) ? 'on' : ''}" aria-pressed="${String(UIS[k]) === String(o[0])}" data-act="uiset" data-k="${k}" data-v="${o[0]}">${o[1]}</button>`).join('') + `</div>`; }
let RESET_ARM = false;
EXTRA_VIEWS.settings = function(){
  document.title = u('setT');
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><h1>${u('setT')}</h1></div><p class="ddesc">${u('setD')}</p></div><div class="card setlist">`;
  const row = (lbl, ctl) => `<div class="setrow"><span class="setl">${lbl}</span>${ctl}</div>`;
  h += row(u('langT'), `<div class="seg" role="group">` + ['en', 'fr', 'de'].map(l => `<button type="button" class="${l === L ? 'on' : ''}" data-act="lang" data-v="${l}" lang="${l}">${{en:'English', fr:'Français', de:'Deutsch'}[l]}</button>`).join('') + `</div>`);
  h += row(u('textSize'), segUI('size', [['s', '<span style="font-size:.85em">A</span>'], ['m', 'A'], ['l', '<span style="font-size:1.15em">A</span>'], ['xl', '<span style="font-size:1.3em">A</span>']]));
  h += row(u('theme'), segUI('theme', [['auto', u('thAuto')], ['light', u('thLight')], ['dark', u('thDark')]]));
  h += row(u('layout'), segUI('layout', [['cards', u('lyCards')], ['compact', u('lyCompact')]]));
  h += row(u('goalSet'), segUI('goal', [[10, '10'], [20, '20'], [30, '30'], [50, '50'], [100, '100']]));
  h += row(u('vibe'), segUI('vibe', [[true, u('on')], [false, u('off')]]));
  h += row(u('kbdHints'), segUI('kbd', [[true, u('on')], [false, u('off')]]));
  h += `</div><div class="card setlist"><h3>${u('progT')}</h3>`;
  if (EXTRA_VIEWS.sync) h += `<p><a class="btn" href="#sync">⇅ ${u('syncLink')}</a></p>`;
  h += `<p><button type="button" class="btn${RESET_ARM ? ' danger' : ''}" data-act="uireset">${RESET_ARM ? u('resetSure') : u('resetAll')}</button></p></div>`;
  h += `<div class="card setlist"><h3>${u('keysT')}</h3><dl class="keys">` + U.keys.map(k => `<dt><kbd>${esc(T(k[0]))}</kbd></dt><dd>${esc(T(k[1]))}</dd>`).join('') + `</dl></div>`;
  return h;
};
A.uiset = el => { const k = el.dataset.k; let v = el.dataset.v; if (k === 'goal') v = +v; if (k === 'vibe' || k === 'kbd') v = v === 'true'; UIS[k] = v; uiSave(); render(); };
A.uireset = () => { if (!RESET_ARM){ RESET_ARM = true; render(); setTimeout(() => { if (RESET_ARM){ RESET_ARM = false; if (VIEW === 'settings') render(); } }, 4000); return; }
  RESET_ARM = false; resetProgress(); render(); };
A.resetscores = () => goTo('settings');
A.uirand = () => { const ds = DR.filter(d => d.id !== VIEW); goTo(pick(ds).id); };
A.uinext = () => { const ds = drSorted(); const i = ds.findIndex(d => d.id === VIEW); goTo(ds[(i + 1) % ds.length].id); };
A.uicont = () => { const l = lastDrill(); goTo((l || drSorted()[0]).id); };

/* ---- keyboard shortcuts ---- */
function visible(el){ return !!(el && el.offsetParent !== null && !el.disabled); }
if (typeof document !== 'undefined') document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tg = e.target, tn = tg && tg.tagName;
  if (tn === 'INPUT' || tn === 'SELECT' || tn === 'TEXTAREA' || (tg && tg.isContentEditable)) return;
  const main = document.getElementById('main'); if (!main) return;
  const k = e.key;
  if (/^[1-9]$/.test(k)){ const box = [...main.querySelectorAll('.opts')].find(b => [...b.querySelectorAll('.opt')].some(visible));
    if (!box) return; const o = [...box.querySelectorAll('.opt')].filter(x => x.offsetParent !== null)[+k - 1]; if (o && !o.disabled){ e.preventDefault(); o.click(); } return; }
  if (k === 'Enter'){ if (tn === 'BUTTON' || tn === 'A') return;
    const prim = [...main.querySelectorAll('.btn.primary')].filter(visible); if (!prim.length) return;
    const fbs = main.querySelectorAll('.fb'), lastFb = fbs[fbs.length - 1];
    const after = lastFb ? prim.filter(b => lastFb.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) : [];
    e.preventDefault(); (after[0] || prim[0]).click(); return; }
  if (k === 'r' || k === 'R'){ e.preventDefault(); A.uirand(); return; }
  if (k === 'h' || k === 'H' || k === 'Escape'){ if (VIEW !== 'home'){ e.preventDefault(); goTo('home'); } return; }
  if ((k === 'v' || k === 'V') && EXTRA_VIEWS.review){ e.preventDefault(); goTo('review'); return; }
  if (k === '?'){ e.preventDefault(); goTo('settings'); return; }
  if (k === '[' || k === ']'){ const ds = drSorted(); let i = ds.findIndex(d => d.id === VIEW); i = i < 0 ? (k === ']' ? 0 : ds.length - 1) : (i + (k === ']' ? 1 : -1) + ds.length) % ds.length; e.preventDefault(); goTo(ds[i].id); }
});

uiApply();
if (typeof window !== 'undefined') window.addEventListener('resize', () => { const hh = document.getElementById('hdr'); if (hh) document.documentElement.style.setProperty('--hh', hh.offsetHeight + 'px'); });
