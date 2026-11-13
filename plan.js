/* ===================== PLAN: spaced unit re-tests · confidence bookkeeping · mixed practice · mock exam · progress =====================
   Loaded last (after lv.js, review.js, study.js), so its addScore wrapper is the outermost one.
   Units: 8 of the last 10 right = passed (✓, unlocks the next unit). A passed unit comes back for a short re-test after 1, 3 and 7 days
          (6 answers, ≥ 5 right = re-test passed, ≤ 3 = one step back). After the 7-day re-test it is mastered (⭐); then a check every 21–30 days.
          Stored on the unit record: st (stage 1–5), due (timestamp), rt {c, n} (answers of the running re-test).
   Mixed practice (drill X0): interleaves every unlocked unit of the chosen subjects; ‘Smart’ weights weak and due units.
   Mock exam (#exam): fixed set of questions, timer, no feedback until the end; results per subject, wrong answers go to Review. */
Object.assign(U, {
  lvRule:"8 of your last 10 right = unit passed ✓ and the next one unlocks. Passed units come back for short re-tests after 1, 3 and 7 days; pass them all for ⭐ mastered.|8 bonnes réponses sur vos 10 dernières = unité réussie ✓ et la suivante se débloque. Les unités réussies reviennent pour de courts contrôles après 1, 3 et 7 jours ; réussissez-les tous pour ⭐ maîtrisée.|8 deiner letzten 10 richtig = Einheit bestanden ✓, die nächste wird frei. Bestandene Einheiten kommen nach 1, 3 und 7 Tagen zu kurzen Nachtests wieder; alle bestanden = ⭐ gemeistert.",
  lvLocked:"Locked – pass the previous unit first (8 of your last 10 answers correct).|Verrouillée – réussissez d'abord l'unité précédente (8 de vos 10 dernières réponses justes).|Gesperrt – bestehe zuerst die vorige Einheit (8 deiner letzten 10 Antworten richtig).",
  lvMastered:"✓ Passed: {u}|✓ Réussie : {u}|✓ Bestanden: {u}", lvAllDone:"✓ All units passed – the re-tests turn them into ⭐ mastered.|✓ Toutes les unités réussies – les contrôles espacés les rendront ⭐ maîtrisées.|✓ Alle Einheiten bestanden – die Nachtests machen sie zu ⭐ gemeistert.",
  pgUnits:"Units mastered ⭐|Unités maîtrisées ⭐|Gemeisterte Einheiten ⭐",
  rtDueChip:"re-test due|contrôle dû|Nachtest fällig", rtPass:"🔁 Re-test passed: {u} – next one {w}.|🔁 Contrôle réussi : {u} – prochain {w}.|🔁 Nachtest bestanden: {u} – nächster {w}.",
  rtMast:"⭐ Mastered after three spaced re-tests: {u}|⭐ Maîtrisée après trois contrôles espacés : {u}|⭐ Gemeistert nach drei verteilten Nachtests: {u}",
  rtFail:"🔁 Re-test not passed: {u} – it comes back tomorrow.|🔁 Contrôle non réussi : {u} – il revient demain.|🔁 Nachtest nicht bestanden: {u} – er kommt morgen wieder.",
  rtStart:"🔁 Re-test due for this unit: answer 6 questions, 5 right passes it.|🔁 Contrôle dû pour cette unité : répondez à 6 questions, 5 justes suffisent.|🔁 Nachtest für diese Einheit fällig: 6 Fragen beantworten, 5 richtig = bestanden.",
  rtHome:"🔁 Unit re-tests due: {n}|🔁 Contrôles d'unités dus : {n}|🔁 Fällige Einheiten-Nachtests: {n}",
  pgUnitsT:"Units & spaced re-tests|Unités et contrôles espacés|Einheiten & verteilte Nachtests", pgPassed:"Passed ✓|Réussies ✓|Bestanden ✓", pgMast:"Mastered ⭐|Maîtrisées ⭐|Gemeistert ⭐", pgRtDue:"Re-tests due|Contrôles dus|Fällige Nachtests",
  pgRtGo:"Do the re-tests now|Faire les contrôles maintenant|Nachtests jetzt machen", pgRtNone:"No re-tests due. Passed units come back after 1, 3 and 7 days.|Aucun contrôle dû. Les unités réussies reviennent après 1, 3 et 7 jours.|Keine Nachtests fällig. Bestandene Einheiten kommen nach 1, 3 und 7 Tagen wieder.",
  pgCal:"Confidence calibration|Calibrage de la certitude|Kalibrierung der Sicherheit", pgCalNone:"Rate your confidence before answering (Settings → Study features) to see how well your certainty matches your accuracy.|Indiquez votre certitude avant de répondre (Réglages → Fonctions d'apprentissage) pour voir si elle correspond à votre précision.|Gib vor dem Antworten deine Sicherheit an (Einstellungen → Lernfunktionen), um zu sehen, ob sie zu deiner Trefferquote passt.",
  pgCalOver:"When you are ‘sure’ you are right only {p} % of the time – slow down and check before committing.|Quand vous êtes « sûr », vous avez raison seulement {p} % du temps – ralentissez et vérifiez avant de valider.|Wenn du ‚sicher‘ bist, liegst du nur in {p} % richtig – langsamer werden und vor dem Antworten prüfen.",
  pgCalUnder:"Your guesses are right {p} % of the time – you know more than you think.|Vos réponses au hasard sont justes {p} % du temps – vous en savez plus que vous ne le pensez.|Deine geratenen Antworten stimmen zu {p} % – du weißt mehr, als du denkst.",
  pgCalGood:"Your confidence matches your accuracy well.|Votre certitude correspond bien à votre précision.|Deine Sicherheit passt gut zu deiner Trefferquote.",
  pgCalH:"Rating|Certitude|Angabe", pgExams:"Mock exams|Examens blancs|Probeklausuren", pgExNone:"No mock exam yet.|Aucun examen blanc pour l'instant.|Noch keine Probeklausur.",
  mxt:"Mixed practice|Entraînement mélangé|Gemischtes Üben",
  mxd:"Interleaved questions from every unlocked unit of the subjects you choose. ‘Smart’ favours weak units and units due for a re-test.|Questions entremêlées de toutes les unités débloquées des matières choisies. « Intelligent » privilégie les unités faibles et celles dont le contrôle est dû.|Gemischte Fragen aus allen freigeschalteten Einheiten der gewählten Fächer. ‚Smart‘ bevorzugt schwache und fällige Einheiten.",
  mxSubj:"Subjects|Matières|Fächer", mxAll:"All|Toutes|Alle", mxMode:"Focus|Priorité|Fokus", mxSmart:"Smart (weak & due)|Intelligent (faibles et dues)|Smart (schwach & fällig)", mxEven:"Even|Égal|Gleichmäßig", mxDue:"Re-tests only ({n})|Contrôles seulement ({n})|Nur Nachtests ({n})",
  mxNoDue:"No re-tests due – practising weak units instead.|Aucun contrôle dû – entraînement sur les unités faibles.|Keine Nachtests fällig – stattdessen schwache Einheiten.",
  mxHome:"🔀 Mixed practice|🔀 Entraînement mélangé|🔀 Gemischtes Üben",
  exNav:"Mock exam|Examen blanc|Probeklausur", exT:"Mock exam|Examen blanc|Probeklausur", exHome:"⏱ Mock exam|⏱ Examen blanc|⏱ Probeklausur",
  exD:"A fixed set of questions from the subjects you choose, with a timer and no feedback until you submit – like the real thing. Afterwards you see your score per subject and every question with its explanation; wrong answers go to Review.|Une série fixe de questions des matières choisies, avec chronomètre et sans correction avant la fin – comme le vrai examen. Ensuite : score par matière et chaque question avec son explication ; les erreurs vont dans Révision.|Ein fester Fragensatz aus den gewählten Fächern, mit Zeitlimit und ohne Rückmeldung bis zur Abgabe – wie im Ernstfall. Danach siehst du dein Ergebnis pro Fach und jede Frage mit Erklärung; Fehler landen in Wiederholen.",
  exLen:"Questions|Questions|Fragen", exTime:"Timer|Chronomètre|Zeitlimit", exTimeOn:"{s} s per question|{s} s par question|{s} s pro Frage", exTimeOff:"No limit|Sans limite|Ohne Limit",
  exLocked:"Units|Unités|Einheiten", exOpenOnly:"Unlocked only|Débloquées seulement|Nur freigeschaltete", exAllU:"All units|Toutes les unités|Alle Einheiten",
  exStart:"Start the exam ▸|Commencer l'examen ▸|Klausur starten ▸", exNoQ:"No questions available for this choice.|Aucune question disponible pour ce choix.|Für diese Auswahl gibt es keine Fragen.",
  exQ:"Question {i} / {n}|Question {i} / {n}|Frage {i} / {n}", exAnswered:"{a}/{n} answered|{a}/{n} répondues|{a}/{n} beantwortet",
  exPrev:"◂ Previous|◂ Précédente|◂ Zurück", exNext:"Next ▸|Suivante ▸|Weiter ▸", exFlag:"⚑ Flag|⚑ Marquer|⚑ Markieren", exFlagged:"⚑ Flagged|⚑ Marquée|⚑ Markiert",
  exSubmit:"Submit exam|Rendre la copie|Abgeben", exSubmitSure:"{n} unanswered – tap again to submit|{n} sans réponse – touchez encore pour rendre|{n} unbeantwortet – erneut tippen zum Abgeben",
  exQuit:"Abandon|Abandonner|Abbrechen", exQuitSure:"Tap again to abandon (nothing is saved)|Touchez encore pour abandonner (rien n'est enregistré)|Erneut tippen zum Abbrechen (nichts wird gespeichert)",
  exTimeUp:"Time is up – the exam was submitted automatically.|Temps écoulé – la copie a été rendue automatiquement.|Zeit abgelaufen – die Klausur wurde automatisch abgegeben.",
  exScore:"Score|Score|Ergebnis", exDur:"Time used|Temps utilisé|Benötigte Zeit", exBySubj:"By subject|Par matière|Nach Fach", exItems:"Questions and explanations|Questions et explications|Fragen und Erklärungen",
  exYour:"Your answer: {a}|Votre réponse : {a}|Deine Antwort: {a}", exNone:"no answer|pas de réponse|keine Antwort", exCorrect:"Correct answer: {a}|Bonne réponse : {a}|Richtige Antwort: {a}",
  exAgain:"New exam|Nouvel examen|Neue Klausur", exToRv:"Review mistakes|Revoir les erreurs|Fehler wiederholen", exAdded:"{n} wrong or unanswered questions were added to Review.|{n} questions fausses ou sans réponse ont été ajoutées aux révisions.|{n} falsche oder unbeantwortete Fragen wurden zu Wiederholen hinzugefügt.",
  exRunning:"exam running|examen en cours|Klausur läuft", exResume:"Resume the running exam ▸|Reprendre l'examen en cours ▸|Laufende Klausur fortsetzen ▸", exTypeNum:"Type a number|Tapez un nombre|Zahl eingeben"
});

