// ---------- RESOURCES ----------
const resCrumbs = (t, h, name) => [["Home", "home"], [t, h], ...(name ? [[name]] : [])];
const stageOf = id => STAGES.find(s => s.id === id);
const kwChips = kws => `<div class="row" style="gap:6px">${kws.map(([k, v]) => `<span class="kw">${esc(k)}${v ? ` <b class="num">${v.toLocaleString("en-US")}</b>` : ' <i>TBD</i>'}</span>`).join("")}</div>`;

route("blog", () => ({ title: "Blog", path: "/blog", crumbs: [["Home", "home"], ["Blog"]],
  html: pageHead({ eyebrow: "Resources", title: "The Yapply blog", lead: "Product notes and practical recruiting advice for new grads." }) +
  `<section class="section"><div class="wrap grid">${BLOG.map(b => `<a class="card" href="#blog-${b.slug}"><span class="eyebrow">${b.tag} · ${b.date}</span><h3>${b.title}</h3><p class="small muted">${b.sum}</p></a>`).join("")}</div></section>` }));
pattern(/^blog-([a-z0-9-]+)$/, s => { const b = BLOG.find(x => x.slug === s); if (!b) return null;
  return { title: b.title, path: "/blog/" + s, crumbs: resCrumbs("Blog", "blog", b.title),
    html: pageHead({ eyebrow: `${b.tag} · ${b.date} · ${b.mins} min read`, title: b.title, lead: b.sum }) + `<section class="section"><div class="wrap prose">${b.html}</div></section>${ctaBand()}` }; });

route("help", () => ({ title: "Help Center", path: "/help", crumbs: [["Home", "home"], ["Help Center"]],
  html: pageHead({ eyebrow: "Resources", title: "Help Center", lead: "How Yapply works, your account and your data." }) + `<section class="section"><div class="wrap grid-2">
  ${[["Voice sessions", [["How long is a voice session?", "About 10 minutes for a full resume. You can pause and continue later."], ["Can I correct what it wrote?", "Yes. Interrupt and say the correction (\"that was 300 users, not 200\") or edit the line by hand."], ["Can I start from my existing resume?", "Yes. Upload it and Yapply asks about the weak lines, rewriting them as you answer."]]],
     ["Resumes and applications", [["Will Yapply invent experience?", "No. It only writes what you said or uploaded, and you approve every line."], ["Which file formats can I export?", "PDF and DOCX."], ["Can I stop an application?", "Applications are only sent after you approve them."]]],
     ["Jobs", [["How often are jobs updated?", "Daily. Closed roles are marked and removed after 30 days."], ["What does “H-1B likely” mean?", "The job description doesn't say, but the employer has sponsored similar roles in the last three years."]]],
     ["Account and privacy", [["How do I delete my account?", "Settings → Delete account. Your recordings, resumes and profile are deleted."], ["Are my recordings stored?", "See the <a href=\"#privacy\">Privacy Policy</a>, section 5."]]]]
    .map(([h, qs]) => `<div><h2>${h}</h2>${faqBlock(qs)}</div>`).join("")}</div></section>` }));

