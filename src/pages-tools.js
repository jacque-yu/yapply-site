// ---------- FREE TOOLS ----------
const TOOLS = [
  { id: "tool-ats-resume-checker", name: "ATS Resume Checker", one: "Score your resume against a job description and see missing keywords." },
  { id: "tool-resume-synonyms", name: "Resume Synonyms", one: "Stronger action verbs for created, developed, managed and more." },
  { id: "tool-resume-skills", name: "Resume Skills by Role", one: "The hard skills, tools and soft skills each role expects." },
  { id: "tool-cover-letter-generator", name: "Cover Letter Generator", one: "A specific, one-page cover letter from five inputs." },
  { id: "tool-elevator-pitch-generator", name: "Elevator Pitch Generator", one: "A 30-second pitch you can say out loud at a career fair." },
  { id: "tool-h1b-sponsor-checker", name: "H-1B Sponsor Checker", one: "Check whether a company sponsors H-1B for new grads." }
];
const toolCrumbs = name => [["Home", "home"], ["Tools", "tools"], [name]];
const toolPath = id => "/tools/" + id.replace("tool-", "");
const toolFoot = (others = 3) => `<section class="section"><div class="wrap"><h2>More free tools</h2><div class="grid" style="margin-top:14px">${TOOLS.slice(0, others + 3).map(t => `<a class="card" href="#${t.id}"><h3>${t.name}</h3><p class="small muted">${t.one}</p></a>`).join("")}</div></div></section>`;

route("tools", () => ({
  title: "Free job search tools", path: "/tools", crumbs: [["Home", "home"], ["Tools"]],
  html: pageHead({ eyebrow: "Tools", title: "Free job search tools for students", lead: "No sign-up. Each tool runs in your browser." }) +
  `<section class="section"><div class="wrap grid">${TOOLS.map(t => `<a class="card" href="#${t.id}"><h3>${t.name}</h3><p class="muted">${t.one}</p></a>`).join("")}</div></section>${ctaBand("Tools fix one thing. Yapply fixes the whole search.")}`
}));

