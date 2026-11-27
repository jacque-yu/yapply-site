// ---------- FEATURE PAGES (visuals + template) ----------
const FP_OK = '<span class="ck" aria-hidden="true">✓</span>';
function fvCoach() {
  return `<div class="fv-phone"><div class="fv-top"><span class="rec"></span>Yapply · live <span class="muted">3:12</span></div>
    <div class="fv-b ai">You're aiming for operations. What do you track every week?</div>
    <div class="fv-b me">Sales, waste, labor hours. A spreadsheet for my district manager.</div>
    <div class="fv-card folded"><small>Assistant Store Manager → Operations</small><span>Updated below ↓</span></div>
    <div class="fv-b me cut"><em>You cut in</em>Oh, and it flagged three products we kept throwing away.</div>
    <div class="fv-card pop"><small>Assistant Store Manager → Operations</small><p><del>Handled scheduling and closing.</del> <mark>Own weekly sales, waste and labor tracking in Excel</mark>; flagged 3 slow-moving products.</p><span class="src">From your words · 3:12 · matches “inventory analysis”</span></div>
    <div class="fv-b ai">How much did ordering less save?</div>
    <div class="fv-foot"><span>View draft</span><span class="wave mini" aria-hidden="true">${"<i></i>".repeat(14)}</span></div></div>`;
}
function roastPaper() {
  const n = (t, k) => `<span class="rn rn-${k}">${t}</span>`;
  return `<div class="roast-paper"><div class="rp-h"><b>Diego Ramirez</b><span>Assistant Store Manager → applying to Operations Analyst</span></div>
    <p><span class="circ">Results-driven, hard-working team player</span> passionate about leveraging synergies.</p>${n("Generic and AI-sounding. Recruiters skim past it.", 1)}
    <h5>Experience</h5><p>Assistant Store Manager, Riverside Market</p>
    <ul><li><span class="circ">Responsible for</span> opening and closing the store</li><li><span class="circ">Handled</span> customers and scheduling</li></ul>${n("Says what the job was, not what you did.", 2)}
    <h5>Skills</h5><p>Customer service, teamwork, <span class="circ">Microsoft Office</span></p>${n("Ops filters search for Excel, forecasting, inventory. None found.", 3)}
    <span class="stamp">Likely filtered out</span></div>`;
}
function fvMatch() {
  return `<div class="fv-stack"><div class="chips">${["Data analyst", "From IT support", "NYC or remote", "$70K+", "0–3 years"].map(c => `<span class="chip on">${c}</span>`).join("")}</div>
    <div class="jcard"><div class="jc-head"><span class="logo-sq" style="background:#2b37d4">K</span><div><b>Data Analyst</b><span>Kestrel Analytics · New York, NY · Hybrid</span><span>$78K–$92K · Posted 6 hours ago</span></div>
      <div class="ring" style="--p:92"><b>92</b><small>match</small></div></div>
      <div class="why"><span class="eyebrow" style="margin:0">Why we recommend you</span>
        <p>${FP_OK}Your weekly ticket-trend reports match their <mark>SQL + reporting</mark> ask</p><p>${FP_OK}Asks for 1–3 years of experience; yours counts</p><p>${FP_OK}Your director updates match “present to stakeholders”</p></div>
      <div class="swipe"><span class="sw no">✕ Skip</span><span class="hint">Swipe</span><span class="sw yes">Apply ✓</span></div></div>
    <p class="small muted center">Example listing with a fictional employer.</p></div>`;
}
function fvTailor() {
  return `<div class="fv-stack"><div class="jd"><span class="eyebrow" style="margin:0">Job description · Data Analyst, Kestrel Analytics</span>
      <div class="chips">${[["SQL", 1], ["Excel", 1], ["Reporting", 1], ["Stakeholder communication", 1], ["Tableau", 0]].map(([k, y]) => `<span class="chip ${y ? "on" : "gap"}">${y ? "✓" : "–"} ${k}</span>`).join("")}</div></div>
    <div class="paper rp diffp"><span class="eyebrow" style="margin:0">Your resume, tailored for this job</span>
      <p><del>Resolved tickets and helped staff with technical issues.</del></p>
      <p>Built a weekly ticket-trend report in <mark>SQL</mark> and <mark>Excel</mark> (~1,800 tickets a month) and <mark>presented findings to the IT director</mark>; password-reset tickets fell by half.</p>
      <p class="moved">↑ Moved to top: most relevant to this role</p>
      <div class="gapnote"><b>Gap, not added:</b> Tableau. You didn't mention it in your call. <span class="lnk">Talk it through →</span></div></div></div>`;
}
function fvVerified() {
  return `<div class="fv-stack"><div class="jcard"><div class="jc-head"><span class="logo-sq" style="background:#17825a">B</span><div><b>Operations Analyst</b><span>Brightline Health · Chicago, IL</span></div><span class="tag good">Verified</span></div>
      <ul class="trust">${["Posted 6 hours ago", "Re-checked today, 7:00 AM", "Employer verified · brightlinehealth.com", "Apply link opens the employer's own site", "New to you: not skipped, not applied"].map(t => `<li>${FP_OK}${t}</li>`).join("")}</ul></div>
    <div class="filtered"><span class="eyebrow" style="margin:0">Filtered out today</span>
      ${[["Reposted 9 times in 60 days", "likely ghost job"], ["Asks for a $150 equipment deposit", "scam pattern"], ["Interview only over a chat app", "scam pattern"], ["Same role you skipped on Tuesday", "duplicate"]].map(([a, b]) => `<p><span class="x">✕</span>${a}<em>${b}</em></p>`).join("")}</div>
    <p class="small muted center">Example listings with fictional employers.</p></div>`;
}
function fvTracker() {
  return `<div class="fv-stack"><div class="jcard"><div class="jc-head"><span class="logo-sq" style="background:#2b37d4">K</span><div><b>Data Analyst</b><span>Kestrel Analytics</span></div><span class="tag warn">Viewed</span></div>
      <ol class="stl">${[["Applied", "Nov 24, 9:41 AM · confirmation #GH-48213", 1], ["Viewed", "Nov 25, 2:10 PM", 1], ["Interview", "Waiting", 0]].map(([a, b, d]) => `<li class="${d ? "done" : ""}"><b>${a}</b><span>${b}</span></li>`).join("")}</ol>
      <div class="proofs">${["Receipt", "Original posting ↗", "Screenshot", "Submission log", "Resume sent · tailored v3"].map(p => `<span class="pf">${p}</span>`).join("")}</div>
      <div class="shot" aria-hidden="true"><i></i><i></i><i class="s"></i><i></i><b>Submitted</b></div></div>
    <p class="small muted center">Example application with a fictional employer.</p></div>`;
}
function fvInterview() {
  return `<div class="fv-stack"><div class="modes-tabs">${["Practice", "Live", "Debrief"].map((m, i) => `<span class="${i === 1 ? "on" : ""}">${m}</span>`).join("")}</div>
    <div class="jcard live-int"><div class="li-q"><span class="tag">Career change · detected</span><p>“Why are you leaving IT support for data?”</p></div>
      <div class="li-s"><span class="eyebrow" style="margin:0">Private suggestion · only you see this</span><p>Bridge it with your ticket report: <b>what you did</b> (weekly SQL report), <b>what changed</b> (password resets cut in half), <b>why data</b> (you liked finding the cause more than closing tickets).</p></div></div>
    <div class="jcard deb"><span class="eyebrow" style="margin:0">Debrief</span>${[["Structure", 80], ["Specifics", 64], ["Pace", 88]].map(([k, v]) => `<div class="tm-row"><span>${k}</span><div class="tm-bar"><i style="width:${v}%"></i></div></div>`).join("")}<p class="small"><b>Fix next:</b> say the number earlier. Next practice starts here.</p></div></div>`;
}
const FV = { "ats-check": () => `<div class="fv-stack">${roastPaper()}</div>`, "talk-to-resume": fvCoach, "job-match": fvMatch, "tailored-applications": fvTailor, "verified-jobs": fvVerified, "application-tracker": fvTracker, "ai-mock-interview": fvInterview };

