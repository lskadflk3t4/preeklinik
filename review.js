/* ===================== MISTAKES BANK + SPACED REVIEW =====================
   Every wrongly answered question is saved as a snapshot of the drill state just before the answer.
   Review restores that snapshot into the drill, so the question looks exactly as it did.
   Schedule (Leitner): box 0 = due now → 1 → 3 → 7 → 14 → 30 days → mastered. A wrong answer resets to box 0.
   Cards live in PROG.rv (synced with the scores; per-card last-write-wins). */
Object.assign(U, {
  rvNav:"Review|Révision|Wiederholen", rvT:"Mistakes & spaced review|Erreurs et révision espacée|Fehler & verteilte Wiederholung",
  rvD:"Every question you get wrong is saved here exactly as you saw it. It comes back after 1, 3, 7, 14 and 30 days; a wrong answer starts it over. After the 30-day review it counts as mastered.|Chaque question ratée est enregistrée ici telle que vous l'avez vue. Elle revient après 1, 3, 7, 14 et 30 jours ; une erreur la fait recommencer. Après la révision à 30 jours, elle est considérée comme maîtrisée.|Jede falsch beantwortete Frage wird hier genau so gespeichert, wie du sie gesehen hast. Sie kommt nach 1, 3, 7, 14 und 30 Tagen wieder; eine falsche Antwort startet sie neu. Nach der 30-Tage-Wiederholung gilt sie als beherrscht.",
  rvDue:"Due now|À revoir maintenant|Jetzt fällig", rvBank:"In the bank|Dans la banque|Gespeichert", rvMastered:"Mastered|Maîtrisées|Beherrscht",
  rvStartDue:"Review due ({n})|Réviser les questions dues ({n})|Fällige wiederholen ({n})", rvStartAll:"Practise all mistakes ({n})|S'entraîner sur toutes les erreurs ({n})|Alle Fehler üben ({n})",
  rvNoneDue:"Nothing due right now. Next review {w}.|Rien à revoir pour l'instant. Prochaine révision {w}.|Gerade nichts fällig. Nächste Wiederholung {w}.",
  rvEmpty:"No mistakes saved yet. Wrong answers in any drill are added here automatically.|Aucune erreur enregistrée. Les mauvaises réponses de tous les exercices sont ajoutées ici automatiquement.|Noch keine Fehler gespeichert. Falsche Antworten aus allen Übungen landen automatisch hier.",
  rvDrill:"Practise these ({n})|S'entraîner ({n})|Diese üben ({n})", rvRemove:"Remove|Retirer|Entfernen",
  rvClear:"Clear all mistakes|Effacer toutes les erreurs|Alle Fehler löschen", rvClearSure:"Tap again to delete all saved mistakes|Touchez encore pour tout effacer|Erneut tippen, um alle Fehler zu löschen",
  rvNow:"due now|à revoir|jetzt fällig", rvToday:"later today|plus tard aujourd'hui|später heute", rvTomorrow:"tomorrow|demain|morgen", rvInDays:"in {n} days|dans {n} jours|in {n} Tagen",
  rvBar:"Review {i} / {n}|Révision {i} / {n}|Wiederholung {i} / {n}", rvSkip:"Skip|Passer|Überspringen", rvEnd:"End|Terminer|Beenden", rvNext:"Next card ▸|Carte suivante ▸|Nächste Karte ▸", rvFinish:"Finish ▸|Terminer ▸|Fertig ▸",
  rvOk:"Correct – next review {w}|Juste – prochaine révision {w}|Richtig – nächste Wiederholung {w}", rvOkDone:"Correct – mastered! Removed from the bank.|Juste – maîtrisée ! Retirée de la banque.|Richtig – beherrscht! Aus dem Speicher entfernt.",
  rvNo:"Not yet – it comes back at the end of this session and the schedule starts over.|Pas encore – elle reviendra à la fin de cette session et le calendrier recommence.|Noch nicht – sie kommt am Ende dieser Runde wieder und der Plan beginnt neu.",
  rvDone:"Session finished: {c} / {n} correct.|Session terminée : {c} / {n} justes.|Runde beendet: {c} / {n} richtig.",
  rvAdded:"Saved to your mistakes for review|Ajoutée à vos erreurs à revoir|Zu deinen Fehlern zum Wiederholen gespeichert",
  rvHome:"Review mistakes: {n} due|Revoir les erreurs : {n} à faire|Fehler wiederholen: {n} fällig", rvHomeNone:"Mistakes bank: {n} saved, none due|Banque d'erreurs : {n}, aucune due|Fehlerspeicher: {n}, keine fällig",
  rvStep:"Step {b} of 5|Étape {b} sur 5|Stufe {b} von 5"
});

