// ---------- PRODUCT PAGES ----------
function callCard() {
  return `<div class="call" aria-label="Example voice session">
    <div class="bar"><span>● LIVE · Voice profile</span><span class="num">04:12 / ~10:00</span></div>
    <div class="wave" aria-hidden="true">${Array.from({ length: 34 }, (_, i) => `<i style="animation-delay:${(i * 0.07).toFixed(2)}s"></i>`).join("")}</div>
    <div class="bubble ai"><small>YAPPLY</small>You mentioned the study-room app. How many people actually used it?</div>
    <div class="bubble me"><small>YOU</small>Oh, like 300 people in the CS club. We stopped double-bookings, that was the whole point.</div>
    <div class="bubble ai"><small>YAPPLY</small>What did you build it with, and what did you own?</div>
    <div class="resume-line"><span class="eyebrow" style="margin:0 0 4px">Resume line, drafted from your answer</span><mark>Shipped</mark> a React + Firebase booking app used by <mark>300 CS club members</mark>, eliminating double-bookings across 6 study rooms.</div>
  </div>`;
}

route("home", () => ({
  title: "Yapply", html: `
  <section class="hero"><div class="wrap grid-2">
    <div>
      <span class="eyebrow">For the class of 2027 · New grad & internship search</span>
      <h1>Talk for 10 minutes. Get a resume that <mark>sounds like you</mark>.</h1>
      <p class="lead" style="font-size:1.2rem;color:var(--muted);max-width:46ch">Yapply interviews you by voice, finds the experience you forgot to write down, then tailors your resume and applies to matched new grad roles, with your approval on every one.</p>
      <div class="row" style="margin-top:22px"><a class="btn primary" href="#signup">Start my voice profile</a><a class="btn" href="#how-it-works">See how it works</a></div>
      <p class="small muted" style="margin-top:14px">Free during beta · Works with no resume · You approve every application</p>
    </div>
    ${callCard()}
  </div></section>
  <section class="section"><div class="wrap">
    <span class="eyebrow">One flow, five steps</span><h2>From a conversation to an offer</h2>
    <div class="steps" style="margin-top:24px">
      ${[["Talk", "A 10-minute voice session about your classes, projects, jobs and goals.", "feature-voice-career-profile"], ["Review", "See your career profile and fix anything it got wrong.", "feature-voice-career-profile"], ["Match", "New grad and intern roles ranked by fit, sponsorship and deadline.", "feature-job-match"], ["Tailor & apply", "A tailored resume per job. You approve, it applies.", "feature-ai-resume-tailor"], ["Practice", "Mock interviews by voice, built from your own stories.", "feature-ai-mock-interview"]].map(([t, d, h]) => `<div class="step"><h3><a href="#${h}" style="color:inherit">${t}</a></h3><p class="muted">${d}</p></div>`).join("")}
    </div></div></section>
  <section class="section"><div class="wrap grid-2">
    <div><span class="eyebrow">Opportunities</span><h2>Only roles you can actually get</h2><p class="muted">Every job on Yapply is an internship or an entry-level role, labelled with H-1B sponsorship likelihood and the application deadline.</p>
      <div class="row"><a class="btn" href="#jobs-new-grad">New grad jobs</a><a class="btn" href="#jobs-internships">Internships</a><a class="btn" href="#h1b-jobs">H1B jobs</a></div></div>
    <div class="jobs">${JOBS.filter(j => j.sponsor === "yes").slice(0, 4).map(jobRow).join("")}<div>${DEMO}</div></div>
  </div></section>
  <section class="section"><div class="wrap">
    <span class="eyebrow">Free tools</span><h2>Start with a tool, no sign-up</h2>
    <div class="grid" style="margin-top:20px">${TOOLS.map(t => `<a class="card" href="#${t.id}"><h3>${t.name}</h3><p class="muted small">${t.one}</p></a>`).join("")}</div>
  </div></section>
  <section class="section"><div class="wrap grid-2">
    <div><span class="eyebrow">For international students</span><h2>Built with OPT and H-1B in mind</h2><p class="muted">Filter for employers that sponsor, see when roles open, and follow the OPT timeline without guessing.</p><a class="btn" href="#international-students">International students</a></div>
    <div class="stack">${GUIDES.filter(g => ["opt-cpt-guide", "h1b-for-new-grads", "new-grad-recruiting-timeline"].includes(g.slug)).map(g => `<a class="card" href="#guide-${g.slug}"><span class="eyebrow">${g.stage}</span><h3>${g.title}</h3></a>`).join("")}</div>
  </div></section>
  <section class="section"><div class="wrap"><h2>Questions</h2>${faqBlock(FAQ.slice(0, 5))}<a href="#faq">All FAQ</a></div></section>
  ${ctaBand()}`
}));

