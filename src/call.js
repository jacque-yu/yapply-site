// ---------- CALL + REPORT ----------
// Sample calls for the four ICPs. Each "me" step can write or rewrite one resume line (duplex: the line changes while the person is still talking).
// kind: Added · Quantified · Corrected by voice · Reframed · Impact · Strength found
const NACE = ["Communication", "Critical thinking", "Teamwork", "Leadership", "Technology", "Professionalism"];
const PERSONAS = {
  a: { key: "A", name: "Maya Johnson", first: "Maya", img: () => IMG.a, role: "Senior, B.S. Statistics", aim: "Entry-level data analyst", mins: "9:42",
    line: "“All I have is class projects, a club and a campus job.”", contact: "maya.j@stateu.edu · Columbus, OH",
    edu: "State University, B.S. Statistics · May 2026 · GPA 3.5",
    before: [["Projects", "Member, Data Science Club"], ["Experience", "Peer tutor, Math Learning Center: helped students with homework"], ["Skills", "Python, SQL, regression (coursework)"]],
    sections: [["Projects", "Meal-Plan Retention Study · Data Science Club", ["p1"]], ["Experience", "Peer Tutor · Math Learning Center", ["e1", "e2"]]],
    steps: [
      { ai: "Let's start with the club. What did you actually work on?" },
      { me: "We did a project on why students drop the meal plan. I cleaned the survey data, mostly.", id: "p1", kind: "Added", html: "Cleaned and analyzed survey data on meal-plan cancellations." },
      { ai: "How many responses, and which tools?" },
      { me: "About 2,400 responses. Python and pandas, then a logistic regression.", id: "p1", kind: "Quantified", html: "Cleaned <mark>2,400 survey responses</mark> in <mark>Python (pandas)</mark> and built a <mark>logistic regression</mark> to predict meal-plan cancellations." },
      { ai: "Did anyone actually use the result?" },
      { me: "Yeah, dining services changed the plan options the next semester.", id: "p1", kind: "Impact", html: "Cleaned 2,400 survey responses in Python (pandas) and built a logistic regression to predict meal-plan cancellations; <mark>findings shaped dining services' plan options</mark> the next semester.", strength: ["Turns analysis into decisions", "Critical thinking"] },
      { ai: "Switching to tutoring. How many students a week?" },
      { me: "Like 15 a week. Oh wait, more like 20 during finals.", id: "e1", kind: "Corrected by voice", html: "Tutored <mark>15–20 students a week</mark> in statistics and calculus." },
      { ai: "Did you change how the center tutors?" },
      { me: "I made a sheet of the most common mistakes. The center hands it to everyone now.", id: "e2", kind: "Strength found", html: "<mark>Created a common-mistakes guide</mark> that the center now gives every student.", strength: ["Explains hard ideas simply", "Communication"] }
    ],
    extra: [["Data analysis in Python", "Technology", "2,400 responses, pandas, logistic regression"], ["Initiative without a title", "Leadership", "Made a guide nobody asked for; it became standard"]] },
  b: { key: "B", name: "Lin Chen", first: "Lin", img: () => IMG.b, role: "M.S. Materials Science · F-1, OPT from June 2026", aim: "Data scientist, manufacturing", mins: "11:05",
    line: "“I explain my work better out loud than in written English.”", contact: "lin.chen@techu.edu · Pittsburgh, PA",
    edu: "Tech University, M.S. Materials Science · May 2026",
    before: [["Research", "Responsible for data analysis in battery lab."], ["Research", "Participated in group meetings and presented results."]],
    sections: [["Research", "Graduate Researcher · Battery Materials Lab", ["r1", "r2", "r3"]]],
    steps: [
      { ai: "Tell me about the lab work. Say it however it comes out." },
      { me: "We test battery cells. I wrote Python to read the sensor data... it was 18 months of data.", id: "r1", kind: "Added", html: "Analyzed <mark>18 months</mark> of battery-cell sensor data in <mark>Python</mark>." },
      { ai: "What did you find in it?" },
      { me: "One machine had calibration problem, so many tests repeat. After we fix, re-test is less, maybe 30 percent.", id: "r1", kind: "Quantified", html: "Analyzed 18 months of battery-cell sensor data in Python, <mark>tracing repeat failures to a calibration error</mark> and <mark>cutting the lab's re-test rate by 30%</mark>.", strength: ["Root-cause analysis", "Critical thinking"] },
      { ai: "Who did you show this to, and how?" },
      { me: "I made dashboard and presented to my professor and the company sponsor.", id: "r2", kind: "Reframed", html: "Built a <mark>Plotly dashboard</mark> and presented findings to the PI and an <mark>industry sponsor</mark>.", strength: ["Explains technical work to industry", "Communication"] },
      { ai: "Did the sponsor do anything with it?" },
      { me: "They use my script in their factory now. Two lines, I think.", id: "r3", kind: "Impact", html: "Sponsor adopted the analysis script on <mark>2 production lines</mark>." }
    ],
    extra: [["Production-grade Python", "Technology", "Script now runs on 2 production lines"], ["Works across lab and industry", "Teamwork", "Presented to PI and sponsor"]] },
  c: { key: "C", name: "Diego Ramirez", first: "Diego", img: () => IMG.c, role: "B.A. Economics 2024 · grocery shift lead", aim: "Junior data analyst", mins: "10:18",
    line: "“Recruiters don't see a shift lead as a data analyst.”", contact: "diego.r@email.com · San Antonio, TX",
    edu: "City University, B.A. Economics · 2024",
    before: [["Experience", "Cashier and shift lead. Handled customers, opened and closed the store."], ["Education", "B.A. Economics"]],
    sections: [["Experience", "Shift Lead · Neighborhood Grocery", ["x1", "x2"]], ["Projects", "Senior Thesis · Economics", ["t1"]]],
    steps: [
      { ai: "You're a shift lead. What do you keep track of during a shift?" },
      { me: "Sales, waste, who's on the schedule. I keep a spreadsheet for the manager.", id: "x1", kind: "Reframed", html: "Maintained weekly <mark>sales and waste tracking in Excel</mark> for store management." },
      { ai: "What did that spreadsheet show?" },
      { me: "Three products we always threw away, so we ordered less. Saved like a thousand a month... maybe twelve hundred.", id: "x1", kind: "Quantified", html: "Maintained weekly sales and waste tracking in Excel; flagged <mark>3 slow-moving products</mark>, cutting waste by <mark>$1.2K a month</mark>.", strength: ["Finds the number that matters", "Critical thinking"] },
      { ai: "How many people are on your shift?" },
      { me: "Twelve. I build the schedule around the busy hours.", id: "x2", kind: "Added", html: "Lead a <mark>12-person shift</mark>; build the weekly schedule around <mark>sales peaks</mark>.", strength: ["Leads people under pressure", "Leadership"] },
      { ai: "Anything from your economics degree you still use?" },
      { me: "My senior thesis was on food prices. Regression, in Stata.", id: "t1", kind: "Added", html: "Regression analysis of regional <mark>food-price inflation</mark> in <mark>Stata</mark>." }
    ],
    extra: [["Spreadsheet modeling", "Technology", "Weekly sales and waste model in Excel"], ["Econometrics", "Technology", "Stata regression thesis"]] },
  d: { key: "D", name: "Priya Nair", first: "Priya", img: () => IMG.d, role: "Operations coordinator, 2 years · logistics", aim: "Associate product manager", mins: "12:30",
    line: "“My experience is real, but it points the wrong way.”", contact: "priya.nair@email.com · Chicago, IL",
    edu: "State University, B.S. Supply Chain Management · 2023",
    before: [["Experience", "Operations coordinator managing vendor schedules."], ["Experience", "Point of contact for vendors and warehouse."]],
    sections: [["Experience", "Operations Coordinator · Regional Logistics Co.", ["o1", "o2", "o3"]]],
    steps: [
      { ai: "Where do you want to go next?" },
      { me: "Product management. But I've only done operations." },
      { ai: "Let's find the product work hiding in it. What broke most often?" },
      { me: "Vendors missed their delivery slots, constantly. We have about 40 vendors.", id: "o1", kind: "Reframed", html: "Identified missed delivery slots across <mark>40 vendors</mark> as the top operations problem." },
      { ai: "What did you do about it?" },
      { me: "I set up a booking sheet with automatic reminders, then we turned it into a small internal tool with IT.", id: "o1", kind: "Reframed", html: "Identified missed delivery slots across 40 vendors as the top operations problem; <mark>designed a self-serve booking flow</mark> with reminders and <mark>shipped it with IT</mark>.", strength: ["Ships a fix, not just a report", "Technology"] },
      { ai: "And the result?" },
      { me: "Missed deliveries dropped about a quarter.", id: "o2", kind: "Quantified", html: "Cut missed deliveries by <mark>25%</mark> within one quarter of launch." },
      { ai: "How did you decide what to build?" },
      { me: "I called the warehouse leads and some vendors. Maybe ten calls.", id: "o3", kind: "Strength found", html: "Ran <mark>10 user interviews</mark> with warehouse leads and vendors to define requirements.", strength: ["User research instinct", "Communication"] }
    ],
    extra: [["Owns a metric", "Professionalism", "Missed deliveries, tracked to the quarter"], ["Cross-team delivery", "Teamwork", "Built the tool with IT"]] }
};

