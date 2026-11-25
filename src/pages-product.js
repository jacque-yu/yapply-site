// ---------- PRODUCT PAGES ----------
// Live demo: the conversation on the left writes the resume on the right.
const LIVE_STEPS = [
  { who: "ai", t: "Let's start with something you built. What are you proud of?" },
  { who: "me", t: "I made a study-room booking app for the CS club.", line: ["b1", "Built a booking app for the CS club's study rooms."] },
  { who: "ai", t: "Nice. How many people used it?" },
  { who: "me", t: "Around 200... actually, closer to 300.", line: ["b1", "Built a <mark>React + Firebase</mark> booking app used by <mark>300 CS club members</mark>."] },
  { who: "ai", t: "What changed after it launched?" },
  { who: "me", t: "No more double-bookings, and the officers stopped tracking it in a spreadsheet.", line: ["b1", "Built a React + Firebase booking app used by 300 CS club members, <mark>eliminating double-bookings</mark> and replacing a manual spreadsheet."] },
  { who: "ai", t: "Got it. Did you do it alone?" },
  { who: "me", t: "I led it, two friends helped with the design.", line: ["b2", "<mark>Led</mark> a 3-person team from idea to launch in 4 weeks."] }
];
function liveDemo(id = "live") {
  onRender(() => {
    const root = $("#" + id); if (!root) return;
    const chat = root.querySelector(".lv-chat"), lines = { b1: root.querySelector("[data-l=b1]"), b2: root.querySelector("[data-l=b2]") };
    const finalState = () => { chat.innerHTML = LIVE_STEPS.map(s => `<div class="bubble ${s.who}"><small>${s.who === "ai" ? "YAPPLY" : "YOU"}</small>${s.t}</div>`).join(""); LIVE_STEPS.filter(s => s.line).forEach(s => lines[s.line[0]].innerHTML = s.line[1]); };
    finalState();
    let timers = [];
    root.querySelector(".lv-replay").addEventListener("click", () => {
      timers.forEach(clearTimeout); timers = []; chat.innerHTML = ""; Object.values(lines).forEach(l => { l.innerHTML = '<span class="muted">…</span>'; });
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      LIVE_STEPS.forEach((s, i) => timers.push(setTimeout(() => {
        chat.insertAdjacentHTML("beforeend", `<div class="bubble ${s.who}"><small>${s.who === "ai" ? "YAPPLY" : "YOU"}</small>${s.t}</div>`); chat.scrollTop = chat.scrollHeight;
        if (s.line) timers.push(setTimeout(() => { const el = lines[s.line[0]]; el.innerHTML = s.line[1]; el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }, reduce ? 0 : 600));
      }, reduce ? 0 : i * 1500)));
    });
  });
  return `<div class="live" id="${id}">
    <div class="call"><div class="bar"><span>● LIVE · Voice session</span><span class="num">03:48 / ~10:00</span></div>
      <div class="wave" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="animation-delay:${(i * 0.07).toFixed(2)}s"></i>`).join("")}</div>
      <div class="lv-chat" aria-live="polite"></div></div>
    <div class="paper" aria-label="Resume being written">
      <div class="row" style="justify-content:space-between"><span class="eyebrow" style="margin:0">Your resume · writing live</span><button class="btn sm lv-replay" type="button">▶ Watch it write</button></div>
      <h3 style="margin:10px 0 0">Jordan Lee</h3><p class="small muted" style="margin:0 0 10px">jordan@umich.edu · Ann Arbor, MI</p>
      <h5>Education</h5><p class="small">University of Michigan, B.S. Statistics, May 2027 · GPA 3.6</p>
      <h5>Projects</h5><p class="small"><b>Study Room Booker</b> · CS Club</p>
      <ul class="small"><li data-l="b1"></li><li data-l="b2"></li></ul>
      <h5>Experience</h5><p class="small muted">Next: your campus job…</p>
    </div></div>`;
}

function whoCard(k) {
  const c = ICP[k], p = PERSONAS[k.toLowerCase()], r = personaReport(p), last = p.sections[0][2][0];
  return `<article class="who-card">
    <div class="wc-img" style="background-image:url(${p.img()})"><div class="wc-shade"></div>
      <span class="wc-tag"><b>${k}</b>${c.tag}</span>
      <blockquote class="serif">${c.pain}</blockquote><p class="wc-who">${c.who}</p></div>
    <div class="wc-body"><p>${c.fix}</p>
      <div class="wc-ba"><p class="b"><small>Before</small>${esc(p.before[0][1])}</p><p class="a"><small>After one call</small>${r.lines[last]}</p></div>
      <a class="wc-link" href="#report-${k.toLowerCase()}">See ${p.first}'s call report →</a></div>
  </article>`;
}
function statBand() {
  return `<div class="stat-band">${STATS.map(([n, t, u, s]) => `<div><b class="serif">${n}</b><p>${t}</p><a class="small muted" href="${u}">Source: ${s} ↗</a></div>`).join("")}</div>`;
}
const HOME_FAQ = [
  ["What is an AI career coach?", "An AI career coach talks with you about your goals and experience and helps you act on them. Yapply's coach focuses on one thing most people get stuck on: finding what you've actually done well and turning it into a resume, live, while you talk."],
  ["How is Yapply different from an AI resume builder?", "A resume builder starts from what you type. Yapply starts with a conversation: it asks follow-up questions until it finds the numbers and results, and writes them onto your resume during the call."],
  ["How do I write a resume with no internship experience?", "Use class projects, research, clubs and part-time jobs, and write each as a result with a number. Yapply's coach asks the questions that pull those numbers out of you."],
  ["I'm an international student. Can I talk in imperfect English?", "Yes. Speak naturally; Yapply writes clear, recruiter-ready English from what you mean, and you approve every line."],
  ["My first job isn't in my field. Can Yapply help me switch?", "Yes. Tell the coach the role you want; it finds the transferable results in your current job and rewrites them for that role."],
  ["What's in the report after a call?", "A before-and-after view of your resume, a timeline of every line written live during the call, and the strengths the coach found, each backed by what you said."],
  ["Will the AI make things up?", "No. Every line comes from what you said or uploaded, and you can see and edit everything."]
];
route("home", () => ({
  title: "Yapply", seoTitle: "AI Career Coach That Writes Your Resume Live | Yapply",
  desc: "Talk with Yapply's AI career coach for 10 minutes. It digs into what you've done, finds strengths you missed, and polishes your resume live while you talk.",
  ld: { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Yapply", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", description: "AI career coach you talk to: it finds your strengths and writes your resume live during the call.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "HOLOGROW INC" } },
  html: `
  <section class="hero2"><div class="wrap h2-grid">
    <div class="h2-left">
      <p class="proof"><span class="pulse"></span>Free 10-minute call · No resume needed</p>
      <h1 class="serif">The AI career coach that finds your best work.</h1>
      <div class="h2-bottom">
        <p class="h2-lead">Yapply talks with you like a great coach. It digs into your classes, projects and jobs, finds the strengths you didn't know were worth writing, and polishes your resume <b>live, while you're still talking</b>. Hang up with a finished resume and a report on what you're good at.</p>
        <div class="row"><a class="btn primary lg" href="#call">Start a free call</a><a class="btn lg" href="#report-a">See a sample report</a></div>
      </div>
    </div>
    ${heroStage()}
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">How a call works</span><h2 class="serif">Most tools wait for you to write. Yapply asks.</h2><p class="muted">Two things happen at once on every call: the coach digs, and your resume gets written.</p></div>
    <div class="how3">
      <div><span class="n serif">1</span><h3>It digs</h3><p class="muted">“How many people used it? What changed after?” The coach keeps asking until it finds the result and the number behind each thing you did.</p></div>
      <div><span class="n serif">2</span><h3>It writes while you talk</h3><p class="muted">Full duplex: each answer lands on your resume within seconds. Correct it out loud (“no, closer to 300”) and the line updates.</p></div>
      <div><span class="n serif">3</span><h3>You get a report</h3><p class="muted">Before and after, every live edit on a timeline, and the strengths it found, each backed by what you said.</p></div>
    </div>
    <div style="margin-top:56px">${liveDemo("live-home")}</div>
  </div></section>

  <section class="section roomy dark-sec"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">The articulation gap</span><h2 class="serif">The problem isn't your experience. It's how it's written.</h2><p>Employers want proof in concrete examples. Most people have the examples, but write them as duties, or don't count them at all.</p></div>
    ${statBand()}
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Who Yapply is for</span><h2 class="serif">Your experience is worth more than your resume shows.</h2><p class="muted">Four people we built Yapply for. If one sounds like you, the bottleneck isn't you. It's the page.</p></div>
    <div class="who-grid">${["A", "B", "C", "D"].map(whoCard).join("")}</div>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2 signals-wrap">
    <div><span class="eyebrow">Quick check</span><h2 class="serif">Two or more of these? Talk to the coach.</h2><p class="muted">These five signals mean your resume is underselling you.</p><a class="btn primary lg" href="#call" style="margin-top:12px">Start a free call</a></div>
    <ol class="signals">${SIGNALS.map(([t, d]) => `<li><b>${t}</b><span class="small muted">${d}</span></li>`).join("")}</ol>
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">After the call</span><h2 class="serif">One conversation powers everything else</h2><p class="muted">Your call becomes a profile the coach reuses: tailored resumes, cover letters in your voice, interview practice and job matches.</p></div>
    <div class="feat-grid">${FEATURES.map(f => `<a class="feat" href="#feature-${f.slug}">${f.flag ? '<span class="tag hi">Core</span>' : ""}<h3>${f.name}</h3><p class="muted">${f.short}</p><span class="go">→</span></a>`).join("")}</div>
    <div class="vs-line"><p><b>Swipe-to-apply apps send more applications. Yapply makes each one worth sending.</b> <span class="muted">Sprout and Sorce send the resume you already have; Yapply rewrites it with you first.</span></p><a href="#compare">Compare →</a></div>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2">
    <div><span class="eyebrow">Then apply</span><h2 class="serif">Entry-level roles you can actually get</h2><p class="muted">Internships and entry-level jobs only, with H-1B sponsorship labels and deadlines.</p>
      <div class="row"><a class="btn" href="#jobs">Search all jobs</a><a class="btn" href="#jobs-internships">Internships for college students</a><a class="btn" href="#international-students">International students</a></div></div>
    <div class="jobs">${JOBS.filter(j => j.sponsor === "yes").slice(0, 4).map(jobRow).join("")}<div>${DEMO}</div></div>
  </div></section>

  <section class="section roomy"><div class="wrap narrow"><h2 class="serif">Questions about the AI career coach</h2>${faqBlock(HOME_FAQ)}</div></section>
  ${ctaBand("You've done more than your resume says.", "Ten minutes with the coach. Leave with a resume that shows it, and a report on what you're good at.")}`
}));

route("how-it-works", () => ({
  title: "How it works", path: "/how-it-works", crumbs: [["Home", "home"], ["How it works"]],
  html: pageHead({ eyebrow: "Features", title: "How Yapply works", lead: "A voice conversation replaces the resume form, and the resume is written while you talk.", answer: "You talk with Yapply for about 10 minutes. Each answer is written onto your resume in real time, and you can correct any line out loud. When the conversation ends, the resume is finished; Yapply then tailors it to matched jobs, helps you apply and lets you practice the interview." }) + `
  <section class="section"><div class="wrap">${liveDemo("live-how")}</div></section>
  <section class="section"><div class="wrap">
    ${[["1. Talk", "Yapply asks open questions about your classes, projects, jobs and clubs, then the follow-ups a recruiter would ask: how many, which tools, what changed.", "feature-ai-resume-builder"],
      ["2. Watch it write", "Each answer becomes a resume bullet on screen within seconds. Interrupt to correct it: \"no, that was a team project\".", "feature-ai-resume-builder"],
      ["3. Hang up with a resume", "One page, ATS-readable, exported as PDF or DOCX. Already have a resume? Upload it and talk through the weak lines instead.", "feature-ai-resume-review"],
      ["4. Tailor and apply", "Say \"tailor it\" for any job. Approve, and Yapply applies.", "feature-resume-tailor"],
      ["5. Practice", "Rehearse the interview with a voice interviewer that asks about your own resume.", "feature-ai-mock-interview"]].map(([t, d, h]) => `<div class="grid-2" style="padding:22px 0;border-bottom:1px solid var(--line)"><h3>${t}</h3><div><p>${d}</p><a href="#${h}">Learn more</a></div></div>`).join("")}
  </div></section>${ctaBand()}`
}));

route("features", () => ({
  title: "Features", seoTitle: "AI Resume Tools: Builder, Review, Tailor & Interview | Yapply", desc: "Every Yapply feature starts with a 10-minute conversation: an AI resume builder that writes while you talk, plus resume review, tailoring, cover letters, mock interviews and job matching.", path: "/features", crumbs: [["Home", "home"], ["Features"]],
  html: pageHead({ eyebrow: "Features", title: "AI resume tools that start by listening", lead: "The AI Resume Builder writes your resume while you talk. Every other feature reuses that conversation, so nothing you said goes to waste." }) +
  `<section class="section"><div class="wrap grid"><a class="card" href="#how-it-works"><h3>How it works</h3><p class="muted">Talk for 10 minutes, finish with a resume.</p></a>${FEATURES.map(f => `<a class="card" href="#feature-${f.slug}">${f.flag ? '<span class="tag hi">Core</span>' : ""}<h3 style="margin-top:6px">${f.name}</h3><p class="muted">${f.one}</p></a>`).join("")}</div></section>${ctaBand()}`
}));

function mockInterviewDemo() {
  onRender(() => {
    const qs = ["Tell me about the study-room app on your resume.", ...IQ.behavioral.qs.map(q => q[0])]; let i = 0;
    const log = $("#mi-log"), form = $("#mi-form"), inp = $("#mi-in");
    const add = (cls, t) => { const d = document.createElement("div"); d.className = "msg " + cls; d.textContent = t; log.appendChild(d); log.scrollTop = log.scrollHeight; };
    form.addEventListener("submit", e => {
      e.preventDefault(); const a = inp.value.trim(); if (!a) return; add("me", a); inp.value = "";
      const words = a.split(/\s+/).length, hasNum = /\d/.test(a), hasI = /\bI\b/.test(a);
      const fb = words < 25 ? "Let me stop you there. Walk me through what you did, step by step." : !hasNum ? "Good. What was the result, in numbers? Users, hours saved, anything." : !hasI ? "You said \"we\" a lot. What did you personally do?" : "Clear and specific. That's the version to say in the real interview.";
      setTimeout(() => { add("ai", fb); i = (i + 1) % qs.length; setTimeout(() => add("ai", "Next: " + qs[i]), 500); }, 400);
    });
  });
  return `<div class="chat" style="max-height:440px;overflow:auto" id="mi-log" aria-live="polite"><div class="msg ai">Tell me about the study-room app on your resume.</div></div>
  <form id="mi-form" class="row" style="margin-top:10px"><label for="mi-in" class="hidden">Your answer</label><input id="mi-in" style="flex:1" placeholder="Type your answer (the product listens by voice)"><button class="btn primary">Answer</button></form>
  <p class="small muted">Demo of the follow-up logic. In the product this is a live, full-duplex voice conversation.</p>`;
}

function featureDemo(slug) {
  if (slug === "ai-resume-builder") return liveDemo("live-feat");
  if (slug === "ai-mock-interview") return mockInterviewDemo();
  if (slug === "resume-tailor") return `<div class="paper"><span class="eyebrow">Tailored for: Data Analyst, New Grad · Capital One</span>
    <p class="small"><del class="muted">Built a booking app used by 300 club members.</del></p>
    <p class="small"><mark>Analyzed</mark> usage <mark>data</mark> from a booking app with 300 users in <mark>SQL</mark> to cut double-bookings to zero.</p>
    <p class="small muted">Highlighted terms come from the job description. Every fact comes from your conversation.</p>
    <div class="row"><button class="btn sm primary" onclick="toast('Demo: change accepted')">Accept</button><button class="btn sm" onclick="toast('Demo: kept original')">Keep original</button></div></div>`;
  if (slug === "ai-resume-review") return `<div class="paper"><div class="row" style="justify-content:space-between"><span class="eyebrow" style="margin:0">Resume review</span><span class="tag warn">62 / 100</span></div>
    <p class="small"><b>Weak line:</b> “Helped with marketing for a student club.”</p>
    <div class="bubble ai" style="background:var(--soft)"><small>YAPPLY ASKS</small>What did you actually do, and what happened after?</div>
    <div class="bubble me" style="background:var(--soft)"><small>YOU SAY</small>I ran the Instagram and we got way more people at events, like double.</div>
    <p class="small"><b>Rewritten live:</b> <mark>Ran</mark> the club's Instagram and <mark>doubled event attendance</mark> in one semester.</p></div>`;
  if (slug === "ai-cover-letter") return `<div class="paper"><span class="eyebrow">You said (40 seconds)</span><p class="small muted">“I want Capital One because I used their app to learn budgeting and I want to work on data that helps people like me.”</p><span class="eyebrow">Yapply wrote</span><p class="small">Dear Capital One hiring team, I learned to budget in your app as a freshman, and that experience is why I want to work on the data behind it. In my study-room booking project I…</p></div>`;
  return `<div class="jobs">${JOBS.slice(0, 3).map(jobRow).join("")}</div><div class="card" style="margin-top:10px"><span class="eyebrow">Review before sending</span><ul class="small"><li>Resume: tailored version ✓</li><li>“Why this company?” drafted from your conversation ✓</li><li>Work authorization answered from your profile ✓</li></ul><button class="btn sm primary" onclick="toast('Demo: application approved')">Approve & apply</button></div><p>${DEMO}</p>`;
}