/* ---------- unit re-tests ---------- */
const LV_GAP = [0, 1, 3, 7, 21, 30];
const lvMast = r => (r.st || 0) >= 4;
const lvDueNow = r => !!(r.m && r.due && r.due <= Date.now());
{ const _a = lvAnswer;
  lvAnswer = function(id, k, ok){ _a(id, k, ok); const r = PROG.lv[id][k], now = Date.now(); if (!r.m) return;
    if (r.st == null){ r.st = 1; r.due = now + LV_GAP[1]*DAY; r.rt = {c:0, n:0}; return; }
    if (r.due > now) return;
    const t = r.rt || (r.rt = {c:0, n:0}); t.n++; if (ok) t.c++;
    if (t.n < 6) return;
    const nm = lvName(id, k);
    if (t.c >= 5){ r.st = Math.min(5, r.st + 1); r.due = now + LV_GAP[r.st]*DAY; LV_TOAST = {t:now, msg:r.st === 4 ? u('rtMast', {u:nm}) : u('rtPass', {u:nm, w:rvWhen(r.due)})}; }
    else if (t.c <= 3){ r.st = Math.max(1, r.st - 1); r.due = now + DAY; LV_TOAST = {t:now, msg:u('rtFail', {u:nm})}; }
    else r.due = now + DAY;
    r.rt = {c:0, n:0}; }; }
function lvDueUnits(bxOnly){ const out = []; DR.forEach(d => { if (bxOnly && !BX[d.id]) return; const us = lvUnits(d.id); if (!us) return; us.forEach(k => { const r = lvRec(d.id, k); if (lvDueNow(r)) out.push({d:d.id, k, r}); }); }); return out; }
lvCount = function(){ let m = 0, p = 0, t = 0; DR.forEach(d => { const us = lvUnits(d.id); if (!us) return; t += us.length; us.forEach(k => { const r = lvRec(d.id, k); if (r.m) p++; if (lvMast(r)) m++; }); }); return {m, p, t}; };
lvChip = function(id, k, i, n, cur){
  const rec = lvRec(id, k), open = lvOpen(id, k), sc = lvScore(rec), due = lvDueNow(rec), ms = lvMast(rec);
  const st = rec.m ? 'done' + (due ? ' due' : '') : open ? 'open' : 'lock';
  const meta = ms && !due ? '⭐' : due ? '🔁' : rec.m ? '✓' + '<small>' + (rec.st || 1) + '/4</small>' : open ? `${sc}/${LVNEED}` : '🔒';
  const tip = due ? u('rtDueChip') : !open ? u('lvLocked') : '';
  return `<button type="button" class="lvchip ${st}${cur ? ' cur' : ''}" data-act="lvpick" data-id="${id}" data-v="${k}"${open ? '' : ' aria-disabled="true"'}${tip ? ` title="${esc(tip)}"` : ''}>`
    + `<span class="lvn">${i + 1}</span><span class="lvtx"><b>${esc(lvName(id, k))}</b><small>${due ? u('rtDueChip') : lvLevel(i, n)}</small></span><span class="lvm">${meta}</span>`
    + (open && !rec.m ? `<i class="lvbar" style="--p:${Math.round(100*sc/LVNEED)}%"></i>` : '') + `</button>`; };

