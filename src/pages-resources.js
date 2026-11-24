// ---------- RESOURCES ----------
const resCrumbs = (t, h, name) => [["Home", "home"], [t, h], ...(name ? [[name]] : [])];

route("blog", () => ({ title: "Blog", path: "/blog", crumbs: [["Home", "home"], ["Blog"]],
  html: pageHead({ eyebrow: "Resources", title: "The Yapply blog", lead: "Product notes and practical recruiting advice for new grads." }) +
  `<section class="section"><div class="wrap grid">${BLOG.map(b => `<a class="card" href="#blog-${b.slug}"><span class="eyebrow">${b.tag} · ${b.date}</span><h3>${b.title}</h3><p class="small muted">${b.sum}</p></a>`).join("")}</div></section>` }));
pattern(/^blog-([a-z0-9-]+)$/, s => { const b = BLOG.find(x => x.slug === s); if (!b) return null;
  return { title: b.title, path: "/blog/" + s, crumbs: resCrumbs("Blog", "blog", b.title),
    html: pageHead({ eyebrow: `${b.tag} · ${b.date} · ${b.mins} min read`, title: b.title, lead: b.sum }) + `<section class="section"><div class="wrap prose">${b.html}</div></section>${ctaBand()}` }; });

route("help", () => ({ title: "Help Center", path: "/help", crumbs: [["Home", "home"], ["Help Center"]],
  html: pageHead({ eyebrow: "Resources", title: "Help Center", lead: "How Yapply works, your account and your data." }) + `<section class="section"><div class="wrap grid-2">
  ${[["Getting started", [["How long is the voice session?", "About 10 minutes. You can pause and continue later."], ["Can I upload my existing resume?", "Yes. Yapply reads it and asks about what's missing."], ["Can I redo my voice session?", "Yes, from your profile page. Your earlier answers stay until you replace them."]]],
     ["Resumes and applications", [["Will Yapply invent experience?", "No. Tailored resumes only use facts from your profile, and every change is shown to you."], ["Which file formats can I export?", "PDF and DOCX."], ["Can I stop an application?", "Applications are only sent after you approve them."]]],
     ["Jobs", [["How often are jobs updated?", "Daily. Closed roles are marked and removed after 30 days."], ["What does “H-1B likely” mean?", "The job description doesn't say, but the employer has sponsored similar roles in the last three years."]]],
     ["Account and privacy", [["How do I delete my account?", "Settings → Delete account. Your profile and resumes are deleted."], ["Who can see my profile?", "Only you, until you apply to a job."]]]]
    .map(([h, qs]) => `<div><h2>${h}</h2>${faqBlock(qs)}</div>`).join("")}</div></section>` }));

route("guides", () => ({ title: "Job search guides for students", path: "/guides", crumbs: [["Home", "home"], ["Guides"]],
  html: pageHead({ eyebrow: "Resources", title: "Guides for every stage of the search", lead: "Organized by when you'll need them, from freshman year to your first offer." }) +
  `<section class="section"><div class="wrap grid">${GUIDES.map(g => `<a class="card" href="#guide-${g.slug}"><span class="eyebrow">${g.stage}</span><h3>${g.title}</h3><p class="small muted">${g.sum}</p></a>`).join("")}</div></section>` }));
pattern(/^guide-([a-z0-9-]+)$/, s => { const g = GUIDES.find(x => x.slug === s); if (!g) return null;
  const others = GUIDES.filter(x => x.slug !== s).slice(0, 3);
  return { title: g.title, path: "/guides/" + s, crumbs: resCrumbs("Guides", "guides", g.title),
    html: pageHead({ eyebrow: `${g.stage} · ${g.mins} min read · Updated ${AS_OF}`, title: g.title, answer: g.sum }) + `
    <section class="section"><div class="wrap layout-side"><article class="prose">${g.body.map(([h, b], i) => `<h2 id="s${i}">${h}</h2>${b}`).join("").replace(/<table>/g, '<div class="tbl-wrap"><table>').replace(/<\/table>/g, "</table></div>")}</article>
    <aside class="toc"><b>On this page</b>${g.body.map(([h], i) => `<a href="#guide-${s}" onclick="document.getElementById('s${i}').scrollIntoView({behavior:'smooth'});return false">${h}</a>`).join("")}<hr style="border:0;border-top:1px solid var(--line);margin:14px 0"><b>Related</b>${others.map(o => `<a href="#guide-${o.slug}">${o.title}</a>`).join("")}</aside></div></section>${ctaBand()}` }; });

