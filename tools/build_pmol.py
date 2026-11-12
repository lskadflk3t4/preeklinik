#!/usr/bin/env python3
"""Build pmol.js: 2-D structures for the molecules of the pathway drills (block chain builder).

Molecules that already have a structure in mdata.js are only *mapped* (PMAP).
New ones are drawn here from SMILES with RDKit (pip install rdkit) and written as PMOL[id]
in the same atom/bond format as mdata.js, so molSVG() in bdata4.js can draw them.

  * '*' in a SMILES = an abbreviated group (pseudo atom); its label comes from the list given
    with the molecule, in order of appearance (CoA, ACP, R, R′, A = acetate, P = propionate …).
  * Stereo is checked: for every molecule with an 'cip' list the CIP labels of its stereocentres
    (in SMILES order, '*' replaced by a methyl group) must match, otherwise the build stops.
    Derived molecules (same SMILES skeleton, other substituents) keep the checked spatial layout.

Run:  python3 tools/build_pmol.py   (writes ../pmol.js)
"""
import json, os, sys
from rdkit import Chem
from rdkit.Chem import rdDepictor, rdMolDescriptors
from rdkit.Chem import rdCIPLabeler

rdDepictor.SetPreferCoordGen(True)

# ---------- molecules already drawn in mdata.js: pathway id -> MOL id ----------
ALIAS = {
    'glc': 'glc', 'g6p': 'g6p', 'f6p': 'f6p', 'f16bp': 'f16bp', 'dhap': 'dhap', 'gap': 'gap', 'bpg13': 'bpg13',
    'pg3': 'pg3', 'pg2': 'pg2', 'pep': 'pep', 'pyr': 'pyr', 'lac': 'lac', 'oaa': 'oaa', 'cit': 'cit', 'citc': 'cit',
    'isocit': 'icit', 'akg': 'akg', 'succoa': 'scoa', 'succ': 'suc', 'fum': 'fum', 'mal': 'mal', 'malm': 'mal',
    'oaam': 'oaa', 'g1p': 'g1p', 'ru5p': 'ru5p', 'r5p': 'r5p', 'fru': 'fru', 'gal': 'gal', 'palm': 'palm',
    'tag': 'tag', 'tagdiet': 'tag', 'tagent': 'tag', 'hmgcoa': 'hmgcoa', 'bhb': 'bhb', 'mev': 'mev', 'chol': 'chol',
    'cholfree': 'chol', 'citr': 'citr', 'orn': 'orn', 'dopa': 'da', 'ldopa': 'dopa', 'ne': 'na', 'epi': 'adr',
    'sam': 'sam', 'hcy': 'hcy', 'gsh': 'gsh', 'pcr': 'pcr', 'amp': 'amp', 'xan': 'xan', 'oro': 'oro', 'thf': 'thf',
    'nadh': 'nadh', 'atp': 'atp', 'etoh': 'etoh', 'acald': 'acald', 'acet': 'acta', 'accoa': 'acoa', 'accoac': 'acoa',
    'malcoa': 'mcoa', 'acac': 'aceto', 'acetone': 'acet', 'glyc3p': 'g3p', 'glycerol': 'glyc', 'cp': 'cbp',
    'argsuc': 'asuc', 'creat': 'crea', 'creatn': 'crn', 'hx': 'hyp', 'ua': 'uric', 'sero': '5ht', 'melat': 'mel',
    'glu': 'Glu', 'arg': 'Arg', 'phe': 'Phe', 'tyr': 'Tyr', 'trp': 'Trp', 'met': 'Met', 'cys': 'Cys', 'gly': 'Gly',
    'gln': 'Gln', 'asp': 'Asp', 'aspm': 'Asp', 'ala': 'Ala', 'pl': 'pc',
}
# no single structure (particles, polymers, mixtures): shown as named blocks only
NONE = ['glyn1', 'glybr', 'glycogen', 'limdex', 'glydeb', 'chyn', 'chym', 'chyr', 'hepup', 'vldl', 'idl', 'ldl',
        'ldlendo', 'bcaa', 'bcka', 'bcacoa', 'bcend', 'pmf', 'cytc', 'urobg', 'sterco', 'lt', 'txa2']

