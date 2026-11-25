// ---------- ICP ----------
// From "竞品卖点与 ICP 对比 · yapply ICP 收窄建议": people whose experience is worth more than their resume shows.
const ICP = {
  A: { tag: "No relevant internship", who: "New grads without a relevant internship", pain: "“All I have is class projects, a club and a campus job.”", fix: "Yapply asks the follow-up questions that turn projects, research and part-time work into bullets with numbers and impact.", before: "Member of the Data Science Club.", after: "Built a churn model on 2,400 survey responses with 3 club members; the advising office now uses it to plan outreach.", link: ["report-a", "See Maya's call report"] },
  B: { tag: "International students", who: "International students graduating in the US", pain: "“I explain my work better out loud than in written English.”", fix: "Talk in your own words. Yapply writes natural, recruiter-ready English and flags employers likely to sponsor H-1B, so your short OPT window isn't wasted.", before: "Responsible for data analysis in lab.", after: "Analyzed 18 months of sensor data in Python, finding a calibration error that cut the lab's re-test rate by 30%.", link: ["report-b", "See Lin's call report"] },
  C: { tag: "First job off-track", who: "Grads 0–3 years out whose first job isn't in their field", pain: "“I work in retail (or support, or admin). Recruiters don't see me as a data analyst.”", fix: "Yapply finds the transferable results in your current job and rewrites them in the language of the role you want.", before: "Cashier and shift lead at a grocery store.", after: "Tracked weekly sales in Excel for a 12-person store and flagged 3 slow products, cutting waste by $1.2K a month.", link: ["report-c", "See Diego's call report"] },
  D: { tag: "Changing direction", who: "Early-career people changing direction", pain: "“My experience is real, but it points the wrong way.”", fix: "Tell Yapply where you're going. It turns your old experience into evidence for the new direction, job by job.", before: "Operations coordinator managing vendor schedules.", after: "Owned a scheduling system for 40 vendors, reducing missed deliveries 25%, the product thinking behind a move into PM.", link: ["report-d", "See Priya's call report"] }
};
const SIGNALS = [
  ["Your experience doesn't “look like experience”", "Mostly class projects, research, clubs, part-time or small-company work, no big-name internship."],
  ["Your bullets are duties, not results", "“Responsible for…”, “Participated in…”, almost no numbers."],
  ["You need a cross-over story", "The job you want isn't on the same line as what you've done."],
  ["You speak better than you write", "English isn't your first language, or writing about yourself is hard, but you can explain it out loud."],
  ["You apply but hear nothing back", "Plenty of applications, few interviews: the bottleneck is the resume, not the interview."]
];
const STATS = [
  ["~80% vs 54%", "of graduating seniors rate their own communication as very or extremely proficient, vs 54% of employers who say the same of new grads", "https://naceweb.org/career-readiness/competencies/are-college-graduates-career-ready", "NACE"],
  ["38%", "of the Class of 2023 graduated without an internship (62% had one)", "https://naceweb.org/about-us/press/b75773e6-def0-4df8-9c6d-8416df61dba1", "NACE, 2023"],
  ["52%", "of recent grads are underemployed a year after graduation; 73% of them are still underemployed 10 years later", "https://www.burningglassinstitute.org/s/Talent-Disrupted-03052024.pdf", "Strada & Burning Glass, 2024"]
];

