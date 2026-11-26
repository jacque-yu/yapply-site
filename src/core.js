// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const company = slug => COMPANIES.find(c => c.slug === slug);
const role = slug => ROLES.find(r => r.slug === slug);
const city = slug => CITIES.find(c => c.slug === slug);
const toast = msg => { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); };
async function copyText(text) { try { await navigator.clipboard.writeText(text); toast("Copied"); } catch (e) { toast("Select the text and copy it manually"); } }
const fmtDate = iso => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

function sponsorTag(s) { const [t, k] = SPONSOR_LABEL[s]; return `<span class="tag ${k}">${t}</span>`; }
function logoSq(c) { return `<span class="logo-sq" style="background:${c.color}" aria-hidden="true">${c.name[0]}</span>`; }
const DEMO = `<span class="demo-note" title="Example listings for the prototype">Example listings · not real postings</span>`;

function jobRow(j) {
  const c = company(j.company);
  return `<article class="job">${logoSq(c)}<div><h4><a href="#job-${j.id}">${esc(j.title)}</a></h4>
    <div class="meta"><a href="#company-${c.slug}">${c.name}</a><span>${city(j.city).name}</span><span>${j.model}</span><span class="num">${j.salary}</span><span>Posted ${j.posted}d ago</span></div></div>
    <div class="side">${sponsorTag(j.sponsor)}<span class="small muted num">Apply by ${fmtDate(j.deadline)}</span></div></article>`;
}

function urlbar(path, crumbs) {
  const c = crumbs ? `<nav class="crumbs" aria-label="Breadcrumb">${crumbs.map(([t, h]) => h ? `<a href="#${h}">${t}</a>` : `<span>${t}</span>`).join(" / ")}</nav>` : "";
  return `<div class="wrap"><div class="urlbar">${c}<span class="spacer" style="flex:1"></span><span>Production URL</span><span class="path">${esc(path)}</span></div></div>`;
}

function pageHead({ eyebrow, title, lead, answer, extra = "" }) {
  return `<section class="phead"><div class="wrap">${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}<h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}${answer ? `<p class="answer">${answer}</p>` : ""}${extra}</div></section>`;
}

function ctaBand(title = "Talk for 10 minutes. Leave with a resume that shows what you can do.", sub = "Free during beta. No resume needed to start.") {
  return `<section class="section"><div class="wrap"><div class="cta-band"><h2>${title}</h2><p>${sub}</p><a class="btn" href="#call">Start a free call</a></div></div></section>`;
}

let FAQ_LD = [];
function faqBlock(items) {
  items.forEach(([q, a]) => FAQ_LD.push([q, String(a).replace(/<[^>]+>/g, "")]));
  return `<div>${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join("")}</div>`;
}

// ---------- NAV + FOOTER ----------
const NAV = [
  { label: "Features", mega: true, items: [] },
  { label: "Resources", items: [["blog", "Blog", "Product notes and recruiting advice"], ["help", "Help Center", "Answers about your account"], ["guides", "Guides", "Recruiting timeline, OPT, offers"], ["interview-questions", "Interview Questions", "By role and by company"], ["creator-program", "Creator Program", "Get paid to make videos about Yapply"], ["affiliate-program", "Affiliate Program", "Earn commission on every paid signup"]] },
  { label: "Mobile App", href: "app" },
  { label: "Pricing", href: "pricing" }
];

const FOOTER = [
  ["Features", [["how-it-works", "How it works"], ...FEATURES.map(f => ["feature-" + f.slug, f.name])]],
  ["Opportunities", [["jobs", "Search all jobs"], ["jobs-internships", "Internships"], ["jobs-new-grad", "Entry level & new grads"], ["international-students", "International students"], ["h1b-jobs", "H1B jobs"], ["jobs-remote", "Remote work"], ["companies", "Discover companies"]]],
  ["Tools", [["tool-ats-resume-checker", "ATS Resume Checker"], ["tool-resume-synonyms", "Resume Synonyms"], ["tool-resume-skills", "Resume Skills"], ["tool-cover-letter-generator", "Cover Letter Generator"], ["tool-elevator-pitch-generator", "Elevator Pitch Generator"], ["tool-h1b-sponsor-checker", "H-1B Sponsor Checker"], ["tools", "All tools"]]],
  ["Resources", [["blog", "Blog"], ["help", "Help Center"], ["guides", "Guides"], ["glossary", "Glossary"], ["reports", "Reports"], ["interview-questions", "Interview questions"], ["faq", "FAQ"], ["compare", "Compare"], ["creator-program", "Creator program"], ["affiliate-program", "Affiliate program"]]],
  ["Company", [["about", "About us"], ["privacy", "Privacy policy"], ["terms", "Terms of service"]]]
];

