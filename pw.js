/* ===================== PATHWAY RECONSTRUCTION: MOLECULE STRUCTURES + "MOLECULES + ENZYMES" MODE =====================
   Adds to drill 1 (pathway reconstruction):
     · Structures: Off / With names / Structures only – molecule blocks (and full reaction cards) show the structural
       formula drawn from mdata.js (MOL) or pmol.js (PMOL). "Structures only" hides the names until Check.
     · Mode "Molecules + enzymes" (hard): molecules and enzymes are separate blocks; build molecule → enzyme → molecule …
       Where the pathway branches, the next starting molecule follows the previous product.
   Needs app.js (D1), ux.js (block builder), bdata4.js (molSVG) and pmol.js. */
Object.assign(U, {
  modeSplit:"Molecules + enzymes|Molécules + enzymes|Moleküle + Enzyme",
  pwStruct:"Structures|Structures|Strukturen",
  pwStOff:"Off|Non|Aus", pwStOn:"With names|Avec noms|Mit Namen", pwStOnly:"Structures only|Structures seules|Nur Strukturen",
  pwSplitNote:"Hard mode: every molecule and every enzyme is a separate block. Build the chain molecule → enzyme → molecule …; where the pathway branches, the branch's starting molecule comes right after the previous product.|Mode difficile : chaque molécule et chaque enzyme est un bloc séparé. Construisez la chaîne molécule → enzyme → molécule … ; quand la voie se ramifie, la molécule de départ de la branche suit directement le produit précédent.|Schwerer Modus: Jedes Molekül und jedes Enzym ist ein eigener Block. Baue die Kette Molekül → Enzym → Molekül …; wo sich der Weg verzweigt, folgt das Startmolekül des Zweigs direkt auf das vorige Produkt.",
  pwOnlyNote:"Names are hidden: recognise each molecule by its structure. Everything is named after Check.|Les noms sont masqués : reconnaissez chaque molécule à sa structure. Tout est nommé après Vérifier.|Die Namen sind ausgeblendet: Erkenne jedes Molekül an seiner Struktur. Nach „Prüfen“ wird alles benannt.",
  pwNoStruct:"no single structure|pas de structure unique|keine Einzelstruktur",
  pwHidden:"structure|structure|Struktur", pwAbbr:"Abbreviations in the structures|Abréviations dans les structures|Abkürzungen in den Strukturen",
  pwLegend:"Abbreviations in the structures: R, R′ = rest of the carbon chain · CoA = coenzyme A · ACP = acyl carrier protein · E₂ = lysine of the E2 subunit · UDP = uridine diphosphate · Glu = glutamate tail · A = –CH₂COO⁻ (acetate) · P = –CH₂CH₂COO⁻ (propionate) · M = –CH₃ · V = –CH=CH₂ · PG = propionate esterified with glucuronic acid (conjugated bilirubin). Charges as at pH 7.4.|Abréviations dans les structures : R, R′ = reste de la chaîne carbonée · CoA = coenzyme A · ACP = protéine porteuse d'acyles · E₂ = lysine de la sous-unité E2 · UDP = uridine diphosphate · Glu = queue glutamate · A = –CH₂COO⁻ (acétate) · P = –CH₂CH₂COO⁻ (propionate) · M = –CH₃ · V = –CH=CH₂ · PG = propionate estérifié par l'acide glucuronique (bilirubine conjuguée). Charges à pH 7,4.|Abkürzungen in den Strukturen: R, R′ = Rest der Kohlenstoffkette · CoA = Coenzym A · ACP = Acyl-Carrier-Protein · E₂ = Lysin der E2-Untereinheit · UDP = Uridindiphosphat · Glu = Glutamatrest · A = –CH₂COO⁻ (Acetat) · P = –CH₂CH₂COO⁻ (Propionat) · M = –CH₃ · V = –CH=CH₂ · PG = mit Glucuronsäure verestertes Propionat (konjugiertes Bilirubin). Ladungen wie bei pH 7,4."
});