route("how-it-works", () => ({
  title: "How it works", path: "/how-it-works", crumbs: [["Home", "home"], ["How it works"]],
  html: pageHead({ eyebrow: "Features", title: "How Yapply works", lead: "A voice conversation replaces the resume form. Everything after it, from tailoring to applying to practice, uses what you said.", answer: "Yapply asks about your experience for about 10 minutes, turns it into a career profile you can edit, then uses that profile to tailor a resume for each matched job and apply after you approve." }) + `
  <section class="section"><div class="wrap">
    ${[["1. A 10-minute voice session", "Yapply asks open questions, then follows up on the details recruiters look for: how many people, which tools, what changed. You can stop and continue later.", "feature-voice-career-profile"],
      ["2. Your career profile", "Everything it heard becomes a structured profile: projects, skills, numbers, preferences and work authorization. You review it before anything else happens.", "feature-voice-career-profile"],
      ["3. Matched roles", "Entry-level and intern roles, refreshed daily, ranked by fit and labelled with sponsorship and deadline.", "feature-job-match"],
      ["4. A tailored resume per job", "Yapply rewrites your resume for the job's keywords using only facts from your profile, and shows you each change.", "feature-ai-resume-tailor"],
      ["5. Apply with review", "Approve and Yapply fills the application. Nothing is sent without your OK.", "feature-auto-apply"],
      ["6. Practice the interview", "When you land an interview, practice by voice with an interviewer that follows up and interrupts.", "feature-ai-mock-interview"]].map(([t, d, h]) => `<div class="grid-2" style="padding:22px 0;border-bottom:1px solid var(--line)"><h3>${t}</h3><div><p>${d}</p><a href="#${h}">Learn more</a></div></div>`).join("")}
  </div></section>${ctaBand()}`
}));

route("features", () => ({
  title: "Features", path: "/features", crumbs: [["Home", "home"], ["Features"]],
  html: pageHead({ eyebrow: "Features", title: "Everything Yapply does", lead: "Five features, one profile. Each one uses the career profile built from your voice session." }) +
  `<section class="section"><div class="wrap grid">${FEATURES.map(f => `<a class="card" href="#feature-${f.slug}"><h3>${f.name}</h3><p class="muted">${f.one}</p></a>`).join("")}<a class="card" href="#how-it-works"><h3>How it works</h3><p class="muted">The full flow from conversation to offer.</p></a></div></section>${ctaBand()}`
}));

