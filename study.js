/* ===================== STUDY ENGINE: typed recall · confidence · multi-part cases · per-option explanations · study cards =====================
   Builds on bx.js / sx.js. Loaded before the subject data files that use the new kinds.
   New item kinds:
     rec   {q, a, alt?:[…], x}                        type the answer (fuzzy match, every language accepted)
     case  {stem, stemh?:()=>HTML, parts:[{q, o:[correct,…], x}], x?}   a vignette or passage with linked questions, one part at a time
   Table MCQs (zTab, zRev, zDrug, sxGenQ) carry ox:[…]: what each wrong option actually is.
   Settings (UIS): conf (confidence before answering, default on), recall ('off' | 'mix' | 'all', default 'mix'), cards (study card before a new unit, default on).
   Study cards are built from the unit's own bank (tables, matching pairs, sorting bins, sequences, explanations, a worked calculation)
   plus an optional hand-written idea + memory hook in SCARDS['drill:topic']. */
Object.assign(U, {
  krec:"Recall|Rappel|Abruf", kcase:"Case|Cas|Fall",
  recType:"Type your answer|Tapez votre réponse|Antwort eingeben", recGive:"Show answer|Voir la réponse|Antwort zeigen",
  recYou:"You wrote: {a}|Vous avez écrit : {a}|Du hast geschrieben: {a}", recOk:"I was right – count it|J'avais juste – la compter|Ich lag richtig – werten",
  recSelf:"counted by you|comptée par vous|von dir gewertet",
  recCover:"Think of your answer first, then show the options.|Pensez d'abord à votre réponse, puis affichez les choix.|Überlege dir zuerst die Antwort, dann zeige die Auswahl.",
  recShow:"I have an answer – show options|J'ai ma réponse – afficher les choix|Ich habe eine Antwort – Auswahl zeigen",
  recCmp:"Don't confuse with|À ne pas confondre avec|Nicht verwechseln mit",
  recHelp:"Spelling slips are tolerated; any language counts.|Les petites fautes sont tolérées ; toutes les langues comptent.|Kleine Tippfehler werden toleriert; jede Sprache zählt.",
  confQ:"How sure are you?|Quelle certitude ?|Wie sicher bist du?", confS:"Sure|Sûr|Sicher", confU:"Unsure|Pas sûr|Unsicher", confG:"Guess|Au hasard|Geraten",
  confFirst:"Rate how sure you are first.|Indiquez d'abord votre degré de certitude.|Gib zuerst an, wie sicher du bist.",
  confHot:"Sure but wrong – the most important kind of mistake. It goes to the front of your review queue.|Sûr mais faux – le type d'erreur le plus important. Elle passe en tête de vos révisions.|Sicher, aber falsch – die wichtigste Art von Fehler. Sie kommt ganz nach vorn in deine Wiederholungen.",
  confLucky:"Right, but a guess – saved for review so that you really learn it.|Juste, mais au hasard – enregistrée pour révision afin de vraiment l'apprendre.|Richtig, aber geraten – zum Wiederholen gespeichert, damit du es wirklich lernst.",
  oxT:"Why the other options are wrong|Pourquoi les autres choix sont faux|Warum die anderen Antworten falsch sind",
  casePart:"Next part ▸|Partie suivante ▸|Nächster Teil ▸", casePartN:"Part {i} of {n}|Partie {i} sur {n}|Teil {i} von {n}",
  scT:"Study card|Fiche d'étude|Lernkarte", scOpen:"📖 Study card|📖 Fiche|📖 Lernkarte",
  scStart:"Start the questions ▸|Commencer les questions ▸|Mit den Fragen beginnen ▸", scBack:"Back to the question ▸|Retour à la question ▸|Zurück zur Frage ▸",
  scIdea:"Key idea|Idée clé|Kernidee", scMnem:"Memory hook|Moyen mnémotechnique|Merkhilfe", scFacts:"Key facts|Faits essentiels|Wichtige Fakten",
  scPts:"Key points|Points clés|Kernpunkte", scEx:"Worked example|Exemple résolu|Rechenbeispiel", scSeq:"In order|Dans l'ordre|Reihenfolge", scGroups:"Groups|Groupes|Gruppen",
  scNew:"New unit: read this once, then answer the questions. Reopen it any time with 📖.|Nouvelle unité : lisez ceci une fois, puis répondez aux questions. Rouvrez-la à tout moment avec 📖.|Neue Einheit: einmal lesen, dann die Fragen beantworten. Mit 📖 jederzeit wieder öffnen.",
  scMiss:"Two misses in a row in this unit.|Deux erreurs de suite dans cette unité.|Zwei Fehler hintereinander in dieser Einheit.",
  scMissBtn:"📖 Look at the study card|📖 Revoir la fiche|📖 Lernkarte ansehen", scMore:"All {n} rows|Les {n} lignes|Alle {n} Zeilen",
  stuT:"Study features|Fonctions d'apprentissage|Lernfunktionen", stuConf:"Confidence before answering|Certitude avant de répondre|Sicherheit vor dem Antworten",
  stuRecall:"Answer mode|Mode de réponse|Antwortmodus", stuRecOff:"Choices only|Choix uniquement|Nur Auswahl", stuRecMix:"Mix in typed recall|Avec rappel tapé|Mit getipptem Abruf", stuRecAll:"Recall first|Rappel d'abord|Erst abrufen",
  stuCards:"Study card before a new unit|Fiche avant une nouvelle unité|Lernkarte vor neuer Einheit", stuOn:"On|Activé|An", stuOff:"Off|Désactivé|Aus",
  stuNote:"Confidence: tap Sure / Unsure / Guess before answering; sure-but-wrong answers go to the front of Review, lucky guesses are saved too. Answer mode: ‘Mix’ turns about half of the short-answer questions into typed recall; ‘Recall first’ types all of them and hides the options of the others until you have thought of an answer.|Certitude : touchez Sûr / Pas sûr / Au hasard avant de répondre ; les réponses sûres mais fausses passent en tête des révisions, les réussites au hasard sont aussi enregistrées. Mode de réponse : « Avec rappel tapé » transforme environ la moitié des questions à réponse courte en rappel tapé ; « Rappel d'abord » les transforme toutes et masque les choix des autres jusqu'à ce que vous ayez une réponse.|Sicherheit: Vor dem Antworten Sicher / Unsicher / Geraten antippen; sichere Fehler kommen in Wiederholen ganz nach vorn, Glückstreffer werden ebenfalls gespeichert. Antwortmodus: „Mit getipptem Abruf“ macht etwa die Hälfte der Kurzantwortfragen zum Eintippen; „Erst abrufen“ macht alle dazu und verdeckt bei den anderen die Auswahl, bis du eine Antwort hast."
});
Object.assign(KIND, {rec:'krec', case:'kcase'});
const SCARDS = {};
let STU_OFF = false;      // true while a mock exam builds items
const STU = { conf:() => UIS.conf !== false && !STU_OFF, recall:() => STU_OFF ? 'off' : (UIS.recall || 'mix'), cards:() => UIS.cards !== false };