function personaReport(p) {
  const lines = {}; const log = [];
  p.steps.forEach((s, i) => { if (s.id) { log.push({ i, prev: lines[s.id], ...s }); lines[s.id] = s.html; } });
  const strengths = [...p.steps.filter(s => s.strength).map(s => [s.strength[0], s.strength[1], "“" + s.me + "”"]), ...p.extra];
  const numbers = Object.values(lines).join(" ").match(/\$?\d[\d,.]*\s?%?(K)?/g) || [];
  return { lines, log, strengths, numbers: numbers.length, questions: p.steps.filter(s => s.ai).length, corrections: log.filter(l => l.prev).length };
}
const stamp = (i, n, total) => { const [m, s] = total.split(":").map(Number); const sec = Math.round(((i + 1) / (n + 1)) * (m * 60 + s)); return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; };

function resumePaper(p, lines, live) {
  return `<div class="paper rp">
    <div class="rp-top"><span class="eyebrow" style="margin:0">${live ? '<span class="rec"></span>Writing live' : "Final resume"}</span><span class="small muted">${esc(p.aim)}</span></div>
    <h3 style="margin:14px 0 0">${p.name}</h3><p class="small muted" style="margin:0 0 12px">${p.contact}</p>
    <h5>Education</h5><p class="small">${p.edu}</p>
    ${p.sections.map(([h, sub, ids]) => `<h5>${h}</h5><p class="small"><b>${sub}</b></p><ul class="small">${ids.map(id => `<li data-l="${id}">${lines[id] || '<span class="ghost">listening…</span>'}</li>`).join("")}</ul>`).join("")}
  </div>`;
}