pattern(/^feature-(.+)$/, slug => {
  const f = FEATURES.find(x => x.slug === slug); if (!f) return null;
  const faq = [[`Is Yapply's ${f.name.toLowerCase()} free?`, "Free during beta, with paid plans for heavy use. See Pricing."], ["Will it make things up?", "No. Everything it writes comes from what you said or uploaded, and you approve every line."], ["Do I need a resume to start?", "No. Start talking; the resume is written as you go."], ["Who is it for?", "New grads without a relevant internship, international students, grads whose first job is outside their field, and early-career people changing direction."]];
  return { title: f.h1, seoTitle: f.title + " | Yapply", desc: f.desc, path: "/features/" + slug, crumbs: [["Home", "home"], ["Features", "features"], [f.name]],
    html: pageHead({ eyebrow: f.flag ? "Core feature · " + f.name : "Features · " + f.name, title: f.h1, lead: `<b style="color:var(--ink)">${f.pain}</b> ${f.one}`, answer: f.answer, extra: `<div class="row" style="margin-top:16px"><a class="btn primary" href="#signup">Try it free</a><a class="btn" href="#how-it-works">How it works</a></div>` }) + `
    <section class="section"><div class="wrap">${featureDemo(slug)}</div></section>
    <section class="section"><div class="wrap"><h2>Who ${f.name} is for</h2><div class="icp-grid" style="margin-top:16px">${Object.entries(f.for).map(([k, line]) => `<div class="icp small-icp"><span class="icp-k">${k}</span><span class="eyebrow" style="margin:0">${ICP[k].tag}</span><p class="icp-pain">${ICP[k].pain}</p><p class="small"><b>${line}</b></p></div>`).join("")}</div></div></section>
    <section class="section"><div class="wrap"><h2>What you get with ${f.name}</h2><div class="grid" style="margin-top:16px">${f.bullets.map(([t, d]) => `<div class="card"><h3>${t}</h3><p class="muted small">${d}</p></div>`).join("")}</div></div></section>
    <section class="section"><div class="wrap grid-2"><div><h2>How it compares</h2><p>${f.vs}</p><a href="#compare">See all comparisons</a></div>
      <div><h2>FAQ</h2>${faqBlock(faq)}</div></div></section>
    <section class="section"><div class="wrap"><h2>Other features</h2><div class="grid" style="margin-top:16px">${FEATURES.filter(x => x.slug !== slug).map(x => `<a class="card" href="#feature-${x.slug}"><h3>${x.name}</h3><p class="muted small">${x.short}</p></a>`).join("")}</div></div></section>${ctaBand()}` };
});