// ----- Guides: visual timeline, then entries per stage -----
route("guides", () => {
  onRender(() => document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => document.getElementById("st-" + b.dataset.go).scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }))));
  return { title: "Job search guides for every stage", path: "/guides", crumbs: [["Home", "home"], ["Guides"]],
    html: pageHead({ eyebrow: "Resources", title: "Your job search, stage by stage", lead: "From your first externship to your first day at work. Pick where you are on the timeline to see the guides for that stage." }) + `
    <section class="section" style="padding-bottom:20px"><div class="wrap">
      <div class="tl" role="list">${STAGES.map((s, i) => `<button class="tl-step${s.now ? " now" : ""}" role="listitem" data-go="${s.id}" type="button"><span class="tl-dot">${i + 1}</span><span class="tl-when">${s.when}</span><b>${s.name}</b><span class="tl-what">${s.what}</span><span class="tl-c27">Class of 2027: ${s.c27}</span>${s.now ? '<span class="tag hi">You are here · Nov 2026</span>' : ""}<span class="tl-n">${plural(GUIDES.filter(g => g.stage === s.id).length, "guide")} ↓</span></button>`).join("")}</div>
    </div></section>
    ${STAGES.map((s, i) => `<section class="section stage-sec" id="st-${s.id}"><div class="wrap"><div class="row" style="align-items:baseline;gap:14px"><span class="stage-num">${String(i + 1).padStart(2, "0")}</span><div><span class="eyebrow" style="margin:0">${s.when} · ${s.c27}</span><h2 style="margin:4px 0 0">${s.name}</h2></div></div>
      <div class="grid" style="margin-top:18px;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))">${GUIDES.filter(g => g.stage === s.id).map(g => `<a class="card guide-card" href="#guide-${g.slug}"><h3>${g.title}</h3><p class="small muted">${g.sum}</p><span class="eyebrow" style="margin:10px 0 6px">Target searches · US monthly volume</span>${kwChips(g.kws)}</a>`).join("")}</div></div></section>`).join("")}
    ${ctaBand()}` };
});
pattern(/^guide-([a-z0-9-]+)$/, s => { const g = GUIDES.find(x => x.slug === s); if (!g) return null; const st = stageOf(g.stage);
  const others = GUIDES.filter(x => x.slug !== s && x.stage === g.stage).concat(GUIDES.filter(x => x.stage !== g.stage)).slice(0, 3);
  return { title: g.title, path: "/guides/" + s, crumbs: resCrumbs("Guides", "guides", g.title),
    html: pageHead({ eyebrow: `${st.name} · ${st.when} · ${g.mins} min read · Updated ${AS_OF}`, title: g.title, answer: g.sum }) + `
    <section class="section"><div class="wrap layout-side"><article class="prose">${g.body.map(([h, b], i) => `<h2 id="s${i}">${h}</h2>${b}`).join("")}</article>
    <aside class="toc"><b>On this page</b>${g.body.map(([h], i) => `<a href="#guide-${s}" onclick="document.getElementById('s${i}').scrollIntoView({behavior:'smooth'});return false">${h}</a>`).join("")}<hr style="border:0;border-top:1px solid var(--line);margin:14px 0"><b>Related guides</b>${others.map(o => `<a href="#guide-${o.slug}">${o.title}</a>`).join("")}<a href="#guides">All guides by stage</a></aside></div></section>${ctaBand()}` }; });

