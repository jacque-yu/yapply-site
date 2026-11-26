// ---------- SEARCH ALL JOBS (hub of the programmatic job pages) ----------
route("jobs", () => {
  const cnt = (r, c) => JOBS.filter(j => j.role === r && j.city === c).length;
  const cities = CITIES.filter(c => c.slug !== "remote");
  return { title: "Search all entry-level jobs and internships", path: "/jobs", crumbs: [["Home", "home"], ["Jobs"]],
    html: pageHead({ eyebrow: "Opportunities", title: "Search all entry-level jobs", answer: `As of ${AS_OF}, Yapply lists <b>${JOBS.length}</b> internships and new grad roles at <b>${COMPANIES.length}</b> companies, refreshed daily. Every role shows H-1B sponsorship and the application deadline.`, extra: `<p style="margin-top:12px">${DEMO}</p>` }) + `
    <section class="section"><div class="wrap">${jobBoard({})}</div></section>
    <section class="section"><div class="wrap"><span class="eyebrow">Job pages</span><h2>Browse by role and city</h2><p class="muted">Each cell is a job page with live counts, salary range, hiring calendar and FAQ.</p>
      <div class="tbl-wrap" style="margin-top:14px"><table><thead><tr><th>Role</th><th>All US</th>${cities.map(c => `<th>${c.name.split(",")[0]}</th>`).join("")}<th>Remote</th></tr></thead><tbody>
      ${ROLES.map(r => `<tr><td><a href="#jobs-${r.slug}-new-grad"><b>${r.name}</b></a></td><td class="num"><a href="#jobs-${r.slug}-new-grad">${JOBS.filter(j => j.role === r.slug).length}</a></td>${[...cities, city("remote")].map(c => { const n = cnt(r.slug, c.slug); return `<td class="num">${n ? `<a href="#jobs-${r.slug}-new-grad-in-${c.slug}">${n}</a>` : '<span class="muted">–</span>'}</td>`; }).join("")}</tr>`).join("")}
      </tbody></table></div></div></section>
    <section class="section"><div class="wrap grid-2">
      <div><h2>By type</h2><div class="stack" style="margin-top:12px">${[["jobs-internships", "Internships", "Summer 2027"], ["jobs-new-grad", "Entry level & new grads", "Class of 2027"], ["jobs-remote", "Remote work", "US remote"], ["international-students", "International students", "OPT and H-1B friendly"], ["lists-new-grad-2027", "New Grad 2027 list", "GitHub list, site version"], ["lists-summer-2027-internships", "Summer 2027 Internships list", "GitHub list, site version"]].map(([h, t, s]) => `<a class="card" href="#${h}" style="padding:14px 18px"><b>${t}</b> <span class="small muted">· ${s}</span></a>`).join("")}</div></div>
      <div><h2>H-1B sponsoring jobs by role</h2><div class="row" style="margin-top:12px">${ROLES.map(r => `<a class="btn sm" href="#h1b-jobs-${r.slug}">${r.name}</a>`).join("")}</div>
        <h2 style="margin-top:28px">Companies hiring now</h2><div class="row" style="margin-top:12px">${COMPANIES.slice(0, 12).map(c => `<a class="btn sm" href="#company-${c.slug}">${c.name}</a>`).join("")}<a class="btn sm primary" href="#companies">All companies</a></div></div>
    </div></section>${ctaBand("Found roles you like? Talk for 10 minutes and get a resume for them.")}` };
});

