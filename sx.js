/* ===================== SX ENGINE: CELL BIOLOGY · EMBRYOLOGY · ANATOMY · CROSS-SUBJECT =====================
   Builds on the biochemistry engine (bx.js). New item kinds:
     tap  {q, dg, fo, a:key|[keys], x}            tap the right structure(s) on a drawing, then check
     lab  {q, dg?, fo?, slots:[{l?, a}], ex:[…], pick?, x}
                                                 label a diagram (fig) or match pairs (no fig) from a word bank
     ord  {…, figs:[drawing keys], hide?}
   (tap/lab use dg = drawing key, so they never clash with the engine's own fig field)         sequence blocks that carry small drawings
   Any item may also carry  after (HTML or ()=>HTML)  and  vb:{t, d}  (clinical bridge to another drill).
   Drawings: SXF[name](o) returns SVG. Flow diagrams: SXD[name] = {w, h, n:{key:{x, y, t|b, c, k}}, e:[[from, to, {l, d, c, via}]]}. */
Object.assign(U, {
  grpCell:"Cell biology|Biologie cellulaire|Zellbiologie", grpEmb:"Embryology|Embryologie|Embryologie", grpAna:"Anatomy|Anatomie|Anatomie", grpX:"Across subjects|Transversal|Fächerübergreifend",
  ktap:"Tap|Toucher|Antippen", klab:"Label|Légender|Beschriften", kmatch:"Match|Associer|Zuordnen",
  tapHelp:"Tap the correct structure on the drawing, then check.|Touchez la bonne structure sur le dessin, puis vérifiez.|Tippe die richtige Struktur in der Zeichnung an und prüfe dann.",
  tapHelpM:"Tap every correct structure ({n}), then check.|Touchez toutes les bonnes structures ({n}), puis vérifiez.|Tippe alle richtigen Strukturen an ({n}) und prüfe dann.",
  tapPick:"Tap a structure first.|Touchez d'abord une structure.|Tippe zuerst eine Struktur an.",
  tapYou:"You picked: {a}|Votre choix : {a}|Deine Wahl: {a}",
  labHelp:"Tap a numbered box, then the word that belongs there (the next empty box is selected automatically).|Touchez une case numérotée, puis le mot qui lui correspond (la case vide suivante est choisie automatiquement).|Tippe ein nummeriertes Feld an und dann das passende Wort (das nächste leere Feld wird automatisch gewählt).",
  matchHelp:"Tap an item on the left, then its match in the bank below.|Touchez un élément à gauche, puis son correspondant dans la banque ci-dessous.|Tippe links ein Element an und dann den passenden Begriff in der Auswahl unten.",
  labBank:"Word bank|Banque de mots|Wortauswahl", labClear:"Clear|Effacer|Leeren",
  labFix:"{n}: {a} → {b}|{n} : {a} → {b}|{n}: {a} → {b}",
  vbT:"Clinical bridge|Lien clinique|Klinischer Bezug", refT:"Reference|Référence|Übersicht",
  both:"Both|Les deux|Beide", neither:"Neither|Aucun des deux|Keines",
  sxSwipe:"Swipe sideways to see the whole diagram|Faites glisser pour voir tout le schéma|Wische seitlich, um das ganze Diagramm zu sehen"
});
U.subtitle = "Metabolism · biochemistry · physiology · cell biology · embryology · anatomy · {d} drills · EN / FR / DE|Métabolisme · biochimie · physiologie · biologie cellulaire · embryologie · anatomie · {d} exercices · EN / FR / DE|Stoffwechsel · Biochemie · Physiologie · Zellbiologie · Embryologie · Anatomie · {d} Übungen · EN / FR / DE";
if (typeof GRPS !== 'undefined') GRPS.push(['cell', 'grpCell'], ['emb', 'grpEmb'], ['ana', 'grpAna'], ['x', 'grpX']);
Object.assign(KIND, {tap:'ktap', lab:'klab'});