route("glossary", () => ({ title: "Job search glossary", path: "/glossary", crumbs: [["Home", "home"], ["Glossary"]],
  html: pageHead({ eyebrow: "Resources", title: "Job search glossary", lead: "Plain-English definitions of recruiting, resume and work-visa terms." }) +
  `<section class="section"><div class="wrap grid">${[...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)).map(g => `<a class="card" href="#glossary-${g.slug}"><h3>${g.term}</h3><p class="small muted">${g.def.split(". ")[0]}.</p></a>`).join("")}</div></section>` }));
pattern(/^glossary-([a-z0-9-]+)$/, s => { const g = GLOSSARY.find(x => x.slug === s); if (!g) return null;
  return { title: `What is ${g.term.replace(/ \(.+\)/, "")}?`, path: "/glossary/" + s, crumbs: resCrumbs("Glossary", "glossary", g.term),
    html: pageHead({ eyebrow: "Glossary", title: `What is ${g.term}?`, answer: g.def }) + `<section class="section"><div class="wrap"><h2>Related terms</h2><div class="row" style="margin-top:12px">${g.rel.map(r => { const t = GLOSSARY.find(x => x.slug === r); return t ? `<a class="btn sm" href="#glossary-${r}">${t.term}</a>` : ""; }).join("")}</div>
    <h2 style="margin-top:32px">Related guides</h2><div class="grid" style="margin-top:12px">${GUIDES.slice(0, 3).map(x => `<a class="card" href="#guide-${x.slug}"><h3>${x.title}</h3></a>`).join("")}</div></div></section>` }; });

route("interview-questions", () => ({ title: "Interview questions by role and company", path: "/interview-questions", crumbs: [["Home", "home"], ["Interview questions"]],
  html: pageHead({ eyebrow: "Resources", title: "Interview questions for new grads", lead: "Common questions with answer frameworks, by role and by company. Practice any of them out loud with AI Mock Interview." }) +
  `<section class="section"><div class="wrap"><h2>By role</h2><div class="grid" style="margin-top:12px">${Object.entries(IQ).map(([k, v]) => `<a class="card" href="#interview-questions-${k}"><h3>${v.name}</h3><p class="small muted">${v.qs.length} questions with frameworks</p></a>`).join("")}</div>
  <h2 style="margin-top:36px">By company</h2><div class="row" style="margin-top:12px">${COMPANIES.map(c => `<a class="btn sm" href="#company-${c.slug}-interview">${c.name}</a>`).join("")}</div><p style="margin-top:10px">${DEMO}</p></div></section>` }));
pattern(/^interview-questions-([a-z-]+)$/, s => { const v = IQ[s]; if (!v) return null;
  return { title: `${v.name} interview questions`, path: "/interview-questions/" + s, crumbs: resCrumbs("Interview questions", "interview-questions", v.name),
    html: pageHead({ eyebrow: "Interview questions", title: `${v.name} interview questions and how to answer`, answer: `The ${v.qs.length} ${v.name.toLowerCase()} questions below come up most often for entry-level candidates. Each has a short framework; practice them out loud before your interview.` }) + `
    <section class="section"><div class="wrap grid-2"><div>${faqBlock(v.qs)}</div><div class="card"><h3>Practice these out loud</h3><p class="muted">Yapply's voice interviewer asks these questions, follows up on vague answers and gives feedback on structure and specifics.</p><a class="btn primary" href="#feature-ai-mock-interview">Start a mock interview</a></div></div></section>${ctaBand()}` }; });

route("reports", () => ({ title: "Reports", path: "/reports", crumbs: [["Home", "home"], ["Reports"]],
  html: pageHead({ eyebrow: "Resources", title: "New grad hiring reports", lead: "A monthly snapshot of entry-level hiring from Yapply's job data." }) +
  `<section class="section"><div class="wrap grid"><a class="card" href="#report-2026-11"><span class="eyebrow">November 2026</span><h3>New grad hiring report: November 2026</h3><p class="small muted">Open roles by industry, sponsorship share and deadlines.</p></a></div></section>` }));