/* ---------- outermost scoring wrapper ---------- */
let CUR_UNIT = null, PLAN_RAW = false; const MISS = {};
{ const _lc = lvCurUnit; lvCurUnit = function(id){ return CUR_UNIT != null ? CUR_UNIT : _lc(id); }; }
function plNewCard(real, p, unit, tag, due){
  const cid = 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), now = Date.now();
  let snap = p.snap; try { snap = JSON.parse(JSON.stringify(p.snap)); if (snap.it && unit) snap.it.t = unit; } catch(e){}
  RVC()[cid] = {id:cid, d:real, slot:real, act:p.act, snap, pv:tag + p.pv, pvl:{[L]:tag + p.pv}, box:0, due:due || now, added:now, u:now, guess:1};
  return cid; }
const _plAdd = addScore;
addScore = function(id, c, n){
  if (!n || PLAN_RAW) return _plAdd(id, c, n);
  const s = S[id], it = s && s.it, mixed = !!(it && it.src && BX[id] && id === 'mixed');
  const real = mixed ? it.src : id, unit = mixed ? it.st : (typeof lvCurUnit === 'function' ? lvCurUnit(id) : null), ok = c >= n;
  const cards = RVC(), before = new Set(Object.keys(cards)), revCur = REV && REV.cur;
  if (mixed) CUR_UNIT = unit;
  try { _plAdd(real, c, n); } finally { if (mixed) CUR_UNIT = null; }
  const fresh = Object.keys(cards).filter(k => !before.has(k));
  if (mixed) fresh.forEach(k => { const cd = cards[k]; cd.d = real; cd.slot = real; if (cd.snap && cd.snap.it && unit) cd.snap.it.t = unit; });
  if (!s) return;
  s.lastOk = ok; s.hot = 0; s.lucky = 0; s.miss2 = null; s.sc = {real, unit, fresh, conf:s.conf};
  if (s.conf){ const cal = PROG.cal || (PROG.cal = {}), b = cal[s.conf] || (cal[s.conf] = {c:0, n:0}); b.n++; if (ok) b.c++;
    if (s.conf === 's' && !ok){ s.hot = 1; const tag = k => { const cd = cards[k]; if (!cd || cd.gone) return; cd.hot = 1; if (String(cd.pv || '').indexOf('🔥') !== 0){ cd.pv = '🔥 ' + (cd.pv || ''); if (cd.pvl) for (const l in cd.pvl) cd.pvl[l] = '🔥 ' + cd.pvl[l]; } cd.u = Date.now(); };
      fresh.forEach(tag); if (revCur) tag(revCur); }
    if (s.conf === 'g' && ok){ s.lucky = 1;
      if (revCur){ const cd = cards[revCur]; if (cd && !cd.gone){ cd.box = Math.max(0, (cd.box || 1) - 1); cd.due = Date.now() + DAY; cd.u = Date.now(); } }
      else if (RV_PEND && RV_PEND.snap) s.sc.fresh.push(plNewCard(real, RV_PEND, unit, '🎲 ', Date.now() + DAY)); } }
  if (unit){ const key = real + ':' + unit; MISS[key] = ok ? 0 : (MISS[key] || 0) + 1;
    if (MISS[key] >= 2 && typeof scHas === 'function' && BX[real] && scHas(real, unit)){ s.miss2 = {d:real, k:unit}; MISS[key] = 0; } }
  saveProg();
};
/* ‘I was right – count it’ for typed recall */
function stuSelfFix(id){ const s = S[id], sc = s && s.sc; if (!sc) return;
  PLAN_RAW = true; try { addScore(sc.real, 1, 0); } finally { PLAN_RAW = false; }
  const now = Date.now();
  if (sc.unit && PROG.lv[sc.real] && PROG.lv[sc.real][sc.unit]){ const r = PROG.lv[sc.real][sc.unit];
    if (r.r.slice(-1) === '0'){ r.r = r.r.slice(0, -1) + '1'; r.c++; }
    if (r.m && r.rt && r.rt.n) r.rt.c = Math.min(r.rt.n, r.rt.c + 1);
    if (!r.m && lvScore(r) >= LVNEED){ r.m = true; r.st = 1; r.due = now + DAY; r.rt = {c:0, n:0}; } r.u = now; }
  const cards = RVC(); (sc.fresh || []).forEach(k => { if (cards[k] && !cards[k].gone) cards[k] = {id:k, gone:true, u:now}; });
  if (REV && REV.cur && REV.res === 'no'){ const cd = cards[REV.cur]; REV.res = 'ok'; REV.c++; if (cd && !cd.gone){ cd.box = 1; cd.due = now + DAY; cd.u = now; } }
  if (sc.conf && PROG.cal && PROG.cal[sc.conf]) PROG.cal[sc.conf].c++;
  if (sc.unit){ const key = sc.real + ':' + sc.unit; MISS[key] = 0; }
  s.hot = 0; s.miss2 = null; saveProg(); }
/* confident errors first in Review */
{ const _d = rvDue; rvDue = function(){ return _d().sort((a, b) => ((b.hot ? 1 : 0) - (a.hot ? 1 : 0)) || (a.due - b.due)); }; }

/* ---------- mixed practice (drill X0) ---------- */
function mixCands(mode, groups, allUnits){
  const now = Date.now(), out = [];
  DR.forEach(d => { if (!BX[d.id] || d.id === 'mixed' || (d.g || 'met') === 'kids') return; if (groups && groups.length && groups.indexOf(d.g || 'met') < 0) return;
    const ks = Object.keys(BX[d.id].topics), multi = ks.length > 1;
    ks.forEach(k => { if (!BX[d.id].bank.some(e => e.t === k)) return; if (multi && !allUnits && !lvOpen(d.id, k)) return;
      const r = lvRec(d.id, k), due = r.m && r.due && r.due <= now; if (mode === 'due' && !due) return;
      let w = 1; if (mode === 'smart'){ const acc = r.r.length >= 5 ? lvScore(r)/r.r.length : 0.6; w = 1 + 3*(1 - acc) + (due ? 4 : 0); }
      out.push({d:d.id, k, w}); }); });
  return out; }
function wpick(a, wf){ const tot = a.reduce((x, e) => x + wf(e), 0); let r = Math.random()*tot; for (const e of a){ r -= wf(e); if (r <= 0) return e; } return a[a.length - 1]; }
function mixItem(c){ const ents = BX[c.d].bank.filter(e => e.t === c.k); if (!ents.length) return null; const e = wpick(ents, z => z.w || 1);
  const it = Object.assign({}, e.gen ? e.gen() : e); it.src = c.d; it.st = c.k; it.t = 'mix'; return it; }
let MIX_NOTE = null;
function mixGen(){
  const cfg = UIS.mix || {}; let mode = cfg.m || 'smart'; MIX_NOTE = null;
  let cs = mixCands(mode, cfg.g); if (!cs.length && mode === 'due'){ MIX_NOTE = 'mxNoDue'; cs = mixCands('smart', cfg.g); }
  if (!cs.length) cs = mixCands('even', null);
  for (let i = 0; i < 12; i++){ const c = wpick(cs, z => z.w); try { const it = mixItem(c); if (it) return it; } catch(e){} }
  return {k:'mcq', t:'mix', q:"–", o:['–', '—', '·']}; }