route("pricing", () => ({
  title: "Pricing", path: "/pricing", crumbs: [["Home", "home"], ["Pricing"]],
  html: pageHead({ eyebrow: "Pricing", title: "Free to start. Pay when you're applying hard.", lead: "Prices below are placeholders for design review and are not final." }) + `
  <section class="section"><div class="wrap plans">
    <div class="plan"><h3>Free</h3><div class="price">$0</div><ul><li>Voice AI resume builder: 1 full resume</li><li>Unlimited job search with sponsorship labels</li><li>3 tailored resumes per month</li><li>All free tools</li></ul><a class="btn" href="#signup">Start free</a></div>
    <div class="plan featured"><span class="tag hi">Most students</span><h3>Pro</h3><div class="price">$TBD<span class="small muted" style="font-size:1rem">/month</span></div><ul><li>Unlimited voice sessions and resume versions</li><li>Unlimited tailoring and cover letters</li><li>Auto apply with review</li><li>Unlimited voice mock interviews</li></ul><a class="btn primary" href="#signup">Start Pro trial</a></div>
    <div class="plan"><h3>Universities</h3><div class="price">Talk to us</div><ul><li>Accounts for your students</li><li>Workshops for career centers</li><li>Anonymous outcome reports</li></ul><a class="btn" href="#about">Contact</a></div>
  </div></section>
  <section class="section"><div class="wrap"><h2>Pricing FAQ</h2>${faqBlock([["Can I cancel anytime?", "Yes, from Settings. You keep access until the end of the paid period."], ["Is there a student discount?", "Pricing is designed for students; final prices will be set before launch."], ["What happens to my resume if I downgrade?", "You keep your resume and every version you created."]])}</div></section>`
}));

