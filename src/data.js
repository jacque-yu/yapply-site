// ---------- DEMO DATA ----------
// Example job listings generated for template review. Not real postings.


const ROLES = [
  { slug: "software-engineer", name: "Software Engineer", short: "SWE", salary: [115, 165] },
  { slug: "data-analyst", name: "Data Analyst", short: "Data Analyst", salary: [70, 95] },
  { slug: "data-scientist", name: "Data Scientist", short: "Data Scientist", salary: [105, 140] },
  { slug: "product-manager", name: "Product Manager", short: "APM", salary: [110, 145] },
  { slug: "quant-researcher", name: "Quant Researcher", short: "Quant", salary: [150, 225] },
  { slug: "mechanical-engineer", name: "Mechanical Engineer", short: "MechE", salary: [80, 105] },
  { slug: "business-analyst", name: "Business Analyst", short: "Business Analyst", salary: [75, 100] },
  { slug: "ux-designer", name: "UX Designer", short: "UX", salary: [80, 110] }
];

const CITIES = [
  { slug: "new-york", name: "New York, NY" }, { slug: "san-francisco", name: "San Francisco, CA" },
  { slug: "seattle", name: "Seattle, WA" }, { slug: "boston", name: "Boston, MA" },
  { slug: "austin", name: "Austin, TX" }, { slug: "chicago", name: "Chicago, IL" },
  { slug: "remote", name: "Remote (US)" }
];


function seeded(n) { const x = Math.sin(n * 9301 + 49297) * 233280; return x - Math.floor(x); }

const JOBS = (() => {
  const out = []; let id = 1001;
  Object.entries(HIRING).forEach(([cslug, pairs], ci) => {
    const c = COMPANIES.find(x => x.slug === cslug);
    pairs.forEach(([rslug, city], pi) => {
      ["New Grad", "Internship"].forEach((level, li) => {
        const k = ci * 31 + pi * 7 + li;
        if (seeded(k) < 0.22) return; // not every combo is open
        const r = ROLES.find(x => x.slug === rslug);
        const sr = seeded(k + 11);
        const sponsor = c.slug === "booz-allen" ? "no" : sr < 0.45 ? "yes" : sr < 0.8 ? "likely" : "unknown";
        const lo = level === "Internship" ? Math.round(r.salary[0] / 2.08) : r.salary[0];
        const hi = level === "Internship" ? Math.round(r.salary[1] / 2.08) : r.salary[1];
        const posted = 1 + Math.floor(seeded(k + 3) * 20);
        const dl = 3 + Math.floor(seeded(k + 5) * 40);
        const deadline = new Date(Date.UTC(2026, 10, 24 + dl)).toISOString().slice(0, 10);
        const year = level === "Internship" ? "Summer 2027" : "2027 Start";
        const title = level === "Internship" ? `${r.name} Intern, ${year}` : `${r.name}, New Grad ${year.replace(" Start", "")}`;
        out.push({ id: id++, company: c.slug, role: rslug, city, level, title, sponsor,
          salary: level === "Internship" ? `$${lo}–$${hi}/hr` : `$${lo}K–$${hi}K`,
          posted, deadline, model: city === "remote" ? "Remote" : seeded(k + 9) > 0.5 ? "Hybrid" : "Onsite" });
      });
    });
  });
  return out;
})();

const SPONSOR_LABEL = { yes: ["Sponsors H-1B", "good"], likely: ["H-1B likely", "good"], unknown: ["Sponsorship unclear", "warn"], no: ["No sponsorship", "bad"] };