/* ---------- typed recall: normalisation and fuzzy matching ---------- */
const STU_GRK = {'α':'alpha', 'β':'beta', 'γ':'gamma', 'δ':'delta', 'κ':'kappa', 'λ':'lambda', 'μ':'mu', 'ω':'omega'};
const STU_SUP = {'⁰':'0', '¹':'1', '²':'2', '³':'3', '⁴':'4', '⁵':'5', '⁶':'6', '⁷':'7', '⁸':'8', '⁹':'9', '₀':'0', '₁':'1', '₂':'2', '₃':'3', '₄':'4', '₅':'5', '₆':'6', '₇':'7', '₈':'8', '₉':'9'};
function recNorm(s){ s = String(s == null ? '' : s).toLowerCase().replace(/[αβγδκλμω]/g, c => STU_GRK[c]).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹₀-₉]/g, c => STU_SUP[c] || '');
  try { s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch(e){}
  return s.replace(/ß/g, 'ss').replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/[^a-z0-9]+/g, ''); }
function recVariants(x, alt){ const out = new Set(), add = v => { const n = recNorm(v); if (n.length >= 2) out.add(n); };
  [].concat(x || [], alt || []).forEach(a => { const parts = Array.isArray(a) ? a : String(a).split('|');
    parts.forEach(str => { add(str); const np = str.replace(/\s+\([^)]*\)/g, ''); add(np);
      /* a bracketed alias after a space counts on its own (Adrenaline (epinephrine)); formulas like Zn(NO₃)₂ are left whole */
      (str.match(/\s\(([^)]*)\)/g) || []).forEach(p => p.trim().slice(1, -1).split(/[,;\/]/).map(x => x.trim()).filter(x => /^[A-Za-zÀ-ÿ\-]{5,}$/.test(x)).forEach(add));
      if (np.indexOf('/') >= 0 && !/[⁺⁻+]/.test(np)) np.split('/').forEach(x => { if (x.trim().length >= 3) add(x); }); }); });
  return [...out]; }