bxDrill('mixed', 'mx', 'X0', 'x', {mix:"Mixed practice|Entraînement mélangé|Gemischtes Üben"}, [{t:'mix', gen:mixGen}]);
function mixGroups(){ const gs = []; GRPS.forEach(g => { if (g[0] === 'kids') return; if (DR.some(d => (d.g || 'met') === g[0] && BX[d.id] && d.id !== 'mixed')) gs.push(g); }); return gs; }
{ const _r = renderBX; renderBX = function(id){ let h = _r(id); if (id !== 'mixed') return h;
    const s = S.mixed, it = s && s.it, cfg = UIS.mix || {}, sel = cfg.g || [], mode = cfg.m || 'smart', nd = lvDueUnits(true).length;
    if (it && it.src){ const d = DR.find(z => z.id === it.src); if (d) h = h.replace(/<div class="qmeta">[^·<]*·/, `<div class="qmeta"><a class="mxsrc" href="#${d.id}">${dnum(d)} ${esc(dname(d))}</a> · ${esc(T(BX[d.id].topics[it.st] || ''))} ·`); }
    const ctl = `<div class="card mxctl"><div class="mxrow"><span class="mxl">${u('mxSubj')}</span><div class="mxchips"><button type="button" class="chipbtn${sel.length ? '' : ' on'}" data-act="mxg" data-v="">${u('mxAll')}</button>`
      + mixGroups().map(g => `<button type="button" class="chipbtn${sel.indexOf(g[0]) >= 0 ? ' on' : ''}" aria-pressed="${sel.indexOf(g[0]) >= 0}" data-act="mxg" data-v="${g[0]}">${u(g[1])}</button>`).join('') + `</div></div>`
      + `<div class="mxrow"><span class="mxl">${u('mxMode')}</span><div class="seg" role="group">` + [['smart', u('mxSmart')], ['even', u('mxEven')], ['due', u('mxDue', {n:nd})]].map(o => `<button type="button" class="${mode === o[0] ? 'on' : ''}" aria-pressed="${mode === o[0]}" data-act="mxm" data-v="${o[0]}">${o[1]}</button>`).join('') + `</div></div>`
      + (MIX_NOTE ? `<p class="note warn">${u(MIX_NOTE)}</p>` : '') + `</div>`;
    const i = h.indexOf('<div class="card qcard'), j = h.indexOf('<div class="card scard');
    const at = [i, j].filter(x => x >= 0).sort((a, b) => a - b)[0];
    return at != null ? h.slice(0, at) + ctl + h.slice(at) : ctl + h; }; }
Object.assign(A, {
  mxg(el){ const v = el.dataset.v, cfg = UIS.mix || (UIS.mix = {}); let g = (cfg.g || []).slice();
    if (!v) g = []; else { const i = g.indexOf(v); if (i >= 0) g.splice(i, 1); else g.push(v); } cfg.g = g; uiSave(); if (REV) REV = null; S.mixed.queue = null; newBX('mixed'); render(); },
  mxm(el){ const cfg = UIS.mix || (UIS.mix = {}); cfg.m = el.dataset.v; uiSave(); if (REV) REV = null; newBX('mixed'); render(); },
  rtgo(){ const cfg = UIS.mix || (UIS.mix = {}); cfg.m = 'due'; cfg.g = []; uiSave(); if (S.mixed) newBX('mixed'); goTo('mixed'); }
});
/* note at the top of a drill whose current unit has a re-test due */
{ const _r = renderBX; renderBX = function(id){ let h = _r(id); if (id === 'mixed' || REV) return h; const s = S[id]; if (!s || !s.it || s.card) return h;
    const k = s.topic && s.topic !== 'any' ? s.topic : s.it.t; if (!k || !lvUnits(id)) return h; if (!lvDueNow(lvRec(id, k))) return h;
    const i = h.indexOf('<div class="card qcard'); return i >= 0 ? h.slice(0, i) + `<p class="note rtnote">${u('rtStart')}</p>` + h.slice(i) : h; }; }

/* ---------- mock exam ---------- */
let EXAM = null, EX_ARM = null, EX_TICK = null;
const EX_SEC = 75;
function exCfg(){ return Object.assign({n:40, tm:true, g:[], all:false}, UIS.ex || {}); }
function exBuild(cfg){
  STU_OFF = true; const qs = [], keys = new Set();
  try {
    const cs = mixCands('even', cfg.g, cfg.all); if (!cs.length) return null;
    const byD = {}; cs.forEach(c => { (byD[c.d] = byD[c.d] || []).push(c); }); const ds = Object.keys(byD);
    for (let i = 0; i < cfg.n; i++){
      for (let t = 0; t < 30; t++){ const d = pick(ds), c = pick(byD[d]); let it; try { it = mixItem(c); } catch(e){ continue; }
        if (!it || (it.k !== 'mcq' && it.k !== 'num') || (it.k === 'mcq' && (!it.o || it.o.length < 3))) continue;
        const key = (typeof stuKey === 'function' ? stuKey(it) : TEN(it.q)); if (keys.has(key) && t < 25) continue; keys.add(key);
        let perm = null; if (it.k === 'mcq'){ if (it.ci != null){ const o = it.o, ci = it.ci; it.o = [o[ci]].concat(o.filter((_, j) => j !== ci)); perm = o.map((_, j) => j === ci ? 0 : (j < ci ? j + 1 : j)); delete it.ci; } else perm = shuffle(it.o.map((_, j) => j)); }
        it.t = c.k; qs.push({src:c.d, st:c.k, it, perm, ans:null, flag:false}); break; }
    }
  } finally { STU_OFF = false; }
  return qs.length ? qs : null; }
function exLeft(){ return EXAM && EXAM.end ? Math.max(0, EXAM.end - Date.now()) : null; }
function exClock(ms){ const s = Math.ceil(ms/1000), m = Math.floor(s/60); return m + ':' + String(s % 60).padStart(2, '0'); }
function exTick(){ if (!EXAM || EXAM.done){ clearInterval(EX_TICK); EX_TICK = null; return; }
  const l = exLeft(); if (l == null) return; const e = typeof document !== 'undefined' && document.getElementById('extimer'); if (e){ e.textContent = exClock(l); e.classList.toggle('low', l < 60000); }
  if (l <= 0){ exSubmit(true); } }
function exOk(q){ const it = q.it; if (q.ans == null || q.ans === '') return false;
  if (it.k === 'mcq') return q.perm[q.ans] === 0;
  const raw = String(q.ans).trim().replace(',', '.').replace('−', '-'); if (!raw || isNaN(+raw)) return false;
  const tol = it.tol != null ? it.tol : Math.max(0.05, Math.abs(it.ans)*0.02); return Math.abs(+raw - it.ans) <= tol; }