// ATS checker
const STOP = new Set("a an the and or of to in for on with at by from as is are be will you your our we this that it its their they them who what when where how able ability strong excellent including include work working team teams role job using use experience years year plus preferred required requirements responsibilities about across new grad within into per more other such than well".split(" "));
function keywords(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9+#./ -]/g, " ").split(/\s+/).map(w => w.replace(/^[./-]+|[./-]+$/g, "")).filter(w => w.length > 1 && !STOP.has(w) && !/^\d+$/.test(w));
  const freq = {}; words.forEach(w => freq[w] = (freq[w] || 0) + 1);
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).map(x => x[0]);
}
const EX_JD = "We are hiring a Data Analyst, New Grad to join our analytics team. You will write SQL to analyze product data, build dashboards in Tableau, run A/B test analysis and present findings to stakeholders. Requirements: SQL, Python (pandas), Excel, Tableau, statistics, A/B testing, data cleaning, communication.";
const EX_CV = "Jordan Lee | B.S. Statistics, May 2027\nEXPERIENCE\nResearch Assistant, Campus Lab: Cleaned survey data in Python (pandas) and built charts in Excel for 3 professors.\nTreasurer, Investment Club: Tracked a $5K portfolio in Excel.\nPROJECTS\nCourse project: analyzed 2,400 survey responses to find drivers of student churn.\nSKILLS\nPython, Excel, R, statistics";
route("tool-ats-resume-checker", () => {
  onRender(() => {
    const run = () => {
      const jd = $("#ats-jd").value, cv = $("#ats-cv").value; const cvl = cv.toLowerCase();
      const kws = keywords(jd).slice(0, 25); const hit = kws.filter(k => cvl.includes(k)); const miss = kws.filter(k => !cvl.includes(k));
      const score = kws.length ? Math.round(hit.length / kws.length * 100) : 0;
      const wc = cv.split(/\s+/).filter(Boolean).length, nums = (cv.match(/\d[\d,.%$K]*/g) || []).length;
      const secs = ["experience", "education", "skills", "projects"].filter(s => cvl.includes(s));
      const checks = [[nums >= 3, `${nums} numbers found. Aim for a number in most bullets.`], [secs.length >= 3, `Sections found: ${secs.join(", ") || "none"}. Use standard headings so the ATS can parse them.`], [wc >= 250 && wc <= 700, `${wc} words. One page is usually 350–650 words.`], [!/\b(helped|worked on|responsible for)\b/i.test(cv), "Weak verbs like “helped” or “worked on” " + (/\b(helped|worked on|responsible for)\b/i.test(cv) ? "found: see Resume Synonyms." : "not found.")]];
      $("#ats-out").innerHTML = `<div class="stats"><div class="stat"><b>${score}%</b><span>keyword match (${hit.length} of ${kws.length})</span></div></div>
        <div class="meter" style="margin:14px 0"><i style="width:${score}%"></i></div>
        <h4>Missing keywords</h4><div class="row">${miss.map(m => `<span class="tag warn">${esc(m)}</span>`).join("") || "<span class='tag good'>None</span>"}</div>
        <h4 style="margin-top:16px">Matched</h4><div class="row">${hit.map(m => `<span class="tag good">${esc(m)}</span>`).join("")}</div>
        <h4 style="margin-top:16px">Checks</h4><ul>${checks.map(([ok, t]) => `<li>${ok ? "✓" : "✗"} ${t}</li>`).join("")}</ul>
        <p class="small muted">Only add a missing keyword if it's true. <a href="#signup">Yapply's voice session</a> finds experience you can honestly add.</p>`;
    };
    $("#ats-run").addEventListener("click", run); run();
  });
  return { title: "Free ATS resume checker", path: toolPath("tool-ats-resume-checker"), crumbs: toolCrumbs("ATS Resume Checker"),
    html: pageHead({ eyebrow: "Free tool", title: "ATS resume checker", answer: "Paste a job description and your resume. The checker pulls the job's top 25 keywords, shows which ones your resume is missing and checks numbers, sections and length. Example text is pre-filled." }) + `
    <section class="section"><div class="wrap grid-2"><div class="form"><label for="ats-jd">Job description<textarea id="ats-jd">${EX_JD}</textarea></label><label for="ats-cv">Your resume (plain text)<textarea id="ats-cv" style="min-height:220px">${EX_CV}</textarea></label><button class="btn primary" id="ats-run">Check my resume</button></div><div class="out" id="ats-out" aria-live="polite" style="white-space:normal"></div></div></section>
    <section class="section"><div class="wrap prose"><h2>How ATS systems read resumes</h2><p>Applicant tracking systems such as Workday, Greenhouse and Lever parse your resume into fields and let recruiters search by keyword. Standard section headings, plain formatting and the job's own words make that parsing reliable. See <a href="#glossary-ats">ATS in the glossary</a>.</p>${faqBlock([["Is a higher score always better?", "No. Aim to cover the skills you really have. Stuffing keywords you can't back up hurts in interviews."], ["Does it store my resume?", "No. Everything runs in your browser."]])}</div></section>${toolFoot()}${ctaBand()}` };
});

