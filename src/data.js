// ---------- DEMO DATA ----------
// Every company below is fictional. Job, salary and sponsorship numbers are illustrative,
// so the templates can be reviewed before the real crawler data is connected.
const AS_OF = "Nov 24, 2026";

const COMPANIES = [
  { slug: "northwind-labs", name: "Northwind Labs", industry: "AI infrastructure", hq: "San Francisco, CA", size: "1,200 employees", color: "#2b37d4", h1b: [41, 58, 73], ng: 0.34, opens: "Aug", closes: "Oct", about: "Builds GPU scheduling and model-serving software for enterprise AI teams.", interview: ["Online assessment: 2 coding problems, 70 minutes", "Technical phone screen with an engineer", "Virtual onsite: 2 coding, 1 system design (light), 1 behavioral"] },
  { slug: "brightline-capital", name: "Brightline Capital", industry: "Quantitative trading", hq: "New York, NY", size: "650 employees", color: "#0f766e", h1b: [22, 29, 31], ng: 0.52, opens: "Jul", closes: "Sep", about: "Systematic trading firm running market-making strategies across equities and options.", interview: ["Probability and mental math test", "Two technical interviews (stats, coding)", "Superday: 4 back-to-back interviews"] },
  { slug: "halcyon-health", name: "Halcyon Health", industry: "Health tech", hq: "Boston, MA", size: "900 employees", color: "#b4235a", h1b: [12, 15, 19], ng: 0.21, opens: "Sep", closes: "Nov", about: "Care-coordination software used by hospital networks in 14 states.", interview: ["Recruiter screen", "Take-home data exercise (3 hours)", "Panel: case discussion + behavioral"] },
  { slug: "ferro-robotics", name: "Ferro Robotics", industry: "Robotics", hq: "Pittsburgh, PA", size: "420 employees", color: "#9a3412", h1b: [9, 14, 18], ng: 0.40, opens: "Aug", closes: "Nov", about: "Designs autonomous material-handling robots for warehouses.", interview: ["Hiring manager call", "Technical deep dive on a past project", "Onsite: hands-on design problem + team lunch"] },
  { slug: "juniper-cloud", name: "Juniper Cloud", industry: "Cloud software", hq: "Seattle, WA", size: "3,400 employees", color: "#1d4ed8", h1b: [88, 102, 117], ng: 0.29, opens: "Aug", closes: "Dec", about: "Developer platform for deploying and observing cloud applications.", interview: ["Online assessment", "Two 45-minute coding interviews", "Behavioral interview on ownership and teamwork"] },
  { slug: "mosaic-retail", name: "Mosaic Retail", industry: "Retail tech", hq: "Chicago, IL", size: "2,100 employees", color: "#7c3aed", h1b: [6, 4, 7], ng: 0.12, opens: "Sep", closes: "Jan", about: "Pricing and inventory software for mid-size retailers.", interview: ["Recruiter screen", "SQL and Excel case", "Final round with the analytics team"] },
  { slug: "atlas-freight", name: "Atlas Freight", industry: "Logistics", hq: "Austin, TX", size: "1,600 employees", color: "#0369a1", h1b: [3, 5, 4], ng: 0.08, opens: "Oct", closes: "Feb", about: "Digital freight brokerage matching shippers with carriers.", interview: ["Phone screen", "Business case presentation", "Meet the team"] },
  { slug: "quill-analytics", name: "Quill Analytics", industry: "Data and analytics", hq: "New York, NY", size: "300 employees", color: "#a16207", h1b: [17, 21, 26], ng: 0.45, opens: "Aug", closes: "Oct", about: "Alternative-data research platform for investment teams.", interview: ["Python and SQL assessment", "Data case with a researcher", "Behavioral + culture conversation"] },
  { slug: "orbit-aerospace", name: "Orbit Aerospace", industry: "Aerospace", hq: "Los Angeles, CA", size: "2,800 employees", color: "#334155", h1b: [0, 0, 0], ng: 0, opens: "Aug", closes: "Oct", about: "Builds small-satellite launch vehicles. Roles require US person status (ITAR).", interview: ["Recruiter screen", "Technical interview with an engineer", "Onsite: 4 technical interviews"] },
  { slug: "cedar-bank", name: "Cedar Bank", industry: "Banking and fintech", hq: "Charlotte, NC", size: "11,000 employees", color: "#15803d", h1b: [64, 71, 69], ng: 0.27, opens: "Jul", closes: "Sep", about: "Regional bank with a large technology development program for new grads.", interview: ["Pre-recorded video interview", "Superday: technical + behavioral"] },
  { slug: "lumen-media", name: "Lumen Media", industry: "Media", hq: "New York, NY", size: "1,000 employees", color: "#be123c", h1b: [2, 3, 2], ng: 0.10, opens: "Oct", closes: "Mar", about: "Digital publisher of news and lifestyle brands.", interview: ["Portfolio or writing sample review", "Two interviews with editors or product leads"] },
  { slug: "pine-consulting", name: "Pine Consulting", industry: "Consulting", hq: "Chicago, IL", size: "5,200 employees", color: "#065f46", h1b: [31, 35, 40], ng: 0.38, opens: "Jul", closes: "Sep", about: "Strategy and operations consulting for Fortune 500 clients.", interview: ["Online test", "First round: 2 case interviews", "Final round: partner case + fit"] }
];

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

