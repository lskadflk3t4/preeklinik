
/* ===================== VISUAL DIAGRAMS =====================
   V1 Pathway diagrams – every pathway in P drawn automatically as an SVG diagram (straight, branched or cycle layout),
      colour-coded by compartment; Study mode (tap a step to see what it does) or fill gaps from a word bank.
   V2 Organ maps – hand-drawn inter-organ diagrams with gaps, plus a tappable body map. */
Object.assign(U, {
  v1t:"Pathway diagrams|Schémas des voies|Stoffwechsel-Diagramme",
  v1d:"Every pathway drawn as a real diagram, coloured by compartment. Study it step by step, then fill the empty boxes and enzyme labels from a word bank.|Chaque voie dessinée comme un vrai schéma, coloré par compartiment. Étudiez-la étape par étape, puis remplissez les cases vides et les enzymes à partir d'une banque de mots.|Jeder Stoffwechselweg als echtes Diagramm, farbig nach Kompartiment. Schritt für Schritt lernen, dann leere Kästchen und Enzyme aus einer Wortbank füllen.",
  v2t:"Organ maps|Cartes des organes|Organkarten",
  v2d:"How organs feed each other: fed state, fasting, starvation, Cori and glucose–alanine cycles, nitrogen, lipoproteins, ketones, bilirubin. Fill the gaps, or tap the right organs on a body map.|Comment les organes s'alimentent entre eux : état nourri, jeûne, inanition, cycles de Cori et glucose–alanine, azote, lipoprotéines, cétones, bilirubine. Remplissez les trous ou touchez les bons organes sur une carte du corps.|Wie Organe sich gegenseitig versorgen: gefütterter Zustand, Fasten, Hungern, Cori- und Glucose-Alanin-Zyklus, Stickstoff, Lipoproteine, Ketone, Bilirubin. Lücken füllen oder die richtigen Organe auf einer Körperkarte antippen.",
  vMode:"Mode|Mode|Modus", vStudy:"Study|Étudier|Lernen", vMol:"Molecules|Molécules|Moleküle", vEnz:"Enzymes|Enzymes|Enzyme", vMix:"Mixed|Mixte|Gemischt",
  vGaps:"Gaps|Trous|Lücken", vAll:"All|Tous|Alle",
  vTap:"Tap a ? box in the diagram, then pick its label below.|Touchez une case ? du schéma, puis choisissez son étiquette ci-dessous.|Tippe auf ein ?-Feld im Diagramm und wähle unten die passende Beschriftung.",
  vFor:"Filling gap {n}|Trou {n} sélectionné|Lücke {n} ausgewählt",
  vBankLbl:"Labels|Étiquettes|Beschriftungen",
  vNew:"New gaps|Nouveaux trous|Neue Lücken", vOther:"Another one|Un autre|Ein anderes", vTest:"Test me on this|Me tester dessus|Teste mich",
  vSwipe:"Swipe sideways to see the whole diagram.|Faites glisser latéralement pour voir tout le schéma.|Seitlich wischen, um das ganze Diagramm zu sehen.",
  vStudyTip:"Tap any enzyme box to see what that step does in simple words.|Touchez une enzyme pour voir ce que fait cette étape, en termes simples.|Tippe auf ein Enzym-Kästchen, um einfach erklärt zu sehen, was dieser Schritt macht.",
  vYou:"Gap {g}: you put “{a}” – correct: “{b}”|Trou {g} : vous avez mis « {a} » – correct : « {b} »|Lücke {g}: du hast „{a}“ gesetzt – richtig: „{b}“",
  vLgIrr:"thick arrow = irreversible|flèche épaisse = irréversible|dicker Pfeil = irreversibel", vLgRl:"⏱ rate-limiting|⏱ étape limitante|⏱ geschwindigkeitsbestimmend",
  vLgGap:"gap to fill|trou à remplir|zu füllende Lücke", vLgSide:"grey text = what else goes in or out|texte gris = ce qui entre ou sort en plus|graue Schrift = was sonst noch hinein- oder herausgeht",
  vTabMaps:"Organ maps|Cartes des organes|Organkarten", vTabBody:"Body map|Carte du corps|Körperkarte", vMap:"Map|Carte|Karte",
  vBodyQ:"Tap every organ that fits, then Check.|Touchez chaque organe qui convient, puis Vérifier.|Tippe alle passenden Organe an, dann Prüfen.",
  vPickOrg:"Tap at least one organ first.|Touchez d'abord au moins un organe.|Tippe zuerst mindestens ein Organ an.",
  vMissed:"missed|oublié|vergessen", vAlso:"also acceptable|aussi accepté|auch richtig",
  vKeyOrg:"Arrows show what travels between organs; the band in the middle is the blood.|Les flèches montrent ce qui circule entre les organes ; la bande du milieu est le sang.|Pfeile zeigen, was zwischen Organen wandert; das Band in der Mitte ist das Blut.",
  vAskV1:"Rebuild the diagram of {p}: put each missing molecule or enzyme back in its box.|Reconstituer le schéma de {p} : remettre chaque molécule ou enzyme manquante dans sa case.|Das Diagramm von {p} wiederherstellen: jedes fehlende Molekül oder Enzym in sein Kästchen setzen.",
  vHowV1:"Read along the arrows. The box before a gap, the enzyme name on the arrow (kinase = adds phosphate, dehydrogenase = makes NADH…) and the grey ‘what goes in/out’ text together tell you what must be missing.|Suivez les flèches. La case avant le trou, le nom de l'enzyme sur la flèche (kinase = ajoute un phosphate, déshydrogénase = fabrique du NADH…) et le texte gris « entre/sort » indiquent ensemble ce qui manque.|Folge den Pfeilen. Das Kästchen vor der Lücke, der Enzymname am Pfeil (Kinase = hängt Phosphat an, Dehydrogenase = bildet NADH …) und der graue „rein/raus“-Text verraten zusammen, was fehlt.",
  vAskV2:"Complete the organ map “{m}”: which molecule, process or enzyme belongs in each empty box?|Compléter la carte « {m} » : quelle molécule, quel processus ou quelle enzyme va dans chaque case vide ?|Die Organkarte „{m}“ vervollständigen: Welches Molekül, welcher Prozess oder welches Enzym gehört in jedes leere Kästchen?",
  vHowV2:"Ask two questions for each gap: which organ am I in (what can this organ do?), and what is travelling along the arrow (what does the next organ need?). Hormone state (insulin vs glucagon) decides the direction of most arrows.|Pour chaque trou, posez deux questions : dans quel organe suis-je (que sait-il faire ?) et qu'est-ce qui circule sur la flèche (de quoi l'organe suivant a-t-il besoin ?). L'état hormonal (insuline vs glucagon) décide du sens de la plupart des flèches.|Stell dir bei jeder Lücke zwei Fragen: In welchem Organ bin ich (was kann es?), und was wandert entlang des Pfeils (was braucht das nächste Organ?). Der Hormonstatus (Insulin vs. Glukagon) bestimmt die Richtung der meisten Pfeile.",
  vAskBody:"Find every organ that matches the description.|Trouver tous les organes qui correspondent à la description.|Alle Organe finden, auf die die Beschreibung passt.",
  vHowBody:"Think of each organ's ‘equipment’: mitochondria? glucose-6-phosphatase? GLUT4? SCOT? urea-cycle enzymes? If an organ lacks the tool, it cannot do the job.|Pensez à « l'équipement » de chaque organe : mitochondries ? glucose-6-phosphatase ? GLUT4 ? SCOT ? enzymes du cycle de l'urée ? Sans l'outil, l'organe ne peut pas faire le travail.|Denk an die „Ausrüstung“ jedes Organs: Mitochondrien? Glucose-6-Phosphatase? GLUT4? SCOT? Harnstoffzyklus-Enzyme? Fehlt das Werkzeug, kann das Organ die Aufgabe nicht erledigen."
});
DR.push({id:'diagrams', k:'v1', n:10}, {id:'organmap', k:'v2', n:11});

/* ---------- text helpers for SVG ---------- */
function vWrap(s, max){
  const toks = [];
  String(s).split(/\s+/).filter(Boolean).forEach(w => {
    while (w.length > max){ let k = Math.max(w.lastIndexOf('-', max - 1), w.lastIndexOf('/', max - 1)); if (k < 3) k = max - 2; toks.push(w.slice(0, k + 1)); w = w.slice(k + 1); }
    toks.push(w); });
  const lines = []; let cur = '';
  toks.forEach(t => { const glue = cur && !/[-\/]$/.test(cur) ? ' ' : ''; if (cur && (cur + glue + t).length > max){ lines.push(cur); cur = t; } else cur = cur + glue + t; });
  if (cur) lines.push(cur);
  return lines.length ? lines : [''];
}
const vTW = (line, fs) => line.length*fs*0.56;
function vTokLine(line){ return typeof TOK_RE !== 'undefined' ? esc(line).replace(TOK_RE, (m, pre, tk) => pre + `<tspan class="stk stk-${TOK_CLS[tk]}">${tk}</tspan>`) : esc(line); }
/* lines centred on (x, y0 = baseline of first line) */
function vText(lines, x, y0, lh, cls, tok){ return `<text class="${cls}" x="${x}" y="${y0}" text-anchor="middle">` + lines.map((l, i) => `<tspan x="${x}"${i ? ` dy="${lh}"` : ''}>${tok ? vTokLine(l) : esc(l)}</tspan>`).join('') + `</text>`; }
function enzShort(id){ const s = enz(id); const m = s.match(/^(.*?)\s*\(([^)]*)\)\s*$/); return m && /\s/.test(m[2]) && m[1].length > 2 ? m[1] : s; }
function vMarkers(){ return `<defs>` + ['c', 'm', 'imm', 'omm', 'er', 'ly', 'x', 'ink', 'good', 'bad'].map(k =>
  `<marker id="vah-${k}" viewBox="0 0 10 10" refX="8.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path class="vah vah-${k}" d="M0,0 L10,5 L0,10 z"/></marker>`).join('') + `</defs>`; }
const vLocK = l => LOCCLS[l] || 'x';
function vBez(p0, p1, p2, p3, t){ const u1 = 1 - t; return [0, 1].map(k => u1*u1*u1*p0[k] + 3*u1*u1*t*p1[k] + 3*u1*t*t*p2[k] + t*t*t*p3[k]); }

/* ---------- pathway layout ---------- */
const V_FS = 12.5, V_LH = 15, P_FS = 11.5, P_LH = 13.5, S_FS = 10.5, S_LH = 12.5;
function vPill(p, i, maxW){ const s = p.st[i], ch = Math.max(10, Math.floor((maxW - 16)/(P_FS*0.56)));
  const el = vWrap(enzShort(s[2]), ch).slice(0, 4), sl = s[3] ? vWrap(T(s[3]), Math.floor((maxW - 16)/(S_FS*0.56))).slice(0, 4) : [];
  const rl = s[5] && s[5].indexOf('r') >= 0; if (rl) el[0] = '⏱ ' + el[0];
  const w = Math.min(maxW, Math.max(56, ...el.map(l => vTW(l, P_FS)), ...sl.map(l => vTW(l, S_FS))) + 16);
  return {el, sl, w, h:8 + el.length*P_LH + (sl.length ? 3 + sl.length*S_LH : 0) + 5, rl}; }
function vNodeBox(id, w){ const lines = vWrap(mol(id), Math.floor((w - 16)/(V_FS*0.56))).slice(0, 4); return {lines, w, h:12 + lines.length*V_LH}; }