const DAY = 864e5, RV_INT = [0, 1, 3, 7, 14, 30], RV_MAX = 200;
if (!PROG.rv) PROG.rv = {cards:{}};
const RVC = () => PROG.rv.cards;
function rvActive(){ const c = RVC(); return Object.keys(c).filter(k => !c[k].gone).map(k => c[k]); }
function rvDue(){ const now = Date.now(); return rvActive().filter(c => c.due <= now).sort((a, b) => a.due - b.due); }
function rvMastered(){ const c = RVC(); return Object.keys(c).filter(k => c[k].gone && c[k].ret).length; }
function rvWhen(t){ const d = t - Date.now(); if (d <= 0) return u('rvNow'); const dd = Math.round(d / DAY);
  if (dd < 1) return u('rvToday'); if (dd === 1) return u('rvTomorrow'); return u('rvInDays', {n:dd}); }
function rvSave(){ saveProg(); if (ON_SCORE) ON_SCORE(); }
function rvTouch(c){ c.u = Date.now(); }

/* ---- snapshot (de)serialisation: functions become plain text so cards survive reloads and sync ---- */
function rvSer(v){
  if (typeof v === 'function'){
    if (v.length === 0){ try { return {__f:String(v())}; } catch(e){ return null; } }
    const k = L, out = []; try { ['en', 'fr', 'de'].forEach(l => { L = l; out.push(String(v(l))); }); } catch(e){ L = k; return null; } L = k; return {__l:out}; }
  if (Array.isArray(v)) return v.map(rvSer);
  if (v && typeof v === 'object'){ const o = {}; for (const k in v){ if (k === 'queue' || k === 'last') continue; const r = rvSer(v[k]); if (r !== undefined) o[k] = r; } return o; }
  return v; }
function rvDe(v){
  if (Array.isArray(v)) return v.map(rvDe);
  if (v && typeof v === 'object'){ if (v.__l) return v.__l.slice(); if (v.__f != null){ const s = v.__f; return () => s; }
    const o = {}; for (const k in v) o[k] = rvDe(v[k]); return o; }
  return v; }

/* ---- which actions answer a question, and which state slot they use ---- */
const RV_ANS = {
  ocheck: el => el.dataset.ns, d2ans:'d2', d3check:'d3', d4check:'d4', d4mans:'d4', d4pans:'d4', d5ans:'d5', d6ans:'d6', d7check:'d7',
  d8ans:'d8', d8mans:'d8', bxans: el => el.dataset.id, bxcheck: el => el.dataset.id };
/* clear the learner's input that was already in the state when the answer was submitted */
const RV_RESET = {
  ocheck:(s, slot) => { const o = slot === 'd5' ? s.ord.o : s.o; o.pool = shuffle(o.pool.concat(o.seq)); o.seq = []; o.checked = false; o.res = []; o.msg = null; },
  d3check:s => { s.sel = []; s.checked = false; },
  d4check:s => { s.ans = {}; s.checked = false; },
  d7check:s => { for (const k in s.B){ s.B[k].val = ''; s.B[k].state = null; } s.checked = false; s.msg = null; },
  bxcheck:s => { s.ans = {}; s.res = null; s.done = false; s.msg = null; },
  bxnum:s => { s.val = ''; s.done = false; s.ok = null; },
  d9:s => { s.val = ''; s.checked = false; s.ok = null; }
};
const RV_NEXT = ['d1new', 'd2next', 'd2again', 'd2other', 'd3next', 'd4mnext', 'd4pnext', 'd5next', 'd5reord', 'd6next', 'd7new', 'd8next', 'd8mnext', 'd9next', 'bxnext'];
const RV_KEEP_CHG = ['d7sel', 'bxcmp'];