let PWST = store.get('pwStruct', 'off');            // 'off' | 'on' | 'only'
let PW_CTX = false, PW_REVEAL = false;              // set while drill 1 renders
function pwStructOf(id){ if (PMAP[id] && MOL[PMAP[id]]) return {id:PMAP[id], m:MOL[PMAP[id]]}; if (PMOL[id]) return {id, m:PMOL[id]}; return null; }
function pwSVG(id, maxW, maxH){
  const st = pwStructOf(id); if (!st) return '';
  const na = st.m.a.length, f = na > 34 ? 1.45 : na > 22 ? 1.2 : 1; maxW *= f; maxH *= f;
  const svg = molSVG(st.id, {m:st.m, bl:22, title:mol(id)}), mm = svg.match(/width="(\d+)" height="(\d+)"/);
  if (!mm) return svg; const w = +mm[1], h = +mm[2], k = Math.min(1, maxW/w, maxH/h);
  return svg.replace(mm[0], `width="${Math.max(18, Math.round(w*k))}" height="${Math.max(14, Math.round(h*k))}"`);
}
const pwOn = () => PW_CTX && PWST !== 'off';
const pwHideNames = () => PW_CTX && PWST === 'only' && !PW_REVEAL;

/* ---------- block bodies with structures ---------- */
{ const _bb = blkBody;
  blkBody = function(d, hide){
    if (!pwOn() || (d.t !== 'mol' && d.t !== 'step')) return _bb(d, hide);
    const big = PWST === 'only';
    if (d.t === 'mol'){ const svg = pwSVG(d.id, big ? 170 : 150, big ? 112 : 96);
      if (!svg) return `<span class="bk-m">${esc(mol(d.id))}</span><span class="bk-ns">${u('pwNoStruct')}</span>`;
      return `<span class="bk-st">${svg}</span>` + (pwHideNames() ? '' : `<span class="bk-m">${esc(mol(d.id))}</span>`); }
    const p = PW[d.p], s = p.st[d.i], hn = pwHideNames();
    const one = (id, hid) => hid ? `<span class="bk-m bk-hid" aria-label="?">?</span>` : (pwSVG(id, 104, 70) || `<span class="bk-m">${esc(mol(id))}</span>`);
    return `<span class="bk-strx">${one(s[0], hide)}<span class="bk-ar" aria-hidden="true">→</span>${one(s[1], false)}</span>`
      + (hn ? '' : `<span class="bk-rx">${hide ? '' : `<span class="bk-m">${esc(mol(s[0]))}</span><span class="bk-ar" aria-hidden="true">→</span>`}<span class="bk-m">${esc(mol(s[1]))}</span></span>`)
      + `<span class="bk-meta"><span class="bk-e">${esc(typeof enzShort === 'function' ? enzShort(s[2]) : enz(s[2]))}</span>` + (s[3] ? `<span class="bk-sd">${tokHTML(T(s[3]))}</span>` : '') + `</span>`;
  };
  const _ll = lastLabel;
  lastLabel = function(d){ if (pwHideNames() && d.t === 'mol' && pwStructOf(d.id)) return '🧪 ' + u('pwHidden');
    if (pwHideNames() && d.t === 'step') return enz(PW[d.p].st[d.i][2]); return _ll(d); };
}

/* ---------- "Molecules + enzymes" mode ---------- */
{ const _n = newD1;
  newD1 = function(pid, mode){
    const m = mode || (S.d1 && S.d1.mode) || 'cards';
    if (m !== 'split') return _n.apply(this, arguments);
    _n.call(this, pid, 'cards');                      // picks the pathway (learning path rules apply)
    const p = PW[S.d1.pid], items = [];
    p.st.forEach((s, i) => {
      if (i > 0 && s[0] !== p.st[i - 1][1]) items.push({ans:'m:' + s[0], d:{t:'mol', id:s[0]}});   // new branch start
      items.push({ans:'e:' + s[2], d:{t:'enz', id:s[2]}});
      items.push({ans:'m:' + s[1], d:{t:'mol', id:s[1]}}); });
    S.d1.o = makeOrder(items, {t:'mol', id:p.st[0][0]}); S.d1.mode = 'split';
  };
}