// Which roles each company hires for, and where.
const HIRING = {
  "northwind-labs": [["software-engineer", "san-francisco"], ["software-engineer", "seattle"], ["data-scientist", "san-francisco"], ["product-manager", "san-francisco"], ["ux-designer", "remote"]],
  "brightline-capital": [["quant-researcher", "new-york"], ["software-engineer", "new-york"], ["data-analyst", "new-york"]],
  "halcyon-health": [["data-analyst", "boston"], ["software-engineer", "boston"], ["business-analyst", "boston"], ["ux-designer", "boston"]],
  "ferro-robotics": [["mechanical-engineer", "boston"], ["software-engineer", "remote"], ["mechanical-engineer", "austin"]],
  "juniper-cloud": [["software-engineer", "seattle"], ["software-engineer", "remote"], ["product-manager", "seattle"], ["data-scientist", "seattle"], ["data-analyst", "seattle"]],
  "mosaic-retail": [["data-analyst", "chicago"], ["business-analyst", "chicago"], ["software-engineer", "chicago"]],
  "atlas-freight": [["business-analyst", "austin"], ["data-analyst", "austin"], ["software-engineer", "austin"]],
  "quill-analytics": [["data-analyst", "new-york"], ["data-scientist", "new-york"], ["software-engineer", "remote"]],
  "orbit-aerospace": [["mechanical-engineer", "san-francisco"], ["software-engineer", "san-francisco"]],
  "cedar-bank": [["software-engineer", "new-york"], ["data-analyst", "new-york"], ["business-analyst", "chicago"]],
  "lumen-media": [["ux-designer", "new-york"], ["product-manager", "new-york"], ["data-analyst", "remote"]],
  "pine-consulting": [["business-analyst", "chicago"], ["business-analyst", "new-york"], ["data-analyst", "chicago"]]
};

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
        const total = c.h1b.reduce((a, b) => a + b, 0);
        const sponsor = c.slug === "orbit-aerospace" ? "no" : total > 40 ? "yes" : total > 12 ? "likely" : "unknown";
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