const VERBS = {
  created: { alts: ["built", "launched", "designed", "established", "developed", "authored", "introduced", "founded"], before: "Created a dashboard for the marketing team.", after: "Built a Tableau dashboard that cut the marketing team's weekly reporting from 6 hours to 1." },
  developed: { alts: ["engineered", "built", "implemented", "prototyped", "shipped", "programmed", "designed", "formulated"], before: "Developed a web app for the club.", after: "Shipped a React web app that 300 club members use to book study rooms." },
  managed: { alts: ["led", "ran", "oversaw", "coordinated", "directed", "owned", "supervised", "administered"], before: "Managed social media accounts.", after: "Ran 3 social accounts and grew followers from 1.2K to 4.5K in one semester." },
  led: { alts: ["headed", "spearheaded", "directed", "guided", "steered", "chaired", "orchestrated", "captained"], before: "Led a team project.", after: "Headed a 5-person capstone team that delivered a demand-forecasting model to a local grocer." },
  collaborated: { alts: ["partnered", "co-led", "worked with", "teamed up", "joined forces", "liaised", "contributed", "cooperated"], before: "Collaborated with other interns.", after: "Partnered with 4 interns across design and engineering to ship an onboarding flow in 6 weeks." },
  improved: { alts: ["increased", "boosted", "streamlined", "optimized", "upgraded", "refined", "strengthened", "accelerated"], before: "Improved the checkout process.", after: "Streamlined checkout from 5 steps to 3, lifting conversion by 8% in an A/B test." },
  analyzed: { alts: ["evaluated", "assessed", "examined", "modeled", "investigated", "measured", "audited", "forecasted"], before: "Analyzed survey data.", after: "Modeled 2,400 survey responses in Python to find the 3 drivers of student churn." },
  helped: { alts: ["supported", "enabled", "assisted", "facilitated", "contributed to", "advised", "coached", "equipped"], before: "Helped customers with questions.", after: "Resolved 40+ customer tickets a week with a 96% satisfaction score." },
  organized: { alts: ["planned", "coordinated", "arranged", "hosted", "structured", "scheduled", "mobilized", "produced"], before: "Organized events for the society.", after: "Planned 6 recruiting events that brought 22 employers and 500 students to campus." },
  designed: { alts: ["architected", "crafted", "drafted", "modeled", "sketched", "shaped", "conceived", "prototyped"], before: "Designed a new logo.", after: "Crafted a new visual identity adopted across 12 department newsletters." },
  increased: { alts: ["grew", "raised", "expanded", "doubled", "lifted", "boosted", "multiplied", "scaled"], before: "Increased membership.", after: "Doubled club membership from 60 to 120 by launching a peer-mentoring program." },
  ensured: { alts: ["guaranteed", "secured", "verified", "maintained", "safeguarded", "upheld", "confirmed", "enforced"], before: "Ensured data was accurate.", after: "Verified 15K inventory records weekly, keeping error rates under 0.5%." }
};

const SKILLS = {
  "software-engineer": { hard: ["Data structures and algorithms", "Python", "Java", "TypeScript", "REST APIs", "SQL", "Git", "Unit testing", "Linux"], tools: ["AWS or GCP", "Docker", "GitHub Actions", "PostgreSQL", "React"], soft: ["Code review etiquette", "Breaking down ambiguous tasks", "Written technical communication"] },
  "data-analyst": { hard: ["SQL (joins, window functions)", "Excel (pivot tables, XLOOKUP)", "Python (pandas)", "A/B testing basics", "Descriptive statistics", "Data cleaning"], tools: ["Tableau", "Power BI", "Looker", "Google Sheets", "BigQuery"], soft: ["Storytelling with data", "Stakeholder questions", "Attention to detail"] },
  "data-scientist": { hard: ["Python", "Statistics and probability", "Machine learning (scikit-learn)", "Experiment design", "SQL", "Feature engineering"], tools: ["Jupyter", "PyTorch", "Spark", "dbt", "MLflow"], soft: ["Explaining models to non-experts", "Scoping problems", "Prioritization"] },
  "product-manager": { hard: ["User research", "Writing PRDs", "Prioritization frameworks", "Metrics and funnels", "SQL basics", "Wireframing"], tools: ["Figma", "Jira", "Amplitude", "Notion", "Linear"], soft: ["Cross-team communication", "Decision making with incomplete data", "Running meetings"] },
  "quant-researcher": { hard: ["Probability", "Linear algebra", "Time-series analysis", "Statistical modeling", "Python or C++", "Backtesting"], tools: ["NumPy", "pandas", "kdb+/q", "Bloomberg"], soft: ["Mental math under pressure", "Clear reasoning out loud", "Intellectual honesty"] },
  "mechanical-engineer": { hard: ["CAD (SolidWorks)", "GD&T", "FEA", "Thermodynamics", "Design for manufacturing", "Prototyping"], tools: ["SolidWorks", "ANSYS", "MATLAB", "3D printing"], soft: ["Hands-on troubleshooting", "Documentation", "Working with technicians"] },
  "business-analyst": { hard: ["Excel modeling", "SQL", "Process mapping", "Requirements gathering", "Financial basics", "Presentation building"], tools: ["Excel", "PowerPoint", "Tableau", "Visio", "Salesforce"], soft: ["Structured thinking", "Client communication", "Synthesis"] },
  "ux-designer": { hard: ["User research", "Interaction design", "Wireframing and prototyping", "Usability testing", "Accessibility (WCAG)", "Design systems"], tools: ["Figma", "FigJam", "Maze", "Adobe Illustrator"], soft: ["Presenting design rationale", "Taking critique", "Empathy interviews"] }
};



