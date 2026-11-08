/* ===================== LEARNING PATH (units that unlock) + PROGRESS PAGE =====================
   Units: every topic drill (bx engine) uses its topics as units, in order from basics to advanced.
          Pathway drills (1 reconstruction, 2 what happens next, 7 missing molecule, 10 diagram tests) use 4 pathway tiers.
   A unit is mastered when 8 of the last 10 answers in it are correct; mastering unit k unlocks unit k+1.
   Stored in PROG.lv[drill][unit] = {r:'1101…' (last 10), c, n, m:mastered, u:timestamp}; synced like the scores.
   Settings → Learning path: "Units unlock in order" (default) or "Free practice" (everything open). */
Object.assign(U, {
  lvPath:"Learning path|Parcours|Lernpfad", lvUnit:"Unit {i}|Unité {i}|Einheit {i}", lvMix:"Mix of unlocked units|Mélange des unités débloquées|Mix der freigeschalteten Einheiten",
  lvBasic:"Basics|Bases|Grundlagen", lvInter:"Intermediate|Intermédiaire|Mittelstufe", lvAdv:"Advanced|Avancé|Fortgeschritten",
  lvLocked:"Locked – master the previous unit first (8 of your last 10 answers correct).|Verrouillée – maîtrisez d'abord l'unité précédente (8 de vos 10 dernières réponses justes).|Gesperrt – meistere zuerst die vorige Einheit (8 deiner letzten 10 Antworten richtig).",
  lvRule:"Master a unit by getting 8 of your last 10 answers right; the next unit then unlocks.|Maîtrisez une unité avec 8 bonnes réponses sur vos 10 dernières ; l'unité suivante se débloque alors.|Eine Einheit ist gemeistert, wenn 8 deiner letzten 10 Antworten richtig sind; dann wird die nächste freigeschaltet.",
  lvUnlocked:"🔓 Unlocked: {u}|🔓 Débloquée : {u}|🔓 Freigeschaltet: {u}", lvMastered:"⭐ Mastered: {u}|⭐ Maîtrisée : {u}|⭐ Gemeistert: {u}", lvAllDone:"⭐ All units of this drill mastered!|⭐ Toutes les unités de cet exercice sont maîtrisées !|⭐ Alle Einheiten dieser Übung gemeistert!",
  lvRedirect:"🔒 That pathway is still locked – practising an unlocked one instead.|🔒 Cette voie est encore verrouillée – entraînement sur une voie débloquée.|🔒 Dieser Weg ist noch gesperrt – stattdessen ein freigeschalteter.",
  lvT1:"Core energy pathways|Voies énergétiques de base|Zentrale Energiewege", lvT2:"Fuel switching & shuttles|Changement de carburant et navettes|Brennstoffwechsel & Shuttles", lvT3:"Lipoproteins, amino acids & heme|Lipoprotéines, acides aminés et hème|Lipoproteine, Aminosäuren & Häm", lvT4:"Nucleotides, steroids & sphingolipids|Nucléotides, stéroïdes et sphingolipides|Nukleotide, Steroide & Sphingolipide",
  lvMode:"Learning path|Parcours d'apprentissage|Lernpfad", lvModeOrd:"Units unlock in order|Unités débloquées dans l'ordre|Einheiten der Reihe nach", lvModeFree:"Free practice (all open)|Entraînement libre (tout ouvert)|Freies Üben (alles offen)",
  lvReset:"Reset unit progress|Réinitialiser les unités|Einheitenfortschritt zurücksetzen", lvResetSure:"Tap again to reset all units|Touchez encore pour tout réinitialiser|Erneut tippen, um alle Einheiten zurückzusetzen",
  /* progress page */
  pgNav:"Progress|Progression|Fortschritt", pgT:"Your progress|Votre progression|Dein Fortschritt",
  pgD:"Everything you have answered on this device (and synced devices): accuracy per subject and drill, units mastered, daily activity and the spaced-review schedule.|Tout ce que vous avez répondu sur cet appareil (et les appareils synchronisés) : précision par matière et par exercice, unités maîtrisées, activité quotidienne et calendrier de révision espacée.|Alles, was du auf diesem Gerät (und synchronisierten Geräten) beantwortet hast: Trefferquote pro Fach und Übung, gemeisterte Einheiten, tägliche Aktivität und der Wiederholungsplan.",
  pgAns:"Answers|Réponses|Antworten", pgAcc:"Accuracy|Précision|Trefferquote", pgDays:"Active days (30 d)|Jours actifs (30 j)|Aktive Tage (30 T)", pgStreak:"Day streak|Série de jours|Tagesserie", pgUnits:"Units mastered|Unités maîtrisées|Gemeisterte Einheiten", pgDue:"Reviews due|Révisions dues|Fällige Wiederholungen",
  pgAct:"Last 30 days|30 derniers jours|Letzte 30 Tage", pgActNote:"Bar height = answers per day; colour = accuracy (green ≥ 80 %, amber ≥ 50 %, red below).|Hauteur = réponses par jour ; couleur = précision (vert ≥ 80 %, orange ≥ 50 %, rouge en dessous).|Balkenhöhe = Antworten pro Tag; Farbe = Trefferquote (grün ≥ 80 %, gelb ≥ 50 %, rot darunter).",
  pgRv:"Spaced review schedule|Calendrier de révision espacée|Wiederholungsplan", pgRvNote:"Mistakes come back after 1, 3, 7, 14 and 30 days; a wrong answer starts the card over.|Les erreurs reviennent après 1, 3, 7, 14 et 30 jours ; une erreur fait recommencer la carte.|Fehler kommen nach 1, 3, 7, 14 und 30 Tagen wieder; eine falsche Antwort setzt die Karte zurück.",
  pgToday:"Today|Aujourd'hui|Heute", pgBoxes:"Cards per step|Cartes par étape|Karten pro Stufe", pgStep:"Step {b}|Étape {b}|Stufe {b}", pgNew:"New|Nouvelle|Neu",
  pgWeak:"Weakest units|Unités les plus faibles|Schwächste Einheiten", pgWeakNone:"Answer at least 5 questions in a unit to see it here.|Répondez à au moins 5 questions d'une unité pour la voir ici.|Beantworte mindestens 5 Fragen einer Einheit, damit sie hier erscheint.",
  pgDrill:"Drill|Exercice|Übung", pgOpen:"Open|Ouvrir|Öffnen", pgNoUnits:"one unit|une unité|eine Einheit", pgStartReview:"Start review|Commencer la révision|Wiederholung starten",
  pgHome:"📈 Progress|📈 Progression|📈 Fortschritt"
});
if (Array.isArray(U.keys)) U.keys.push(["P|P|P", "Progress page|Page de progression|Fortschrittsseite"]);