// ---------- FEATURES (kws = target keywords with US monthly volume / KD from the gap export) ----------
const FEATURES = [
  { slug: "ai-resume-builder", name: "AI Resume Builder", flag: true, short: "Talk. Your resume writes itself live.",
    title: "Free AI Resume Builder: Talk, and It Writes Live", desc: "Yapply's AI resume builder interviews you by voice and writes your resume live. For new grads, international students and career changers.",
    h1: "The AI resume builder that interviews you first", pain: "You've done more than your resume says. Nobody asked the right questions.",
    one: "Talk for 10 minutes. Yapply asks the follow-ups a recruiter would ask, and writes each answer onto your resume while you speak, with the numbers you forgot you had.",
    kws: [["ai resume builder", 22200, 88], ["ai resume builder free", 8100, 89], ["resume ai", 6600, 82], ["ai resume", 5400, 46], ["resume builder ai", 5400, 81], ["ai powered resume builder", 5400, 80]],
    answer: "Yapply is a voice AI resume builder: you talk about your classes, projects and jobs, it asks follow-up questions, and every answer is written onto your resume in real time as a strong, quantified bullet. Correct it out loud. When the conversation ends, the resume is done.",
    bullets: [["It asks, you answer", "“How many people used it? What changed after?” Follow-ups pull out the numbers and impact recruiters look for."], ["Written while you talk", "Each answer becomes a bullet on screen within seconds, starting with a strong verb."], ["Correct it out loud", "Interrupt any time: “no, 300 users” or “that was a team project.” The line updates."], ["Nothing invented", "Every line comes from what you said. Export a one-page, ATS-friendly PDF or DOCX."]],
    for: { A: "Turns class projects, research and clubs into real experience.", B: "Speak naturally; get fluent, recruiter-ready English.", C: "Finds the results hidden in a job outside your field.", D: "Frames your past work for where you're going." },
    vs: "Template builders and swipe-to-apply apps assume you already know what to write. Yapply is for people who don't yet: it finds the material first, then writes it." },
  { slug: "ai-resume-review", name: "AI Resume Review", short: "Talk through your resume, fix it live.",
    title: "AI Resume Review & Checker That Rewrites Weak Bullets", desc: "Upload your resume. Yapply scores it, asks about every weak bullet and rewrites it live from your answers. Free AI resume checker for new grads.",
    h1: "AI resume review that fixes what it finds", pain: "Applying everywhere and hearing nothing back? The bottleneck is your resume.",
    one: "Upload your resume. Yapply scores it, then turns each weak bullet into a question and rewrites the line while you answer.",
    kws: [["how to make a resume stand out", 9900, 37], ["resume review", 3600, 51], ["ai resume checker", 2900, 57], ["ai resume reviewer", 390, 26]],
    answer: "AI Resume Review checks your resume for ATS readability, numbers and verb strength, then asks you about every weak line (“what was the result?”) and rewrites it from your spoken answer, so the fix uses facts only you know.",
    bullets: [["A score in seconds", "ATS readability, numbers per bullet, weak verbs, length."], ["Questions, not red marks", "Each duty-style bullet becomes one question you answer out loud."], ["Rewritten as you talk", "The new line replaces the old one on screen. Keep or undo."]],
    for: { A: "Shows which bullets read like duties, not results.", B: "Fixes phrasing that sounds translated.", C: "Flags bullets that hide transferable results.", D: "Spots lines that point toward your old field." },
    vs: "Resume checkers tell you what's wrong. Yapply asks the question that fixes it, then rewrites the line." },
  { slug: "resume-tailor", name: "Resume Tailor", short: "One resume per job, in one sentence.",
    title: "Tailor Your Resume to Any Job Description with AI", desc: "Say “tailor it for this job.” Yapply rewrites your resume to the job description using only true facts from your conversation, with a line-by-line diff.",
    h1: "Tailor your resume to every job description", pain: "One resume for every job reads like it was written for none of them.",
    one: "Pick a job and say “tailor it.” Yapply rewrites your resume for that job description, using only facts from your conversation, and shows every change.",
    kws: [["tailor resume", 1000, 50], ["tailor resume to job description", 320, 43], ["can ai tailor my resume to a job posting", 320, 17]],
    answer: "Resume Tailor rewrites your resume for one job: it mirrors the job description's keywords where they're true for you, reorders bullets by relevance and shows a before-and-after diff. It never adds experience you didn't describe.",
    bullets: [["Keywords that are true", "Matches the job's skills and terms only where your conversation backs them up."], ["See every change", "Line-by-line diff. Accept or reject by click or by voice."], ["A version per application", "Keeps each tailored resume with the job it was made for."]],
    for: { A: "Points class projects at each job's requirements.", B: "Keeps your English natural while matching the job's terms.", C: "Re-frames your current job for each target role.", D: "Writes a new-direction version without losing the facts." },
    vs: "Most tailoring tools reshuffle the text you typed. Yapply tailors from the whole conversation, which holds far more than your resume ever did." },
  { slug: "ai-cover-letter", name: "AI Cover Letter", short: "A cover letter from a 2-minute chat.",
    title: "AI Cover Letter Generator That Sounds Like You", desc: "Tell Yapply in two minutes why you want the job. It writes a specific, one-page cover letter in your voice. Free AI cover letter generator for new grads.",
    h1: "The AI cover letter generator that sounds like you", pain: "Template cover letters sound like templates. Recruiters can tell.",
    one: "Say in two minutes why you want this job. Yapply writes a one-page cover letter from your words and the stories already on your resume.",
    kws: [["cover letter generator", 9900, 74], ["ai cover letter generator", 2900, 74], ["chatgpt cover letter", 2400, 21], ["how to end a cover letter", 3600, 14]],
    answer: "Yapply writes cover letters from what you say out loud plus the stories already on your resume, so each letter names the company, the role and one concrete result, in your own voice.",
    bullets: [["Two-minute voice brief", "Say why this company. Yapply asks one follow-up."], ["Your words, edited", "Keeps your phrasing so it doesn't read like a template."], ["One page, specific", "Opening, one proof story, a clear close."]],
    for: { A: "Explains why projects prepared you for the role.", B: "Turns what you said in your own words into fluent English.", C: "Explains your path into the field in two lines.", D: "Tells the career-change story recruiters need to hear." },
    vs: "Generators fill blanks in a template. Yapply starts from your real reason for wanting the job." },
  { slug: "ai-mock-interview", name: "AI Mock Interview", short: "Practice with an interviewer that interrupts.",
    title: "AI Mock Interview with a Real-Time Voice Interviewer", desc: "Practice behavioral and role interviews out loud with a full-duplex AI interviewer that asks about your own resume and interrupts vague answers.",
    h1: "AI mock interviews that feel like the real thing", pain: "You know the answer. Then the interviewer asks a follow-up and it falls apart.",
    one: "Practice out loud with a full-duplex voice interviewer that follows up and interrupts, using questions built from your resume and the job.",
    kws: [["mock interview", 26600, null], ["behavioral interview questions", 12100, 43], ["google interview warmup", 2900, 21], ["follow up email after interview", 6600, 37]],
    answer: "Yapply's mock interviewer talks with you in real time, asks behavioral and role questions drawn from your own resume, interrupts vague answers like a real interviewer, and gives feedback on structure, specifics and pace.",
    bullets: [["Full-duplex voice", "It interrupts and follows up, like a real interviewer."], ["Questions from your resume", "It asks about your projects, not generic prompts."], ["Feedback that sticks", "Better answers become better resume lines too."]],
    for: { A: "Practice talking about projects like real work.", B: "Build confidence answering in English under pressure.", C: "Rehearse explaining why your current job is relevant.", D: "Nail “why are you changing direction?”" },
    vs: "Most practice tools play a question and record you. Yapply holds a live conversation." },
  { slug: "job-match-auto-apply", name: "Job Match & Auto Apply", short: "Matched roles, applied with your approval.",
    title: "AI Job Search & Auto Apply for Entry-Level Jobs", desc: "Entry-level and internship roles matched to your resume, with H-1B sponsorship labels and deadlines. Approve a tailored application and Yapply applies.",
    h1: "AI job search and auto apply, after your resume is ready", pain: "Sending 200 applications with a weak resume gets you 200 rejections.",
    one: "New grad and intern roles ranked by fit, sponsorship and deadline. Approve a tailored application and Yapply submits it.",
    kws: [["ai job search", 4400, 85], ["entry level remote jobs", 22200, 34], ["internship opportunities for college students", 12100, 31], ["jobcopilot", 6600, 34]],
    answer: "Yapply matches you to entry-level and internship roles using your conversation profile, labels H-1B sponsorship and deadlines, and applies with a tailored resume after you approve each application.",
    bullets: [["Entry-level only", "Internships and new grad roles, refreshed daily."], ["Sponsorship labels", "H-1B likelihood on every role."], ["Review before apply", "Nothing is sent without your OK."]],
    for: { A: "Finds roles that hire without prior internships.", B: "Filters for employers likely to sponsor H-1B.", C: "Surfaces entry-level roles in your target field.", D: "Matches on your new direction, not just your last title." },
    vs: "Sprout, Sorce and JobCopilot make applying the whole product. For Yapply it's the last step: the resume written in your conversation is what makes each application worth sending." }
];
