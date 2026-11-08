/* ===================== UX LAYER =====================
   1. Building-block chain builder (replaces the card list of every ordering task: D1, D5 "Put in order", B/P sequence items)
   2. Pathway maps drawn as SVG diagrams (D1, D2, library) instead of text lists
   3. "What happens next?" trail folded into one compact chain line (less scrolling) */
Object.assign(U, {
  uxTrack:"Your chain – tap a block to take it back|Votre chaîne – touchez un bloc pour le reprendre|Deine Kette – tippe einen Block an, um ihn zurückzunehmen",
  uxBank:"Blocks – tap them in order|Blocs – touchez-les dans l'ordre|Blöcke – tippe sie der Reihe nach an",
  uxSol:"Correct chain|Chaîne correcte|Richtige Kette",
  uxList:"Show as a list|Afficher en liste|Als Liste zeigen",
  uxSoFar:"So far|Jusqu'ici|Bisher",
  showMap:"Show pathway diagram|Afficher le schéma|Diagramm zeigen", hideMap:"Hide diagram|Masquer le schéma|Diagramm ausblenden",
  uxLinkOk:"product → next substrate ✓|produit → substrat suivant ✓|Produkt → nächstes Substrat ✓",
  uxBranch:"new branch|nouvelle branche|neuer Zweig",
  uxNOk:"{n}/{t} positions correct – the correct order is shown in the diagram below.|{n}/{t} positions correctes – l'ordre correct est montré dans le schéma ci-dessous.|{n}/{t} Positionen richtig – die richtige Reihenfolge zeigt das Diagramm unten.",
  uxSeeDiag:"the correct order is shown in the diagram below.|l'ordre correct est montré dans le schéma ci-dessous.|die richtige Reihenfolge zeigt das Diagramm unten."
});
function blkBody(d){
  if (d.t === 'step'){ const p = PW[d.p], s = p.st[d.i];
    return `<span class="bk-rx"><span class="bk-m">${esc(mol(s[0]))}</span><span class="bk-ar" aria-hidden="true">→</span><span class="bk-m">${esc(mol(s[1]))}</span></span>`
      + `<span class="bk-meta"><span class="bk-e">${esc(typeof enzShort === 'function' ? enzShort(s[2]) : enz(s[2]))}</span>` + (s[3] ? `<span class="bk-sd">${tokHTML(T(s[3]))}</span>` : '') + `</span>`; }
  if (d.t === 'enz') return `<span class="bk-e">${esc(enz(d.id))}</span>`;
  if (d.t === 'mol') return `<span class="bk-m">${esc(mol(d.id))}</span>`;
  return `<span class="bk-t">${esc(T(d.x))}</span>`;
}
function blkKind(d){ return d.t === 'step' ? 'step' : d.t === 'enz' ? 'enz' : d.t === 'mol' ? 'mol' : 'txt'; }
function blkLoc(d){ if (d.t !== 'step') return ''; const p = PW[d.p]; return ' loc-' + (LOCCLS[stepLoc(p, p.st[d.i])] || 'x'); }
function bkJoin(o, k, get){
  const prevD = k === 0 ? o.fixed : get(o.seq[k - 1]).d, curD = get(o.seq[k]).d;
  if (!o.checked) return `<li class="bbj" aria-hidden="true">›</li>`;
  if (prevD && curD.t === 'step' && prevD.t === 'step'){ const pa = PW[prevD.p].st[prevD.i], cu = PW[curD.p].st[curD.i];
    if (pa[1] === cu[0]) return `<li class="bbj ok" title="${esc(u('uxLinkOk'))}">✓</li>`;
    if (o.res[k] && (k === 0 || o.res[k - 1])) return `<li class="bbj br" title="${esc(u('uxBranch'))}">⤷</li>`;
    return `<li class="bbj no" title="${esc(u('linkNo', {a:mol(pa[1]), b:mol(cu[0])}))}">✗</li>`; }
  return `<li class="bbj ${o.res[k] ? 'ok' : 'no'}">${o.res[k] ? '✓' : '✗'}</li>`;
}
orderHTML = function(o, ns){
  const get = uid => o.items.find(i => i.uid === uid), off = o.fixed ? 1 : 0, kind = o.items[0] ? blkKind(o.items[0].d) : 'txt', J = kind === 'mol' || kind === 'enz';
  const bbk = (d, num, extra, attrs, tag) => `<${tag || 'span'} class="bbk k-${blkKind(d)}${blkLoc(d)}${extra || ''}"${attrs || ''}>${num != null ? `<span class="bbnum">${num}</span>` : ''}<span class="bbbody">${blkBody(d)}</span></${tag || 'span'}>`;
  let h = `<div class="bb bb-${kind}${o.checked ? ' done' : ''}"><div class="bb-col"><div class="col-h">${u('uxTrack')}</div><ol class="bb-track">`;
  if (o.fixed) h += `<li>${bbk(o.fixed, 1, ' fixed', ` title="${esc(u('fixedStart'))}"`)}</li>`;
  o.seq.forEach((uid, k) => { if ((k > 0 || o.fixed) && J) h += bkJoin(o, k, get);
    const cls = o.checked ? (o.res[k] ? ' ok' : ' no') : '';
    h += `<li>${bbk(get(uid).d, k + 1 + off, cls, ` data-act="ounpick" data-ns="${ns}" data-uid="${uid}" type="button"${o.checked ? ' disabled' : ''}`, 'button')}</li>`; });
  if (!o.checked){ const left = o.correct.length - o.seq.length, show = Math.min(left, 14);
    for (let g = 0; g < show; g++) h += `${(o.seq.length + g > 0 || o.fixed) && J ? '<li class="bbj ghost" aria-hidden="true">›</li>' : ''}<li class="bbk slot${g === 0 ? ' next' : ''}" aria-hidden="true"><span class="bbnum">${o.seq.length + g + 1 + off}</span></li>`;
    if (left > show) h += `<li class="bbk slot more">+${left - show}</li>`; }
  h += `</ol></div>`;
  if (!o.checked){ h += `<div class="bb-col"><div class="col-h">${u('uxBank')}</div><div class="bb-bank">`;
    o.pool.forEach(uid => { h += bbk(get(uid).d, null, '', ` data-act="opick" data-ns="${ns}" data-uid="${uid}" type="button"`, 'button'); });
    if (!o.pool.length) h += `<span class="empty">✓</span>`;
    h += `</div></div>`; }
  h += `</div>`;
  if (!o.checked){ const last = o.seq.length ? get(o.seq[o.seq.length - 1]).d : null;
    h += `<div class="obar"><div class="obar-info"><strong>${u('placed', {n:o.seq.length + off, t:o.correct.length + off})}</strong>${last ? `<span class="obar-last">${u('lastPlaced')}: ${esc(lastLabel(last))}</span>` : ''}</div>`
      + `<button type="button" class="btn" data-act="oundo" data-ns="${ns}"${o.seq.length ? '' : ' disabled'}>${u('undo')}</button><button type="button" class="btn" data-act="oclear" data-ns="${ns}"${o.seq.length ? '' : ' disabled'}>${u('clear')}</button>`
      + `<button type="button" class="btn primary" data-act="ocheck" data-ns="${ns}">${u('check')}</button></div>`; }
  if (o.msg) h += `<p class="note warn">${esc(u(o.msg))}</p>`;
  if (o.checked){ const n = o.res.filter(Boolean).length;
    if (n === o.correct.length) h += `<div class="fb ok"><strong>${u('allCorrect')}</strong></div>`;
    else if (kind === 'step') h += `<div class="fb no"><strong>${u('uxNOk', {n, t:o.correct.length})}</strong></div>`;
    else { h += `<div class="fb no"><strong>${u('nCorrect', {n, t:o.correct.length})}</strong><div class="col-h" style="margin-top:8px">${u('uxSol')}</div><ol class="bb-track sol">`;
      if (o.fixed) h += `<li>${bbk(o.fixed, 1, ' fixed')}</li>${J ? '<li class="bbj" aria-hidden="true">›</li>' : ''}`;
      o.items.forEach((it, k) => { if (k && J) h += `<li class="bbj" aria-hidden="true">›</li>`; h += `<li>${bbk(it.d, k + 1 + off)}</li>`; });
      h += `</ol></div>`; } }
  return h;
};