/* ---------- pathway tiers ---------- */
const LVTIER = {
  t1:['glycolysis', 'pdh', 'krebs', 'etc', 'glycogenesis', 'glycogenolysis', 'betaox', 'lipolysis', 'transam', 'urea'],
  t2:['gng', 'ppp', 'fructose', 'galactose', 'polyol', 'carnitine', 'fas', 'tagsyn', 'ketogenesis', 'ketolysis', 'mas', 'g3ps', 'cori', 'glcala', 'ethanol'],
  t3:['cholesterol', 'bileacids', 'chylo', 'vldl', 'propionyl', 'bcaa', 'metcycle', 'transsulf', 'creatine', 'catechol', 'serotonin', 'hemesyn', 'hemedeg'],
  t4:['purinedn', 'purinedeg', 'pyrimidine', 'thymidylate', 'eicosanoids', 'cortisol', 'aldosterone', 'sphingosyn', 'sphingodeg']
};
const LVTN = {t1:'lvT1', t2:'lvT2', t3:'lvT3', t4:'lvT4'};
P.forEach(p => { if (!Object.keys(LVTIER).some(t => LVTIER[t].indexOf(p.id) >= 0)) LVTIER.t4.push(p.id); });
const pTier = pid => Object.keys(LVTIER).find(t => LVTIER[t].indexOf(pid) >= 0) || 't4';
const LVPW = {pathways:() => S.d1 && S.d1.pid, next:() => S.d2 && S.d2.pid, missing:() => S.d7 && S.d7.pid, diagrams:() => S.v1 && S.v1.mode !== 'study' && S.v1.mode !== 'ov' && S.v1.pid};

