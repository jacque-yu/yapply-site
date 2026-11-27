// ---------- FREE TOOLS ----------
const TOOLS = [
  { id: "tool-ats-resume-checker", name: "ATS Resume Checker", one: "Score your resume against a job description and see missing keywords." },
  { id: "tool-resume-synonyms", name: "Resume Synonyms", one: "Stronger action verbs for created, developed, managed and more." },
  { id: "tool-resume-skills", name: "Resume Skills by Role", one: "The hard skills, tools and soft skills each role expects." },
  { id: "tool-cover-letter-generator", name: "Cover Letter Generator", one: "A specific, one-page cover letter from five inputs." },
  { id: "tool-resume-roaster", name: "Resume Roaster", one: "Paste your resume. Get a blunt list of what's getting it filtered out." },
  { id: "tool-h1b-sponsor-checker", name: "H-1B Sponsor Checker", one: "Check whether a company sponsors H-1B for new grads." }
];
const toolCrumbs = name => [["Home", "home"], ["Tools", "tools"], [name]];
const toolPath = id => "/tools/" + id.replace("tool-", "");
const toolFoot = (others = 3) => `<section class="section"><div class="wrap"><h2>More free tools</h2><div class="grid" style="margin-top:14px">${TOOLS.slice(0, others + 3).map(t => `<a class="card" href="#${t.id}"><h3>${t.name}</h3><p class="small muted">${t.one}</p></a>`).join("")}</div></div></section>`;

