/* ============================================================
   Databricks Certified Data Engineer Associate — Trainer
   Données : contenu de cours + banque de questions
   Source : supports Databricks Academy (Lakeflow Connect, Lakeflow
   Jobs, Spark Declarative Pipelines, DevOps Essentials) + Exam Guide
   (version du 4 mai 2026). Questions rédigées de façon originale.
   ============================================================ */

const COURSE = [
  /* ------------------------------------------------------------------ */
  {
    id: "s1",
    num: "01",
    weight: 6,
    title: "Plateforme Data Intelligence",
    subtitle: "Architecture, Delta Lake, Unity Catalog et compute",
    tier: "bronze",
    lessons: [
      {
        id: "s1l1",
        title: "Architecture de la plateforme & Lakeflow",
        html: `
<p>La <strong>Databricks Data Intelligence Platform</strong> unifie l'ingénierie de données, l'analytique et l'IA sur une seule plateforme. Elle repose sur quatre couches :</p>
<ul>
  <li><strong>Stockage optimisé</strong> — Delta Lake (et Iceberg) sur le stockage objet cloud.</li>
  <li><strong>Gouvernance unifiée</strong> — Unity Catalog.</li>
  <li><strong>Moteur de traitement</strong> — Apache Spark + Structured Streaming, accéléré par <strong>Photon</strong>.</li>
  <li><strong>Lakeflow</strong> — la couche d'ingénierie de données unifiée.</li>
</ul>
<p><strong>Lakeflow</strong> se compose de trois piliers :</p>
<div class="cards-3">
  <div class="mini-card"><h4>Lakeflow Connect</h4><p>Connecteurs d'ingestion efficaces depuis des sources variées.</p></div>
  <div class="mini-card"><h4>Lakeflow Spark Declarative Pipelines</h4><p>Développement ETL accéléré (anciennement DLT).</p></div>
  <div class="mini-card"><h4>Lakeflow Jobs</h4><p>Orchestration fiable pour l'analytique et l'IA (anciennement Workflows).</p></div>
</div>
<div class="callout"><strong>À retenir :</strong> trois renommages clés pour l'examen — <em>DLT → Spark Declarative Pipelines</em>, <em>Workflows → Lakeflow Jobs</em>, <em>Databricks Asset Bundles → Declarative Automation Bundles</em>.</div>
`
      },
      {
        id: "s1l2",
        title: "Delta Lake",
        html: `
<p><strong>Delta Lake</strong> est un protocole open-source de lecture/écriture de fichiers sur le stockage cloud. Une table Delta est constituée de :</p>
<ul>
  <li>des fichiers de données au format <strong>Parquet</strong> (<code>...snappy.parquet</code>) dans un répertoire ;</li>
  <li>un journal de transactions <strong><code>_delta_log/</code></strong> contenant les métadonnées (<code>0000.json</code>, <code>0001.json</code>...).</li>
</ul>
<p>Fonctionnalités clés :</p>
<ul>
  <li><strong>Transactions ACID</strong> — fiabilité des écritures concurrentes.</li>
  <li><strong>Time Travel</strong> — interroger une version antérieure pour audit ou rollback (<code>VERSION AS OF</code> / <code>TIMESTAMP AS OF</code>).</li>
  <li><strong>Schema Enforcement & Evolution</strong> — validation et évolution contrôlée du schéma.</li>
  <li><strong>DML</strong> — <code>UPDATE</code>, <code>DELETE</code>, <code>MERGE INTO</code>.</li>
</ul>
<div class="callout"><strong>Question type :</strong> pour des rollbacks fiables, des pistes d'audit réglementaires et une source unique de vérité pour l'IA et la BI → <strong>Delta Lake (ACID + Time Travel) gouverné par Unity Catalog</strong>.</div>
`
      },
      {
        id: "s1l3",
        title: "Unity Catalog",
        html: `
<p><strong>Unity Catalog (UC)</strong> est la couche de gouvernance unifiée : contrôle d'accès, lignage (lineage), audit et découverte des données, partagés entre tous les workspaces d'une région via un <strong>metastore</strong>.</p>
<p>Hiérarchie des objets (namespace à trois niveaux) :</p>
<pre><code>metastore
└── catalog
    └── schema (database)
        └── table / view / volume / function / model</code></pre>
<p>Une table se référence par <code>catalog.schema.table</code>. UC gère aussi les <strong>Volumes</strong> (fichiers non tabulaires) et applique masquage de colonnes, sécurité au niveau ligne et politiques ABAC.</p>
`
      },
      {
        id: "s1l4",
        title: "Architecture Médaillon (Bronze / Silver / Gold)",
        html: `
<p>L'architecture <strong>Médaillon</strong> (multi-hop) organise les données par niveaux de qualité croissants :</p>
<div class="medallion-row">
  <div class="med-tier bronze"><span class="badge">Bronze</span><p>Données brutes ingérées telles quelles (raw).</p></div>
  <div class="med-arrow">→</div>
  <div class="med-tier silver"><span class="badge">Silver</span><p>Données nettoyées, conformées, jointes.</p></div>
  <div class="med-arrow">→</div>
  <div class="med-tier gold"><span class="badge">Gold</span><p>Agrégats métier prêts pour BI, reporting, ML/IA.</p></div>
</div>
<p>Les consommateurs typiques de la couche Gold sont le BI & Reporting, le Streaming Analytics et le ML & IA.</p>
`
      },
      {
        id: "s1l5",
        title: "Services de compute et modèles de coût",
        html: `
<p>Le bon choix de compute dépend de l'usage, du coût et de la concurrence.</p>
<table class="tbl">
  <thead><tr><th>Type de compute</th><th>Usage idéal</th><th>Notes coût / perf</th></tr></thead>
  <tbody>
    <tr><td><strong>All-purpose / interactif</strong></td><td>Développement, exploration, analyse ad-hoc</td><td>Partageable entre utilisateurs ; <em>à éviter en production</em> (peu économique).</td></tr>
    <tr><td><strong>Job cluster</strong></td><td>Workflows ETL planifiés</td><td>~50 % moins cher (se termine à la fin du job) mais soumis au temps de démarrage du cloud.</td></tr>
    <tr><td><strong>Serverless</strong></td><td>Production simple, fiable</td><td>Démarrage rapide, autoscaling, Photon activé par défaut, TCO plus bas.</td></tr>
    <tr><td><strong>SQL Warehouse</strong></td><td>Requêtes SQL, dashboards, BI</td><td>Serverless par défaut ; haute concurrence + autoscaling via Intelligent Workload Management.</td></tr>
  </tbody>
</table>
<div class="callout"><strong>Question type :</strong> de nombreux analystes lancent des requêtes SQL ad-hoc toute la journée, démarrage rapide + multi-utilisateurs + coût maîtrisé → <strong>cluster high-concurrency avec autoscaling</strong> (ou un SQL Warehouse). Le <em>Performance optimized</em> serverless accélère le démarrage (vs mode économique ~4–6 min) pour les charges sensibles au temps.</div>
`
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "s2",
    num: "02",
    weight: 21,
    title: "Ingestion & chargement des données",
    subtitle: "Auto Loader, COPY INTO, Lakeflow Connect, JSON",
    tier: "bronze",
    lessons: [
      {
        id: "s2l1",
        title: "Patterns d'ingestion : batch, incrémental, streaming",
        html: `
<table class="tbl">
  <thead><tr><th>Pattern</th><th>Description</th><th>Méthodes</th></tr></thead>
  <tbody>
    <tr><td><strong>Batch</strong></td><td>Charge des lots de lignes, souvent planifié. Retraite <em>toutes</em> les données à chaque exécution.</td><td><code>CREATE TABLE AS</code>, <code>spark.read.load()</code></td></tr>
    <tr><td><strong>Batch incrémental</strong></td><td>Seules les <em>nouvelles</em> données sont ingérées ; les fichiers déjà chargés sont ignorés.</td><td><code>COPY INTO</code>, Auto Loader (trigger planifié), <code>CREATE OR REFRESH STREAMING TABLE</code></td></tr>
    <tr><td><strong>Streaming</strong></td><td>Chargement quasi temps réel en micro-batches fréquents.</td><td>Auto Loader (trigger continu), Declarative Pipelines (mode continu)</td></tr>
  </tbody>
</table>
`
      },
      {
        id: "s2l2",
        title: "CREATE TABLE AS (CTAS) & read_files()",
        html: `
<p><strong>CTAS</strong> crée par défaut une table Delta à partir de fichiers du stockage objet. La fonction <code>read_files()</code> lit des fichiers sous un chemin et renvoie un format tabulaire.</p>
<pre><code>CREATE TABLE new_table AS
SELECT *
FROM read_files(
  '&lt;path_to_files&gt;',
  format =&gt; '&lt;file_type&gt;'
);</code></pre>
<p><code>read_files()</code> supporte JSON, CSV, XML, TEXT, BINARYFILE, PARQUET, AVRO, ORC ; détecte le format automatiquement et infère un schéma unifié. C'est de l'ingestion <strong>batch</strong> (idéale pour petits jeux ou ingestion ponctuelle).</p>
`
      },
      {
        id: "s2l3",
        title: "COPY INTO",
        html: `
<p><strong>COPY INTO</strong> charge de manière <strong>incrémentale</strong> et <strong>idempotente</strong> : il <em>ignore les fichiers déjà chargés</em> et est ré-essayable.</p>
<pre><code>CREATE TABLE new_table;            -- table cible (schéma optionnel)
COPY INTO new_table
FROM '&lt;dir_path&gt;'
FILEFORMAT = &lt;file_type&gt;
FORMAT_OPTIONS (&lt;options&gt;)         -- parsing des fichiers source
COPY_OPTIONS  (&lt;options&gt;);         -- ex. mergeSchema, force</code></pre>
<ul>
  <li><code>FORMAT_OPTIONS</code> contrôle l'interprétation des fichiers source.</li>
  <li><code>COPY_OPTIONS</code> contrôle COPY INTO lui-même : évolution de schéma (<code>mergeSchema</code>), idempotence (<code>force</code>).</li>
</ul>
<p>Idéal pour des milliers de fichiers, jobs planifiés répétables.</p>
`
      },
      {
        id: "s2l4",
        title: "Auto Loader (cloudFiles)",
        html: `
<p><strong>Auto Loader</strong> traite de façon incrémentale les nouveaux fichiers dès leur arrivée dans le stockage, en batch ou en streaming. Bâti sur Spark Structured Streaming, il passe à l'échelle de millions de fichiers/heure et gère <strong>l'évolution automatique de schéma</strong>.</p>
<pre><code>(spark.readStream
  .format("cloudFiles")
  .option("cloudFiles.format", "json")
  .option("cloudFiles.schemaLocation", "&lt;checkpoint_path&gt;")
  .load("/Volumes/catalog/schema/files")
 .writeStream
  .option("checkpointLocation", "&lt;checkpoint_path&gt;")
  .trigger(processingTime="5 seconds")
  .toTable("catalog.database.table"))</code></pre>
<p>En SQL via Declarative Pipelines :</p>
<pre><code>CREATE OR REFRESH STREAMING TABLE catalog.schema.table
SCHEDULE EVERY 1 HOUR AS
SELECT * FROM STREAM read_files('&lt;dir_path&gt;', format =&gt; '&lt;file_type&gt;');</code></pre>
<p>Deux modes de détection : <strong>directory listing</strong> (listage du répertoire) et <strong>file notification</strong> (notifications d'événements du cloud, plus scalable).</p>
`
      },
      {
        id: "s2l5",
        title: "Comparatif CTAS / COPY INTO / Auto Loader",
        html: `
<table class="tbl">
  <thead><tr><th></th><th>CTAS + spark.read</th><th>COPY INTO</th><th>Auto Loader</th></tr></thead>
  <tbody>
    <tr><td>Type</td><td>Batch</td><td>Batch incrémental</td><td>Incrémental (batch ou streaming)</td></tr>
    <tr><td>Échelle</td><td>Petits jeux</td><td>Milliers de fichiers</td><td>Millions+ / heure, backfills de milliards</td></tr>
    <tr><td>Idempotent</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
    <tr><td>Évolution de schéma</td><td>Manuelle / inférée</td><td>Via options</td><td>Détection & évolution auto</td></tr>
    <tr><td>Latence</td><td>Élevée</td><td>Modérée (planifié)</td><td>Faible/élevée selon config</td></tr>
  </tbody>
</table>
`
      },
      {
        id: "s2l6",
        title: "Colonnes de métadonnées (_metadata)",
        html: `
<p>Lors de l'ingestion, on capture souvent des métadonnées du fichier source dans la table Bronze (traçabilité) :</p>
<ul>
  <li><code>_metadata.file_name</code> — nom du fichier d'entrée.</li>
  <li><code>_metadata.file_modification_time</code> — horodatage de dernière modification.</li>
  <li><code>_metadata.file_path</code>, <code>_metadata.file_size</code>...</li>
</ul>
<pre><code>SELECT *, _metadata.file_name AS source_file,
          _metadata.file_modification_time AS last_mod
FROM read_files('/Volumes/...', format =&gt; 'csv');</code></pre>
`
      },
      {
        id: "s2l7",
        title: "Colonne _rescued_data",
        html: `
<p>Quand une donnée brute ne correspond pas au schéma, <code>read_files()</code>, <code>spark.read</code> et Auto Loader fournissent une colonne <strong><code>_rescued_data</code></strong>. La ligne malformée n'est pas perdue : la valeur est « secourue » sous forme de chaîne JSON (avec son <code>_file_path</code>).</p>
<pre><code>-- cost déclaré BIGINT ; "$100" est invalide
users | cost | _rescued_data
peter | null | {"cost":"$100","_file_path":"..."}
zebi  | 300  | null   -- valeur correcte → _rescued_data NULL</code></pre>
<p>Permet d'ingérer sans échec tout en isolant les enregistrements à corriger.</p>
`
      },
      {
        id: "s2l8",
        title: "Données semi-structurées JSON",
        html: `
<p>Trois façons de stocker du JSON dans une colonne :</p>
<ol>
  <li><strong>STRING</strong> — flexible, sans contrainte, mais peu performant. Accès aux sous-champs via la syntaxe <strong>deux-points</strong> :
    <pre><code>SELECT json_column:name, json_column:address:city FROM table;</code></pre></li>
  <li><strong>STRUCT</strong> — schéma imposé, plus performant en requête.</li>
  <li><strong>VARIANT</strong> — type semi-structuré flexible et performant (Public Preview 2025 Q2).</li>
</ol>
<p>Conversion STRING → STRUCT :</p>
<pre><code>SELECT schema_of_json('&lt;sample-json&gt;');        -- dérive le schéma
SELECT from_json(json_col, '&lt;struct-schema&gt;') AS struct_column FROM table;</code></pre>
<p>Correspondance des types : objet → <code>STRUCT&lt;&gt;</code>, tableau → <code>ARRAY&lt;&gt;</code>, nombre → INT/FLOAT/DOUBLE, booléen → BOOLEAN.</p>
`
      },
      {
        id: "s2l9",
        title: "Lakeflow Connect — Managed Connectors",
        html: `
<p>Les <strong>Managed Connectors</strong> de Lakeflow Connect simplifient l'ingestion depuis des bases de données et applications d'entreprise via une UI (ou API), entièrement gérés par Databricks (pas de code custom).</p>
<p><strong>Ingestion SaaS</strong> (Salesforce, Workday...) : un pipeline déclaratif <em>serverless</em> récupère les identifiants dans Unity Catalog, atteint la source publique, puis écrit dans des <strong>Streaming Delta Tables</strong>.</p>
<p><strong>Ingestion bases de données</strong> : une <em>Ingestion Gateway</em> (compute classique) collecte les données, sauvegarde l'état/staging dans un <strong>Volume UC</strong>, puis un pipeline serverless alimente les Streaming Delta Tables.</p>
<p><strong>Standard Connectors</strong> couvrent le stockage objet cloud, Kafka et autres sources, plus l'upload de fichiers locaux (vers un Volume ou via « Create table from file »).</p>
`
      },
      {
        id: "s2l10",
        title: "Partner Connect, JDBC/ODBC, REST",
        html: `
<p><strong>Partner Connect</strong> donne accès à un écosystème de solutions partenaires pour ingérer depuis des bases on-prem/cloud, des fichiers et des applications d'entreprise.</p>
<p>Des clients <strong>JDBC/ODBC</strong> ou <strong>REST</strong> peuvent être utilisés dans des notebooks pour déposer les données vers le stockage cloud ou directement dans des tables gouvernées par UC — généralement orchestrés et planifiés par Lakeflow Jobs.</p>
`
      },
      {
        id: "s2l11",
        title: "MERGE INTO, Delta Sharing, Marketplace",
        html: `
<p><strong>MERGE INTO</strong> fusionne mises à jour, insertions et suppressions d'une source vers une table Delta cible. Idéal pour SCD, chargements incrémentaux et CDC.</p>
<pre><code>MERGE INTO target_table t USING source_table s
ON t.id = s.id
WHEN MATCHED AND s.status = 'update' THEN UPDATE SET t.email = s.email, t.status = s.status
WHEN MATCHED AND s.status = 'delete' THEN DELETE
WHEN NOT MATCHED THEN INSERT (id, email, status) VALUES (s.id, s.email, s.status);</code></pre>
<ul>
  <li>Lignes appariées : <code>UPDATE</code> ou <code>DELETE</code>.</li>
  <li>Non appariées côté cible : <code>INSERT</code>.</li>
</ul>
<p><strong>Delta Sharing</strong> : partage sécurisé inter-plateformes/clouds/régions. <strong>Databricks Marketplace</strong> (propulsé par Delta Sharing) : échange ouvert de jeux de données, notebooks, dashboards, modèles ML. Autres : <strong>Lakehouse Federation</strong> (requêter des sources externes sans déplacer les données) et <strong>Zerobus</strong> (écriture d'événements à très haut débit).</p>
`
      },
      {
        id: "s2l12",
        title: "Choisir la bonne méthode d'ingestion",
        html: `
<p>Le choix se priorise selon : <strong>volume</strong>, <strong>fréquence</strong>, <strong>types de données</strong> et <strong>besoins de gouvernance</strong> (Unity Catalog).</p>
<ul>
  <li>Fichiers cloud, gros volume, évolution de schéma, latence faible → <strong>Auto Loader</strong>.</li>
  <li>Fichiers cloud, lots planifiés, idempotence → <strong>COPY INTO</strong>.</li>
  <li>Sources entreprise (DB/SaaS) sans code → <strong>Lakeflow Connect Managed Connectors</strong>.</li>
  <li>Ingestion ponctuelle / petits jeux → <strong>CTAS</strong>.</li>
</ul>
<div class="callout"><strong>Logs d'audit Databricks (sample officiel) :</strong> livrés en <strong>JSON</strong>, latence typique &lt; 15 min, et de nouvelles livraisons <em>peuvent écraser</em> des fichiers existants.</div>
`
      }
    ]
  }
,
  /* ------------------------------------------------------------------ */
  {
    id: "s3",
    num: "03",
    weight: 22,
    title: "Transformation & modélisation",
    subtitle: "PySpark/SQL, jointures, Declarative Pipelines, CDC",
    tier: "silver",
    lessons: [
      {
        id: "s3l1",
        title: "Nettoyage Bronze → Silver",
        html: `
<p>La couche Silver lit les tables Bronze (PySpark ou SQL), nettoie et conforme les données :</p>
<ul>
  <li>gérer les valeurs <strong>NULL</strong> (<code>dropna()</code>, <code>fillna()</code>, <code>COALESCE</code>) ;</li>
  <li>standardiser les <strong>types</strong> (<code>cast()</code>, <code>timestamp()</code>) ;</li>
  <li>écrire vers de nouvelles tables Silver propres.</li>
</ul>
<pre><code>df_silver = (df_bronze
  .dropna(subset=["customer_id"])
  .withColumn("order_ts", col("order_timestamp").cast("timestamp")))
df_silver.write.mode("overwrite").saveAsTable("catalog.silver.orders")</code></pre>
`
      },
      {
        id: "s3l2",
        title: "Jointures et unions",
        html: `
<table class="tbl">
  <thead><tr><th>Opération</th><th>Comportement</th></tr></thead>
  <tbody>
    <tr><td><code>inner join</code></td><td>Seules les lignes appariées des deux côtés.</td></tr>
    <tr><td><code>left join</code></td><td>Toutes les lignes de gauche + correspondances (NULL sinon).</td></tr>
    <tr><td><code>broadcast join</code></td><td>Diffuse la petite table à tous les exécuteurs → évite le shuffle.</td></tr>
    <tr><td>clés multiples</td><td><code>on=["k1","k2"]</code> ou <code>df1.k1==df2.k1) &amp; (...)</code>.</td></tr>
    <tr><td><code>cross join</code></td><td>Produit cartésien (toutes les combinaisons).</td></tr>
    <tr><td><code>union</code> / <code>unionAll</code></td><td>Empile des lignes ; en Spark, <code>union</code> conserve les doublons (= UNION ALL SQL).</td></tr>
  </tbody>
</table>
<pre><code>from pyspark.sql.functions import broadcast
df = orders.join(broadcast(dim_country), "country_id", "left")</code></pre>
`
      },
      {
        id: "s3l3",
        title: "Manipulation de colonnes, lignes et tableaux",
        html: `
<ul>
  <li>Ajouter / dériver : <code>withColumn()</code>.</li>
  <li>Supprimer : <code>drop()</code>.</li>
  <li>Renommer : <code>withColumnRenamed()</code>.</li>
  <li>Découper : <code>split(col, sep)</code>.</li>
  <li>Filtrer : <code>filter()</code> / <code>where()</code>.</li>
  <li>Éclater un tableau en lignes : <code>explode()</code>.</li>
</ul>
<pre><code>from pyspark.sql.functions import explode, split
df2 = (df
  .withColumn("tags", split("tag_str", ","))
  .withColumn("tag", explode("tags"))
  .drop("tag_str"))</code></pre>
`
      },
      {
        id: "s3l4",
        title: "Déduplication & agrégations",
        html: `
<ul>
  <li><code>dropDuplicates(["k"])</code> / <code>distinct()</code> — déduplication.</li>
  <li><code>count()</code>, <code>approx_count_distinct()</code> (rapide, approximatif), <code>mean()</code>/<code>avg()</code>, <code>sum()</code>, <code>min()</code>/<code>max()</code>.</li>
  <li><code>summary()</code> / <code>describe()</code> — statistiques descriptives.</li>
</ul>
<pre><code>from pyspark.sql.functions import approx_count_distinct, avg
(df.groupBy("region")
   .agg(approx_count_distinct("user_id").alias("uniques"),
        avg("amount").alias("avg_amount")))</code></pre>
`
      },
      {
        id: "s3l5",
        title: "Paramètres de tuning Spark",
        html: `
<table class="tbl">
  <thead><tr><th>Paramètre</th><th>Rôle</th></tr></thead>
  <tbody>
    <tr><td><code>spark.sql.shuffle.partitions</code></td><td>Nombre de partitions après un shuffle (join/groupBy). Par défaut 200.</td></tr>
    <tr><td><code>spark.default.parallelism</code></td><td>Parallélisme par défaut des RDD.</td></tr>
    <tr><td><code>spark.executor.memory</code> / <code>spark.driver.memory</code></td><td>Mémoire allouée aux exécuteurs / au driver.</td></tr>
    <tr><td><code>spark.sql.autoBroadcastJoinThreshold</code></td><td>Taille max d'une table pour être diffusée automatiquement (broadcast). -1 désactive.</td></tr>
  </tbody>
</table>
<p>Méthode : modifier <strong>un</strong> paramètre, puis <strong>re-mesurer</strong> la performance.</p>
`
      },
      {
        id: "s3l6",
        title: "Types de datasets : Streaming Table, Materialized View, View",
        html: `
<div class="cards-3">
  <div class="mini-card"><h4>Streaming Table (ST)</h4><p>Traitement incrémental « exactly-once ». Chaque rafraîchissement <em>ajoute</em> les nouvelles données. <code>CREATE OR REFRESH STREAMING TABLE</code> ; lecture avec <code>FROM STREAM read_files(...)</code>.</p></div>
  <div class="mini-card"><h4>Materialized View (MV)</h4><p>Résultats recalculés (rafraîchissement incrémental sur Serverless). Utilisable partout, pas seulement en Gold. <code>CREATE OR REFRESH MATERIALIZED VIEW</code>.</p></div>
  <div class="mini-card"><h4>View / Temporary View</h4><p>Table virtuelle, aucune donnée physique. <code>VIEW</code> enregistrée dans UC ; <code>TEMPORARY VIEW</code> privée au pipeline, non enregistrée. Pas de requêtes streaming.</p></div>
</div>
<p>Les dépendances du pipeline sont analysées automatiquement : l'ordre du code n'a pas d'importance.</p>
<div class="callout"><strong>Renommages :</strong> <code>STREAMING LIVE TABLE → STREAMING TABLE</code>, <code>LIVE TABLE → MATERIALIZED VIEW</code> (l'ancienne syntaxe reste supportée).</div>
`
      },
      {
        id: "s3l7",
        title: "Construire un Spark Declarative Pipeline",
        html: `
<p>Bronze (depuis JSON) → Silver → Gold (MV) :</p>
<pre><code>CREATE OR REFRESH STREAMING TABLE bronze_db.orders_bronze AS
SELECT *, current_timestamp() AS processing_time, _metadata.file_name AS source_file
FROM STREAM read_files('/Volumes/.../orders', format =&gt; 'JSON');

CREATE OR REFRESH STREAMING TABLE silver_db.orders_silver AS
SELECT order_id, timestamp(order_timestamp) AS order_timestamp, customer_id
FROM STREAM bronze_db.orders_bronze;

CREATE OR REFRESH MATERIALIZED VIEW gold_db.orders_by_date AS
SELECT date(order_timestamp) AS order_date, count(*) AS total
FROM silver_db.orders_silver GROUP BY date(order_timestamp);</code></pre>
<p>Compute recommandé : <strong>Serverless</strong> (rafraîchissement incrémental des MV, autoscaling amélioré par défaut). Paramétrage via une map clé-valeur référencée par <code>\${key}</code> en SQL.</p>
`
      },
      {
        id: "s3l8",
        title: "Qualité des données : Expectations",
        html: `
<p>Les <strong>Expectations</strong> valident les lignes pendant l'ETL. Syntaxe :</p>
<pre><code>CONSTRAINT &lt;name&gt; EXPECT (&lt;condition&gt;) [ON VIOLATION &lt;action&gt;]</code></pre>
<table class="tbl">
  <thead><tr><th>Action</th><th>Effet sur les lignes invalides</th></tr></thead>
  <tbody>
    <tr><td><strong>WARN</strong> (défaut)</td><td>Conservées dans la cible ; comptées dans les métriques.</td></tr>
    <tr><td><strong>DROP ROW</strong></td><td>Supprimées de la table ; le compte est journalisé.</td></tr>
    <tr><td><strong>FAIL UPDATE</strong></td><td>Échec du flux ; intervention manuelle requise (les autres flux continuent).</td></tr>
  </tbody>
</table>
<pre><code>CREATE OR REFRESH STREAMING TABLE silver (
  CONSTRAINT valid_notif EXPECT (notifications IN ('Y','N')),
  CONSTRAINT valid_id EXPECT (customer_id IS NOT NULL) ON VIOLATION DROP ROW,
  CONSTRAINT valid_date EXPECT (order_ts &gt; '2021-01-01') ON VIOLATION FAIL UPDATE
) AS SELECT ... FROM STREAM bronze;</code></pre>
`
      },
      {
        id: "s3l9",
        title: "Change Data Capture & SCD (AUTO CDC INTO)",
        html: `
<p><strong>CDC</strong> capture les changements (INSERT/UPDATE/DELETE) d'une source pour les appliquer à une cible.</p>
<ul>
  <li><strong>SCD Type 1</strong> — écrase la valeur courante par clé ; aucun historique conservé.</li>
  <li><strong>SCD Type 2</strong> — conserve l'historique avec <code>__START_AT</code>/<code>__END_AT</code> (NULL = ligne courante).</li>
</ul>
<p><strong>AUTO CDC INTO</strong> (anciennement <code>APPLY CHANGES INTO</code>) remplace un MERGE INTO complexe — inserts/updates gérés implicitement par les KEYS :</p>
<pre><code>CREATE OR REFRESH STREAMING TABLE customers;
CREATE FLOW scd1 AS AUTO CDC INTO customers
FROM STREAM updates
KEYS (CustomerID)
APPLY AS DELETE WHEN operation = 'DELETE'
SEQUENCE BY ProcessDate
COLUMNS * EXCEPT (operation)
STORED AS SCD TYPE 1;</code></pre>
<p><code>SEQUENCE BY</code> définit l'ordre logique des événements. <code>AUTO CDC FROM SNAPSHOT</code> (Public Preview) traite des snapshots de base.</p>
`
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "s4",
    num: "04",
    weight: 16,
    title: "Lakeflow Jobs",
    subtitle: "Orchestration, DAG, triggers, control flow",
    tier: "gold",
    lessons: [
      {
        id: "s4l1",
        title: "Jobs, Tasks et types de tâches",
        html: `
<p>Un <strong>Job</strong> est la ressource d'orchestration : planifier, coordonner et exécuter des workloads (ETL, analytique, ML). Un <strong>Task</strong> est une unité de travail. Un job contient une ou plusieurs tâches.</p>
<p>Types de tâches : Notebook, Python script, Python wheel, SQL (file/query), Spark Declarative Pipeline, dbt, JAR Java, Spark Submit, dashboard AI/BI, Power BI, <strong>Run Job</strong> (modulaire), <strong>For Each</strong>, <strong>If/Else</strong>.</p>
<p>Langages : Python, SQL, Scala, R, Java (via JAR). Limite : <strong>1000 tâches</strong> par job.</p>
`
      },
      {
        id: "s4l2",
        title: "Orchestration par DAG",
        html: `
<p>Un <strong>DAG</strong> (Directed Acyclic Graph) : <em>dirigé</em> (chaque arête a une direction), <em>acyclique</em> (aucun cycle), <em>graphe</em> (sommets = tâches, arêtes = dépendances). On définit l'ordre via <code>Depends On</code>.</p>
<p>Patterns courants :</p>
<ul>
  <li><strong>Sequence</strong> — Bronze → Silver → Gold.</li>
  <li><strong>Funnel</strong> — plusieurs sources → collecte.</li>
  <li><strong>Fan-out (étoile)</strong> — une source → distribution.</li>
</ul>
`
      },
      {
        id: "s4l3",
        title: "Control flow : Run-if, If/Else, For Each",
        html: `
<ul>
  <li><strong>Run-if dependencies</strong> — contrôle l'exécution selon le statut amont : <em>All succeeded</em>, <em>At least one succeeded</em>, <em>None failed</em>, etc. (ex. exécuter la tâche même si une des amont a échoué).</li>
  <li><strong>If/Else</strong> — branchement booléen sur un résultat (opérateurs <code>== != &gt; &gt;= &lt; &lt;=</code>), ex. contrôle qualité, comptage de lignes.</li>
  <li><strong>For Each</strong> — itère sur un tableau d'entrée et exécute la tâche imbriquée par élément (<code>{{input}}</code>). Concurrence configurable ; les dépendances aval s'attachent au conteneur For Each.</li>
</ul>
`
      },
      {
        id: "s4l4",
        title: "Triggers (déclencheurs)",
        html: `
<table class="tbl">
  <thead><tr><th>Trigger</th><th>Quand</th></tr></thead>
  <tbody>
    <tr><td><strong>Scheduled (cron)</strong></td><td>À heures/intervalles fixes via expression cron.</td></tr>
    <tr><td><strong>File arrival</strong></td><td>À l'arrivée de nouveaux fichiers (S3, Azure Storage, GCS, Volumes). Pour ingestion irrégulière.</td></tr>
    <tr><td><strong>Continuous</strong></td><td>Relance dès la fin/échec de l'exécution précédente. Pour le streaming (retry géré par Databricks).</td></tr>
    <tr><td><strong>Manual (None)</strong></td><td>À la demande (UI/API/CLI/SDK/DABs). Ad-hoc, debug, backfills.</td></tr>
    <tr><td><strong>Table update</strong></td><td>Quand des tables surveillées changent (insert/update/delete/merge). Jusqu'à 10 tables ; condition « any » ou « all ».</td></tr>
  </tbody>
</table>
<p>Options Table update : <em>min time between triggers</em> (anti sur-déclenchement), <em>wait after last change</em> (attendre que toutes les données arrivent).</p>
`
      },
      {
        id: "s4l5",
        title: "Triggers temporels vs pilotés par les données",
        html: `
<p>Choisir selon la disponibilité des données et les dépendances :</p>
<ul>
  <li><strong>Time-based</strong> (scheduled) — cadence prévisible, données disponibles à heure fixe.</li>
  <li><strong>Data-driven</strong> (file arrival, table update) — données irrégulières ; déclenche dès que la donnée est prête → remplace le cron par une orchestration temps réel.</li>
</ul>
`
      },
      {
        id: "s4l6",
        title: "Paramètres, task values, notifications, retries",
        html: `
<ul>
  <li><strong>Task Parameters</strong> (niveau tâche) vs <strong>Job Parameters</strong> (niveau job, poussés à toutes les tâches). En cas de même clé, le <em>Job Parameter écrase</em> le Task Parameter.</li>
  <li>Accès en notebook : <code>dbutils.widgets.get("clé")</code>.</li>
  <li><strong>Task Values</strong> partagés entre tâches : <code>dbutils.jobs.taskValues.set(...)</code> / <code>.get(taskKey=..., key=...)</code>.</li>
  <li><strong>Dynamic Value References</strong> en notation <code>{{ }}</code> : <code>{{job.start_time.day}}</code>, <code>{{task.name}}</code>, <code>{{tasks.&lt;t&gt;.values.&lt;v&gt;}}</code>.</li>
  <li><strong>Notifications</strong> (email, Teams, PagerDuty, Slack, Webhook) au début/fin/échec, seuils de durée, backlog streaming.</li>
  <li><strong>Retry policy</strong> : nombre et conditions de relances des exécutions échouées.</li>
</ul>
`
      },
      {
        id: "s4l7",
        title: "Repair & Rerun",
        html: `
<p><strong>Repair and Rerun</strong> relance uniquement les tâches échouées (et leurs dépendantes), pas tout le job → gain de temps et de coût. On peut modifier la tâche ou ses paramètres avant de relancer.</p>
`
      },
      {
        id: "s4l8",
        title: "Compute pour les Jobs",
        html: `
<ul>
  <li><strong>Interactive / all-purpose</strong> — dev et ad-hoc, <em>pas</em> en production (coûteux, scalabilité limitée).</li>
  <li><strong>Job clusters</strong> — moins chers, se terminent à la fin ; latence de démarrage cloud.</li>
  <li><strong>Serverless</strong> — simple, Photon par défaut, démarrage rapide, fiable ; facture unique (infra + opérationnel).</li>
</ul>
<p>On peut réutiliser le même cluster entre tâches. <strong>Serverless Performance optimized (On)</strong> = démarrage plus rapide pour charges sensibles ; (Off) = mode économique (démarrage ~4–6 min).</p>
<p>Bonnes pratiques prod : clusters job/serverless, Photon, design modulaire (run job), service principals, alertes, paramétrage.</p>
`
      }
    ]
  }
,
  /* ------------------------------------------------------------------ */
  {
    id: "s5",
    num: "05",
    weight: 10,
    title: "Implémenter le CI/CD",
    subtitle: "Git Folders, DABs, CLI, déploiement multi-env",
    tier: "gold",
    lessons: [
      {
        id: "s5l1",
        title: "Bonnes pratiques & modularisation PySpark",
        html: `
<p>Pratiques d'ingénierie logicielle appliquées aux pipelines : lisibilité, conventions de nommage, <strong>design modulaire</strong> (fonctions réutilisables), revue de code, contrôle de version, tests.</p>
<pre><code># Code modularisé : fonctions testables et réutilisables
def load_data(path):
    return spark.read.csv(path, header=True, inferSchema=True)

def add_new_col(df, new, s_col):
    return df.withColumn(new, when(col(s_col) == 0, 'Normal').otherwise('Unknown'))</code></pre>
<p>Bénéfices : maintenance facilitée, réutilisation, tests unitaires possibles par fonction.</p>
`
      },
      {
        id: "s5l2",
        title: "DevOps, DataOps, MLOps & CI/CD",
        html: `
<p><strong>DevOps</strong> = pratiques unissant développement et opérations pour automatiser le cycle de vie logiciel. Cycle : Plan → Code → Build → Test → Release → Deploy → Operate → Monitor.</p>
<ul>
  <li><strong>DataOps</strong> = DevOps appliqué à l'ingénierie de données (qualité, lignage, gouvernance).</li>
  <li><strong>MLOps</strong> = pour le cycle de vie des modèles ML.</li>
</ul>
<p><strong>CI (Continuous Integration)</strong> : fusionner fréquemment le code et lancer des tests automatisés. <strong>CD</strong> :</p>
<ul>
  <li><strong>Continuous Delivery</strong> — déploiement auto en staging, déploiement <em>manuel</em> en prod.</li>
  <li><strong>Continuous Deployment</strong> — chaque changement validé est déployé <em>automatiquement</em> en prod.</li>
</ul>
<p>Isolation des environnements : workspaces et/ou catalogs distincts pour DEV / STAGE / PROD.</p>
`
      },
      {
        id: "s5l3",
        title: "Tests unitaires & d'intégration",
        html: `
<p><strong>Tests unitaires</strong> : une fonction isolée, sur peu de données (rapides, automatisés). Utiliser <code>pyspark.testing.utils</code> :</p>
<pre><code>from pyspark.testing.utils import assertDataFrameEqual, assertSchemaEqual

def test_add_new_col():
    df = spark.createDataFrame([(0,),(1,),(None,)], ["value"])
    actual = add_new_col(df, "new_value", "value")
    expected = spark.createDataFrame([(0,'Normal'),(1,'Unknown'),(None,'Unknown')], ["value","new_value"])
    assertDataFrameEqual(actual, expected)</code></pre>
<p>Framework <strong>pytest</strong> : fonctions <code>test_*</code>, <code>assert</code>, découverte automatique, plugins.</p>
<p><strong>Tests d'intégration</strong> : vérifient l'interaction entre composants (notebooks / SDP / Jobs). Méthodes : Expectations SDP, ou un Job multi-tâches (créer les tables, valider nombre de lignes, valeurs distinctes, plages, absence de doublons).</p>
`
      },
      {
        id: "s5l4",
        title: "Git & Databricks Git Folders",
        html: `
<p>Les <strong>Databricks Git Folders</strong> (anciennement Repos) offrent le contrôle de version dans le workspace : cloner un dépôt, créer/changer de <strong>branches</strong>, <em>commit</em> & <em>push</em>, <em>pull</em>, créer des <strong>pull requests</strong> via l'intégration Git.</p>
<p>Connexion via <strong>Personal Access Token (PAT)</strong>. Fournisseurs supportés : GitHub, GitLab, AWS CodeCommit, etc.</p>
<p><strong>Repos API</strong> automatise le CI/CD (gérer les repos, spécifier branche/tag/hash pour les Jobs). Support des fichiers arbitraires (<code>.py</code>, <code>.yml</code>, <code>.csv</code>...) pour packages et imports relatifs.</p>
<div class="callout">Stratégie de branches (ex. Gitflow) : versionner et passer le contrôle qualité avant de fusionner dans <code>main</code> et déployer.</div>
`
      },
      {
        id: "s5l5",
        title: "Options de déploiement : REST API, CLI, SDK",
        html: `
<table class="tbl">
  <thead><tr><th>Outil</th><th>Usage</th></tr></thead>
  <tbody>
    <tr><td><strong>REST API</strong></td><td>Interaction programmatique avec les ressources Databricks.</td></tr>
    <tr><td><strong>Databricks CLI</strong></td><td>Ligne de commande qui encapsule la REST API ; idéal pour tâches ponctuelles, expérimentation, scripting shell.</td></tr>
    <tr><td><strong>SDKs</strong></td><td>Python, Java, Go, R ; applications, jobs custom, gestion d'erreurs robuste.</td></tr>
  </tbody>
</table>
`
      },
      {
        id: "s5l6",
        title: "Declarative Automation Bundles (DABs)",
        html: `
<p>Databricks recommande les <strong>Declarative Automation Bundles</strong> (anciennement Databricks Asset Bundles) pour créer, déployer et tester jobs, pipelines et autres ressources.</p>
<ul>
  <li>Définis en <strong>YAML</strong> : artefacts, ressources, configurations → reproductibilité.</li>
  <li>« Write code once, deploy everywhere » : versionnés dans Git, promus en DEV → TEST → PROD via des <strong>targets</strong>.</li>
  <li>Variables et <strong>overrides</strong> spécifiques à l'environnement pour la même base de code.</li>
  <li>La <strong>Databricks CLI</strong> permet de <code>validate</code>, <code>deploy</code> et gérer les bundles dans des workflows CI/CD automatisés.</li>
</ul>
<div class="callout"><strong>Question type :</strong> manière modulaire de déployer, versionner et orchestrer des pipelines ETL avec CI/CD et reproductibilité → <strong>DABs</strong> (définir ressources + code, versionner dans Git, promouvoir via CI/CD).</div>
`
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "s6",
    num: "06",
    weight: 10,
    title: "Dépannage, monitoring & optimisation",
    subtitle: "Spark UI, data skew, Liquid Clustering, OOM",
    tier: "silver",
    lessons: [
      {
        id: "s6l1",
        title: "Tendances de performance via le run history",
        html: `
<p>La vue <strong>run history</strong> de Lakeflow Jobs permet de comparer les temps d'exécution actuels aux <strong>baselines historiques</strong> et de repérer les dérives (durée qui double, etc.).</p>
`
      },
      {
        id: "s6l2",
        title: "Monitoring : UI, DAG & system tables",
        html: `
<p>Via l'<strong>UI Lakeflow Jobs</strong> : interpréter les statuts, lire le DAG pour repérer les bloqueurs amont, suivre les durées et taux d'échec.</p>
<p><strong>system.lakeflow</strong> : catalogue système en lecture seule journalisant toute l'activité des jobs de la région. Tables clés :</p>
<ul>
  <li><code>jobs</code>, <code>job_tasks</code> — définitions.</li>
  <li><code>job_run_timeline</code>, <code>job_task_run_timeline</code> — exécutions dans le temps (durée, concurrence, SLA via <code>period_start_time</code>/<code>period_end_time</code>).</li>
  <li><code>pipelines</code>.</li>
</ul>
`
      },
      {
        id: "s6l3",
        title: "Bottlenecks dans la Spark UI",
        html: `
<ul>
  <li><strong>Data skew</strong> — une partition surchargée : la plupart des tâches finissent vite, une seule traîne (ex. shuffle read médian ~400 MB mais max &gt; 5 GB). Solutions : <strong>AQE skew join</strong> (découpe la partition au runtime) ou <strong>salting</strong> de la clé avant la jointure.</li>
  <li><strong>Shuffle</strong> excessif — redistribution coûteuse des données.</li>
  <li><strong>Disk spill</strong> — données qui débordent en disque faute de mémoire.</li>
</ul>
<p>Lecture des métriques par <em>stage</em> : temps de planification élevé → améliorer pruning/partitionnement ; temps d'exécution élevé → optimiser jointures/agrégations (broadcast, correction du skew).</p>
<div class="callout"><strong>Sample officiel :</strong> tâche unique très lente avec max shuffle read &gt;&gt; médiane → confirmer que l'<strong>AQE avec skew join handling</strong> est actif pour découper automatiquement la partition surdimensionnée.</div>
`
      },
      {
        id: "s6l4",
        title: "Liquid Clustering & Predictive Optimization",
        html: `
<ul>
  <li><strong>Liquid Clustering</strong> — remplace le partitionnement et le <code>ZORDER</code> ; regroupe les données selon des clés de clustering, s'adapte aux changements de patterns de requête sans réécriture, réduit le data skew. Activé par <code>CLUSTER BY</code>.</li>
  <li><strong>Predictive Optimization</strong> — Databricks exécute automatiquement les opérations de maintenance (<code>OPTIMIZE</code>, <code>VACUUM</code>) sur les tables UC, en se basant sur l'usage, sans gestion manuelle.</li>
</ul>
`
      },
      {
        id: "s6l5",
        title: "Diagnostic : démarrage cluster, librairies, OOM",
        html: `
<ul>
  <li><strong>Échec de démarrage de cluster</strong> — quotas cloud, politiques de cluster, type d'instance indisponible.</li>
  <li><strong>Conflits de librairies</strong> — versions incompatibles entre librairies installées et le Databricks Runtime ; isoler via environnements/dépendances explicites.</li>
  <li><strong>Out-of-memory (OOM)</strong> — augmenter la mémoire driver/exécuteur, réduire le skew, éviter les <code>collect()</code> massifs, ajuster <code>spark.sql.shuffle.partitions</code>.</li>
</ul>
`
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "s7",
    num: "07",
    weight: 15,
    title: "Gouvernance & sécurité",
    subtitle: "Tables managed/external, GRANT, masquage, ABAC",
    tier: "gold",
    lessons: [
      {
        id: "s7l1",
        title: "Tables managed vs external",
        html: `
<table class="tbl">
  <thead><tr><th></th><th>Managed</th><th>External</th></tr></thead>
  <tbody>
    <tr><td>Données</td><td>Gérées par UC (emplacement géré).</td><td>À un emplacement externe spécifié (<code>LOCATION</code>).</td></tr>
    <tr><td><code>DROP TABLE</code></td><td>Supprime métadonnées <em>et</em> données.</td><td>Supprime seulement les métadonnées ; les fichiers restent.</td></tr>
  </tbody>
</table>
<pre><code>-- Managed
CREATE TABLE cat.sch.t (id INT);
-- External
CREATE TABLE cat.sch.t (id INT) LOCATION 's3://bucket/path';</code></pre>
<p>Opérations de base : create, modify (<code>ALTER</code>), delete (<code>DROP</code>) et conversion entre managed/external.</p>
`
      },
      {
        id: "s7l2",
        title: "Contrôle d'accès : GRANT, REVOKE, DENY",
        html: `
<p>On applique des privilèges à des <strong>principals</strong> (utilisateurs, groupes, service principals) aux différents niveaux de la <strong>hiérarchie de sécurité</strong> (metastore → catalog → schema → table). Les privilèges sont hérités vers le bas.</p>
<pre><code>GRANT SELECT ON TABLE cat.sch.t TO \`analysts\`;
GRANT USE CATALOG ON CATALOG cat TO \`analysts\`;
REVOKE SELECT ON TABLE cat.sch.t FROM \`analysts\`;
DENY MODIFY ON SCHEMA cat.sch TO \`contractors\`;</code></pre>
<p>Privilèges courants : <code>USE CATALOG</code>, <code>USE SCHEMA</code>, <code>SELECT</code>, <code>MODIFY</code>, <code>CREATE TABLE</code>, <code>ALL PRIVILEGES</code>. Tout se fait aussi via l'UI du Catalog Explorer.</p>
`
      },
      {
        id: "s7l3",
        title: "Masquage de colonnes & sécurité au niveau ligne",
        html: `
<ul>
  <li><strong>Column masking</strong> — une fonction de masquage est appliquée à une colonne pour restreindre la visibilité selon le groupe de l'utilisateur (ex. masquer un numéro de carte).</li>
  <li><strong>Row-level security</strong> — un <em>row filter</em> (fonction) limite les lignes visibles selon l'utilisateur/groupe.</li>
</ul>
<pre><code>-- Fonction de masquage puis application
ALTER TABLE cat.sch.t ALTER COLUMN ssn SET MASK mask_ssn;
-- Filtre de lignes
ALTER TABLE cat.sch.t SET ROW FILTER region_filter ON (region);</code></pre>
`
      },
      {
        id: "s7l4",
        title: "Politiques ABAC d'Unity Catalog",
        html: `
<p><strong>ABAC (Attribute-Based Access Control)</strong> dans Unity Catalog permet de contrôler de façon <strong>centralisée</strong> le filtrage au niveau ligne et le masquage de colonnes pour les données sensibles, à partir d'<strong>attributs/tags</strong> (sur les objets et les principals) plutôt que table par table.</p>
<p>Avantage : une politique définie une fois s'applique automatiquement à toutes les colonnes/tables portant le tag concerné → gouvernance scalable.</p>
`
      }
    ]
  }
];

/* ============================================================
   Banque de questions — chaque question pointe vers la leçon
   (sid = section, lid = leçon) pour le lien de révision.
   ============================================================ */
const QUESTIONS = [
  /* ---- Section 1 ---- */
  { id:"q1", sid:"s1", lid:"s1l1", q:"Quels sont les trois piliers de Lakeflow dans la Data Intelligence Platform ?",
    opts:["Connect, Jobs, Spark Declarative Pipelines","Delta Lake, Photon, Unity Catalog","Repos, Workflows, DBSQL","Bronze, Silver, Gold"], a:0,
    exp:"Lakeflow réunit Connect (ingestion), Jobs (orchestration, ex-Workflows) et Spark Declarative Pipelines (ETL, ex-DLT)." },
  { id:"q2", sid:"s1", lid:"s1l2", q:"Un ingénieur veut une itération rapide, des rollbacks fiables après de mauvais ingests, des pistes d'audit pour la conformité et une source unique de vérité pour l'IA et la BI. Quelle stratégie ?",
    opts:["Stockage CSV sur DBFS avec versionnage manuel et copies nocturnes","Transactions ACID Delta Lake + time travel, gouvernées par Unity Catalog","Stockage objet seul avec requêtes SQL ad hoc pour la récupération","DataFrames en mémoire éphémères pour l'audit et la BI"], a:1,
    exp:"Delta Lake (ACID + time travel) gouverné par Unity Catalog fournit rollbacks, audit/lineage et un accès cohérent. (Question officielle de l'Exam Guide.)" },
  { id:"q3", sid:"s1", lid:"s1l2", q:"Que contient le répertoire _delta_log d'une table Delta ?",
    opts:["Les fichiers de données Parquet","Le journal de transactions JSON avec les métadonnées","Les sauvegardes des versions précédentes uniquement","Les statistiques du SQL Warehouse"], a:1,
    exp:"_delta_log contient le journal de transactions (fichiers JSON) ; les données sont des fichiers Parquet dans le répertoire de la table." },
  { id:"q4", sid:"s1", lid:"s1l5", q:"Des analystes lancent des requêtes SQL ad-hoc toute la journée sur des tables Delta. Il faut performance, démarrage rapide, multi-utilisateurs et coût maîtrisé. Quelle configuration ?",
    opts:["Un job cluster avec autoscaling pour ETL planifié","Un cluster all-purpose à nombre de workers fixe","Un cluster high-concurrency avec autoscaling activé","Un cluster single-node pour dev léger"], a:2,
    exp:"Le high-concurrency avec autoscaling gère la concurrence et le coût. (Question officielle de l'Exam Guide.)" },
  { id:"q5", sid:"s1", lid:"s1l3", q:"Quel est l'ordre correct de la hiérarchie d'Unity Catalog ?",
    opts:["catalog → metastore → schema → table","metastore → catalog → schema → table","schema → catalog → table → volume","workspace → catalog → table"], a:1,
    exp:"La hiérarchie est metastore → catalog → schema → table/view/volume." },

  /* ---- Section 2 ---- */
  { id:"q6", sid:"s2", lid:"s2l3", q:"Quelle affirmation décrit le mieux COPY INTO ?",
    opts:["Ingestion batch qui retraite toutes les données à chaque exécution","Opération idempotente et ré-essayable qui ignore les fichiers déjà chargés","Uniquement pour le streaming temps réel","Ne supporte pas l'évolution de schéma"], a:1,
    exp:"COPY INTO est incrémental, idempotent et ré-essayable ; il ignore les fichiers déjà chargés et supporte mergeSchema." },
  { id:"q7", sid:"s2", lid:"s2l4", q:"Pour ingérer des millions de fichiers/heure avec détection et évolution automatiques du schéma, quel outil ?",
    opts:["CREATE TABLE AS","COPY INTO","Auto Loader (cloudFiles)","MERGE INTO"], a:2,
    exp:"Auto Loader, bâti sur Structured Streaming, passe à l'échelle de millions de fichiers et gère l'évolution automatique du schéma." },
  { id:"q8", sid:"s2", lid:"s2l4", q:"Quels sont les deux modes de détection des fichiers d'Auto Loader ?",
    opts:["Batch et streaming","Directory listing et file notification","Push et pull","Cron et continuous"], a:1,
    exp:"Auto Loader détecte les nouveaux fichiers par directory listing ou par file notification (plus scalable)." },
  { id:"q9", sid:"s2", lid:"s2l7", q:"À quoi sert la colonne _rescued_data lors de l'ingestion ?",
    opts:["Stocker les statistiques de la table","Capturer les données qui ne correspondent pas au schéma au lieu d'échouer","Chiffrer les colonnes sensibles","Conserver le nom du fichier source"], a:1,
    exp:"_rescued_data capture, sous forme de JSON, les valeurs malformées qui ne correspondent pas au schéma, sans perdre la ligne." },
  { id:"q10", sid:"s2", lid:"s2l8", q:"Quelle syntaxe accède au sous-champ city dans une colonne STRING JSON nommée j ?",
    opts:["j.address.city","j['address']['city']","j:address:city","GET_JSON(j,'city')"], a:2,
    exp:"Sur une chaîne JSON, on utilise la syntaxe deux-points : j:address:city." },
  { id:"q11", sid:"s2", lid:"s2l8", q:"Quelle fonction convertit une chaîne JSON en colonne STRUCT selon un schéma donné ?",
    opts:["to_json()","from_json()","parse_json()","explode()"], a:1,
    exp:"from_json(json_col, schema) renvoie une colonne STRUCT ; schema_of_json() aide à dériver le schéma." },
  { id:"q12", sid:"s2", lid:"s2l2", q:"Quel format de fichier read_files() ne supporte-t-il PAS nativement ?",
    opts:["JSON","PARQUET","XLSX","AVRO"], a:2,
    exp:"read_files() supporte JSON, CSV, XML, TEXT, BINARYFILE, PARQUET, AVRO, ORC — pas XLSX." },
  { id:"q13", sid:"s2", lid:"s2l9", q:"Quel avantage principal des Managed Connectors de Lakeflow Connect ?",
    opts:["Ils exigent du code Spark personnalisé","Ils sont entièrement gérés par Databricks via UI/API, sans config manuelle","Ils ne fonctionnent qu'avec des fichiers locaux","Ils remplacent Unity Catalog"], a:1,
    exp:"Les Managed Connectors simplifient l'ingestion depuis bases et apps d'entreprise, entièrement gérés, sans code custom." },
  { id:"q14", sid:"s2", lid:"s2l11", q:"Quelle commande gère inserts, updates et deletes d'une source vers une table Delta cible ?",
    opts:["COPY INTO","MERGE INTO","INSERT OVERWRITE","CREATE TABLE AS"], a:1,
    exp:"MERGE INTO applique inserts/updates/deletes selon l'appariement des lignes, idéal pour SCD et CDC." },
  { id:"q15", sid:"s2", lid:"s2l12", q:"Un pipeline consomme les logs d'audit Databricks depuis un bucket S3. Quel est le comportement de stockage de ces logs ?",
    opts:["JSON, logging typique <15 min, de nouvelles livraisons peuvent écraser des fichiers","CSV, latence sub-minute garantie, jamais d'écrasement","Parquet, cohérence au-delà de 24h, écrasements désactivés","JSON, cadence hebdomadaire, écrasement total sans append"], a:0,
    exp:"Les logs d'audit sont livrés en JSON, < 15 min, et de nouvelles livraisons peuvent écraser des fichiers. (Question officielle de l'Exam Guide.)" },
  { id:"q16", sid:"s2", lid:"s2l6", q:"Quelle expression ajoute le nom du fichier source dans une table Bronze ?",
    opts:["input_file()","_metadata.file_name","source_file()","current_file()"], a:1,
    exp:"_metadata.file_name renvoie le nom du fichier d'entrée ; _metadata.file_modification_time donne l'horodatage." },
  { id:"q17", sid:"s2", lid:"s2l1", q:"Quelle méthode correspond à de l'ingestion batch traditionnelle (retraite toutes les données) ?",
    opts:["COPY INTO","Auto Loader avec trigger continu","CREATE TABLE AS","CREATE OR REFRESH STREAMING TABLE"], a:2,
    exp:"CTAS (avec spark.read) est du batch : il (re)traite l'ensemble des données à chaque exécution." },

  /* ---- Section 3 ---- */
  { id:"q18", sid:"s3", lid:"s3l2", q:"Quel type de jointure diffuse la petite table à tous les exécuteurs pour éviter le shuffle ?",
    opts:["cross join","broadcast join","left join","union"], a:1,
    exp:"Le broadcast join envoie la petite table à chaque exécuteur, supprimant le shuffle de la grande table." },
  { id:"q19", sid:"s3", lid:"s3l3", q:"Quelle fonction PySpark transforme chaque élément d'un tableau en une ligne distincte ?",
    opts:["split()","flatten()","explode()","collect_list()"], a:2,
    exp:"explode() éclate un tableau (ou une map) en plusieurs lignes." },
  { id:"q20", sid:"s3", lid:"s3l5", q:"Quel paramètre contrôle le nombre de partitions après un shuffle (join/groupBy) ?",
    opts:["spark.executor.memory","spark.sql.shuffle.partitions","spark.default.parallelism","spark.sql.autoBroadcastJoinThreshold"], a:1,
    exp:"spark.sql.shuffle.partitions fixe le nombre de partitions post-shuffle (défaut 200)." },
  { id:"q21", sid:"s3", lid:"s3l5", q:"Quel paramètre définit la taille maximale d'une table pour un broadcast automatique ?",
    opts:["spark.sql.autoBroadcastJoinThreshold","spark.sql.shuffle.partitions","spark.driver.memory","spark.default.parallelism"], a:0,
    exp:"spark.sql.autoBroadcastJoinThreshold définit le seuil de taille pour diffuser automatiquement une table (-1 désactive)." },
  { id:"q22", sid:"s3", lid:"s3l6", q:"Quelle différence clé entre une Streaming Table et une Materialized View ?",
    opts:["La ST recalcule tout, la MV ajoute","La ST traite les nouvelles données de façon incrémentale (append), la MV recalcule pour refléter l'état courant","Les deux sont des vues virtuelles sans données","La MV ne peut pas servir au BI"], a:1,
    exp:"Une Streaming Table traite/ajoute incrémentalement les nouvelles données ; une MV recalcule (incrémentalement sur Serverless) ses résultats." },
  { id:"q23", sid:"s3", lid:"s3l6", q:"Quelle affirmation sur une TEMPORARY VIEW dans un pipeline est vraie ?",
    opts:["Elle est enregistrée dans Unity Catalog","Elle persiste uniquement le temps de vie du pipeline et est privée","Elle stocke des données physiques","Elle peut être une source streaming"], a:1,
    exp:"Une TEMPORARY VIEW est privée au pipeline et non enregistrée dans UC ; utile comme requête intermédiaire." },
  { id:"q24", sid:"s3", lid:"s3l7", q:"Quel mot-clé invoque la fonctionnalité Auto Loader (lecture streaming incrémentale) en SQL ?",
    opts:["AUTO LOAD","FROM STREAM read_files(...)","INCREMENTAL READ","READ CONTINUOUS"], a:1,
    exp:"En SQL, FROM STREAM read_files(...) active la lecture streaming incrémentale (checkpoints, fichiers lus une seule fois)." },
  { id:"q25", sid:"s3", lid:"s3l8", q:"Une Expectation avec ON VIOLATION DROP ROW fait quoi des lignes invalides ?",
    opts:["Les conserve et les compte","Les supprime de la table et journalise le compte","Fait échouer tout le pipeline","Les déplace vers _rescued_data"], a:1,
    exp:"DROP ROW supprime les lignes invalides de la cible ; le compte est journalisé dans les métriques." },
  { id:"q26", sid:"s3", lid:"s3l8", q:"Quelle action d'Expectation provoque l'échec du flux et nécessite une intervention manuelle ?",
    opts:["WARN","DROP ROW","FAIL UPDATE","ALLOW"], a:2,
    exp:"FAIL UPDATE fait échouer le flux concerné (les autres flux continuent) ; intervention manuelle requise." },
  { id:"q27", sid:"s3", lid:"s3l9", q:"Quelle clause d'AUTO CDC INTO définit l'ordre logique des événements CDC ?",
    opts:["KEYS","SEQUENCE BY","STORED AS","APPLY AS DELETE WHEN"], a:1,
    exp:"SEQUENCE BY spécifie l'ordre logique des événements (ex. par horodatage) pour appliquer correctement les changements." },
  { id:"q28", sid:"s3", lid:"s3l9", q:"En SCD Type 1, que se passe-t-il quand un enregistrement est mis à jour ?",
    opts:["L'ancienne valeur est conservée avec une période de validité","La valeur courante est écrasée, sans historique","Une nouvelle ligne active est ajoutée et l'ancienne marquée inactive","La ligne est déplacée vers une table d'historique"], a:1,
    exp:"SCD Type 1 écrase la valeur par clé ; aucun historique n'est conservé (contrairement au Type 2)." },
  { id:"q29", sid:"s3", lid:"s3l1", q:"Lors du passage Bronze → Silver, quelle opération est typique ?",
    opts:["Ingérer les fichiers bruts tels quels","Nettoyer les nulls et standardiser les types de données","Créer des agrégats métier finaux","Partager la table via Delta Sharing"], a:1,
    exp:"La couche Silver nettoie (nulls, types) et conforme les données ; les agrégats métier vont en Gold." },
  { id:"q30", sid:"s3", lid:"s3l4", q:"Quelle fonction donne un comptage distinct rapide et approximatif ?",
    opts:["count()","countDistinct()","approx_count_distinct()","summary()"], a:2,
    exp:"approx_count_distinct() fournit un cardinal distinct rapide et approximatif, utile sur de gros volumes." },

  /* ---- Section 4 ---- */
  { id:"q31", sid:"s4", lid:"s4l2", q:"Que signifie l'acronyme DAG dans Lakeflow Jobs ?",
    opts:["Data Aggregation Graph","Directed Acyclic Graph","Distributed Async Group","Delta Append Graph"], a:1,
    exp:"DAG = Directed Acyclic Graph : dirigé, sans cycle, sommets (tâches) reliés par des arêtes (dépendances)." },
  { id:"q32", sid:"s4", lid:"s4l4", q:"Quel trigger lance un job dès l'arrivée de nouveaux fichiers dans le stockage ?",
    opts:["Scheduled","File arrival","Continuous","Manual"], a:1,
    exp:"Le trigger File arrival déclenche à l'arrivée de fichiers (S3, Azure, GCS, Volumes) — idéal pour une ingestion irrégulière." },
  { id:"q33", sid:"s4", lid:"s4l4", q:"Quel trigger convient le mieux à une charge de streaming continue ?",
    opts:["Manual","Scheduled (cron)","Continuous","File arrival"], a:2,
    exp:"Le trigger Continuous relance dès la fin/échec précédent (retry géré) — adapté au streaming." },
  { id:"q34", sid:"s4", lid:"s4l3", q:"Quelle tâche de control flow itère sur un tableau et exécute une tâche imbriquée par élément ?",
    opts:["If/Else","Run Job","For Each","Run-if"], a:2,
    exp:"For Each boucle sur un tableau d'entrée et exécute la tâche imbriquée par item ({{input}}), avec concurrence configurable." },
  { id:"q35", sid:"s4", lid:"s4l6", q:"Quand un Job Parameter et un Task Parameter ont la même clé, lequel l'emporte ?",
    opts:["Le Task Parameter","Le Job Parameter","Aucun, erreur levée","Le dernier défini dans l'UI"], a:1,
    exp:"Les Job Parameters (niveau job) écrasent les Task Parameters de même clé." },
  { id:"q36", sid:"s4", lid:"s4l6", q:"Comment partager dynamiquement une valeur d'une tâche amont vers une tâche aval ?",
    opts:["dbutils.fs.put()","dbutils.jobs.taskValues.set/get","spark.conf.set()","widgets.text()"], a:1,
    exp:"dbutils.jobs.taskValues.set() / .get() permet de définir et lire des Task Values entre tâches." },
  { id:"q37", sid:"s4", lid:"s4l7", q:"Quel est l'intérêt de Repair & Rerun ?",
    opts:["Relancer tout le job depuis le début","Relancer uniquement les tâches échouées (et dépendantes), économisant temps et coût","Supprimer l'historique des runs","Convertir un job en pipeline"], a:1,
    exp:"Repair & Rerun ne relance que les tâches échouées et leurs dépendantes, au lieu du job entier." },
  { id:"q38", sid:"s4", lid:"s4l8", q:"Quel compute faut-il éviter pour des workloads de production ?",
    opts:["Serverless","Job cluster","Cluster interactif / all-purpose","SQL Warehouse"], a:2,
    exp:"Les clusters interactifs/all-purpose conviennent au dev et à l'ad-hoc, pas à la production (coût, scalabilité)." },
  { id:"q39", sid:"s4", lid:"s4l4", q:"Quel trigger surveille jusqu'à 10 tables et lance un job quand elles sont modifiées ?",
    opts:["File arrival","Table update","Scheduled","Continuous"], a:1,
    exp:"Table update surveille jusqu'à 10 tables (insert/update/delete/merge), avec conditions « any » ou « all »." },
  { id:"q40", sid:"s4", lid:"s4l1", q:"Quelle est la limite de tâches recommandée par job ?",
    opts:["100","500","1000","Illimité"], a:2,
    exp:"Un job est limité à 1000 tâches ; au-delà, privilégier le design modulaire (Run Job)." },
  { id:"q41", sid:"s4", lid:"s4l5", q:"Données arrivant à des moments irréguliers : quel type de trigger privilégier ?",
    opts:["Time-based (cron)","Data-driven (file arrival / table update)","Manual uniquement","Aucun trigger"], a:1,
    exp:"Pour des données irrégulières, un trigger data-driven déclenche dès que la donnée est prête, au lieu d'un cron fixe." },

  /* ---- Section 5 ---- */
  { id:"q42", sid:"s5", lid:"s5l6", q:"Une équipe veut une manière modulaire de déployer, versionner et orchestrer des pipelines ETL avec CI/CD et reproductibilité. Quelle fonctionnalité ?",
    opts:["Représenter les jobs comme des modèles dans UC avec alias","Empaqueter en wheels stockés dans des Volumes UC liés aux tâches","Notebooks montés sur Volume déclenchés par Jobs API v2","DABs : définir ressources et code, versionner dans Git, promouvoir via CI/CD"], a:3,
    exp:"Les Declarative Automation Bundles (DABs) définissent ressources + code, versionnés dans Git et promus via CI/CD automatisé. (Question officielle de l'Exam Guide.)" },
  { id:"q43", sid:"s5", lid:"s5l6", q:"Dans quel format sont définis les Declarative Automation Bundles ?",
    opts:["JSON","YAML","TOML","XML"], a:1,
    exp:"Les DABs sont définis en fichiers YAML (artefacts, ressources, configurations)." },
  { id:"q44", sid:"s5", lid:"s5l2", q:"Quelle différence entre Continuous Delivery et Continuous Deployment ?",
    opts:["Delivery déploie automatiquement en prod, Deployment manuellement","Delivery requiert un déploiement manuel en prod, Deployment est entièrement automatique","Les deux sont identiques","Deployment ne fait pas de tests"], a:1,
    exp:"En Continuous Delivery la mise en prod est manuelle ; en Continuous Deployment chaque changement validé est déployé automatiquement." },
  { id:"q45", sid:"s5", lid:"s5l3", q:"Quelle fonction de pyspark.testing.utils compare deux DataFrames dans un test unitaire ?",
    opts:["compareDF()","assertDataFrameEqual()","checkEqual()","df.equals()"], a:1,
    exp:"assertDataFrameEqual(actual, expected) compare deux DataFrames ; assertSchemaEqual() compare les schémas." },
  { id:"q46", sid:"s5", lid:"s5l4", q:"Comment connecter un dépôt GitHub à Databricks Git Folders ?",
    opts:["Via un Personal Access Token (PAT)","En copiant les fichiers sur DBFS","Via spark.conf","Via un SQL Warehouse"], a:0,
    exp:"On connecte GitHub via un Personal Access Token (PAT) ; Databricks supporte GitHub, GitLab, CodeCommit, etc." },
  { id:"q47", sid:"s5", lid:"s5l5", q:"Quel outil est une CLI qui encapsule la REST API, idéale pour le scripting shell ?",
    opts:["Databricks SDK","Databricks CLI","Repos API","dbutils"], a:1,
    exp:"La Databricks CLI encapsule la REST API et convient aux tâches ponctuelles et au scripting." },
  { id:"q48", sid:"s5", lid:"s5l2", q:"Quel terme désigne l'application des principes DevOps à l'ingénierie de données ?",
    opts:["MLOps","DataOps","GitOps","FinOps"], a:1,
    exp:"DataOps applique les principes DevOps aux pipelines de données ; MLOps concerne le cycle de vie des modèles." },
  { id:"q49", sid:"s5", lid:"s5l1", q:"Quel est le principal avantage de modulariser du code PySpark en fonctions ?",
    opts:["Cela rend le code plus lent","Cela permet la réutilisation et les tests unitaires par fonction","Cela supprime le besoin de Git","Cela force le mode streaming"], a:1,
    exp:"La modularisation facilite la maintenance, la réutilisation et le test unitaire de chaque fonction." },
  { id:"q50", sid:"s5", lid:"s5l6", q:"Quelle commande de la Databricks CLI permet de vérifier un bundle avant déploiement ?",
    opts:["databricks bundle check","databricks bundle validate","databricks bundle test","databricks bundle lint"], a:1,
    exp:"databricks bundle validate vérifie la config ; databricks bundle deploy le déploie vers une target." },

  /* ---- Section 6 ---- */
  { id:"q51", sid:"s6", lid:"s6l3", q:"Une tâche d'un stage met >10 min alors que la majorité finit en <30 s ; le shuffle read max (>5 GB) dépasse de loin la médiane (~400 MB). Quelle est la cause ?",
    opts:["Manque d'exécuteurs","Data skew (partition surdimensionnée)","Trop de mémoire driver","SQL Warehouse mal dimensionné"], a:1,
    exp:"Un max de shuffle read très supérieur à la médiane indique un data skew : une partition concentre trop de données." },
  { id:"q52", sid:"s6", lid:"s6l3", q:"Quelle solution corrige automatiquement une partition surdimensionnée au runtime lors d'une jointure ?",
    opts:["Augmenter la taille du cluster","Activer l'AQE avec skew join handling","Réduire spark.sql.shuffle.partitions","Désactiver Photon"], a:1,
    exp:"L'Adaptive Query Execution (AQE) avec skew join handling découpe automatiquement la partition surdimensionnée. (Question officielle de l'Exam Guide.)" },
  { id:"q53", sid:"s6", lid:"s6l2", q:"Quel catalogue système journalise l'activité des jobs (jobs, job_run_timeline, etc.) ?",
    opts:["system.access","system.lakeflow","system.billing","system.compute"], a:1,
    exp:"system.lakeflow contient jobs, job_tasks, job_run_timeline, job_task_run_timeline et pipelines." },
  { id:"q54", sid:"s6", lid:"s6l4", q:"Quelle fonctionnalité remplace partitionnement et ZORDER et s'adapte aux patterns de requête ?",
    opts:["Predictive Optimization","Liquid Clustering","Auto Loader","Delta Sharing"], a:1,
    exp:"Liquid Clustering (CLUSTER BY) remplace partitionnement/ZORDER, s'adapte sans réécriture et réduit le skew." },
  { id:"q55", sid:"s6", lid:"s6l4", q:"Que fait la Predictive Optimization sur les tables Unity Catalog ?",
    opts:["Chiffre les données automatiquement","Exécute automatiquement OPTIMIZE et VACUUM selon l'usage","Supprime les tables inutilisées","Ajoute des colonnes de métadonnées"], a:1,
    exp:"La Predictive Optimization lance automatiquement la maintenance (OPTIMIZE, VACUUM) sur les tables UC." },
  { id:"q56", sid:"s6", lid:"s6l5", q:"Un job échoue avec une out-of-memory error. Quelle action n'est PAS appropriée ?",
    opts:["Augmenter la mémoire exécuteur/driver","Réduire le data skew","Faire un collect() de tout le DataFrame sur le driver","Ajuster spark.sql.shuffle.partitions"], a:2,
    exp:"Un collect() massif ramène tout sur le driver et aggrave l'OOM ; il faut au contraire l'éviter." },
  { id:"q57", sid:"s6", lid:"s6l1", q:"Comment repérer qu'un job s'est dégradé dans le temps ?",
    opts:["En lisant _rescued_data","En comparant les temps d'exécution actuels aux baselines via le run history","En activant le mode continuous","En supprimant le checkpoint"], a:1,
    exp:"Le run history de Lakeflow Jobs compare les durées actuelles aux baselines historiques pour détecter les dérives." },

  /* ---- Section 7 ---- */
  { id:"q58", sid:"s7", lid:"s7l1", q:"Que se passe-t-il quand on exécute DROP TABLE sur une table EXTERNAL ?",
    opts:["Métadonnées et données supprimées","Seules les métadonnées sont supprimées ; les fichiers restent","Rien, l'opération est interdite","La table est convertie en managed"], a:1,
    exp:"Pour une table external, DROP supprime seulement les métadonnées ; les fichiers de données restent en place." },
  { id:"q59", sid:"s7", lid:"s7l2", q:"Quelle commande retire un privilège déjà accordé à un groupe ?",
    opts:["DENY","REVOKE","DROP GRANT","UNSET"], a:1,
    exp:"REVOKE retire un privilège accordé ; DENY interdit explicitement, GRANT accorde." },
  { id:"q60", sid:"s7", lid:"s7l2", q:"À quels types de principals peut-on accorder des privilèges dans Unity Catalog ?",
    opts:["Uniquement aux utilisateurs","Utilisateurs, groupes et service principals","Uniquement aux groupes","Uniquement aux service principals"], a:1,
    exp:"On accorde des privilèges aux utilisateurs, groupes et service principals, aux différents niveaux de la hiérarchie." },
  { id:"q61", sid:"s7", lid:"s7l3", q:"Quelle technique restreint les LIGNES visibles selon le groupe de l'utilisateur ?",
    opts:["Column masking","Row-level security (row filter)","Time travel","Liquid Clustering"], a:1,
    exp:"La row-level security applique un row filter qui limite les lignes visibles ; le column masking masque des colonnes." },
  { id:"q62", sid:"s7", lid:"s7l4", q:"Quel avantage des politiques ABAC d'Unity Catalog ?",
    opts:["Elles s'appliquent table par table manuellement","Elles contrôlent centralement filtrage de lignes et masquage via des attributs/tags","Elles remplacent Delta Lake","Elles désactivent la gouvernance"], a:1,
    exp:"ABAC contrôle centralement le filtrage de lignes et le masquage de colonnes à partir d'attributs/tags, de façon scalable." },
  { id:"q63", sid:"s7", lid:"s7l1", q:"Comment crée-t-on une table external en SQL ?",
    opts:["CREATE TABLE t (...) MANAGED","CREATE TABLE t (...) LOCATION 's3://...'","CREATE EXTERNAL TABLE sans LOCATION","CREATE TABLE t USING memory"], a:1,
    exp:"On spécifie LOCATION pour une table external ; sans LOCATION, la table est managed." },
  { id:"q64", sid:"s7", lid:"s7l2", q:"Dans la hiérarchie de sécurité UC, comment se propagent les privilèges ?",
    opts:["De la table vers le metastore","Hérités vers le bas (metastore → catalog → schema → table)","Aucune hiérarchie n'existe","Uniquement au niveau table"], a:1,
    exp:"Les privilèges accordés à un niveau supérieur sont hérités par les objets enfants (catalog → schema → table)." }
];
