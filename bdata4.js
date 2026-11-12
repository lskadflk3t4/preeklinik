/* ===================== B5 MOLECULE ID =====================
   Structural-formula recognition: name ↔ structure, functional groups, pathway roles, charge at pH 7.4,
   "what changed?" reaction pairs, and an atlas to browse every molecule. Structures come from mdata.js. */
Object.assign(U, {
  b5t:"Molecule ID|Reconnaître les molécules|Moleküle erkennen",
  b5d:"Recognise amino acids, sugars, Krebs-cycle intermediates, lipids, nucleotides, coenzymes and signalling molecules from their structural formulas; spot functional groups and what changes in each reaction. Browse every structure in the atlas.|Reconnaissez acides aminés, sucres, intermédiaires du cycle de Krebs, lipides, nucléotides, coenzymes et molécules de signalisation à partir de leur formule ; repérez les groupes fonctionnels et ce qui change à chaque réaction. Parcourez toutes les structures dans l'atlas.|Erkenne Aminosäuren, Zucker, Krebszyklus-Zwischenprodukte, Lipide, Nukleotide, Coenzyme und Signalmoleküle an ihrer Strukturformel; finde funktionelle Gruppen und was sich bei jeder Reaktion ändert. Alle Strukturen im Atlas ansehen.",
  molQuiz:"Quiz|Quiz|Quiz", molAtlas:"Atlas|Atlas|Atlas", molView:"View|Affichage|Ansicht", molDraw:"Drawing|Dessin|Darstellung",
  molSkel:"Skeletal|Squelettique|Skelettformel", molFull:"Show C and H|Afficher C et H|C und H zeigen",
  molOpt:"Structure|Structure|Struktur", molFam:"Group|Groupe|Gruppe", molAll:"All molecules|Toutes les molécules|Alle Moleküle",
  molFormula:"Formula as drawn (pH 7.4)|Formule telle que dessinée (pH 7,4)|Summenformel wie gezeichnet (pH 7,4)",
  molCharge:"Net charge|Charge nette|Nettoladung", molCarbons:"Carbons|Carbones|Kohlenstoffe",
  molGroups:"Functional groups (tap to highlight)|Groupes fonctionnels (touchez pour surligner)|Funktionelle Gruppen (antippen zum Markieren)",
  molPaths:"Appears in|Intervient dans|Kommt vor in", molConf:"Easily confused with|Facile à confondre avec|Leicht zu verwechseln mit",
  molClose:"Close|Fermer|Schließen", molPick:"Tap a molecule to see it large, with its groups and role.|Touchez une molécule pour l'afficher en grand, avec ses groupes et son rôle.|Tippe auf ein Molekül, um es groß mit Gruppen und Rolle zu sehen.",
  molPseudo:"CoA, R, R′ = parts left out to keep the drawing readable.|CoA, R, R′ = parties omises pour garder le dessin lisible.|CoA, R, R′ = weggelassene Teile, damit die Zeichnung lesbar bleibt.",
  molStereo:"Wedge = bond toward you · hashed = bond away from you.|Coin plein = liaison vers vous · hachuré = liaison vers l'arrière.|Keil = Bindung nach vorn · gestrichelt = Bindung nach hinten.",
  kstruct:"Structure|Structure|Struktur",
  molRxPair:"What changed?|Qu'est-ce qui a changé ?|Was hat sich geändert?"
});

/* ---------- small language helpers ---------- */
const L3 = f => [0, 1, 2].map(f);
const tx = (s, i) => { const p = String(s).split('|'); return p[i] != null ? p[i] : p[0]; };
const MIDS = Object.keys(MOL);
const isAA = id => !!AAI[id] && MOL[id].fam === 'aa';
function mName(id){ return isAA(id) ? aaLbl(AAI[id]) : L3(i => tx(MOL[id].n, i)); }
function mNote(id){ const m = MOL[id];
  if (!isAA(id)) return L3(i => tx(m.x, i));
  const a = AAI[id], f = AAFEAT.filter(z => z[1].indexOf(id) >= 0).slice(0, 2);
  return L3(i => `${a[0][i]} (${a[1]}, ${a[2]}): ${AAC[a[3]][i]}. ${['Side chain', 'Chaîne latérale', 'Seitenkette'][i]}: ${ix(a[4], i)}.` + (a[8] ? ' ' + ['Essential.', 'Essentiel.', 'Essentiell.'][i] : '')
    + f.map(z => ' ' + z[2][i]).join('')); }
