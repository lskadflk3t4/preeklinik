
/* ===================== VISUAL LEARNING LAYER =====================
   Adds (without touching any drill content):
   - colour-coded tokens for energy (ATP/GTP), electron carriers (NADH/FADH₂/NADPH) and small molecules (CO₂, H₂O, O₂, Pi)
   - compartment colours on reactions and maps, with a legend
   - reaction "building blocks" (substrate ─enzyme→ product) in the ordering drills, numbered empty slots, links after checking
   - "In simple words" notes after every Check: what the question asks, how to work it out, and what happened here */
Object.assign(U, {
  nTitle:"In simple words|En termes simples|Einfach erklärt",
  nAsk:"What the question asks|Ce que demande la question|Worum es geht",
  nHow:"How to work it out|Comment trouver la réponse|So kommst du drauf",
  nWhat:"What happens here|Ce qui se passe ici|Was hier passiert",
  nYour:"About your answer|À propos de votre réponse|Zu deiner Antwort",
  nStory:"The pathway step by step|La voie étape par étape|Der Weg Schritt für Schritt",
  nEnergy:"Where energy is spent and made|Où l'énergie est dépensée et produite|Wo Energie verbraucht und gewonnen wird",
  nName:"Name clue|Indice dans le nom|Hinweis im Namen",
  nIn:"Where|Où|Wo",
  lgTitle:"Colour key|Légende des couleurs|Farblegende",
  lgEnergy:"energy (ATP, GTP)|énergie (ATP, GTP)|Energie (ATP, GTP)",
  lgCarrier:"electron carriers (NADH, FADH₂, NADPH)|transporteurs d'électrons (NADH, FADH₂, NADPH)|Elektronenträger (NADH, FADH₂, NADPH)",
  lgSmall:"small molecules (CO₂, H₂O, O₂, Pi)|petites molécules (CO₂, H₂O, O₂, Pi)|kleine Moleküle (CO₂, H₂O, O₂, Pi)",
  lgMol:"molecule|molécule|Molekül", lgEnz:"enzyme|enzyme|Enzym",
  linkOk:"{m} is passed on|{m} est transmis|{m} wird weitergegeben",
  linkNo:"chain breaks: {a} ≠ {b}|la chaîne casse : {a} ≠ {b}|Kette reißt: {a} ≠ {b}",
  linkBranch:"new branch|nouvelle branche|neuer Zweig",
  slotLeft:"{n} more|encore {n}|noch {n}"
});

/* ---------- colour-coded tokens ---------- */
const TOK = [
  ['NADPH','ec'],['NADP⁺','ec'],['NAD(P)H','ec'],['NAD(P)⁺','ec'],['NADH','ec'],['NAD⁺','ec'],['FADH₂','ec'],['FAD','ec'],['FMN','ec'],
  ['ATP','en'],['ADP','en'],['AMP','en'],['GTP','en'],['GDP','en'],['UTP','en'],['UDP','en'],['CTP','en'],
  ['HCO₃⁻','sm'],['CO₂','sm'],['H₂O₂','sm'],['H₂O','sm'],['O₂','sm'],['PPi','sm'],['Pi','sm'],['NH₄⁺','sm'],['NH₃','sm']
];
const TOK_RE = new RegExp('(^|[^A-Za-z0-9(])(' + TOK.map(t => t[0].replace(/[()⁺]/g, m => '\\' + m)).join('|') + ')(?![A-Za-z0-9₂⁺])', 'g');
const TOK_CLS = {}; TOK.forEach(t => TOK_CLS[t[0]] = t[1]);
function tokHTML(text){ return esc(text).replace(TOK_RE, (m, pre, tk) => pre + `<span class="tk tk-${TOK_CLS[tk]}">${tk}</span>`); }
function sideHTML(x){ return `<span class="side">${tokHTML(T(x))}</span>`; }

/* ---------- compartments ---------- */
const LOCCLS = {c:'c', m:'m', imm:'imm', omm:'omm', er:'er', ly:'ly'};
function locCls(l){ return 'loc-' + (LOCCLS[l] || 'x'); }
function legendHTML(p){
  const locs = p ? uniq(p.st.map(s => stepLoc(p, s)).filter(l => l && LOC[l])) : [];
  let h = `<div class="vlegend" aria-label="${esc(u('lgTitle'))}"><span class="m">${u('lgMol')}</span><span class="e">${u('lgEnz')}</span>`
    + `<span class="tk tk-en">ATP</span><span class="lgx">${u('lgEnergy')}</span><span class="tk tk-ec">NADH</span><span class="lgx">${u('lgCarrier')}</span><span class="tk tk-sm">CO₂</span><span class="lgx">${u('lgSmall')}</span>`;
  if (locs.length > 1 || (locs.length === 1 && p.st.some(s => s[4]))) h += locs.map(l => `<span class="lgloc ${locCls(l)}">${esc(T(LOC[l]))}</span>`).join('');
  return h + `</div>`;
}

/* ---------- reaction building block ---------- */
function rxnBlock(p, i){ const s = p.st[i], lc = stepLoc(p, s);
  return `<span class="blk ${locCls(lc)}"><span class="m blk-a">${esc(mol(s[0]))}</span><span class="blk-to" aria-hidden="true"></span><span class="m blk-b">${esc(mol(s[1]))}</span>`
    + `<span class="blk-ez"><span class="e">${esc(enz(s[2]))}</span>${s[3] ? sideHTML(s[3]) : ''}</span></span>`;
}

/* ---------- plain-language facts about a step ---------- */
const FX = {
  atpUse:"spends {n} ATP – this costs energy|dépense {n} ATP – cela coûte de l'énergie|verbraucht {n} ATP – das kostet Energie",
  atpAmp:"spends ATP down to AMP – that costs two phosphates' worth of energy|transforme l'ATP en AMP – cela coûte l'énergie de deux phosphates|spaltet ATP zu AMP – das kostet die Energie von zwei Phosphaten",
  atpMake:"makes {n} ATP directly (substrate-level phosphorylation)|fabrique directement {n} ATP (phosphorylation au niveau du substrat)|bildet direkt {n} ATP (Substratkettenphosphorylierung)",
  gtpMake:"makes 1 GTP (worth 1 ATP)|fabrique 1 GTP (vaut 1 ATP)|bildet 1 GTP (entspricht 1 ATP)",
  gtpUse:"spends 1 GTP (worth 1 ATP)|dépense 1 GTP (vaut 1 ATP)|verbraucht 1 GTP (entspricht 1 ATP)",
  utpUse:"uses UTP to 'activate' the molecule|utilise l'UTP pour « activer » la molécule|nutzt UTP, um das Molekül zu „aktivieren“",
  nadhMake:"NAD⁺ picks up electrons and becomes NADH (the molecule is oxidized). NADH later makes ≈ 2.5 ATP in the electron transport chain.|le NAD⁺ capte des électrons et devient NADH (la molécule est oxydée). Le NADH fournira ensuite ≈ 2,5 ATP dans la chaîne respiratoire.|NAD⁺ nimmt Elektronen auf und wird zu NADH (das Molekül wird oxidiert). NADH liefert später ≈ 2,5 ATP in der Atmungskette.",
  nadhUse:"NADH hands its electrons over (the molecule is reduced)|le NADH cède ses électrons (la molécule est réduite)|NADH gibt seine Elektronen ab (das Molekül wird reduziert)",
  nadphMake:"makes NADPH – the cell's 'building' electron carrier (for fat and cholesterol synthesis and antioxidant defence)|fabrique du NADPH – le transporteur d'électrons « de construction » (synthèse des lipides et du cholestérol, défense antioxydante)|bildet NADPH – den „Bau“-Elektronenträger der Zelle (für Fett- und Cholesterinsynthese und Schutz vor Oxidation)",
  nadphUse:"uses NADPH as building power (a reduction)|utilise le NADPH comme pouvoir réducteur pour construire (une réduction)|nutzt NADPH als Reduktionskraft zum Aufbauen (eine Reduktion)",
  fadMake:"FAD picks up electrons and becomes FADH₂ (≈ 1.5 ATP later)|le FAD capte des électrons et devient FADH₂ (≈ 1,5 ATP ensuite)|FAD nimmt Elektronen auf und wird zu FADH₂ (später ≈ 1,5 ATP)",
  co2Out:"a carbon leaves as CO₂ (decarboxylation) – the molecule gets one carbon shorter|un carbone part sous forme de CO₂ (décarboxylation) – la molécule perd un carbone|ein Kohlenstoff geht als CO₂ weg (Decarboxylierung) – das Molekül wird um ein C kürzer",
  co2In:"CO₂ (as bicarbonate) is added (carboxylation) – the molecule gets one carbon longer|du CO₂ (sous forme de bicarbonate) est ajouté (carboxylation) – la molécule gagne un carbone|CO₂ (als Bicarbonat) wird angehängt (Carboxylierung) – das Molekül wird um ein C länger",
  h2oOut:"water is pulled out (dehydration)|de l'eau est retirée (déshydratation)|Wasser wird abgespalten (Dehydratisierung)",
  h2oIn:"water is added (hydration or hydrolysis – a bond is cut with water)|de l'eau est ajoutée (hydratation ou hydrolyse – une liaison est coupée par l'eau)|Wasser wird angelagert (Hydratisierung oder Hydrolyse – eine Bindung wird mit Wasser gespalten)",
  o2:"uses oxygen (O₂)|utilise de l'oxygène (O₂)|braucht Sauerstoff (O₂)",
  piIn:"adds a free phosphate (Pi) without spending ATP|ajoute un phosphate libre (Pi) sans dépenser d'ATP|hängt freies Phosphat (Pi) an, ohne ATP zu verbrauchen",
  piOut:"releases a phosphate|libère un phosphate|setzt ein Phosphat frei",
  vit:"needs {c} (from {v})|a besoin de {c} (issu de {v})|braucht {c} (aus {v})",
  irr:"It is a one-way street (irreversible): to go backwards the cell needs a different enzyme.|C'est une rue à sens unique (irréversible) : pour revenir en arrière, la cellule a besoin d'une autre enzyme.|Das ist eine Einbahnstraße (irreversibel): Für den Rückweg braucht die Zelle ein anderes Enzym.",
  rl:"It is the speed controller of the pathway (rate-limiting): hormones and signals act here to speed up or slow down the whole pathway.|C'est le régulateur de vitesse de la voie (étape limitante) : hormones et signaux agissent ici pour accélérer ou freiner toute la voie.|Das ist der Geschwindigkeitsregler des Wegs (geschwindigkeitsbestimmend): Hormone und Signale greifen hier an, um den ganzen Weg zu beschleunigen oder zu bremsen.",
  turns:"{e} turns {a} into {b}.|{e} transforme {a} en {b}.|{e} macht aus {a} {b}.",
  also:"Along the way it {x}.|Au passage, elle {x}.|Dabei {x}."
};
const VIT = [['TPP','vitamin B1 (thiamine)|la vitamine B1 (thiamine)|Vitamin B1 (Thiamin)'],['PLP','vitamin B6|la vitamine B6|Vitamin B6'],['biotin','vitamin B7 (biotin)|la vitamine B7 (biotine)|Vitamin B7 (Biotin)'],
  ['B12','vitamin B12|la vitamine B12|Vitamin B12'],['BH4','tetrahydrobiopterin (made by the body)|la tétrahydrobioptérine (fabriquée par l\'organisme)|Tetrahydrobiopterin (körpereigen)'],['vitamin C','vitamin C|la vitamine C|Vitamin C'],['THF','folate (vitamin B9)|le folate (vitamine B9)|Folat (Vitamin B9)']];