function mockInterviewDemo() {
  onRender(() => {
    const qs = IQ.behavioral.qs.map(q => q[0]); let i = 0;
    const log = $("#mi-log"), form = $("#mi-form"), inp = $("#mi-in");
    const add = (cls, t) => { const d = document.createElement("div"); d.className = "msg " + cls; d.textContent = t; log.appendChild(d); log.scrollTop = log.scrollHeight; };
    form.addEventListener("submit", e => {
      e.preventDefault(); const a = inp.value.trim(); if (!a) return; add("me", a); inp.value = "";
      const words = a.split(/\s+/).length, hasNum = /\d/.test(a), hasI = /\bI\b/.test(a);
      let fb = words < 25 ? "That's short. Can you walk me through what you did step by step?" : !hasNum ? "Good story. What was the result, in numbers? Users, hours saved, a grade, anything." : !hasI ? "You said \"we\" a lot. What did you personally do?" : "Clear and specific. Interviewers like that you quantified the result.";
      setTimeout(() => { add("ai", fb); i = (i + 1) % qs.length; setTimeout(() => add("ai", "Next question: " + qs[i]), 500); }, 400);
    });
  });
  return `<div class="chat" style="max-height:440px;overflow:auto" id="mi-log" aria-live="polite"><div class="msg ai">${esc(IQ.behavioral.qs[0][0])}</div></div>
  <form id="mi-form" class="row" style="margin-top:10px"><label for="mi-in" class="hidden">Your answer</label><input id="mi-in" style="flex:1" placeholder="Type your answer (the real product listens by voice)"><button class="btn primary">Answer</button></form>
  <p class="small muted">Demo of the follow-up logic. In the product this is a live voice conversation.</p>`;
}

pattern(/^feature-(.+)$/, slug => {
  const f = FEATURES.find(x => x.slug === slug); if (!f) return null;
  const demo = slug === "ai-mock-interview" ? mockInterviewDemo()
    : slug === "voice-career-profile" ? callCard()
    : slug === "ai-resume-tailor" ? `<div class="card"><span class="eyebrow">Before</span><p>Worked on a website for a student club.</p><span class="eyebrow">After, tailored for a Software Engineer, New Grad role</span><p><mark>Shipped</mark> a <mark>React</mark> + Firebase booking app used by <mark>300 members</mark>, eliminating double-bookings across 6 rooms.</p><p class="small muted">Highlighted words came from your voice session or match the job description. Nothing is added that you didn't say.</p></div>`
    : slug === "job-match" ? `<div class="jobs">${JOBS.slice(0, 4).map(jobRow).join("")}</div><p>${DEMO}</p>`
    : `<div class="card"><span class="eyebrow">Review before sending</span><h3>${esc(JOBS[0].title)}</h3><p class="small muted">${company(JOBS[0].company).name} · ${city(JOBS[0].city).name}</p><ul><li>Resume: tailored version 3 ✓</li><li>“Why this company?” answer drafted from your profile ✓</li><li>Work authorization: answered from your profile ✓</li></ul><div class="row"><button class="btn primary" onclick="toast('Demo: application approved')">Approve & apply</button><button class="btn" onclick="toast('Demo: opened for editing')">Edit first</button></div></div>`;
  return { title: f.name, path: "/features/" + slug, crumbs: [["Home", "home"], ["Features", "features"], [f.name]],
    html: pageHead({ eyebrow: "Features", title: f.name, lead: f.one }) + `
    <section class="section"><div class="wrap grid-2"><div><h2>What you get</h2><ul class="prose">${f.bullets.map(b => `<li>${b}</li>`).join("")}</ul><a class="btn primary" href="#signup">Try it free</a></div><div>${demo}</div></div></section>
    <section class="section"><div class="wrap"><h2>Other features</h2><div class="grid" style="margin-top:16px">${FEATURES.filter(x => x.slug !== slug).map(x => `<a class="card" href="#feature-${x.slug}"><h3>${x.name}</h3><p class="muted small">${x.one}</p></a>`).join("")}</div></div></section>${ctaBand()}` };
});

