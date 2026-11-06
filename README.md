# Preclinical Drills (offline PWA)

Interactive metabolism, biochemistry and physiology drills in **English, French and German**. The app works completely offline once installed. It can sync your progress between devices through a private GitHub Gist.

**Metabolism (9 drill types)**
- 47 metabolic pathways (glycolysis → sphingolipid degradation)
- Pathway reconstruction, "what happens next", organ metabolism, hormone response, metabolic switching, enzyme detective, missing molecule, clinical cases plus a disease matcher, and energy (ATP) calculations
- 30 clinical cases and 33 inherited metabolic disorders in the disease matcher

**Biochemistry (4 drill types)**
- B1 Structure builder: build nucleotides, lipids, disaccharides and polysaccharides from their parts; sort and recognise the 20 amino acids
- B2 Enzyme kinetics: Michaelis–Menten, Lineweaver–Burk and allosteric graphs, inhibition types, rate calculations, enzyme drugs
- B3 Buffers & pH: Henderson–Hasselbalch, pI, titration curves, net charge of amino acids and peptides, drug ionisation
- B4 Protein structure: structural levels and bonds, folding and processing, collagen, haemoglobin, misfolding diseases

**Physiology (4 drill types)**
- P1 What happens if…: predict ↑/↓/– for 19 scenarios (haemorrhage, standing up, diuretics, altitude, SIADH, DKA…) and order 10 reflex/cascade sequences
- P2 Graph interpretation: O₂–Hb curves, pressure–volume loops, action potentials, renal clearance curves
- P3 Calculations: cardiac output, MAP, Fick, O₂ content, clearance, GFR, FENa, osmolality, alveolar gas equation, A–a gradient, compliance, anion gap, Winter, Nernst…
- P4 Compare & contrast: 13 comparison tables (muscle types, lung disease, diuretics, DI, AKI, acid–base, autonomic…)

Most questions are generated with fresh numbers and graphs each time.

No build step, no server code, no dependencies: it is plain HTML, CSS and JavaScript.

---

## 1. Put it on GitHub Pages (one time, ~3 minutes)

1. Create a new repository on GitHub (for example `metabolism-drills`). It can be **public**, or **private** if your plan allows Pages on private repos.
2. Upload **all the files in this folder** (not the folder itself) to the repository root. There are no subfolders, so this works from a phone too:
   - on github.com: *Add file → Upload files*, select every file, then *Commit*. Upload them all in **one** commit.
   - or with git:
     ```bash
     git init && git add . && git commit -m "Metabolism Drills"
     git branch -M main
     git remote add origin https://github.com/<you>/metabolism-drills.git
     git push -u origin main
     ```
3. In the repository, go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**. Pick **Branch: `main`** and **folder `/ (root)`**, then click **Save**.
4. After about a minute the app is live at `https://<you>.github.io/metabolism-drills/`.

> The empty `.nojekyll` file tells GitHub Pages to serve the files exactly as they are. Keep it.

## 2. Install it on Android (works offline afterwards)

1. Open the GitHub Pages address in **Chrome** on your phone.
2. Tap **⋮ → Install app** (or *Add to Home screen*). You can also use the **Install** button on the app's *Sync* page.
3. Open it once while online, so the fonts are cached. From then on it runs fully offline, with no network needed.

Desktop Chrome and Edge can install it too (install icon in the address bar).

## 3. Sync progress between devices (optional)

Your scores live on each device (in the browser's local storage). To share them, the app uses a **private GitHub Gist** in your own account.

1. On github.com go to **Settings → Developer settings → Personal access tokens**.
   - **Fine-grained token (recommended):** *Generate new token*, give it a name, then under **Account permissions → Gists** choose **Read and write**. No repository access is needed.
   - **or a classic token:** tick only the **`gist`** scope.
2. Copy the token.
3. In the app, tap the **cloud icon** (top right) to open the *Sync* page. Give this device a name, paste the token and tap **Connect & sync**.
   - The first device creates a private gist named `metabolism-drills-progress.json`.
   - Every other device finds the same gist automatically: just paste a token (the same one or a new one) and connect.
4. With **Sync automatically** on, the app syncs:
   - when it opens
   - about 15 seconds after you answer questions
   - when you leave it
   - when the connection comes back after being offline

**How merging works:** each device keeps its own counters, and the totals you see are the sum over all devices. Two devices used offline at the same time never overwrite each other. *Reset scores* resets every device at their next sync.

**Privacy and security**
- The token is stored only on the device where you typed it. It is never put in the repository or in the gist.
- The gist only contains score counters and device names.
- If a phone is lost, revoke the token on GitHub. The app keeps working offline.

**No GitHub?** The Sync page also has **Download progress file** and **Import / merge a progress file**. Use them to move progress between devices by email, Drive and so on.

## 4. Updating the app

Edit the files and push to GitHub. Before you push, change the version string at the top of `sw.js` and the matching `?v=` value in `index.html` and `sw.js` (use find-and-replace on the old version). Otherwise installed copies keep using their cached files. When the new version reaches a device, the app shows **"A new version is ready – Reload"**.

## 5. Files

| Path | What it is |
|---|---|
| `index.html` | App shell |
| `manifest.webmanifest` | Install metadata: name, colours, icons |
| `sw.js` | Service worker that caches everything for offline use |
| `style.css` | Styles (light/dark, mobile layout) |
| `data1.js`–`data4.js` | Metabolism data: pathways, enzymes, question banks, clinical cases |
| `app.js` | Metabolism drills, language switching, scoring |
| `bx.js` | Engine for the biochemistry and physiology drills |
| `bdata1.js`–`bdata3.js` | Biochemistry drills (B1–B4) |
| `pdata1.js`, `pdata2.js` | Physiology drills (P1–P4) |
| `sync.js` | GitHub Gist sync, backup file, install button, update notice |
| `icon-*.png`, `apple-touch-icon.png`, `favicon.svg` | App icons (normal + maskable for Android) |

All text is stored as `"English|Français|Deutsch"`. To add a question, copy an existing entry in the data files and keep the three-language format.

## 6. Troubleshooting

- **Stuck on "Loading…" / "The app did not start":** some files are missing from the repository root, or are in a subfolder. Check that every `.js` file sits next to `index.html`, wait a minute for GitHub Pages to finish deploying, then tap **Clear cache and reload**.

- **"GitHub rejected the token":** the token has expired or lacks Gist read/write permission. Create a new one and connect again.
- **Sync shows "Offline":** that's normal without a connection. It catches up automatically.
- **Changes don't appear after pushing:** you didn't change the version in `sw.js`. Change it, push, then reopen the app twice.
- **App not installable:** it must be served over `https://`. GitHub Pages does this; opening the file directly from disk does not.