/* ---- diagrams instead of text maps ---- */
const _mapHTMLtext = mapHTML;
mapHTML = function(p, B){
  if ((B && Object.keys(B).length) || typeof vPathSVG !== 'function') return _mapHTMLtext(p, B);
  const D = vPathSVG(p, {});
  return `<div class="vscroll${D.Lo.wide ? ' wide' : ''}">${D.svg}</div>${D.Lo.wide ? `<p class="vswipe">↔ ${u('vSwipe')}</p>` : ''}`
    + `<details class="maplist"><summary>${u('uxList')}</summary>${_mapHTMLtext(p)}</details>`;
};

/* ---- compact trail in D2 + small DOM touches after each render ---- */
(function(){
  const _r = render;
  render = function(){ _r(); if (typeof document === 'undefined') return;
    if (VIEW === 'next' && S.d2){ const tr = document.querySelector('#main .card.trail');
      if (tr && !tr.dataset.ux){ const p = PW[S.d2.pid]; let chips = '';
        for (let k = 0; k < S.d2.i; k++){ const st = p.st[k];
          if (k === 0 || st[0] !== p.st[k - 1][1]) chips += `${k ? '<span class="cj">⤷</span>' : ''}<span class="cm">${esc(mol(st[0]))}</span>`;
          chips += `<span class="cj">→</span><span class="cm">${esc(mol(st[1]))}</span>`; }
        tr.innerHTML = `<details class="trailbox"><summary><span class="col-h">${u('uxSoFar')} (${S.d2.i})</span><span class="chainrow">${chips}</span></summary>${tr.innerHTML}</details>`;
        tr.dataset.ux = '1'; } }
  };
})();