const famOf = id => MOL[id].fam;
const inFam = f => MIDS.filter(id => famOf(id) === f);
const PSEUDO = {CoA:1, R:1, 'R′':1, 'R″':1};
const hasPseudo = id => MOL[id].a.some(a => PSEUDO[a[0]]);

/* ---------- structure drawing ---------- */
let MOLC = store.get('molC', 'skel');                     // 'skel' or 'full' (show C and H labels)
const SUBD = '₀₁₂₃₄₅₆₇₈₉';
const subN = n => n > 1 ? String(n).split('').map(d => SUBD[d]).join('') : '';
const chgTxt = q => q ? (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '−') : '';
const ELC = {O:'o', N:'n', S:'s', P:'p', I:'i'};
/* opt: {hl:[atom idx…], bl: px per bond, full: bool, title} */
function molSVG(id, opt){
  opt = opt || {}; const m = opt.m || MOL[id], A_ = m.a, PX = m.px ? new Set(m.px) : null, B_ = m.b, bl = opt.bl || 30, full = opt.full != null ? opt.full : MOLC === 'full';
  const n = A_.length, nb = A_.map(() => []);
  B_.forEach(b => { nb[b[0]].push(b[1]); nb[b[1]].push(b[0]); });
  const P = A_.map(a => [a[1]*bl, a[2]*bl]);
  const fs = Math.max(11, Math.round(bl*0.45)), cw = fs*0.62;
  /* which atoms get a text label, and how it is laid out */
  const lab = A_.map((a, i) => {
    const sym = a[0], q = a[3] || 0, h = a[4] || 0, isC = sym === 'C';
    if (isC && !full && !q && nb[i].length) return null;
    const ps = !!PSEUDO[sym] || !!(PX && PX.has(i));
    const dirs = nb[i].map(j => Math.atan2(P[j][1] - P[i][1], P[j][0] - P[i][0]));
    const free = ang => Math.min(...dirs.map(d => { let x = Math.abs(d - ang) % (2*Math.PI); return x > Math.PI ? 2*Math.PI - x : x; }).concat([9]));
    let hs = 'r';  // side for the H's
    if (h && !ps){ // prefer writing H's beside the atom (OH, HO, NH₃) unless a bond points that way
      if (free(0) >= 1.0) hs = 'r'; else if (free(Math.PI) >= 1.0) hs = 'l';
      else { const cand = [['r', 0], ['l', Math.PI], ['d', Math.PI/2], ['u', -Math.PI/2]]; let best = -1;
        cand.forEach((c, k) => { const f = free(c[1]) - k*0.05; if (f > best + 1e-6){ best = f; hs = c[0]; } }); } }
    let qa = -Math.PI/4;  // charge position (angle)
    if (q){ let best = -1; [-Math.PI/4, -3*Math.PI/4, Math.PI/4, 3*Math.PI/4].forEach(ang => {
        let f = free(ang); if (h && ((hs === 'r' && Math.cos(ang) > 0) || (hs === 'l' && Math.cos(ang) < 0) || (hs === 'u' && Math.sin(ang) < 0) || (hs === 'd' && Math.sin(ang) > 0))) f -= 1.2;
        if (f > best + 1e-6){ best = f; qa = ang; } }); }
    let w = (ps ? sym.length : 1)*cw, an = null;
    if (ps && sym.length > 3 && nb[i].length === 1){ an = P[i][0] >= P[nb[i][0]][0] ? 'start' : 'end'; w = cw*1.2; }   // long abbreviation: written away from its bond
    return {sym, q, h: ps ? 0 : h, hs, qa, w, ps, an, tw:sym.length*cw*0.92};
  });
  /* bond end shortened where a label sits */
  const cut = (i, j) => { const L0 = lab[i]; if (!L0) return 0; const dx = P[j][0] - P[i][0], dy = P[j][1] - P[i][1], d = Math.hypot(dx, dy) || 1;
    const hw = L0.w/2 + 2.5, hh = fs*0.55; const tx_ = Math.abs(dx) > 1e-6 ? hw/Math.abs(dx/d) : 1e9, ty_ = Math.abs(dy) > 1e-6 ? hh/Math.abs(dy/d) : 1e9; return Math.min(tx_, ty_, d*0.45); };
  const hl = new Set(opt.hl || []);
  let under = '', bonds = '', texts = '';
  B_.forEach(b => {
    const [i, j, o, w] = b; let [x1, y1] = P[i], [x2, y2] = P[j]; const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, ux = dx/d, uy = dy/d;
    if (hl.has(i) && hl.has(j)) under += `<line class="mhl" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    const c1 = cut(i, j), c2 = cut(j, i); x1 += ux*c1; y1 += uy*c1; x2 -= ux*c2; y2 -= uy*c2;
    const nx = -uy, ny = ux, f = v => v.toFixed(1);
    if (w === 1){ const ww = bl*0.13; bonds += `<polygon class="mw" points="${f(x1)},${f(y1)} ${f(x2 + nx*ww)},${f(y2 + ny*ww)} ${f(x2 - nx*ww)},${f(y2 - ny*ww)}"/>`; return; }
    if (w === 2){ const k = 6; for (let t = 0; t <= k; t++){ const u0 = t/k, cx = x1 + (x2 - x1)*u0, cy = y1 + (y2 - y1)*u0, ww = bl*0.13*u0 + 0.6;
      bonds += `<line class="mb mh" x1="${f(cx + nx*ww)}" y1="${f(cy + ny*ww)}" x2="${f(cx - nx*ww)}" y2="${f(cy - ny*ww)}"/>`; } return; }
    if (o === 1){ bonds += `<line class="mb" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`; return; }
    // double / triple: which side has the other substituents?
    let side = 0; [[i, j], [j, i]].forEach(([a, z]) => nb[a].forEach(k => { if (k === z) return; const s = (P[k][0] - P[i][0])*nx + (P[k][1] - P[i][1])*ny; side += s > 0.01 ? 1 : s < -0.01 ? -1 : 0; }));
    const g = bl*0.16;
    if (o === 3 || side === 0 || lab[i] && lab[j]){
      const off = o === 3 ? g*1.1 : g/1.6;
      bonds += `<line class="mb" x1="${f(x1 + nx*off)}" y1="${f(y1 + ny*off)}" x2="${f(x2 + nx*off)}" y2="${f(y2 + ny*off)}"/><line class="mb" x1="${f(x1 - nx*off)}" y1="${f(y1 - ny*off)}" x2="${f(x2 - nx*off)}" y2="${f(y2 - ny*off)}"/>`;
      if (o === 3) bonds += `<line class="mb" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`;
    } else {
      const sg = side > 0 ? 1 : -1, sh = d*0.12, s1 = lab[i] ? 0 : sh, s2 = lab[j] ? 0 : sh;
      bonds += `<line class="mb" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/><line class="mb" x1="${f(x1 + ux*s1 + nx*g*sg*1.25)}" y1="${f(y1 + uy*s1 + ny*g*sg*1.25)}" x2="${f(x2 - ux*s2 + nx*g*sg*1.25)}" y2="${f(y2 - uy*s2 + ny*g*sg*1.25)}"/>`;
    }
  });
  let x0 = 1e9, y0 = 1e9, x9 = -1e9, y9 = -1e9; const grow = (x, y) => { x0 = Math.min(x0, x); x9 = Math.max(x9, x); y0 = Math.min(y0, y); y9 = Math.max(y9, y); };
  P.forEach(p => grow(p[0], p[1]));
  A_.forEach((a, i) => { const L0 = lab[i]; const [x, y] = P[i];
    if (hl.has(i)) under += `<circle class="mhl" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(bl*0.32).toFixed(1)}"/>`;
    if (!L0) return;
    const cls = L0.ps ? 'mt mps' : 'mt' + (ELC[L0.sym] ? ' el-' + ELC[L0.sym] : '');
    if (L0.an){ const x1 = L0.an === 'start' ? x - cw*0.6 : x + cw*0.6;
      texts += `<text class="${cls}" x="${x1.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" text-anchor="${L0.an}" dominant-baseline="central">${esc(L0.sym)}</text>`;
      grow(x1, y - fs*0.6); grow(x1 + (L0.an === 'start' ? L0.tw : -L0.tw), y + fs*0.6); return; }
    texts += `<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" text-anchor="middle" dominant-baseline="central">${esc(L0.sym)}</text>`;
    grow(x - L0.w/2, y - fs*0.6); grow(x + L0.w/2, y + fs*0.6);
    if (L0.h){ const hT = `H<tspan font-size="${(fs*0.72).toFixed(1)}" dy="${(fs*0.28).toFixed(1)}">${subN(L0.h)}</tspan>`, hw = cw*(L0.h > 1 ? 1.6 : 1);
      let hx = x, hy = y, an = 'middle';
      if (L0.hs === 'r'){ hx = x + L0.w/2 - 0.5; an = 'start'; grow(hx + hw, y); }
      else if (L0.hs === 'l'){ hx = x - L0.w/2 + 0.5; an = 'end'; grow(hx - hw - 2, y); }
      else if (L0.hs === 'u'){ hy = y - fs*1.05; grow(x, hy - fs*0.6); } else { hy = y + fs*1.05; grow(x, hy + fs*0.7); }
      texts += `<text class="mt${ELC[L0.sym] ? ' el-' + ELC[L0.sym] : ''}" x="${hx.toFixed(1)}" y="${hy.toFixed(1)}" font-size="${fs}" text-anchor="${an}" dominant-baseline="central">${hT}</text>`; }
    if (L0.q){ let r = L0.w/2 + fs*0.35; if (L0.h && ((L0.hs === 'r' && Math.cos(L0.qa) > 0) || (L0.hs === 'l' && Math.cos(L0.qa) < 0))) r += cw*(L0.h > 1 ? 1.6 : 1);
      const qx = x + Math.cos(L0.qa)*r, qy = y + Math.sin(L0.qa)*fs*0.75;
      texts += `<text class="mq" x="${qx.toFixed(1)}" y="${qy.toFixed(1)}" font-size="${(fs*0.78).toFixed(1)}" text-anchor="middle" dominant-baseline="central">${chgTxt(L0.q)}</text>`; grow(qx - 5, qy - 6); grow(qx + 5, qy + 6); }
  });
  const pad = 6, W = x9 - x0 + 2*pad, H = y9 - y0 + 2*pad;
  return `<svg class="molsvg" viewBox="${(x0 - pad).toFixed(1)} ${(y0 - pad).toFixed(1)} ${W.toFixed(1)} ${H.toFixed(1)}" width="${Math.round(W)}" height="${Math.round(H)}" role="img" aria-label="${esc(opt.title || u('molOpt'))}">${under}${bonds}${texts}</svg>`;
}
function rxFig(a, b, bl){ return `<div class="rxfig"><div class="rxm">${molSVG(a, {bl})}</div><div class="rxarrow" aria-hidden="true">→</div><div class="rxm">${molSVG(b, {bl})}</div></div>`; }