const GLOSSARY = [
  { slug: "externship", term: "Externship", def: "A short, unpaid job-shadowing experience, usually 1 day to a few weeks, where a student observes professionals at work. Unlike an internship, an externship rarely includes real project work.", rel: ["internship", "return-offer"] },
  { slug: "the-work-number", term: "The Work Number", def: "An employment and income verification database run by Equifax. Employers and lenders use it to confirm where you worked, your title and your pay dates. You can request your own report for free.", rel: ["e-verify"] },
  { slug: "cum-laude", term: "Cum laude", def: "Latin for \"with honor\". The first of three Latin honors on a diploma, followed by magna cum laude (\"with great honor\") and summa cum laude (\"with highest honor\"). GPA cutoffs are set by each school.", rel: ["magna-cum-laude", "summa-cum-laude"] },
  { slug: "magna-cum-laude", term: "Magna cum laude", def: "The middle Latin honor, \"with great honor\". Many schools set it around a 3.7–3.8 GPA or the top 10% of a class, but cutoffs vary.", rel: ["cum-laude", "summa-cum-laude"] },
  { slug: "summa-cum-laude", term: "Summa cum laude", def: "The highest Latin honor, \"with highest honor\". Often reserved for roughly a 3.9+ GPA or the top 1–5% of graduates, depending on the school.", rel: ["cum-laude", "magna-cum-laude"] },
  { slug: "ats", term: "ATS (applicant tracking system)", def: "Software such as Workday, Greenhouse or Lever that employers use to collect applications, parse resumes and move candidates through stages. Clear section headings and the job's own keywords help an ATS read your resume.", rel: ["internship"] },
  { slug: "opt", term: "OPT (Optional Practical Training)", def: "Work authorization for F-1 students in a job related to their major, typically up to 12 months after graduation. You apply on Form I-765 after your school's DSO recommends it.", rel: ["stem-opt", "cpt", "h-1b-cap-gap"] },
  { slug: "stem-opt", term: "STEM OPT extension", def: "A 24-month extension of OPT for graduates with an eligible STEM degree, working for an employer enrolled in E-Verify.", rel: ["opt", "e-verify"] },
  { slug: "cpt", term: "CPT (Curricular Practical Training)", def: "Work authorization for F-1 students during their program, for an internship or co-op that is part of the curriculum. Your school's DSO authorizes it.", rel: ["opt"] },
  { slug: "h-1b-cap-gap", term: "H-1B cap-gap", def: "Protection that extends an F-1 student's status and OPT work authorization between the end of OPT and the October 1 start of an H-1B, when the employer filed a timely cap petition.", rel: ["opt", "stem-opt"] },
  { slug: "e-verify", term: "E-Verify", def: "A US government system employers use to confirm a new hire's eligibility to work. STEM OPT requires an E-Verify employer.", rel: ["stem-opt"] },
  { slug: "return-offer", term: "Return offer", def: "A full-time job offer made to an intern at the end of the internship. At many large employers it is the main path into the new grad class.", rel: ["internship", "superday"] },
  { slug: "superday", term: "Superday", def: "A final round of several back-to-back interviews in one day, common in banking, trading and consulting.", rel: ["return-offer"] },
  { slug: "internship", term: "Internship", def: "A temporary, usually paid role where a student does real work for a company, most often over the summer. Large employers recruit summer interns up to a year ahead.", rel: ["externship", "return-offer"] },
  { slug: "exploding-offer", term: "Exploding offer", def: "A job offer with a short deadline to accept, sometimes one to two weeks. Many university career centers publish guidelines on reasonable offer deadlines.", rel: ["return-offer"] }
];