/* ---------- shorthand for data files ---------- */
const SXQ = (t, q, o, x, more) => Object.assign({t, k:'mcq', q, o, x}, more || {});
const SXO = (t, q, s, x, more) => Object.assign({t, k:'ord', q, s, x}, more || {});
const SXS = (t, q, bins, items, x, more) => Object.assign({t, k:'sort', q, bins, items, x}, more || {});
const SXM = (t, q, pairs, more) => Object.assign({t, k:'lab', q, slots:pairs.map(p => ({l:p[0], a:p[1]}))}, more || {});
const SXT = (t, q, dg, a, x, more) => Object.assign({t, k:'tap', q, dg, a, x}, more || {});
/* MCQ generator from a table: rows [name, value]; asks for the value of a random row */
function sxGenQ(t, rows, qf, more){ return {t, tab:{rows, c:[0, 1]}, gen(){ const r = pick(rows); const pool = rows.filter(z => TEN(z[1]) !== TEN(r[1])).map(z => z[1]);
  return oxRows(mcqFrom(qf(r), r[1], pool, r[2] || null, more), rows, 1, z => q3x(OXFIT, {x:z[0]})); }}; }
/* per-option explanations for table MCQs: ox[j] says what wrong option j actually is (found by matching column col) */
const OXFIT = "That fits {x}|Cela correspond à {x}|Das passt zu {x}";
function oxRows(it, rows, col, show){ try { it.ox = it.o.map((o, j) => { if (!j) return null; const e = TEN(o), hit = rows.filter(r => TEN(r[col]) === e);
    if (!hit.length) return null; return hit.slice(0, 2).map(show).reduce((a, b) => sxJ(a, ' · ', b)); }); } catch(e){} return it; }
function sxL(s, i){ const p = String(s).split('|'); return p[i] != null ? p[i] : p[0]; }
/* join several 'EN|FR|DE' strings language by language: sxJ(a, ' → ', b) */
function sxJ(){ const a = [].slice.call(arguments); return [0, 1, 2].map(i => a.map(x => sxL(x, i)).join('')).join('|'); }

