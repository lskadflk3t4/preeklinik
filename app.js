/* ===================== CORE ===================== */
const LI = {en:0, fr:1, de:2};
let L = 'en';
const store = {
  get(k, d){ try { const v = localStorage.getItem('metab.'+k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('metab.'+k, JSON.stringify(v)); } catch(e){} }
};
function T(x){
  if (x == null) return '';
  if (typeof x === 'function') return x(L);
  if (Array.isArray(x)) return x[LI[L]] != null ? x[LI[L]] : x[0];
  const s = String(x);
  if (s.indexOf('|') >= 0){ const p = s.split('|'); return p[LI[L]] != null ? p[LI[L]] : p[0]; }
  return s;
}
function TEN(x){ const k = L; L = 'en'; const r = T(x); L = k; return r; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function shuffle(a){ a = a.slice(); for (let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function uniq(a){ return Array.from(new Set(a)); }
function fmt(x){ let s = (Math.round(x*100)/100).toString(); if (L !== 'en') s = s.replace('.', ','); return s; }

const U = {
appTitle:"Metabolism Drills|Exercices de métabolisme|Stoffwechsel-Training",
subtitle:"{n} pathways · 9 drill types · EN / FR / DE|{n} voies · 9 types d'exercices · EN / FR / DE|{n} Stoffwechselwege · 9 Übungstypen · EN / FR / DE",
d1t:"Pathway reconstruction|Reconstruction des voies|Wege rekonstruieren", d1d:"Put the steps of a pathway in the right order, as reactions, enzymes or molecules.|Remettez les étapes d'une voie dans l'ordre : réactions, enzymes ou molécules.|Bringe die Schritte eines Wegs in die richtige Reihenfolge – als Reaktionen, Enzyme oder Moleküle.",
d2t:"What happens next?|Et ensuite ?|Was passiert als Nächstes?", d2d:"Walk through a pathway and predict each next molecule, enzyme or cofactor.|Parcourez une voie et prédisez la molécule, l'enzyme ou le cofacteur suivant.|Gehe einen Weg Schritt für Schritt durch und sage Molekül, Enzym oder Cofaktor voraus.",
d3t:"Organ metabolism|Métabolisme des organes|Organstoffwechsel", d3d:"Which organ does what: liver, muscle, brain, kidney, adipose tissue, red cells.|Quel organe fait quoi : foie, muscle, cerveau, rein, tissu adipeux, globules rouges.|Welches Organ macht was: Leber, Muskel, Gehirn, Niere, Fettgewebe, Erythrozyten.",
d4t:"Hormone response|Réponse hormonale|Hormonwirkung", d4d:"Predict how insulin, glucagon, adrenaline and cortisol change each pathway.|Prédisez l'effet de l'insuline, du glucagon, de l'adrénaline et du cortisol sur chaque voie.|Sage voraus, wie Insulin, Glucagon, Adrenalin und Cortisol jeden Weg verändern.",
d5t:"Metabolic switching|Adaptations métaboliques|Stoffwechselumstellung", d5d:"Fed, fasting, starvation, sprint, endurance: identify the state and order the events.|Nourri, jeûne, inanition, sprint, endurance : identifiez l'état et ordonnez les événements.|Resorption, Fasten, Hunger, Sprint, Ausdauer: Zustand erkennen und Abläufe ordnen.",
d6t:"Enzyme detective|Détective des enzymes|Enzym-Detektiv", d6d:"Enzymes, substrates, products, regulators, cofactors, deficiencies and drugs.|Enzymes, substrats, produits, régulateurs, cofacteurs, déficits et médicaments.|Enzyme, Substrate, Produkte, Regulatoren, Cofaktoren, Defekte und Arzneistoffe.",
d7t:"Missing molecule|Molécule manquante|Fehlendes Molekül", d7d:"Fill the gaps in a pathway map with the right molecule or enzyme.|Complétez les trous d'une carte métabolique avec la bonne molécule ou enzyme.|Fülle die Lücken einer Stoffwechselkarte mit dem richtigen Molekül oder Enzym.",
d8t:"Clinical cases|Cas cliniques|Klinische Fälle", d8d:"Solve scenarios (diabetes, fasting, exercise, inborn errors, poisoning) and match storage, urea-cycle, fatty-acid and amino-acid disorders.|Résolvez des situations (diabète, jeûne, effort, maladies héréditaires, intoxications) et associez glycogénoses, maladies lysosomales, déficits du cycle de l'urée, des acides gras et des acides aminés.|Löse Fälle (Diabetes, Fasten, Belastung, angeborene Defekte, Vergiftungen) und ordne Speicher-, Harnstoffzyklus-, Fettsäure- und Aminosäuredefekte zu.",
d9t:"Energy calculations|Calculs énergétiques|Energieberechnungen", d9d:"Calculate ATP yields and compare carbohydrate, fat, protein and alcohol.|Calculez les rendements en ATP et comparez glucides, lipides, protéines et alcool.|Berechne ATP-Ausbeuten und vergleiche Kohlenhydrate, Fette, Proteine und Alkohol.",
back:"All drills|Tous les exercices|Alle Übungen", pathway:"Pathway|Voie|Weg", random:"Random pathway|Voie au hasard|Zufälliger Weg", mode:"Mode|Mode|Modus",
check:"Check|Vérifier|Prüfen", next:"Next|Suivant|Weiter", reshuffle:"New round|Nouvelle série|Neue Runde", showMap:"Show pathway map|Afficher la carte|Karte anzeigen", hideMap:"Hide map|Masquer la carte|Karte ausblenden",
correct:"Correct|Correct|Richtig", wrong:"Not quite|Pas tout à fait|Nicht ganz", reset:"Reset scores|Réinitialiser les scores|Punkte zurücksetzen",
pool:"Tap the cards in order|Touchez les cartes dans l'ordre|Tippe die Karten der Reihe nach an", seq:"Your order (tap a card to remove it)|Votre ordre (touchez une carte pour la retirer)|Deine Reihenfolge (zum Entfernen antippen)",
modeCards:"Full reactions|Réactions complètes|Vollständige Reaktionen", modeEnz:"Enzymes only|Enzymes seules|Nur Enzyme", modeMol:"Molecules only|Molécules seules|Nur Moleküle",
irr:"irreversible|irréversible|irreversibel", rl:"rate-limiting|limitante|geschwindigkeitsbestimmend", backToStart:"back to the start (cycle)|retour au départ (cycle)|zurück zum Anfang (Zyklus)",
newBranch:"separate branch / parallel step|branche séparée / étape parallèle|separater Zweig / paralleler Schritt", allCorrect:"All in the right order!|Tout est dans le bon ordre !|Alles in der richtigen Reihenfolge!",
nCorrect:"{n}/{t} positions correct. Correct order:|{n}/{t} positions correctes. Ordre correct :|{n}/{t} Positionen richtig. Richtige Reihenfolge:",
qNextMol:"What is the next molecule?|Quelle est la molécule suivante ?|Welches Molekül kommt als Nächstes?", qNextEnz:"Which enzyme catalyses the next step?|Quelle enzyme catalyse l'étape suivante ?|Welches Enzym katalysiert den nächsten Schritt?",
qNextSide:"What else happens in the next step (cofactor, co-substrate, by-product)?|Que se passe-t-il d'autre à l'étape suivante (cofacteur, co-substrat, sous-produit) ?|Was passiert im nächsten Schritt sonst noch (Cofaktor, Cosubstrat, Nebenprodukt)?",
fromMol:"Current molecule|Molécule actuelle|Aktuelles Molekül", done:"Pathway complete|Voie terminée|Weg abgeschlossen", restart:"Same pathway again|Recommencer cette voie|Diesen Weg nochmal", another:"Another pathway|Une autre voie|Anderer Weg",
selectAll:"Select every organ that applies, then check.|Sélectionnez tous les organes concernés, puis vérifiez.|Wähle alle zutreffenden Organe aus und prüfe.",
hormone:"Hormone|Hormone|Hormon", matrix:"Effect matrix|Matrice des effets|Wirkungsmatrix", mcq:"Mechanisms|Mécanismes|Mechanismen", phos:"Phosphorylation switch|Interrupteur de phosphorylation|Phosphorylierungsschalter",
up:"↑ stimulates|↑ stimule|↑ steigert", down:"↓ inhibits|↓ inhibe|↓ hemmt", none:"– no major direct effect|– pas d'effet direct majeur|– keine wesentliche direkte Wirkung",
matrixHelp:"For each process, choose the effect of the hormone, then check the whole matrix.|Pour chaque processus, choisissez l'effet de l'hormone, puis vérifiez toute la matrice.|Wähle für jeden Prozess die Wirkung des Hormons und prüfe dann die ganze Matrix.",
phosQ:"In which state is this enzyme ACTIVE?|Dans quel état cette enzyme est-elle ACTIVE ?|In welchem Zustand ist dieses Enzym AKTIV?", phosP:"Phosphorylated|Phosphorylée|Phosphoryliert", phosD:"Dephosphorylated|Déphosphorylée|Dephosphoryliert",
phosRule:"Rule of thumb: enzymes of fuel storage (synthesis) are active when dephosphorylated (insulin → phosphatases); enzymes of fuel mobilization are active when phosphorylated (glucagon/adrenaline → PKA).|Règle : les enzymes du stockage (synthèse) sont actives déphosphorylées (insuline → phosphatases) ; celles de la mobilisation des réserves sont actives phosphorylées (glucagon/adrénaline → PKA).|Faustregel: Enzyme der Speicherung (Synthese) sind dephosphoryliert aktiv (Insulin → Phosphatasen); Enzyme der Mobilisierung sind phosphoryliert aktiv (Glucagon/Adrenalin → PKA).",
activators:"Activators|Activateurs|Aktivatoren", inhibitors:"Inhibitors|Inhibiteurs|Hemmstoffe",
whichState:"Which metabolic state fits best?|Quel état métabolique correspond le mieux ?|Welcher Stoffwechselzustand passt am besten?", order:"Put in order|Mettre en ordre|In Reihenfolge bringen", classify:"Identify the state|Identifier l'état|Zustand erkennen",
timeline:"Sequence|Séquence|Ablauf", category:"Category|Catégorie|Kategorie", allCats:"All categories|Toutes les catégories|Alle Kategorien",
gaps:"Gaps|Trous|Lücken", gaps1:"1 molecule|1 molécule|1 Molekül", gaps3:"3 molecules|3 molécules|3 Moleküle", gapsAll:"All molecules|Toutes les molécules|Alle Moleküle", gapsEnz:"All enzymes|Toutes les enzymes|Alle Enzyme", gapsMix:"Mix (2 molecules + 2 enzymes)|Mélange (2 molécules + 2 enzymes)|Gemischt (2 Moleküle + 2 Enzyme)",
choose:"— choose —|— choisir —|— wählen —", caseOf:"Case {i} of {n}|Cas {i} sur {n}|Fall {i} von {n}", question:"Question {i} of {n}|Question {i} sur {n}|Frage {i} von {n}", nextCase:"Next case|Cas suivant|Nächster Fall", allCases:"Choose a case|Choisir un cas|Fall wählen",
po:"ATP values|Valeurs d'ATP|ATP-Werte", poModern:"Modern: NADH 2.5 · FADH₂ 1.5|Moderne : NADH 2,5 · FADH₂ 1,5|Modern: NADH 2,5 · FADH₂ 1,5", poClassic:"Classic: NADH 3 · FADH₂ 2|Classique : NADH 3 · FADH₂ 2|Klassisch: NADH 3 · FADH₂ 2",
breakdown:"Breakdown|Détail du calcul|Rechenweg", typeNumber:"Your answer|Votre réponse|Deine Antwort", answerIs:"Answer: {a}|Réponse : {a}|Lösung: {a}",
qAct:"Is this an activator or an inhibitor of the enzyme?|Est-ce un activateur ou un inhibiteur de l'enzyme ?|Ist dies ein Aktivator oder ein Hemmstoff des Enzyms?", activator:"Activator|Activateur|Aktivator", inhibitor:"Inhibitor|Inhibiteur|Hemmstoff",
qEnzFor:"Which enzyme catalyses this reaction?|Quelle enzyme catalyse cette réaction ?|Welches Enzym katalysiert diese Reaktion?", qRxnFor:"Which reaction does this enzyme catalyse?|Quelle réaction cette enzyme catalyse-t-elle ?|Welche Reaktion katalysiert dieses Enzym?",
qCof:"Which cofactor does this enzyme need?|Quel cofacteur cette enzyme utilise-t-elle ?|Welchen Cofaktor braucht dieses Enzym?", qDef:"A deficiency of this enzyme causes…|Un déficit de cette enzyme provoque…|Ein Mangel dieses Enzyms verursacht…",
qDrug:"Which drug or toxin inhibits this enzyme?|Quel médicament ou toxique inhibe cette enzyme ?|Welcher Arzneistoff oder welches Gift hemmt dieses Enzym?", qRL:"Which enzyme is rate-limiting in this pathway?|Quelle enzyme est limitante dans cette voie ?|Welches Enzym ist in diesem Weg geschwindigkeitsbestimmend?",
qLoc:"Where does this reaction take place?|Où cette réaction a-t-elle lieu ?|Wo findet diese Reaktion statt?", qType:"Question type|Type de question|Fragetyp", any:"Mixed|Mélange|Gemischt",
tReact:"Reaction → enzyme|Réaction → enzyme|Reaktion → Enzym", tEnz:"Enzyme → reaction|Enzyme → réaction|Enzym → Reaktion", tReg:"Activators & inhibitors|Activateurs et inhibiteurs|Aktivatoren & Hemmstoffe", tCof:"Cofactors|Cofacteurs|Cofaktoren",
tClin:"Deficiencies & drugs|Déficits et médicaments|Defekte & Arzneistoffe", tRL:"Rate-limiting enzymes|Enzymes limitantes|Schrittmacherenzyme", tLoc:"Cell location|Localisation cellulaire|Zellulärer Ort",
accuracy:"accuracy|réussite|Trefferquote", answered:"answered|répondues|beantwortet", noneYet:"not started|pas commencé|noch nicht begonnen",
studyNote:"Study the map, hide it, then try.|Étudiez la carte, masquez-la, puis essayez.|Karte lernen, ausblenden, dann probieren.", fixedStart:"Start|Départ|Start",
molModeNA:"Molecule mode needs an unbranched pathway, so this one shows reaction cards.|Le mode molécules nécessite une voie non ramifiée : cartes de réactions affichées.|Der Molekülmodus braucht einen unverzweigten Weg; hier werden Reaktionskarten gezeigt.",
clear:"Clear|Effacer|Leeren", steps:"steps|étapes|Schritte", library:"Pathway library|Bibliothèque des voies|Wegbibliothek",
libraryNote:"Open any pathway as a map and drill it.|Ouvrez n'importe quelle voie sous forme de carte et entraînez-vous.|Öffne jeden Weg als Karte und übe ihn.", inPathway:"Pathway: {p}|Voie : {p}|Weg: {p}",
summary:"Summary|Résumé|Zusammenfassung", score:"{c} / {n} correct|{c} / {n} correctes|{c} / {n} richtig", locLbl:"location|localisation|Ort",
fillAll:"Fill every gap first.|Remplissez d'abord tous les trous.|Fülle zuerst alle Lücken.", placeAll:"Place every card first.|Placez d'abord toutes les cartes.|Lege zuerst alle Karten.",
defLbl:"Deficiency|Déficit|Mangel", drugLbl:"Drug / toxin|Médicament / toxique|Arzneistoff / Gift",
tabCases:"Cases|Cas|Fälle", tabMatch:"Disease matcher|Associer les maladies|Krankheiten zuordnen", group:"Group|Groupe|Gruppe", allGroups:"All groups|Tous les groupes|Alle Gruppen",
qFeat:"Which disease fits these findings?|Quelle maladie correspond à ces signes ?|Welche Krankheit passt zu diesen Befunden?", qDisEnz:"Which enzyme or protein is defective?|Quelle enzyme ou protéine est déficiente ?|Welches Enzym oder Protein ist defekt?",
placed:"{n}/{t} placed|{n}/{t} placées|{n}/{t} gelegt", undo:"Undo|Annuler|Zurück", lastPlaced:"Last|Dernière|Zuletzt", more:"Overview|Aperçu|Überblick",
refCard:"Reference values|Valeurs de référence|Referenzwerte", progress:"Your progress is saved in this browser.|Votre progression est enregistrée dans ce navigateur.|Dein Fortschritt wird in diesem Browser gespeichert."
};
function u(k, v){ let s = T(U[k]); if (v) for (const key in v) s = s.split('{'+key+'}').join(v[key]); return s; }

const PW = {}; P.forEach(p => PW[p.id] = p);
const mol = id => T(M[id]); const enz = id => T(E[id]);
const isCont = p => p.st.every((s,i) => i === 0 || s[0] === p.st[i-1][1]);
const stepLoc = (p, s) => s[4] || p.loc;

/* ===================== SCORES ===================== */
/* Progress is kept per device so that syncing (PWA build) merges without conflicts: totals = sum over devices. */
const DEVICE = store.get('device', null) || (() => { const id = 'd' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); store.set('device', id); return id; })();
let PROG = store.get('prog', null);
if (!PROG || !PROG.devices){ PROG = {resetAt:0, devices:{}}; const old = store.get('scores', null); PROG.devices[DEVICE] = {scores:old || {}, updated:Date.now(), epoch:0, name:''}; store.set('prog', PROG); }
if (!PROG.devices[DEVICE]) PROG.devices[DEVICE] = {scores:{}, updated:0, epoch:PROG.resetAt || 0, name:''};
function totals(){ const t = {}; for (const id in PROG.devices){ const d = PROG.devices[id]; if ((d.epoch || 0) < (PROG.resetAt || 0)) continue;
  for (const k in d.scores){ const s = t[k] || (t[k] = {c:0, n:0}); s.c += d.scores[k].c; s.n += d.scores[k].n; } } return t; }
let SCORES = totals();
let ON_SCORE = null; // hook used by sync.js
function saveProg(){ store.set('prog', PROG); SCORES = totals(); }
function addScore(id, c, n){ const me = PROG.devices[DEVICE]; const s = me.scores[id] || (me.scores[id] = {c:0, n:0}); s.c += c; s.n += n; me.updated = Date.now(); saveProg(); renderHeader(); if (ON_SCORE) ON_SCORE(); }
function resetProgress(){ PROG.resetAt = Date.now(); const nm = PROG.devices[DEVICE].name || ''; PROG.devices = {}; PROG.devices[DEVICE] = {scores:{}, updated:Date.now(), epoch:PROG.resetAt, name:nm}; saveProg(); if (ON_SCORE) ON_SCORE(); }
function mergeProg(remote){
  if (!remote || !remote.devices) return false;
  PROG.resetAt = Math.max(PROG.resetAt || 0, remote.resetAt || 0);
  for (const id in remote.devices){ if (id === DEVICE) continue; const r = remote.devices[id], l = PROG.devices[id]; if (!l || (r.updated || 0) > (l.updated || 0)) PROG.devices[id] = r; }
  const me = PROG.devices[DEVICE]; if ((me.epoch || 0) < PROG.resetAt){ me.scores = {}; me.epoch = PROG.resetAt; me.updated = Date.now(); }
  for (const id in PROG.devices){ if (id !== DEVICE && (PROG.devices[id].epoch || 0) < PROG.resetAt) delete PROG.devices[id]; }
  saveProg(); return true;
}
function scoreChip(id){ const s = SCORES[id]; if (!s || !s.n) return `<span class="chip muted">${u('noneYet')}</span>`;
  const pct = Math.round(100*s.c/s.n); const cls = pct >= 80 ? 'good' : pct >= 50 ? 'warn' : 'bad';
  return `<span class="chip ${cls}">${pct}% · ${s.c}/${s.n}</span>`; }

/* ===================== SHARED UI ===================== */
function pathwaySelect(cur, act, withRandom){
  let h = `<label class="field"><span>${u('pathway')}</span><select data-chg="${act}" id="sel-${act}">`;
  if (withRandom) h += `<option value="__rand">${esc(u('random'))}</option>`;
  for (const c in CATS){ h += `<optgroup label="${esc(T(CATS[c]))}">`;
    P.filter(p => p.cat === c).forEach(p => { h += `<option value="${p.id}"${p.id === cur ? ' selected' : ''}>${esc(T(p.n))}</option>`; });
    h += `</optgroup>`; }
  return h + `</select></label>`;
}
function segmented(name, opts, cur, act){
  return `<div class="seg" role="group" aria-label="${esc(name)}">` + opts.map(o => `<button type="button" class="${o[0] === cur ? 'on' : ''}" data-act="${act}" data-v="${o[0]}" aria-pressed="${o[0] === cur}">${esc(T(o[1]))}</button>`).join('') + `</div>`;
}
function tagsHTML(p, s){
  let h = ''; if (s[5] && s[5].indexOf('i') >= 0) h += `<span class="tag irr">${u('irr')}</span>`;
  if (s[5] && s[5].indexOf('r') >= 0) h += `<span class="tag rl">${u('rl')}</span>`;
  const lc = stepLoc(p, s); if (lc && LOC[lc]) h += `<span class="tag loc">${esc(T(LOC[lc]))}</span>`;
  return h;
}
function rxnHTML(p, i, opt){ opt = opt || {}; const s = p.st[i];
  return `<span class="rxn"><span class="m">${esc(mol(s[0]))}</span><span class="ar">→</span><span class="m">${esc(mol(s[1]))}</span></span>`
    + (opt.noEnz ? '' : `<span class="e">${esc(enz(s[2]))}</span>`)
    + (s[3] && !opt.noSide ? `<span class="side">${esc(T(s[3]))}</span>` : '')
    + (opt.tags ? `<span class="tags">${tagsHTML(p, s)}</span>` : '');
}
/* Pathway map; B = blanks {key:{kind,opts,val,state,ans}} */
function blankSel(key, b){
  const cls = b.state === 'ok' ? 'ok' : b.state === 'no' ? 'no' : '';
  let h = `<select class="blank ${cls}" data-chg="d7sel" data-key="${key}" aria-label="${esc(u('choose'))}"${b.state ? ' disabled' : ''}><option value="">${esc(u('choose'))}</option>`;
  b.opts.forEach(o => { h += `<option value="${o}"${b.val === o ? ' selected' : ''}>${esc(b.kind === 'm' ? mol(o) : enz(o))}</option>`; });
  h += `</select>`;
  if (b.state === 'no') h += `<span class="fix">→ ${esc(b.kind === 'm' ? mol(b.ans) : enz(b.ans))}</span>`;
  return h;
}
function mapHTML(p, B){ B = B || {};
  const node = (key, id) => `<li class="node">${B[key] ? blankSel(key, B[key]) : `<span class="m big">${esc(mol(id))}</span>`}</li>`;
  let h = `<ol class="map" aria-label="${esc(T(p.n))}">`;
  p.st.forEach((s, i) => {
    if (i === 0 || s[0] !== p.st[i-1][1]){ if (i > 0) h += `<li class="branch">⤷ ${esc(u('newBranch'))}</li>`; h += node('s'+i, s[0]); }
    h += `<li class="arrow"><span class="stem" aria-hidden="true"></span><div class="ab">`
      + (B['e'+i] ? blankSel('e'+i, B['e'+i]) : `<span class="e">${esc(enz(s[2]))}</span>`)
      + (s[3] ? `<span class="side">${esc(T(s[3]))}</span>` : '') + `<span class="tags">${tagsHTML(p, s)}</span></div></li>`;
    h += node('p'+i, s[1]);
  });
  if (p.cyc) h += `<li class="loop">↺ ${esc(u('backToStart'))}</li>`;
  return h + `</ol>`;
}
let INFO_OPEN = null;
function infoHTML(p){ if (INFO_OPEN === null) INFO_OPEN = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(min-width: 700px)').matches : true;
  return `<details class="info"${INFO_OPEN ? ' open' : ''}><summary><span class="catlbl">${esc(T(CATS[p.cat]))}</span><span class="info-h"><h3>${esc(T(p.n))}</h3><span class="chip muted">${p.st.length} ${u('steps')}</span></span></summary><p>${esc(T(p.s))}</p></details>`; }

/* ===== Ordering component (drills 1 and 5) ===== */
function makeOrder(items, fixed){ // items: [{ans, d}] in correct order
  const its = items.map((it, k) => ({uid:'u'+k, ans:it.ans, d:it.d}));
  return {items:its, correct:its.map(i => i.ans), pool:shuffle(its.map(i => i.uid)), seq:[], checked:false, res:[], fixed:fixed || null, msg:null};
}
function descHTML(d){
  if (d.t === 'step') return rxnHTML(PW[d.p], d.i, {noEnz:false});
  if (d.t === 'enz') return `<span class="e">${esc(enz(d.id))}</span>`;
  if (d.t === 'mol') return `<span class="m">${esc(mol(d.id))}</span>`;
  return `<span class="txt">${esc(T(d.x))}</span>`;
}
function orderHTML(o, ns){
  const get = uid => o.items.find(i => i.uid === uid);
  const off = o.fixed ? 1 : 0;
  let h = `<div class="order"><div class="col seqcol"><div class="col-h">${u('seq')}</div><ol class="seqlist">`;
  if (o.fixed) h += `<li><div class="oitem fixed"><span class="onum">1</span>${descHTML(o.fixed)}<span class="chip muted">${u('fixedStart')}</span></div></li>`;
  o.seq.forEach((uid, k) => { const cls = o.checked ? (o.res[k] ? 'ok' : 'no') : '';
    h += `<li><button type="button" class="oitem ${cls}" data-act="ounpick" data-ns="${ns}" data-uid="${uid}"${o.checked ? ' disabled' : ''}><span class="onum">${k+1+off}</span>${descHTML(get(uid).d)}</button></li>`; });
  if (!o.seq.length && !o.fixed) h += `<li class="empty">…</li>`;
  h += `</ol></div><div class="col poolcol"><div class="col-h">${u('pool')}</div><div class="poollist">`;
  o.pool.forEach(uid => { h += `<button type="button" class="oitem" data-act="opick" data-ns="${ns}" data-uid="${uid}">${descHTML(get(uid).d)}</button>`; });
  if (!o.pool.length) h += `<div class="empty">✓</div>`;
  h += `</div></div></div>`;
  if (!o.checked){ const last = o.seq.length ? get(o.seq[o.seq.length-1]).d : null;
    h += `<div class="obar"><div class="obar-info"><strong>${u('placed', {n:o.seq.length + off, t:o.correct.length + off})}</strong>${last ? `<span class="obar-last">${u('lastPlaced')}: ${esc(lastLabel(last))}</span>` : ''}</div>`
      + `<button type="button" class="btn" data-act="oundo" data-ns="${ns}"${o.seq.length ? '' : ' disabled'}>${u('undo')}</button><button type="button" class="btn" data-act="oclear" data-ns="${ns}"${o.seq.length ? '' : ' disabled'}>${u('clear')}</button>`
      + `<button type="button" class="btn primary" data-act="ocheck" data-ns="${ns}">${u('check')}</button></div>`; }
  if (o.msg) h += `<p class="note warn">${esc(u(o.msg))}</p>`;
  if (o.checked){ const n = o.res.filter(Boolean).length;
    if (n === o.correct.length) h += `<div class="fb ok"><strong>${u('allCorrect')}</strong></div>`;
    else { h += `<div class="fb no"><strong>${u('nCorrect', {n, t:o.correct.length})}</strong><ol class="solution" start="${1+off}">`;
      o.items.forEach(it => { h += `<li>${descHTML(it.d)}</li>`; }); h += `</ol></div>`; } }
  return h;
}
function lastLabel(d){ if (d.t === 'step'){ const s = PW[d.p].st[d.i]; return enz(s[2]); } if (d.t === 'enz') return enz(d.id); if (d.t === 'mol') return mol(d.id); return T(d.x); }
function orderState(ns){ return ns === 'd1' ? S.d1.o : ns === 'd5' ? S.d5.ord.o : S[ns].o; }

/* ===================== STATE ===================== */
const S = {};
let VIEW = 'home';
const DR = [
  {id:'pathways', k:'d1', n:1}, {id:'next', k:'d2', n:2}, {id:'organs', k:'d3', n:3}, {id:'hormones', k:'d4', n:4}, {id:'switching', k:'d5', n:5},
  {id:'enzymes', k:'d6', n:6}, {id:'missing', k:'d7', n:7}, {id:'cases', k:'d8', n:8}, {id:'energy', k:'d9', n:9}
];

/* ===================== D1 PATHWAY RECONSTRUCTION ===================== */
function newD1(pid, mode){
  const prev = S.d1 || {};
  const p = (!pid || pid === '__rand') ? pick(P.filter(x => x.st.length >= 3)) : PW[pid];
  mode = mode || prev.mode || 'cards';
  let eff = mode, msg = null;
  if (mode === 'mol' && !isCont(p)){ eff = 'cards'; msg = 'molModeNA'; }
  let o;
  if (eff === 'cards') o = makeOrder(p.st.map((s, i) => ({ans:'s'+i, d:{t:'step', p:p.id, i}})));
  else if (eff === 'enz') o = makeOrder(p.st.map(s => ({ans:s[2], d:{t:'enz', id:s[2]}})));
  else { let ch = [p.st[0][0]].concat(p.st.map(s => s[1])); if (p.cyc && ch[ch.length-1] === ch[0]) ch.pop();
    o = makeOrder(ch.slice(1).map(id => ({ans:id, d:{t:'mol', id}})), {t:'mol', id:ch[0]}); }
  o.msg = msg;
  S.d1 = {pid:p.id, mode, o, showMap: prev.showMap && prev.pid === p.id ? true : false};
}
function renderD1(){
  if (!S.d1) newD1('glycolysis', 'cards');
  const s = S.d1, p = PW[s.pid];
  let h = `<div class="controls">${pathwaySelect(s.pid, 'd1path', true)}<div class="field"><span>${u('mode')}</span>${segmented(u('mode'), [['cards','modeCards'],['enz','modeEnz'],['mol','modeMol']].map(x => [x[0], U[x[1]]]), s.mode, 'd1mode')}</div></div>`;
  h += infoHTML(p);
  h += `<div class="actions"><button type="button" class="btn" data-act="d1map">${s.showMap ? u('hideMap') : u('showMap')}</button><button type="button" class="btn" data-act="d1new">${u('reshuffle')}</button></div>`;
  if (s.showMap) h += `<div class="card mapcard"><p class="note">${u('studyNote')}</p>${mapHTML(p)}</div>`;
  h += `<div class="card">${orderHTML(s.o, 'd1')}</div>`;
  if (s.o.checked && !s.showMap) h += `<div class="card mapcard">${mapHTML(p)}</div>`;
  return h;
}

/* ===================== D2 WHAT HAPPENS NEXT ===================== */
function poolFrom(list, correct, exclude, labelFn){
  const cl = TEN(labelFn(correct)); const seen = new Set([cl]); const out = [];
  for (const x of list){ if (x === correct || (exclude && exclude.indexOf(x) >= 0)) continue; const lb = TEN(labelFn(x)); if (!lb || seen.has(lb)) continue; seen.add(lb); out.push(x); }
  return out;
}
function distract(kind, p, correct, exclude, k){
  k = k || 3;
  const lab = kind === 'm' ? (x => M[x]) : kind === 'e' ? (x => E[x]) : (x => x);
  const fromP = kind === 'm' ? uniq(p.st.flatMap(s => [s[0], s[1]])) : kind === 'e' ? uniq(p.st.map(s => s[2])) : uniq(p.st.map(s => s[3]).filter(Boolean));
  const sameCat = P.filter(q => q.cat === p.cat && q !== p);
  const fromC = kind === 'm' ? uniq(sameCat.flatMap(q => q.st.flatMap(s => [s[0], s[1]]))) : kind === 'e' ? uniq(sameCat.flatMap(q => q.st.map(s => s[2]))) : uniq(sameCat.flatMap(q => q.st.map(s => s[3]).filter(Boolean)));
  const all = kind === 'm' ? Object.keys(M) : kind === 'e' ? Object.keys(E) : uniq(P.flatMap(q => q.st.map(s => s[3]).filter(Boolean)));
  let out = poolFrom(shuffle(fromP), correct, exclude, lab).slice(0, k);
  if (out.length < k){ const more = poolFrom(shuffle(fromC), correct, (exclude || []).concat(out), lab).filter(x => !out.some(o => TEN(lab(o)) === TEN(lab(x)))); out = out.concat(more.slice(0, k - out.length)); }
  if (out.length < k){ const more = poolFrom(shuffle(all), correct, (exclude || []).concat(out), lab).filter(x => !out.some(o => TEN(lab(o)) === TEN(lab(x)))); out = out.concat(more.slice(0, k - out.length)); }
  return out;
}
function newD2(pid){
  const p = (!pid || pid === '__rand') ? pick(P.filter(x => x.st.length >= 3)) : PW[pid];
  S.d2 = {pid:p.id, i:0, ok:0, n:0, q:null}; makeQ2();
}
function makeQ2(){
  const s = S.d2, p = PW[s.pid]; if (s.i >= p.st.length){ s.q = null; return; }
  const st = p.st[s.i]; const types = ['m', 'm', 'e']; if (st[3]) types.push('x');
  const t = pick(types); let correct;
  if (t === 'm') correct = st[1]; else if (t === 'e') correct = st[2]; else correct = st[3];
  const ds = distract(t, p, correct, t === 'm' ? [st[0]] : null);
  s.q = {t, correct, opts:shuffle([correct].concat(ds)), chosen:null};
}
function optLabel(t, v){ return t === 'm' ? mol(v) : t === 'e' ? enz(v) : T(v); }
function renderD2(){
  if (!S.d2) newD2('krebs');
  const s = S.d2, p = PW[s.pid];
  let h = `<div class="controls">${pathwaySelect(s.pid, 'd2path', true)}</div>${infoHTML(p)}`;
  // trail
  if (s.i > 0){ h += `<div class="card trail"><ol>`; for (let k = 0; k < s.i; k++) h += `<li>${rxnHTML(p, k, {tags:false})}</li>`; h += `</ol></div>`; }
  if (!s.q){
    h += `<div class="card"><div class="fb ok"><strong>${u('done')}</strong> · ${u('score', {c:s.ok, n:s.n})}</div><div class="actions"><button type="button" class="btn primary" data-act="d2again">${u('restart')}</button><button type="button" class="btn" data-act="d2other">${u('another')}</button></div>${mapHTML(p)}</div>`;
    return h;
  }
  const st = p.st[s.i], q = s.q;
  const branch = s.i > 0 && st[0] !== p.st[s.i-1][1];
  h += `<div class="card qcard"><div class="qmeta">${s.i+1} / ${p.st.length}${branch ? ` · ⤷ ${esc(u('newBranch'))}` : ''}</div>`;
  h += `<div class="current"><span class="lbl">${u('fromMol')}</span><span class="m big">${esc(mol(st[0]))}</span></div>`;
  if (q.t !== 'm' && q.chosen == null) h += `<div class="current"><span class="lbl">→</span><span class="m big ghost">${esc(mol(st[1]))}</span></div>`;
  h += `<h3 class="q">${q.t === 'm' ? u('qNextMol') : q.t === 'e' ? u('qNextEnz') : u('qNextSide')}</h3><div class="opts">`;
  q.opts.forEach((o, k) => { let cls = ''; if (q.chosen != null){ if (o === q.correct) cls = 'ok'; else if (k === q.chosen) cls = 'no'; else cls = 'dim'; }
    h += `<button type="button" class="opt ${cls}" data-act="d2ans" data-k="${k}"${q.chosen != null ? ' disabled' : ''}>${esc(optLabel(q.t, o))}</button>`; });
  h += `</div>`;
  if (q.chosen != null){ const ok = q.opts[q.chosen] === q.correct;
    h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong><div class="stepfull">${rxnHTML(p, s.i, {tags:true})}</div></div><div class="actions"><button type="button" class="btn primary" data-act="d2next">${u('next')}</button></div>`; }
  return h + `</div>`;
}

/* ===================== D3 ORGANS ===================== */
function newD3(){ S.d3 = {order:shuffle(ORGQ.map((_, i) => i)), k:0, sel:[], checked:false}; }
function renderD3(){
  if (!S.d3) newD3(); const s = S.d3; const q = ORGQ[s.order[s.k]];
  let h = `<div class="card qcard"><div class="qmeta">${s.k+1} / ${ORGQ.length}</div><h3 class="q">${esc(T(q.q))}</h3><p class="note">${u('selectAll')}</p><div class="chips">`;
  Object.keys(ORG).forEach(o => { const on = s.sel.indexOf(o) >= 0; let cls = on ? 'on' : '';
    if (s.checked){ const right = q.a.indexOf(o) >= 0; cls = right && on ? 'ok' : right && !on ? 'miss' : !right && on ? 'no' : 'dim'; }
    h += `<button type="button" class="orgchip ${cls}" data-act="d3tog" data-o="${o}" aria-pressed="${on}"${s.checked ? ' disabled' : ''}><span class="orgicon" aria-hidden="true">${ORGICON[o]}</span>${esc(T(ORG[o]))}</button>`; });
  h += `</div>`;
  if (!s.checked) h += `<div class="actions"><button type="button" class="btn primary" data-act="d3check">${u('check')}</button></div>`;
  else { const ok = sameSet(s.sel, q.a);
    h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong> → ${q.a.map(o => esc(T(ORG[o]))).join(', ')}<p>${esc(T(q.x))}</p></div><div class="actions"><button type="button" class="btn primary" data-act="d3next">${u('next')}</button></div>`; }
  return h + `</div>`;
}
const ORGICON = {liver:'◆', muscle:'▮', brain:'●', kidney:'◗', adipose:'○', rbc:'◉'};
function sameSet(a, b){ return a.length === b.length && a.every(x => b.indexOf(x) >= 0); }

/* ===================== D4 HORMONES ===================== */
const PHOS = Object.keys(R).filter(k => R[k].ph);
function newD4mcq(){ const s = S.d4; s.mcq = {order:shuffle(HMCQ.map((_, i) => i)), k:0, perm:null, chosen:null}; s.mcq.perm = shuffle([0,1,2,3]); }
function newD4phos(){ S.d4.phos = {e:pick(PHOS), chosen:null}; }
function renderD4(){
  if (!S.d4){ S.d4 = {tab:'matrix', h:'ins', ans:{}, checked:false}; newD4mcq(); newD4phos(); }
  const s = S.d4;
  let h = `<div class="controls">${segmented('tab', [['matrix', U.matrix], ['mcq', U.mcq], ['phos', U.phos]], s.tab, 'd4tab')}</div>`;
  if (s.tab === 'matrix'){
    h += `<div class="controls"><div class="field"><span>${u('hormone')}</span>${segmented(u('hormone'), Object.keys(HORM).map(k => [k, HORM[k]]), s.h, 'd4h')}</div></div>`;
    h += `<div class="card"><p class="note">${u('matrixHelp')}</p><div class="mtx">`;
    HMAT.forEach((r, i) => { const v = r.v[s.h]; if (v == null) return; const a = s.ans[i];
      let rc = ''; if (s.checked) rc = a === v ? 'ok' : 'no';
      h += `<div class="mrow ${rc}"><div class="mp">${esc(T(r.p))}</div><div class="mb">`;
      [['u', '↑'], ['d', '↓'], ['n', '–']].forEach(b => { let cls = a === b[0] ? 'on' : ''; if (s.checked && b[0] === v) cls += ' right';
        h += `<button type="button" class="mbtn ${cls}" data-act="d4set" data-i="${i}" data-v="${b[0]}" aria-pressed="${a === b[0]}" title="${esc(u(b[0] === 'u' ? 'up' : b[0] === 'd' ? 'down' : 'none'))}"${s.checked ? ' disabled' : ''}>${b[1]}</button>`; });
      h += `</div>`; if (s.checked) h += `<div class="mx">${esc(T(r.x))}</div>`; h += `</div>`; });
    h += `</div><p class="legend">${u('up')} · ${u('down')} · ${u('none')}</p><div class="actions">`;
    h += s.checked ? `<button type="button" class="btn primary" data-act="d4reset">${u('reshuffle')}</button>` : `<button type="button" class="btn primary" data-act="d4check">${u('check')}</button>`;
    h += `</div></div>`;
  } else if (s.tab === 'mcq'){
    const m = s.mcq, q = HMCQ[m.order[m.k]];
    h += `<div class="card qcard"><div class="qmeta">${m.k+1} / ${HMCQ.length}</div><h3 class="q">${esc(T(q.q))}</h3><div class="opts">`;
    m.perm.forEach((oi, pos) => { let cls = ''; if (m.chosen != null){ cls = oi === q.a ? 'ok' : pos === m.chosen ? 'no' : 'dim'; }
      h += `<button type="button" class="opt ${cls}" data-act="d4mans" data-k="${pos}"${m.chosen != null ? ' disabled' : ''}>${esc(T(q.o[oi]))}</button>`; });
    h += `</div>`;
    if (m.chosen != null){ const ok = m.perm[m.chosen] === q.a; h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong><p>${esc(T(q.x))}</p></div><div class="actions"><button type="button" class="btn primary" data-act="d4mnext">${u('next')}</button></div>`; }
    h += `</div>`;
  } else {
    const ph = s.phos, r = R[ph.e];
    h += `<div class="card qcard"><h3 class="q">${u('phosQ')}</h3><div class="current"><span class="e big">${esc(enz(ph.e))}</span></div><div class="opts two">`;
    [['p', 'phosP'], ['d', 'phosD']].forEach(o => { let cls = ''; if (ph.chosen){ cls = o[0] === r.ph ? 'ok' : o[0] === ph.chosen ? 'no' : 'dim'; }
      h += `<button type="button" class="opt ${cls}" data-act="d4pans" data-v="${o[0]}"${ph.chosen ? ' disabled' : ''}>${u(o[1])}</button>`; });
    h += `</div>`;
    if (ph.chosen){ const ok = ph.chosen === r.ph; h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong> → ${u(r.ph === 'p' ? 'phosP' : 'phosD')}${regLists(r)}<p class="note">${u('phosRule')}</p></div><div class="actions"><button type="button" class="btn primary" data-act="d4pnext">${u('next')}</button></div>`; }
    h += `</div>`;
  }
  return h;
}
function regLists(r){ let h = ''; if (r.act && r.act.length) h += `<p><strong>${u('activators')}:</strong> ${r.act.map(x => esc(T(x))).join(' · ')}</p>`;
  if (r.inh && r.inh.length) h += `<p><strong>${u('inhibitors')}:</strong> ${r.inh.map(x => esc(T(x))).join(' · ')}</p>`; return h; }

/* ===================== D5 SWITCHING ===================== */
function newD5c(){ S.d5.cq = {order:shuffle(SWQ.map((_, i) => i)), k:0, chosen:null}; }
function newD5o(ti){ const t = ti == null ? Math.floor(Math.random()*TIMELINES.length) : ti; const tl = TIMELINES[t];
  S.d5.ord = {ti:t, o:makeOrder(tl.s.map((x, i) => ({ans:'t'+i, d:{t:'txt', x}})))}; }
function renderD5(){
  if (!S.d5){ S.d5 = {tab:'classify'}; newD5c(); newD5o(0); }
  const s = S.d5;
  let h = `<div class="controls">${segmented('tab', [['classify', U.classify], ['order', U.order]], s.tab, 'd5tab')}</div>`;
  if (s.tab === 'classify'){
    const c = s.cq, q = SWQ[c.order[c.k]];
    h += `<div class="card qcard"><div class="qmeta">${c.k+1} / ${SWQ.length}</div><h3 class="q">${u('whichState')}</h3><blockquote class="stmt">${esc(T(q.q))}</blockquote><div class="opts">`;
    Object.keys(STATES).forEach(k => { let cls = ''; if (c.chosen){ cls = k === q.a ? 'ok' : k === c.chosen ? 'no' : 'dim'; }
      h += `<button type="button" class="opt state st-${k} ${cls}" data-act="d5ans" data-v="${k}"${c.chosen ? ' disabled' : ''}>${esc(T(STATES[k]))}</button>`; });
    h += `</div>`;
    if (c.chosen){ const ok = c.chosen === q.a; h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong> → ${esc(T(STATES[q.a]))}</div><div class="actions"><button type="button" class="btn primary" data-act="d5next">${u('next')}</button></div>`; }
    h += `</div>`;
  } else {
    h += `<div class="controls"><label class="field"><span>${u('timeline')}</span><select data-chg="d5tl" id="sel-d5tl">` + TIMELINES.map((t, i) => `<option value="${i}"${i === s.ord.ti ? ' selected' : ''}>${esc(T(t.n))}</option>`).join('') + `</select></label></div>`;
    h += `<div class="card">${orderHTML(s.ord.o, 'd5')}<div class="actions"><button type="button" class="btn" data-act="d5reord">${u('reshuffle')}</button></div></div>`;
  }
  return h;
}

/* ===================== D6 ENZYME DETECTIVE ===================== */
const PROC = ['glyproc', 'gngproc', 'spont', 'bcmulti', 'purmulti', 'bamulti'];
const SUBLOC = ['c', 'm', 'imm', 'omm', 'er', 'ly'];
function allSteps(cat){ const out = []; P.forEach(p => { if (cat !== 'all' && p.cat !== cat) return; p.st.forEach((s, i) => out.push({p, i, s})); }); return out; }
function enzInCat(cat){ return uniq(P.filter(p => cat === 'all' || p.cat === cat).flatMap(p => p.st.map(s => s[2]))); }
function genD6(type, cat){
  const types = type === 'any' ? ['react', 'react', 'enz', 'reg', 'reg', 'cof', 'clin', 'clin', 'rl', 'loc'] : [type];
  for (let tries = 0; tries < 40; tries++){
    const t = pick(types); const q = tryGen(t, cat); if (q) return q;
  }
  return tryGen('react', 'all');
}
function tryGen(t, cat){
  const ens = enzInCat(cat);
  if (t === 'react'){ const c = pick(allSteps(cat).filter(x => PROC.indexOf(x.s[2]) < 0)); if (!c) return null;
    const d = distract('e', c.p, c.s[2], PROC); if (d.length < 3) return null;
    return {t, p:c.p.id, i:c.i, correct:c.s[2], opts:shuffle([c.s[2]].concat(d)), kind:'e'}; }
  if (t === 'enz'){ const c = pick(allSteps(cat).filter(x => PROC.indexOf(x.s[2]) < 0)); if (!c) return null;
    const others = shuffle(allSteps('all').filter(x => x.s[2] !== c.s[2] && x.s[0] !== x.s[1]));
    const seen = new Set([TEN(M[c.s[0]]) + '>' + TEN(M[c.s[1]])]); const ds = [];
    const sameP = others.filter(x => x.p === c.p), rest = others.filter(x => x.p !== c.p && x.p.cat === c.p.cat), rest2 = others.filter(x => x.p.cat !== c.p.cat);
    for (const x of sameP.concat(rest, rest2)){ const key = TEN(M[x.s[0]]) + '>' + TEN(M[x.s[1]]); if (seen.has(key)) continue; seen.add(key); ds.push({p:x.p.id, i:x.i}); if (ds.length === 3) break; }
    const right = {p:c.p.id, i:c.i}; const opts = shuffle([right].concat(ds));
    return {t, e:c.s[2], p:c.p.id, opts, correctIdx:opts.indexOf(right), kind:'r'}; }
  if (t === 'reg'){ const cands = Object.keys(R).filter(k => ens.indexOf(k) >= 0 || (k === 'pdh' && ens.indexOf('pdhe1') >= 0) || (['pfk2', 'fbp2', 'phk'].indexOf(k) >= 0 && (cat === 'all' || cat === 'carb'))).filter(k => (R[k].act && R[k].act.length) || (R[k].inh && R[k].inh.length));
    if (!cands.length) return null; const e = pick(cands); const r = R[e];
    const pool = (r.act || []).map(x => ({x, v:'a'})).concat((r.inh || []).map(x => ({x, v:'i'}))); const it = pick(pool);
    return {t, e, eff:it.x, correct:it.v}; }
  if (t === 'cof'){ const cands = Object.keys(R).filter(k => R[k].cof && (ens.indexOf(k) >= 0 || (k === 'pdh' && ens.indexOf('pdhe1') >= 0))); if (!cands.length) return null;
    const e = pick(cands), r = R[e]; const c = pick(r.cof); const ds = shuffle(Object.keys(COF).filter(x => r.cof.indexOf(x) < 0 && !(r.cof.indexOf('nad') >= 0 && x === 'nadp') && !(r.cof.indexOf('nadp') >= 0 && x === 'nad'))).slice(0, 3);
    return {t, e, correct:c, opts:shuffle([c].concat(ds)), kind:'c'}; }
  if (t === 'clin'){ const cands = Object.keys(R).filter(k => (R[k].def || R[k].drug) && (ens.indexOf(k) >= 0 || (k === 'pdh' && ens.indexOf('pdhe1') >= 0))); if (!cands.length) return null;
    const e = pick(cands), r = R[e]; const f = r.def && r.drug ? pick(['def', 'drug']) : r.def ? 'def' : 'drug';
    const others = shuffle(Object.keys(R).filter(k => k !== e && R[k][f] && TEN(R[k][f]) !== TEN(r[f]))).slice(0, 3).map(k => R[k][f]);
    if (others.length < 3) return null; const opts = shuffle([r[f]].concat(others));
    return {t, e, f, opts, correctIdx:opts.indexOf(r[f]), kind:'x'}; }
  if (t === 'rl'){ const ps = P.filter(p => (cat === 'all' || p.cat === cat) && p.st.filter(s => s[5] && s[5].indexOf('r') >= 0).length === 1 && uniq(p.st.map(s => s[2])).length >= 4);
    if (!ps.length) return null; const p = pick(ps); const c = p.st.find(s => s[5] && s[5].indexOf('r') >= 0)[2];
    const ds = shuffle(uniq(p.st.map(s => s[2])).filter(x => x !== c && PROC.indexOf(x) < 0 && TEN(E[x]) !== TEN(E[c]))).slice(0, 3); if (ds.length < 3) return null;
    return {t, p:p.id, correct:c, opts:shuffle([c].concat(ds)), kind:'e'}; }
  if (t === 'loc'){ const c = pick(allSteps(cat).filter(x => x.s[4] && SUBLOC.indexOf(x.s[4]) >= 0)); if (!c) return null;
    const ds = shuffle(SUBLOC.filter(x => x !== c.s[4])).slice(0, 3); return {t, p:c.p.id, i:c.i, correct:c.s[4], opts:shuffle([c.s[4]].concat(ds)), kind:'l'}; }
  return null;
}
function newD6(){ const s = S.d6; s.q = genD6(s.type, s.cat); s.chosen = null; }
function renderD6(){
  if (!S.d6){ S.d6 = {type:'any', cat:'all'}; newD6(); }
  const s = S.d6, q = s.q;
  const types = [['any', 'any'], ['react', 'tReact'], ['enz', 'tEnz'], ['reg', 'tReg'], ['cof', 'tCof'], ['clin', 'tClin'], ['rl', 'tRL'], ['loc', 'tLoc']];
  let h = `<div class="controls"><label class="field"><span>${u('qType')}</span><select data-chg="d6type" id="sel-d6type">${types.map(t => `<option value="${t[0]}"${t[0] === s.type ? ' selected' : ''}>${esc(u(t[1]))}</option>`).join('')}</select></label>`;
  h += `<label class="field"><span>${u('category')}</span><select data-chg="d6cat" id="sel-d6cat"><option value="all">${esc(u('allCats'))}</option>${Object.keys(CATS).map(c => `<option value="${c}"${c === s.cat ? ' selected' : ''}>${esc(T(CATS[c]))}</option>`).join('')}</select></label></div>`;
  h += `<div class="card qcard"><div class="qmeta">${esc(u(types.find(t => t[0] === q.t)[1]))}</div>`;
  let opts = [], correctIdx = -1;
  if (q.t === 'react'){ const p = PW[q.p]; h += `<h3 class="q">${u('qEnzFor')}</h3><div class="stepfull">${rxnHTML(p, q.i, {noEnz:true})}</div><p class="note">${u('inPathway', {p:esc(T(p.n))})}</p>`;
    opts = q.opts.map(e => esc(enz(e))); correctIdx = q.opts.indexOf(q.correct); }
  else if (q.t === 'enz'){ h += `<h3 class="q">${u('qRxnFor')}</h3><div class="current"><span class="e big">${esc(enz(q.e))}</span></div>`;
    opts = q.opts.map(o => `${esc(mol(PW[o.p].st[o.i][0]))} → ${esc(mol(PW[o.p].st[o.i][1]))}`); correctIdx = q.correctIdx; }
  else if (q.t === 'reg'){ h += `<h3 class="q">${u('qAct')}</h3><div class="current"><span class="e big">${esc(enz(q.e))}</span></div><div class="current"><span class="lbl">?</span><span class="m big">${esc(T(q.eff))}</span></div>`;
    opts = [esc(u('activator')), esc(u('inhibitor'))]; correctIdx = q.correct === 'a' ? 0 : 1; }
  else if (q.t === 'cof'){ h += `<h3 class="q">${u('qCof')}</h3><div class="current"><span class="e big">${esc(enz(q.e))}</span></div>`;
    opts = q.opts.map(c => esc(T(COF[c]))); correctIdx = q.opts.indexOf(q.correct); }
  else if (q.t === 'clin'){ h += `<h3 class="q">${q.f === 'def' ? u('qDef') : u('qDrug')}</h3><div class="current"><span class="e big">${esc(enz(q.e))}</span></div>`;
    opts = q.opts.map(x => esc(T(x))); correctIdx = q.correctIdx; }
  else if (q.t === 'rl'){ const p = PW[q.p]; h += `<h3 class="q">${u('qRL')}</h3><div class="current"><span class="m big">${esc(T(p.n))}</span></div>`;
    opts = q.opts.map(e => esc(enz(e))); correctIdx = q.opts.indexOf(q.correct); }
  else if (q.t === 'loc'){ const p = PW[q.p]; h += `<h3 class="q">${u('qLoc')}</h3><div class="stepfull">${rxnHTML(p, q.i, {})}</div><p class="note">${u('inPathway', {p:esc(T(p.n))})}</p>`;
    opts = q.opts.map(l => esc(T(LOC[l]))); correctIdx = q.opts.indexOf(q.correct); }
  s.correctIdx = correctIdx;
  h += `<div class="opts${opts.length === 2 ? ' two' : ''}">`;
  opts.forEach((o, k) => { let cls = ''; if (s.chosen != null){ cls = k === correctIdx ? 'ok' : k === s.chosen ? 'no' : 'dim'; }
    h += `<button type="button" class="opt ${cls}" data-act="d6ans" data-k="${k}"${s.chosen != null ? ' disabled' : ''}>${o}</button>`; });
  h += `</div>`;
  if (s.chosen != null){ const ok = s.chosen === correctIdx; h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong>${d6explain(q)}</div><div class="actions"><button type="button" class="btn primary" data-act="d6next">${u('next')}</button></div>`; }
  return h + `</div>`;
}
function d6explain(q){
  const e = q.e || (q.t === 'react' || q.t === 'loc' ? PW[q.p].st[q.i][2] : q.correct);
  const key = R[e] ? e : (e === 'pdhe1' ? 'pdh' : null); const r = key ? R[key] : null;
  let h = '';
  if (q.t === 'react' || q.t === 'loc') h += `<div class="stepfull">${rxnHTML(PW[q.p], q.i, {tags:true})}</div>`;
  if (q.t === 'enz'){ const steps = allSteps('all').filter(x => x.s[2] === q.e); h += `<ul class="mini">${steps.slice(0, 3).map(x => `<li>${rxnHTML(x.p, x.i, {noEnz:true})} <span class="note">(${esc(T(x.p.n))})</span></li>`).join('')}</ul>`; }
  if (q.t === 'rl') h += `<p>${esc(T(PW[q.p].s))}</p>`;
  if (r){ h += regLists(r); if (r.cof) h += `<p><strong>${u('tCof')}:</strong> ${r.cof.map(c => esc(T(COF[c]))).join(' · ')}</p>`;
    if (r.def) h += `<p><strong>${u('defLbl')}:</strong> ${esc(T(r.def))}</p>`; if (r.drug) h += `<p><strong>${u('drugLbl')}:</strong> ${esc(T(r.drug))}</p>`; }
  return h;
}

/* ===================== D7 MISSING MOLECULE ===================== */
function newD7(pid, mode){
  const prev = S.d7 || {}; mode = mode || prev.mode || '1';
  const p = (!pid || pid === '__rand') ? pick(P.filter(x => x.st.length >= 3)) : PW[pid];
  const nodes = []; p.st.forEach((s, i) => { if (i === 0 || s[0] !== p.st[i-1][1]) nodes.push({key:'s'+i, id:s[0]}); nodes.push({key:'p'+i, id:s[1]}); });
  const enzs = p.st.map((s, i) => ({key:'e'+i, id:s[2]})).filter(x => PROC.indexOf(x.id) < 0 || p.cat === 'integ');
  const molIds = uniq(nodes.map(n => n.id)); const enzIds = uniq(p.st.map(s => s[2]));
  const extraM = distract('m', p, molIds[0], molIds, 2), extraE = distract('e', p, enzIds[0], enzIds, 2);
  const mOpts = shuffle(molIds.concat(extraM)), eOpts = shuffle(enzIds.concat(extraE));
  let chosen = [];
  if (mode === '1') chosen = shuffle(nodes).slice(0, 1).map(n => ({n, k:'m'}));
  else if (mode === '3') chosen = shuffle(nodes).slice(0, 3).map(n => ({n, k:'m'}));
  else if (mode === 'all') chosen = nodes.slice(1).map(n => ({n, k:'m'}));
  else if (mode === 'enz') chosen = enzs.map(n => ({n, k:'e'}));
  else chosen = shuffle(nodes).slice(0, 2).map(n => ({n, k:'m'})).concat(shuffle(enzs).slice(0, 2).map(n => ({n, k:'e'})));
  const B = {}; chosen.forEach(c => { B[c.n.key] = {kind:c.k, ans:c.n.id, opts:c.k === 'm' ? mOpts : eOpts, val:'', state:null}; });
  S.d7 = {pid:p.id, mode, B, checked:false, msg:null};
}
function renderD7(){
  if (!S.d7) newD7('urea', '3');
  const s = S.d7, p = PW[s.pid];
  const modes = [['1', 'gaps1'], ['3', 'gaps3'], ['all', 'gapsAll'], ['enz', 'gapsEnz'], ['mix', 'gapsMix']];
  let h = `<div class="controls">${pathwaySelect(s.pid, 'd7path', true)}<label class="field"><span>${u('gaps')}</span><select data-chg="d7mode" id="sel-d7mode">${modes.map(m => `<option value="${m[0]}"${m[0] === s.mode ? ' selected' : ''}>${esc(u(m[1]))}</option>`).join('')}</select></label></div>`;
  h += infoHTML(p) + `<div class="card mapcard">${mapHTML(p, s.B)}`;
  if (s.msg) h += `<p class="note warn">${esc(u(s.msg))}</p>`;
  h += `<div class="actions">`;
  if (!s.checked) h += `<button type="button" class="btn primary" data-act="d7check">${u('check')}</button>`;
  else { const keys = Object.keys(s.B); const n = keys.filter(k => s.B[k].state === 'ok').length;
    h += `<span class="fb inline ${n === keys.length ? 'ok' : 'no'}"><strong>${u('score', {c:n, n:keys.length})}</strong></span>`; }
  h += `<button type="button" class="btn${s.checked ? ' primary' : ''}" data-act="d7new">${u('reshuffle')}</button></div></div>`;
  return h;
}

/* ===================== D8 CLINICAL CASES ===================== */
function newD8(ci){ const s = S.d8 || (S.d8 = {order:shuffle(CASES.map((_, i) => i)), pos:0}); if (ci != null){ s.pos = s.order.indexOf(ci); } s.qi = 0; s.perm = shuffle([0, 1, 2, 3]); s.chosen = null; }
function newMatch(){ const s = S.d8; const g = s.g === 'all' ? pick(Object.keys(DIS)) : s.g; const items = DIS[g].items; const it = pick(items);
  let others = shuffle(items.filter(x => x !== it)).slice(0, 3);
  if (others.length < 3) others = others.concat(shuffle(Object.values(DIS).flatMap(d => d.items).filter(x => x !== it && others.indexOf(x) < 0)).slice(0, 3 - others.length));
  s.m = {g, it, type:Math.random() < .6 ? 'feat' : 'enz', opts:shuffle([it].concat(others)), chosen:null}; }
function renderMatch(){
  const s = S.d8; if (!s.m) newMatch(); const m = s.m;
  let h = `<div class="controls"><label class="field"><span>${u('group')}</span><select data-chg="d8grp" id="sel-d8grp"><option value="all">${esc(u('allGroups'))}</option>${Object.keys(DIS).map(g => `<option value="${g}"${g === s.g ? ' selected' : ''}>${esc(T(DIS[g].n))}</option>`).join('')}</select></label></div>`;
  h += `<div class="card qcard"><div class="qmeta">${esc(T(DIS[m.g].n))}</div>`;
  if (m.type === 'feat') h += `<h3 class="q">${u('qFeat')}</h3><blockquote class="stmt">${esc(T(m.it.f))}</blockquote>`;
  else h += `<h3 class="q">${u('qDisEnz')}</h3><div class="current"><span class="m big">${esc(T(m.it.n))}</span></div>`;
  h += `<div class="opts">`;
  m.opts.forEach((o, k) => { let cls = ''; if (m.chosen != null){ cls = o === m.it ? 'ok' : k === m.chosen ? 'no' : 'dim'; }
    h += `<button type="button" class="opt ${cls}" data-act="d8mans" data-k="${k}"${m.chosen != null ? ' disabled' : ''}>${esc(T(m.type === 'feat' ? o.n : o.e))}</button>`; });
  h += `</div>`;
  if (m.chosen != null){ const ok = m.opts[m.chosen] === m.it;
    h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong><p><strong>${esc(T(m.it.n))}</strong> · <span class="e">${esc(T(m.it.e))}</span></p><p>${esc(T(m.it.f))}</p>`;
    const wrong = m.opts[m.chosen]; if (!ok) h += `<p class="note"><strong>${esc(T(wrong.n))}</strong>: ${esc(T(wrong.e))} – ${esc(T(wrong.f))}</p>`;
    h += `</div><div class="actions"><button type="button" class="btn primary" data-act="d8mnext">${u('next')}</button></div>`; }
  return h + `</div>`;
}
function renderD8(){
  if (!S.d8){ newD8(); S.d8.tab = 'cases'; S.d8.g = 'all'; }
  const s = S.d8;
  let top = `<div class="controls">${segmented('tab', [['cases', U.tabCases], ['match', U.tabMatch]], s.tab, 'd8tab')}</div>`;
  if (s.tab === 'match') return top + renderMatch();
  const ci = s.order[s.pos], c = CASES[ci], q = c.qs[s.qi];
  let h = top + `<div class="controls"><label class="field"><span>${u('allCases')}</span><select data-chg="d8case" id="sel-d8case">${CASES.map((cc, i) => `<option value="${i}"${i === ci ? ' selected' : ''}>${esc(T(cc.t))}</option>`).join('')}</select></label></div>`;
  h += `<div class="card case"><div class="qmeta">${u('caseOf', {i:s.pos+1, n:CASES.length})}</div><h3>${esc(T(c.t))}</h3><p class="vignette">${esc(T(c.v))}</p></div>`;
  h += `<div class="card qcard"><div class="qmeta">${u('question', {i:s.qi+1, n:c.qs.length})}</div><h3 class="q">${esc(T(q.q))}</h3><div class="opts">`;
  s.perm.forEach((oi, pos) => { let cls = ''; if (s.chosen != null){ cls = oi === 0 ? 'ok' : pos === s.chosen ? 'no' : 'dim'; }
    h += `<button type="button" class="opt ${cls}" data-act="d8ans" data-k="${pos}"${s.chosen != null ? ' disabled' : ''}>${esc(T(q.o[oi]))}</button>`; });
  h += `</div>`;
  if (s.chosen != null){ const ok = s.perm[s.chosen] === 0; const last = s.qi === c.qs.length - 1;
    h += `<div class="fb ${ok ? 'ok' : 'no'}"><strong>${ok ? u('correct') : u('wrong')}</strong><p>${esc(T(q.x))}</p></div><div class="actions"><button type="button" class="btn primary" data-act="d8next">${last ? u('nextCase') : u('next')}</button></div>`; }
  return h + `</div>`;
}

/* ===================== D9 ENERGY ===================== */
let PO = store.get('po', 'modern');
function PV(){ const n = PO === 'classic' ? 3 : 2.5, f = PO === 'classic' ? 2 : 1.5; return {n, f, ac:3*n + f + 1}; }
const X = (en, fr, de) => [en, fr, de];
const ECATS = {carb:"Carbohydrates|Glucides|Kohlenhydrate", fat:"Fats & ketone bodies|Lipides et corps cétoniques|Fette & Ketonkörper", cost:"Costs & proton math|Coûts et calcul des protons|Kosten & Protonenbilanz", cmp:"Fuel comparison|Comparaison des carburants|Brennstoffvergleich"};
const FA = {12:"laurate|laurate|Laurat", 14:"myristate|myristate|Myristat", 16:"palmitate|palmitate|Palmitat", 18:"stearate|stéarate|Stearat", 20:"arachidate|arachidate|Arachinat"};
function faATP(c){ const v = PV(), a = c/2, r = c/2 - 1; return a*v.ac + r*(v.n + v.f) - 2; }
function faRows(c){ const v = PV(), a = c/2, r = c/2 - 1;
  return [[X("Activation (ATP → AMP)", "Activation (ATP → AMP)", "Aktivierung (ATP → AMP)"), '−2'],
    [X(`${r} rounds → ${r} FADH₂ × ${fmtE(v.f)}`, `${r} tours → ${r} FADH₂ × ${fmtE(v.f)}`, `${r} Runden → ${r} FADH₂ × ${fmtE(v.f)}`), r*v.f],
    [X(`${r} NADH × ${fmtE(v.n)}`, `${r} NADH × ${fmtE(v.n)}`, `${r} NADH × ${fmtE(v.n)}`), r*v.n],
    [X(`${a} acetyl-CoA × ${fmtE(v.ac)}`, `${a} acétyl-CoA × ${fmtE(v.ac)}`, `${a} Acetyl-CoA × ${fmtE(v.ac)}`), a*v.ac]]; }
function fmtE(x){ return (Math.round(x*100)/100).toString(); }
function glyRows(){ const v = PV(); return [[X("Glycerol kinase", "Glycérol kinase", "Glycerinkinase"), '−1'], [X("G3P dehydrogenase: 1 NADH", "G3P déshydrogénase : 1 NADH", "G3P-Dehydrogenase: 1 NADH"), v.n], [X("GAPDH: 1 NADH", "GAPDH : 1 NADH", "GAPDH: 1 NADH"), v.n], [X("PGK + pyruvate kinase", "PGK + pyruvate kinase", "PGK + Pyruvatkinase"), 2], [X("PDH: 1 NADH", "PDH : 1 NADH", "PDH: 1 NADH"), v.n], [X("Krebs cycle: 1 acetyl-CoA", "Cycle de Krebs : 1 acétyl-CoA", "Citratzyklus: 1 Acetyl-CoA"), v.ac]]; }
const EGEN = [
 {c:'carb', g(){ const mas = Math.random() < .5, v = PV(), cy = mas ? v.n : v.f;
   const sh = mas ? X("malate–aspartate shuttle", "navette malate–aspartate", "Malat-Aspartat-Shuttle") : X("glycerol-3-phosphate shuttle", "navette du glycérol-3-phosphate", "Glycerin-3-phosphat-Shuttle");
   return {q:l => [`One glucose is completely oxidized to CO₂ in a cell using the ${sh[0]}. Net ATP?`, `Un glucose est entièrement oxydé en CO₂ dans une cellule utilisant la ${sh[1]}. ATP nets ?`, `Eine Glucose wird in einer Zelle mit ${sh[2]} vollständig zu CO₂ oxidiert. Netto-ATP?`][LI[l]],
    ans:2 + 2*cy + 2*v.n + 2*v.ac,
    rows:[[X("Glycolysis: net ATP", "Glycolyse : ATP nets", "Glykolyse: Netto-ATP"), 2], [X(`Glycolysis: 2 cytosolic NADH × ${fmtE(cy)} (shuttle)`, `Glycolyse : 2 NADH cytosoliques × ${fmtE(cy)} (navette)`, `Glykolyse: 2 zytosolische NADH × ${fmtE(cy)} (Shuttle)`), 2*cy],
     [X(`PDH: 2 NADH × ${fmtE(v.n)}`, `PDH : 2 NADH × ${fmtE(v.n)}`, `PDH: 2 NADH × ${fmtE(v.n)}`), 2*v.n], [X(`Krebs: 2 acetyl-CoA × ${fmtE(v.ac)} (3 NADH + FADH₂ + GTP)`, `Krebs : 2 acétyl-CoA × ${fmtE(v.ac)} (3 NADH + FADH₂ + GTP)`, `Citratzyklus: 2 Acetyl-CoA × ${fmtE(v.ac)} (3 NADH + FADH₂ + GTP)`), 2*v.ac]]}; }},
 {c:'carb', g(){ return {q:X("Anaerobic glycolysis (glucose → 2 lactate): net ATP per glucose?", "Glycolyse anaérobie (glucose → 2 lactate) : ATP nets par glucose ?", "Anaerobe Glykolyse (Glucose → 2 Laktat): Netto-ATP pro Glucose?"), ans:2,
   rows:[[X("Hexokinase + PFK-1", "Hexokinase + PFK-1", "Hexokinase + PFK-1"), '−2'], [X("PGK + pyruvate kinase (2 × 2)", "PGK + pyruvate kinase (2 × 2)", "PGK + Pyruvatkinase (2 × 2)"), 4], [X("2 NADH reoxidized by LDH", "2 NADH réoxydés par la LDH", "2 NADH durch LDH reoxidiert"), 0]]}; }},
 {c:'carb', g(){ return {q:X("One glucose unit from glycogen → lactate (anaerobic, muscle). Net ATP?", "Une unité de glucose du glycogène → lactate (anaérobie, muscle). ATP nets ?", "Eine Glucoseeinheit aus Glykogen → Laktat (anaerob, Muskel). Netto-ATP?"), ans:3,
   rows:[[X("Phosphorylase gives glucose-1-P: no hexokinase ATP spent", "La phosphorylase donne du glucose-1-P : pas d'ATP pour l'hexokinase", "Phosphorylase liefert Glucose-1-P: kein Hexokinase-ATP"), 0], [X("PFK-1", "PFK-1", "PFK-1"), '−1'], [X("PGK + pyruvate kinase (2 × 2)", "PGK + pyruvate kinase (2 × 2)", "PGK + Pyruvatkinase (2 × 2)"), 4]]}; }},
 {c:'carb', g(){ const v = PV(); return {q:X("One lactate is completely oxidized to CO₂ (malate–aspartate shuttle). Net ATP?", "Un lactate est entièrement oxydé en CO₂ (navette malate–aspartate). ATP nets ?", "Ein Laktat wird vollständig zu CO₂ oxidiert (Malat-Aspartat-Shuttle). Netto-ATP?"), ans:2*v.n + v.ac,
   rows:[[X("LDH (lactate → pyruvate): 1 NADH", "LDH (lactate → pyruvate) : 1 NADH", "LDH (Laktat → Pyruvat): 1 NADH"), v.n], [X("PDH: 1 NADH", "PDH : 1 NADH", "PDH: 1 NADH"), v.n], [X("Krebs: 1 acetyl-CoA", "Krebs : 1 acétyl-CoA", "Citratzyklus: 1 Acetyl-CoA"), v.ac]]}; }},
 {c:'carb', g(){ const v = PV(); return {q:X("How many ATP does one acetyl-CoA yield in the Krebs cycle + oxidative phosphorylation?", "Combien d'ATP un acétyl-CoA fournit-il via le cycle de Krebs + phosphorylation oxydative ?", "Wie viele ATP liefert ein Acetyl-CoA über Citratzyklus + oxidative Phosphorylierung?"), ans:v.ac,
   rows:[[X(`3 NADH × ${fmtE(v.n)}`, `3 NADH × ${fmtE(v.n)}`, `3 NADH × ${fmtE(v.n)}`), 3*v.n], [X(`1 FADH₂ × ${fmtE(v.f)}`, `1 FADH₂ × ${fmtE(v.f)}`, `1 FADH₂ × ${fmtE(v.f)}`), v.f], [X("1 GTP", "1 GTP", "1 GTP"), 1]]}; }},
 {c:'carb', g(){ const v = PV(); return {q:X("One pyruvate is completely oxidized in the mitochondrion. Net ATP?", "Un pyruvate est entièrement oxydé dans la mitochondrie. ATP nets ?", "Ein Pyruvat wird im Mitochondrium vollständig oxidiert. Netto-ATP?"), ans:v.n + v.ac,
   rows:[[X("PDH: 1 NADH", "PDH : 1 NADH", "PDH: 1 NADH"), v.n], [X("Krebs: 1 acetyl-CoA", "Krebs : 1 acétyl-CoA", "Citratzyklus: 1 Acetyl-CoA"), v.ac]]}; }},
 {c:'fat', g(){ const c = pick([12, 14, 16, 18, 20]); return {q:l => [`Complete oxidation of one ${FA[c].split('|')[0]} (C${c}:0) molecule, starting from the free fatty acid. Net ATP?`, `Oxydation complète d'une molécule de ${FA[c].split('|')[1]} (C${c}:0), à partir de l'acide gras libre. ATP nets ?`, `Vollständige Oxidation eines ${FA[c].split('|')[2]}-Moleküls (C${c}:0), ausgehend von der freien Fettsäure. Netto-ATP?`][LI[l]], ans:faATP(c), rows:faRows(c)}; }},
 {c:'fat', g(){ const c = pick([10, 12, 14, 16, 18, 20, 22, 24]); return {q:l => [`How many rounds of β-oxidation does a saturated C${c} fatty acid need?`, `Combien de tours de β-oxydation faut-il pour un acide gras saturé en C${c} ?`, `Wie viele β-Oxidationsrunden braucht eine gesättigte C${c}-Fettsäure?`][LI[l]], ans:c/2 - 1,
   rows:[[X(`C/2 − 1 = ${c}/2 − 1 (the last round yields 2 acetyl-CoA)`, `C/2 − 1 = ${c}/2 − 1 (le dernier tour donne 2 acétyl-CoA)`, `C/2 − 1 = ${c}/2 − 1 (die letzte Runde liefert 2 Acetyl-CoA)`), c/2 - 1]]}; }},
 {c:'fat', g(){ const c = pick([16, 18]); const nm = c === 16 ? X("palmitoleate (C16:1 Δ⁹)", "palmitoléate (C16:1 Δ⁹)", "Palmitoleat (C16:1 Δ⁹)") : X("oleate (C18:1 Δ⁹)", "oléate (C18:1 Δ⁹)", "Oleat (C18:1 Δ⁹)"); const v = PV();
   return {q:l => [`Complete oxidation of one ${nm[0]}. Net ATP?`, `Oxydation complète d'un ${nm[1]}. ATP nets ?`, `Vollständige Oxidation eines ${nm[2]}. Netto-ATP?`][LI[l]], ans:faATP(c) - v.f,
    rows:faRows(c).concat([[X("cis double bond: isomerase skips acyl-CoA dehydrogenase → 1 FADH₂ fewer", "Double liaison cis : l'isomérase évite l'acyl-CoA déshydrogénase → 1 FADH₂ de moins", "cis-Doppelbindung: Isomerase umgeht Acyl-CoA-Dehydrogenase → 1 FADH₂ weniger"), -v.f]])}; }},
 {c:'fat', g(){ const r = glyRows(); return {q:X("One glycerol (from lipolysis) is completely oxidized in the liver (malate–aspartate shuttle). Net ATP?", "Un glycérol (issu de la lipolyse) est entièrement oxydé dans le foie (navette malate–aspartate). ATP nets ?", "Ein Glycerin (aus der Lipolyse) wird in der Leber vollständig oxidiert (Malat-Aspartat-Shuttle). Netto-ATP?"), ans:r.reduce((a, x) => a + Number(String(x[1]).replace('−', '-')), 0), rows:r}; }},
 {c:'fat', g(){ const c = pick([16, 18]); const g = glyRows().reduce((a, x) => a + Number(String(x[1]).replace('−', '-')), 0); const nm = c === 16 ? X("tripalmitin", "tripalmitine", "Tripalmitin") : X("tristearin", "tristéarine", "Tristearin");
   return {q:l => [`Complete oxidation of one ${nm[0]} (3 × C${c}:0 + glycerol). Net ATP?`, `Oxydation complète d'une ${nm[1]} (3 × C${c}:0 + glycérol). ATP nets ?`, `Vollständige Oxidation eines ${nm[2]} (3 × C${c}:0 + Glycerin). Netto-ATP?`][LI[l]], ans:3*faATP(c) + g,
    rows:[[X(`3 fatty acids × ${fmtE(faATP(c))}`, `3 acides gras × ${fmtE(faATP(c))}`, `3 Fettsäuren × ${fmtE(faATP(c))}`), 3*faATP(c)], [X("Glycerol", "Glycérol", "Glycerin"), g]]}; }},
 {c:'fat', g(){ const bhb = Math.random() < .5, v = PV();
   return {q:bhb ? X("Complete oxidation of one β-hydroxybutyrate in muscle. Net ATP?", "Oxydation complète d'un β-hydroxybutyrate dans le muscle. ATP nets ?", "Vollständige Oxidation eines β-Hydroxybutyrats im Muskel. Netto-ATP?") : X("Complete oxidation of one acetoacetate in muscle. Net ATP?", "Oxydation complète d'un acétoacétate dans le muscle. ATP nets ?", "Vollständige Oxidation eines Acetoacetats im Muskel. Netto-ATP?"),
    ans:2*v.ac - 1 + (bhb ? v.n : 0),
    rows:(bhb ? [[X("β-HB dehydrogenase: 1 NADH", "β-HB déshydrogénase : 1 NADH", "β-HB-Dehydrogenase: 1 NADH"), v.n]] : []).concat([[X("SCOT uses succinyl-CoA (1 GTP not made)", "La SCOT consomme un succinyl-CoA (1 GTP non formé)", "SCOT verbraucht Succinyl-CoA (1 GTP fehlt)"), '−1'], [X("2 acetyl-CoA", "2 acétyl-CoA", "2 Acetyl-CoA"), 2*v.ac]])}; }},
 {c:'fat', g(){ return {q:X("Activating one fatty acid to acyl-CoA costs how many ATP equivalents?", "Activer un acide gras en acyl-CoA coûte combien d'équivalents ATP ?", "Wie viele ATP-Äquivalente kostet die Aktivierung einer Fettsäure zu Acyl-CoA?"), ans:2,
   rows:[[X("ATP → AMP + PPi, then PPi → 2 Pi: two phosphoanhydride bonds", "ATP → AMP + PPi, puis PPi → 2 Pi : deux liaisons phosphoanhydride", "ATP → AMP + PPi, dann PPi → 2 Pi: zwei Phosphoanhydridbindungen"), 2]]}; }},
 {c:'cost', g(){ return {q:X("Gluconeogenesis from 2 pyruvate: how many ATP equivalents (ATP + GTP) per glucose?", "Néoglucogenèse à partir de 2 pyruvate : combien d'équivalents ATP (ATP + GTP) par glucose ?", "Glukoneogenese aus 2 Pyruvat: wie viele ATP-Äquivalente (ATP + GTP) pro Glucose?"), ans:6,
   rows:[[X("Pyruvate carboxylase: 2 ATP", "Pyruvate carboxylase : 2 ATP", "Pyruvatcarboxylase: 2 ATP"), 2], [X("PEPCK: 2 GTP", "PEPCK : 2 GTP", "PEPCK: 2 GTP"), 2], [X("Phosphoglycerate kinase: 2 ATP (+ 2 NADH used by GAPDH)", "Phosphoglycérate kinase : 2 ATP (+ 2 NADH utilisés par la GAPDH)", "Phosphoglyceratkinase: 2 ATP (+ 2 NADH durch GAPDH)"), 2]]}; }},
 {c:'cost', g(){ return {q:X("Cori cycle: net ATP cost to the body per turn (2 lactate → 1 glucose → 2 lactate)?", "Cycle de Cori : coût net en ATP pour l'organisme par tour (2 lactate → 1 glucose → 2 lactate) ?", "Cori-Zyklus: Netto-ATP-Kosten pro Runde (2 Laktat → 1 Glucose → 2 Laktat)?"), ans:4,
   rows:[[X("Spent by liver gluconeogenesis", "Dépensé par la néoglucogenèse hépatique", "Verbrauch der Glukoneogenese in der Leber"), 6], [X("Minus ATP gained by muscle anaerobic glycolysis", "Moins l'ATP gagné par la glycolyse anaérobie musculaire", "Minus ATP-Gewinn der anaeroben Muskelglykolyse"), '−2']]}; }},
 {c:'cost', g(){ return {q:X("How many high-energy phosphate bonds are consumed per urea molecule made?", "Combien de liaisons phosphate riches en énergie sont consommées par molécule d'urée ?", "Wie viele energiereiche Phosphatbindungen werden pro Harnstoffmolekül verbraucht?"), ans:4,
   rows:[[X("CPS-I: 2 ATP → 2 ADP", "CPS-I : 2 ATP → 2 ADP", "CPS-I: 2 ATP → 2 ADP"), 2], [X("Argininosuccinate synthetase: ATP → AMP + PPi (2 bonds)", "Argininosuccinate synthétase : ATP → AMP + PPi (2 liaisons)", "Argininosuccinat-Synthetase: ATP → AMP + PPi (2 Bindungen)"), 2]]}; }},
 {c:'cost', g(){ const nad = Math.random() < .5; return {q:nad ? X("How many NADPH are needed to make one palmitate from acetyl-CoA?", "Combien de NADPH faut-il pour fabriquer un palmitate à partir d'acétyl-CoA ?", "Wie viele NADPH braucht man für ein Palmitat aus Acetyl-CoA?") : X("How many ATP are needed to make one palmitate from 8 acetyl-CoA?", "Combien d'ATP faut-il pour fabriquer un palmitate à partir de 8 acétyl-CoA ?", "Wie viele ATP braucht man für ein Palmitat aus 8 Acetyl-CoA?"),
   ans:nad ? 14 : 7, rows:nad ? [[X("7 cycles × 2 reductions (β-ketoacyl and enoyl reductase)", "7 cycles × 2 réductions (β-cétoacyl et énoyl réductase)", "7 Zyklen × 2 Reduktionen (β-Ketoacyl- und Enoylreduktase)"), 14]] : [[X("7 malonyl-CoA, each made by ACC with 1 ATP (the first acetyl-CoA is the primer)", "7 malonyl-CoA, chacun formé par l'ACC avec 1 ATP (le premier acétyl-CoA sert d'amorce)", "7 Malonyl-CoA, je 1 ATP durch ACC (das erste Acetyl-CoA ist der Primer)"), 7]]}; }},
 {c:'cost', g(){ const nadh = Math.random() < .5; return {q:nadh ? X("How many protons are pumped into the intermembrane space per NADH oxidized?", "Combien de protons sont pompés dans l'espace intermembranaire par NADH oxydé ?", "Wie viele Protonen werden pro oxidiertem NADH in den Intermembranraum gepumpt?") : X("How many protons are pumped per FADH₂ (from succinate) oxidized?", "Combien de protons sont pompés par FADH₂ (issu du succinate) oxydé ?", "Wie viele Protonen werden pro oxidiertem FADH₂ (aus Succinat) gepumpt?"),
   ans:nadh ? 10 : 6, rows:nadh ? [[X("Complex I", "Complexe I", "Komplex I"), 4], [X("Complex III", "Complexe III", "Komplex III"), 4], [X("Complex IV", "Complexe IV", "Komplex IV"), 2]] : [[X("Complex II pumps none", "Le complexe II n'en pompe aucun", "Komplex II pumpt keine"), 0], [X("Complex III", "Complexe III", "Komplex III"), 4], [X("Complex IV", "Complexe IV", "Komplex IV"), 2]]}; }},
 {c:'cost', g(){ return {q:X("Storing one blood glucose as glycogen costs how many ATP equivalents?", "Stocker un glucose sanguin sous forme de glycogène coûte combien d'équivalents ATP ?", "Wie viele ATP-Äquivalente kostet es, eine Blutglucose als Glykogen zu speichern?"), ans:2,
   rows:[[X("Hexokinase/glucokinase: 1 ATP", "Hexokinase/glucokinase : 1 ATP", "Hexokinase/Glucokinase: 1 ATP"), 1], [X("UDP-glucose pyrophosphorylase: 1 UTP", "UDP-glucose pyrophosphorylase : 1 UTP", "UDP-Glucose-Pyrophosphorylase: 1 UTP"), 1]]}; }},
 {c:'cmp', g(){ const c = 10*(2 + Math.floor(Math.random()*11)), f = 5*(1 + Math.floor(Math.random()*10)), p = 5*(2 + Math.floor(Math.random()*9)), a = Math.random() < .35 ? 10*(1 + Math.floor(Math.random()*3)) : 0;
   return {q:l => [`A meal contains ${c} g carbohydrate, ${f} g fat, ${p} g protein${a ? ` and ${a} g alcohol` : ''}. Energy in kcal?`, `Un repas contient ${c} g de glucides, ${f} g de lipides, ${p} g de protéines${a ? ` et ${a} g d'alcool` : ''}. Énergie en kcal ?`, `Eine Mahlzeit enthält ${c} g Kohlenhydrate, ${f} g Fett, ${p} g Protein${a ? ` und ${a} g Alkohol` : ''}. Energie in kcal?`][LI[l]],
    ans:4*c + 9*f + 4*p + 7*a, tol:0.5,
    rows:[[X(`Carbohydrate ${c} g × 4`, `Glucides ${c} g × 4`, `Kohlenhydrate ${c} g × 4`), 4*c], [X(`Fat ${f} g × 9`, `Lipides ${f} g × 9`, `Fett ${f} g × 9`), 9*f], [X(`Protein ${p} g × 4`, `Protéines ${p} g × 4`, `Protein ${p} g × 4`), 4*p]].concat(a ? [[X(`Alcohol ${a} g × 7`, `Alcool ${a} g × 7`, `Alkohol ${a} g × 7`), 7*a]] : [])}; }},
 {c:'cmp', g(){ const v = PV(), glu = 2 + 2*v.n + 2*v.n + 2*v.ac, pal = faATP(16), r = Math.round((pal/256)/(glu/180)*10)/10;
   return {q:X("Per gram, how many times more ATP does palmitate (256 g/mol) give than glucose (180 g/mol)? (malate–aspartate shuttle; 1 decimal)", "Par gramme, combien de fois plus d'ATP le palmitate (256 g/mol) fournit-il que le glucose (180 g/mol) ? (navette malate–aspartate ; 1 décimale)", "Wie viel Mal mehr ATP pro Gramm liefert Palmitat (256 g/mol) als Glucose (180 g/mol)? (Malat-Aspartat-Shuttle; 1 Dezimalstelle)"), ans:r, tol:0.11, noSum:true,
    rows:[[X(`Palmitate: ${fmtE(pal)} ATP ÷ 256 g`, `Palmitate : ${fmtE(pal)} ATP ÷ 256 g`, `Palmitat: ${fmtE(pal)} ATP ÷ 256 g`), Math.round(pal/256*1000)/1000], [X(`Glucose: ${fmtE(glu)} ATP ÷ 180 g`, `Glucose : ${fmtE(glu)} ATP ÷ 180 g`, `Glucose: ${fmtE(glu)} ATP ÷ 180 g`), Math.round(glu/180*1000)/1000],
     [X("Ratio (fat is also stored without water, so the real advantage is ~6×)", "Rapport (la graisse est stockée sans eau, l'avantage réel est donc ~6×)", "Verhältnis (Fett wird zudem wasserfrei gespeichert, real also ~6×)"), r]]}; }},
 {c:'cmp', g(){ const v = PV(); return {q:X("One ethanol is completely oxidized in the liver (ADH → ALDH → acetyl-CoA synthetase; malate–aspartate shuttle). Net ATP?", "Un éthanol est entièrement oxydé dans le foie (ADH → ALDH → acétyl-CoA synthétase ; navette malate–aspartate). ATP nets ?", "Ein Ethanol wird in der Leber vollständig oxidiert (ADH → ALDH → Acetyl-CoA-Synthetase; Malat-Aspartat-Shuttle). Netto-ATP?"), ans:2*v.n - 2 + v.ac,
   rows:[[X("ADH: 1 NADH", "ADH : 1 NADH", "ADH: 1 NADH"), v.n], [X("ALDH: 1 NADH", "ALDH : 1 NADH", "ALDH: 1 NADH"), v.n], [X("Acetyl-CoA synthetase: ATP → AMP", "Acétyl-CoA synthétase : ATP → AMP", "Acetyl-CoA-Synthetase: ATP → AMP"), '−2'], [X("Krebs: 1 acetyl-CoA", "Krebs : 1 acétyl-CoA", "Citratzyklus: 1 Acetyl-CoA"), v.ac]]}; }},
 {c:'cmp', g(){ const items = [[X("fat", "lipides", "Fett"), 9], [X("carbohydrate", "glucides", "Kohlenhydrate"), 4], [X("protein", "protéines", "Protein"), 4], [X("ethanol", "éthanol", "Ethanol"), 7]]; const it = pick(items), g = 5*(2 + Math.floor(Math.random()*19));
   return {q:l => [`How many kcal do ${g} g of ${it[0][0]} provide?`, `Combien de kcal apportent ${g} g de ${it[0][1]} ?`, `Wie viele kcal liefern ${g} g ${it[0][2]}?`][LI[l]], ans:g*it[1], tol:0.5, rows:[[X(`${g} g × ${it[1]} kcal/g`, `${g} g × ${it[1]} kcal/g`, `${g} g × ${it[1]} kcal/g`), g*it[1]]]}; }}
];
function newD9(){ const s = S.d9; const pool = EGEN.filter(e => s.cat === 'any' || e.c === s.cat); const g = pick(pool); s.q = g.g(); s.val = ''; s.checked = false; s.ok = null; }
function renderD9(){
  if (!S.d9){ S.d9 = {cat:'any'}; newD9(); }
  const s = S.d9, q = s.q;
  let h = `<div class="controls"><label class="field"><span>${u('category')}</span><select data-chg="d9cat" id="sel-d9cat"><option value="any">${esc(u('allCats'))}</option>${Object.keys(ECATS).map(c => `<option value="${c}"${c === s.cat ? ' selected' : ''}>${esc(T(ECATS[c]))}</option>`).join('')}</select></label>`;
  h += `<div class="field"><span>${u('po')}</span>${segmented(u('po'), [['modern', U.poModern], ['classic', U.poClassic]], PO, 'd9po')}</div></div>`;
  h += `<div class="card qcard"><h3 class="q">${esc(T(q.q))}</h3><form class="numrow" data-sub="d9check"><label class="sr" for="d9in">${u('typeNumber')}</label><input id="d9in" inputmode="decimal" autocomplete="off" placeholder="${esc(u('typeNumber'))}" value="${esc(s.val)}"${s.checked ? ' disabled' : ''}><button type="submit" class="btn primary"${s.checked ? ' disabled' : ''}>${u('check')}</button></form>`;
  if (s.checked){ h += `<div class="fb ${s.ok ? 'ok' : 'no'}"><strong>${s.ok ? u('correct') : u('wrong')}</strong> · ${u('answerIs', {a:fmt(q.ans)})}<table class="brk"><caption>${u('breakdown')}</caption><tbody>`;
    q.rows.forEach(r => { const v = typeof r[1] === 'number' ? fmt(r[1]) : String(r[1]).replace('.', L === 'en' ? '.' : ','); h += `<tr><td>${esc(L === 'en' ? T(r[0]) : T(r[0]).replace(/(\d)\.(\d)/g, '$1,$2'))}</td><td class="num">${esc(v)}</td></tr>`; });
    if (!q.noSum) h += `<tr class="tot"><td>Σ</td><td class="num">${fmt(q.ans)}</td></tr>`; h += `</tbody></table></div><div class="actions"><button type="button" class="btn primary" data-act="d9next">${u('next')}</button></div>`; }
  h += `</div>`;
  const v = PV();
  h += `<details class="card ref"><summary>${u('refCard')}</summary><table class="brk"><tbody>`
    + [[X("NADH → ATP", "NADH → ATP", "NADH → ATP"), fmt(v.n)], [X("FADH₂ → ATP", "FADH₂ → ATP", "FADH₂ → ATP"), fmt(v.f)], [X("Acetyl-CoA (Krebs)", "Acétyl-CoA (Krebs)", "Acetyl-CoA (Citratzyklus)"), fmt(v.ac)],
       [X("Glucose (malate–aspartate / glycerol-3-P shuttle)", "Glucose (navette malate–aspartate / glycérol-3-P)", "Glucose (Malat-Aspartat- / Glycerin-3-P-Shuttle)"), fmt(2 + 4*v.n + 2*v.ac) + ' / ' + fmt(2 + 2*v.f + 2*v.n + 2*v.ac)],
       [X("Palmitate (C16:0)", "Palmitate (C16:0)", "Palmitat (C16:0)"), fmt(faATP(16))], [X("kcal/g: carbohydrate · protein · ethanol · fat", "kcal/g : glucides · protéines · éthanol · lipides", "kcal/g: Kohlenhydrate · Protein · Ethanol · Fett"), '4 · 4 · 7 · 9']]
      .map(r => `<tr><td>${esc(T(r[0]))}</td><td class="num">${esc(r[1])}</td></tr>`).join('') + `</tbody></table></details>`;
  return h;
}

/* ===================== HOME ===================== */
function renderHome(){
  const GR = [['met', 'grpMet'], ['bio', 'grpBio'], ['phy', 'grpPhy']].filter(g => DR.some(d => (d.g || 'met') === g[0]));
  let h = `<section class="intro"><p>${u('subtitle', {n:P.length, d:DR.length})}</p>`;
  if (GR.length > 1) h += `<nav class="jumps" aria-label="${esc(u('jump'))}">` + GR.map(g => `<button type="button" class="libchip" data-act="jump" data-v="grp-${g[0]}">${u(g[1])}</button>`).join('') + `</nav>`;
  h += `</section>`;
  GR.forEach((g, gi) => { if (GR.length > 1) h += `<h2 class="grp" id="grp-${g[0]}">${u(g[1])}</h2>`; h += `<div class="tiles">`;
    DR.filter(d => (d.g || 'met') === g[0]).sort((x, y) => String(x.n).localeCompare(String(y.n), undefined, {numeric:true})).forEach(d => { h += `<a class="tile" href="#${d.id}"><span class="tnum">${typeof d.n === 'number' ? String(d.n).padStart(2, '0') : d.n}</span><span class="tt">${u(d.k + 't')}</span><span class="td">${u(d.k + 'd')}</span>${scoreChip(d.id)}</a>`; });
    if (gi < GR.length - 1) h += `</div>`; });
  h += `</div><section class="library"><h2>${u('library')}</h2><p class="note">${u('libraryNote')}</p>`;
  for (const c in CATS){ h += `<div class="libcat"><h3>${esc(T(CATS[c]))}</h3><div class="libchips">`;
    P.filter(p => p.cat === c).forEach(p => { h += `<button type="button" class="libchip" data-act="openpw" data-p="${p.id}">${esc(T(p.n))}<span>${p.st.length}</span></button>`; });
    h += `</div></div>`; }
  h += `</section><p class="foot">${u('progress')} <button type="button" class="linkbtn" data-act="resetscores">${u('reset')}</button></p>` + (HOME_EXTRA ? HOME_EXTRA() : '');
  return h;
}

/* ===================== FRAME ===================== */
function renderHeader(){
  const hd = document.getElementById('hdr'); if (!hd) return;
  let c = 0, n = 0; for (const k in SCORES){ c += SCORES[k].c; n += SCORES[k].n; }
  const acc = n ? `<span class="chip ${c/n >= .8 ? 'good' : c/n >= .5 ? 'warn' : 'bad'}">${Math.round(100*c/n)}%<span class="long">&nbsp;${u('accuracy')} · ${n} ${u('answered')}</span></span>` : '';
  hd.innerHTML = `<a class="brand" href="#home"><span class="logo" aria-hidden="true">⌬</span><span><span class="bt">${u('appTitle')}</span></span></a><div class="hright">${acc}${HEADER_EXTRA ? HEADER_EXTRA() : ''}<div class="seg lang" role="group" aria-label="Language">` +
    ['en', 'fr', 'de'].map(l => `<button type="button" class="${l === L ? 'on' : ''}" data-act="lang" data-v="${l}" aria-pressed="${l === L}" lang="${l}">${l.toUpperCase()}</button>`).join('') + `</div></div>`;
}
const RENDER = {pathways:renderD1, next:renderD2, organs:renderD3, hormones:renderD4, switching:renderD5, enzymes:renderD6, missing:renderD7, cases:renderD8, energy:renderD9};
let HEADER_EXTRA = null; const EXTRA_VIEWS = {}; let HOME_EXTRA = null; const SUBS = {};
function render(){
  document.documentElement.lang = L;
  renderHeader();
  const main = document.getElementById('main');
  if (VIEW === 'home'){ main.innerHTML = renderHome(); document.title = u('appTitle'); return; }
  if (EXTRA_VIEWS[VIEW]){ main.innerHTML = EXTRA_VIEWS[VIEW](); afterRender(); return; }
  const d = DR.find(x => x.id === VIEW);
  main.innerHTML = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><span class="tnum">${typeof d.n === 'number' ? String(d.n).padStart(2, '0') : d.n}</span><h1>${u(d.k + 't')}</h1>${scoreChip(d.id)}</div><p class="ddesc">${u(d.k + 'd')}</p></div>` + RENDER[VIEW]();
  afterRender();
}
let SCROLL = null;
const SCROLLMAP = {d2ans:'.fb', d3check:'.fb', d4check:'.legend', d4mans:'.fb', d4pans:'.fb', d5ans:'.fb', d6ans:'.fb', d7check:'.mapcard .actions', d8ans:'.fb', d8mans:'.fb', ocheck:'.fb',
  d2next:'.qcard', d3next:'.qcard', d4mnext:'.qcard', d4pnext:'.qcard', d5next:'.qcard', d6next:'.qcard', d8next:'.case', d8mnext:'.qcard', d9next:'.qcard', d2again:'.qcard', d2other:'#main'};
function afterRender(){ if (!SCROLL || typeof document === 'undefined') { SCROLL = null; return; }
  const el = document.querySelector(SCROLL); SCROLL = null; if (!el || !el.getBoundingClientRect) return;
  const r = el.getBoundingClientRect(), vh = window.innerHeight || 800;
  if (r.top < 64 || r.bottom > vh) { const smooth = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    el.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: r.height > vh - 80 ? 'start' : (r.top < 64 ? 'start' : 'end')}); } }
function route(){ const h = (location.hash || '').slice(1); VIEW = (RENDER[h] || EXTRA_VIEWS[h]) ? h : 'home'; render(); window.scrollTo(0, 0); }

/* ===================== ACTIONS ===================== */
const A = {
  lang(el){ L = el.dataset.v; store.set('lang', L); render(); },
  jump(el){ const t = document.getElementById(el.dataset.v); if (t) t.scrollIntoView({behavior:'smooth', block:'start'}); },
  resetscores(){ resetProgress(); render(); },
  openpw(el){ S.d1 = null; newD1(el.dataset.p, 'cards'); S.d1.showMap = true; if (location.hash === '#pathways') render(); else location.hash = 'pathways'; },
  opick(el){ const o = orderState(el.dataset.ns); if (o.checked) return; o.pool = o.pool.filter(x => x !== el.dataset.uid); o.seq.push(el.dataset.uid); o.msg = null; render(); },
  ounpick(el){ const o = orderState(el.dataset.ns); if (o.checked) return; o.seq = o.seq.filter(x => x !== el.dataset.uid); o.pool.push(el.dataset.uid); render(); },
  oundo(el){ const o = orderState(el.dataset.ns); if (o.checked || !o.seq.length) return; o.pool.unshift(o.seq.pop()); render(); },
  oclear(el){ const o = orderState(el.dataset.ns); if (o.checked) return; o.pool = o.pool.concat(o.seq); o.seq = []; render(); },
  ocheck(el){ const ns = el.dataset.ns, o = orderState(ns); if (o.checked) return;
    if (o.pool.length){ o.msg = 'placeAll'; render(); return; }
    o.res = o.seq.map((uid, k) => o.items.find(i => i.uid === uid).ans === o.correct[k]); o.checked = true;
    addScore(ns === 'd1' ? 'pathways' : ns === 'd5' ? 'switching' : ns, o.res.every(Boolean) ? 1 : 0, 1); render(); },
  d1mode(el){ newD1(S.d1.pid, el.dataset.v); render(); },
  d1new(){ newD1(S.d1.pid, S.d1.mode); render(); },
  d1map(){ S.d1.showMap = !S.d1.showMap; render(); },
  d2ans(el){ const s = S.d2; if (s.q.chosen != null) return; s.q.chosen = +el.dataset.k; const ok = s.q.opts[s.q.chosen] === s.q.correct; s.n++; if (ok) s.ok++; addScore('next', ok ? 1 : 0, 1); render(); },
  d2next(){ const s = S.d2; s.i++; makeQ2(); render(); },
  d2again(){ newD2(S.d2.pid); render(); }, d2other(){ newD2('__rand'); render(); },
  d3tog(el){ const s = S.d3; if (s.checked) return; const o = el.dataset.o; const i = s.sel.indexOf(o); if (i >= 0) s.sel.splice(i, 1); else s.sel.push(o); render(); },
  d3check(){ const s = S.d3; const q = ORGQ[s.order[s.k]]; s.checked = true; addScore('organs', sameSet(s.sel, q.a) ? 1 : 0, 1); render(); },
  d3next(){ const s = S.d3; s.k++; if (s.k >= ORGQ.length){ newD3(); } else { s.sel = []; s.checked = false; } render(); },
  d4tab(el){ S.d4.tab = el.dataset.v; render(); },
  d4h(el){ const s = S.d4; s.h = el.dataset.v; s.ans = {}; s.checked = false; render(); },
  d4set(el){ const s = S.d4; if (s.checked) return; s.ans[el.dataset.i] = el.dataset.v; render(); },
  d4check(){ const s = S.d4; let c = 0, n = 0; HMAT.forEach((r, i) => { const v = r.v[s.h]; if (v == null) return; n++; if (s.ans[i] === v) c++; }); s.checked = true; addScore('hormones', c, n); render(); },
  d4reset(){ const s = S.d4; s.ans = {}; s.checked = false; render(); },
  d4mans(el){ const m = S.d4.mcq; if (m.chosen != null) return; m.chosen = +el.dataset.k; const q = HMCQ[m.order[m.k]]; addScore('hormones', m.perm[m.chosen] === q.a ? 1 : 0, 1); render(); },
  d4mnext(){ const m = S.d4.mcq; m.k++; if (m.k >= HMCQ.length) newD4mcq(); else { m.perm = shuffle([0, 1, 2, 3]); m.chosen = null; } render(); },
  d4pans(el){ const ph = S.d4.phos; if (ph.chosen) return; ph.chosen = el.dataset.v; addScore('hormones', ph.chosen === R[ph.e].ph ? 1 : 0, 1); render(); },
  d4pnext(){ const prev = S.d4.phos.e; let e; do { e = pick(PHOS); } while (e === prev && PHOS.length > 1); S.d4.phos = {e, chosen:null}; render(); },
  d5tab(el){ S.d5.tab = el.dataset.v; render(); },
  d5ans(el){ const c = S.d5.cq; if (c.chosen) return; c.chosen = el.dataset.v; addScore('switching', c.chosen === SWQ[c.order[c.k]].a ? 1 : 0, 1); render(); },
  d5next(){ const c = S.d5.cq; c.k++; if (c.k >= SWQ.length) newD5c(); else c.chosen = null; render(); },
  d5reord(){ newD5o(S.d5.ord.ti); render(); },
  d6ans(el){ const s = S.d6; if (s.chosen != null) return; s.chosen = +el.dataset.k; addScore('enzymes', s.chosen === s.correctIdx ? 1 : 0, 1); render(); },
  d6next(){ newD6(); render(); },
  d7check(){ const s = S.d7; const keys = Object.keys(s.B); if (keys.some(k => !s.B[k].val)){ s.msg = 'fillAll'; render(); return; }
    let c = 0; keys.forEach(k => { const b = s.B[k]; b.state = b.val === b.ans || TEN(b.kind === 'm' ? M[b.val] : E[b.val]) === TEN(b.kind === 'm' ? M[b.ans] : E[b.ans]) ? 'ok' : 'no'; if (b.state === 'ok') c++; });
    s.checked = true; s.msg = null; addScore('missing', c, keys.length); render(); },
  d7new(){ newD7(S.d7.pid, S.d7.mode); render(); },
  d8ans(el){ const s = S.d8; if (s.chosen != null) return; s.chosen = +el.dataset.k; addScore('cases', s.perm[s.chosen] === 0 ? 1 : 0, 1); render(); },
  d8next(){ const s = S.d8, c = CASES[s.order[s.pos]]; if (s.qi < c.qs.length - 1){ s.qi++; s.perm = shuffle([0, 1, 2, 3]); s.chosen = null; } else { s.pos = (s.pos + 1) % CASES.length; s.qi = 0; s.perm = shuffle([0, 1, 2, 3]); s.chosen = null; } render(); },
  d8tab(el){ S.d8.tab = el.dataset.v; render(); },
  d8mans(el){ const m = S.d8.m; if (m.chosen != null) return; m.chosen = +el.dataset.k; addScore('cases', m.opts[m.chosen] === m.it ? 1 : 0, 1); render(); },
  d8mnext(){ newMatch(); render(); },
  d9po(el){ PO = el.dataset.v; store.set('po', PO); newD9(); render(); },
  d9next(){ newD9(); render(); setTimeout(() => { const i = document.getElementById('d9in'); if (i) i.focus(); }, 0); }
};
const CHG = {
  d1path(el){ newD1(el.value, S.d1.mode); render(); },
  d2path(el){ newD2(el.value); render(); },
  d5tl(el){ newD5o(+el.value); render(); },
  d6type(el){ S.d6.type = el.value; newD6(); render(); },
  d6cat(el){ S.d6.cat = el.value; newD6(); render(); },
  d7path(el){ newD7(el.value, S.d7.mode); render(); },
  d7mode(el){ newD7(S.d7.pid, el.value); render(); },
  d7sel(el){ const b = S.d7.B[el.dataset.key]; if (b && !b.state) b.val = el.value; S.d7.msg = null; },
  d8grp(el){ S.d8.g = el.value; newMatch(); render(); },
  d8case(el){ newD8(+el.value); render(); },
  d9cat(el){ S.d9.cat = el.value; newD9(); render(); }
};
function d9submit(){ const s = S.d9; const inp = document.getElementById('d9in'); const raw = (inp ? inp.value : '').trim().replace(',', '.').replace('−', '-');
  if (!raw || isNaN(+raw)) { if (inp) inp.focus(); return; }
  s.val = inp.value; const tol = s.q.tol != null ? s.q.tol : 0.05; s.ok = Math.abs(+raw - s.q.ans) <= tol; s.checked = true; SCROLL = '.fb'; addScore('energy', s.ok ? 1 : 0, 1); render(); }

if (typeof document !== 'undefined'){
  L = store.get('lang', null) || ((navigator.language || 'en').slice(0, 2)); if (!(L in LI)) L = 'en';
  document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el) return; const f = A[el.dataset.act]; if (f){ e.preventDefault(); SCROLL = SCROLLMAP[el.dataset.act] || null; f(el); } });
  document.addEventListener('toggle', e => { if (e.target && e.target.classList && e.target.classList.contains('info')) INFO_OPEN = e.target.open; }, true);
  document.addEventListener('change', e => { const el = e.target.closest('[data-chg]'); if (!el) return; const f = CHG[el.dataset.chg]; if (f) f(el); });
  document.addEventListener('submit', e => { const f = e.target.closest('[data-sub]'); if (!f) return; e.preventDefault(); if (f.dataset.sub === 'd9check') d9submit(); else if (SUBS[f.dataset.sub]) SUBS[f.dataset.sub](f); });
  window.addEventListener('hashchange', route);
  if (document.readyState === 'complete') route(); else window.addEventListener('load', route);
}
