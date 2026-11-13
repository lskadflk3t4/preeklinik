#!/usr/bin/env python3
"""Build kmol.js: 2-D structures for the K8 drill (formula types, Lewis structures, functional groups, naming).

Every molecule is written in the mdata.js atom/bond format (molSVG in bdata4.js can draw it) twice:
  a/b   heavy atoms only (skeletal or labelled structural formula)
  ha/hb every hydrogen drawn as an atom (displayed formula, Lewis structure); heavy-atom indices are the same,
        and each atom carries its lone pairs as a 6th field (for the Lewis drawing).
  f     molecular formula, g = functional groups found by SMARTS {key: [heavy-atom indices]}.

Run:  python3 tools/build_kmol.py   (writes ../kmol.js)
"""
import json, os
from rdkit import Chem
from rdkit.Chem import rdDepictor, rdMolDescriptors

rdDepictor.SetPreferCoordGen(True)
VAL = {'H': 1, 'B': 3, 'C': 4, 'N': 5, 'O': 6, 'F': 7, 'P': 5, 'S': 6, 'Cl': 7, 'Br': 7, 'I': 7}

# id: SMILES
MOLS = {
  # alkanes / branched / cyclic
  'meth': 'C', 'eth': 'CC', 'prop': 'CCC', 'but': 'CCCC', 'pent': 'CCCCC', 'hex': 'CCCCCC',
  'mprop': 'CC(C)C', 'mbut': 'CCC(C)C', 'dmprop': 'CC(C)(C)C', 'mpent3': 'CCC(C)CC', 'dmbut': 'CC(C)C(C)C', 'mpent2': 'CCCC(C)C',
  'chex': 'C1CCCCC1', 'benz': 'c1ccccc1',
  # unsaturated
  'ethene': 'C=C', 'propene': 'C=CC', 'but1ene': 'C=CCC', 'but2ene': 'CC=CC', 'ethyne': 'C#C', 'propyne': 'C#CC', 'mpropene': 'C=C(C)C',
  # alcohols
  'meoh': 'CO', 'etoh': 'CCO', 'prop1ol': 'CCCO', 'prop2ol': 'CC(C)O', 'but2ol': 'CCC(C)O', 'but1ol': 'CCCCO', 'mprop2ol': 'CC(C)(C)O',
  'diol': 'OCCO', 'glyc': 'OCC(O)CO', 'phenol': 'Oc1ccccc1',
  # carbonyls
  'methanal': 'C=O', 'ethanal': 'CC=O', 'propanal': 'CCC=O', 'butanal': 'CCCC=O', 'propanone': 'CC(C)=O', 'butanone': 'CCC(C)=O', 'pent3one': 'CCC(=O)CC',
  # acids / esters / amides
  'hcooh': 'OC=O', 'acoh': 'CC(=O)O', 'propacid': 'CCC(=O)O', 'butacid': 'CCCC(=O)O',
  'meac': 'CC(=O)OC', 'etac': 'CC(=O)OCC', 'etform': 'O=COCC', 'mepro': 'CCC(=O)OC',
  'acam': 'CC(N)=O',
  # amines, halo, ethers, thiols, nitriles
  'mea': 'CN', 'eta': 'CCN', 'prop2am': 'CC(C)N',
  'clme': 'CCl', 'clet': 'CCCl', 'brprop2': 'CC(C)Br', 'chcl3': 'ClC(Cl)Cl', 'cl2prop': 'CC(Cl)CCl',
  'dme': 'COC', 'meoet': 'CCOC', 'etsh': 'CCS', 'acn': 'CC#N',
  # bifunctional (biochemistry)
  'ala': 'CC(N)C(=O)O', 'lact': 'CC(O)C(=O)O', 'gly': 'NCC(=O)O', 'pyr': 'CC(=O)C(=O)O', 'bhb': 'CC(O)CC(=O)O',
  # drugs
  'asp': 'CC(=O)Oc1ccccc1C(=O)O', 'para': 'CC(=O)Nc1ccc(O)cc1', 'proc': 'CCN(CC)CCOC(=O)c1ccc(N)cc1', 'lido': 'CCN(CC)CC(=O)Nc1c(C)cccc1C',
  'ibu': 'CC(C)Cc1ccc(cc1)C(C)C(=O)O', 'dopa': 'NCCc1ccc(O)c(O)c1', 'benzo': 'CCOC(=O)c1ccc(N)cc1', 'capto': 'CC(CS)C(=O)N1CCCC1C(=O)O',
  'salic': 'O=C(O)c1ccccc1O', 'urea': 'NC(N)=O',
  # Lewis set (small molecules and ions)
  'h2o': 'O', 'nh3': 'N', 'hf': 'F', 'hcl': 'Cl', 'co2': 'O=C=O', 'hcn': 'C#N', 'n2': 'N#N', 'o2': 'O=O', 'cl2': 'ClCl',
  'nh4': '[NH4+]', 'oh': '[OH-]', 'h3o': '[OH3+]', 'cn': '[C-]#N', 'co': '[C-]#[O+]', 'no3': '[O-][N+](=O)[O-]', 'co3': '[O-]C([O-])=O',
  'acet': 'CC(=O)[O-]', 'bf3': 'FB(F)F', 'h2o2': 'OO', 'pcl3': 'ClP(Cl)Cl', 'ccl4': 'ClC(Cl)(Cl)Cl', 'h2s': 'S', 'n2h4': 'NN', 'ch3nh3': 'C[NH3+]',
}
GRPS = [  # order matters: first match of each key is stored
  ('acid', '[CX3](=O)[OX2H1]'), ('carbox', '[CX3](=O)[OX1-]'), ('ester', '[CX3](=O)[OX2][#6]', 0, 3), ('amide', '[CX3](=O)[NX3]'),
  ('ald', '[CX3;H1,H2;!$([#6]-[#8,#7])]=O'), ('ketone', '[#6][CX3](=O)[#6]', 1, 3), ('alcohol', '[CX4][OX2H]'), ('phenol', 'c[OX2H]'),
  ('ether', '[OD2]([#6;!$(C=O)])[#6;!$(C=O)]'), ('amine', '[NX3;+0;!$(NC=O);!$(N-[N,O]);!$(N=*)]'), ('alkene', '[C]=[C]'), ('alkyne', 'C#C'),
  ('halo', '[Cl,Br,I,F;$(*[#6])]'), ('thiol', '[SX2H]'), ('nitrile', 'C#N'), ('arene', 'c1ccccc1'),
]