function exSubmit(auto){
  if (!EXAM || EXAM.done) return; const now = Date.now(); EXAM.done = true; EXAM.auto = !!auto; EXAM.dur = now - EXAM.start; EX_ARM = null;
  const by = {}, cards = RVC(); let c = 0, added = 0;
  EXAM.qs.forEach(q => { q.ok = exOk(q); if (q.ok) c++; const d = DR.find(z => z.id === q.src), g = (d && d.g) || 'met'; const b = by[g] || (by[g] = {c:0, n:0}); b.n++; if (q.ok) b.c++;
    CUR_UNIT = q.st; PLAN_RAW = true; try { addScore(q.src, q.ok ? 1 : 0, 1); } finally { CUR_UNIT = null; PLAN_RAW = false; }
    if (!q.ok && EXAM.addRv !== false){ const st = q.it.k === 'mcq' ? {topic:'any', it:q.it, perm:q.perm, chosen:null, done:false, res:null, msg:null} : {topic:'any', it:q.it, val:'', done:false, ok:null};
      let snap; try { snap = rvSer(st); } catch(e){ snap = null; }
      if (snap){ const cid = 'c' + now.toString(36) + Math.random().toString(36).slice(2, 7), pv = T(q.it.q).replace(/\s+/g, ' ').slice(0, 157);
        cards[cid] = {id:cid, d:q.src, slot:q.src, act:q.it.k === 'mcq' ? 'bxans' : 'bxnum', snap, pv:'⏱ ' + pv, pvl:{[L]:'⏱ ' + pv}, box:0, due:now, added:now, u:now}; added++; } } });
  EXAM.c = c; EXAM.by = by; EXAM.added = added;
  const hist = PROG.ex || (PROG.ex = []); hist.push({t:now, n:EXAM.qs.length, c, dur:EXAM.dur, lim:EXAM.lim || 0, by}); while (hist.length > 30) hist.shift();
  saveProg(); if (ON_SCORE) ON_SCORE();
  if (VIEW === 'exam') render(); else goTo('exam'); if (typeof window !== 'undefined') window.scrollTo(0, 0); }
function exSetup(){
  const cfg = exCfg(), gs = mixGroups();
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><span class="tnum">⏱</span><h1>${u('exT')}</h1></div><p class="ddesc">${u('exD')}</p></div><div class="card exsetup">`;
  h += `<div class="mxrow"><span class="mxl">${u('mxSubj')}</span><div class="mxchips"><button type="button" class="chipbtn${cfg.g.length ? '' : ' on'}" data-act="exg" data-v="">${u('mxAll')}</button>`
    + gs.map(g => `<button type="button" class="chipbtn${cfg.g.indexOf(g[0]) >= 0 ? ' on' : ''}" aria-pressed="${cfg.g.indexOf(g[0]) >= 0}" data-act="exg" data-v="${g[0]}">${u(g[1])}</button>`).join('') + `</div></div>`;
  const seg = (k, cur, opts) => `<div class="seg" role="group">` + opts.map(o => `<button type="button" class="${String(cur) === String(o[0]) ? 'on' : ''}" aria-pressed="${String(cur) === String(o[0])}" data-act="exset" data-k="${k}" data-v="${o[0]}">${o[1]}</button>`).join('') + `</div>`;
  h += `<div class="mxrow"><span class="mxl">${u('exLen')}</span>${seg('n', cfg.n, [[20, '20'], [40, '40'], [60, '60'], [100, '100']])}</div>`;
  h += `<div class="mxrow"><span class="mxl">${u('exTime')}</span>${seg('tm', cfg.tm, [[true, u('exTimeOn', {s:EX_SEC})], [false, u('exTimeOff')]])}</div>`;
  h += `<div class="mxrow"><span class="mxl">${u('exLocked')}</span>${seg('all', cfg.all, [[false, u('exOpenOnly')], [true, u('exAllU')]])}</div>`;
  if (EX_ARM === 'none') h += `<p class="note warn">${u('exNoQ')}</p>`;
  h += `<div class="actions"><button type="button" class="btn primary" data-act="exstart">${u('exStart')}</button></div></div>`;
  return h + exHistHTML(); }
function exHistHTML(){ const hist = (PROG.ex || []).slice().reverse();
  let h = `<section class="card pgsec"><h2>${u('pgExams')}</h2>`; if (!hist.length) return h + `<p class="note">${u('pgExNone')}</p></section>`;
  return h + `<ul class="exhist">` + hist.slice(0, 6).map(x => { const p = Math.round(100*x.c/x.n); return `<li><span>${new Date(x.t).toLocaleDateString()}</span><span class="chip ${pgCls(p)}">${p}% · ${x.c}/${x.n}</span><span class="muted">⏱ ${exClock(x.dur)}</span></li>`; }).join('') + `</ul></section>`; }
function exRun(){
  const q = EXAM.qs[EXAM.i], it = q.it, n = EXAM.qs.length, d = DR.find(z => z.id === q.src), a = EXAM.qs.filter(z => z.ans != null && z.ans !== '').length, l = exLeft();
  let h = `<div class="dhead"><div class="dtitle"><span class="tnum">⏱</span><h1>${u('exT')}</h1></div></div>`;
  h += `<div class="exbar" role="status"><b>${u('exQ', {i:EXAM.i + 1, n})}</b><span>${u('exAnswered', {a, n})}</span>${l != null ? `<span class="extime">⏱ <span id="extimer">${exClock(l)}</span></span>` : ''}</div>`;
  h += `<div class="card qcard bx exq"><div class="qmeta">${d ? dnum(d) + ' ' + esc(dname(d)) + ' · ' : ''}${esc(T(BX[q.src].topics[q.st] || ''))}</div>`;
  if (it.q) h += `<h3 class="q">${esc(T(it.q))}</h3>`;
  if (it.fig) h += `<figure class="fig">${typeof it.fig === 'function' ? it.fig() : it.fig}</figure>`;
  if (it.k === 'mcq'){ h += `<div class="opts${it.figo ? ' figs' : ''}">` + q.perm.map((oi, pos) => `<button type="button" class="opt${it.figo ? ' figopt' : ''}${q.ans === pos ? ' sel' : ''}" aria-pressed="${q.ans === pos}" data-act="exans" data-k="${pos}">${it.figo ? `<span class="figw">${it.figo[oi]}</span>` : esc(T(it.o[oi]))}</button>`).join('') + `</div>`; }
  else h += `<form class="numrow" data-sub="exnum"><label class="sr" for="exin">${u('exTypeNum')}</label><input id="exin" inputmode="decimal" autocomplete="off" data-chg="exnum" placeholder="${esc(u('exTypeNum'))}" value="${esc(q.ans || '')}">${it.unit ? `<span class="unit">${esc(T(it.unit))}</span>` : ''}</form>`;
  h += `<div class="actions exnav"><button type="button" class="btn" data-act="exgo" data-v="${EXAM.i - 1}"${EXAM.i ? '' : ' disabled'}>${u('exPrev')}</button><button type="button" class="btn${q.flag ? ' flagged' : ''}" data-act="exflag">${q.flag ? u('exFlagged') : u('exFlag')}</button><button type="button" class="btn primary" data-act="exgo" data-v="${EXAM.i + 1}"${EXAM.i < n - 1 ? '' : ' disabled'}>${u('exNext')}</button></div></div>`;
  h += `<div class="exgrid" role="group">` + EXAM.qs.map((z, j) => `<button type="button" class="${j === EXAM.i ? 'cur ' : ''}${z.ans != null && z.ans !== '' ? 'ans ' : ''}${z.flag ? 'flag' : ''}" data-act="exgo" data-v="${j}" aria-label="${j + 1}">${j + 1}</button>`).join('') + `</div>`;
  h += `<div class="actions"><button type="button" class="btn primary${EX_ARM === 'sub' ? ' danger' : ''}" data-act="exsubmit">${EX_ARM === 'sub' ? u('exSubmitSure', {n:n - a}) : u('exSubmit')}</button><button type="button" class="btn${EX_ARM === 'quit' ? ' danger' : ''}" data-act="exquit">${EX_ARM === 'quit' ? u('exQuitSure') : u('exQuit')}</button></div>`;
  if (l != null && !EX_TICK) EX_TICK = setInterval(exTick, 1000);
  return h; }
function exAnsText(q, v){ const it = q.it; if (v == null || v === '') return u('exNone'); if (it.k === 'mcq') return T(it.o[q.perm[v]]); return String(v) + (it.unit ? ' ' + T(it.unit) : ''); }
function exResults(){
  const n = EXAM.qs.length, p = Math.round(100*EXAM.c/n);
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><span class="tnum">⏱</span><h1>${u('exT')}</h1></div></div>`;
  if (EXAM.auto) h += `<p class="note warn">${u('exTimeUp')}</p>`;
  h += `<div class="pgkpis"><div class="pgkpi ${pgCls(p)}"><b>${p}%</b><span>${u('exScore')} · ${EXAM.c}/${n}</span></div><div class="pgkpi"><b>${exClock(EXAM.dur)}</b><span>${u('exDur')}</span></div></div>`;
  h += `<section class="card pgsec"><h2>${u('exBySubj')}</h2><div class="pgrows">` + Object.keys(EXAM.by).map(g => { const b = EXAM.by[g], gp = Math.round(100*b.c/b.n), gn = (GRPS.find(z => z[0] === g) || [g, g])[1];
    return `<div class="pgrow"><span class="pgname">${esc(U[gn] ? u(gn) : g)}</span>${bar(gp)}<span class="pgnum">${b.c}/${b.n}</span></div>`; }).join('') + `</div>`
    + (EXAM.added ? `<p class="note">🔁 ${u('exAdded', {n:EXAM.added})}</p>` : '') + `</section>`;
  h += `<div class="actions"><button type="button" class="btn primary" data-act="exnew">${u('exAgain')}</button>${EXAM.added ? `<a class="btn" href="#review">${u('exToRv')}</a>` : ''}</div>`;
  h += `<section class="card pgsec"><h2>${u('exItems')}</h2><ol class="exlist">` + EXAM.qs.map(q => { const it = q.it, d = DR.find(z => z.id === q.src);
    const corr = it.k === 'mcq' ? T(it.o[0]) : fmtN(it.ans, it.dp) + (it.unit ? ' ' + T(it.unit) : '');
    let x = it.x ? `<p class="expl">${esc(T(it.x))}</p>` : '';
    if (it.k === 'num' && it.steps) x = `<ol class="steps">${it.steps.map(z => `<li>${esc(T(z))}</li>`).join('')}</ol>` + x;
    if (it.k === 'mcq' && it.ox && q.ans != null && !q.ok){ const oi = q.perm[q.ans]; if (it.ox[oi]) x = `<p class="note">✗ <b>${esc(T(it.o[oi]))}</b> — ${esc(T(it.ox[oi]))}</p>` + x; }
    return `<li class="${q.ok ? 'ok' : 'no'}"><p class="exmeta">${q.ok ? '✅' : '❌'} ${d ? dnum(d) + ' ' + esc(dname(d)) : ''} · ${esc(T(BX[q.src].topics[q.st] || ''))}</p><p class="exqt">${esc(T(it.q))}</p>`
      + (q.ok ? '' : `<p class="exyour">${u('exYour', {a:esc(exAnsText(q, q.ans))})}</p>`) + `<p class="excor">${u('exCorrect', {a:esc(corr)})}</p>${x}</li>`; }).join('') + `</ol></section>`;
  return h; }