function fxu(k, v){ let s = T(FX[k]); if (v) for (const key in v) s = s.split('{' + key + '}').join(v[key]); return s; }
function sideFacts(side){
  if (!side) return [];
  const en = TEN(side), out = [], seen = new Set();
  const add = (k, v) => { if (seen.has(k)) return; seen.add(k); out.push(fxu(k, v)); };
  const num = (str, tk) => { const m = new RegExp('(\\d+)\\s*' + tk.replace(/[⁺()]/g, x => '\\' + x)).exec(str); return m ? +m[1] : 1; };
  en.split(';').forEach(cl => {
    const parts = cl.split(/→|⇌/); const prodSet = new Set();
    const has = (s, tk) => new RegExp('(^|[^A-Za-z0-9(])' + tk.replace(/[⁺()]/g, x => '\\' + x) + '(?![A-Za-z0-9₂⁺])').test(s);
    if (parts.length > 1){
      for (let k = 0; k < parts.length - 1; k++){ const a = parts[k], b = parts[k + 1];
        if (has(a, 'ATP') && has(b, 'AMP')) add('atpAmp'); else if (has(a, 'ATP') && !prodSet.has('ATP')) add('atpUse', {n:num(a, 'ATP')});
        if (has(a, 'ADP') && has(b, 'ATP')){ add('atpMake', {n:num(b, 'ATP')}); prodSet.add('ATP'); }
        if (has(b, 'GTP')){ add('gtpMake'); prodSet.add('GTP'); } else if (has(a, 'GTP')) add('gtpUse');
        if (has(a, 'UTP')) add('utpUse');
        if (has(a, 'NAD⁺') && has(b, 'NADH')){ add('nadhMake'); prodSet.add('NADH'); } else if (has(a, 'NADH') && has(b, 'NAD⁺') && !prodSet.has('NADH')) add('nadhUse');
        if ((has(a, 'NADP⁺') && has(b, 'NADPH')) || (has(a, 'NAD(P)⁺') && has(b, 'NAD(P)H'))) add('nadphMake'); else if (has(a, 'NADPH') && has(b, 'NADP⁺')) add('nadphUse');
        if (has(a, 'FAD') && has(b, 'FADH₂')) add('fadMake');
        if ((has(a, 'CO₂') || has(a, 'HCO₃⁻')) && k === 0 && !/−\s*\d*\s*CO₂/.test(a)) add('co2In');
        if (has(b, 'Pi') && !has(b, 'NADH')) add('piOut');
      }
    } else {
      if (has(cl, 'NADPH')) add('nadphUse');
      if (has(cl, 'ATP') && /\d\s*ATP|^\s*ATP/.test(cl)) add('atpUse', {n:num(cl, 'ATP')});
    }
    if (/−\s*\d*\s*CO₂/.test(cl)) add('co2Out');
    if (/\+\s*(CO₂|HCO₃⁻)/.test(cl)) add('co2In');
    if (/−\s*H₂O/.test(cl)) add('h2oOut');
    if (/\+\s*H₂O/.test(cl)) add('h2oIn');
    if (/(^|[^A-Za-z])O₂/.test(cl)) add('o2');
    const lft = cl.split(/→|⇌/)[0]; if (/\+\s*Pi\b/.test(lft) && !/DP|NAD|ATP/.test(lft)) add('piIn');
    if (/−\s*Pi\b/.test(cl)) add('piOut');
  });
  VIT.forEach(v => { if (new RegExp('(^|[^A-Za-z0-9-])' + v[0] + '([^A-Za-z0-9]|$)').test(en) && !seen.has('vit' + v[0])){ seen.add('vit' + v[0]); out.push(fxu('vit', {c:v[0], v:T(v[1])})); } });
  return out;
}