/* ---------- question generators ---------- */
function distractIds(id, pool, k){ k = k || 3;
  const cf = (MOL[id].cf || []).filter(z => z !== id && pool.indexOf(z) >= 0);
  const same = shuffle(pool.filter(z => z !== id && famOf(z) === famOf(id) && cf.indexOf(z) < 0));
  const other = shuffle(pool.filter(z => z !== id && famOf(z) !== famOf(id) && cf.indexOf(z) < 0));
  const names = new Set([TEN(mName(id))]), out = [];
  shuffle(cf).concat(same, other).forEach(z => { const nm = TEN(mName(z)); if (out.length < k && !names.has(nm)){ names.add(nm); out.push(z); } });
  return out; }
const qNameT = tr("Name this molecule.", "Nommez cette molécule.", "Wie heißt dieses Molekül?");
function famPool(f){ return f === 'any' ? MIDS : inFam(f); }
function genName(f){ const pool = famPool(f), id = pick(pool), ds = distractIds(id, MIDS.filter(z => f === 'aa' ? famOf(z) === 'aa' : true));
  return {k:'mcq', q:qNameT, fig:molSVG(id), o:[mName(id)].concat(ds.map(mName)), x:L3(i => mName(id)[i] + ' – ' + mNote(id)[i]), mid:id}; }