EXTRA_VIEWS.exam = function(){ document.title = u('exT'); if (!EXAM) return exSetup(); if (EXAM.done) return exResults(); return exRun(); };
Object.assign(A, {
  exg(el){ const v = el.dataset.v, x = exCfg(); let g = x.g.slice(); if (!v) g = []; else { const i = g.indexOf(v); if (i >= 0) g.splice(i, 1); else g.push(v); } UIS.ex = Object.assign(x, {g}); EX_ARM = null; uiSave(); render(); },
  exset(el){ const x = exCfg(), k = el.dataset.k, v = el.dataset.v; x[k] = k === 'n' ? +v : v === 'true'; UIS.ex = x; EX_ARM = null; uiSave(); render(); },
  exstart(){ const cfg = exCfg(), qs = exBuild(cfg); if (!qs){ EX_ARM = 'none'; render(); return; }
    const now = Date.now(); EXAM = {qs, i:0, start:now, lim:cfg.tm ? qs.length*EX_SEC*1000 : 0, end:cfg.tm ? now + qs.length*EX_SEC*1000 : null, done:false}; EX_ARM = null; render(); window.scrollTo(0, 0); },
  exans(el){ if (!EXAM || EXAM.done) return; const q = EXAM.qs[EXAM.i], k = +el.dataset.k; q.ans = q.ans === k ? null : k; EX_ARM = null; render(); },
  exgo(el){ if (!EXAM || EXAM.done) return; exSaveNum(); const i = +el.dataset.v; if (i < 0 || i >= EXAM.qs.length) return; EXAM.i = i; EX_ARM = null; render();
    setTimeout(() => { const e = document.getElementById('exin'); if (e) e.focus(); }, 0); },
  exflag(){ if (!EXAM || EXAM.done) return; const q = EXAM.qs[EXAM.i]; q.flag = !q.flag; render(); },
  exsubmit(){ if (!EXAM || EXAM.done) return; exSaveNum(); const open = EXAM.qs.filter(z => z.ans == null || z.ans === '').length;
    if (EX_ARM !== 'sub'){ EX_ARM = 'sub'; render(); return; } exSubmit(false); },
  exquit(){ if (!EXAM) return; if (EX_ARM !== 'quit'){ EX_ARM = 'quit'; render(); return; } EXAM = null; EX_ARM = null; render(); },
  exnew(){ EXAM = null; EX_ARM = null; render(); }
});
function exSaveNum(){ if (!EXAM || EXAM.done) return; const e = typeof document !== 'undefined' && document.getElementById('exin'); if (e) EXAM.qs[EXAM.i].ans = e.value.trim(); }
CHG.exnum = el => { if (EXAM && !EXAM.done) EXAM.qs[EXAM.i].ans = el.value.trim(); };
SUBS.exnum = () => { exSaveNum(); if (EXAM && EXAM.i < EXAM.qs.length - 1){ EXAM.i++; render(); setTimeout(() => { const e = document.getElementById('exin'); if (e) e.focus(); }, 0); } else render(); };

/* ---------- progress page, home, sidebar ---------- */
function pgCalHTML(){ const cal = PROG.cal || {}, rows = [['s', 'confS'], ['u', 'confU'], ['g', 'confG']], tot = rows.reduce((a, r) => a + ((cal[r[0]] || {}).n || 0), 0);
  let h = `<section class="card pgsec"><h2>🎯 ${u('pgCal')}</h2>`; if (!tot) return h + `<p class="note">${u('pgCalNone')}</p></section>`;
  h += `<div class="pgrows">` + rows.map(r => { const b = cal[r[0]] || {c:0, n:0}, p = b.n ? Math.round(100*b.c/b.n) : null;
    return `<div class="pgrow"><span class="pgname">${u(r[1])}</span>${bar(p)}<span class="pgnum">${p == null ? '–' : p + '%'} · ${b.n}</span></div>`; }).join('') + `</div>`;
  const s = cal.s || {c:0, n:0}, g = cal.g || {c:0, n:0}, sp = s.n ? Math.round(100*s.c/s.n) : 100, gp = g.n ? Math.round(100*g.c/g.n) : 0;
  const msg = s.n >= 10 && sp < 85 ? u('pgCalOver', {p:sp}) : g.n >= 10 && gp > 60 ? u('pgCalUnder', {p:gp}) : s.n + g.n >= 10 ? u('pgCalGood') : '';
  return h + (msg ? `<p class="note">${msg}</p>` : '') + `</section>`; }