/* ---------- enzyme name decoder (rule matched on the English name) ---------- */
const NAMECLUE = [
  [/aminotransferase|transaminase/, "'Aminotransferase' = moves an amino group (–NH₂) from one molecule to another; always needs vitamin B6 (PLP).|« Aminotransférase » = déplace un groupe aminé (–NH₂) d'une molécule à une autre ; a toujours besoin de vitamine B6 (PLP).|„Aminotransferase“ = überträgt eine Aminogruppe (–NH₂) von einem Molekül auf ein anderes; braucht immer Vitamin B6 (PLP)."],
  [/carboxykinase/, "'Carboxy-kinase' = takes off a CO₂ and puts on a phosphate from GTP in one go.|« Carboxykinase » = retire un CO₂ et ajoute un phosphate venant du GTP en une seule fois.|„Carboxykinase“ = spaltet CO₂ ab und hängt in einem Schritt ein Phosphat aus GTP an."],
  [/phosphatase/, "'Phosphatase' = cuts a phosphate off with water (the opposite of a kinase).|« Phosphatase » = retire un phosphate grâce à l'eau (l'inverse d'une kinase).|„Phosphatase“ = spaltet ein Phosphat mit Wasser ab (das Gegenteil einer Kinase)."],
  [/phosphorylase/, "'Phosphorylase' = breaks a bond using free phosphate (Pi) instead of water, so the piece comes off already phosphorylated.|« Phosphorylase » = coupe une liaison avec du phosphate libre (Pi) au lieu de l'eau : le morceau sort déjà phosphorylé.|„Phosphorylase“ = spaltet eine Bindung mit freiem Phosphat (Pi) statt mit Wasser, das Stück kommt schon phosphoryliert heraus."],
  [/decarboxylase/, "'De-carboxyl-ase' = removes CO₂.|« Dé-carboxyl-ase » = retire du CO₂.|„De-carboxyl-ase“ = spaltet CO₂ ab."],
  [/carboxylase/, "'Carboxylase' = adds CO₂ (as bicarbonate); usually needs biotin and ATP.|« Carboxylase » = ajoute du CO₂ (bicarbonate) ; a souvent besoin de biotine et d'ATP.|„Carboxylase“ = hängt CO₂ (als Bicarbonat) an; braucht meist Biotin und ATP."],
  [/dehydratase/, "'De-hydrat-ase' = pulls water out of the molecule.|« Déshydratase » = retire de l'eau de la molécule.|„Dehydratase“ = spaltet Wasser aus dem Molekül ab."],
  [/hydratase|fumarase|aconitase|enolase/, "This enzyme adds or removes water to move or create a double bond.|Cette enzyme ajoute ou retire de l'eau pour déplacer ou créer une double liaison.|Dieses Enzym lagert Wasser an oder spaltet es ab, um eine Doppelbindung zu bilden oder zu verschieben."],
  [/dehydrogenase/, "'De-hydrogen-ase' = takes hydrogen (electrons) off the molecule and gives them to NAD⁺ or FAD – or the reverse.|« Déshydrogénase » = enlève de l'hydrogène (des électrons) à la molécule et les donne au NAD⁺ ou au FAD – ou l'inverse.|„Dehydrogenase“ = nimmt dem Molekül Wasserstoff (Elektronen) weg und gibt sie an NAD⁺ oder FAD – oder umgekehrt."],
  [/reductase/, "'Reductase' = adds electrons (a reduction), usually taken from NADPH.|« Réductase » = ajoute des électrons (une réduction), le plus souvent pris au NADPH.|„Reduktase“ = fügt Elektronen hinzu (eine Reduktion), meist aus NADPH."],
  [/oxidase|oxygenase|hydroxylase/, "'Oxidase / oxygenase / hydroxylase' = uses oxygen (O₂) to oxidize the molecule or add an –OH group.|« Oxydase / oxygénase / hydroxylase » = utilise l'oxygène (O₂) pour oxyder la molécule ou ajouter un groupe –OH.|„Oxidase / Oxygenase / Hydroxylase“ = nutzt Sauerstoff (O₂), um das Molekül zu oxidieren oder eine –OH-Gruppe anzuhängen."],
  [/synthetase/, "'Synthetase' = joins two pieces and pays with ATP.|« Synthétase » = assemble deux morceaux en payant avec de l'ATP.|„Synthetase“ = verbindet zwei Teile und bezahlt mit ATP."],
  [/synthase/, "'Synthase' = builds a new molecule by joining pieces, without spending ATP directly.|« Synthase » = construit une molécule en assemblant des morceaux, sans dépenser directement d'ATP.|„Synthase“ = baut ein Molekül aus Teilen auf, ohne direkt ATP zu verbrauchen."],
  [/mutase/, "'Mutase' = moves a group (often a phosphate) to another spot on the same molecule.|« Mutase » = déplace un groupe (souvent un phosphate) à un autre endroit de la même molécule.|„Mutase“ = verschiebt eine Gruppe (oft ein Phosphat) an eine andere Stelle im selben Molekül."],
  [/epimerase/, "'Epimerase' = flips the arrangement at just one carbon.|« Épimérase » = inverse la configuration d'un seul carbone.|„Epimerase“ = dreht die Anordnung an nur einem Kohlenstoff um."],
  [/isomerase/, "'Isomerase' = rearranges the same atoms into a different shape (same formula, new structure).|« Isomérase » = réarrange les mêmes atomes autrement (même formule, nouvelle structure).|„Isomerase“ = ordnet dieselben Atome anders an (gleiche Formel, neue Struktur)."],
  [/aldolase|lyase|desmolase/, "'Aldolase / lyase' = splits a molecule in two (or joins two) without water or redox.|« Aldolase / lyase » = coupe une molécule en deux (ou en assemble deux) sans eau ni oxydoréduction.|„Aldolase / Lyase“ = spaltet ein Molekül in zwei Teile (oder verbindet zwei) ohne Wasser oder Redoxreaktion."],
  [/kinase/, "'Kinase' = puts a phosphate from ATP (or GTP) onto a molecule.|« Kinase » = ajoute sur une molécule un phosphate venant de l'ATP (ou du GTP).|„Kinase“ = hängt ein Phosphat aus ATP (oder GTP) an ein Molekül."],
  [/deaminase/, "'De-amin-ase' = removes an amino group as ammonia.|« Désaminase » = retire un groupe aminé sous forme d'ammoniac.|„Desaminase“ = spaltet eine Aminogruppe als Ammoniak ab."],
  [/thiolase|thiolysis/, "'Thiolase' = cuts a carbon chain using CoA (releases acetyl-CoA).|« Thiolase » = coupe une chaîne carbonée avec du CoA (libère de l'acétyl-CoA).|„Thiolase“ = spaltet eine Kohlenstoffkette mit CoA (setzt Acetyl-CoA frei)."],
  [/lipase/, "'Lipase' = cuts fats (ester bonds) with water.|« Lipase » = coupe les graisses (liaisons ester) avec de l'eau.|„Lipase“ = spaltet Fette (Esterbindungen) mit Wasser."],
  [/transferase|transacetylase|transacylase|transketolase|transaldolase|translocase/, "'Trans-…-ase' = carries a group from one molecule (or place) to another.|« Trans-…-ase » = transfère un groupe d'une molécule (ou d'un endroit) à une autre.|„Trans-…-ase“ = überträgt eine Gruppe von einem Molekül (oder Ort) auf ein anderes."],
  [/transcarbamo?ylase/, "'Trans-carbamoyl-ase' = hands a carbamoyl group (from carbamoyl phosphate) to another molecule.|« Transcarbamylase » = transfère un groupe carbamoyle (venant du carbamoyl-phosphate) à une autre molécule.|„Transcarbamylase“ = überträgt eine Carbamoylgruppe (aus Carbamoylphosphat) auf ein anderes Molekül."],
  [/ferrochelatase/, "'Ferro-chelat-ase' = clips iron (Fe²⁺) into the centre of the ring.|« Ferrochélatase » = insère le fer (Fe²⁺) au centre de l'anneau.|„Ferrochelatase“ = setzt Eisen (Fe²⁺) in die Mitte des Rings ein."],
  [/desaturase/, "'Desaturase' = makes a double bond in a carbon chain.|« Désaturase » = crée une double liaison dans une chaîne carbonée.|„Desaturase“ = bildet eine Doppelbindung in einer Kohlenstoffkette."],
  [/branching enzyme/, "The branching enzyme moves a short block of glucose units to start a side branch.|L'enzyme branchante déplace un petit bloc d'unités de glucose pour créer une ramification.|Das Verzweigungsenzym verschiebt einen kurzen Block Glucoseeinheiten und startet so einen Seitenast."],
  [/hydrolase|lactase|sidase|esterase|arginase|nucleotidase|lactonase|ceramidase|myelinase|sulfatase|neuraminidase|sialidase|hexosaminidase|dutpase|orotase/, "This enzyme cuts a bond with water (hydrolysis).|Cette enzyme coupe une liaison avec de l'eau (hydrolyse).|Dieses Enzym spaltet eine Bindung mit Wasser (Hydrolyse)."]
];
function nameClue(eid){ const en = String(TEN(E[eid]) || '').toLowerCase(); for (const r of NAMECLUE) if (r[0].test(en)) return T(r[1]); return ''; }

function stepPlain(p, i, opt){ opt = opt || {};
  const s = p.st[i]; const facts = sideFacts(s[3]);
  let h = `<p>${esc(fxu('turns', {e:enz(s[2]), a:mol(s[0]), b:mol(s[1])}))}`;
  if (facts.length) h += ' ' + esc(fxu('also', {x:facts.join('; ')}));
  h += `</p>`;
  if (s[5] && s[5].indexOf('i') >= 0) h += `<p class="nf irr">⇥ ${esc(fxu('irr'))}</p>`;
  if (s[5] && s[5].indexOf('r') >= 0) h += `<p class="nf rl">⏱ ${esc(fxu('rl'))}</p>`;
  const lc = stepLoc(p, s); if (lc && LOC[lc] && !opt.noLoc) h += `<p class="nf"><span class="lgloc ${locCls(lc)}">${esc(T(LOC[lc]))}</span></p>`;
  const nc = nameClue(s[2]); if (nc && !opt.noName) h += `<p class="nf name"><strong>${u('nName')}:</strong> ${esc(nc)}</p>`;
  return h;
}

/* ---------- energy strip: one cell per step ---------- */
function energyBadges(side){ if (!side) return ''; const en = TEN(side); const b = [];
  sideFacts(side); // keeps logic in one place for the sentences; badges use a light parser
  en.split(';').forEach(cl => { const ps = cl.split(/→|⇌/);
    for (let k = 0; k < ps.length - 1; k++){ const a = ps[k], c = ps[k + 1];
      if (/ATP/.test(a) && /A[DM]P/.test(c)) b.push(['en', '−ATP']); if (/ADP/.test(a) && /ATP/.test(c)) b.push(['en', '+ATP']);
      if (/GDP/.test(a) && /GTP/.test(c)) b.push(['en', '+GTP']); if (/GTP/.test(a) && /GDP/.test(c)) b.push(['en', '−GTP']);
      if (/NAD⁺/.test(a) && /NADH/.test(c)) b.push(['ec', '+NADH']); if (/NADH/.test(a) && /NAD⁺/.test(c) && !/NAD⁺/.test(a)) b.push(['ec', '−NADH']);
      if (/NADP⁺/.test(a) && /NADPH/.test(c)) b.push(['ec', '+NADPH']); if (/NADPH/.test(a) && /NADP⁺/.test(c)) b.push(['ec', '−NADPH']);
      if (/FAD(?!H)/.test(a) && /FADH₂/.test(c)) b.push(['ec', '+FADH₂']); } });
  if (/−\s*\d*\s*CO₂/.test(en)) b.push(['sm', 'CO₂↑']);
  return uniq(b.map(x => x.join(':'))).map(x => { const [c, t] = x.split(':'); return `<span class="tk tk-${c}">${t}</span>`; }).join('');
}
function energyStrip(p){
  const cells = p.st.map((s, i) => ({i, b:energyBadges(s[3])})).filter(c => c.b);
  if (!cells.length) return '';
  return `<div class="estrip">` + p.st.map((s, i) => { const b = energyBadges(s[3]);
    return `<div class="ecell${b ? ' on' : ''} ${locCls(stepLoc(p, s))}" title="${esc(enz(s[2]))}"><span class="enum">${i + 1}</span>${b || '<span class="edot">·</span>'}</div>`; }).join('') + `</div>`;
}

