/* ===================== BIOCHEMISTRY & PHYSIOLOGY ENGINE =====================
   Banks of items. Each bank entry has t (topic) and is either a ready item or {gen()} returning one; w = weight.
   Item kinds:
     mcq   {q, o:[correct, …distractors], x, fig?}
     num   {q, ans, unit?, tol?, steps:[…], x?, fig?}
     sort  {q, bins:[…], items:[[label, binIdx, note?]…]}
     build {q, slots:[{l, o:[…], a}], x?, after?}
     pred  {q, rows:[[variable, 'u'|'d'|'n', why]…]}
     ord   {q, s:[steps in order], x?}
     cmp   {q, cols:[…], rows:[{f, o:[…], a:[idx per col]}], x?}
*/
Object.assign(U, {
  grpMet:"Metabolism|Métabolisme|Stoffwechsel", grpBio:"Biochemistry|Biochimie|Biochemie", grpPhy:"Physiology|Physiologie|Physiologie",
  topic:"Topic|Thème|Thema", allTopics:"All topics|Tous les thèmes|Alle Themen",
  kmcq:"Question|Question|Frage", knum:"Calculation|Calcul|Rechnung", ksort:"Sort|Classer|Sortieren", kbuild:"Build|Construire|Bauen",
  kpred:"Predict|Prédire|Vorhersagen", kord:"Sequence|Séquence|Ablauf", kcmp:"Compare|Comparer|Vergleichen", kgraph:"Graph|Graphique|Diagramm",
  sortHelp:"Put every item in its group, then check.|Placez chaque élément dans son groupe, puis vérifiez.|Ordne jedes Element seiner Gruppe zu und prüfe dann.",
  buildHelp:"Choose every component, then check.|Choisissez chaque composant, puis vérifiez.|Wähle jeden Baustein und prüfe dann.",
  predHelp:"↑ increases · ↓ decreases · – no change or minimal change|↑ augmente · ↓ diminue · – pas de changement ou changement minime|↑ steigt · ↓ sinkt · – keine oder kaum Änderung",
  cmpHelp:"Fill in every cell, then check.|Remplissez chaque case, puis vérifiez.|Fülle jedes Feld aus und prüfe dann.",
  ansAll:"Answer every row first.|Répondez d'abord à chaque ligne.|Beantworte zuerst jede Zeile.",
  rowsOk:"{n}/{t} correct|{n}/{t} correctes|{n}/{t} richtig", correctWas:"Correct: {a}|Bonne réponse : {a}|Richtig: {a}",
  jump:"Jump to|Aller à|Springe zu",
  b1t:"Structure builder|Construction des molécules|Molekülbaukasten",
  b1d:"Assemble nucleotides, lipids and sugars from their parts; sort and recognise amino acids by side chain, charge and properties.|Assemblez nucléotides, lipides et glucides à partir de leurs éléments ; classez et reconnaissez les acides aminés par chaîne latérale, charge et propriétés.|Baue Nukleotide, Lipide und Zucker aus ihren Bausteinen; sortiere und erkenne Aminosäuren nach Seitenkette, Ladung und Eigenschaften.",
  b2t:"Enzyme kinetics|Cinétique enzymatique|Enzymkinetik",
  b2d:"Read Km and Vmax from Michaelis–Menten and Lineweaver–Burk plots, identify inhibition types and calculate rates.|Lisez Km et Vmax sur les graphiques de Michaelis–Menten et de Lineweaver–Burk, identifiez les types d'inhibition et calculez des vitesses.|Lies Km und Vmax aus Michaelis-Menten- und Lineweaver-Burk-Diagrammen ab, erkenne Hemmtypen und berechne Geschwindigkeiten.",
  b3t:"Buffers & pH|Tampons et pH|Puffer & pH",
  b3d:"Henderson–Hasselbalch, isoelectric points, titration curves, net charge of amino acids and peptides, drug ionisation.|Henderson–Hasselbalch, points isoélectriques, courbes de titrage, charge nette des acides aminés et peptides, ionisation des médicaments.|Henderson-Hasselbalch, isoelektrische Punkte, Titrationskurven, Nettoladung von Aminosäuren und Peptiden, Ionisierung von Arzneistoffen.",
  b4t:"Protein structure|Structure des protéines|Proteinstruktur",
  b4d:"Sort bonds and features into structural levels; folding, collagen, haemoglobin and misfolding diseases.|Classez liaisons et caractéristiques par niveau de structure ; repliement, collagène, hémoglobine et maladies du mauvais repliement.|Ordne Bindungen und Merkmale den Strukturebenen zu; Faltung, Kollagen, Hämoglobin und Fehlfaltungskrankheiten.",
  p1t:"What happens if…|Que se passe-t-il si…|Was passiert, wenn…",
  p1d:"Change one variable (blood loss, standing up, a diuretic, altitude…) and predict the cascade, then put the reflex steps in order.|Modifiez une variable (hémorragie, lever, diurétique, altitude…) et prédisez la cascade, puis ordonnez les étapes du réflexe.|Ändere eine Größe (Blutverlust, Aufstehen, Diuretikum, Höhe…) und sage die Kaskade voraus; ordne dann die Reflexschritte.",
  p2t:"Graph interpretation|Lecture de graphiques|Diagramme lesen",
  p2d:"O₂ dissociation curves, pressure–volume loops, action potentials and renal clearance curves: what shifted and why.|Courbes de dissociation de l'O₂, boucles pression–volume, potentiels d'action et courbes de clairance rénale : ce qui a changé et pourquoi.|O₂-Bindungskurven, Druck-Volumen-Schleifen, Aktionspotenziale und renale Clearancekurven: was hat sich verschoben und warum.",
  p3t:"Physiology calculations|Calculs de physiologie|Physiologie-Rechnungen",
  p3d:"Cardiac output, MAP, Fick, clearance, GFR, filtered load, alveolar gas equation, A–a gradient, compliance, anion gap, Nernst.|Débit cardiaque, PAM, Fick, clairance, DFG, charge filtrée, équation des gaz alvéolaires, gradient A–a, compliance, trou anionique, Nernst.|Herzzeitvolumen, MAD, Fick, Clearance, GFR, filtrierte Menge, Alveolargasgleichung, A-a-Gradient, Compliance, Anionenlücke, Nernst.",
  p4t:"Compare & contrast|Comparer et distinguer|Vergleichen & unterscheiden",
  p4d:"Fill comparison tables: muscle types, lung diseases, diuretics, diabetes insipidus vs SIADH, acid–base disorders and more.|Remplissez des tableaux comparatifs : types de muscles, maladies pulmonaires, diurétiques, diabète insipide vs SIADH, troubles acido-basiques, etc.|Fülle Vergleichstabellen: Muskeltypen, Lungenerkrankungen, Diuretika, Diabetes insipidus vs. SIADH, Säure-Basen-Störungen u. a."
});
U.subtitle = "Metabolism, biochemistry and physiology · {d} drill types · {n} pathways · EN / FR / DE|Métabolisme, biochimie et physiologie · {d} types d'exercices · {n} voies · EN / FR / DE|Stoffwechsel, Biochemie und Physiologie · {d} Übungstypen · {n} Stoffwechselwege · EN / FR / DE";
U.appTitle = "Preclinical Drills|Exercices précliniques|Vorklinik-Training";