/* ---------- storage ---------- */
if (!PROG.lv) PROG.lv = {};
const LVN = 10, LVNEED = 8;
function lvUnits(id){ if (BX[id]){ const k = Object.keys(BX[id].topics); return k.length > 1 ? k : null; } if (LVPW[id]) return Object.keys(LVTIER); return null; }
function lvName(id, k){ if (BX[id]) return T(BX[id].topics[k]); return u(LVTN[k]); }
function lvLevel(i, n){ return i === 0 ? u('lvBasic') : i === n - 1 ? u('lvAdv') : u('lvInter'); }
function lvRec(id, k){ return (PROG.lv[id] || {})[k] || {r:'', c:0, n:0, m:false, u:0}; }
function lvScore(rec){ return rec.r.split('').filter(x => x === '1').length; }
function lvFree(){ return !!UIS.lvfree; }
function lvOpen(id, k){ if (lvFree()) return true; const us = lvUnits(id); if (!us) return true; const i = us.indexOf(k); if (i <= 0) return true; return !!lvRec(id, us[i - 1]).m; }
function lvCount(){ let m = 0, t = 0; DR.forEach(d => { const us = lvUnits(d.id); if (!us) return; t += us.length; us.forEach(k => { if (lvRec(d.id, k).m) m++; }); }); return {m, t}; }
let LV_TOAST = null;
function lvAnswer(id, k, ok){
  const L0 = PROG.lv[id] || (PROG.lv[id] = {}), r = L0[k] || (L0[k] = {r:'', c:0, n:0, m:false, u:0});
  r.r = (r.r + (ok ? '1' : '0')).slice(-LVN); r.n++; if (ok) r.c++; r.u = Date.now();
  if (!r.m && lvScore(r) >= LVNEED){ r.m = true; const us = lvUnits(id), i = us.indexOf(k);
    LV_TOAST = {t:Date.now(), msg:i < us.length - 1 ? u('lvMastered', {u:lvName(id, k)}) + ' · ' + u('lvUnlocked', {u:u('lvUnit', {i:i + 2}) + ' – ' + lvName(id, us[i + 1])}) : u('lvAllDone')}; }
}
function lvCurUnit(id){ if (BX[id]){ const s = S[id]; return s && s.it && lvUnits(id) ? s.it.t : null; } if (LVPW[id]){ const pid = LVPW[id](); return pid ? pTier(pid) : null; } return null; }
{ const _a = addScore; addScore = function(id, c, n){ try { if (n){ const k = lvCurUnit(id); if (k) lvAnswer(id, k, c >= n); } } catch(e){} return _a(id, c, n); }; }
{ const _m = mergeProg; mergeProg = function(remote){ const r = _m(remote);
    if (r && remote && remote.lv){ if (!PROG.lv) PROG.lv = {};
      for (const id in remote.lv) for (const k in remote.lv[id]){ const a = (PROG.lv[id] || {})[k], b = remote.lv[id][k];
        if (!a || (b.u || 0) > (a.u || 0)){ (PROG.lv[id] = PROG.lv[id] || {})[k] = Object.assign({}, b, {m:!!(b.m || (a && a.m))}); } else if (b.m) a.m = true; }
      saveProg(); }
    return r; }; }
{ const _r = resetProgress; resetProgress = function(){ PROG.lv = {}; return _r.apply(this, arguments); }; }

/* ---------- topic drills: only unlocked units are drawn ---------- */
{ const _p = bxPool; bxPool = function(id){
    const s = S[id], us = lvUnits(id); if (!us || lvFree() || REV) return _p(id);
    if (s.topic !== 'any' && !lvOpen(id, s.topic)) s.topic = 'any';
    if (s.topic !== 'any') return _p(id);
    const d = BX[id], out = []; d.bank.forEach((e, i) => { if (!lvOpen(id, e.t)) return; for (let w = 0; w < (e.w || 1); w++) out.push(i); });
    return out.length ? out : _p(id); }; }