// ---------- DISCOVER COMPANIES (directory) ----------
const openCount = slug => JOBS.filter(j => j.company === slug).length;
const coLogo = (c, size = 44) => `<span class="co-logo" style="width:${size}px;height:${size}px;background:${c.color}" aria-hidden="true">${c.name[0]}</span>`;
const shortStage = s => s.startsWith("Public") ? "Public" : s.includes("subsidiary") ? "Subsidiary" : "Private";
function coCard(c) {
  const n = openCount(c.slug);
  return `<a class="co-card" href="#company-${c.slug}" data-tags="${c.tags[0]}" data-name="${c.name.toLowerCase()}">
    <div class="co-banner" style="background:linear-gradient(135deg, ${c.color}, color-mix(in srgb, ${c.color} 45%, #ffffff))"><span class="co-badge">${shortStage(c.stage)} · Founded ${c.founded}</span></div>
    <div class="co-body">${coLogo(c, 48)}<h3>${c.name}</h3><p class="small">${c.tagline}</p>
      <p class="small muted">📍 ${c.hq}</p><p class="small muted">${c.size} employees</p>
      <div class="row" style="gap:6px;margin-top:auto">${c.tags.slice(0, 2).map(t => `<span class="tag">${t}</span>`).join("")}<span class="tag good" style="margin-left:auto">${n} open roles</span></div></div></a>`;
}
route("companies", () => {
  const tags = [...new Set(COMPANIES.map(c => c.tags[0]))].sort();
  onRender(() => {
    const draw = () => { const q = $("#co-q").value.toLowerCase().trim(), t = document.querySelector(".chip.on")?.dataset.t || "";
      let n = 0; document.querySelectorAll(".co-card").forEach(el => { const ok = (!q || el.dataset.name.includes(q)) && (!t || el.dataset.tags.split("|").includes(t)); el.classList.toggle("hidden", !ok); if (ok) n++; });
      $("#co-n").textContent = `${n} ${n === 1 ? "company" : "companies"}`; };
    $("#co-q").addEventListener("input", draw);
    document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => { const was = b.classList.contains("on"); document.querySelectorAll(".chip").forEach(x => x.classList.remove("on")); if (!was) b.classList.add("on"); b.setAttribute("aria-pressed", String(!was)); draw(); }));
    draw();
  });
  const tick = COMPANIES.map(c => `<span class="tk">${coLogo(c, 22)}<b>${c.name}</b> · ${shortStage(c.stage)} · ${openCount(c.slug)} roles</span>`).join("");
  return { title: "Discover companies hiring new grads", path: "/companies", crumbs: [["Home", "home"], ["Companies"]],
    html: `<section class="phead" style="text-align:center"><div class="wrap"><span class="eyebrow">Opportunities</span><h1>Discover companies hiring new grads</h1><p class="lead" style="margin:0 auto">The 20 most-searched employers among new grad job seekers this month. See open roles, hiring calendars, interview process and sponsorship for each.</p></div></section>
    <div class="marquee" aria-hidden="true"><div class="mq-row">${tick}${tick}</div><div class="mq-row rev">${tick}${tick}</div></div>
    <section class="section" style="padding-top:28px"><div class="wrap">
      <div class="row" style="gap:10px"><label for="co-q" class="hidden">Search companies</label><input id="co-q" placeholder="Search companies by name" style="flex:1;min-width:220px"><span id="co-n" class="small muted"></span></div>
      <div class="row" style="gap:8px;margin:14px 0 22px">${tags.map(t => `<button class="chip" type="button" data-t="${t}">${t}</button>`).join("")}</div>
      <div class="co-grid">${COMPANIES.map(coCard).join("")}</div>
      <p class="small muted" style="margin-top:16px">Ranked by monthly US search demand for "[company] careers / jobs / internships". Profile facts compiled ${AS_OF}. ${DEMO}</p>
    </div></section>` };
});

