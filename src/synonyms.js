// ---------- RESUME SYNONYMS ----------
// One page per verb. Built around what searchers want: (1) a better word fast, (2) the right word for their
// situation, (3) examples for their field, (4) a fixed bullet, (5) reassurance they aren't overclaiming.
// kw = target queries with US monthly volume from the gap export (null = not in export).
const S = (word, nuance, ex) => ({ word, nuance, ex });
const VERBS = {
  created: {
    kw: [["created synonym", 14800], ["synonyms for created", 2900], ["synonym for created", 2900]],
    signals: "that you made something new", keep: "Keep it when what you made is unusual and the object carries the weight (\"Created a peer-tutoring program now run by the department\"). Replace it when the bullet sounds like a school assignment.",
    best: ["built", "launched", "designed", "established", "developed", "authored"],
    groups: [
      { ctx: "You made a product, tool or app", words: [S("Built", "hands-on making; best for software, models, dashboards", "Built a Python script that cut weekly report prep from 3 hours to 20 minutes."), S("Launched", "you made it AND put it in front of users", "Launched a club website used by 400 members in its first month."), S("Prototyped", "early version to test an idea", "Prototyped a budgeting app in Figma and tested it with 12 classmates.")] },
      { ctx: "You started a program, process or group", words: [S("Established", "something lasting that others keep using", "Established a mentoring program pairing 30 freshmen with upperclassmen."), S("Founded", "you started an organization", "Founded the campus product club, growing it to 80 members in a year."), S("Introduced", "you brought a new practice into an existing team", "Introduced weekly stand-ups that cut missed deadlines by half.")] },
      { ctx: "You wrote or produced content", words: [S("Authored", "written work: reports, papers, guides", "Authored a 20-page market report used in the client's pricing decision."), S("Produced", "media, events or deliverables", "Produced 12 short videos that brought 15K views to the admissions page."), S("Drafted", "first versions others reviewed", "Drafted 30+ customer emails adopted as team templates.")] }
    ],
    misuse: [["Created PowerPoint slides for meetings.", "Built a 15-slide quarterly review deck the director presented to leadership.", "Names who used it and why it mattered."], ["Created a website for a class.", "Launched a React site for a 4-person class project, earning the top grade of 60 teams.", "Says what you built with and how it compared."]],
    byField: { "Software & data": ["Built a REST API in Flask serving 2K requests a day.", "Developed a SQL pipeline that refreshed 5 dashboards nightly."], "Business & marketing": ["Launched an Instagram series that grew followers from 1.2K to 4.5K.", "Authored a competitor analysis used in a client pitch."], "Clubs & part-time jobs": ["Founded a study group that 25 students joined each week.", "Established an inventory checklist that cut closing time by 15 minutes."] },
    faq: [["Is \"created\" a weak resume word?", "Not weak, just vague. It says you made something but not what kind of making. Swap it for the verb that names the work: built, launched, designed, established."], ["What's the best synonym for created on a resume?", "\"Built\" for things that work (apps, models, dashboards), \"launched\" when people used it, \"established\" for programs that lasted."]],
    rel: ["developed", "designed", "built", "led"]
  },
  developed: {
    kw: [["developed synonym", 14800], ["another word for developed", 2900]],
    signals: "that you made or improved something over time", keep: "It's fine in software (\"developed features\") and for skills or curricula. Replace it when it's your third \"developed\" or when you mean you built, wrote or grew something.",
    best: ["engineered", "built", "implemented", "designed", "shipped", "formulated"],
    groups: [
      { ctx: "Software and technical work", words: [S("Engineered", "technical depth and design decisions", "Engineered a caching layer that cut page load time by 40%."), S("Implemented", "you turned a plan or spec into working code", "Implemented OAuth login for a 3,000-user campus app."), S("Shipped", "it reached real users", "Shipped 6 features to production during a 12-week internship.")] },
      { ctx: "Plans, strategies and models", words: [S("Formulated", "you worked out a plan or method", "Formulated a pricing model that raised event revenue 18%."), S("Designed", "you decided how it should work", "Designed a survey of 400 students to measure dining satisfaction."), S("Devised", "a clever or new approach", "Devised a scheduling system that resolved 90% of shift conflicts.")] },
      { ctx: "People and skills", words: [S("Cultivated", "relationships over time", "Cultivated relationships with 15 local sponsors for the annual fundraiser."), S("Trained", "you developed other people", "Trained 8 new tutors on the center's session format."), S("Strengthened", "you improved something that existed", "Strengthened onboarding docs, cutting new-volunteer questions by half.")] }
    ],
    misuse: [["Developed skills in Excel.", "Modeled a 3-year budget in Excel with scenario analysis for the club treasurer.", "Show the skill in use, don't announce it."], ["Developed an app.", "Shipped a Flutter app for campus parking used by 600 students.", "Adds the tool, the user and the scale."]],
    byField: { "Software & data": ["Implemented a recommendation feature that lifted clicks 12% in an A/B test.", "Engineered a data-cleaning script for 1M survey rows."], "Business & marketing": ["Formulated a go-to-market plan for a student startup competition, placing 2nd of 40.", "Designed a referral program that brought in 120 signups."], "Clubs & part-time jobs": ["Trained 5 new hires on the point-of-sale system.", "Devised a shift-swap sheet the whole store adopted."] },
    faq: [["Can I use \"developed\" on a software engineering resume?", "Yes, it's standard. Just vary it: implemented, engineered, shipped, built."], ["What's another word for developed skills?", "Usually none: show the skill in a bullet instead (\"Modeled a budget in Excel\") and list the skill in Skills."]],
    rel: ["created", "designed", "improved", "built"]
  },
  managed: {
    kw: [["managed synonym", 4400]],
    signals: "that you were responsible for something", keep: "Keep it for real ownership of a budget, a team or a project. Replace it when you mean you ran a task, or when \"managed\" hides what you actually did.",
    best: ["led", "ran", "oversaw", "coordinated", "owned", "directed"],
    groups: [
      { ctx: "You were in charge of people", words: [S("Led", "you set direction and people followed", "Led a 6-person team to deliver a capstone app for a local nonprofit."), S("Supervised", "you oversaw others' daily work", "Supervised 4 student workers across evening library shifts."), S("Mentored", "you developed someone", "Mentored 3 freshmen through their first internship applications.")] },
      { ctx: "You owned a project, budget or process", words: [S("Owned", "end-to-end responsibility", "Owned the club's $12K annual budget, finishing 8% under plan."), S("Ran", "plain and active; good for events and programs", "Ran a 3-day hackathon for 150 participants."), S("Oversaw", "you watched over the work of a group", "Oversaw logistics for a 500-person career fair.")] },
      { ctx: "You kept many parts moving", words: [S("Coordinated", "you brought people or tasks together", "Coordinated 20 volunteers across 4 food-drive sites."), S("Administered", "systems, accounts or programs", "Administered Google Workspace for 60 club members."), S("Handled", "a steady flow of tasks", "Handled 40+ customer inquiries a week with a 95% satisfaction score.")] }
    ],
    misuse: [["Managed social media.", "Ran 3 social accounts and grew followers 3x in one semester.", "\"Managed\" hid the result."], ["Managed a team project.", "Led a 4-person team through a 10-week project, delivering 2 weeks early.", "Says your role and the outcome."]],
    byField: { "Software & data": ["Owned the data pipeline for a 3-person research project.", "Coordinated releases across 2 teams during a summer internship."], "Business & marketing": ["Oversaw a $5K campus ad budget for a startup client.", "Ran a 6-week email campaign with a 41% open rate."], "Clubs & part-time jobs": ["Supervised 4 student workers on evening shifts.", "Coordinated a 200-person charity run."] },
    faq: [["Is \"managed\" OK if I didn't manage people?", "Yes, you can manage a budget or a project. But if \"managed\" makes it sound like you had reports and you didn't, use \"owned\" or \"ran\"."], ["What's a stronger word for managed?", "Led (people), owned (outcomes), ran (programs), coordinated (many moving parts)."]],
    rel: ["led", "organized", "coordinated", "maintained"]
  },
  led: {
    kw: [["led synonym", null]],
    signals: "that others followed your direction", keep: "It's one of the strongest resume verbs, so keep it, but only where you actually directed people or decisions.",
    best: ["headed", "spearheaded", "directed", "guided", "steered", "championed"],
    groups: [
      { ctx: "You led a team", words: [S("Headed", "formal lead of a group", "Headed a 5-person capstone team that delivered a forecasting model."), S("Directed", "you gave instructions and set priorities", "Directed 12 volunteers during a 2-day conference."), S("Captained", "sports or competition teams", "Captained the debate team to the regional semifinals.")] },
      { ctx: "You drove an initiative", words: [S("Spearheaded", "you started and pushed it forward", "Spearheaded a recycling initiative adopted by 4 dorms."), S("Championed", "you argued for it and won support", "Championed a mental-health week that drew 600 students."), S("Steered", "you guided direction through change", "Steered the club's move to a new budget system.")] },
      { ctx: "You guided individuals", words: [S("Guided", "you helped others find their way", "Guided 20 incoming students through orientation week."), S("Coached", "skill-building over time", "Coached 6 peers for case interviews; 4 got offers."), S("Mentored", "long-term development", "Mentored 2 junior analysts on SQL best practices.")] }
    ],
    misuse: [["Led meetings.", "Ran weekly 10-person planning meetings that set the semester's event calendar.", "Leading a meeting isn't leading a team; say what the meetings decided."], ["Led a project for class.", "Headed a 4-person class project, assigning tasks and delivering a working prototype a week early.", "Shows how you led."]],
    byField: { "Software & data": ["Led a 3-engineer squad that shipped search filters in 4 weeks.", "Spearheaded unit-test adoption across the intern team."], "Business & marketing": ["Headed a 6-person case team to 1st place in a consulting competition.", "Championed a referral campaign that doubled signups."], "Clubs & part-time jobs": ["Captained the intramural soccer team to a league title.", "Directed a 40-person theater production."] },
    faq: [["Can I say \"led\" if I wasn't the official leader?", "Only if you directed the work. Otherwise use \"coordinated\" or \"contributed to\" and say what you did."], ["How many times can I use \"led\"?", "Once or twice per resume. Rotate: headed, spearheaded, directed, guided."]],
    rel: ["managed", "organized", "collaborated", "improved"]
  },
  collaborated: {
    kw: [["collaborate synonym", 9900], ["synonym for collaborate", 5400], ["collaborated synonym", 2400]],
    signals: "that you worked with others", keep: "Keep it when the collaboration itself is the point (across teams, with clients). Replace it when it's covering for \"I was on a team\" without saying what you did.",
    best: ["partnered", "co-led", "teamed up", "liaised", "contributed", "joined forces"],
    groups: [
      { ctx: "Working across teams or functions", words: [S("Partnered", "equal working relationship with another group", "Partnered with the design team to cut checkout steps from 5 to 3."), S("Liaised", "you were the link between groups", "Liaised between 3 student orgs to plan a shared career fair."), S("Aligned", "you got groups to agree", "Aligned engineering and marketing on a launch date for a campus app.")] },
      { ctx: "Sharing ownership", words: [S("Co-led", "joint leadership", "Co-led a 10-person hackathon team that won Best Use of Data."), S("Co-authored", "joint writing", "Co-authored a research poster presented at the state conference."), S("Co-founded", "started something together", "Co-founded a tutoring startup serving 50 high-school students.")] },
      { ctx: "Your part in a group effort", words: [S("Contributed", "your piece of a bigger result", "Contributed the data analysis for a 5-person policy report."), S("Supported", "you enabled others' work", "Supported 3 analysts by automating weekly data pulls."), S("Assisted", "use sparingly; pair with specifics", "Assisted the PI in running 40 lab experiments.")] }
    ],
    misuse: [["Collaborated with team members on projects.", "Partnered with 2 engineers to ship a booking feature used by 300 members.", "Says who, what and the result."], ["Worked collaboratively in a team environment.", "Contributed the SQL analysis behind a 4-person team's winning case recommendation.", "\"Team environment\" is filler; your contribution isn't."]],
    byField: { "Software & data": ["Partnered with product to define metrics for a new onboarding flow.", "Co-authored a design doc reviewed by 6 engineers."], "Business & marketing": ["Liaised with 5 local sponsors to fund a campus event.", "Aligned sales and marketing on one lead definition."], "Clubs & part-time jobs": ["Co-founded a campus food-recovery chapter.", "Contributed weekly posts to the club newsletter (1,200 readers)."] },
    faq: [["What's a professional word for collaborate?", "Partnered, liaised, aligned, co-led. Pick the one that says what the collaboration looked like."], ["Should \"team player\" be on my resume?", "No. Show teamwork in bullets (\"Partnered with...\") instead of claiming it."]],
    rel: ["helped", "led", "organized", "provided"]
  },
  improved: {
    kw: [["improved synonym", null]],
    signals: "that something got better because of you", keep: "\"Improved\" is fine when followed by a number. Without one, swap for the verb that says how it improved.",
    best: ["increased", "streamlined", "optimized", "boosted", "strengthened", "accelerated"],
    groups: [
      { ctx: "Faster or simpler", words: [S("Streamlined", "fewer steps, less waste", "Streamlined check-in from 5 steps to 2, cutting lines by 10 minutes."), S("Accelerated", "faster timelines", "Accelerated report delivery from weekly to daily with automated queries."), S("Automated", "removed manual work", "Automated invoice entry, saving 6 hours a week.")] },
      { ctx: "Better numbers", words: [S("Increased", "a metric went up", "Increased newsletter open rate from 22% to 38%."), S("Boosted", "energetic; good for growth", "Boosted event attendance 2x with targeted class announcements."), S("Optimized", "tuned for performance", "Optimized SQL queries, cutting dashboard load time by 60%.")] },
      { ctx: "Better quality", words: [S("Strengthened", "made more robust", "Strengthened data validation, reducing entry errors by 30%."), S("Refined", "polished something that existed", "Refined the club's interview rubric used for 80 applicants."), S("Upgraded", "moved to something better", "Upgraded the lab's tracking sheet to an Airtable base.")] }
    ],
    misuse: [["Improved the website.", "Optimized image loading, cutting page load time from 4s to 1.5s.", "Say what changed and by how much."], ["Improved customer satisfaction.", "Raised post-visit satisfaction from 4.1 to 4.6 by adding follow-up texts.", "Name the measure and the method."]],
    byField: { "Software & data": ["Optimized a pandas pipeline to run in 2 minutes instead of 25.", "Automated test runs on every pull request."], "Business & marketing": ["Increased email click rate 35% by segmenting by class year.", "Streamlined the sponsorship process into one form."], "Clubs & part-time jobs": ["Streamlined closing tasks, saving 15 minutes a shift.", "Boosted club retention from 50% to 75% with a buddy system."] },
    faq: [["What if I don't have a number?", "Estimate honestly (\"about 10 hours a week\") or describe scale (\"for all 3 locations\"). Talking it through usually surfaces a number."], ["Is \"improved\" too weak?", "Only without a result. \"Improved X by Y\" is strong."]],
    rel: ["increased", "developed", "analyzed", "ensured"]
  },
  analyzed: {
    kw: [["analyzed synonym", null]],
    signals: "that you studied data or information", keep: "Fine for data roles, once. Vary it and always say what the analysis led to.",
    best: ["evaluated", "assessed", "modeled", "examined", "investigated", "forecasted"],
    groups: [
      { ctx: "Working with data", words: [S("Modeled", "built a statistical or financial model", "Modeled churn drivers across 2,400 survey responses in Python."), S("Quantified", "put a number on something", "Quantified the cost of late shipments at $40K a year."), S("Forecasted", "predicted future values", "Forecasted weekly demand within 8% error for a campus café.")] },
      { ctx: "Judging options", words: [S("Evaluated", "compared against criteria", "Evaluated 5 CRM vendors and recommended one that saved $3K a year."), S("Assessed", "judged condition or risk", "Assessed 30 suppliers for compliance risk."), S("Benchmarked", "compared to peers or standards", "Benchmarked tuition pricing against 12 peer schools.")] },
      { ctx: "Digging into a problem", words: [S("Investigated", "found the cause", "Investigated a 20% signup drop and traced it to a broken form."), S("Examined", "careful review", "Examined 3 years of sales data to find seasonal patterns."), S("Audited", "formal check for errors", "Audited 1,500 expense records, recovering $2K in duplicates.")] }
    ],
    misuse: [["Analyzed data to find insights.", "Modeled 2 years of sales in SQL, finding 3 products that drove 60% of revenue.", "Name the data, the method and the finding."], ["Responsible for analyzing reports.", "Examined weekly ops reports and flagged 4 recurring delays to managers.", "Turns a duty into an action and result."]],
    byField: { "Software & data": ["Investigated a latency spike and traced it to an unindexed query.", "Forecasted server load for a product launch."], "Business & marketing": ["Benchmarked 8 competitors' pricing for a client pitch.", "Evaluated 3 ad channels, shifting budget to the one with 2x ROI."], "Clubs & part-time jobs": ["Audited the club's spending, cutting $800 of unused subscriptions.", "Assessed volunteer turnout to reschedule low-attendance shifts."] },
    faq: [["How do I describe analysis on a resume?", "Verb + data + method + finding: \"Modeled 2,400 responses in Python to find the 3 drivers of churn.\""], ["Which analysis verbs do recruiters like?", "Specific ones: modeled, forecasted, quantified, investigated. They say what kind of analysis."]],
    rel: ["improved", "developed", "ensured", "designed"]
  },
  helped: {
    kw: [["helped synonym", null]],
    signals: "that you played a part", keep: "Almost always replace it. \"Helped\" hides what you did and makes recruiters guess how big your part was.",
    best: ["supported", "enabled", "contributed to", "facilitated", "assisted", "advised"],
    groups: [
      { ctx: "You did part of a bigger task", words: [S("Contributed to", "your piece of a shared result", "Contributed the market sizing to a team pitch that won $5K."), S("Supported", "you made others' work possible", "Supported 3 researchers by cleaning 50K data points."), S("Assisted", "fine with specifics", "Assisted in 40 patient intake interviews at a free clinic.")] },
      { ctx: "You helped people directly", words: [S("Advised", "you gave guidance", "Advised 25 students on course selection as a peer advisor."), S("Coached", "you built someone's skill", "Coached 6 classmates for coding interviews."), S("Resolved", "you fixed their problem", "Resolved 40+ IT tickets a week for faculty.")] },
      { ctx: "You made something possible", words: [S("Enabled", "your work unlocked a result", "Enabled same-day reporting by automating a data export."), S("Facilitated", "you ran the process", "Facilitated 8 workshops for 200 first-year students."), S("Equipped", "you gave others tools", "Equipped 15 volunteers with a training guide I wrote.")] }
    ],
    misuse: [["Helped customers.", "Resolved 40+ customer issues a week with a 96% satisfaction score.", "Says how many and how well."], ["Helped with event planning.", "Booked venues and vendors for 3 events with 300 total attendees.", "Names your actual tasks."]],
    byField: { "Software & data": ["Enabled weekly releases by writing deployment scripts.", "Supported the data team by building 4 reusable SQL views."], "Business & marketing": ["Contributed 3 of 10 slides to a winning case competition deck.", "Facilitated 2 customer focus groups of 8 people."], "Clubs & part-time jobs": ["Advised 15 new members on club procedures.", "Resolved scheduling conflicts for 30 tutors."] },
    faq: [["Why is \"helped\" a weak resume word?", "It doesn't say what you did or how big your role was. Name the task instead: built, analyzed, resolved, booked."], ["What can I say instead of \"helped with\"?", "Supported, contributed to, assisted in, or, best, the specific verb for what you did."]],
    rel: ["collaborated", "provided", "organized", "managed"]
  },
  organized: {
    kw: [["organized synonym", null]],
    signals: "that you planned or arranged something", keep: "Good for events. Vary it and give the scale (people, budget, number of events).",
    best: ["planned", "coordinated", "hosted", "arranged", "orchestrated", "mobilized"],
    groups: [
      { ctx: "Events", words: [S("Planned", "you designed it ahead of time", "Planned 6 recruiting events attended by 500 students."), S("Hosted", "you ran it on the day", "Hosted a speaker series with 4 industry guests."), S("Orchestrated", "many moving parts", "Orchestrated a 2-day conference with 30 speakers and 400 attendees.")] },
      { ctx: "People", words: [S("Mobilized", "got many people to act", "Mobilized 60 volunteers for a campus clean-up."), S("Recruited", "brought people in", "Recruited 25 new members through class presentations."), S("Coordinated", "kept people in sync", "Coordinated 4 teams across 2 campuses.")] },
      { ctx: "Information and systems", words: [S("Structured", "gave order to information", "Structured the club's files into a shared drive used by 40 members."), S("Catalogued", "listed and sorted items", "Catalogued 1,200 archive items for the history department."), S("Scheduled", "time and resources", "Scheduled 120 tutoring sessions per week across 15 tutors.")] }
    ],
    misuse: [["Organized events.", "Planned 6 networking events that connected 22 employers with 500 students.", "Number of events, who came, what it led to."], ["Organized files.", "Structured 5 years of club records into a searchable drive.", "Says the scale and the benefit."]],
    byField: { "Software & data": ["Hosted a 24-hour hackathon for 150 participants.", "Structured a shared code repository for a 6-person class team."], "Business & marketing": ["Orchestrated a product launch event with 200 attendees.", "Coordinated 3 vendors for a campus marketing campaign."], "Clubs & part-time jobs": ["Mobilized 40 volunteers for a food drive collecting 2 tons.", "Scheduled shifts for 12 staff each week."] },
    faq: [["Is \"organized\" a good resume word?", "Yes for events, if you add the scale. Rotate with planned, hosted, coordinated."], ["What's a word for organizing people?", "Mobilized, coordinated, recruited."]],
    rel: ["managed", "led", "collaborated", "designed"]
  },
  designed: {
    kw: [["designed synonym", null]],
    signals: "that you decided how something should look or work", keep: "Keep it for design and engineering work; it's precise. Vary it when you use it more than twice.",
    best: ["architected", "crafted", "prototyped", "modeled", "drafted", "shaped"],
    groups: [
      { ctx: "Visual and UX design", words: [S("Crafted", "careful, hands-on design", "Crafted a visual identity used across 12 department newsletters."), S("Prototyped", "testable early versions", "Prototyped 3 onboarding flows in Figma and tested them with 15 users."), S("Illustrated", "drawings and graphics", "Illustrated 20 icons for a campus wayfinding app.")] },
      { ctx: "Technical and systems design", words: [S("Architected", "the structure of a system", "Architected a microservice backend for a 3-person capstone app."), S("Modeled", "data or physical models", "Modeled a bracket in SolidWorks that cut weight by 15%."), S("Specified", "wrote requirements", "Specified API endpoints for a mobile team of 4.")] },
      { ctx: "Programs and experiences", words: [S("Shaped", "you influenced the direction", "Shaped the curriculum for a 6-week coding bootcamp."), S("Drafted", "first versions", "Drafted a survey later sent to 2,000 students."), S("Conceived", "the original idea", "Conceived a peer-review program adopted by 3 courses.")] }
    ],
    misuse: [["Designed flyers.", "Crafted 15 event flyers that drove 30% higher attendance than the prior term.", "Show the effect of the design."], ["Designed a system.", "Architected a booking system handling 500 reservations a week.", "Says what kind of system and its load."]],
    byField: { "Software & data": ["Architected a data model for a student-housing app.", "Specified the schema for a 10-table analytics database."], "Business & marketing": ["Crafted a brand guide adopted by a 4-person startup.", "Shaped a loyalty program design for a campus café."], "Clubs & part-time jobs": ["Drafted the club's new-member handbook.", "Prototyped a signup flow that cut sign-in time in half."] },
    faq: [["Should designers avoid \"designed\"?", "No, it's accurate. Just vary it and name the outcome."], ["What's a technical word for designed?", "Architected (systems), modeled (data/CAD), specified (requirements)."]],
    rel: ["created", "developed", "improved", "organized"]
  },
  increased: {
    kw: [["increased synonym", null]],
    signals: "that a number went up", keep: "Always fine with a before-and-after number. Vary the verb so every bullet doesn't start the same way.",
    best: ["grew", "raised", "doubled", "expanded", "lifted", "boosted"],
    groups: [
      { ctx: "Audience and membership", words: [S("Grew", "steady growth", "Grew club membership from 60 to 140 in one year."), S("Expanded", "wider reach", "Expanded tutoring to 3 new campuses."), S("Doubled", "exactly 2x; say it when true", "Doubled event attendance with targeted class announcements.")] },
      { ctx: "Revenue and money", words: [S("Raised", "funds or prices", "Raised $8K in sponsorships for the annual gala."), S("Generated", "brought in revenue", "Generated $3K in merchandise sales."), S("Lifted", "improved a rate", "Lifted conversion 8% with a shorter checkout.")] },
      { ctx: "Performance rates", words: [S("Boosted", "energetic increase", "Boosted email open rate from 22% to 38%."), S("Accelerated", "faster growth", "Accelerated signups 40% month over month."), S("Maximized", "pushed to the top", "Maximized room usage to 95% with a booking app.")] }
    ],
    misuse: [["Increased sales.", "Grew weekly café sales 15% by adding a mobile pre-order option.", "Add the number and how."], ["Increased engagement significantly.", "Boosted average post likes from 80 to 240 with a weekly series.", "Replace \"significantly\" with the numbers."]],
    byField: { "Software & data": ["Lifted test coverage from 40% to 85%.", "Accelerated query speed 5x with indexing."], "Business & marketing": ["Grew Instagram followers 3x in a semester.", "Raised $10K in sponsorship for a student conference."], "Clubs & part-time jobs": ["Doubled volunteer signups with a referral challenge.", "Expanded store hours coverage with a new shift plan."] },
    faq: [["Should every bullet have a number?", "Most should. If you don't know it, estimate honestly or describe scale."], ["Is \"increased by\" or a percentage better?", "Both work. Give the before and after when you can: \"from 60 to 140\"."]],
    rel: ["improved", "developed", "managed", "analyzed"]
  },
  ensured: {
    kw: [["ensured synonym", 2900]],
    signals: "that you made sure something happened correctly", keep: "It often sounds passive. Replace it with what you did to make sure.",
    best: ["verified", "secured", "maintained", "safeguarded", "upheld", "enforced"],
    groups: [
      { ctx: "Accuracy and quality", words: [S("Verified", "checked for correctness", "Verified 15K inventory records weekly, keeping errors under 0.5%."), S("Validated", "tested against rules", "Validated survey data before analysis, removing 300 bad responses."), S("Audited", "formal checks", "Audited monthly expenses for a $20K club budget.")] },
      { ctx: "Rules and compliance", words: [S("Enforced", "applied rules", "Enforced safety protocols for 40 lab users."), S("Upheld", "kept standards", "Upheld HIPAA rules while handling 200 patient files."), S("Safeguarded", "protected", "Safeguarded donor data by moving records to an access-controlled system.")] },
      { ctx: "Reliability", words: [S("Maintained", "kept running", "Maintained 99% uptime for a club website."), S("Secured", "obtained or protected", "Secured venue bookings for 8 events."), S("Delivered", "made it happen on time", "Delivered all 12 weekly reports on time for a semester.")] }
    ],
    misuse: [["Ensured customer satisfaction.", "Resolved complaints within 24 hours, keeping a 4.8/5 rating.", "Say what you did to ensure it."], ["Ensured data accuracy.", "Validated 10K records against source files, cutting errors by 70%.", "Name the check and the result."]],
    byField: { "Software & data": ["Validated pipeline outputs with automated tests.", "Maintained 99.5% uptime for an internal tool."], "Business & marketing": ["Verified campaign tracking across 4 channels.", "Upheld brand guidelines across 30 assets."], "Clubs & part-time jobs": ["Enforced store cash-handling procedures.", "Secured permits for 3 outdoor events."] },
    faq: [["Why is \"ensured\" weak?", "It describes a goal, not an action. Say how: verified, validated, enforced."], ["What's a stronger word for ensured accuracy?", "Verified, validated, audited."]],
    rel: ["maintained", "managed", "improved", "analyzed"]
  },
  provided: {
    kw: [["synonyms for provide", 3600]],
    signals: "that you gave something to someone", keep: "Usually replace it. \"Provided\" is passive and doesn't say what kind of help or work it was.",
    best: ["delivered", "supplied", "advised", "prepared", "offered", "furnished"],
    groups: [
      { ctx: "Work you produced", words: [S("Delivered", "finished work handed over", "Delivered 4 market reports to a client on deadline."), S("Prepared", "you made materials ready", "Prepared financial statements for a $50K student fund."), S("Produced", "made outputs", "Produced weekly dashboards for 3 managers.")] },
      { ctx: "Help and guidance", words: [S("Advised", "expert guidance", "Advised 30 students on internship applications."), S("Trained", "taught skills", "Trained 10 volunteers on the intake process."), S("Counseled", "personal guidance", "Counseled 15 first-year students in weekly check-ins.")] },
      { ctx: "Customer and support", words: [S("Resolved", "fixed problems", "Resolved 50+ tech-support tickets a week."), S("Served", "customer-facing work", "Served 150 customers per shift in a high-volume café."), S("Supplied", "gave resources", "Supplied 3 teams with cleaned datasets each week.")] }
    ],
    misuse: [["Provided customer service.", "Served 150 customers per shift with a 4.8 rating.", "Shows volume and quality."], ["Provided support to the team.", "Prepared weekly data pulls that saved analysts 5 hours.", "Names the support and its value."]],
    byField: { "Software & data": ["Delivered a cleaned dataset of 2M rows to the research team.", "Resolved 20 bug reports in an open-source project."], "Business & marketing": ["Prepared investor one-pagers for 3 startups.", "Advised a local shop on social posting, growing followers 2x."], "Clubs & part-time jobs": ["Trained 8 new baristas on drink standards.", "Served as treasurer for a 70-member club."] },
    faq: [["What's another word for \"provided\" on a resume?", "Delivered, prepared, advised, trained, resolved. Pick the one that names the help."], ["Is \"provided\" ever OK?", "Rarely. It's acceptable in a list of duties, but bullets should show actions."]],
    rel: ["helped", "collaborated", "maintained", "organized"]
  },
  maintained: {
    kw: [["maintain synonym", null]],
    signals: "that you kept something going", keep: "Keep it for systems and records where reliability matters (\"maintained 99.9% uptime\"). Replace it when it sounds like you just kept things the same.",
    best: ["sustained", "preserved", "upheld", "managed", "monitored", "kept"],
    groups: [
      { ctx: "Systems and equipment", words: [S("Monitored", "you watched and reacted", "Monitored 30 lab instruments and logged faults daily."), S("Serviced", "hands-on upkeep", "Serviced 12 bikes a week at the campus repair shop."), S("Administered", "accounts and software", "Administered the club's website and 3 social accounts.")] },
      { ctx: "Records and data", words: [S("Updated", "kept current", "Updated a 500-contact alumni database each month."), S("Tracked", "followed over time", "Tracked a $15K budget in Google Sheets with monthly reports."), S("Preserved", "protected from loss", "Preserved 10 years of club records in a shared archive.")] },
      { ctx: "Relationships and standards", words: [S("Sustained", "kept up over time", "Sustained a 95% donor retention rate across 2 years."), S("Upheld", "kept standards", "Upheld a 3.8 GPA while working 20 hours a week."), S("Nurtured", "developed relationships", "Nurtured relationships with 10 corporate sponsors.")] }
    ],
    misuse: [["Maintained records.", "Updated a 500-contact database monthly, cutting bounced emails by 40%.", "Show the result of the upkeep."], ["Maintained relationships with clients.", "Nurtured 10 sponsor relationships, renewing 9 for the next year.", "Name the outcome."]],
    byField: { "Software & data": ["Monitored service health dashboards and fixed 15 alerts.", "Administered a PostgreSQL database for a class project."], "Business & marketing": ["Tracked campaign spend across 3 channels.", "Nurtured 20 brand-partner relationships."], "Clubs & part-time jobs": ["Serviced equipment for a 50-machine gym.", "Upheld a 3.7 GPA while working part-time."] },
    faq: [["Is \"maintained\" a good resume word?", "It's fine for reliability (uptime, accuracy, retention) with a number. Otherwise use monitored, tracked or nurtured."], ["What's a stronger synonym for maintain?", "Sustained, upheld, monitored, nurtured, depending on what you kept going."]],
    rel: ["managed", "ensured", "organized", "provided"]
  }
};
// Back-compat for the synonyms tool card.
Object.values(VERBS).forEach(v => { v.alts = v.best.concat(v.groups.flatMap(g => g.words.map(w => w.word.toLowerCase())).filter(w => !v.best.includes(w))).slice(0, 12); v.before = v.misuse[0][0]; v.after = v.misuse[0][1]; });
const BEST_NOTE = { designed: "you decided how it should look or work", developed: "you built it up over time; standard in software", built: "hands-on making of something that works", directed: "you set priorities and gave instructions", "teamed up": "informal; fine for clubs and student projects", "joined forces": "two groups combined efforts", arranged: "you set up the logistics", offered: "you made something available", furnished: "formal; you supplied what was needed", managed: "real ownership of a budget, team or project", kept: "plain and honest; pair it with a number" };
