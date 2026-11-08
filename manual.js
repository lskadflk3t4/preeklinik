/* ===================== USER MANUAL (EN / FR / DE) =====================
   A #manual view that explains every drill and tool, a "How it works" button on every drill page,
   and links from home, the sidebar and settings. Text format: "English|Français|Deutsch". */
Object.assign(U, {
  manT:"Manual|Manuel|Anleitung",
  manD:"How every drill and tool works, step by step. Tap a section to open it.|Comment fonctionne chaque exercice et chaque outil, étape par étape. Touchez une section pour l'ouvrir.|Wie jede Übung und jedes Werkzeug funktioniert, Schritt für Schritt. Tippe auf einen Abschnitt, um ihn zu öffnen.",
  manBtn:"How it works|Mode d'emploi|So funktioniert's",
  manHome:"New here? Read the manual – how every drill works|Nouveau ? Lisez le manuel – comment fonctionne chaque exercice|Neu hier? Lies die Anleitung – wie jede Übung funktioniert",
  manWhat:"What it trains|Ce que l'on entraîne|Was du übst", manHow:"How to do it|Comment faire|So geht's", manOpt:"Options|Options|Optionen", manTip:"Tip|Astuce|Tipp",
  manOpen:"Open this drill →|Ouvrir cet exercice →|Diese Übung öffnen →", manGo:"Open →|Ouvrir →|Öffnen →",
  manAll:"Open all|Tout ouvrir|Alle öffnen", manNone:"Close all|Tout fermer|Alle schließen",
  manGrpStart:"Getting started|Pour commencer|Erste Schritte", manGrpTools:"Study tools|Outils d'étude|Lernwerkzeuge",
  manKey:"Open the manual|Ouvrir le manuel|Anleitung öffnen"
});
if (Array.isArray(U.keys)) U.keys.push(["M|M|M", "Open the manual|Ouvrir le manuel|Anleitung öffnen"]);