// Hero: persona switcher on a photo, with live bubbles (Retell-style)
function heroStage() {
  const keys = Object.keys(PERSONAS);
  onRender(() => {
    const root = $("#stage"); if (!root) return;
    let k = 0, timer, bub;
    const show = (i, manual) => {
      k = i; const p = PERSONAS[keys[i]];
      root.querySelectorAll(".av").forEach((b, j) => { b.setAttribute("aria-pressed", j === i); });
      root.querySelector(".st-img").style.backgroundImage = `url(${p.img()})`;
      root.querySelector(".st-who").innerHTML = `<b>${p.name}</b><span>${p.role}</span>`;
      root.querySelector(".st-call").setAttribute("href", "#call-" + keys[i]);
      root.querySelector(".st-call span").textContent = `Hear ${p.first}'s call`;
      const qs = p.steps.filter(s => s.ai), ms = p.steps.filter(s => s.me && s.id);
      let n = 0; clearInterval(bub);
      const paint = () => {
        const q = qs[n % qs.length], m = ms[n % ms.length];
        root.querySelector(".b-ai").textContent = q.ai; root.querySelector(".b-me").textContent = m.me;
        root.querySelector(".b-line").innerHTML = `<small>${m.kind} · on your resume</small>${m.html}`;
        root.querySelectorAll(".bub").forEach(b => { b.classList.remove("in"); void b.offsetWidth; b.classList.add("in"); });
        n++;
      };
      paint(); bub = setInterval(() => { if (!root.isConnected) return clearInterval(bub); paint(); }, 4200);
      if (manual) clearInterval(timer);
    };
    root.querySelectorAll(".av").forEach((b, j) => b.addEventListener("click", () => show(j, true)));
    show(0);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => { if (!root.isConnected) return clearInterval(timer); show((k + 1) % keys.length); }, 12600);
  });
  return `<div class="stage" id="stage">
    <div class="st-img" role="img" aria-label="A Yapply user on a coaching call"></div><div class="st-shade"></div>
    <div class="avs" role="group" aria-label="Choose whose call to hear">${keys.map(k => `<button class="av" type="button" aria-pressed="false" style="background-image:url(${PERSONAS[k].img()})" aria-label="${PERSONAS[k].name}, ${ICP[PERSONAS[k].key].tag}"><b>${PERSONAS[k].key}</b></button>`).join("")}</div>
    <div class="bub b-ai"></div><div class="bub b-me"></div><div class="bub b-line"></div>
    <div class="st-foot"><div class="st-who"></div><a class="st-call" href="#call-a"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg><span>Hear Maya's call</span></a></div>
  </div>`;
}