function genPick(f){ const pool = famPool(f), id = pick(pool), ds = distractIds(id, f === 'aa' ? inFam('aa') : MIDS.filter(z => !hasPseudo(z) || hasPseudo(id)));
  const ids = [id].concat(ds);
  return {k:'mcq', q:L3(i => [`Which structure is ${mName(id)[0]}?`, `Quelle structure est ${mName(id)[1]} ?`, `Welche Struktur ist ${mName(id)[2]}?`][i]),
    o:ids.map(mName), figo:ids.map(z => molSVG(z, {bl:22})), fids:ids, x:L3(i => mName(id)[i] + ' – ' + mNote(id)[i]), mid:id}; }
function genRole(f){ const pool = famPool(f).filter(z => MOL[z].tags.length), id = pick(pool), t = pick(MOL[id].tags);
  const others = shuffle(Object.keys(MTAG).filter(k => MOL[id].tags.indexOf(k) < 0)).slice(0, 3);
  return {k:'mcq', q:tr("Where does this molecule mainly belong?", "À quoi cette molécule appartient-elle surtout ?", "Wohin gehört dieses Molekül hauptsächlich?"), fig:molSVG(id),
    o:[MTAG[t]].concat(others.map(k => MTAG[k])), x:L3(i => mName(id)[i] + ' – ' + mNote(id)[i]), mid:id}; }
