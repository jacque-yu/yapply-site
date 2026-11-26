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
  ["Why am I getting rejected so fast?", "Often software rejects the application before a person reads it, filtering on keywords and requirements. Career changers get hit hardest, because their resume uses the old field's words. A free roast call shows you exactly which lines are doing it."],
  ["Is the resume roast really free?", "Yes. The call and your rewritten resume are free, with no sign-up. You pay only when you start applying through Yapply."],
  ["Can employers tell I used AI?", "What gives resumes away is generic, inflated wording. Yapply writes from your own words and real examples, which is also what holds up when an interviewer asks follow-up questions."],
  ["Why not just use ChatGPT or Claude?", "They're great writers, but you have to prompt them, paste everything in, catch any details they fill in, and still apply to every job yourself. Yapply asks the questions, only writes what you said, and applies for you with proof."],
  ["How do I write a resume for a career change?", "Keep your real job titles, but rewrite each bullet as evidence for the new role: the result, the number, and the skill the new field searches for."],
  ["Does Yapply apply to jobs for me?", "Yes. Swipe right on a matched job and Yapply fills out and submits the application with a tailored resume. It works with Greenhouse and a dozen more application systems, with more added all the time."],
  ["Will it make up experience to fit the new role?", "No. Yapply only rewrites what you said. Skills the new role wants that you don't have are shown as gaps, not added."]
];
function heroRoast() {
  return `<div class="hr-stage">${roastPaper()}
    <div class="hr-phone" aria-label="Sample roast call">
      <div class="fv-top"><span class="rec"></span>Free roast · live <span class="muted">2:41</span></div>
      <div class="fv-b ai hb1">Be honest. “Handled scheduling.” What does that actually mean?</div>
      <div class="fv-b me hb2">I schedule twelve people around the busy hours, and I track sales and waste in Excel for my district—</div>
      <div class="fv-b ai cut hb3"><em>Yapply cut in</em>Stop. That's operations. How much waste did you cut?</div>
      <div class="fv-b me hb4">About twelve hundred a month.</div>
      <div class="fv-card pop hb5"><small>Rewritten for operations</small><p><mark>Own weekly sales, waste and labor tracking in Excel</mark>; flagged 3 slow-moving products, cutting waste by <mark>$1.2K a month</mark>.</p></div>
    </div></div>`;
}
route("home", () => ({
  title: "Yapply", seoTitle: "Free Resume Roast: Find Out Why You're Getting Rejected | Yapply",
  desc: "Rejected before a human ever read it? Get your resume roasted on a free call, no sign-up. Yapply rewrites what you actually did for the job you want, then applies for you.",
  ld: { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Yapply", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", description: "Free resume roast on a call, resume rewritten from what you say, and swipe-to-apply with proof, for people changing direction.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "HOLOGROW INC" } },
  html: `
  <section class="hero2"><div class="wrap h2-grid">
    <div class="h2-left">
      <p class="proof"><span class="pulse"></span>Free call · No sign-up · Zero AI-speak</p>
      <h1 class="serif">Rejected before a human ever read it?</h1>
      <div class="h2-bottom">
        <p class="h2-lead">Companies screen you with AI and reject you in two minutes. Fight back with the one thing AI can't fake: the real story you tell out loud. On a free roast call, Yapply shows you exactly why you're getting filtered, then rewrites what you actually did in the new field's language. <b>Swipe right on real jobs, and we apply.</b></p>
        <div class="row"><a class="btn primary lg" href="#call">Roast my resume, free</a><a class="btn lg" href="#call-c">Hear a sample roast</a></div>
        <ul class="ticks"><li>Beats the filter</li><li>Zero AI-speak</li><li>Holds up in the interview</li></ul>
      </div>
    </div>
    ${heroRoast()}
  </div></section>

  <section class="section roomy dark-sec"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">It's not you</span><h2 class="serif">It's not you. It's a filter.</h2><p>Another fake listing. Another Workday account. Another rejection two minutes later, or no answer at all. And if you're changing fields, your resume is written in words the filter isn't looking for.</p></div>
    <div class="stat-band">${[["#1", "theme in 23,846 job-search comments we analyzed on TikTok: getting rejected or ghosted.", null, TIKTOK_STUDY], ["70.3%", "of job seekers applied to at least one role outside their resume's field, the people most likely to be filtered on keywords.", "https://huntr.co/research/career-changer", "Huntr, 15,175 job seekers"], ["18–22%", "of job posts on Greenhouse were ghost listings that companies weren't trying to fill.", "https://www.entrepreneur.com/business-news/ghost-job-listings-on-the-rise-how-to-spot-avoid-experts/485494", "Greenhouse via Entrepreneur"]].map(([n, t, u, src]) => `<div><b class="serif">${n}</b><p>${t}</p>${u ? `<a class="small muted" href="${u}">Source: ${src} ↗</a>` : `<span class="small muted">Source: ${src}</span>`}</div>`).join("")}</div>
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Whose side we're on</span><h2 class="serif">They screen you with AI. Then reject you for sounding like AI.</h2><p class="muted">Fine. Beat their filter with your real story, in your own words: the version a recruiter believes and an interviewer can't poke holes in.</p></div>
    <div class="sides"><div class="side them"><span class="eyebrow" style="margin:0">Their side</span><ul>${["AI screening that rejects you in two minutes", "Detectors that flag anything that sounds like AI", "Fake listings kept up to collect resumes", "Silence instead of feedback"].map(x => `<li>${x}</li>`).join("")}</ul></div>
      <div class="side us"><span class="eyebrow" style="margin:0">Your side</span><ul>${["Your real experience, said out loud, in the words their filter searches for", "Zero AI-speak: it sounds like you because it came from you", "Every line holds up when the interviewer digs", "A straight answer about why you're getting rejected, free"].map(x => `<li>${x}</li>`).join("")}</ul></div></div>
  </div></section>

  <section class="section roomy vs-claude"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Why not just use Claude?</span><h2 class="serif">Claude and ChatGPT are great writers. They weren't built to get you hired.</h2><p class="muted">The short answer: Claude can't dig your real experience out of you in a three-minute call, and it can't apply for you. Here's the long answer.</p></div>
    <div class="cmp-wrap"><table class="cmp cmp-big"><thead><tr><th scope="col"></th><th scope="col">Claude or ChatGPT, on your own</th><th scope="col">Yapply</th></tr></thead><tbody>
      ${[["Getting started", "Write a prompt. Paste your resume and the job description.", "Just talk. No prompt, no copy-paste."],
         ["What it knows about you", "Only what you remember to paste in", "Asks the follow-ups until it finds your results and numbers"],
         ["Details you didn't give", "Can fill gaps with plausible-sounding details unless you catch them", "Asks you. Gaps stay gaps."],
         ["How it sounds", "Polished, and easy to spot as AI", "Your words and your examples"],
         ["Changing fields", "Only as good as your prompt", "Rewrites your experience in the new field's language and shows which roles fit"],
         ["Finding real jobs", "Not its job", "Re-checked daily; ghost and scam posts filtered out"],
         ["Applying", "You retype it into every application form", "Swipe right; Yapply fills out and submits it"],
         ["After you apply", "Nothing to track", "Receipt, screenshot and status for every application"]].map(([a, b, c]) => `<tr><th scope="row">${a}</th><td><span class="x">✕</span>${b}</td><td><span class="ck">✓</span><b>${c}</b></td></tr>`).join("")}
    </tbody></table></div>
    <p class="small muted" style="margin-top:14px">Compares using a general-purpose assistant on its own for a job search. Claude is a trademark of Anthropic; ChatGPT is a trademark of OpenAI.</p>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2" style="align-items:center;gap:clamp(32px,6vw,96px)">
    <div><span class="eyebrow">Swipe to Apply</span><h2 class="serif">Stop retyping your resume into application forms.</h2><p class="muted" style="font-size:1.1rem;line-height:1.65">Swipe right on a matched job and Yapply fills out the application and submits it with a resume tailored to that job. You approve every one: no mass-applying, nothing that looks like spam. ${ATS_LINE} Every application comes with a receipt and a screenshot.</p><a class="btn lg" href="#feature-job-match">How Swipe to Apply works →</a></div>
    <div class="fv">${fvMatch()}</div>
  </div></section>

  <section class="section roomy"><div class="wrap grid-2" style="align-items:center;gap:clamp(32px,6vw,96px)">
    <div class="fv">${fvVerified()}</div>
    <div><span class="eyebrow">Verified Jobs</span><h2 class="serif">Ghosted? Not by a job that never existed.</h2><p class="muted" style="font-size:1.1rem;line-height:1.65">Jobs come from company career pages and application systems, not reposted boards. Every one is re-checked daily, with the posting time shown. Duplicates, likely ghost jobs and scam patterns are filtered out before you see them.</p><a class="btn lg" href="#feature-verified-jobs">How we verify jobs →</a></div>
  </div></section>

  <section class="section roomy"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Same experience. New direction.</span><h2 class="serif">Four roasts. Four new directions.</h2><p class="muted">The most common ways people switch in their first few years. Each line came out of a conversation; nothing was invented.</p></div>
    <div class="who-grid">${["A", "B", "C", "D"].map(switchCard).join("")}</div>
    <p class="small muted" style="margin-top:18px">Sample calls with fictional people, built on the most common switch paths in Huntr's career-changer research.</p>
  </div></section>

  <section class="section roomy"><div class="wrap"><div class="price-tease"><div><span class="eyebrow">Pricing</span><h2 class="serif">Free to roast. Pay when you apply.</h2><p class="muted">The roast call and your rewritten resume are free, with no sign-up. A subscription starts when you send your first application. Prefer to paste? Try the free <a href="#tool-resume-roaster">Resume Roaster</a>.</p></div><a class="btn lg" href="#pricing">See pricing →</a></div></div></section>

  <section class="section roomy"><div class="wrap narrow"><h2 class="serif">Questions before you get roasted</h2>${faqBlock(HOME_FAQ)}</div></section>
  ${ctaBand("Find out why. Then fix it, in one call.", "Free, no sign-up. Leave with a resume that sounds like you, written for the job you want.")}`
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
  <p class="small muted">Demo of the follow-up logic. In the product this is a live, spoken conversation.</p>`;
}

route("pricing", () => ({
  title: "Pricing", path: "/pricing", crumbs: [["Home", "home"], ["Pricing"]],
  html: pageHead({ eyebrow: "Pricing", title: "Free to start. Pay when you're applying hard.", lead: "Prices below are placeholders for design review and are not final." }) + `
  <section class="section"><div class="wrap plans">
    <div class="plan"><h3>Free</h3><div class="price">$0</div><ul><li>Voice AI resume builder: 1 full resume</li><li>Unlimited job search with sponsorship labels</li><li>3 tailored resumes per month</li><li>All free tools</li></ul><a class="btn" href="#signup">Start free</a></div>
    <div class="plan featured"><span class="tag hi">Most students</span><h3>Pro</h3><div class="price">$TBD<span class="small muted" style="font-size:1rem">/month</span></div><ul><li>Unlimited calls and resume versions</li><li>Unlimited tailoring and cover letters</li><li>Auto apply with review</li><li>Unlimited voice mock interviews</li></ul><a class="btn primary" href="#signup">Start Pro trial</a></div>
    <div class="plan"><h3>Universities</h3><div class="price">Talk to us</div><ul><li>Accounts for your students</li><li>Workshops for career centers</li><li>Anonymous outcome reports</li></ul><a class="btn" href="#about">Contact</a></div>
  </div></section>
  <section class="section"><div class="wrap"><h2>Pricing FAQ</h2>${faqBlock([["Can I cancel anytime?", "Yes, from Settings. You keep access until the end of the paid period."], ["Is there a student discount?", "Pricing is designed for students; final prices will be set before launch."], ["What happens to my resume if I downgrade?", "You keep your resume and every version you created."]])}</div></section>`
}));

route("app", () => {
  onRender(() => $("#wl").addEventListener("submit", e => { e.preventDefault(); $("#wl-ok").classList.remove("hidden"); e.target.classList.add("hidden"); }));
  return { title: "Mobile App", path: "/app", crumbs: [["Home", "home"], ["Mobile App"]],
    html: pageHead({ eyebrow: "Mobile App", title: "Build your resume on a walk", lead: "Calls work best on your phone: talk with earbuds in, and your resume is ready when you get back." }) + `
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
        <button class="btn primary">Start my free call</button>
        <p class="small muted">Prototype: this form doesn't create an account.</p>
      </form>
      <div class="stack"><h3>What happens next</h3><ol class="prose"><li>Talk for about 10 minutes</li><li>Watch your resume being written, and correct it out loud</li><li>Hang up with a finished resume, then tailor and apply</li></ol></div>
    </div><div id="su-next" class="hidden wrap" style="margin-top:20px">${liveDemo("live-signup")}</div></section>` };
});