function lvChip(id, k, i, n, cur){
  const rec = lvRec(id, k), open = lvOpen(id, k), sc = lvScore(rec);
  const st = rec.m ? 'done' : open ? 'open' : 'lock';
  const meta = rec.m ? '⭐' : open ? `${sc}/${LVNEED}` : '🔒';
  return `<button type="button" class="lvchip ${st}${cur ? ' cur' : ''}" data-act="lvpick" data-id="${id}" data-v="${k}"${open ? '' : ` aria-disabled="true" title="${esc(u('lvLocked'))}"`}>`
    + `<span class="lvn">${i + 1}</span><span class="lvtx"><b>${esc(lvName(id, k))}</b><small>${lvLevel(i, n)}</small></span><span class="lvm">${meta}</span>`
    + (open && !rec.m ? `<i class="lvbar" style="--p:${Math.round(100*sc/LVNEED)}%"></i>` : '') + `</button>`;
}
function lvStrip(id, cur){
  const us = lvUnits(id); if (!us) return '';
  let h = `<div class="lvpath" role="group" aria-label="${esc(u('lvPath'))}"><div class="lvhead"><strong>🧭 ${u('lvPath')}</strong>${lvFree() ? `<span class="chip muted">${u('lvModeFree')}</span>` : `<span class="lvrule">${u('lvRule')}</span>`}</div><div class="lvchips">`;
  if (BX[id]) h += `<button type="button" class="lvchip mix${cur === 'any' ? ' cur' : ''}" data-act="lvpick" data-id="${id}" data-v="any"><span class="lvn">∗</span><span class="lvtx"><b>${u('lvMix')}</b></span></button>`;
  us.forEach((k, i) => { h += lvChip(id, k, i, us.length, k === cur); });
  return h + `</div></div>`;
}
{ const _r = renderBX; renderBX = function(id){
    let h = _r(id); if (!lvUnits(id)) return h;
    h = h.replace(/^<div class="controls"><label class="field"><span>[^<]*<\/span><select data-chg="bxtopic"[\s\S]*?<\/select><\/label><\/div>/, '');
    return lvStrip(id, S[id].topic) + h; }; }
A.lvpick = el => { const id = el.dataset.id, k = el.dataset.v;
  if (BX[id]){ if (k !== 'any' && !lvOpen(id, k)) { lvToast(u('lvLocked')); return; } if (REV) REV = null; const s = S[id]; s.topic = k; s.queue = null; newBX(id); render(); return; }
  if (!lvOpen(id, k)){ lvToast(u('lvLocked')); return; }
  const pid = pick(LVTIER[k].filter(x => PW[x] && PW[x].st.length >= 3)) || LVTIER[k][0];
  if (id === 'pathways') newD1(pid); else if (id === 'next') newD2(pid); else if (id === 'missing') newD7(pid); else if (id === 'diagrams') newV1(pid, S.v1 && S.v1.mode !== 'study' && S.v1.mode !== 'ov' ? S.v1.mode : 'mix', S.v1 ? S.v1.cnt : 3);
  render(); };

/* ---------- pathway drills: locked pathways disabled, random only from unlocked ---------- */
function pwOpen(id, pid){ return lvOpen(id, pTier(pid)); }
function pwPickOpen(id){ const ok = P.filter(p => p.st.length >= 3 && pwOpen(id, p.id)); return pick(ok.length ? ok : P.filter(p => LVTIER.t1.indexOf(p.id) >= 0)).id; }
const PWACT = {d1path:'pathways', d2path:'next', d7path:'missing', v1path:'diagrams'};
{ const _ps = pathwaySelect; pathwaySelect = function(cur, act, withRandom){
    let h = _ps(cur, act, withRandom); const id = PWACT[act]; if (!id || lvFree()) return h;
    if (id === 'diagrams' && S.v1 && (S.v1.mode === 'study' || S.v1.mode === 'ov')) return h;
    P.forEach(p => { if (!pwOpen(id, p.id)) h = h.replace(`<option value="${p.id}">`, `<option value="${p.id}" disabled>🔒 `); });
    return h; }; }