function genCharge(f){ const pool = famPool(f).filter(z => !hasPseudo(z) && MOL[z].a.length < 40), id = pick(pool), q = MOL[id].q;
  const lab = v => v > 0 ? '+' + v : v < 0 ? '−' + Math.abs(v) : '0';
  const opts = shuffle([-4, -3, -2, -1, 0, 1, 2].filter(v => v !== q && Math.abs(v - q) <= 3)).slice(0, 3);
  const parts = []; Object.keys(MOL[id].g).forEach(g => { const c = {carbox:-1, pester:-2, enolp:-2, acylp:-2, ammon:1, quat:1, guan:1, sulfon:1}[g]; if (c) parts.push(`${MOL[id].g[g].length}× ${TEN(MGRP[g][0])}`); });
  return {k:'mcq', q:tr("What is the net charge of this molecule as drawn (pH 7.4)?", "Quelle est la charge nette de cette molécule telle que dessinée (pH 7,4) ?", "Welche Nettoladung hat dieses Molekül wie gezeichnet (pH 7,4)?"), fig:molSVG(id),
    o:[lab(q)].concat(opts.map(lab)), x:L3(i => `${mName(id)[i]}: ${MOL[id].f || ''} → ${lab(q)}. ` + [`Count: each –COO⁻ −1, each phosphate monoester −2, each –NH₃⁺ / guanidinium / N⁺(CH₃)₃ +1.`, `Comptez : chaque –COO⁻ −1, chaque phosphomonoester −2, chaque –NH₃⁺ / guanidinium / N⁺(CH₃)₃ +1.`, `Zähle: jedes –COO⁻ −1, jeder Phosphomonoester −2, jedes –NH₃⁺ / Guanidinium / N⁺(CH₃)₃ +1.`][i]), mid:id}; }
function genAAClass(){ const id = pick(inFam('aa')), a = AAI[id], c = a[3];
  return {k:'mcq', q:tr("Which class does this amino acid belong to?", "À quelle classe appartient cet acide aminé ?", "Zu welcher Klasse gehört diese Aminosäure?"), fig:molSVG(id),
    o:[AAC[c]].concat(shuffle(Object.keys(AAC).filter(k => k !== c)).slice(0, 3).map(k => AAC[k])), x:mNote(id), mid:id}; }