/* ---------- drill 1 page: extra controls, flags and notes ---------- */
A.pwst = el => { PWST = el.dataset.v; store.set('pwStruct', PWST); render(); };
{ const _r = RENDER.pathways;
  RENDER.pathways = function(){
    if (!S.d1) newD1('glycolysis', 'cards');
    PW_CTX = true; PW_REVEAL = !!(S.d1 && S.d1.o && S.d1.o.checked);
    let h; try { h = _r(); } finally { PW_CTX = false; PW_REVEAL = false; }
    const modes = [['cards', 'modeCards'], ['enz', 'modeEnz'], ['mol', 'modeMol']].map(x => [x[0], U[x[1]]]);
    const oldSeg = segmented(u('mode'), modes, S.d1.mode, 'd1mode'), newSeg = segmented(u('mode'), modes.concat([['split', U.modeSplit]]), S.d1.mode, 'd1mode');
    const stSeg = `<div class="field"><span>${u('pwStruct')}</span>${segmented(u('pwStruct'), [['off', U.pwStOff], ['on', U.pwStOn], ['only', U.pwStOnly]], PWST, 'pwst')}</div>`;
    if (h.indexOf(oldSeg) >= 0) h = h.replace(oldSeg, newSeg + '</div>' + stSeg.slice(0, -6));
    const notes = (S.d1.mode === 'split' ? `<p class="note">🧩 ${u('pwSplitNote')}</p>` : '')
      + (PWST === 'only' && !S.d1.o.checked ? `<p class="note">🧪 ${u('pwOnlyNote')}</p>` : '');
    const kc = h.indexOf('<div class="card"><div class="bb');
    if (notes && kc >= 0) h = h.slice(0, kc) + notes + h.slice(kc);
    if (PWST !== 'off'){
      const leg = `<details class="pwleg"><summary>${u('pwAbbr')}</summary><p class="note">${u('pwLegend')}</p></details>`;
      const k2 = h.indexOf('<div class="card mapcard">', kc);
      h = k2 > 0 ? h.slice(0, k2) + leg + h.slice(k2) : h + leg; }
    return h;
  };
}

/* ---------- manual: new options of drill 1 ---------- */
if (typeof MANW !== 'undefined' && MANW.pathways && MANW.pathways.m){
  const m = MANW.pathways.m, at = m.length - 1;
  m.splice(at, 0,
    ["Molecules + enzymes|Molécules + enzymes|Moleküle + Enzyme", "Hardest mode: every molecule and every enzyme is its own block, so you must know each intermediate and which enzyme converts it. Build molecule → enzyme → molecule …; at a branch, the branch's first molecule follows the previous product.|Mode le plus difficile : chaque molécule et chaque enzyme est un bloc à part ; il faut connaître chaque intermédiaire et l'enzyme qui le transforme. Construisez molécule → enzyme → molécule … ; à une ramification, la première molécule de la branche suit le produit précédent.|Schwerster Modus: Jedes Molekül und jedes Enzym ist ein eigener Block; du musst jedes Zwischenprodukt und sein Enzym kennen. Baue Molekül → Enzym → Molekül …; bei einer Verzweigung folgt das erste Molekül des Zweigs auf das vorige Produkt."],
    ["Structures: with names / structures only|Structures : avec noms / structures seules|Strukturen: mit Namen / nur Strukturen", "Molecule blocks (and reaction cards) show the structural formula at pH 7.4. ‘Structures only’ hides the names until Check, so you recognise intermediates by what changes (a phosphate added, a carbon lost as CO₂, an OH oxidised to C=O). Lipoproteins and polymers have no single structure and keep their name. Abbreviations (R, CoA, ACP, A/P/M/V on porphyrins) are listed under the chain.|Les blocs de molécules (et les cartes de réactions) montrent la formule développée à pH 7,4. « Structures seules » masque les noms jusqu'à Vérifier : on reconnaît les intermédiaires à ce qui change (phosphate ajouté, carbone perdu en CO₂, OH oxydé en C=O). Lipoprotéines et polymères n'ont pas de structure unique et gardent leur nom. Les abréviations (R, CoA, ACP, A/P/M/V des porphyrines) sont listées sous la chaîne.|Molekülblöcke (und Reaktionskarten) zeigen die Strukturformel bei pH 7,4. „Nur Strukturen“ blendet die Namen bis „Prüfen“ aus: Du erkennst Zwischenprodukte daran, was sich ändert (Phosphat angehängt, C als CO₂ abgespalten, OH zu C=O oxidiert). Lipoproteine und Polymere haben keine Einzelstruktur und behalten ihren Namen. Abkürzungen (R, CoA, ACP, A/P/M/V bei Porphyrinen) stehen unter der Kette."]);
}