const GUIDES = [
  { slug: "new-grad-recruiting-timeline", title: "The 2027 new grad recruiting timeline", stage: "Junior summer to senior fall", mins: 8,
    sum: "Most large tech, finance and consulting employers open new grad roles between July and October and fill them by December. Apply in the first 3–4 weeks a role is open.",
    body: [
      ["When each industry opens", "<p>Recruiting runs on industry calendars, not on your graduation date. Across the demo listings on Yapply, the earliest roles open in July (trading and banking), the bulk open in August and September (big tech, consulting), and smaller companies hire year-round.</p><table><tr><th>Industry</th><th>Opens</th><th>Mostly closed by</th></tr><tr><td>Trading and banking</td><td>July</td><td>September</td></tr><tr><td>Consulting</td><td>July–August</td><td>September–October</td></tr><tr><td>Big tech</td><td>August–September</td><td>November–December</td></tr><tr><td>Startups and mid-size</td><td>Year-round</td><td>Rolling</td></tr></table>"],
      ["Your month-by-month plan", "<ol><li><b>June–July:</b> finish your resume, build a target list of 40–60 companies, ask for referrals.</li><li><b>August–September:</b> apply in the first week roles open. Track every application.</li><li><b>October–November:</b> interviews, superdays, offers. Ask for deadline extensions politely if you need to compare.</li><li><b>December–April:</b> keep applying to rolling and mid-size employers; this is when many startups hire.</li></ol>"],
      ["What to do if you are behind", "<p>Companies with rolling hiring keep posting into spring. Filter for roles posted in the last 7 days and apply the same day.</p>"]
    ] },
  { slug: "opt-cpt-guide", title: "OPT and CPT for new grads: timeline and checklist", stage: "Before graduation (international students)", mins: 7,
    sum: "You can file for post-completion OPT up to 90 days before your program end date and no later than 60 days after it. CPT is authorized by your school during your program.",
    body: [
      ["OPT vs CPT", "<p><b>CPT</b> is for internships or co-ops that are part of your curriculum, during your program, and is authorized by your school's DSO. <b>OPT</b> is work authorization related to your major, most often used for 12 months after graduation.</p>"],
      ["Post-completion OPT timeline", "<ol><li>Ask your DSO to recommend OPT in SEVIS and issue an updated I-20.</li><li>File Form I-765 within the window: up to 90 days before your program end date and no later than 60 days after it, and within 30 days of the DSO recommendation.</li><li>Do not start work until you receive the EAD card and the start date on it has arrived.</li></ol>"],
      ["STEM OPT extension", "<p>Graduates with an eligible STEM degree can apply for a 24-month extension, with an employer enrolled in E-Verify and a training plan (Form I-983).</p>"],
      ["Check the source", "<p>Rules change. Confirm every date with your school's international office and <a href=\"https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students\">USCIS</a>. Last checked: " + "Nov 24, 2026" + ".</p>"]
    ] },
  { slug: "latin-honors", title: "Summa, magna, cum laude: what they mean and how to list them", stage: "Before graduation", mins: 5,
    sum: "Cum laude, magna cum laude and summa cum laude are Latin honors, from lowest to highest. Each school sets its own GPA or class-rank cutoffs.",
    body: [
      ["The three honors", "<table><tr><th>Honor</th><th>Meaning</th><th>Common cutoff (varies)</th></tr><tr><td>Cum laude</td><td>With honor</td><td>About 3.5 GPA</td></tr><tr><td>Magna cum laude</td><td>With great honor</td><td>About 3.7–3.8 GPA</td></tr><tr><td>Summa cum laude</td><td>With highest honor</td><td>About 3.9+ GPA</td></tr></table><p class=\"small muted\">Cutoffs are examples. Your registrar publishes the real ones.</p>"],
      ["How to write it on a resume", "<p>Put it on the degree line, in italics or plain text: <span class=\"mono\">B.S. Computer Science, magna cum laude, May 2027</span>. Do not list it before it is awarded; write <span class=\"mono\">On track for magna cum laude</span> only if your school's policy makes it likely.</p>"]
    ] },
  { slug: "first-offer-negotiation", title: "How to negotiate your first offer", stage: "Offer stage", mins: 6,
    sum: "New grad offers are often negotiable on signing bonus and start date even when base salary is fixed. Ask once, in writing, with a specific number and a reason.",
    body: [
      ["What moves", "<ul><li><b>Signing bonus</b> and <b>relocation</b> move most often.</li><li><b>Start date</b> almost always moves.</li><li><b>Base salary</b> is often banded for new grad classes at large companies.</li></ul>"],
      ["A script you can adapt", "<p class=\"out\">Thank you again for the offer. I'm excited about the team. I have a competing offer with a total first-year value of $X. Is there flexibility on the signing bonus to bring this closer? If so, I'm ready to sign this week.</p>"]
    ] },
  { slug: "h1b-for-new-grads", title: "H-1B for new grads: how the lottery works", stage: "Offer stage (international students)", mins: 6,
    sum: "Employers register you in March; USCIS runs the selection; if selected, the petition is filed from April and work in H-1B status starts October 1. Cap-gap can bridge OPT to October.",
    body: [
      ["The yearly cycle", "<ol><li><b>March:</b> your employer submits an electronic registration.</li><li><b>End of March:</b> USCIS announces selections.</li><li><b>April–June:</b> selected registrations become full petitions.</li><li><b>October 1:</b> H-1B employment can start.</li></ol>"],
      ["Numbers to know", "<p>The regular cap is 65,000, plus 20,000 for holders of a US master's degree or higher. Check <a href=\"https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations\">USCIS</a> for the current year's rules and fees.</p>"],
      ["Choose employers that sponsor", "<p>Use the <a href=\"#tool-h1b-sponsor-checker\">H-1B sponsor checker</a> and the <a href=\"#h1b-jobs\">H-1B jobs</a> pages to focus on companies with a record of sponsoring new grads.</p>"]
    ] },
  { slug: "externship-vs-internship", title: "Externship vs internship: which one you need", stage: "Freshman to junior year", mins: 4,
    sum: "An externship is short shadowing, often unpaid; an internship is paid project work over weeks or months. Externships help you choose a field; internships get you return offers.",
    body: [
      ["Side by side", "<table><tr><th></th><th>Externship</th><th>Internship</th></tr><tr><td>Length</td><td>1 day to a few weeks</td><td>8–12 weeks, often summer</td></tr><tr><td>Paid</td><td>Usually not</td><td>Usually</td></tr><tr><td>Work</td><td>Observe</td><td>Own a project</td></tr><tr><td>Leads to</td><td>Clarity, contacts</td><td>Return offers</td></tr></table>"]
    ] }
];

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
  { slug: "sprout", name: "Sprout", what: "Swipe-to-apply mobile app: swipe right and AI tailors a resume and applies. Paid plans start at $19.99/month for 80 applications per public pricing.", strong: ["Very fast, mobile-first", "Asks a few questions before applying"], diff: "Sprout optimizes for volume. Yapply optimizes for fit: fewer, better-matched applications built from a deeper profile." },
  { slug: "teal", name: "Teal", what: "Job search CRM with a resume builder, keyword matching and a Chrome extension to save jobs.", strong: ["Strong job tracker", "Resume keyword matching"], diff: "Teal is built for organized job seekers at any career stage. Yapply is built for students with thin resumes who need help finding what to say." },
  { slug: "jobcopilot", name: "JobCopilot", what: "Auto-apply service that submits applications on your behalf based on your preferences.", strong: ["Hands-off application volume"], diff: "Yapply keeps a review step before every application, because mass auto-applying can hurt response rates and get flagged by job boards." }
];