// Call lobby: in the product this opens the microphone; this prototype plays a sample call.
route("call", () => {
  onRender(() => {
    $("#mic").addEventListener("click", async () => {
      const note = $("#mic-note");
      try { const s = await navigator.mediaDevices.getUserMedia({ audio: true }); s.getTracks().forEach(t => t.stop()); note.textContent = "Microphone works. Live calls open at launch; for now, hear a sample call below."; }
      catch (e) { note.textContent = "This preview can't open your microphone. Hear a sample call below: it works the same way."; }
      note.classList.remove("hidden");
    });
  });
  return { title: "Start a free call", seoTitle: "Start a Free Call with Your AI Career Coach | Yapply", desc: "Talk with Yapply's AI career coach for 10 minutes. It digs into what you've done and writes your resume live while you speak.", path: "/call", crumbs: [["Home", "home"], ["Call"]],
    html: `<section class="lobby"><div class="wrap lobby-in">
      <div class="orb big" aria-hidden="true"></div>
      <h1 class="serif">Your coach is ready.</h1>
      <p class="lead muted">About 10 minutes. No resume needed. Talk about anything you've done (classes, a club, a job outside your field) and watch your resume being written while you speak.</p>
      <div class="row center"><button class="btn primary lg" id="mic" type="button">Allow microphone & start</button></div>
      <p id="mic-note" class="answer hidden" style="max-width:560px;margin:18px auto 0"></p>
      <p class="small muted" style="margin-top:34px">Or hear a sample call first:</p>
      <div class="lobby-ps">${Object.entries(PERSONAS).map(([k, p]) => `<a class="lp" href="#call-${k}"><span class="lp-img" style="background-image:url(${p.img()})"></span><span><b>${p.first}</b><small>${ICP[p.key].tag}</small></span></a>`).join("")}</div>
    </div></section>` };
});