let RV_PEND = null;   // {slot, act, snap, pv} while an answer action runs
let REV = null;       // active review session {queue:[ids], i, n, c, cur, res, drill}
let RV_CLEAR_ARM = false;

function rvPreview(){ const m = typeof document !== 'undefined' && document.getElementById('main'); if (!m) return '';
  const parts = []; ['.q', '.stmt', '.vignette', '.current', '.info h3'].forEach(sel => { const e = m.querySelector(sel); if (e && parts.length < 2){ const t = (e.innerText || e.textContent).replace(/\s+/g, ' ').trim(); if (t && parts.indexOf(t) < 0) parts.push(t); } });
  const s = parts.join(' — '); return s.length > 160 ? s.slice(0, 157) + '…' : s; }
function rvCapture(slot, act){ try { if (!S[slot]) return; RV_PEND = {slot, act, snap:rvSer(S[slot]), pv:rvPreview()}; } catch(e){ RV_PEND = null; } }
function rvWrap(name, slotOf){ const f = A[name]; if (!f) return;
  A[name] = function(el){ rvCapture(typeof slotOf === 'function' ? slotOf(el) : slotOf, name); try { return f.apply(this, arguments); } finally { RV_PEND = null; } }; }
Object.keys(RV_ANS).forEach(k => rvWrap(k, RV_ANS[k]));
{ const f = SUBS.bxnum; SUBS.bxnum = function(fm){ rvCapture(fm.dataset.id, 'bxnum'); try { return f.apply(this, arguments); } finally { RV_PEND = null; } }; }
{ const f = d9submit; d9submit = function(){ rvCapture('d9', 'd9'); try { return f.apply(this, arguments); } finally { RV_PEND = null; } }; }
RV_NEXT.forEach(k => { const f = A[k]; if (!f) return; A[k] = function(){ if (REV && REV.cur && VIEW === REV.drill){ rvNext(); return; } return f.apply(this, arguments); }; });
Object.keys(CHG).forEach(k => { if (RV_KEEP_CHG.indexOf(k) >= 0) return; const f = CHG[k]; CHG[k] = function(){ if (REV) REV = null; return f.apply(this, arguments); }; });

/* ---- hook into scoring ---- */
const _rvAdd = addScore;
addScore = function(id, c, n){
  const p = RV_PEND;
  if (p && n){
    if (REV && REV.cur && !REV.res && VIEW === REV.drill) rvGrade(c >= n);
    else if (c < n){ const cards = RVC(); const act = rvActive();
      if (act.length >= RV_MAX){ act.sort((a, b) => a.added - b.added); const old = act[0]; cards[old.id] = {id:old.id, gone:true, u:Date.now()}; }
      const cid = 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      cards[cid] = {id:cid, d:id, slot:p.slot, act:p.act, snap:p.snap, pv:p.pv, pvl:{[L]:p.pv}, box:0, due:Date.now(), added:Date.now(), u:Date.now()};
      RV_TOAST = Date.now(); }
  }
  _rvAdd(id, c, n);
};
let RV_TOAST = 0;

function rvGrade(ok){ const c = RVC()[REV.cur]; REV.res = ok ? 'ok' : 'no'; if (ok) REV.c++;
  if (!c || c.gone) return;
  if (ok){ c.box = (c.box || 0) + 1; if (c.box >= RV_INT.length){ RVC()[c.id] = {id:c.id, gone:true, ret:true, u:Date.now()}; REV.mast = true; } else { c.due = Date.now() + RV_INT[c.box]*DAY; REV.mast = false; } }
  else { c.box = 0; c.due = Date.now(); }
  rvTouch(c); }

/* ---- sessions ---- */
function rvLoad(id){ const c = RVC()[id]; if (!c || c.gone) return false;
  let st; try { st = rvDe(JSON.parse(JSON.stringify(c.snap))); } catch(e){ return false; }
  const live = S[c.slot];
  if (RV_RESET[c.act]) RV_RESET[c.act](st, c.slot);
  if (c.slot === 'd8' && st.m && st.m.opts){ const key = JSON.stringify(st.m.it); st.m.it = st.m.opts.find(o => JSON.stringify(o) === key) || st.m.it; }
  if (live && BX[c.slot]){ st.queue = live.queue; st.last = live.last; }
  S[c.slot] = st; REV.cur = id; REV.res = null; REV.drill = c.d; return true; }