// ----- Glossary: A–Z index with categories (SEO + GEO) -----
const gTerm = slug => GLOSSARY.find(x => x.slug === slug);
route("glossary", () => {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(sorted.map(g => g.term[0].toUpperCase()))];
  onRender(() => {
    const draw = () => { const q = $("#gl-q").value.toLowerCase().trim(), c = document.querySelector(".chip.on")?.dataset.t || ""; let n = 0;
      document.querySelectorAll(".gl-card").forEach(el => { const ok = (!q || el.textContent.toLowerCase().includes(q)) && (!c || el.dataset.cat === c); el.classList.toggle("hidden", !ok); if (ok) n++; });
      document.querySelectorAll(".gl-letter").forEach(sec => sec.classList.toggle("hidden", !sec.querySelector(".gl-card:not(.hidden)")));
      $("#gl-n").textContent = `Showing ${n} of ${GLOSSARY.length} terms`; };
    $("#gl-q").addEventListener("input", draw);
    document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => { const was = b.classList.contains("on"); document.querySelectorAll(".chip").forEach(x => x.classList.remove("on")); if (!was) b.classList.add("on"); draw(); }));
    document.querySelectorAll("[data-letter]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById("letter-" + a.dataset.letter).scrollIntoView({ behavior: "smooth" }); }));
    draw();
  });
  return { title: "Job search glossary", path: "/glossary", crumbs: [["Home", "home"], ["Glossary"]],
    html: pageHead({ eyebrow: "Resources", title: "Job search glossary", lead: `Plain-English definitions for ${GLOSSARY.length} resume, interview, recruiting, offer and work-visa terms every new grad runs into.` }) + `
    <section class="section" style="padding-top:24px"><div class="wrap">
      <div class="row"><label for="gl-q" class="hidden">Search terms</label><input id="gl-q" placeholder="Search terms, e.g. OPT, ATS, magna cum laude" style="flex:1;min-width:240px"><span id="gl-n" class="small muted"></span></div>
      <div class="row" style="gap:8px;margin:14px 0">${GLOSSARY_CATS.map(c => `<button class="chip" type="button" data-t="${c}">${c}</button>`).join("")}</div>
      <nav class="az" aria-label="Jump to letter">${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => letters.includes(l) ? `<a href="#glossary" data-letter="${l}">${l}</a>` : `<span>${l}</span>`).join("")}</nav>
      ${letters.map(l => `<div class="gl-letter" id="letter-${l}"><h2>${l}</h2><div class="grid">${sorted.filter(g => g.term[0].toUpperCase() === l).map(g => `<div class="card gl-card" data-cat="${g.cat}"><h3><a href="#glossary-${g.slug}" style="color:inherit">${g.term}</a></h3><p class="small">${(g.def.match(/^.*?[.!?](?=\s|$)/) || [g.def])[0]}</p><a class="small" href="#glossary" onclick="event.preventDefault();document.querySelector('.chip[data-t=&quot;${g.cat}&quot;]').click()">${g.cat}</a></div>`).join("")}</div></div>`).join("")}
    </div></section>${ctaBand("Know the words. Now say them about yourself.", "Talk for 10 minutes and Yapply writes your resume while you speak.")}` };
});
pattern(/^glossary-([a-z0-9-]+)$/, s => { const g = gTerm(s); if (!g) return null;
  const rel = g.rel.map(gTerm).filter(Boolean);
  const guide = GUIDES.find(x => x.body.some(b => b[1].toLowerCase().includes(g.term.split(" (")[0].toLowerCase())) || x.kws.some(k => k[0].includes(g.term.split(" (")[0].toLowerCase())));
  return { title: `What is ${g.term.replace(/ \(.+\)/, "")}? Definition and examples`, path: "/glossary/" + s, crumbs: resCrumbs("Glossary", "glossary", g.term),
    html: pageHead({ eyebrow: `Glossary · ${g.cat}`, title: `What is ${g.term}?`, answer: g.def }) + `
    <section class="section"><div class="wrap layout-side"><article class="prose">
      <h2>Why it matters for new grads</h2><p>${g.why}</p>
      <h2>Example</h2><p class="out" style="white-space:normal">${esc(g.ex)}</p>
      ${g.faq.length ? `<h2>FAQ</h2>${faqBlock(g.faq)}` : ""}
      <h2>Related terms</h2><div class="row">${rel.map(r => `<a class="btn sm" href="#glossary-${r.slug}">${r.term}</a>`).join("")}</div>
      ${guide ? `<h2>Read the guide</h2><a class="card" href="#guide-${guide.slug}" style="display:block"><h3>${guide.title}</h3><p class="small muted">${guide.sum}</p></a>` : ""}
    </article>
    <aside class="stack"><div class="card"><h4>Put it on your resume, by voice</h4><p class="small">Talk about your experience and Yapply writes the resume while you speak.</p><a class="btn sm primary" href="#feature-ai-career-coach">Try the AI resume builder</a></div><div class="card"><h4>More in ${g.cat}</h4>${GLOSSARY.filter(x => x.cat === g.cat && x.slug !== s).slice(0, 6).map(x => `<a class="small" style="display:block;padding:3px 0" href="#glossary-${x.slug}">${x.term}</a>`).join("")}</div></aside></div></section>` }; });

route("interview-questions", () => ({ title: "Interview questions by role and company", path: "/interview-questions", crumbs: [["Home", "home"], ["Interview questions"]],
  html: pageHead({ eyebrow: "Resources", title: "Interview questions for new grads", lead: "Common questions with answer frameworks, by role and by company. Practice any of them out loud with AI Mock Interview." }) +
  `<section class="section"><div class="wrap"><h2>By role</h2><div class="grid" style="margin-top:12px">${Object.entries(IQ).map(([k, v]) => `<a class="card" href="#interview-questions-${k}"><h3>${v.name}</h3><p class="small muted">${v.qs.length} questions with frameworks</p></a>`).join("")}</div>
  <h2 style="margin-top:36px">By company</h2><div class="row" style="margin-top:12px">${COMPANIES.map(c => `<a class="btn sm" href="#company-${c.slug}-interview">${c.name}</a>`).join("")}</div></div></section>` }));
pattern(/^interview-questions-([a-z-]+)$/, s => { const v = IQ[s]; if (!v) return null;
  return { title: `${v.name} interview questions`, path: "/interview-questions/" + s, crumbs: resCrumbs("Interview questions", "interview-questions", v.name),
    html: pageHead({ eyebrow: "Interview questions", title: `${v.name} interview questions and how to answer`, answer: `The ${v.qs.length} ${v.name.toLowerCase()} questions below come up most often for entry-level candidates. Each has a short framework; practice them out loud before your interview.` }) + `
    <section class="section"><div class="wrap grid-2"><div>${faqBlock(v.qs)}</div><div class="card"><h3>Practice these out loud</h3><p class="muted">Yapply's voice interviewer asks these questions about the projects on your resume, interrupts vague answers and gives feedback.</p><a class="btn primary" href="#feature-ai-mock-interview">Start a mock interview</a></div></div></section>${ctaBand()}` }; });