// Synonyms
const cap = w => w[0].toUpperCase() + w.slice(1);
function synTable(v) { const d = VERBS[v]; return `<a class="card" href="#tool-resume-synonyms-${v}" style="display:block"><h3>Instead of “${v}”</h3><div class="row" style="margin:10px 0">${d.best.map(a => `<span class="tag">${a}</span>`).join("")}</div><p class="small"><b>Before:</b> ${d.misuse[0][0]}</p><p class="small"><b>After:</b> ${d.misuse[0][1]}</p><span class="small">See all ${d.alts.length}+ synonyms with examples →</span></a>`; }
route("tool-resume-synonyms", () => {
  onRender(() => { const go = () => { const w = $("#syn-in").value.toLowerCase().trim(); const found = Object.keys(VERBS).filter(v => !w || w.includes(v) || v.startsWith(w) || w.includes(v.replace(/ed$/, ""))); $("#syn-out").innerHTML = found.length ? found.map(synTable).join("") : `<p class="card">No match yet. Try one of: ${Object.keys(VERBS).join(", ")}.</p>`; }; $("#syn-in").addEventListener("input", go); go(); });
  return { title: "Resume synonyms: stronger action verbs with examples", path: toolPath("tool-resume-synonyms"), crumbs: toolCrumbs("Resume Synonyms"),
    html: pageHead({ eyebrow: "Free tool", title: "Resume synonyms for overused verbs", answer: `Type a verb or paste a bullet. Each of the ${Object.keys(VERBS).length} verbs below has its own page with synonyms grouped by situation, example bullets for your field and a bullet rewriter.` }) + `
    <section class="section"><div class="wrap"><label for="syn-in" style="max-width:520px">Verb or bullet<input id="syn-in" placeholder="e.g. helped, created, managed, or paste a bullet"></label><div class="grid" id="syn-out" style="margin-top:18px"></div></div></section>${toolFoot()}` };
});
pattern(/^tool-resume-synonyms-([a-z]+)$/, v => {
  const d = VERBS[v]; if (!d) return null; const V = cap(v);
  const total = d.groups.reduce((a, g) => a + g.words.length, 0) + d.best.filter(b => !d.groups.some(g => g.words.some(w => w.word.toLowerCase() === b))).length;
  const nuance = b => { for (const g of d.groups) { const w = g.words.find(x => x.word.toLowerCase() === b); if (w) return w.nuance; } return ""; };
  const rel = d.rel.filter(r => VERBS[r] && r !== v).concat(Object.keys(VERBS).filter(x => x !== v && !d.rel.includes(x))).slice(0, 8);
  onRender(() => {
    document.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", () => document.getElementById(b.dataset.jump).scrollIntoView({ behavior: "smooth" })));
    const run = () => {
      const bullet = $("#fx-in").value.trim(), gi = +$("#fx-ctx").value, g = d.groups[gi];
      const re = new RegExp("\\b(" + v + "|" + v.replace(/ed$/, "e") + "|" + v.replace(/ed$/, "") + ")(d|ed|s|ing)?\\b", "i");
      const rest = bullet.replace(/^[\s•\-–]*/, "").replace(re, "").replace(/^\s+/, "").replace(/^(with|on|in|the)\s+/i, m => m);
      const lines = g.words.map(w => `<li><mark>${w.word}</mark> ${esc(rest || "…")}</li>`).join("");
      const checks = [[/\d/.test(bullet), "Has a number (users, %, $, hours, people)"], [/\b(python|sql|excel|figma|react|tableau|java|r)\b/i.test(bullet) || bullet.split(" ").length > 10, "Names a tool or method"], [/\b(cut|saved|grew|raised|reduced|increased|doubled|won|used by|adopted)\b/i.test(bullet), "Shows a result"]];
      $("#fx-out").innerHTML = `<p class="small muted">Swap the verb for one that fits “${g.ctx.toLowerCase()}”:</p><ul class="small">${lines}</ul><p class="small" style="margin-top:10px"><b>Then check:</b></p><ul class="small" style="list-style:none;padding:0">${checks.map(([ok, t]) => `<li>${ok ? "✓" : "✗"} ${t}</li>`).join("")}</ul>${checks.some(c => !c[0]) ? `<p class="small">Missing a number or result? <a href="#feature-ai-career-coach">Talk it through with Yapply</a>: it asks the follow-up and writes the full bullet while you answer.</p>` : ""}`;
    };
    $("#fx-in").addEventListener("input", run); $("#fx-ctx").addEventListener("change", run); run();
  });
  const intents = [["best", "I just need a better word", `Top ${d.best.length} replacements`], ["situation", "Which one fits what I did?", `${d.groups.length} situations, ${total} words`], ["field", "Show me examples for my field", "Software, business, clubs"], ["fix", "Fix my bullet now", "Paste it, get rewrites"], ["honest", `Is “${v}” bad? Am I overclaiming?`, "When to keep it"]];
  const nuance2 = b => nuance(b) || BEST_NOTE[b] || "a more specific alternative";
  return { title: `${V} synonyms for a resume: ${total} better words with examples`, path: `/tools/resume-synonyms/${v}`, crumbs: [["Home", "home"], ["Tools", "tools"], ["Resume Synonyms", "tool-resume-synonyms"], [v]],
    html: pageHead({ eyebrow: "Resume synonyms", title: `${V} synonyms for your resume`, answer: `The best words to use instead of “${v}” on a resume are <b>${d.best.join(", ")}</b>. “${V}” only says ${d.signals}; choose the synonym that names what kind of work it was, then add a number.` }) + `
    <section class="section" style="padding-top:24px"><div class="wrap"><span class="eyebrow">What are you looking for?</span><div class="intent-grid">${intents.map(([id, t, s]) => `<button class="intent" type="button" data-jump="${id}"><b>${t}</b><span>${s} ↓</span></button>`).join("")}</div></div></section>
    <section class="section syn-sec" id="best"><div class="wrap"><h2>Best synonyms for “${v}”</h2><div class="best-grid">${d.best.map((b, i) => `<div class="best"><span class="best-n">${i + 1}</span><b>${cap(b)}</b><span class="small muted">${nuance2(b)}</span></div>`).join("")}</div></div></section>
    <section class="section syn-sec" id="situation"><div class="wrap"><h2>Pick the word by what you actually did</h2><p class="muted">The right synonym depends on the kind of work. Find your situation, then copy the pattern of the example.</p>
      ${d.groups.map(g => `<h3 style="margin-top:22px">${g.ctx}</h3><div class="tbl-wrap"><table><thead><tr><th style="width:16%">Word</th><th style="width:30%">Use it when</th><th>Example bullet</th></tr></thead><tbody>${g.words.map(w => `<tr><td><b>${w.word}</b></td><td class="small">${w.nuance}</td><td class="small">${w.ex}</td></tr>`).join("")}</tbody></table></div>`).join("")}</div></section>
    <section class="section syn-sec"><div class="wrap"><h2>Weak “${v}” bullets, rewritten</h2><div class="grid" style="margin-top:14px;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))">${d.misuse.map(([a, b, why]) => `<div class="card"><p class="small"><span class="tag bad">Before</span> ${a}</p><p class="small"><span class="tag good">After</span> ${b}</p><p class="small muted"><b>Why it's better:</b> ${why}</p></div>`).join("")}</div></div></section>
    <section class="section syn-sec" id="field"><div class="wrap"><h2>Examples for your field</h2><div class="grid" style="margin-top:14px">${Object.entries(d.byField).map(([f, bs]) => `<div class="card"><h3>${f}</h3><ul class="small">${bs.map(x => `<li>${x}</li>`).join("")}</ul></div>`).join("")}</div></div></section>
    <section class="section syn-sec" id="fix"><div class="wrap grid-2"><div><h2>Fix your “${v}” bullet</h2><div class="form"><label for="fx-in">Your bullet<input id="fx-in" value="${esc(d.misuse[0][0])}"></label><label for="fx-ctx">What did you actually do?<select id="fx-ctx">${d.groups.map((g, i) => `<option value="${i}">${g.ctx}</option>`).join("")}</select></label></div></div><div class="out" id="fx-out" aria-live="polite" style="white-space:normal"></div></div></section>
    <section class="section syn-sec" id="honest"><div class="wrap grid-2"><div><h2>Should you keep “${v}”?</h2><p>${d.keep}</p><h3>Don't overclaim</h3><p class="small">Pick the verb that matches your real role. Recruiters ask about every bullet in interviews: “led” means people followed your direction, “built” means you made it yourself, “contributed” means it was a shared result. A precise smaller verb beats an impressive one you can't back up.</p></div>
      <div><h2>How often to use the same verb</h2><ul class="prose small"><li>Use any one verb at most twice on a one-page resume.</li><li>Don't start two bullets in a row with the same verb.</li><li>Past tense for past roles, present tense for your current role.</li><li>Run the <a href="#tool-ats-resume-checker">ATS checker</a> to see repeated words.</li></ul></div></div></section>
    <section class="section"><div class="wrap"><h2>FAQ</h2>${faqBlock(d.faq.concat([[`How many synonyms for ${v} should I use?`, "Use the one that fits each bullet. Two or three different verbs across a resume is plenty; variety matters less than precision."]]))}</div></section>
    <section class="section"><div class="wrap"><h2>Related resume synonyms</h2><div class="row" style="margin-top:12px">${rel.map(x => `<a class="btn sm" href="#tool-resume-synonyms-${x}">${cap(x)} synonyms</a>`).join("")}</div></div></section>
    ${ctaBand("Skip the thesaurus. Say what you did.", "Yapply asks the follow-up question and writes the bullet, with the right verb and the number, while you talk.")}` };
});

// Skills
function skillsBlock(r) { const s = SKILLS[r]; return `<div class="grid"><div class="card"><h4>Hard skills</h4><ul>${s.hard.map(x => `<li>${x}</li>`).join("")}</ul></div><div class="card"><h4>Tools</h4><ul>${s.tools.map(x => `<li>${x}</li>`).join("")}</ul></div><div class="card"><h4>Soft skills to show in bullets</h4><ul>${s.soft.map(x => `<li>${x}</li>`).join("")}</ul></div></div>`; }
route("tool-resume-skills", () => {
  onRender(() => { const go = () => { $("#sk-out").innerHTML = skillsBlock($("#sk-role").value); }; $("#sk-role").addEventListener("change", go); go(); $("#sk-copy").addEventListener("click", () => { const s = SKILLS[$("#sk-role").value]; copyText("Skills: " + [...s.hard, ...s.tools].join(", ")); }); });
  return { title: "Skills for your resume, by role", path: toolPath("tool-resume-skills"), crumbs: toolCrumbs("Resume Skills"),
    html: pageHead({ eyebrow: "Free tool", title: "Skills to put on your resume", answer: "Pick a role to see the hard skills, tools and soft skills entry-level job descriptions ask for most. Only list skills you can talk about in an interview." }) + `
    <section class="section"><div class="wrap"><div class="row" style="align-items:end"><label for="sk-role">Role<select id="sk-role">${ROLES.map(r => opt(r.slug, r.name)).join("")}</select></label><button class="btn" id="sk-copy">Copy skills line</button></div><div id="sk-out" style="margin-top:18px"></div>
    <h3 style="margin-top:28px">Skills pages by role</h3><div class="row">${ROLES.map(r => `<a class="btn sm" href="#tool-resume-skills-${r.slug}">${r.name}</a>`).join("")}</div></div></section>${toolFoot()}` };
});
pattern(/^tool-resume-skills-([a-z-]+)$/, r => {
  if (!SKILLS[r]) return null; const R = role(r);
  return { title: `${R.name} skills for a resume`, path: `/tools/resume-skills/${r}`, crumbs: [["Home", "home"], ["Tools", "tools"], ["Resume Skills", "tool-resume-skills"], [R.name]],
    html: pageHead({ eyebrow: "Resume skills", title: `${R.name} skills for your resume`, answer: `Top ${R.name.toLowerCase()} skills for entry-level resumes: <b>${SKILLS[r].hard.slice(0, 4).join(", ")}</b>, plus tools like ${SKILLS[r].tools.slice(0, 3).join(", ")}.` }) +
    `<section class="section"><div class="wrap">${skillsBlock(r)}<p style="margin-top:16px"><a href="#jobs-${r}-new-grad">See ${R.name} new grad jobs</a> · <a href="#interview-questions-${IQ[r] ? r : "behavioral"}">Interview questions</a></p></div></section>${ctaBand()}` };
});

// Cover letter
route("tool-cover-letter-generator", () => {
  onRender(() => {
    const go = () => {
      const v = id => $("#" + id).value.trim();
      $("#cl-out").textContent = `Dear ${v("cl-co")} hiring team,\n\nI'm ${v("cl-name")}, a ${v("cl-major")} student at ${v("cl-school")}, and I'm applying for the ${v("cl-role")} role. ${v("cl-why")}\n\nIn my most relevant experience, I ${v("cl-ex1")}. That taught me how to turn a vague problem into something people use, which is what I'd bring to your team from week one.\n\nI'd welcome the chance to talk about how I can contribute to ${v("cl-co")}. Thank you for your time.\n\nSincerely,\n${v("cl-name")}`;
    };
    document.querySelectorAll("#cl-form input, #cl-form textarea").forEach(i => i.addEventListener("input", go)); go();
    $("#cl-copy").addEventListener("click", () => copyText($("#cl-out").textContent));
  });
  const f = (id, l, val, ta) => `<label for="${id}">${l}${ta ? `<textarea id="${id}" style="min-height:80px">${val}</textarea>` : `<input id="${id}" value="${val}">`}</label>`;
  return { title: "Free cover letter generator", path: toolPath("tool-cover-letter-generator"), crumbs: toolCrumbs("Cover Letter Generator"),
    html: pageHead({ eyebrow: "Free tool", title: "Cover letter generator for students", answer: "Fill in five fields and get a one-page cover letter that names the company, the role and one concrete result. Example inputs are pre-filled; edit them and the letter updates." }) + `
    <section class="section"><div class="wrap grid-2"><form id="cl-form" class="form" onsubmit="return false"><div class="two">${f("cl-name", "Your name", "Jordan Lee")}${f("cl-school", "School", "University of Michigan")}</div><div class="two">${f("cl-major", "Major", "statistics")}${f("cl-role", "Role", "Data Analyst, New Grad")}</div>${f("cl-co", "Company", "Quill Analytics")}${f("cl-why", "Why this company (one sentence)", "Your alternative-data research is the kind of work I've wanted to do since my first econometrics class.", true)}${f("cl-ex1", "Your best result (start with a verb)", "modeled 2,400 survey responses in Python to find the three drivers of student churn, which the dean's office now uses to plan advising", true)}</form>
    <div><div class="out" id="cl-out" aria-live="polite"></div><button class="btn" id="cl-copy" style="margin-top:10px">Copy letter</button></div></div></section>${toolFoot()}${ctaBand("Yapply drafts cover letters from your voice profile, tailored to every job.")}` };
});

// Elevator pitch
route("tool-elevator-pitch-generator", () => {
  onRender(() => {
    const go = () => {
      const v = id => $("#" + id).value.trim();
      const t = `Hi, I'm ${v("ep-name")}. I'm a ${v("ep-year")} studying ${v("ep-major")}. Most recently I ${v("ep-proof")}. I'm looking for ${v("ep-goal")}, and I'd love to hear how your team ${v("ep-ask")}.`;
      const words = t.split(/\s+/).length; const secs = Math.round(words / 150 * 60);
      $("#ep-out").textContent = t; $("#ep-time").textContent = `${words} words · about ${secs} seconds out loud`;
      $("#ep-time").className = "tag " + (secs <= 35 ? "good" : "warn");
    };
    document.querySelectorAll("#ep-form input").forEach(i => i.addEventListener("input", go)); go();
    $("#ep-copy").addEventListener("click", () => copyText($("#ep-out").textContent));
  });
  const f = (id, l, val) => `<label for="${id}">${l}<input id="${id}" value="${val}"></label>`;
  return { title: "Elevator pitch generator", path: toolPath("tool-elevator-pitch-generator"), crumbs: toolCrumbs("Elevator Pitch Generator"),
    html: pageHead({ eyebrow: "Free tool", title: "Elevator pitch generator", answer: "A good career-fair pitch is 20–35 seconds: who you are, one proof point, what you want, one question. The timer assumes 150 words per minute." }) + `
    <section class="section"><div class="wrap grid-2"><form id="ep-form" class="form" onsubmit="return false"><div class="two">${f("ep-name", "Name", "Jordan")}${f("ep-year", "Year", "senior")}</div>${f("ep-major", "Major", "statistics at Michigan")}${f("ep-proof", "One proof point", "built a churn model from 2,400 survey responses that our advising office now uses")}${f("ep-goal", "What you want", "a new grad data analyst role")}${f("ep-ask", "Your question", "decides which analyses to run each quarter")}</form>
    <div class="stack"><div class="out" id="ep-out" aria-live="polite"></div><div class="row"><span id="ep-time" class="tag"></span><button class="btn sm" id="ep-copy">Copy</button></div><p class="small muted">Practice it out loud with <a href="#feature-ai-mock-interview">AI Mock Interview</a>.</p></div></div></section>${toolFoot()}` };
});

// H-1B checker
route("tool-h1b-sponsor-checker", () => {
  onRender(() => {
    const go = () => {
      const q = $("#h1-q").value.toLowerCase().trim();
      const list = COMPANIES.filter(c => !q || c.name.toLowerCase().includes(q) || c.tags.join(" ").toLowerCase().includes(q));
      $("#h1-out").innerHTML = list.map(c => { const js = JOBS.filter(j => j.company === c.slug); const sp = js.filter(j => ["yes", "likely"].includes(j.sponsor)).length;
        return `<div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0"><a href="#company-${c.slug}">${c.name}</a></h3>${c.slug === "booz-allen" ? sponsorTag("no") : sponsorTag(sp ? "likely" : "unknown")}</div><p class="small muted">${c.tags.join(", ")} · ${c.hq}</p>
        ${slot("H-1B filings FY2024–FY2026, approvals, new grad share", "the USCIS H-1B Employer Data Hub")}
        <p class="small" style="margin-top:10px">${sp} of ${js.length} example listings labelled sponsoring · <a href="${USCIS_HUB}">Check ${c.name} on USCIS ↗</a></p></div>`; }).join("") || `<p class="card">Not in our list yet. Search any employer on the <a href="${USCIS_HUB}">USCIS H-1B Employer Data Hub ↗</a>.</p>`;
    };
    $("#h1-q").addEventListener("input", go); go();
  });
  return { title: "H-1B sponsor checker", path: toolPath("tool-h1b-sponsor-checker"), crumbs: toolCrumbs("H-1B Sponsor Checker"),
    html: pageHead({ eyebrow: "Free tool", title: "H-1B sponsor checker", answer: "Search a company to see whether it sponsors H-1B for new grads. In production each card shows the employer's filings and approvals for the last three fiscal years from the USCIS H-1B Employer Data Hub and Department of Labor LCA data.", extra: `<p style="margin-top:12px">${DEMO}</p>` }) + `
    <section class="section"><div class="wrap"><label for="h1-q" style="max-width:480px">Company or industry<input id="h1-q" placeholder="e.g. Capital One, trading"></label><div class="grid" id="h1-out" style="margin-top:18px"></div></div></section>${toolFoot()}${ctaBand("See only jobs at employers that sponsor.", "Yapply labels sponsorship on every role.")}` };
});