function rvStart(mode, drill){
  let cards = mode === 'due' ? rvDue() : shuffle(rvActive()); if (drill) cards = cards.filter(c => c.d === drill);
  if (!cards.length) return;
  REV = {queue:cards.map(c => c.id), i:0, n:cards.length, c:0, cur:null, res:null, drill:null, done:0};
  rvNext(true); }
function rvNext(first){
  if (!REV) return;
  if (!first && REV.cur){ const q = REV.queue, ix = q.indexOf(REV.cur); if (ix >= 0) q.splice(ix, 1); if (REV.res === 'no') q.push(REV.cur); if (REV.res) REV.done++; }
  REV.cur = null; REV.res = null; rvSave();
  while (REV.queue.length && !rvLoad(REV.queue[0])) REV.queue.shift();
  if (!REV.queue.length || REV.done >= REV.n * 3){ RV_SUMMARY = {c:REV.c, n:REV.done}; REV = null; goTo('review'); return; }
  REV.i = REV.done + 1;
  if (location.hash === '#' + REV.drill) render(); else location.hash = REV.drill;
  if (typeof window !== 'undefined') window.scrollTo(0, 0); }
let RV_SUMMARY = null;
function rvEnd(){ REV = null; rvSave(); goTo('review'); }

A.rvstart = el => rvStart(el.dataset.v, el.dataset.d || null);
A.rvnext = () => rvNext();
A.rvskip = () => { if (!REV) return; REV.res = null; rvNext(); };
A.rvend = () => rvEnd();
A.rvdel = el => { const c = RVC()[el.dataset.v]; if (c){ RVC()[c.id] = {id:c.id, gone:true, u:Date.now()}; rvSave(); render(); } };
A.rvclear = () => { if (!RV_CLEAR_ARM){ RV_CLEAR_ARM = true; render(); setTimeout(() => { if (RV_CLEAR_ARM){ RV_CLEAR_ARM = false; if (VIEW === 'review') render(); } }, 4000); return; }
  RV_CLEAR_ARM = false; rvActive().forEach(c => { RVC()[c.id] = {id:c.id, gone:true, u:Date.now()}; }); rvSave(); render(); };

/* ---- review home ---- */
EXTRA_VIEWS.review = function(){
  document.title = u('rvT');
  const act = rvActive(), due = rvDue();
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><h1>${u('rvT')}</h1></div><p class="ddesc">${u('rvD')}</p></div>`;
  if (RV_SUMMARY){ h += `<div class="fb ok rvsum"><strong>${u('rvDone', RV_SUMMARY)}</strong></div>`; RV_SUMMARY = null; }
  h += `<div class="rvstats"><div><b>${due.length}</b><span>${u('rvDue')}</span></div><div><b>${act.length}</b><span>${u('rvBank')}</span></div><div><b>${rvMastered()}</b><span>${u('rvMastered')}</span></div></div>`;
  if (!act.length) return h + `<div class="card"><p class="note">${u('rvEmpty')}</p></div>`;
  h += `<div class="actions rvact">` + (due.length ? `<button type="button" class="btn primary" data-act="rvstart" data-v="due">▶ ${u('rvStartDue', {n:due.length})}</button>`
      : `<p class="note">${u('rvNoneDue', {w:rvWhen(Math.min.apply(null, act.map(c => c.due)))})}</p>`)
    + `<button type="button" class="btn" data-act="rvstart" data-v="all">🔁 ${u('rvStartAll', {n:act.length})}</button></div>`;
  drSorted().forEach(d => { const cs = act.filter(c => c.d === d.id).sort((a, b) => a.due - b.due); if (!cs.length) return;
    h += `<div class="card rvgroup"><div class="rvgh"><h3><span class="tnum">${dnum(d)}</span> ${esc(dname(d))}</h3><button type="button" class="btn" data-act="rvstart" data-v="all" data-d="${d.id}">${u('rvDrill', {n:cs.length})}</button></div><ul class="rvlist">`;
    cs.forEach(c => { const b = c.box || 0;
      h += `<li><div class="rvpv">${esc((c.pvl && c.pvl[L]) || c.pv || dname(d))}</div><div class="rvmeta"><span class="dots" title="${esc(u('rvStep', {b}))}">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= b ? 'on' : ''}"></i>`).join('')}</span><span class="${c.due <= Date.now() ? 'due' : ''}">${rvWhen(c.due)}</span><button type="button" class="linkbtn" data-act="rvdel" data-v="${c.id}" aria-label="${esc(u('rvRemove'))}">✕</button></div></li>`; });
    h += `</ul></div>`; });
  h += `<p><button type="button" class="btn${RV_CLEAR_ARM ? ' danger' : ''}" data-act="rvclear">${RV_CLEAR_ARM ? u('rvClearSure') : u('rvClear')}</button></p>`;
  return h;
};