function proofBlock(f) {
  return `<div class="proofs-band">${f.proof.map(([n, t, u, s]) => `<div><b class="serif">${n}</b><p>${t}</p><span class="small">${u ? `<a href="${u}">Source: ${s} ↗</a>` : `Source: ${s}`}</span></div>`).join("")}</div>`;
}

pattern(/^feature-(.+)$/, raw => {
  const slug = FEATURE_ALIAS[raw] || raw;
  const f = FEATURES.find(x => x.slug === slug); if (!f) return null;
  const i = FEATURES.indexOf(f), next = FEATURES[(i + 1) % FEATURES.length];
  return { title: f.h1, seoTitle: f.title + " | Yapply", desc: f.desc, path: "/features/" + slug, crumbs: [["Home", "home"], ["Features", "features"], [f.name]],
    html: `
    <section class="fhero"><div class="wrap fh-grid">
      <div class="fh-left"><span class="eyebrow">${f.group} · ${f.name}${f.flag ? " · Core" : ""}</span>
        <h1 class="serif">${f.h1}</h1><p class="fh-pain">${f.pain}</p><p class="fh-sub">${f.sub}</p>
        <div class="row"><a class="btn primary lg" href="#${f.cta[0]}">${f.cta[1]}</a><a class="btn lg" href="#call-c">Hear a sample call</a></div></div>
      <div class="fv">${FV[slug]()}</div>
    </div></section>

    <section class="section roomy-s"><div class="wrap narrow"><div class="answer-box"><span class="eyebrow">What is Yapply's ${f.name}?</span><p>${f.answer}</p></div></div></section>

    ${f.modes ? `<section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">Three modes</span><h2 class="serif">Before, during and after every interview</h2></div>
      <div class="modes">${f.modes.map(([t, d], j) => `<div><span class="n serif">0${j + 1}</span><h3 class="serif">${t}</h3><p>${d}</p></div>`).join("")}</div></div></section>` : ""}

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">How it works</span><h2 class="serif">How ${f.name} works</h2></div>
      <div class="steps-n" style="--n:${f.steps.length}">${f.steps.map(([t, d], j) => `<div><span class="n serif">${j + 1}</span><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div>
      ${slug === "talk-to-resume" ? `<div style="margin-top:56px">${liveDemo("live-feat")}</div>` : ""}
      ${slug === "ai-mock-interview" ? `<div class="try-mi"><h3>Try the follow-up logic</h3>${mockInterviewDemo()}</div>` : ""}
    </div></section>

    <section class="section roomy dark-sec"><div class="wrap"><div class="promise"><h2 class="serif">${f.promise[0]}</h2><p>${f.promise[1]}</p></div>${proofBlock(f)}</div></section>

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">What you get</span><h2 class="serif">Built for the way you actually job hunt</h2></div>
      <div class="pts">${f.points.map(([t, d]) => `<div><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div></div></section>

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">How it compares</span><h2 class="serif">Typical AI job tools vs Yapply</h2></div>
      <div class="cmp-wrap"><table class="cmp"><thead><tr><th scope="col"></th><th scope="col">Typical AI job tools</th><th scope="col">Yapply</th></tr></thead>
      <tbody>${f.vs.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td>${b}</td><td><b>${c}</b></td></tr>`).join("")}</tbody></table></div>
      <p class="small muted" style="margin-top:14px">Based on our review study and public product pages. <a href="#compare">See named comparisons →</a></p></div></section>

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">Who it's for</span><h2 class="serif">Built for people changing direction</h2></div>
      <div class="who-mini">${Object.entries(f.for).map(([k, line]) => { const p = PERSONAS[k.toLowerCase()]; return `<a class="wm" href="#report-${k.toLowerCase()}"><span class="wm-img" style="background-image:url(${p.img()})"></span><span class="wm-t"><small>${k} · ${ICP[k].tag}</small><b>${line}</b></span></a>`; }).join("")}</div></div></section>

    <section class="section roomy"><div class="wrap narrow"><h2 class="serif">${f.name} FAQ</h2>${faqBlock(f.faq)}</div></section>

    <section class="section"><div class="wrap"><a class="next-f" href="#feature-${next.slug}"><span class="eyebrow" style="margin:0">Next · ${next.group}</span><b class="serif">${next.name}</b><span class="muted">${next.short}</span><span class="go">→</span></a>
      <div class="row" style="margin-top:20px">${FEATURES.filter(x => x !== f && x !== next).map(x => `<a class="btn sm" href="#feature-${x.slug}">${x.name}</a>`).join("")}</div></div></section>
    ${ctaBand()}` };
});

route("features", () => ({
  title: "Features", seoTitle: "Features: Free ATS Check, Talk-to-Resume, Swipe to Apply & Interview Prep | Yapply", desc: "Yapply's features follow your job search: a free ATS check call, a resume rewritten from what you say, swipe-to-apply on verified jobs with proof, and interview prep.", path: "/features", crumbs: [["Home", "home"], ["Features"]],
  html: `<section class="fhero"><div class="wrap narrow" style="text-align:left"><span class="eyebrow">Features</span><h1 class="serif" style="font-size:clamp(2.8rem,6vw,5rem);line-height:1">From “why am I getting rejected?” to an interview.</h1><p class="fh-sub">Every feature runs on what you said on one call, so nothing you said goes to waste and nothing on your resume is invented.</p></div></section>
  ${FEATURE_GROUPS.map(([g, sub]) => `<section class="section roomy-s"><div class="wrap"><div class="fg-head"><span class="eyebrow" style="margin:0">${g}</span><h2 class="serif">${sub}</h2></div>
    <div class="feat-grid">${FEATURES.filter(f => f.group === g).map(f => `<a class="feat" href="#feature-${f.slug}">${f.flag ? '<span class="tag hi">Core</span>' : ""}<h3>${f.name}</h3><p class="muted">${f.short}</p><span class="go">→</span></a>`).join("")}</div></div></section>`).join("")}
  ${ctaBand()}`
}));