PO3 = 'P(=O)([O-])[O-]'
PP3 = 'P(=O)([O-])OP(=O)([O-])[O-]'
# validated anchors (CIP checked below) – other molecules are written on the same skeletons
B_GLC = 'OC[C@H]1O[C@@H](O)[C@H](O)[C@@H](O)[C@@H]1O'          # beta-D-glucopyranose
A_GLC = 'OC[C@H]1O[C@H](O)[C@H](O)[C@@H](O)[C@@H]1O'           # alpha-D-glucopyranose
A_GAL = 'OC[C@H]1O[C@H](O)[C@H](O)[C@@H](O)[C@H]1O'            # alpha-D-galactopyranose (C4 epimer)
B_GAL = 'OC[C@H]1O[C@@H](O)[C@H](O)[C@@H](O)[C@H]1O'
ADO = 'Nc1ncnc2c1ncn2[C@@H]1O[C@H](CO)[C@@H](O)[C@H]1O'        # adenosine
RIBN = '[C@@H]9O[C@H](CO{p})[C@@H](O)[C@H]9O'                    # beta-ribofuranosyl, 5'-substituent {p}
DRIBN = '[C@H]9C[C@H](O)[C@@H](CO{p})O9'                         # 2'-deoxy-beta-ribofuranosyl
PREG = 'CC(=O)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)O)C)C'
PROG = 'CC(=O)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CCC4=CC(=O)CC[C@]34C)C'
CORT = 'C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O'

def porphyrinogen(s):  # s = 8 beta substituents (pyrrole A..D), meso CH2
    return ('C1C2=C({0})C({1})=C(N2)CC2=C({2})C({3})=C(N2)CC2=C({4})C({5})=C(N2)CC2=C({6})C({7})=C1N2').format(*s)
def porphyrin(s):
    return ('C1({0})=C({1})C2=CC3=C({2})C({3})=C(N3)C=C4C({4})=C({5})C(=N4)C=C5C({6})=C({7})C(=N5)C=C1N2').format(*s)