const BX = {};
function bxDrill(id, k, n, g, topics, bank){ DR.push({id, k, n, g}); BX[id] = {topics, bank}; RENDER[id] = () => renderBX(id); }
const fmtN = (x, d) => { let s = d == null ? fmt(x) : (Math.round(x*Math.pow(10, d))/Math.pow(10, d)).toFixed(d); if (L !== 'en') s = s.replace('.', ','); return s; };
const rnd = (a, b, step) => { step = step || 1; const n = Math.round((b - a)/step); return Math.round((a + step*Math.floor(Math.random()*(n + 1)))*1e6)/1e6; };
/* tr(en, fr, de) → T-able array; templates can use ${} at call time */
const tr = (en, fr, de) => [en, fr == null ? en : fr, de == null ? en : de];
/* MCQ helper: correct + distractors drawn from a pool (deduplicated on English label) */
function mcqFrom(q, correct, pool, x, extra){ const ce = TEN(correct); const ds = shuffle(pool.filter(p => TEN(p) !== ce)).filter((p, i, a) => a.findIndex(z => TEN(z) === TEN(p)) === i).slice(0, 3);
  return Object.assign({k:'mcq', q, o:[correct].concat(ds), x}, extra || {}); }

function bxPool(id){ const d = BX[id], s = S[id], out = [];
  d.bank.forEach((e, i) => { if (s.topic !== 'any' && e.t !== s.topic) return; for (let w = 0; w < (e.w || 1); w++) out.push(i); }); return out; }