/* functional groups */
const GCONF = {thioester:['ester', 'amide', 'ketone'], ester:['thioester', 'ether', 'amide'], amide:['ureido', 'ester', 'ammon'], ureido:['amide', 'guan'], guan:['ureido', 'amide', 'ammon'],
  ald:['ketone', 'carbox', 'hydroxyl'], ketone:['ald', 'carbox', 'ester'], carbox:['ester', 'ald', 'ketone'], pester:['pdiester', 'panhyd', 'acylp'], pdiester:['pester', 'panhyd'],
  panhyd:['pester', 'pdiester', 'acylp'], acylp:['pester', 'panhyd', 'enolp'], enolp:['pester', 'acylp', 'alkene'], phamide:['pester', 'amide', 'guan'], anomer:['hydroxyl', 'ether', 'ester'],
  hydroxyl:['phenol', 'anomer', 'ether'], phenol:['hydroxyl', 'catechol'], catechol:['phenol', 'hydroxyl'], ammon:['quat', 'amide', 'guan'], quat:['ammon', 'sulfon'], thiol:['thioether', 'disulf', 'hydroxyl'],
  thioether:['thiol', 'disulf', 'ether'], disulf:['thiol', 'thioether'], sulfon:['quat', 'thioether'], imid:['indole', 'guan'], indole:['imid', 'phenol'], alkene:['ketone', 'enolp'], ether:['ester', 'hydroxyl', 'anomer'], nglyc:['anomer', 'ether', 'amide']};
function genGroupId(){ const id = pick(MIDS.filter(z => Object.keys(MOL[z].g).length)), gs = Object.keys(MOL[id].g), g = pick(gs), at = pick(MOL[id].g[g]);
  const conf = (GCONF[g] || []).filter(k => gs.indexOf(k) < 0 || true).filter(k => MGRP[k] && k !== g);
  const rest = shuffle(Object.keys(MGRP).filter(k => k !== g && conf.indexOf(k) < 0));
  const ds = shuffle(conf).concat(rest).slice(0, 3);
  return {k:'mcq', q:tr("What is the highlighted group?", "Quel est le groupe surligné ?", "Welche Gruppe ist markiert?"), fig:molSVG(id, {hl:at}), hl:at,
    o:[MGRP[g][0]].concat(ds.map(k => MGRP[k][0])), x:L3(i => `${tx(MGRP[g][1], i)} (${mName(id)[i]})`), mid:id, grp:g}; }
function genGroupFind(){ const g = pick(Object.keys(MGRP).filter(k => MIDS.some(z => MOL[z].g[k]) && MIDS.filter(z => !MOL[z].g[k] && !hasPseudo(z)).length > 3));
  const yes = pick(MIDS.filter(z => MOL[z].g[g] && MOL[z].a.length < 36)), no = shuffle(MIDS.filter(z => !MOL[z].g[g] && MOL[z].a.length < 36 && z !== yes));
  const conf = (GCONF[g] || []); no.sort((a, b) => (conf.some(k => MOL[b].g[k]) ? 1 : 0) - (conf.some(k => MOL[a].g[k]) ? 1 : 0));
  const ids = [yes].concat(no.slice(0, 3));
  return {k:'mcq', q:L3(i => [`Which molecule contains: ${tx(MGRP[g][0], 0)}?`, `Quelle molécule contient : ${tx(MGRP[g][0], 1)} ?`, `Welches Molekül enthält: ${tx(MGRP[g][0], 2)}?`][i]),
    o:ids.map(mName), figo:ids.map(z => molSVG(z, {bl:22})), fids:ids, x:L3(i => `${mName(yes)[i]} – ${tx(MGRP[g][1], i)}`), mid:yes, grp:g}; }
/* reactions */
const RXEXCL = {oxdecarb:['ox', 'decarb'], decarbphos:['decarb', 'phos'], oxphos:['ox', 'phos'], slp:['dephos', 'hydrol'], dephos:['hydrol', 'slp'], hydrol:['dephos'], hydrox:['ox'], ox:['hydrox'], deiod:['red'], red:['deiod'], cycl:['hydrol']};
function rxX(r){ return L3(i => `${mName(r[0])[i]} → ${mName(r[1])[i]}: ${tx(MRT[r[2]], i)}. ${tx(r[3], i)}.`); }
function genRxType(){ const r = pick(MRX), ex = (RXEXCL[r[2]] || []).concat([r[2]]);
  const ds = shuffle(Object.keys(MRT).filter(k => ex.indexOf(k) < 0)).slice(0, 3);
  return {k:'mcq', q:tr("What kind of reaction is this?", "De quel type de réaction s'agit-il ?", "Welche Art von Reaktion ist das?"), fig:rxFig(r[0], r[1], 24), rx:[r[0], r[1]], o:[MRT[r[2]]].concat(ds.map(k => MRT[k])), x:rxX(r)}; }