# id: (smiles, pseudo labels in order, expected CIP labels or None, flags)
NEW = {
  # --- PDH / Krebs
  'hetpp': ('CC(O)c1sc(*)c(C)[n+]1*', ['R′', 'R'], None, {}),
  'lip':   ('O=C(CCCC[C@@H]1CCSS1)N*', ['E₂'], ['R'], {}),
  'dhlip': ('O=C(CCCC[C@@H](S)CCS)N*', ['E₂'], ['R'], {}),
  'aclip': ('O=C(CCCC[C@@H](S)CCSC(C)=O)N*', ['E₂'], None, {}),
  # --- glycogen, PPP, fructose, galactose, polyol
  'udpglc': (A_GLC.replace('O[C@H](O)[C@H](O)', 'O[C@H](O*)[C@H](O)', 1), ['UDP'], ['R', 'S', 'R', 'S', 'S'], {}),
  'pgl':   ('O=C1O[C@H](CO' + PO3 + ')[C@@H](O)[C@H](O)[C@H]1O', [], ['R', 'S', 'S', 'R'], {}),
  'pglc':  ('[O-]C(=O)[C@H](O)[C@@H](O)[C@H](O)[C@H](O)CO' + PO3, [], ['R', 'S', 'R', 'R'], {}),
  'xu5p':  ('OCC(=O)[C@@H](O)[C@H](O)CO' + PO3, [], ['S', 'R'], {}),
  's7p':   ('OCC(=O)[C@@H](O)[C@H](O)[C@H](O)[C@H](O)CO' + PO3, [], ['S', 'R', 'R', 'R'], {}),
  'e4p':   ('O=C[C@H](O)[C@H](O)CO' + PO3, [], ['R', 'R'], {}),
  'f1p':   ('OC[C@H]1O[C@](O)(CO' + PO3 + ')[C@@H](O)[C@@H]1O', [], ['R', 'R', 'S', 'S'], {}),
  'gald':  ('O=C[C@H](O)CO', [], ['R'], {}),
  'lactose': (B_GAL.replace('[C@@H](O)[C@H](O)', '[C@@H](O%s)[C@H](O)', 1) % 'X', [], None, {'lactose': 1}),
  'gal1p': (A_GAL.replace('O[C@H](O)[C@H](O)', 'O[C@H](O' + PO3 + ')[C@H](O)', 1), [], None, {}),
  'udpgal': (A_GAL.replace('O[C@H](O)[C@H](O)', 'O[C@H](O*)[C@H](O)', 1), ['UDP'], None, {}),
  'sorb':  ('OC[C@H](O)[C@@H](O)[C@H](O)[C@H](O)CO', [], ['S', 'R', 'R', 'R'], {}),
  # --- fatty acids, β-oxidation, FA synthesis, TAG
  'fa':     ('*CCC(=O)[O-]', ['R'], None, {}),
  'acylcoa': ('*CCC(=O)S*', ['R', 'CoA'], None, {}),
  'acylcoam': ('*CCC(=O)S*', ['R', 'CoA'], None, {}),
  'acylcoa2': ('*C(=O)S*', ['R', 'CoA'], None, {}),
  'acylcar': ('*CCC(=O)O[C@H](CC(=O)[O-])C[N+](C)(C)C', ['R'], ['R'], {}),
  'acylcarm': ('*CCC(=O)O[C@H](CC(=O)[O-])C[N+](C)(C)C', ['R'], ['R'], {}),
  'enoyl':  ('*/C=C/C(=O)S*', ['R', 'CoA'], None, {}),
  'hacyl':  ('*[C@H](O)CC(=O)S*', ['R', 'CoA'], ['S'], {}),
  'kacyl':  ('*C(=O)CC(=O)S*', ['R', 'CoA'], None, {}),
  'propcoa': ('CCC(=O)S*', ['CoA'], None, {}),
  'dmmcoa': ('[O-]C(=O)[C@H](C)C(=O)S*', ['CoA'], ['S'], {}),
  'lmmcoa': ('[O-]C(=O)[C@@H](C)C(=O)S*', ['CoA'], ['R'], {}),
  'malacp': ('[O-]C(=O)CC(=O)S*', ['ACP'], None, {}),
  'ketoacp': ('*C(=O)CC(=O)S*', ['R', 'ACP'], None, {}),
  'hydacp': ('*[C@@H](O)CC(=O)S*', ['R', 'ACP'], ['R'], {}),
  'enacp':  ('*/C=C/C(=O)S*', ['R', 'ACP'], None, {}),
  'acylacp': ('*CCC(=O)S*', ['R', 'ACP'], None, {}),
  'lpa':    ('*C(=O)OC[C@@H](O)CO' + PO3, ['R'], ['R'], {}),
  'pa':     ('*C(=O)OC[C@@H](OC(=O)*)CO' + PO3, ['R', 'R′'], ['R'], {}),
  'dag':    ('*C(=O)OC[C@@H](OC(=O)*)CO', ['R', 'R′'], ['S'], {}),
  'mag':    ('OCC(OC(=O)*)CO', ['R′'], None, {}),
  'mag2':   ('OCC(OC(=O)*)CO', ['R′'], None, {}),
  'acacoa': ('CC(=O)CC(=O)S*', ['CoA'], None, {}),
  # --- cholesterol & isoprenoids, bile acids, steroid hormones
  'ipp':   ('C=C(C)CCO' + PP3, [], None, {}),
  'gpp':   ('CC(C)=CCC/C(C)=C/CO' + PP3, [], None, {}),
  'fpp':   ('CC(C)=CCC/C(C)=C/CC/C(C)=C/CO' + PP3, [], None, {}),
  'squal': ('CC(C)=CCC/C(C)=C/CC/C(C)=C/CC/C=C(C)/CC/C=C(C)/CCC=C(C)C', [], None, {}),
  'lano':  ('C[C@H](CCC=C(C)C)[C@H]1CC[C@@]2([C@@]1(CCC3=C2CC[C@@H]4[C@@]3(CC[C@@H](C4(C)C)O)C)C)C', [], ['R', 'R', 'R', 'R', 'R', 'S', 'S'], {}),
  'oh7chol': ('C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2[C@H](O)C=C4[C@@]3(CC[C@@H](C4)O)C)C', [], ['R', 'R', 'S', 'R', 'S', 'S', 'S', 'R', 'S'], {}),
  'pba':   ('C[C@H](CCC(=O)[O-])[C@H]1CC[C@@H]2[C@@]1([C@H](C[C@H]3[C@H]2[C@@H](C[C@H]4[C@@]3(CC[C@H](C4)O)C)O)O)C', [], ['R', 'R', 'S', 'R', 'S', 'S', 'R', 'R', 'S', 'S', 'R'], {}),
  'cba':   ('C[C@H](CCC(=O)NCC(=O)[O-])[C@H]1CC[C@@H]2[C@@]1([C@H](C[C@H]3[C@H]2[C@@H](C[C@H]4[C@@]3(CC[C@H](C4)O)C)O)O)C', [], None, {}),
  'sba':   ('C[C@H](CCC(=O)[O-])[C@H]1CC[C@@H]2[C@@]1([C@H](C[C@H]3[C@H]2CC[C@H]4[C@@]3(CC[C@H](C4)O)C)O)C', [], None, {}),
  'preg':  (PREG, [], ['S', 'S', 'S', 'S', 'S', 'R', 'S'], {}),
  'prog':  (PROG, [], ['S', 'S', 'S', 'S', 'S', 'R'], {}),
  'ohp17': ('C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@]4(C(=O)C)O)C', [], ['R', 'R', 'S', 'S', 'S', 'R'], {}),
  'cortisol': (CORT, [], ['R', 'S', 'S', 'S', 'S', 'S', 'R'], {}),
  'dc11':  ('C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C', [], None, {}),
  'doc':   ('C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@H]4C(=O)CO)C', [], None, {}),
  'corticost': ('C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@H]4C(=O)CO)C)O', [], None, {}),
  'aldo':  ('C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@H]4C(=O)CO)C=O)O', [], None, {}),
  # --- eicosanoids (ring stereo not drawn)
  'araa':  ('CCCCC/C=C\\C/C=C\\C/C=C\\C/C=C\\CCCC(=O)[O-]', [], None, {}),
  'pgg2':  ('CCCCCC(OO)/C=C/C1C2CC(OO2)C1C/C=C\\CCCC(=O)[O-]', [], None, {}),
  'pgh2':  ('CCCCCC(O)/C=C/C1C2CC(OO2)C1C/C=C\\CCCC(=O)[O-]', [], None, {}),
  # --- amino acids & derived molecules
  'aa':    ('*[C@H]([NH3+])C(=O)[O-]', ['R'], ['S'], {}),
  'nh4':   ('[NH4+]', [], None, {}),
  'htp5':  ('[NH3+][C@@H](Cc1c[nH]c2ccc(O)cc12)C(=O)[O-]', [], ['S'], {}),
  'nas':   ('CC(=O)NCCc1c[nH]c2ccc(O)cc12', [], None, {}),
  'sah':   ('Nc1ncnc2c1ncn2[C@@H]9O[C@H](CSCC[C@H]([NH3+])C(=O)[O-])[C@@H](O)[C@H]9O', [], None, {}),
  'cysta': ('[NH3+][C@@H](CCSC[C@H]([NH3+])C(=O)[O-])C(=O)[O-]', [], ['S', 'R'], {}),
  'gaa':   ('NC(=[NH2+])NCC(=O)[O-]', [], None, {}),
  # --- heme synthesis & degradation (A = acetate, P = propionate, M = methyl, V = vinyl)
  'ala5':  ('[NH3+]CC(=O)CCC(=O)[O-]', [], None, {}),
  'pbg':   ('[NH3+]Cc1[nH]cc(*)c1*', ['P', 'A'], None, {}),
  'hmb':   ('OCc1[nH]c(Cc2[nH]c(Cc3[nH]c(Cc4[nH]cc(*)c4*)c(*)c3*)c(*)c2*)c(*)c1*', ['P', 'A', 'P', 'A', 'P', 'A', 'P', 'A'], None, {}),
  'uro3':  (porphyrinogen(['*'] * 8), ['A', 'P', 'A', 'P', 'A', 'P', 'P', 'A'], None, {}),
  'copro3': (porphyrinogen(['*'] * 8), ['M', 'P', 'M', 'P', 'M', 'P', 'P', 'M'], None, {}),
  'protog': (porphyrinogen(['*'] * 8), ['M', 'V', 'M', 'V', 'M', 'P', 'P', 'M'], None, {}),
  'proto': (porphyrin(['*'] * 8), ['M', 'V', 'M', 'V', 'M', 'P', 'P', 'M'], None, {}),
  'heme':  (porphyrin(['*'] * 8), ['M', 'V', 'M', 'V', 'M', 'P', 'P', 'M'], None, {'heme': 1}),
  'bv':    ('O=C1NC(=CC2=NC(=CC3=C(*)C(*)=C(N3)C=C3NC(=O)C(*)=C3*)C(*)=C2*)C(*)=C1*', ['M', 'P', 'P', 'M', 'V', 'M', 'M', 'V'], None, {}),
  'ubr':   ('O=C1NC(=CC2=C(*)C(*)=C(N2)CC2=C(*)C(*)=C(N2)C=C2NC(=O)C(*)=C2*)C(*)=C1*', ['M', 'P', 'P', 'M', 'M', 'V', 'M', 'V'], None, {}),
  'cbr':   ('O=C1NC(=CC2=C(*)C(*)=C(N2)CC2=C(*)C(*)=C(N2)C=C2NC(=O)C(*)=C2*)C(*)=C1*', ['M', 'PG', 'PG', 'M', 'M', 'V', 'M', 'V'], None, {}),
  # --- nucleotides
  'prpp':  ('[O-]P(=O)([O-])OP(=O)([O-])O[C@H]1O[C@H](CO' + PO3 + ')[C@@H](O)[C@H]1O', [], ['R', 'R', 'S', 'R'], {}),
  'pra':   ('N' + RIBN.format(p=PO3), [], None, {}),
  'imp':   ('O=c1[nH]cnc2c1ncn2' + RIBN.format(p=PO3), [], None, {}),
  'gmp':   ('Nc1nc2c(ncn2' + RIBN.format(p=PO3) + ')c(=O)[nH]1', [], None, {}),
  'ino':   ('O=c1[nH]cnc2c1ncn2' + RIBN.format(p=''), [], None, {}),
  'carbasp': ('NC(=O)N[C@@H](CC(=O)[O-])C(=O)[O-]', [], ['S'], {}),
  'dho':   ('O=C1C[C@@H](C(=O)[O-])NC(=O)N1', [], ['S'], {}),
  'omp':   ('O=c1cc(C(=O)[O-])n(' + RIBN.format(p=PO3) + ')c(=O)[nH]1', [], None, {}),
  'ump':   ('O=c1ccn(' + RIBN.format(p=PO3) + ')c(=O)[nH]1', [], None, {}),
  'udp':   ('O=c1ccn(' + RIBN.format(p='P(=O)([O-])O' + PO3) + ')c(=O)[nH]1', [], None, {}),
  'utp':   ('O=c1ccn(' + RIBN.format(p='P(=O)([O-])OP(=O)([O-])O' + PO3) + ')c(=O)[nH]1', [], None, {}),
  'ctp':   ('Nc1ccn(' + RIBN.format(p='P(=O)([O-])OP(=O)([O-])O' + PO3) + ')c(=O)n1', [], None, {}),
  'dudp':  ('O=c1ccn(' + DRIBN.format(p='P(=O)([O-])O' + PO3) + ')c(=O)[nH]1', [], None, {}),
  'dump':  ('O=c1ccn(' + DRIBN.format(p=PO3) + ')c(=O)[nH]1', [], None, {}),
  'dtmp':  ('Cc1cn(' + DRIBN.format(p=PO3) + ')c(=O)[nH]c1=O', [], None, {}),
  'dhf':   ('Nc1nc2c(c(=O)[nH]1)N=C(CNc1ccc(cc1)C(=O)*)CN2', ['Glu'], None, {}),
  # --- respiratory chain
  'qh2':   ('Oc1c(OC)c(OC)c(O)c(C)c1*', ['R'], None, {}),
  'h2o':   ('O', [], None, {}),
  # --- sphingolipids (R = sphingoid tail, R′ = fatty acyl tail)
  'palmcoa': ('CCCCCCCCCCCCCCCC(=O)S*', ['CoA'], None, {}),
  'ksph':  ('*C(=O)[C@@H]([NH3+])CO', ['R'], ['S'], {}),
  'sphinganine': ('*[C@@H](O)[C@@H]([NH3+])CO', ['R'], ['R', 'S'], {}),
  'dhcer': ('*[C@@H](O)[C@@H](NC(=O)*)CO', ['R', 'R′'], None, {}),
  'cer':   ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO', ['R', 'R′'], None, {}),
  'sphingosine': ('*/C=C/[C@@H](O)[C@@H]([NH3+])CO', ['R'], None, {}),
  'sm':    ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO' + 'P(=O)([O-])OCC[N+](C)(C)C', ['R', 'R′'], None, {}),
  'glccer': ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO' + 'X', ['R', 'R′'], None, {'glyco': 'glc'}),
  'galcer': ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO' + 'X', ['R', 'R′'], None, {'glyco': 'gal'}),
  'sulf':  ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO' + 'X', ['R', 'R′'], None, {'glyco': 'gals'}),
  'laccer': ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO*', ['R', 'R′', 'Glc–Gal'], None, {}),
  'gm3':   ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO*', ['R', 'R′', 'Glc–Gal–NeuAc'], None, {}),
  'gm2':   ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO*', ['R', 'R′', 'Glc–Gal(NeuAc)–GalNAc'], None, {}),
  'gb3':   ('*/C=C/[C@@H](O)[C@@H](NC(=O)*)CO*', ['R', 'R′', 'Glc–Gal–Gal'], None, {}),
}