/* ---------- notes box ---------- */
function notesBox(parts){ const sec = (k, v) => v ? `<section class="nsec"><h4>${u(k)}</h4>${v}</section>` : '';
  const body = sec('nAsk', parts.ask) + sec('nYour', parts.your) + sec('nWhat', parts.what) + sec('nHow', parts.how) + (parts.extra || '');
  if (!body) return '';
  return `<details class="notes" open><summary><span class="nicon" aria-hidden="true">💡</span>${u('nTitle')}</summary><div class="nbody">${body}</div></details>`;
}
const P_ = x => `<p>${esc(T(x))}</p>`;
const LIST = xs => `<ul class="nlist">${xs.map(x => `<li>${esc(T(x))}</li>`).join('')}</ul>`;

/* ---------- static "how to work it out" tips ---------- */
const TIP = {
  d1cards:["Find the start: the card whose first molecule is not made by any other card.|Trouvez le départ : la carte dont la première molécule n'est fabriquée par aucune autre carte.|Finde den Anfang: die Karte, deren erstes Molekül von keiner anderen Karte gebildet wird.",
    "Then follow the molecule: the product on the right of one card is the starting molecule on the left of the next card.|Puis suivez la molécule : le produit à droite d'une carte est la molécule de départ à gauche de la carte suivante.|Dann folge dem Molekül: Das Produkt rechts auf einer Karte ist das Ausgangsmolekül links auf der nächsten.",
    "If a molecule is used by two cards, the pathway branches; finish one branch before starting the other.|Si une molécule est utilisée par deux cartes, la voie se ramifie : terminez une branche avant de commencer l'autre.|Wird ein Molekül von zwei Karten genutzt, verzweigt sich der Weg; beende einen Zweig, bevor du den anderen beginnst."],
  d1enz:["Enzyme names usually say what they work on and what they do: 'pyruvate kinase' = works on pyruvate's precursor, 'kinase' = moves a phosphate.|Le nom d'une enzyme dit souvent sur quoi elle agit et ce qu'elle fait : « pyruvate kinase » = agit vers le pyruvate, « kinase » = transfère un phosphate.|Enzymnamen sagen meist, woran sie arbeiten und was sie tun: „Pyruvatkinase“ = bildet Pyruvat, „Kinase“ = überträgt ein Phosphat.",
    "Say the molecule chain out loud, then attach each enzyme to the molecule in its name.|Récitez la chaîne des molécules, puis rattachez chaque enzyme à la molécule qui figure dans son nom.|Sag die Molekülkette laut auf und ordne dann jedes Enzym dem Molekül in seinem Namen zu.",
    "Typical rhythm in breakdown pathways: add phosphate (kinase) → rearrange (isomerase/mutase) → oxidize (dehydrogenase) → split or release.|Rythme typique d'une voie de dégradation : ajouter un phosphate (kinase) → réarranger (isomérase/mutase) → oxyder (déshydrogénase) → couper ou libérer.|Typischer Ablauf in Abbauwegen: Phosphat anhängen (Kinase) → umbauen (Isomerase/Mutase) → oxidieren (Dehydrogenase) → spalten oder freisetzen."],
  d1mol:["Compare names: each molecule differs from the one before by one small change – a phosphate added, a group moved, a carbon lost.|Comparez les noms : chaque molécule ne diffère de la précédente que par un petit changement – un phosphate ajouté, un groupe déplacé, un carbone perdu.|Vergleiche die Namen: Jedes Molekül unterscheidet sich vom vorigen nur durch eine kleine Änderung – ein Phosphat mehr, eine Gruppe verschoben, ein C weniger.",
    "Count carbons: if the pathway breaks something down, molecules get smaller or more oxidized as you go.|Comptez les carbones : dans une voie de dégradation, les molécules deviennent plus petites ou plus oxydées au fil des étapes.|Zähle die Kohlenstoffe: Baut der Weg etwas ab, werden die Moleküle von Schritt zu Schritt kleiner oder oxidierter."],
  d2m:"Look at the enzyme's name and what else happens: a kinase adds a phosphate, a dehydrogenase removes hydrogen, a decarboxylase removes CO₂. Apply that change to the current molecule.|Regardez le nom de l'enzyme et ce qui se passe à côté : une kinase ajoute un phosphate, une déshydrogénase retire de l'hydrogène, une décarboxylase retire du CO₂. Appliquez ce changement à la molécule actuelle.|Schau auf den Enzymnamen und was sonst passiert: Eine Kinase hängt Phosphat an, eine Dehydrogenase nimmt Wasserstoff weg, eine Decarboxylase spaltet CO₂ ab. Wende diese Änderung auf das aktuelle Molekül an.",
  d2e:"Most enzymes are named 'substrate (or product) + what it does'. Find the option that names the current molecule (or the next one) and the right kind of change.|La plupart des enzymes s'appellent « substrat (ou produit) + ce qu'elle fait ». Cherchez l'option qui nomme la molécule actuelle (ou la suivante) et le bon type de changement.|Die meisten Enzyme heißen „Substrat (oder Produkt) + was es tut“. Suche die Option, die das aktuelle (oder nächste) Molekül und die passende Art der Änderung nennt.",
  d2x:"Ask: does this step oxidize (→ NADH/FADH₂), spend or make ATP, add or remove water, or add or remove CO₂? Compare the two molecules to see what changed.|Demandez-vous : cette étape oxyde-t-elle (→ NADH/FADH₂), dépense-t-elle ou fabrique-t-elle de l'ATP, ajoute-t-elle ou retire-t-elle de l'eau ou du CO₂ ? Comparez les deux molécules pour voir ce qui change.|Frag dich: Wird oxidiert (→ NADH/FADH₂), ATP verbraucht oder gebildet, Wasser oder CO₂ angehängt oder abgespalten? Vergleiche die beiden Moleküle, um die Änderung zu sehen.",
  d3:["Think of each organ's 'job': the liver keeps blood glucose steady and processes everything; muscle burns fuel for movement and stores glycogen only for itself; the brain needs a constant supply of glucose (ketones in long fasting); adipose tissue stores and releases fat; the kidney filters and can make glucose; red cells have no mitochondria, so they only use glycolysis.|Pensez au « métier » de chaque organe : le foie stabilise la glycémie et transforme tout ; le muscle brûle du carburant pour bouger et garde son glycogène pour lui ; le cerveau a besoin de glucose en continu (cétones en jeûne prolongé) ; le tissu adipeux stocke et libère les graisses ; le rein filtre et peut fabriquer du glucose ; les globules rouges n'ont pas de mitochondries, donc seulement la glycolyse.|Denk an den „Job“ jedes Organs: Die Leber hält den Blutzucker konstant und verarbeitet alles; der Muskel verbrennt Brennstoff für Bewegung und speichert Glykogen nur für sich; das Gehirn braucht ständig Glucose (bei langem Fasten Ketone); Fettgewebe speichert und gibt Fett ab; die Niere filtert und kann Glucose bilden; Erythrozyten haben keine Mitochondrien und nutzen nur die Glykolyse.",
    "Check the equipment: no mitochondria → no fat burning or ketone use; no glucose-6-phosphatase → cannot release glucose into the blood.|Vérifiez l'équipement : pas de mitochondries → ni oxydation des graisses ni utilisation des cétones ; pas de glucose-6-phosphatase → impossible de libérer du glucose dans le sang.|Prüfe die Ausstattung: keine Mitochondrien → keine Fettverbrennung und keine Ketonnutzung; keine Glucose-6-Phosphatase → kann keine Glucose ins Blut abgeben."],
  d4:["Insulin = 'we just ate': store fuel (glycogen, fat, protein) and take up glucose.|Insuline = « on vient de manger » : stocker (glycogène, graisses, protéines) et capter le glucose.|Insulin = „wir haben gerade gegessen“: Brennstoff speichern (Glykogen, Fett, Protein) und Glucose aufnehmen.",
    "Glucagon = 'blood sugar is low': the liver releases glucose (glycogen breakdown, gluconeogenesis) and burns fat; it barely acts on muscle.|Glucagon = « la glycémie est basse » : le foie libère du glucose (glycogénolyse, néoglucogenèse) et brûle les graisses ; il n'agit presque pas sur le muscle.|Glucagon = „der Blutzucker ist niedrig“: Die Leber gibt Glucose ab (Glykogenabbau, Glukoneogenese) und verbrennt Fett; auf den Muskel wirkt es kaum.",
    "Adrenaline = 'emergency now': release fuel everywhere fast, including muscle glycogen. Cortisol = 'long stress': slowly supply glucose by breaking down protein for gluconeogenesis.|Adrénaline = « urgence immédiate » : libérer vite du carburant partout, y compris le glycogène musculaire. Cortisol = « stress durable » : fournir du glucose lentement en dégradant les protéines pour la néoglucogenèse.|Adrenalin = „Notfall jetzt“: überall schnell Brennstoff freisetzen, auch Muskelglykogen. Cortisol = „Dauerstress“: langsam Glucose liefern, indem Protein für die Glukoneogenese abgebaut wird."],
  d4phos:"Memory trick: phosphate is added by PKA when glucagon or adrenaline call for fuel. So 'release' enzymes are switched ON by phosphate and 'storage' enzymes are switched OFF by it.|Astuce : la PKA ajoute un phosphate quand le glucagon ou l'adrénaline réclament du carburant. Les enzymes de « libération » sont donc ALLUMÉES par le phosphate, celles du « stockage » ÉTEINTES.|Merkhilfe: PKA hängt Phosphat an, wenn Glucagon oder Adrenalin Brennstoff anfordern. „Freisetzungs“-Enzyme werden durch Phosphat EINgeschaltet, „Speicher“-Enzyme AUSgeschaltet.",
  d5c:"Ask three questions: Is insulin high or low? How long since the last meal? Is the person resting or exercising, and how hard? Then match the fuel being used.|Posez-vous trois questions : l'insuline est-elle haute ou basse ? Depuis combien de temps n'a-t-on pas mangé ? La personne est-elle au repos ou en effort, et à quelle intensité ? Puis associez le carburant utilisé.|Stell dir drei Fragen: Ist Insulin hoch oder niedrig? Wie lange ist die letzte Mahlzeit her? Ruht die Person oder bewegt sie sich, und wie stark? Dann ordne den genutzten Brennstoff zu.",
  ord:"Think cause → effect: each event is triggered by the one before it. Start with what changes first (the trigger), end with the final result or correction.|Pensez cause → effet : chaque événement est déclenché par le précédent. Commencez par ce qui change en premier (le déclencheur), terminez par le résultat ou la correction finale.|Denk in Ursache → Wirkung: Jedes Ereignis wird vom vorherigen ausgelöst. Beginne mit dem, was sich zuerst ändert (dem Auslöser), und ende mit dem Endergebnis oder der Korrektur.",
  d6:{react:"Read the two molecules and spot the change (phosphate added? hydrogen removed? CO₂ lost?). The enzyme is usually named after the molecule plus that change.|Lisez les deux molécules et repérez le changement (phosphate ajouté ? hydrogène retiré ? CO₂ perdu ?). L'enzyme porte en général le nom de la molécule plus ce changement.|Lies die beiden Moleküle und finde die Änderung (Phosphat angehängt? Wasserstoff entfernt? CO₂ abgespalten?). Das Enzym heißt meist wie das Molekül plus diese Änderung.",
    enz:"Split the enzyme name: the first part names the molecule it works on, the ending (-kinase, -dehydrogenase, -isomerase…) names the change. Look for the reaction that matches both.|Découpez le nom de l'enzyme : la première partie nomme la molécule, la fin (-kinase, -déshydrogénase, -isomérase…) nomme le changement. Cherchez la réaction qui correspond aux deux.|Zerlege den Enzymnamen: Der erste Teil nennt das Molekül, die Endung (-kinase, -dehydrogenase, -isomerase…) die Änderung. Suche die Reaktion, die zu beidem passt.",
    reg:"Ask what the molecule 'means' for the cell. Signs of plenty (ATP, citrate, NADH, the pathway's own product) slow a breakdown pathway down. Signs of need (AMP, ADP, the pathway's starting material) speed it up.|Demandez-vous ce que la molécule « signifie » pour la cellule. Les signes d'abondance (ATP, citrate, NADH, le produit de la voie) freinent une voie de dégradation. Les signes de besoin (AMP, ADP, le substrat de départ) l'accélèrent.|Frag, was das Molekül für die Zelle „bedeutet“. Zeichen von Überfluss (ATP, Citrat, NADH, das eigene Produkt) bremsen einen Abbauweg. Zeichen von Bedarf (AMP, ADP, das Ausgangsmaterial) beschleunigen ihn.",
    cof:"Match the cofactor to the kind of chemistry: dehydrogenases → NAD⁺ or FAD; carboxylases → biotin; decarboxylation of α-keto acids → TPP; moving amino groups → PLP; one-carbon transfers → folate or B12.|Associez le cofacteur au type de chimie : déshydrogénases → NAD⁺ ou FAD ; carboxylases → biotine ; décarboxylation des α-cétoacides → TPP ; transfert de groupes aminés → PLP ; transferts d'un carbone → folate ou B12.|Ordne den Cofaktor der Chemie zu: Dehydrogenasen → NAD⁺ oder FAD; Carboxylasen → Biotin; Decarboxylierung von α-Ketosäuren → TPP; Aminogruppen übertragen → PLP; Ein-Kohlenstoff-Übertragungen → Folat oder B12.",
    clin:"If the enzyme is missing, its substrate piles up (and spills into side routes) and its product runs short. The symptoms come from that build-up and that shortage.|Si l'enzyme manque, son substrat s'accumule (et part vers des voies annexes) et son produit vient à manquer. Les symptômes viennent de cette accumulation et de ce manque.|Fehlt das Enzym, staut sich sein Substrat (und weicht auf Nebenwege aus) und sein Produkt wird knapp. Die Symptome kommen von diesem Stau und diesem Mangel.",
    rl:"The rate-limiting enzyme is usually the first committed, one-way step – the point of no return – and the one hormones regulate.|L'enzyme limitante est en général la première étape engagée et à sens unique – le point de non-retour – et celle que les hormones régulent.|Das Schrittmacherenzym ist meist der erste festgelegte Einbahnschritt – der Punkt ohne Rückkehr – und der Ort, an dem Hormone regulieren.",
    loc:"Fuel breakdown that needs oxygen (Krebs cycle, β-oxidation, PDH) happens in the mitochondrial matrix. Glycolysis and most building of fats and sugars happen in the cytosol. Pathways that switch sides need transporters (shuttles).|La dégradation qui utilise l'oxygène (cycle de Krebs, β-oxydation, PDH) a lieu dans la matrice mitochondriale. La glycolyse et la plupart des synthèses de graisses et de sucres ont lieu dans le cytosol. Les voies qui changent de compartiment ont besoin de transporteurs (navettes).|Abbau mit Sauerstoff (Citratzyklus, β-Oxidation, PDH) findet in der Mitochondrienmatrix statt. Glykolyse und die meisten Aufbauwege für Fette und Zucker laufen im Zytosol. Wege, die das Kompartiment wechseln, brauchen Transporter (Shuttles)."},
  d7:"Look at the neighbours of each gap: the molecule before it, the enzyme name and what else happens in that step. Together they tell you what the missing piece must be.|Regardez les voisins de chaque trou : la molécule d'avant, le nom de l'enzyme et ce qui se passe d'autre à cette étape. Ensemble, ils indiquent la pièce manquante.|Schau dir die Nachbarn jeder Lücke an: das Molekül davor, den Enzymnamen und was sonst in diesem Schritt passiert. Zusammen verraten sie das fehlende Teil.",
  d8:["Underline the key findings (age, timing, what makes it worse, lab values). Ask which pathway is blocked or overwhelmed.|Soulignez les éléments clés (âge, moment, facteurs aggravants, analyses). Demandez-vous quelle voie est bloquée ou débordée.|Unterstreiche die Schlüsselbefunde (Alter, Zeitpunkt, was verschlimmert, Laborwerte). Frag dich, welcher Weg blockiert oder überlastet ist.",
    "A block means what comes before it piles up and what comes after it runs short. Match each symptom to one of the two.|Un blocage signifie que ce qui précède s'accumule et que ce qui suit manque. Rattachez chaque symptôme à l'un des deux.|Eine Blockade heißt: Was davor kommt, staut sich, und was danach kommt, fehlt. Ordne jedes Symptom einem von beiden zu."],
  d9:"Count in three parts: (1) ATP made directly, (2) electron carriers × their value (NADH ≈ 2.5, FADH₂ ≈ 1.5), (3) minus the ATP spent to start (activation, transport). Write each part down before adding.|Comptez en trois parties : (1) l'ATP fabriqué directement, (2) les transporteurs d'électrons × leur valeur (NADH ≈ 2,5, FADH₂ ≈ 1,5), (3) moins l'ATP dépensé au départ (activation, transport). Notez chaque partie avant d'additionner.|Zähle in drei Teilen: (1) direkt gebildetes ATP, (2) Elektronenträger × ihr Wert (NADH ≈ 2,5, FADH₂ ≈ 1,5), (3) minus das ATP, das zum Start verbraucht wird (Aktivierung, Transport). Schreib jeden Teil auf, bevor du addierst.",
  bx:{mcq:"Rule out the options that cannot be true first, then compare the last two against the key word in the question.|Éliminez d'abord les options impossibles, puis comparez les deux dernières au mot-clé de la question.|Streiche zuerst die unmöglichen Optionen und vergleiche dann die letzten beiden mit dem Schlüsselwort der Frage.",
    num:"Write the formula first, put each number in with its unit, and check that the units cancel to the unit asked for. Then ask: is the size of the answer sensible?|Écrivez d'abord la formule, placez chaque nombre avec son unité et vérifiez que les unités se simplifient pour donner celle demandée. Puis demandez-vous si l'ordre de grandeur est plausible.|Schreib zuerst die Formel, setz jede Zahl mit Einheit ein und prüfe, ob sich die Einheiten zur gesuchten Einheit kürzen. Frag dich dann: Ist die Größenordnung plausibel?",
    sort:"For each item, ask one yes/no question that separates the groups (e.g. 'Does it carry a charge?'). Do the easy ones first.|Pour chaque élément, posez une question oui/non qui sépare les groupes (par ex. « porte-t-il une charge ? »). Faites d'abord les plus faciles.|Stell für jedes Element eine Ja/Nein-Frage, die die Gruppen trennt (z. B. „Ist es geladen?“). Mach die leichten zuerst.",
    build:"Build it like a sentence: the core first, then what attaches to it, then the bonds that hold the parts together.|Construisez comme une phrase : d'abord le noyau, puis ce qui s'y attache, puis les liaisons qui tiennent les parties.|Bau es wie einen Satz: zuerst der Kern, dann was daran hängt, dann die Bindungen, die die Teile verbinden.",
    pred:"Change one thing at a time: what does the first variable do directly? Then ask how the body responds (reflexes and compensation) and follow the arrows.|Changez une chose à la fois : quel est l'effet direct sur la première variable ? Puis demandez-vous comment le corps réagit (réflexes, compensation) et suivez les flèches.|Ändere eine Sache nach der anderen: Was bewirkt die erste Größe direkt? Frag dann, wie der Körper reagiert (Reflexe, Kompensation), und folge den Pfeilen.",
    ord:"Think cause → effect: each event is triggered by the one before it. Start with the trigger, end with the final result or correction.|Pensez cause → effet : chaque événement est déclenché par le précédent. Commencez par le déclencheur, terminez par le résultat ou la correction finale.|Denk in Ursache → Wirkung: Jedes Ereignis wird vom vorherigen ausgelöst. Beginne mit dem Auslöser, ende mit dem Endergebnis oder der Korrektur.",
    cmp:"Fill one row at a time across all columns: comparing side by side makes the differences stand out.|Remplissez une ligne à la fois pour toutes les colonnes : la comparaison côte à côte fait ressortir les différences.|Fülle eine Zeile nach der anderen über alle Spalten aus: Im direkten Vergleich fallen die Unterschiede auf.",
    mol:"Scan the drawing in this order: count the carbons, find the charged ends (–COO⁻, –NH₃⁺, phosphates), then look for the one feature that tells it apart (C=O position, an extra OH, a ring, a double bond).|Parcourez le dessin dans cet ordre : comptez les carbones, repérez les extrémités chargées (–COO⁻, –NH₃⁺, phosphates), puis cherchez le détail qui la distingue (position du C=O, OH en plus, cycle, double liaison).|Lies die Zeichnung in dieser Reihenfolge: Kohlenstoffe zählen, geladene Enden finden (–COO⁻, –NH₃⁺, Phosphate), dann das eine Unterscheidungsmerkmal suchen (Lage des C=O, zusätzliche OH, Ring, Doppelbindung).",
    grp:"Look at the atoms directly bonded to the highlighted part: what is attached to the C=O (O, S, N, or C?) and is there a phosphorus? That decides the name.|Regardez les atomes directement liés à la partie surlignée : qu'est-ce qui est attaché au C=O (O, S, N ou C ?) et y a-t-il un phosphore ? C'est ce qui détermine le nom.|Schau auf die Atome direkt an der markierten Stelle: Was hängt am C=O (O, S, N oder C?) und ist ein Phosphor dabei? Das bestimmt den Namen.",
    rxn:"Compare left and right atom by atom: count the carbons (CO₂ lost?), the hydrogens and C=O / C–OH (oxidized or reduced?), phosphates and water. One or two differences give the reaction type.|Comparez gauche et droite atome par atome : comptez les carbones (CO₂ perdu ?), les hydrogènes et les C=O / C–OH (oxydé ou réduit ?), les phosphates et l'eau. Une ou deux différences donnent le type de réaction.|Vergleiche links und rechts Atom für Atom: Kohlenstoffe zählen (CO₂ verloren?), Wasserstoffe und C=O / C–OH (oxidiert oder reduziert?), Phosphate und Wasser. Ein oder zwei Unterschiede ergeben den Reaktionstyp.",
    graph:"Read the axes first, then find the reference curve. Ask: did the curve move left/right (sensitivity), up/down (maximum), or change shape?|Lisez d'abord les axes, puis repérez la courbe de référence. Demandez-vous : la courbe s'est-elle déplacée à gauche/droite (sensibilité), en haut/en bas (maximum), ou a-t-elle changé de forme ?|Lies zuerst die Achsen und finde die Referenzkurve. Frag dich: Hat sich die Kurve nach links/rechts (Empfindlichkeit), oben/unten (Maximum) verschoben oder ihre Form geändert?"}
};
const ASK = {
  d1:"Rebuild {p}: put its {n} steps in order, from {a} to {b}.|Reconstruire {p} : remettre ses {n} étapes dans l'ordre, de {a} à {b}.|{p} rekonstruieren: die {n} Schritte in die richtige Reihenfolge bringen, von {a} bis {b}.",
  d1cyc:"Rebuild {p}: put its {n} steps in order around the cycle, starting from {a}.|Reconstruire {p} : remettre ses {n} étapes dans l'ordre autour du cycle, en partant de {a}.|{p} rekonstruieren: die {n} Schritte rund um den Zyklus ordnen, beginnend mit {a}.",
  d2m:"Predict the molecule made in this step of {p}.|Prédire la molécule formée à cette étape de {p}.|Das Molekül vorhersagen, das in diesem Schritt von {p} entsteht.",
  d2e:"Name the enzyme that does this step of {p}.|Nommer l'enzyme qui réalise cette étape de {p}.|Das Enzym nennen, das diesen Schritt von {p} katalysiert.",
  d2x:"Say what else happens in this step of {p} besides the molecule changing.|Dire ce qui se passe d'autre à cette étape de {p}, en plus du changement de molécule.|Sagen, was in diesem Schritt von {p} außer der Moleküländerung noch passiert.",
  d3:"Pick every organ that does this job – there can be more than one.|Choisir tous les organes qui font ce travail – il peut y en avoir plusieurs.|Alle Organe wählen, die diese Aufgabe erfüllen – es können mehrere sein.",
  d4m:"For {h}, say whether each process speeds up, slows down or stays the same.|Pour {h}, dire si chaque processus accélère, ralentit ou ne change pas.|Für {h} sagen, ob jeder Prozess schneller, langsamer oder gleich bleibt.",
  d4q:"Explain how a hormone works at the level of receptors, messengers or enzymes.|Expliquer comment une hormone agit au niveau des récepteurs, des messagers ou des enzymes.|Erklären, wie ein Hormon auf der Ebene von Rezeptoren, Botenstoffen oder Enzymen wirkt.",
  d4p:"Decide whether {e} works when a phosphate is attached or removed.|Décider si {e} fonctionne quand un phosphate est fixé ou retiré.|Entscheiden, ob {e} mit oder ohne angehängtes Phosphat arbeitet.",
  d5c:"Recognize the body's fuel situation from one clue.|Reconnaître la situation énergétique du corps à partir d'un indice.|Die Brennstofflage des Körpers an einem Hinweis erkennen.",
  d5o:"Put the events in the order they happen in the body.|Remettre les événements dans l'ordre où ils se produisent dans le corps.|Die Ereignisse in die Reihenfolge bringen, in der sie im Körper ablaufen.",
  d6:{react:"Name the enzyme for this reaction.|Nommer l'enzyme de cette réaction.|Das Enzym zu dieser Reaktion nennen.", enz:"Find the reaction this enzyme carries out.|Trouver la réaction réalisée par cette enzyme.|Die Reaktion finden, die dieses Enzym durchführt.",
    reg:"Decide whether this molecule switches the enzyme on or off.|Décider si cette molécule allume ou éteint l'enzyme.|Entscheiden, ob dieses Molekül das Enzym an- oder abschaltet.", cof:"Name the helper molecule (cofactor) the enzyme needs.|Nommer la molécule auxiliaire (cofacteur) dont l'enzyme a besoin.|Das Hilfsmolekül (den Cofaktor) nennen, das das Enzym braucht.",
    clin:"Link the enzyme to the disease or drug that affects it.|Relier l'enzyme à la maladie ou au médicament qui l'affecte.|Das Enzym mit der Krankheit oder dem Arzneistoff verbinden, die es betreffen.", rl:"Find the step that sets the speed of the whole pathway.|Trouver l'étape qui fixe la vitesse de toute la voie.|Den Schritt finden, der das Tempo des ganzen Wegs bestimmt.",
    loc:"Say in which part of the cell this reaction happens.|Dire dans quelle partie de la cellule se déroule cette réaction.|Sagen, in welchem Teil der Zelle diese Reaktion abläuft."},
  d7:"Fill the gaps in the map of {p} with the missing molecules or enzymes.|Compléter les trous de la carte de {p} avec les molécules ou enzymes manquantes.|Die Lücken in der Karte von {p} mit den fehlenden Molekülen oder Enzymen füllen.",
  d8c:"Use the story and findings to work out what is going on in the body.|Utiliser l'histoire et les résultats pour comprendre ce qui se passe dans le corps.|Aus Geschichte und Befunden ableiten, was im Körper los ist.",
  d8m:"Match the disease with its signs or with the faulty enzyme.|Associer la maladie à ses signes ou à l'enzyme défectueuse.|Die Krankheit ihren Zeichen oder dem defekten Enzym zuordnen.",
  d9:"Add up the ATP gained and spent along the route.|Additionner l'ATP gagné et dépensé tout au long du trajet.|Das auf dem Weg gewonnene und verbrauchte ATP zusammenzählen."
};
const STATEPLAIN = {
  fed:"Fed: you have just eaten. Insulin is high, so the body stores fuel: glycogen in liver and muscle, fat in adipose tissue, and cells burn glucose.|Nourri : vous venez de manger. L'insuline est haute, le corps stocke : glycogène dans le foie et le muscle, graisses dans le tissu adipeux, et les cellules brûlent du glucose.|Resorptionsphase: Du hast gerade gegessen. Insulin ist hoch, der Körper speichert: Glykogen in Leber und Muskel, Fett im Fettgewebe, und die Zellen verbrennen Glucose.",
  post:"Post-absorptive: overnight, no recent meal. Glucagon starts to rise; the liver keeps blood glucose up mainly by breaking down glycogen, and fat begins to be released.|Post-absorptif : la nuit, pas de repas récent. Le glucagon commence à monter ; le foie maintient la glycémie surtout en dégradant son glycogène, et les graisses commencent à être libérées.|Postabsorptiv: über Nacht, keine Mahlzeit. Glucagon steigt; die Leber hält den Blutzucker vor allem durch Glykogenabbau, und Fett wird zunehmend freigesetzt.",
  fast:"Prolonged fast (1–3 days): liver glycogen is used up. The liver makes new glucose (gluconeogenesis) from amino acids, lactate and glycerol, and starts making ketone bodies from fat.|Jeûne prolongé (1–3 jours) : le glycogène du foie est épuisé. Le foie fabrique du glucose neuf (néoglucogenèse) à partir d'acides aminés, de lactate et de glycérol, et commence à produire des corps cétoniques à partir des graisses.|Längeres Fasten (1–3 Tage): Das Leberglykogen ist aufgebraucht. Die Leber bildet neue Glucose (Glukoneogenese) aus Aminosäuren, Laktat und Glycerin und beginnt, aus Fett Ketonkörper zu machen.",
  starv:"Starvation (more than a week): to save muscle protein, the brain switches to ketone bodies for most of its energy, and fat becomes the main fuel.|Inanition (plus d'une semaine) : pour épargner les protéines musculaires, le cerveau passe aux corps cétoniques pour l'essentiel de son énergie, et les graisses deviennent le carburant principal.|Hungerzustand (über eine Woche): Um Muskelprotein zu sparen, deckt das Gehirn den Großteil seiner Energie mit Ketonkörpern, und Fett wird zum Hauptbrennstoff.",
  sprint:"Sprint: maximal effort for seconds to minutes. There is no time for oxygen-based burning, so muscle uses phosphocreatine and anaerobic glycolysis (→ lactate).|Sprint : effort maximal de quelques secondes à minutes. Pas le temps d'utiliser l'oxygène : le muscle utilise la phosphocréatine et la glycolyse anaérobie (→ lactate).|Sprint: Maximalbelastung über Sekunden bis Minuten. Keine Zeit für Verbrennung mit Sauerstoff, also nutzt der Muskel Kreatinphosphat und anaerobe Glykolyse (→ Laktat).",
  endur:"Endurance: long, moderate effort. Oxygen is available, so muscle burns glucose and more and more fat in its mitochondria; adrenaline and glucagon release fuel.|Endurance : effort long et modéré. L'oxygène est disponible : le muscle brûle du glucose puis de plus en plus de graisses dans ses mitochondries ; l'adrénaline et le glucagon libèrent du carburant.|Ausdauer: lange, mäßige Belastung. Sauerstoff ist da, also verbrennt der Muskel Glucose und zunehmend Fett in seinen Mitochondrien; Adrenalin und Glucagon setzen Brennstoff frei."
};
const MISTX = {
  first:"{x} is the very first step: {a} is where the pathway starts – no other card makes it.|{x} est la toute première étape : {a} est le point de départ – aucune autre carte ne le fabrique.|{x} ist der allererste Schritt: Mit {a} beginnt der Weg – keine andere Karte bildet es.",
  firstCyc:"{x} comes first: by convention the cycle is read starting from {a}.|{x} vient en premier : par convention, on lit le cycle à partir de {a}.|{x} kommt zuerst: Üblicherweise liest man den Zyklus ab {a}.",
  after:"{x} belongs in position {k}: it starts from {a}, which is made just before by {e}.|{x} va en position {k} : elle part de {a}, fabriqué juste avant par {e}.|{x} gehört an Position {k}: Dieser Schritt beginnt mit {a}, das direkt davor von {e} gebildet wird.",
  branch:"{x} belongs in position {k}: it starts a new branch from {a}.|{x} va en position {k} : elle commence une nouvelle branche à partir de {a}.|{x} gehört an Position {k}: Dieser Schritt beginnt einen neuen Zweig mit {a}.",
  molAfter:"{x} belongs in position {k}: {e} makes it from {a}.|{x} va en position {k} : {e} le fabrique à partir de {a}.|{x} gehört an Position {k}: {e} bildet es aus {a}.",
  gapStart:"Gap “{x}”: this is where the pathway starts – nothing on the map makes it.|Trou « {x} » : c'est le point de départ de la voie – rien sur la carte ne le fabrique.|Lücke „{x}“: Hier beginnt der Weg – nichts auf der Karte bildet es.",
  allRight:"Every card is in the right place.|Toutes les cartes sont à la bonne place.|Alle Karten liegen richtig.",
  gapM:"Gap “{x}”: {e} turns {a} into {b}.|Trou « {x} » : {e} transforme {a} en {b}.|Lücke „{x}“: {e} macht aus {a} {b}.",
  gapE:"Gap “{x}”: this enzyme turns {a} into {b}.|Trou « {x} » : cette enzyme transforme {a} en {b}.|Lücke „{x}“: Dieses Enzym macht aus {a} {b}.",
  orgYes:"✓ {o}|✓ {o}|✓ {o}"
};
function mx(k, v){ let s = T(MISTX[k]); for (const key in v) s = s.split('{' + key + '}').join(v[key]); return s; }
function ask(k, v){ let s = T(k); if (v) for (const key in v) s = s.split('{' + key + '}').join(v[key]); return s; }
const ORGPLAIN = {
  liver:"Liver: the body's chemical factory – stores and releases glucose, makes ketones, urea and new glucose.|Foie : l'usine chimique du corps – stocke et libère le glucose, fabrique cétones, urée et glucose neuf.|Leber: die chemische Fabrik des Körpers – speichert und gibt Glucose ab, bildet Ketone, Harnstoff und neue Glucose.",
  muscle:"Muscle: burns fuel to move; keeps its glycogen for itself; sends alanine and glutamine out in fasting.|Muscle : brûle du carburant pour bouger ; garde son glycogène pour lui ; envoie alanine et glutamine pendant le jeûne.|Muskel: verbrennt Brennstoff für Bewegung; behält sein Glykogen für sich; gibt beim Fasten Alanin und Glutamin ab.",
  brain:"Brain: needs a steady glucose supply; cannot burn fatty acids; uses ketones in long fasting.|Cerveau : a besoin de glucose en continu ; ne brûle pas les acides gras ; utilise les cétones en jeûne prolongé.|Gehirn: braucht ständig Glucose; kann keine Fettsäuren verbrennen; nutzt bei langem Fasten Ketone.",
  kidney:"Kidney: filters blood, makes glucose in long fasting and makes NH₄⁺ from glutamine to get rid of acid.|Rein : filtre le sang, fabrique du glucose en jeûne prolongé et produit du NH₄⁺ à partir de la glutamine pour éliminer l'acide.|Niere: filtert Blut, bildet bei langem Fasten Glucose und macht aus Glutamin NH₄⁺, um Säure loszuwerden.",
  adipose:"Adipose tissue: the fat store – takes fat in after meals (insulin), releases fatty acids and glycerol in fasting.|Tissu adipeux : la réserve de graisses – stocke après les repas (insuline), libère acides gras et glycérol pendant le jeûne.|Fettgewebe: der Fettspeicher – nimmt nach dem Essen Fett auf (Insulin), gibt beim Fasten Fettsäuren und Glycerin ab.",
  rbc:"Red blood cell: no mitochondria and no nucleus – lives only on glycolysis and always sends out lactate.|Globule rouge : ni mitochondries ni noyau – vit uniquement de la glycolyse et libère toujours du lactate.|Erythrozyt: keine Mitochondrien, kein Kern – lebt nur von der Glykolyse und gibt immer Laktat ab."
};