function lev(a, b){ if (a === b) return 0; const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let p = Array.from({length:n + 1}, (_, j) => j);
  for (let i = 1; i <= m; i++){ const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; }
  return p[n]; }
function recMatch(input, it){ const v = recNorm(input); if (!v) return false;
  return recVariants(it.a, it.alt).some(w => v === w || (w.length >= 5 && lev(v, w) <= (w.length >= 12 ? 2 : 1))); }
const REC_STOP = /^(yes|no|true|false|both|neither|none|all of them|increases?|decreases?|unchanged|no change|higher|lower|left|right|up|down|more|less|same|normal)\b/i;
function recEligible(it){
  if (it.k !== 'mcq' || it.figo || it.fig || it.norec || it.ci != null || !it.o || it.o.length < 3) return false;
  const a = TEN(it.o[0]).trim(), q = TEN(it.q || '');
  const all = String(Array.isArray(it.o[0]) ? it.o[0].join('|') : it.o[0]).split('|').map(x => x.trim());
  const maxW = it.rec ? 4 : 2;  /* name-type answers (it.rec) may be longer; anything else typed only if it is a short term */
  if (all.some(x => recNorm(x).length < 2 || x.length > (it.rec ? 34 : 26) || x.replace(/\s*\([^)]*\)/g, '').split(/\s+/).length > maxW)) return false;
  if (/^[\d−\-+.,(]/.test(a) || /[→←↑↓=<>%×÷]/.test(a) || REC_STOP.test(a)) return false;
  if (/\b(not|except|false|true)\b/i.test(q) || /\bor\b[^?.]*\?\s*$/i.test(q) || q.toLowerCase().indexOf(a.toLowerCase()) >= 0) return false;
  return true; }