const BLOG = [
  { slug: "why-voice-beats-forms", title: "Why a 10-minute conversation beats a resume form", date: "Nov 18, 2026", mins: 5, tag: "Product",
    sum: "Students undersell themselves in forms. Talking through a project draws out the numbers, tools and decisions a recruiter looks for.",
    html: "<p>Resume forms ask for a title, dates and three bullets. Most students fill them with what they did, not what changed because they did it. A spoken conversation works differently: a follow-up question like \"how many people used it?\" turns \"built a website\" into a line with scale and impact.</p><h2>What we ask in the first 10 minutes</h2><ol><li>Walk me through something you built or fixed that you're proud of.</li><li>Who used it, and how many?</li><li>What would have happened if you hadn't done it?</li><li>What kind of team do you want to join next?</li></ol><p>Two independent career-agent products, Jack & Jill and Pluto, also landed on a roughly 10-minute first conversation, short enough to finish and long enough to feel understood.</p>" },
  { slug: "latin-honors-on-resume", title: "Latin honors on your resume, with examples", date: "Nov 10, 2026", mins: 4, tag: "Resume",
    sum: "Where to put cum laude, magna cum laude and summa cum laude, and what to write before they are official.",
    html: "<p>Put Latin honors on the same line as your degree. Read the full <a href=\"#guide-latin-honors\">Latin honors guide</a> for cutoffs and wording.</p>" },
  { slug: "first-week-of-fall-recruiting", title: "The first week of fall recruiting: a checklist", date: "Aug 4, 2026", mins: 6, tag: "Recruiting",
    sum: "Roles at trading firms and banks open first. Here is what to have ready before the first posting goes live.",
    html: "<ul><li>One-page resume with numbers in every bullet</li><li>A target list of 40–60 companies with their usual opening month</li><li>Three stories ready: a project, a conflict, a failure</li><li>Alerts on for new postings</li></ul><p>See the full <a href=\"#guide-new-grad-recruiting-timeline\">recruiting timeline</a>.</p>" }
];

const IQ = {
  "behavioral": { name: "Behavioral", qs: [
    ["Tell me about yourself.", "Present, past, future in 60–90 seconds: what you study now, one proof point, why this role."],
    ["Tell me about a time you worked through a conflict on a team.", "STAR: name the disagreement, what you did, the outcome, what you'd repeat."],
    ["Describe a project you're proud of.", "Pick one with a number: users, time saved, accuracy. Explain a decision you made."],
    ["Tell me about a time you failed.", "A real miss, what you changed after it, and evidence that the change worked."],
    ["Why this company?", "One product detail, one team detail, one link to your own story."],
    ["Tell me about a time you learned something quickly.", "Show your method: what you read, who you asked, how fast you shipped."]
  ] },
  "software-engineer": { name: "Software Engineer (new grad)", qs: [
    ["Reverse a linked list, then explain the time and space complexity.", "Talk through the pointer swap before coding. O(n) time, O(1) space."],
    ["Design a URL shortener at a high level.", "Clarify scale, then API, storage, ID generation, caching. Keep it to 15 minutes."],
    ["Walk me through a bug you spent a long time on.", "How you narrowed it down, what tool helped, what you changed to prevent it."],
    ["How would you test a function that parses dates?", "Edge cases: time zones, leap years, invalid input, empty strings."]
  ] },
  "data-analyst": { name: "Data Analyst", qs: [
    ["Write SQL to find the top 3 products by revenue in each month.", "Aggregate by month and product, then ROW_NUMBER() over partition by month."],
    ["Signups dropped 20% last week. How do you investigate?", "Check data quality first, then segment by channel, device, geography and funnel step."],
    ["Explain an A/B test result to a non-technical manager.", "Lead with the decision, then effect size, confidence and what you'd do next."],
    ["What's the difference between a LEFT JOIN and an INNER JOIN?", "Show it with a two-row example; mention NULLs from unmatched rows."]
  ] },
  "product-manager": { name: "Product Manager (APM)", qs: [
    ["How would you improve a product you use every day?", "Pick a user, a pain point, 3 solutions, choose one and a metric."],
    ["How would you prioritize these five feature requests?", "Name your framework (impact vs effort), state assumptions, decide."],
    ["Tell me about a time you influenced without authority.", "Show how you used data or a prototype to move people."]
  ] },
  "quant-researcher": { name: "Quant Researcher", qs: [
    ["You roll two dice. What's the expected value of the larger one?", "Enumerate 36 outcomes or use P(max ≤ k) = (k/6)². Answer: 161/36 ≈ 4.47."],
    ["How would you test whether a trading signal is real?", "Out-of-sample tests, transaction costs, multiple-testing correction, stability across regimes."],
    ["Explain overfitting to a portfolio manager.", "A model that memorizes noise; show how you'd guard against it."]
  ] }
};