const MAN = [
/* ---------- getting started ---------- */
{id:'start', g:'start', ico:'🚀', t:"How the app works|Comment fonctionne l'application|Wie die App funktioniert",
 w:"Short drills for preclinical metabolism, biochemistry and physiology. Every drill gives instant feedback, explains the answer in simple words and keeps your score.|De courts exercices de métabolisme, biochimie et physiologie précliniques. Chaque exercice corrige immédiatement, explique la réponse en termes simples et garde votre score.|Kurze Übungen zu vorklinischem Stoffwechsel, Biochemie und Physiologie. Jede Übung gibt sofort Feedback, erklärt die Antwort einfach und speichert deinen Punktestand.",
 s:["Pick a drill on the home page (or in the sidebar on a computer).|Choisissez un exercice sur la page d'accueil (ou dans la barre latérale sur ordinateur).|Wähle eine Übung auf der Startseite (oder in der Seitenleiste am Computer).",
  "Use the controls at the top of the drill to choose a pathway, topic or mode.|Utilisez les commandes en haut de l'exercice pour choisir une voie, un thème ou un mode.|Wähle oben in der Übung einen Stoffwechselweg, ein Thema oder einen Modus.",
  "Answer, then press Check. Green = right, red = wrong; the correct answer is always shown.|Répondez, puis appuyez sur Vérifier. Vert = juste, rouge = faux ; la bonne réponse est toujours affichée.|Antworte und tippe auf Prüfen. Grün = richtig, rot = falsch; die richtige Antwort wird immer gezeigt.",
  "Read the purple “In simple words” box: what the question asked, what happened, and how to work it out next time.|Lisez l'encadré violet « En termes simples » : ce que demandait la question, ce qui se passe et comment trouver la réponse la prochaine fois.|Lies den lila Kasten „Einfach erklärt“: worum es ging, was passiert und wie du beim nächsten Mal draufkommst.",
  "Press Next (or Enter) for a new question. Your accuracy appears on each drill tile and in the header.|Appuyez sur Suivant (ou Entrée) pour une nouvelle question. Votre précision s'affiche sur chaque tuile et dans l'en-tête.|Tippe auf Weiter (oder Enter) für eine neue Frage. Deine Trefferquote steht auf jeder Kachel und oben im Kopf."],
 m:[["Colours|Couleurs|Farben", "Blue boxes = molecules, purple = enzymes. ATP/GTP orange, NADH/FADH₂/NADPH green, CO₂/H₂O/O₂/Pi grey. Coloured edges/arrows show the compartment (cytosol, mitochondrion, ER…).|Cases bleues = molécules, violettes = enzymes. ATP/GTP en orange, NADH/FADH₂/NADPH en vert, CO₂/H₂O/O₂/Pi en gris. Les bords/flèches colorés indiquent le compartiment (cytosol, mitochondrie, RE…).|Blaue Kästchen = Moleküle, lila = Enzyme. ATP/GTP orange, NADH/FADH₂/NADPH grün, CO₂/H₂O/O₂/Pi grau. Farbige Ränder/Pfeile zeigen das Kompartiment (Zytosol, Mitochondrium, ER …)."],
  ["Home dashboard|Tableau de bord|Startseite", "Daily goal ring, day streak, Continue (last drill), Random and Weakest drill buttons.|Anneau d'objectif du jour, série de jours, boutons Continuer (dernier exercice), Au hasard et Exercice le plus faible.|Tagesziel-Ring, Tagesserie, Knöpfe Weiter (letzte Übung), Zufall und Schwächste Übung."],
  ["Navigation|Navigation|Navigation", "Phone: bottom bar (Home, Next drill, Review, Settings). Computer: sidebar with every drill and its score.|Téléphone : barre du bas (Accueil, Exercice suivant, Révision, Réglages). Ordinateur : barre latérale avec chaque exercice et son score.|Handy: Leiste unten (Start, Nächste Übung, Wiederholen, Einstellungen). Computer: Seitenleiste mit allen Übungen und Punktestand."],
  ["Glossary|Glossaire|Glossar", "The 📘 tab on the right edge opens every scientific term: concepts, enzymes, molecules, pathways and disorders. “On this page” lists the terms on the current screen; search works in all three languages.|L'onglet 📘 au bord droit ouvre tous les termes scientifiques : concepts, enzymes, molécules, voies et maladies. « Sur cette page » liste les termes de l'écran actuel ; la recherche fonctionne dans les trois langues.|Der 📘-Reiter am rechten Rand öffnet alle Fachbegriffe: Begriffe, Enzyme, Moleküle, Wege und Erkrankungen. „Auf dieser Seite“ zeigt die Begriffe des aktuellen Bildschirms; die Suche klappt in allen drei Sprachen."],
  ["Keyboard|Clavier|Tastatur", "1–9 choose an answer · Enter check/next · R random drill · [ ] previous/next drill · V review · H home · M manual · G glossary.|1–9 choisir une réponse · Entrée vérifier/suivant · R exercice au hasard · [ ] exercice précédent/suivant · V révision · H accueil · M manuel · G glossaire.|1–9 Antwort wählen · Enter prüfen/weiter · R Zufallsübung · [ ] vorherige/nächste Übung · V wiederholen · H Start · M Anleitung · G Glossar."]],
 tip:"Every page has a “How it works” button next to its title – it opens the matching section of this manual.|Chaque page a un bouton « Mode d'emploi » à côté de son titre – il ouvre la section correspondante de ce manuel.|Jede Seite hat neben dem Titel einen Knopf „So funktioniert's“ – er öffnet den passenden Abschnitt dieser Anleitung."},

/* ---------- metabolism ---------- */
{id:'pathways', s:["Choose a pathway (or Random) and a mode.|Choisissez une voie (ou Au hasard) et un mode.|Wähle einen Weg (oder Zufall) und einen Modus.",
  "Tap the blocks in the bank in the order they happen; each block snaps into the next numbered slot of your chain.|Touchez les blocs de la banque dans l'ordre où ils se produisent ; chaque bloc s'emboîte dans la case numérotée suivante de votre chaîne.|Tippe die Blöcke in der Ablage in der richtigen Reihenfolge an; jeder Block rastet im nächsten nummerierten Platz deiner Kette ein.",
  "Tap a block in your chain to take it back, or use Undo / Clear. The coloured left edge of a block shows the compartment.|Touchez un bloc de votre chaîne pour le reprendre, ou utilisez Annuler / Effacer. Le bord gauche coloré indique le compartiment.|Tippe einen Block in deiner Kette an, um ihn zurückzunehmen, oder nutze Rückgängig / Leeren. Der farbige linke Rand zeigt das Kompartiment.",
  "Press Check: each block turns green (right place) or red (wrong place), and the pathway diagram appears below with the correct order.|Appuyez sur Vérifier : chaque bloc devient vert (bonne place) ou rouge (mauvaise place), et le schéma de la voie apparaît dessous dans le bon ordre.|Tippe auf Prüfen: Jeder Block wird grün (richtiger Platz) oder rot (falscher Platz), und darunter erscheint das Diagramm mit der richtigen Reihenfolge."],
 m:[["Full reactions|Réactions complètes|Ganze Reaktionen", "Order complete reaction cards (substrate → product, enzyme).|Ordonner des cartes de réactions complètes (substrat → produit, enzyme).|Ganze Reaktionskarten ordnen (Substrat → Produkt, Enzym)."],
  ["Enzymes only|Enzymes seules|Nur Enzyme", "Order just the enzymes – harder.|Ordonner seulement les enzymes – plus difficile.|Nur die Enzyme ordnen – schwerer."],
  ["Molecules only|Molécules seules|Nur Moleküle", "Order the intermediates (only for unbranched pathways).|Ordonner les intermédiaires (voies non ramifiées seulement).|Die Zwischenprodukte ordnen (nur unverzweigte Wege)."],
  ["Show pathway diagram|Afficher le schéma|Diagramm zeigen", "Peek at the drawn pathway while you work.|Voir le schéma de la voie pendant l'exercice.|Das gezeichnete Diagramm während der Übung ansehen."]],
 tip:"Find the first and last molecule first, then fill the middle.|Trouvez d'abord la première et la dernière molécule, puis remplissez le milieu.|Suche zuerst das erste und letzte Molekül, dann füll die Mitte."},
{id:'next', s:["Choose a pathway; you start at its first molecule.|Choisissez une voie ; vous commencez à sa première molécule.|Wähle einen Weg; du beginnst beim ersten Molekül.",
  "Each question asks for the next molecule, the enzyme, or what else goes in or out (ATP, NADH, CO₂…). Tap one of the options.|Chaque question demande la molécule suivante, l'enzyme ou ce qui entre ou sort en plus (ATP, NADH, CO₂…). Touchez une option.|Jede Frage will das nächste Molekül, das Enzym oder was sonst rein- oder rausgeht (ATP, NADH, CO₂ …). Tippe eine Option an.",
  "The full step is shown after each answer; press Next to move one step down the pathway.|L'étape complète s'affiche après chaque réponse ; Suivant fait avancer d'une étape.|Nach jeder Antwort siehst du den ganzen Schritt; Weiter geht einen Schritt weiter.",
  "At the end you get your score for the whole walk: Restart or Another pathway.|À la fin, vous obtenez le score du parcours : Recommencer ou Autre voie.|Am Ende siehst du den Punktestand für den ganzen Weg: Neu starten oder Anderer Weg."],
 tip:"Say the step out loud before you look at the options.|Dites l'étape à voix haute avant de regarder les options.|Sag den Schritt laut, bevor du die Optionen ansiehst."},
{id:'organs', s:["Read the statement (for example “Produces ketone bodies”).|Lisez l'énoncé (par exemple « Produit les corps cétoniques »).|Lies die Aussage (z. B. „Bildet Ketonkörper“).",
  "Tap every organ it applies to – there can be more than one.|Touchez chaque organe concerné – il peut y en avoir plusieurs.|Tippe alle passenden Organe an – es können mehrere sein.",
  "Press Check: you see the correct organs and why.|Appuyez sur Vérifier : vous voyez les bons organes et pourquoi.|Tippe auf Prüfen: Du siehst die richtigen Organe und warum."],
 tip:"Think of each organ's equipment: mitochondria, glucose-6-phosphatase, GLUT4, SCOT.|Pensez à l'équipement de chaque organe : mitochondries, glucose-6-phosphatase, GLUT4, SCOT.|Denk an die Ausrüstung jedes Organs: Mitochondrien, Glucose-6-Phosphatase, GLUT4, SCOT."},
{id:'hormones', s:["Choose a tab at the top.|Choisissez un onglet en haut.|Wähle oben einen Reiter."],
 m:[["Effect matrix|Matrice des effets|Wirkungsmatrix", "Pick a hormone, then set every pathway to ↑, ↓ or – and press Check.|Choisissez une hormone, réglez chaque voie sur ↑, ↓ ou – puis Vérifier.|Wähle ein Hormon, stell jeden Weg auf ↑, ↓ oder – und tippe auf Prüfen."],
  ["Mechanisms|Mécanismes|Mechanismen", "Multiple-choice questions about receptors, second messengers and enzymes.|QCM sur récepteurs, seconds messagers et enzymes.|Multiple-Choice-Fragen zu Rezeptoren, Second Messengern und Enzymen."],
  ["Phosphorylation switch|Interrupteur de phosphorylation|Phosphorylierungsschalter", "Decide whether an enzyme is active when phosphorylated or when dephosphorylated.|Décider si une enzyme est active phosphorylée ou déphosphorylée.|Entscheide, ob ein Enzym phosphoryliert oder dephosphoryliert aktiv ist."]],
 tip:"Glucagon/adrenaline → PKA → phosphorylation: catabolic enzymes on, synthetic enzymes off. Insulin does the opposite.|Glucagon/adrénaline → PKA → phosphorylation : enzymes cataboliques activées, enzymes de synthèse inhibées. L'insuline fait l'inverse.|Glukagon/Adrenalin → PKA → Phosphorylierung: abbauende Enzyme an, aufbauende aus. Insulin macht das Gegenteil."},
{id:'switching', s:["Choose a tab at the top.|Choisissez un onglet en haut.|Wähle oben einen Reiter."],
 m:[["Identify the state|Identifier l'état|Zustand erkennen", "Read the clues (hormones, fuels, blood values) and choose fed, fasting, starvation, sprint or endurance.|Lisez les indices (hormones, carburants, valeurs sanguines) et choisissez nourri, jeûne, inanition, sprint ou endurance.|Lies die Hinweise (Hormone, Brennstoffe, Blutwerte) und wähle gefüttert, Fasten, Hungern, Sprint oder Ausdauer."],
  ["Put in order|Mettre en ordre|In Reihenfolge", "Choose a timeline and tap the event blocks in the order they happen, then Check.|Choisissez une chronologie et touchez les blocs d'événements dans l'ordre, puis Vérifier.|Wähle einen Zeitverlauf, tippe die Ereignis-Blöcke in Reihenfolge an, dann Prüfen."]]},
{id:'enzymes', s:["Choose a question type and a category (or keep “any”).|Choisissez un type de question et une catégorie (ou gardez « tous »).|Wähle Fragetyp und Kategorie (oder lass „alle“).",
  "Answer the multiple-choice question and press Next.|Répondez au QCM et appuyez sur Suivant.|Beantworte die Multiple-Choice-Frage und tippe auf Weiter."],
 m:[["Types|Types|Typen", "Reaction → enzyme, enzyme → reaction, activators & inhibitors, cofactors, deficiencies & drugs, rate-limiting enzymes, cell location.|Réaction → enzyme, enzyme → réaction, activateurs et inhibiteurs, cofacteurs, déficits et médicaments, enzymes limitantes, localisation.|Reaktion → Enzym, Enzym → Reaktion, Aktivatoren & Hemmer, Cofaktoren, Defekte & Medikamente, Schrittmacherenzyme, Ort in der Zelle."]],
 tip:"Use the enzyme name: kinase adds phosphate, dehydrogenase makes NADH, carboxylase adds CO₂ (biotin).|Servez-vous du nom : kinase ajoute un phosphate, déshydrogénase fait du NADH, carboxylase ajoute du CO₂ (biotine).|Nutze den Namen: Kinase hängt Phosphat an, Dehydrogenase macht NADH, Carboxylase hängt CO₂ an (Biotin)."},
{id:'missing', s:["Choose a pathway and what is hidden (molecules, enzymes or both).|Choisissez une voie et ce qui est caché (molécules, enzymes ou les deux).|Wähle einen Weg und was versteckt ist (Moleküle, Enzyme oder beides).",
  "For each gap in the map, choose the answer in its drop-down list.|Pour chaque trou de la carte, choisissez la réponse dans sa liste.|Wähle für jede Lücke in der Karte die Antwort in der Liste.",
  "Press Check when every gap is filled; wrong gaps show the right answer.|Appuyez sur Vérifier quand tout est rempli ; les trous faux montrent la bonne réponse.|Tippe auf Prüfen, wenn alles ausgefüllt ist; falsche Lücken zeigen die richtige Antwort."],
 tip:"The neighbours of a gap (molecule before, enzyme, side reactants) tell you what is missing.|Les voisins d'un trou (molécule d'avant, enzyme, réactifs) indiquent ce qui manque.|Die Nachbarn einer Lücke (Molekül davor, Enzym, Nebenstoffe) verraten, was fehlt."},
{id:'cases', s:["Choose a tab at the top.|Choisissez un onglet en haut.|Wähle oben einen Reiter."],
 m:[["Cases|Cas|Fälle", "Read the vignette, then answer its questions one after another; each answer is explained. Pick a case from the list or go through them in order.|Lisez la vignette puis répondez à ses questions l'une après l'autre ; chaque réponse est expliquée. Choisissez un cas dans la liste ou suivez l'ordre.|Lies den Fall und beantworte die Fragen nacheinander; jede Antwort wird erklärt. Wähle einen Fall aus der Liste oder geh der Reihe nach."],
  ["Disease matcher|Associer les maladies|Krankheiten zuordnen", "Match a disorder to its features or to its missing enzyme. Filter by group (storage, urea cycle, fatty acids, amino acids…).|Associer une maladie à ses signes ou à l'enzyme déficiente. Filtrer par groupe (surcharge, cycle de l'urée, acides gras, acides aminés…).|Ordne eine Krankheit ihren Merkmalen oder dem fehlenden Enzym zu. Filter nach Gruppe (Speicher, Harnstoffzyklus, Fettsäuren, Aminosäuren …)."]]},
{id:'energy', s:["Choose ATP values (modern 2.5/1.5 or classic 3/2) and a category.|Choisissez les valeurs d'ATP (modernes 2,5/1,5 ou classiques 3/2) et une catégorie.|Wähle ATP-Werte (modern 2,5/1,5 oder klassisch 3/2) und eine Kategorie.",
  "Type the number into the box and press Check (a comma or a point both work).|Tapez le nombre et appuyez sur Vérifier (virgule ou point acceptés).|Tippe die Zahl ein und tippe auf Prüfen (Komma oder Punkt gehen beide).",
  "The answer comes with a table that adds up every step.|La réponse s'accompagne d'un tableau qui additionne chaque étape.|Die Antwort kommt mit einer Tabelle, die jeden Schritt addiert."],
 tip:"Count NADH and FADH₂ first, then multiply; remember activation costs (−2 ATP for fatty acids).|Comptez d'abord NADH et FADH₂, puis multipliez ; n'oubliez pas le coût d'activation (−2 ATP pour les acides gras).|Zähl erst NADH und FADH₂, dann multiplizieren; denk an die Aktivierungskosten (−2 ATP bei Fettsäuren)."},
{id:'diagrams', s:["Overview: a map of central metabolism (glucose-6-phosphate, pyruvate, acetyl-CoA). Tap any underlined pathway name to open its diagram.|Vue d'ensemble : une carte du métabolisme central (glucose-6-phosphate, pyruvate, acétyl-CoA). Touchez un nom de voie souligné pour ouvrir son schéma.|Übersicht: eine Karte des zentralen Stoffwechsels (Glucose-6-phosphat, Pyruvat, Acetyl-CoA). Tippe auf einen unterstrichenen Wegnamen, um sein Diagramm zu öffnen.",
  "Choose a pathway (or Random).|Choisissez une voie (ou Au hasard).|Wähle einen Weg (oder Zufall).",
  "Study: the whole diagram is shown. Tap any purple enzyme box to read what that step does in simple words.|Étudier : tout le schéma est affiché. Touchez une case violette d'enzyme pour lire ce que fait l'étape.|Lernen: Das ganze Diagramm ist sichtbar. Tippe auf ein lila Enzym-Kästchen, um den Schritt einfach erklärt zu lesen.",
  "Test: some boxes become numbered ? gaps. Tap a gap, then tap its label in the word bank below (the bank has a few wrong labels too).|Test : certaines cases deviennent des trous ? numérotés. Touchez un trou, puis son étiquette dans la banque de mots (qui contient aussi des intrus).|Test: Einige Kästchen werden zu nummerierten ?-Lücken. Tippe auf eine Lücke, dann auf ihre Beschriftung in der Wortbank (mit ein paar falschen).",
  "Tap a filled gap to change it. Press Check when all gaps are full.|Touchez un trou rempli pour le changer. Vérifier quand tout est rempli.|Tippe eine gefüllte Lücke an, um sie zu ändern. Prüfen, wenn alle voll sind."],
 m:[["Molecules / Enzymes / Mixed|Molécules / Enzymes / Mixte|Moleküle / Enzyme / Gemischt", "What gets hidden.|Ce qui est caché.|Was versteckt wird."],
  ["3 / 5 / All|3 / 5 / Tous|3 / 5 / Alle", "Number of gaps; “All” blanks every box of that kind.|Nombre de trous ; « Tous » vide toutes les cases de ce type.|Zahl der Lücken; „Alle“ leert jedes Kästchen dieser Art."],
  ["Reading the diagram|Lire le schéma|Diagramm lesen", "Thick arrow = irreversible, ⏱ = rate-limiting, grey text = what else goes in or out. Cycles are drawn as loops; wide diagrams scroll sideways on a phone.|Flèche épaisse = irréversible, ⏱ = limitante, texte gris = ce qui entre ou sort. Les cycles sont dessinés en boucle ; les grands schémas défilent latéralement sur téléphone.|Dicker Pfeil = irreversibel, ⏱ = geschwindigkeitsbestimmend, graue Schrift = was sonst rein/raus geht. Zyklen sind Schleifen; breite Diagramme scrollen am Handy seitlich."]],
 tip:"Study a pathway first, then press “Test me on this” to practise the same diagram.|Étudiez d'abord une voie, puis appuyez sur « Me tester dessus » pour vous entraîner sur le même schéma.|Lerne zuerst einen Weg und tippe dann auf „Teste mich“, um dasselbe Diagramm zu üben."},
{id:'organmap', s:["Organ maps tab: choose a map (fed state, fasting, starvation, Cori cycle, glucose–alanine, nitrogen, lipoproteins, ketones, bilirubin).|Onglet Cartes des organes : choisissez une carte (état nourri, jeûne, inanition, cycle de Cori, glucose–alanine, azote, lipoprotéines, cétones, bilirubine).|Reiter Organkarten: Wähle eine Karte (gefüttert, Fasten, Hungern, Cori-Zyklus, Glucose-Alanin, Stickstoff, Lipoproteine, Ketone, Bilirubin).",
  "Study shows the complete map and a plain-language summary. The red band in the middle is the blood; arrows show what travels between organs.|Étudier montre la carte complète et un résumé simple. La bande rouge au milieu est le sang ; les flèches montrent ce qui circule entre organes.|Lernen zeigt die ganze Karte und eine einfache Zusammenfassung. Das rote Band in der Mitte ist das Blut; Pfeile zeigen, was zwischen Organen wandert.",
  "Gaps: tap a ? box, then its label in the word bank; press Check.|Trous : touchez une case ?, puis son étiquette dans la banque ; Vérifier.|Lücken: Tippe ein ?-Kästchen an, dann seine Beschriftung in der Wortbank; Prüfen.",
  "Body map tab: read the description, tap every organ on the body that fits (tap again to remove), then Check.|Onglet Carte du corps : lisez la description, touchez chaque organe qui convient (retouchez pour retirer), puis Vérifier.|Reiter Körperkarte: Lies die Beschreibung, tippe alle passenden Organe an (nochmal tippen zum Entfernen), dann Prüfen."],
 m:[["Body map colours|Couleurs de la carte du corps|Farben der Körperkarte", "Green = correct, red = wrongly chosen, dashed green = missed, green outline = also acceptable.|Vert = juste, rouge = choisi à tort, vert pointillé = oublié, contour vert = aussi accepté.|Grün = richtig, rot = falsch gewählt, grün gestrichelt = vergessen, grüner Rand = auch richtig."]],
 tip:"Ask in each gap: which organ am I in, and what does the next organ need?|Pour chaque trou : dans quel organe suis-je, et de quoi l'organe suivant a-t-il besoin ?|Frag dich bei jeder Lücke: In welchem Organ bin ich, und was braucht das nächste Organ?"},

/* ---------- biochemistry & physiology (shared engine) ---------- */
{id:'structures', s:["Pick a topic (or all topics).|Choisissez un thème (ou tous).|Wähle ein Thema (oder alle).",
  "Build: choose every component (base, sugar, phosphate, fatty acid, bond…) and press Check.|Construire : choisissez chaque composant (base, sucre, phosphate, acide gras, liaison…) puis Vérifier.|Bauen: Wähle jeden Baustein (Base, Zucker, Phosphat, Fettsäure, Bindung …) und tippe auf Prüfen.",
  "Sort: put each amino acid or molecule in its group with the chips, then Check.|Trier : placez chaque acide aminé ou molécule dans son groupe avec les pastilles, puis Vérifier.|Sortieren: Ordne jede Aminosäure oder jedes Molekül mit den Knöpfen einer Gruppe zu, dann Prüfen.",
  "Question: choose one answer.|Question : choisissez une réponse.|Frage: Wähle eine Antwort."]},
{id:'kinetics', s:["Pick a topic: graphs, calculations or concepts & drugs.|Choisissez un thème : graphiques, calculs ou concepts et médicaments.|Wähle ein Thema: Diagramme, Rechnungen oder Konzepte & Arzneistoffe.",
  "Graph questions: read Km, Vmax or the inhibition type from the plot, then choose the answer.|Questions graphiques : lisez Km, Vmax ou le type d'inhibition sur la courbe, puis choisissez.|Diagrammfragen: Lies Km, Vmax oder den Hemmtyp ab und wähle die Antwort.",
  "Calculations: type the number (unit shown next to the box) and press Check; the worked steps appear.|Calculs : tapez le nombre (unité à côté) et Vérifier ; les étapes détaillées s'affichent.|Rechnungen: Zahl eintippen (Einheit daneben) und Prüfen; der Rechenweg erscheint."],
 tip:"Lineweaver–Burk: y-intercept = 1/Vmax, x-intercept = −1/Km.|Lineweaver–Burk : ordonnée à l'origine = 1/Vmax, abscisse = −1/Km.|Lineweaver-Burk: y-Achsenabschnitt = 1/Vmax, x-Achsenabschnitt = −1/Km."},
{id:'buffers', s:["Pick a topic: calculations, titration curves, net charge or concepts.|Choisissez un thème : calculs, courbes de titrage, charge nette ou concepts.|Wähle ein Thema: Rechnungen, Titrationskurven, Nettoladung oder Konzepte.",
  "Type numeric answers (pH, pI, ratio, charge) or choose from the options; press Check.|Tapez les réponses numériques (pH, pI, rapport, charge) ou choisissez une option ; Vérifier.|Gib Zahlen ein (pH, pI, Verhältnis, Ladung) oder wähle eine Option; Prüfen.",
  "The solution shows each step of the Henderson–Hasselbalch reasoning.|La solution montre chaque étape du raisonnement de Henderson–Hasselbalch.|Die Lösung zeigt jeden Schritt der Henderson-Hasselbalch-Überlegung."],
 tip:"pH below pKa → protonated form dominates; above pKa → deprotonated.|pH sous le pKa → forme protonée majoritaire ; au-dessus → forme déprotonée.|pH unter pKa → protonierte Form überwiegt; darüber → deprotonierte."},
{id:'proteins', s:["Pick a topic (structural levels, folding & processing, collagen, haemoglobin…).|Choisissez un thème (niveaux de structure, repliement, collagène, hémoglobine…).|Wähle ein Thema (Strukturebenen, Faltung, Kollagen, Hämoglobin …).",
  "Sort bonds and features into primary, secondary, tertiary or quaternary structure, or answer the question; press Check.|Classez liaisons et caractéristiques en structure primaire, secondaire, tertiaire ou quaternaire, ou répondez ; Vérifier.|Ordne Bindungen und Merkmale Primär-, Sekundär-, Tertiär- oder Quartärstruktur zu oder beantworte die Frage; Prüfen.",
  "Sequence items: tap the steps (for example collagen synthesis) in order.|Séquences : touchez les étapes (par ex. synthèse du collagène) dans l'ordre.|Reihenfolgen: Tippe die Schritte (z. B. Kollagensynthese) in Reihenfolge an."]},
{id:'molecules', s:["Quiz view: choose a group of molecules and a drawing style (skeletal, or with every C and H).|Vue Quiz : choisissez un groupe de molécules et un style de dessin (squelettique, ou avec tous les C et H).|Quiz-Ansicht: Wähle eine Molekülgruppe und einen Zeichenstil (Skelett oder mit allen C und H).",
  "Questions ask name ↔ structure, pathway role, net charge at pH 7.4, functional groups or “what changed?” between two molecules.|Les questions portent sur nom ↔ structure, rôle dans une voie, charge nette à pH 7,4, groupes fonctionnels ou « qu'est-ce qui a changé ? » entre deux molécules.|Fragen zu Name ↔ Struktur, Rolle im Stoffwechsel, Nettoladung bei pH 7,4, funktionellen Gruppen oder „Was hat sich verändert?“ zwischen zwei Molekülen.",
  "Atlas view: browse every structure; tap one to see it large, then tap a functional group to highlight it.|Vue Atlas : parcourez toutes les structures ; touchez-en une pour l'agrandir, puis un groupe fonctionnel pour le surligner.|Atlas-Ansicht: Alle Strukturen durchsehen; eine antippen für die Großansicht, dann eine funktionelle Gruppe antippen zum Hervorheben."],
 tip:"Wedge = bond toward you, hashed = bond away from you.|Coin plein = liaison vers vous, hachuré = liaison vers l'arrière.|Keil = Bindung zu dir, gestrichelt = Bindung von dir weg."},
{id:'whatif', s:["Pick a topic (cardiovascular, renal, respiration…).|Choisissez un thème (cardiovasculaire, rénal, respiration…).|Wähle ein Thema (Herz-Kreislauf, Niere, Atmung …).",
  "Predict: for each variable tap ↑ (increases), ↓ (decreases) or – (no change), then Check.|Prédire : pour chaque variable, touchez ↑ (augmente), ↓ (diminue) ou – (pas de changement), puis Vérifier.|Vorhersagen: Tippe für jede Größe ↑ (steigt), ↓ (sinkt) oder – (keine Änderung), dann Prüfen.",
  "Sequence: tap the steps of the reflex or cascade in order.|Séquence : touchez les étapes du réflexe ou de la cascade dans l'ordre.|Reihenfolge: Tippe die Schritte des Reflexes oder der Kaskade in Reihenfolge an."],
 tip:"Follow the chain: first the direct effect, then the body's correction.|Suivez la chaîne : d'abord l'effet direct, puis la correction de l'organisme.|Folge der Kette: erst die direkte Wirkung, dann die Gegenregulation."},
{id:'graphs', s:["Pick a topic (O₂–haemoglobin, pressure–volume loops, action potentials, clearance).|Choisissez un thème (O₂–hémoglobine, boucles pression–volume, potentiels d'action, clairance).|Wähle ein Thema (O₂-Hämoglobin, Druck-Volumen-Schleifen, Aktionspotentiale, Clearance).",
  "Look at the graph: the dashed or coloured curve shows what changed. Choose the cause or the effect.|Regardez le graphique : la courbe pointillée ou colorée montre ce qui a changé. Choisissez la cause ou l'effet.|Sieh dir das Diagramm an: Die gestrichelte oder farbige Kurve zeigt die Änderung. Wähle Ursache oder Wirkung."],
 tip:"Right shift of the O₂ curve = CADET face right: CO₂, acid, 2,3-BPG, exercise, temperature.|Déplacement à droite de la courbe O₂ = CO₂, acide, 2,3-BPG, effort, température.|Rechtsverschiebung der O₂-Kurve = CO₂, Säure, 2,3-BPG, Belastung, Temperatur."},
{id:'physcalc', s:["Pick a topic (cardiovascular, renal, respiration, acid–base & membranes).|Choisissez un thème (cardiovasculaire, rénal, respiration, acide–base et membranes).|Wähle ein Thema (Herz-Kreislauf, Niere, Atmung, Säure-Base & Membranen).",
  "Type the result in the unit shown and press Check; small rounding differences are accepted.|Tapez le résultat dans l'unité indiquée et Vérifier ; les petits écarts d'arrondi sont acceptés.|Gib das Ergebnis in der angegebenen Einheit ein und Prüfen; kleine Rundungsunterschiede werden akzeptiert.",
  "The answer shows the formula and each calculation step.|La réponse montre la formule et chaque étape de calcul.|Die Antwort zeigt Formel und jeden Rechenschritt."]},
{id:'compare', s:["Pick a topic (muscle, cardiovascular & blood, respiration, renal & endocrine…).|Choisissez un thème (muscle, cardiovasculaire et sang, respiration, rein et endocrinien…).|Wähle ein Thema (Muskel, Herz-Kreislauf & Blut, Atmung, Niere & Hormone …).",
  "Fill every cell of the table with its drop-down list, then press Check.|Remplissez chaque cellule du tableau avec sa liste, puis Vérifier.|Fülle jede Tabellenzelle über ihre Liste aus, dann Prüfen.",
  "Wrong cells show the correct value next to them.|Les cellules fausses affichent la bonne valeur à côté.|Falsche Zellen zeigen daneben den richtigen Wert."]},

/* ---------- tools ---------- */
{id:'review', g:'tools', ico:'🔁', t:"Review (mistakes bank)|Révision (banque d'erreurs)|Wiederholen (Fehlerbank)",
 w:"Every wrong answer in any drill is saved exactly as you saw it and comes back after 1, 3, 7, 14 and 30 days (spaced repetition).|Chaque mauvaise réponse est enregistrée telle que vous l'avez vue et revient après 1, 3, 7, 14 et 30 jours (répétition espacée).|Jede falsche Antwort wird genau so gespeichert, wie du sie gesehen hast, und kommt nach 1, 3, 7, 14 und 30 Tagen wieder (verteiltes Wiederholen).",
 s:["Open Review in the bottom bar (phone) or sidebar (computer). The badge shows how many cards are due.|Ouvrez Révision dans la barre du bas (téléphone) ou la barre latérale (ordinateur). Le badge indique le nombre de cartes dues.|Öffne Wiederholen in der unteren Leiste (Handy) oder der Seitenleiste (Computer). Das Abzeichen zeigt fällige Karten.",
  "Press “Review due” and answer each card as usual. Right → it moves to the next interval; wrong → it comes back at the end of the session and starts over.|Appuyez sur « Réviser » et répondez comme d'habitude. Juste → intervalle suivant ; faux → revient en fin de session et recommence.|Tippe auf „Fällige wiederholen“ und antworte wie gewohnt. Richtig → nächstes Intervall; falsch → kommt am Ende der Runde wieder und beginnt neu.",
  "After the 30-day review a card counts as mastered. You can also practise all mistakes of one drill, or remove single cards.|Après la révision à 30 jours, la carte est maîtrisée. Vous pouvez aussi travailler toutes les erreurs d'un exercice ou supprimer une carte.|Nach der 30-Tage-Wiederholung gilt eine Karte als gemeistert. Du kannst auch alle Fehler einer Übung üben oder einzelne Karten entfernen."],
 go:'review'},
{id:'settings', g:'tools', ico:'⚙', t:"Settings|Réglages|Einstellungen",
 w:"Make the app comfortable to use.|Rendre l'application confortable.|Die App bequem einstellen.",
 s:["Language: English, Français or Deutsch (also EN/FR/DE in the header).|Langue : English, Français ou Deutsch (aussi EN/FR/DE dans l'en-tête).|Sprache: English, Français oder Deutsch (auch EN/FR/DE oben).",
  "Text size, theme (auto/light/dark), card or compact layout, daily goal, vibration and keyboard hints.|Taille du texte, thème (auto/clair/sombre), disposition cartes ou compacte, objectif du jour, vibration et aides clavier.|Textgröße, Design (auto/hell/dunkel), Karten- oder kompaktes Layout, Tagesziel, Vibration und Tastaturhinweise.",
  "Reset all scores (tap twice to confirm) and the list of keyboard shortcuts.|Réinitialiser tous les scores (toucher deux fois) et la liste des raccourcis clavier.|Alle Punkte zurücksetzen (zweimal tippen) und die Liste der Tastenkürzel."],
 go:'settings'},
{id:'sync', g:'tools', ico:'⇅', need:'sync', t:"Offline, install & sync|Hors ligne, installation et synchronisation|Offline, Installation & Synchronisierung",
 w:"The app works without internet once it has been opened, can be installed like a normal app, and can sync your progress between devices.|L'application fonctionne sans internet après une première ouverture, s'installe comme une appli normale et peut synchroniser vos progrès entre appareils.|Die App läuft nach dem ersten Öffnen ohne Internet, lässt sich wie eine normale App installieren und kann deinen Fortschritt zwischen Geräten abgleichen.",
 s:["Install: in Chrome on Android use the Install button (or menu → Add to home screen); on iPhone use Share → Add to Home Screen.|Installer : dans Chrome sur Android, bouton Installer (ou menu → Ajouter à l'écran d'accueil) ; sur iPhone, Partager → Sur l'écran d'accueil.|Installieren: In Chrome auf Android den Installieren-Knopf (oder Menü → Zum Startbildschirm); am iPhone Teilen → Zum Home-Bildschirm.",
  "Sync: open the Sync page, paste a GitHub token with Gist permission and connect. Each device keeps its own counters; totals are added up, so nothing is overwritten.|Synchro : ouvrez la page Synchronisation, collez un jeton GitHub avec la permission Gist et connectez-vous. Chaque appareil garde ses compteurs ; les totaux s'additionnent, rien n'est écrasé.|Sync: Öffne die Sync-Seite, füge ein GitHub-Token mit Gist-Recht ein und verbinde. Jedes Gerät hat eigene Zähler; Summen werden addiert, nichts wird überschrieben.",
  "No GitHub? Use Download progress file and Import / merge on the Sync page.|Pas de GitHub ? Utilisez Télécharger le fichier de progression et Importer / fusionner sur la page Synchronisation.|Kein GitHub? Nutze auf der Sync-Seite Fortschrittsdatei herunterladen und Importieren / zusammenführen.",
  "When an update arrives, the app shows “A new version is ready – Reload”.|Quand une mise à jour arrive, l'application affiche « Une nouvelle version est prête – Recharger ».|Kommt ein Update, zeigt die App „Eine neue Version ist bereit – Neu laden“."],
 go:'sync'},
{id:'library', g:'tools', ico:'📚', t:"Pathway library|Bibliothèque des voies|Stoffwechsel-Bibliothek",
 w:"At the bottom of the home page every pathway is listed by category.|En bas de la page d'accueil, chaque voie est listée par catégorie.|Unten auf der Startseite sind alle Wege nach Kategorie aufgelistet.",
 s:["Tap a pathway to open it in Pathway reconstruction with its map shown.|Touchez une voie pour l'ouvrir dans Reconstitution des voies avec sa carte.|Tippe einen Weg an, um ihn in Wege rekonstruieren mit Karte zu öffnen.",
  "To see it as a drawn diagram, open Pathway diagrams and choose it in the list.|Pour la voir en schéma dessiné, ouvrez Schémas des voies et choisissez-la dans la liste.|Als gezeichnetes Diagramm: Öffne Stoffwechsel-Diagramme und wähle ihn in der Liste."]}
];
const MANW = MAN.reduce((o, x) => (o[x.id] = x, o), {});
let MAN_TARGET = null;
function manTitle(x){ const d = DR.find(z => z.id === x.id); return d ? u(d.k + 't') : T(x.t); }
function manNum(x){ const d = DR.find(z => z.id === x.id); return d ? (typeof d.n === 'number' ? String(d.n).padStart(2, '0') : d.n) : (x.ico || '•'); }
function manItems(){ return MAN.filter(x => !x.need || EXTRA_VIEWS[x.need]).filter(x => !(!x.g && !DR.some(d => d.id === x.id))); }
function manGroups(){
  const items = manItems(), drillGroup = x => { const d = DR.find(z => z.id === x.id); return d ? (d.g || 'met') : null; };
  const grps = [['start', 'manGrpStart', items.filter(x => x.g === 'start')]];
  (typeof GRPS !== 'undefined' ? GRPS : [['met', 'grpMet'], ['bio', 'grpBio'], ['phy', 'grpPhy']]).forEach(g => {
    const list = items.filter(x => drillGroup(x) === g[0]).sort((a, b) => String(manNum(a)).localeCompare(String(manNum(b)), undefined, {numeric:true}));
    if (list.length) grps.push([g[0], g[1], list]); });
  grps.push(['tools', 'manGrpTools', items.filter(x => x.g === 'tools')]);
  return grps;
}
function manSection(x){
  const d = DR.find(z => z.id === x.id), open = MAN_TARGET === x.id;
  let h = `<details class="man" id="man-${x.id}"${open ? ' open' : ''}><summary><span class="mannum">${esc(manNum(x))}</span><span class="mant">${esc(manTitle(x))}</span></summary><div class="manbody">`;
  h += `<h4>${u('manWhat')}</h4><p>${esc(d ? u(d.k + 'd') : T(x.w))}</p>`;
  if (x.s && x.s.length) h += `<h4>${u('manHow')}</h4><ol class="mansteps">${x.s.map(s => `<li>${esc(T(s))}</li>`).join('')}</ol>`;
  if (x.m && x.m.length) h += `<h4>${u('manOpt')}</h4><dl class="manopts">${x.m.map(m => `<dt>${esc(T(m[0]))}</dt><dd>${esc(T(m[1]))}</dd>`).join('')}</dl>`;
  if (x.tip) h += `<p class="mantip"><strong>💡 ${u('manTip')}:</strong> ${esc(T(x.tip))}</p>`;
  const go = d ? d.id : x.go; if (go && (d || EXTRA_VIEWS[go])) h += `<div class="actions"><a class="btn primary" href="#${go}">${d ? u('manOpen') : u('manGo')}</a></div>`;
  return h + `</div></details>`;
}
EXTRA_VIEWS.manual = function(){
  document.title = u('manT');
  const G = manGroups();
  let h = `<div class="dhead"><a class="backlink" href="#home">← ${u('back')}</a><div class="dtitle"><span class="tnum">📖</span><h1>${u('manT')}</h1></div><p class="ddesc">${u('manD')}</p></div>`;
  h += `<nav class="manjump" aria-label="${esc(u('manT'))}">` + G.map(g => `<button type="button" class="libchip" data-act="manjump" data-v="mang-${g[0]}">${u(g[1])}</button>`).join('')
    + `<button type="button" class="libchip" data-act="manall" data-v="1">${u('manAll')}</button><button type="button" class="libchip" data-act="manall" data-v="0">${u('manNone')}</button></nav>`;
  G.forEach(g => { h += `<h2 class="grp mang" id="mang-${g[0]}">${u(g[1])}</h2><div class="manlist">` + g[2].map(manSection).join('') + `</div>`; });
  if (MAN_TARGET){ const t = MAN_TARGET; MAN_TARGET = null;
    setTimeout(() => { const el = document.getElementById('man-' + t); if (el){ el.open = true; el.scrollIntoView({block:'start'}); } }, 30); }
  return h;
};
Object.assign(A, {
  manopen(el){ MAN_TARGET = el.dataset.v || null; goTo('manual'); },
  manjump(el){ const t = document.getElementById(el.dataset.v); if (t) t.scrollIntoView({behavior:'smooth', block:'start'}); },
  manall(el){ document.querySelectorAll('details.man').forEach(d => d.open = el.dataset.v === '1'); }
});
/* "How it works" button on every drill page and on review/settings/sync */
(function(){
  const _r = render;
  render = function(){ _r();
    if (typeof document === 'undefined') return;
    const id = DR.some(d => d.id === VIEW) ? VIEW : (MANW[VIEW] ? VIEW : null);
    const dh = id && document.querySelector('#main .dhead .dtitle');
    if (dh && !dh.querySelector('.manbtn')) dh.insertAdjacentHTML('beforeend', `<button type="button" class="manbtn" data-act="manopen" data-v="${id}" title="${esc(u('manBtn'))}"><span aria-hidden="true">?</span><span class="manbl">${u('manBtn')}</span></button>`);
    const side = document.getElementById('side');
    if (side && !side.querySelector('.sman')){ const f = side.querySelector('.sfoot');
      const a = `<a class="sitem sman${VIEW === 'manual' ? ' cur' : ''}" href="#manual"><span class="snum">📖</span><span class="sname">${u('manT')}</span></a>`;
      if (f) f.insertAdjacentHTML('afterbegin', a); else side.insertAdjacentHTML('beforeend', a); }
  };
})();
(function(){ const _h = renderHome;
  renderHome = function(){ const h = _h(), link = `<p class="manhome"><a href="#manual">📖 ${u('manHome')} →</a></p>`;
    const i = h.indexOf('<section class="intro">'); return i >= 0 ? h.slice(0, i) + link + h.slice(i) : link + h; };
})();
if (EXTRA_VIEWS.settings){ const _s = EXTRA_VIEWS.settings; EXTRA_VIEWS.settings = function(){ return _s() + `<div class="card setlist"><h3>📖 ${u('manT')}</h3><p>${u('manD')}</p><p><a class="btn" href="#manual">${u('manT')} →</a></p></div>`; }; }
if (typeof document !== 'undefined') document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return; const tn = e.target && e.target.tagName;
  if (tn === 'INPUT' || tn === 'SELECT' || tn === 'TEXTAREA') return;
  if (e.key === 'm' || e.key === 'M'){ e.preventDefault(); MAN_TARGET = DR.some(d => d.id === VIEW) ? VIEW : null; goTo('manual'); }
});
if (typeof goTo === 'undefined'){ window.goTo = id => { if (location.hash === '#' + id) render(); else location.hash = id; }; }
