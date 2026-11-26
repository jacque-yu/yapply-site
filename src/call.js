// ---------- CALL + REPORT ----------
// Sample calls for the four ICPs. Each "me" step can write or rewrite one resume line (duplex: the line changes while the person is still talking).
// kind: Added · Quantified · Corrected by voice · Reframed · Impact · Strength found
const NACE = ["Communication", "Critical thinking", "Teamwork", "Leadership", "Technology", "Professionalism"];
const PERSONAS = {
  a: { key: "A", name: "Maya Johnson", first: "Maya", img: () => IMG.a, role: "IT support specialist, 2 years · regional health network", aim: "Data analyst", mins: "9:42",
    line: "“I fix laptops. Data teams don't think that counts.”", contact: "maya.johnson@email.com · Columbus, OH",
    edu: "State University, B.S. Information Systems · 2024",
    before: [["Experience", "IT support specialist: resolved tickets and helped staff with technical issues."], ["Skills", "Windows, Active Directory, ServiceNow"]],
    sections: [["Experience", "IT Support Specialist · Regional Health Network", ["e1", "e2", "e3"]]],
    steps: [
      { ai: "You want data analyst roles. What do you already measure in support?" },
      { me: "We track tickets in ServiceNow. I export them every week to see what's breaking.", id: "e1", kind: "Reframed", html: "Built a weekly <mark>ticket-trend report</mark> from <mark>ServiceNow data</mark> to show which issues were rising." },
      { ai: "Which tools, and how much data?" },
      { me: "Excel, and some SQL against the ticket database. About 1,800 tickets a month.", id: "e1", kind: "Quantified", html: "Built a weekly ticket-trend report from ServiceNow data (<mark>~1,800 tickets a month</mark>) using <mark>SQL and Excel</mark>.", strength: ["Works with real operational data", "Technology"] },
      { ai: "Did anything change because of that report?" },
      { me: "It showed password resets were a third of all tickets. We rolled out self-service reset and they dropped by half.", id: "e2", kind: "Impact", html: "Showed password resets were <mark>a third of all tickets</mark>; the self-service reset that followed <mark>cut them by half</mark>.", strength: ["Turns data into a decision", "Critical thinking"] },
      { ai: "Who sees your findings?" },
      { me: "The IT director, every month. Wait, every two weeks since spring.", id: "e3", kind: "Corrected by voice", html: "Present findings to the IT director <mark>every two weeks</mark>.", strength: ["Explains numbers to leaders", "Communication"] }
    ],
    extra: [["SQL on production data", "Technology", "Queries the ticket database weekly"], ["Reliable stakeholder reporting", "Professionalism", "Biweekly director updates"]],
    fits: [["Data analyst", "Strong fit", "SQL, weekly reporting, a finding that changed a decision"], ["IT operations analyst", "Strong fit", "Knows the systems and the data behind them"], ["BI analyst", "Worth exploring", "Gap: no dashboard tool yet (Tableau or Power BI)"]] },
  b: { key: "B", name: "Lin Chen", first: "Lin", img: () => IMG.b, role: "High school biology teacher, 2 years", aim: "Life-science sales", mins: "11:05",
    line: "“Teaching doesn't sound like sales on paper.”", contact: "lin.chen@email.com · Boston, MA",
    edu: "State University, B.S. Biology · 2024",
    before: [["Experience", "Biology teacher: planned lessons and taught five classes."], ["Experience", "Lab coordinator for the science department."]],
    sections: [["Experience", "Biology Teacher · Lincoln High School", ["t1", "t2", "t3"]]],
    steps: [
      { ai: "You're aiming for life-science sales. Where in teaching do you persuade people?" },
      { me: "Every day, honestly. Getting 150 teenagers to care about cell biology.", id: "t1", kind: "Reframed", html: "Taught biology to <mark>150 students</mark> across five sections, getting teenagers to care about cell biology." },
      { ai: "Have you ever had to win budget or buy-in?" },
      { me: "I pitched the principal for new lab equipment. Got about eight thousand dollars approved.", id: "t2", kind: "Quantified", html: "<mark>Secured $8K</mark> in lab-equipment funding by pitching the principal.", strength: ["Makes the case for budget", "Communication"] },
      { ai: "What happened after the equipment arrived?" },
      { me: "Our state exam pass rate went from 71 to 84 percent.", id: "t2", kind: "Impact", html: "<mark>Secured $8K</mark> in lab-equipment funding by pitching the principal; state-exam pass rate rose from <mark>71% to 84%</mark> the next year.", strength: ["Ties a pitch to outcomes", "Critical thinking"] },
      { ai: "Do you deal with any vendors?" },
      { me: "I'm the department's contact for our lab supplier. I run their product demos for the other teachers.", id: "t3", kind: "Reframed", html: "Department contact for a <mark>lab-supply vendor</mark>; run their product demos for the other teachers.", strength: ["Already knows the buyer's side", "Professionalism"] }
    ],
    extra: [["Presenting to tough rooms", "Communication", "Five classes a day"], ["Product knowledge", "Technology", "B.S. Biology; runs the lab equipment"]],
    fits: [["Life-science sales rep", "Strong fit", "Budget pitch, outcome story, vendor-side experience"], ["Customer success (EdTech)", "Strong fit", "Onboards and trains users every day"], ["Instructional designer", "Worth exploring", "Gap: no authoring tool yet (Articulate or Captivate)"]] },
  c: { key: "C", name: "Diego Ramirez", first: "Diego", img: () => IMG.c, role: "Assistant store manager, 3 years · grocery", aim: "Operations analyst", mins: "10:18",
    line: "“Recruiters see a store, not the operations I run.”", contact: "diego.ramirez@email.com · San Antonio, TX",
    edu: "City University, B.A. Economics · 2023",
    before: [["Experience", "Assistant store manager. Handled customers, scheduling, opened and closed the store."]],
    sections: [["Experience", "Assistant Store Manager · Riverside Market", ["x1", "x2", "x3"]]],
    steps: [
      { ai: "You're aiming for operations analyst roles. What do you track every week?" },
      { me: "Sales, waste, labor hours. I keep a spreadsheet for the district manager.", id: "x1", kind: "Reframed", html: "Own the store's weekly <mark>sales, waste and labor-hours tracking</mark> in Excel for the district manager." },
      { ai: "What has that spreadsheet shown you?" },
      { me: "Three products we always threw away. We ordered less and saved about a thousand a month. Maybe twelve hundred.", id: "x1", kind: "Quantified", html: "Own the store's weekly sales, waste and labor-hours tracking in Excel; flagged <mark>3 slow-moving products</mark>, cutting waste by <mark>$1.2K a month</mark>.", strength: ["Finds the number that matters", "Critical thinking"] },
      { ai: "How do you build the schedule?" },
      { me: "Twelve people on my shift. I match staffing to the sales peaks, hour by hour.", id: "x2", kind: "Reframed", html: "Schedule a <mark>12-person team</mark> against <mark>hourly sales peaks</mark>.", strength: ["Capacity planning", "Leadership"] },
      { ai: "Have you changed a process for the whole store?" },
      { me: "I redid how we receive deliveries. Check-in went from forty minutes to fifteen.", id: "x3", kind: "Impact", html: "<mark>Redesigned delivery receiving</mark>, cutting check-in from <mark>40 to 15 minutes</mark>.", strength: ["Fixes processes", "Professionalism"] }
    ],
    extra: [["Spreadsheet modeling", "Technology", "Weekly sales, waste and labor model"], ["Economics background", "Critical thinking", "B.A. Economics"]],
    fits: [["Operations analyst", "Strong fit", "Forecasting, waste analysis, a process redesign with a number"], ["Inventory or supply chain analyst", "Strong fit", "Ordering decisions backed by data"], ["Project coordinator", "Worth exploring", "Gap: no cross-team project yet"]] },
  d: { key: "D", name: "Priya Nair", first: "Priya", img: () => IMG.d, role: "Consulting analyst, 2 years · supply-chain clients", aim: "Associate product manager", mins: "12:30",
    line: "“Consulting decks don't read like product work.”", contact: "priya.nair@email.com · Chicago, IL",
    edu: "State University, B.S. Industrial Engineering · 2024",
    before: [["Experience", "Business analyst: supported client engagements and built slide decks."], ["Experience", "Conducted research and analysis for logistics clients."]],
    sections: [["Experience", "Business Analyst · Supply-chain consulting", ["o1", "o2", "o3"]]],
    steps: [
      { ai: "Where do you want to go next?" },
      { me: "Product management. But I've only done consulting." },
      { ai: "Let's find the product work in it. On your last project, what was the client's problem?" },
      { me: "Vendors kept missing their delivery slots. About 40 vendors.", id: "o1", kind: "Reframed", html: "Diagnosed missed delivery slots across <mark>40 vendors</mark> as a logistics client's top problem." },
      { ai: "How did you work out what to build?" },
      { me: "I interviewed the warehouse leads and some vendors. Ten calls... no, twelve.", id: "o2", kind: "Corrected by voice", html: "Ran <mark>12 user interviews</mark> with warehouse leads and vendors to define requirements.", strength: ["User research instinct", "Communication"] },
      { ai: "And what shipped?" },
      { me: "A self-serve booking flow with reminders. The client's IT team built it with me. Missed deliveries dropped about a quarter.", id: "o1", kind: "Impact", html: "Diagnosed missed delivery slots across 40 vendors; <mark>designed a self-serve booking flow</mark> with reminders, built with the client's IT team, <mark>cutting missed deliveries 25%</mark>.", strength: ["Ships with engineers", "Technology"] },
      { ai: "How did you decide what went into version one?" },
      { me: "We ranked features by how many missed slots each would prevent, and cut the rest.", id: "o3", kind: "Strength found", html: "<mark>Prioritized v1 by impact</mark> on missed slots and cut lower-value features.", strength: ["Prioritizes like a PM", "Critical thinking"] }
    ],
    extra: [["Executive communication", "Communication", "Client steering-committee updates"], ["Structured problem solving", "Critical thinking", "Consulting training"]],
    fits: [["Associate product manager", "Strong fit", "User interviews, a spec that shipped, impact-based prioritization"], ["Business operations (BizOps)", "Strong fit", "Diagnoses problems with data, works across teams"], ["Product operations", "Worth exploring", "Gap: no experience with product analytics tools yet"]] }
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
      root.querySelector(".st-who").innerHTML = `<b>${p.name}</b><span>${ICP[p.key].tag}</span>`;
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
  return { title: "Start a free call", seoTitle: "Start a Free Call with Your AI Career Coach | Yapply", desc: "Talk with Yapply's AI career coach for 10 minutes. It finds what transfers from your current job and rewrites your resume for the direction you want, live.", path: "/call", crumbs: [["Home", "home"], ["Call"]],
    html: `<section class="lobby"><div class="wrap lobby-in">
      <div class="orb big" aria-hidden="true"></div>
      <h1 class="serif">Your coach is ready.</h1>
      <p class="lead muted">About 10 minutes. No resume needed. Tell the coach where you want to go, or that you're not sure yet, then talk about your current job. Watch it rewrite your experience for the new direction while you speak.</p>
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
  return { title: `Call report: ${p.name}`, seoTitle: `Sample Career Coach Report: ${ICP[p.key].tag} | Yapply`, desc: `A sample Yapply career-change report: how ${p.first}'s resume was rewritten for ${p.aim.toLowerCase()} roles during the call, which directions fit, and what transfers.`, path: "/report/sample-" + k, crumbs: [["Home", "home"], ["Call", "call"], [p.first + "'s report"]],
    html: `<section class="rep-head"><div class="wrap">
      <div class="rh-grid"><div><span class="eyebrow">Call report · sample · ${p.mins}</span><h1 class="serif">${p.first} talked for ${p.mins.split(":")[0]} minutes. Here's what transfers.</h1>
        <p class="lead muted">${p.role}. Aiming for ${p.aim.toLowerCase()}. Came in saying: <i>${p.line}</i></p></div>
        <div class="rh-photo" style="background-image:url(${p.img()})"></div></div>
      <div class="kpis">${[[r.questions, "follow-up questions"], [r.log.length, "lines written live"], [r.corrections, "rewrites as the story got better"], [r.numbers, "numbers for the new role"]].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join("")}</div>
    </div></section>

    <section class="section"><div class="wrap">
      <span class="eyebrow">01 · Before and after</span><h2 class="serif">Same experience. New direction.</h2>
      <div class="ba2">
        <div class="ba-col old"><h4>Written for the old job</h4>${p.before.map(([h, t]) => `<p><small>${h}</small>${esc(t)}</p>`).join("")}<p class="ba-stat">0 numbers · ${p.before.length} lines in the old field's language</p></div>
        <div class="ba-arrow" aria-hidden="true">→</div>
        <div class="ba-col new"><h4>Written for ${p.aim.toLowerCase()} roles</h4>${p.sections.map(([h, sub, ids]) => `<p><small>${h} · ${sub}</small></p>${ids.map(id => `<p>${r.lines[id]}</p>`).join("")}`).join("")}<p class="ba-stat">${r.numbers} numbers · every line evidence for the new role</p></div>
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
      <span class="eyebrow">03 · Where the evidence points</span><h2 class="serif">Directions ${p.first}'s experience already fits</h2>
      <div class="fits">${p.fits.map(([role, lvl, why]) => `<div class="fit ${lvl.startsWith("Strong") ? "strong" : ""}"><span class="tag">${lvl}</span><h3>${role}</h3><p class="small muted">${why}</p></div>`).join("")}</div>
      <h3 style="margin:48px 0 16px">What transfers</h3>
      <div class="str-grid">${r.strengths.map(([name, c, ev]) => `<div class="str"><span class="tag">${c}</span><h3>${name}</h3><p class="small muted">Evidence: ${esc(ev)}</p></div>`).join("")}</div>
      <div class="tmap"><h3>Talent map <span class="small muted">· NACE career-readiness competencies, by evidence found in the call</span></h3>
        ${comp.map(([c, v]) => `<div class="tm-row"><span>${c}</span><div class="tm-bar"><i style="width:${(v / max) * 100}%"></i></div><b class="num">${v}</b></div>`).join("")}</div>
    </div></section>

    <section class="section"><div class="wrap rep-final">
      <div><span class="eyebrow">04 · The resume</span><h2 class="serif">A ${p.aim.toLowerCase()} resume, ready when the call ended</h2><p class="muted">One page, ATS-friendly, every line from what ${p.first} said. Next: swipe right on matched jobs and Yapply applies with a version tailored to each, or practice “why are you switching?” with the same coach.</p>
        <div class="row" style="margin-top:20px"><a class="btn primary lg" href="#call">Start my own call</a><a class="btn" href="#feature-job-match">See matched jobs</a><a class="btn" href="#feature-ai-mock-interview">Practice the interview</a></div>
        <p class="small muted" style="margin-top:22px">Other sample reports: ${Object.keys(PERSONAS).filter(x => x !== k).map(x => `<a href="#report-${x}">${PERSONAS[x].first} (${ICP[PERSONAS[x].key].tag.toLowerCase()})</a>`).join(" · ")}</p></div>
      ${resumePaper(p, r.lines, false)}
    </div></section>` };
});