/* ---------- text metrics & SVG helpers ---------- */
function sxTW(s, fs){ fs = fs || 12.5; let w = 0; for (const ch of String(s)){ w += /[A-ZÄÖÜ]/.test(ch) ? .68 : /[mwMW]/.test(ch) ? .82 : /[ilj.,:;'|!()\[\] ·]/.test(ch) ? .3 : /[0-9]/.test(ch) ? .56 : .53; } return w*fs; }
function sxTxt(x, y, s, cls, anchor, fs, maxw){ const ls = String(s).split('\n'), lh = (fs || 12.5)*1.2, y0 = y - (ls.length - 1)*lh/2;
  return `<text class="${cls || ''}" x="${x}" y="${y0}" text-anchor="${anchor || 'middle'}" dominant-baseline="central">` + ls.map((l, i) => `<tspan x="${x}" ${i ? `dy="${lh}"` : ''}${maxw && sxTW(l, fs) > maxw ? ` textLength="${maxw.toFixed(0)}" lengthAdjust="spacingAndGlyphs"` : ''}>${esc(l)}</tspan>`).join('') + `</text>`; }
let SXN = 0;
function sxArrowDefs(id){ return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="sxah" d="M0 0L10 5L0 10z"/></marker>`
  + `<marker id="${id}t" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto"><path class="sxat" d="M5 0V10" stroke-width="2.4"/></marker></defs>`; }
/* region wrapper for tappable drawings */
function sxR(o, k, inner, extra){
  const sel = (o.sel || []).indexOf(k) >= 0, ans = (o.a || []).indexOf(k) >= 0, hl = Array.isArray(o.hl) ? o.hl.indexOf(k) >= 0 : o.hl === k;
  const cls = 'sxr' + (sel ? ' sel' : '') + (o.done ? (ans ? ' ok' : sel ? ' no' : ' dim') : '') + (hl ? ' hl' : '') + (extra ? ' ' + extra : '');
  const act = o.tap && !o.done ? ` data-act="sxtap" data-id="${o.id}" data-v="${k}" tabindex="0" role="button" aria-pressed="${sel}"` : '';
  return `<g class="${cls}"${act}>${inner}</g>`; }
function sxShow(o, k){ return o.labels || (o.done && ((o.a || []).indexOf(k) >= 0 || (o.sel || []).indexOf(k) >= 0)) || (o.lbl || []).indexOf(k) >= 0; }
const SXF = {}, SXD = {}, SXNAMES = {};

/* ---------- flow diagram renderer ---------- */
function sxFlow(def, o){
  o = o || {}; const W = def.w, H = def.h, fs = def.fs || 12.5, B = {}; const mid = 'sxm' + (++SXN);
  for (const k in def.n){ const d = def.n[k]; let txt, bl = null;
    const bi = o.bk ? o.bk.indexOf(k) : -1, sl = bi >= 0 ? bi : d.b;
    if (sl != null && o.blank){ bl = o.blank(sl); bl.sl = sl; txt = bl.txt; }
    else txt = T(d.t);
    const ref = bl ? (bl.ans || '') : txt; const lines = String(ref).split('\n');
    const wTxt = Math.max.apply(null, lines.map(l => sxTW(l, fs)))*(bl ? 1.1 : 1);
    const w = d.w || Math.max(bl ? 64 : 40, wTxt + (bl ? 30 : 18)), h = d.h || (lines.length*fs*1.2 + 12);
    B[k] = {x:d.x, y:d.y, w, h, d, bl, txt}; }
  const clip = (a, b) => { const dx = b.x - a.x, dy = b.y - a.y; if (!dx && !dy) return [a.x, a.y];
    const sx = dx ? (a.w/2 + 3)/Math.abs(dx) : Infinity, sy = dy ? (a.h/2 + 3)/Math.abs(dy) : Infinity, s = Math.min(sx, sy); return [a.x + dx*s, a.y + dy*s]; };
  let s = `<svg class="sxflow${def.cls ? ' ' + def.cls : ''}" viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="${esc(T(def.alt || ''))}">` + sxArrowDefs(mid);
  (def.bg || []).forEach(g => { s += `<rect class="sxbg ${g.c || ''}" x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="10"/>` + (g.t ? `<text class="sxbgt" x="${g.x + 8}" y="${g.y + 15}">${esc(T(g.t))}</text>` : ''); });
  (def.e || []).forEach(e => { const a = B[e[0]], b = B[e[1]], op = e[2] || {}; if (!a || !b) return;
    const end = op.inh ? `url(#${mid}t)` : `url(#${mid})`;
    if (op.via){ const v = {x:op.via[0], y:op.via[1], w:0, h:0}; const p1 = clip(a, v), p2 = clip(b, v);
      s += `<path class="sxe ${op.c || ''}${op.d ? ' dash' : ''}" d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)}Q${v.x} ${v.y} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" marker-end="${op.n ? '' : end}"${op.two ? ` marker-start="url(#${mid})"` : ''}/>`;
      if (op.l) s += `<text class="sxel" x="${(p1[0] + 2*v.x + p2[0])/4 + (op.lx || 0)}" y="${(p1[1] + 2*v.y + p2[1])/4 + (op.ly || 0)}" text-anchor="middle">${esc(T(op.l))}</text>`; }
    else { const p1 = clip(a, b), p2 = clip(b, a);
      s += `<line class="sxe ${op.c || ''}${op.d ? ' dash' : ''}" x1="${p1[0].toFixed(1)}" y1="${p1[1].toFixed(1)}" x2="${p2[0].toFixed(1)}" y2="${p2[1].toFixed(1)}"${op.n ? '' : ` marker-end="${end}"`}${op.two ? ` marker-start="url(#${mid})"` : ''}/>`;
      if (op.l) s += `<text class="sxel" x="${(p1[0] + p2[0])/2 + (op.lx || 0)}" y="${(p1[1] + p2[1])/2 - 4 + (op.ly || 0)}" text-anchor="middle">${esc(T(op.l))}</text>`; } });
  for (const k in B){ const b = B[k], d = b.d, x0 = (b.x - b.w/2).toFixed(1), y0 = (b.y - b.h/2).toFixed(1);
    if (b.bl){ const bl = b.bl, st = bl.st ? ' ' + bl.st : '', act = bl.act ? ' act' : '';
      const shown = bl.st ? bl.fix : (bl.txt || '');
      s += `<g class="sxbl${st}${act}${bl.txt ? ' filled' : ''}" data-act="sxslot" data-id="${o.id}" data-v="${bl.sl}" tabindex="0" role="button" aria-label="${bl.sl + 1}"><rect x="${x0}" y="${y0}" width="${b.w.toFixed(1)}" height="${b.h.toFixed(1)}" rx="7"/>`
        + `<circle class="sxbn" cx="${(b.x - b.w/2 + 11).toFixed(1)}" cy="${b.y}" r="8.5"/><text class="sxbnt" x="${(b.x - b.w/2 + 11).toFixed(1)}" y="${b.y}" text-anchor="middle" dominant-baseline="central">${bl.sl + 1}</text>`
        + (shown ? sxTxt(b.x + 9, b.y, String(shown).replace(/\n/g, String(bl.ans).indexOf('\n') >= 0 ? '\n' : ' '), 'sxbt', 'middle', fs, b.w - 28) : '') + `</g>`;
      continue; }
    const node = `<rect class="sxn ${d.c || ''}" x="${x0}" y="${y0}" width="${b.w.toFixed(1)}" height="${b.h.toFixed(1)}" rx="${d.r != null ? d.r : 7}"/>` + sxTxt(b.x, b.y, b.txt, 'sxnt' + (d.c ? ' ' + d.c : ''), 'middle', fs);
    s += d.k ? sxR(o, d.k, node, 'sxtapn') : node; }
  (def.notes || []).forEach(nt => { s += sxTxt(nt[0], nt[1], T(nt[2]), 'sxnote ' + (nt[4] || ''), nt[3] || 'start', 11); });
  return s + `</svg>`;
}
SXF.flow = o => sxFlow(SXD[o.d], o);
/* labelling item on a flow diagram with n random blanks (numbered top → bottom) */
function sxFlowLab(t, q, d, keys, n, x, more){ return {t, gen(){ const def = SXD[d];
  const ks = shuffle(keys).slice(0, n).sort((a, b) => (def.n[a].y - def.n[b].y) || (def.n[a].x - def.n[b].x));
  return Object.assign({k:'lab', q, dg:'flow', fo:{d, bk:ks}, slots:ks.map(k => ({a:def.n[k].t})), ex:def.ex && def.ex.length ? def.ex : keys.filter(k => ks.indexOf(k) < 0).map(k => def.n[k].t), nex:3, x, wide:def.w > 560}, more || {}); }}; }
/* tap item on a flow diagram */
function sxFlowTap(t, q, d, a, x, more){ return Object.assign({t, k:'tap', q, dg:'flow', fo:{d}, a, x, wide:SXD[d].w > 560}, more || {}); }
function sxFigHTML(svg, wide){ return `<div class="vscroll sxsc${wide ? ' wide' : ''}">${svg}</div>${wide ? `<p class="vswipe">↔ ${u('sxSwipe')}</p>` : ''}`; }
function sxName(it, k){
  if (it.dg === 'flow'){ const d = SXD[it.fo.d]; for (const n in d.n) if (d.n[n].k === k) return T(d.n[n].t).replace(/\n/g, ' '); return k; }
  const nm = SXNAMES[it.dg]; return nm && nm[k] ? T(nm[k]) : k; }

/* ---------- item kinds ---------- */
BXK.tap = function(id, s, it){
  const a = [].concat(it.a), multi = a.length > 1 || it.multi;
  const o = Object.assign({}, it.fo || {}, {tap:true, id, sel:s.sel, a, done:s.done});
  let h = `<p class="note">${multi ? u('tapHelpM', {n:a.length}) : u('tapHelp')}</p><figure class="fig sxfig">${sxFigHTML(SXF[it.dg](o), it.wide)}</figure>`;
  if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
  if (!s.done) return h + `<div class="actions"><button type="button" class="btn primary" data-act="sxtapcheck" data-id="${id}">${u('check')}</button></div>`;
  h += `<div class="fb ${s.ok ? 'ok' : 'no'}"><strong>${s.ok ? u('correct') : u('wrong')}</strong> · ${esc(a.map(k => sxName(it, k)).join(' + '))}`;
  if (!s.ok && s.sel.length) h += `<p class="note">${u('tapYou', {a:esc(s.sel.map(k => sxName(it, k)).join(', '))})}</p>`;
  return h + bxExpl(it) + `</div>` + bxNext(id);
};
BXK.lab = function(id, s, it){
  const txt = i => s.ans[i] != null ? T(s.bank[s.ans[i]]) : null;
  let h = `<p class="note">${u(it.dg ? 'labHelp' : 'matchHelp')}</p>`;
  if (it.dg){ const o = Object.assign({}, it.fo || {}, {id, done:s.done, blank:i => ({txt:txt(i), st:s.done ? (s.res[i] ? 'ok' : 'no') : null, act:!s.done && s.act === i, ans:T(it.slots[i].a), fix:T(it.slots[i].a)})});
    h += `<figure class="fig sxfig">${sxFigHTML(SXF[it.dg](o), it.wide)}</figure>`; }
  if (!it.dg || it.list){ h += `<div class="sxm">`;
    it.slots.forEach((sl, i) => { const st = s.done ? (s.res[i] ? ' ok' : ' no') : '', t = txt(i);
      h += `<div class="sxmrow${st}"><span class="sxml">${it.dg ? `<b class="sxmn">${i + 1}</b>` : ''}${esc(T(sl.l || ''))}</span>`
        + `<button type="button" class="sxslot${!s.done && s.act === i ? ' act' : ''}${t ? ' filled' : ''}" data-act="sxslot" data-id="${id}" data-v="${i}"${s.done ? ' disabled' : ''}>${t ? esc(t) : '…'}</button>`
        + (s.done && !s.res[i] ? `<span class="fix">→ ${esc(T(sl.a))}</span>` : '') + `</div>`; });
    h += `</div>`; }
  if (!s.done){ const used = {}; Object.keys(s.ans).forEach(k => { if (s.ans[k] != null) used[s.ans[k]] = 1; });
    h += `<div class="sxbank" role="group" aria-label="${esc(u('labBank'))}">` + s.bank.map((b, j) => `<button type="button" class="sxchip${used[j] ? ' used' : ''}" data-act="sxchip" data-id="${id}" data-v="${j}">${esc(T(b))}</button>`).join('') + `</div>`;
    if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    return h + `<div class="actions"><button type="button" class="btn" data-act="sxlabclear" data-id="${id}"${Object.keys(s.ans).length ? '' : ' disabled'}>${u('labClear')}</button><button type="button" class="btn primary" data-act="sxlabcheck" data-id="${id}">${u('check')}</button></div>`; }
  const n = s.res.filter(Boolean).length, t = s.res.length, ok = n === t;
  h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong> · ${u('rowsOk', {n, t})}`;
  if (!ok && it.dg && !it.list) h += `<ul class="sxfix">` + it.slots.map((sl, i) => s.res[i] ? '' : `<li>${u('labFix', {n:i + 1, a:esc(txt(i) || '–'), b:esc(T(sl.a))})}</li>`).join('') + `</ul>`;
  return h + bxExpl(it) + `</div>` + bxNext(id);
};
/* blocks with drawings */
const _sxBlk = blkBody;
blkBody = function(d, hide){ if (d.t === 'fig') return `<span class="bk-fig">${d.svg}</span>` + (d.x ? `<span class="bk-t">${esc(T(d.x))}</span>` : ''); return _sxBlk(d, hide); };

const _sxNew = newBX;
newBX = function(id){
  _sxNew(id); const s = S[id]; let it = s.it;
  if (it.k === 'tap'){ s.sel = []; s.ok = null; }
  else if (it.k === 'lab'){
    if (it.pick && it.slots.length > it.pick){ it = s.it = Object.assign({}, it, {slots:shuffle(it.slots).slice(0, it.pick)}); }
    else if (!it.dg && !it.keep) it = s.it = Object.assign({}, it, {slots:shuffle(it.slots)});
    const ans = it.slots.map(x => x.a), seen = new Set(ans.map(TEN));
    const ex = shuffle((it.ex || []).filter(x => !seen.has(TEN(x)))).slice(0, it.nex != null ? it.nex : 3);
    s.bank = shuffle(ans.concat(ex)); s.ans = {}; s.act = 0; }
  else if (it.k === 'ord' && it.figs){ s.o.items.forEach(item => { const j = +item.ans.slice(1); item.d = {t:'fig', x:it.hide ? '' : it.s[j], svg:SXF[it.fk || 'mit']({p:it.figs[j]})}; }); }
};
function sxNextEmpty(s, from){ const n = s.it.slots.length; for (let g = 1; g <= n; g++){ const i = (from + g) % n; if (s.ans[i] == null) return i; } return from; }
Object.assign(A, {
  sxtap(el){ const s = S[el.dataset.id]; if (!s || s.done) return; const it = s.it, v = el.dataset.v, multi = [].concat(it.a).length > 1 || it.multi;
    const i = s.sel.indexOf(v); if (i >= 0) s.sel.splice(i, 1); else { if (!multi) s.sel = []; s.sel.push(v); } s.msg = null; render(); },
  sxtapcheck(el){ const id = el.dataset.id, s = S[id], a = [].concat(s.it.a); if (!s.sel.length){ s.msg = 'tapPick'; render(); return; }
    s.ok = s.sel.length === a.length && a.every(k => s.sel.indexOf(k) >= 0); s.done = true; s.res = [s.ok]; s.msg = null; addScore(id, s.ok ? 1 : 0, 1); render(); },
  sxslot(el){ const s = S[el.dataset.id]; if (!s || s.done) return; const i = +el.dataset.v;
    if (s.act === i && s.ans[i] != null) delete s.ans[i]; else s.act = i; s.msg = null; render(); },
  sxchip(el){ const s = S[el.dataset.id]; if (!s || s.done) return; const j = +el.dataset.v;
    Object.keys(s.ans).forEach(k => { if (s.ans[k] === j) delete s.ans[k]; });
    s.ans[s.act] = j; s.act = sxNextEmpty(s, s.act); s.msg = null; render(); },
  sxlabclear(el){ const s = S[el.dataset.id]; if (!s || s.done) return; s.ans = {}; s.act = 0; s.msg = null; render(); },
  sxlabcheck(el){ const id = el.dataset.id, s = S[id], it = s.it;
    if (it.slots.some((_, i) => s.ans[i] == null)){ s.msg = 'ansAll'; render(); return; }
    s.res = it.slots.map((sl, i) => TEN(s.bank[s.ans[i]]) === TEN(sl.a)); s.done = true; s.msg = null;
    addScore(id, s.res.filter(Boolean).length, s.res.length); render(); }
});
Object.assign(SCROLLMAP, {sxtapcheck:'.fb', sxlabcheck:'.fb'});

/* ---------- after-answer extras: reference table + clinical bridge ---------- */
function sxAnswered(s, it){ return it.k === 'mcq' ? s.chosen != null : it.k === 'ord' ? !!(s.o && s.o.checked) : !!s.done; }
function sxBridge(vb){ const d = DR.find(z => z.id === vb.d);
  return `<div class="vbridge"><span class="vbh">🩺 ${u('vbT')}</span><span class="vbt">${esc(T(vb.t))}</span>${d ? `<a class="vbl" href="#${d.id}">→ ${esc(dname(d))}</a>` : ''}</div>`; }
const _sxRender = renderBX;
renderBX = function(id){
  let h = _sxRender(id); const s = S[id], it = s && s.it; if (!it || !sxAnswered(s, it)) return h;
  let extra = '';
  if (it.after && ['mcq', 'ord', 'tap', 'lab'].indexOf(it.k) >= 0) extra += `<div class="after">${typeof it.after === 'function' ? it.after() : it.after}</div>`;
  if (it.vb) extra += [].concat(it.vb).map(sxBridge).join('');
  if (!extra) return h;
  const mark = `<div class="actions"><button type="button" class="btn primary" data-act="bxnext"`, i = h.lastIndexOf(mark);
  return i >= 0 ? h.slice(0, i) + extra + h.slice(i) : h + extra;
};
/* small reference table helper: rows [[a, b, …]], head [..] */
function sxTable(head, rows){ return `<details class="sxref" open><summary>${u('refT')}</summary><div class="tblwrap"><table class="sxtbl"><thead><tr>${head.map(x => `<th>${esc(T(x))}</th>`).join('')}</tr></thead><tbody>`
  + rows.map(r => `<tr>${r.map((c, j) => `<${j ? 'td' : 'th'}>${esc(T(c))}</${j ? 'td' : 'th'}>`).join('')}</tr>`).join('') + `</tbody></table></div></details>`; }

/* ---------- mistakes → Review for the new kinds and for the two diagram drills ---------- */
if (typeof rvWrap === 'function'){
  rvWrap('sxtapcheck', el => el.dataset.id); rvWrap('sxlabcheck', el => el.dataset.id);
  RV_RESET.sxtapcheck = s => { s.sel = []; s.done = false; s.res = null; s.ok = null; s.msg = null; };
  RV_RESET.sxlabcheck = s => { s.ans = {}; s.act = 0; s.done = false; s.res = null; s.msg = null; };
  const vReset = s => { Object.keys(s.B || {}).forEach(k => { s.B[k].val = null; s.B[k].state = null; }); s.checked = false; s.active = s.order ? s.order[0] : null; s.msg = null; };
  if (A.v1check){ rvWrap('v1check', 'v1'); RV_RESET.v1check = vReset; }
  if (A.v2check){ rvWrap('v2check', 'v2'); RV_RESET.v2check = s => { vReset(s); s.tab = 'maps'; }; }
  if (A.v2bcheck){ rvWrap('v2bcheck', 'v2b'); RV_RESET.v2bcheck = s => { s.sel = []; s.checked = false; s.msg = null;
    if (!S.v2 && typeof newV2map === 'function'){ S.v2 = {tab:'body', study:true, cnt:3}; newV2map(OMAPS[0].id); } if (S.v2) S.v2.tab = 'body'; }; }
  ['v1new', 'v1other', 'v2new', 'v2other', 'v2bnext'].forEach(k => { const f = A[k]; if (!f) return;
    A[k] = function(){ if (REV && REV.cur && VIEW === REV.drill){ rvNext(); return; } return f.apply(this, arguments); }; });
  const _pv = rvPreview;
  rvPreview = function(){ try {
      if (VIEW === 'diagrams' && S.v1 && PW[S.v1.pid]) return T(PW[S.v1.pid].n) + ' – ' + u('vMode');
      if (VIEW === 'organmap' && S.v2){ if (S.v2.tab === 'body' && S.v2b) return T(VBQ[S.v2b.order[S.v2b.k]].q); const m = OMAPS.find(z => z.id === S.v2.mid); if (m) return T(m.n); }
    } catch(e){} return _pv(); };
}

/* ---------- glossary: cell biology, embryology and anatomy terms (filled by xdata.js) ---------- */
const SXG = [];   // [name 'EN|FR|DE', definition 'EN|FR|DE', Latin or '', type 'cb'|'em'|'an']
Object.assign(U, {glCb:"Cell biology|Biologie cell.|Zellbiologie", glEm:"Embryology|Embryologie|Embryologie", glAn:"Anatomy|Anatomie|Anatomie", glLat:"Latin|Latin|Latein", glTr:"EN · FR · DE|EN · FR · DE|EN · FR · DE"});
if (typeof glBuild === 'function'){
  Object.assign(GLTYPE, {cb:'glCb', em:'glEm', an:'glAn'});
  const _glB = glBuild;
  glBuild = function(){ if (GLX) return GLX; const out = _glB(); SXG.forEach((g, i) => out.push({k:'x' + i, t:g[3], n:g[0], d:g[1], la:g[2]})); return out; };
  const _glD = glDetail;
  glDetail = function(x){ if (!GLTYPE[x.t] || ['cb', 'em', 'an'].indexOf(x.t) < 0) return _glD(x);
    return `<p>${esc(T(x.d))}</p>` + (x.la ? `<p class="glla"><em>${u('glLat')}:</em> ${esc(x.la)}</p>` : '') + `<p class="gltr">${[0, 1, 2].map(i => esc(sxL(x.n, i))).join(' · ')}</p>`; };
  const _glL = glList;
  glList = function(){ const base = _glL(), q = glNorm(GLS.q.trim()); if (!q) return base;
    const extra = glBuild().filter(x => ['cb', 'em', 'an'].indexOf(x.t) >= 0 && base.indexOf(x) < 0 && (GLS.f === 'all' || GLS.f === x.t)
      && (glNorm(x.la || '').indexOf(q) >= 0 || glNorm(T(x.d)).indexOf(q) >= 0 || [0, 1, 2].some(i => glNorm(sxL(x.n, i)).indexOf(q) >= 0)));
    return base.concat(extra); };
  glResults = function(){
    const list = glList(), shown = list.slice(0, GLS.lim);
    let h = `<p class="glcount">${u('glCount', {n:list.length})}</p>`;
    if (!list.length) return h + `<p class="glnone">${u('glNone')}</p>`;
    h += shown.map(x => { const open = GLS.exp === x.k, always = x.t === 'con' || x.t === 'cb' || x.t === 'em' || x.t === 'an';
      return `<div class="glitem t-${x.t}${open ? ' open' : ''}"><button type="button" class="glhead" data-act="glexp" data-k="${esc(x.k)}" aria-expanded="${open}"><span class="glname">${esc(glName(x))}</span><span class="gltype">${u(GLTYPE[x.t])}</span></button>`
        + (open || always ? `<div class="glbody">${glDetail(x)}</div>` : '') + `</div>`; }).join('');
    if (list.length > shown.length) h += `<button type="button" class="btn glmore" data-act="glmore">${u('glMore', {n:list.length - shown.length})}</button>`;
    return h; };
  glDrawer = function(){
    const f = [['all', 'glAll'], ['page', 'glPage'], ['con', 'glCon'], ['cb', 'glCb'], ['em', 'glEm'], ['an', 'glAn'], ['enz', 'glEnz'], ['mol', 'glMol'], ['pw', 'glPw'], ['dis', 'glDis']];
    return `<div class="glhd"><h2>📘 ${u('glT')}</h2><button type="button" class="glx" data-act="glclose" aria-label="${esc(u('glClose'))}">✕</button></div>`
      + `<input type="search" class="glq" id="glq" placeholder="${esc(u('glSearch'))}" value="${esc(GLS.q)}" autocomplete="off" aria-label="${esc(u('glSearch'))}">`
      + `<div class="glf" role="group">${f.map(x => `<button type="button" class="libchip${GLS.f === x[0] ? ' on' : ''}" aria-pressed="${GLS.f === x[0]}" data-act="glf" data-v="${x[0]}">${u(x[1])}</button>`).join('')}</div>`
      + `<div class="glres" id="glres">${glResults()}</div>`; };
}

/* ---------- manual entries for new drills (filled by data files) ---------- */
function sxMan(x){ if (typeof MAN === 'undefined') return; MAN.push(x); MANW[x.id] = x; }
const SXMAN_TAP = "Tap a structure on the drawing (tap again to unselect), then Check. Labels appear after checking.|Touchez une structure sur le dessin (retouchez pour désélectionner), puis Vérifier. Les noms apparaissent après la vérification.|Tippe eine Struktur in der Zeichnung an (nochmal tippen hebt die Auswahl auf) und dann Prüfen. Die Namen erscheinen nach dem Prüfen.";
const SXMAN_LAB = "Labelling: tap a numbered box, then a word from the bank; the next empty box is selected automatically. Tap a filled box twice to empty it.|Légender : touchez une case numérotée, puis un mot de la banque ; la case vide suivante est choisie automatiquement. Touchez deux fois une case remplie pour la vider.|Beschriften: Tippe ein nummeriertes Feld an, dann ein Wort aus der Auswahl; das nächste leere Feld wird automatisch gewählt. Ein gefülltes Feld zweimal antippen leert es.";
const SXMAN_MATCH = "Matching: tap an item on the left, then its partner in the bank. Extra words in the bank are distractors.|Associer : touchez un élément à gauche, puis son partenaire dans la banque. Les mots en trop sont des pièges.|Zuordnen: Tippe links ein Element an, dann seinen Partner in der Auswahl. Überzählige Wörter sind Ablenker.";
const SXMAN_ORD = "Sequence: tap the blocks in the right order to build the chain; tap a placed block to take it back.|Séquence : touchez les blocs dans le bon ordre pour construire la chaîne ; touchez un bloc placé pour le reprendre.|Ablauf: Tippe die Blöcke in der richtigen Reihenfolge an; ein gesetzter Block lässt sich durch Antippen zurücknehmen.";
const SXMAN_SORT = "Sorting: give every row its group with the chips, then Check.|Classer : attribuez un groupe à chaque ligne avec les boutons, puis Vérifier.|Sortieren: Ordne jeder Zeile mit den Knöpfen eine Gruppe zu und prüfe dann.";
const SXMAN_BRIDGE = "After answering, the 🩺 Clinical bridge box links the topic to a disease or to another drill.|Après la réponse, l'encadré 🩺 Lien clinique relie le thème à une maladie ou à un autre exercice.|Nach der Antwort verbindet der Kasten 🩺 Klinischer Bezug das Thema mit einer Krankheit oder einer anderen Übung.";
