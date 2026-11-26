// ---------- PRODUCT PAGES ----------
// Live demo: the conversation on the left writes the resume on the right.
const LIVE_STEPS = [
  { who: "ai", t: "You want customer success roles. Which accounts do you know best?" },
  { who: "me", t: "I handle tickets for our biggest clients, about 30 accounts.", line: ["b1", "Primary support contact for <mark>30 enterprise accounts</mark>."] },
  { who: "ai", t: "Have you ever kept one from leaving?" },
  { who: "me", t: "One was about to churn, so I set up weekly check-ins and they renewed. Around 80K a year... actually 120K.", line: ["b1", "Primary support contact for 30 enterprise accounts; <mark>saved a $120K/year renewal</mark> by running weekly check-ins with an at-risk client."] },
  { who: "ai", t: "What else would a customer success manager recognize?" },
  { who: "me", t: "I wrote an onboarding guide so new clients stopped asking the same questions.", line: ["b2", "<mark>Wrote the onboarding guide</mark> now sent to every new client."] },
  { who: "ai", t: "Did ticket volume change?" },
  { who: "me", t: "New-client tickets dropped by about a third.", line: ["b2", "Wrote the onboarding guide now sent to every new client, <mark>cutting new-client tickets by a third</mark>."] }
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
      <div class="row" style="justify-content:space-between"><span class="eyebrow" style="margin:0">Support → Customer success · writing live</span><button class="btn sm lv-replay" type="button">▶ Watch it write</button></div>
      <h3 style="margin:10px 0 0">Jordan Lee</h3><p class="small muted" style="margin:0 0 10px">jordan.lee@email.com · Austin, TX · Target: Customer Success Manager</p>
      <h5>Experience</h5><p class="small"><b>Customer Support Specialist</b> · B2B software company · 2023–now</p>
      <ul class="small"><li data-l="b1"></li><li data-l="b2"></li></ul>
      <h5>Education</h5><p class="small">University of Texas, B.A. Communication · 2023</p>
      <p class="small muted">Next: what else carries over to customer success…</p>
    </div></div>`;
}

function switchCard(k) {
  const c = ICP[k], p = PERSONAS[k.toLowerCase()], r = personaReport(p), last = p.sections[0][2][0];
  return `<article class="who-card">
    <div class="wc-img" style="background-image:url(${p.img()})"><div class="wc-shade"></div>
      <span class="wc-tag"><b>↗</b>${c.from} → ${c.to}</span>
      <blockquote class="serif">${c.pain}</blockquote><p class="wc-who">${p.name} · ${p.role}</p></div>
    <div class="wc-body">
      <div class="wc-ba"><p class="b"><small>Written for the old job</small>${esc(p.before[0][1])}</p><p class="a"><small>Rewritten for ${p.aim.toLowerCase()} roles</small>${r.lines[last]}</p></div>
      <a class="wc-link" href="#report-${k.toLowerCase()}">See ${p.first}'s career-change report →</a></div>
  </article>`;
}
function statBand() {
  return `<div class="stat-band">${STATS.map(([n, t, u, s]) => `<div><b class="serif">${n}</b><p>${t}</p><a class="small muted" href="${u}">Source: ${s} ↗</a></div>`).join("")}</div>`;
}
const HOME_FAQ = [
  ["How do I write a resume for a career change?", "Keep your real job titles, but rewrite each bullet as evidence for the new role: the result, the number, and the skill the new field asks for. Yapply's coach finds those results by asking follow-up questions, then rewrites them live while you talk."],
  ["What transferable skills do I have?", "More than your title suggests. Reporting, scheduling, presenting, budgeting, user interviews: the coach finds them in your current job and shows which roles they fit."],
  ["Can I change careers without going back to school?", "Often, yes. Many switches in your first three years (support to data, teaching to sales, retail to operations, consulting to product) are won on evidence you already have, written in the new field's language."],
  ["I'm not sure which direction to switch to. Can Yapply help?", "Yes. Start with what you've done; the coach shows which roles your experience already points to, with the evidence for each."],
  ["Does Yapply apply to jobs for me?", "Yes. Swipe right on a matched job and Yapply applies with a resume tailored to it, and you get a receipt and screenshot for every application."],
  ["Will it make up experience to fit the new role?", "No. Yapply only rewrites what you said. Skills the new role wants that you don't have are shown as gaps, not added."]
];
route("home", () => ({
  title: "Yapply", seoTitle: "Change Careers Without Starting Over | Yapply AI Career Coach",
  desc: "Changing direction in your first three years? Talk once with Yapply's AI career coach. It finds what transfers, rewrites your resume for the job you want, and applies for you.",
  ld: { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Yapply", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", description: "AI career coach for career changers: finds what transfers from your current job, rewrites your resume for the role you want and applies for you.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "HOLOGROW INC" } },
  html: `
  <section class="hero2"><div class="wrap h2-grid">
    <div class="h2-left">
      <p class="proof"><span class="pulse"></span>For your first three years at work · Free call</p>
      <h1 class="serif"><span class="h1-kicker">Yapply · AI career coach</span>Change direction without starting over.</h1>
      <div class="h2-bottom">
        <p class="h2-lead">Talk once. We find what transfers from your current work and rewrite your real experience for the job you want. <b>Then swipe right on the roles you like, and we apply for you.</b></p>
        <div class="row"><a class="btn primary lg" href="#call">Start a free call</a><a class="btn lg" href="#report-c">See a career-change report</a></div>
        <p class="small muted" style="margin-top:14px">Nothing invented. Every line comes from what you said.</p>
      </div>
    </div>
    ${heroStage()}
  </div></section>

  <section class="section roomy dark-sec"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">The problem</span><h2 class="serif">You're not starting over. You're being misread.</h2><p>Most people changing direction apply first and figure out how to explain it later. Recruiters read the old title, not what you can do.</p></div>
    ${statBand()}
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Same experience. New direction.</span><h2 class="serif">Four switches, one call each</h2><p class="muted">The most common ways people move in their first few years. Nothing below was invented; each line came out of a conversation.</p></div>
    <div class="who-grid">${["A", "B", "C", "D"].map(switchCard).join("")}</div>
    <p class="small muted" style="margin-top:18px">Sample calls with fictional people, built on the most common switch paths in Huntr's career-changer research.</p>
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">How it works</span><h2 class="serif">Talk once. Rewrite. Apply.</h2></div>
    <div class="how3">
      <a class="h3l" href="#feature-ai-career-coach"><span class="n serif">1</span><h3>Talk once</h3><p class="muted">Tell the coach where you want to go, or that you're not sure. It asks the follow-ups a recruiter in that field would, and rewrites what transfers while you talk.</p></a>
      <a class="h3l" href="#feature-tailored-applications"><span class="n serif">2</span><h3>Rewritten for the job you want</h3><p class="muted">Every application gets its own resume in the new field's language, built only from what you actually did.</p></a>
      <a class="h3l" href="#feature-application-tracker"><span class="n serif">3</span><h3>Swipe right. We apply.</h3><p class="muted">Only fresh, verified jobs. Every application comes with a receipt, a screenshot and the exact resume sent.</p></a>
    </div>
    <div style="margin-top:56px">${liveDemo("live-home")}</div>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2 dir-wrap">
    <div><span class="eyebrow">Not sure where yet?</span><h2 class="serif">Start with what you've done.</h2><p class="muted" style="font-size:1.1rem;line-height:1.65">You don't need a destination to start. Talk about your current job; the coach tells you which roles your experience already fits, what proves it, and what's missing.</p><a class="btn primary lg" href="#call" style="margin-top:10px">Find my direction</a></div>
    <div class="fits-card"><span class="eyebrow" style="margin:0">From Diego's call · assistant store manager</span>${PERSONAS.c.fits.map(([role, lvl, why]) => `<div class="fit-row ${lvl.startsWith("Strong") ? "strong" : ""}"><div><b>${role}</b><span>${why}</span></div><span class="tag">${lvl}</span></div>`).join("")}</div>
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Popular switches</span><h2 class="serif">Where people switch from, and to</h2><p class="muted">The fields people leave most often, and the ones they move into most.</p></div>
    <div class="paths">${PATHS.map(([a, b, d, h]) => `<a class="path" href="#${h}"><span class="pf-from">${a}</span><span class="pf-arrow">→</span><span class="pf-to serif">${b}</span><p class="small muted">${d}</p></a>`).join("")}</div>
    <p class="small muted" style="margin-top:16px">Source: <a href="https://huntr.co/research/career-changer">Huntr Career Changer Research ↗</a>, 15,175 job seekers. Paths 3–6 pair the origins most likely to apply outside their field with the most popular destinations.</p>
  </div></section>

  <section class="section roomy dark-sec"><div class="wrap">
    <div class="promise"><span class="eyebrow">Our promise</span><h2 class="serif">Reframed, never invented.</h2><p>Changing fields is exactly when AI tools are tempted to invent the skills a new role asks for. Yapply only rewrites what you actually did, in the new field's language.</p></div>
    <div class="prom4">${[["No invented answers", "Every line traces back to something you said. Gaps are shown as gaps."], ["Recommendations that listen", "Skipped jobs never come back. Your direction comes first."], ["Jobs that exist", "Re-checked daily; ghost jobs and scam patterns filtered out."], ["Proof, not a counter", "Receipt, screenshot and the exact resume for every application."]].map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2 signals-wrap">
    <div><span class="eyebrow">Built for years one to three</span><h2 class="serif">Two or more of these? Talk to the coach.</h2><p class="muted">These five signals mean your experience is fine. It's written for the wrong job.</p><a class="btn primary lg" href="#call" style="margin-top:12px">Start a free call</a></div>
    <ol class="signals">${SIGNALS.map(([t, d]) => `<li><b>${t}</b><span class="small muted">${d}</span></li>`).join("")}</ol>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2" style="align-items:center">
    <div><span class="eyebrow">Interview</span><h2 class="serif">Nail “Why are you switching?”</h2><p class="muted" style="font-size:1.1rem;line-height:1.65">It's the question that decides a career-change interview. Practice it with an AI interviewer that knows your old job, your new direction and your resume, so your answer and your resume tell the same story.</p><a class="btn lg" href="#feature-ai-mock-interview">AI Mock Interview →</a></div>
    <div class="fv">${fvInterview()}</div>
  </div></section>

  <section class="section roomy"><div class="wrap"><div class="price-tease"><div><span class="eyebrow">Pricing</span><h2 class="serif">Free to find your story. Pay when you apply.</h2><p class="muted">The call, your new-direction resume and your matches are free. A subscription starts when you send your first application.</p></div><a class="btn lg" href="#pricing">See pricing →</a></div></div></section>

  <section class="section roomy"><div class="wrap narrow"><h2 class="serif">Questions career changers ask</h2>${faqBlock(HOME_FAQ)}</div></section>
  ${ctaBand("Your next role is already in your experience.", "Talk once. Leave with a resume for the job you want, and let Yapply apply for you.")}`
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