function lvWrapNew(name, id, modeArg){ const f = window[name] || (typeof globalThis !== 'undefined' && globalThis[name]); if (typeof f !== 'function') return;
  const w = function(pid, mode){ if (!lvFree() && !REV){ const study = id === 'diagrams' && (mode || (S.v1 && S.v1.mode)) && ['study', 'ov'].indexOf(mode || S.v1.mode) >= 0;
      if (!study){ if (!pid || pid === '__rand') pid = pwPickOpen(id); else if (!pwOpen(id, pid)){ lvToast(u('lvRedirect')); pid = pwPickOpen(id); } } }
    return f.apply(this, [pid].concat([].slice.call(arguments, 1))); };
  return w; }
{ const w1 = lvWrapNew('newD1', 'pathways'); if (w1) newD1 = w1; const w2 = lvWrapNew('newD2', 'next'); if (w2) newD2 = w2; const w7 = lvWrapNew('newD7', 'missing'); if (w7) newD7 = w7; const wv = lvWrapNew('newV1', 'diagrams'); if (wv) newV1 = wv; }

/* ---------- toast ---------- */
function lvToast(msg){ if (typeof document === 'undefined') return; let t = document.getElementById('lvtoast');
  if (!t){ t = document.createElement('div'); t.id = 'lvtoast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(lvToast.h); lvToast.h = setTimeout(() => t.classList.remove('show'), 4200); }

/* ---------- progress page ---------- */
function pgPct(c, n){ return n ? Math.round(100*c/n) : null; }
function pgCls(p){ return p == null ? 'none' : p >= 80 ? 'good' : p >= 50 ? 'warn' : 'bad'; }
function pgActivity(){
  const days = []; const d = new Date(); d.setDate(d.getDate() - 29);
  for (let i = 0; i < 30; i++){ const k = dayKey(d), v = DAYS[k] || {c:0, n:0}; days.push({k, d:new Date(d), c:v.c, n:v.n}); d.setDate(d.getDate() + 1); }
  const max = Math.max(10, ...days.map(x => x.n)), W = 600, H = 150, bw = W/30;
  let s = `<svg class="pgchart" viewBox="0 0 ${W} ${H + 24}" role="img" aria-label="${esc(u('pgAct'))}"><line class="pgax" x1="0" y1="${H}" x2="${W}" y2="${H}"/>`;
  days.forEach((x, i) => { const h = x.n ? Math.max(3, (H - 8)*x.n/max) : 0, p = pgPct(x.c, x.n);
    if (h) s += `<rect class="pgbar ${pgCls(p)}" x="${(i*bw + 2).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${(bw - 4).toFixed(1)}" height="${h.toFixed(1)}" rx="3"><title>${x.k}: ${x.n} · ${p}%</title></rect>`;
    if (i % 5 === 4 || i === 29) s += `<text class="pgtx" x="${(i*bw + bw/2).toFixed(1)}" y="${H + 16}" text-anchor="middle">${x.d.getDate()}.${x.d.getMonth() + 1}.</text>`; });
  s += `<text class="pgtx" x="4" y="12">${max}</text></svg>`;
  return {svg:s, active:days.filter(x => x.n > 0).length};
}
function pgForecast(){
  if (typeof rvActive !== 'function') return '';
  const act = rvActive(), now = Date.now(), slots = [];
  for (let i = 0; i < 14; i++) slots.push(0);
  act.forEach(c => { if (c.due <= now){ slots[0]++; return; } const dd = Math.ceil((c.due - now)/DAY); if (dd < 14) slots[dd]++; });
  const max = Math.max(1, ...slots), W = 600, H = 90, bw = W/14;
  let s = `<svg class="pgchart" viewBox="0 0 ${W} ${H + 24}" role="img" aria-label="${esc(u('pgRv'))}"><line class="pgax" x1="0" y1="${H}" x2="${W}" y2="${H}"/>`;
  slots.forEach((n, i) => { const h = n ? Math.max(3, (H - 14)*n/max) : 0;
    if (h) s += `<rect class="pgbar rv${i === 0 ? ' due' : ''}" x="${(i*bw + 3).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${(bw - 6).toFixed(1)}" height="${h.toFixed(1)}" rx="3"/><text class="pgtx" x="${(i*bw + bw/2).toFixed(1)}" y="${(H - h - 4).toFixed(1)}" text-anchor="middle">${n}</text>`;
    s += `<text class="pgtx" x="${(i*bw + bw/2).toFixed(1)}" y="${H + 16}" text-anchor="middle">${i === 0 ? esc(u('pgToday')) : '+' + i}</text>`; });
  s += `</svg>`;
  const boxes = [0, 0, 0, 0, 0, 0]; act.forEach(c => { boxes[Math.min(5, c.box || 0)]++; });
  const bl = boxes.map((n, b) => `<span class="pgbox"><b>${n}</b><small>${b === 0 ? u('pgNew') : u('pgStep', {b}) + ' · ' + RV_INT[b] + 'd'}</small></span>`).join('');
  return s + `<p class="note">${u('pgBoxes')}:</p><div class="pgboxes">${bl}</div>`;
}
EXTRA_VIEWS.progress = function(){
  document.title = u('pgT');
  let C = 0, N = 0; for (const id in SCORES){ C += SCORES[id].c; N += SCORES[id].n; }
  const A0 = pgActivity(), lc = lvCount(), due = typeof rvDue === 'function' ? rvDue().length : 0, st = typeof streak === 'function' ? streak() : 0;
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><span class="tnum">📈</span><h1>${u('pgT')}</h1></div><p class="ddesc">${u('pgD')}</p></div>`;
  const kpi = (v, l, cls) => `<div class="pgkpi ${cls || ''}"><b>${v}</b><span>${l}</span></div>`;
  h += `<div class="pgkpis">` + kpi(N, u('pgAns')) + kpi(N ? pgPct(C, N) + '%' : '–', u('pgAcc'), pgCls(pgPct(C, N))) + kpi(A0.active, u('pgDays')) + kpi(st, u('pgStreak')) + kpi(`${lc.m}<small>/${lc.t}</small>`, u('pgUnits')) + kpi(due, u('pgDue'), due ? 'warn' : '') + `</div>`;
  h += `<section class="card pgsec"><h2>${u('pgAct')}</h2>${A0.svg}<p class="note">${u('pgActNote')}</p></section>`;
  h += `<section class="card pgsec"><h2>${u('pgRv')}</h2><p class="note">${u('pgRvNote')}</p>${pgForecast()}` + (due ? `<div class="actions"><button type="button" class="btn primary" data-act="rvstart" data-v="due">🔁 ${u('pgStartReview')} (${due})</button></div>` : '') + `</section>`;
  const weak = []; DR.forEach(d => { const us = lvUnits(d.id); if (!us) return; us.forEach((k, i) => { const r = lvRec(d.id, k); if (r.n >= 5) weak.push({d, k, i, p:r.c/r.n, r}); }); });
  weak.sort((a, b) => a.p - b.p);
  h += `<section class="card pgsec"><h2>${u('pgWeak')}</h2>` + (weak.length ? `<ul class="pgweak">` + weak.slice(0, 6).map(w => `<li><a href="#${w.d.id}" data-act="pgunit" data-id="${w.d.id}" data-v="${w.k}"><span class="tnum">${dnum(w.d)}</span> ${esc(dname(w.d))} · ${u('lvUnit', {i:w.i + 1})} ${esc(lvName(w.d.id, w.k))}</a><span class="chip ${pgCls(Math.round(100*w.p))}">${Math.round(100*w.p)}% · ${w.r.c}/${w.r.n}</span></li>`).join('') + `</ul>` : `<p class="note">${u('pgWeakNone')}</p>`) + `</section>`;
  GRPS.forEach(g => { const ds = drSorted().filter(d => (d.g || 'met') === g[0]); if (!ds.length) return;
    let gc = 0, gn = 0, gm = 0, gt = 0; ds.forEach(d => { const s = SCORES[d.id]; if (s){ gc += s.c; gn += s.n; } const us = lvUnits(d.id); if (us){ gt += us.length; us.forEach(k => { if (lvRec(d.id, k).m) gm++; }); } });
    const gp = pgPct(gc, gn);
    h += `<section class="card pgsec pggrp"><div class="pggh"><h2>${u(g[1])}</h2><span class="chip ${pgCls(gp)}">${gp == null ? u('noneYet') : gp + '% · ' + gc + '/' + gn}</span>${gt ? `<span class="chip muted">⭐ ${gm}/${gt}</span>` : ''}</div><div class="pgrows">`;
    ds.forEach(d => { const s = SCORES[d.id], p = s && s.n ? pgPct(s.c, s.n) : null, us = lvUnits(d.id);
      const dots = us ? us.map(k => { const r = lvRec(d.id, k), o = lvOpen(d.id, k); return `<i class="pgdot ${r.m ? 'done' : o ? 'open' : 'lock'}" title="${esc(lvName(d.id, k))}"></i>`; }).join('') : `<small class="muted">${u('pgNoUnits')}</small>`;
      h += `<a class="pgrow" href="#${d.id}"><span class="tnum">${dnum(d)}</span><span class="pgname">${esc(dname(d))}</span><span class="pgdots">${dots}</span>${bar(p)}<span class="pgnum">${p == null ? '–' : p + '%'}</span></a>`; });
    h += `</div></section>`; });
  return h;
};
A.pgunit = el => { const id = el.dataset.id, k = el.dataset.v; if (BX[id]){ S[id] = S[id] || {topic:'any'}; S[id].topic = k; S[id].queue = null; newBX(id); } goTo(id); };

/* ---------- sidebar link, home button, settings, keyboard ---------- */
(function(){ const _r = render; render = function(){ _r(); if (typeof document === 'undefined') return;
    const side = document.getElementById('side');
    if (side && !side.querySelector('.spg')){ const rv = side.querySelector('a[href="#review"]'); const html = `<a class="sitem spg${VIEW === 'progress' ? ' cur' : ''}" href="#progress"><span class="snum">📈</span><span class="sname">${u('pgNav')}</span><span class="smeta">${lvCount().m || ''}</span></a>`;
      if (rv) rv.insertAdjacentHTML('afterend', html); else side.insertAdjacentHTML('afterbegin', html); }
    if (VIEW === 'home'){ const db = document.querySelector('.dbtns'); if (db && !db.querySelector('.pgbtn')) db.insertAdjacentHTML('beforeend', `<a class="btn pgbtn" href="#progress">${u('pgHome')}</a>`); }
    if (VIEW === 'pathways' || VIEW === 'next' || VIEW === 'missing' || (VIEW === 'diagrams' && S.v1 && S.v1.mode !== 'study' && S.v1.mode !== 'ov')){
      const dh = document.querySelector('#main .dhead'), pid = LVPW[VIEW]();
      if (dh && !document.querySelector('#main .lvpath')) dh.insertAdjacentHTML('afterend', lvStrip(VIEW, pid ? pTier(pid) : null)); }
    if (LV_TOAST && Date.now() - LV_TOAST.t < 2000){ const m = LV_TOAST.msg; LV_TOAST = null; lvToast(m); }
  }; })();
{ const _s = EXTRA_VIEWS.settings; let LV_ARM = false;
  EXTRA_VIEWS.settings = function(){ let h = _s.apply(this, arguments);
    const card = `<div class="card setlist lvset"><div class="setrow"><span class="setl">🧭 ${u('lvMode')}</span><div class="seg" role="group">`
      + [[false, 'lvModeOrd'], [true, 'lvModeFree']].map(o => `<button type="button" class="${!!UIS.lvfree === o[0] ? 'on' : ''}" aria-pressed="${!!UIS.lvfree === o[0]}" data-act="lvmode" data-v="${o[0]}">${u(o[1])}</button>`).join('')
      + `</div></div><p class="note">${u('lvRule')}</p><p><button type="button" class="btn${LV_ARM ? ' danger' : ''}" data-act="lvreset">${LV_ARM ? u('lvResetSure') : u('lvReset')}</button></p></div>`;
    return h + card; };
  A.lvmode = el => { UIS.lvfree = el.dataset.v === 'true'; uiSave(); render(); };
  A.lvreset = () => { if (!LV_ARM){ LV_ARM = true; render(); setTimeout(() => { if (LV_ARM){ LV_ARM = false; if (VIEW === 'settings') render(); } }, 4000); return; } LV_ARM = false; PROG.lv = {}; saveProg(); render(); };
}
if (typeof document !== 'undefined') document.addEventListener('keydown', e => { if (e.ctrlKey || e.metaKey || e.altKey) return; const tn = e.target && e.target.tagName;
  if (tn === 'INPUT' || tn === 'SELECT' || tn === 'TEXTAREA') return; if (e.key === 'p' || e.key === 'P'){ e.preventDefault(); goTo('progress'); } });
if (typeof sxMan === 'function') sxMan({id:'progress', g:'tools', ico:'📈', t:"Progress & learning path|Progression et parcours|Fortschritt & Lernpfad",
  w:"See what you have mastered, and work through every drill unit by unit from basics to advanced.|Voyez ce que vous maîtrisez et parcourez chaque exercice unité par unité, des bases au niveau avancé.|Sieh, was du beherrschst, und arbeite jede Übung Einheit für Einheit von den Grundlagen bis fortgeschritten durch.",
  s:["Every drill with topics shows a 🧭 Learning path at the top: unit 1 (Basics) is open, later units are locked.|Chaque exercice à thèmes affiche un 🧭 Parcours en haut : l'unité 1 (Bases) est ouverte, les suivantes sont verrouillées.|Jede Übung mit Themen zeigt oben einen 🧭 Lernpfad: Einheit 1 (Grundlagen) ist offen, spätere sind gesperrt.",
    "Get 8 of your last 10 answers in a unit right to master it (⭐); the next unit unlocks. ‘Mix’ practises all unlocked units together.|Obtenez 8 bonnes réponses sur vos 10 dernières dans une unité pour la maîtriser (⭐) ; l'unité suivante se débloque. « Mélange » entraîne toutes les unités débloquées.|8 von deinen letzten 10 Antworten in einer Einheit richtig = gemeistert (⭐); die nächste Einheit wird frei. „Mix“ übt alle freigeschalteten Einheiten zusammen.",
    "Pathway drills (1, 2, 7 and the tests in 10) use four pathway tiers, from core energy pathways to nucleotides and sphingolipids. Study mode in Pathway diagrams is always open.|Les exercices sur les voies (1, 2, 7 et les tests du 10) utilisent quatre niveaux de voies, des voies énergétiques de base aux nucléotides et sphingolipides. Le mode étude des schémas reste toujours ouvert.|Wege-Übungen (1, 2, 7 und die Tests in 10) nutzen vier Stufen, von zentralen Energiewegen bis zu Nukleotiden und Sphingolipiden. Der Lernmodus der Diagramme ist immer offen.",
    "The 📈 Progress page (sidebar, home or key P) shows accuracy per subject and drill, units mastered, your last 30 days and the spaced-review forecast.|La page 📈 Progression (barre latérale, accueil ou touche P) montre la précision par matière et exercice, les unités maîtrisées, vos 30 derniers jours et les révisions à venir.|Die Seite 📈 Fortschritt (Seitenleiste, Startseite oder Taste P) zeigt Trefferquote pro Fach und Übung, gemeisterte Einheiten, deine letzten 30 Tage und die anstehenden Wiederholungen.",
    "Settings → Learning path → Free practice opens every unit (for exam cramming).|Réglages → Parcours → Entraînement libre ouvre toutes les unités (révision d'examen).|Einstellungen → Lernpfad → Freies Üben öffnet alle Einheiten (für die Prüfungsvorbereitung)."], go:'progress'});