route("report-2026-11", () => {
  const byRole = ROLES.map(r => [r.name, JOBS.filter(j => j.role === r.slug).length]).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...byRole.map(x => x[1])); const sp = JOBS.filter(j => ["yes", "likely"].includes(j.sponsor)).length;
  const soon = JOBS.filter(j => j.deadline <= "2026-12-08").length;
  return { title: "New grad hiring report: November 2026", path: "/reports/2026-11-new-grad-hiring", crumbs: resCrumbs("Reports", "reports", "November 2026"),
    html: pageHead({ eyebrow: "Report · Data as of " + AS_OF, title: "New grad hiring report: November 2026", answer: `As of ${AS_OF}, Yapply tracked <b>${JOBS.length}</b> entry-level and intern roles at <b>${COMPANIES.length}</b> companies. <b>${Math.round(sp / JOBS.length * 100)}%</b> sponsor or are likely to sponsor H-1B, and <b>${soon}</b> close within two weeks.`, extra: `<p style="margin-top:12px">${DEMO} — the report format is real, the numbers are not.</p>` }) + `
    <section class="section"><div class="wrap grid-2"><div><h2>Open roles by role type</h2><p class="small muted">${byRole[0][0]} has the most open roles.</p><div class="bars" style="margin-top:12px">${byRole.map(([n, c], i) => `<div class="b ${i === 0 ? "on" : ""}"><span>${n}</span><div class="t"><i style="width:${c / max * 100}%"></i></div><b class="num">${c}</b></div>`).join("")}</div></div>
    <div class="stats"><div class="stat"><b>${JOBS.length}</b><span>open roles</span></div><div class="stat"><b>${sp}</b><span>sponsor or likely</span></div><div class="stat"><b>${soon}</b><span>close by Dec 8</span></div><div class="stat"><b>${JOBS.filter(j => j.level === "Internship").length}</b><span>internships</span></div></div></div></section>
    <section class="section"><div class="wrap prose"><h2>Methodology</h2><p>Counts include roles open on the snapshot date. See <a href="#methodology">how we collect job data</a>.</p></div></section>` };
});

route("methodology", () => ({ title: "Methodology", path: "/methodology", crumbs: [["Home", "home"], ["Methodology"]],
  html: pageHead({ eyebrow: "Resources", title: "How Yapply collects and labels job data", lead: "Where our numbers come from, how often they update and what each label means." }) + `
  <section class="section"><div class="wrap prose">
  <h2>Sources</h2><ul><li><b>Jobs:</b> employer career pages and public applicant tracking system feeds, checked every day.</li><li><b>Sponsorship history:</b> public H-1B data from USCIS and the US Department of Labor (LCA disclosures).</li><li><b>Hiring calendars:</b> the dates each employer opened and closed entry-level roles in previous seasons, from our own crawl history.</li></ul>
  <h2>Labels</h2><div class="tbl-wrap"><table><tr><th>Label</th><th>Meaning</th></tr><tr><td>${sponsorTag("yes")}</td><td>The job description says the employer sponsors, or it filed 40+ H-1B petitions in 3 years.</td></tr><tr><td>${sponsorTag("likely")}</td><td>The description is silent, but the employer sponsored similar roles in the last 3 years.</td></tr><tr><td>${sponsorTag("unknown")}</td><td>Little or no filing history.</td></tr><tr><td>${sponsorTag("no")}</td><td>The description says no sponsorship, or the role requires US person status.</td></tr></table></div>
  <h2>Entry-level only</h2><p>A role is included if its title or description says intern, new grad, entry level, university graduate or 0–2 years of experience.</p>
  <h2>Updates</h2><p>Jobs refresh daily. Closed roles are marked closed and removed after 30 days. Reports are published monthly.</p>
  <p class="small muted">This prototype uses fictional demo data in place of the sources above.</p></div></section>` }));

route("faq", () => ({ title: "FAQ", path: "/faq", crumbs: [["Home", "home"], ["FAQ"]],
  html: pageHead({ eyebrow: "Resources", title: "Frequently asked questions" }) + `<section class="section"><div class="wrap prose">${faqBlock(FAQ.map(([q, a]) => [q, a.replace("Compare.", '<a href="#compare">Compare</a>.')]))}</div></section>${ctaBand()}` }));

route("compare", () => ({ title: "Compare Yapply", path: "/compare", crumbs: [["Home", "home"], ["Compare"]],
  html: pageHead({ eyebrow: "Resources", title: "How Yapply compares", lead: "Honest side-by-side comparisons with other AI job search tools, based on public information." }) +
  `<section class="section"><div class="wrap grid">${COMPETITORS.map(c => `<a class="card" href="#compare-yapply-vs-${c.slug}"><h3>Yapply vs ${c.name}</h3><p class="small muted">${c.what}</p></a>`).join("")}</div></section>` }));
