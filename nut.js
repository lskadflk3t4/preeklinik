/* ===================== NUTRITION TAB: manual reader (N1) + nutrition quiz (N2) =====================
   Data: NUTMAN {en|fr|de:{intro, units:[[title, markdown]]}} and NUTQ [{u, en:[q, correct, w, w, w], fr, de}] in ndata.js. */
Object.assign(U, {
  grpNut:"Nutrition|Nutrition|Ernährung", grpSpo:"Sport & exercise|Sport et exercice|Sport & Bewegung",
  n1t:"Nutrition Science Manual|Manuel de science de la nutrition|Lehrbuch Ernährungswissenschaft",
  n1d:"The full 17-unit manual (EU standards, EFSA values) in your language: read unit by unit, then quiz yourself on the unit you just read.|Le manuel complet en 17 unités (normes UE, valeurs EFSA) dans votre langue : lisez unité par unité, puis testez-vous sur l'unité lue.|Das vollständige Lehrbuch mit 17 Einheiten (EU-Standards, EFSA-Werte) in deiner Sprache: Einheit für Einheit lesen und danach die gelesene Einheit abfragen.",
  n2t:"Nutrition Science Quiz|Quiz de science de la nutrition|Quiz Ernährungswissenschaft",
  n2d:"100 multiple-choice questions on the 17 manual units, options shuffled every time; filter by unit and jump to the matching manual section.|100 questions à choix multiple sur les 17 unités du manuel, réponses mélangées à chaque fois ; filtrez par unité et ouvrez la section correspondante du manuel.|100 Multiple-Choice-Fragen zu den 17 Einheiten des Lehrbuchs, Antworten jedes Mal neu gemischt; nach Einheit filtern und zum passenden Lehrbuchabschnitt springen.",
  nUnit:"Unit|Unité|Einheit", nIntro:"About this manual|À propos de ce manuel|Über dieses Lehrbuch", nPrev:"◂ Previous unit|◂ Unité précédente|◂ Vorherige Einheit", nNext:"Next unit ▸|Unité suivante ▸|Nächste Einheit ▸",
  nQuizU:"Quiz this unit ({n} questions)|Quiz sur cette unité ({n} questions)|Diese Einheit abfragen ({n} Fragen)", nRead:"Read Unit {u} in the manual|Lire l'unité {u} dans le manuel|Einheit {u} im Lehrbuch lesen",
  nToc:"Contents|Sommaire|Inhalt", nOn:"On this page|Sur cette page|Auf dieser Seite", nTop:"Back to top ▴|Haut de page ▴|Nach oben ▴"
});
if (typeof GRPS !== 'undefined') GRPS.push(['nut', 'grpNut'], ['spo', 'grpSpo']);