def coords(m):
    rdDepictor.Compute2DCoords(m)
    conf = m.GetConformer(); n = m.GetNumAtoms()
    pts = [conf.GetAtomPosition(i) for i in range(n)]
    bls = [(pts[b.GetBeginAtomIdx()] - pts[b.GetEndAtomIdx()]).Length() for b in m.GetBonds()]
    s = (sorted(bls)[len(bls)//2] if bls else 1.5) or 1.5
    cx = sum(p.x for p in pts)/n; cy = sum(p.y for p in pts)/n
    return [(round((p.x - cx)/s, 2), round(-(p.y - cy)/s, 2)) for p in pts]

def bonds(m):
    o = {Chem.BondType.SINGLE: 1, Chem.BondType.DOUBLE: 2, Chem.BondType.TRIPLE: 3}
    return [[b.GetBeginAtomIdx(), b.GetEndAtomIdx(), o.get(b.GetBondType(), 1)] for b in m.GetBonds()]

def entry(mid, smi):
    ar = Chem.MolFromSmiles(smi)
    if ar is None: raise SystemExit('bad SMILES ' + mid)
    g = {}
    for gr in GRPS:
        k, sm = gr[0], gr[1]
        hit = ar.GetSubstructMatches(Chem.MolFromSmarts(sm))
        if hit: g[k] = list(hit[0])[gr[2]:gr[3]] if len(gr) > 2 else list(hit[0])
    # alkene inside benzene is not an alkene; ester C–O is not an ether (SMARTS excludes), acid O is not alcohol (CX4)
    if 'arene' in g and 'alkene' in g and all(ar.GetAtomWithIdx(i).GetIsAromatic() for i in g['alkene']): del g['alkene']
    m = Chem.Mol(ar); Chem.Kekulize(m, clearAromaticFlags=True)
    P = coords(m); A = []
    for a in m.GetAtoms():
        i = a.GetIdx(); sym = a.GetSymbol(); q = a.GetFormalCharge(); h = a.GetTotalNumHs()
        A.append([sym, P[i][0], P[i][1]] if sym == 'C' and not q and h == 0 else [sym, P[i][0], P[i][1], q, h])
    mh = Chem.AddHs(m); PH = coords(mh); AH = []
    deg = {}
    for b in mh.GetBonds():
        bo = {Chem.BondType.SINGLE: 1, Chem.BondType.DOUBLE: 2, Chem.BondType.TRIPLE: 3}.get(b.GetBondType(), 1)
        for i in (b.GetBeginAtomIdx(), b.GetEndAtomIdx()): deg[i] = deg.get(i, 0) + bo
    for a in mh.GetAtoms():
        i = a.GetIdx(); sym = a.GetSymbol(); q = a.GetFormalCharge()
        lp = (VAL[sym] - deg.get(i, 0) - q)//2
        if lp < 0: raise SystemExit(f'{mid}: negative lone pairs on {sym}{i}')
        AH.append([sym, PH[i][0], PH[i][1], q, 0, lp])
    e = {'a': A, 'b': bonds(m), 'ha': AH, 'hb': bonds(mh), 'f': rdMolDescriptors.CalcMolFormula(m), 'q': Chem.GetFormalCharge(m)}
    if g: e['g'] = g
    return e

def main():
    out = {k: entry(k, v) for k, v in MOLS.items()}
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, '..', 'kmol.js'), 'w', encoding='utf-8') as f:
        f.write('/* ===================== K8 MOLECULE STRUCTURES (generated by tools/build_kmol.py with RDKit — do not edit by hand) =====================\n'
                '   KMOL[id] = {a, b: heavy atoms (mdata.js format) · ha, hb: every H drawn, 6th atom field = lone pairs · f: formula · q: charge · g: groups} */\n'
                'const KMOL = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print(len(out), 'molecules')

if __name__ == '__main__':
    main()