function pgUnitsHTML(){ const lc = lvCount(), due = lvDueUnits(false);
  let h = `<section class="card pgsec"><h2>🧭 ${u('pgUnitsT')}</h2><div class="pgkpis sm"><div class="pgkpi"><b>${lc.p}<small>/${lc.t}</small></b><span>${u('pgPassed')}</span></div><div class="pgkpi good"><b>${lc.m}</b><span>${u('pgMast')}</span></div><div class="pgkpi ${due.length ? 'warn' : ''}"><b>${due.length}</b><span>${u('pgRtDue')}</span></div></div>`;
  if (!due.length) return h + `<p class="note">${u('pgRtNone')}</p></section>`;
  h += `<ul class="pgweak">` + due.slice(0, 8).map(x => { const d = DR.find(z => z.id === x.d); return `<li><a href="#${x.d}" data-act="pgunit" data-id="${x.d}" data-v="${x.k}"><span class="tnum">${dnum(d)}</span> ${esc(dname(d))} · ${esc(lvName(x.d, x.k))}</a><span class="chip warn">🔁 ${x.r.st || 1}/4</span></li>`; }).join('') + `</ul>`;
  return h + (due.some(x => BX[x.d]) ? `<div class="actions"><button type="button" class="btn primary" data-act="rtgo">🔁 ${u('pgRtGo')}</button></div>` : '') + `</section>`; }
{ const _p = EXTRA_VIEWS.progress; EXTRA_VIEWS.progress = function(){ let h = _p.apply(this, arguments); const add = pgUnitsHTML() + pgCalHTML() + exHistHTML();
    const i = h.indexOf('<section class="card pgsec">'); return i >= 0 ? h.slice(0, i) + add + h.slice(i) : h + add; }; }
(function(){ const _r = render; render = function(){ _r(); if (typeof document === 'undefined') return;
    const side = document.getElementById('side');
    if (side && !side.querySelector('.sex')){ const pg = side.querySelector('.spg') || side.querySelector('a[href="#review"]');
      const html = `<a class="sitem sex${VIEW === 'exam' ? ' cur' : ''}" href="#exam"><span class="snum">⏱</span><span class="sname">${u('exNav')}</span><span class="smeta">${EXAM && !EXAM.done ? '●' : ''}</span></a>`;
      if (pg) pg.insertAdjacentHTML('afterend', html); else side.insertAdjacentHTML('afterbegin', html); }
    if (VIEW === 'home'){ const db = document.querySelector('.dbtns'); if (db && !db.querySelector('.mxbtn')){ const nd = lvDueUnits(true).length;
        db.insertAdjacentHTML('beforeend', `<a class="btn mxbtn" href="#mixed">${u('mxHome')}</a><a class="btn exbtn" href="#exam">${EXAM && !EXAM.done ? u('exResume') : u('exHome')}</a>` + (nd ? `<button type="button" class="btn primary rtbtn" data-act="rtgo">${u('rtHome', {n:nd})}</button>` : '')); } }
    if (VIEW === 'exam' && EXAM && !EXAM.done && !EX_TICK && EXAM.end) EX_TICK = setInterval(exTick, 1000);
  }; })();