/* ---------- tiny markdown renderer for the manual ---------- */
function nutInline(s){
  s = esc(s).replace(/\\([~\[\]*_#().\-])/g, '$1');
  return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
}
function nutMD(md){
  const L = md.split('\n'); let h = '', i = 0, para = [];
  const flush = () => { if (para.length){ h += `<p>${nutInline(para.join(' '))}</p>`; para = []; } };
  while (i < L.length){
    const ln = L[i];
    if (!ln.trim()){ flush(); i++; continue; }
    let m = ln.match(/^(#{3,4})\s+(.*)/);
    if (m){ flush(); const id = 'nh-' + (m[2].match(/^[\d.]+/) || [i])[0].replace(/\./g, '-');
      h += `<h${m[1].length} id="${id}" class="nh">${nutInline(m[2])}</h${m[1].length}>`; i++; continue; }
    if (ln.trim() === '---'){ flush(); h += '<hr>'; i++; continue; }
    if (ln.startsWith('|')){ flush(); const rows = []; while (i < L.length && L[i].startsWith('|')){ rows.push(L[i]); i++; }
      const cells = r => r.replace(/^\||\|\s*$/g, '').split(' | ').map(c => c.trim());
      const head = cells(rows[0]), body = rows.slice(2).map(cells);
      h += `<div class="tblwrap"><table class="sxtbl ntbl"><thead><tr>${head.map(c => `<th>${nutInline(c)}</th>`).join('')}</tr></thead><tbody>`
        + body.map(r => `<tr>${r.map(c => `<td>${nutInline(c)}</td>`).join('')}</tr>`).join('') + `</tbody></table></div>`; continue; }
    m = ln.match(/^(\s*)([-*]|\d+\.)\s+(.*)/);
    if (m){ flush(); const ordered = /\d/.test(m[2]); let out = `<${ordered ? 'ol' : 'ul'} class="nlist">`, open = false;
      while (i < L.length){ const mm = L[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)/); if (!mm) break;
        if (mm[1].length >= 2){ if (!open){ out = out.replace(/<\/li>$/, ''); out += '<ul class="nlist sub">'; open = true; } out += `<li>${nutInline(mm[3])}</li>`; }
        else { if (open){ out += '</ul></li>'; open = false; } out += `<li>${nutInline(mm[3])}</li>`; }
        i++; }
      if (open) out += '</ul></li>';
      h += out + `</${ordered ? 'ol' : 'ul'}>`; continue; }
    para.push(ln.trim()); i++;
  }
  flush(); return h;
}
const NMC = {};
function nutUnit(u){ const k = L + u; if (!NMC[k]){ const M = NUTMAN[L] || NUTMAN.en; NMC[k] = u === 0 ? nutMD(M.intro) : nutMD(M.units[u - 1][1]); } return NMC[k]; }
function nutTitle(u){ const M = NUTMAN[L] || NUTMAN.en; return u === 0 ? u_('nIntro') : M.units[u - 1][0]; }
function u_(k, v){ return u(k, v); }
function nutShort(u){ return nutTitle(u).replace(/^[^—]*—\s*/, ''); }
function nutCount(u){ return NUTQ.filter(q => q.u === u).length; }

/* ---------- N1 manual reader ---------- */
RENDER.nutmanual = function(){
  const s = S.nutmanual || (S.nutmanual = {u:1});
  let h = `<div class="nunits" role="tablist">` + [0].concat(NUTMAN.en.units.map((_, i) => i + 1)).map(k => `<button type="button" class="libchip${k === s.u ? ' on' : ''}" role="tab" aria-selected="${k === s.u}" data-act="nutu" data-v="${k}">${k ? `<b>${String(k).padStart(2, '0')}</b> ` : 'ⓘ '}${esc(k ? nutShort(k) : nutTitle(0))}</button>`).join('') + `</div>`;
  const body = nutUnit(s.u), subs = [...body.matchAll(/<h3 id="([^"]+)" class="nh">(.*?)<\/h3>/g)];
  h += `<article class="card nman" id="nman-top"><h2>${esc(nutTitle(s.u))}</h2>`;
  if (subs.length > 2) h += `<nav class="ntoc" aria-label="${esc(u('nOn'))}"><span>${u('nOn')}:</span>` + subs.map(m => `<button type="button" class="linkbtn" data-act="nutjump" data-v="${m[1]}">${m[2]}</button>`).join('') + `</nav>`;
  h += body + `</article>`;
  h += `<div class="actions nnav">` + (s.u > 0 ? `<button type="button" class="btn" data-act="nutu" data-v="${s.u - 1}">${u('nPrev')}</button>` : '')
    + (s.u > 0 && nutCount(s.u) ? `<button type="button" class="btn primary" data-act="nutquiz" data-v="${s.u}">📝 ${u('nQuizU', {n:nutCount(s.u)})}</button>` : '')
    + (s.u < 17 ? `<button type="button" class="btn" data-act="nutu" data-v="${s.u + 1}">${u('nNext')}</button>` : '')
    + `<button type="button" class="linkbtn" data-act="nutjump" data-v="nman-top">${u('nTop')}</button></div>`;
  return h;
};
DR.push({id:'nutmanual', k:'n1', n:'N1', g:'nut'});
Object.assign(A, {
  nutu(el){ S.nutmanual = {u:+el.dataset.v}; render(); const t = document.getElementById('nman-top'); if (t) t.scrollIntoView({block:'start'}); },
  nutjump(el){ const t = document.getElementById(el.dataset.v); if (t) t.scrollIntoView({behavior:'smooth', block:'start'}); },
  nutquiz(el){ const k = 'u' + el.dataset.v; S.nutquiz = {topic:k}; newBX('nutquiz'); goTo('nutquiz'); },
  nutread(el){ S.nutmanual = {u:+el.dataset.v}; goTo('nutmanual'); setTimeout(() => window.scrollTo(0, 0), 0); }
});
/* the manual is not scored: show a book chip instead of "not started" */
{ const _sc = scoreChip; scoreChip = function(id){ return id === 'nutmanual' ? `<span class="chip muted">📖 17</span>` : _sc(id); }; }

/* ---------- N2 quiz (bx engine: every miss goes to Review) ---------- */
const NQT = {}; NUTMAN.en.units.forEach((_, i) => { NQT['u' + (i + 1)] = [0, 1, 2].map(j => String(i + 1).padStart(2, '0') + ' · ' + (NUTMAN[['en', 'fr', 'de'][j]].units[i][0].replace(/^[^—]*—\s*/, ''))); });
const NQBANK = NUTQ.map(q => ({t:'u' + q.u, k:'mcq', q:[q.en[0], q.fr[0], q.de[0]], o:[1, 2, 3, 4].map(j => [q.en[j], q.fr[j], q.de[j]]), x:null,
  after:() => `<p class="nread"><button type="button" class="linkbtn" data-act="nutread" data-v="${q.u}">📖 ${u('nRead', {u:q.u})}: ${esc(nutShort(q.u))}</button></p>`}));
bxDrill('nutquiz', 'n2', 'N2', 'nut', NQT, NQBANK);