route("tools", () => ({
  title: "Free job search tools", path: "/tools", crumbs: [["Home", "home"], ["Tools"]],
  html: pageHead({ eyebrow: "Tools", title: "Free job search tools", lead: "No sign-up. Each tool runs in your browser." }) +
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
        <p class="small muted">Only add a missing keyword if it's true. <a href="#call">A free Yapply call</a> finds experience you can honestly add.</p>`;
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

// Resume Roaster (replaces the elevator pitch generator)
const ROAST_FIELDS = {
  "Data analytics": ["sql", "excel", "python", "tableau", "power bi", "dashboard", "analysis", "reporting", "a/b", "stakeholders"],
  "Operations": ["excel", "forecasting", "inventory", "process", "scheduling", "kpi", "supply chain", "logistics", "cost", "vendor"],
  "Sales": ["quota", "pipeline", "crm", "salesforce", "prospecting", "negotiat", "revenue", "demo", "closing", "accounts"],
  "Product": ["user research", "roadmap", "prioritiz", "requirements", "launch", "metrics", "stakeholders", "experiment", "spec", "engineers"],
  "Software & IT": ["python", "javascript", "sql", "api", "git", "cloud", "aws", "testing", "automation", "debug"]
};
const ROAST_AI = ["spearheaded", "leveraged", "leveraging", "synergy", "synergies", "results-driven", "passionate", "dynamic", "detail-oriented", "proven track record", "delve", "utilize", "utilized", "seamless", "robust", "cutting-edge", "fast-paced", "go-getter", "team player", "hard-working", "hardworking", "self-starter", "innovative", "thought leader"];
const ROAST_DUTY = /\b(responsible for|duties included|helped( with)?|assisted( with)?|worked on|handled|participated in|involved in|in charge of)\b/i;
const EX_ROAST = "Diego Ramirez\nResults-driven, hard-working team player passionate about leveraging synergies.\n\nEXPERIENCE\nAssistant Store Manager, Riverside Market (2023–now)\n- Responsible for opening and closing the store\n- Handled customers and scheduling\n- Helped with inventory and ordering\n\nSKILLS\nCustomer service, teamwork, Microsoft Office";
function roastResume(text, field, gentle) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const bullets = lines.filter(l => /^[-•*]/.test(l) || l.split(/\s+/).length > 5);
  const low = text.toLowerCase(), out = [];
  const say = (roast, soft) => gentle ? soft : roast;
  const duty = bullets.filter(l => ROAST_DUTY.test(l));
  if (duty.length) out.push([`Duty, not result (${duty.length})`, duty.slice(0, 3).map(l => l.replace(/^[-•*]\s*/, "")).join("” · “"), say("This is your job description, not what you achieved. Nobody hires “responsible for”.", "These describe duties. Add what changed because you did them."), "Say what changed and by how much: “cut waste by $1.2K a month”."]);
  const noNum = bullets.filter(l => !/\d/.test(l) && !ROAST_DUTY.test(l)).slice(0, 2);
  noNum.forEach(l => out.push(["No numbers", l, say("Zero numbers. The filter can't rank it and the recruiter won't remember it.", "There's no number here yet; even a rough one helps."), "How many, how often, how much: people, dollars, hours, percent."]));
  const ai = ROAST_AI.filter(w => low.includes(w));
  if (ai.length) out.push(["Sounds like ChatGPT", ai.slice(0, 5).join(", "), say(`“${ai[0]}” is the first word recruiters skim past. It reads as AI-written, and nobody believes it.`, `Words like “${ai[0]}” read as generic and AI-written.`), "Replace adjectives with one concrete example of the thing you're claiming."]);
  const kws = ROAST_FIELDS[field] || [], missing = kws.filter(k => !low.includes(k));
  if (missing.length) out.push([`Missing ${field} keywords`, `${kws.length - missing.length} of ${kws.length} found`, say(`You're applying to ${field.toLowerCase()} roles with your old job's vocabulary. The filter is searching for ${missing.slice(0, 3).join(", ")}. It can't find them.`, `${field} job descriptions often ask for ${missing.slice(0, 3).join(", ")}. Add the ones you've really used.`), "Only add keywords you can back up with something you actually did."]);
  if (/\b(i|my|me)\b/i.test(lines.slice(1).join(" "))) out.push(["First person", "I / my", say("Resumes don't say “I”. It reads like a cover letter that got lost.", "Drop “I” and “my” and start each bullet with a verb."), "Start each bullet with a strong verb."]);
  bullets.filter(l => l.split(/\s+/).length > 32).slice(0, 1).forEach(l => out.push(["Too long", l.slice(0, 80) + "…", say("Nobody reads a paragraph in a bullet. Neither does the filter.", "This bullet is long; split it or trim to one result."), "One result per bullet, two lines max."]));
  const risk = out.length >= 5 ? ["High", "bad"] : out.length >= 3 ? ["Medium", "warn"] : ["Low", "good"];
  return { out, risk, found: kws.length - missing.length, total: kws.length };
}
route("tool-resume-roaster", () => {
  onRender(() => {
    const go = () => {
      const r = roastResume($("#rr-text").value, $("#rr-field").value, $("#rr-gentle").checked);
      $("#rr-out").innerHTML = `<div class="row" style="justify-content:space-between"><span class="eyebrow" style="margin:0">The roast</span><span class="tag ${r.risk[1]}">Filter risk: ${r.risk[0]}</span></div>
        ${r.out.length ? r.out.map(([t, q, m, fix]) => `<div class="rr-item"><b>${t}</b><p class="rr-q">“${esc(q)}”</p><p>${m}</p><p class="small muted">Fix: ${fix}</p></div>`).join("") : `<p>Honestly? Not much to roast here. Try it against a specific job on a call.</p>`}
        <div class="rr-cta"><p class="small"><b>This tool only reads text.</b> On a free call, Yapply asks what's missing and rewrites the weak lines with you, from what you actually did.</p><a class="btn primary" href="#call">Start a free call</a></div>`;
    };
    ["#rr-text", "#rr-field", "#rr-gentle"].forEach(s => $(s).addEventListener("input", go)); go();
  });
  return { title: "Resume Roaster", seoTitle: "Resume Roaster: Free, Blunt Resume Review | Yapply", desc: "Paste your resume and pick the field you're applying to. The Resume Roaster flags duty-only bullets, missing numbers, AI-sounding words and missing keywords. Free, no sign-up.", path: toolPath("tool-resume-roaster"), crumbs: toolCrumbs("Resume Roaster"),
    html: pageHead({ eyebrow: "Free tool", title: "Resume Roaster", answer: "Paste your resume and pick the field you're applying to. The roaster flags what usually gets a resume filtered out: duty-only bullets, missing numbers, AI-sounding words and the new field's missing keywords. It runs in your browser; nothing is saved." }) + `
    <section class="section"><div class="wrap grid-2"><form class="form" onsubmit="return false">
      <label for="rr-field">Applying to<select id="rr-field">${Object.keys(ROAST_FIELDS).map(f => `<option${f === "Operations" ? " selected" : ""}>${f}</option>`).join("")}</select></label>
      <label for="rr-text">Your resume (plain text)<textarea id="rr-text" rows="14">${EX_ROAST}</textarea></label>
      <label class="row" style="gap:8px;align-items:center"><input type="checkbox" id="rr-gentle" style="width:auto"> Go easy on me</label>
      <p class="small muted">The example is a fictional store manager applying to operations roles. Replace it with yours.</p></form>
    <div class="out" id="rr-out" aria-live="polite"></div></div></section>${toolFoot()}${ctaBand("Find out why. Then fix it, in one call.", "Free, no sign-up. Yapply roasts your resume out loud and rewrites it with you.")}` };
});
route("tool-elevator-pitch-generator", () => ROUTES["tool-resume-roaster"]());

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