route("reports", () => ({ title: "Reports", path: "/reports", crumbs: [["Home", "home"], ["Reports"]],
  html: pageHead({ eyebrow: "Resources", title: "New grad hiring reports", lead: "A monthly snapshot of entry-level hiring from Yapply's job data." }) +
  `<section class="section"><div class="wrap grid"><a class="card" href="#report-2026-11"><span class="eyebrow">November 2026</span><h3>New grad hiring report: November 2026</h3><p class="small muted">Open roles by role type, sponsorship share and deadlines.</p></a></div></section>` }));
route("report-2026-11", () => {
  const byRole = ROLES.map(r => [r.name, JOBS.filter(j => j.role === r.slug).length]).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...byRole.map(x => x[1])); const sp = JOBS.filter(j => ["yes", "likely"].includes(j.sponsor)).length;
  const soon = JOBS.filter(j => j.deadline <= "2026-12-08").length;
  return { title: "New grad hiring report: November 2026", path: "/reports/2026-11-new-grad-hiring", crumbs: resCrumbs("Reports", "reports", "November 2026"),
    html: pageHead({ eyebrow: "Report · Data as of " + AS_OF, title: "New grad hiring report: November 2026", answer: `As of ${AS_OF}, Yapply tracked <b>${JOBS.length}</b> entry-level and intern roles at <b>${COMPANIES.length}</b> companies. <b>${Math.round(sp / JOBS.length * 100)}%</b> sponsor or are likely to sponsor H-1B, and <b>${soon}</b> close within two weeks.`, extra: `<p style="margin-top:12px">${DEMO} — the report format is real, the numbers are examples.</p>` }) + `
    <section class="section"><div class="wrap grid-2"><div><h2>Open roles by role type</h2><p class="small muted">${byRole[0][0]} has the most open roles.</p><div class="bars" style="margin-top:12px">${byRole.map(([n, c], i) => `<div class="b ${i === 0 ? "on" : ""}"><span>${n}</span><div class="t"><i style="width:${c / max * 100}%"></i></div><b class="num">${c}</b></div>`).join("")}</div></div>
    <div class="stats"><div class="stat"><b>${JOBS.length}</b><span>open roles</span></div><div class="stat"><b>${sp}</b><span>sponsor or likely</span></div><div class="stat"><b>${soon}</b><span>close by Dec 8</span></div><div class="stat"><b>${JOBS.filter(j => j.level === "Internship").length}</b><span>internships</span></div></div></div></section>
    <section class="section"><div class="wrap prose"><h2>How we count</h2><p>Counts include internship and entry-level roles open on the snapshot date, from employer career pages and applicant tracking systems checked daily. Sponsorship labels combine the job description with public USCIS and Department of Labor data.</p></div></section>` };
});

route("faq", () => ({ title: "FAQ", path: "/faq", crumbs: [["Home", "home"], ["FAQ"]],
  html: pageHead({ eyebrow: "Resources", title: "Frequently asked questions" }) + `<section class="section"><div class="wrap prose">${faqBlock(FAQ.map(([q, a]) => [q, a.replace("Compare.", '<a href="#compare">Compare</a>.')]))}</div></section>${ctaBand()}` }));

route("compare", () => ({ title: "Compare Yapply", path: "/compare", crumbs: [["Home", "home"], ["Compare"]],
  html: pageHead({ eyebrow: "Resources", title: "How Yapply compares", lead: "Most AI job tools help you apply faster with the resume you have. Yapply writes the resume with you, live, while you talk." }) +
  `<section class="section"><div class="wrap grid">${COMPETITORS.map(c => `<a class="card" href="#compare-yapply-vs-${c.slug}"><h3>Yapply vs ${c.name}</h3><p class="small muted">${c.what}</p></a>`).join("")}</div></section>` }));