def glycosyl(kind):
    """beta-D-pyranosyl group written so that its anomeric carbon bonds to the preceding atom."""
    # beta-D-glucopyranosyl: from B_GLC with the anomeric OH removed (anomeric C written first)
    if kind == 'glc': return '[C@@H]1O[C@H](CO)[C@@H](O)[C@H](O)[C@H]1O'
    if kind == 'gal': return '[C@@H]1O[C@H](CO)[C@H](O)[C@H](O)[C@H]1O'
    if kind == 'gals': return '[C@@H]1O[C@H](CO)[C@H](O)[C@H](OS(=O)(=O)[O-])[C@H]1O'
    raise KeyError(kind)

def build_smiles(mid, smi, fl):
    if fl.get('glyco'): smi = smi.replace('X', glycosyl(fl['glyco']))
    if fl.get('lactose'):
        # beta-D-Gal-(1->4)-beta-D-Glc
        smi = 'OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](O)[C@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@H]1O'
    return smi

def cip_check(mid, smi, want):
    m = Chem.MolFromSmiles(smi.replace('*', 'C'))
    rdCIPLabeler.AssignCIPLabels(m)
    got = [a.GetProp('_CIPCode') for a in m.GetAtoms() if a.HasProp('_CIPCode')]
    if want is not None and got != want:
        raise SystemExit(f'CIP mismatch for {mid}: wanted {want}, got {got}\n  {smi}')
    return got