function newBX(id){
  const d = BX[id], s = S[id];
  if (!s.queue || !s.queue.length){ const q = shuffle(bxPool(id)); if (q.length > 1 && q[q.length - 1] === s.last){ q.unshift(q.pop()); } s.queue = q; }
  const i = s.queue.pop(); s.last = i; const e = d.bank[i];
  const it = Object.assign({}, e.gen ? e.gen() : e); it.t = it.t || e.t; s.it = it; s.done = false; s.res = null; s.msg = null;
  if (it.k === 'mcq'){ s.chosen = null;
    if (it.ci != null){ const o = it.o, ci = it.ci; it.o = [o[ci]].concat(o.filter((_, j) => j !== ci)); s.perm = o.map((_, j) => j === ci ? 0 : (j < ci ? j + 1 : j)); }
    else s.perm = shuffle(it.o.map((_, j) => j)); }
  else if (it.k === 'num') s.val = '';
  else if (it.k === 'sort'){ s.rows = shuffle(it.items).slice(0, it.max || 8); s.ans = {}; }
  else if (it.k === 'ord') s.o = makeOrder(it.s.map((x, j) => ({ans:'t' + j, d:{t:'txt', x}})));
  else s.ans = {};
}
const KIND = {mcq:'kmcq', num:'knum', sort:'ksort', build:'kbuild', pred:'kpred', ord:'kord', cmp:'kcmp'};
function renderBX(id){
  const d = BX[id]; if (!S[id]){ S[id] = {topic:'any'}; newBX(id); }
  const s = S[id], it = s.it, tk = Object.keys(d.topics);
  let h = '';
  if (tk.length > 1) h += `<div class="controls"><label class="field"><span>${u('topic')}</span><select data-chg="bxtopic" data-id="${id}" id="sel-${id}"><option value="any">${esc(u('allTopics'))}</option>`
    + tk.map(k => `<option value="${k}"${k === s.topic ? ' selected' : ''}>${esc(T(d.topics[k]))}</option>`).join('') + `</select></label></div>`;
  h += `<div class="card qcard bx"><div class="qmeta">${esc(T(d.topics[it.t] || ''))} · ${u(it.fig ? 'kgraph' : KIND[it.k])}</div>`;
  if (it.q) h += `<h3 class="q">${esc(T(it.q))}</h3>`;
  if (it.fig) h += `<figure class="fig">${typeof it.fig === 'function' ? it.fig() : it.fig}</figure>`;
  h += BXK[it.k](id, s, it) + `</div>`;
  return h;
}
function bxExpl(it){ return it.x ? `<p class="expl">${esc(T(it.x))}</p>` : ''; }
function bxNext(id){ return `<div class="actions"><button type="button" class="btn primary" data-act="bxnext" data-id="${id}">${u('next')}</button></div>`; }
function bxRowsFb(id, s, it){ const n = s.res.filter(Boolean).length, t = s.res.length, ok = n === t;
  return `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong> · ${u('rowsOk', {n, t})}${bxExpl(it)}${it.after ? `<div class="after">${typeof it.after === 'function' ? it.after() : it.after}</div>` : ''}</div>` + bxNext(id); }