function genRxEnz(){ const r = pick(MRX), ds = shuffle(MRX.filter(z => z[3] !== r[3] && !(z[0] === r[1] && z[1] === r[0]))).slice(0, 3);
  return {k:'mcq', q:tr("Which enzyme catalyses this step?", "Quelle enzyme catalyse cette étape ?", "Welches Enzym katalysiert diesen Schritt?"), fig:rxFig(r[0], r[1], 24), rx:[r[0], r[1]],
    o:[r[3]].concat(ds.map(z => z[3])), x:rxX(r)}; }
function genRxProduct(){ const r = pick(MRX), ds = distractIds(r[1], MIDS.filter(z => z !== r[0] && (!hasPseudo(z) || hasPseudo(r[1]))));
  const ids = [r[1]].concat(ds);
  return {k:'mcq', q:L3(i => [`${mName(r[0])[0]} undergoes ${tx(MRT[r[2]], 0).toLowerCase()}. Which structure is the product?`, `${mName(r[0])[1]} subit : ${tx(MRT[r[2]], 1).toLowerCase()}. Quelle structure est le produit ?`, `${mName(r[0])[2]} durchläuft: ${tx(MRT[r[2]], 2)}. Welche Struktur ist das Produkt?`][i]),
    fig:molSVG(r[0]), mid:r[0], o:ids.map(mName), figo:ids.map(z => molSVG(z, {bl:22})), fids:ids, x:rxX(r)}; }

const B5T = {}; Object.keys(MFAM).forEach(k => B5T[k] = MFAM[k]);
B5T.grp = "Functional groups|Groupes fonctionnels|Funktionelle Gruppen"; B5T.rxn = "Reactions: what changed?|Réactions : qu'est-ce qui change ?|Reaktionen: was ändert sich?";
const B5BANK = [];
Object.keys(MFAM).forEach(f => {
  B5BANK.push({t:f, w:f === 'aa' ? 4 : 3, gen:() => genName(f)}, {t:f, w:2, gen:() => genPick(f)});
  if (inFam(f).some(z => MOL[z].tags.length)) B5BANK.push({t:f, w:1, gen:() => genRole(f)});
  if (['aa', 'gly', 'tca', 'nit', 'sig'].indexOf(f) >= 0) B5BANK.push({t:f, w:1, gen:() => genCharge(f)});
});
B5BANK.push({t:'aa', w:2, gen:genAAClass}, {t:'grp', w:4, gen:genGroupId}, {t:'grp', w:2, gen:genGroupFind},
  {t:'rxn', w:3, gen:genRxType}, {t:'rxn', w:2, gen:genRxEnz}, {t:'rxn', w:2, gen:genRxProduct});
B5BANK.forEach(e => { const g = e.gen; e.gen = () => Object.assign(g(), {kl:'kstruct'}); });
bxDrill('molecules', 'b5', 'B5', 'bio', B5T, B5BANK);

/* ---------- atlas + mode switch ---------- */
function b5State(){ if (!S.molecules){ S.molecules = {topic:'any'}; newBX('molecules'); } const s = S.molecules; if (!s.mode) s.mode = 'quiz'; if (!s.af) s.af = 'aa'; return s; }
function b5Bar(s){
  return `<div class="controls molbar">${segmented(u('molView'), [['quiz', U.molQuiz], ['atlas', U.molAtlas]], s.mode, 'b5mode')}${segmented(u('molDraw'), [['skel', U.molSkel], ['full', U.molFull]], MOLC, 'b5draw')}</div>`; }