/* ---------- item kinds ---------- */
BXK.rec = function(id, s, it){
  let h = `<form class="numrow recrow" data-sub="bxrec" data-id="${id}"><label class="sr" for="bxrec-${id}">${u('recType')}</label><input id="bxrec-${id}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${esc(u('recType'))}" value="${esc(s.val || '')}"${s.done ? ' disabled' : ''}><button type="submit" class="btn primary"${s.done ? ' disabled' : ''}>${u('check')}</button></form>`;
  if (!s.done) return h + `<p class="note">${u('recHelp')}</p><div class="actions"><button type="button" class="btn" data-act="bxrecgive" data-id="${id}">${u('recGive')}</button></div>`;
  h += `<div class="fb ${s.ok ? 'ok' : 'no'}"><strong>${s.ok ? u('correct') : u('wrong')}</strong> · ${u('answerIs', {a:esc(T(it.a))})}` + (s.self ? ` <span class="chip muted">${u('recSelf')}</span>` : '');
  if (!s.ok && s.val) h += `<p class="note">${u('recYou', {a:esc(s.val)})} <button type="button" class="linkbtn" data-act="bxrecok" data-id="${id}">${u('recOk')}</button></p>`;
  return h + bxExpl(it) + `</div>` + bxNext(id);
};
function caseStem(it){ const t = T(it.stem || ''); return `<div class="vignette">${t.split('\n').map(p => `<p>${esc(p)}</p>`).join('')}${it.stemh ? it.stemh() : ''}</div>`; }
BXK.case = function(id, s, it){
  let h = caseStem(it); const n = it.parts.length;
  it.parts.forEach((p, j) => { if (j > s.pi) return; const ch = s.ch[j], perm = s.perms[j], ans = ch != null;
    h += `<div class="cpart${ans ? ' done' : ''}"><p class="cpn">${u('casePartN', {i:j + 1, n})}</p><h4 class="q">${esc(T(p.q))}</h4><div class="opts">`;
    perm.forEach((oi, pos) => { let cls = ''; if (ans){ if (oi === 0) cls = 'ok'; else if (pos === ch) cls = 'no'; else cls = 'dim'; }
      h += `<button type="button" class="opt ${cls}" data-act="bxcase" data-id="${id}" data-k="${pos}"${ans ? ' disabled' : ''}>${esc(T(p.o[oi]))}</button>`; });
    h += `</div>`;
    if (ans){ const ok = perm[ch] === 0; h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong>${bxExpl(p)}</div>`; }
    h += `</div>`; });
  if (s.ch[s.pi] != null){ if (s.pi < n - 1) h += `<div class="actions"><button type="button" class="btn primary" data-act="bxcasenext" data-id="${id}">${u('casePart')}</button></div>`;
    else h += (it.x ? `<div class="fb plain">${bxExpl(it)}</div>` : '') + bxNext(id); }
  return h;
};

/* ---------- new item → conversions, case set-up, no repeats ---------- */
const STU_RECENT = {};
function stuKey(it){ return TEN(it.q || it.stem || '') + '#' + (it.k === 'mcq' ? TEN(it.o[0]) : it.k === 'num' ? it.ans : ''); }
function stuPrep(id){ const s = S[id], it = s.it; s.started = false; s.conf = null; s.cmsg = 0; s.lastOk = null; s.hot = 0; s.miss2 = null; s.cover = false; s.card = null;
  if (it.k === 'mcq'){ const m = STU.recall();
    if (m !== 'off' && recEligible(it) && (m === 'all' || Math.random() < 0.5)){
      const r = Object.assign({}, it, {k:'rec', a:it.o[0], kl:'krec', oo:it.o}); delete r.o; s.it = r; s.val = ''; s.done = false; s.ok = null; s.self = false; }
    else if (m === 'all') s.cover = true; }
  else if (it.k === 'rec'){ s.val = ''; s.done = false; s.ok = null; s.self = false; }
  else if (it.k === 'case'){ s.pi = 0; s.ch = []; s.done = false; s.perms = it.parts.map(p => p.ci != null ? p.o.map((_, j) => j) : shuffle(p.o.map((_, j) => j))); }
}
const _stuNew = newBX;
newBX = function(id){ const r = STU_RECENT[id] || (STU_RECENT[id] = []); let k, tries = 0;
  do { _stuNew(id); const it = S[id].it; k = (it.k === 'mcq' || it.k === 'num') ? stuKey(it) : null; tries++; } while (k && tries < 4 && r.indexOf(k) >= 0);
  if (k){ r.push(k); if (r.length > 25) r.shift(); }
  stuPrep(id); };

/* ---------- actions ---------- */
function stuAnswered(s, it){ if (!it) return true; if (it.k === 'case') return s.ch && s.ch[s.pi] != null; if (it.k === 'rec') return !!s.done; return sxAnswered(s, it); }
function confGate(id){ if (!STU.conf()) return false; const s = S[id]; if (!s || !s.it || s.conf) return false; s.cmsg = (s.cmsg || 0) + 1; render();
  if (typeof document !== 'undefined'){ const c = document.querySelector('#main .conf'); if (c && c.scrollIntoView) c.scrollIntoView({block:'center'}); } return true; }
function gateA(name, idOf){ const f = A[name]; if (!f) return; A[name] = function(el){ const id = idOf(el); if (id && BX[id] && S[id] && S[id].it && confGate(id)) return; return f.apply(this, arguments); }; }
Object.assign(A, {
  bxconf(el){ const s = S[el.dataset.id]; if (!s || stuAnswered(s, s.it)) return; s.conf = el.dataset.v; s.cmsg = 0; render(); },
  bxcover(el){ const s = S[el.dataset.id]; if (s){ s.cover = false; render(); } },
  bxrecgive(el){ const id = el.dataset.id, s = S[id]; if (!s || s.done) return; s.done = true; s.ok = false; s.val = ''; SCROLL = '.fb'; addScore(id, 0, 1); render(); },
  bxrecok(el){ const id = el.dataset.id, s = S[id]; if (!s || !s.done || s.ok) return; s.ok = true; s.self = true; if (typeof stuSelfFix === 'function') stuSelfFix(id); render(); },
  bxcase(el){ const id = el.dataset.id, s = S[id]; if (!s || s.ch[s.pi] != null) return; s.ch[s.pi] = +el.dataset.k; const ok = s.perms[s.pi][s.ch[s.pi]] === 0;
    if (s.pi === s.it.parts.length - 1) s.done = true; addScore(id, ok ? 1 : 0, 1); render(); },
  bxcasenext(el){ const s = S[el.dataset.id]; if (!s || s.ch[s.pi] == null || s.pi >= s.it.parts.length - 1) return; s.pi++; s.conf = null; s.cmsg = 0; s.lastOk = null; s.hot = 0; s.miss2 = null; render();
    setTimeout(() => { const p = document.querySelectorAll('#main .cpart'); const e = p[p.length - 1]; if (e && e.scrollIntoView) e.scrollIntoView({block:'start', behavior:'smooth'}); }, 0); },
  scopen(el){ const s = S[el.dataset.id]; if (!s) return; s.card = {d:el.dataset.d || el.dataset.id, k:el.dataset.v, man:true}; render(); if (typeof window !== 'undefined') window.scrollTo(0, 0); },
  scclose(el){ const s = S[el.dataset.id]; if (s){ s.card = null; render(); } },
  stuset(el){ const k = el.dataset.k, v = el.dataset.v; UIS[k] = v === 'true' ? true : v === 'false' ? false : v; uiSave(); render(); }
});
SUBS.bxrec = f => { const id = f.dataset.id, s = S[id]; if (!s || s.done) return; const inp = document.getElementById('bxrec-' + id); const v = (inp ? inp.value : '').trim();
  if (!v){ if (inp) inp.focus(); return; } s.val = v; if (confGate(id)) return; s.ok = recMatch(v, s.it); s.done = true; SCROLL = '.fb'; addScore(id, s.ok ? 1 : 0, 1); render(); };
gateA('bxans', el => el.dataset.id); gateA('bxcheck', el => el.dataset.id); gateA('sxtapcheck', el => el.dataset.id); gateA('sxlabcheck', el => el.dataset.id);
gateA('ocheck', el => el.dataset.ns); gateA('bxcase', el => el.dataset.id);
{ const f = SUBS.bxnum; SUBS.bxnum = function(fm){ const id = fm.dataset.id, inp = document.getElementById('bxin-' + id); if (inp && S[id]) S[id].val = inp.value;
    if (confGate(id)) return; return f.apply(this, arguments); }; }
Object.assign(SCROLLMAP, {bxcase:'.cpart:last-of-type .fb', bxrecgive:'.fb', bxrecok:'.fb'});
/* mistakes → Review for the new kinds */
if (typeof rvWrap === 'function'){
  rvWrap('bxcase', el => el.dataset.id); rvWrap('bxrecgive', el => el.dataset.id);
  RV_RESET.bxcase = s => { s.ch = (s.ch || []).slice(0, s.pi); s.done = false; s.conf = null; };
  RV_RESET.bxrecgive = RV_RESET.bxrec = s => { s.val = ''; s.done = false; s.ok = null; s.self = false; s.conf = null; };
  ['bxans', 'bxcheck', 'bxnum', 'ocheck', 'sxtapcheck', 'sxlabcheck'].forEach(k => { const f = RV_RESET[k]; RV_RESET[k] = function(s){ if (f) f.apply(this, arguments); if (s) s.conf = null; }; });
  const f = SUBS.bxrec; SUBS.bxrec = function(fm){ rvCapture(fm.dataset.id, 'bxrec'); try { return f.apply(this, arguments); } finally { RV_PEND = null; } };
}

/* ---------- study cards ---------- */
function scTable(rows, cols, head, max){ max = max || 14; const r0 = rows.slice(0, max), more = rows.length > max;
  const tb = rs => `<table class="sxtbl sctbl">${head ? `<thead><tr>${cols.map(c => `<th>${esc(T(head[c]))}</th>`).join('')}</tr></thead>` : ''}<tbody>`
    + rs.map(r => `<tr>${cols.map((c, j) => `<${j ? 'td' : 'th'}>${esc(T(r[c]))}</${j ? 'td' : 'th'}>`).join('')}</tr>`).join('') + `</tbody></table>`;
  return `<div class="tblwrap">${tb(r0)}</div>` + (more ? `<details class="scmore"><summary>${u('scMore', {n:rows.length})}</summary><div class="tblwrap">${tb(rows.slice(max))}</div></details>` : ''); }
function scData(id, k){
  const B = BX[id]; if (!B) return null; const ents = B.bank.filter(e => e.t === k); if (!ents.length) return null;
  const out = {facts:[], pts:[], ex:null}, seenTab = new Set(), seenPt = new Set();
  const pt = x => { if (!x) return; const e = TEN(x); if (!e || seenPt.has(e) || out.pts.length >= 6) return; seenPt.add(e); out.pts.push(x); };
  ents.forEach(e => {
    if (e.tab && !seenTab.has(e.tab.rows)){ seenTab.add(e.tab.rows); out.facts.push(scTable(e.tab.rows, e.tab.c, e.tab.h)); return; }
    if (e.gen) return;
    if (e.k === 'lab' && !e.dg && e.slots && e.slots.length && out.facts.length < 4){ const key = e.slots.map(x => TEN(x.l)).join('#'); if (!seenTab.has(key)){ seenTab.add(key); out.facts.push(scTable(e.slots.map(x => [x.l, x.a]), [0, 1])); } }
    else if (e.k === 'sort' && e.bins && out.facts.length < 4){ const key = 'S' + TEN(e.q); if (!seenTab.has(key)){ seenTab.add(key);
      out.facts.push(`<div class="scbins">` + e.bins.map((b, bi) => { const its = e.items.filter(r => r[1] === bi).map(r => esc(T(r[0]))); return its.length ? `<p><b>${esc(T(b))}:</b> ${its.join(' · ')}</p>` : ''; }).join('') + `</div>`); } }
    else if (e.k === 'ord' && e.s && out.facts.length < 4 && !e.figs){ const key = 'O' + TEN(e.q); if (!seenTab.has(key)){ seenTab.add(key);
      out.facts.push(`<p class="scq">${esc(T(e.q))}</p><ol class="scord">${e.s.map(x => `<li>${esc(T(x))}</li>`).join('')}</ol>`); } }
    else if (e.k === 'cmp' && e.rows && out.facts.length < 4){ const key = 'C' + TEN(e.q); if (!seenTab.has(key)){ seenTab.add(key);
      out.facts.push(scTable(e.rows.map(r => [r.f].concat(e.cols.map((c, j) => r.o[r.a[j]]))), [0].concat(e.cols.map((_, j) => j + 1)), ['–'].concat(e.cols))); } }
    pt(e.x); if (e.rows && e.k === 'pred') e.rows.forEach(r => pt(r[2]));
  });
  for (let i = 0; i < 14 && ents.some(e => e.gen); i++){ const e = pick(ents.filter(z => z.gen)); let it; try { it = e.gen(); } catch(err){ continue; }
    if (!out.ex && it.k === 'num' && it.steps) out.ex = it; else if (it.x && out.pts.length < 6 && !e.tab) pt(it.x); }
  return out; }
function scHTML(slot, d, k, auto){
  const B = BX[d]; const info = SCARDS[d + ':' + k] || {}, dat = scData(d, k) || {facts:[], pts:[]};
  const us = typeof lvUnits === 'function' ? lvUnits(d) : null, i = us ? us.indexOf(k) : -1;
  let h = `<div class="card scard"><div class="scardh"><span class="schip">📖 ${u('scT')}</span><h3>${i >= 0 ? esc(u('lvUnit', {i:i + 1})) + ' · ' : ''}${esc(T(B.topics[k] || ''))}</h3></div>`;
  if (auto) h += `<p class="note">${u('scNew')}</p>`;
  if (info.i) h += `<section><h4>💡 ${u('scIdea')}</h4><p>${esc(T(info.i))}</p></section>`;
  if (info.m) h += `<section class="scmnem"><h4>🧠 ${u('scMnem')}</h4><p>${esc(T(info.m))}</p></section>`;
  if (dat.facts.length) h += `<section><h4>📋 ${u('scFacts')}</h4>${dat.facts.slice(0, 4).join('')}</section>`;
  if (dat.pts.length) h += `<section><h4>✔ ${u('scPts')}</h4><ul class="scpts">${dat.pts.map(x => `<li>${esc(T(x))}</li>`).join('')}</ul></section>`;
  if (dat.ex){ const e = dat.ex; h += `<section><h4>🧮 ${u('scEx')}</h4><p class="scq">${esc(T(e.q))}</p>${e.steps ? `<ol class="steps">${e.steps.map(x => `<li>${esc(T(x))}</li>`).join('')}</ol>` : ''}<p><b>${u('answerIs', {a:fmtN(e.ans, e.dp) + (e.unit ? ' ' + esc(T(e.unit)) : '')})}</b></p></section>`; }
  return h + `<div class="actions"><button type="button" class="btn primary" data-act="scclose" data-id="${slot}">${auto ? u('scStart') : u('scBack')}</button></div></div>`; }
const SC_HAS = {};
function scHas(d, k){ const key = d + ':' + k; if (SC_HAS[key] != null) return SC_HAS[key]; if (SCARDS[key]) return (SC_HAS[key] = true); const x = scData(d, k); return (SC_HAS[key] = !!(x && (x.facts.length || x.pts.length >= 2 || x.ex))); }
function scUnitOf(id, s){ const it = s.it; if (it && it.src) return {d:it.src, k:it.st}; const k = s.topic && s.topic !== 'any' ? s.topic : it && it.t; return {d:id, k}; }

/* ---------- rendering: card, confidence row, cover, per-option explanations, notes ---------- */
function confRow(id, s){ return `<div class="conf${s.cmsg ? ' warn' : ''}" role="group" aria-label="${esc(u('confQ'))}"><span class="confq">${u(s.cmsg ? 'confFirst' : 'confQ')}</span>`
  + [['s', 'confS', '●●●'], ['u', 'confU', '●●○'], ['g', 'confG', '●○○']].map(c => `<button type="button" class="${s.conf === c[0] ? 'on' : ''}" aria-pressed="${s.conf === c[0]}" data-act="bxconf" data-id="${id}" data-v="${c[0]}"><i aria-hidden="true">${c[2]}</i> ${u(c[1])}</button>`).join('') + `</div>`; }
function insBefore(h, marker, add, last){ const i = last ? h.lastIndexOf(marker) : h.indexOf(marker); return i >= 0 ? h.slice(0, i) + add + h.slice(i) : null; }
function oxHTML(s, it){ if (!it.ox || !s.perm) return ''; const li = s.perm.map((oi, pos) => oi && it.ox[oi] ? `<li class="${pos === s.chosen ? 'mine' : ''}"><b>${esc(T(it.o[oi]))}</b> — ${esc(T(it.ox[oi]))}</li>` : '').join('');
  return li ? `<details class="oxl"${s.perm[s.chosen] !== 0 ? ' open' : ''}><summary>${u('oxT')}</summary><ul>${li}</ul></details>` : ''; }
const _stuRender = renderBX;
renderBX = function(id){
  if (!S[id]){ S[id] = {topic:'any'}; newBX(id); }
  const s0 = S[id];
  if (s0 && s0.it && !s0.card && STU.cards() && !REV && id !== 'mixed' && !stuAnswered(s0, s0.it) && !s0.started){
    const un = scUnitOf(id, s0), key = un.d + ':' + un.k, seen = UIS.seen || (UIS.seen = {});
    if (un.k && !seen[key] && typeof lvRec === 'function' && !lvRec(un.d, un.k).n && scHas(un.d, un.k)){ seen[key] = 1; uiSave(); s0.card = {d:un.d, k:un.k, auto:true}; } }
  if (s0) s0.started = true;
  let h = _stuRender(id); const s = S[id], it = s && s.it; if (!it) return h;
  if (s.card){ const i = h.indexOf('<div class="card qcard'); const card = scHTML(id, s.card.d, s.card.k, s.card.auto); return i >= 0 ? h.slice(0, i) + card : h + card; }
  const un = scUnitOf(id, s);
  if (un.k && BX[un.d] && BX[un.d].topics[un.k] && scHas(un.d, un.k)) h = h.replace(/(<div class="qmeta">[^<]*)<\/div>/, `$1<button type="button" class="linkbtn scbtn" data-act="scopen" data-id="${id}" data-d="${un.d}" data-v="${un.k}">${u('scOpen')}</button></div>`);
  const answered = stuAnswered(s, it);
  if (!answered){
    if (it.k === 'mcq' && s.cover){ const i = h.indexOf('<div class="opts'); if (i >= 0){ const j = h.indexOf('</div>', i) + 6; h = h.slice(0, i) + `<div class="cover"><p class="note">${u('recCover')}</p><button type="button" class="btn primary" data-act="bxcover" data-id="${id}">${u('recShow')}</button></div>` + h.slice(j); return h; } }
    if (STU.conf()){ const row = confRow(id, s); let r = null;
      if (it.k === 'mcq' || it.k === 'case') r = insBefore(h, '<div class="opts', row, true);
      else if (it.k === 'num' || it.k === 'rec') r = insBefore(h, '<form class="numrow', row);
      else r = insBefore(h, '<div class="actions">', row, true);
      h = r || h + row; }
    return h; }
  let add = '';
  if (s.hot) add += `<p class="note confnote hot">🔥 ${u('confHot')}</p>`;
  else if (s.lucky) add += `<p class="note confnote">🎲 ${u('confLucky')}</p>`;
  if (s.miss2) add += `<p class="note scmiss">${u('scMiss')} <button type="button" class="linkbtn" data-act="scopen" data-id="${id}" data-d="${s.miss2.d}" data-v="${s.miss2.k}">${u('scMissBtn')}</button></p>`;
  if (it.k === 'mcq') add = oxHTML(s, it) + add;
  else if (it.k === 'rec' && it.ox && it.oo){ const li = it.oo.map((o, j) => j && it.ox[j] ? `<li><b>${esc(T(o))}</b> — ${esc(T(it.ox[j]))}</li>` : '').join(''); if (li) add = `<details class="oxl"${s.ok ? '' : ' open'}><summary>${u('recCmp')}</summary><ul>${li}</ul></details>` + add; }
  if (add){ const fi = it.k === 'case' ? h.lastIndexOf('<div class="fb ') : h.indexOf('<div class="fb ');
    if (fi >= 0){ const j = h.indexOf('</div>', fi); h = h.slice(0, j) + add + h.slice(j); } else h += add; }
  return h;
};

/* ---------- settings card ---------- */
{ const _s = EXTRA_VIEWS.settings;
  EXTRA_VIEWS.settings = function(){ let h = _s.apply(this, arguments);
    const seg = (k, cur, opts) => `<div class="seg" role="group">` + opts.map(o => `<button type="button" class="${String(cur) === String(o[0]) ? 'on' : ''}" aria-pressed="${String(cur) === String(o[0])}" data-act="stuset" data-k="${k}" data-v="${o[0]}">${u(o[1])}</button>`).join('') + `</div>`;
    return h + `<div class="card setlist stuset"><h3>🎯 ${u('stuT')}</h3>`
      + `<div class="setrow"><span class="setl">${u('stuConf')}</span>${seg('conf', UIS.conf !== false, [[true, 'stuOn'], [false, 'stuOff']])}</div>`
      + `<div class="setrow"><span class="setl">${u('stuRecall')}</span>${seg('recall', UIS.recall || 'mix', [['off', 'stuRecOff'], ['mix', 'stuRecMix'], ['all', 'stuRecAll']])}</div>`
      + `<div class="setrow"><span class="setl">${u('stuCards')}</span>${seg('cards', UIS.cards !== false, [[true, 'stuOn'], [false, 'stuOff']])}</div>`
      + `<p class="note">${u('stuNote')}</p></div>`; }; }