function vLayoutPW(p){
  const st = p.st, n = st.length, chain = st.every((s, i) => i === 0 || s[0] === st[i - 1][1]);
  return p.cyc && chain ? vLayoutCyc(p, st[n - 1][1] === st[0][0]) : vLayoutDag(p);
}
function vLayoutDag(p){
  const st = p.st, idx = {}, nodes = [];
  const add = id => { if (idx[id] == null){ idx[id] = nodes.length; nodes.push({id}); } return idx[id]; };
  st.forEach(s => { add(s[0]); add(s[1]); });
  const E = st.map((s, i) => ({i, a:idx[s[0]], b:idx[s[1]]}));
  const rank = nodes.map(() => 0);
  for (let it = 0; it < nodes.length + 2; it++) E.forEach(e => { if (rank[e.b] < rank[e.a] + 1) rank[e.b] = rank[e.a] + 1; });
  for (let it = 0; it < 4; it++) for (let j = nodes.length - 1; j >= 0; j--){ const ch = E.filter(e => e.a === j).map(e => rank[e.b]); if (ch.length){ const r = Math.min(...ch) - 1; if (r > rank[j]) rank[j] = r; } }
  const col = nodes.map(() => null), occ = {}; const free = (c, r) => !occ[r + ':' + c];
  st.forEach((s, i) => { if (i > 0 && s[0] === st[i - 1][1]) return;
    const fresh = []; if (col[idx[s[0]]] == null) fresh.push(idx[s[0]]);
    for (let k = i; k < st.length && (k === i || st[k][0] === st[k - 1][1]); k++){ const b = idx[st[k][1]]; if (col[b] == null && fresh.indexOf(b) < 0) fresh.push(b); }
    let c = col[idx[s[0]]] != null ? col[idx[s[0]]] : 0;
    while (!fresh.every(j => free(c, rank[j]))) c++;
    fresh.forEach(j => { col[j] = c; occ[rank[j] + ':' + c] = 1; }); });
  const nc = Math.max(...col) + 1, colW = nc > 1 ? 196 : 300, nw = nc > 1 ? 168 : 224, pw = colW - 14;
  nodes.forEach(nd => Object.assign(nd, vNodeBox(nd.id, nw)));
  E.forEach(e => e.pill = vPill(p, e.i, pw));
  const nr = Math.max(...rank) + 1, rowH = [], gap = [];
  for (let r = 0; r < nr; r++){ rowH[r] = Math.max(30, ...nodes.filter((_, j) => rank[j] === r).map(nd => nd.h));
    gap[r] = Math.max(44, ...E.filter(e => rank[e.a] === r || rank[e.b] === r + 1).map(e => e.pill.h + (col[e.a] === col[e.b] ? 40 : 84))); }
  const ry = []; let y = 12; for (let r = 0; r < nr; r++){ ry[r] = y + rowH[r]/2; y += rowH[r] + gap[r]; }
  const W = nc*colW + 16, H = y - gap[nr - 1] + 14;
  nodes.forEach((nd, j) => { nd.x = 8 + col[j]*colW + colW/2; nd.y = ry[rank[j]]; });
  E.forEach(e => { const A = nodes[e.a], B = nodes[e.b], x1 = A.x, y1 = A.y + A.h/2, x2 = B.x, y2 = B.y - B.h/2 - 2;
    if (Math.abs(x1 - x2) < 1){ e.d = `M${x1},${y1} L${x2},${y2}`; e.px = x1; e.py = (y1 + y2)/2; return; }
    /* diagonal: keep the enzyme box in a column where it cannot collide – under the source unless the source also branches straight down */
    const srcBusy = E.some(f => f !== e && f.a === e.a && col[f.b] === col[e.a]);
    if (!srcBusy){ const py = y1 + gap[rank[e.a]]/2 - 6, my = (py + e.pill.h/2 + y2)/2; e.px = x1; e.py = py;
      e.d = `M${x1},${y1} L${x1},${py + e.pill.h/2} C${x1},${my} ${x2},${my} ${x2},${y2}`; }
    else { const py = y2 + 2 - gap[rank[e.b] - 1]/2 + 6, my = (y1 + py - e.pill.h/2)/2; e.px = x2; e.py = py;
      e.d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${py - e.pill.h/2} L${x2},${y2}`; } });
  return {nodes, edges:E, W, H, wide:nc > 1};
}
function vLayoutCyc(p, closed){
  const st = p.st, ids = st.map(s => s[0]); if (!closed) ids.push(st[st.length - 1][1]);
  const N = ids.length, R = Math.ceil(N/2), colW = 168, nw = 146, W = 2*colW + 24;
  const xr = 12 + colW*1.5, xl = 12 + colW/2;
  const nodes = ids.map((id, j) => Object.assign({id}, vNodeBox(id, nw), j < R ? {c:1, r:j} : {c:0, r:R - 1 - (j - R)}));
  const E = st.map((s, i) => ({i, a:i, b:(i + 1) % N, pill:vPill(p, i, colW - 8)}));
  if (!closed) E[E.length - 1].b = N - 1;
  const vert = e => nodes[e.a].c === nodes[e.b].c;
  const rowH = [], gap = [];
  for (let r = 0; r < R; r++){ rowH[r] = Math.max(30, ...nodes.filter(nd => nd.r === r).map(nd => nd.h));
    gap[r] = Math.max(44, ...E.filter(e => vert(e) && Math.min(nodes[e.a].r, nodes[e.b].r) === r).map(e => e.pill.h + 40)); }
  const top = E.find(e => !vert(e) && nodes[e.a].c === 0), bot = E.find(e => !vert(e) && nodes[e.a].c === 1);
  const topH = top ? top.pill.h + 34 : 6, botH = bot ? bot.pill.h + 34 : 6;
  const ry = []; let y = 10 + topH; for (let r = 0; r < R; r++){ ry[r] = y + rowH[r]/2; y += rowH[r] + (r < R - 1 ? gap[r] : 0); }
  const H = y + botH + 8;
  nodes.forEach(nd => { nd.x = nd.c ? xr : xl; nd.y = ry[nd.r]; });
  E.forEach(e => { const A = nodes[e.a], B = nodes[e.b];
    if (vert(e)){ const down = B.y > A.y, x = A.x, y1 = down ? A.y + A.h/2 : A.y - A.h/2, y2 = down ? B.y - B.h/2 - 2 : B.y + B.h/2 + 2;
      e.d = `M${x},${y1} L${x},${y2}`; e.px = x; e.py = (y1 + y2)/2; }
    else if (e === bot){ const y1 = A.y + A.h/2, y2 = B.y + B.h/2 + 2, lane = Math.max(y1, y2) + botH - 6;
      const P0 = [A.x, y1], P1 = [A.x, lane], P2 = [B.x, lane], P3 = [B.x, y2]; e.d = `M${P0} C${P1} ${P2} ${P3}`; const m = vBez(P0, P1, P2, P3, .5); e.px = m[0]; e.py = m[1]; }
    else { const y1 = A.y - A.h/2, y2 = B.y - B.h/2 - 2, lane = Math.min(y1, y2) - topH + 6;
      const P0 = [A.x, y1], P1 = [A.x, lane], P2 = [B.x, lane], P3 = [B.x, y2]; e.d = `M${P0} C${P1} ${P2} ${P3}`; const m = vBez(P0, P1, P2, P3, .5); e.px = m[0]; e.py = m[1]; } });
  let back = null;
  if (!closed){ const last = nodes[N - 1], nm = TEN(M[last.id]).toLowerCase(), k = st.findIndex(s => s[3] && TEN(s[3]).toLowerCase().indexOf(nm) >= 0);
    const tgt = k >= 0 ? E[k] : null;
    if (tgt){ const x1 = last.x + last.w/2, y1 = last.y, x2 = tgt.px - tgt.pill.w/2 - 2, y2 = tgt.py; back = `M${x1},${y1} C${(x1 + x2)/2},${y1} ${(x1 + x2)/2},${y2} ${x2},${y2}`; } }
  return {nodes, edges:E, W, H, wide:false, back};
}

/* ---------- pathway SVG ---------- */
function vPathSVG(p, o){ o = o || {}; const Lo = vLayoutPW(p), G = o.B || {}, num = o.num || {};
  let s = `<svg class="vdg" viewBox="0 0 ${Lo.W} ${Lo.H}" width="${Lo.W}" height="${Lo.H}" role="img" aria-label="${esc(T(p.n))}">${vMarkers()}`;
  Lo.edges.forEach(e => { const st = p.st[e.i], lk = vLocK(stepLoc(p, st)), irr = st[5] && st[5].indexOf('i') >= 0;
    s += `<path class="ve loc-${lk}${irr ? ' irr' : ''}" d="${e.d}" marker-end="url(#vah-${lk})"/>`; });
  if (Lo.back) s += `<path class="ve back" d="${Lo.back}" marker-end="url(#vah-x)"/>`;
  const badge = (x, y, k) => num[k] ? `<g class="vbadge"><circle cx="${x}" cy="${y}" r="10"/><text x="${x}" y="${y + 4}" text-anchor="middle">${num[k]}</text></g>` : '';
  const gapCls = k => { const b = G[k]; if (!b) return ''; return ' gap' + (b.state ? ' ' + b.state : b.val != null ? ' filled' : '') + (o.active === k ? ' sel' : ''); };
  const gapLbl = (k, kind) => { const b = G[k]; if (b.state) return kind === 'm' ? mol(b.ans) : enzShort(b.ans); if (b.val != null){ const c = o.bank.find(x => x.u === b.val); return c ? (kind === 'm' ? mol(c.v) : enzShort(c.v)) : '?'; } return '?'; };
  Lo.edges.forEach(e => { const k = 'e' + e.i, pl = e.pill, x = e.px, y0 = e.py - pl.h/2, st = p.st[e.i];
    let el = pl.el; if (G[k]) el = vWrap(gapLbl(k, 'e'), Math.max(10, Math.floor((pl.w - 16)/(P_FS*0.56)))).slice(0, 4);
    const h = G[k] ? Math.max(pl.h, 8 + el.length*P_LH + (pl.sl.length ? 3 + pl.sl.length*S_LH : 0) + 5) : pl.h, w = pl.w;
    const act = G[k] && !o.checked ? ` data-act="v1gap" data-k="${k}" tabindex="0" role="button"` : (o.study ? ` data-act="v1step" data-i="${e.i}" tabindex="0" role="button"` : '');
    s += `<g class="vp${pl.rl ? ' rl' : ''}${gapCls(k)}${o.study && o.focus === e.i ? ' sel' : ''}"${act}><rect x="${x - w/2}" y="${y0}" width="${w}" height="${h}" rx="7"/>`
      + vText(el, x, y0 + 7 + P_FS*0.85, P_LH, 'vpe' + (G[k] && !G[k].val && !G[k].state ? ' q' : ''))
      + (pl.sl.length ? vText(pl.sl, x, y0 + 8 + el.length*P_LH + 3 + S_FS*0.85, S_LH, 'vps', true) : '') + `</g>` + badge(x - w/2, y0, k);
    void st; });
  Lo.nodes.forEach((nd, j) => { const k = 'n' + j; let lines = nd.lines; if (G[k]) lines = vWrap(gapLbl(k, 'm'), Math.floor((nd.w - 16)/(V_FS*0.56))).slice(0, 4);
    const h = Math.max(nd.h, 12 + lines.length*V_LH), y0 = nd.y - h/2;
    const act = G[k] && !o.checked ? ` data-act="v1gap" data-k="${k}" tabindex="0" role="button"` : '';
    s += `<g class="vn${gapCls(k)}"${act}><rect x="${nd.x - nd.w/2}" y="${y0}" width="${nd.w}" height="${h}" rx="10"/>` + vText(lines, nd.x, y0 + 6 + V_FS*0.9, V_LH, 'vnt' + (G[k] && !G[k].val && !G[k].state ? ' q' : '')) + `</g>` + badge(nd.x - nd.w/2, y0, k); });
  return {svg:s + `</svg>`, Lo};
}
function vLegend(p, gaps){ return `<div class="vleg"><span><i class="vl-irr"></i>${u('vLgIrr')}</span><span>${u('vLgRl')}</span><span><i class="vl-side">ATP</i>${u('vLgSide')}</span>${gaps ? `<span><i class="vl-gap">?</i>${u('vLgGap')}</span>` : ''}</div>` + legendHTML(p); }

/* ---------- word bank (shared by V1 and V2) ---------- */
function vBankHTML(s, groups, act, lbl){
  const used = {}; Object.keys(s.B).forEach(k => { if (s.B[k].val != null) used[s.B[k].val] = k; });
  const ak = s.active && s.B[s.active] ? s.B[s.active].kind : null;
  let h = `<div class="vbank" role="group" aria-label="${esc(u('vBankLbl'))}">`;
  groups.forEach(g => { const items = s.bank.filter(c => !g.kind || c.kind === g.kind); if (!items.length) return;
    if (groups.length > 1) h += `<div class="vbh">${esc(T(g.n))}</div>`;
    h += `<div class="vchips">` + items.map(c => { const isUsed = used[c.u] != null, off = ak && g.kind && ak !== g.kind;
      return `<button type="button" class="vchip ${(c.k2 || c.kind) === 'e' || (c.k2 || c.kind) === 'p' ? 'ke' : (c.k2 || c.kind) === 'h' ? 'kh' : 'km'}${isUsed ? ' used' : ''}" data-act="${act}" data-u="${c.u}"${off ? ' disabled' : ''}>${esc(lbl(c))}${isUsed ? `<span class="vchipn">${s.num[used[c.u]]}</span>` : ''}</button>`; }).join('') + `</div>`; });
  return h + `</div>`;
}
function vAssign(s, uid){
  const c = s.bank.find(x => x.u === uid); if (!c) return;
  let k = s.active && s.B[s.active] && s.B[s.active].kind === c.kind ? s.active : null;
  const prev = Object.keys(s.B).find(x => s.B[x].val === uid);
  if (!k && prev){ s.B[prev].val = null; s.active = prev; return; }       // tapping a used chip without a target frees it
  if (!k) k = s.order.find(x => s.B[x].kind === c.kind && s.B[x].val == null);
  if (!k) return;
  if (prev && prev !== k) s.B[prev].val = null;
  s.B[k].val = uid; s.msg = null;
  const i = s.order.indexOf(k), rest = s.order.slice(i + 1).concat(s.order.slice(0, i));
  s.active = rest.find(x => s.B[x].val == null) || null;
}
function vPool(list, exclude, k){ const seen = {}; exclude.forEach(x => seen[x] = 1); const out = [];
  shuffle(list).forEach(x => { const key = x.key; if (seen[key]) return; seen[key] = 1; out.push(x); }); return out.slice(0, k); }

/* ---------- V1 state & render ---------- */
function newV1(pid, mode, cnt){
  const prev = S.v1 || {};
  const p = (!pid || pid === '__rand') ? pick(P.filter(x => x.st.length >= 3 && x.id !== prev.pid)) : PW[pid];
  mode = mode || prev.mode || 'study'; cnt = cnt != null ? cnt : (prev.cnt != null ? prev.cnt : 3);
  const s = S.v1 = {pid:p.id, mode, cnt, B:{}, active:null, checked:false, bank:[], num:{}, order:[], focus:null, msg:null};
  if (mode === 'study') return;
  const Lo = vLayoutPW(p), cm = [], ce = [];
  if (mode !== 'enz'){ const g = {}; Lo.nodes.forEach((nd, j) => { (g[nd.id] = g[nd.id] || []).push('n' + j); }); for (const id in g) cm.push({kind:'m', ans:id, keys:g[id]}); }
  if (mode !== 'mol'){ const g = {}; p.st.forEach((st, i) => { (g[st[2]] = g[st[2]] || []).push('e' + i); }); for (const id in g) ce.push({kind:'e', ans:id, keys:g[id]}); }
  let pickd; const all = shuffle(cm.concat(ce));
  if (!cnt) pickd = all;
  else { pickd = all.slice(0, cnt); if (mode === 'mix' && cm.length && ce.length && !pickd.some(x => x.kind === 'm')) pickd[pickd.length - 1] = shuffle(cm)[0];
    if (mode === 'mix' && cm.length && ce.length && !pickd.some(x => x.kind === 'e')) pickd[pickd.length - 1] = shuffle(ce)[0]; }
  let uid = 0;
  pickd.forEach(c => c.keys.forEach(k => { s.B[k] = {kind:c.kind, ans:c.ans, val:null, state:null}; s.bank.push({u:'c' + (uid++), kind:c.kind, v:c.ans, key:c.kind + ':' + TEN(c.kind === 'm' ? M[c.ans] : E[c.ans])}); }));
  /* distractors: same category first, never something already drawn in this pathway */
  ['m', 'e'].forEach(kind => { const nAns = s.bank.filter(c => c.kind === kind).length; if (!nAns) return;
    const k = cnt ? Math.max(2, Math.ceil(nAns/2)) : Math.min(6, Math.max(3, Math.ceil(nAns/3)));
    const here = uniq(p.st.flatMap(x => kind === 'm' ? [x[0], x[1]] : [x[2]])).map(id => kind + ':' + TEN(kind === 'm' ? M[id] : E[id]));
    const src = q => uniq(P.filter(q).flatMap(x => kind === 'm' ? x.st.flatMap(y => [y[0], y[1]]) : x.st.map(y => y[2]))).map(id => ({kind, v:id, key:kind + ':' + TEN(kind === 'm' ? M[id] : E[id])}));
    let ds = vPool(src(x => x.cat === p.cat && x.id !== p.id), here, k);
    if (ds.length < k) ds = ds.concat(vPool(src(x => x.id !== p.id), here.concat(ds.map(d => d.key)), k - ds.length));
    ds.forEach(d => s.bank.push({u:'c' + (uid++), kind, v:d.v, key:d.key})); });
  s.bank = shuffle(s.bank);
  const pos = k => { if (k[0] === 'n'){ const nd = Lo.nodes[+k.slice(1)]; return [nd.y, nd.x]; } const e = Lo.edges[+k.slice(1)]; return [e.py, e.px]; };
  s.order = Object.keys(s.B).sort((a, b) => { const A = pos(a), B = pos(b); return (A[0] - B[0]) || (A[1] - B[1]); });
  s.order.forEach((k, i) => s.num[k] = i + 1);
  s.active = s.order[0] || null;
}
function renderV1(){
  if (!S.v1) newV1(null, 'study', 3);
  const s = S.v1, p = PW[s.pid], study = s.mode === 'study';
  let h = `<div class="controls">${pathwaySelect(s.pid, 'v1path', true)}${segmented(u('vMode'), [['study', U.vStudy], ['mol', U.vMol], ['enz', U.vEnz], ['mix', U.vMix]], s.mode, 'v1mode')}`
    + (study ? '' : segmented(u('vGaps'), [['3', '3'], ['5', '5'], ['0', U.vAll]], String(s.cnt), 'v1cnt')) + `</div>`;
  const D = vPathSVG(p, {B:s.B, num:s.num, active:s.active, checked:s.checked, bank:s.bank, study, focus:s.focus});
  h += `<div class="card vcard qcard"><div class="vhead"><h3>${esc(T(p.n))}</h3>${p.loc && LOC[p.loc] ? `<span class="lgloc ${locCls(p.loc)}">${esc(T(LOC[p.loc]))}</span>` : ''}</div>`;
  if (study) h += `<p class="note">${u('vStudyTip')}</p>`;
  else if (!s.checked) h += `<p class="note">${s.active ? `<strong>${u('vFor', {n:s.num[s.active]})}</strong> · ` : ''}${u('vTap')}</p>`;
  h += `<div class="vscroll${D.Lo.wide ? ' wide' : ''}">${D.svg}</div>` + (D.Lo.wide ? `<p class="vswipe">↔ ${u('vSwipe')}</p>` : '');
  if (study){
    if (s.focus != null && p.st[s.focus]) h += `<div class="vfocus"><div class="nblk">${rxnBlock(p, s.focus)}</div>${stepPlain(p, s.focus)}</div>`;
    h += vLegend(p, false) + `<p class="vsum">${esc(T(p.s))}</p>`;
    h += `<div class="actions"><button type="button" class="btn primary" data-act="v1test">${u('vTest')}</button><button type="button" class="btn" data-act="v1other">${u('vOther')}</button></div></div>`;
    return h;
  }
  if (!s.checked){
    h += vBankHTML(s, s.mode === 'mix' ? [{kind:'m', n:U.vMol}, {kind:'e', n:U.vEnz}] : [{}], 'v1chip', c => c.kind === 'm' ? mol(c.v) : enzShort(c.v));
    if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    h += vLegend(p, true) + `<div class="actions"><button type="button" class="btn" data-act="v1clear">${u('clear')}</button><button type="button" class="btn primary" data-act="v1check">${u('check')}</button></div></div>`;
    return h;
  }
  const keys = s.order, c = keys.filter(k => s.B[k].state === 'ok').length, all = c === keys.length;
  h += `<div class="fb ${all ? 'ok' : 'no'}"><strong>${all ? u('correct') : u('wrong')}</strong> · ${u('rowsOk', {n:c, t:keys.length})}`;
  const wrong = keys.filter(k => s.B[k].state === 'no');
  if (wrong.length) h += `<ul class="vwrong">` + wrong.map(k => { const b = s.B[k], ch = s.bank.find(x => x.u === b.val), lb = v => b.kind === 'm' ? mol(v) : enzShort(v);
    return `<li>${esc(u('vYou', {g:s.num[k], a:ch ? lb(ch.v) : '–', b:lb(b.ans)}))}</li>`; }).join('') + `</ul>`;
  h += `</div>` + notesV1() + vLegend(p, false) + `<div class="actions"><button type="button" class="btn primary" data-act="v1new">${u('vNew')}</button><button type="button" class="btn" data-act="v1other">${u('vOther')}</button><button type="button" class="btn" data-act="v1studyb">${u('vStudy')}</button></div></div>`;
  return h;
}
function notesV1(){ const s = S.v1, p = PW[s.pid], Lo = vLayoutPW(p), lines = [], marks = [];
  s.order.forEach(k => { const b = s.B[k]; if (b.state === 'ok') return;
    if (k[0] === 'e'){ const i = +k.slice(1), st = p.st[i]; marks.push(i); lines.push(mx('gapE', {x:enzShort(b.ans), a:mol(st[0]), b:mol(st[1])})); }
    else { const id = Lo.nodes[+k.slice(1)].id, i = p.st.findIndex(x => x[1] === id);
      if (i >= 0){ marks.push(i); lines.push(mx('gapM', {x:mol(id), e:enzShort(p.st[i][2]), a:mol(p.st[i][0]), b:mol(id)})); } else lines.push(mx('gapStart', {x:mol(id)})); } });
  const your = lines.length ? `<ul class="nlist">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : `<p class="nok">✓ ${esc(mx('allRight', {}))}</p>`;
  return notesBox({ask:`<p>${esc(u('vAskV1', {p:T(p.n)}))}</p>`, your, what:`<p>${esc(T(p.s))}</p>` + storyHTML(p, {mark:uniq(marks), open:marks.length > 0 && marks.length <= 3}), how:`<p>${esc(u('vHowV1'))}</p>`}); }
function vGrade(s, same){ let c = 0; s.order.forEach(k => { const b = s.B[k], ch = s.bank.find(x => x.u === b.val); b.state = ch && same(b, ch) ? 'ok' : 'no'; if (b.state === 'ok') c++; }); return c; }
Object.assign(A, {
  v1mode(el){ newV1(S.v1.pid, el.dataset.v, S.v1.cnt); render(); },
  v1cnt(el){ newV1(S.v1.pid, S.v1.mode, +el.dataset.v); render(); },
  v1gap(el){ const s = S.v1; if (s.checked) return; const k = el.dataset.k, b = s.B[k]; if (!b) return;
    if (s.active === k && b.val != null){ b.val = null; } else s.active = k; render(); },
  v1chip(el){ const s = S.v1; if (s.checked) return; vAssign(s, el.dataset.u); render(); },
  v1clear(){ const s = S.v1; Object.keys(s.B).forEach(k => s.B[k].val = null); s.active = s.order[0]; s.msg = null; render(); },
  v1check(){ const s = S.v1; if (s.order.some(k => s.B[k].val == null)){ s.msg = 'fillAll'; render(); return; }
    const c = vGrade(s, (b, ch) => b.kind === ch.kind && (ch.v === b.ans || TEN(b.kind === 'm' ? M[ch.v] : E[ch.v]) === TEN(b.kind === 'm' ? M[b.ans] : E[b.ans])));
    s.checked = true; s.active = null; s.msg = null; addScore('diagrams', c, s.order.length); render(); },
  v1new(){ newV1(S.v1.pid, S.v1.mode, S.v1.cnt); render(); },
  v1other(){ newV1('__rand', S.v1.mode, S.v1.cnt); render(); },
  v1test(){ newV1(S.v1.pid, 'mix', S.v1.cnt || 3); render(); },
  v1studyb(){ newV1(S.v1.pid, 'study', S.v1.cnt); render(); },
  v1step(el){ const s = S.v1, i = +el.dataset.i; s.focus = s.focus === i ? null : i; render(); }
});
Object.assign(CHG, { v1path(el){ newV1(el.value, S.v1.mode, S.v1.cnt); render(); } });
Object.assign(SCROLLMAP, {v1check:'.fb', v1step:'.vfocus', v1new:'.vcard', v1other:'.vcard'});
RENDER.diagrams = renderV1;

/* ---------- V2 organ maps ---------- */
const VORG = {liver:ORG.liver, muscle:ORG.muscle, brain:ORG.brain, kidney:ORG.kidney, adipose:ORG.adipose, rbc:ORG.rbc,
  gut:"Intestine|Intestin|Darm", pancreas:"Pancreas|Pancréas|Pankreas", heart:"Heart|Cœur|Herz", blood:"Blood|Sang|Blut",
  spleen:"Spleen (macrophages)|Rate (macrophages)|Milz (Makrophagen)", lung:"Lungs|Poumons|Lunge", periph:"Peripheral cells|Cellules périphériques|Periphere Zellen",
  musheart:"Muscle & heart|Muscle et cœur|Muskel & Herz", adimus:"Adipose & muscle|Tissu adipeux et muscle|Fettgewebe & Muskel", urine:"Kidney → urine|Rein → urine|Niere → Urin"};
const VOCOL = {musheart:'muscle', adimus:'adipose', urine:'kidney'};
/* map: org [key, x, y, w, h]; nd {id: [x, y, label, kind m|p|h]}; ed [from, to, label, {c: bend, v:[cx,cy], d: dashed}] */
const OMAPS = [
{id:'fed', h:560, n:"Fed state (after a meal)|État nourri (après un repas)|Gefütterter Zustand (nach dem Essen)",
 s:"Insulin is high. Glucose from the gut reaches every tissue: liver and muscle store it as glycogen, the brain burns it, adipose tissue turns it into glycerol-3-phosphate. The liver turns extra glucose into fatty acids and ships them as VLDL; adipose tissue collects fat from chylomicrons and VLDL with lipoprotein lipase and stores it as TAG.|L'insuline est élevée. Le glucose venu de l'intestin atteint tous les tissus : foie et muscle le stockent en glycogène, le cerveau le brûle, le tissu adipeux en fait du glycérol-3-phosphate. Le foie transforme l'excès de glucose en acides gras et les exporte en VLDL ; le tissu adipeux récupère les graisses des chylomicrons et des VLDL grâce à la lipoprotéine lipase et les stocke en TAG.|Insulin ist hoch. Glucose aus dem Darm erreicht alle Gewebe: Leber und Muskel speichern sie als Glykogen, das Gehirn verbrennt sie, das Fettgewebe macht daraus Glycerin-3-phosphat. Die Leber macht überschüssige Glucose zu Fettsäuren und exportiert sie als VLDL; das Fettgewebe holt sich mit der Lipoproteinlipase Fett aus Chylomikronen und VLDL und speichert es als TAG.",
 org:[['gut', 6, 8, 138, 96], ['liver', 6, 118, 138, 262], ['pancreas', 6, 394, 138, 90], ['brain', 256, 8, 138, 80], ['muscle', 256, 102, 138, 170], ['adipose', 256, 286, 138, 266]],
 nd:{abs:[75, 62, "Digestion & absorption|Digestion et absorption|Verdauung & Resorption", 'p'], bglc:[200, 60, "Glucose|Glucose|Glucose", 'm'], baa:[200, 150, "Amino acids|Acides aminés|Aminosäuren", 'm'],
  lgk:[75, 166, "Glucokinase (GLUT2)|Glucokinase (GLUT2)|Glucokinase (GLUT2)", 'p'], lgly:[75, 250, "Glycogen|Glycogène|Glykogen", 'm'], lfas:[75, 336, "Lipogenesis (ACC, FAS)|Lipogenèse (ACC, FAS)|Lipogenese (ACC, FAS)", 'p'],
  bchy:[200, 250, "Chylomicrons|Chylomicrons|Chylomikronen", 'm'], bvldl:[200, 336, "VLDL", 'm'], beta:[75, 444, "β-cells|Cellules β|β-Zellen", 'p'], bins:[200, 444, "Insulin|Insuline|Insulin", 'h'],
  brn:[325, 54, "Glucose oxidation|Oxydation du glucose|Glucoseoxidation", 'p'], mglut:[325, 150, "GLUT4 uptake (insulin)|Captage GLUT4 (insuline)|GLUT4-Aufnahme (Insulin)", 'p'], mprot:[325, 236, "Protein synthesis|Synthèse protéique|Proteinsynthese", 'p'],
  ag3p:[325, 330, "Glycerol-3-phosphate|Glycérol-3-phosphate|Glycerin-3-phosphat", 'm'], alpl:[325, 404, "LPL (apoC-II)|LPL (apoC-II)|LPL (apoC-II)", 'p'], atag:[325, 516, "TAG (stored)|TAG (stockés)|TAG (gespeichert)", 'm']},
 ed:[['abs', 'bglc'], ['abs', 'baa'], ['abs', 'bchy', null, {v:[150, 150]}], ['bglc', 'lgk'], ['lgk', 'lgly', "glycogen synthase|glycogène synthase|Glykogensynthase"], ['lgk', 'lfas', null, {v:[150, 250]}], ['lfas', 'bvldl'],
  ['bglc', 'brn'], ['bglc', 'mglut'], ['baa', 'mprot'], ['bglc', 'ag3p', null, {v:[238, 300]}], ['bchy', 'alpl', null, {v:[236, 390]}], ['bvldl', 'alpl'],
  ['ag3p', 'atag', null, {v:[392, 430]}], ['alpl', 'atag', "fatty acids|acides gras|Fettsäuren"], ['beta', 'bins']]},

{id:'fast', h:540, n:"Overnight fast|Jeûne nocturne|Nächtliches Fasten",
 s:"Insulin falls, glucagon rises. The liver keeps blood glucose up: first by breaking down glycogen, then by gluconeogenesis from lactate (RBCs, muscle), alanine (muscle) and glycerol (adipose). Adipose tissue releases fatty acids; liver and muscle burn them, which saves glucose for the brain and red blood cells.|L'insuline baisse, le glucagon monte. Le foie maintient la glycémie : d'abord par la glycogénolyse, puis par la néoglucogenèse à partir du lactate (GR, muscle), de l'alanine (muscle) et du glycérol (tissu adipeux). Le tissu adipeux libère des acides gras ; foie et muscle les brûlent, ce qui épargne le glucose pour le cerveau et les globules rouges.|Insulin sinkt, Glukagon steigt. Die Leber hält den Blutzucker: zuerst durch Glykogenabbau, dann durch Glukoneogenese aus Laktat (Erythrozyten, Muskel), Alanin (Muskel) und Glycerin (Fettgewebe). Das Fettgewebe gibt Fettsäuren ab; Leber und Muskel verbrennen sie und sparen so Glucose für Gehirn und Erythrozyten.",
 org:[['liver', 6, 8, 138, 336], ['pancreas', 6, 358, 138, 76], ['brain', 256, 8, 138, 76], ['rbc', 256, 98, 138, 90], ['muscle', 256, 202, 138, 150], ['adipose', 256, 366, 138, 166]],
 nd:{lgly:[75, 52, "Glycogen|Glycogène|Glykogen", 'm'], lg6p:[75, 140, "Glucose-6-phosphatase|Glucose-6-phosphatase|Glucose-6-Phosphatase", 'p'], lgng:[75, 230, "Gluconeogenesis|Néoglucogenèse|Glukoneogenese", 'p'],
  lbox:[75, 312, "β-oxidation|β-oxydation|β-Oxidation", 'p'], alpha:[75, 400, "α-cells|Cellules α|α-Zellen", 'p'],
  bglc:[200, 90, "Glucose|Glucose|Glucose", 'm'], blac:[200, 170, "Lactate|Lactate|Laktat", 'm'], bala:[200, 264, "Alanine|Alanine|Alanin", 'm'], bgcg:[200, 400, "Glucagon|Glucagon|Glukagon", 'h'],
  bgly:[200, 446, "Glycerol|Glycérol|Glycerin", 'm'], bfa:[200, 496, "Fatty acids|Acides gras|Fettsäuren", 'm'],
  brn:[325, 50, "Glucose oxidation|Oxydation du glucose|Glucoseoxidation", 'p'], rbc:[325, 148, "Anaerobic glycolysis|Glycolyse anaérobie|Anaerobe Glykolyse", 'p'],
  mprot:[325, 252, "Proteolysis + ALT|Protéolyse + ALT|Proteolyse + ALT", 'p'], mbox:[325, 318, "β-oxidation|β-oxydation|β-Oxidation", 'p'], alip:[325, 450, "Lipolysis (HSL)|Lipolyse (LHS)|Lipolyse (HSL)", 'p']},
 ed:[['lgly', 'lg6p', "glycogen phosphorylase|glycogène phosphorylase|Glykogenphosphorylase"], ['lgng', 'lg6p'], ['lg6p', 'bglc'], ['bglc', 'brn'], ['bglc', 'rbc'], ['rbc', 'blac'], ['blac', 'lgng'],
  ['mprot', 'bala'], ['bala', 'lgng'], ['alip', 'bgly'], ['alip', 'bfa'], ['bgly', 'lgng', null, {v:[152, 300]}], ['bfa', 'lbox', null, {v:[140, 470]}], ['bfa', 'mbox', null, {v:[252, 420]}],
  ['lbox', 'lgng', "ATP + NADH|ATP + NADH|ATP + NADH", {d:1}], ['alpha', 'bgcg']]},

{id:'starve', h:530, n:"Prolonged starvation (days)|Jeûne prolongé (plusieurs jours)|Langes Hungern (Tage)",
 s:"Glycogen is gone. Adipose tissue becomes the main fuel store: fatty acids go to liver and muscle, glycerol feeds gluconeogenesis. The liver turns acetyl-CoA into ketone bodies, and the brain switches to ketones for up to two-thirds of its energy – this spares muscle protein. The kidney now also makes glucose, and makes NH₄⁺ from glutamine to excrete the ketoacids' acid.|Le glycogène est épuisé. Le tissu adipeux devient la réserve principale : les acides gras vont au foie et au muscle, le glycérol alimente la néoglucogenèse. Le foie transforme l'acétyl-CoA en corps cétoniques, et le cerveau passe aux cétones pour jusqu'aux deux tiers de son énergie – ce qui épargne les protéines musculaires. Le rein fabrique aussi du glucose et produit du NH₄⁺ à partir de la glutamine pour excréter l'acide des cétoacides.|Das Glykogen ist aufgebraucht. Das Fettgewebe wird zum Hauptspeicher: Fettsäuren gehen zu Leber und Muskel, Glycerin speist die Glukoneogenese. Die Leber macht aus Acetyl-CoA Ketonkörper, und das Gehirn deckt bis zu zwei Drittel seiner Energie mit Ketonen – das schont Muskelprotein. Die Niere bildet jetzt auch Glucose und macht aus Glutamin NH₄⁺, um die Säure der Ketosäuren auszuscheiden.",
 org:[['liver', 6, 8, 138, 300], ['kidney', 6, 322, 138, 160], ['adipose', 256, 8, 138, 90], ['muscle', 256, 112, 138, 162], ['brain', 256, 288, 138, 194]],
 nd:{lbox:[75, 56, "β-oxidation|β-oxydation|β-Oxidation", 'p'], lket:[75, 150, "Ketogenesis|Cétogenèse|Ketogenese", 'p'], lgng:[75, 256, "Gluconeogenesis|Néoglucogenèse|Glukoneogenese", 'p'],
  kgng:[75, 370, "Gluconeogenesis|Néoglucogenèse|Glukoneogenese", 'p'], kgln:[75, 440, "Glutaminase → NH₄⁺ in urine|Glutaminase → NH₄⁺ urinaire|Glutaminase → NH₄⁺ im Urin", 'p'],
  alip:[325, 58, "Lipolysis|Lipolyse|Lipolyse", 'p'], bfa:[200, 56, "Fatty acids|Acides gras|Fettsäuren", 'm'], bgly:[200, 116, "Glycerol|Glycérol|Glycerin", 'm'],
  bket:[200, 176, "Ketone bodies|Corps cétoniques|Ketonkörper", 'm'], bglc:[200, 310, "Glucose|Glucose|Glucose", 'm'], bgln:[200, 420, "Glutamine|Glutamine|Glutamin", 'm'], bala:[200, 486, "Alanine|Alanine|Alanin", 'm'],
  mfuel:[325, 166, "Burns fatty acids + ketones|Brûle acides gras + cétones|Verbrennt Fettsäuren + Ketone", 'p'], mprot:[325, 240, "Proteolysis (slowed)|Protéolyse (ralentie)|Proteolyse (gebremst)", 'p'],
  bket2:[325, 340, "Ketone oxidation (SCOT)|Oxydation des cétones (SCOT)|Ketonoxidation (SCOT)", 'p'], bglc2:[325, 430, "Glucose oxidation|Oxydation du glucose|Glucoseoxidation", 'p']},
 ed:[['alip', 'bfa'], ['alip', 'bgly'], ['bfa', 'lbox'], ['bfa', 'mfuel', null, {v:[244, 120]}], ['lbox', 'lket', "acetyl-CoA|acétyl-CoA|Acetyl-CoA"], ['lket', 'bket'],
  ['bket', 'mfuel'], ['bket', 'bket2', null, {v:[236, 320]}], ['bgly', 'lgng', null, {v:[150, 230]}], ['lgng', 'bglc'], ['kgng', 'bglc'], ['bglc', 'bglc2', null, {v:[236, 420]}],
  ['mprot', 'bgln', null, {v:[244, 300]}], ['mprot', 'bala', null, {v:[252, 330]}], ['bgln', 'kgln'], ['bala', 'lgng', null, {v:[150, 330]}]]},

{id:'cori', h:420, n:"Cori cycle|Cycle de Cori|Cori-Zyklus",
 s:"Muscle (during hard exercise) and red blood cells make lactate by anaerobic glycolysis: LDH turns pyruvate into lactate to regenerate NAD⁺. Lactate travels in the blood to the liver, which turns it back into glucose by gluconeogenesis. The liver pays 6 ATP for the 2 ATP the muscle gained – a net cost of 4 ATP per turn.|Le muscle (en effort intense) et les globules rouges fabriquent du lactate par glycolyse anaérobie : la LDH transforme le pyruvate en lactate pour régénérer le NAD⁺. Le lactate rejoint le foie par le sang, qui le retransforme en glucose par néoglucogenèse. Le foie paie 6 ATP pour les 2 ATP gagnés par le muscle – un coût net de 4 ATP par tour.|Muskel (bei harter Arbeit) und Erythrozyten bilden Laktat durch anaerobe Glykolyse: LDH macht aus Pyruvat Laktat, um NAD⁺ zu regenerieren. Laktat gelangt über das Blut zur Leber, die es per Glukoneogenese wieder zu Glucose macht. Die Leber zahlt 6 ATP für die 2 ATP des Muskels – Nettokosten 4 ATP pro Runde.",
 org:[['liver', 6, 8, 138, 330], ['muscle', 256, 8, 138, 250], ['rbc', 256, 272, 138, 66]],
 nd:{lglc:[75, 60, "Glucose|Glucose|Glucose", 'm'], lpyr:[75, 176, "Pyruvate|Pyruvate|Pyruvat", 'm'], llac:[75, 296, "Lactate|Lactate|Laktat", 'm'],
  bglc:[200, 60, "Glucose|Glucose|Glucose", 'm'], blac:[200, 296, "Lactate|Lactate|Laktat", 'm'],
  mglc:[325, 50, "Glucose|Glucose|Glucose", 'm'], mpyr:[325, 136, "Pyruvate|Pyruvate|Pyruvat", 'm'], mlac:[325, 222, "Lactate|Lactate|Laktat", 'm'], rbc:[325, 306, "Glycolysis only|Glycolyse seule|Nur Glykolyse", 'p']},
 ed:[['llac', 'lpyr', "LDH (NAD⁺ → NADH)|LDH (NAD⁺ → NADH)|LDH (NAD⁺ → NADH)"], ['lpyr', 'lglc', "gluconeogenesis (−6 ATP)|néoglucogenèse (−6 ATP)|Glukoneogenese (−6 ATP)"], ['lglc', 'bglc'], ['bglc', 'mglc'],
  ['mglc', 'mpyr', "glycolysis (+2 ATP)|glycolyse (+2 ATP)|Glykolyse (+2 ATP)"], ['mpyr', 'mlac', "LDH (NADH → NAD⁺)|LDH (NADH → NAD⁺)|LDH (NADH → NAD⁺)"], ['mlac', 'blac'], ['rbc', 'blac'], ['blac', 'llac'],
  [null, null, "net −4 ATP per turn|coût net −4 ATP par tour|netto −4 ATP pro Runde", {at:[200, 370]}]]},

{id:'glcala', h:480, n:"Glucose–alanine cycle|Cycle glucose–alanine|Glucose-Alanin-Zyklus",
 s:"In fasting muscle, branched-chain amino acids hand their amino group to glutamate (BCAT), and ALT moves it onto pyruvate to make alanine. Alanine carries both carbon and nitrogen to the liver: ALT turns it back into pyruvate (→ glucose by gluconeogenesis) and the nitrogen goes into the urea cycle. Urea is excreted by the kidney.|Dans le muscle à jeun, les acides aminés ramifiés cèdent leur groupe aminé au glutamate (BCAT), et l'ALT le transfère au pyruvate pour former l'alanine. L'alanine transporte carbone et azote vers le foie : l'ALT la retransforme en pyruvate (→ glucose par néoglucogenèse) et l'azote entre dans le cycle de l'urée. L'urée est excrétée par le rein.|Im fastenden Muskel geben verzweigtkettige Aminosäuren ihre Aminogruppe an Glutamat ab (BCAT), und ALT überträgt sie auf Pyruvat – es entsteht Alanin. Alanin bringt Kohlenstoff und Stickstoff zur Leber: ALT macht daraus wieder Pyruvat (→ Glucose per Glukoneogenese), der Stickstoff geht in den Harnstoffzyklus. Harnstoff wird über die Niere ausgeschieden.",
 org:[['liver', 6, 8, 138, 380], ['muscle', 256, 8, 138, 380], ['urine', 256, 402, 138, 70]],
 nd:{lglc:[75, 56, "Glucose|Glucose|Glucose", 'm'], lpyr:[75, 150, "Pyruvate|Pyruvate|Pyruvat", 'm'], lala:[75, 244, "Alanine|Alanine|Alanin", 'm'], lurea:[75, 340, "Urea cycle|Cycle de l'urée|Harnstoffzyklus", 'p'],
  bglc:[200, 56, "Glucose|Glucose|Glucose", 'm'], bala:[200, 244, "Alanine|Alanine|Alanin", 'm'], burea:[200, 436, "Urea|Urée|Harnstoff", 'm'],
  mglc:[325, 50, "Glucose|Glucose|Glucose", 'm'], mpyr:[325, 142, "Pyruvate|Pyruvate|Pyruvat", 'm'], mala:[325, 244, "Alanine|Alanine|Alanin", 'm'],
  mbcaa:[325, 344, "Branched-chain amino acids|Acides aminés ramifiés|Verzweigtkettige Aminosäuren", 'm'], kid:[325, 438, "Excreted|Excrétée|Ausgeschieden", 'p']},
 ed:[['lglc', 'bglc'], ['bglc', 'mglc'], ['mglc', 'mpyr', "glycolysis|glycolyse|Glykolyse"], ['mpyr', 'mala', "ALT"], ['mbcaa', 'mala', "–NH₂ via glutamate (BCAT)|–NH₂ via glutamate (BCAT)|–NH₂ über Glutamat (BCAT)", {d:1}],
  ['mala', 'bala'], ['bala', 'lala'], ['lala', 'lpyr', "ALT"], ['lpyr', 'lglc', "gluconeogenesis|néoglucogenèse|Glukoneogenese"], ['lala', 'lurea', "NH₄⁺ (via glutamate)|NH₄⁺ (via glutamate)|NH₄⁺ (über Glutamat)"],
  ['lurea', 'burea'], ['burea', 'kid']]},

{id:'nitrogen', h:520, n:"Nitrogen & ammonia between organs|Azote et ammoniac entre organes|Stickstoff & Ammoniak zwischen Organen",
 s:"Free ammonia is toxic, so it travels as glutamine and alanine (mostly from muscle). The gut burns glutamine and sends NH₄⁺ to the liver in the portal vein. Periportal liver cells turn NH₄⁺ into urea (CPS-I); perivenous cells catch the leftovers with glutamine synthetase. The kidney excretes urea and splits glutamine (glutaminase) to excrete acid as NH₄⁺. The brain has no urea cycle: it detoxifies ammonia only as glutamine – why it suffers in liver failure.|L'ammoniac libre est toxique : il circule sous forme de glutamine et d'alanine (surtout issues du muscle). L'intestin brûle la glutamine et envoie du NH₄⁺ au foie par la veine porte. Les hépatocytes périportaux transforment le NH₄⁺ en urée (CPS-I) ; les cellules périveineuses captent le reste avec la glutamine synthétase. Le rein excrète l'urée et scinde la glutamine (glutaminase) pour excréter l'acide sous forme de NH₄⁺. Le cerveau n'a pas de cycle de l'urée : il ne détoxifie l'ammoniac qu'en glutamine – d'où sa souffrance en cas d'insuffisance hépatique.|Freies Ammoniak ist giftig und reist daher als Glutamin und Alanin (vor allem aus dem Muskel). Der Darm verbrennt Glutamin und schickt NH₄⁺ über die Pfortader zur Leber. Periportale Leberzellen machen daraus Harnstoff (CPS-I); perivenöse Zellen fangen den Rest mit der Glutaminsynthetase ab. Die Niere scheidet Harnstoff aus und spaltet Glutamin (Glutaminase), um Säure als NH₄⁺ auszuscheiden. Das Gehirn hat keinen Harnstoffzyklus: Es entgiftet Ammoniak nur als Glutamin – deshalb leidet es bei Leberversagen.",
 org:[['gut', 6, 8, 138, 100], ['liver', 6, 122, 138, 270], ['muscle', 256, 8, 138, 100], ['brain', 256, 164, 138, 100], ['kidney', 256, 300, 138, 210]],
 nd:{gutg:[75, 64, "Burns glutamine → NH₄⁺ to portal vein|Brûle la glutamine → NH₄⁺ vers la veine porte|Verbrennt Glutamin → NH₄⁺ in die Pfortader", 'p'], mbcaa:[325, 62, "BCAA breakdown|Dégradation des AA ramifiés|BCAA-Abbau", 'p'],
  bgln:[200, 60, "Glutamine|Glutamine|Glutamin", 'm'], bala:[200, 140, "Alanine|Alanine|Alanin", 'm'], bnh4:[200, 214, "NH₄⁺|NH₄⁺|NH₄⁺", 'm'], burea:[200, 430, "Urea|Urée|Harnstoff", 'm'],
  lurea:[75, 214, "Urea cycle (periportal, CPS-I)|Cycle de l'urée (périportal, CPS-I)|Harnstoffzyklus (periportal, CPS-I)", 'p'], lgs:[75, 340, "Glutamine synthetase (perivenous)|Glutamine synthétase (périveineuse)|Glutaminsynthetase (perivenös)", 'p'],
  brgs:[325, 214, "Glutamine synthetase (detox)|Glutamine synthétase (détox)|Glutaminsynthetase (Entgiftung)", 'p'], kgln:[325, 356, "Glutaminase → NH₄⁺ (acid out)|Glutaminase → NH₄⁺ (acide éliminé)|Glutaminase → NH₄⁺ (Säure raus)", 'p'],
  kurea:[325, 450, "Urea excreted|Urée excrétée|Harnstoff ausgeschieden", 'p']},
 ed:[['mbcaa', 'bgln'], ['mbcaa', 'bala'], ['bgln', 'gutg'], ['gutg', 'bnh4', null, {v:[150, 160]}], ['bala', 'lurea'], ['bnh4', 'lurea'], ['bnh4', 'brgs'],
  ['lurea', 'lgs', "leftover NH₄⁺|NH₄⁺ restant|restliches NH₄⁺", {d:1}], ['lurea', 'burea', null, {v:[152, 330]}], ['burea', 'kurea'], ['bgln', 'kgln', null, {v:[244, 250]}]]},

{id:'lipo', h:600, n:"Lipoprotein transport|Transport des lipoprotéines|Lipoproteintransport",
 s:"Dietary fat leaves the gut as chylomicrons (apoB-48) through the lymph. Lipoprotein lipase (activated by apoC-II) on muscle and adipose capillaries frees the fatty acids; the leftover remnants are taken up by the liver via apoE. The liver sends its own fat out as VLDL (apoB-100), which shrinks to IDL and then LDL; LDL delivers cholesterol to cells through the LDL receptor. HDL collects extra cholesterol from cells (ABCA1, LCAT) and brings it back to the liver (SR-B1) – reverse cholesterol transport.|Les graisses alimentaires quittent l'intestin sous forme de chylomicrons (apoB-48) par la lymphe. La lipoprotéine lipase (activée par l'apoC-II) des capillaires musculaires et adipeux libère les acides gras ; les remnants restants sont captés par le foie via l'apoE. Le foie exporte ses propres graisses en VLDL (apoB-100), qui rétrécissent en IDL puis en LDL ; les LDL livrent le cholestérol aux cellules via le récepteur des LDL. Les HDL récupèrent l'excès de cholestérol des cellules (ABCA1, LCAT) et le ramènent au foie (SR-B1) – transport inverse du cholestérol.|Nahrungsfett verlässt den Darm als Chylomikronen (apoB-48) über die Lymphe. Die Lipoproteinlipase (aktiviert durch apoC-II) an Muskel- und Fettkapillaren setzt die Fettsäuren frei; die Remnants nimmt die Leber über apoE auf. Die Leber exportiert eigenes Fett als VLDL (apoB-100), die zu IDL und dann LDL schrumpfen; LDL liefern Cholesterin über den LDL-Rezeptor an Zellen. HDL sammeln überschüssiges Cholesterin aus Zellen (ABCA1, LCAT) und bringen es zur Leber zurück (SR-B1) – reverser Cholesterintransport.",
 org:[['gut', 6, 8, 138, 96], ['liver', 6, 232, 138, 358], ['adimus', 256, 8, 138, 150], ['periph', 256, 380, 138, 210]],
 nd:{gtag:[75, 64, "TAG + apoB-48 → lymph|TAG + apoB-48 → lymphe|TAG + apoB-48 → Lymphe", 'p'], bchy:[200, 64, "Chylomicron|Chylomicron|Chylomikron", 'm'], afa:[325, 92, "LPL (apoC-II) frees fatty acids|LPL (apoC-II) libère les acides gras|LPL (apoC-II) setzt Fettsäuren frei", 'p'],
  brem:[200, 180, "Chylomicron remnant|Remnant de chylomicron|Chylomikronen-Remnant", 'm'], lrem:[75, 284, "Remnant uptake (apoE)|Captage des remnants (apoE)|Remnant-Aufnahme (apoE)", 'p'],
  lvldl:[75, 360, "VLDL assembly (apoB-100)|Assemblage des VLDL (apoB-100)|VLDL-Bildung (apoB-100)", 'p'], bvldl:[200, 300, "VLDL", 'm'], bidl:[200, 376, "IDL", 'm'], bldl:[200, 460, "LDL", 'm'],
  lldl:[75, 460, "LDL receptor|Récepteur des LDL|LDL-Rezeptor", 'p'], pldl:[325, 436, "LDL receptor|Récepteur des LDL|LDL-Rezeptor", 'p'], peff:[325, 530, "Cholesterol efflux (ABCA1, LCAT)|Efflux du cholestérol (ABCA1, LCAT)|Cholesterin-Efflux (ABCA1, LCAT)", 'p'],
  bhdl:[200, 552, "HDL", 'm'], lsr:[75, 552, "SR-B1 uptake → bile|Captage SR-B1 → bile|SR-B1-Aufnahme → Galle", 'p']},
 ed:[['gtag', 'bchy'], ['bchy', 'afa'], ['bchy', 'brem'], ['brem', 'lrem'], ['lvldl', 'bvldl'], ['bvldl', 'afa', null, {v:[252, 170]}],
  ['bvldl', 'bidl'], ['bidl', 'bldl', "hepatic lipase|lipase hépatique|hepatische Lipase"], ['bldl', 'pldl'], ['bldl', 'lldl'], ['peff', 'bhdl'], ['bhdl', 'lsr']]},

{id:'ketone', h:480, n:"Ketone bodies: made in the liver, burned elsewhere|Corps cétoniques : faits par le foie, brûlés ailleurs|Ketonkörper: in der Leber gebildet, anderswo verbrannt",
 s:"When insulin is low, fatty acids from adipose tissue flood liver mitochondria. β-oxidation makes more acetyl-CoA than the Krebs cycle can take (oxaloacetate is busy with gluconeogenesis), so HMG-CoA synthase builds ketone bodies. The liver lacks SCOT (thiophorase), so it exports them; brain, heart and muscle use SCOT to turn acetoacetate back into acetyl-CoA. Some acetoacetate breaks down to acetone, exhaled with a fruity smell.|Quand l'insuline est basse, les acides gras du tissu adipeux affluent dans les mitochondries hépatiques. La β-oxydation produit plus d'acétyl-CoA que le cycle de Krebs ne peut en prendre (l'oxaloacétate est occupé par la néoglucogenèse), donc l'HMG-CoA synthase fabrique des corps cétoniques. Le foie n'a pas de SCOT (thiophorase) : il les exporte ; cerveau, cœur et muscle utilisent la SCOT pour retransformer l'acétoacétate en acétyl-CoA. Une partie de l'acétoacétate se dégrade en acétone, expirée avec une odeur fruitée.|Bei niedrigem Insulin strömen Fettsäuren aus dem Fettgewebe in die Lebermitochondrien. Die β-Oxidation liefert mehr Acetyl-CoA, als der Citratzyklus aufnehmen kann (Oxalacetat ist mit Glukoneogenese beschäftigt), also baut die HMG-CoA-Synthase Ketonkörper. Der Leber fehlt SCOT (Thiophorase), sie exportiert sie; Gehirn, Herz und Muskel machen mit SCOT aus Acetoacetat wieder Acetyl-CoA. Etwas Acetoacetat zerfällt zu Aceton, das fruchtig riechend abgeatmet wird.",
 org:[['liver', 6, 8, 138, 380], ['lung', 6, 402, 138, 70], ['adipose', 256, 8, 138, 90], ['brain', 256, 150, 138, 140], ['musheart', 256, 306, 138, 166]],
 nd:{lfa:[75, 50, "Fatty acids|Acides gras|Fettsäuren", 'm'], lac:[75, 132, "Acetyl-CoA|Acétyl-CoA|Acetyl-CoA", 'm'], lhmg:[75, 214, "HMG-CoA|HMG-CoA|HMG-CoA", 'm'], lacac:[75, 294, "Acetoacetate|Acétoacétate|Acetoacetat", 'm'],
  lbhb:[75, 360, "β-Hydroxybutyrate|β-Hydroxybutyrate|β-Hydroxybutyrat", 'm'], alip:[325, 56, "Lipolysis|Lipolyse|Lipolyse", 'p'], bfa:[200, 56, "Fatty acids|Acides gras|Fettsäuren", 'm'],
  bket:[200, 294, "Ketone bodies|Corps cétoniques|Ketonkörper", 'm'], bacn:[200, 438, "Acetone|Acétone|Aceton", 'm'], lung:[75, 440, "Exhaled (fruity breath)|Expirée (haleine fruitée)|Abgeatmet (Obstgeruch)", 'p'],
  bscot:[325, 196, "SCOT|SCOT|SCOT", 'p'], bkr:[325, 262, "Acetyl-CoA → Krebs|Acétyl-CoA → Krebs|Acetyl-CoA → Citratzyklus", 'm'],
  mscot:[325, 352, "SCOT|SCOT|SCOT", 'p'], mkr:[325, 426, "Acetyl-CoA → Krebs|Acétyl-CoA → Krebs|Acetyl-CoA → Citratzyklus", 'm']},
 ed:[['alip', 'bfa'], ['bfa', 'lfa'], ['lfa', 'lac', "β-oxidation|β-oxydation|β-Oxidation"], ['lac', 'lhmg', "HMG-CoA synthase|HMG-CoA synthase|HMG-CoA-Synthase"], ['lhmg', 'lacac', "HMG-CoA lyase|HMG-CoA lyase|HMG-CoA-Lyase"],
  ['lacac', 'lbhb', "NADH → NAD⁺|NADH → NAD⁺|NADH → NAD⁺"], ['lacac', 'bket'], ['lbhb', 'bket'], ['bket', 'bscot'], ['bket', 'mscot'], ['bscot', 'bkr'], ['mscot', 'mkr'],
  ['lacac', 'bacn', null, {v:[150, 380]}], ['bacn', 'lung']]},

{id:'bili', h:600, n:"Heme → bilirubin route|Trajet hème → bilirubine|Weg Häm → Bilirubin",
 s:"Old red cells are eaten by spleen macrophages. Heme oxygenase opens the heme ring (releasing CO and iron) to green biliverdin, which is reduced to yellow unconjugated bilirubin. It is fat-soluble, so it rides on albumin to the liver, where UGT1A1 attaches glucuronic acid (conjugated = water-soluble). Conjugated bilirubin goes out in bile (MRP2); gut bacteria make urobilinogen. Most becomes stercobilin (brown stool); some is reabsorbed and leaves in urine as yellow urobilin.|Les vieux globules rouges sont mangés par les macrophages de la rate. L'hème oxygénase ouvre le cycle de l'hème (libérant CO et fer) en biliverdine verte, réduite en bilirubine non conjuguée jaune. Liposoluble, elle voyage sur l'albumine jusqu'au foie, où l'UGT1A1 ajoute de l'acide glucuronique (conjuguée = hydrosoluble). La bilirubine conjuguée part dans la bile (MRP2) ; les bactéries intestinales en font de l'urobilinogène. La plus grande partie devient stercobiline (selles brunes) ; une partie est réabsorbée et éliminée dans l'urine en urobiline jaune.|Alte Erythrozyten werden von Milzmakrophagen abgebaut. Die Hämoxygenase öffnet den Häm-Ring (CO und Eisen werden frei) zu grünem Biliverdin, das zu gelbem unkonjugiertem Bilirubin reduziert wird. Es ist fettlöslich und reist an Albumin zur Leber, wo UGT1A1 Glucuronsäure anhängt (konjugiert = wasserlöslich). Konjugiertes Bilirubin geht in die Galle (MRP2); Darmbakterien machen Urobilinogen. Das meiste wird Sterkobilin (brauner Stuhl); ein Teil wird rückresorbiert und als gelbes Urobilin im Urin ausgeschieden.",
 org:[['spleen', 256, 8, 138, 210], ['liver', 6, 166, 138, 162], ['gut', 6, 362, 138, 228], ['urine', 256, 430, 138, 100]],
 nd:{heme:[325, 48, "Heme|Hème|Häm", 'm'], biliv:[325, 114, "Biliverdin (green)|Biliverdine (verte)|Biliverdin (grün)", 'm'], ubil:[325, 184, "Unconjugated bilirubin|Bilirubine non conjuguée|Unkonjugiertes Bilirubin", 'm'],
  balb:[200, 214, "Bilirubin + albumin|Bilirubine + albumine|Bilirubin + Albumin", 'm'], lugt:[75, 214, "UGT1A1 (+ glucuronate)|UGT1A1 (+ glucuronate)|UGT1A1 (+ Glucuronat)", 'p'], lcon:[75, 288, "Conjugated bilirubin|Bilirubine conjuguée|Konjugiertes Bilirubin", 'm'],
  gbac:[75, 418, "Gut bacteria|Bactéries intestinales|Darmbakterien", 'p'], guro:[75, 476, "Urobilinogen|Urobilinogène|Urobilinogen", 'm'], gster:[75, 552, "Stercobilin (brown stool)|Stercobiline (selles brunes)|Sterkobilin (brauner Stuhl)", 'm'],
  buro:[200, 476, "Urobilinogen (reabsorbed)|Urobilinogène (réabsorbé)|Urobilinogen (rückresorbiert)", 'm'], kuro:[325, 486, "Urobilin (yellow urine)|Urobiline (urine jaune)|Urobilin (gelber Urin)", 'm']},
 ed:[['heme', 'biliv', "heme oxygenase (CO, Fe²⁺)|hème oxygénase (CO, Fe²⁺)|Hämoxygenase (CO, Fe²⁺)"], ['biliv', 'ubil', "biliverdin reductase|biliverdine réductase|Biliverdinreduktase"], ['ubil', 'balb'],
  ['balb', 'lugt'], ['lugt', 'lcon'], ['lcon', 'gbac', "bile (MRP2)|bile (MRP2)|Galle (MRP2)"], ['gbac', 'guro'], ['guro', 'gster'], ['guro', 'buro'], ['buro', 'kuro']]}

];
const OMW = 400;
function omLbl(t){ return T(t); }
function omLayout(m){
  const nodes = {}; for (const id in m.nd){ const d = m.nd[id], inBlood = d[0] > 150 && d[0] < 250, ch = inBlood ? 13 : 17, fs = d[3] === 'm' ? 12 : 11.5;
    const lines = vWrap(omLbl(d[2]), ch).slice(0, 3); const w = Math.max(44, ...lines.map(l => vTW(l, fs))) + 14; nodes[id] = {id, x:d[0], y:d[1], k:d[3], lines, w, h:10 + lines.length*14, t:d[2]}; }
  const edges = m.ed.map((e, i) => { const o = e[3] || {}, lab = e[2] ? vWrap(omLbl(e[2]), 15).slice(0, 3) : null;
    const lw = lab ? Math.max(...lab.map(l => vTW(l, 10.5))) + 10 : 0, lh = lab ? 6 + lab.length*12.5 : 0;
    if (!e[0]){ return {i, t:e[2], lab, lw, lh, px:o.at[0], py:o.at[1], solo:true}; }
    const A = nodes[e[0]], B = nodes[e[1]];
    let C; if (o.v) C = o.v; else { const mx_ = (A.x + B.x)/2, my = (A.y + B.y)/2, dx = B.x - A.x, dy = B.y - A.y, L_ = Math.hypot(dx, dy) || 1, c = o.c || 0; C = [mx_ - dy/L_*c, my + dx/L_*c]; }
    const clip = (N, tx, ty, pad) => { const dx = tx - N.x, dy = ty - N.y; const t = Math.min((N.w/2 + pad)/Math.abs(dx || 1e-6), (N.h/2 + pad)/Math.abs(dy || 1e-6)); return [N.x + dx*t, N.y + dy*t]; };
    const P0 = clip(A, C[0], C[1], 2), P2 = clip(B, C[0], C[1], 4);
    const d = `M${P0[0].toFixed(1)},${P0[1].toFixed(1)} Q${C[0].toFixed(1)},${C[1].toFixed(1)} ${P2[0].toFixed(1)},${P2[1].toFixed(1)}`;
    const px = (P0[0] + 2*C[0] + P2[0])/4, py = (P0[1] + 2*C[1] + P2[1])/4;
    return {i, d, dash:!!o.d, t:e[2], lab, lw, lh, px, py}; });
  return {nodes, edges};
}
function omSVG(m, o){ o = o || {}; const Lo = omLayout(m), G = o.B || {}, num = o.num || {};
  let s = `<svg class="vdg vomap" viewBox="0 0 ${OMW} ${m.h}" width="${OMW}" height="${m.h}" role="img" aria-label="${esc(T(m.n))}">${vMarkers()}`;
  s += `<g class="vo vo-blood"><rect class="reg" x="152" y="2" width="96" height="${m.h - 4}" rx="14"/><text class="regn" x="200" y="${m.h - 10}" text-anchor="middle">${esc(T(VORG.blood))}</text></g>`;
  m.org.forEach(r => { s += `<g class="vo vo-${VOCOL[r[0]] || r[0]}"><rect class="reg" x="${r[1]}" y="${r[2]}" width="${r[3]}" height="${r[4]}" rx="12"/><text class="regn" x="${r[1] + 8}" y="${r[2] + 15}">${esc(T(VORG[r[0]]))}</text></g>`; });
  Lo.edges.forEach(e => { if (!e.solo) s += `<path class="ome${e.dash ? ' dash' : ''}" d="${e.d}" marker-end="url(#vah-ink)"/>`; });
  const badge = (x, y, k) => num[k] ? `<g class="vbadge"><circle cx="${x}" cy="${y}" r="9.5"/><text x="${x}" y="${y + 4}" text-anchor="middle">${num[k]}</text></g>` : '';
  const gapCls = k => { const b = G[k]; if (!b) return ''; return ' gap' + (b.state ? ' ' + b.state : b.val != null ? ' filled' : '') + (o.active === k ? ' sel' : ''); };
  const gapText = (k, max) => { const b = G[k]; let t = '?'; if (b.state) t = T(b.ans); else if (b.val != null){ const c = o.bank.find(x => x.u === b.val); if (c) t = T(c.v); } return vWrap(t, max).slice(0, 3); };
  const act = k => G[k] && !o.checked ? ` data-act="v2gap" data-k="${k}" tabindex="0" role="button"` : '';
  Lo.edges.forEach(e => { if (!e.lab) return; const k = 'l' + e.i; let lab = e.lab, w = e.lw, h = e.lh;
    if (G[k]){ lab = gapText(k, 15); w = Math.max(30, w, ...lab.map(l => vTW(l, 10.5) + 10)); h = Math.max(h, 6 + lab.length*12.5); }
    s += `<g class="oml${gapCls(k)}"${act(k)}><rect x="${e.px - w/2}" y="${e.py - h/2}" width="${w}" height="${h}" rx="6"/>` + vText(lab, e.px, e.py - h/2 + 3 + 10.5*0.85, 12.5, G[k] && !G[k].val && !G[k].state ? 'q' : '') + `</g>` + badge(e.px - w/2, e.py - h/2, k); });
  for (const id in Lo.nodes){ const nd = Lo.nodes[id], k = 'n' + id; let lines = nd.lines, w = nd.w, h = nd.h;
    if (G[k]){ lines = gapText(k, nd.x > 150 && nd.x < 250 ? 12 : 17); w = Math.max(w, ...lines.map(l => vTW(l, 12) + 14)); h = Math.max(h, 10 + lines.length*14); }
    s += `<g class="omn k${nd.k}${gapCls(k)}"${act(k)}><rect x="${nd.x - w/2}" y="${nd.y - h/2}" width="${w}" height="${h}" rx="${nd.k === 'm' ? 9 : 6}"/>` + vText(lines, nd.x, nd.y - h/2 + 5 + 12*0.85, 14, G[k] && !G[k].val && !G[k].state ? 'q' : '') + `</g>` + badge(nd.x - w/2, nd.y - h/2, k); }
  return s + `</svg>`;
}
const OMW_ = OMAPS.reduce((o, m) => (o[m.id] = m, o), {});
function newV2map(mid, cnt){
  const prev = S.v2 || {tab:'maps', study:true, cnt:3};
  const m = (!mid || mid === '__rand') ? pick(OMAPS.filter(x => x.id !== prev.mid)) : OMW_[mid];
  cnt = cnt != null ? cnt : (prev.cnt != null ? prev.cnt : 3);
  const s = S.v2 = Object.assign(prev, {mid:m.id, cnt, B:{}, active:null, checked:false, bank:[], num:{}, order:[], msg:null});
  if (s.study) return;
  const Lo = omLayout(m), cand = [];
  for (const id in Lo.nodes) cand.push({key:'n' + id, kind:Lo.nodes[id].k, t:Lo.nodes[id].t, pos:[Lo.nodes[id].y, Lo.nodes[id].x]});
  Lo.edges.forEach(e => { if (e.lab) cand.push({key:'l' + e.i, kind:'p', t:e.t, pos:[e.py, e.px]}); });
  /* one gap per distinct label so the answer is never visible elsewhere in the map */
  const groups = {}; cand.forEach(c => { const g = TEN(c.t); (groups[g] = groups[g] || []).push(c); });
  let gs = shuffle(Object.keys(groups)); if (cnt) gs = gs.slice(0, cnt);
  let uid = 0; const keyOf = t => 'L:' + TEN(t);
  gs.forEach(g => groups[g].forEach(c => { s.B[c.key] = {kind:'p', ans:c.t, val:null, state:null}; s.bank.push({u:'o' + (uid++), kind:'p', v:c.t, key:keyOf(c.t), k2:c.kind}); }));
  const here = cand.map(c => keyOf(c.t)), pool = [];
  OMAPS.forEach(x => { if (x.id === m.id) return; for (const id in x.nd) pool.push({kind:'p', v:x.nd[id][2], key:keyOf(x.nd[id][2]), k2:x.nd[id][3]}); x.ed.forEach(e => { if (e[2]) pool.push({kind:'p', v:e[2], key:keyOf(e[2]), k2:'p'}); }); });
  const nAns = s.bank.length, k = cnt ? Math.max(2, Math.ceil(nAns/2)) : Math.min(6, Math.max(3, Math.ceil(nAns/3)));
  vPool(pool, here, k).forEach(d => s.bank.push(Object.assign({u:'o' + (uid++)}, d)));
  s.bank = shuffle(s.bank);
  const POS = {}; cand.forEach(c => POS[c.key] = c.pos);
  s.order = Object.keys(s.B).sort((a, b) => (POS[a][0] - POS[b][0]) || (POS[a][1] - POS[b][1])); s.order.forEach((k_, i) => s.num[k_] = i + 1);
  s.active = s.order[0] || null;
}

/* ---------- body map ---------- */
const BORG = {
  brain:{s:`<ellipse class="bs" cx="170" cy="46" rx="27" ry="20"/><path class="bdec" d="M150,44 q10,-10 20,0 q10,10 20,0 M156,56 q14,-6 28,0"/>`, l:[272, 40, 'start'], k:[270, 37, 197, 44]},
  heart:{s:`<path class="bs" d="M188,166 C170,154 163,140 173,133 C180,128 187,133 188,138 C189,133 196,128 203,133 C213,140 206,154 188,166 Z"/>`, l:[272, 142, 'start'], k:[270, 139, 207, 142]},
  rbc:{s:`<rect class="bhit" x="236" y="160" width="24" height="100"/><path class="bvessel" d="M248,158 L248,262"/><ellipse class="bs" cx="248" cy="182" rx="9" ry="5.5"/><ellipse class="bs" cx="248" cy="210" rx="9" ry="5.5"/><ellipse class="bs" cx="248" cy="238" rx="9" ry="5.5"/>`, l:[272, 184, 'start'], k:[270, 181, 258, 190]},
  liver:{s:`<path class="bs" d="M116,178 Q160,164 198,180 Q188,206 146,212 Q120,208 116,178 Z"/>`, l:[70, 190, 'end'], k:[72, 187, 120, 190]},
  pancreas:{s:`<ellipse class="bs" cx="190" cy="222" rx="25" ry="7.5" transform="rotate(-12 190 222)"/>`, l:[272, 220, 'start'], k:[270, 217, 214, 217]},
  kidney:{s:`<path class="bs" d="M124,222 c-12,0 -12,28 0,28 c5,0 7,-5 4,-9 c-2,-3 -2,-7 0,-10 c3,-4 1,-9 -4,-9 Z"/><path class="bs" d="M216,222 c12,0 12,28 0,28 c-5,0 -7,-5 -4,-9 c2,-3 2,-7 0,-10 c-3,-4 -1,-9 4,-9 Z"/>`, l:[272, 252, 'start'], k:[270, 249, 226, 240]},
  gut:{s:`<rect class="bs" x="136" y="248" width="68" height="46" rx="14"/><path class="bdec" d="M146,258 h48 a6,6 0 0 1 0,12 h-48 a6,6 0 0 0 0,12 h48"/>`, l:[70, 262, 'end'], k:[72, 259, 136, 262]},
  adipose:{s:`<circle class="bs" cx="116" cy="270" r="8"/><circle class="bs" cx="110" cy="285" r="8.5"/><circle class="bs" cx="122" cy="292" r="7.5"/>`, l:[70, 296, 'end'], k:[72, 293, 102, 287]},
  muscle:{s:`<rect class="bs" x="124" y="318" width="36" height="74" rx="14"/><path class="bdec" d="M132,330 v50 M142,326 v58 M152,330 v50"/>`, l:[70, 356, 'end'], k:[72, 353, 124, 354]}
};
const VORGPLAIN = Object.assign({}, ORGPLAIN, {
  heart:"Heart: works nonstop, packed with mitochondria – burns mostly fatty acids, plus lactate, ketones and glucose.|Cœur : travaille sans arrêt, plein de mitochondries – brûle surtout des acides gras, mais aussi lactate, cétones et glucose.|Herz: arbeitet ununterbrochen, voller Mitochondrien – verbrennt vor allem Fettsäuren, dazu Laktat, Ketone und Glucose.",
  gut:"Intestine: absorbs nutrients (SGLT1, GLUT2, GLUT5), packs fat into chylomicrons, burns glutamine as its main fuel.|Intestin : absorbe les nutriments (SGLT1, GLUT2, GLUT5), emballe les graisses dans les chylomicrons, brûle la glutamine comme carburant principal.|Darm: nimmt Nährstoffe auf (SGLT1, GLUT2, GLUT5), verpackt Fett in Chylomikronen, verbrennt Glutamin als Hauptbrennstoff.",
  pancreas:"Pancreas: islets make insulin (β-cells) and glucagon (α-cells); the exocrine part makes digestive enzymes.|Pancréas : les îlots fabriquent l'insuline (cellules β) et le glucagon (cellules α) ; la partie exocrine fabrique les enzymes digestives.|Pankreas: Inseln bilden Insulin (β-Zellen) und Glukagon (α-Zellen); der exokrine Teil bildet Verdauungsenzyme."
});
const BOPT = [["Releases free glucose", ['gut']], ["Contributes significantly to gluconeogenesis", ['gut']], ["Takes up glucose mainly via insulin-dependent GLUT4", ['heart']],
  ["Has lipoprotein lipase", ['heart']], ["Stores glycogen only for its own use", ['heart']], ["Glycogen phosphorylase is activated directly", ['heart']], ["Uses glucokinase", ['pancreas']]];
const VBQX = [
 {q:"Secretes insulin and glucagon|Sécrète l'insuline et le glucagon|Sezerniert Insulin und Glukagon", a:['pancreas'], x:"Islets of Langerhans: β-cells make insulin, α-cells glucagon.|Îlots de Langerhans : les cellules β font l'insuline, les cellules α le glucagon.|Langerhans-Inseln: β-Zellen bilden Insulin, α-Zellen Glukagon."},
 {q:"Packs dietary fat into chylomicrons|Emballe les graisses alimentaires dans les chylomicrons|Verpackt Nahrungsfett in Chylomikronen", a:['gut'], x:"Enterocytes re-make TAG and add apoB-48 (MTP needed – absent in abetalipoproteinemia).|Les entérocytes refont des TAG et ajoutent l'apoB-48 (MTP nécessaire – absente dans l'abêtalipoprotéinémie).|Enterozyten bauen TAG neu und hängen apoB-48 an (MTP nötig – fehlt bei Abetalipoproteinämie)."},
 {q:"Its lining cells burn glutamine as their main fuel|Ses cellules de revêtement brûlent la glutamine comme carburant principal|Seine Epithelzellen verbrennen Glutamin als Hauptbrennstoff", a:['gut'], x:"Enterocytes use glutamine for energy and release ammonia and alanine into the portal vein.|Les entérocytes utilisent la glutamine pour l'énergie et libèrent ammoniac et alanine dans la veine porte.|Enterozyten nutzen Glutamin zur Energiegewinnung und geben Ammoniak und Alanin in die Pfortader ab."},
 {q:"Beats nonstop and gets most of its ATP from fatty acids|Bat sans arrêt et tire la plupart de son ATP des acides gras|Schlägt ununterbrochen und gewinnt das meiste ATP aus Fettsäuren", a:['heart'], x:"About 60–90 % of cardiac ATP comes from fatty acid oxidation; it also readily burns lactate and ketones.|Environ 60–90 % de l'ATP cardiaque vient de l'oxydation des acides gras ; il brûle aussi volontiers lactate et cétones.|Etwa 60–90 % des Herz-ATP stammen aus der Fettsäureoxidation; Laktat und Ketone verbrennt es ebenfalls gern."},
 {q:"Reabsorbs filtered glucose with SGLT2|Réabsorbe le glucose filtré par SGLT2|Resorbiert filtrierte Glucose mit SGLT2", a:['kidney'], x:"Proximal tubule SGLT2 takes back ~90 % of filtered glucose – the target of gliflozins.|Le SGLT2 du tubule proximal récupère ~90 % du glucose filtré – la cible des gliflozines.|SGLT2 im proximalen Tubulus holt ~90 % der filtrierten Glucose zurück – Ziel der Gliflozine."},
 {q:"Absorbs dietary glucose and galactose with SGLT1|Absorbe le glucose et le galactose alimentaires par SGLT1|Nimmt Nahrungsglucose und -galaktose über SGLT1 auf", a:['gut'], x:"SGLT1 on the brush border uses the Na⁺ gradient; fructose enters via GLUT5.|Le SGLT1 de la bordure en brosse utilise le gradient de Na⁺ ; le fructose entre par GLUT5.|SGLT1 im Bürstensaum nutzt den Na⁺-Gradienten; Fructose kommt über GLUT5 hinein."},
 {q:"Has GLUT2 (high-capacity, two-way glucose transporter)|Possède GLUT2 (transporteur de glucose bidirectionnel à grande capacité)|Besitzt GLUT2 (bidirektionaler Glucosetransporter mit hoher Kapazität)", a:['liver', 'pancreas', 'gut', 'kidney'], x:"GLUT2: hepatocytes, β-cells (glucose sensing), basolateral side of enterocytes and proximal tubule cells.|GLUT2 : hépatocytes, cellules β (détection du glucose), pôle basolatéral des entérocytes et du tubule proximal.|GLUT2: Hepatozyten, β-Zellen (Glucosemessung), basolateral in Enterozyten und proximalem Tubulus."},
 {q:"Activates vitamin D with 1α-hydroxylase|Active la vitamine D par la 1α-hydroxylase|Aktiviert Vitamin D mit der 1α-Hydroxylase", a:['kidney'], x:"Liver makes 25-OH-D (storage form); the kidney makes active 1,25-(OH)₂-D under PTH control.|Le foie fait la 25-OH-D (forme de réserve) ; le rein fait la 1,25-(OH)₂-D active sous contrôle de la PTH.|Die Leber bildet 25-OH-D (Speicherform); die Niere bildet unter PTH-Kontrolle aktives 1,25-(OH)₂-D."},
 {q:"Conjugates bilirubin with glucuronic acid|Conjugue la bilirubine avec l'acide glucuronique|Konjugiert Bilirubin mit Glucuronsäure", a:['liver'], x:"UGT1A1 in hepatocytes – reduced in Gilbert, absent in Crigler–Najjar type I.|UGT1A1 des hépatocytes – diminuée dans le Gilbert, absente dans le Crigler–Najjar type I.|UGT1A1 der Hepatozyten – vermindert bei Gilbert, fehlend bei Crigler-Najjar Typ I."},
 {q:"Starts creatine synthesis (makes guanidinoacetate)|Commence la synthèse de la créatine (fabrique le guanidinoacétate)|Beginnt die Kreatinsynthese (bildet Guanidinoacetat)", a:['kidney'], x:"Kidney: arginine + glycine → guanidinoacetate; the liver methylates it (SAM) to creatine.|Rein : arginine + glycine → guanidinoacétate ; le foie le méthyle (SAM) en créatine.|Niere: Arginin + Glycin → Guanidinoacetat; die Leber methyliert es (SAM) zu Kreatin."},
 {q:"Uses ketone bodies as fuel in prolonged fasting|Utilise les corps cétoniques comme carburant en jeûne prolongé|Nutzt Ketonkörper als Brennstoff bei langem Fasten", a:['brain', 'heart', 'muscle'], opt:['kidney'], x:"All tissues with mitochondria and SCOT can – but not the liver (no SCOT) or RBCs (no mitochondria).|Tous les tissus avec mitochondries et SCOT le peuvent – mais pas le foie (pas de SCOT) ni les GR (pas de mitochondries).|Alle Gewebe mit Mitochondrien und SCOT – nicht aber die Leber (keine SCOT) oder Erythrozyten (keine Mitochondrien)."}
];
const VBQ = ORGQ.map(q => { const en = TEN(q.q), b = BOPT.find(x => en.indexOf(x[0]) === 0); return Object.assign({}, q, {opt:b ? b[1] : []}); }).concat(VBQX.map(q => Object.assign({opt:[]}, q)));
function bodySVG(st){
  let s = `<svg class="vbody" viewBox="-50 0 440 440" width="440" height="440" role="group" aria-label="${esc(u('vTabBody'))}">`
    + `<g class="bsil"><circle cx="170" cy="52" r="40"/><rect x="158" y="88" width="24" height="22"/><rect x="78" y="112" width="30" height="176" rx="15"/><rect x="232" y="112" width="30" height="176" rx="15"/>`
    + `<rect x="120" y="290" width="44" height="142" rx="18"/><rect x="176" y="290" width="44" height="142" rx="18"/><rect x="106" y="104" width="128" height="204" rx="36"/></g>`;
  const q = VBQ[st.order[st.k]];
  Object.keys(BORG).forEach(k => { const o = BORG[k], on = st.sel.indexOf(k) >= 0; let cls = on ? ' on' : '';
    if (st.checked){ const inA = q.a.indexOf(k) >= 0, inO = (q.opt || []).indexOf(k) >= 0; cls = inA ? (on ? ' ok' : ' miss') : inO ? (on ? ' ok also' : '') : on ? ' no' : ''; }
    s += `<g class="borg vo-${k}${cls}"${st.checked ? '' : ` data-act="v2org" data-o="${k}" tabindex="0" role="button" aria-pressed="${on}"`}><title>${esc(T(VORG[k]))}</title>${o.s}`
      + `<line class="bline" x1="${o.k[0]}" y1="${o.k[1]}" x2="${o.k[2]}" y2="${o.k[3]}"/><text class="bl" x="${o.l[0]}" y="${o.l[1]}" text-anchor="${o.l[2]}">${esc(T(VORG[k]))}</text></g>`; });
  return s + `</svg>`;
}
function newV2b(){ S.v2b = {order:shuffle(VBQ.map((_, i) => i)), k:0, sel:[], checked:false, msg:null}; }

/* ---------- V2 render ---------- */
function renderV2(){
  if (!S.v2){ S.v2 = {tab:'maps', study:true, cnt:3}; newV2map(OMAPS[0].id); }
  const s = S.v2;
  let h = `<div class="controls">${segmented(u('vMode'), [['maps', U.vTabMaps], ['body', U.vTabBody]], s.tab, 'v2tab')}`;
  if (s.tab === 'body'){ h += `</div>` + renderV2body(); return h; }
  const m = OMW_[s.mid];
  h += `<label class="field"><span>${u('vMap')}</span><select data-chg="v2map" id="sel-v2map"><option value="__rand">${esc(u('random'))}</option>`
    + OMAPS.map(x => `<option value="${x.id}"${x.id === s.mid ? ' selected' : ''}>${esc(T(x.n))}</option>`).join('') + `</select></label>`
    + segmented(u('vMode'), [['study', U.vStudy], ['test', U.vGaps]], s.study ? 'study' : 'test', 'v2mode')
    + (s.study ? '' : segmented(u('vGaps'), [['3', '3'], ['5', '5'], ['0', U.vAll]], String(s.cnt), 'v2cnt')) + `</div>`;
  h += `<div class="card vcard qcard"><div class="vhead"><h3>${esc(T(m.n))}</h3></div><p class="note">${u('vKeyOrg')}</p>`;
  if (!s.study && !s.checked) h += `<p class="note">${s.active ? `<strong>${u('vFor', {n:s.num[s.active]})}</strong> · ` : ''}${u('vTap')}</p>`;
  h += `<div class="vscroll">${omSVG(m, {B:s.B, num:s.num, active:s.active, checked:s.checked, bank:s.bank})}</div>`;
  h += `<div class="vleg"><span><i class="vl-box km"></i>${u('lgMol')}</span><span><i class="vl-box kp"></i>${u('vProc')}</span><span><i class="vl-box kh"></i>${u('vHorm')}</span>${s.study ? '' : `<span><i class="vl-gap">?</i>${u('vLgGap')}</span>`}</div>`;
  if (s.study){ h += `<p class="vsum">${esc(T(m.s))}</p><div class="actions"><button type="button" class="btn primary" data-act="v2test">${u('vTest')}</button><button type="button" class="btn" data-act="v2other">${u('vOther')}</button></div></div>`; return h; }
  if (!s.checked){ h += vBankHTML(s, [{}], 'v2chip', c => T(c.v)); if (s.msg) h += `<p class="note warn">${u(s.msg)}</p>`;
    h += `<div class="actions"><button type="button" class="btn" data-act="v2clear">${u('clear')}</button><button type="button" class="btn primary" data-act="v2check">${u('check')}</button></div></div>`; return h; }
  const c = s.order.filter(k => s.B[k].state === 'ok').length, all = c === s.order.length;
  h += `<div class="fb ${all ? 'ok' : 'no'}"><strong>${all ? u('correct') : u('wrong')}</strong> · ${u('rowsOk', {n:c, t:s.order.length})}`;
  const wrong = s.order.filter(k => s.B[k].state === 'no');
  if (wrong.length) h += `<ul class="vwrong">` + wrong.map(k => { const b = s.B[k], ch = s.bank.find(x => x.u === b.val); return `<li>${esc(u('vYou', {g:s.num[k], a:ch ? T(ch.v) : '–', b:T(b.ans)}))}</li>`; }).join('') + `</ul>`;
  h += `</div>` + notesBox({ask:`<p>${esc(u('vAskV2', {m:T(m.n)}))}</p>`, what:`<p>${esc(T(m.s))}</p>`, how:`<p>${esc(u('vHowV2'))}</p>`})
    + `<div class="actions"><button type="button" class="btn primary" data-act="v2new">${u('vNew')}</button><button type="button" class="btn" data-act="v2other">${u('vOther')}</button><button type="button" class="btn" data-act="v2studyb">${u('vStudy')}</button></div></div>`;
  return h;
}
function renderV2body(){
  if (!S.v2b) newV2b(); const st = S.v2b, q = VBQ[st.order[st.k]];
  let h = `<div class="card vcard qcard"><div class="qmeta">${u('vTabBody')} · ${st.k + 1}/${VBQ.length}</div><h3 class="q vbq">${esc(T(q.q))}</h3>`;
  if (!st.checked) h += `<p class="note">${u('vBodyQ')}</p>`;
  h += `<div class="vscroll">${bodySVG(st)}</div>`;
  if (!st.checked){ h += `<p class="vorgsel">${st.sel.length ? '✓ ' + st.sel.map(k => esc(T(VORG[k]))).join(', ') : '&nbsp;'}</p>`;
    if (st.msg) h += `<p class="note warn">${u(st.msg)}</p>`;
    return h + `<div class="actions"><button type="button" class="btn primary" data-act="v2bcheck">${u('check')}</button></div></div>`; }
  const ok = vBodyOk(st, q), miss = q.a.filter(k => st.sel.indexOf(k) < 0), extra = st.sel.filter(k => q.a.indexOf(k) < 0 && (q.opt || []).indexOf(k) < 0), also = (q.opt || []).filter(k => st.sel.indexOf(k) >= 0);
  h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong> → ${q.a.map(o => esc(T(VORG[o]))).join(', ')}`
    + (miss.length ? `<br><small>${u('vMissed')}: ${miss.map(o => esc(T(VORG[o]))).join(', ')}</small>` : '')
    + (extra.length ? `<br><small>✗ ${extra.map(o => esc(T(VORG[o]))).join(', ')}</small>` : '')
    + (also.length ? `<br><small>${u('vAlso')}: ${also.map(o => esc(T(VORG[o]))).join(', ')}</small>` : '') + `<p>${esc(T(q.x))}</p></div>`;
  h += notesBox({ask:`<p>${esc(u('vAskBody'))}</p>`, what:LIST(uniq(q.a.concat(extra)).map(o => VORGPLAIN[o]).filter(Boolean)), how:`<p>${esc(u('vHowBody'))}</p>`});
  return h + `<div class="actions"><button type="button" class="btn primary" data-act="v2bnext">${u('next')}</button></div></div>`;
}
function vBodyOk(st, q){ return q.a.every(k => st.sel.indexOf(k) >= 0) && st.sel.every(k => q.a.indexOf(k) >= 0 || (q.opt || []).indexOf(k) >= 0); }
Object.assign(U, {vProc:"process / enzyme|processus / enzyme|Prozess / Enzym", vHorm:"hormone|hormone|Hormon"});
Object.assign(A, {
  v2tab(el){ S.v2.tab = el.dataset.v; render(); },
  v2mode(el){ S.v2.study = el.dataset.v === 'study'; newV2map(S.v2.mid, S.v2.cnt); render(); },
  v2cnt(el){ newV2map(S.v2.mid, +el.dataset.v); render(); },
  v2gap(el){ const s = S.v2; if (s.checked) return; const k = el.dataset.k, b = s.B[k]; if (!b) return; if (s.active === k && b.val != null) b.val = null; else s.active = k; render(); },
  v2chip(el){ const s = S.v2; if (s.checked) return; vAssign(s, el.dataset.u); render(); },
  v2clear(){ const s = S.v2; Object.keys(s.B).forEach(k => s.B[k].val = null); s.active = s.order[0]; s.msg = null; render(); },
  v2check(){ const s = S.v2; if (s.order.some(k => s.B[k].val == null)){ s.msg = 'fillAll'; render(); return; }
    const c = vGrade(s, (b, ch) => TEN(ch.v) === TEN(b.ans)); s.checked = true; s.active = null; s.msg = null; addScore('organmap', c, s.order.length); render(); },
  v2new(){ newV2map(S.v2.mid, S.v2.cnt); render(); },
  v2other(){ newV2map('__rand', S.v2.cnt); render(); },
  v2test(){ S.v2.study = false; newV2map(S.v2.mid, S.v2.cnt || 3); render(); },
  v2studyb(){ S.v2.study = true; newV2map(S.v2.mid, S.v2.cnt); render(); },
  v2org(el){ const st = S.v2b; if (st.checked) return; const o = el.dataset.o, i = st.sel.indexOf(o); if (i >= 0) st.sel.splice(i, 1); else st.sel.push(o); st.msg = null; render(); },
  v2bcheck(){ const st = S.v2b; if (!st.sel.length){ st.msg = 'vPickOrg'; render(); return; } st.checked = true; addScore('organmap', vBodyOk(st, VBQ[st.order[st.k]]) ? 1 : 0, 1); render(); },
  v2bnext(){ const st = S.v2b; st.k++; if (st.k >= VBQ.length) newV2b(); else { st.sel = []; st.checked = false; st.msg = null; } render(); }
});
Object.assign(CHG, { v2map(el){ newV2map(el.value, S.v2.cnt); render(); } });
Object.assign(SCROLLMAP, {v2check:'.fb', v2bcheck:'.fb', v2bnext:'.qcard', v2new:'.vcard', v2other:'.vcard'});
RENDER.organmap = renderV2;
/* keyboard: Enter/Space on focused diagram boxes acts like a tap */
if (typeof document !== 'undefined') document.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const el = e.target.closest && e.target.closest('svg [data-act]'); if (!el) return; const f = A[el.dataset.act]; if (f){ e.preventDefault(); f(el); } });
