// ---------- OPPORTUNITY PAGES (programmatic templates) ----------
const opt = (v, t, sel) => `<option value="${v}"${sel ? " selected" : ""}>${t}</option>`;

function jobBoard(preset = {}) {
  const id = "jb" + Math.random().toString(36).slice(2, 7);
  onRender(() => {
    const root = $("#" + id);
    const draw = () => {
      const f = Object.fromEntries(["q", "role", "city", "level", "sponsor"].map(k => [k, root.querySelector(`[name=${k}]`).value]));
      const list = JOBS.filter(j => (!f.role || j.role === f.role) && (!f.city || j.city === f.city) && (!f.level || j.level === f.level)
        && (!f.sponsor || (f.sponsor === "yes" ? ["yes", "likely"].includes(j.sponsor) : j.sponsor === f.sponsor))
        && (!f.q || (j.title + company(j.company).name).toLowerCase().includes(f.q.toLowerCase())))
        .sort((a, b) => a.posted - b.posted);
      root.querySelector(".count").textContent = plural(list.length, "role");
      root.querySelector(".jobs").innerHTML = list.length ? list.map(jobRow).join("") : `<p class="card">No roles match. Try removing a filter.</p>`;
    };
    root.addEventListener("input", draw); draw();
  });
  return `<div id="${id}"><form class="filters" onsubmit="return false">
    <label for="${id}q">Search<input id="${id}q" name="q" placeholder="Title or company" value=""></label>
    <label for="${id}r">Role<select id="${id}r" name="role">${opt("", "All roles")}${ROLES.map(r => opt(r.slug, r.name, preset.role === r.slug)).join("")}</select></label>
    <label for="${id}c">Location<select id="${id}c" name="city">${opt("", "All locations")}${CITIES.map(c => opt(c.slug, c.name, preset.city === c.slug)).join("")}</select></label>
    <label for="${id}l">Level<select id="${id}l" name="level">${opt("", "Intern + new grad")}${opt("New Grad", "New grad", preset.level === "New Grad")}${opt("Internship", "Internship", preset.level === "Internship")}</select></label>
    <label for="${id}s">Sponsorship<select id="${id}s" name="sponsor">${opt("", "Any")}${opt("yes", "Sponsors or likely", preset.sponsor === "yes")}${opt("unknown", "Unclear")}${opt("no", "No sponsorship")}</select></label>
    <span class="count small muted" style="margin-left:auto"></span></form><div class="jobs"></div></div>`;
}

function summarize(list) {
  const sp = list.filter(j => ["yes", "likely"].includes(j.sponsor)).length;
  const cos = new Set(list.map(j => j.company)).size;
  return { n: list.length, sp, cos };
}

function listPage({ name, title, path, lead, preset, crumbLabel }) {
  route(name, () => {
    const list = JOBS.filter(j => (!preset.level || j.level === preset.level) && (!preset.city || j.city === preset.city) && (!preset.sponsor || ["yes", "likely"].includes(j.sponsor)));
    const s = summarize(list);
    return { title, path, crumbs: [["Home", "home"], ["Jobs", "jobs"], [crumbLabel]],
      html: pageHead({ eyebrow: "Opportunities", title, lead, answer: `As of ${AS_OF}, Yapply lists <b>${s.n}</b> ${title.toLowerCase()} roles at <b>${s.cos}</b> companies; <b>${s.sp}</b> sponsor or are likely to sponsor H-1B.`, extra: `<p style="margin-top:12px">${DEMO}</p>` }) +
        `<section class="section"><div class="wrap">${jobBoard(preset)}</div></section>
        <section class="section"><div class="wrap"><h2>Browse by role</h2><div class="row" style="margin-top:12px">${ROLES.map(r => `<a class="btn sm" href="#jobs-${r.slug}-new-grad">${r.name}</a>`).join("")}</div></div></section>${ctaBand("Found roles you like? Get a resume tailored to each one.")}` };
  });
}
listPage({ name: "jobs", title: "Entry-level jobs and internships", path: "/jobs", lead: "Every role on Yapply is an internship or an entry-level job. Updated daily.", preset: {}, crumbLabel: "All" });
listPage({ name: "jobs-internships", title: "Internships", path: "/jobs/internships", lead: "Summer 2027 internships across tech, data, finance, consulting and engineering.", preset: { level: "Internship" }, crumbLabel: "Internships" });
listPage({ name: "jobs-new-grad", title: "New grad jobs", path: "/jobs/new-grad", lead: "Entry-level roles for the class of 2027 and recent grads.", preset: { level: "New Grad" }, crumbLabel: "New grad" });
listPage({ name: "jobs-remote", title: "Remote entry-level jobs", path: "/jobs/remote", lead: "Fully remote internships and new grad roles in the US.", preset: { city: "remote" }, crumbLabel: "Remote" });
listPage({ name: "h1b-jobs", title: "H-1B sponsoring new grad jobs", path: "/h1b-jobs", lead: "Roles at employers that sponsor H-1B or have a history of sponsoring similar roles.", preset: { sponsor: "yes" }, crumbLabel: "H1B jobs" });