const COMPETITORS = [
  { slug: "jobright", name: "Jobright", what: "AI job matching platform with an H-1B sponsorship filter and an Agent that applies for you on paid plans.", strong: ["Large, frequently updated job database", "H-1B filter based on sponsorship history", "Chrome extension for autofill"], diff: "Jobright matches on your existing resume. Yapply starts with a 10-minute voice conversation, so the resume it tailors includes experience that was never written down." },
  { slug: "simplify", name: "Simplify", what: "Free Chrome extension that autofills job applications, plus job lists and a paid AI tier (Simplify+, $39.99/month per public pricing).", strong: ["Fast autofill across common ATS forms", "Popular open-source internship and new grad lists on GitHub", "Free core product"], diff: "Simplify saves time on forms. Yapply works on what goes into them: a resume and answers drawn from your own story, reviewed before anything is sent." },
  { slug: "sprout", name: "Sprout", what: "Swipe-to-apply mobile app: swipe right and AI tailors a resume and applies. Paid plans start at $19.99/month for 80 applications per public pricing.", strong: ["Very fast, mobile-first", "Asks a few questions before applying"], diff: "Sprout optimizes for application volume. Yapply's core is different: you talk, and your resume is written and rewritten in real time while you speak. By the end of the conversation the resume is done." },
  { slug: "teal", name: "Teal", what: "Job search CRM with a resume builder, keyword matching and a Chrome extension to save jobs.", strong: ["Strong job tracker", "Resume keyword matching"], diff: "Teal is built for organized job seekers at any career stage. Yapply is built for students with thin resumes who need help finding what to say." },
  { slug: "sorce", name: "Sorce", what: "Swipe-based job app: swipe on roles and it applies for you.", strong: ["Very fast way to send many applications", "Simple mobile experience"], diff: "Sorce and Sprout make applying fast. Yapply makes the resume worth sending: you talk, and the resume is written live while you speak." },
  { slug: "jobcopilot", name: "JobCopilot", what: "Auto-apply service that submits applications on your behalf based on your preferences.", strong: ["Hands-off application volume"], diff: "Yapply keeps a review step before every application, because mass auto-applying can hurt response rates and get flagged by job boards." }
];

const FAQ = [
  ["What is Yapply?", "A voice AI resume builder for US college students and new grads. You talk with it for about 10 minutes and your resume is written live on screen while you speak. When the conversation ends, the resume is done. Yapply then tailors it to matched jobs and helps you apply."],
  ["Do I need a finished resume to start?", "No. The voice conversation is designed for students with thin or empty resumes. You can also upload a resume and Yapply will ask about what's missing."],
  ["Does Yapply apply to jobs without asking me?", "No. You review every tailored resume and application before it's sent."],
  ["Can I filter for H-1B sponsorship?", "Yes. Every job shows a sponsorship label based on the job description and the employer's public filing history."],
  ["Is my voice recording stored?", "This prototype does not record anything. The production policy will be published in the Privacy Policy before launch."],
  ["Which schools and majors is Yapply for?", "Any US college student or recent grad. The job database covers tech, data, finance, consulting, engineering and design roles."],
  ["How is Yapply different from Simplify or Jobright?", "See the side-by-side comparisons in Compare."],
  ["Is there a mobile app?", "iOS and Android apps are in development. Join the waitlist on the Mobile App page."]
];