/* ---------- per-drill notes ---------- */
function pathEnds(p){ return {a:mol(p.st[0][0]), b:mol(p.st[p.st.length - 1][1])}; }
function stepIndexFor(p, d){ if (d.t === 'step') return d.i; if (d.t === 'enz') return p.st.findIndex(s => s[2] === d.id); if (d.t === 'mol') return p.st.findIndex(s => s[1] === d.id); return -1; }
function storyHTML(p, opt){ opt = opt || {};
  return `<details class="nstory"${opt.open ? ' open' : ''}><summary>${u('nStory')}</summary><ol class="nsteps">` + p.st.map((s, i) =>
    `<li class="${locCls(stepLoc(p, s))}${opt.mark && opt.mark.indexOf(i) >= 0 ? ' hl' : ''}">${rxnBlock(p, i)}${stepPlain(p, i, {noLoc:true})}</li>`).join('') + `</ol></details>`; }
function notesD1(){
  const s = S.d1; if (!s || !s.o.checked) return ''; const p = PW[s.pid], o = s.o, e = pathEnds(p), off = o.fixed ? 1 : 0;
  const askH = `<p>${esc(ask(p.cyc ? ASK.d1cyc : ASK.d1, {p:T(p.n), n:p.st.length, a:e.a, b:e.b}))}</p>`;
  let your = '', marks = [];
  const wrong = o.seq.map((uid, k) => ({uid, k})).filter(x => !o.res[x.k]);
  if (!wrong.length) your = `<p class="nok">✓ ${esc(mx('allRight', {}))}</p>`;
  else { your = `<ul class="nlist">`; wrong.slice(0, 6).forEach(w => { const it = o.items.find(i => i.uid === w.uid), d = it.d, si = stepIndexFor(p, d);
      if (si < 0) return; marks.push(si); const pos = o.correct.indexOf(it.ans) + 1 + off; const st = p.st[si];
      const x = d.t === 'step' ? `${mol(st[0])} → ${mol(st[1])}` : d.t === 'enz' ? enz(d.id) : mol(d.id);
      let line;
      if (d.t === 'mol') line = mx('molAfter', {x, k:pos, e:enz(st[2]), a:mol(st[0])});
      else if (si === 0) line = mx(p.cyc ? 'firstCyc' : 'first', {x, a:mol(st[0])});
      else if (st[0] === p.st[si - 1][1]) line = mx('after', {x, k:pos, a:mol(st[0]), e:enz(p.st[si - 1][2])});
      else line = mx('branch', {x, k:pos, a:mol(st[0])});
      your += `<li>${esc(line)}</li>`; });
    your += `</ul>`; }
  const effMode = o.items[0] && o.items[0].d.t === 'enz' ? 'enz' : o.items[0] && o.items[0].d.t === 'mol' ? 'mol' : 'cards';
  const tips = TIP['d1' + effMode];
  const what = `<p>${esc(T(p.s))}</p>` + (energyStrip(p) ? `<h5>${u('nEnergy')}</h5>${energyStrip(p)}` : '') + storyHTML(p, {mark:marks, open:marks.length > 0 && marks.length <= 3});
  return notesBox({ask:askH, your, what, how:LIST(tips)});
}
function notesD2(){ const s = S.d2; if (!s || !s.q || s.q.chosen == null) return ''; const p = PW[s.pid], q = s.q;
  const k = q.t === 'm' ? 'd2m' : q.t === 'e' ? 'd2e' : 'd2x';
  return notesBox({ask:`<p>${esc(ask(ASK[k], {p:T(p.n)}))}</p>`, what:`<div class="nblk">${rxnBlock(p, s.i)}</div>` + stepPlain(p, s.i), how:P_(TIP[k])}); }