pattern(/^call-([abcd])$/, k => {
  const p = PERSONAS[k], r = personaReport(p);
  onRender(() => {
    const root = $("#callscr"); if (!root) return;
    const tx = root.querySelector(".tx"), live = {}, cap = root.querySelector(".cap"), meter = root.querySelector(".cs-meter");
    let i = 0, edits = 0, t0 = Date.now(), timers = [];
    const total = (() => { const [m, s] = p.mins.split(":").map(Number); return m * 60 + s; })();
    const clock = setInterval(() => { if (!root.isConnected) return clearInterval(clock); const sec = Math.min(total, Math.round((Date.now() - t0) / 1000 * (total / (p.steps.length * 2.6)))); root.querySelector(".clk").textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; }, 250);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      if (!root.isConnected) return;
      if (i >= p.steps.length) { clearInterval(clock); root.querySelector(".clk").textContent = p.mins; root.classList.add("ended"); return; }
      const s = p.steps[i++];
      tx.insertAdjacentHTML("beforeend", `<div class="bubble ${s.ai ? "ai" : "me"}"><small>${s.ai ? "COACH" : p.first.toUpperCase()}</small>${esc(s.ai || s.me)}</div>`); tx.scrollTop = tx.scrollHeight;
      cap.textContent = s.ai ? "Coach is asking…" : `${p.first} is talking · resume updating`;
      root.classList.toggle("talking", !!s.me);
      if (s.id) timers.push(setTimeout(() => {
        const li = root.querySelector(`[data-l="${s.id}"]`); if (!li) return;
        li.innerHTML = s.html; li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash");
        edits++; meter.innerHTML = `<b>${edits}</b> live edits · <b>${(Object.assign(live, { [s.id]: s.html }), (Object.values(live).join(" ").match(/\$?\d[\d,.]*\s?%?(K)?/g) || []).length)}</b> numbers found`;
        const chip = document.createElement("div"); chip.className = "kind-chip"; chip.textContent = s.kind; li.appendChild(chip);
      }, reduce ? 0 : 900));
      timers.push(setTimeout(step, reduce ? 50 : (s.me ? 2600 : 1700)));
    };
    timers.push(setTimeout(step, reduce ? 0 : 600));
    root.querySelector(".skip").addEventListener("click", () => { timers.forEach(clearTimeout); while (i < p.steps.length) { const s = p.steps[i++]; tx.insertAdjacentHTML("beforeend", `<div class="bubble ${s.ai ? "ai" : "me"}"><small>${s.ai ? "COACH" : p.first.toUpperCase()}</small>${esc(s.ai || s.me)}</div>`); } Object.entries(r.lines).forEach(([id, h]) => { const li = root.querySelector(`[data-l="${id}"]`); if (li) li.innerHTML = h; }); meter.innerHTML = `<b>${r.log.length}</b> live edits · <b>${r.numbers}</b> numbers found`; clearInterval(clock); root.querySelector(".clk").textContent = p.mins; root.classList.add("ended"); });
  });
  return { title: `Sample call: ${p.name}`, seoTitle: `Sample AI Career Coach Call: ${ICP[p.key].tag} | Yapply`, desc: `Hear a sample Yapply call with ${p.first} (${ICP[p.key].tag.toLowerCase()}) and watch the resume being written live as they talk.`, path: "/call/sample-" + k, crumbs: [["Home", "home"], ["Call", "call"], [p.first]],
    html: `<section class="callscr" id="callscr"><div class="wrap">
      <div class="cs-top"><div class="row" style="gap:12px"><span class="lp-img sm" style="background-image:url(${p.img()})"></span><div><b>${p.name}</b><div class="small" style="opacity:.7">${p.role} · aiming for ${p.aim}</div></div></div>
        <div class="row" style="gap:10px"><span class="live-dot">LIVE</span><span class="clk num">0:00</span><button class="btn sm ghost-d skip" type="button">Skip to end</button></div></div>
      <div class="cs-grid">
        <div class="cs-left"><div class="orb" aria-hidden="true"></div><p class="cap">Connecting…</p>
          <div class="wave" aria-hidden="true">${Array.from({ length: 32 }, (_, j) => `<i style="animation-delay:${(j * 0.06).toFixed(2)}s"></i>`).join("")}</div>
          <div class="tx" aria-live="polite"></div></div>
        <div class="cs-right"><p class="cs-meter small"><b>0</b> live edits · <b>0</b> numbers found</p>${resumePaper(p, {}, true)}</div>
      </div>
      <div class="ended-card"><div><span class="eyebrow" style="margin:0;color:#ffe04a">Call ended · ${p.mins}</span><h2 class="serif" style="margin:6px 0 4px">${p.first}'s report is ready.</h2><p style="opacity:.75;margin:0">How the resume was written live, and what the coach dug up.</p></div><a class="btn primary lg" href="#report-${k}">See the report →</a></div>
      <p class="small" style="opacity:.55;margin-top:18px">Sample call with a fictional person. In the app, you talk with your own voice.</p>
    </div></section>` };
});

