# Databricks DEA — Application d'entraînement

Application web d'entraînement à la certification **Databricks Certified Data Engineer Associate**.
Elle réunit une **partie cours** (tout le matériel organisé par section de l'Exam Guide) et une
**partie examen** (examens blancs avec correction immédiate, explication, et **renvoi direct vers la
leçon du cours** correspondante quand on se trompe).

L'application est **100 % statique** (HTML / CSS / JavaScript, sans serveur ni build) : elle peut être
hébergée gratuitement sur **GitHub Pages** et consultée depuis n'importe quel navigateur.

---

## Contenu

- **7 sections** alignées sur l'Exam Guide officiel (version du 4 mai 2026) et leurs pondérations :
  1. Databricks Data Intelligence Platform — 6 %
  2. Data Ingestion and Loading — 21 %
  3. Data Transformation and Modeling — 22 %
  4. Working with Lakeflow Jobs — 16 %
  5. Implementing CI/CD — 10 %
  6. Troubleshooting, Monitoring, and Optimization — 10 %
  7. Governance and Security — 15 %
- **49 leçons** détaillées (tableaux, exemples de code, encadrés), construites à partir de l'Exam Guide
  et des 4 supports de cours fournis (Lakeflow Connect, Lakeflow Jobs, Spark Declarative Pipelines,
  DevOps Essentials).
- **64 questions** d'entraînement réparties proportionnellement aux pondérations de l'examen. Chaque
  question est reliée à la leçon de cours à réviser.

> **À propos des questions** — Les questions sont **originales** afin de respecter le droit d'auteur des
> plateformes citées (Databricks Academy, Whizlabs, Udemy, ExamTopics, Tutorial Dojo). Seuls les **5
> exemples de questions** publiés dans l'Exam Guide officiel y sont reproduits. Il s'agit d'un outil de
> révision **non officiel**, sans affiliation avec Databricks.

---

## Utilisation en local

Aucune installation n'est nécessaire. Deux options :

- **Le plus simple** : double-cliquer sur `index.html` pour l'ouvrir dans le navigateur.
- **Recommandé** (évite toute restriction navigateur sur les fichiers locaux) : lancer un petit serveur
  local depuis le dossier du projet, puis ouvrir l'adresse indiquée :

  ```bash
  # Python 3
  python3 -m http.server 8000
  # puis ouvrir http://localhost:8000
  ```

---

## Déploiement sur GitHub Pages (lien internet public)

Le but : obtenir une URL du type `https://<votre-pseudo>.github.io/<nom-du-repo>/`.

### Étape 1 — Créer un dépôt
1. Se connecter sur [github.com](https://github.com) (créer un compte si besoin).
2. Cliquer sur **New repository**.
3. Donner un nom, par exemple `databricks-dea-trainer`.
4. Laisser le dépôt **Public**, puis **Create repository**.

### Étape 2 — Envoyer les fichiers
**Option A — via l'interface web (sans ligne de commande)**
1. Sur la page du dépôt, cliquer **Add file → Upload files**.
2. Glisser-déposer `index.html`, `README.md` et **le dossier `assets/` entier** (avec `data.js`,
   `app.js`, `styles.css`).
3. Cliquer **Commit changes**.

**Option B — via Git en ligne de commande**
```bash
cd chemin/vers/le/dossier        # dossier contenant index.html
git init
git add .
git commit -m "Application d'entraînement Databricks DEA"
git branch -M main
git remote add origin https://github.com/<votre-pseudo>/databricks-dea-trainer.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages
1. Dans le dépôt : **Settings → Pages**.
2. Sous **Build and deployment → Source**, choisir **Deploy from a branch**.
3. **Branch** : `main`, dossier `/ (root)`, puis **Save**.
4. Patienter ~1 minute. L'URL publique s'affiche en haut de la page Pages :
   `https://<votre-pseudo>.github.io/databricks-dea-trainer/`

Ce lien est partageable et utilisable hors de Claude, sur ordinateur comme sur mobile.

---

## Structure du projet

```
.
├── index.html          # Page unique : structure de l'interface
├── README.md           # Ce fichier
└── assets/
    ├── data.js         # Contenu : cours (COURSE) + questions (QUESTIONS)
    ├── app.js          # Logique : navigation, mode cours, mode examen, correction
    └── styles.css      # Thème et mise en page
```

---

## Étendre / modifier le contenu

Tout le contenu pédagogique vit dans **`assets/data.js`** ; aucune compilation n'est requise, il suffit
d'éditer le fichier et de re-pousser sur GitHub.

**Ajouter une question** — dupliquer un objet du tableau `QUESTIONS` :
```js
{
  id:  "q65",          // identifiant unique
  sid: "s3",           // section (s1 … s7)
  lid: "s3l4",         // leçon de révision liée (doit exister dans COURSE)
  q:   "Énoncé de la question ?",
  opts: ["Option A", "Option B", "Option C", "Option D"],
  a:   1,              // index (0-3) de la bonne réponse
  exp: "Explication affichée après réponse."
}
```
- `sid` doit correspondre à une section existante et `lid` à une leçon de cette section : c'est ce lien
  qui alimente le bouton **« Revoir »** affiché en cas d'erreur.
- `opts` doit contenir exactement 4 propositions ; `a` est l'index (0 à 3) de la bonne réponse.

**Ajouter / modifier une leçon** — éditer le tableau `COURSE` : chaque leçon est
`{ id, title, html }`, où `html` accepte du HTML riche (paragraphes, listes, `<pre><code>`, tableaux
`.tbl`, encadrés `.callout`).

---

*Outil de révision non officiel. Databricks et les noms de produits associés sont des marques de leurs
détenteurs respectifs.*