route("app", () => {
  onRender(() => $("#wl").addEventListener("submit", e => { e.preventDefault(); $("#wl-ok").classList.remove("hidden"); e.target.classList.add("hidden"); }));
  return { title: "Mobile App", path: "/app", crumbs: [["Home", "home"], ["Mobile App"]],
    html: pageHead({ eyebrow: "Mobile App", title: "Build your resume on a walk", lead: "The voice session works best on your phone: talk with earbuds in, and your resume is ready when you get back." }) + `
    <section class="section"><div class="wrap grid-2"><div class="stack">
      <div class="row"><span class="tag">iOS · in development</span><span class="tag">Android · in development</span></div>
      <form id="wl" class="form card"><label for="wl-email">Email for the waitlist<input id="wl-email" type="email" required placeholder="you@school.edu"></label><button class="btn primary">Join the waitlist</button></form>
      <p id="wl-ok" class="answer hidden">You're on the list. (Prototype: nothing was sent.)</p>
    </div><div class="call"><div class="bar"><span>● LIVE</span><span>03:48</span></div><div class="wave" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<i style="animation-delay:${(i * 0.07).toFixed(2)}s"></i>`).join("")}</div><div class="bubble ai"><small>YAPPLY</small>How many people used it?</div><div class="bubble me"><small>YOU</small>Closer to 300.</div><div class="resume-line"><mark>300 CS club members</mark> added to your resume</div></div></div></section>` };
});

route("signup", () => {
  onRender(() => $("#su").addEventListener("submit", e => { e.preventDefault(); $("#su-next").classList.remove("hidden"); e.target.classList.add("hidden"); }));
  return { title: "Join now", path: "/signup", crumbs: [["Home", "home"], ["Sign up"]],
    html: pageHead({ eyebrow: "Join now", title: "Create your Yapply account", lead: "Three questions, then start talking. Your resume is written while you speak." }) + `
    <section class="section"><div class="wrap grid-2">
      <form id="su" class="form card">
        <label for="su-email">School email<input id="su-email" type="email" required placeholder="you@school.edu"></label>
        <div class="two"><label for="su-year">Graduation<select id="su-year"><option>Dec 2026</option><option selected>May 2027</option><option>Dec 2027</option><option>2028</option></select></label>
        <label for="su-look">Looking for<select id="su-look"><option>Full-time new grad</option><option>Summer internship</option><option>Both</option></select></label></div>
        <label for="su-auth">Work authorization<select id="su-auth"><option>US citizen or green card</option><option>F-1 student (will need OPT / H-1B)</option><option>Other visa</option></select></label>
        <button class="btn primary">Start my voice session</button>
        <p class="small muted">Prototype: this form doesn't create an account.</p>
      </form>
      <div class="stack"><h3>What happens next</h3><ol class="prose"><li>Talk for about 10 minutes</li><li>Watch your resume being written, and correct it out loud</li><li>Hang up with a finished resume, then tailor and apply</li></ol></div>
    </div><div id="su-next" class="hidden wrap" style="margin-top:20px">${liveDemo("live-signup")}</div></section>` };
});