pattern(/^compare-yapply-vs-([a-z0-9-]+)$/, s => { const c = COMPETITORS.find(x => x.slug === s); if (!c) return null;
  const rows = [["Starts with", "A 10-minute voice conversation", "Your existing resume or preferences"], ["Resume", "Written live while you talk; correct it out loud", ["teal", "simplify"].includes(s) ? "Resume builder you type into" : "Uses or tweaks the resume you upload"], ["Built for", "US college students and new grads", "See their site"], ["Sponsorship labels", "On every job", s === "jobright" ? "Yes, H-1B filter" : "Check their site"], ["Applies for you", "Yes, after you review each one", s === "simplify" ? "Autofills forms you submit" : s === "teal" ? "No, it tracks applications" : "Yes"], ["Mock interviews", "Full-duplex voice", "Check their site"]];
  return { title: `Yapply vs ${c.name}`, path: `/compare/yapply-vs-${s}`, crumbs: resCrumbs("Compare", "compare", `Yapply vs ${c.name}`),
    html: pageHead({ eyebrow: "Compare", title: `Yapply vs ${c.name}`, answer: `<b>Choose ${c.name}</b> if you want ${c.strong[0].toLowerCase()}. <b>Choose Yapply</b> if you want your resume written with you, live, from a conversation. ${c.diff}` }) + `
    <section class="section"><div class="wrap"><div class="tbl-wrap"><table><thead><tr><th></th><th>Yapply</th><th>${c.name}</th></tr></thead><tbody>${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table></div>
    <p class="small muted" style="margin-top:10px">Based on public information as of ${AS_OF}. Features and prices change; check ${c.name}'s own site.</p></div></section>
    <section class="section"><div class="wrap grid-2"><div><h2>Where ${c.name} is strong</h2><ul class="prose">${c.strong.map(x => `<li>${x}</li>`).join("")}</ul><p class="muted">${c.what}</p></div><div><h2>Where Yapply is different</h2><p>${c.diff}</p><a class="btn primary" href="#feature-ai-career-coach">See the live resume builder</a></div></div></section>
    <section class="section"><div class="wrap"><h2>Other comparisons</h2><div class="row" style="margin-top:12px">${COMPETITORS.filter(x => x.slug !== s).map(x => `<a class="btn sm" href="#compare-yapply-vs-${x.slug}">Yapply vs ${x.name}</a>`).join("")}<a class="btn sm" href="#compare-${s}-alternatives">${c.name} alternatives</a></div></div></section>` }; });
pattern(/^compare-([a-z0-9-]+)-alternatives$/, s => { const c = COMPETITORS.find(x => x.slug === s); if (!c) return null;
  return { title: `${c.name} alternatives for students`, path: `/alternatives/${s}-alternatives`, crumbs: resCrumbs("Compare", "compare", `${c.name} alternatives`),
    html: pageHead({ eyebrow: "Alternatives", title: `${c.name} alternatives for new grads`, answer: `Popular alternatives to ${c.name}: ${COMPETITORS.filter(x => x.slug !== s).map(x => x.name).join(", ")} and Yapply. Choose Yapply if your resume is thin and you want it written with you by voice; choose an auto-apply tool if you only need volume.` }) +
    `<section class="section"><div class="wrap grid"><a class="card" href="#feature-ai-career-coach"><span class="tag hi">Yapply</span><h3>Yapply</h3><p class="small muted">Voice AI resume builder: your resume is written live while you talk.</p></a>${COMPETITORS.filter(x => x.slug !== s).map(x => `<a class="card" href="#compare-yapply-vs-${x.slug}"><h3>${x.name}</h3><p class="small muted">${x.what}</p></a>`).join("")}</div></section>` }; });