/* ---- banner inside a drill during review, toast when a mistake is saved ---- */
function rvBarHTML(){
  let h = `<div class="revbar${REV.res ? ' ' + REV.res : ''}" role="status"><span class="rvl">🔁 ${u('rvBar', {i:REV.i, n:REV.done + REV.queue.length})}</span>`;
  if (REV.res === 'ok'){ const c = RVC()[REV.cur]; h += `<span class="rvm">${REV.mast ? u('rvOkDone') : u('rvOk', {w:rvWhen(c && c.due)})}</span>`; }
  else if (REV.res === 'no') h += `<span class="rvm">${u('rvNo')}</span>`;
  h += `<span class="rvb">`;
  if (REV.res){ const more = REV.queue.length > 1 || REV.res === 'no'; h += `<button type="button" class="btn primary" data-act="rvnext">${more ? u('rvNext') : u('rvFinish')}</button>`; }
  else h += `<button type="button" class="btn" data-act="rvskip">${u('rvSkip')}</button>`;
  return h + `<button type="button" class="btn" data-act="rvend">${u('rvEnd')}</button></span></div>`; }
const _rvRender = render;
render = function(){
  if (REV && VIEW !== REV.drill && VIEW !== 'review') REV = null;
  _rvRender();
  if (typeof document === 'undefined') return;
  const main = document.getElementById('main'); if (!main) return;
  if (REV && REV.cur && VIEW === REV.drill && !REV.res){ const c = RVC()[REV.cur]; if (c && !(c.pvl && c.pvl[L])){ const t = rvPreview(); if (t){ c.pvl = c.pvl || {}; c.pvl[L] = t; store.set('prog', PROG); } } }
  if (REV && REV.cur && VIEW === REV.drill){ const dh = main.querySelector('.dhead'); if (dh) dh.insertAdjacentHTML('afterend', rvBarHTML()); main.classList.add('reviewing'); }
  else main.classList.remove('reviewing');
  if (RV_TOAST && Date.now() - RV_TOAST < 1500 && !REV){ RV_TOAST = 0; const fb = main.querySelectorAll('.fb.no, .fb'); const t = fb[fb.length - 1];
    if (t && !t.querySelector('.rvsaved')) t.insertAdjacentHTML('beforeend', `<p class="rvsaved">🔁 ${u('rvAdded')} · <a href="#review">${u('rvNav')}</a></p>`); }
};

/* ---- sync: merge cards by last update ---- */
const _rvMerge = mergeProg;
mergeProg = function(remote){ const r = _rvMerge(remote);
  if (r && remote && remote.rv && remote.rv.cards){ if (!PROG.rv) PROG.rv = {cards:{}}; const L0 = RVC(), R = remote.rv.cards;
    for (const k in R){ const a = L0[k], b = R[k]; if (!a || (b.u || 0) > (a.u || 0)) L0[k] = b; }
    const cut = Date.now() - 120*DAY; for (const k in L0){ if (L0[k].gone && !L0[k].ret && (L0[k].u || 0) < cut) delete L0[k]; }
    saveProg(); }
  return r; };