function chipRow(id, r, opts, cur, done, okIdx){
  return `<div class="seg chips" role="group">` + opts.map((o, v) => { let cls = String(v) === String(cur) ? 'on' : '';
    if (done){ if (v === okIdx) cls += ' right'; else if (String(v) === String(cur)) cls += ' wrongpick'; }
    return `<button type="button" class="${cls}" data-act="bxset" data-id="${id}" data-r="${r}" data-v="${v}" aria-pressed="${String(v) === String(cur)}"${done ? ' disabled' : ''}>${esc(T(o))}</button>`; }).join('') + `</div>`;
}
const PRED = [['u', '↑'], ['d', '↓'], ['n', '–']];
const BXK = {
  mcq(id, s, it){ let h = `<div class="opts${it.o.length === 2 ? ' two' : ''}">`;
    s.perm.forEach((oi, pos) => { let cls = ''; if (s.chosen != null){ if (oi === 0) cls = 'ok'; else if (pos === s.chosen) cls = 'no'; else cls = 'dim'; }
      h += `<button type="button" class="opt ${cls}" data-act="bxans" data-id="${id}" data-k="${pos}"${s.chosen != null ? ' disabled' : ''}>${esc(T(it.o[oi]))}</button>`; });
    h += `</div>`;
    if (s.chosen != null){ const ok = s.perm[s.chosen] === 0; h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong>${bxExpl(it)}</div>` + bxNext(id); }
    return h; },
  num(id, s, it){ let h = `<form class="numrow" data-sub="bxnum" data-id="${id}"><label class="sr" for="bxin-${id}">${u('typeNumber')}</label><input id="bxin-${id}" inputmode="decimal" autocomplete="off" placeholder="${esc(u('typeNumber'))}" value="${esc(s.val)}"${s.done ? ' disabled' : ''}>`
      + (it.unit ? `<span class="unit">${esc(T(it.unit))}</span>` : '') + `<button type="submit" class="btn primary"${s.done ? ' disabled' : ''}>${u('check')}</button></form>`;
    if (s.done){ h += `<div class="fb ${s.ok ? 'ok' : 'no'}"><strong>${s.ok ? u('correct') : u('wrong')}</strong> · ${u('answerIs', {a:fmtN(it.ans, it.dp) + (it.unit ? ' ' + esc(T(it.unit)) : '')})}`
      + (it.steps ? `<ol class="steps">${it.steps.map(x => `<li>${esc(T(x))}</li>`).join('')}</ol>` : '') + bxExpl(it) + `</div>` + bxNext(id); }
    return h; },
  sort(id, s, it){ let h = `<p class="note">${u('sortHelp')}</p><div class="rows">`;
    s.rows.forEach((r, i) => { const cls = s.done ? (s.res[i] ? 'ok' : 'no') : '';
      h += `<div class="srow ${cls}"><div class="slabel">${esc(T(r[0]))}${s.done && !s.res[i] ? `<span class="fix">→ ${esc(T(it.bins[r[1]]))}</span>` : ''}${s.done && r[2] ? `<span class="rnote">${esc(T(r[2]))}</span>` : ''}</div>${chipRow(id, i, it.bins, s.ans[i], s.done, r[1])}</div>`; });
    h += `</div>`;
    if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    return h + (s.done ? bxRowsFb(id, s, it) : `<div class="actions"><button type="button" class="btn primary" data-act="bxcheck" data-id="${id}">${u('check')}</button></div>`); },
  build(id, s, it){ let h = `<p class="note">${u('buildHelp')}</p><div class="rows">`;
    it.slots.forEach((sl, i) => { const cls = s.done ? (s.res[i] ? 'ok' : 'no') : '';
      h += `<div class="srow ${cls}"><div class="slabel">${esc(T(sl.l))}</div>${chipRow(id, i, sl.o, s.ans[i], s.done, sl.a)}</div>`; });
    h += `</div>`; if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    return h + (s.done ? bxRowsFb(id, s, it) : `<div class="actions"><button type="button" class="btn primary" data-act="bxcheck" data-id="${id}">${u('check')}</button></div>`); },
  pred(id, s, it){ let h = `<p class="note">${u('predHelp')}</p><div class="rows">`;
    it.rows.forEach((r, i) => { const cls = s.done ? (s.res[i] ? 'ok' : 'no') : ''; const okIdx = PRED.findIndex(p => p[0] === r[1]);
      h += `<div class="srow pred ${cls}"><div class="slabel">${esc(T(r[0]))}${s.done && r[2] ? `<span class="rnote">${esc(T(r[2]))}</span>` : ''}</div>${chipRow(id, i, PRED.map(p => p[1]), s.ans[i], s.done, okIdx)}</div>`; });
    h += `</div>`; if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    return h + (s.done ? bxRowsFb(id, s, it) : `<div class="actions"><button type="button" class="btn primary" data-act="bxcheck" data-id="${id}">${u('check')}</button></div>`); },
  cmp(id, s, it){ let h = `<p class="note">${u('cmpHelp')}</p><div class="cmp">`;
    it.rows.forEach((r, i) => { h += `<div class="cmprow"><div class="cmpf">${esc(T(r.f))}</div><div class="cmpcells">`;
      it.cols.forEach((c, j) => { const key = i + '_' + j, cur = s.ans[key]; const st = s.done ? (String(cur) === String(r.a[j]) ? 'ok' : 'no') : '';
        h += `<label class="cmpcell ${st}"><span>${esc(T(c))}</span><select data-chg="bxcmp" data-id="${id}" data-key="${key}"${s.done ? ' disabled' : ''}><option value="">${esc(u('choose'))}</option>`
          + r.o.map((o, v) => `<option value="${v}"${String(cur) === String(v) ? ' selected' : ''}>${esc(T(o))}</option>`).join('') + `</select>`
          + (st === 'no' ? `<span class="fix">→ ${esc(T(r.o[r.a[j]]))}</span>` : '') + `</label>`; });
      h += `</div></div>`; });
    h += `</div>`; if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    return h + (s.done ? bxRowsFb(id, s, it) : `<div class="actions"><button type="button" class="btn primary" data-act="bxcheck" data-id="${id}">${u('check')}</button></div>`); },
  ord(id, s, it){ let h = orderHTML(s.o, id); if (s.o.checked) h += (it.x ? `<div class="fb plain">${bxExpl(it)}</div>` : '') + bxNext(id); return h; }
};
Object.assign(A, {
  bxans(el){ const id = el.dataset.id, s = S[id]; if (s.chosen != null) return; s.chosen = +el.dataset.k; addScore(id, s.perm[s.chosen] === 0 ? 1 : 0, 1); render(); },
  bxnext(el){ newBX(el.dataset.id); render(); if (S[el.dataset.id].it.k === 'num') setTimeout(() => { const i = document.getElementById('bxin-' + el.dataset.id); if (i) i.focus(); }, 0); },
  bxset(el){ const s = S[el.dataset.id]; if (s.done) return; s.ans[el.dataset.r] = +el.dataset.v; s.msg = null; render(); },
  bxcheck(el){ const id = el.dataset.id, s = S[id], it = s.it; let keys, good;
    if (it.k === 'sort'){ keys = s.rows.map((_, i) => i); good = i => s.ans[i] === s.rows[i][1]; }
    else if (it.k === 'build'){ keys = it.slots.map((_, i) => i); good = i => s.ans[i] === it.slots[i].a; }
    else if (it.k === 'pred'){ keys = it.rows.map((_, i) => i); good = i => PRED[s.ans[i]] && PRED[s.ans[i]][0] === it.rows[i][1]; }
    else { keys = []; it.rows.forEach((r, i) => it.cols.forEach((c, j) => keys.push(i + '_' + j))); good = k => { const [i, j] = k.split('_'); return String(s.ans[k]) === String(it.rows[i].a[j]); }; }
    if (keys.some(k => s.ans[k] == null || s.ans[k] === '')){ s.msg = 'ansAll'; render(); return; }
    s.res = keys.map(good); s.done = true; s.msg = null; addScore(id, s.res.filter(Boolean).length, s.res.length); render(); }
});
Object.assign(CHG, {
  bxtopic(el){ const s = S[el.dataset.id]; s.topic = el.value; s.queue = null; newBX(el.dataset.id); render(); },
  bxcmp(el){ const s = S[el.dataset.id]; if (s.done) return; s.ans[el.dataset.key] = el.value === '' ? null : +el.value; s.msg = null; }
});
SUBS.bxnum = f => { const id = f.dataset.id, s = S[id], it = s.it; const inp = document.getElementById('bxin-' + id);
  const raw = (inp ? inp.value : '').trim().replace(',', '.').replace('−', '-'); if (!raw || isNaN(+raw)){ if (inp) inp.focus(); return; }
  const tol = it.tol != null ? it.tol : Math.max(0.05, Math.abs(it.ans)*0.02);
  s.val = inp.value; s.ok = Math.abs(+raw - it.ans) <= tol; s.done = true; SCROLL = '.fb'; addScore(id, s.ok ? 1 : 0, 1); render(); };
Object.assign(SCROLLMAP, {bxans:'.fb', bxcheck:'.fb', bxnext:'.qcard'});

/* ===================== PLOTS (SVG) ===================== */
function fpts(f, a, b, n){ n = n || 90; const o = []; for (let i = 0; i <= n; i++){ const x = a + (b - a)*i/n, y = f(x); if (isFinite(y)) o.push([x, y]); } return o; }
/* o: {x:[min,max], y:[min,max], xl, yl, xt:[ticks], yt:[ticks], c:[{p, cls, dash, name, lbl}], pt:[{x,y,lbl}], gx:[x guide], gy:[y guide], w, h} */
function plotSVG(o){
  const W = o.w || 420, H = o.h || 270, m = {l:52, r:16, t:16, b:44};
  const [x0, x1] = o.x, [y0, y1] = o.y;
  const sx = v => +(m.l + (v - x0)/(x1 - x0)*(W - m.l - m.r)).toFixed(1), sy = v => +(H - m.b - (v - y0)/(y1 - y0)*(H - m.t - m.b)).toFixed(1);
  const cid = 'cp' + Math.random().toString(36).slice(2, 8);
  const axY = (y0 < 0 && y1 > 0) ? sy(0) : sy(y0), axX = (x0 < 0 && x1 > 0) ? sx(0) : sx(x0);
  let s = `<svg class="plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(T(o.alt || o.yl || ''))}"><defs><clipPath id="${cid}"><rect x="${m.l}" y="${m.t}" width="${W - m.l - m.r}" height="${H - m.t - m.b}"/></clipPath></defs>`;
  (o.gx || []).forEach(g => { s += `<line class="gd" x1="${sx(g)}" y1="${m.t}" x2="${sx(g)}" y2="${H - m.b}"/>`; });
  (o.gy || []).forEach(g => { s += `<line class="gd" x1="${m.l}" y1="${sy(g)}" x2="${W - m.r}" y2="${sy(g)}"/>`; });
  s += `<line class="ax" x1="${m.l}" y1="${axY}" x2="${W - m.r}" y2="${axY}"/><line class="ax" x1="${axX}" y1="${m.t}" x2="${axX}" y2="${H - m.b}"/>`;
  (o.xt || []).forEach(t => { const v = Array.isArray(t) ? t[0] : t, lb = Array.isArray(t) ? T(t[1]) : fmtN(v); s += `<line class="ax" x1="${sx(v)}" y1="${axY}" x2="${sx(v)}" y2="${axY + 4}"/><text x="${sx(v)}" y="${axY + 16}" text-anchor="middle">${esc(lb)}</text>`; });
  (o.yt || []).forEach(t => { const v = Array.isArray(t) ? t[0] : t, lb = Array.isArray(t) ? T(t[1]) : fmtN(v); s += `<line class="ax" x1="${axX - 4}" y1="${sy(v)}" x2="${axX}" y2="${sy(v)}"/><text x="${axX - 7}" y="${sy(v) + 4}" text-anchor="end">${esc(lb)}</text>`; });
  s += `<g clip-path="url(#${cid})">`;
  (o.c || []).forEach(c => { if (!c.p.length) return; s += `<path class="cv ${c.cls || 'c1'}${c.dash ? ' dash' : ''}" d="M${c.p.map(p => sx(p[0]) + ' ' + sy(p[1])).join('L')}"/>`; });
  s += `</g>`;
  (o.c || []).forEach(c => { if (c.lbl && c.p.length){ const p = c.at || c.p[c.p.length - 1]; s += `<text class="clbl ${c.cls || 'c1'}" x="${sx(p[0]) + (c.dx || 4)}" y="${sy(p[1]) + (c.dy || -4)}">${esc(T(c.lbl))}</text>`; } });
  (o.pt || []).forEach(p => { s += `<circle class="ptc" cx="${sx(p.x)}" cy="${sy(p.y)}" r="4.5"/>` + (p.lbl ? `<text class="ptl" x="${sx(p.x) + (p.dx || 7)}" y="${sy(p.y) + (p.dy || -7)}">${esc(T(p.lbl))}</text>` : ''); });
  if (o.xl) s += `<text class="axt" x="${(m.l + W - m.r)/2}" y="${H - 6}" text-anchor="middle">${esc(T(o.xl))}</text>`;
  if (o.yl) s += `<text class="axt" transform="translate(13 ${(m.t + H - m.b)/2}) rotate(-90)" text-anchor="middle">${esc(T(o.yl))}</text>`;
  s += `</svg>`;
  const named = (o.c || []).filter(c => c.name);
  if (named.length) s += `<div class="plegend">` + named.map(c => `<span><svg width="30" height="10" aria-hidden="true"><line class="cv ${c.cls || 'c1'}${c.dash ? ' dash' : ''}" x1="1" y1="5" x2="29" y2="5"/></svg>${esc(T(c.name))}</span>`).join('') + `</div>`;
  return s;
}