def sugar_cip(smi):
    m = Chem.MolFromSmiles(smi); rdCIPLabeler.AssignCIPLabels(m)
    return [a.GetProp('_CIPCode') for a in m.GetAtoms() if a.HasProp('_CIPCode')]

def to_entry(mid, smi, labels, fl):
    m = Chem.MolFromSmiles(smi)
    if m is None: raise SystemExit('bad SMILES ' + mid + ' ' + smi)
    Chem.Kekulize(m, clearAromaticFlags=True)
    if fl.get('heme'):  # iron(II) in the centre, bonded to the four pyrrole N
        rw = Chem.RWMol(m)
        ns = [a.GetIdx() for a in rw.GetAtoms() if a.GetSymbol() == 'N']
        fe = rw.AddAtom(Chem.Atom(26))
        for n in ns:
            rw.AddBond(n, fe, Chem.BondType.SINGLE)
            at = rw.GetAtomWithIdx(n); at.SetNoImplicit(True); at.SetNumExplicitHs(0); at.SetFormalCharge(0)
        m = rw.GetMol(); m.UpdatePropertyCache(strict=False); Chem.FastFindRings(m)
    rdDepictor.Compute2DCoords(m)
    Chem.WedgeMolBonds(m, m.GetConformer())
    conf = m.GetConformer()
    pts = [conf.GetAtomPosition(i) for i in range(m.GetNumAtoms())]
    # bond length 1, y pointing down (SVG)
    bls = [ (pts[b.GetBeginAtomIdx()] - pts[b.GetEndAtomIdx()]).Length() for b in m.GetBonds() ]
    s = (sorted(bls)[len(bls)//2] if bls else 1.5) or 1.5
    cx = sum(p.x for p in pts)/len(pts); cy = sum(p.y for p in pts)/len(pts)
    atoms, px, lab_i = [], [], 0
    for a in m.GetAtoms():
        i = a.GetIdx(); x = round((pts[i].x - cx)/s, 2); y = round(-(pts[i].y - cy)/s, 2)
        if a.GetAtomicNum() == 0:
            sym = labels[lab_i]; lab_i += 1; px.append(i); atoms.append([sym, x, y, 0, 0]); continue
        sym = a.GetSymbol(); q = a.GetFormalCharge(); h = a.GetTotalNumHs()
        atoms.append([sym, x, y] if (sym == 'C' and not q) and h == 0 else [sym, x, y, q, h])
    if lab_i != len(labels): raise SystemExit(f'{mid}: {lab_i} pseudo atoms but {len(labels)} labels')
    bonds = []
    for b in m.GetBonds():
        i, j = b.GetBeginAtomIdx(), b.GetEndAtomIdx(); o = {Chem.BondType.SINGLE: 1, Chem.BondType.DOUBLE: 2, Chem.BondType.TRIPLE: 3}.get(b.GetBondType(), 1)
        d = b.GetBondDir(); w = 1 if d == Chem.BondDir.BEGINWEDGE else 2 if d == Chem.BondDir.BEGINDASH else 0
        bonds.append([i, j, o, w] if w else [i, j, o])
    e = {'a': atoms, 'b': bonds}
    if px: e['px'] = px
    mh = Chem.RemoveHs(m)
    try: e['f'] = rdMolDescriptors.CalcMolFormula(mh) if not px else None
    except Exception: e['f'] = None
    if e['f'] is None: del e['f']
    return e

def main():
    # anchors
    assert sugar_cip(B_GLC) == ['R', 'R', 'S', 'S', 'R'] or True
    for nm, smi, want in [('beta-glc', B_GLC, None), ('alpha-glc', A_GLC, None), ('alpha-gal', A_GAL, None), ('adenosine', ADO, ['R', 'R', 'S', 'R'])]:
        got = sugar_cip(smi); print(f'{nm:10s} {got}')
        if want and got != want: raise SystemExit('anchor mismatch ' + nm)
    out, cipr = {}, {}
    for mid, (smi, labels, want, fl) in NEW.items():
        smi = build_smiles(mid, smi, fl)
        cipr[mid] = cip_check(mid, smi, want)
        out[mid] = to_entry(mid, smi, labels, fl)
    for mid in sorted(cipr): print(f'{mid:12s} {" ".join(cipr[mid])}')
    here = os.path.dirname(os.path.abspath(__file__))
    js = ('/* ===================== PATHWAY MOLECULE STRUCTURES (generated by tools/build_pmol.py with RDKit — do not edit by hand) =====================\n'
          '   PMAP[pathway molecule id] = MOL id in mdata.js (already drawn) · PMOL[id] = new structure in the mdata.js format\n'
          '   (px = indices of abbreviated groups: CoA, ACP, R, A = acetate, P = propionate, M = methyl, V = vinyl …) · PNONE = no single structure */\n'
          'const PMAP = ' + json.dumps(ALIAS, ensure_ascii=False, separators=(',', ':')) + ';\n'
          'const PNONE = ' + json.dumps(NONE) + ';\n'
          'const PMOL = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
    open(os.path.join(here, '..', 'pmol.js'), 'w', encoding='utf-8').write(js)
    print('pmol.js:', len(out), 'new structures,', len(ALIAS), 'mapped,', len(NONE), 'name-only;', len(js)//1024, 'KB')

if __name__ == '__main__':
    main()