function atlasDetail(id, g){ const m = MOL[id];
  const gs = Object.keys(m.g), hl = g && m.g[g] ? [].concat(...m.g[g]) : [];
  let h = `<div class="card molcard" id="molbig"><div class="molhead"><h3>${esc(T(mName(id)))}</h3><button type="button" class="btn" data-act="b5open" data-v="">${u('molClose')}</button></div>`;
  const na = m.a.length, big = na < 14 ? 48 : na < 26 ? 40 : 32;
  h += `<figure class="fig molfig">${molSVG(id, {bl:big, hl, title:T(mName(id))})}</figure>`;
  h += `<p class="molfacts">${m.f ? `<span><strong>${u('molFormula')}:</strong> ${m.f}</span>` : ''}<span><strong>${u('molCharge')}:</strong> ${m.q > 0 ? '+' + m.q : m.q < 0 ? '−' + Math.abs(m.q) : '0'}</span><span><strong>${u('molCarbons')}:</strong> ${m.c}</span></p>`;
  if (gs.length) h += `<p class="mollab">${u('molGroups')}</p><div class="libchips">` + gs.map(k => `<button type="button" class="libchip${k === g ? ' on' : ''}" data-act="b5grp" data-v="${k}" aria-pressed="${k === g}">${esc(T(MGRP[k][0]))}${m.g[k].length > 1 ? ` <span>×${m.g[k].length}</span>` : ''}</button>`).join('') + `</div>`;
  if (g && MGRP[g]) h += `<p class="note">${esc(T(MGRP[g][1]))}</p>`;
  h += `<p class="expl">${esc(T(mNote(id)))}</p>`;
  if (m.tags.length) h += `<p><strong>${u('molPaths')}:</strong> ${m.tags.map(t => esc(T(MTAG[t]))).join(' · ')}</p>`;
  const cf = (m.cf || []).filter(z => MOL[z]);
  if (cf.length) h += `<p class="mollab">${u('molConf')}</p><div class="libchips">` + cf.map(z => `<button type="button" class="libchip" data-act="b5open" data-v="${z}">${esc(T(mName(z)))}</button>`).join('') + `</div>`;
  if (hasPseudo(id)) h += `<p class="note">${u('molPseudo')}</p>`;
  if (m.b.some(b => b[3])) h += `<p class="note">${u('molStereo')}</p>`;
  return h + `</div>`; }
function atlasHTML(s){
  let h = `<div class="controls"><label class="field"><span>${u('molFam')}</span><select data-chg="b5fam" id="sel-b5fam">` + Object.keys(MFAM).map(k => `<option value="${k}"${k === s.af ? ' selected' : ''}>${esc(T(MFAM[k]))}</option>`).join('')
    + `<option value="all"${s.af === 'all' ? ' selected' : ''}>${esc(u('molAll'))}</option></select></label></div>`;
  if (s.open && MOL[s.open]) h += atlasDetail(s.open, s.og); else h += `<p class="note">${u('molPick')}</p>`;
  const ids = s.af === 'all' ? MIDS : inFam(s.af);
  h += `<div class="molgrid">` + ids.map(id => `<button type="button" class="molcell${id === s.open ? ' on' : ''}" data-act="b5open" data-v="${id}"><span class="molthumb">${molSVG(id, {bl:16, title:T(mName(id))})}</span><span class="molname">${esc(T(mName(id)))}</span></button>`).join('') + `</div>`;
  return h; }
RENDER.molecules = function(){ const s = b5State(); return b5Bar(s) + (s.mode === 'atlas' ? atlasHTML(s) : renderBX('molecules')); };
Object.assign(A, {
  b5mode(el){ const s = b5State(); s.mode = el.dataset.v; render(); },
  b5draw(el){ MOLC = el.dataset.v; store.set('molC', MOLC); const s = b5State(), it = s.it;
    if (it){ if (it.rx) it.fig = rxFig(it.rx[0], it.rx[1], 24); else if (it.mid && it.fig) it.fig = molSVG(it.mid, {hl:it.hl}); if (it.fids) it.figo = it.fids.map(z => molSVG(z, {bl:22})); }
    render(); },
  b5open(el){ const s = b5State(); s.open = el.dataset.v || null; s.og = null; SCROLL = s.open ? '#molbig' : null; render(); },
  b5grp(el){ const s = b5State(); s.og = s.og === el.dataset.v ? null : el.dataset.v; render(); }
});
Object.assign(CHG, { b5fam(el){ const s = b5State(); s.af = el.value; render(); } });