function notesD3(){ const s = S.d3; if (!s || !s.checked) return ''; const q = ORGQ[s.order[s.k]];
  return notesBox({ask:`<p>${esc(ask(ASK.d3))}</p>`, what:LIST(q.a.map(o => ORGPLAIN[o]).filter(Boolean)), how:LIST(TIP.d3)}); }
function notesD4(){ const s = S.d4; if (!s) return '';
  if (s.tab === 'matrix' && s.checked) return notesBox({ask:`<p>${esc(ask(ASK.d4m, {h:T(HORM[s.h])}))}</p>`, how:LIST(TIP.d4)});
  if (s.tab === 'mcq' && s.mcq && s.mcq.chosen != null) return notesBox({ask:`<p>${esc(ask(ASK.d4q))}</p>`, how:LIST(TIP.d4)});
  if (s.tab === 'phos' && s.phos && s.phos.chosen) return notesBox({ask:`<p>${esc(ask(ASK.d4p, {e:enz(s.phos.e)}))}</p>`, how:P_(TIP.d4phos)});
  return ''; }
function notesD5(){ const s = S.d5; if (!s) return '';
  if (s.tab === 'classify' && s.cq && s.cq.chosen){ const q = SWQ[s.cq.order[s.cq.k]];
    return notesBox({ask:`<p>${esc(ask(ASK.d5c))}</p>`, what:P_(STATEPLAIN[q.a]) + (s.cq.chosen !== q.a ? `<p class="note">${esc(T(STATEPLAIN[s.cq.chosen]))}</p>` : ''), how:P_(TIP.d5c)}); }
  if (s.tab === 'order' && s.ord && s.ord.o.checked) return notesBox({ask:`<p>${esc(ask(ASK.d5o))}</p>`, how:P_(TIP.ord)});
  return ''; }
