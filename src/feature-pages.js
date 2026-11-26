// ---------- FEATURE PAGES (visuals + template) ----------
const FP_OK = '<span class="ck" aria-hidden="true">✓</span>';
function fvCoach() {
  return `<div class="fv-phone"><div class="fv-top"><span class="rec"></span>Coach · live <span class="muted">3:12</span></div>
    <div class="fv-b ai">How many students did you tutor a week?</div>
    <div class="fv-b me">Like 15 a week.</div>
    <div class="fv-card folded"><small>Experience · Peer Tutor</small><span>Updated below ↓</span></div>
    <div class="fv-b me cut"><em>You cut in</em>Wait, more like 20 during finals.</div>
    <div class="fv-card pop"><small>Experience · Peer Tutor</small><p>Tutored <del>15 students a week</del> <mark>15–20 students a week</mark> in statistics and calculus.</p><span class="src">From your words · 3:12</span></div>
    <div class="fv-b ai">Did you change how the center tutors?</div>
    <div class="fv-foot"><span>View draft</span><span class="wave mini" aria-hidden="true">${"<i></i>".repeat(14)}</span></div></div>`;
}
function fvMatch() {
  return `<div class="fv-stack"><div class="chips">${["Data analyst", "Entry level", "NYC or remote", "$70K+", "Sponsors H-1B"].map(c => `<span class="chip on">${c}</span>`).join("")}</div>
    <div class="jcard"><div class="jc-head"><span class="logo-sq" style="background:#2b37d4">K</span><div><b>Data Analyst, New Grad</b><span>Kestrel Analytics · New York, NY · Hybrid</span><span>$78K–$92K · Posted 6 hours ago</span></div>
      <div class="ring" style="--p:92"><b>92</b><small>match</small></div></div>
      <div class="why"><span class="eyebrow" style="margin:0">Why we recommend you</span>
        <p>${FP_OK}Your 2,400-response survey analysis matches their <mark>SQL + Python</mark> ask</p><p>${FP_OK}Entry level, no internship required</p><p>${FP_OK}Sponsors H-1B (likely) and fits your NYC filter</p></div>
      <div class="swipe"><span class="sw no">✕ Skip</span><span class="hint">Swipe</span><span class="sw yes">Apply ✓</span></div></div>
    <p class="small muted center">Example listing with a fictional employer.</p></div>`;
}
function fvTailor() {
  return `<div class="fv-stack"><div class="jd"><span class="eyebrow" style="margin:0">Job description · Kestrel Analytics</span>
      <div class="chips">${[["SQL", 1], ["Python", 1], ["A/B testing", 1], ["Stakeholder communication", 1], ["Tableau", 0]].map(([k, y]) => `<span class="chip ${y ? "on" : "gap"}">${y ? "✓" : "–"} ${k}</span>`).join("")}</div></div>
    <div class="paper rp diffp"><span class="eyebrow" style="margin:0">Your resume, tailored for this job</span>
      <p><del>Cleaned and analyzed survey data on meal-plan cancellations.</del></p>
      <p>Analyzed 2,400 survey responses in <mark>SQL</mark> and <mark>Python</mark> and built a logistic regression; <mark>presented findings to dining services</mark>, who changed plan options.</p>
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
  return `<div class="fv-stack"><div class="jcard"><div class="jc-head"><span class="logo-sq" style="background:#2b37d4">K</span><div><b>Data Analyst, New Grad</b><span>Kestrel Analytics</span></div><span class="tag warn">Viewed</span></div>
      <ol class="stl">${[["Applied", "Nov 24, 9:41 AM · confirmation #GH-48213", 1], ["Viewed", "Nov 25, 2:10 PM", 1], ["Interview", "Waiting", 0]].map(([a, b, d]) => `<li class="${d ? "done" : ""}"><b>${a}</b><span>${b}</span></li>`).join("")}</ol>
      <div class="proofs">${["Receipt", "Original posting ↗", "Screenshot", "Submission log", "Resume sent · tailored v3"].map(p => `<span class="pf">${p}</span>`).join("")}</div>
      <div class="shot" aria-hidden="true"><i></i><i></i><i class="s"></i><i></i><b>Submitted</b></div></div>
    <p class="small muted center">Example application with a fictional employer.</p></div>`;
}
function fvInterview() {
  return `<div class="fv-stack"><div class="modes-tabs">${["Practice", "Live", "Debrief"].map((m, i) => `<span class="${i === 1 ? "on" : ""}">${m}</span>`).join("")}</div>
    <div class="jcard live-int"><div class="li-q"><span class="tag">Behavioral · detected</span><p>“Tell me about a time you had to convince someone with data.”</p></div>
      <div class="li-s"><span class="eyebrow" style="margin:0">Private suggestion · only you see this</span><p>Use your meal-plan study: <b>situation</b> (students dropping plans), <b>what you did</b> (2,400 responses, regression), <b>result</b> (dining services changed options).</p></div></div>
    <div class="jcard deb"><span class="eyebrow" style="margin:0">Debrief</span>${[["Structure", 80], ["Specifics", 64], ["Pace", 88]].map(([k, v]) => `<div class="tm-row"><span>${k}</span><div class="tm-bar"><i style="width:${v}%"></i></div></div>`).join("")}<p class="small"><b>Fix next:</b> say the number earlier. Next practice starts here.</p></div></div>`;
}
const FV = { "ai-career-coach": fvCoach, "job-match": fvMatch, "tailored-applications": fvTailor, "verified-jobs": fvVerified, "application-tracker": fvTracker, "ai-mock-interview": fvInterview };

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
        <div class="row"><a class="btn primary lg" href="#${f.cta[0]}">${f.cta[1]}</a><a class="btn lg" href="#report-a">See a sample report</a></div></div>
      <div class="fv">${FV[slug]()}</div>
    </div></section>

    <section class="section roomy-s"><div class="wrap narrow"><div class="answer-box"><span class="eyebrow">What is Yapply's ${f.name}?</span><p>${f.answer}</p></div></div></section>

    ${f.modes ? `<section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">Three modes</span><h2 class="serif">Before, during and after every interview</h2></div>
      <div class="modes">${f.modes.map(([t, d], j) => `<div><span class="n serif">0${j + 1}</span><h3 class="serif">${t}</h3><p>${d}</p></div>`).join("")}</div></div></section>` : ""}

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">How it works</span><h2 class="serif">How ${f.name} works</h2></div>
      <div class="steps-n" style="--n:${f.steps.length}">${f.steps.map(([t, d], j) => `<div><span class="n serif">${j + 1}</span><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div>
      ${slug === "ai-career-coach" ? `<div style="margin-top:56px">${liveDemo("live-feat")}</div>` : ""}
      ${slug === "ai-mock-interview" ? `<div class="try-mi"><h3>Try the follow-up logic</h3>${mockInterviewDemo()}</div>` : ""}
    </div></section>

    <section class="section roomy dark-sec"><div class="wrap"><div class="promise"><h2 class="serif">${f.promise[0]}</h2><p>${f.promise[1]}</p></div>${proofBlock(f)}</div></section>

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">What you get</span><h2 class="serif">Built for the way you actually job hunt</h2></div>
      <div class="pts">${f.points.map(([t, d]) => `<div><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div></div></section>

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">How it compares</span><h2 class="serif">Typical AI job tools vs Yapply</h2></div>
      <div class="cmp-wrap"><table class="cmp"><thead><tr><th scope="col"></th><th scope="col">Typical AI job tools</th><th scope="col">Yapply</th></tr></thead>
      <tbody>${f.vs.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td>${b}</td><td><b>${c}</b></td></tr>`).join("")}</tbody></table></div>
      <p class="small muted" style="margin-top:14px">Based on our review study and public product pages. <a href="#compare">See named comparisons →</a></p></div></section>

    <section class="section roomy"><div class="wrap"><div class="sec-head"><span class="eyebrow">Who it's for</span><h2 class="serif">Built for four kinds of job seekers</h2></div>
      <div class="who-mini">${Object.entries(f.for).map(([k, line]) => { const p = PERSONAS[k.toLowerCase()]; return `<a class="wm" href="#report-${k.toLowerCase()}"><span class="wm-img" style="background-image:url(${p.img()})"></span><span class="wm-t"><small>${k} · ${ICP[k].tag}</small><b>${line}</b></span></a>`; }).join("")}</div></div></section>

    <section class="section roomy"><div class="wrap narrow"><h2 class="serif">${f.name} FAQ</h2>${faqBlock(f.faq)}</div></section>

    <section class="section"><div class="wrap"><a class="next-f" href="#feature-${next.slug}"><span class="eyebrow" style="margin:0">Next · ${next.group}</span><b class="serif">${next.name}</b><span class="muted">${next.short}</span><span class="go">→</span></a>
      <div class="row" style="margin-top:20px">${FEATURES.filter(x => x !== f && x !== next).map(x => `<a class="btn sm" href="#feature-${x.slug}">${x.name}</a>`).join("")}</div></div></section>
    ${ctaBand()}` };
});

route("features", () => ({
  title: "Features", seoTitle: "Features: AI Career Coach, Job Match, Verified Jobs & Mock Interviews | Yapply", desc: "Yapply's features follow your job search: an AI career coach that writes your resume live, verified job matches, tailored and verifiable applications, and interview practice.", path: "/features", crumbs: [["Home", "home"], ["Features"]],
  html: `<section class="fhero"><div class="wrap narrow" style="text-align:left"><span class="eyebrow">Features</span><h1 class="serif" style="font-size:clamp(2.8rem,6vw,5rem);line-height:1">From one conversation to a verified offer pipeline.</h1><p class="fh-sub">Every feature runs on the profile your coaching call builds, so nothing you said goes to waste and nothing on your resume is invented.</p></div></section>
  ${FEATURE_GROUPS.map(([g, sub]) => `<section class="section roomy-s"><div class="wrap"><div class="fg-head"><span class="eyebrow" style="margin:0">${g}</span><h2 class="serif">${sub}</h2></div>
    <div class="feat-grid">${FEATURES.filter(f => f.group === g).map(f => `<a class="feat" href="#feature-${f.slug}">${f.flag ? '<span class="tag hi">Core</span>' : ""}<h3>${f.name}</h3><p class="muted">${f.short}</p><span class="go">→</span></a>`).join("")}</div></div></section>`).join("")}
  ${ctaBand()}`
}));
