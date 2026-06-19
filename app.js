/* ============================================================
   Databricks DEA Trainer — logique applicative
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const state = {
    mode: "course",          // "course" | "exam"
    activeSection: COURSE[0].id,
    exam: null               // active exam session
  };

  const sidebar = $("#sidebar");
  const navArea = $("#nav-area");
  const content = $("#content");
  const tbTitle = $("#tb-title");

  /* ---------------- Sidebar ---------------- */
  function renderSidebar() {
    $("#mode-course").classList.toggle("active", state.mode === "course");
    $("#mode-exam").classList.toggle("active", state.mode === "exam");
    navArea.innerHTML = "";

    if (state.mode === "course") {
      navArea.appendChild(el("div", "nav-label", "Programme — 7 sections"));
      COURSE.forEach((sec) => {
        const b = el("button", "nav-item" + (sec.id === state.activeSection ? " active" : ""));
        b.innerHTML =
          `<span class="nav-num">${sec.num}</span>` +
          `<span class="tier-dot tier-${sec.tier}"></span>` +
          `<span>${sec.title}</span>` +
          `<span class="nav-w">${sec.weight}%</span>`;
        b.onclick = () => { goToSection(sec.id); closeMobile(); };
        navArea.appendChild(b);
      });
    } else {
      navArea.appendChild(el("div", "nav-label", "Entraînement"));
      const a = el("button", "nav-item active",
        `<span class="nav-num">EX</span><span>Examen blanc</span>`);
      a.onclick = () => { startExamSetup(); closeMobile(); };
      navArea.appendChild(a);
      navArea.appendChild(el("div", "sidebar-foot",
        "L'examen réel compte 45 questions notées, 90 minutes, score de réussite indicatif ≈ 70%."));
    }
  }

  /* ---------------- Mode switch ---------------- */
  function setMode(m) {
    state.mode = m;
    renderSidebar();
    if (m === "course") renderSection(state.activeSection);
    else startExamSetup();
  }

  /* ---------------- Course rendering ---------------- */
  function goToSection(id) {
    state.activeSection = id;
    renderSidebar();
    renderSection(id);
    content.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderSection(id) {
    const sec = COURSE.find((s) => s.id === id);
    if (!sec) return;
    tbTitle.textContent = sec.title;
    content.innerHTML = "";

    content.appendChild(el("div", "eyebrow",
      `Section ${sec.num} <span class="w">· pondération ${sec.weight}%</span>`));
    content.appendChild(el("h2", "section-title", sec.title));
    content.appendChild(el("p", "section-sub", sec.subtitle));

    sec.lessons.forEach((les) => {
      const card = el("div", "lesson");
      card.id = les.id;
      card.appendChild(el("h3", null, les.title));
      const body = el("div");
      body.innerHTML = les.html;
      card.appendChild(body);
      content.appendChild(card);
    });
  }

  /* ---------------- Review jump (depuis l'examen) ---------------- */
  function jumpToLesson(sid, lid) {
    state.mode = "course";
    state.activeSection = sid;
    renderSidebar();
    renderSection(sid);
    requestAnimationFrame(() => {
      const node = document.getElementById(lid);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        node.classList.remove("flash");
        void node.offsetWidth;
        node.classList.add("flash");
      }
    });
  }

  /* ---------------- Exam setup ---------------- */
  function startExamSetup() {
    tbTitle.textContent = "Examen blanc";
    content.innerHTML = "";

    const head = el("div", "exam-head",
      `<h2>Examen blanc</h2><p>Choisissez les sections et le nombre de questions, puis lancez l'entraînement. Correction immédiate et lien vers le cours.</p>`);
    content.appendChild(head);

    const setup = el("div", "setup");
    setup.appendChild(el("h3", null, "1 · Sections à inclure"));

    const grid = el("div", "opt-grid");
    const selected = new Set(COURSE.map((s) => s.id)); // tout par défaut
    COURSE.forEach((sec) => {
      const n = QUESTIONS.filter((q) => q.sid === sec.id).length;
      const chip = el("button", "chip sel",
        `${sec.num} · ${sec.title}<span class="ck">${n} questions · ✓</span>`);
      chip.onclick = () => {
        if (selected.has(sec.id)) { selected.delete(sec.id); chip.classList.remove("sel"); chip.querySelector(".ck").textContent = `${n} questions`; }
        else { selected.add(sec.id); chip.classList.add("sel"); chip.querySelector(".ck").textContent = `${n} questions · ✓`; }
        updateCount();
      };
      grid.appendChild(chip);
    });
    setup.appendChild(grid);

    setup.appendChild(el("h3", null, "2 · Réglages"));
    const row = el("div", "field-row");
    const fCount = el("div", "field",
      `<label>Nombre de questions</label>
       <select id="ex-count">
         <option value="10">10 (rapide)</option>
         <option value="20">20</option>
         <option value="30">30</option>
         <option value="45" selected>45 (format examen)</option>
         <option value="0">Toutes</option>
       </select>`);
    const fOrder = el("div", "field",
      `<label>Ordre</label>
       <select id="ex-order">
         <option value="shuffle" selected>Aléatoire</option>
         <option value="bysection">Par section</option>
       </select>`);
    row.appendChild(fCount); row.appendChild(fOrder);
    setup.appendChild(row);

    const avail = el("p", "qmeta");
    avail.id = "avail-line";
    setup.appendChild(avail);

    const start = el("button", "btn btn-primary", "Démarrer l'examen →");
    start.onclick = () => {
      if (selected.size === 0) return;
      const order = $("#ex-order").value;
      let want = parseInt($("#ex-count").value, 10);
      let pool = QUESTIONS.filter((q) => selected.has(q.sid));
      if (order === "shuffle") pool = shuffle(pool.slice());
      else pool = pool.slice().sort((a, b) => a.sid.localeCompare(b.sid));
      if (want > 0) pool = pool.slice(0, want);
      launchExam(pool);
    };
    setup.appendChild(start);
    content.appendChild(setup);

    function updateCount() {
      const total = QUESTIONS.filter((q) => selected.has(q.sid)).length;
      $("#avail-line").textContent = `${total} questions disponibles dans la sélection`;
      start.disabled = selected.size === 0;
    }
    updateCount();
  }

  /* ---------------- Exam runtime ---------------- */
  function launchExam(questions) {
    state.exam = {
      questions,
      i: 0,
      answers: new Array(questions.length).fill(null),
      revealed: new Array(questions.length).fill(false)
    };
    renderQuestion();
  }

  function renderQuestion() {
    const ex = state.exam;
    const q = ex.questions[ex.i];
    const sec = COURSE.find((s) => s.id === q.sid);
    content.innerHTML = "";

    // progress
    const answered = ex.answers.filter((a) => a !== null).length;
    const prog = el("div");
    prog.appendChild(el("div", "qprogress",
      `<div class="fill" style="width:${((ex.i) / ex.questions.length) * 100}%"></div>`));
    prog.appendChild(el("div", "qmeta",
      `<span>Question ${ex.i + 1} / ${ex.questions.length}</span><span>${answered} répondues</span>`));
    content.appendChild(prog);

    const card = el("div", "qcard");
    card.appendChild(el("div", "qtag",
      `<span class="tier-dot tier-${sec.tier}"></span> Section ${sec.num} · ${sec.title}`));
    card.appendChild(el("div", "qtext", q.q));

    const answers = el("div", "answers");
    const keys = ["A", "B", "C", "D", "E"];
    const chosen = ex.answers[ex.i];
    const revealed = ex.revealed[ex.i];

    q.opts.forEach((opt, idx) => {
      const a = el("button", "answer");
      a.innerHTML = `<span class="key">${keys[idx]}</span><span>${opt}</span>`;
      if (revealed) {
        a.classList.add("locked");
        if (idx === q.a) a.classList.add("correct");
        if (idx === chosen && chosen !== q.a) a.classList.add("wrong");
      } else if (idx === chosen) {
        a.classList.add("sel");
      }
      a.onclick = () => {
        if (ex.revealed[ex.i]) return;
        ex.answers[ex.i] = idx;
        ex.revealed[ex.i] = true;
        renderQuestion();
      };
      answers.appendChild(a);
    });
    card.appendChild(answers);

    // explanation + review link
    const exp = el("div", "explain" + (revealed ? " show" : ""));
    if (revealed) {
      const ok = chosen === q.a;
      exp.appendChild(el("div", "verdict " + (ok ? "ok" : "no"),
        ok ? "✓ Bonne réponse" : "✗ Réponse incorrecte"));
      exp.appendChild(el("p", null, q.exp));
      const lessonTitle = (sec.lessons.find(l => l.id === q.lid) || {}).title || "";
      const link = el("button", "review-link",
        `📖 Revoir : ${sec.title} → ${lessonTitle}`);
      link.onclick = () => jumpToLesson(q.sid, q.lid);
      exp.appendChild(link);
    }
    card.appendChild(exp);
    content.appendChild(card);

    // nav
    const nav = el("div", "exam-nav");
    const prev = el("button", "btn btn-ghost", "← Précédent");
    prev.disabled = ex.i === 0;
    prev.onclick = () => { ex.i--; renderQuestion(); window.scrollTo(0, 0); };

    const isLast = ex.i === ex.questions.length - 1;
    const next = el("button", "btn btn-primary", isLast ? "Voir le résultat →" : "Suivant →");
    next.onclick = () => {
      if (isLast) { showResults(); }
      else { ex.i++; renderQuestion(); window.scrollTo(0, 0); }
    };
    nav.appendChild(prev); nav.appendChild(next);
    content.appendChild(nav);
  }

  /* ---------------- Results ---------------- */
  function showResults() {
    const ex = state.exam;
    tbTitle.textContent = "Résultat";
    let correct = 0;
    const bySec = {};
    ex.questions.forEach((q, i) => {
      const ok = ex.answers[i] === q.a;
      if (ok) correct++;
      if (!bySec[q.sid]) bySec[q.sid] = { ok: 0, n: 0 };
      bySec[q.sid].n++;
      if (ok) bySec[q.sid].ok++;
    });
    const total = ex.questions.length;
    const pct = Math.round((correct / total) * 100);
    const pass = pct >= 70;

    content.innerHTML = "";
    const r = el("div", "result");

    const circ = 2 * Math.PI * 52;
    const off = circ * (1 - pct / 100);
    const ring = el("div", "scorering");
    ring.innerHTML =
      `<svg width="160" height="160" viewBox="0 0 120 120">
         <circle cx="60" cy="60" r="52" fill="none" stroke="#232c38" stroke-width="11"/>
         <circle cx="60" cy="60" r="52" fill="none" stroke="${pass ? '#3fcf8e' : '#ff4a2e'}"
            stroke-width="11" stroke-linecap="round"
            stroke-dasharray="${circ}" stroke-dashoffset="${off}"/>
       </svg>
       <div class="pct"><b>${pct}%</b><span>${correct}/${total}</span></div>`;
    r.appendChild(ring);

    r.appendChild(el("h2", null, pass ? "Prêt·e pour l'examen 🎯" : "Encore un peu d'entraînement"));
    r.appendChild(el("p", "verdict-line",
      pass ? "Vous dépassez le seuil indicatif de 70%. Continuez à réviser les sections les plus faibles."
           : "Sous le seuil indicatif de 70%. Revoyez en priorité les sections ci-dessous."));

    const bs = el("div", "bysec");
    COURSE.forEach((sec) => {
      const d = bySec[sec.id];
      if (!d) return;
      const p = Math.round((d.ok / d.n) * 100);
      const row = el("div", "row");
      row.innerHTML =
        `<span class="tier-dot tier-${sec.tier}"></span>
         <span class="nm">${sec.num} · ${sec.title}</span>
         <span class="bar"><i style="width:${p}%"></i></span>
         <span class="sc">${d.ok}/${d.n}</span>`;
      bs.appendChild(row);
    });
    r.appendChild(bs);

    const review = el("button", "btn btn-ghost", "Revoir les questions");
    review.onclick = () => { ex.i = 0; renderQuestion(); window.scrollTo(0, 0); };
    const again = el("button", "btn btn-primary", "Nouvel examen");
    again.onclick = () => startExamSetup();
    r.appendChild(review); r.appendChild(again);

    content.appendChild(r);
    window.scrollTo(0, 0);
  }

  /* ---------------- utils ---------------- */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ---------------- mobile drawer ---------------- */
  function closeMobile() {
    sidebar.classList.remove("open");
    $("#scrim").classList.remove("show");
  }
  $("#burger").onclick = () => {
    sidebar.classList.toggle("open");
    $("#scrim").classList.toggle("show");
  };
  $("#scrim").onclick = closeMobile;

  /* ---------------- wire mode buttons ---------------- */
  $("#mode-course").onclick = () => setMode("course");
  $("#mode-exam").onclick = () => setMode("exam");

  /* ---------------- init ---------------- */
  renderSidebar();
  renderSection(state.activeSection);
})();