// ---------- COMPANY PAGE (sections modeled on leading job-search company pages) ----------
const slot = (title, src, note = "") => `<div class="slot"><b>${title}</b><span class="small">Filled at launch from ${src}.${note ? " " + note : ""}</span></div>`;
function companyPage(slug, tab) {
  const c = company(slug); if (!c) return null;
  const list = JOBS.filter(j => j.company === slug);
  const tabs = [["", "Overview"], ["new-grad", "New grad jobs"], ["internships", "Internships"], ["interview", "Interviews"]];
  const ttl = tab === "interview" ? `${c.name} interview process and questions` : tab === "internships" ? `${c.name} internships` : tab === "new-grad" ? `${c.name} new grad jobs` : `${c.name} careers for new grads and interns`;
  const header = `<section class="co-head"><div class="wrap">
    <div class="row" style="gap:16px;align-items:center">${coLogo(c, 64)}<div><h1 style="font-size:clamp(1.8rem,4vw,2.6rem);margin:0">${ttl}</h1><p class="muted" style="margin:4px 0 0">${c.tagline}</p></div></div>
    <div class="row" style="margin-top:14px"><a class="btn sm" href="https://www.${c.site}">Website ↗</a><a class="btn sm" href="https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(c.name)}">LinkedIn ↗</a><button class="btn sm" type="button" onclick="copyText(location.href)">Share</button><a class="btn sm accent" href="#signup">Get alerts for ${c.name}</a></div>
    <nav class="co-tabs" aria-label="Company sections">${tabs.map(([t, l]) => `<a class="${t === (tab || "") ? "on" : ""}" href="#company-${slug}${t ? "-" + t : ""}">${l}${t === "new-grad" ? ` (${list.filter(j => j.level === "New Grad").length})` : t === "internships" ? ` (${list.filter(j => j.level === "Internship").length})` : ""}</a>`).join("")}</nav></div></section>`;
  const about = `<div class="card"><h3>About ${c.name}</h3><dl class="facts"><dt>Industries</dt><dd>${c.tags.join(", ")}</dd><dt>Company size</dt><dd>${c.size}</dd><dt>Stage</dt><dd>${c.stage}</dd><dt>Headquarters</dt><dd>${c.hq}</dd><dt>Founded</dt><dd>${c.founded}</dd></dl><p class="small muted">Profile facts compiled ${AS_OF}; verify before launch.</p></div>`;
  const side = `<aside class="stack">${about}
    <div class="card"><h3>Get referred to ${c.name}</h3><p class="small muted">See alumni and Yapply users at ${c.name} who can refer you or answer questions.</p><a class="btn sm" href="#signup">Find referrers</a></div>
    <div class="card"><h3>Similar companies</h3>${c.similar.map(s => { const o = company(s); return `<a class="sim" href="#company-${s}">${coLogo(o, 32)}<span><b>${o.name}</b><br><span class="small muted">${o.tagline}</span></span></a>`; }).join("")}</div></aside>`;
  const jobsBlock = (lv, title) => { const l = lv ? list.filter(j => j.level === lv) : list; return `<h2>${title}</h2><div class="jobs" style="margin-top:12px">${l.map(jobRow).join("") || `<p class="card">No open roles right now. ${c.name} usually opens in ${c.opens}. <a href="#signup">Get an alert</a>.</p>`}</div><p style="margin-top:8px">${DEMO}</p>`; };
  let main;
  if (tab === "interview") main = `<h2>Interview process</h2><p class="small muted">Typical process for ${c.tags[0].toLowerCase()} new grad roles; confirm with your recruiter.</p><ol class="prose">${c.interview.map(x => `<li>${x}</li>`).join("")}</ol>
      <h2>Questions to prepare</h2>${faqBlock(IQ.behavioral.qs.slice(0, 5))}
      <div class="cta-band" style="margin-top:20px"><h2>Practice ${c.name} questions out loud</h2><p>Yapply's voice interviewer asks about the projects on your resume and interrupts vague answers, like a real interviewer.</p><a class="btn" href="#feature-ai-mock-interview">Start a mock interview</a></div>`;
  else if (tab === "new-grad") main = jobsBlock("New Grad", `${c.name} new grad jobs`);
  else if (tab === "internships") main = jobsBlock("Internship", `${c.name} internships`);
  else main = `
      <h2>Overview</h2><p>${c.overview}</p>
      <h2>Yapply's take for new grads</h2><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
        <div class="card"><h4>When to apply</h4><p class="small">Roles at ${c.tags[0].toLowerCase()} employers like ${c.name} typically open in <b>${c.opens}</b> and mostly close by <b>${c.closes}</b>. Apply in the first weeks.</p></div>
        <div class="card"><h4>What the interview looks like</h4><p class="small">${c.interview[0]}, then ${c.interview.length - 1} more rounds. <a href="#company-${slug}-interview">Full process</a>.</p></div>
        <div class="card"><h4>How to stand out</h4><p class="small">Show results with numbers in every bullet. <a href="#feature-talk-to-resume">Talk through your projects</a> and Yapply writes them.</p></div></div>
      <h2>Hiring calendar</h2>${calendar(c)}
      <h2>H-1B sponsorship</h2>${slot("Filings by fiscal year, approval rate, new grad share", "the USCIS H-1B Employer Data Hub and DOL LCA disclosures", `<a href="${USCIS_HUB}">Look up ${c.name} on the USCIS hub ↗</a>`)}
      <h2>Benefits</h2>${slot("Health, 401(k), PTO, parental leave, stipends", `${c.name}'s job descriptions and careers site`)}
      <h2>Funding & growth</h2>${slot("Funding rounds or stock price, headcount growth", "market and company data providers", `Stage today: ${c.stage}.`)}
      <h2>Company news</h2>${slot("Latest 5 news items", "a news feed")}
      ${jobsBlock("", `Recently posted jobs at ${c.name}`)}
      <h2>FAQ</h2>${faqBlock([[`Does ${c.name} hire new grads?`, `Yes. Yapply lists ${plural(list.length, "entry-level role")} at ${c.name} as of ${AS_OF}.`], [`When does ${c.name} open new grad applications?`, `Typically ${c.opens}–${c.closes} for ${c.tags[0].toLowerCase()} roles. Set an alert to hear the day roles open.`], [`What is the ${c.name} interview process?`, `${c.interview.join("; ")}.`], [`Where is ${c.name} headquartered?`, `${c.hq}.`]])}`;
  return { title: ttl, path: `/companies/${slug}${tab ? "/" + tab : ""}`, crumbs: [["Home", "home"], ["Companies", "companies"], [c.name, tab ? "company-" + slug : null], ...(tab ? [[tabs.find(t => t[0] === tab)[1]]] : [])],
    html: header + `<section class="section" style="padding-top:28px"><div class="wrap layout-side"><div class="stack">${main}</div>${side}</div></section>` + ctaBand(`Apply to ${c.name} with a resume written in your own words.`) };
}
function calendar(c) {
  const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (c.opens === "Rolling") return `<p class="small">${c.name} hires on a rolling basis all year.</p>`;
  const o = M.indexOf(c.opens), cl = M.indexOf(c.closes); const on = i => o <= cl ? i >= o && i <= cl : i >= o || i <= cl;
  return `<div class="cal">${M.map((m, i) => `<div class="${on(i) ? "on" : ""}${i === o ? " start" : ""}"><span>${m}</span></div>`).join("")}</div><p class="small muted">Typical new grad window for ${c.tags[0].toLowerCase()} employers. Exact dates per role appear on each listing.</p>`;
}
pattern(/^company-([a-z0-9-]+?)-(new-grad|internships|interview)$/, (s, t) => companyPage(s, t));
pattern(/^company-([a-z0-9-]+)$/, s => companyPage(s));