route("pricing", () => ({
  title: "Pricing", path: "/pricing", crumbs: [["Home", "home"], ["Pricing"]],
  html: pageHead({ eyebrow: "Pricing", title: "Free to start. Pay when you're applying hard.", lead: "Prices below are placeholders for design review and are not final." }) + `
  <section class="section"><div class="wrap plans">
    <div class="plan"><h3>Free</h3><div class="price">$0</div><ul><li>Voice career profile</li><li>Unlimited job search with sponsorship labels</li><li>5 tailored resumes per month</li><li>All free tools</li></ul><a class="btn" href="#signup">Start free</a></div>
    <div class="plan featured"><span class="tag hi">Most students</span><h3>Pro</h3><div class="price">$TBD<span class="small muted" style="font-size:1rem">/month</span></div><ul><li>Unlimited tailored resumes</li><li>Auto apply with review</li><li>Unlimited voice mock interviews</li><li>Deadline alerts</li></ul><a class="btn primary" href="#signup">Start Pro trial</a></div>
    <div class="plan"><h3>Universities</h3><div class="price">Talk to us</div><ul><li>Accounts for your students</li><li>Workshops for career centers</li><li>Anonymous outcome reports</li></ul><a class="btn" href="#about">Contact</a></div>
  </div></section>
  <section class="section"><div class="wrap"><h2>Pricing FAQ</h2>${faqBlock([["Can I cancel anytime?", "Yes, from your account settings in two clicks."], ["Is there a student discount?", "Pricing is designed for students; final prices will be set before launch."], ["What happens to my profile if I downgrade?", "You keep your profile and all resumes you created."]])}</div></section>`
}));

route("app", () => {
  onRender(() => $("#wl").addEventListener("submit", e => { e.preventDefault(); $("#wl-ok").classList.remove("hidden"); e.target.classList.add("hidden"); }));
  return { title: "Mobile App", path: "/app", crumbs: [["Home", "home"], ["Mobile App"]],
    html: pageHead({ eyebrow: "Mobile App", title: "Yapply for iOS and Android", lead: "Do your voice session on a walk. Get deadline alerts on your lock screen. Approve applications with one tap." }) + `
    <section class="section"><div class="wrap grid-2"><div class="stack">
      <div class="row"><span class="tag">iOS · in development</span><span class="tag">Android · in development</span></div>
      <form id="wl" class="form card"><label for="wl-email">Email for the waitlist<input id="wl-email" type="email" required placeholder="you@school.edu"></label><button class="btn primary">Join the waitlist</button></form>
      <p id="wl-ok" class="answer hidden">You're on the list. (Prototype: nothing was sent.)</p>
    </div>${callCard()}</div></section>` };
});

route("signup", () => {
  onRender(() => $("#su").addEventListener("submit", e => { e.preventDefault(); $("#su-next").classList.remove("hidden"); e.target.classList.add("hidden"); }));
  return { title: "Join now", path: "/signup", crumbs: [["Home", "home"], ["Sign up"]],
    html: pageHead({ eyebrow: "Join now", title: "Create your Yapply account", lead: "Three questions, then your 10-minute voice session." }) + `
    <section class="section"><div class="wrap grid-2">
      <form id="su" class="form card">
        <label for="su-email">School email<input id="su-email" type="email" required placeholder="you@school.edu"></label>
        <div class="two"><label for="su-year">Graduation<select id="su-year"><option>Dec 2026</option><option selected>May 2027</option><option>Dec 2027</option><option>2028</option></select></label>
        <label for="su-look">Looking for<select id="su-look"><option>Full-time new grad</option><option>Summer internship</option><option>Both</option></select></label></div>
        <label for="su-auth">Work authorization<select id="su-auth"><option>US citizen or green card</option><option>F-1 student (will need OPT / H-1B)</option><option>Other visa</option></select></label>
        <button class="btn primary">Continue to voice session</button>
        <p class="small muted">Prototype: this form doesn't create an account.</p>
      </form>
      <div id="su-next" class="hidden stack"><h3>Your voice session is ready</h3><p class="muted">In the product, Yapply would start a 10-minute conversation now. Here's what it sounds like:</p>${callCard()}</div>
      <div class="stack"><h3>What happens next</h3><ol class="prose"><li>Talk for about 10 minutes</li><li>Review your career profile</li><li>See matched roles and tailored resumes</li></ol></div>
    </div></section>` };
});