function notesD6(){ const s = S.d6; if (!s || s.chosen == null) return ''; const q = s.q; let what = '';
  if ((q.t === 'react' || q.t === 'loc') && PW[q.p]) what = stepPlain(PW[q.p], q.i);
  else if (q.t === 'enz'){ const st = allSteps('all').find(x => x.s[2] === q.e); if (st) what = stepPlain(st.p, st.i); }
  else if (q.t === 'rl'){ const p = PW[q.p], i = p.st.findIndex(x => x[2] === q.correct); if (i >= 0) what = stepPlain(p, i); }
  else if (q.e){ const nc = nameClue(q.e); if (nc) what = `<p class="nf name"><strong>${u('nName')}:</strong> ${esc(nc)}</p>`; }
  return notesBox({ask:`<p>${esc(T(ASK.d6[q.t]))}</p>`, what, how:P_(TIP.d6[q.t])}); }
function notesD7(){ const s = S.d7; if (!s || !s.checked) return ''; const p = PW[s.pid];
  const lines = []; const marks = [];
  Object.keys(s.B).forEach(key => { const b = s.B[key]; if (b.state === 'ok') return; const i = +key.slice(1), st = p.st[i]; if (!st) return;
    if (b.kind === 'e'){ marks.push(i); lines.push(mx('gapE', {x:enz(b.ans), a:mol(st[0]), b:mol(st[1])})); }
    else if (key[0] === 'p'){ marks.push(i); lines.push(mx('gapM', {x:mol(b.ans), e:enz(st[2]), a:mol(st[0]), b:mol(st[1])})); }
    else { const prev = p.st.findIndex(x => x[1] === st[0]); if (prev >= 0){ marks.push(prev); lines.push(mx('gapM', {x:mol(b.ans), e:enz(p.st[prev][2]), a:mol(p.st[prev][0]), b:mol(st[0])})); } else lines.push(mx('gapStart', {x:mol(b.ans)})); } });
  const your = lines.length ? `<ul class="nlist">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : `<p class="nok">✓ ${esc(mx('allRight', {}))}</p>`;
  return notesBox({ask:`<p>${esc(ask(ASK.d7, {p:T(p.n)}))}</p>`, your, what:storyHTML(p, {mark:marks}), how:P_(TIP.d7)}); }
function notesD8(){ const s = S.d8; if (!s) return '';
  if (s.tab === 'match'){ if (!s.m || s.m.chosen == null) return ''; return notesBox({ask:`<p>${esc(ask(ASK.d8m))}</p>`, how:LIST(TIP.d8)}); }
  if (s.chosen == null) return ''; return notesBox({ask:`<p>${esc(ask(ASK.d8c))}</p>`, how:LIST(TIP.d8)}); }
function notesD9(){ const s = S.d9; if (!s || !s.checked) return ''; return notesBox({ask:`<p>${esc(ask(ASK.d9))}</p>`, how:P_(TIP.d9)}); }
function notesBX(id){ const s = S[id]; if (!s || !s.it || s.mode === 'atlas') return ''; const it = s.it;
  const done = it.k === 'mcq' ? s.chosen != null : it.k === 'ord' ? s.o && s.o.checked : s.done; if (!done) return '';
  const k = id === 'molecules' ? (it.grp ? 'grp' : it.rx ? 'rxn' : 'mol') : it.fig ? 'graph' : it.k; return notesBox({how:P_(TIP.bx[k] || TIP.bx.mcq)}); }
const NOTES = {pathways:notesD1, next:notesD2, organs:notesD3, hormones:notesD4, switching:notesD5, enzymes:notesD6, missing:notesD7, cases:notesD8, energy:notesD9};

/* insert the notes right after the feedback (before the Next/Again buttons that follow it) */
function placeNotes(h, n){
  if (!n) return h;
  const fb = h.lastIndexOf('<div class="fb');
  if (fb >= 0){ const a = h.indexOf('<div class="actions">', fb); if (a >= 0) return h.slice(0, a) + n + h.slice(a); }
  const mc = h.lastIndexOf('<div class="actions">'); if (fb < 0 && mc >= 0 && h.indexOf('fb inline') > 0) return h.slice(0, mc) + n + h.slice(mc);
  return h + n;
}
Object.keys(RENDER).forEach(id => { const orig = RENDER[id];
  RENDER[id] = function(){ let h = orig(); let n = '';
    try { n = NOTES[id] ? NOTES[id]() : (BX[id] ? notesBX(id) : ''); } catch(e){ n = ''; if (typeof console !== 'undefined') console.warn('notes', id, e); }
    if (id === 'pathways' && S.d1 && S.d1.o.checked){ const k = h.lastIndexOf('<div class="card mapcard">'); return k > 0 ? h.slice(0, k) + n + h.slice(k) : h + n; }   // before the map that appears on check
    if (id === 'missing' && n){ const k = h.lastIndexOf('</div>'); return h.slice(0, k) + n + h.slice(k); }
    return placeNotes(h, n); };
});