pattern(/^report-([abcd])$/, k => {
  const p = PERSONAS[k], r = personaReport(p), n = p.steps.length;
  const comp = NACE.map(c => [c, r.strengths.filter(s => s[1] === c).length]).filter(([, v]) => v);
  const max = Math.max(...comp.map(c => c[1]), 1);
  return { title: `Call report: ${p.name}`, seoTitle: `Sample Career Coach Report: ${ICP[p.key].tag} | Yapply`, desc: `A sample Yapply call report: how ${p.first}'s resume was written live during the call, before-and-after lines, and the strengths the AI career coach uncovered.`, path: "/report/sample-" + k, crumbs: [["Home", "home"], ["Call", "call"], [p.first + "'s report"]],
    html: `<section class="rep-head"><div class="wrap">
      <div class="rh-grid"><div><span class="eyebrow">Call report · sample · ${p.mins}</span><h1 class="serif">${p.first} talked for ${p.mins.split(":")[0]} minutes. Here's what the coach found.</h1>
        <p class="lead muted">${p.role}. Aiming for ${p.aim.toLowerCase()}. Came in saying: <i>${p.line}</i></p></div>
        <div class="rh-photo" style="background-image:url(${p.img()})"></div></div>
      <div class="kpis">${[[r.questions, "follow-up questions"], [r.log.length, "lines written live"], [r.corrections, "rewrites as the story got better"], [r.numbers, "numbers you didn't have before"]].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join("")}</div>
    </div></section>

    <section class="section"><div class="wrap">
      <span class="eyebrow">01 · Before and after</span><h2 class="serif">Same person. Same experience. Different resume.</h2>
      <div class="ba2">
        <div class="ba-col old"><h4>What ${p.first} had</h4>${p.before.map(([h, t]) => `<p><small>${h}</small>${esc(t)}</p>`).join("")}<p class="ba-stat">0 numbers · ${p.before.length} lines describing duties</p></div>
        <div class="ba-arrow" aria-hidden="true">→</div>
        <div class="ba-col new"><h4>After one call</h4>${p.sections.map(([h, sub, ids]) => `<p><small>${h} · ${sub}</small></p>${ids.map(id => `<p>${r.lines[id]}</p>`).join("")}`).join("")}<p class="ba-stat">${r.numbers} numbers · every line a result</p></div>
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <span class="eyebrow">02 · Written live, in full duplex</span><h2 class="serif">How the resume was written while ${p.first} talked</h2>
      <p class="muted" style="max-width:64ch">The coach listens and writes at the same time. Each answer lands on the resume within seconds; a better answer later rewrites the line instead of adding a new one.</p>
      <ol class="tl2">${r.log.map(l => `<li><span class="t num">${stamp(l.i, n, p.mins)}</span><div class="tl-body">
        <p class="said">“${esc(l.me)}”</p>
        <div class="wrote"><span class="kind k-${l.kind.split(" ")[0].toLowerCase()}">${l.kind}</span>${l.prev ? `<p class="prev">${l.prev.replace(/<\/?mark>/g, "")}</p>` : ""}<p>${l.html}</p></div></div></li>`).join("")}</ol>
    </div></section>

    <section class="section"><div class="wrap">
      <span class="eyebrow">03 · What the coach dug up</span><h2 class="serif">Strengths ${p.first} never wrote down</h2>
      <div class="str-grid">${r.strengths.map(([name, c, ev]) => `<div class="str"><span class="tag">${c}</span><h3>${name}</h3><p class="small muted">Evidence: ${esc(ev)}</p></div>`).join("")}</div>
      <div class="tmap"><h3>Talent map <span class="small muted">· NACE career-readiness competencies, by evidence found in the call</span></h3>
        ${comp.map(([c, v]) => `<div class="tm-row"><span>${c}</span><div class="tm-bar"><i style="width:${(v / max) * 100}%"></i></div><b class="num">${v}</b></div>`).join("")}</div>
    </div></section>

    <section class="section"><div class="wrap rep-final">
      <div><span class="eyebrow">04 · The resume</span><h2 class="serif">Ready the moment the call ended</h2><p class="muted">One page, ATS-friendly, every line from what ${p.first} said. Next: tailor it to a job, or practice the interview with the same coach.</p>
        <div class="row" style="margin-top:20px"><a class="btn primary lg" href="#call">Start my own call</a><a class="btn" href="#feature-tailored-applications">Tailor to a job</a><a class="btn" href="#feature-ai-mock-interview">Practice the interview</a></div>
        <p class="small muted" style="margin-top:22px">Other sample reports: ${Object.keys(PERSONAS).filter(x => x !== k).map(x => `<a href="#report-${x}">${PERSONAS[x].first} (${ICP[PERSONAS[x].key].tag.toLowerCase()})</a>`).join(" · ")}</p></div>
      ${resumePaper(p, r.lines, false)}
    </div></section>` };
});