// ----- Creator program and affiliate program -----
route("creator-program", () => {
  onRender(() => $("#cp-form").addEventListener("submit", e => { e.preventDefault(); e.target.classList.add("hidden"); $("#cp-ok").classList.remove("hidden"); }));
  return { title: "Creator Program", path: "/creator-program", crumbs: [["Home", "home"], ["Creator Program"]],
    html: `<section class="hero" style="padding-bottom:36px"><div class="wrap grid-2">
      <div><span class="eyebrow">Yapply Creator Program</span><h1>Make short videos about job hunting. <mark>Get paid per post.</mark></h1><p class="lead" style="color:var(--muted);font-size:1.15rem">Film the moment your resume writes itself while you talk, or any relatable job-search story, and soft-pitch Yapply. No followers or experience needed.</p><div class="row"><a class="btn primary" href="#creator-program" onclick="event.preventDefault();document.getElementById('creator-apply').scrollIntoView({behavior:'smooth'})">Apply to create</a><a class="btn" href="#affiliate-program">Prefer a discount code? Affiliate program</a></div></div>
      <div class="stats two"><div class="stat"><b>$TBD</b><span>per approved video (proposed: flat fee)</span></div><div class="stat"><b>View bonus</b><span>tiers at 100K / 500K / 1M views</span></div><div class="stat"><b>1:1</b><span>coaching call to start</span></div><div class="stat"><b>0</b><span>followers required</span></div></div></div></section>
    <section class="section"><div class="wrap"><span class="eyebrow">What you'll talk about</span><h2>One product moment that films well</h2>
      <div class="steps" style="margin-top:18px">${[["Talk", "Open Yapply and talk about a class project, a club, a part-time job."], ["Watch it write", "Your resume appears on screen in real time, with numbers you forgot you had."], ["React", "Show the before and after. That reaction is the video."]].map(([t, d]) => `<div class="step"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div></div></section>
    <section class="section"><div class="wrap grid-2"><div><span class="eyebrow">What you'll be doing</span><h2>Create, learn, earn</h2><ul class="prose"><li><b>Create:</b> post on TikTok, Instagram Reels or YouTube Shorts, on a new or existing account.</li><li><b>Learn:</b> use our bank of hooks, scripts and example videos about internships, new grad recruiting and interviews.</li><li><b>Earn:</b> a flat fee per approved post plus view bonuses. Paid monthly.</li></ul></div>
      <div><span class="eyebrow">Video ideas that work</span><h2>Hooks to start from</h2><ul class="prose"><li>“I talked for 10 minutes and my resume wrote itself”</li><li>“My resume before vs after describing my club job out loud”</li><li>“Things career fairs don't tell international students”</li><li>“Every new grad interview question in 60 seconds”</li></ul></div></div></section>
    <section class="section"><div class="wrap grid-2"><div><span class="eyebrow">Support</span><h2>You won't do it alone</h2><ul class="prose"><li>1:1 creator coaching</li><li>Content bank of hooks, scripts and examples</li><li>Free Yapply Pro while you're in the program</li><li>Creator community on Discord</li></ul>
      <h3>Rules</h3><ul class="prose small"><li>Disclose the partnership on every post (#ad or the platform's paid-partnership label), as FTC rules require.</li><li>Only show results you really got; no made-up offers or numbers.</li><li>No spam, no buying views.</li></ul></div>
      <div id="creator-apply"><h2>Apply</h2><form id="cp-form" class="form card"><div class="two"><label for="cp-name">Name<input id="cp-name" required></label><label for="cp-email">Email<input id="cp-email" type="email" required></label></div><div class="two"><label for="cp-plat">Main platform<select id="cp-plat"><option>TikTok</option><option>Instagram</option><option>YouTube Shorts</option><option>LinkedIn</option></select></label><label for="cp-handle">Handle (optional)<input id="cp-handle" placeholder="@"></label></div><label for="cp-stage">You are a<select id="cp-stage"><option>Current college student</option><option>Recent grad</option><option>Career creator</option></select></label><label for="cp-why">Why you'd be great (one line)<input id="cp-why"></label><button class="btn primary">Submit application</button><p class="small muted">Prototype: nothing is sent.</p></form><p id="cp-ok" class="answer hidden">Thanks! We review applications within a week. (Prototype: nothing was sent.)</p></div></div></section>
    <section class="section"><div class="wrap"><h2>FAQ</h2>${faqBlock([["Do I need followers or experience?", "No. Many creators start a fresh account."], ["Where do I post?", "TikTok, Instagram Reels and YouTube Shorts. LinkedIn is welcome for career creators."], ["How often should I post?", "Once a day works best; the minimum will be in your agreement."], ["How much can I earn?", "A flat fee per approved video plus view bonuses. Final rates will be published at launch."], ["Can I also get a discount code?", "Yes. Creators are enrolled in the <a href=\"#affiliate-program\">affiliate program</a> too."]])}</div></section>` };
});
route("affiliate-program", () => {
  onRender(() => { const calc = () => { const n = +$("#af-n").value || 0, p = +$("#af-p").value || 0; $("#af-out").textContent = `$${Math.round(n * p * 0.3).toLocaleString("en-US")}`; }; ["#af-n", "#af-p"].forEach(s => $(s).addEventListener("input", calc)); calc();
    $("#af-form").addEventListener("submit", e => { e.preventDefault(); e.target.classList.add("hidden"); $("#af-ok").classList.remove("hidden"); }); });
  return { title: "Affiliate Program", path: "/affiliate-program", crumbs: [["Home", "home"], ["Affiliate Program"]],
    html: `<section class="hero" style="padding-bottom:36px"><div class="wrap grid-2"><div><span class="eyebrow">Yapply Affiliate Program</span><h1>Help students get hired. <mark>Earn commission.</mark></h1><p class="lead" style="color:var(--muted);font-size:1.15rem">Share Yapply with your unique discount code. Your audience gets a discount, you earn a commission on every paid signup.</p><a class="btn primary" href="#affiliate-program" onclick="event.preventDefault();document.getElementById('af-apply').scrollIntoView({behavior:'smooth'})">Become an affiliate</a></div>
      <div class="card"><h3>Estimate your earnings</h3><p class="small muted">Proposed 30% commission; final terms at launch.</p><div class="form"><div class="two"><label for="af-n">Paid signups per month<input id="af-n" type="number" min="0" value="40"></label><label for="af-p">Plan price ($/month)<input id="af-p" type="number" min="0" value="20"></label></div></div><div class="stat" style="margin-top:12px"><b id="af-out">$0</b><span>estimated commission per month</span></div></div></div></section>
    <section class="section"><div class="wrap"><h2>How it works</h2><div class="steps" style="margin-top:18px">${[["Apply", "Tell us where you'll share Yapply. Approved affiliates get a unique code and link."], ["Share", "Post it on social, in student orgs, Discord servers, newsletters or career workshops."], ["Earn", "Earn commission on every paid subscription that uses your code. Paid monthly."]].map(([t, d]) => `<div class="step"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div></div></section>
    <section class="section"><div class="wrap grid-2"><div><h2>Proposed terms</h2><div class="tbl-wrap"><table><tr><td>Commission</td><td><b>30%</b> of each paid subscription (proposed)</td></tr><tr><td>Your audience gets</td><td>A discount with your code</td></tr><tr><td>Payouts</td><td>Monthly</td></tr><tr><td>Tracking</td><td>Unique code + link, dashboard with signups and earnings</td></tr><tr><td>Assets</td><td>Demo videos, screenshots, copy for posts</td></tr></table></div>
      <h3>Who it's for</h3><p>Career creators, student organization leaders, career coaches, newsletter writers, and university clubs.</p>
      <h3>Rules</h3><ul class="prose small"><li>Disclose that you earn a commission.</li><li>No paid search ads on the Yapply brand name; no coupon-spam sites.</li><li>No false claims about results.</li></ul></div>
      <div id="af-apply"><h2>Apply</h2><form id="af-form" class="form card"><div class="two"><label for="af-name">Name<input id="af-name" required></label><label for="af-email">Email<input id="af-email" type="email" required></label></div><label for="af-where">Where will you share Yapply?<select id="af-where"><option>Social media</option><option>Student organization</option><option>Newsletter or blog</option><option>Career coaching</option><option>Other</option></select></label><label for="af-reach">Audience size (approx.)<input id="af-reach" placeholder="e.g. 5,000 followers or 300 members"></label><button class="btn primary">Apply to the affiliate program</button><p class="small muted">Prototype: nothing is sent.</p></form><p id="af-ok" class="answer hidden">Thanks! You'll hear back within a week. (Prototype: nothing was sent.)</p></div></div></section>
    <section class="section"><div class="wrap"><h2>FAQ</h2>${faqBlock([["How much do I earn?", "A proposed 30% of each paid subscription that uses your code; final terms are published at launch."], ["When do I get paid?", "Monthly, once your earnings clear any refund window."], ["Can student organizations join?", "Yes. Clubs can use commissions to fund events."], ["Is there also a creator program?", "Yes, the <a href=\"#creator-program\">Creator Program</a> pays per video."]])}</div></section>` };
});

// ---------- COMPANY ----------
route("about", () => ({ title: "About us", path: "/about", crumbs: [["Home", "home"], ["About"]],
  html: pageHead({ eyebrow: "Company", title: "Your resume should sound like you", lead: "Most students have more to say than their resume shows. Yapply listens, asks the follow-up a recruiter would ask, and writes your resume while you talk." }) + `
  <section class="section"><div class="wrap grid-2 prose"><div><h2>Why voice</h2><p>Forms don't ask follow-up questions. A conversation does, and the answers are what make a resume strong.</p><h2>What we won't do</h2><ul><li>Invent experience</li><li>Apply without your approval</li><li>Sell your data</li></ul></div><div><h2>Contact</h2><p>${LEGAL_CO.name}<br>Email: ${mail(LEGAL_CO.email)}<br>Security reports: ${mail(LEGAL_CO.security)}<br>${LEGAL_CO.address}</p></div></div></section>` }));
const legalPage = (name, title, sections) => route(name, () => ({ title, path: "/" + name, crumbs: [["Home", "home"], [title]],
  html: pageHead({ eyebrow: "Company · Draft for legal review", title, lead: `Last updated: ${LEGAL_CO.updated}` }) + `<section class="section"><div class="wrap layout-side"><article class="prose legal">${sections.map(([h, b], i) => `<h2 id="lg${i}">${h}</h2>${b}`).join("")}</article><aside class="toc"><b>Contents</b>${sections.map(([h], i) => `<a href="#${name}" onclick="document.getElementById('lg${i}').scrollIntoView({behavior:'smooth'});return false">${h}</a>`).join("")}</aside></div></section>` }));
legalPage("privacy", "Privacy Policy", PRIVACY);
legalPage("terms", "Terms of Service", TERMS);

// ---------- HTML SITEMAP (not linked from the footer) ----------
route("sitemap", () => {
  const groups = [
    ["Product", [["home", "Home"], ["features", "Features"], ...FEATURES.map(f => ["feature-" + f.slug, f.name]), ["pricing", "Pricing"], ["app", "Mobile App"], ["signup", "Sign up"]]],
    ["Opportunities", [["jobs", "Search all jobs"], ["jobs-internships", "Internships"], ["jobs-new-grad", "New grad"], ["jobs-remote", "Remote"], ["international-students", "International students"], ["h1b-jobs", "H1B jobs"], ...ROLES.map(r => ["jobs-" + r.slug + "-new-grad", r.name + " new grad"]), ...ROLES.map(r => ["h1b-jobs-" + r.slug, "H1B " + r.name]), ["companies", "Companies"], ...COMPANIES.map(c => ["company-" + c.slug, c.name]), ...COMPANIES.map(c => ["company-" + c.slug + "-interview", c.name + " interviews"]), ["job-" + JOBS[0].id, "Job detail (example)"], ["lists-new-grad-2027", "New Grad 2027 list"], ["lists-summer-2027-internships", "Summer 2027 internships list"]]],
    ["Tools", [["tools", "All tools"], ...TOOLS.map(t => [t.id, t.name]), ...Object.keys(VERBS).map(v => ["tool-resume-synonyms-" + v, v + " synonyms"]), ...ROLES.map(r => ["tool-resume-skills-" + r.slug, r.name + " skills"])]],
    ["Resources", [["blog", "Blog"], ...BLOG.map(b => ["blog-" + b.slug, b.title]), ["help", "Help Center"], ["guides", "Guides"], ...GUIDES.map(g => ["guide-" + g.slug, g.title]), ["glossary", "Glossary"], ...GLOSSARY.map(g => ["glossary-" + g.slug, g.term]), ["interview-questions", "Interview questions"], ...Object.keys(IQ).map(k => ["interview-questions-" + k, IQ[k].name]), ["reports", "Reports"], ["report-2026-11", "November 2026 report"], ["faq", "FAQ"], ["compare", "Compare"], ...COMPETITORS.map(c => ["compare-yapply-vs-" + c.slug, "Yapply vs " + c.name]), ["creator-program", "Creator program"], ["affiliate-program", "Affiliate program"]]],
    ["Company", [["about", "About us"], ["privacy", "Privacy policy"], ["terms", "Terms of service"]]]
  ];
  const total = groups.reduce((a, g) => a + g[1].length, 0);
  return { title: "Sitemap", path: "/sitemap", crumbs: [["Home", "home"], ["Sitemap"]],
    html: pageHead({ eyebrow: "Company", title: "Sitemap", lead: `${total} pages in this prototype.` }) +
    `<section class="section"><div class="wrap grid">${groups.map(([h, l]) => `<div class="card"><h3>${h}</h3><ul class="small" style="padding-left:18px">${l.map(([u, t]) => `<li><a href="#${u}">${esc(t)}</a></li>`).join("")}</ul></div>`).join("")}</div></section>` };
});

// ---------- BOOT ----------
renderChrome();
window.addEventListener("hashchange", render);
render();