function renderChrome() {
  $("#nav").innerHTML = NAV.map((n, i) => n.mega
    ? `<div class="has-dd"><button class="nl" aria-expanded="false" aria-controls="dd${i}" data-dd>${n.label} ▾</button><div class="dd mega" id="dd${i}">${FEATURE_GROUPS.map(([g, sub]) => `<div class="mg"><span class="mg-h">${g}<small>${sub}</small></span>${FEATURES.filter(f => f.group === g).map(f => `<a href="#feature-${f.slug}"><b>${f.name}${f.flag ? ' <span class="tag hi">Core</span>' : ""}</b><span>${esc(f.short)}</span></a>`).join("")}</div>`).join("")}<div class="mg-foot"><a href="#features">All features →</a><a href="#call">Start a free call →</a></div></div></div>`
    : n.items
    ? `<div class="has-dd"><button class="nl" aria-expanded="false" aria-controls="dd${i}" data-dd>${n.label} ▾</button><div class="dd" id="dd${i}">${n.items.map(([h, t, s]) => `<a href="#${h}"><b>${t}</b><span>${esc(s)}</span></a>`).join("")}</div></div>`
    : `<a class="nl" href="#${n.href}">${n.label}</a>`).join("");
  $("#footer").innerHTML = `<div class="fgrid"><div class="fbrand"><a class="logo" href="#home"><span class="dot" aria-hidden="true"><i style="height:8px"></i><i style="height:13px"></i><i style="height:6px"></i></span>yapply</a><p class="small muted" style="margin-top:12px;max-width:30ch">The AI career coach you talk to. It finds your best work and writes it into your resume while you speak.</p><a class="btn sm" href="#app">Get the app</a></div>
  ${FOOTER.map(([h, links]) => `<div><h5>${h}</h5><ul>${links.map(([u, t]) => `<li><a href="#${u}">${t}</a></li>`).join("")}</ul></div>`).join("")}</div>
  <div class="fbottom"><span>© 2026 HOLOGROW INC. Yapply prototype for design and SEO review. Job listings, salaries and sponsorship labels are examples, not real postings.</span><span>Made for the class of 2027</span></div>`;
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-dd]");
    document.querySelectorAll(".has-dd.open").forEach(x => { if (!b || x !== b.parentElement) { x.classList.remove("open"); x.firstElementChild.setAttribute("aria-expanded", "false"); } });
    if (b) { const p = b.parentElement; const o = p.classList.toggle("open"); b.setAttribute("aria-expanded", String(o)); }
    if (e.target.closest(".dd a")) { document.querySelectorAll(".has-dd.open").forEach(x => x.classList.remove("open")); $("#nav").classList.remove("show"); }
  });
  $("#menuBtn").addEventListener("click", () => { const s = $("#nav").classList.toggle("show"); $("#menuBtn").setAttribute("aria-expanded", String(s)); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".has-dd.open").forEach(x => x.classList.remove("open")); });
}

// ---------- ROUTER ----------
const ROUTES = {};      // exact name -> fn
const PATTERNS = [];    // [regex, fn]
const route = (name, fn) => { ROUTES[name] = fn; };
const pattern = (re, fn) => PATTERNS.push([re, fn]);

function notFound(name) {
  return { title: "Page not found", path: "/404", html: pageHead({ title: "We couldn't find that page", lead: `There is no page called “${esc(name)}”.` }) + `<div class="wrap section"><a class="btn primary" href="#home">Go home</a> <a class="btn" href="#sitemap">See every page</a></div>` };
}

function resolve(name) {
  if (ROUTES[name]) return ROUTES[name]();
  for (const [re, fn] of PATTERNS) { const m = name.match(re); if (m) { const r = fn(...m.slice(1)); if (r) return r; } }
  return notFound(name);
}

let afterRender = [];
const onRender = fn => afterRender.push(fn);

function render() {
  const name = (location.hash || "#home").slice(1) || "home";
  afterRender = [];
  FAQ_LD = [];
  const page = resolve(name);
  document.title = page.seoTitle || (page.title === "Yapply" ? "AI Career Coach That Writes Your Resume Live | Yapply" : `${page.title} | Yapply`);
  const plain = s => String(s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const clip = t => t.length <= 160 ? t : t.slice(0, 157).replace(/\s+\S*$/, "") + "…";
  const desc = clip(plain(page.desc || (page.html.match(/class="answer">([\s\S]*?)<\/p>/) || [])[1] || (page.html.match(/class="lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1]));
  $("#meta-desc").setAttribute("content", desc || "Yapply is an AI career coach you talk to. It finds strengths you missed and polishes your resume live while you talk.");
  $("#canonical").setAttribute("href", "https://yapply.ai" + (page.path || "/"));
  $("#app").innerHTML = (page.path ? urlbar(page.path, page.crumbs) : "") + page.html;
  window.scrollTo(0, 0);
  const ld = [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: (page.crumbs || [["Home"]]).map(([n], i) => ({ "@type": "ListItem", position: i + 1, name: n })) }];
  if (FAQ_LD.length) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ_LD.slice(0, 10).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  if (page.ld) ld.push(page.ld);
  $("#ld").textContent = JSON.stringify(ld);
  afterRender.forEach(f => { try { f(); } catch (e) { console.error(e); } });
}