pattern(/^compare-yapply-vs-([a-z0-9-]+)$/, s => { const c = COMPETITORS.find(x => x.slug === s); if (!c) return null;
  const rows = [["Starts with", "10-minute voice conversation", "Your existing resume or preferences"], ["Built for", "US college students and new grads", "See their site"], ["Sponsorship labels", "On every job", s === "jobright" ? "Yes, H-1B filter" : "Check their site"], ["Applies for you", "Yes, after you review each one", s === "simplify" ? "Autofills forms you submit" : s === "teal" ? "No, it tracks applications" : "Yes"], ["Mock interviews", "Full-duplex voice", "Check their site"]];
  return { title: `Yapply vs ${c.name}`, path: `/compare/yapply-vs-${s}`, crumbs: resCrumbs("Compare", "compare", `Yapply vs ${c.name}`),
    html: pageHead({ eyebrow: "Compare", title: `Yapply vs ${c.name}`, answer: `<b>Choose ${c.name}</b> if you want ${c.strong[0].toLowerCase()}. <b>Choose Yapply</b> if you're a student with a thin resume and want it rebuilt from your real experience before you apply. ${c.diff}` }) + `
    <section class="section"><div class="wrap"><div class="tbl-wrap"><table><thead><tr><th></th><th>Yapply</th><th>${c.name}</th></tr></thead><tbody>${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table></div>
    <p class="small muted" style="margin-top:10px">Based on public information as of ${AS_OF}. Features and prices change; check <b>${c.name}</b>'s own site.</p></div></section>
    <section class="section"><div class="wrap grid-2"><div><h2>Where ${c.name} is strong</h2><ul class="prose">${c.strong.map(x => `<li>${x}</li>`).join("")}</ul><p class="muted">${c.what}</p></div><div><h2>Where Yapply is different</h2><p>${c.diff}</p><a class="btn primary" href="#signup">Try Yapply free</a></div></div></section>
    <section class="section"><div class="wrap"><h2>Other comparisons</h2><div class="row" style="margin-top:12px">${COMPETITORS.filter(x => x.slug !== s).map(x => `<a class="btn sm" href="#compare-yapply-vs-${x.slug}">Yapply vs ${x.name}</a>`).join("")}<a class="btn sm" href="#compare-${s}-alternatives">${c.name} alternatives</a></div></div></section>` }; });
pattern(/^compare-([a-z0-9-]+)-alternatives$/, s => { const c = COMPETITORS.find(x => x.slug === s); if (!c) return null;
  return { title: `${c.name} alternatives for students`, path: `/alternatives/${s}-alternatives`, crumbs: resCrumbs("Compare", "compare", `${c.name} alternatives`),
    html: pageHead({ eyebrow: "Alternatives", title: `${c.name} alternatives for new grads`, answer: `Popular alternatives to ${c.name}: ${COMPETITORS.filter(x => x.slug !== s).map(x => x.name).join(", ")} and Yapply. Pick based on whether you need help with what to say (Yapply), speed of applying, or organizing your search.` }) +
    `<section class="section"><div class="wrap grid"><a class="card" href="#home"><span class="tag hi">Yapply</span><h3>Yapply</h3><p class="small muted">Voice-first profile, tailored resumes, review before apply.</p></a>${COMPETITORS.filter(x => x.slug !== s).map(x => `<a class="card" href="#compare-yapply-vs-${x.slug}"><h3>${x.name}</h3><p class="small muted">${x.what}</p></a>`).join("")}</div></section>` }; });

// ---------- COMPANY ----------
route("about", () => ({ title: "About us", path: "/about", crumbs: [["Home", "home"], ["About"]],
  html: pageHead({ eyebrow: "Company", title: "We help students say what they've actually done", lead: "Most new grads have more experience than their resume shows. Yapply asks the questions a good career coach would, then does the busywork of applying." }) + `
  <section class="section"><div class="wrap grid-2 prose"><div><h2>Why voice</h2><p>Students write thin resumes because forms don't ask follow-up questions. A conversation does.</p><h2>What we won't do</h2><ul><li>Invent experience</li><li>Apply without your approval</li><li>Sell your data</li></ul></div><div><h2>Contact</h2><p>Press and partnerships: <span class="mono">hello@yapply.example</span></p><p class="small muted">Placeholder address for the prototype.</p></div></div></section>` }));