// /jobs/[role]-new-grad(-in-[city]) and /h1b-jobs/[role](-in-[city])
function categoryPage(rslug, cslug, h1b) {
  const r = role(rslug); if (!r) return null; const c = cslug ? city(cslug) : null; if (cslug && !c) return null;
  const list = JOBS.filter(j => j.role === rslug && (!cslug || j.city === cslug) && (!h1b || ["yes", "likely"].includes(j.sponsor)));
  const s = summarize(list);
  const where = c ? ` in ${c.name}` : "";
  const title = h1b ? `H-1B sponsoring ${r.name} jobs${where}` : `${r.name} new grad jobs${where}`;
  const path = (h1b ? `/h1b-jobs/${rslug}` : `/jobs/${rslug}-new-grad`) + (cslug ? `-in-${cslug}` : "");
  const base = h1b ? `h1b-jobs-${rslug}` : `jobs-${rslug}-new-grad`;
  const months = [...new Set(list.map(j => company(j.company).opens))];
  const cityLinks = CITIES.filter(x => x.slug !== cslug && JOBS.some(j => j.role === rslug && j.city === x.slug)).map(x => `<a class="btn sm" href="#${base}-in-${x.slug}">${x.name}</a>`).join("");
  const roleLinks = ROLES.filter(x => x.slug !== rslug).slice(0, 6).map(x => `<a class="btn sm" href="#${h1b ? "h1b-jobs-" : "jobs-"}${x.slug}${h1b ? "" : "-new-grad"}${cslug ? "-in-" + cslug : ""}">${x.name}</a>`).join("");
  return { title, path, crumbs: [["Home", "home"], [h1b ? "H1B jobs" : "Jobs", h1b ? "h1b-jobs" : "jobs"], [title]],
    html: pageHead({ eyebrow: h1b ? "H1B jobs" : "New grad jobs", title,
      answer: `As of ${AS_OF}, Yapply lists <b>${s.n}</b> ${r.name} roles${where} at <b>${s.cos}</b> companies${h1b ? "" : `; <b>${s.sp}</b> sponsor or are likely to sponsor H-1B`}. Typical new grad base salary: <b>$${r.salary[0]}K–$${r.salary[1]}K</b>.`, extra: `<p style="margin-top:12px">${DEMO}</p>` }) + `
    <section class="section"><div class="wrap layout-side"><div>${jobBoard({ role: rslug, city: cslug || "", sponsor: h1b ? "yes" : "" })}</div>
      <aside class="stack"><div class="card"><h4>When these roles open</h4><p class="small">${months.length ? `Employers here usually open applications in <b>${months.join(", ")}</b>.` : "No pattern yet."}</p><a class="small" href="#guide-new-grad-recruiting-timeline">Recruiting timeline</a></div>
      <div class="card"><h4>Skills to show</h4><p class="small">${(SKILLS[rslug] || SKILLS["software-engineer"]).hard.slice(0, 5).join(", ")}</p><a class="small" href="#tool-resume-skills-${rslug}">Full ${r.name} skills list</a></div>
      <div class="card"><h4>If you're an international student</h4><p class="small">Apply to sponsoring employers first and confirm sponsorship with the recruiter early.</p><a class="small" href="#guide-h1b-for-new-grads">H-1B guide</a></div></aside></div></section>
    <section class="section"><div class="wrap stack"><h2>Nearby searches</h2>${cityLinks ? `<div class="row">${cityLinks}</div>` : ""}<div class="row">${roleLinks}</div></div></section>
    <section class="section"><div class="wrap"><h2>FAQ</h2>${faqBlock([[`When should I apply for ${r.name} new grad roles?`, `Within the first 1–3 weeks a role opens. ${months.length ? `Here, most open in ${months.join(", ")}.` : ""}`], [`Do ${r.name} new grad roles sponsor H-1B?`, `${s.sp} of ${s.n} listed roles${where} are at employers that sponsor or are likely to.`], ["How do I stand out?", `Use numbers in every bullet and mirror the job's keywords. Try the <a href="#tool-ats-resume-checker">ATS resume checker</a>.`]])}</div></section>
    ${ctaBand(`Get a ${r.name} resume tailored to each of these roles.`)}` };
}
pattern(/^jobs-([a-z-]+?)-new-grad(?:-in-([a-z-]+))?$/, (r, c) => categoryPage(r, c, false));
pattern(/^h1b-jobs-([a-z-]+?)(?:-in-([a-z-]+))?$/, (r, c) => categoryPage(r, c, true));

route("international-students", () => {
  const list = JOBS.filter(j => ["yes", "likely"].includes(j.sponsor));
  return { title: "Jobs and guides for international students", path: "/international-students", crumbs: [["Home", "home"], ["International students"]],
    html: pageHead({ eyebrow: "Opportunities", title: "For international students", lead: "Find employers that sponsor, plan OPT around recruiting season, and tell recruiters about your status with confidence.", answer: `As of ${AS_OF}, ${list.length} of ${JOBS.length} roles on Yapply are at employers that sponsor or are likely to sponsor H-1B.`, extra: `<p style="margin-top:12px">${DEMO}</p>` }) + `
    <section class="section"><div class="wrap grid">${["opt-cpt-guide", "h1b-for-new-grads", "new-grad-recruiting-timeline"].map(s => { const g = GUIDES.find(x => x.slug === s); return `<a class="card" href="#guide-${s}"><span class="eyebrow">Guide</span><h3>${g.title}</h3><p class="small muted">${g.sum}</p></a>`; }).join("")}
    <a class="card" href="#tool-h1b-sponsor-checker"><span class="eyebrow">Tool</span><h3>H-1B sponsor checker</h3><p class="small muted">Look up any company's sponsorship history.</p></a></div></section>
    <section class="section"><div class="wrap"><h2>Sponsoring employers hiring now</h2>${jobBoard({ sponsor: "yes" })}</div></section>
    <section class="section"><div class="wrap"><h2>H-1B jobs by role</h2><div class="row" style="margin-top:12px">${ROLES.map(r => `<a class="btn sm" href="#h1b-jobs-${r.slug}">${r.name}</a>`).join("")}</div></div></section>${ctaBand()}` };
});

route("companies", () => ({
  title: "Discover companies", path: "/companies", crumbs: [["Home", "home"], ["Companies"]],
  html: pageHead({ eyebrow: "Opportunities", title: "Discover companies hiring new grads", lead: "Hiring calendars, sponsorship history and open roles for each employer.", extra: `<p style="margin-top:12px">${DEMO}</p>` }) +
  `<section class="section"><div class="wrap"><div class="tbl-wrap"><table><thead><tr><th>Company</th><th>Industry</th><th>HQ</th><th class="num">Open roles</th><th>Usually opens</th><th class="num">H-1B filings, 3 yrs</th></tr></thead><tbody>
  ${COMPANIES.map(c => `<tr><td><a href="#company-${c.slug}"><b>${c.name}</b></a></td><td>${c.industry}</td><td>${c.hq}</td><td class="num">${JOBS.filter(j => j.company === c.slug).length}</td><td>${c.opens}–${c.closes}</td><td class="num">${c.h1b.reduce((a, b) => a + b, 0)}</td></tr>`).join("")}
  </tbody></table></div></div></section>`
}));

function companyPage(slug, tab) {
  const c = company(slug); if (!c) return null;
  const list = JOBS.filter(j => j.company === slug);
  const total = c.h1b.reduce((a, b) => a + b, 0);
  const tabs = [["", "Overview"], ["new-grad", "New grad"], ["internships", "Internships"], ["interview", "Interview"]];
  const tabNav = `<div class="row" role="tablist" style="margin-top:18px">${tabs.map(([t, l]) => `<a class="btn sm ${t === (tab || "") ? "primary" : ""}" href="#company-${slug}${t ? "-" + t : ""}">${l}</a>`).join("")}</div>`;
  const shown = tab === "new-grad" ? list.filter(j => j.level === "New Grad") : tab === "internships" ? list.filter(j => j.level === "Internship") : list;
  const ttl = tab === "interview" ? `${c.name} interview questions and process` : tab === "internships" ? `${c.name} internships` : tab === "new-grad" ? `${c.name} new grad jobs` : `${c.name} careers for new grads and interns`;
  const body = tab === "interview"
    ? `<section class="section"><div class="wrap grid-2"><div><h2>Interview process</h2><ol class="prose">${c.interview.map(x => `<li>${x}</li>`).join("")}</ol><h2>Questions to prepare</h2>${faqBlock(IQ.behavioral.qs.slice(0, 4).map(([q, a]) => [q, a]))}</div><div class="card"><h3>Practice ${c.name} questions out loud</h3><p class="muted">Yapply's mock interviewer asks these questions and follows up on your answers.</p><a class="btn primary" href="#feature-ai-mock-interview">Practice by voice</a></div></div></section>`
    : `<section class="section"><div class="wrap layout-side"><div><h2>${plural(shown.length, "open role")}</h2><div class="jobs" style="margin-top:12px">${shown.map(jobRow).join("") || `<p class="card">No open roles right now. ${c.name} usually opens in ${c.opens}.</p>`}</div></div>
      <aside class="stack"><div class="card"><h4>Hiring calendar</h4><p class="small">Usually opens <b>${c.opens}</b>, mostly closed by <b>${c.closes}</b>.</p></div>
      <div class="card"><h4>H-1B sponsorship</h4><p class="small num">Filings 2024 / 2025 / 2026: <b>${c.h1b.join(" / ")}</b><br>Share for new grad roles: <b>${Math.round(c.ng * 100)}%</b></p>${sponsorTag(c.slug === "orbit-aerospace" ? "no" : total > 40 ? "yes" : total > 12 ? "likely" : "unknown")}</div>
      <div class="card"><h4>About</h4><p class="small">${c.about}</p><p class="small muted">${c.industry} · ${c.hq} · ${c.size}</p></div></aside></div></section>`;
  return { title: ttl, path: `/companies/${slug}${tab ? "/" + tab : ""}`, crumbs: [["Home", "home"], ["Companies", "companies"], [c.name, tab ? "company-" + slug : null], ...(tab ? [[tabs.find(t => t[0] === tab)[1]]] : [])],
    html: pageHead({ eyebrow: c.industry, title: ttl, answer: `${c.name} has <b>${plural(list.length, "open entry-level role")}</b> on Yapply as of ${AS_OF}. It usually opens new grad hiring in ${c.opens} and has filed <b>${total}</b> H-1B petitions over the last 3 years.`, extra: `<p style="margin-top:12px">${DEMO}</p>${tabNav}` }) + body + ctaBand(`Apply to ${c.name} with a resume tailored to the role.`) };
}
pattern(/^company-([a-z0-9-]+?)-(new-grad|internships|interview)$/, (s, t) => companyPage(s, t));
pattern(/^company-([a-z0-9-]+)$/, s => companyPage(s));

pattern(/^job-(\d+)$/, id => {
  const j = JOBS.find(x => x.id === +id); if (!j) return null;
  const c = company(j.company), r = role(j.role);
  const sk = SKILLS[j.role];
  const similar = JOBS.filter(x => x.role === j.role && x.id !== j.id).slice(0, 4);
  return { title: `${j.title} at ${c.name}`, path: `/job/${j.id}-${c.slug}-${j.role}`, crumbs: [["Home", "home"], ["Jobs", "jobs"], [c.name, "company-" + c.slug], [j.title]],
    html: pageHead({ eyebrow: j.level, title: esc(j.title), lead: `${c.name} · ${city(j.city).name} · ${j.model}`, extra: `<div class="row" style="margin-top:12px">${sponsorTag(j.sponsor)}<span class="tag num">${j.salary}</span><span class="tag">Apply by ${fmtDate(j.deadline)}</span>${DEMO}</div>` }) + `
    <section class="section"><div class="wrap layout-side"><div class="prose">
      <h2>About the role</h2><p>${c.name} (${c.about.toLowerCase().replace(/\.$/, "")}) is hiring a ${j.level === "Internship" ? "summer intern" : "new grad"} ${r.name.toLowerCase()} to join its ${city(j.city).name} team.</p>
      <h3>What you'll do</h3><ul><li>Own a scoped project with a mentor from day one</li><li>Work with ${sk.tools.slice(0, 3).join(", ")}</li><li>Present your results to the team</li></ul>
      <h3>What they look for</h3><ul>${sk.hard.slice(0, 5).map(x => `<li>${x}</li>`).join("")}</ul>
      <p class="small muted">Job description is illustrative demo content.</p></div>
      <aside class="stack"><div class="card"><h4>Apply with Yapply</h4><p class="small">Get a resume tailored to this role, review it, then apply in one click.</p><a class="btn primary" href="#signup">Tailor & apply</a><a class="btn" style="margin-top:8px" href="#tool-ats-resume-checker">Check my resume first</a></div>
      <div class="card"><h4>${c.name}</h4><p class="small">Usually opens in ${c.opens}. ${c.h1b.reduce((a, b) => a + b, 0)} H-1B filings in 3 years.</p><a class="small" href="#company-${c.slug}">Company page</a> · <a class="small" href="#company-${c.slug}-interview">Interview process</a></div></aside></div></section>
    <section class="section"><div class="wrap"><h2>Similar roles</h2><div class="jobs" style="margin-top:12px">${similar.map(jobRow).join("")}</div></div></section>` };
});

function ghList(level, slug, title) {
  route(slug, () => {
    const list = JOBS.filter(j => j.level === level).sort((a, b) => a.deadline.localeCompare(b.deadline));
    return { title, path: "/" + slug.replace("lists-", "lists/"), crumbs: [["Home", "home"], ["Jobs", "jobs"], [title]],
      html: pageHead({ eyebrow: "Open-source list", title, lead: "The site version of our GitHub list. Community members submit roles; Yapply's crawler adds the rest every day.", extra: `<div class="row" style="margin-top:12px"><a class="btn sm" href="https://github.com/jacque-yu/yapply-site">View on GitHub</a><span class="tag">${plural(list.length, "role")}</span>${DEMO}</div>` }) + `
      <section class="section"><div class="wrap"><div class="tbl-wrap"><table><thead><tr><th>Company</th><th>Role</th><th>Location</th><th>Sponsorship</th><th>Deadline</th><th>Apply</th><th>Tailor</th></tr></thead><tbody>
      ${list.map(j => `<tr><td><a href="#company-${j.company}"><b>${company(j.company).name}</b></a></td><td>${esc(j.title)}</td><td>${city(j.city).name}</td><td>${sponsorTag(j.sponsor)}</td><td class="num">${fmtDate(j.deadline)}</td><td><a href="#job-${j.id}">Apply</a></td><td><a href="#signup">Tailor resume</a></td></tr>`).join("")}
      </tbody></table></div></div></section>` };
  });
}
ghList("New Grad", "lists-new-grad-2027", "New Grad 2027 list");
ghList("Internship", "lists-summer-2027-internships", "Summer 2027 Internships list");