const FAQ = [
  ["What is Yapply?", "A voice-first career agent for US college students and new grads. You talk with it for about 10 minutes, it builds a career profile from your real experiences, then tailors resumes, matches you to jobs and helps you apply."],
  ["Do I need a finished resume to start?", "No. The voice conversation is designed for students with thin or empty resumes. You can also upload a resume and Yapply will ask about what's missing."],
  ["Does Yapply apply to jobs without asking me?", "No. You review every tailored resume and application before it's sent."],
  ["Can I filter for H-1B sponsorship?", "Yes. Every job shows a sponsorship label based on the job description and the employer's public filing history."],
  ["Is my voice recording stored?", "This prototype does not record anything. The production policy will be published in the Privacy Policy before launch."],
  ["Which schools and majors is Yapply for?", "Any US college student or recent grad. The job database covers tech, data, finance, consulting, engineering and design roles."],
  ["How is Yapply different from Simplify or Jobright?", "See the side-by-side comparisons in Compare."],
  ["Is there a mobile app?", "iOS and Android apps are in development. Join the waitlist on the Mobile App page."]
];

const FEATURES = [
  { slug: "voice-career-profile", name: "Voice Career Profile", one: "Talk for 10 minutes. Yapply builds a profile from your real story.", kw: "ai career coach", bullets: ["Follow-up questions draw out numbers, tools and decisions", "Works for thin resumes: class projects, clubs, part-time jobs", "You review and edit everything it learned"] },
  { slug: "ai-resume-tailor", name: "AI Resume Tailor", one: "A resume rewritten for each job, using only what you said is true.", kw: "ai resume builder", bullets: ["Matches the job's keywords without inventing experience", "Shows a before and after diff for every change", "Exports clean, ATS-readable PDF and DOCX"] },
  { slug: "job-match", name: "Job Match", one: "New grad and internship roles ranked by fit, sponsorship and deadline.", kw: "ai job search", bullets: ["Only entry-level and intern roles", "H-1B sponsorship label on every job", "Deadline alerts so you apply in the first week"] },
  { slug: "auto-apply", name: "Auto Apply (with review)", one: "One click to apply, after you approve the tailored application.", kw: "auto apply jobs", bullets: ["Fills common ATS forms", "Drafts answers to application questions from your profile", "Nothing is sent without your approval"] },
  { slug: "ai-mock-interview", name: "AI Mock Interview", one: "Practice out loud with an interviewer that interrupts and follows up.", kw: "mock interview", bullets: ["Full-duplex voice: it can interrupt like a real interviewer", "Questions based on the job and your own stories", "Feedback on structure, specifics and pace"] }
];