const legal = (name, path, items) => route(name, () => ({ title: items.title, path, crumbs: [["Home", "home"], [items.title]],
  html: pageHead({ eyebrow: "Company · Draft", title: items.title, lead: "Draft placeholder for the prototype. Final text will be written with counsel before launch." }) + `<section class="section"><div class="wrap prose">${items.body.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join("")}</div></section>` }));
legal("privacy", "/privacy", { title: "Privacy policy", body: [["What we collect", "Account details, your career profile, and the resumes and applications you create."], ["Voice sessions", "How recordings and transcripts are stored and for how long will be stated here before launch."], ["Your choices", "You can export or delete your data from Settings at any time."]] });
legal("terms", "/terms", { title: "Terms of service", body: [["Using Yapply", "You're responsible for the accuracy of what you submit to employers."], ["Applications", "Yapply submits applications only after you approve them."], ["Changes", "We'll notify you before material changes to these terms."]] });

// ---------- HTML SITEMAP ----------
route("sitemap", () => {
  const groups = [
    ["Product", [["home", "Home"], ["how-it-works", "How it works"], ["features", "Features"], ...FEATURES.map(f => ["feature-" + f.slug, f.name]), ["pricing", "Pricing"], ["app", "Mobile App"], ["signup", "Sign up"]]],
    ["Opportunities", [["jobs", "All jobs"], ["jobs-internships", "Internships"], ["jobs-new-grad", "New grad"], ["jobs-remote", "Remote"], ["international-students", "International students"], ["h1b-jobs", "H1B jobs"], ...ROLES.map(r => ["jobs-" + r.slug + "-new-grad", r.name + " new grad"]), ...ROLES.map(r => ["h1b-jobs-" + r.slug, "H1B " + r.name]), ["jobs-software-engineer-new-grad-in-seattle", "SWE new grad in Seattle (example)"], ["companies", "Companies"], ...COMPANIES.map(c => ["company-" + c.slug, c.name]), ["company-juniper-cloud-interview", "Juniper Cloud interview (example)"], ["job-" + JOBS[0].id, "Job detail (example)"], ["lists-new-grad-2027", "New Grad 2027 list"], ["lists-summer-2027-internships", "Summer 2027 internships list"]]],
    ["Tools", [["tools", "All tools"], ...TOOLS.map(t => [t.id, t.name]), ...Object.keys(VERBS).map(v => ["tool-resume-synonyms-" + v, v + " synonyms"]), ...ROLES.map(r => ["tool-resume-skills-" + r.slug, r.name + " skills"])]],
    ["Resources", [["blog", "Blog"], ...BLOG.map(b => ["blog-" + b.slug, b.title]), ["help", "Help Center"], ["guides", "Guides"], ...GUIDES.map(g => ["guide-" + g.slug, g.title]), ["glossary", "Glossary"], ...GLOSSARY.map(g => ["glossary-" + g.slug, g.term]), ["interview-questions", "Interview questions"], ...Object.keys(IQ).map(k => ["interview-questions-" + k, IQ[k].name]), ["reports", "Reports"], ["report-2026-11", "November 2026 report"], ["methodology", "Methodology"], ["faq", "FAQ"], ["compare", "Compare"], ...COMPETITORS.map(c => ["compare-yapply-vs-" + c.slug, "Yapply vs " + c.name]), ...COMPETITORS.map(c => ["compare-" + c.slug + "-alternatives", c.name + " alternatives"])]],
    ["Company", [["about", "About us"], ["privacy", "Privacy policy"], ["terms", "Terms of service"]]]
  ];
  const total = groups.reduce((a, g) => a + g[1].length, 0);
  return { title: "Sitemap", path: "/sitemap", crumbs: [["Home", "home"], ["Sitemap"]],
    html: pageHead({ eyebrow: "Company", title: "Sitemap", lead: `All ${total} pages in this prototype. Template pages (jobs, companies, tools, glossary) generate one page per item.` }) +
    `<section class="section"><div class="wrap grid">${groups.map(([h, l]) => `<div class="card"><h3>${h}</h3><ul class="small" style="padding-left:18px;columns:1">${l.map(([u, t]) => `<li><a href="#${u}">${esc(t)}</a></li>`).join("")}</ul></div>`).join("")}</div></section>` };
});

// ---------- BOOT ----------
renderChrome();
window.addEventListener("hashchange", render);
render();