/* ---------- manual ---------- */
if (typeof sxMan === 'function'){
  sxMan({id:'mixed', s:["Interleaves questions from every unlocked unit of the subjects you tick – switching topics is harder, and that is why it sticks better than practising one unit at a time.|Mélange les questions de toutes les unités débloquées des matières cochées – changer de sujet est plus difficile, et c'est pour cela que l'on retient mieux qu'en travaillant une unité à la fois.|Mischt Fragen aus allen freigeschalteten Einheiten der gewählten Fächer – der Themenwechsel ist anstrengender, und genau deshalb bleibt mehr hängen als beim Üben einer einzelnen Einheit.",
    "Focus ‘Smart’ draws more often from units where your recent accuracy is low and from units due for a re-test; ‘Even’ draws evenly; ‘Re-tests only’ works through the due re-tests.|Le mode « Intelligent » tire plus souvent dans les unités où votre précision récente est faible et dans celles dont le contrôle est dû ; « Égal » tire uniformément ; « Contrôles seulement » fait les contrôles dus.|‚Smart‘ zieht häufiger aus Einheiten mit niedriger aktueller Trefferquote und aus fälligen Nachtests; ‚Gleichmäßig‘ zieht gleich verteilt; ‚Nur Nachtests‘ arbeitet die fälligen Nachtests ab.",
    "Answers count for the original drill and unit (learning path, progress, review) exactly as if you had answered them there.|Les réponses comptent pour l'exercice et l'unité d'origine (parcours, progression, révision) comme si vous y aviez répondu.|Antworten zählen für die ursprüngliche Übung und Einheit (Lernpfad, Fortschritt, Wiederholen), als hättest du sie dort beantwortet."]});
  sxMan({id:'exam', g:'tools', ico:'⏱', t:"Mock exam|Examen blanc|Probeklausur", w:"Practise under exam conditions: a fixed set of questions, a timer and no feedback until you submit.|Entraînez-vous dans les conditions de l'examen : série fixe de questions, chronomètre et aucune correction avant la fin.|Unter Prüfungsbedingungen üben: fester Fragensatz, Zeitlimit und keine Rückmeldung bis zur Abgabe.",
    s:["Choose subjects, 20–100 questions and a timer (75 s per question) or no limit. Questions are multiple choice or calculations from the units you have unlocked (or all units).|Choisissez les matières, 20 à 100 questions et un chronomètre (75 s par question) ou aucune limite. Les questions sont à choix multiple ou des calculs, tirées des unités débloquées (ou de toutes).|Wähle Fächer, 20–100 Fragen und ein Zeitlimit (75 s pro Frage) oder kein Limit. Die Fragen sind Auswahl- oder Rechenfragen aus den freigeschalteten (oder allen) Einheiten.",
      "Move freely with Previous / Next or the number grid; ⚑ flags a question to come back to. Nothing is marked until you submit; when the time runs out the exam is submitted for you.|Naviguez librement avec Précédente / Suivante ou la grille de numéros ; ⚑ marque une question à revoir. Rien n'est corrigé avant la remise ; à la fin du temps, la copie est rendue automatiquement.|Mit Zurück / Weiter oder dem Zahlenraster frei springen; ⚑ markiert eine Frage zum Wiederkommen. Bewertet wird erst bei der Abgabe; läuft die Zeit ab, wird automatisch abgegeben.",
      "Results: score, time, accuracy per subject, and every question with the correct answer and explanation. Wrong and unanswered questions go to 🔁 Review; your scores also count for each drill. The last exams appear on the 📈 Progress page.|Résultats : score, temps, précision par matière et chaque question avec la bonne réponse et l'explication. Les questions fausses ou sans réponse vont dans 🔁 Révision ; les scores comptent aussi pour chaque exercice. Les derniers examens apparaissent sur la page 📈 Progression.|Ergebnis: Punktzahl, Zeit, Trefferquote pro Fach und jede Frage mit richtiger Antwort und Erklärung. Falsche und unbeantwortete Fragen landen in 🔁 Wiederholen; die Ergebnisse zählen auch für jede Übung. Die letzten Klausuren stehen auf der Seite 📈 Fortschritt."], go:'exam'});
  sxMan({id:'studyfeat', g:'tools', ico:'🎯', t:"Recall, confidence, study cards & re-tests|Rappel, certitude, fiches et contrôles|Abruf, Sicherheit, Lernkarten & Nachtests",
    w:"How the drills push you from recognising answers to really knowing them.|Comment les exercices vous font passer de la reconnaissance des réponses à leur vraie maîtrise.|Wie die Übungen dich vom Wiedererkennen zum echten Wissen bringen.",
    s:["Typed recall: in ‘Mix’ mode about half of the short-answer questions ask you to type the answer instead of choosing it. Small spelling slips are accepted, in any language; if your wording was right but not recognised, tap ‘I was right – count it’. ‘Recall first’ types every short answer and hides the options of the other questions until you have an answer in mind.|Rappel tapé : en mode « Avec rappel tapé », environ la moitié des questions à réponse courte demandent de taper la réponse au lieu de la choisir. Les petites fautes sont acceptées, dans toutes les langues ; si votre formulation était juste mais non reconnue, touchez « J'avais juste – la compter ». « Rappel d'abord » fait taper toutes les réponses courtes et masque les choix des autres questions jusqu'à ce que vous ayez une réponse.|Getippter Abruf: Im Modus „Mit getipptem Abruf“ musst du bei etwa der Hälfte der Kurzantwortfragen die Antwort eintippen statt wählen. Kleine Tippfehler werden akzeptiert, in jeder Sprache; war deine Formulierung richtig, aber nicht erkannt, tippe „Ich lag richtig – werten“. „Erst abrufen“ lässt alle Kurzantworten tippen und verdeckt bei den übrigen Fragen die Auswahl, bis du eine Antwort im Kopf hast.",
      "Confidence: before answering, tap Sure, Unsure or Guess. A sure-but-wrong answer is marked 🔥 and goes to the front of Review; a lucky guess is saved for review too (🎲). The Progress page shows how often you are right at each level of certainty.|Certitude : avant de répondre, touchez Sûr, Pas sûr ou Au hasard. Une réponse sûre mais fausse est marquée 🔥 et passe en tête des révisions ; une réussite au hasard est aussi enregistrée (🎲). La page Progression montre votre taux de réussite pour chaque niveau de certitude.|Sicherheit: Vor dem Antworten Sicher, Unsicher oder Geraten antippen. Eine sichere Fehlantwort wird mit 🔥 markiert und kommt in Wiederholen ganz nach vorn; ein Glückstreffer wird ebenfalls gespeichert (🎲). Die Fortschrittsseite zeigt, wie oft du bei jeder Sicherheitsstufe richtig liegst.",
      "Explanations: table-based questions show, after answering, what each wrong option actually is (‘Why the other options are wrong’).|Explications : les questions issues de tableaux montrent, après la réponse, à quoi correspond chaque mauvais choix (« Pourquoi les autres choix sont faux »).|Erklärungen: Tabellenbasierte Fragen zeigen nach dem Antworten, was jede falsche Option eigentlich ist („Warum die anderen Antworten falsch sind“).",
      "Study cards (📖): before the first question of a new unit you see a one-screen summary built from that unit – its key tables, sequences, groups, explanations and a worked calculation, plus a key idea and memory hook where written. Two wrong answers in a row offer the card again.|Fiches (📖) : avant la première question d'une nouvelle unité, un résumé d'un écran construit à partir de l'unité – tableaux clés, séquences, groupes, explications et un calcul résolu, plus une idée clé et un moyen mnémotechnique quand ils existent. Deux erreurs de suite proposent à nouveau la fiche.|Lernkarten (📖): Vor der ersten Frage einer neuen Einheit erscheint eine Zusammenfassung auf einem Bildschirm, gebaut aus der Einheit – wichtige Tabellen, Abläufe, Gruppen, Erklärungen und eine Beispielrechnung, dazu Kernidee und Merkhilfe, wo vorhanden. Nach zwei Fehlern hintereinander wird die Karte erneut angeboten.",
      "Spaced re-tests: a passed unit (✓) comes back after 1, 3 and 7 days for a short re-test (6 questions, 5 right). Passing all three makes it ⭐ mastered; failing one moves it back a step. Due re-tests show 🔁 on the learning path, on the home page and in Mixed practice.|Contrôles espacés : une unité réussie (✓) revient après 1, 3 et 7 jours pour un court contrôle (6 questions, 5 justes). Les trois réussis = ⭐ maîtrisée ; un échec la fait reculer d'une étape. Les contrôles dus affichent 🔁 sur le parcours, l'accueil et l'entraînement mélangé.|Verteilte Nachtests: Eine bestandene Einheit (✓) kommt nach 1, 3 und 7 Tagen zu einem kurzen Nachtest wieder (6 Fragen, 5 richtig). Alle drei bestanden = ⭐ gemeistert; ein Fehlschlag setzt sie eine Stufe zurück. Fällige Nachtests zeigen 🔁 im Lernpfad, auf der Startseite und im gemischten Üben.",
      "Turn any of these on or off in Settings → 🎯 Study features.|Activez ou désactivez chacune dans Réglages → 🎯 Fonctions d'apprentissage.|Alles einzeln ein- und ausschaltbar unter Einstellungen → 🎯 Lernfunktionen."], go:'settings'});
}
U.subtitle = "Metabolism · biochemistry · physiology · cell biology · embryology · anatomy · genetics · pharmacology · immunology · histology · physics · biostatistics · clinical labs · {d} drills · EN / FR / DE|Métabolisme · biochimie · physiologie · biologie cellulaire · embryologie · anatomie · génétique · pharmacologie · immunologie · histologie · physique · biostatistique · biologie clinique · {d} exercices · EN / FR / DE|Stoffwechsel · Biochemie · Physiologie · Zellbiologie · Embryologie · Anatomie · Genetik · Pharmakologie · Immunologie · Histologie · Physik · Biostatistik · Laborwerte · {d} Übungen · EN / FR / DE";
if (typeof MANW !== 'undefined' && MANW.progress && MANW.progress.s) MANW.progress.s[1] = "Get 8 of your last 10 answers in a unit right to pass it (✓); the next unit unlocks. A passed unit comes back for short re-tests after 1, 3 and 7 days (🔁, 6 questions, 5 right); passing all three makes it ⭐ mastered. ‘Mix’ practises all unlocked units together.|Obtenez 8 bonnes réponses sur vos 10 dernières dans une unité pour la réussir (✓) ; l'unité suivante se débloque. Une unité réussie revient pour de courts contrôles après 1, 3 et 7 jours (🔁, 6 questions, 5 justes) ; les trois réussis la rendent ⭐ maîtrisée. « Mélange » entraîne toutes les unités débloquées.|8 deiner letzten 10 Antworten in einer Einheit richtig = bestanden (✓); die nächste Einheit wird frei. Eine bestandene Einheit kommt nach 1, 3 und 7 Tagen zu kurzen Nachtests wieder (🔁, 6 Fragen, 5 richtig); alle drei bestanden = ⭐ gemeistert. „Mix“ übt alle freigeschalteten Einheiten zusammen.";
